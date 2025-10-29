import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/SignUpPage';
import RecipePage from './pages/RecipePage';
import WishlistPage from './pages/WishlistPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
