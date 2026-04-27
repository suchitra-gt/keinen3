import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-page" style={{ paddingTop: '100px' }}>
      <section className="who-we-are section-padding">
        <div className="container">
          <div className="who-grid">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="who-text"
            >
              <div className="label" style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px', fontSize: '0.9rem' }}>
                Who Are We
              </div>
              <div className="quote">&ldquo;When technology is invisible, your people are unstoppable.&rdquo;</div>
              <p>Keinen is your digital transformation architect — a team of specialists who treat IT, OT, Security, and Operations as one interconnected system.</p>
              <p>We think in ecosystems — every challenge is viewed as a complete picture. Engineers are trained across IT, OT, cybersecurity, data center, video, and collaboration. No silos, no hand-offs.</p>
              <p style={{ fontStyle: 'italic', color: 'var(--primary-red)', fontSize: '1rem' }}>
                &ldquo;Technology should be the silent engine of your success — not the loudest problem in your boardroom.&rdquo;
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="who-image"
            >
              <img 
                src="about_tech_architects_red_1777267955851.png" 
                style={{ width: '100%', borderRadius: '10px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} 
                alt="Digital Transformation Architecture" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="beliefs section-padding" style={{ background: 'var(--bg-gray)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>The Keinen Philosophy</h2>
          </div>
          <div className="beliefs-grid">
            <div className="belief-item">
              <h4>Holistic Design</h4>
              <p style={{ color: 'var(--text-muted)' }}>We don't sell products; we architect outcomes. Every component is designed to strengthen the entire ecosystem.</p>
            </div>
            <div className="belief-item">
              <h4>Operational Resilience</h4>
              <p style={{ color: 'var(--text-muted)' }}>Security and uptime aren't optional extras. They are the foundation of every solution we deliver.</p>
            </div>
            <div className="belief-item">
              <h4>Future Proofing</h4>
              <p style={{ color: 'var(--text-muted)' }}>We build for today with a sharp eye on tomorrow, ensuring your infrastructure evolves as fast as your business.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
