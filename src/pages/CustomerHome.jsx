               import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Wrench, Zap, Smartphone, Wind, ChevronRight, MessageCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { API_BASE } from '../api';

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CustomerHome = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get User Name from localStorage
  const savedUser = localStorage.getItem('user');
  const userName = savedUser ? JSON.parse(savedUser).name : 'Customer';

  useEffect(() => {
    fetch(`${API_BASE}/api/providers/nearby`)
      .then(res => res.json())
      .then(data => {
        setProviders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching providers:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 1, name: 'Plumber', nameUrdu: 'پلمبر', icon: <Wrench /> },
    { id: 2, name: 'Electrician', nameUrdu: 'الیکٹریشن', icon: <Zap /> },
    { id: 3, name: 'Tutor', nameUrdu: 'ٹیوٹر', icon: <span style={{fontSize: '24px'}}>📖</span> },
    { id: 4, name: 'Maid', nameUrdu: 'ملازمہ', icon: <span style={{fontSize: '24px'}}>🧹</span> },
    { id: 5, name: 'AC Repair', nameUrdu: 'اے سی', icon: <Wind /> },
    { id: 6, name: 'Mechanic', nameUrdu: 'مکینک', icon: <Wrench /> },
    { id: 7, name: 'Phone', nameUrdu: 'فون', icon: <Smartphone /> },
    { id: 8, name: 'Painter', nameUrdu: 'پینٹر', icon: <span style={{fontSize: '24px'}}>🎨</span> }
  ];

  const cities = [
    "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Peshawar", 
    "Quetta", "Multan", "Faisalabad", "Gujranwala", "Sialkot"
  ];

  // Map Center (could be dynamic based on city)
  const centerPosition = [31.5204, 74.3587];

  // Filter providers based on category
  const filteredProviders = providers.filter(pro => {
    // If a category is selected, filter by it. Otherwise show all.
    if (selectedCategory) {
      const proCat = (pro.category || 'General Service').toLowerCase();
      return proCat.includes(selectedCategory.toLowerCase());
    }
    return true;
  });

  return (
    <div style={{ padding: '0 24px 100px 24px', overflowY: 'auto' }}>
      
      {/* Welcome Section */}
      <div style={{ marginBottom: '24px', marginTop: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
          👋 Hello, {userName}!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          What service do you need today?
        </p>
      </div>

      {/* Location Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
        <MapPin size={18} color="var(--primary)" />
        <span style={{ fontSize: '0.9rem' }}>Location:</span>
        <select 
          className="form-input" 
          style={{ marginBottom: 0, padding: '8px 12px', background: 'transparent', border: 'none', boxShadow: 'none', fontWeight: '600', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>     

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '32px' }} onClick={() => navigate('/search')}>
        <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
        <input 
          type="text" 
          className="form-input" 
          placeholder="Search plumber, electrician..." 
          style={{ paddingLeft: '48px', marginBottom: 0, cursor: 'pointer' }}
          readOnly
        />
      </div>

      {/* Live Map */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📍 Providers Near You
        </h2>
        <div style={{ height: '200px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-color)' }}>
          <MapContainer center={centerPosition} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredProviders.map((pro, index) => {
              // Create a dummy location near Lahore Center if not provided
              const lat = pro.latitude || (31.5204 + (Math.random() - 0.5) * 0.05);
              const lng = pro.longitude || (74.3587 + (Math.random() - 0.5) * 0.05);
              return (
                <Marker key={pro.id || index} position={[lat, lng]}>
                  <Popup>
                    <strong>{pro.name}</strong><br/>
                    {pro.category || 'General Service'} <br/>
                    <div onClick={() => navigate('/provider-details', { state: { provider: pro } })} style={{color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer'}}>Book Now</div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="urdu-text" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
            فوری کیٹیگریز
          </h2>
          {selectedCategory && (
            <span 
              onClick={() => setSelectedCategory(null)} 
              style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Clear Filter
            </span>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id} 
                onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.2s'
                }}
              >
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '16px', 
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'rgba(255,139,61,0.1)' : 'var(--bg-card)',
                  boxShadow: isSelected ? '0 4px 10px rgba(255,139,61,0.2)' : 'none',
                  transition: 'all 0.2s'
                }}>
                  {cat.icon}
                </div>
                <span className="urdu-text" style={{ 
                  fontSize: '0.8rem', 
                  color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 'bold' : 'normal'
                }}>
                  {cat.nameUrdu}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Rated List */}
      <div>
        <h2 className="urdu-text" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedCategory ? `${selectedCategory} Professionals` : '🔥 بہترین پروفیشنلز'}
        </h2>
        
        {loading ? <p>Loading nearby professionals...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredProviders.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                No providers found for this category.
              </p>
            ) : (
              filteredProviders.map((pro, index) => (
                <div key={pro.id || index} className="card" style={{ padding: '16px', display: 'flex', gap: '16px', marginBottom: '0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '32px', background: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    👤
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{pro.name || 'Professional'}</h3>
                      <div className="badge">⭐ 4.8</div>
                    </div>
                    <p className="urdu-text" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                      {pro.category || 'General Service'}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <span>📍 {selectedCity}</span>
                      <span>💰 {pro.price_range || 'Rs. 1000/hr'}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                      <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                        <MessageCircle size={14} /> Msg
                      </button>
                      <button onClick={() => navigate('/provider-details', { state: { provider: pro } })} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'var(--primary)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                        View <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default CustomerHome;
