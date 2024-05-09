import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MessageBox from './MessageBox';
import EditPostPopup from './EditPostPopup';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px',
});

const PostMini = ({
  id,
  photo,
  title,
  description,
  location,
  author,
  authorId,
  price,
  setUser,
}) => {
  const [boxId, setBoxId] = useState(-1);
  const [openEditPopup, setOpenEditPopup] = useState(false);


  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    window.location.reload();
  };
  

  return (
    <div>
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
        <EditPostPopup open={openEditPopup} onClose={handleCloseEditPopup} id={id}/>
        <Grid container spacing={2}>
          <Grid item>
            <Img alt="photo" src={photo} sx={{ width: 128, height: 128 }} />
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
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
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
                  {price}€
                </Typography>
                {authorId !== -1 && (
                  <Typography variant="body2" color="text.secondary">
                    {author}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              </Grid>
              {authorId !== -1 ? (
                <Button variant="contained" onClick={() => setUser(authorId)}>
                  Reach out
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleOpenEditPopup}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PostMini;
