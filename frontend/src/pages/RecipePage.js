import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error(`Recipe not found (${response.status})`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError(`Failed to load recipe: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleWishlistClick = () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (isInWishlist(recipe._id)) {
      removeFromWishlist(recipe._id);
    } else {
      addToWishlist(recipe._id);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  const getSkillLevelColor = (skillLevel) => {
    switch (skillLevel) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#757575';
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={styles.errorTitle}>Recipe Not Found</h2>
        <p style={styles.errorText}>{error || 'The recipe you are looking for does not exist.'}</p>
        <button style={styles.backButton} onClick={() => navigate('/search')}>
          ← Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header with Back Button */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/search')}>
          ← Back to Recipes
        </button>
        <h1 style={styles.title}>{recipe.recipeName}</h1>
            <button 
              style={styles.favoriteButton}
              onClick={handleWishlistClick}
              title={user ? (isInWishlist(recipe._id) ? 'Remove from wishlist' : 'Add to wishlist') : 'Sign in to add to wishlist'}
            >
              {isInWishlist(recipe._id) ? '❤️' : '🤍'}
            </button>
      </div>

      {/* Recipe Content */}
      <div style={styles.content}>
        {/* Left Column - Image and Stats */}
        <div style={styles.leftColumn}>
          <div style={styles.imageContainer}>
            <img 
              src={`http://localhost:3001/uploads/${recipe.image}`} 
              alt={recipe.recipeName}
              style={styles.recipeImage}
            />
          </div>

          {/* Recipe Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>⏱️</span>
              <div style={styles.statContent}>
                <span style={styles.statLabel}>Cooking Time</span>
                <span style={styles.statValue}>{recipe.cookingTime} min</span>
              </div>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>👥</span>
              <div style={styles.statContent}>
                <span style={styles.statLabel}>Servings</span>
                <span style={styles.statValue}>{recipe.servings}</span>
              </div>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>🔥</span>
              <div style={styles.statContent}>
                <span style={styles.statLabel}>Calories</span>
                <span style={styles.statValue}>{recipe.calories}</span>
              </div>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>🍽️</span>
              <div style={styles.statContent}>
                <span style={styles.statLabel}>Cuisine</span>
                <span style={styles.statValue}>{recipe.cuisine}</span>
              </div>
            </div>
          </div>

          {/* Difficulty and Skill Level */}
          <div style={styles.badgesContainer}>
            <div 
              style={{
                ...styles.badge,
                backgroundColor: getDifficultyColor(recipe.difficulty)
              }}
            >
              {recipe.difficulty}
            </div>
            <div 
              style={{
                ...styles.badge,
                backgroundColor: getSkillLevelColor(recipe.skillLevel)
              }}
            >
              {recipe.skillLevel}
            </div>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div style={styles.tagsContainer}>
              <h3 style={styles.tagsTitle}>Tags</h3>
              <div style={styles.tagsList}>
                {recipe.tags.map((tag, index) => (
                  <span key={index} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Recipe Details */}
        <div style={styles.rightColumn}>
          <div style={styles.description}>
            <h2 style={styles.sectionTitle}>Description</h2>
            <p style={styles.descriptionText}>{recipe.description}</p>
          </div>

          {/* Ingredients */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Ingredients</h2>
            <ul style={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} style={styles.ingredientItem}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Instructions</h2>
            <div style={styles.instructionsList}>
              {recipe.instructions.map((instruction, index) => (
                <div key={index} style={styles.instructionItem}>
                  {instruction}
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Information */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Nutritional Information</h2>
            <div style={styles.nutritionGrid}>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Calories</span>
                <span style={styles.nutritionValue}>{recipe.calories}</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Protein</span>
                <span style={styles.nutritionValue}>{recipe.protein}g</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Carbs</span>
                <span style={styles.nutritionValue}>{recipe.carbs}g</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Fat</span>
                <span style={styles.nutritionValue}>{recipe.fat}g</span>
              </div>
            </div>
          </div>

          {/* Equipment */}
          {recipe.equipment && recipe.equipment.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Equipment Needed</h2>
              <div style={styles.equipmentList}>
                {recipe.equipment.map((item, index) => (
                  <div key={index} style={styles.equipmentItem}>
                    <span style={styles.equipmentIcon}>🔧</span>
                    <span style={styles.equipmentText}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Restrictions */}
          {recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Dietary Information</h2>
              <div style={styles.dietaryTags}>
                {recipe.dietaryRestrictions.map((restriction, index) => (
                  <span key={index} style={styles.dietaryTag}>
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #ff6b6b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '18px',
    color: '#7f8c8d',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: '32px',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  errorText: {
    fontSize: '18px',
    color: '#7f8c8d',
    marginBottom: '30px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
    padding: '0 20px',
  },
  backButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: 0,
    textAlign: 'center',
    flex: 1,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  imageContainer: {
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  recipeImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  statIcon: {
    fontSize: '24px',
    width: '40px',
    textAlign: 'center',
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2c3e50',
  },
  badgesContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  badge: {
    color: 'white',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tagsContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
  },
  tagsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 15px 0',
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  tag: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '500',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  description: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 20px 0',
    borderBottom: '3px solid #ff6b6b',
    paddingBottom: '10px',
  },
  descriptionText: {
    fontSize: '16px',
    color: '#7f8c8d',
    lineHeight: '1.6',
    margin: 0,
  },
  ingredientsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  ingredientItem: {
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '16px',
    color: '#2c3e50',
    position: 'relative',
    paddingLeft: '30px',
  },
  instructionsList: {
    padding: 0,
    margin: 0,
  },
  instructionItem: {
    padding: '15px 0',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '16px',
    color: '#2c3e50',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  nutritionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '20px',
  },
  nutritionItem: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
  },
  nutritionLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '8px',
    fontWeight: '600',
  },
  nutritionValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
  },
  equipmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  equipmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  equipmentIcon: {
    fontSize: '20px',
  },
  equipmentText: {
    fontSize: '16px',
    color: '#2c3e50',
    fontWeight: '500',
  },
  dietaryTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  dietaryTag: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
};

export default RecipePage;
