import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'linear-gradient(to bottom, rgba(0, 31, 26, 0.7), rgba(0, 31, 26, 0.95)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '40px 24px',
      color: '#fff',
      justifyContent: 'space-between',
      minHeight: '100vh'
    }}>
      
      {/* Top Spacer */}
      <div></div>

      {/* Center Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '-40px' }}>
        
        {/* Glassmorphic Logo */}
        <div style={{ 
          width: '120px', height: '120px', borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0, 115, 96, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
             color: '#10b981', // Accent Green
             fontSize: '5rem', fontFamily: "'Noto Nastaliq Urdu', serif",
             textShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
             paddingBottom: '20px'
          }}>
            خ
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '4px', fontWeight: '800', marginBottom: '24px', color: 'white' }}>
          KHIDMAT
        </h1>

        {/* Taglines */}
        <h2 className="urdu-text" style={{ fontSize: '1.8rem', fontWeight: 'normal', marginBottom: '8px', color: '#f3f4f6' }}>
          <span style={{ color: '#fff' }}>آپ کی</span> <span style={{ color: '#10b981' }}>سہولت</span> <span style={{ color: '#fff' }}>، ہمارے ساتھ</span>
        </h2>
        
        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, transparent, #10b981, transparent)', margin: '16px auto' }}></div>
        
        <p style={{ color: '#d1d5db', fontSize: '1rem', letterSpacing: '0.5px' }}>
          Your home services partner
        </p>

      </div>

      {/* Bottom Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Glowing Button */}
        <button 
          onClick={() => navigate('/role')}
          style={{ 
            width: '100%', padding: '18px', borderRadius: '100px', 
            background: 'linear-gradient(90deg, #007b6b, #10b981)',
            border: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)', cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={16} color="#fff" />
          </div>
          GET STARTED
        </button>

        {/* Footer Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={20} color="#10b981" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 'bold' }}>Trusted</span>
              <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>Professionals</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={20} color="#10b981" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 'bold' }}>On-Time</span>
              <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>Service</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={20} color="#10b981" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 'bold' }}>Quality</span>
              <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>Assurance</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Splash;
