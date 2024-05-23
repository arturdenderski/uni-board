import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditPostPopup from './EditPostPopup';
import ImagePreviewPopup from './ImagePreviewPopup';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px',
});

const PostMini = ({ id, post, isMine, setPost, updatePost }) => {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openPreviewPopup, setOpenPreviewPopup] = useState(false);

  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    updatePost(post);
  };

  const handleImgError = (event) => {
    event.target.src = './no-image.jpg';
  };

  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // Retrieve posts from local storage
      const posts = JSON.parse(localStorage.getItem('myposts')) || [];
      console.log(posts);
      console.log(post.id);

      // Filter out the post to be deleted
      const updatedPosts = posts.filter((p) => p.id !== post.id);
      console.log(updatedPosts);
      // Update local storage
      localStorage.setItem('myposts', JSON.stringify(updatedPosts));
      // Optionally update the state to reflect the change in the UI
      // If you have a state that holds the posts, you can update it here
      updatePost(null); // Assuming updatePost can handle null to refresh the list
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          borderRadius: '10px',
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <IconButton
              title="click to preview"
              onClick={() => setOpenPreviewPopup(true)}
              sx={{ borderRadius: 0, padding: 0 }}
            >
              <Img
                alt="photo"
                src={post.photo}
                onError={handleImgError}
                sx={{ width: 128, height: 128 }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: 'bold' }}
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {post.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              direction="column"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid style={{ flexGrow: '1' }}>
                <Typography variant="subtitle1" component="div">
                  {post.price}€
                </Typography>
                {post.authorId !== -1 && (
                  <Typography variant="body2" color="text.secondary">
                    {post.author}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {post.location}
                </Typography>
              </Grid>
              {isMine ? (
                <div>
                  <Button variant="contained" onClick={handleOpenEditPopup}>
                    Edit
                  </Button>
                  <IconButton onClick={handleDeletePost} aria-label="delete" style={{margin: '0px 10px'}}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : (
                <Button variant="contained" onClick={() => setPost(id)}>
                  Reach out
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {isMine && (
        <EditPostPopup
          open={openEditPopup}
          post={post}
          onClose={handleCloseEditPopup}
          id={id}
        />
      )}
      <ImagePreviewPopup
        open={openPreviewPopup}
        setOpen={setOpenPreviewPopup}
        image={post.photo}
      />
    </>
  );
};

export default PostMini;
