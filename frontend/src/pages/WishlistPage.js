import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Widget from '../components/Widget';
import backgroundImage from '../assets/background2.png';

const WishlistPage = () => {
  const { user, wishlist, removeFromWishlist } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistRecipes, setWishlistRecipes] = useState([]);

  useEffect(() => {
    const fetchWishlistRecipes = async () => {
      if (!user || !user.id) {
        setWishlistRecipes([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/wishlist/${user.id}`);
        if (response.ok) {
          const recipes = await response.json();
          setWishlistRecipes(recipes);
        } else {
          console.error('Failed to fetch wishlist');
          setWishlistRecipes([]);
        }
      } catch (error) {
        console.error('Error fetching wishlist recipes:', error);
        setWishlistRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistRecipes();
  }, [user, wishlist]);

  const handleBackToSearch = () => {
    navigate('/search');
  };

  const handleRemoveFromWishlist = async (recipeId) => {
    await removeFromWishlist(recipeId);
    // Refresh the wishlist after removal
    const response = await fetch(`http://localhost:3001/api/wishlist/${user.id}`);
    if (response.ok) {
      const recipes = await response.json();
      setWishlistRecipes(recipes);
    }
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.background} />
        <div style={styles.loginPrompt}>
          <h2 style={styles.loginTitle}>Please Log In</h2>
          <p style={styles.loginText}>You need to be logged in to view your wishlist.</p>
          <button 
            style={styles.loginButton}
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Background */}
      <div style={styles.background} />

      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBackToSearch}>
          ← Back to Recipes
        </button>
        <h1 style={styles.title}>My Wishlist</h1>
        <div style={styles.wishlistCount}>
          {wishlistRecipes.length} {wishlistRecipes.length === 1 ? 'recipe' : 'recipes'}
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading your wishlist...</p>
          </div>
        ) : wishlistRecipes.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>❤️</div>
            <h2 style={styles.emptyTitle}>Your wishlist is empty</h2>
            <p style={styles.emptyText}>
              Start adding recipes to your wishlist by clicking the heart icon on any recipe!
            </p>
            <button 
              style={styles.exploreButton}
              onClick={handleBackToSearch}
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <div style={styles.recipesGrid}>
            {wishlistRecipes.map((recipe) => (
              <Widget 
                key={recipe._id} 
                dish={recipe}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                isInWishlist={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
  header: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
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
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: 0,
  },
  wishlistCount: {
    fontSize: '16px',
    color: '#7f8c8d',
    fontWeight: '500',
    backgroundColor: '#f8f9fa',
    padding: '8px 16px',
    borderRadius: '20px',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
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
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  emptyText: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: '0 0 30px 0',
    lineHeight: '1.5',
  },
  exploreButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
  },
  loginPrompt: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  loginTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  loginText: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: '0 0 30px 0',
  },
  loginButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export default WishlistPage;
