-- Keinen Corp Database Schema (Full Content)

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

-- Seed Data for all 7 Disciplines
INSERT INTO services (title, description, tags, icon_class, display_order) VALUES
('Enterprise Networks & IT Infrastructure', 'The foundation everything else depends on. Enterprise-grade wired/wireless networks, SD-WAN, and UC connecting teams globally.', '["Enterprise Networks", "SD-WAN", "UC", "IT Infrastructure"]', 'fas fa-network-wired', 1),
('OT & Industrial Automation', 'Your operations, made intelligent. SCADA/HMI, PLC/DCS, MES integration, and predictive maintenance.', '["SCADA/HMI", "PLC/DCS", "MES", "Predictive Maintenance"]', 'fas fa-industry', 2),
('Cybersecurity — IT/OT Convergence', 'Security designed to protect what matters most. IT/OT assessments aligned to IEC 62443, NIST CSF, ISO 27001.', '["IEC 62443", "Zero Trust", "NAC", "NIST CSF"]', 'fas fa-shield-alt', 3),
('Data Center Design & Excellence', 'Infrastructure engineered to never fail. TIA-942 compliant design Tier I–IV. High-efficiency cooling, redundant power.', '["TIA-942", "Uptime Tier IV", "DCIM", "N+1 Redundancy"]', 'fas fa-server', 4),
('Intelligent Video & Physical Security', 'See everything. AI-powered analytics: anomaly detection, crowd analysis, ANPR. Access control: biometric, card-based.', '["VMS", "AI Analytics", "ANPR", "Access Control"]', 'fas fa-video', 5),
('Audiovisual & Unified Collaboration', 'Workplaces built for how people actually work. Teams Rooms, Webex, digital signage, and managed AV services.', '["Video Conferencing", "Digital Signage", "Command Centres"]', 'fas fa-users', 6),
('Digital Transformation & Industry X.0', 'Your transformation. Architectured. Delivered. Sustained. SIRI assessments, TOGAF-aligned architecture, and Industry X.0 roadmaps.', '["SIRI Assessment", "TOGAF", "Industry X.0", "Change Management"]', 'fas fa-rocket', 7);

-- Seed Data for Industries
INSERT INTO industries (name, description, image_url) VALUES
('Manufacturing & Process', 'ISA-95 architectures, MES-SCADA integration, OEE intelligence, and full Industry X.0 transformation.', 'sector_manufacturing_red_1777267582086.png'),
('Oil & Gas', 'ATEX/IECEx certified for explosive hazardous areas. Safety Instrumented Systems (SIS), SIL assessment.', 'sector_energy_red_1777267533087.png'),
('Pharmaceuticals & Biotech', '21 CFR Part 11 compliant data systems. GAMP 5 validated automation. EBR integration.', 'sector_pharma_red_1777267596457.png'),
('Healthcare Facilities', 'Clinical network resilience, smart hospital IoT, and HIPAA-compliant data security.', 'sector_datacenter_red_1777267630948.png'),
('Automotive Assembly', 'Industrial wireless for AGVs, high-speed vision inspection, and production line UC.', 'sector_automotive_red_1777267613718.png');
