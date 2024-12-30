import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { db } from '../../utils/firebase';
import {collection , addDoc} from 'firebase/firestore'


const defaultTheme = createTheme();


const PostUser = () => {

  const navigate = useNavigate();
  const [formData , setFormData] = useState ({
    
    firstName : '',
    lastName : '',
    email : '',
    phone : ''
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
      const result = await addDoc(collection(db, "users") , formData);
      console.log(result);
      navigate("/dashboard");
    }catch (error){
      console.error(error.message);
    }
 
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box sx={{
            marginTop: 15,
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center'

        }}>
        
            <Typography component="h1" variant="h5">
              Post User
            </Typography>

            <Box component="form" noValidate sx={{mt : 3}}>
            <Grid container spacing={2}>
              <Grid item xs = {12} sm = {6}>
              <TextField
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                name='firstName'
                                autoFocus
                                autoComplete='given-name'
                                onChange={handleInputChange}
                                value={formData.firstName}
                                />
              </Grid>

              <Grid item xs = {12} sm = {6}>
              <TextField
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                autoFocus
                                autoComplete='family-name'
                                onChange={handleInputChange}
                                value={formData.lastName}
                                />
              </Grid>

              
              <Grid item xs = {12}>
              <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoFocus
                                autoComplete='email-address'
                                onChange={handleInputChange}
                                value={formData.email}
                                />
              </Grid>

              <Grid item xs = {12}>
              <TextField
                                required
                                fullWidth
                                id='phone'
                                label='Phone Number'
                                name='phone'
                                autoFocus
                                type='text'
                                autoComplete='phone-number'
                                onChange={handleInputChange}
                                value={formData.phone}
                                />
              </Grid>
              
            </Grid>

            <Button type='submit' fullWidth variant='contained' sx={{mt : 3 , mb: 2}} onClick={handleSubmit}>
                Post User
            </Button>
        
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
    </>
  )
}

export default PostUser