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

// 1. API to Send OTP
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
        await transporter.sendMail({
            from: `"POPKID RIDESPHERE" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your RideSphere Access Key',
            html: `<div style="font-family:sans-serif; background:#0f172a; color:white; padding:20px;">
                    <h1 style="color:#22d3ee">POPKID RIDESPHERE</h1>
                    <p>Your OTP Code is: <b style="font-size:24px;">${otp}</b></p>
                   </div>`
        });
        res.json({ success: true, message: "OTP Sent!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("RideSphere Engine started on Port 5000"));
