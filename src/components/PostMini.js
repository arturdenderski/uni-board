import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditPostPopup from './EditPostPopup';
import ImagePreviewPopup from './ImagePreviewPopup';
import { IconButton } from '@mui/material';

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
            <IconButton onClick={() => setOpenPreviewPopup(true)}>
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
                <Button variant="contained" onClick={handleOpenEditPopup}>
                  Edit
                </Button>
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
