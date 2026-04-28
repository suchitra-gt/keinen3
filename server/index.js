const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET all services (summary cards)
app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, code, title, description, tags FROM services ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single service full detail by code
app.get('/api/services/:code', async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const [[service]] = await db.query('SELECT * FROM services WHERE code = ?', [code]);
    if (!service) return res.status(404).json({ error: 'Not found' });

    const [useCases]   = await db.query('SELECT * FROM use_cases WHERE service_id = ? ORDER BY sort_order', [service.id]);
    const [industries] = await db.query('SELECT name FROM industries_served WHERE service_id = ?', [service.id]);
    const [whyItems]   = await db.query('SELECT heading, body FROM why_items WHERE service_id = ?', [service.id]);

    res.json({ ...service, useCases, industries: industries.map(i => i.name), whyItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET mega-menu data (all services with subs for the dropdown)
app.get('/api/mega-menu', async (req, res) => {
  try {
    const [services] = await db.query('SELECT id, code, title FROM services ORDER BY id');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });
  res.json({ success: true, message: 'Message received. We will contact you shortly.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Keinen API running on port ${PORT}`));
