import React, { useEffect, useState } from 'react'
import { Avatar, Button,  Grid, Paper, TextField } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { register, reset } from '../Slice/userSlice';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Signup() {

    const paperStyle = {padding: 20, height:'70vh', width:300, margin:"0 auto"} 
    const avatarStyle = {backgroundColor: '#42b0ba' }  
    const headerStyle = {margin:0}
    const marginStyle = {margin:'7px 0'} 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user, isError, isSuccess, message} = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }        

        if (password !== confirmPassword){
            toast.error('Password do not match')
        }else {
            const userData = {
                name,
                email,
                mobile:phoneNumber,
                password
            }
            dispatch(register(userData))
        }
    }



    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if (isSuccess) {         
          toast.success("Account created")
          setName('');
          setEmail('');
          setPhoneNumber('');
          setPassword('');
          setConfirmPassword('');
          navigate('/login')
        }
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])



  return (
    <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><PersonAddOutlinedIcon/></Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField 
                    style={marginStyle} 
                    size="small"
                    label='Name'
                    placeholder='Enter Name' 
                    fullWidth 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                <TextField 
                    style={marginStyle} 
                    size="small" 
                    label='Email' 
                    placeholder='Enter Email' 
                    fullWidth 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <TextField 
                    style={marginStyle} 
                    size="small" 
                    label='Phone Number' 
                    placeholder='Enter phone number' 
                    fullWidth 
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                {/* <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    style={{display:'initial'}}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                </FormControl> */}
                <TextField 
                    style={marginStyle} 
                    size="small" label='Password' 
                    placeholder='Enter password' 
                    type='password' 
                    fullWidth 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <TextField 
                    style={marginStyle} 
                    size="small" 
                    label='Confirm Password' 
                    placeholder='Re-enter password' 
                    type='password' 
                    fullWidth 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                <Button 
                    style={marginStyle} 
                    variant='contained' 
                    type='submit' 
                    color='primary' 
                    fullWidth 
                >Sign Up
                </Button> 
            </form>

        </Paper>
    </Grid>
  )
}

export default Signup 