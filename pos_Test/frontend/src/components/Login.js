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
        {/* เพิ่ม LOGO และหัวข้อ */}
        <div className="login-header">
          <div className="logo">🛒</div>
          <h1 className="system-title">POS System</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="label">Email</div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="กรอกอีเมลของคุณ"
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
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          
          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;