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
  Stack,
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
        <Stack direction="column" spacing={2}>
          <Stack item xs={8}>
            <IconButton
              onClick={handleProfilePicClick}
              style={{ width: '320px', height: '320px', margin: 'auto' }}
            >
              <img
                src={profilePic}
                alt="Profile picture"
                style={{
                  width: '320px',
                  height: '320px',
                  borderRadius: '20px',
                }}
              />
            </IconButton>
          </Stack>
          <Stack item xs={4}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ maxWidth: '300px', paddingLeft: '70px' }}
            >
              <Grid item xs={12}></Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom>
                  {name} {surname}
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
          </Stack>
        </Stack>

        <DialogActions dividers>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            style={{ marginTop: '16px' }}
          >
            Upload new picture
            <VisuallyHiddenInput
              id="profile-pic-selector"
              onChange={handleImageChange}
              type="file"
              accept="image/*"
            />
          </Button>
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
