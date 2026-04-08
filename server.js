const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  console.log('--- New Contact Form Submission ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('----------------------------------');

  res.json({ success: true, message: 'Thank you for your message. We will be in touch shortly.' });
});

app.get('/api/stream/torbay', (req, res) => {
  const streamReq = http.get('http://stream.cotswoldgrp.com:8012/sdr-dab', (streamRes) => {
    res.set({
      'Content-Type': streamRes.headers['content-type'] || 'audio/mpeg',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    streamRes.pipe(res);
  });
  streamReq.on('error', () => { if (!res.headersSent) res.status(502).end(); });
  req.on('close', () => { streamReq.destroy(); });
});

app.get('/jingles', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'jingles.html'));
});

app.get('/sung-radio-jingles', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sung-radio-jingles.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`RadioJingles.com server running on port ${PORT}`);
});
