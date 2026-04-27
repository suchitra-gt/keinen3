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
        console.error('API Error, using fallback content:', err);
        // Fallback to original content if API fails
        setServices([
          { id: 1, title: 'Enterprise Networks & IT Infrastructure', description: 'The foundation everything else depends on. Enterprise-grade wired/wireless networks, SD-WAN, and UC connecting teams globally.', tags: '["Enterprise Networks", "SD-WAN", "UC", "IT Infrastructure"]' },
          { id: 2, title: 'OT & Industrial Automation', description: 'Your operations, made intelligent. SCADA/HMI, PLC/DCS, MES integration, and predictive maintenance.', tags: '["SCADA/HMI", "PLC/DCS", "MES", "Predictive Maintenance"]' },
          { id: 3, title: 'Cybersecurity — IT/OT Convergence', description: 'Security designed to protect what matters most. IT/OT assessments aligned to IEC 62443, NIST CSF, ISO 27001.', tags: '["IEC 62443", "Zero Trust", "NAC", "NIST CSF"]' },
          { id: 4, title: 'Data Center Design & Excellence', description: 'Infrastructure engineered to never fail. TIA-942 compliant design Tier I–IV. High-efficiency cooling, redundant power.', tags: '["TIA-942", "Uptime Tier IV", "DCIM", "N+1 Redundancy"]' },
          { id: 5, title: 'Intelligent Video & Physical Security', description: 'See everything. AI-powered analytics: anomaly detection, crowd analysis, ANPR. Access control: biometric, card-based.', tags: '["VMS", "AI Analytics", "ANPR", "Access Control"]' },
          { id: 6, title: 'Audiovisual & Unified Collaboration', description: 'Workplaces built for how people actually work. Teams Rooms, Webex, digital signage, and managed AV services.', tags: '["Video Conferencing", "Digital Signage", "Command Centres"]' },
          { id: 7, title: 'Digital Transformation & Industry X.0', description: 'Your transformation. Architectured. Delivered. Sustained. SIRI assessments, TOGAF-aligned architecture, and Industry X.0 roadmaps.', tags: '["SIRI Assessment", "TOGAF", "Industry X.0", "Change Management"]' }
        ]);
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
              Each capability compounds in value when combined. We architect solutions that break down silos between IT, OT, and Security.
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
                  {(typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags || []).map((tag, idx) => (
                    <span key={idx} className="pillar-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="ecosystem-note" style={{ background: 'var(--bg-gray)', padding: '60px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8' }}>
            <strong>The ecosystem mindset:</strong> Whether you engage us for a single capability or comprehensive transformation, every solution we architect is designed with your complete digital landscape in mind – ensuring seamless integration with your existing infrastructure and future growth trajectory.
          </p>
        </div>
      </div>
      
      <section className="frameworks section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Internationally Recognized Frameworks</h2>
            <p style={{ color: 'var(--text-muted)' }}>Industry-standard models that ensure consistency, security, and operational excellence.</p>
          </div>
          <div className="framework-grid">
            <div className="framework-box">
              <h4>Interoperability</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>When every component speaks ISA-95, IEC 62443, or TOGAF, integration isn’t guesswork – it’s guaranteed. Your “Vendor A” PLCs communicate with “Vendor B” SCADA because both follow the same architectural language.</p>
            </div>
            <div className="framework-box">
              <h4>Security-by-Design</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>By aligning to NIST CSF and IEC 62443 from day zero, we eliminate the security gaps that typically plague industrial and enterprise transformations.</p>
            </div>
            <div className="framework-box">
              <h4>Total Lifecycle Control</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>From the initial SIRI assessment to GAMP 5 validated deployment and managed operations, we provide a complete, documented engineering lifecycle.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
