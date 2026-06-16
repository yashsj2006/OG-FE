import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card glass-panel">
        <h1 className="text-gradient" style={{display: 'flex', justifyContent: 'center', gap: '0.5rem'}}><Landmark /> OpenGov</h1>
        <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem'}}>Welcome back</p>
        {error && <p style={{color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center'}}>{error}</p>}
        <form onSubmit={handleLogin} className="auth-form">
          <input type="email" placeholder="Email" className="input-field" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>Login</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)'}}>
          Don't have an account? <Link to="/register" style={{color: 'var(--accent-blue)'}}>Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
