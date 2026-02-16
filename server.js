require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Setup Gmail Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- NEW: HOME ROUTE (Fixes the "Cannot GET /" error) ---
app.get('/', (req, res) => {
    res.send('🏎️ POPKID RIDESPHERE ENGINE: ONLINE 🏎️');
});

// 1. API to Send OTP
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
        await transporter.sendMail({
            from: `"POPKID RIDESPHERE" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your RideSphere Access Key',
            html: `
            <div style="font-family:sans-serif; background:#0f172a; color:white; padding:40px; border-radius: 20px; text-align: center;">
                <h1 style="color:#22d3ee; font-style: italic;">POPKID RIDESPHERE</h1>
                <p style="font-size: 18px;">Your high-speed access code is here:</p>
                <div style="background: #1e293b; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #3b82f6;">${otp}</span>
                </div>
                <p style="color: #94a3b8;">Welcome to the fleet, Driver Owigo.</p>
            </div>`
        });
        res.json({ success: true, message: "OTP Sent!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- UPDATED PORT: Works on both your PC (5000) and Render ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RideSphere Engine running on Port ${PORT}`));
