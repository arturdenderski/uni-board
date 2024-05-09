import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPopup from '../components/SettingsPopup';
import { useNavigate } from 'react-router-dom';
import MessagesDrawer from '../components/MessagesDrawer';
import MessageBox from '../components/MessageBox';
import { Grid, Stack } from '@mui/material';
import PostMini from '../components/PostMini';

function ProfilePage() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedin') === '0') {
      navigate('/');
    }
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleLogout = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmLogout = () => {
    localStorage.setItem('loggedin', '0');
    navigate('/');
  };

  const handleCancelLogout = () => {
    setOpenConfirmation(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    toggleDrawer();
  };

  let posts = JSON.parse(localStorage.getItem('myposts'));
  const users = JSON.parse(localStorage.getItem('users'));

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar onMessagesIconClick={toggleDrawer} />
      <MessagesDrawer
        open={drawerOpen}
        onClose={toggleDrawer}
        onUserSelect={handleUserSelect}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 64px)',
          paddingBottom: '20px',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{ marginTop: '20px', marginLeft: '20px' }}
        >
          Your Posts
        </Typography>

        <Grid
          item
          xs={6}
          sx={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        >
          <Stack container spacing={2} style={{ padding: '20px' }}>
            {posts.map((post) => (
              <PostMini
                key={post.id}
                photo={post.photo}
                title={post.title}
                description={post.description}
                authorId={-1}
                location={post.location}
                price={post.price}
              />
            ))}
            <Button
              variant="outlined"
              sx={{ fontSize: 24, fontWeight: 'normal' }}
              onClick={() => {
                console.log('Added a post');
              }}
            >
              +
            </Button>
          </Stack>
        </Grid>

        <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
          <IconButton color="primary" onClick={handleOpenSettings}>
            <SettingsIcon />
          </IconButton>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            marginBottom: '20px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <SettingsPopup open={openSettings} onClose={handleCloseSettings} />

        <Dialog open={openConfirmation} onClose={handleCancelLogout}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to logout?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmLogout} color="primary">
              Yes
            </Button>
            <Button onClick={handleCancelLogout} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

        <MessageBox userId={selectedUser} onClose={() => setSelectedUser(-1)} />
      </div>
    </div>
  );
}

export default ProfilePage;
