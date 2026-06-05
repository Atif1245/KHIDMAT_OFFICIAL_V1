import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CreditCard, MapPin, Clock, Save, ArrowLeft, Camera, User, Phone } from 'lucide-react';
import { API_BASE } from '../api';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    cnic: '',
    address: '',
    timings: '',
    about: ''
  });

  const [profilePic, setProfilePic] = useState(localStorage.getItem(`profilePic_${userId}`) || null);

  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE}/api/providers/profile/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setFormData({
              name: data.name || '',
              phone: data.phone || '',
              experience: data.experience || '',
              cnic: data.cnic || '',
              address: data.address || '',
              timings: data.timings || '',
              about: data.about || ''
            });
          }
        })
        .catch(err => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        // Save base64 image to local storage immediately
        localStorage.setItem(`profilePic_${userId}`, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Sending data for User ID:", userId);

    try {
      const response = await fetch(`${API_BASE}/api/providers/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Shabash! Aapki Profile Database mein save ho gayi hai.");
        navigate('/provider-profile');
      } else {
        const errorData = await response.json();
        alert("Ghalti: " + (errorData.message || "Data save nahi ho saka"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Server connect nahi ho raha. Check karein ke backend chal raha hai?");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <ArrowLeft cursor="pointer" onClick={() => navigate(-1)} />
        <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Setup Professional Profile</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <p style={subTextStyle}>Apni professional maloomat darj karein taake grahak aap par bharosa kar sakein.</p>

      {/* Image Upload Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', 
            backgroundColor: 'white', border: '2px solid var(--primary)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera size={40} color="var(--text-muted)" />
            )}
          </div>
          <label style={{ 
            position: 'absolute', bottom: 0, right: 0, 
            backgroundColor: 'var(--primary)', color: 'white', 
            width: '32px', height: '32px', borderRadius: '50%', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <Camera size={16} />
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px' }}>Upload your photo</p>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}><User size={16} /> Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            placeholder="Your full name" 
            style={inputStyle}
            onChange={handleChange}
            required 
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}><Phone size={16} /> Phone Number</label>
          <input 
            type="text" 
            name="phone"
            value={formData.phone}
            placeholder="03XXXXXXXXX" 
            style={inputStyle}
            onChange={handleChange}
            required 
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}><Briefcase size={16} /> Work Experience (Years)</label>
          <input 
            type="number" 
            name="experience"
            value={formData.experience}
            placeholder="e.g. 5" 
            style={inputStyle}
            onChange={handleChange}
            required 
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}><CreditCard size={16} /> CNIC Number</label>
          <input 
            type="text" 
            name="cnic"
            value={formData.cnic}
            placeholder="35201-XXXXXXX-X" 
            style={inputStyle}
            onChange={handleChange}
            required 
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}><MapPin size={16} /> Shop/Home Address</label>
          <input 
            type="text" 
            name="address"
            value={formData.address}
            placeholder="House #, Street, Area" 
            style={inputStyle}
            onChange={handleChange}
            required 
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}><Clock size={16} /> Availability Timings</label>
          <input 
            type="text" 
            name="timings"
            value={formData.timings}
            placeholder="e.g. 9 AM to 6 PM" 
            style={inputStyle}
            onChange={handleChange}
            required 
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>About Your Service (Urdu/English)</label>
          <textarea 
            name="about"
            value={formData.about}
            placeholder="Apne kaam ke baare mein thora batayein..." 
            style={{ ...inputStyle, minHeight: '100px', resize: 'none' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" style={submitButtonStyle}>
          <Save size={20} /> Save Professional Profile
        </button>
      </form>
    </div>
  );
};

const containerStyle = { backgroundColor: 'var(--bg-dark)', minHeight: '100vh', padding: '20px', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const subTextStyle = { fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '20px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' };
const inputStyle = { padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' };
const submitButtonStyle = { marginTop: '20px', padding: '16px', borderRadius: '15px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 139, 61, 0.3)', transition: 'transform 0.2s' };

export default CompleteProfile;