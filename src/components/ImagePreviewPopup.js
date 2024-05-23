import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ImagePreviewPopup({ open, setOpen, image }) {
  return (
    <Dialog
      maxWidth="lg"
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Image Preview
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <img
          src={image}
          onError={(event) => {
            event.target.src = './no-image.jpg';
            event.target.classList.add('preview-no-image');
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
