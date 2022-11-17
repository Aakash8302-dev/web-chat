import React from 'react'
import { Box, Typography } from '@mui/material'
import { borderRadius } from '@mui/system'

const style = {
  away:{
    backgroundColor: "#000",
    color: "white",
    padding: "12px",
    width: "fit-content",
    maxWidth: "40%",
    borderRadius: "10px",
    margin: "0.4rem 1rem"
  },
  home:{
    backgroundColor: "blue",
    color: "white",
    padding: "12px",
    width: "fit-content",
    maxWidth: "40%",
    borderRadius: "10px",
    margin: "0.4rem 1rem",
    marginLeft: "auto"
  },
  message:{
    fontSize: "1.2rem",
    fontWeight: "400"
  },
  author:{
    fontSize: "0.8rem",
    fontWeight: "600"
  }
}

const MessageBox = ({message, user}) => {

  return (
    <Box  sx={ user===message.author ? {...style.home} : {...style.away} }  >
      {
        user===message.author ? <></> : <Typography variant='subtitle2' sx={{...style.author}}>{message.author}</Typography>
      }
      <Typography variant='subtitle1' sx={{...style.message}}>{message.message}</Typography>
    </Box>
  )
}

export default MessageBox