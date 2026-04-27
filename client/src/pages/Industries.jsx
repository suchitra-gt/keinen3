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
        console.error('API Error, using fallback sectors:', err);
        setIndustries([
          { id: 1, name: 'Manufacturing & Process', description: 'ISA-95 architectures, MES-SCADA integration, OEE intelligence, and full Industry X.0 transformation.', image_url: 'sector_manufacturing_red_1777267582086.png' },
          { id: 2, name: 'Oil & Gas', description: 'ATEX/IECEx certified for explosive hazardous areas. Safety Instrumented Systems (SIS), SIL assessment.', image_url: 'sector_energy_red_1777267533087.png' },
          { id: 3, name: 'Pharmaceuticals & Biotech', description: '21 CFR Part 11 compliant data systems. GAMP 5 validated automation. EBR integration.', image_url: 'sector_pharma_red_1777267596457.png' },
          { id: 4, name: 'FMCG & Packaging', description: 'High-speed line automation, vision inspection systems, and warehouse management integration.', image_url: 'sector_cybersecurity_red_1777267513899.png' }
        ]);
      }
    };
    fetchIndustries();
  }, []);

  const industryDeepDives = [
    {
      id: '05A',
      title: 'Education — Smart Education Systems',
      subtitle: 'AI-Powered Learning. Connected Campuses. Better Outcomes.',
      description: 'Education institutions are under increasing pressure to personalise learning, improve student outcomes, and manage operations efficiently. Keinen enables schools, colleges, and universities to build intelligent, connected ecosystems — from smart classrooms to AI-driven learning analytics platforms.',
      capabilities: [
        { icon: 'fas fa-brain', text: 'AI-powered learning analytics — track engagement and personalise learning pathways.' },
        { icon: 'fas fa-chart-line', text: 'Student performance prediction using ML models for early intervention.' },
        { icon: 'fas fa-university', text: 'Smart campus infrastructure — IoT attendance and energy management.' },
        { icon: 'fas fa-chalkboard-teacher', text: 'LMS integration with video conferencing for hybrid learning.' }
      ],
      useCase: {
        title: 'State University, Karnataka — Smart Campus Transformation',
        challenge: 'Paper-heavy administration, fragmented IT infrastructure across 6 campuses.',
        solution: 'Keinen deployed a unified LMS with AI analytics, IoT attendance, and a centralised cybersecurity layer.',
        results: ['60% reduction in admin workload', '28% improvement in student intervention', 'Delivered in 8 months']
      }
    },
    {
      id: '05B',
      title: 'Healthcare — Digital Healthcare Transformation',
      subtitle: 'AI-Driven Patient Care. Smart Hospitals. Operational Excellence.',
      description: 'Healthcare providers face a dual mandate: deliver better patient outcomes while reducing operational costs. Keinen bridges clinical and operational technology — connecting medical devices and systems into a unified ecosystem.',
      capabilities: [
        { icon: 'fas fa-heartbeat', text: 'AI-based patient monitoring — real-time vitals tracking and anomaly alerts.' },
        { icon: 'fas fa-diagnoses', text: 'Predictive diagnostics using ML models flagging high-risk patients.' },
        { icon: 'fas fa-hospital-alt', text: 'Smart hospital IoT infrastructure — asset tracking and equipment monitoring.' },
        { icon: 'fas fa-file-medical', text: 'Electronic Health Records (EHR) integration with secure clinical networks.' }
      ],
      useCase: {
        title: 'Hospital Group, Bengaluru — Digital Hospital Platform',
        challenge: 'Disconnected systems across 3 hospitals and recurring data breaches.',
        solution: 'Integrated EHR-connected IoT patient monitoring with HIPAA-compliant zero-trust network.',
        results: ['45% faster clinical response', '30% reduction in scheduling errors', 'Zero security incidents in 12 months']
      }
    }
  ];

  return (
    <div className="industries-page" style={{ paddingTop: '100px' }}>
      <section className="sectors section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>
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
                whileHover={{ y: -5 }}
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

      {/* Deep Dives */}
      {industryDeepDives.map((deepDive, index) => (
        <section key={index} className="section-padding" style={{ background: index % 2 === 0 ? 'var(--bg-gray)' : 'white' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>
                {deepDive.id} &middot; INDUSTRY FOCUS
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{deepDive.title}</h2>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-red)', marginBottom: '16px' }}>{deepDive.subtitle}</p>
              <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>{deepDive.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
              {deepDive.capabilities.map((cap, i) => (
                <div key={i} style={{ background: index % 2 === 0 ? 'white' : 'var(--bg-gray)', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', gap: '16px' }}>
                  <i className={cap.icon} style={{ color: 'var(--primary-red)', fontSize: '1.3rem' }}></i>
                  <p style={{ fontSize: '0.95rem' }}>{cap.text}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 25px rgba(0,0,0,0.07)', border: index % 2 === 0 ? 'none' : '1px solid #eee' }}>
              <div style={{ background: 'var(--primary-red)', padding: '24px 36px' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Use Case</p>
                <h4 style={{ color: 'white', fontSize: '1.3rem', margin: 0 }}>{deepDive.useCase.title}</h4>
              </div>
              <div style={{ padding: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '10px' }}>Challenge</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{deepDive.useCase.challenge}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '10px' }}>Solution</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{deepDive.useCase.solution}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '10px' }}>Result</strong>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {deepDive.useCase.results.map((res, j) => (
                      <li key={j} style={{ fontSize: '0.85rem', background: 'var(--bg-gray)', padding: '8px 12px', borderRadius: '4px', marginBottom: '6px' }}>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Industries;
