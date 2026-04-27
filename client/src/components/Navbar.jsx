import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''} id="main-header">
      <div className="container">
        <nav>
          <Link to="/" className="logo">KEINEN<span>CORP</span></Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/industries">Industries</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="header-action">
            <Link to="/contact" className="btn btn-red">Talk to an Architect</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
