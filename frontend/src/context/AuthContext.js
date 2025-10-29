import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

  // Load user and wishlist from localStorage on app start
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedWishlist = localStorage.getItem('wishlist');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Load wishlist from database
    try {
      const response = await fetch(`${API_BASE}/api/wishlist/${userData.id}`);
      if (response.ok) {
        const wishlistRecipes = await response.json();
        const recipeIds = wishlistRecipes.map(recipe => recipe._id);
        setWishlist(recipeIds);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem('user');
    localStorage.removeItem('wishlist');
  };

  const addToWishlist = async (recipeId) => {
    if (!user) return;
    
    try {
      const response = await fetch(`${API_BASE}/api/wishlist/${user.id}/add/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist);
      } else {
        console.error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (recipeId) => {
    if (!user) return;
    
    try {
      const response = await fetch(`${API_BASE}/api/wishlist/${user.id}/remove/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist);
      } else {
        console.error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (recipeId) => {
    return wishlist.includes(recipeId);
  };

  const value = {
    user,
    wishlist,
    isLoading,
    login,
    logout,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
