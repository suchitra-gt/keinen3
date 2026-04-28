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

// Initialize Reviews DB Table
const initReviewsDb = async () => {
    const createReviewsTable = `
        CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
            comment TEXT NOT NULL,
            likes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    try {
        await db.query(createReviewsTable);
        try { await db.query("ALTER TABLE reviews ADD COLUMN likes INT DEFAULT 0"); } catch (e) {}
    } catch (err) {
        console.error("DB Init Error for Reviews:", err.message);
    }
};
initReviewsDb();

// Reviews API
app.post('/api/reviews', async (req, res) => {
    const { name, email, rating, comment } = req.body;
    if (!name || !email || !rating || !comment) return res.status(400).json({ error: 'All fields required' });
    
    try {
        const [results] = await db.query('SELECT id FROM reviews WHERE email = ?', [email]);
        if (results.length > 0) return res.status(400).json({ error: 'You have already submitted a review' });
        
        const [result] = await db.query(
            'INSERT INTO reviews (name, email, rating, comment) VALUES (?, ?, ?, ?)',
            [name, email, rating, comment]
        );
        res.json({ message: 'Review submitted successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/reviews/:email', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM reviews WHERE email = ?', [req.params.email]);
        if (results.length === 0) return res.status(404).json({ error: 'Review not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/reviews/:id', async (req, res) => {
    const { name, rating, comment } = req.body;
    try {
        await db.query(
            'UPDATE reviews SET name = ?, rating = ?, comment = ? WHERE id = ?',
            [name, rating, comment, req.params.id]
        );
        res.json({ message: 'Review updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/reviews/:id/like', async (req, res) => {
    const { action } = req.body;
    const operator = action === 'like' ? '+' : '-';
    try {
        await db.query(
            `UPDATE reviews SET likes = GREATEST(0, likes ${operator} 1) WHERE id = ?`,
            [req.params.id]
        );
        res.json({ message: `Review ${action}d successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Keinen API running on port ${PORT}`));
