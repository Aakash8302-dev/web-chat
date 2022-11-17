import React,{useState, useEffect} from 'react'
import {Paper,Box, InputBase, Divider, IconButton, Typography} from '@mui/material'
import MessageBox from './MessageBox';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import ScrollToBottom from "react-scroll-to-bottom";

const style = {
    root:{
        width: "80vw",
        height: "80vh",
        position: "relative"
    },
    header:{
        backgroundColor: "#000",
        height: "fit-content",
        display: "flex",
        alignItems: "center"
    },
    room:{
        color:"white",
        marginLeft: "auto",
        padding: "0 1rem"
    },
    keypad:{
        main :{
            position: "absolute",
            display: "flex",
            bottom: "0",
            width: 1,
            height: "8%",
            backgroundColor: "#f2f2f2"
        },
        input:{
            padding: "1rem",
            width: '100%'
        }
    },
    chat:{
       backgroundColor: "",
       height: "86%",
       width: "100%",
       overflowX: "hidden",
       overflowY: "scroll"
    }
}

const Chat = ({socket, userName, room, setShow}) => {

    const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  useEffect(()=>{
    socket.on("receive_message", (data)=>{
        setMessageList((list) => [...list, data]);
    })
  },[socket])


  const sendMessage = async () => {
    if(currentMessage !== ""){
        const messageData ={
            room: room,
            author: userName,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        }
        const data = await socket.emit("send_message", messageData);
        setMessageList((list) => [...list,messageData]);
        setCurrentMessage("");
    }
  }

  const handleDisconnect = () => {
    setShow('login')
  }

  return (
    <Paper elevation={5} sx={{...style.root}}>
        <Box sx={{...style.header}}>
            <IconButton onClick={handleDisconnect}>
                <ClearSharpIcon sx={{color: "white", fontSize: "2rem"}} />
            </IconButton>
            <Box sx={{...style.room}}>
                <Typography variant='h6'> ROOM ID :{room}</Typography>
            </Box>
        </Box>
        <Box sx={{...style.chat}}>
            <ScrollToBottom>
            {
                messageList.map((message,index) => (
                    <MessageBox key={index} message={message} user={userName} />
                ) )
            }
            </ScrollToBottom>
        </Box>
        <Box sx={{...style.keypad.main}}>
            <InputBase 
                sx={{...style.keypad.input}} 
                placeholder='Enter Text' 
                onChange={(e)=> setCurrentMessage(e.target.value)}
                value={currentMessage}
                onKeyDown={
                    (e) => e.key === "Enter" && sendMessage()
                }
            />
            <IconButton color='primary' sx={{m:"0 15px"}} onClick={sendMessage}>
                <SendIcon />
            </IconButton> 
        </Box>
    </Paper>
  )
}

export default Chat