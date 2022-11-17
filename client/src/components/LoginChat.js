import React,{useState} from 'react'
import { Box, Paper, TextField, Typography, Button } from '@mui/material'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { userLogin } from '../features/user'

const style = {
    root:{
        width: "fit-content",
        padding: "1rem 2rem",
        borderRadius: "10px",
        textAlign: "center"
    },
    input:{
        margin: "0 0 1rem 0"
    }
}

const LoginChat = ({room, setRoom, joinRoom}) => {

    const dispatch = useDispatch();

  return (
        <Paper elevation={3} sx={{...style.root}}>
            <Typography variant='h5' sx={{margin: "0 0 2rem 0"}}>Join Chat</Typography>
           <div>
                <TextField 
                    variant='outlined'
                    name="room" 
                    label="Room ID"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    sx={{...style.input}}
                />
           </div>
           <Button variant='contained' onClick={joinRoom}>JOIN</Button>
        </Paper>
  )
}

export default LoginChat