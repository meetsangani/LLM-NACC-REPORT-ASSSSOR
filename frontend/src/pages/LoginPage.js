import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import CSS for styling

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add login logic here
    navigate('/home'); // Redirect to home page after login
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
