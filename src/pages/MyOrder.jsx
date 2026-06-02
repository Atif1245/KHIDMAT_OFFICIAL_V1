import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Phone, MessageSquare, X, MapPin, Navigation, Menu, Bell, User, Briefcase, ShieldCheck } from 'lucide-react';

const MyOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      
      {/* Top Header */}
      <div className="top-header" style={{ padding: '16px 20px', backgroundColor: 'var(--bg-light)' }}>
        <button className="icon-btn" style={{ padding: 0 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="var(--text-primary)" />
        </button>
        <div className="header-title-center" style={{ flex: 1 }}>
          Track Order
        </div>
        <div style={{ width: '24px' }}></div> {/* Spacer for centering */}
      </div>

      <div className="page-content p-6 pb-24 flex-col">
        
        {/* Order Confirmed Banner */}
        <div className="card" style={{ backgroundColor: 'var(--primary)', borderRadius: '24px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', color: 'white', border: 'none' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={24} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>Order Confirmed</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Booking ID: #KH-12345</div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="card p-5 mb-6" style={{ borderRadius: '24px' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            {/* Background Line */}
            <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '3px', backgroundColor: '#e5e7eb', zIndex: 1 }}></div>
            {/* Active Line (Partial) */}
            <div style={{ position: 'absolute', top: '20px', left: '10%', width: '40%', height: '3px', backgroundColor: 'var(--primary)', zIndex: 1 }}></div>

            {/* Step 1: Confirm */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '3px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <Check size={20} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>Confirm</span>
            </div>

            {/* Step 2: Assign */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '3px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <Check size={20} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>Assign</span>
            </div>

            {/* Step 3: On Way */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--primary)', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#111827' }}>On Way</span>
            </div>

            {/* Step 4: Complete */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f3f4f6', border: '3px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}></div>
              <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Complete</span>
            </div>
          </div>
        </div>

        {/* Mini Map Placeholder */}
        <div className="card mb-6" style={{ height: '220px', borderRadius: '24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)', backgroundSize: '24px 24px', backgroundColor: '#f9fafb', padding: 0 }}>
          <div style={{ backgroundColor: 'white', padding: '10px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700', color: '#111827', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', zIndex: 5, marginTop: '16px' }}>
            Distance: 2.5 km • <span style={{ color: 'var(--primary)' }}>8 min remaining</span>
          </div>
          
          {/* Mock Path */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <path d="M 120 160 Q 180 180 200 120 T 260 80" fill="none" stroke="var(--primary)" strokeWidth="4" strokeDasharray="8 8" />
          </svg>

          <div style={{ position: 'absolute', top: '65%', left: '30%', width: '48px', height: '48px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid white', boxShadow: '0 4px 15px rgba(0,123,107,0.3)', zIndex: 2 }}>
            <span style={{ fontSize: '20px' }}>🛵</span>
          </div>
          <div style={{ position: 'absolute', top: '35%', right: '25%', width: '48px', height: '48px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 2 }}>
            <MapPin size={24} color="white" />
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Provider Details</h3>

        {/* Provider Profile Card */}
        <div className="card p-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', overflow: 'hidden' }}>
                👨🏽‍🔧
              </div>
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}>
                <ShieldCheck size={20} color="var(--success)" fill="var(--success)" stroke="white" />
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Abdul Rehman</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: '#b45309', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>⭐ 4.8</span> • 
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>ETA 8 min</span>
              </div>
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0,123,107,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Phone size={24} color="var(--primary)" fill="var(--primary)" />
          </div>
        </div>

        {/* Chat Snippet */}
        <div className="card p-4 mb-8" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={20} color="#0284c7" />
          </div>
          <div style={{ flex: 1, fontSize: '0.9rem', fontStyle: 'italic', color: '#475569', fontWeight: '500' }}>
            "Abdul Rehman: I'm on my way..."
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>
            Open Chat &gt;
          </div>
        </div>

        {/* Action Buttons */}
        <button style={{ width: '100%', padding: '16px', borderRadius: '24px', border: '2px solid #ef4444', backgroundColor: 'transparent', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
          Cancel Order
        </button>

      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/customer-home')}>
          <div className="nav-icon"><Briefcase size={24} /></div>
          <span className="nav-label">Home</span>
        </div>
        
        <div className="nav-item active">
          <div className="nav-icon"><Navigation size={24} /></div>
          <span className="nav-label">Bookings</span>
        </div>

        <div className="nav-item" style={{ position: 'relative' }}>
          <div className="nav-icon"><Bell size={24} /></div>
          <div style={{ position: 'absolute', top: '8px', right: '16px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
          <span className="nav-label">Inbox</span>
        </div>

        <div className="nav-item">
          <div className="nav-icon"><User size={24} /></div>
          <span className="nav-label">Profile</span>
        </div>
      </div>
      
    </div>
  );
};

export default MyOrder;
