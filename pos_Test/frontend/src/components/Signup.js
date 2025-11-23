import React from 'react';
import './Login.css';

const Signup = ({ onSwitchToLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Sign up is currently disabled in demo mode.</p>
        </div>

        <div className="demo-accounts">
          <p><strong>Please use these demo accounts:</strong></p>
          <p>Admin: admin@pos.com / password123</p>
          <p>Seller: seller@pos.com / password123</p>
        </div>

        <div className="login-links">
          <button 
            type="button"
            className="link-button"
            onClick={onSwitchToLogin}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;