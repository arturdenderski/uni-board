// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './views/MainPage';
import ProfilePage from './views/ProfilePage';
import SearchPage from './views/SearchPage';
import {
  initializeUserDatabase,
  initializeMessagesDatabase,
  initializePostsDatabase,
} from './assets/storage/localStorage';

function App() {
  // Call initialization functions when the application starts
  useEffect(() => {
    initializeUserDatabase();
    initializeMessagesDatabase();
    initializePostsDatabase();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/search-page" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
