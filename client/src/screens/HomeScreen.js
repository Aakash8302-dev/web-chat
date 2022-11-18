import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import io from "socket.io-client"
import Chat from '../components/Chat'
import LoginChat from '../components/LoginChat'

const socket = io(`http://127.0.0.1:3001`)


const style = {
  root:{
    margin:"0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

const HomeScreen = () => {

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.user.login.value);


  const [room, setRoom] = useState("")
  const [userName, setUsername] = useState(userLogin ? userLogin.name : null)
  const [show, setShow] = useState("login")

  useEffect(()=>{
      if(userLogin === null){
        navigate('/auth');
      }
  },[userLogin])

  const joinRoom = () => {
    if(userName!== "" && room !== ""){
        socket.auth = {token: userLogin.token}
        socket.connect();
        socket.emit("join_room",room);
        setShow("chat")
    }
  }

  const renderSwitch = (param) => {
    switch(param){
      case 'login' :
        return <LoginChat joinRoom={joinRoom} setRoom={setRoom} room={room} />
      case 'chat':
        return <Chat socket={socket} userName={userName} room={room} setShow={setShow} />
      default:
        return <div>Not Found</div>
    }
  }

  return (
    <Box sx={{...style.root}}>
      {
        renderSwitch(show)
      }
    </Box>
  )
}

export default HomeScreen