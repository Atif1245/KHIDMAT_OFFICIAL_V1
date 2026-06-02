import React from 'react';
import { Menu, Wrench, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <div className="top-header">
        <button className="icon-btn">
          <Menu size={24} color="var(--text-primary)" />
        </button>
        <h1 className="logo-text">KHIDMAT</h1>
        <button className="text-btn urdu-text" style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>اردو</button>
      </div>

      <div className="page-content p-6 flex-col items-center justify-center text-center">
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#a5b4fc', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wrench size={32} color="#1e3a8a" />
          </div>
        </div>
        
        <h2 className="urdu-text" style={{ fontSize: '2.5rem', color: '#1e3a8a', marginBottom: '8px' }}>خدمت</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Pakistan's Service Marketplace</p>

        <div className="card" style={{ textAlign: 'center', marginBottom: '24px', borderRadius: '24px', padding: '32px 24px' }}>
          <div style={{ backgroundColor: '#f3f4f6', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Wrench size={24} color="#000" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Service Provider</h3>
          <p className="urdu-text" style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '1.1rem' }}>خدمت فراہم کرنے والا</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Main plumber, electrician hoon</p>
          <button className="btn-primary" onClick={() => navigate('/signup/provider')} style={{ padding: '14px' }}>
            Select <ArrowRight size={18} />
          </button>
        </div>

        <div className="card" style={{ textAlign: 'center', marginBottom: '24px', borderRadius: '24px', padding: '32px 24px' }}>
          <div style={{ backgroundColor: '#f3f4f6', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <User size={24} color="#000" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Need a Service</h3>
          <p className="urdu-text" style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '1.1rem' }}>خدمت چاہیے</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Mujhe kaam karne wala chahiye</p>
          <button className="btn-primary" onClick={() => navigate('/signup/customer')} style={{ padding: '14px' }}>
            Select <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <div className="bottom-nav">
        {/* Placeholder bottom nav for visual match, although typically RoleSelection might not have it. The design showed it overlaying or maybe it's part of a tab bar. */}
        <div style={{ position: 'absolute', top: '-60px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#f8f9fa', padding: '4px', borderRadius: '24px', display: 'flex', gap: '8px', boxShadow: 'var(--shadow-sm)' }}>
             <div style={{ background: '#bfdbfe', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', color: '#1e3a8a' }}>English</div>
             <div className="urdu-text" style={{ padding: '6px 16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>اردو</div>
             <div style={{ padding: '6px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Roman</div>
          </div>
        </div>
        
        {/* standard bottom nav items */}
      </div>
    </div>
  );
};

export default RoleSelection;