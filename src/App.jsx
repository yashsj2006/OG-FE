import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BudgetTracker from './pages/BudgetTracker';
import LegislationTracker from './pages/LegislationTracker';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const showNav = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="app">
      {showNav && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/budget" element={<PrivateRoute><BudgetTracker /></PrivateRoute>} />
          <Route path="/legislation" element={<PrivateRoute><LegislationTracker /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
