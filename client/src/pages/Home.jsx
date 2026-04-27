import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    // Fetch data from our Node.js API
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get('http://localhost:5000/api/services');
        const industriesRes = await axios.get('http://localhost:5000/api/industries');
        setServices(servicesRes.data);
        setIndustries(industriesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-content"
          >
            <h1>Where Intelligence Meets Infrastructure.</h1>
            <p>We design and deploy integrated IT, OT, security, and automation ecosystems that don't just connect your enterprise — they make it intelligent.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/services" className="btn btn-red">Discover Our Solutions &rarr;</a>
              <a href="/contact" className="btn btn-outline" style={{ borderCCcolor: 'rgba(255,255,255,0.6)', color: 'white' }}>Talk to an Architect</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-label">Framework-Driven</div>
              <div className="trust-value">ISA-95 &middot; IEC 62443 &middot; TOGAF &middot; TIA-942</div>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <div className="trust-label">Industry-Proven</div>
              <div className="trust-value">Manufacturing &middot; Pharma &middot; Oil &amp; Gas &middot; FMCG</div>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <div className="trust-label">Outcome-Guaranteed</div>
              <div className="trust-value">Uptime &middot; Security &middot; Scalability &middot; ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services (Dynamic) */}
      <section className="pillars section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Our Core Disciplines</h2>
            <p style={{ color: 'var(--text-muted)' }}>Each capability compounds in value when combined.</p>
          </div>
          <div className="pillar-grid">
            {services.slice(0, 3).map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                className="pillar-card"
              >
                <div className="pillar-num">{String(service.id).padStart(2, '0')}</div>
                <h3 style={{ color: 'var(--primary-red)' }}>{service.title}</h3>
                <p>{service.description}</p>
                <div className="pillar-tags">
                  {JSON.parse(service.tags || '[]').map((tag, idx) => (
                    <span key={idx} className="pillar-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
