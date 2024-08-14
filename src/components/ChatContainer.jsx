import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import {v4 as uuid} from "uuid";

export default function ChatContainer({currentChat,currentUser,socket}){
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(()=>{
        

        async function func(){
            
            const response = await  axios.post(`${sendMessageRoute}/getMsg`,{
                from:currentUser._id,
                to:currentChat._id
            })
            
            setMessages(response.data);
        }
        func();
        
    },[currentChat])


    const handleSendMsg = async(msg)=>{
        const data = axios.post(`${sendMessageRoute}/addMsg`,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })
        socket.current.emit("send-msg",{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })

        //when we send the message,the message is shown to us:-
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });  // Fix: Use 'msg' instead of 'msgs'
        setMessages(msgs);

    }

    useEffect(()=>{
        if(socket.current ){
            socket.current.on("msg-received",(msg)=>{
                console.log(msg);
                 setArrivalMessage({fromSelf:false,message:msg});
            });
        }
    },[])

    useEffect(()=>{
        console.log(arrivalMessage);
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])   
    },[arrivalMessage])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); 
    
    

    
    
    return(
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                    <img src = {`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt = "Avatar not Set"/>
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
           <div className="chat-messages">
            {
                messages.map((message)=>{
                    return(
                        <div ref = {scrollRef} key = {uuid()}>
                            <div className={`message ${message.fromSelf?"sended":"received"}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
           </div>
            <ChatInput handleSendMsg = {handleSendMsg}/>
        </Container>

    )
}

const Container = styled.div`
display:grid;
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow:hidden;
padding-top:1rem;
@media screen and (min-width:360px) and (max-width:480px){
    grid-auto-rows :15% 70% 15%;
}
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.2rem;
    .user-details{
         display:flex;
         align-items:center;
         gap:1rem;
         .avatar{
            img{
                height:3rem;
            }
         }
         .username{
            h3{
                color:white;
            }
         }
    }
}
.chat-messages{
    padding:1rem 2 rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    .message{
        display:flex;
        align-items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.1rem;
            border-radius:1rem;
            color:#d1d1d1
        }
    }
    .sended{
        justify-content:flex-end;
        .content{
            background-color:#4f04ff21; 
        }
    }
    .received{
        justify-content:flex-start;
        .content{
            background-color:#9900ff20;
        }
    }
}
`