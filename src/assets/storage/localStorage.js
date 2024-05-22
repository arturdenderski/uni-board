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
      { name: 'Emily Davis', id: 6 },
      { name: 'Daniel Taylor', id: 7 },
      { name: 'Olivia Martinez', id: 8 },
      { name: 'William Garcia', id: 9 },
      { name: 'Sophia Rodriguez', id: 10 },
      { name: 'David Hernandez', id: 11 },
      { name: 'Isabella Wilson', id: 12 },
      { name: 'Alexander Lopez', id: 13 },
      { name: 'Madison Gonzalez', id: 14 },
      { name: 'Joseph Perez', id: 15 },
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
      id: 16,
      title: 'Smartphone',
      photo: 'smartphone.jpg',
      description:
        'Selling a gently used smartphone. Great for staying connected!',
      authorId: 1,
      location: 'Berlin',
      price: 150,
    },
    {
      id: 1,
      title: 'Study Desk',
      photo: 'desk.jpg',
      description:
        'Sturdy study desk for sale. Perfect for long study sessions!',
      authorId: 2,
      location: 'Paris',
      price: 40,
    },
    {
      id: 2,
      title: 'Graphic Calculator',
      photo: 'calculator.jpg',
      description:
        'Used graphic calculator for sale. Essential for math courses!',
      authorId: 3,
      location: 'London',
      price: 30,
    },
    {
      id: 3,
      title: 'Bedding Set',
      photo: 'bedding.jpg',
      description:
        'Cozy bedding set including sheets, pillowcases, and a comforter.',
      authorId: 4,
      location: 'Madrid',
      price: 25,
    },
    {
      id: 4,
      title: 'Digital Camera',
      photo: 'camera.jpg',
      description: 'Compact digital camera for sale. Capture your memories!',
      authorId: 5,
      location: 'Rome',
      price: 80,
    },
    {
      id: 5,
      title: 'Fitness Equipment',
      photo: 'fitness_equipment.jpg',
      description: 'Assorted fitness equipment for sale. Stay fit and healthy!',
      authorId: 6,
      location: 'Athens',
      price: 60,
    },
    {
      id: 6,
      title: 'Cookbook Collection',
      photo: 'cookbooks.jpg',
      description:
        'Collection of cookbooks covering various cuisines. Expand your culinary skills!',
      authorId: 7,
      location: 'Berlin',
      price: 20,
    },
    {
      id: 7,
      title: 'External Hard Drive',
      photo: 'hard_drive.jpg',
      description:
        'Large capacity external hard drive for sale. Store all your files!',
      authorId: 8,
      location: 'Paris',
      price: 50,
    },
    {
      id: 8,
      title: 'Backpack',
      photo: 'backpack.jpg',
      description:
        'Durable backpack with multiple compartments. Ideal for campus life!',
      authorId: 9,
      location: 'London',
      price: 25,
    },
    {
      id: 9,
      title: 'Desk Lamp',
      photo: 'lamp.jpg',
      description: 'Adjustable desk lamp for sale. Illuminate your study area!',
      authorId: 10,
      location: 'Madrid',
      price: 15,
    },
    {
      id: 10,
      title: 'Art Supplies',
      photo: 'art_supplies.jpg',
      description:
        'Assorted art supplies including paints, brushes, and canvases.',
      authorId: 11,
      location: 'Rome',
      price: 35,
    },
    {
      id: 11,
      title: 'Guitar',
      photo: 'guitar.jpg',
      description:
        'Acoustic guitar for sale. Perfect for jam sessions with friends!',
      authorId: 12,
      location: 'Athens',
      price: 70,
    },
    {
      id: 12,
      title: 'Travel Backpack',
      photo: 'travel_backpack.jpg',
      description:
        'Spacious travel backpack with padded straps. Ready for your next adventure!',
      authorId: 13,
      location: 'Berlin',
      price: 55,
    },
    {
      id: 13,
      title: 'Desk Chair',
      photo: 'chair.jpg',
      description:
        'Comfortable desk chair with ergonomic design. Supportive for long study hours!',
      authorId: 14,
      location: 'Paris',
      price: 35,
    },
    {
      id: 14,
      title: 'Vintage Acoustic Guitar',
      photo: 'vintage_guitar.jpg',
      description:
        'Beautiful vintage acoustic guitar for sale. Perfect for collectors or musicians!',
      authorId: 15,
      location: 'London',
      price: 300,
    },
    {
      id: 15,
      title: "Beginner's Guitar",
      photo: 'beginner_guitar.jpg',
      description:
        "Complete beginner's guitar including instructional books and tuner.",
      authorId: 10,
      location: 'Madrid',
      price: 100,
    },
  ];
  localStorage.setItem('posts', JSON.stringify(initialPosts));
}

function initializeSelfAuthoredPostsDatabase() {
  if (localStorage.getItem('myposts')) {
    return;
  }
  const initialPosts = [
    {
      id: 0,
      title: 'Coconut',
      photo: 'coconut.jpg',
      description: 'I want to sell a coconut',
      authorId: -1,
      location: 'New York',
      price: 0,
    },
  ];
  localStorage.setItem('myposts', JSON.stringify(initialPosts));
}

export {
  initializeUserDatabase,
  initializeMessagesDatabase,
  initializePostsDatabase,
  initializeSelfAuthoredPostsDatabase,
};
