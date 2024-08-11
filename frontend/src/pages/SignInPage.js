import React, { useState } from 'react';
import backgroundImage from '../assets/background2.png';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign-In successful:', data);
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
      <form onSubmit={handleSignIn} style={styles.form}>
        <h2>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign In</button>
        <button type="button" onClick={handleNavigateToSignUp} style={styles.link}>Create Account</button>
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'green',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  link: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default SignInPage;
