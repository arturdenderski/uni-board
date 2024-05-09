import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography, TextField } from '@mui/material';

function CreatePostPopup({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSave = () => {
    // Price validation regex for any number with exactly two digits after the decimal point
    const priceRegex = /^\d+(\.\d{2})?$/;

    // Check if price matches the nn.nn format
    if (!priceRegex.test(price)) {
      // Display an error message or handle invalid input
      alert('Price format should be any number with two digits after the decimal point.');
      return;
    }

    // Construct the new post object
    const newPost = {
      id: Date.now(), // Unique ID, can be generated dynamically
      title,
      description,
      location,
      price,
      photo: photo ? URL.createObjectURL(photo) : '', // Store photo URL if photo is uploaded
    };

    // Get initial user posts from local storage or initialize empty array
    const initialUserPosts = JSON.parse(localStorage.getItem('myposts')) || [];

    // Add the new post to the user's posts
    initialUserPosts.push(newPost);

    // Update user posts in local storage
    localStorage.setItem('myposts', JSON.stringify(initialUserPosts));

    setTitle('');
    setDescription('');
    setLocation('');
    setPrice('');
    setPhoto(null);
    
    // Close the popup
    onClose();
  };

  const handleImageChange = (event) => {
    // Get the selected photo
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '16px' }}
        />
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

export default CreatePostPopup;
