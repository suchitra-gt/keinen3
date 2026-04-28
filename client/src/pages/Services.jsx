import React, { useState, useEffect } from 'react';
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
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Core <span className="gradient-text">Solutions</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
              We architect the digital ecosystems that power the modern enterprise. From secure networking to industrial automation.
            </p>
          </div>

          <div className="pillar-grid">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -12 }}
                className="pillar-card"
                style={{ cursor: 'pointer' }}
              >
                <div className="pillar-num">{String(service.id).padStart(2, '0')}</div>
                <h3 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>{service.description}</p>
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

      {/* Methodology Section */}
      <section className="section-padding" style={{ background: 'rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Our <span className="gradient-text">Framework</span> Driven Methodology</h2>
              <p style={{ marginBottom: '20px' }}>We don't just "deploy" technology. We architect it using globally recognized standards to ensure security, interoperability, and long-term ROI.</p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                  <i className="fas fa-check" style={{ color: 'var(--primary-red)' }}></i>
                  <span><strong>Assessment:</strong> TOGAF-aligned landscape analysis.</span>
                </li>
                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                  <i className="fas fa-check" style={{ color: 'var(--primary-red)' }}></i>
                  <span><strong>Design:</strong> ISA-95 & IEC 62443 secure architectures.</span>
                </li>
                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                  <i className="fas fa-check" style={{ color: 'var(--primary-red)' }}></i>
                  <span><strong>Delivery:</strong> Agile implementation and validation.</span>
                </li>
              </ul>
            </div>
            <div style={{ background: 'white', padding: '50px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>Outcome Focus</div>
              <p>"We measure success not by the project handover, but by the operational efficiency and security posture achieved twelve months later."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
