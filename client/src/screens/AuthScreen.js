import React,{useEffect} from 'react'
import { Box } from '@mui/material'
import {useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Register from '../components/Register'
import Login from '../components/Login'

const style = {
  root:{
    margin:"0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

const AuthScreen = () => {

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.user.login.value)

  useEffect(()=>{
    if(userLogin && userLogin.token){
      navigate('/')
    }
  },[userLogin])

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const renderSwitch = (param) => {
    switch(param){
      case '/' :
        return <Register />
      case 'login':
        return <Login />
      default:
        return <div>Not Found</div>
    }
  }

  return (
    <Box sx={{...style.root}}>
        {
          renderSwitch(redirect)
        }
    </Box>
  )
}

export default AuthScreen