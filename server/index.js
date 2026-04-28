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

// Resilience: Create Database if it doesn't exist
const initializeDB = () => {
    const rootConn = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    rootConn.connect((err) => {
        if (err) {
            console.error('MySQL Root Connection Failed. Please check if MySQL is running.');
            return;
        }
        rootConn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'keinen_db'}`, (err) => {
            if (err) console.error('Database creation failed:', err);
            else {
                console.log('Database verified/created');
                seedDatabase();
            }
            rootConn.end();
        });
    });
};

const seedDatabase = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'keinen_db'
    });

    const createReviewsTable = `
        CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
            comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    db.query(createReviewsTable, (err) => {
        if (err) console.error("Error creating reviews table:", err);
        else {
            db.query("ALTER TABLE reviews ADD COLUMN likes INT DEFAULT 0", () => {});
        }
    });

    db.query('SHOW TABLES', (err, results) => {
        if (results.length === 0) {
            console.log('New database detected. Seeding industrial data...');
            const schema = `
                CREATE TABLE IF NOT EXISTS industries (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255),
                    description TEXT,
                    image_url VARCHAR(255),
                    display_order INT DEFAULT 0
                );
                CREATE TABLE IF NOT EXISTS services (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255),
                    description TEXT,
                    tags JSON,
                    display_order INT DEFAULT 0
                );
            `;
            // Simple split and execute for schema
            schema.split(';').filter(q => q.trim()).forEach(q => db.query(q));
            
            // Seed sample data
            db.query("INSERT INTO industries (name, description, image_url) VALUES ('Manufacturing', 'Industry 4.0 solutions', '/sector_manufacturing.png')");
            db.query("INSERT INTO services (title, description, tags) VALUES ('Cybersecurity', 'Zero Trust Architecture', '[\"MDR\", \"Zero Trust\"]')");
        }
        db.end();
        startServer();
    });
};

const startServer = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'keinen_db'
    });

    db.connect((err) => {
        if (err) {
            console.error('Final DB Connection Failed:', err.message);
            return;
        }
        console.log('Connected to Keinen Database');
    });

    // API Routes
    app.get('/api/services', (req, res) => {
        db.query('SELECT * FROM services ORDER BY display_order, id', (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    });

    app.get('/api/industries', (req, res) => {
        db.query('SELECT * FROM industries ORDER BY display_order, id', (err, results) => {
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

    // Reviews API
    app.post('/api/reviews', (req, res) => {
        const { name, email, rating, comment } = req.body;
        if (!name || !email || !rating || !comment) return res.status(400).json({ error: 'All fields required' });
        
        db.query('SELECT id FROM reviews WHERE email = ?', [email], (err, results) => {
            if (err) return res.status(500).json(err);
            if (results.length > 0) return res.status(400).json({ error: 'You have already submitted a review' });
            
            db.query(
                'INSERT INTO reviews (name, email, rating, comment) VALUES (?, ?, ?, ?)',
                [name, email, rating, comment],
                (err, result) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: 'Review submitted successfully', id: result.insertId });
                }
            );
        });
    });

    app.get('/api/reviews', (req, res) => {
        db.query('SELECT * FROM reviews ORDER BY created_at DESC', (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    });

    app.get('/api/reviews/:email', (req, res) => {
        db.query('SELECT * FROM reviews WHERE email = ?', [req.params.email], (err, results) => {
            if (err) return res.status(500).json(err);
            if (results.length === 0) return res.status(404).json({ error: 'Review not found' });
            res.json(results[0]);
        });
    });

    app.put('/api/reviews/:id', (req, res) => {
        const { name, rating, comment } = req.body;
        db.query(
            'UPDATE reviews SET name = ?, rating = ?, comment = ? WHERE id = ?',
            [name, rating, comment, req.params.id],
            (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: 'Review updated successfully' });
            }
        );
    });

    app.put('/api/reviews/:id/like', (req, res) => {
        const { action } = req.body;
        const operator = action === 'like' ? '+' : '-';
        db.query(
            `UPDATE reviews SET likes = GREATEST(0, likes ${operator} 1) WHERE id = ?`,
            [req.params.id],
            (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: `Review ${action}d successfully` });
            }
        );
    });

    // Fallback for SPA (React) if running from server
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'));
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server live on http://localhost:${PORT}`);
    });
};

initializeDB();
