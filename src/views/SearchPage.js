import React from 'react';
import PostMini from '../components/PostMini';
import { Stack } from '@mui/material';

function SearchPage() {
  const posts = [
    {
      id: 1,
      photo: 'coconut.jpg',
      title: 'Coconut for sale',
      description: 'Description for Post 1',
      author: 'John Lebowski',
      location: 'Hempshire',
      price: '$10',
    },
    {
      id: 2,
      photo: 'coconut.jpg',
      title: 'Another Coconut for sale',
      description: 'Description for Post 2',
      author: 'John Lebowski',
      location: 'Hempshire',
      price: '$10',
    },
    // Add more posts as needed
  ];

  return (
    <Stack container spacing={2} style={{ padding: '20px' }}>
      {posts.map((post) => (
        <PostMini
          key={post.id}
          photo={post.photo}
          title={post.title}
          description={post.description}
          author={post.author}
          location={post.location}
          price={post.price}
        />
      ))}
    </Stack>
  );
}

export { SearchPage };
