import React from 'react';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import PostMini from './PostMini';

function PostList({ filters, setPost }) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const filteredPosts = posts.filter((post) => {
    if (
      filters.search !== '' &&
      !post.title.toLowerCase().includes(filters.search.toLowerCase())
      // !post.description.includes(filters.search) &&
      // !post.author.includes(filters.search)
    ) {
      return false;
    }

    if (filters.max != '' && post.price > filters.max) {
      return false;
    }

    if (filters.min != '' && post.price < filters.min) {
      return false;
    }

    return true;
  });

  return (
    <Grid item xs={6}>
      <Stack container spacing={2} style={{ marginTop: '50px' }}>
        {filteredPosts.map((post, index) => (
          <PostMini id={post.id} post={post} setPost={setPost} />
        ))}
      </Stack>
    </Grid>
  );
}

export default PostList;
