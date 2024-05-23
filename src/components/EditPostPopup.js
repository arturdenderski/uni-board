import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Stack,
} from '@mui/material';

function EditPostPopup({ id, post, open, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setLocation(post.location);
      setPrice(post.price);
      setPhoto(post.photo);
    } else {
      return;
    }
  }, [id]);

  const handleSave = () => {
    // Price validation regex for any number with exactly two digits after the decimal point
    const priceRegex = /^\d+(\.\d{2})?$/;

    // Check if price matches the nn.nn format
    if (!priceRegex.test(price)) {
      // Display an error message or handle invalid input
      alert(
        'Price format should be any number with two digits after the decimal point.'
      );
      return;
    }

    // Load all user posts from localStorage
    const userPosts = JSON.parse(localStorage.getItem('myposts')) || [];

    // Find the post in the user's posts array and update it
    const updatedPosts = userPosts.map((other) => {
      if (other.id === post.id) {
        return {
          ...other,
          title,
          description,
          location,
          price,
          // You might need to update photo data differently if it's stored differently
          // For simplicity, this example assumes it's stored as a URL
          photo, // Keep the existing photo if no new one is uploaded
        };
      }
      return other;
    });

    // Update user posts in local storage
    localStorage.setItem('myposts', JSON.stringify(updatedPosts));

    // Close the popup
    onClose();
  };

  const handleRemovePhoto = () => {
    setPhoto('');
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

  const handleDelete = () => {
    const userPosts = JSON.parse(localStorage.getItem('myposts')) || [];
    const updatedPosts = userPosts.filter((other) => {
      return other.id !== post.id;
    });
    localStorage.setItem('myposts', JSON.stringify(updatedPosts));
    onClose();
  };

  const handleCancel = () => {
    onClose();
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setLocation(post.location);
      setPrice(post.price);
      setPhoto(post.photo);
    }
  };

  const handleImgError = (event) => {
    event.target.src = './no-image.jpg';
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <Stack direction="row">
          <Stack direction="column">
            <img
              alt="post photo"
              src={photo}
              onError={handleImgError}
              style={{ width: '300px', height: '300px' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRemovePhoto}
              style={{ marginTop: '16px' }}
            >
              Remove Photo
            </Button>
          </Stack>
          <Stack direction="column">
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
          onClick={handleCancel}
          style={{ marginTop: '16px' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDelete}
          style={{ marginTop: '16px' }}
        >
          Delete Post
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!title || !description || !location || !price}
          style={{ marginTop: '16px' }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditPostPopup;
