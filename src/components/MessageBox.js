// MessageBox.js

import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

function MessageBox({ userId, onClose }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      // Retrieve user information from local storage using the user ID
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find((user) => user.id === userId);
      setUser(currentUser);

      // Retrieve messages for the user from local storage
      const allMessages = JSON.parse(localStorage.getItem('messages')) || {};
      const userMessages = allMessages[userId] || [];
      setMessages(userMessages);
    }
  }, [userId]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  };

  const handleMessageSend = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        sender: 'user',
        timestamp: getCurrentTime(),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setMessageInput('');
      // Update the messages for the user in local storage
      const allMessages = JSON.parse(localStorage.getItem('messages')) || {};
      allMessages[userId] = updatedMessages;
      localStorage.setItem('messages', JSON.stringify(allMessages));
    }
  };

  return (
    <Paper
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 500,
        padding: '10px',
        backgroundColor: '#f0f0f0',
        display: user ? 'block' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1">
          Chatting with: {user ? user.name : ''}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            textAlign: message.sender === 'user' ? 'right' : 'left',
            marginTop: 10,
          }}
        >
          <Typography variant="body1" style={{ marginBottom: 5 }}>
            {message.text}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {message.timestamp}
          </Typography>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <IconButton onClick={handleMessageSend}>
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default MessageBox;
