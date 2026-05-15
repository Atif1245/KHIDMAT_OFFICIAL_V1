import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const providerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1048/1048315.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const Tracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const provider = location.state?.provider || { 
    name: 'Muhammad Ali', 
    category: 'Plumber', 
    latitude: 31.5250, 
    longitude: 74.3600,
    phone: '03001234567'
  };
  
  const distanceKm = 2.5; 
  const customerLat = provider.latitude - 0.015;
  const customerLng = provider.longitude - 0.010;
  const [eta, setEta] = useState(15);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const mapCenter = [(provider.latitude + customerLat) / 2, (provider.longitude + customerLng) / 2];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ padding: '20px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1000, position: 'relative' }}>
        <ArrowLeft size={24} color="#333" onClick={() => navigate('/customer-home')} style={{ cursor: 'pointer' }} />
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Live Tracking</span>
      </div>

      {/* Map Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[customerLat, customerLng]}><Popup>You</Popup></Marker>
          <Marker position={[provider.latitude, provider.longitude]} icon={providerIcon}><Popup>{provider.name}</Popup></Marker>
          <Polyline positions={[[customerLat, customerLng], [provider.latitude, provider.longitude]]} color="#FF8B3D" weight={4} dashArray="10, 10" />
        </MapContainer>

        {/* Info Card */}
        <div style={{ position: 'absolute', bottom: '20px', left: '15px', right: '15px', background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', zIndex: 1000 }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Estimated Arrival</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{eta} mins</div>
              <div style={{ fontSize: '0.75rem', color: '#FF8B3D' }}>{distanceKm} km away</div>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Navigation size={22} color="#FF8B3D" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #eee', paddingTop: '15px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{provider.name}</h4>
              <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>{provider.category}</p>
            </div>

            {/* ACTION BUTTONS (Chat & Phone) */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* CHAT BUTTON */}
              <button 
                onClick={() => navigate('/chat', { state: { provider } })}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FF8B3D', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(255,139,61,0.3)' }}
              >
                <MessageSquare size={18} color="#fff" />
              </button>

              {/* PHONE BUTTON */}
              <a 
                href={`tel:${provider.phone}`}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <Phone size={18} color="#fff" />
              </a>
            </div>
          </div>
          
          {eta === 0 && (
            <div style={{ marginTop: '15px', padding: '10px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.85rem', fontWeight: '600' }}>
              <CheckCircle size={16} /> Provider has arrived!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;