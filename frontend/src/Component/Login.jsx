import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../Slice/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({handleChange}) {

    const paperStyle = {padding: 20, height:'70vh', width:300, margin:"0 auto"} 
    const avatarStyle = {backgroundColor: '#42b0ba' }  
    const marginStyle = {margin:'8px 0'} 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const { user, isError, isSuccess, message } = useSelector((state) => state.user)

    const handleSubmit = evt => {
        evt.preventDefault();
    
        const userData = {
            email,
            password,
        }
    
        dispatch(login(userData))
      };

      useEffect(() => {
        if (isError) {
            toast.error(message)
            
          }
      
          if (isSuccess) {
            navigate('/generate')
          }
          if (isSuccess || isError) {
            dispatch(reset());
        }
      }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LoginOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField 
                    style={marginStyle} 
                    label='Username' 
                    placeholder='Enter username' 
                    fullWidth 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <TextField 
                    style={marginStyle} 
                    label='Password' 
                    placeholder='Enter password' 
                    type='password' 
                    fullWidth 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <Button style={marginStyle} variant='contained' type='submit' color='primary' fullWidth>Sign in</Button>
            </form>
            <Typography> Do you have an account?
                <Link onClick={() =>handleChange("event",1)} >
                    Sign Up
                </Link>
            </Typography>
        </Paper>
    </Grid>
  )
}

export default Login 
