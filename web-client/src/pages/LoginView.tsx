import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // We will Perform login logic here
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
      <p className="register-message">New to the app? <span className="register-link" onClick={() => navigate('/register')}>Register</span></p>
    </div>
  );
};

export default LoginPage;
