
import React, { useState, useEffect } from 'react';
import { Star, Navigation, Phone, Check, X, Briefcase, Banknote, User, Bell, Menu, Edit2, MapPin, MessageCircle, CheckCircle, XCircle, Clock, Wallet, Calendar, LogOut, CreditCard, Home, ClipboardList, UserCircle, Activity } from 'lucide-react';
import { API_BASE } from '../api';

const ProviderHome = () => {
  const [profile, setProfile] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('status'); // status, orders, profile
  const userId = localStorage.getItem('userId');
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "", cnic: "", phone: "", email: "", city: "Lahore", category: "Plumber"
  });
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received from Ali Raza", time: "2 min ago", read: false },
    { id: 2, message: "Payment of PKR 5,000 has been credited", time: "1 hour ago", read: false },
    { id: 3, message: "Order #ORD-123 has been cancelled by customer", time: "3 hours ago", read: true },
    { id: 4, message: "Login successful", time: "Yesterday", read: true }
  ]);

  const [orders] = useState([
    { id: "ORD-001", customer: "Ali", service: "Plumber", amount: 1800, status: "active", eta: "8m", distance: "1.2km" },
    { id: "ORD-002", customer: "Sara", service: "AC Repair", amount: 2000, status: "pending", eta: null, distance: "3.8km" },
    { id: "ORD-003", customer: "Ahmed", service: "Electrician", amount: 2500, status: "completed", eta: null, distance: "2km" },
    { id: "ORD-004", customer: "Fatima", service: "Plumber", amount: 1500, status: "cancelled", eta: null, distance: "1.5km" }
  ]);

  const [stats] = useState({
    jobsToday: 3,
    earnings: 4500,
    rating: 4.9,
    totalEarnings: 245000,
    availableBalance: 185000,
    approvedOrders: 66,
    cancelledOrders: 12,
    completedOrders: 78
  });

  const [provider, setProviderProfile] = useState({
    name: "Abdul Rehman",
    email: "abdul@khidmat.com",
    phone: "+92 300 1234567",
    cnic: "12345-6789012-3",
    address: "DHA Phase 5, Lahore",
    city: "Lahore",
    categories: ["Plumber"],
    privacy: "Public"
  });

  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE}/api/providers/profile/${userId}`)
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          if (data) {
            setProviderProfile(prev => ({ ...prev, ...data }));
          }
        })
        .catch(err => console.error("Error fetching dashboard data:", err));
    }
  }, [userId]);

  useEffect(() => {
    setEditFormData({
      name: profile?.name || provider.name || "",
      cnic: profile?.cnic || provider.cnic || "",
      phone: profile?.phone || provider.phone || "",
      email: profile?.email || provider.email || "",
      city: profile?.city || provider.city || "Lahore",
      category: profile?.category || provider.categories[0] || "Plumber"
    });
  }, [profile, provider]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/providers/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(prev => ({ ...prev, ...editFormData }));
        setProviderProfile(prev => ({ ...prev, ...editFormData }));
        setProfileOpen(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = profile?.name || provider.name || "Provider";
  const category = profile?.category || provider.categories[0] || "Category";
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const renderProfileForm = () => (
    <div style={{ padding: '24px', background: 'white', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
         <div style={{ width: '80px', height: '80px', background: '#005F54', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
           {(editFormData.name || "P").charAt(0).toUpperCase()}
         </div>
         <h2 style={{ margin: 0, color: '#005F54' }}>Edit Profile</h2>
         <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '13px' }}>Update your personal and professional details</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px', display: 'block' }}>Full Name</label>
          <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} style={{ width: '100%', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px', display: 'block' }}>CNIC</label>
          <input type="text" value={editFormData.cnic} onChange={e => setEditFormData({...editFormData, cnic: e.target.value})} style={{ width: '100%', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px', display: 'block' }}>Phone Number</label>
          <input type="text" value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} style={{ width: '100%', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px', display: 'block' }}>Email Address</label>
          <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} style={{ width: '100%', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px', display: 'block' }}>City</label>
            <select value={editFormData.city} onChange={e => setEditFormData({...editFormData, city: e.target.value})} style={{ width: '100%', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none' }}>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Islamabad">Islamabad</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px', display: 'block' }}>Category</label>
            <select value={editFormData.category} onChange={e => setEditFormData({...editFormData, category: e.target.value})} style={{ width: '100%', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none' }}>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="AC Repair">AC Repair</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
            </select>
          </div>
        </div>

        <button onClick={handleSaveProfile} disabled={isSaving} style={{ width: '100%', padding: '16px', background: '#005F54', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', opacity: isSaving ? 0.7 : 1 }}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', paddingBottom: '70px' }}>
      
      {/* HEADER - Sirf ek baar (Menu, KHIDMAT, Bell, Profile) - DUPLICATE HATAYA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Menu size={24} color="#005F54" />
        </button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#005F54', margin: 0 }}>KHIDMAT</h1>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0 }}>خدمات آپ کی دہلیز پر</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <Bell size={22} color="#005F54" />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', fontSize: '10px', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div style={{ position: 'absolute', right: 0, top: 40, width: 280, background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 100, maxHeight: 350, overflowY: 'auto' }}>
                <div style={{ padding: 12, borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}>Notifications</div>
                {notifications.map(n => (
                  <div key={n.id} onClick={() => markAsRead(n.id)} style={{ padding: 12, borderBottom: '1px solid #f0f0f0', background: n.read ? 'white' : '#f0f9ff', cursor: 'pointer' }}>
                    <div style={{ fontSize: 13 }}>{n.message}</div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>{n.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div onClick={() => setProfileOpen(true)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#005F54', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
            {displayName.charAt(0)}
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION - Status, Orders, Profile */}
      <div style={{ display: 'flex', background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 16px' }}>
        <button 
          onClick={() => setActiveTab('status')}
          style={{ flex: 1, padding: '12px', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'status' ? '#005F54' : '#6b7280', borderBottom: activeTab === 'status' ? '2px solid #005F54' : 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Activity size={18} /> Status
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ flex: 1, padding: '12px', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'orders' ? '#005F54' : '#6b7280', borderBottom: activeTab === 'orders' ? '2px solid #005F54' : 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <ClipboardList size={18} /> Orders
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          style={{ flex: 1, padding: '12px', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'profile' ? '#005F54' : '#6b7280', borderBottom: activeTab === 'profile' ? '2px solid #005F54' : 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <UserCircle size={18} /> Profile
        </button>
      </div>

      {/* ========== STATUS TAB CONTENT ========== */}
      {activeTab === 'status' && (
        <div style={{ padding: '16px' }}>
          
          {/* Profile Summary Card */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{displayName}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>PRO VERIFIED</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{provider.city} • {category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                  <Star size={14} fill="#005F54" color="#005F54" />
                  <span>{stats.rating}</span>
                  <span style={{ color: '#6b7280' }}>• {stats.completedOrders} jobs completed</span>
                </div>
              </div>
              <button onClick={() => setProfileOpen(true)} style={{ background: 'none', border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '12px', cursor: 'pointer' }}>
                <Edit2 size={14} color="#005F54" /> Edit
              </button>
            </div>
          </div>

          {/* STATUS CARD - AVAILABLE FOR WORK (WITH Payment, Balance, Total Earned INSIDE) */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '16px', marginBottom: '16px', borderLeft: isAvailable ? '4px solid #10b981' : '4px solid #9ca3af', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isAvailable ? '#10b981' : '#9ca3af' }}></div>
                  <span style={{ fontWeight: 'bold', color: isAvailable ? '#10b981' : '#6b7280' }}>AVAILABLE FOR WORK</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>کام کے لیے دستیاب</div>
              </div>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                style={{ width: '50px', height: '28px', background: isAvailable ? '#10b981' : '#e2e8f0', borderRadius: '20px', border: 'none', cursor: 'pointer', position: 'relative' }}
              >
                <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: isAvailable ? '25px' : '3px', transition: 'left 0.2s' }}></div>
              </button>
            </div>
            
            {/* ✅ Payment Method, Available Balance, Total Earned - Status Card ke ANDAR */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
              <div>
                <CreditCard size={18} color="#005F54" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Payment Method</div>
                <div style={{ fontSize: '11px', fontWeight: 'bold' }}>JazzCash/Easy</div>
              </div>
              <div>
                <Wallet size={18} color="#005F54" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Available</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#005F54' }}>Rs {stats.availableBalance.toLocaleString()}</div>
              </div>
              <div>
                <Calendar size={18} color="#005F54" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Total Earned</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#005F54' }}>Rs {stats.totalEarnings.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* STATS CARDS - Jobs Today, Earnings, Rating */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '16px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <Briefcase size={24} color="#005F54" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.jobsToday}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Jobs Today</div>
            </div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '16px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <Banknote size={24} color="#b45309" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Rs {stats.earnings}k</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Earnings Today</div>
            </div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '16px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <Star size={24} color="#9333ea" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.rating}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Rating</div>
            </div>
          </div>

          {/* Current Job Section */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
              <h3 style={{ fontSize: '16px', margin: 0, fontWeight: 'bold' }}>Current Job</h3>
              <div style={{ background: '#dbeafe', color: '#1e3a8a', padding: '2px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', marginLeft: 'auto' }}>
                {orders.filter(o => o.status === 'active').length} ACTIVE
              </div>
            </div>
            {orders.filter(o => o.status === 'active').map(job => (
              <div key={job.id} style={{ background: '#f0f9ff', borderRadius: '20px', padding: '16px', border: '1px solid #bae6fd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>{job.customer}</h4>
                    <div style={{ fontSize: '12px', color: '#0369a1' }}><Navigation size={12} style={{ display: 'inline' }} /> {job.distance}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>ETA {job.eta}</div>
                    <div style={{ fontSize: '12px' }}>Rs {job.amount}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ flex: 1, padding: '10px', background: 'white', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}><Phone size={14} /> Call</button>
                  <button style={{ flex: 1, padding: '10px', background: 'white', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}><MessageCircle size={14} /> Chat</button>
                  <button style={{ flex: 1, padding: '10px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}><Navigation size={14} /> Track</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== ORDERS TAB CONTENT (With Summary INSIDE) ========== */}
      {activeTab === 'orders' && (
        <div style={{ padding: '16px' }}>
          
          {/* ✅ Orders Summary - YAHAN ORDERS SCREEN MEIN */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Orders Summary (Last 10 Days)</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><CheckCircle size={16} color="#10b981" style={{ display: 'inline', marginRight: '8px' }} /> Approved Orders</span>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>{stats.approvedOrders}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><XCircle size={16} color="#ef4444" style={{ display: 'inline', marginRight: '8px' }} /> Cancelled Orders</span>
              <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.cancelledOrders}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><Clock size={16} color="#f59e0b" style={{ display: 'inline', marginRight: '8px' }} /> Total Orders</span>
              <span style={{ fontWeight: 'bold' }}>{stats.completedOrders + stats.cancelledOrders}</span>
            </div>
          </div>

          {/* New Requests */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>NEW</div>
              <h3 style={{ fontSize: '16px', margin: 0, fontWeight: 'bold' }}>New Requests</h3>
            </div>
            {orders.filter(o => o.status === 'pending').map(req => (
              <div key={req.id} style={{ background: 'white', borderRadius: '20px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{req.customer}</h4>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{req.distance} away</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#005F54' }}>Rs {req.amount}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '16px', cursor: 'pointer' }}><X size={16} style={{ display: 'inline', marginRight: '6px' }} /> DECLINE</button>
                  <button style={{ flex: 2, padding: '12px', background: '#005F54', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer' }}><Check size={16} style={{ display: 'inline', marginRight: '6px' }} /> ACCEPT</button>
                </div>
              </div>
            ))}
          </div>

          {/* All Orders List */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 'bold' }}>All Orders</h3>
            {orders.map(order => (
              <div key={order.id} style={{ background: 'white', borderRadius: '16px', padding: '12px', marginBottom: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{order.id}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{order.customer} • {order.service}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#005F54' }}>Rs {order.amount}</div>
                    <div style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', 
                      background: order.status === 'active' ? '#dbeafe' : order.status === 'completed' ? '#dcfce7' : order.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                      color: order.status === 'active' ? '#1e3a8a' : order.status === 'completed' ? '#166534' : order.status === 'cancelled' ? '#991b1b' : '#92400e' }}>
                      {order.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== PROFILE TAB CONTENT ========== */}
      {activeTab === 'profile' && (
        <div style={{ padding: '16px' }}>
          {renderProfileForm()}
        </div>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, background: 'white', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
              <h2 style={{ color: '#005F54' }}>KHIDMAT</h2>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <button onClick={() => { setActiveTab('status'); setSidebarOpen(false); }} style={{ width: '100%', textAlign: 'left', padding: '12px', background: activeTab === 'status' ? '#f0fdf4' : 'none', color: activeTab === 'status' ? '#005F54' : '#374151', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', gap: 12, fontWeight: activeTab === 'status' ? 'bold' : 'normal' }}><Home size={18} /> Dashboard</button>
            <button onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }} style={{ width: '100%', textAlign: 'left', padding: '12px', background: activeTab === 'orders' ? '#f0fdf4' : 'none', color: activeTab === 'orders' ? '#005F54' : '#374151', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', gap: 12, fontWeight: activeTab === 'orders' ? 'bold' : 'normal' }}><ClipboardList size={18} /> My Orders</button>
            <button onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }} style={{ width: '100%', textAlign: 'left', padding: '12px', background: activeTab === 'profile' ? '#f0fdf4' : 'none', color: activeTab === 'profile' ? '#005F54' : '#374151', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', gap: 12, fontWeight: activeTab === 'profile' ? 'bold' : 'normal' }}><UserCircle size={18} /> My Profile</button>
            <hr style={{ margin: '16px 0' }} />
            <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ width: '100%', textAlign: 'left', padding: '12px', background: 'none', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', gap: 12, color: '#ef4444' }}><LogOut size={18} /> Logout</button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setProfileOpen(false)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 400, zIndex: 10 }}>
            <button onClick={() => setProfileOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
              <X size={18} color="#4b5563" />
            </button>
            {renderProfileForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderHome;