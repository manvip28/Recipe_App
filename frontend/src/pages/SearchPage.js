import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import Widget from '../components/Widget';
import FilterPanel from '../components/FilterPanel';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../context/AuthContext';
import backgroundImage from '../assets/background2.png';

const SearchPage = () => {
  const { user, logout } = useAuth();
  const [widgets, setWidgets] = useState([]);
  const [originalWidgets, setOriginalWidgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [availableCategories, setAvailableCategories] = useState(['All']);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [availableDietaryRestrictions, setAvailableDietaryRestrictions] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

  // Fetch recipes from backend on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/api/recipes`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setWidgets(data);
        setOriginalWidgets(data);
        
        // Extract unique categories from the data
        const categories = ['All', ...new Set(data.map(recipe => recipe.category).filter(Boolean))];
        setAvailableCategories(categories);
        
        // Extract unique equipment
        const equipment = [...new Set(data.flatMap(recipe => recipe.equipment || []))];
        setAvailableEquipment(equipment);
        
        // Extract unique dietary restrictions
        const dietaryRestrictions = [...new Set(data.flatMap(recipe => recipe.dietaryRestrictions || []))];
        setAvailableDietaryRestrictions(dietaryRestrictions);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to filter and sort recipes
  const filterAndSortWidgets = (query, category, sort, filters = {}) => {
    let filtered = [...originalWidgets];

    // Filter by search query
    if (query.trim()) {
      filtered = filtered.filter((widget) => {
        const recipeName = widget.recipeName?.toLowerCase() || '';
        const description = widget.description?.toLowerCase() || '';
        const ingredients = widget.ingredients || [];
        
        return recipeName.includes(query.toLowerCase()) ||
               description.includes(query.toLowerCase()) ||
               ingredients.some(ingredient => 
                 ingredient?.toLowerCase().includes(query.toLowerCase())
               );
      });
    }

    // Filter by category using the actual category field from database
    if (category !== 'All') {
      filtered = filtered.filter((widget) => {
        return widget.category === category;
      });
    }

    // Apply advanced filters
    if (filters.difficulty && filters.difficulty !== 'All') {
      filtered = filtered.filter(widget => widget.difficulty === filters.difficulty);
    }

    if (filters.skillLevel && filters.skillLevel !== 'All') {
      filtered = filtered.filter(widget => widget.skillLevel === filters.skillLevel);
    }

    if (filters.cookingTime && filters.cookingTime !== 'All') {
      const timeRanges = {
        '0-15': [0, 15],
        '15-30': [15, 30],
        '30-45': [30, 45],
        '45-60': [45, 60],
        '60+': [60, Infinity]
      };
      const [min, max] = timeRanges[filters.cookingTime] || [0, Infinity];
      filtered = filtered.filter(widget => {
        const time = widget.cookingTime || 0;
        return time >= min && time <= max;
      });
    }

    if (filters.servings && filters.servings !== 'All') {
      const servingRanges = {
        '1-2': [1, 2],
        '3-4': [3, 4],
        '5-6': [5, 6],
        '7+': [7, Infinity]
      };
      const [min, max] = servingRanges[filters.servings] || [0, Infinity];
      filtered = filtered.filter(widget => {
        const servings = widget.servings || 0;
        return servings >= min && servings <= max;
      });
    }

    if (filters.calories && filters.calories !== 'All') {
      const calorieRanges = {
        '0-200': [0, 200],
        '200-400': [200, 400],
        '400-600': [400, 600],
        '600+': [600, Infinity]
      };
      const [min, max] = calorieRanges[filters.calories] || [0, Infinity];
      filtered = filtered.filter(widget => {
        const calories = widget.calories || 0;
        return calories >= min && calories <= max;
      });
    }

    if (filters.equipment && filters.equipment.length > 0) {
      filtered = filtered.filter(widget => {
        const equipment = widget.equipment || [];
        return filters.equipment.every(reqEquipment => 
          equipment.some(recipeEquipment => 
            recipeEquipment.toLowerCase().includes(reqEquipment.toLowerCase())
          )
        );
      });
    }

    if (filters.dietaryRestrictions && filters.dietaryRestrictions.length > 0) {
      filtered = filtered.filter(widget => {
        const restrictions = widget.dietaryRestrictions || [];
        return filters.dietaryRestrictions.every(reqRestriction => 
          restrictions.includes(reqRestriction)
        );
      });
    }

    // Sort recipes using real database fields
    filtered.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.recipeName.localeCompare(b.recipeName);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
        case 'time':
          return (a.cookingTime || 0) - (b.cookingTime || 0);
        case 'calories':
          return (a.calories || 0) - (b.calories || 0);
        case 'servings':
          return (a.servings || 0) - (b.servings || 0);
        default:
          return 0;
      }
    });

    setWidgets(filtered);
  };

  // Function to filter recipes based on search query
  const filterWidgets = (query) => {
    setSearchQuery(query);
    filterAndSortWidgets(query, selectedCategory, sortBy, activeFilters);
  };

  // Function to handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterAndSortWidgets(searchQuery, category, sortBy, activeFilters);
  };

  // Function to handle sort change
  const handleSortChange = (sort) => {
    setSortBy(sort);
    filterAndSortWidgets(searchQuery, selectedCategory, sort, activeFilters);
  };

  // Function to handle advanced filters
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    filterAndSortWidgets(searchQuery, selectedCategory, sortBy, filters);
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.background} />

      {/* User Profile - Top Right Corner */}
      {user && (
        <div style={styles.userProfileContainer}>
          <UserProfile user={user} onLogout={logout} />
        </div>
      )}

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <SearchBar onSearch={filterWidgets} />
      </div>

      {/* Filters and Controls */}
      <div style={styles.controlsContainer}>
        <div style={styles.filtersRow}>
          {/* Category Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={styles.filterSelect}
            >
              {availableCategories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="name">Name</option>
              <option value="difficulty">Difficulty</option>
              <option value="time">Cooking Time</option>
              <option value="calories">Calories</option>
              <option value="servings">Servings</option>
            </select>
          </div>

          {/* Results Count */}
          <div style={styles.resultsCount}>
            {isLoading ? 'Loading...' : `${widgets.length} recipes found`}
          </div>

          {/* Advanced Filters Button */}
          <button 
            style={styles.filterButton}
            onClick={() => setShowFilterPanel(true)}
          >
            🔍 Advanced Filters
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Loading delicious recipes...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Widgets Section */}
      {!isLoading && !error && (
        <div style={styles.widgetsContainer}>
          {widgets.length === 0 ? (
            <div style={styles.noResultsContainer}>
              <div style={styles.noResultsIcon}>🔍</div>
              <h3 style={styles.noResultsTitle}>No recipes found</h3>
              <p style={styles.noResultsText}>
                Try adjusting your search or filters to find more recipes.
              </p>
            </div>
          ) : (
            widgets.map((widget) => (
              <Widget key={widget._id} dish={widget} />
            ))
          )}
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={styles.backToTopButton}
          title="Back to top"
        >
          ↑
        </button>
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onApplyFilters={handleApplyFilters}
        availableCategories={availableCategories}
        availableEquipment={availableEquipment}
        availableDietaryRestrictions={availableDietaryRestrictions}
      />
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
    opacity: '0.8',
    width: '100%',
    height: '50vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    top: '20vh',
    gap: '20px',
  },
  userProfileContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  },
  controlsContainer: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    marginTop: '35vh',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  filtersRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '20px',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  filterSelect: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    backgroundColor: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  resultsCount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#7f8c8d',
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
  },
  filterButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    marginTop: '30vh',
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    marginTop: '30vh',
  },
  errorText: {
    fontSize: '16px',
    color: '#e74c3c',
    marginBottom: '20px',
    textAlign: 'center',
  },
  retryButton: {
    padding: '12px 24px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  widgetsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    marginTop: '30px',
    minHeight: '400px',
  },
  noResultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto',
  },
  noResultsIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  noResultsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 12px 0',
  },
  noResultsText: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
    lineHeight: '1.5',
  },
  backToTopButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// Add CSS animation for loading spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default SearchPage;
