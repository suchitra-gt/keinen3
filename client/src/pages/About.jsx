import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-page">
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 style={{ color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Our Identity</h4>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Architecting the <span className="gradient-text">Connected</span> Enterprise</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Keinen is more than a consultancy; we are a specialized engineering firm that treats IT, OT, and Security as a single, unified ecosystem.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #eee' }}>
                  <h3 style={{ color: 'var(--primary-red)', fontSize: '2.5rem' }}>150+</h3>
                  <p style={{ fontWeight: '600' }}>Global Projects</p>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #eee' }}>
                  <h3 style={{ color: 'var(--primary-red)', fontSize: '2.5rem' }}>24/7</h3>
                  <p style={{ fontWeight: '600' }}>Managed Support</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden visible"
            >
              <img src="/about_tech_architects_red_1777267955851.png" alt="Architecture" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding" style={{ background: 'rgba(229, 57, 53, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Our <span className="gradient-text">Core</span> Philosophy</h2>
          </div>
          <div className="pillar-grid">
            <div className="pillar-card">
              <h4 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>Holistic Architecture</h4>
              <p>We don't sell products; we architect outcomes. Every component is designed to strengthen the entire ecosystem.</p>
            </div>
            <div className="pillar-card">
              <h4 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>Operational Security</h4>
              <p>Security and uptime aren't optional extras. They are the foundation of every solution we deliver.</p>
            </div>
            <div className="pillar-card">
              <h4 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>Sustainable Scalability</h4>
              <p>We build for today with a sharp eye on tomorrow, ensuring your infrastructure evolves as fast as your business.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
