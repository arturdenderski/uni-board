import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Box, Tooltip, Menu, Toolbar, Typography } from '@mui/material';
import { IconButton, MenuItem } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Avatar from '@mui/material/Avatar';
import '../style/Navbar.css';

const settings = ['Settings', 'Logout'];

function Navbar({ onMessagesIconClick }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
        <Box id="profile-tab">
          <Tooltip
            title="Open settings"
            style={{
              display: 'flex',
            }}
          >
            <Link className="nav-tab" onClick={handleOpenUserMenu}>
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
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
