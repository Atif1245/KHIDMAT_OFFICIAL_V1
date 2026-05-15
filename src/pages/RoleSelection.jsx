import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

const RoleSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Signup page se jo data aaya usay pakarna
  const { name, email, password } = location.state || {};

  const handleRoleSelect = async (role) => {
    // Agar data missing ho toh wapas bhej dein
    if (!name || !email || !password) {
      alert("Registration data missing. Please start again.");
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      console.log("Sending data to:", `${API_BASE}/api/auth/register`);
      
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Mubarak ho! Registration Successful.");
        navigate('/auth'); 
      } else {
        alert(data.message || "Registration failed. Try a different email.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Fetch failed! Connection nahi ho rahi. Check karein ke Backend terminal 'Online' dikha raha hai?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Who are you?</h2>
      <p style={subtitleStyle}>Please select your role to continue</p>
      
      {/* Customer Button */}
      <button 
        disabled={loading}
        onClick={() => handleRoleSelect('customer')} 
        style={{ ...cardButtonStyle, opacity: loading ? 0.6 : 1 }}
      >
        <div style={iconContainerStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <div style={textContainerStyle}>
          <h3 style={cardTitleStyle}>I need services</h3>
          <p style={cardSubtitleStyle}>Find and book professionals for your work</p>
        </div>
      </button>

      {/* Provider Button */}
      <button 
        disabled={loading}
        onClick={() => handleRoleSelect('provider')} 
        style={{ ...cardButtonStyle, opacity: loading ? 0.6 : 1 }}
      >
        <div style={iconContainerStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        </div>
        <div style={textContainerStyle}>
          <h3 style={cardTitleStyle}>I provide services</h3>
          <p style={cardSubtitleStyle}>Offer your professional skills and earn money</p>
        </div>
      </button>

      {loading && <p style={loadingStyle}>Connecting to KHIDMAT Server...</p>}
    </div>
  );
};

const containerStyle = { 
  backgroundColor: '#f9f4f1', 
  color: '#4a3f35', 
  height: '100vh', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'center',
  fontFamily: "'Outfit', sans-serif",
  padding: '20px'
};

const titleStyle = { 
  fontSize: '2.2rem', 
  marginBottom: '8px',
  fontWeight: '700',
  color: '#4a3f35'
};

const subtitleStyle = { 
  color: '#8d7b6d', 
  marginBottom: '40px',
  fontSize: '1rem'
};

const cardButtonStyle = { 
  display: 'flex',
  alignItems: 'center',
  margin: '12px 0', 
  padding: '20px', 
  width: '100%', 
  maxWidth: '380px',
  cursor: 'pointer', 
  borderRadius: '20px', 
  backgroundColor: 'white', 
  border: '1px solid #eee',
  transition: 'all 0.2s ease',
  textAlign: 'left',
  boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
};

const iconContainerStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#fcf8f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
  flexShrink: 0
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const cardTitleStyle = { 
  margin: '0 0 4px 0', 
  color: '#4a3f35',
  fontSize: '1.2rem',
  fontWeight: '600'
};

const cardSubtitleStyle = { 
  margin: 0, 
  fontSize: '0.9rem', 
  color: '#8d7b6d',
  lineHeight: '1.4'
};

const loadingStyle = { 
  marginTop: '24px', 
  color: '#d4a373',
  fontWeight: '500'
};

export default RoleSelection;