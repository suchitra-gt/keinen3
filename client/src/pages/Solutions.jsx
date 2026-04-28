import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const serviceIcons = {
  CYBER: 'fa-shield-alt',
  DAIA:  'fa-brain',
  DGTL:  'fa-rocket',
  ENTP:  'fa-cogs',
  ITWS:  'fa-users',
};

const UseCaseCard = ({ uc, index }) => (
  <div className="use-case-card" style={{ animationDelay: `${index * 0.1}s` }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'var(--primary-red)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: '0.9rem', flexShrink: 0
      }}>{index + 1}</div>
      <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', margin: 0 }}>{uc.title}</h4>
    </div>
    <div className="uc-section">
      <span className="uc-label">Business Problem</span>
      {uc.problem}
    </div>
    <div className="uc-section">
      <span className="uc-label">Solution Provided</span>
      {uc.solution}
    </div>
    <div className="uc-section" style={{ marginBottom: 0 }}>
      <span className="uc-label">Business Impact</span>
      {uc.impact}
    </div>
  </div>
);

const ServiceSection = ({ service, index }) => {
  const [detail, setDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadDetail = async () => {
    if (detail) { setOpen(!open); return; }
    setLoading(true);
    try {
      const res = await axios.get(`/api/services/${service.code}`);
      setDetail(res.data);
      setOpen(true);
    } catch {
      setOpen(!open);
    }
    setLoading(false);
  };

  const isEven = index % 2 === 0;
  const tags = (() => { try { return JSON.parse(service.tags || '[]'); } catch { return []; } })();

  return (
    <div id={`service-${service.code}`} style={{
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(229,57,53,0.1)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      marginBottom: '40px',
      transition: 'box-shadow 0.3s ease',
    }}>
      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr auto' : 'auto 1fr',
        alignItems: 'center',
        padding: '40px 50px',
        gap: '30px',
        cursor: 'pointer',
        background: open ? 'linear-gradient(135deg,rgba(229,57,53,0.04),rgba(229,57,53,0.01))' : 'transparent',
      }} onClick={loadDetail}>

        <div style={{ order: isEven ? 0 : 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'linear-gradient(135deg,var(--primary-red),var(--dark-red))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '1.3rem', boxShadow: '0 8px 20px rgba(229,57,53,0.3)',
            }}>
              <i className={`fas ${serviceIcons[service.code] || 'fa-layer-group'}`}></i>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                SERVICE CATEGORY
              </div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', margin: 0, lineHeight: 1.2 }}>
                {service.title}
              </h2>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '20px' }}>
            {service.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((t, i) => (
              <span key={i} className="pillar-tag">{t}</span>
            ))}
          </div>
        </div>

        <div style={{
          order: isEven ? 1 : 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          padding: '20px', borderRadius: '12px',
          background: open ? 'rgba(229,57,53,0.06)' : 'rgba(0,0,0,0.02)',
          minWidth: '120px', transition: 'background 0.3s',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: open ? 'var(--primary-red)' : '#eee',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: open ? '#fff' : '#999', transition: 'all 0.3s',
          }}>
            {loading
              ? <i className="fas fa-spinner fa-spin"></i>
              : <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            }
          </div>
          <span style={{ fontSize: '0.75rem', color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>
            {open ? 'Collapse' : 'Explore'}
          </span>
        </div>
      </div>

      {/* Expanded detail */}
      {open && detail && (
        <div style={{ padding: '0 50px 50px', borderTop: '1px solid #f0f0f0' }}>

          {/* Use Cases */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{
              fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '6px',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <span style={{
                width: '4px', height: '22px', background: 'var(--primary-red)',
                borderRadius: '2px', display: 'inline-block'
              }}></span>
              Use Cases
            </h3>
            <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '24px', marginLeft: '14px' }}>
              Real problems we solved for real clients
            </p>
            <div className="use-case-grid">
              {detail.useCases.map((uc, i) => (
                <UseCaseCard key={uc.id} uc={uc} index={i} />
              ))}
            </div>
          </div>

          {/* Industries */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '4px', height: '22px', background: 'var(--primary-red)', borderRadius: '2px', display: 'inline-block' }}></span>
              Industries We Serve
            </h3>
            <div className="industry-tags">
              {detail.industries.map((ind, i) => (
                <span key={i} className="ind-tag">
                  <i className="fas fa-check" style={{ color: 'var(--primary-red)', marginRight: '6px', fontSize: '0.7rem' }}></i>
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '4px', height: '22px', background: 'var(--primary-red)', borderRadius: '2px', display: 'inline-block' }}></span>
              Why Choose Our {service.title} Practice
            </h3>
            <div className="why-modal-grid">
              {detail.whyItems.map((w, i) => (
                <div key={i} className="why-modal-item">
                  <h4>{w.heading}</h4>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            textAlign: 'center', marginTop: '40px', padding: '30px',
            background: 'linear-gradient(135deg,#fff8f8,#fff)',
            borderRadius: '12px', border: '1px solid rgba(229,57,53,0.1)'
          }}>
            <p style={{ color: '#555', marginBottom: '16px', fontSize: '1rem' }}>
              {detail.cta_text}
            </p>
            <Link to="/contact" className="btn btn-red">
              Contact Us Today &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const Solutions = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/services')
      .then(res => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg,#1a1a1a 0%,#2d1515 50%,#1a1a1a 100%)',
        padding: '80px 0 60px', color: '#fff', textAlign: 'center',
      }}>
        <div className="container">
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: '20px',
            background: 'rgba(229,57,53,0.2)', border: '1px solid rgba(229,57,53,0.4)',
            color: 'var(--primary-red)', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px',
          }}>Our Expertise</div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
            Core <span style={{ color: 'var(--primary-red)' }}>Solutions</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Click on any solution below to explore in-depth use cases, industry focus, and our unique approach to implementation.
          </p>
          {/* Quick nav */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '36px' }}>
            {['CYBER','DAIA','DGTL','ENTP','ITWS'].map(code => (
              <a key={code} href={`#service-${code}`} style={{
                padding: '8px 20px', borderRadius: '30px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <i className={`fas ${serviceIcons[code]}`} style={{ color: 'var(--primary-red)' }}></i>
                {code}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#999' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-red)' }}></i>
              <p style={{ marginTop: '16px' }}>Loading services…</p>
            </div>
          ) : (
            services.map((s, i) => <ServiceSection key={s.id} service={s} index={i} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default Solutions;
