import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');

  const handleRegister = () => {
    // Perform registration logic here
    if (role === 'student') navigate('/student-home');
    else
    navigate('/home');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="register-form">
        <input type="text" placeholder="Name" className="register-input" />
        <input type="email" placeholder="Email" className="register-input" />
        <input type="password" placeholder="Password" className="register-input" />
        <input type="password" placeholder="Confirm Password" className="register-input" />
        <input type="text" placeholder="ID" className="register-input" />
        <input type="text" placeholder="Major" className="register-input" />

        <div className="role-selection">
          <label>
            <input 
              type="radio" 
              value="student" 
              checked={role === 'student'} 
              onChange={() => setRole('student')} 
            />
            Student
          </label>
          <label>
            <input 
              type="radio" 
              value="teacher" 
              checked={role === 'teacher'} 
              onChange={() => setRole('teacher')} 
            />
            Teacher
          </label>
        </div>

        <button onClick={handleRegister} className="register-button">Register</button>
      </div>
      <p className="login-message">Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
};

export default RegisterPage;
