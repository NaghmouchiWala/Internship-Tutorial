import React, { useEffect, useState , useCallback} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { db } from '../../utils/firebase';
import {getDoc, doc, updateDoc } from 'firebase/firestore'


const defaultTheme = createTheme();

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
      await updateDoc(doc(db, 'users', id), formData);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await getDoc(doc(db, 'users', id));
      if (response.exists()) {
        setFormData(response.data());
      } else {
        console.log('No such document found!');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Update User
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  onChange={handleInputChange}
                  value={formData.firstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                  value={formData.lastName}
                />
              </Grid>

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
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="tel"
                  onChange={handleInputChange}
                  value={formData.phone}
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
              Update User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateUser;