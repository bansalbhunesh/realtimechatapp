import React from "react";
import styled from "styled-components";
import loader from "../loader.gif"

export default function Welcome({currentUser}){
return(
    <Container>
        <img src = {loader} alt = "loader"/>
        <h1>Welcome!<span>{currentUser.username}</span></h1>
        <h3>Please select the the contact you want to message</h3>
    </Container>
)
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
color:white;
gap:1rem;
img{
    height:20rem;
}
span{
    color:#4e00ff;
}
`