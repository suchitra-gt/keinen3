import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Industries = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await axios.get('/api/industries');
        setIndustries(res.data);
      } catch (err) {
        console.error('Error fetching industries:', err);
      }
    };
    fetchIndustries();
  }, []);

  return (
    <div className="industries-page">
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Industries We <span className="gradient-text">Empower</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
              From deep-sea platforms to high-tech campuses, we provide the architectural depth required for mission-critical operations.
            </p>
          </div>

          <div className="sector-grid">
            {industries.length > 0 ? industries.map((industry) => (
              <motion.div 
                key={industry.id}
                whileHover={{ y: -10 }}
                className="sector-card"
              >
                <img src={industry.image_url} alt={industry.name} />
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
              </motion.div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
                <p>Loading industrial intelligence... (Please ensure MySQL is running and seeded)</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Domain Expertise Section */}
      <section className="section-padding" style={{ background: 'rgba(229, 57, 53, 0.02)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '50px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>Sector Specialization</div>
              <p>We don't just know tech; we know your industry's specific regulatory, safety, and operational pressures. Our architects are trained to speak your language—whether it's ISA-95 for manufacturing or HIPAA for healthcare.</p>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Architecture <span className="gradient-text">Tailored</span> for You</h2>
              <p>Standard IT solutions often fail in operational environments. We bridge the gap between the boardroom and the shop floor.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
