import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, AlignLeft, CheckCircle } from 'lucide-react';
import { API_BASE } from '../api';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- REAL-TIME LOGIC START ---
  const todayDate = new Date();
  const dateOptions = { day: 'numeric', month: 'short' };
  
  // Aaj ki date: "Today (8 May)"
  const formattedToday = `Today (${todayDate.toLocaleDateString('en-GB', dateOptions)})`;
  
  // Kal ki date: "9 May"
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(todayDate.getDate() + 1);
  const formattedTomorrow = tomorrowDate.toLocaleDateString('en-GB', dateOptions);

  // Time Slots (Aap yahan mazeed slots add kar sakte hain)
  const timeSlots = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];
  // --- REAL-TIME LOGIC END ---

  const provider = location.state?.provider || { 
    name: 'Muhammad Ali', 
    category: 'Plumber', 
    id: 1,
    latitude: 31.5204, 
    longitude: 74.3587 
  };
  
  const [date, setDate] = useState(formattedToday); // Default real date set kar di
  const [time, setTime] = useState(timeSlots[0]);   // Default pehla slot
  const [issue, setIssue] = useState('');
  const [address, setAddress] = useState('House #123, Street 4, Model Town');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = async () => {
    if (!issue.trim()) {
      setError("Please describe your issue first.");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        setError("Please login first.");
        setLoading(false);
        return;
      }
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: user.id,
          provider_id: provider.id,
          date,
          time,
          issue_description: issue,
          address
        })
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to book.");
      }
    } catch (err) {
      setError("Server error. Check if Backend is running on port 5000");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#fff', minHeight: '100vh', textAlign: 'center' }}>
        <CheckCircle size={80} color="#10B981" style={{ marginBottom: '24px' }} />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Booking Confirmed!</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>{provider.name} will arrive at {time} on {date}.</p>
        
        <button 
          onClick={() => navigate('/tracking', { state: { provider } })} 
          style={{ marginBottom: '16px', width: '100%', maxWidth: '300px', padding: '16px', background: '#FF8B3D', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          TRACK PROVIDER LIVE
        </button>

        <button 
          onClick={() => navigate('/customer-home')} 
          style={{ width: '100%', maxWidth: '300px', padding: '16px', background: 'transparent', border: '1px solid #ddd', color: '#333', borderRadius: '12px', cursor: 'pointer' }}
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ padding: '20px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ArrowLeft size={24} color="#333" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>Confirm Booking</span>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '25px', background: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👤</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>{provider.name}</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '4px 0 0 0' }}>{provider.category}</p>
          </div>
        </div>

        {error && <div style={{ color: '#ef4444', background: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ background: '#fff', padding: '15px', borderRadius: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: '600' }}>
              <Calendar size={18} color="#FF8B3D" /> Date
            </label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} value={date} onChange={e => setDate(e.target.value)}>
              <option value={formattedToday}>{formattedToday}</option>
              <option value={formattedTomorrow}>{formattedTomorrow}</option>
            </select>
          </div>

          <div style={{ background: '#fff', padding: '15px', borderRadius: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: '600' }}>
              <Clock size={18} color="#FF8B3D" /> Time
            </label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} value={time} onChange={e => setTime(e.target.value)}>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div style={{ background: '#fff', padding: '15px', borderRadius: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: '600' }}>
              <AlignLeft size={18} color="#FF8B3D" /> Describe Issue
            </label>
            <textarea 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
              placeholder="E.g. Tap is leaking..."
              value={issue}
              onChange={e => setIssue(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            onClick={handleConfirmBooking} 
            style={{ marginTop: '10px', padding: '18px', background: '#FF8B3D', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'PROCESSING...' : 'CONFIRM BOOKING'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;