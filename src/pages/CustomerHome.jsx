import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Wrench, Zap, Wind, Navigation, User, PaintBucket, Briefcase, MapPin } from 'lucide-react';
import { API_BASE } from '../api';

const CustomerHome = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      navigate('/search', { state: { voiceQuery: 'Plumber' } });
    }, 2000);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const categories = [
    { name: 'Cleaning', icon: <span style={{fontSize: '24px'}}>🧹</span>, bg: '#fef08a' },
    { name: 'AC Repair', icon: <Wind size={24} color="#0284c7" />, bg: '#e0f2fe' },
    { name: 'Electrician', icon: <Zap size={24} color="#ca8a04" />, bg: '#fef9c3' },
    { name: 'Plumber', icon: <Wrench size={24} color="#1e3a8a" />, bg: '#dbeafe' },
    { name: 'Painter', icon: <PaintBucket size={24} color="#9333ea" />, bg: '#f3e8ff' }
  ];

  return (
    <div className="app-wrapper">
      <div className="page-content p-6 pb-24 flex-col">
        
        {/* Search Bar */}
        <div className="mb-6" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '48px', paddingRight: '48px', height: '56px', borderRadius: '28px', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', border: 'none' }}
            placeholder="What service do you need?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleSearchClick}
          />
          <div 
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: isListening ? '#ef4444' : 'var(--primary)', cursor: 'pointer', transition: 'color 0.2s' }}
            onClick={handleVoiceSearch}
          >
            <Mic size={20} />
          </div>
        </div>

        {/* Active Tasks */}
        <div className="mb-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827', margin: 0 }}>Active Tasks</h3>
          </div>
          
          <div className="card p-4" style={{ borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={24} color="#1e3a8a" />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Plumbing Repair</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Today, 4:00 PM</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>
                Pending
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate('/my-order')} style={{ width: '100%', padding: '12px', borderRadius: '16px' }}>
              Track Provider
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827', margin: 0 }}>Categories</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>See All</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '8px', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="hide-scrollbar">
            {categories.map((cat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/search')}>
                <div style={{ width: '64px', height: '64px', backgroundColor: cat.bg, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  {cat.icon}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#4b5563' }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomerHome;
