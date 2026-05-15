 import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { API_BASE } from '../api';

const ProviderHome = () => {
  // State for real profile data
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem('userId');
   
  useEffect(() => {
    // Database se data fetch kar rahe hain
    if (userId) {
      fetch(`${API_BASE}/api/providers/profile/${userId}`)
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.error("Error fetching dashboard data:", err));
    }
  }, [userId]);

  // Agar name nahi mila toh placeholder dikhayenge
  const displayName = profile ? profile.name : "Provider";

  return (
    <div style={{ padding: '20px 24px' }}>
      
      {/* Dynamic Welcome Section */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          👋 Hello, {displayName}!
        </h1>
        <div className="urdu-text" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          خوش آمدید، {displayName}!
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '12px' }}>📊 Today's Summary</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="card" style={{ flex: 1, padding: '16px', marginBottom: 0, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>3</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Leads</div>
          </div>
          <div className="card" style={{ flex: 1, padding: '16px', marginBottom: 0, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--warning)' }}>2</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pending</div>
          </div>
          <div className="card" style={{ flex: 1, padding: '16px', marginBottom: 0, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>4.8⭐</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rating</div>
          </div>
        </div>
      </div>

      {/* New Requests Section (Same as your UI) */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>📞 New Requests (2)</h2>
          <span className="urdu-text" style={{ color: 'var(--text-secondary)' }}>نئی درخواستیں</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Ahmed - Model Town Request */}
          <div className="card" style={{ padding: '16px', marginBottom: 0, borderLeft: '3px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>🆕 Ahmed - Model Town</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5 min ago</div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', background: 'var(--bg-card-hover)', padding: '12px', borderRadius: '8px' }}>
              "Geyser repair chahiye, paani garm nahi ho raha."
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={actionButtonStyle('success')}> <Check size={16} /> Accept </button>
              <button style={actionButtonStyle('danger')}> <X size={16} /> Reject </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Bookings Section */}
      <div>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '16px' }}>📋 Today's Bookings</h2>
        <div className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>10:00 AM - Usman (DHA)</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Water leakage fixed</div>
          </div>
          <div className="badge badge-success">Completed</div>
        </div>
      </div>

    </div>
  );
};

// CSS helper for buttons
const actionButtonStyle = (type) => ({
  flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
  background: type === 'success' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 61, 0, 0.1)',
  border: `1px solid var(--${type})`,
  color: `var(--${type})`
});

export default ProviderHome;