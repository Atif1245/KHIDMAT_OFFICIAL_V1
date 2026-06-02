import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search as SearchIcon, MapPin, ChevronRight, MessageCircle, Mic, ArrowLeft, SlidersHorizontal, Star, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { API_BASE } from '../api';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState(location.state?.voiceQuery || '');
  const [isListening, setIsListening] = useState(false);

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

  const handleVoiceSearch = () => {
    setIsListening(true);
    setSearchQuery('');
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Plumber'); // Mock voice input result
    }, 2000);
  };

  const filteredProviders = providers.filter(pro => {
    return pro.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
           (pro.category && pro.category.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="app-wrapper">
      
      {/* Header and Search */}
      <div style={{ backgroundColor: 'white', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 10 }}>
        <button className="icon-btn" style={{ padding: 0 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="var(--text-primary)" />
        </button>
        <div style={{ flex: 1, position: 'relative' }}>
          <SearchIcon size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search providers..." 
            style={{ paddingLeft: '40px', paddingRight: '40px', height: '44px', borderRadius: '22px', backgroundColor: '#f3f4f6', border: 'none', margin: 0 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Mic 
            size={18} 
            color={isListening ? "#ef4444" : "var(--text-secondary)"} 
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', animation: isListening ? 'pulse 1s infinite' : 'none' }} 
            onClick={handleVoiceSearch}
          />
        </div>
        <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
          <SlidersHorizontal size={20} color="var(--text-primary)" />
        </button>
      </div>

      <div className="page-content p-6 pb-24 flex-col">
        
        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: '500' }}>
          {loading ? 'Searching...' : `${filteredProviders.length} providers found`}
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none', margin: '0 -24px', paddingLeft: '24px', paddingRight: '24px' }} className="hide-scrollbar">
          {['Sort by', 'Distance', 'Top Rated', 'Available'].map((filter, index) => (
            <div key={index} style={{ padding: '8px 16px', backgroundColor: index === 0 ? 'var(--primary)' : 'white', color: index === 0 ? 'white' : 'var(--text-secondary)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500', whiteSpace: 'nowrap', border: index === 0 ? 'none' : '1px solid var(--border-color)', boxShadow: index === 0 ? '0 4px 10px rgba(0,123,107,0.2)' : 'none', cursor: 'pointer' }}>
              {filter}
            </div>
          ))}
        </div>

        {/* Search Results */}
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
             <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>Loading providers...</div>
          ) : filteredProviders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>🔍</div>
              <p>No providers match your search.</p>
            </div>
          ) : (
            filteredProviders.map((pro, index) => (
              <div className="card p-4" key={pro.id || index} style={{ borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', overflow: 'hidden' }}>
                      👨🏽‍🔧
                    </div>
                    <div style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}>
                      <ShieldCheck size={18} color="var(--success)" fill="var(--success)" stroke="white" />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#111827', fontWeight: '700' }}>
                          {pro.name || 'Abdul Rehman'}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                          Expert {pro.category || 'Plumber'}
                        </p>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)' }}>
                        Rs. {pro.price_range || '800'}/hr
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: '700', fontSize: '0.9rem' }}>
                      <Star size={16} fill="#f59e0b" /> 4.8
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rating</span>
                  </div>
                  <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#111827', fontWeight: '600', fontSize: '0.9rem' }}>
                      <MapPin size={16} color="var(--primary)" /> 2.5 km
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Distance</span>
                  </div>
                  <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#111827', fontWeight: '600', fontSize: '0.9rem' }}>
                      <Clock size={16} color="var(--primary)" /> 15 min
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ETA</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ flex: 1, padding: '12px', borderRadius: '16px', border: '1.5px solid var(--primary)', backgroundColor: 'transparent', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' }}>
                    <MessageCircle size={18} /> Chat
                  </button>
                  <button onClick={() => navigate('/provider-details', { state: { provider: pro } })} style={{ flex: 1, padding: '12px', borderRadius: '16px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0, 123, 107, 0.2)' }}>
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Search;
