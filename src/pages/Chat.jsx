import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const provider = location.state?.provider || { name: 'Muhammad Ali' };
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Assalam-o-Alaikum! Main nikal chuka hoon.", sender: 'provider' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
      {/* Chat Header */}
      <div style={{ padding: '20px', background: '#fff', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #eee' }}>
        <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        <div>
          <h4 style={{ margin: 0 }}>{provider.name}</h4>
          <span style={{ fontSize: '0.8rem', color: '#10B981' }}>Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'user' ? '#FF8B3D' : '#fff',
            color: msg.sender === 'user' ? '#fff' : '#333',
            padding: '12px 16px',
            borderRadius: '15px',
            maxWidth: '80%',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px', background: '#fff', display: 'flex', gap: '10px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..." 
          style={{ flex: 1, padding: '12px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none' }}
        />
        <button onClick={sendMessage} style={{ background: '#FF8B3D', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
