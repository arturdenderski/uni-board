import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

function MessagesDrawer({ open, onClose, onUserSelect }) {
  const users = JSON.parse(localStorage.getItem('users'));

  const handleUserClick = (user) => {
    onUserSelect(user);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} width={300}>
      <List>
        {users.map((user) => (
          <ListItem button key={user.id} onClick={() => handleUserClick(user.id)}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default MessagesDrawer;
