import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Login Successful: ', response);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSignupClick = async () => {
    navigate('/register');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Go to Home Button */}
          <Button
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 1,
            }}
            onClick={handleGoHome}
          >
            Go to Home
          </Button>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Enter Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignupClick}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
