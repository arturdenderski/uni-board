import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditPostPopup from './EditPostPopup';
import ImagePreviewPopup from './ImagePreviewPopup';
import { IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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
  const [isLocked, setIsLocked] = useState(post.locked || false);

  useEffect(() => {
    setIsLocked(post.locked || false);
  }, [post]);

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

  const handleLockChange = () => {
    setIsLocked(!isLocked);
    const userPosts = JSON.parse(localStorage.getItem('myposts')) || [];
    const updatedPosts = userPosts.map((other) => {
      if (other.id === post.id) {
        return {
          ...other,
          locked: !isLocked,
        };
      }
      return other;
    });
    localStorage.setItem('myposts', JSON.stringify(updatedPosts));
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
                sx={{
                  width: 128,
                  height: 128,
                  filter: isLocked ? 'grayscale(100%)' : 'none',
                }}
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
                  <IconButton
                    onClick={handleLockChange}
                    sx={{ marginLeft: '8px' }}
                  >
                    {isLocked ? <LockIcon /> : <LockOpenIcon />}
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
