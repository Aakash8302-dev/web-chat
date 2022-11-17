import React,{useState} from 'react'
import {Paper, TextField, Typography, Button, FormControl, OutlinedInput, InputLabel, IconButton } from '@mui/material'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { userRegister } from '../features/user'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
    root:{
        width: "fit-content",
        padding: "1rem 2rem",
        borderRadius: "10px",
        textAlign: "center"
    },
    input:{
        margin: "0 0 1rem 0",
        width: "30ch"
    }
}

const Register = () => {

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => {
        dispatch(userRegister(values));
    }


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    


  return (
        <Paper elevation={4} sx={{...style.root}}>
            <Typography variant='h5' sx={{margin: "0 0 2rem 0", fontWeight:"500"}}>REGISTER</Typography>
            <div>
                <TextField 
                    variant='outlined' 
                    label="Name"
                    name="name"
                    onChange={handleInputChange}
                    sx={{...style.input}}
                />
            </div>
            <div>
                <TextField 
                    variant='outlined'
                    label="Email" 
                    name="email"
                    onChange={handleInputChange}
                    sx={{...style.input}}
                />
            </div>
           <div>
                <FormControl variant="outlined"  sx={{...style.input}}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleInputChange}
                    value={values.password}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
           </div>
           <Button variant='contained' onClick={handleSubmit} sx={{marginBottom: "1rem"}}>register</Button>
           <Typography variant="subtitle2">
                Already have an account ?
                <Link to={`/auth?redirect=login`}>Login</Link>
            </Typography>
        </Paper>
  )
}

export default Register