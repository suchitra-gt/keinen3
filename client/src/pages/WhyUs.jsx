import React from 'react';
import { motion } from 'framer-motion';

const WhyUs = () => {
  return (
    <div className="why-us-page" style={{ paddingTop: '100px' }}>
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>
              04 &middot; WHY CHOOSE US
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>The Difference Is in How We Think.</h2>
          </div>

          <div className="beliefs-grid">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="belief-item"
            >
              <h4>One Architect. Total Accountability.</h4>
              <p>No hand-offs. No blame games. No gaps. Your entire digital estate designed by one team. Single accountability from concept through commissioning.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="belief-item"
            >
              <h4>Frameworks Are Our Engineering Language.</h4>
              <p>Built on ISA-95, IEC 62443, TOGAF, TIA-942, NIST CSF, ISO 27001, GAMP 5. Compliance embedded in architecture from the first design decision.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="belief-item"
            >
              <h4>We Build for Your Future, Not Just Today.</h4>
              <p>Every architecture includes explicit growth paths. Technology selection driven by your 5-year trajectory. Full documentation: every architecture decision, every configuration.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ marginTop: '60px', padding: '60px', background: 'var(--bg-gray)', borderRadius: '12px', textAlign: 'center' }}
          >
            <p style={{ fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--primary-red)', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px' }}>
              &ldquo;We don&rsquo;t deliver systems. We deliver outcomes &mdash; and we stay until those outcomes are real.&rdquo;
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginTop: '40px' }}>
              <div>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>Predictable</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Framework-driven outcomes you can forecast before a single cable is run.</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>Integrated</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Every system works with every other system, today and as you scale.</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>Enduring</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Infrastructure that improves with your business, not replaced every 3 years.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges / Stats Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.6 }}>
             <div style={{ textAlign: 'center' }}>
               <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-red)' }}>100%</h3>
               <p style={{ fontWeight: '600' }}>Compliance</p>
             </div>
             <div style={{ textAlign: 'center' }}>
               <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-red)' }}>24/7</h3>
               <p style={{ fontWeight: '600' }}>Resilience</p>
             </div>
             <div style={{ textAlign: 'center' }}>
               <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-red)' }}>Zero</h3>
               <p style={{ fontWeight: '600' }}>Blame Games</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
