function initializeUserDatabase() {
  // Check if the user database is already initialized
  if (!localStorage.getItem('users')) {
    // Initialize user database with user data
    const userData = [
      { name: 'John Doe', id: 1 },
      { name: 'Alice Smith', id: 2 },
      { name: 'Bob Johnson', id: 3 },
      { name: 'Emma Williams', id: 4 },
      { name: 'Michael Brown', id: 5 },
    ];
    localStorage.setItem('users', JSON.stringify(userData));
  }
}

function initializeMessagesDatabase() {
  // Check if the messages database is already initialized
  if (!localStorage.getItem('messages')) {
    // Initialize messages database with initial messages for each user
    const initialMessages = {
      1: [
        { id: 1, text: 'Hello there!', sender: 'user', timestamp: '10:00 AM' },
        { id: 2, text: 'How are you?', sender: 'other', timestamp: '10:05 AM' },
        {
          id: 3,
          text: 'Nice to meet you!',
          sender: 'user',
          timestamp: '10:10 AM',
        },
      ],
      2: [
        { id: 1, text: 'Hi!', sender: 'user', timestamp: '11:00 AM' },
        { id: 2, text: 'Hello!', sender: 'other', timestamp: '11:05 AM' },
      ],
      3: [
        { id: 1, text: 'Good morning!', sender: 'user', timestamp: '9:00 AM' },
        { id: 2, text: 'Good morning!', sender: 'other', timestamp: '9:05 AM' },
      ],
      4: [
        { id: 1, text: 'Hey!', sender: 'user', timestamp: '12:00 PM' },
        { id: 2, text: 'Hey!', sender: 'other', timestamp: '12:05 PM' },
      ],
      5: [
        { id: 1, text: 'Hola!', sender: 'user', timestamp: '3:00 PM' },
        { id: 2, text: 'Hola!', sender: 'other', timestamp: '3:05 PM' },
      ],
    };
    localStorage.setItem('messages', JSON.stringify(initialMessages));
  }
}

function initializePostsDatabase() {
  if (localStorage.getItem('posts')) {
    return;
  }
  const initialPosts = [
    {
      id: 0,
      title: 'Coconut',
      photo: 'coconut.jpg',
      description: 'I want to sell a coconut',
      authorId: 1,
      location: 'New York',
      price: 0,
    },
    {
      id: 1,
      title: 'Coconut for sale',
      photo: 'coconut.jpg',
      description: 'Description for Post 1',
      authorId: 2,
      location: 'Hempshire',
      price: 5,
    },
    {
      id: 2,
      photo: 'coconut.jpg',
      title: 'Another Coconut for sale',
      description: 'Description for Post 2',
      authorId: 3,
      location: 'Your Grandma',
      price: 10,
    },
  ];
  localStorage.setItem('posts', JSON.stringify(initialPosts));
}

export {
  initializeUserDatabase,
  initializeMessagesDatabase,
  initializePostsDatabase,
};