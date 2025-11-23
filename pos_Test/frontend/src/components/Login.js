import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name: 'User', email: formData.email };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="label">Email</div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div className="input-group">
            <div className="label">Password</div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        
        <div className="links">
          <span className="link-text">sign up</span>
          <span className="divider">|</span>
          <span className="link-text">Forgot Password</span>
        </div>
      </div>
    </div>
  );
};

export default Login;