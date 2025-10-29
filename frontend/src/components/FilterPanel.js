import React, { useState } from 'react';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  availableCategories = [], 
  availableEquipment = [],
  availableDietaryRestrictions = []
}) => {
  const [filters, setFilters] = useState({
    category: 'All',
    difficulty: 'All',
    skillLevel: 'All',
    cookingTime: 'All',
    servings: 'All',
    calories: 'All',
    equipment: [],
    dietaryRestrictions: [],
    cuisine: 'All'
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleMultiSelectChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: 'All',
      difficulty: 'All',
      skillLevel: 'All',
      cookingTime: 'All',
      servings: 'All',
      calories: 'All',
      equipment: [],
      dietaryRestrictions: [],
      cuisine: 'All'
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Advanced Filters</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Filter Content */}
        <div style={styles.content}>
          {/* Category Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={styles.select}
            >
              <option value="All">All Categories</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              style={styles.select}
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Skill Level Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Skill Level</label>
            <select
              value={filters.skillLevel}
              onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
              style={styles.select}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Cooking Time Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Cooking Time</label>
            <select
              value={filters.cookingTime}
              onChange={(e) => handleFilterChange('cookingTime', e.target.value)}
              style={styles.select}
            >
              <option value="All">Any Time</option>
              <option value="0-15">0-15 minutes</option>
              <option value="15-30">15-30 minutes</option>
              <option value="30-45">30-45 minutes</option>
              <option value="45-60">45-60 minutes</option>
              <option value="60+">60+ minutes</option>
            </select>
          </div>

          {/* Servings Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Servings</label>
            <select
              value={filters.servings}
              onChange={(e) => handleFilterChange('servings', e.target.value)}
              style={styles.select}
            >
              <option value="All">Any Servings</option>
              <option value="1-2">1-2 servings</option>
              <option value="3-4">3-4 servings</option>
              <option value="5-6">5-6 servings</option>
              <option value="7+">7+ servings</option>
            </select>
          </div>

          {/* Calories Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Calories</label>
            <select
              value={filters.calories}
              onChange={(e) => handleFilterChange('calories', e.target.value)}
              style={styles.select}
            >
              <option value="All">Any Calories</option>
              <option value="0-200">0-200 cal</option>
              <option value="200-400">200-400 cal</option>
              <option value="400-600">400-600 cal</option>
              <option value="600+">600+ cal</option>
            </select>
          </div>

          {/* Equipment Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Equipment</label>
            <div style={styles.checkboxGroup}>
              {availableEquipment.map(equipment => (
                <label key={equipment} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.equipment.includes(equipment)}
                    onChange={() => handleMultiSelectChange('equipment', equipment)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>{equipment}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Dietary Restrictions</label>
            <div style={styles.checkboxGroup}>
              {availableDietaryRestrictions.map(restriction => (
                <label key={restriction} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.dietaryRestrictions.includes(restriction)}
                    onChange={() => handleMultiSelectChange('dietaryRestrictions', restriction)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>{restriction}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button style={styles.clearButton} onClick={handleClearFilters}>
            Clear All
          </button>
          <button style={styles.applyButton} onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  panel: {
    width: '350px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#7f8c8d',
    padding: '5px',
  },
  content: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
  },
  filterGroup: {
    marginBottom: '25px',
  },
  filterLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '150px',
    overflow: 'auto',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  checkbox: {
    margin: 0,
    cursor: 'pointer',
  },
  checkboxText: {
    fontSize: '14px',
    color: '#2c3e50',
  },
  footer: {
    display: 'flex',
    gap: '10px',
    padding: '20px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  clearButton: {
    flex: 1,
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#7f8c8d',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  applyButton: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default FilterPanel;


