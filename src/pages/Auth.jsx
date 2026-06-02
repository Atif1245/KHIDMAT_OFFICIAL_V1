import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { API_BASE } from '../api';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

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
  };

  return (
    <div className="app-wrapper" style={{ backgroundColor: 'var(--bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {/* Top Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ width: '90px', height: '90px', borderRadius: '30px', background: 'linear-gradient(135deg, var(--primary), #00a896)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', boxShadow: '0 10px 25px rgba(0, 115, 96, 0.4)', marginBottom: '20px', fontFamily: "'Noto Nastaliq Urdu', serif", paddingBottom: '12px' }}>
          خ
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', letterSpacing: '2px', margin: '0' }}>
          KHIDMAT
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1rem', fontWeight: '500' }}>
          Aapki Khidmat, Hamari Zimmedari
        </p>
      </div>

      <div className="page-content" style={{ padding: '0 24px', flex: 'none' }}>
        <div className="card" style={{ borderRadius: '32px', paddingTop: '32px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}>
          
          <h2 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 24px 0', textAlign: 'center', fontWeight: '800' }}>
            Welcome Back
          </h2>

          <div style={{ marginBottom: '16px' }}>
            <div className="form-label-row">
              <span className="form-label-en">Email</span>
              <span className="form-label-ur">ای میل</span>
            </div>
            <input 
              type="email" 
              className="form-input" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="form-label-row">
              <span className="form-label-en">Password</span>
              <span className="form-label-ur">پاس ورڈ</span>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-input" 
                placeholder="********" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ paddingRight: '48px' }}
              />
              <div 
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-secondary)' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.85rem', margin: '-10px 0 10px 0', fontWeight: '500' }}>{error}</p>}

          <button 
            onClick={handleLogin} 
            disabled={loading}
            className="btn-primary"
            style={{ opacity: loading ? 0.7 : 1, width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Processing...' : 'Sign In'} &rarr;
          </button>

          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/role" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', marginLeft: '4px' }}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;