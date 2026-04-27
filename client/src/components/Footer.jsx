import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="logo" style={{ marginBottom: '25px' }}>KEINEN<span>CORP</span></div>
            <p className="footer-desc">
              We architect integrated digital ecosystems for enterprises to perform at full potential — securely, efficiently, at scale.
            </p>
            <div className="footer-contact-info">
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <span>+91 80415 01718</span>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>info@keinen.in</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/services">Enterprise Networks</Link></li>
              <li><Link to="/services">OT & Automation</Link></li>
              <li><Link to="/services">Cybersecurity</Link></li>
              <li><Link to="/services">Data Centers</Link></li>
              <li><Link to="/services">Digital Transformation</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Industries</h4>
            <ul>
              <li><Link to="/industries">Manufacturing</Link></li>
              <li><Link to="/industries">Oil & Gas</Link></li>
              <li><Link to="/industries">Pharmaceuticals</Link></li>
              <li><Link to="/industries">Healthcare</Link></li>
              <li><Link to="/industries">Education</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Keinen</Link></li>
              <li><Link to="/why-us">Why Choose Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="https://linkedin.com/company/keinen-techne-solutions" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Keinen Techne Solutions Private Limited. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/legal">Legal Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
