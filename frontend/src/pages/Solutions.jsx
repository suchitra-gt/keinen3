import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const Solutions = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main>
            <section className="hero-section" style={{ background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/insights_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '180px 0 100px', textAlign: 'center' }}>
                <div className="container" data-aos="fade-up">
                    <h4 style={{ color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1rem', fontWeight: '700' }}>Our Expertise</h4>
                    <h1 style={{ fontSize: '4rem', color: 'white', marginBottom: '1.5rem', fontWeight: '700' }}>Industrial Technology <span style={{ color: 'var(--primary-red)' }}>Solutions</span></h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>Deploying high-performance IT, OT, and Security architectures for critical infrastructure.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div data-aos="fade-right">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Full-Spectrum <span style={{ color: 'var(--primary-red)' }}>Transformation</span></h2>
                            <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>We bridge the gap between traditional IT and operational technology (OT), ensuring your shop floor is as secure and connected as your top floor.</p>
                            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '15px' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i> ISO 27001 & IEC 62443 Alignment</li>
                                <li style={{ marginBottom: '15px' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i> Edge Computing & IIoT Implementation</li>
                                <li style={{ marginBottom: '15px' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i> Managed Detection & Response (MDR)</li>
                            </ul>
                        </div>
                        <div data-aos="fade-left">
                            <img src="/why_keinen_premium.png" alt="Solutions" style={{ width: '100%', borderRadius: '12px' }} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Solutions;
