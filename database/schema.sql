-- Keinen Corp Database Schema

CREATE DATABASE IF NOT EXISTS keinen_db;
USE keinen_db;

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags JSON,
    icon_class VARCHAR(100),
    display_order INT DEFAULT 0
);

-- Industries Table
CREATE TABLE IF NOT EXISTS industries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data for Services
INSERT INTO services (title, description, tags, icon_class, display_order) VALUES
('Enterprise Networks & IT Infrastructure', 'The foundation everything else depends on. Enterprise-grade wired/wireless networks, SD-WAN, and UC connecting teams globally.', '["Enterprise Networks", "SD-WAN", "UC", "IT Infrastructure"]', 'fas fa-network-wired', 1),
('OT & Industrial Automation', 'Your operations, made intelligent. SCADA/HMI, PLC/DCS, MES integration, and predictive maintenance.', '["SCADA/HMI", "PLC/DCS", "MES", "Predictive Maintenance"]', 'fas fa-industry', 2),
('Cybersecurity — IT/OT Convergence', 'Security designed to protect what matters most. IT/OT assessments aligned to IEC 62443, NIST CSF, ISO 27001.', '["IEC 62443", "Zero Trust", "NAC", "NIST CSF"]', 'fas fa-shield-alt', 3);

-- Seed Data for Industries
INSERT INTO industries (name, description, image_url) VALUES
('Manufacturing & Process', 'ISA-95 architectures, MES-SCADA integration, OEE intelligence, and full Industry X.0 transformation.', 'sector_manufacturing_red_1777267582086.png'),
('Oil & Gas', 'ATEX/IECEx certified for explosive hazardous areas. Safety Instrumented Systems (SIS), SIL assessment.', 'sector_energy_red_1777267533087.png'),
('Pharmaceuticals & Biotech', '21 CFR Part 11 compliant data systems. GAMP 5 validated automation. EBR integration.', 'sector_pharma_red_1777267596457.png');
