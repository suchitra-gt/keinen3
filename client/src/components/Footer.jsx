import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="Keinen Corp" style={{ height: '60px' }} />
            </Link>
            <p>Architecting the digital ecosystems of tomorrow. We specialize in enterprise IT, OT, security, and digital transformation.</p>
          </div>
          <div className="footer-links">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/solutions">Cybersecurity</Link></li>
              <li><Link to="/solutions">Data & AI</Link></li>
              <li><Link to="/solutions">Enterprise Apps</Link></li>
              <li><Link to="/solutions">IT Infrastructure</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/why-us">Why Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Newsletter</h4>
            <div className="newsletter">
              <p>Stay updated with our latest industry insights.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" required />
                <button type="submit" className="btn btn-red" style={{ padding: '10px 15px' }}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <p>&copy; 2024 Keinen Corp. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/918041501718" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </footer>
  );
};

export default Footer;
