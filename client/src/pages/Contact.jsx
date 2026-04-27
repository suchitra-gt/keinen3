import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ full_name: '', email: '', company: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Talk to an <span className="gradient-text">Architect</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Ready to transform your infrastructure? We're ready to listen.</p>
          </div>
          
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
            <div className="contact-info">
              <h3 style={{ marginBottom: '30px', color: 'var(--text-dark)' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="solution-icon" style={{ background: '#fff1f0', color: 'var(--primary-red)' }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Office</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Bengaluru, Karnataka, India</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="solution-icon" style={{ background: '#fff1f0', color: 'var(--primary-red)' }}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Email</h4>
                    <p style={{ color: 'var(--text-muted)' }}>info@keinen.in</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="solution-icon" style={{ background: '#fff1f0', color: 'var(--primary-red)' }}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Phone</h4>
                    <p style={{ color: 'var(--text-muted)' }}>+91 80415 01718</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="contact-form-container"
              style={{ background: 'rgba(255,255,255,0.8)', padding: '50px', borderRadius: '20px', backdropFilter: 'blur(20px)', border: '1px solid rgba(229, 57, 53, 0.1)' }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }}></textarea>
                </div>
                <button type="submit" className="btn btn-red" style={{ width: '100%', borderRadius: '8px' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && <p style={{ color: '#2ecc71', marginTop: '15px', fontWeight: '600' }}>Message sent successfully!</p>}
                {status === 'error' && <p style={{ color: '#e74c3c', marginTop: '15px', fontWeight: '600' }}>Error sending message. Please try again.</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
