import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MessageBox from './MessageBox';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px',
});

const PostMini = ({
  photo,
  title,
  description,
  location,
  author,
  authorId,
  price,
}) => {
  const [boxId, setBoxId] = useState(0);

  return (
    <div>
      <MessageBox userId={boxId} onClose={() => setBoxId(0)} />
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
                  {price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              </Grid>
              <Button variant="contained" onClick={() => setBoxId(authorId)}>
                Reach out
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PostMini;
