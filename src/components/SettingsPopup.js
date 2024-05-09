// SettingsPopup.js
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

function SettingsPopup({ open, onClose }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedName = localStorage.getItem('userName') || '';
    const storedSurname = localStorage.getItem('userSurname') || '';
    const storedEmail = localStorage.getItem('userEmail') || '';

    // Set state with retrieved values
    setName(storedName);
    setSurname(storedSurname);
    setEmail(storedEmail);
  }, [open]);

  const handleSave = () => {
    onClose();
  };

  const handleImageChange = (event) => {
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
      <img src='profilePicture1.png' alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '16px' }} />
      <Typography variant="subtitle1" gutterBottom>Name:</Typography>
        <Typography variant="body1" gutterBottom>{name}</Typography>

        <Typography variant="subtitle1" gutterBottom>Surname:</Typography>
        <Typography variant="body1" gutterBottom>{surname}</Typography>

        <Typography variant="subtitle1" gutterBottom>Email:</Typography>
        <Typography variant="body1" gutterBottom>{email}</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '16px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsPopup;
