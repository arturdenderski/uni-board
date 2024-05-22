import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, IconButton, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  borderRadius: '10px',
});

function MessageBox({ postId, onClose }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [scrollInstant, setScrollInstant] = useState(false); // State to control scroll behavior
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      if (post) {
        messagesEndRef.current.scrollIntoView({ behavior: scrollInstant ? 'auto' : 'instant' });
        setScrollInstant(false); // Reset scrollInstant after scrolling
      }
    }
  }, [messages, post, scrollInstant]);

  useEffect(() => {
    if (postId && postId !== -1) {
      // Retrieve post information from local storage using the post ID
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const currentPost = posts.find((post) => post.id === postId);
      setPost(currentPost);

      // Retrieve user information from local storage using the post's authorId
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const postAuthor = users.find((user) => user.id === currentPost.authorId);
      setAuthor(postAuthor);

      // Retrieve messages for the post from local storage
      const allMessages = JSON.parse(localStorage.getItem('messages')) || {};
      const postMessages = allMessages[postId] || [];
      setMessages(postMessages);

      // If postId changes from -1 to some other value, set scrollInstant to true
      if (postId === -1 && post === null) {
        setScrollInstant(true);
      }
    } else {
      setPost(null);
      setAuthor(null);
      setMessages([]);
    }
  }, [postId]);

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
      // Update the messages for the post in local storage
      const allMessages = JSON.parse(localStorage.getItem('messages')) || {};
      allMessages[postId] = updatedMessages;
      localStorage.setItem('messages', JSON.stringify(allMessages));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <Paper
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '750px', // Increased width by 1.5 times
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        display: post ? 'block' : 'none',
        borderRadius: '10px',
        zIndex: 9999, // Ensure the message box is on top
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#555',
          color: '#fff',
          padding: '10px',
          borderRadius: '10px 10px 0 0',
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        {post && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Img alt="photo" src={post.photo} />
              <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                {post.title} - {post.price}€<br />
                <Typography variant="body2" style={{ color: '#ccc' }}>
                  {author ? `By ${author.name}` : ''}
                </Typography>
              </Typography>
            </div>
            <IconButton onClick={onClose} style={{ color: '#fff', marginRight: '30px' }}>
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box
        style={{
          padding: '10px', // Added padding to the top to account for the header height
          overflowY: 'auto',
          maxHeight: '60vh', // Set to 60% of viewport height
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            Say hi to {author ? author.name : 'the post owner'}!
          </Typography>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              marginTop: 10,
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div  
              style={{
                backgroundColor: '#E0E0E0',
                borderRadius: '10px',
                padding: '8px 12px',
                display: 'inline-block',
                maxWidth: '600px',
                textAlign: 'left',
              }}
            >
              <Typography variant="body1" style={{ marginBottom: 5, wordWrap: 'break-word' }}>
                {message.text}
              </Typography>
              <Typography variant="caption" color="textSecondary" style={{ textAlign: 'right' }}>
                {message.timestamp}
              </Typography>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
          position: 'sticky',
          bottom: 0,
          width: '100%',
        }}
      >
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginRight: '10px', flex: 1 }}
        />
        <IconButton onClick={handleMessageSend} style={{ marginLeft: '10px', marginRight: '30px' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default MessageBox;
