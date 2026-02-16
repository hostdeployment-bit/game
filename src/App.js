import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setMessage("Connecting to POPKID Engine...");
    try {
      // Points to your LIVE Render backend
      const response = await axios.post('https://game-1-mdti.onrender.com/api/send-otp', { email });
      if (response.data.success) {
        setMessage(`Success! Access Key sent to ${email}`);
      }
    } catch (error) {
      setMessage("Engine is waking up... please try again in 20 seconds.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#22d3ee', fontStyle: 'italic', fontSize: '2.5rem', marginBottom: '5px' }}>RIDESPHERE</h1>
      <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '30px' }}>BY GEORGE OWIGO</p>
      
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', width: '300px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '20px', letterSpacing: '1px' }}>{isLogin ? 'DRIVER LOGIN' : 'CREATE ACCOUNT'}</h2>
        
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '20px', background: '#1e293b', border: 'none', color: 'white', outline: 'none', boxSizing: 'border-box' }}
        />
        
        <button onClick={handleAuth} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'GET ACCESS KEY' : 'REGISTER DRIVER'}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}>
          {isLogin ? "New Driver? Sign Up" : "Already a Driver? Login"}
        </p>

        {message && <p style={{ marginTop: '15px', color: '#22d3ee', fontSize: '12px' }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
