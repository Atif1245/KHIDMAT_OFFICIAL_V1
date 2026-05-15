import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, CheckCircle, Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Dummy booking data
  const orders = [
    {
      id: "ORD-9821",
      providerName: "Ali Raza",
      category: "Plumber",
      status: "upcoming",
      date: "Tomorrow, 10:00 AM",
      price: "Rs. 1500",
      location: "Gulberg III, Lahore",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: "ORD-7643",
      providerName: "Tariq Mehmood",
      category: "Electrician",
      status: "completed",
      date: "12 May, 2:30 PM",
      price: "Rs. 800",
      location: "Model Town, Lahore",
      image: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      id: "ORD-6512",
      providerName: "Asif Tutor",
      category: "Tutor",
      status: "completed",
      date: "10 May, 5:00 PM",
      price: "Rs. 5000 / month",
      location: "DHA Phase 5, Lahore",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  const filteredOrders = orders.filter(o => o.status === activeTab);

  return (
    <div style={{ padding: '24px 24px 100px 24px', overflowY: 'auto', height: '100%' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '24px' }}>
        My Bookings
      </h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('upcoming')}
          style={{ 
            flex: 1, padding: '12px', borderRadius: '12px', fontWeight: 'bold',
            backgroundColor: activeTab === 'upcoming' ? 'var(--primary)' : 'var(--bg-card)',
            color: activeTab === 'upcoming' ? 'white' : 'var(--text-secondary)',
            border: activeTab === 'upcoming' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer', transition: 'all 0.3s'
          }}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          style={{ 
            flex: 1, padding: '12px', borderRadius: '12px', fontWeight: 'bold',
            backgroundColor: activeTab === 'completed' ? 'var(--primary)' : 'var(--bg-card)',
            color: activeTab === 'completed' ? 'white' : 'var(--text-secondary)',
            border: activeTab === 'completed' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer', transition: 'all 0.3s'
          }}
        >
          Completed
        </button>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>📦</div>
            <p>No {activeTab} bookings found.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="card" style={{ padding: '16px', marginBottom: 0, position: 'relative' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{order.id}</span>
                {order.status === 'upcoming' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: '8px' }}>
                    <Clock3 size={12} /> Pending
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '8px' }}>
                    <CheckCircle size={12} /> Completed
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--bg-dark)' }}>
                  <img src={order.image} alt={order.providerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>{order.providerName}</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{order.category}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                      <Calendar size={14} color="var(--primary)" /> {order.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                      <MapPin size={14} color="var(--primary)" /> {order.location}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {order.price}
                </div>
                <button 
                  onClick={() => navigate('/chat')}
                  style={{ 
                    padding: '6px 12px', borderRadius: '8px', 
                    backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', 
                    color: 'var(--text-primary)', fontSize: '0.85rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  View Details <ChevronRight size={14} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default CustomerOrders;
