import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import StockManagement from './components/StockManagement';
import SalesReport from './components/SalesReport';
import Sales from './components/Sales'; // เพิ่ม import
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Render หน้าตาม currentPage
  switch (currentPage) {
    case 'sales':
      return <Sales onBack={handleBackToDashboard} />;
    case 'user-management':
      return <UserManagement onBack={handleBackToDashboard} />;
    case 'stock-management':
      return <StockManagement onBack={handleBackToDashboard} />;
    case 'sales-report':
      return <SalesReport onBack={handleBackToDashboard} />;
    default:
      return (
        <Dashboard 
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
        />
      );
  }
}

export default App;