import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location]);

  const toggleMegaMenu = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setMegaMenuOpen(!megaMenuOpen);
    }
  };

  return (
    <>
      <div 
        id="scroll-progress" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <header className={scrolled ? 'scrolled' : ''} id="main-header" style={{ backgroundColor: (scrolled || mobileMenuOpen) ? 'var(--bg-white)' : 'transparent' }}>
        <div className="container">
          <nav>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Keinen Corp" style={{ height: '80px' }} />
            </Link>
            
            {/* Desktop Navigation */}
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              
              <li className={`has-mega ${megaMenuOpen ? 'force-show' : ''}`}>
                <NavLink to="/solutions" onClick={toggleMegaMenu}>
                  Solutions <i className="fas fa-chevron-down" style={{ fontSize: '0.6rem', marginLeft: '5px' }}></i>
                </NavLink>
                <div className="mega-menu">
                  <div className="mega-col">
                    <h5>Our Services</h5>
                    <div className="service-list">
                      <Link to="/solutions" className="service-item active">
                        <span><i className="fas fa-shield-alt"></i> Cybersecurity</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
                      </Link>
                      <Link to="/solutions" className="service-item">
                        <span><i className="fas fa-database"></i> Data & AI Services</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
                      </Link>
                      <Link to="/solutions" className="service-item">
                        <span><i className="fas fa-bolt"></i> Digital Transformation</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
                      </Link>
                    </div>
                  </div>
                  <div className="mega-col">
                    <h5>Sub Services</h5>
                    <ul className="sub-service-list">
                      <li>Cloud Security</li>
                      <li>Data Privacy</li>
                      <li>Incident Response</li>
                      <li>Zero Trust Networking</li>
                      <li>Identity Management</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <h5>Recommended</h5>
                    <div className="solution-list">
                      <div className="solution-item">
                        <div className="solution-icon"><i className="fas fa-search"></i></div>
                        <div className="solution-text">Managed Detection (MDR)</div>
                      </div>
                      <div className="solution-item">
                        <div className="solution-icon"><i className="fas fa-lightbulb"></i></div>
                        <div className="solution-text">Risk Transformation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li><NavLink to="/industries">Industries</NavLink></li>
              <li><NavLink to="/why-us">Why Us</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>

            <div className="header-action">
              <Link to="/contact" className="btn btn-red" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}>Talk to an Architect</Link>
            </div>

            <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
          </nav>
        </div>
      </header>

      <style>{`
        .has-mega.force-show .mega-menu {
          visibility: visible !important;
          opacity: 1 !important;
          transform: translateX(-50%) translateY(10px) !important;
        }

        @media (max-width: 1024px) {
          .mega-menu {
            position: static !important;
            transform: none !important;
            width: 100% !important;
            display: none !important;
            box-shadow: none !important;
            padding: 15px !important;
            grid-template-columns: 1fr !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          .has-mega.force-show .mega-menu {
            display: block !important;
          }
          .mega-col { border: none !important; padding: 10px 0 !important; }
        }

        @media (max-width: 768px) {
          .hamburger { display: block !important; cursor: pointer; font-size: 1.5rem; color: var(--text-dark); }
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: white;
            flex-direction: column;
            padding: 100px 30px;
            transition: 0.3s ease;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          }
          .nav-links.mobile-active { right: 0; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
