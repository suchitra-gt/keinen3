import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Solutions', path: '/solutions', hasMega: true },
        { name: 'Industries', path: '/industries' },
        { name: 'Blog/News', path: '/blog' },
        { name: 'Reviews', path: '/reviews' },
    ];

    const navLinksSecondary = [
        { name: 'FAQ', path: '/faq' },
        { name: 'Careers', path: '/careers' },
        { name: 'Why Us', path: '/why-us' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header id="main-header" className="glass-header">
            <div className="container">
                <nav>
                    <Link to="/" className="logo">
                        <img src="/logo.png" alt="Keinen Corp" style={{ height: '90px' }} />
                    </Link>
                    
                    <div className="nav-wrapper">
                        <ul className="nav-row">
                            {navLinks.map((link, idx) => (
                                <React.Fragment key={link.name}>
                                    <li className={link.hasMega ? 'has-mega-menu' : ''}>
                                        <Link 
                                            to={link.path} 
                                            className={location.pathname === link.path ? 'active' : ''}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.hasMega && (
                                            <div className="mega-menu-dropdown">
                                                <div className="mega-col">
                                                    <h5>OUR SERVICES</h5>
                                                    <ul className="service-list">
                                                        <li className="service-item active">Cybersecurity</li>
                                                        <li className="service-item">Data & AI Services</li>
                                                        <li className="service-item">Digital Transformation</li>
                                                        <li className="service-item">Enterprise Applications</li>
                                                        <li className="service-item">IT Workforce Solutions</li>
                                                    </ul>
                                                </div>
                                                <div className="mega-col">
                                                    <h5>SUB SERVICES</h5>
                                                    <ul className="sub-service-list">
                                                        <li>MDR / SOC as a Service</li>
                                                        <li>Zero Trust Architecture</li>
                                                        <li>OT/ICS Security</li>
                                                        <li>Incident Response</li>
                                                    </ul>
                                                </div>
                                                <div className="mega-col" style={{ borderRight: 'none' }}>
                                                    <h5>RECOMMENDED SOLUTIONS</h5>
                                                    <div className="solution-item">
                                                        <strong>SentinelShield™</strong>
                                                        <p>Managed detection and response platform.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                    {idx < navLinks.length - 1 && <li className="dot-sep"></li>}
                                </React.Fragment>
                            ))}
                        </ul>
                        <ul className="nav-row">
                            {navLinksSecondary.map((link, idx) => (
                                <React.Fragment key={link.name}>
                                    <li>
                                        <Link 
                                            to={link.path}
                                            className={location.pathname === link.path ? 'active' : ''}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                    {idx < navLinksSecondary.length - 1 && <li className="dot-sep"></li>}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>

                    <Link to="/contact" className="btn btn-red pulse-btn" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>
                        Talk to an Architect
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
