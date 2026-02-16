import React from 'react';

function Dashboard({ email }) {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#22d3ee', fontStyle: 'italic' }}>RIDESPHERE</h2>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>DRIVER</p>
          <p style={{ fontWeight: 'bold' }}>{email.split('@')[0].toUpperCase()}</p>
        </div>
      </div>

      {/* Wallet Card */}
      <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)', padding: '30px', borderRadius: '24px', marginBottom: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>Current Balance</p>
        <h1 style={{ fontSize: '3rem', margin: '10px 0' }}>Ksh 12,500.00</h1>
        <p style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '5px 10px', borderRadius: '10px' }}>
          +5.00 Referral Bonus Active
        </p>
      </div>

      {/* Vehicle Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px' }}>FUEL LEVEL</p>
          <p style={{ fontSize: '20px', color: '#22c55e', fontWeight: 'bold' }}>98%</p>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px' }}>ENGINE</p>
          <p style={{ fontSize: '20px', color: '#eab308', fontWeight: 'bold' }}>GOOD</p>
        </div>
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '20px', borderRadius: '20px', border: 'none', backgroundColor: '#22d3ee', color: '#0f172a', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
        START DRIVING
      </button>
    </div>
  );
}

export default Dashboard;
        
