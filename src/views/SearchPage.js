import React from 'react';
import {
  Divider,
  Typography,
  Grid,
  Stack,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import Navbar from '../components/Navbar';
import PostMini from '../components/PostMini';
import SearchIcon from '@mui/icons-material/Search';

const posts = [
  {
    id: 1,
    photo: 'coconut.jpg',
    title: 'Coconut for sale',
    description: 'Description for Post 1',
    authorId: 1,
    location: 'Hempshire',
    price: '$10',
  },
  {
    id: 2,
    photo: 'coconut.jpg',
    title: 'Another Coconut for sale',
    description: 'Description for Post 2',
    authorId: 2,
    location: 'Hempshire',
    price: '$10',
  },
];

const users = JSON.parse(localStorage.getItem('users')) || [];
console.log(users);

function SearchPage() {
  return (
    <Grid container spacing={2}>
      {/* Navbar */}
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      {/* Filters Menu */}
      <Grid item xs={3}>
        <Paper elevation={2} variant="outlined" sx={{ marginLeft: '10px' }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ padding: '10px', margin: '10px' }}
          >
            <Typography variant="h6">Search</Typography>
            <div>
              <TextField
                sx={{ m: 1, width: '92%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Divider></Divider>
            <Typography variant="h6">Price</Typography>
            <Grid direction="row" container>
              <TextField
                label="min"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ width: '45%', paddingRight: '15px' }}
              />
              <TextField
                label="max"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ width: '45%' }}
              />
            </Grid>
          </Stack>
        </Paper>
      </Grid>

      {/* Offer List */}
      <Grid item xs={6}>
        <Stack container spacing={2} style={{ padding: '20px' }}>
          {posts.map((post) => (
            <PostMini
              key={post.id}
              photo={post.photo}
              title={post.title}
              description={post.description}
              author={users.find((user) => user.id === post.authorId).name}
              authorId={post.authorId}
              location={post.location}
              price={post.price}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SearchPage;
