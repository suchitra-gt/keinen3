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
        console.error(err);
      }
    };
    fetchIndustries();
  }, []);

  return (
    <div className="industries-page" style={{ paddingTop: '100px' }}>
      <section className="sectors section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px', letter-spacing: '2px' }}>
              Our Sectors
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Mission-Critical Infrastructure for Global Industries.</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
              We don't just understand technology; we understand your environment. Our frameworks are built for the unique demands of each sector.
            </p>
          </div>

          <div className="sector-grid">
            {industries.map((sector) => (
              <motion.div 
                key={sector.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="sector-card"
              >
                <img src={sector.image_url} className="sector-img" alt={sector.name} />
                <div className="sector-content">
                  <h4>{sector.name}</h4>
                  <p>{sector.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
