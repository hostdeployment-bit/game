import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      setMessage("Sending code to your inbox...");
      // This calls the backend we just built
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      if (response.data.success) {
        setMessage("Success! Check your email for the POPKID Access Key.");
      }
    } catch (error) {
      setMessage("Error: Make sure your backend server is running.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#22d3ee', italic: 'true', fontSize: '3rem' }}>POPKID RIDESPHERE</h1>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', width: '350px', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>DRIVER REGISTRATION</p>
        <input 
          type="email" 
          placeholder="Enter your email" 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '20px', outline: 'none' }}
        />
        <button 
          onClick={handleSendOTP}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
        >
          GET ACCESS KEY
        </button>
        {message && <p style={{ marginTop: '20px', fontSize: '14px', color: '#22d3ee' }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
