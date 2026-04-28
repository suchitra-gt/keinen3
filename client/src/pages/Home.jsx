import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Updated to port 8050
        const servicesRes = await axios.get('/api/services');
        const industriesRes = await axios.get('/api/industries');
        setServices(servicesRes.data);
        setIndustries(industriesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section - Matched to provided HTML */}
      <section className="hero" id="home">
        <div className="hero-video">
          <video autoPlay muted loop playsinline poster="https://images.openai.com/static-rsc-4/4MPtTEcmxGL9Bzck9Hh8wGurVKo0ctlLEj41B0CUI3i5lez01AAybpTu-W9Z74EZNsinCpgkGYhsAoLg_X7cTFr0bjdaNV9eYS7gcu_2HlsCD1u4CII4hw2f4i5Odc7r4LmPxDo83Fsn-XnYJccUtPaYOgUyy3Ea30U6tFdjGU-p8Hjo_Wp9z07Z_gwsDKJx?purpose=fullsize">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-factory-31405-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-content"
            style={{ maxWidth: '850px' }}
          >
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1.5rem', color: 'var(--primary-red)', fontWeight: '700', background: 'rgba(229, 57, 53, 0.1)', display: 'inline-block', padding: '5px 15px', borderRadius: '4px' }}>
                Global Technology Architects
            </h4>
            <h1 style={{ fontSize: '3.5rem', color: 'white' }}>Architecting Digital <span style={{ color: 'var(--primary-red)' }}>Ecosystems</span></h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.9)' }}>
                We design and deploy integrated IT, OT, and Security ecosystems that don't just connect your enterprise — they make it intelligent, resilient, and ready for the next era.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="/solutions" className="btn btn-red" style={{ padding: '1.2rem 2.5rem' }}>Explore Solutions &rarr;</a>
              <a href="/contact" className="btn" style={{ border: '2px solid white', color: 'white', padding: '1.2rem 2.5rem' }}>Get a Consultation</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section - Matched to provided HTML */}
      <section className="section-padding" id="about">
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <h4 style={{ color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Who We Are</h4>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Architects of the <span className="gradient-text">Next</span> Era</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Keinen Corp is a leading technology consultancy focused on building integrated IT, OT, and security ecosystems. We don't just connect businesses; we make them intelligent.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div>
                            <h3 style={{ color: 'var(--primary-red)', fontSize: '2.5rem' }}>150+</h3>
                            <p style={{ fontWeight: '600' }}>Global Projects</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--primary-red)', fontSize: '2.5rem' }}>24/7</h3>
                            <p style={{ fontWeight: '600' }}>Managed Support</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <a href="/about" className="btn btn-red">Our Full Story &rarr;</a>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                    <img src="/about_tech_architects_red_1777267955851.png" alt="Tech Architects" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
                </motion.div>
            </div>
        </div>
      </section>

      {/* Solutions Section (Dynamic) */}
      <section className="section-padding" style={{ background: '#fdfdfd' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Core <span className="gradient-text">Solutions</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Advanced technology implementations for complex business challenges.</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                }
            }}
            className="pillar-grid"
          >
            {services.length > 0 ? services.map((service) => (
              <motion.div 
                key={service.id}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                    y: -12, 
                    boxShadow: "0 20px 40px rgba(229, 57, 53, 0.12)",
                    scale: 1.02
                }}
                className="pillar-card"
              >
                <div className="pillar-num">{String(service.id).padStart(2, '0')}</div>
                <h3 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>{service.title || service.name}</h3>
                <p style={{ fontSize: '0.95rem' }}>{service.description}</p>
                <div className="pillar-tags">
                  <span className="pillar-tag">Enterprise</span>
                  <span className="pillar-tag">Architecture</span>
                </div>
              </motion.div>
            )) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="pillar-card skeleton">
                  <div className="pillar-num">0{i}</div>
                  <h3>Loading...</h3>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Industries Section (Dynamic) */}
      <section className="section-padding">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Sectors We <span className="gradient-text">Transform</span></h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
            className="sector-grid"
          >
            {industries.length > 0 ? industries.map((industry) => (
              <motion.div 
                key={industry.id}
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 }
                }}
                whileHover={{ y: -10 }}
                className="sector-card"
              >
                <img src={industry.image_url} alt={industry.name} />
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
              </motion.div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
                <p>Establishing secure connection to MySQL...</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
