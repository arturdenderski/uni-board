import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Box, TextField } from '@mui/material';

function MainPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('loggedin') == '1') {
      navigate('/search-page');
    }
  }, []);

  const handleLogin = () => {
    // Dummy data for login
    const dummyEmail = 'dummy@ua.pt';
    const dummyPassword = '1234';

    // Check if email and password match the dummy data
    if (email === dummyEmail && password === dummyPassword) {
      // Set user data in localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', 'John');
      localStorage.setItem('userSurname', 'Doe');
      localStorage.setItem('userProfilePicture', '');

      // Navigate to profile page if login is successful
      localStorage.setItem('loggedin', '1');
      navigate('/search-page');
    } else {
      // Display an error message if login fails
      alert('Invalid email or password');
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', paddingTop: '20vh' }}>
          <Typography variant="h3" gutterBottom>
            UNIBOARD
          </Typography>
          <Typography variant="body1" paragraph>
            An open-source bulletin board for university students
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default MainPage;
