import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../../assets/home2.avif';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        textAlign: 'center',
        color: 'white',
        padding: 3,
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Welcome to Our Application!
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          Discover the power of efficient management and organization. 
          Login to access your personalized dashboard.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={handleLoginRedirect}
          sx={{
            color: 'white',
            borderColor: 'white',
            transition: 'all 0.3s ease',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: '#ff5722',
              color: '#ff5722',
              transform: 'scale(1.1)',
            },
          }}
        >
          Go to Login
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
