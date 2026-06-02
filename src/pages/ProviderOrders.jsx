import React from 'react';
import { ClipboardList } from 'lucide-react';

const ProviderOrders = () => {
  return (
    <div className="app-wrapper page-content flex-col" style={{ padding: '24px', alignItems: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', alignSelf: 'flex-start', marginBottom: '40px' }}>
        My Orders
      </h1>
      
      <div style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', flex: 1, marginTop: '60px', opacity: 0.7
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          backgroundColor: 'rgba(0, 115, 96, 0.1)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          marginBottom: '20px'
        }}>
          <ClipboardList size={40} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>No Orders Yet</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.95rem' }}>
          Abhi koi order nahi hai. Naye orders ki request yahan par show hongi jab koi customer book karega.
        </p>
      </div>
    </div>
  );
};

export default ProviderOrders;
