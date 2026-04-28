import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }, []);

    const sectors = [
        { name: 'Manufacturing & Process', img: '/sector_manufacturing_red_1777267582086.png', desc: 'ISA-95 architectures, MES-SCADA integration, OEE intelligence, predictive maintenance.' },
        { name: 'Oil & Gas', img: '/sector_energy_red_1777267533087.png', desc: 'ATEX/IECEx certified for explosive hazardous areas. Safety Instrumented Systems (SIS).' },
        { name: 'Pharmaceuticals & Biotech', img: '/sector_pharma_red_1777267596457.png', desc: '21 CFR Part 11 compliant data systems. GAMP 5 validated automation. EBR integration.' },
        { name: 'FMCG & Packaging', img: '/sector_fmcg.png', desc: 'High-speed packaging line monitoring, OEE optimisation. AI visual quality inspection.' },
        { name: 'Healthcare Facilities', img: '/sector_healthcare.png', desc: 'EMR/HIS integration with clinical networks. Medical device networking (IEC 80001).' },
        { name: 'Automotive Assembly', img: '/sector_automotive_red_1777267613718.png', desc: 'Robotic welding cell control. AGV/AMR logistics network design. JIT system connectivity.' },
        { name: 'FPSO, Marine & Offshore', img: '/sector_fpso.png', desc: 'Marine-grade certified systems for harsh/hazardous environments. Offshore automation.' },
        { name: 'Enterprise Campuses', img: '/sector_datacenter_red_1777267630948.png', desc: 'Campus-wide network infrastructure. Tier-rated on-premise data center design/build.' },
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="hero-video">
                    <video autoPlay muted loop playsInline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-factory-31405-large.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="hero-overlay"></div>
                <div className="container">
                    <div data-aos="fade-up" style={{ maxWidth: '850px' }}>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1.5rem', color: 'var(--primary-red)', fontWeight: '700', background: 'rgba(229, 57, 53, 0.1)', display: 'inline-block', padding: '5px 15px', borderRadius: '4px' }}>
                            Global Technology Architects
                        </h4>
                        <h1>Architecting Digital <span style={{ color: 'var(--primary-red)' }}>Ecosystems</span></h1>
                        <p>We design and deploy integrated IT, OT, and Security ecosystems that don't just connect your enterprise — they make it intelligent, resilient, and ready for the next era.</p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <Link to="/solutions" className="btn btn-red pulse-btn" style={{ padding: '1.2rem 2.5rem' }}>Explore Solutions &rarr;</Link>
                            <Link to="/contact" className="btn" style={{ border: '2px solid white', color: 'white', padding: '1.2rem 2.5rem' }}>Get a Consultation</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section-padding" id="about">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div data-aos="fade-right">
                            <h4 style={{ color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Who We Are</h4>
                            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Architects of the <span style={{ color: 'var(--primary-red)' }}>Next</span> Era</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Keinen Corp is a leading technology consultancy focused on building integrated IT, OT, and security ecosystems.</p>
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
                                <Link to="/about" className="btn btn-red pulse-btn">Our Full Story &rarr;</Link>
                            </div>
                        </div>
                        <div data-aos="fade-left">
                            <img src="/about_tech_architects_red_1777267955851.png" alt="Tech Architects" className="float-anim" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="section-padding section-with-video" id="solutions" style={{ background: '#fdfdfd' }}>
                <div className="bg-video-container">
                    <video autoPlay muted loop playsInline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-and-dots-network-23130-large.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
                        <h2 style={{ fontSize: '2.5rem' }}>Core <span style={{ color: 'var(--primary-red)' }}>Solutions</span></h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>Advanced technology implementations for complex business challenges.</p>
                    </div>
                    <div className="pillar-grid">
                        <div className="pillar-card" data-aos="flip-left" data-aos-delay="100">
                            <div className="pillar-num">01</div>
                            <h3 style={{ color: 'var(--primary-red)' }}>Cybersecurity</h3>
                            <p>Proactive defense and resilient architectures for a world of escalating threats.</p>
                            <div className="pillar-tags"><span className="pillar-tag">MDR</span> <span className="pillar-tag">Zero Trust</span></div>
                        </div>
                        <div className="pillar-card" data-aos="flip-left" data-aos-delay="200">
                            <div className="pillar-num">02</div>
                            <h3 style={{ color: 'var(--primary-red)' }}>Data & AI</h3>
                            <p>Transforming raw data into competitive advantage through production-grade AI.</p>
                            <div className="pillar-tags"><span className="pillar-tag">GenAI</span> <span className="pillar-tag">Analytics</span></div>
                        </div>
                        <div className="pillar-card" data-aos="flip-left" data-aos-delay="300">
                            <div className="pillar-num">03</div>
                            <h3 style={{ color: 'var(--primary-red)' }}>Digital Transformation</h3>
                            <p>Modernizing legacy systems and reimagining processes for agility.</p>
                            <div className="pillar-tags"><span className="pillar-tag">Cloud-Native</span> <span className="pillar-tag">DevOps</span></div>
                        </div>
                        <div className="pillar-card" data-aos="flip-left" data-aos-delay="400">
                            <div className="pillar-num">04</div>
                            <h3 style={{ color: 'var(--primary-red)' }}>Enterprise Apps</h3>
                            <p>Optimizing the operational backbone of your business through ERP and CRM.</p>
                            <div className="pillar-tags"><span className="pillar-tag">SAP/Oracle</span> <span className="pillar-tag">Salesforce</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="section-padding section-with-video" id="industries">
                <div className="bg-video-container">
                    <video autoPlay muted loop playsInline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-animation-1552-large.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
                        <h2 style={{ fontSize: '2.5rem' }}>Sectors We <span style={{ color: 'var(--primary-red)' }}>Transform</span></h2>
                    </div>
                    <div className="sector-grid">
                        {sectors.map((s, i) => (
                            <div key={i} className="sector-card" data-aos="zoom-in" data-aos-delay={i * 50}>
                                <img src={s.img} alt={s.name} />
                                <h3>{s.name}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Keinen Section */}
            <section className="section-padding section-with-video" id="why-us">
                <div className="bg-video-container" style={{ opacity: 0.05 }}>
                    <video autoPlay muted loop playsInline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-data-center-server-room-rack-2739-large.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div data-aos="fade-right">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Why <span style={{ color: 'var(--primary-red)' }}>Keinen</span>?</h2>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '25px', display: 'flex', gap: '15px' }} data-aos="fade-up" data-aos-delay="100">
                                    <i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', fontSize: '1.5rem' }}></i>
                                    <div>
                                        <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>End-to-End Capability</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>From strategic roadmaps to 24/7 managed operations.</p>
                                    </div>
                                </li>
                                <li style={{ marginBottom: '25px', display: 'flex', gap: '15px' }} data-aos="fade-up" data-aos-delay="200">
                                    <i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', fontSize: '1.5rem' }}></i>
                                    <div>
                                        <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Domain Specific Depth</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>Architects who understand your industry's specific pressures.</p>
                                    </div>
                                </li>
                                <li style={{ marginBottom: '25px', display: 'flex', gap: '15px' }} data-aos="fade-up" data-aos-delay="300">
                                    <i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', fontSize: '1.5rem' }}></i>
                                    <div>
                                        <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Vendor Agnostic Approach</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>We recommend what works for you, not a specific technology vendor.</p>
                                    </div>
                                </li>
                            </ul>
                            <Link to="/why-us" className="btn btn-red pulse-btn">Discover Our Approach</Link>
                        </div>
                        <div data-aos="fade-left">
                            <img src="/why_keinen_premium.png" alt="Keinen Expertise" className="float-anim" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding" id="contact">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px' }}>
                        <div data-aos="fade-right">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Contact Our <span style={{ color: 'var(--primary-red)' }}>Architects</span></h2>
                            <p style={{ marginBottom: '2rem' }}>Ready to modernize your operations? Let's discuss your project today.</p>
                            <div style={{ marginBottom: '20px' }}><i className="fas fa-envelope" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i> info@keinen.in</div>
                            <div style={{ marginBottom: '20px' }}><i className="fas fa-phone" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i> +91 80415 01718</div>
                        </div>
                        <div data-aos="fade-left">
                            <form style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <input type="text" placeholder="Name" style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '4px' }} />
                                    <input type="email" placeholder="Email" style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '4px' }} />
                                </div>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '4px', marginBottom: '20px' }}>
                                    <option>Cybersecurity</option>
                                    <option>Data & AI</option>
                                    <option>Digital Transformation</option>
                                </select>
                                <textarea placeholder="Message" style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '4px', marginBottom: '20px' }} rows="4"></textarea>
                                <button type="submit" className="btn btn-red" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
