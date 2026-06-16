import React, { useEffect, useState } from 'react';
import { PieChart, Landmark, FileText, CheckCircle, Newspaper, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalBudget: 0, totalBills: 0 });
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, legRes, newsRes] = await Promise.all([
          fetch('https://og-be-1.onrender.com/api/budget'),
          fetch('https://og-be-1.onrender.com/api/legislation'),
          fetch('https://og-be-1.onrender.com/api/news')
        ]);
        const budgetData = await budgetRes.json();
        const legData = await legRes.json();
        const newsData = await newsRes.json();
        
        const totalBudget = budgetData.reduce((acc, curr) => acc + curr.allocation_crores, 0);
        setStats({ totalBudget, totalBills: legData.length });
        if (newsRes.ok) setNews(newsData);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-gradient">Dashboard</h1>
      <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Overview of Indian Government Data (2024-25)</p>
      
      <div className="dashboard-grid">
        <div className="glass-panel stat-card" onClick={() => navigate('/budget')} style={{cursor: 'pointer'}}>
          <div className="stat-icon"><PieChart /></div>
          <div>
            <h3 style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Total Union Budget Tracked</h3>
            <h2 style={{fontSize: '1.8rem', marginTop: '0.25rem'}}>₹ {(stats.totalBudget / 100000).toFixed(2)} Lakh Cr</h2>
          </div>
        </div>
        <div className="glass-panel stat-card" onClick={() => navigate('/legislation')} style={{cursor: 'pointer'}}>
          <div className="stat-icon"><FileText /></div>
          <div>
            <h3 style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Recent Bills Tracked</h3>
            <h2 style={{fontSize: '1.8rem', marginTop: '0.25rem'}}>{stats.totalBills} Bills</h2>
          </div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{color: 'var(--success)'}}><CheckCircle /></div>
          <div>
            <h3 style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>System Status</h3>
            <h2 style={{fontSize: '1.5rem', marginTop: '0.25rem', color: 'var(--success)'}}>Live & Syncing</h2>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid" style={{gridTemplateColumns: '2fr 1fr', marginTop: '2rem'}}>
        <div className="glass-panel">
          <h2>Welcome to OpenGov India</h2>
          <p style={{marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
            Our mission is to make government data accessible and transparent. 
            Use the navigation above to explore budget allocations across different sectors or 
            track the latest bills and legislations introduced in the Lok Sabha and Rajya Sabha.
          </p>
          <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)'}}>
            <h3 style={{color: 'var(--accent-blue)', marginBottom: '0.5rem'}}>Trust & Transparency</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>
              All data points in OpenGov are now directly linked to their official sources, such as the Ministry of Finance and PRS Legislative Research. Verify the data yourself!
            </p>
          </div>
        </div>
        
        <div className="glass-panel" style={{display: 'flex', flexDirection: 'column', height: '400px'}}>
          <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
            <Newspaper size={20} className="text-gradient" /> Live Civic News
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem'}}>
            {news.length > 0 ? news.map((item) => (
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" style={{display: 'block', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'border-color 0.2s'}}>
                <h4 style={{fontSize: '0.9rem', marginBottom: '0.25rem', lineHeight: '1.4', display: 'flex', gap: '0.25rem'}}>
                  {item.title} <ExternalLink size={12} style={{flexShrink: 0, marginTop: '2px'}}/>
                </h4>
                <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between'}}>
                  <span>{item.source}</span>
                  <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                </div>
              </a>
            )) : (
              <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Loading live updates...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
