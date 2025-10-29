import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Widget.css';

const Widget = ({ dish, onRemoveFromWishlist, isInWishlist }) => {
  const navigate = useNavigate();
  const { user, addToWishlist, removeFromWishlist, isInWishlist: checkInWishlist } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/recipe/${dish._id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    
    if (!user) {
      navigate('/signin');
      return;
    }

    if (isInWishlist && onRemoveFromWishlist) {
      // If this is from WishlistPage, use the passed function
      onRemoveFromWishlist(dish._id);
    } else if (checkInWishlist(dish._id)) {
      // If in wishlist, remove it
      removeFromWishlist(dish._id);
    } else {
      // If not in wishlist, add it
      addToWishlist(dish._id);
    }
  };

  const imageUrl = `http://localhost:3001/uploads/${dish.image}`;

  // Format cooking time from database
  const getCookingTime = () => {
    if (dish?.cookingTime) {
      return `${dish.cookingTime} min`;
    }
    return 'N/A';
  };

  // Get difficulty level
  const getDifficulty = () => {
    return dish?.difficulty || 'Easy';
  };

  // Get servings
  const getServings = () => {
    return dish?.servings ? `${dish.servings} servings` : 'N/A';
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`widget-card ${isHovered ? 'hover' : ''}`}
    >
      {/* Image Container */}
      <div className="image-container">
        <img 
          src={imageUrl} 
          alt={dish.recipeName} 
          className="recipe-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Recipe+Image';
          }}
        />
        {/* Overlay with favorite button */}
        <div className="image-overlay">
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-button ${(isInWishlist || checkInWishlist(dish._id)) ? 'active' : ''}`}
          >
            {(isInWishlist || checkInWishlist(dish._id)) ? '❤️' : '🤍'}
          </button>
        </div>
        {/* Difficulty Badge */}
        <div className="difficulty-badge">
          {getDifficulty()}
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <h3 className="title">{dish.recipeName}</h3>
        <p className="description">{dish.description}</p>
        
        {/* Recipe Info */}
        <div className="stats">
          <div className="stat">
            <span className="stat-icon">⏱️</span>
            <span>{getCookingTime()}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">👥</span>
            <span>{getServings()}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🔥</span>
            <span>{dish?.calories || 'N/A'} cal</span>
          </div>
        </div>

        {/* Tags */}
        {dish?.tags && dish.tags.length > 0 && (
          <div className="tags">
            {dish.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Recipe Button */}
        <button className="view-button">
          View Recipe →
        </button>
      </div>
    </div>
  );
};

export default Widget;