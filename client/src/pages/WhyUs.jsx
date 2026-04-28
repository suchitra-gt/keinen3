import React from 'react';
import { motion } from 'framer-motion';

const WhyUs = () => {
  return (
    <div className="why-us-page">
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)' }}>Why Choose <span className="gradient-text">Keinen</span>?</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
              We combine strategic consulting with deep engineering depth to deliver results that matter.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>End-to-End Capability</h3>
                <p style={{ fontSize: '1.1rem' }}>From strategic roadmaps to 24/7 managed operations, we provide a complete technology lifecycle partnership. We don't just hand off a design; we sustain the outcome.</p>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>Domain Specific Depth</h3>
                <p style={{ fontSize: '1.1rem' }}>Our architects don't just know tech; they know your industry's specific regulatory and operational pressures. We build for your reality.</p>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>Vendor Agnostic Approach</h3>
                <p style={{ fontSize: '1.1rem' }}>We recommend the right solution for your business, not the one that pays the highest commission. Our loyalty is to your infrastructure, not a vendor.</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src="/why_keinen.png" alt="Why Keinen" className="floating" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="section-padding" style={{ background: 'var(--text-dark)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'white' }}>Built on <span className="gradient-text">Faith</span>. Delivered with Excellence.</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto' }}>
              We serve clients globally from our Bengaluru headquarters, bringing Indian engineering excellence to the world stage.
            </p>
          </div>
          <div className="pillar-grid">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>15+</h3>
              <p>Countries Served</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>500+</h3>
              <p>Ecosystem Audits</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>10k+</h3>
              <p>Secured Endpoints</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
