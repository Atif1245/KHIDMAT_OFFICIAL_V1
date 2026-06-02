import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Phone, MoreVertical } from 'lucide-react';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const provider = location.state?.provider || { name: 'Abdul Rehman', category: 'Plumber' };
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Assalam-o-Alaikum! Main nikal chuka hoon.", sender: 'provider', time: '10:30 AM' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user', time }]);
    setInput('');
  };

  return (
    <div className="app-wrapper">
      
      {/* Chat Header */}
      <div className="top-header" style={{ padding: '16px 20px', backgroundColor: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
        <button className="icon-btn" style={{ padding: 0 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="var(--text-primary)" />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
              <img src={`https://ui-avatars.com/api/?name=${provider.name}&background=007360&color=fff`} alt={provider.name} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '0px', right: '0px', width: '10px', height: '10px', backgroundColor: 'var(--success)', borderRadius: '50%', border: '2px solid white' }}></div>
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#111827' }}>{provider.name}</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{provider.category}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href={`tel:${provider.phone || '123'}`} style={{ color: 'var(--text-primary)' }}>
            <Phone size={20} />
          </a>
          <MoreVertical size={20} color="var(--text-primary)" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="page-content p-6" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '4px 12px', borderRadius: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>Today</span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              background: msg.sender === 'user' ? 'var(--primary)' : 'white',
              color: msg.sender === 'user' ? 'white' : '#111827',
              padding: '12px 16px',
              borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              fontSize: '0.95rem',
              lineHeight: '1.4'
            }}>
              {msg.text}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px 20px', backgroundColor: 'white', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'center', position: 'sticky', bottom: 0 }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..." 
          style={{ flex: 1, padding: '14px 20px', borderRadius: '24px', border: '1px solid #e5e7eb', outline: 'none', backgroundColor: '#f9fafb', fontSize: '0.95rem' }}
        />
        <button onClick={sendMessage} style={{ backgroundColor: 'var(--primary)', border: 'none', width: '48px', height: '48px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,123,107,0.3)', flexShrink: 0 }}>
          <Send size={20} />
        </button>
      </div>

    </div>
  );
};

export default Chat;
