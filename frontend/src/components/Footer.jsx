import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div data-aos="fade-right">
                        <Link to="/" className="footer-logo">
                            <img src="/logo.png" alt="Keinen Corp" style={{ height: '90px' }} />
                        </Link>
                        <p>Architecting the digital ecosystems of tomorrow. We specialize in enterprise IT, OT, security, and digital transformation.</p>
                    </div>
                    <div className="footer-links" data-aos="fade-up" data-aos-delay="100">
                        <h4>Solutions</h4>
                        <ul>
                            <li><Link to="/solutions">Cybersecurity</Link></li>
                            <li><Link to="/solutions">Data & AI</Link></li>
                            <li><Link to="/solutions">Digital Transformation</Link></li>
                            <li><Link to="/solutions">Enterprise Apps</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links" data-aos="fade-up" data-aos-delay="200">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/industries">Industries</Link></li>
                            <li><Link to="/why-us">Why Keinen</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="newsletter" data-aos="fade-left">
                        <h4>Stay Ahead</h4>
                        <p>Get insights on the latest in enterprise technology.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Email Address" />
                            <button type="submit" className="btn btn-red" style={{ padding: '12px 20px' }}>
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="bottom-footer">
                    <p>&copy; {new Date().getFullYear()} Keinen Corp. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
