import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from  "../main_logo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";

const toastOptions = {
  position:"bottom-right",
  autoClose:8000,
  pauseOnHover:true,
  dragable:true,
}

function Register() {
  const navigate = useNavigate();

  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/Chat")
    }
  },[])


  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    if(handleValidation()){
      const {password,confirmPassword,username,email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
      })
      if(data.status === false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status ===true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        console.log(data.user);
        navigate("/Chat");
        
      }

    }
  }
  
  const handleChange = (e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const handleValidation = ()=>{
    const {password,confirmPassword,username,email} = values;
    if(password!==confirmPassword){
      toast.error("Password and confirm password should be same",toastOptions)
      return false;
    }
    
    else if(username.length<3){
      toast.error("username length should be greater than 3",toastOptions)
      return false;
    }
    else if(password.length<7){
      toast.error("password length should be greater than 7",toastOptions)
      return false;
    }
    return true;
  }
  return (
    <>
    <FormContainer>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    <div className = "brand">
      <img src = {logo} alt = ""/>
      <h1>BlabberBuzz!</h1>
    </div>
    <input
    type = "text"
    placeholder="Username"
    name = "username"
    onChange = {(e)=>{handleChange(e)}}
    />
    <input
    type = "email"
    placeholder="Email"
    name = "email"
    onChange = {(e)=>{handleChange(e)}}
    />
    <input
    type = "password"
    placeholder="Password"
    name = "password"
    onChange = {(e)=>{handleChange(e)}}
    />
    <input
    type = "password"
    placeholder="confirmPassword"
    name = "confirmPassword"
    onChange = {(e)=>{handleChange(e)}}
    />
    <button type = "submit">Create User</button>
    <span>
      Already have an acount? <Link to="/login">Login</Link>
    </span>
    </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}

const FormContainer  = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;

.brand{

  display:flex;
  align-items:center;
  gap:1rem;
  justify-content:center;
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform:uppercase;
  }
}
form{
  
  z-index:1;
  display:flex;
  flex-direction:column;
  gap:2rem;
  background-color:#00000076;
  
  border-radius:2rem;
  padding:3rem 5rem;
  input{
    background-color:transparent;
    padding:1rem;
    border:0.1rem solid #4e0eff;
    border-radius:0.4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
      border:0.1rem solid #997af0;
      outline:none;
    }

  }
  button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    &:hover:{
      background-color:#4e0eff;
    }
  }
  span{
    color:white;
    text-transform:uppercase;
    a{
      color:#4e0eff;
      text-decoration:none;
      font-weight:bold;
    }
  }
}

`;

export default Register;
