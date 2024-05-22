import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions,
} from '@mui/material';

function LogoutConfirmationPopup({ open, handleCancel }) {
  const handleLogout = () => {
    localStorage.setItem('loggedin', '0');
    window.location.href = '/';
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} color="primary">
          Yes
        </Button>
        <Button onClick={handleCancel} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutConfirmationPopup;
