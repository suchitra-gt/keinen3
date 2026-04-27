import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-page" style={{ paddingTop: '100px' }}>
      <section className="pillars section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>
              03 &middot; SERVICES
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Seven Disciplines. One Integrated Ecosystem.</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              Each capability compounds in value when combined. We architect solutions that break down silos.
            </p>
          </div>

          <div className="pillar-grid">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
      
      {/* Frameworks Section */}
      <section className="frameworks section-padding" style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.3rem' }}>The Keinen Blueprint</h2>
            <p style={{ color: 'var(--text-muted)' }}>Precision engineering guided by global standards.</p>
          </div>
          <div className="framework-grid">
            <div className="framework-box">
              <h4>ISA-95 &amp; Industry X.0</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Standardized interface between enterprise and control systems for seamless manufacturing intelligence.</p>
            </div>
            <div className="framework-box">
              <h4>IEC 62443 Security</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>The gold standard for industrial automation and control systems (IACS) cybersecurity.</p>
            </div>
            <div className="framework-box">
              <h4>TOGAF Architecture</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enterprise architecture framework ensuring business-IT alignment and strategic scalability.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
