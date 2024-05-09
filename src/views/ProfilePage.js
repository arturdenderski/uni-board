import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPopup from '../components/SettingsPopup';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false); // State to control the visibility of the confirmation dialog
  const navigate = useNavigate();

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleLogout = () => {
    setOpenConfirmation(true); // Open the confirmation dialog
  };

  const handleConfirmLogout = () => {
    // Clear any user data from localStorage if needed
    navigate('/');
  };

  const handleCancelLogout = () => {
    setOpenConfirmation(false); // Close the confirmation dialog
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)', paddingBottom: '20px' }}>
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px', marginLeft: '20px' }}>
          Your Posts
        </Typography>

        <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
          <IconButton color="primary" onClick={handleOpenSettings}>
            <SettingsIcon />
          </IconButton>
        </div>

        <div style={{ position: 'absolute', bottom: '20px', right: '20px', marginBottom: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <SettingsPopup open={openSettings} onClose={handleCloseSettings} />

        {/* Confirmation dialog */}
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
      </div>
    </div>
  );
}

export default ProfilePage;
