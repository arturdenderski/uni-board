import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';

function EditPostPopup({ id, open, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    console.log(id);
    // Load post data from localStorage based on the provided ID
    const userPosts = JSON.parse(localStorage.getItem('myposts')) || [];
    const post = userPosts.find((post) => post.id === id);

    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setLocation(post.location);
      setPrice(post.price);
      // You might need to load photo data differently if it's stored differently
      // For simplicity, this example assumes it's stored as a URL
      setPhoto(post.photo);
    }
    else {
        return;
    }
  }, [id]);

  const handleSave = () => {
    // Price validation regex for any number with exactly two digits after the decimal point
    const priceRegex = /^\d+(\.\d{2})?$/;

    // Check if price matches the nn.nn format
    if (!priceRegex.test(price)) {
      // Display an error message or handle invalid input
      alert('Price format should be any number with two digits after the decimal point.');
      return;
    }

    // Load all user posts from localStorage
    const userPosts = JSON.parse(localStorage.getItem('myposts')) || [];

    // Find the post in the user's posts array and update it
    const updatedPosts = userPosts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title,
          description,
          location,
          price,
          // You might need to update photo data differently if it's stored differently
          // For simplicity, this example assumes it's stored as a URL
          photo: photo || post.photo, // Keep the existing photo if no new one is uploaded
        };
      }
      return post;
    });

    // Update user posts in local storage
    localStorage.setItem('myposts', JSON.stringify(updatedPosts));

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
      <DialogTitle>Edit Post</DialogTitle>
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

export default EditPostPopup;
