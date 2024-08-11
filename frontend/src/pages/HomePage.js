import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background2.png'; // Ensure the path is correct
import logo from '../assets/logo.png'; // Ensure the path is correct

const HomePage = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState({ search: false, login: false });
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    // Delay the appearance of the bar by 1 second
    const timer = setTimeout(() => {
      setShowBar(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleLoginClick = () => {
    navigate('/signin');
  };

  return (
    <div style={styles.background}>
      <div style={{ ...styles.bar, ...(showBar && styles.barVisible) }}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...(hover.search && styles.buttonHover) }}
            onClick={handleSearchClick}
            onMouseEnter={() => setHover({ ...hover, search: true })}
            onMouseLeave={() => setHover({ ...hover, search: false })}
          >
            Search Recipes
          </button>
          <button
            style={{ ...styles.button, ...(hover.login && styles.buttonHover) }}
            onClick={handleLoginClick}
            onMouseEnter={() => setHover({ ...hover, login: true })}
            onMouseLeave={() => setHover({ ...hover, login: false })}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: `url(${backgroundImage})`, // Use the imported local image
    backgroundSize: 'cover', // Ensures the image covers the entire area
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '100vh', // Full viewport height
    display: 'flex', // Use flexbox for centering content
    justifyContent: 'center', // Horizontally center the content
    alignItems: 'center', // Vertically center the content
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '15vh', // Adjust height as needed
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    opacity: '0',
    transition: 'opacity 0.5s ease-in-out',
    boxSizing: 'border-box', // Ensure padding is included in the width and height
  },
  barVisible: {
    opacity: '1',
  },
  logo: {
    maxHeight: '100%', // Ensure the logo fits within the bar height
    height: '100px', // Adjust as needed to fit within the bar height
    width: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    border: '2px solid black', // Black outline
    backgroundColor: 'transparent', // Transparent inside
    color: 'black', // Black text color
    borderRadius: '4px',
    cursor: 'pointer',
    // Minimum width to ensure constant size
    minHeight: '40px', // Minimum height to ensure constant size
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light white background on hover
    transform: 'scale(1.05)',
  },
};

export default HomePage;
