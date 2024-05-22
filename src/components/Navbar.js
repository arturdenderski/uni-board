import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Avatar from '@mui/material/Avatar';
import '../style/Navbar.css';

function Navbar({ onMessagesIconClick }) {
  // Retrieve user email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  return (
    <AppBar position="static">
      <Toolbar id="navbar-toolbar">
        {/* UNIBOARD text on the left, wrapped with Link */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              fontSize: '30px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            U N I B O A R D
          </Link>
        </Typography>

        <Link className="nav-tab" to="/search-page">
          Search
        </Link>

        <Link className="nav-tab" to="/profile-page">
          Your Posts
        </Link>

        <Link className="nav-tab" to="/profile-page">
          + Create
        </Link>

        {/* Messages icon */}
        <Link className="nav-tab" onClick={onMessagesIconClick}>
          <ForumOutlinedIcon sx={{ marginTop: '10px' }} />
        </Link>

        {/* Profile */}
        <Link
          className="nav-tab"
          to="/profile-page"
          style={{
            display: 'flex',
          }}
        >
          <Typography
            variant="body1"
            sx={{ marginTop: '7%', marginRight: '20px' }}
          >
            {userEmail}
          </Typography>
          <Avatar
            src="profile-pic1.jpg"
            sx={{ width: '50px', height: '50px' }}
          ></Avatar>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
