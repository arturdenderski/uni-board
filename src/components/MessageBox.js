import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

function MessageBox({ selectedUser, onClose }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(getInitialMessages(selectedUser));
  }, [selectedUser]);

  const handleMessageSend = () => {
    if (messageInput.trim() !== '') {
      const newMessage = { id: messages.length + 1, text: messageInput, sender: 'user', timestamp: getCurrentTime() };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setMessageInput('');
  
      // Update local storage
      localStorage.setItem(selectedUser, JSON.stringify(updatedMessages));
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  };

  function getInitialMessages(userName) {
    const storedMessages = localStorage.getItem(userName);
    if (storedMessages) {
      return JSON.parse(storedMessages);
    }
    switch (userName) {
      case 'John Doe':
        return [
          { id: 1, text: 'Hello there!', sender: 'user', timestamp: '10:00 AM' },
          { id: 2, text: 'How are you?', sender: 'other', timestamp: '10:05 AM' },
          { id: 3, text: 'Nice to meet you!', sender: 'user', timestamp: '10:10 AM' },
        ];
      case 'Alice Smith':
        return [
          { id: 1, text: 'Hi!', sender: 'user', timestamp: '11:00 AM' },
          { id: 2, text: 'Hello!', sender: 'other', timestamp: '11:05 AM' },
        ];
      case 'Bob Johnson':
        return [
          { id: 1, text: 'Good morning!', sender: 'user', timestamp: '9:00 AM' },
          { id: 2, text: 'Good morning!', sender: 'other', timestamp: '9:05 AM' },
        ];
      case 'Emma Williams':
        return [
          { id: 1, text: 'Hey!', sender: 'user', timestamp: '12:00 PM' },
          { id: 2, text: 'Hey!', sender: 'other', timestamp: '12:05 PM' },
        ];
      case 'Michael Brown':
        return [
          { id: 1, text: 'Hola!', sender: 'user', timestamp: '3:00 PM' },
          { id: 2, text: 'Hola!', sender: 'other', timestamp: '3:05 PM' },
        ];
      default:
        return [];
    }
  }

  return (
    <Paper style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 500, padding: '10px', backgroundColor: '#f0f0f0', display: selectedUser ? 'block' : 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">
          Chatting with: {selectedUser}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {messages.map(message => (
        <div key={message.id} style={{ textAlign: message.sender === 'user' ? 'right' : 'left', marginTop: 10 }}>
          <Typography variant="body1" style={{ marginBottom: 5 }}>{message.text}</Typography>
          <Typography variant="caption" color="textSecondary">{message.timestamp}</Typography>
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
