import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

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
  );
};

export default Navbar;
