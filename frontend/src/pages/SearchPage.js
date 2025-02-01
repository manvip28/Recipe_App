import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import Widget from '../components/Widget';
import backgroundImage from '../assets/background2.png'; // Replace with your background image

const SearchPage = () => {
  const [widgets, setWidgets] = useState([]);
  const [originalWidgets, setOriginalWidgets] = useState([]);

  // Fetch recipes from backend on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        console.log('Fetched recipes:', data); // Log fetched data
        setWidgets(data);
        setOriginalWidgets(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to filter recipes based on search query
  const filterWidgets = (query) => {
    if (!query.trim()) {
      setWidgets(originalWidgets); // Reset to all recipes when search query is empty
      return;
    }
    const filteredWidgets = originalWidgets.filter((widget) =>
      widget.recipeName.toLowerCase().includes(query.toLowerCase())
    );
    setWidgets(filteredWidgets);
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.background} />

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <SearchBar onSearch={filterWidgets} />
      </div>

      {/* Widgets Section */}
      <div style={styles.widgetsContainer}>
        {widgets.map((widget) => (
          <Widget key={widget._id} dish={widget} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
  },
  background: {
    position: 'absolute',
    top: '0.5vh',
    left: 0,
    opacity:'0.8',
    width: '100%',
    height: '50vh', // Adjust height of the background image section
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1, // Place background behind content
  },
  searchContainer: {
    position: 'relative', // Relative to container
    zIndex: 1, // Ensure search bar is above background image
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    top:'20vh',
  },
  widgetsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    marginTop: '37vh', // Start widgets after background image
  },
};

export default SearchPage;
