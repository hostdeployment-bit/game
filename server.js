require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to your Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Setup Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

let otpStore = {}; // Temporary memory for OTPs

// API to Send OTP
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 300000 };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'RideSphere Access Key',
            html: `<h1>POPKID RIDESPHERE</h1><p>Your OTP is: <b>${otp}</b></p>`
        });
        res.json({ success: true, message: "OTP Sent!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
