import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setMessage("Connecting to engine...");
    try {
      const response = await axios.post('https://game-1-mdti.onrender.com/api/send-otp', { email });
      if (response.data.success) {
        setMessage(`Success! Code sent for ${isLogin ? 'Login' : 'Sign Up'}`);
      }
    } catch (error) {
      setMessage("Engine error. Check Render logs.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#22d3ee', fontStyle: 'italic', fontSize: '2.5rem' }}>POPKID RIDESPHERE</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', width: '320px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{isLogin ? 'WELCOME BACK' : 'NEW DRIVER REGISTRATION'}</h2>
        
        <input 
          type="email" 
          placeholder="Enter Email" 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '20px', background: '#1e293b', border: 'none', color: 'white' }}
        />
        
        <button onClick={handleAuth} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'LOGIN' : 'SIGN UP'}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
          {isLogin ? "Don't have an account? Sign Up" : "Already a driver? Login"}
        </p>

        {message && <p style={{ marginTop: '15px', color: '#22d3ee', fontSize: '12px' }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
