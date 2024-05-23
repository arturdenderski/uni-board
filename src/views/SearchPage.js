import React, { useState, useEffect } from 'react';
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
import MessageBox from '../components/MessageBox';
import MessagesDrawer from '../components/MessagesDrawer';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [filters, setFilters] = useState({
    search: '',
    min: '',
    max: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedin') === '0') {
      navigate('/');
    }
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (drawerOpen === true) {
      setSelectedPost(-1);
    }
  }, [drawerOpen]);

  const updateSearch = (event) => {
    setFilters({
      ...filters,
      search: event.target.value,
    });
  };

  const updateMax = (event) => {
    setFilters({
      ...filters,
      max: event.target.value,
    });
  };

  const updateMin = (event) => {
    setFilters({
      ...filters,
      min: event.target.value,
    });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserSelect = (user) => {
    setSelectedPost(user);
    toggleDrawer();
  };

  return (
    <>
      {/* Navbar */}
      <Navbar onMessagesIconClick={toggleDrawer} style={{ width: '100%' }} />
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#f0f0f0',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <MessagesDrawer
          open={drawerOpen}
          onClose={toggleDrawer}
          onUserSelect={handleUserSelect}
        />

        {/* Filters Menu */}
        <Paper
          elevation={2}
          variant="outlined"
          sx={{
            marginLeft: '50px',
            marginTop: '50px',
            marginRight: '50px',
            maxHeight: '400px',
            position: 'sticky',
            top: '100px',
            width: '25%',
            padding: '10px',
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{ padding: '10px', margin: '5px' }}
          >
            <Typography variant="h6">Search</Typography>
            <div>
              <TextField
                id="searchbar"
                sx={{ width: '100%' }}
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
                onChange={updateMin}
                sx={{ width: '47.5%', paddingRight: '5%' }}
              />
              <TextField
                label="max"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                onChange={updateMax}
                sx={{ width: '47.5%' }}
              />
            </Grid>
          </Stack>
        </Paper>
        <MessageBox postId={selectedPost} onClose={() => setSelectedPost(-1)} />
        {/* Offer List */}
        <PostList filters={filters} setPost={setSelectedPost} />
      </Grid>
    </>
  );
}

export default SearchPage;
