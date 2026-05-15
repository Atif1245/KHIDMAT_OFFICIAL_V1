import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Wrench, Zap, Smartphone, Wind, ChevronRight, MessageCircle } from 'lucide-react';
import { API_BASE } from '../api';

const Search = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    { id: 0, name: 'All', nameUrdu: 'تمام', icon: <span style={{fontSize: '20px'}}>🌐</span> },
    { id: 1, name: 'Plumber', nameUrdu: 'پلمبر', icon: <Wrench size={20} /> },
    { id: 2, name: 'Electrician', nameUrdu: 'الیکٹریشن', icon: <Zap size={20} /> },
    { id: 3, name: 'Tutor', nameUrdu: 'ٹیوٹر', icon: <span style={{fontSize: '20px'}}>📖</span> },
    { id: 4, name: 'Maid', nameUrdu: 'ملازمہ', icon: <span style={{fontSize: '20px'}}>🧹</span> },
    { id: 5, name: 'AC Repair', nameUrdu: 'اے سی', icon: <Wind size={20} /> },
    { id: 6, name: 'Mechanic', nameUrdu: 'مکینک', icon: <Wrench size={20} /> },
    { id: 7, name: 'Phone', nameUrdu: 'فون', icon: <Smartphone size={20} /> },
    { id: 8, name: 'Painter', nameUrdu: 'پینٹر', icon: <span style={{fontSize: '20px'}}>🎨</span> }
  ];

  const cities = [
    "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Peshawar", 
    "Quetta", "Multan", "Faisalabad", "Gujranwala", "Sialkot",
    "Hyderabad", "Sukkur", "Bahawalpur", "Sargodha", "Abbottabad"
  ];

  // Filter providers based on search query, city, and category
  const filteredProviders = providers.filter(pro => {
    // Basic text search filter
    const matchesSearch = pro.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (pro.category && pro.category.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    // Category filter
    const matchesCategory = selectedCategory === 'All' || 
                            (pro.category && pro.category.toLowerCase().includes(selectedCategory.toLowerCase()));
                            
    // City filter (Currently dummy data doesn't have city, so we just return true. 
    // In real app, this would be: pro.city === selectedCity)
    const matchesCity = true; 

    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <div style={{ padding: '24px 24px 100px 24px', overflowY: 'auto' }}>
      
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '20px' }}>
        Find Services
      </h1>

      {/* Main Search Bar */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <SearchIcon size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
        <input 
          type="text" 
          className="form-input" 
          placeholder="Type provider name or service..." 
          style={{ paddingLeft: '48px', marginBottom: 0, height: '52px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Filters Section */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {/* City Select */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '0 12px', border: '1px solid var(--border-color)' }}>
          <MapPin size={18} color="var(--primary)" />
          <select 
            style={{ flex: 1, padding: '12px 8px', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontWeight: '500' }}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Horizontal Scroll */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Categories</h3>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id} 
                onClick={() => setSelectedCategory(cat.name)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                  backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                  color: isSelected ? 'white' : 'var(--text-secondary)',
                  borderRadius: '20px', border: isSelected ? 'none' : '1px solid var(--border-color)',
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 4px 10px rgba(255,139,61,0.3)' : 'none'
                }}
              >
                {cat.icon}
                <span style={{ fontWeight: isSelected ? 'bold' : 'normal', fontSize: '0.9rem' }}>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Search Results</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{filteredProviders.length} found</span>
        </h3>
        
        {loading ? <p>Searching...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredProviders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>🔍</div>
                <p>No providers match your search.</p>
                <p style={{ fontSize: '0.85rem' }}>Try selecting a different category or city.</p>
              </div>
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

export default Search;
