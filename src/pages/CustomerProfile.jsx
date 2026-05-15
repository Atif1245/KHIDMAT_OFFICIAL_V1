import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, MapPin, ClipboardList, LogOut, Camera, Save, X } from 'lucide-react';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  // Load initial data
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(localStorage.getItem(`customerPic_${userId}`) || null);
  
  const [formData, setFormData] = useState({
    name: savedUser.name || 'Ahmed Raza',
    email: savedUser.email || 'ahmed@example.com',
    phone: savedUser.phone || '+92 300 1234567'
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem(`customerPic_${userId}`, reader.result);
        // Force reload to update layout header
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real app, send to backend here
    const updatedUser = { ...savedUser, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '0 0 24px 0', background: 'var(--bg)', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ArrowLeft size={24} color="var(--text-primary)" cursor="pointer" onClick={() => navigate(-1)} />
        <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: '600' }}>My Profile</span>
      </div>

      <div style={{ padding: '24px' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', overflow: 'hidden' }}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                formData.name.charAt(0).toUpperCase()
              )}
            </div>
            
            <label style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)', cursor: 'pointer', boxShadow: 'var(--shadow-card)' }}>
              <Camera size={16} color="var(--primary)" />
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>
          
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
              <input 
                className="form-input" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Full Name" 
                style={{ marginBottom: 0, textAlign: 'center' }} 
              />
              <input 
                className="form-input" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="Email Address" 
                style={{ marginBottom: 0, textAlign: 'center' }} 
              />
              <input 
                className="form-input" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                placeholder="Phone Number" 
                style={{ marginBottom: 0, textAlign: 'center' }} 
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={18} style={{margin: '0 auto'}} /></button>
                <button onClick={handleSave} style={{ flex: 3, padding: '10px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}><Save size={18} /> Save</button>
              </div>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {formData.name} 
                <Edit2 size={16} color="var(--primary)" cursor="pointer" onClick={() => setIsEditing(true)} />
              </h1>
              <div style={{ color: 'var(--text-secondary)' }}>{formData.email}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{formData.phone}</div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Saved Addresses */}
          <div>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="var(--primary)" /> Saved Addresses
            </h2>
            <div className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>🏠 Home</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Model Town, House #123</div>
                </div>
                <Edit2 size={16} color="var(--text-secondary)" cursor="pointer" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>🏢 Office</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Gulberg, Main Blvd</div>
                </div>
                <Edit2 size={16} color="var(--text-secondary)" cursor="pointer" />
              </div>
            </div>
          </div>

          <button className="btn-secondary" style={{ color: '#ef4444', marginTop: '16px', background: 'rgba(239, 68, 68, 0.1)', border: 'none' }} onClick={() => { localStorage.clear(); navigate('/'); }}>
            <LogOut size={20} /> Sign Out
          </button>

        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
