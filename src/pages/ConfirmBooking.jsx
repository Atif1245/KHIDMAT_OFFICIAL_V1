import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, FileText, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Map } from 'lucide-react';

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('ASAP');

  return (
    <div className="app-wrapper">
      
      {/* Top Header */}
      <div className="top-header" style={{ padding: '16px 20px', backgroundColor: 'var(--bg-light)' }}>
        <button className="icon-btn" style={{ padding: 0 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="var(--text-primary)" />
        </button>
        <div className="header-title-center" style={{ flex: 1 }}>
          Confirm Booking
          <span className="header-title-ur">بکنگ کنفرم کریں</span>
        </div>
        <button className="text-btn urdu-text" style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
          اردو
        </button>
      </div>

      <div className="page-content p-6 pb-32 flex-col">
        
        {/* Provider Info Card */}
        <div className="card p-4 mb-6" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '24px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', overflow: 'hidden' }}>
              👨🏽‍🔧
            </div>
            <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}>
              <ShieldCheck size={20} color="var(--success)" fill="var(--success)" stroke="white" />
            </div>
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Abdul Rehman (Plumber)</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
                ⭐ 4.8
              </div>
              <span style={{ fontWeight: '500' }}>• 245 jobs</span>
              <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Rs 800/hr</span>
            </div>
          </div>
        </div>

        {/* When? */}
        <div className="card p-5 mb-6" style={{ borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <Calendar size={20} color="var(--text-secondary)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>When?</h3>
          </div>
          <div className="urdu-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '32px', marginBottom: '16px' }}>کب؟</div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Today', 'Tomorrow'].map(option => (
              <button 
                key={option}
                onClick={() => setSelectedDate(option)}
                style={{ flex: 1, padding: '12px', borderRadius: '20px', border: selectedDate === option ? 'none' : '1px solid var(--border-color)', backgroundColor: selectedDate === option ? '#475569' : '#f8fafc', color: selectedDate === option ? 'white' : 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {option}
              </button>
            ))}
            <button style={{ flex: 1, padding: '12px', borderRadius: '20px', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>
              <Calendar size={16} /> Pick
            </button>
          </div>
        </div>

        {/* What time? */}
        <div className="card p-5 mb-6" style={{ borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <Clock size={20} color="var(--text-secondary)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>What time?</h3>
          </div>
          <div className="urdu-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '32px', marginBottom: '16px' }}>کتنے بجے؟</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {['ASAP', '9 AM', '12 PM', '3 PM', '6 PM'].map(option => (
              <button 
                key={option}
                onClick={() => setSelectedTime(option)}
                style={{ padding: '12px', borderRadius: '20px', border: selectedTime === option ? 'none' : '1px solid var(--border-color)', backgroundColor: selectedTime === option ? '#2dd4bf' : '#f8fafc', color: selectedTime === option ? 'white' : 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Where? */}
        <div className="card p-5 mb-6" style={{ borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <MapPin size={20} color="var(--text-secondary)" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Where?</h3>
              </div>
              <div className="urdu-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '32px', marginBottom: '16px' }}>کہاں؟</div>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Change Location</span>
          </div>
          
          <div style={{ backgroundColor: '#f1f5f9', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Map size={20} color="#64748b" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827' }}>DHA Phase 5, Lahore</span>
          </div>
        </div>

        {/* Job Details */}
        <div className="card p-5 mb-6" style={{ borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <FileText size={20} color="var(--text-secondary)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Job Details</h3>
          </div>
          <div className="urdu-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '32px', marginBottom: '16px' }}>کام کی تفصیل</div>
          
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '20px', padding: '16px', border: '1px solid var(--border-color)' }}>
            <textarea 
              readOnly 
              style={{ width: '100%', border: 'none', backgroundColor: 'transparent', resize: 'none', fontSize: '0.95rem', color: '#334155', outline: 'none', fontWeight: '500' }} 
              rows={3} 
              value="Water leaking from kitchen pipe"
            />
          </div>
        </div>

        {/* AI Price Estimate */}
        <div style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', borderRadius: '24px', padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          {/* Background AI Icon Watermark */}
          <div style={{ position: 'absolute', right: '-20px', top: '20px', opacity: 0.1 }}>
            <div style={{ width: '120px', height: '100px', backgroundColor: '#8b5cf6', borderRadius: '20px' }}></div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#8b5cf6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} color="white" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#4c1d95' }}>AI Price Estimate</h3>
                <div className="urdu-text" style={{ fontSize: '0.85rem', color: '#6d28d9' }}>اے آئی قیمت کا تخمینہ</div>
              </div>
            </div>
            
            <div style={{ marginTop: '16px', marginBottom: '16px', display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#4c1d95' }}>Rs 1,600 - 2,000</span>
              <span style={{ fontSize: '0.85rem', color: '#6d28d9', marginLeft: '8px', fontWeight: '600' }}>estimated</span>
            </div>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'white', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--primary)' }}>
              <ShieldCheck size={16} /> Fair market price <CheckCircle2 size={16} />
            </div>
          </div>
        </div>

      </div>

      {/* Fixed Bottom Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '20px 24px 24px 24px', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={() => navigate('/my-order')} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          Confirm Booking <ArrowRight size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          <ShieldCheck size={16} color="var(--success)" /> Secure payment processed after the job
        </div>
      </div>
      
    </div>
  );
};

export default ConfirmBooking;
