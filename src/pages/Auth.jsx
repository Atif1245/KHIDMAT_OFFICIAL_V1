import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

const Auth = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password || (tab === 'signup' && !name)) {
      setError('Please fill in all fields');
      return;
    }

    if (tab === 'login') {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userRole', data.user.role);
          if (data.user.role === 'provider') navigate('/provider-home');
          else navigate('/customer-home');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setError('Server connect nahi ho raha. Backend terminal check karein?');
      } finally {
        setLoading(false);
      }
    } else {
      // Signup ke liye data agle page (Role Selection) par bhej rahe hain
      navigate('/role', { state: { name, email, password } });
    }
  };

  return (
    <div style={containerStyle}>
      {/* Top Section */}
      <div style={topSectionStyle}>
        <div style={logoContainerStyle}>
          <div style={logoIconStyle}>خ</div>
        </div>
        <h1 style={titleStyle}>KHIDMAT</h1>
        <p style={subtitleStyle}>Aapki Khidmat, Hamari Zimmedari</p>
      </div>

      {/* Form Card */}
      <div style={cardStyle}>
        <div style={tabContainerStyle}>
          <div 
            onClick={() => setTab('login')} 
            style={{ ...tabStyle, borderBottom: tab === 'login' ? '3px solid #d4a373' : '3px solid transparent', color: tab === 'login' ? '#4a3f35' : '#8d7b6d' }}
          >
            Login
          </div>
          <div 
            onClick={() => setTab('signup')} 
            style={{ ...tabStyle, borderBottom: tab === 'signup' ? '3px solid #d4a373' : '3px solid transparent', color: tab === 'signup' ? '#4a3f35' : '#8d7b6d' }}
          >
            Signup
          </div>
        </div>

        <div style={formContainerStyle}>
          {tab === 'signup' && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={inputStyle} 
            />
          )}
          <input 
            type="email" 
            placeholder="E-mail Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={inputStyle} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={inputStyle} 
          />

          {error && <p style={errorStyle}>{error}</p>}

          <button 
            onClick={handleAuth} 
            disabled={loading}
            style={{ ...submitButtonStyle, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Processing...' : (tab === 'login' ? 'LOGIN' : 'CONTINUE')}
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = { 
  backgroundColor: '#f9f4f1', 
  minHeight: '100vh', 
  color: '#4a3f35', 
  fontFamily: "'Outfit', sans-serif",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '20px'
};

const topSectionStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  marginBottom: '40px' 
};

const logoContainerStyle = { 
  width: '80px', 
  height: '80px', 
  borderRadius: '50%', 
  backgroundColor: 'white',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  boxShadow: '0 8px 16px rgba(212, 163, 115, 0.2)'
};

const logoIconStyle = { 
  color: '#d4a373', 
  fontSize: '2.5rem', 
  paddingBottom: '8px' 
};

const titleStyle = { 
  fontSize: '2rem', 
  fontWeight: 'bold', 
  marginTop: '16px',
  color: '#4a3f35',
  letterSpacing: '2px'
};

const subtitleStyle = {
  fontSize: '0.9rem',
  color: '#8d7b6d',
  marginTop: '8px'
};

const cardStyle = { 
  background: 'white', 
  borderRadius: '24px', 
  padding: '32px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto'
};

const tabContainerStyle = { 
  display: 'flex', 
  marginBottom: '32px',
  borderBottom: '1px solid #eee'
};

const tabStyle = { 
  flex: 1, 
  textAlign: 'center', 
  paddingBottom: '12px', 
  cursor: 'pointer', 
  fontWeight: '600',
  transition: 'all 0.3s ease'
};

const formContainerStyle = { 
  display: 'flex', 
  flexDirection: 'column',
  gap: '16px'
};

const inputStyle = { 
  padding: '16px', 
  borderRadius: '12px', 
  border: '1px solid #eee', 
  backgroundColor: '#fafafa', 
  fontSize: '1rem', 
  outline: 'none', 
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
  color: '#4a3f35',
  fontFamily: "'Outfit', sans-serif"
};

const errorStyle = { 
  color: '#e74c3c', 
  textAlign: 'center', 
  fontSize: '0.85rem',
  margin: '0'
};

const submitButtonStyle = { 
  padding: '16px', 
  borderRadius: '15px', 
  backgroundColor: '#d4a373', 
  color: 'white', 
  border: 'none', 
  fontSize: '1.1rem', 
  fontWeight: '600', 
  cursor: 'pointer', 
  boxShadow: '0 8px 20px rgba(212, 163, 115, 0.4)',
  transition: 'transform 0.2s',
  marginTop: '8px'
};

export default Auth;