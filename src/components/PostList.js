import React from 'react';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import PostMini from './PostMini';

function PostList({ filters }) {
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

    return true;
  });

  return (
    <Grid item xs={6}>
      <Stack container spacing={2} style={{ padding: '20px' }}>
        {filteredPosts.map((post) => (
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
  );
}

export default PostList;
