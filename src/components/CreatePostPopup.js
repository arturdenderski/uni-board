import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Stack,
} from '@mui/material';

function CreatePostPopup({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSave = () => {
    const priceRegex = /^\d+(\.\d{2})?$/;

    if (!priceRegex.test(price)) {
      alert(
        'Price format should be any number with two digits after the decimal point.'
      );
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      description,
      location,
      price,
      photo: photo, 
    };

    const initialUserPosts = JSON.parse(localStorage.getItem('myposts')) || [];
    initialUserPosts.push(newPost);
    localStorage.setItem('myposts', JSON.stringify(initialUserPosts));

    setTitle('');
    setDescription('');
    setLocation('');
    setPrice('');
    setPhoto(null);
    onClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <Stack direction="row">
          <Stack direction="column">
            <img
              alt="post photo"
              src={photo ? photo : 'no-image.jpg'} // Use the selected photo if available, otherwise display no_image.jpg
              style={{ width: '300px', height: '300px' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '16px' }}
            />
          </Stack>
          <Stack direction="column" sx={{ marginLeft: '32px' }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          style={{ marginTop: '16px', width: '89px', marginRight: '16px' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!title || !description || !location || !price}
          style={{ marginTop: '16px', width: '89px' }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostPopup;
