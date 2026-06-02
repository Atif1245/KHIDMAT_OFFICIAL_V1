import React, { useState, useEffect } from 'react';
import { Star, Navigation, Phone, Check, X, Wrench, Briefcase, Banknote, User } from 'lucide-react';
import { API_BASE } from '../api';

const ProviderHome = () => {
  const [profile, setProfile] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const userId = localStorage.getItem('userId');
   
  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE}/api/providers/profile/${userId}`)
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.error("Error fetching dashboard data:", err));
    }
  }, [userId]);

  const displayName = profile ? profile.name : "Abdul Rehman";
  const category = profile ? profile.category : "Plumber";

  return (
    <div className="app-wrapper">
      <div className="page-content p-6 pb-24 flex-col">
        
        {/* Profile Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: '0 0 6px 0' }}>
              {displayName} ({category})
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Star size={14} fill="var(--primary)" color="var(--primary)" /> <span style={{ color: '#111827', fontWeight: '700' }}>4.9</span> • 245 jobs completed
            </div>
          </div>
          <div style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '6px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800' }}>
            PRO VERIFIED
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="card p-5 mb-6" style={{ borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: isAvailable ? '6px solid var(--success)' : '6px solid var(--text-muted)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: isAvailable ? 'var(--success)' : 'var(--text-muted)' }}></div>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: isAvailable ? 'var(--success)' : 'var(--text-secondary)' }}>AVAILABLE FOR WORK</span>
            </div>
            <div className="urdu-text" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '20px' }}>
              کام کے لیے دستیاب
            </div>
          </div>
          
          <div onClick={() => setIsAvailable(!isAvailable)} style={{ width: '60px', height: '34px', backgroundColor: isAvailable ? 'var(--success)' : '#e2e8f0', borderRadius: '17px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s' }}>
            <div style={{ width: '26px', height: '26px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '4px', left: isAvailable ? '30px' : '4px', transition: 'left 0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}></div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <div className="card p-4" style={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 123, 107, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Briefcase size={20} color="var(--primary)" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>3</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Jobs Today</div>
          </div>
          <div className="card p-4" style={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Banknote size={20} color="#b45309" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>Rs 4.5k</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Earnings</div>
          </div>
          <div className="card p-4" style={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Star size={20} color="#9333ea" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>4.9</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Rating</div>
          </div>
        </div>

        {/* Current Job */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <h3 style={{ fontSize: '1.1rem', color: '#111827', margin: 0, fontWeight: '700' }}>Current Job</h3>
            <div style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '700', marginLeft: 'auto' }}>
              1 ACTIVE
            </div>
          </div>
          
          <div className="card p-5" style={{ borderRadius: '24px', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0369a1', margin: '0 0 8px 0' }}>Ali</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#0c4a6e', fontWeight: '500' }}>
                  <Navigation size={16} /> DHA Phase 5
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0369a1', marginBottom: '4px' }}>ETA 8m</div>
                <div style={{ fontSize: '0.8rem', color: '#0c4a6e' }}>Distance: 1.2km</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '12px', borderRadius: '16px', border: 'none', backgroundColor: 'white', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Phone size={18} /> Call
              </button>
              <button style={{ flex: 1, padding: '12px', borderRadius: '16px', border: 'none', backgroundColor: 'white', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Navigation size={18} /> Navigate
              </button>
              <button style={{ flex: 1, padding: '12px', borderRadius: '16px', border: 'none', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
                Arrived
              </button>
            </div>
          </div>
        </div>

        {/* New Requests */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800' }}>NEW</div>
            <h3 style={{ fontSize: '1.1rem', color: '#111827', margin: 0, fontWeight: '700' }}>New Requests</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', marginLeft: 'auto', cursor: 'pointer' }}>See all</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Request 1 */}
            <div className="card p-5" style={{ borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e5e7eb', overflow: 'hidden' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Ali</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>DHA Phase 5 • 2.5km away</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '4px' }}>Rs 1,800</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#8b5cf6', backgroundColor: '#f3e8ff', padding: '2px 8px', borderRadius: '8px', display: 'inline-block' }}>Water leak</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ flex: 1, padding: '14px', borderRadius: '20px', border: '2px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
                  <X size={18} /> DECLINE
                </button>
                <button style={{ flex: 1.5, padding: '14px', borderRadius: '20px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
                  <Check size={18} /> ACCEPT
                </button>
              </div>
            </div>

            {/* Request 2 */}
            <div className="card p-5" style={{ borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e5e7eb', overflow: 'hidden' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Sara</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Gulberg • 3.8km away</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '4px' }}>Rs 2,000</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#8b5cf6', backgroundColor: '#f3e8ff', padding: '2px 8px', borderRadius: '8px', display: 'inline-block' }}>AC not cooling</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ flex: 1, padding: '14px', borderRadius: '20px', border: '2px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
                   DECLINE
                </button>
                <button style={{ flex: 1.5, padding: '14px', borderRadius: '20px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
                   ACCEPT
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ProviderHome;