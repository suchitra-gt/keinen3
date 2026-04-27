const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the root directory (for legacy index.html)
app.use(express.static(path.join(__dirname, '../')));

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'keinen_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes
app.get('/api/services', (req, res) => {
    db.query('SELECT * FROM services ORDER BY display_order', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.get('/api/industries', (req, res) => {
    db.query('SELECT * FROM industries ORDER BY display_order', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/contact', (req, res) => {
    const { full_name, email, company, subject, message } = req.body;
    const query = 'INSERT INTO contacts (full_name, email, company, subject, message) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [full_name, email, company, subject, message], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Success', id: result.insertId });
    });
});

// Fallback for SPA (React) if running from server
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

