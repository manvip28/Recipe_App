import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import backgroundImage from '../assets/background2.png';

const SignInPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign-In successful:', data);
        await login({ 
          id: data.userId || data.id || Date.now().toString(), // Use actual user ID from backend
          email, 
          name: email.split('@')[0] 
        });
        window.location.href = '/search'; // Redirect to HomePage or desired route
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleNavigateToSignUp = () => {
    window.location.href = '/signup'; // Redirect to SignUpPage
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to discover delicious recipes</p>
        </div>
        
        <form onSubmit={handleSignIn} style={styles.form}>
          {error && <div style={styles.errorContainer}>
            <p style={styles.error}>{error}</p>
          </div>}
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>Don't have an account?</p>
          <button type="button" onClick={handleNavigateToSignUp} style={styles.link}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '400px',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    backgroundColor: '#fff',
    color: '#2c3e50',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '10px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #ecf0f1',
  },
  footerText: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: '0 0 8px 0',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    border: '1px solid #ffcccc',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '10px',
  },
  error: {
    color: '#e74c3c',
    margin: 0,
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default SignInPage;
