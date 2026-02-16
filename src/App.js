import React, { useState } from 'react';
import axios from 'axios';

// --- DASHBOARD COMPONENT ---
function Dashboard({ email }) {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#22d3ee', fontStyle: 'italic' }}>RIDESPHERE</h2>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>DRIVER</p>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{email.split('@')[0].toUpperCase()}</p>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)', padding: '30px', borderRadius: '24px', marginBottom: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>Current Balance</p>
        <h1 style={{ fontSize: '2.5rem', margin: '10px 0' }}>Ksh 12,500.00</h1>
        <p style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '5px 10px', borderRadius: '10px' }}>
          +5.00 Referral Bonus Active
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '5px' }}>FUEL LEVEL</p>
          <p style={{ fontSize: '18px', color: '#22c55e', fontWeight: 'bold', margin: 0 }}>98%</p>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '5px' }}>ENGINE</p>
          <p style={{ fontSize: '18px', color: '#eab308', fontWeight: 'bold', margin: 0 }}>GOOD</p>
        </div>
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '20px', borderRadius: '20px', border: 'none', backgroundColor: '#22d3ee', color: '#0f172a', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
        START DRIVING
      </button>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW: Track login state

  const handleSendOTP = async () => {
    if (!email) return setMessage("Please enter your email.");
    try {
      setMessage("Connecting to engine...");
      const response = await axios.post('https://game-1-mdti.onrender.com/api/send-otp', { email });
      if (response.data.success) {
        setMessage("Success! Check your email.");
        setStep(2); 
      }
    } catch (error) {
      setMessage("Error: Backend is starting up. Try again in 10s.");
    }
  };

  const handleVerifyOTP = () => {
    // For now, we accept any 6 digits to let you test the UI
    if (otp.length === 6) {
      setIsLoggedIn(true); 
    } else {
      setMessage("Please enter the 6-digit code.");
    }
  };

  // If logged in, show the Dashboard. If not, show the Login screen.
  if (isLoggedIn) {
    return <Dashboard email={email} />;
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      <h1 style={{ color: '#22d3ee', fontStyle: 'italic', fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>POPKID RIDESPHERE</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px', letterSpacing: '2px', fontSize: '12px' }}>OWNER: GEORGE OWIGO</p>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', width: '320px', textAlign: 'center' }}>
        
        {step === 1 ? (
          <>
            <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>DRIVER REGISTRATION</p>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '20px', outline: 'none', boxSizing: 'border-box', background: '#1e293b', color: 'white' }}
            />
            <button 
              onClick={handleSendOTP}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              GET ACCESS KEY
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#22d3ee', marginBottom: '20px', fontSize: '14px' }}>ENTER 6-DIGIT CODE</p>
            <input 
              type="text" 
              placeholder="000000" 
              maxLength="6"
              onChange={(e) => setOtp(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '20px', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '5px', background: '#1e293b', color: 'white', boxSizing: 'border-box' }}
            />
            <button 
              onClick={handleVerifyOTP}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              VERIFY & DRIVE
            </button>
          </>
        )}

        {message && <p style={{ marginTop: '20px', fontSize: '12px', color: '#22d3ee' }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
