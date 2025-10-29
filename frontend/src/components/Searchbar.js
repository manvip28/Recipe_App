import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Real-time search as user types
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{
          ...styles.searchWrapper,
          ...(isFocused && styles.searchWrapperFocused)
        }}>
          <div style={styles.searchIcon}>🔍</div>
          <input
            type="text"
            placeholder="Search recipes, ingredients, or descriptions..."
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.input}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              style={styles.clearButton}
            >
              ✕
            </button>
          )}
          <button type="submit" style={styles.button}>
            Search
          </button>
        </div>
      </form>
      
      {/* Search suggestions could go here */}
      {query && (
        <div style={styles.suggestions}>
          <p style={styles.suggestionText}>
            Try searching for: "pasta", "chicken", "dessert", "healthy"
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e0e0e0',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },
  searchWrapperFocused: {
    borderColor: '#667eea',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.2)',
  },
  searchIcon: {
    padding: '0 15px',
    fontSize: '18px',
    color: '#7f8c8d',
  },
  input: {
    width: '400px',
    height: '50px',
    padding: '0 15px',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#2c3e50',
    boxSizing: 'border-box',
  },
  clearButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#7f8c8d',
    cursor: 'pointer',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  },
  button: {
    height: '50px',
    padding: '0 25px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  suggestions: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '10px auto 0',
  },
  suggestionText: {
    margin: 0,
    fontSize: '14px',
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
};

export default SearchBar;
