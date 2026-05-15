import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

const ProviderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/providers/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        calculatePercentage(data);
      })
      .catch(err => console.error("Error:", err));
  }, [userId]);

  // Logic to calculate how much profile is complete
  const calculatePercentage = (data) => {
    let score = 0;
    const fields = ['name', 'email', 'experience', 'cnic', 'address', 'timings'];
    fields.forEach(field => {
      if (data[field] && data[field] !== "" && data[field] !== "N/A") {
        score += 1;
      }
    });
    const percent = Math.round((score / fields.length) * 100);
    setCompletion(percent);
  };

  // Luxury Design Colors
  const colors = {
    bg: '#f9f4f1',
    primary: '#d4a373',
    text: '#4a3f35',
    card: '#ffffff',
    shadow: 'rgba(0,0,0,0.05)',
    progressBg: '#eee4dc'
  };

  return (
    <div style={{ 
      backgroundColor: colors.bg, 
      minHeight: '100vh', 
      padding: '40px 20px', 
      fontFamily: "'Outfit', sans-serif",
      color: colors.text,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '5px', letterSpacing: '1px' }}>
          My Profile
        </h1>
        <div style={{ width: '50px', height: '3px', backgroundColor: colors.primary, margin: '0 auto' }}></div>
      </div>

      {/* --- PROGRESS BAR SECTION --- */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: colors.card,
        padding: '15px 20px',
        borderRadius: '20px',
        marginBottom: '20px',
        boxShadow: `0 5px 15px ${colors.shadow}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>Profile Completion</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: colors.primary }}>{completion}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: colors.progressBg, borderRadius: '10px' }}>
          <div style={{ 
            width: `${completion}%`, 
            height: '100%', 
            backgroundColor: colors.primary, 
            borderRadius: '10px',
            transition: 'width 1s ease-in-out' 
          }}></div>
        </div>
        {completion < 100 && (
          <p style={{ fontSize: '11px', marginTop: '10px', color: '#8d7b6d' }}>
            * Please complete your profile to get more orders!
          </p>
        )}
      </div>

      {/* Main Profile Card */}
      <div style={{
        backgroundColor: colors.card,
        width: '100%',
        maxWidth: '400px',
        borderRadius: '30px',
        padding: '30px',
        boxShadow: `0 10px 30px ${colors.shadow}`,
        textAlign: 'center'
      }}>
        
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          backgroundColor: 'var(--bg-dark)', margin: '0 auto 20px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          border: `2px solid var(--primary)`, overflow: 'hidden'
        }}>
          {localStorage.getItem(`profilePic_${userId}`) ? (
            <img src={localStorage.getItem(`profilePic_${userId}`)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '30px' }}>👤</span>
          )}
        </div>

        {profile ? (
          <div style={{ textAlign: 'left' }}>
            <div style={fieldStyle}>
              <p style={labelStyle}>FULL NAME</p>
              <p style={valueStyle}>{profile.name || 'N/A'}</p>
            </div>

            <div style={fieldStyle}>
              <p style={labelStyle}>EMAIL ADDRESS</p>
              <p style={valueStyle}>{profile.email || 'N/A'}</p>
            </div>

            <div style={fieldStyle}>
              <p style={labelStyle}>EXPERIENCE</p>
              <p style={valueStyle}>{profile.experience ? `${profile.experience} Years` : 'Not Set'}</p>
            </div>

            <div style={{...fieldStyle, border: 'none'}}>
              <p style={labelStyle}>MEMBER ID</p>
              <p style={valueStyle}>#00{userId}</p>
            </div>
          </div>
        ) : (
          <p>Loading luxury profile...</p>
        )}
      </div>

      {/* Buttons Section */}
      <div style={{ marginTop: '30px', width: '100%', maxWidth: '400px', display: 'flex', gap: '15px' }}>
        <button 
          onClick={() => navigate('/provider-home')}
          style={buttonStyle(false, colors)}
        >
          Go Back
        </button>
        <button 
          style={buttonStyle(true, colors)}
          onClick={() => navigate('/complete-profile')}
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};

// Reusable Styles
const fieldStyle = { padding: '15px 0', borderBottom: '1px solid #f0f0f0' };
const labelStyle = { fontSize: '10px', fontWeight: '700', color: '#bdae9e', letterSpacing: '1.5px', marginBottom: '5px' };
const valueStyle = { fontSize: '16px', fontWeight: '500', margin: '0' };

const buttonStyle = (isPrimary, colors) => ({
  flex: 1,
  padding: '15px',
  borderRadius: '15px',
  border: isPrimary ? 'none' : `1px solid ${colors.primary}`,
  backgroundColor: isPrimary ? colors.primary : 'transparent',
  color: isPrimary ? 'white' : colors.primary,
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
});

export default ProviderProfile;