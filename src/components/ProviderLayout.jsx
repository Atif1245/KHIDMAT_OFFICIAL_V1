import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart2, ClipboardList, User, Menu, Bell, Settings, LogOut } from 'lucide-react';
import { API_BASE } from '../api';

const ProviderLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Check if there is a profile picture in localStorage
    const savedPic = localStorage.getItem(`profilePic_${userId}`);
    if (savedPic) {
      setProfilePic(savedPic);
    }
    
    // Simulate fetching notifications
    // Real implementation would fetch from Supabase
    setNotifications([
      { id: 1, text: "Welcome to Khidmat App!" },
      { id: 2, text: "Complete your profile to get orders." }
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
      <div className="page-content" style={{ paddingBottom: '70px' }}>
        <Outlet />
      </div>

      <nav className="bottom-nav">
        <NavLink to="/provider-home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BarChart2 size={24} />
          <span>Stats</span>
        </NavLink>
        <NavLink to="/provider-orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ClipboardList size={24} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/provider-profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

// --- LUXURY STYLES ---

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

export default ProviderLayout;