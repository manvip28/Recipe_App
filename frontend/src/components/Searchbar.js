import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '300px',
    height: '40px', // Adjust height to match the button height
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px 0 0 4px', // Rounded corners on the left
    boxSizing: 'border-box',
  },
  button: {
    height: '40px', // Match height of input field
    padding: '0 20px', // Adjust padding for button size
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '1px solid #4CAF50',
    borderRadius: '0 4px 4px 0', // Rounded corners on the right
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
};

export default SearchBar;
