import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function MessagesDrawer({ open, onClose, onUserSelect }) {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (isOpen) {
      // Fetch messages from local storage
      const messages = JSON.parse(localStorage.getItem('messages')) || [];

      // Get unique post IDs from the messages
      const postIds = Object.keys(messages);

      // Fetch posts related to the message IDs
      const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const relatedPosts = allPosts.filter((post) => postIds.includes(post.id.toString()));

      // Set the posts state
      setPosts(relatedPosts);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handlePostClick = (postId) => {
    onUserSelect(postId);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} width={400} Modal={false}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
        <div style={{ fontWeight: 'bold' }}>Messages</div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 48px)' }}>
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <ListItem button onClick={() => handlePostClick(post.id)}>
              <img src={post.photo} alt={post.title} style={{ marginRight: '10px', width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />
              <ListItemText
                primary={post.title}
                secondary={`${post.price}€`}
                primaryTypographyProps={{ style: { fontWeight: 'bold', width: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' } }}
                secondaryTypographyProps={{ style: { textAlign: 'right' } }}
              />
            </ListItem>
            {index !== posts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default MessagesDrawer;
