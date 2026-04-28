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
