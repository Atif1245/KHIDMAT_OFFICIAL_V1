import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, LogOut, ChevronLeft, Bell, Shield, CircleHelp } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const sectionStyle = {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    padding: '8px',
    marginBottom: '20px',
    boxShadow: 'var(--shadow-card)'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    cursor: 'pointer',
    borderBottom: '1px solid var(--border-color)',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={{ padding: '20px', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <ChevronLeft size={28} cursor="pointer" onClick={() => navigate(-1)} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginLeft: '10px' }}>Settings</h1>
      </div>

      {/* Account Settings */}
      <div style={sectionStyle}>
        <div style={{ ...itemStyle, borderBottom: 'none' }} onClick={() => navigate('/complete-profile')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '500' }}>Account & Profile</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Update picture, details</div>
            </div>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px', marginLeft: '10px' }}>Preferences</h3>
      <div style={sectionStyle}>
        
        {/* Language */}
        <div style={itemStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>A</span>
            </div>
            <div style={{ fontWeight: '500' }}>Language</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>English / Urdu</div>
        </div>

        {/* Theme Toggle */}
        <div style={itemStyle} onClick={toggleTheme}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div style={{ fontWeight: '500' }}>Dark Mode</div>
          </div>
          {/* Toggle Switch UI */}
          <div style={{ 
            width: '44px', height: '24px', borderRadius: '12px', 
            backgroundColor: isDarkMode ? 'var(--primary)' : '#ccc',
            position: 'relative', transition: 'all 0.3s'
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
              position: 'absolute', top: '2px', left: isDarkMode ? '22px' : '2px',
              transition: 'all 0.3s'
            }}></div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ ...itemStyle, borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Bell size={20} />
            </div>
            <div style={{ fontWeight: '500' }}>Push Notifications</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enabled</div>
        </div>
      </div>

      {/* Other */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px', marginLeft: '10px' }}>Other</h3>
      <div style={sectionStyle}>
        
        <div style={itemStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <CircleHelp size={20} />
            </div>
            <div style={{ fontWeight: '500' }}>Help & Support</div>
          </div>
        </div>

        <div style={itemStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Shield size={20} />
            </div>
            <div style={{ fontWeight: '500' }}>Privacy Policy</div>
          </div>
        </div>

        <div style={itemStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255, 139, 61, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>📄</span>
            </div>
            <div style={{ fontWeight: '500' }}>Terms of Service</div>
          </div>
        </div>
        
        <div style={{ ...itemStyle, borderBottom: 'none', color: 'var(--danger)' }} onClick={handleLogout}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: 'var(--danger)' }}>
              <LogOut size={20} />
            </div>
            <div style={{ fontWeight: '500' }}>Sign Out</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        KHIDMAT App v1.0.0
      </div>

    </div>
  );
};

export default Settings;
