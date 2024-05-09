import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

function MessagesDrawer({ open, onClose, onUserSelect }) {
  // Dummy data for the list of names with surnames
  const names = [
    { name: 'John Doe', id: 1 },
    { name: 'Alice Smith', id: 2 },
    { name: 'Bob Johnson', id: 3 },
    { name: 'Emma Williams', id: 4 },
    { name: 'Michael Brown', id: 5 },
  ];

  const handleUserClick = (user) => {
    // Call the onUserSelect callback with the selected user
    onUserSelect(user);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} width={300}>
      <List>
        {names.map((item) => (
          <ListItem button key={item.id} onClick={() => handleUserClick(item.name)}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default MessagesDrawer;
