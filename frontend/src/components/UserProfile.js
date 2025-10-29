import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    navigate('/wishlist');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.profileButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div style={styles.avatar}>
          {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
        </div>
        <span style={styles.username}>
          {user?.name || user?.email || 'User'}
        </span>
        <span style={styles.dropdownIcon}>
          {isDropdownOpen ? '▲' : '▼'}
        </span>
      </button>

      {isDropdownOpen && (
        <div style={styles.dropdown}>
          <button 
            style={styles.dropdownItem}
            onClick={handleWishlistClick}
          >
            <span style={styles.itemIcon}>❤️</span>
            <span>My Wishlist</span>
          </button>
          <button 
            style={styles.dropdownItem}
            onClick={handleLogout}
          >
            <span style={styles.itemIcon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#ff6b6b',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
  },
  username: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  dropdownIcon: {
    fontSize: '12px',
    color: '#7f8c8d',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '5px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e0e0e0',
    minWidth: '180px',
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50',
    transition: 'background-color 0.2s',
    textAlign: 'left',
  },
  itemIcon: {
    fontSize: '16px',
  },
};

export default UserProfile;


