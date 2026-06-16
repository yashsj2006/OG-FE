import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#f97316'];

const BudgetTracker = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/budget`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-gradient">Budget Allocations</h1>
      <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '2rem'}}>Union Budget 2024-25 Top Sector Allocations (in Crores)</p>
      
      <div className="dashboard-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
        <div className="glass-panel" style={{height: '400px'}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="allocation_crores"
                nameKey="sector"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `₹ ${value.toLocaleString()} Cr`}
                contentStyle={{backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px'}}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel" style={{display: 'flex', flexDirection: 'column'}}>
          <h3 style={{marginBottom: '1rem'}}>Detailed Breakdown</h3>
          <div className="table-container" style={{flex: 1, overflowY: 'auto'}}>
            <table>
              <thead>
                <tr>
                  <th>Sector</th>
                  <th style={{textAlign: 'right'}}>Allocation (₹ Cr)</th>
                  <th style={{textAlign: 'right'}}>Source</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: COLORS[idx % COLORS.length]}}></div>
                      {item.sector}
                    </td>
                    <td style={{textAlign: 'right', fontWeight: '500'}}>{item.allocation_crores.toLocaleString()}</td>
                    <td style={{textAlign: 'right', fontSize: '0.8rem'}}>
                      <a href={item.source_url} target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-blue)', textDecoration: 'underline'}}>
                        {item.source_name || 'Ministry of Finance'}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BudgetTracker;
