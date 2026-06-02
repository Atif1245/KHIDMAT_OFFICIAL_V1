import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, ArrowLeft, ArrowRight } from 'lucide-react';
import { API_BASE } from '../api';

const CustomerSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill required fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          password: formData.password, 
          role: 'customer',
          phone: formData.phone
        })
      });

      const data = await response.json();
      if (response.ok) {
        // Save user info and redirect to customer dashboard
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userRole', data.user.role || 'customer');
        alert("Account Created! Redirecting to your dashboard...");
        navigate('/customer-home');
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Fetch failed! Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="top-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="var(--text-primary)" />
        </button>
        <div className="header-title-center">
          Customer Signup
          <span className="header-title-ur">کسٹمر اکاؤنٹ بنائیں</span>
        </div>
        <div className="logo-text" style={{ fontSize: '1rem', color: '#3b4252' }}>KHIDMAT</div>
      </div>

      <div className="page-content p-6 flex-col">
        {/* Header Card */}
        <div className="header-card-green mb-6">
          <div style={{ maxWidth: '60%', fontSize: '1.1rem', fontWeight: '600', lineHeight: '1.4', position: 'relative', zIndex: 1 }}>
            Find the best professionals nearby.
          </div>
          <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', width: '56px', height: '56px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
            <UserPlus size={28} color="white" />
          </div>
        </div>

        {/* Full Name */}
        <div className="card-sm mb-4">
          <div className="form-label-row">
            <span className="form-label-en">Full Name</span>
            <span className="form-label-ur">پورا نام</span>
          </div>
          <input 
            type="text" 
            name="name"
            className="form-input" 
            placeholder="Enter your full name" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="card-sm mb-4">
          <div className="form-label-row">
            <span className="form-label-en">Phone Number</span>
            <span className="form-label-ur">فون نمبر</span>
          </div>
          <div className="input-with-prefix">
            <span className="input-prefix">+92</span>
            <input 
              type="text" 
              name="phone"
              className="form-input" 
              placeholder="3XX 1234567" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="card-sm mb-4">
          <div className="form-label-row">
            <span className="form-label-en">Email</span>
            <span className="form-label-ur">ای میل</span>
          </div>
          <input 
            type="email" 
            name="email"
            className="form-input" 
            placeholder="example@gmail.com" 
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="card-sm mb-6">
          <div className="form-label-row">
            <span className="form-label-en">Password</span>
            <span className="form-label-ur">پاس ورڈ</span>
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              className="form-input" 
              placeholder="********" 
              value={formData.password}
              onChange={handleChange}
              style={{ paddingRight: '48px' }}
            />
            <button 
              type="button"
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          className="btn-primary" 
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'} <ArrowRight size={20} />
        </button>

        <div className="text-center mt-6" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have account? <Link to="/auth" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
          <div className="urdu-text mt-2" style={{ color: 'var(--text-secondary)' }}>پہلے سے اکاؤنٹ موجود ہے؟ سائن ان کریں</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;