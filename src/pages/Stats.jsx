import React from 'react';
import { BarChart2 } from 'lucide-react';

const Stats = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', alignSelf: 'flex-start', marginBottom: '40px' }}>
        My Stats
      </h1>
      
      <div style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', flex: 1, marginTop: '60px', opacity: 0.7
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          backgroundColor: 'rgba(255, 139, 61, 0.1)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          marginBottom: '20px'
        }}>
          <BarChart2 size={40} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>No Stats Available</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.95rem' }}>
          Abhi koi stats nahi hain. Apki performance details yahan show hongi jab aap orders complete karenge.
        </p>
      </div>
    </div>
  );
};

export default Stats;
