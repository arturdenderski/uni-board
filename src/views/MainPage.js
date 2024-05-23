import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Box, TextField } from '@mui/material';

function MainPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (localStorage.getItem('loggedin') == '1') {
      navigate('/search-page');
    }
  }, []);

  const handleLogin = () => {
    // Dummy data for login
    const dummyEmail = 'dummy@ua.pt';
    const dummyPassword = '1234';

    setErrorMsg('');

    if (email === '') {
      setErrorMsg('Email cannot be empty!');
      return;
    }

    if (password === '') {
      setErrorMsg('Password cannot be empty!');
      return;
    }

    // Check if email and password match the dummy data
    if (email === dummyEmail && password === dummyPassword) {
      // Set user data in localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', 'John');
      localStorage.setItem('userSurname', 'Doe');
      localStorage.setItem(
        'userProfilePicture',
        './profile_pictures/profile-pic1.jpg'
      );

      // Navigate to profile page if login is successful
      localStorage.setItem('loggedin', '1');
      navigate('/search-page');
    } else {
      // Display an error message if login fails
      setErrorMsg('Invalid email or password');
    }
  };

  const handleKeyEvent = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
      className="container login-container"
      style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}
    >
      <Container className="login-box" maxWidth="sm">
        <Box sx={{ textAlign: 'center', padding: '50px' }}>
          <Typography variant="h2" gutterBottom>
            UNIBOARD
          </Typography>
          <Typography variant="body1" paragraph>
            An open-source bulletin board for university students
          </Typography>
          <Typography variant="body1" style={{ color: 'red' }}>
            {errorMsg}
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyEvent}
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
            onKeyDown={handleKeyEvent}
          />
          <Button
            className="btn"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default MainPage;
