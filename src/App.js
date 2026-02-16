import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP Verification

  // 1. Send OTP to user's email via Render Backend
  const handleSendOTP = async () => {
    if (!email) return setMessage("Please enter your email.");
    try {
      setMessage("Connecting to engine...");
      const response = await axios.post('https://game-1-mdti.onrender.com/api/send-otp', { email });
      if (response.data.success) {
        setMessage("Success! Check your email for the POPKID Access Key.");
        setStep(2); // Move to OTP input screen
      }
    } catch (error) {
      console.error(error);
      setMessage("Error: Backend is sleeping or starting up. Try again in 30 seconds.");
    }
  };

  // 2. Verify OTP (This part links to your next dashboard)
  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setMessage("Access Granted! Welcome, Driver.");
      // In the next step, we will redirect to the Garage/Dashboard
    } else {
      setMessage("Invalid OTP. Please check your email.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      {/* Branding Header */}
      <h1 style={{ color: '#22d3ee', fontStyle: 'italic', fontSize: '3rem', marginBottom: '10px' }}>POPKID RIDESPHERE</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px', letterSpacing: '2px' }}>PROJECT OWNER: GEORGE OWIGO</p>

      {/* Main UI Card */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', width: '350px', textAlign: 'center' }}>
        
        {step === 1 ? (
          <>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>DRIVER REGISTRATION</p>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '20px', outline: 'none', boxSizing: 'border-box' }}
            />
            <button 
              onClick={handleSendOTP}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
            >
              GET ACCESS KEY
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#22d3ee', marginBottom: '20px' }}>ENTER 6-DIGIT CODE</p>
            <input 
              type="text" 
              placeholder="0 0 0 0 0 0" 
              maxLength="6"
              onChange={(e) => setOtp(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '20px', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '5px' }}
            />
            <button 
              onClick={handleVerifyOTP}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              VERIFY & DRIVE
            </button>
            <p onClick={() => setStep(1)} style={{ marginTop: '15px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>Change email</p>
          </>
        )}

        {message && <p style={{ marginTop: '20px', fontSize: '14px', color: '#22d3ee' }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
