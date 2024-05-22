import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MessagesDrawer from '../components/MessagesDrawer';
import MessageBox from '../components/MessageBox';
import { Grid, Stack } from '@mui/material';
import PostMini from '../components/PostMini';
import CreatePostPopup from '../components/CreatePostPopup';

const parsedPosts = JSON.parse(localStorage.getItem('posts')) || [];

function ProfilePage() {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedin') === '0') {
      navigate('/');
    }
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postsState, setPostsState] = useState(parsedPosts);
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleLogout = () => {
    setOpenConfirmation(true);
  };

  const handleCancelLogout = () => {
    setOpenConfirmation(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserSelect = (user) => {
    setSelectedPost(user);
    toggleDrawer();
  };

  useEffect(() => {
    if(drawerOpen === true)
    {
      setSelectedPost(-1);
    }
  }, [drawerOpen]);

  let posts = JSON.parse(localStorage.getItem('myposts'));
  const users = JSON.parse(localStorage.getItem('users'));

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar onMessagesIconClick={toggleDrawer} />
      <MessagesDrawer
        open={drawerOpen}
        onClose={toggleDrawer}
        onUserSelect={handleUserSelect}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 64px)',
          paddingBottom: '20px',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{ marginTop: '20px', marginLeft: '20px' }}
        >
          Your Posts
        </Typography>

        <Grid
          item
          xs={6}
          sx={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        >
          <Stack container spacing={2} style={{ padding: '20px' }}>
            {posts.map((post) => (
              <PostMini
                id={post.id}
                photo={post.photo}
                title={post.title}
                description={post.description}
                authorId={-1}
                location={post.location}
                price={post.price}
              />
            ))}
            <Button
              variant="outlined"
              sx={{ fontSize: 24, fontWeight: 'normal' }}
              onClick={handleOpenPopup}
            >
              +
            </Button>
          </Stack>
        </Grid>
        <CreatePostPopup open={openPopup} onClose={handleClosePopup} />
        <MessageBox postId={selectedPost} onClose={() => setSelectedPost(-1)} />
      </div>
    </div>
  );
}

export default ProfilePage;
