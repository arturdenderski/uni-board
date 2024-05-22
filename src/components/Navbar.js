import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Avatar from '@mui/material/Avatar';
import '../style/Navbar.css';

function Navbar({ onMessagesIconClick }) {
  const userEmail = localStorage.getItem('userEmail');
  let location = useLocation();

  let locationIdMap = {
    '/search-page': 'search-tab',
    '/profile-page': 'profile-tab',
  };

  useEffect(() => {
    let tagId = locationIdMap[location.pathname];
    console.log(location.pathname);
    document.getElementById(tagId)?.classList.add('tab-active');
  });

  return (
    <AppBar position="static">
      <Toolbar id="navbar-toolbar">
        {/* UNIBOARD text on the left, wrapped with Link */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: '30px',
            textDecoration: 'none',
            color: 'inherit',
            userSelect: 'none',
          }}
        >
          U N I B O A R D
        </Typography>

        <Link className="nav-tab" id="search-tab" to="/search-page">
          Browse
        </Link>

        <Link className="nav-tab" id="profile-tab" to="/profile-page">
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
          id="profile-tab"
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
