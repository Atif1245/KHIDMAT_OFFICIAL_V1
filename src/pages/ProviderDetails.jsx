import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, ShieldCheck, CheckCircle, MessageCircle, Share2, Heart } from 'lucide-react';

const ProviderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider || {
    name: 'Abdul Rehman',
    category: 'Expert Plumber',
    rating: 4.8,
    reviews: 124,
    price_range: 'Rs. 800/hr',
    experience: 5,
    about: 'Professional plumber with over 5 years of experience in residential and commercial plumbing. Specialized in leak detection, pipe repair, and geyser installation.'
  };

  return (
    <div className="app-wrapper">
      
      {/* Custom Header over Image Cover */}
      <div style={{ height: '220px', backgroundColor: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,115,96,0.8))', zIndex: 1 }}></div>
        <img src={`https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop`} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Header Icons */}
        <div style={{ position: 'absolute', top: '16px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
          <button onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(5px)', border: 'none' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(5px)', border: 'none' }}>
              <Share2 size={20} />
            </button>
            <button style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(5px)', border: 'none' }}>
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ padding: '0 24px 100px 24px', position: 'relative', top: '-40px', zIndex: 5 }}>
        
        {/* Profile Info Card */}
        <div className="card" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px', borderRadius: '24px', border: 'none' }}>
          
          <div style={{ position: 'relative', width: '90px', height: '90px', margin: '-60px auto 16px', borderRadius: '50%', border: '4px solid white', backgroundColor: '#e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <img src={`https://ui-avatars.com/api/?name=${provider.name}&background=007360&color=fff&size=100`} alt={provider.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h1 style={{ fontSize: '1.4rem', margin: '0 0 4px 0', color: '#111827', fontWeight: '800' }}>{provider.name}</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--primary)', margin: '0 0 16px 0', fontWeight: '600' }}>{provider.category}</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#111827', fontWeight: '700' }}>
              <Star size={18} color="#f59e0b" fill="#f59e0b" /> {provider.rating} <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>({provider.reviews} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--success)', fontWeight: '700' }}>
              <ShieldCheck size={18} color="var(--success)" /> Verified
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/chat', { state: { provider } })} style={{ flex: 1, padding: '14px', borderRadius: '16px', backgroundColor: 'var(--bg-light)', border: '1px solid var(--border-color)', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700' }}>
              <MessageCircle size={20} /> Message
            </button>
            <button onClick={() => navigate('/booking', { state: { provider } })} className="btn-primary" style={{ flex: 1, padding: '14px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <CheckCircle size={20} /> Book Now
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          
          <div className="card" style={{ padding: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '20px', border: 'none', backgroundColor: 'white' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(0,115,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>💰</span>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Pricing</div>
              <div style={{ fontSize: '1.05rem', color: '#111827', fontWeight: '800' }}>{provider.price_range}</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '20px', border: 'none', backgroundColor: 'white' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(0,115,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Experience</div>
              <div style={{ fontSize: '1.05rem', color: '#111827', fontWeight: '800' }}>{provider.experience} Years</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '20px', border: 'none', backgroundColor: 'white' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(0,115,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <MapPin size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Location</div>
              <div style={{ fontSize: '1.05rem', color: '#111827', fontWeight: '800' }}>2.5 km away</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '20px', border: 'none', backgroundColor: 'white' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(0,115,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <CheckCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Jobs Done</div>
              <div style={{ fontSize: '1.05rem', color: '#111827', fontWeight: '800' }}>340+</div>
            </div>
          </div>
          
        </div>

        {/* About Section */}
        <h2 style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '16px', fontWeight: '800' }}>About {provider.name.split(' ')[0]}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '24px' }}>
          {provider.about}
        </p>

      </div>
    </div>
  );
};

export default ProviderDetails;
