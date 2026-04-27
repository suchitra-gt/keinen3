import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: '20px' }}>KEINEN<span>CORP</span></div>
            <p style={{ fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.8' }}>
              We architect integrated digital ecosystems for enterprises to perform at full potential — securely, efficiently, at scale.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <span><i className="fas fa-phone" style={{ color: 'var(--primary-red)', marginRight: '8px' }}></i>+91 80415 01718</span>
              <span><i className="fas fa-envelope" style={{ color: 'var(--primary-red)', marginRight: '8px' }}></i>info@keinen.in</span>
              <span><i className="fas fa-map-marker-alt" style={{ color: 'var(--primary-red)', marginRight: '8px' }}></i>Bengaluru, India</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Enterprise Networks</Link></li>
              <li><Link to="/services">Industrial Automation</Link></li>
              <li><Link to="/services">Cybersecurity</Link></li>
              <li><Link to="/services">Data Centers</Link></li>
              <li><Link to="/services">Intelligent Video</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://linkedin.com/company/keinen-techne-solutions" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-red)' }}>
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>
        <div style={{ paddingTop: '30px', marginTop: '50px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.85rem' }}>
          <p>&copy; 2025 Keinen Techne Solutions Private Limited. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
