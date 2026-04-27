import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="contact-page" style={{ paddingTop: '120px' }}>
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Talk to an Architect</h2>
            <p style={{ color: 'var(--text-muted)' }}>Ready to transform your infrastructure? We're ready to listen.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
            <div className="contact-info">
              <h3 style={{ marginBottom: '20px' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary-red)', fontSize: '1.5rem' }}></i>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Office</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Bengaluru, Karnataka, India</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <i className="fas fa-envelope" style={{ color: 'var(--primary-red)', fontSize: '1.5rem' }}></i>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Email</h4>
                    <p style={{ color: 'var(--text-muted)' }}>info@keinen.in</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <i className="fas fa-phone" style={{ color: 'var(--primary-red)', fontSize: '1.5rem' }}></i>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Phone</h4>
                    <p style={{ color: 'var(--text-muted)' }}>+91 80415 01718</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={handleSubmit} style={{ background: 'var(--bg-gray)', padding: '40px', borderRadius: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
                </div>
                <button type="submit" className="btn btn-red" style={{ width: '100%' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && <p style={{ color: 'green', marginTop: '15px' }}>Message sent successfully!</p>}
                {status === 'error' && <p style={{ color: 'red', marginTop: '15px' }}>Error sending message. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
