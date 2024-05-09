import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './views/MainPage';
import ProfilePage from './views/ProfilePage';
import SearchPage from './views/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/profile-page' element={<ProfilePage />} />
        <Route path='/search-page' element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
