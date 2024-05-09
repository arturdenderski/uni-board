import React, { useState } from 'react';
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

function ProfilePage() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const navigate = useNavigate();

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
