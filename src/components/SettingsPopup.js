// SettingsPopup.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  DialogActions,
  Grid,
  styled,
  IconButton,
} from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function SettingsPopup({ open, onClose }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem('userProfilePicture')
  );

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

  useEffect(() => {
    setProfilePic(localStorage.getItem('userProfilePicture'));
  }, [open]);

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    localStorage.setItem('userProfilePicture', profilePic);
    onClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicClick = () => {
    document.getElementById('profile-pic-selector').click();
  };

  return (
    <Dialog fullWidth={false} open={open} onClose={onClose}>
      <DialogTitle style={{ fontSize: '30px' }}>Settings</DialogTitle>
      <DialogContent dividers>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <IconButton onClick={handleProfilePicClick}>
              <img
                src={profilePic}
                alt="Profile picture"
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '20px',
                  margin: 'auto',
                }}
              />
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Surname:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              {surname}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Email:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              {email}
            </Typography>
          </Grid>
        </Grid>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Upload new picture
          <VisuallyHiddenInput
            id="profile-pic-selector"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
          />
        </Button>
        <DialogActions dividers>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancel}
            style={{ marginTop: '16px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: '16px' }}
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsPopup;
