import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, ClipboardList, User, Menu, Bell, Settings, LogOut, Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CustomerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [lang, setLang] = useState('English');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Load profile picture from localStorage
    const savedPic = localStorage.getItem(`customerPic_${userId}`);
    if (savedPic) setProfilePic(savedPic);
    
    // Dummy notifications
    setNotifications([
      { id: 1, text: "Your plumber booking is confirmed for tomorrow 10 AM." },
      { id: 2, text: "Rate your recent AC Repair service!" }
    ]);
  }, [userId]);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
    e.currentTarget.style.transform = 'translateX(5px)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.transform = 'translateX(0px)';
  };

  return (
    <>
      <header className="top-header" style={{ position: 'relative', zIndex: 1100 }}>
        {/* Left Side: Three Lines Menu */}
        <Menu 
          size={24} 
          color="var(--text-primary)" 
          cursor="pointer" 
          onClick={() => {
            setShowMenu(!showMenu);
            setShowNotifications(false);
          }} 
        />
        
        <div className="logo-text">
          <div className="kha-logo" style={{ width: '28px', height: '28px', fontSize: '1.2rem' }}>خ</div>
          KHIDMAT
        </div>

        {/* Right Side: Notification & Profile */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }} onClick={() => {
            setShowNotifications(!showNotifications);
            setShowMenu(false);
          }}>
            <Bell size={24} color="var(--text-primary)" cursor="pointer" />
            {notifications.length > 0 && (
              <div style={{
                position: 'absolute', top: '-4px', right: '-4px',
                backgroundColor: 'red', color: 'white', fontSize: '10px',
                fontWeight: 'bold', width: '16px', height: '16px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {notifications.length}
              </div>
            )}
          </div>
          
          <div 
            onClick={() => navigate('/profile')}
            style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              backgroundColor: 'var(--primary)', cursor: 'pointer',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={18} color="white" />
            )}
          </div>
        </div>

        {/* --- NOTIFICATIONS DROPDOWN --- */}
        {showNotifications && (
          <div style={{ ...dropdownStyle, right: '20px', left: 'auto', width: '250px' }}>
            <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px', color: 'var(--text-primary)' }}>Notifications</h4>
            {notifications.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Empty
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {n.text}
                </div>
              ))
            )}
          </div>
        )}

        {/* --- LUXURY DROPDOWN MENU --- */}
        {showMenu && (
          <div style={dropdownStyle}>
            {/* Profile Block */}
            <div 
              style={menuItemBlockStyle} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => { navigate('/profile'); setShowMenu(false); }}
            >
              <div style={iconBoxStyle}><User size={18} color="var(--primary)" /></div>
              <span style={{ fontWeight: '500' }}>My Profile</span>
            </div>

            {/* Language Toggle */}
            <div 
              style={menuItemBlockStyle} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setLang(lang === 'English' ? 'Urdu' : 'English');
                setShowMenu(false);
              }}
            >
              <div style={iconBoxStyle}><Globe size={18} color="var(--primary)" /></div>
              <span style={{ fontWeight: '500' }}>Language: {lang}</span>
            </div>

            {/* Theme Toggle */}
            <div 
              style={menuItemBlockStyle} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                toggleTheme();
              }}
            >
              <div style={iconBoxStyle}>
                {isDarkMode ? <Sun size={18} color="var(--primary)" /> : <Moon size={18} color="var(--primary)" />}
              </div>
              <span style={{ fontWeight: '500' }}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>

            {/* Settings Block */}
            <div 
              style={menuItemBlockStyle} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => { navigate('/settings'); setShowMenu(false); }}
            >
              <div style={iconBoxStyle}><Settings size={18} color="var(--primary)" /></div>
              <span style={{ fontWeight: '500' }}>Settings</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', margin: '8px 0' }}></div>

            {/* Logout Block */}
            <div 
              style={{ ...menuItemBlockStyle, color: '#e07a5f' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => { localStorage.clear(); navigate('/'); }}
            >
              <div style={{ ...iconBoxStyle, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}><LogOut size={18} /></div>
              <span style={{ fontWeight: '600' }}>Sign Out</span>
            </div>
          </div>
        )}
      </header>

      {/* Overlay to close menu when clicking outside */}
      {(showMenu || showNotifications) && (
        <div 
          onClick={() => { setShowMenu(false); setShowNotifications(false); }} 
          style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
        />
      )}

      <div className="page-content">
        <Outlet />
      </div>

      <nav className="bottom-nav">
        <NavLink to="/customer-home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Search size={24} />
          <span>Search</span>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ClipboardList size={24} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

// --- STYLES ---

const dropdownStyle = {
  position: 'absolute',
  top: '65px',
  left: '20px',
  backgroundColor: 'var(--bg-card)',
  borderRadius: '20px',
  boxShadow: 'var(--shadow-card)',
  padding: '12px',
  zIndex: 1101,
  minWidth: '220px',
  border: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const menuItemBlockStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  cursor: 'pointer',
  fontSize: '0.95rem',
  color: 'var(--text-primary)',
  borderRadius: '15px',
  transition: 'all 0.3s ease'
};

const iconBoxStyle = {
  width: '35px',
  height: '35px',
  borderRadius: '10px',
  backgroundColor: 'var(--bg-dark)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default CustomerLayout;
