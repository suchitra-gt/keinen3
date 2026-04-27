import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header effect
      setScrolled(window.scrollY > 50);
      
      // Progress bar calculation
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        id="scroll-progress" 
        style={{ 
          width: `${scrollProgress}%`, 
          height: '4px', 
          background: 'var(--primary-red)', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: 2000, 
          transition: 'width 0.1s ease-out' 
        }} 
      />

      {/* Top Contact Bar */}
      <div className="top-header">
        <div className="container">
          <div className="top-header-content">
            <div className="contact-items">
              <span><i className="fas fa-phone"></i> +91 80415 01718</span>
              <span><i className="fas fa-envelope"></i> info@keinen.in</span>
            </div>
            <div className="social-items">
              <a href="https://linkedin.com/company/keinen-techne-solutions" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className={scrolled ? 'scrolled' : ''} id="main-header">
        <div className="container">
          <nav>
            <Link to="/" className="logo">KEINEN<span>CORP</span></Link>
            <ul className="nav-links">
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/industries">Industries</NavLink></li>
              <li><NavLink to="/why-us">Why Us</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="header-action">
              <Link to="/contact" className="btn btn-red">Talk to an Architect</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
