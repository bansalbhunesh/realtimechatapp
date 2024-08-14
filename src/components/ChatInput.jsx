import React,{useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
export default function ChatInput({handleSendMsg}){
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");
    const handleEmojiPicker = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (emoji, event) => {
        setMsg((currentMsg) => currentMsg + emoji.emoji); // Use a callback for state update
    };

    const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg(''); 
        }
    }
    
     return(
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPicker}/>
                    {
                        showEmojiPicker && <Picker  onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className = "input-container" onSubmit={(e)=>{
                sendChat(e);
            }}>
                <input type = "text" placeholder = "type your message here" 
                value = {msg}
                onChange = {(e)=>{
                    console.log(msg);
                    setMsg(e.target.value);
                }}
                />
                <button className = "submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`

display:grid;
grid-template-columns:5% 95%;
align-items:center;
background-color:#080420;
padding:0.2rem;
padding-bottom:0.8rem;
.button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    .emoji{
        position:relative;
        svg{
        font-size:1.5rem;
        color:#ffff07c8;
        cursor:pointer;
        }
        .EmojiPickerReact{
            position:absolute;
            top:-450px;
            background-color:#080420;
            box-shadow:0 5px 10px #9a86f3;
            border-color:#9186f3;
            
            .emoji-categories{
                button{
                        filter:contrast(0);
                }
            }
            
            .emoji-search{
                background-color:transparent;
                border-color:#9186f3;
            }
            .emoji-group:before{
                background-color:#080420; 
            }
            .epr-emoji-category-label{
                background-color:#080420;
            }
        }
        .epr-main::webkit-scrollbar{
            background-color:#080420;
            width:5px;
            &-thumb{
                background-color:#9186f3;
            }

        }   
        
    }
    
}

.input-container{
    width:100%;
    
    border-radius:2rem;
    display:flex;
    align-items:center;
    background:2rem;
    background-color:#ffffff34;
    input{
        padding-left:2rem;
        width:90%;
        background-color:transparent;
        height:60%;
        color:white;
        border:none;
        font-size:1.2rem; 
        &::selection{
            background-color:#9a86f3;
        }
        &:focus{
            outline:none;
        }
    }
    button{
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#9a86f3;
        border:none;
        svg{
                font-size:2rem;
                color:white;
                cursor:pointer; 
        }

    }
    
}
`