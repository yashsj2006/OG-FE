import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://og-be-1.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
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
        <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem'}}>Create your account</p>
        {error && <p style={{color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center'}}>{error}</p>}
        <form onSubmit={handleRegister} className="auth-form">
          <input type="text" placeholder="Full Name" className="input-field" value={name} onChange={e=>setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="input-field" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>Register</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--accent-blue)'}}>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
