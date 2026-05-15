import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, ShieldCheck, CheckCircle, MessageCircle } from 'lucide-react';

const ProviderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider;

  if (!provider) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>Provider details not found. Please go back and select a provider again.</p>
        <button onClick={() => navigate(-1)} className="btn-primary" style={{ marginTop: '16px' }}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px', backgroundColor: 'var(--bg)' }}>
      {/* Header Image / Color Block */}
      <div style={{ height: '150px', backgroundColor: 'var(--primary)', position: 'relative' }}>
        <div 
          onClick={() => navigate(-1)} 
          style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(5px)' }}
        >
          <ArrowLeft size={24} />
        </div>
      </div>

      <div style={{ padding: '0 24px', position: 'relative', top: '-50px' }}>
        {/* Profile Info Card */}
        <div className="card" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg-dark)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '4px solid var(--bg-card)', boxShadow: 'var(--shadow-card)' }}>
            👤
          </div>
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{provider.name || 'Professional'}</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>{provider.category || 'General Service'}</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" /> 4.8 (120 reviews)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#10b981' }}>
              <ShieldCheck size={16} color="#10b981" /> Verified
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/chat')} style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              <MessageCircle size={18} /> Message
            </button>
            <button onClick={() => navigate('/booking', { state: { provider } })} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <CheckCircle size={18} /> Book Now
            </button>
          </div>
        </div>

        {/* About Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '12px' }}>About</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {provider.about || `${provider.name} is a highly skilled and experienced ${provider.category || 'professional'}. Dedicated to providing the best quality service with 100% customer satisfaction.`}
          </p>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div className="card" style={{ padding: '16px', marginBottom: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              💰
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pricing</span>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{provider.price_range || 'Rs. 1000/hr'}</strong>
          </div>

          <div className="card" style={{ padding: '16px', marginBottom: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Clock size={16} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Experience</span>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{provider.experience || '3'} Years</strong>
          </div>

          <div className="card" style={{ padding: '16px', marginBottom: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <MapPin size={16} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Location</span>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Local Area</strong>
          </div>

          <div className="card" style={{ padding: '16px', marginBottom: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255, 139, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              ⭐
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rating</span>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>4.8 / 5.0</strong>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProviderDetails;
