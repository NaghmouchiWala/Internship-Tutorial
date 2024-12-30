import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const defaultTheme = createTheme();

const Signup = () => {


    const navigate = useNavigate();
    const [formData , setFormData] = useState ({
      email : '',
      password : ''
    })
  
    const handleInputChange = (event) => {
      const {name, value} = event.target;
      setFormData({
        ...formData,
        [name] : value
      })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      try{
        const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("SignUp Successful: ", response);
        navigate("/login");
      }catch (error){
        console.error(error.message);
      }
    }
  
    const handleSigninClick = async (e) => {
      navigate("/login")
    }

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box sx={{
            marginTop: 8,
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center'

        }}>
            <Avatar sx={{m : 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box component="form" noValidate sx={{mt : 3}}>
            <Grid container spacing={2}>
                <Grid item xs = {12}>
                <TextField
                required
                fullWidth
                id='email'
                label='email address'
                name='email'
                autoComplete='email'
                onChange={handleInputChange}
                value={formData.email}
                />
                </Grid>

                <Grid item xs = {12}>
                <TextField
                required
                fullWidth
                id='password'
                label='enter password'
                name='password'
                type='password'
                autoComplete='new-password'
                onChange={handleInputChange}
                value={formData.password}
                />
                </Grid>


            </Grid>

            <Button type='submit' fullWidth variant='contained' sx={{mt : 3 , mb: 2}} onClick={handleSubmit}>
                Sign up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSigninClick}>
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
    </>
  )
}

export default Signup;