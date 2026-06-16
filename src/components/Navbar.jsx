import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Landmark, PieChart, FileText, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <div className="nav-brand">
        <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Landmark size={24} /> OpenGov India
        </h2>
      </div>
      <div className="nav-links">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
        <NavLink to="/budget" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <PieChart size={18} /> Budget
        </NavLink>
        <NavLink to="/legislation" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <FileText size={18} /> Legislation
        </NavLink>
        <button onClick={handleLogout} className="nav-link" style={{ color: 'var(--danger)' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
