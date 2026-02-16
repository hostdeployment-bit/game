import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await axios.post('http://localhost:5000/api/send-otp', { email });
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#22d3ee', fontStyle: 'italic' }}>POPKID RIDESPHERE</h1>
      
      {step === 1 ? (
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
          <p>Enter Email to Register</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: 'none', width: '80%' }} />
          <button onClick={sendOtp} style={{ marginTop: '20px', background: '#3b82f6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '80%' }}>
            GET ACCESS KEY
          </button>
        </div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '20px' }}>
          <p>Verify Code sent to {email}</p>
          <input type="text" onChange={(e) => setOtp(e.target.value)} style={{ padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '20px' }} />
          <button style={{ marginTop: '20px', background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', width: '100%' }}>
            VERIFY & START DRIVE
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
