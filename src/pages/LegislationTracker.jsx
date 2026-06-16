import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const LegislationTracker = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(`https://og-be-1.onrender.com/api/legislation?search=${search}`);
        const data = await res.json();
        setBills(data);
      } catch (err) {
        console.error(err);
      }
    };
    
    // Debounce search slightly
    const timeout = setTimeout(fetchBills, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <h1 className="text-gradient">Legislation Tracker</h1>
      <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '2rem'}}>Track and search recent bills introduced in the Indian Parliament.</p>
      
      <div className="search-container">
        <div style={{position: 'relative', flex: 1, maxWidth: '500px'}}>
          <Search size={18} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}} />
          <input 
            type="text" 
            placeholder="Search bills by title or summary..." 
            className="input-field" 
            style={{paddingLeft: '3rem'}}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill Title</th>
                <th>House</th>
                <th>Introduced</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.length > 0 ? bills.map(bill => (
                <tr key={bill.id}>
                  <td>
                    <div style={{fontWeight: '600', marginBottom: '0.25rem'}}>
                      <a href={bill.source_url} target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s'}} onMouseOver={(e) => e.target.style.color = 'var(--accent-blue)'} onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}>
                        {bill.title}
                      </a>
                    </div>
                    <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '0.5rem'}}>
                      {bill.summary}
                    </div>
                    <div style={{fontSize: '0.75rem', color: 'var(--accent-blue)'}}>
                      Source: <a href={bill.source_url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>{bill.source_name || 'PRS Legislative'}</a>
                    </div>
                  </td>
                  <td>{bill.house}</td>
                  <td>{new Date(bill.date_introduced).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td>
                    <span className={`status-badge ${bill.status === 'Passed' ? 'status-passed' : 'status-pending'}`}>
                      {bill.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>No bills found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LegislationTracker;
