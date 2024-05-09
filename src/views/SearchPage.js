import React, { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import PostList from '../components/PostList';

function SearchPage() {
  const [filters, setFilters] = useState({
    search: '',
    min: 0,
    max: 20,
  });

  const updateSearch = (event) => {
    setFilters({
      ...filters,
      search: event.target.value,
    });
  };

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
                id="searchbar"
                sx={{ m: 1, width: '92%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={updateSearch}
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
      <PostList filters={filters} />
    </Grid>
  );
}

export default SearchPage;
