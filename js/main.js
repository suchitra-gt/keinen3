// Header Scroll & Progress
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = (scrollTop / docHeight * 100) + '%';
    }
});

// Reveal on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// Dynamic Content Fetching
async function fetchDynamicContent() {
    try {
        const servicesRes = await fetch('http://localhost:5000/api/services');
        if (servicesRes.ok) {
            const services = await servicesRes.json();
            const grid = document.querySelector('.pillar-grid');
            if (grid && services.length > 0) {
                grid.innerHTML = '';
                services.forEach((s, i) => {
                    const card = document.createElement('div');
                    card.className = 'pillar-card hidden';
                    card.innerHTML = `
                        <div class="pillar-num">${String(i + 1).padStart(2, '0')}</div>
                        <h3 style="color: var(--primary-red);">${s.title}</h3>
                        <p>${s.description}</p>
                        <div class="pillar-tags">${JSON.parse(s.tags).map(t => `<span class="pillar-tag">${t}</span>`).join('')}</div>
                    `;
                    grid.appendChild(card);
                    observer.observe(card);
                });
            }
        }
    } catch (err) {
        console.log('Backend not running, staying in static mode.');
    }
}

// Mega Menu Switching Logic
const megaData = {
    cyber: {
        subs: ['Application Security Services', 'Cloud Security Services', 'Data Security & Privacy Services', 'Endpoint Security Services', 'GRC Services', 'IAM Services', 'Network Security Services', 'Incident Response', 'Security Testing'],
        solns: [
            { icon: 'fa-exclamation-triangle', text: 'Enterprise Cyber Risk Reduction' },
            { icon: 'fa-lightbulb', text: 'Zero Trust Transformation' },
            { icon: 'fa-cloud', text: 'Cloud Security Modernization' },
            { icon: 'fa-search', text: 'Managed Detection & Response' }
        ]
    },
    data: {
        subs: ['Big Data Analytics', 'AI & Machine Learning', 'Data Engineering', 'Business Intelligence', 'Data Governance', 'Predictive Modeling'],
        solns: [
            { icon: 'fa-brain', text: 'AI-Driven Predictive Analytics' },
            { icon: 'fa-database', text: 'Enterprise Data Warehouse' },
            { icon: 'fa-chart-line', text: 'Real-time BI Dashboarding' }
        ]
    },
    digital: {
        subs: ['Cloud Migration', 'App Modernization', 'IoT Strategy', 'DevOps Automation', 'Digital Workplace', 'Experience Design'],
        solns: [
            { icon: 'fa-rocket', text: 'Accelerated Cloud Journey' },
            { icon: 'fa-sync', text: 'Legacy App Modernization' },
            { icon: 'fa-mobile-alt', text: 'Omni-channel Experience' }
        ]
    },
    enterprise: {
        subs: ['ERP Implementation', 'CRM Solutions', 'Supply Chain Management', 'HRMS Systems', 'Financial Management', 'Asset Management'],
        solns: [
            { icon: 'fa-cogs', text: 'Global ERP Rollout' },
            { icon: 'fa-handshake', text: 'Customer Lifecycle Mgmt' },
            { icon: 'fa-truck', text: 'Smart Supply Chain' }
        ]
    },
    workforce: {
        subs: ['Managed Staffing', 'Exec Search', 'Talent Acquisition', 'Training & Upskilling', 'Project Based Staffing', 'Contingent Workforce'],
        solns: [
            { icon: 'fa-user-tie', text: 'Tech Leadership Hiring' },
            { icon: 'fa-users-cog', text: 'Global Capability Centers' },
            { icon: 'fa-graduation-cap', text: 'Digital Skills Academy' }
        ]
    }
};

const serviceItems = document.querySelectorAll('.service-item');
const subList = document.getElementById('sub-service-list');
const solnList = document.getElementById('solution-list');

if (serviceItems.length > 0) {
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            serviceItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const cat = item.dataset.category;
            const data = megaData[cat];
            if (subList) subList.innerHTML = data.subs.map(s => `<li>${s}</li>`).join('');
            if (solnList) solnList.innerHTML = data.solns.map(s => `
                <div class="solution-item">
                    <div class="solution-icon"><i class="fas ${s.icon}"></i></div>
                    <div class="solution-text">${s.text}</div>
                </div>
            `).join('');
        });
    });
}

// Service Modal Logic
const serviceDetails = {
    cyber: {
        title: 'Cybersecurity',
        desc: 'In a world of escalating cyber threats, one breach can cost millions. We help organizations proactively identify vulnerabilities, build resilient defenses, and respond to incidents before they become business-ending events.',
        useCases: [
            { title: 'Stopping a Ransomware Attack', prob: 'A manufacturing company experienced repeated malware causing production stoppages costing $200K per incident.', sol: 'Deployed 24/7 MDR solution, network micro-segmentation, and tabletop response exercises.', impact: 'Zero incidents in 18 months. Detection time reduced from 72h to under 4h. Insurance premiums dropped 22%.' },
            { title: 'PCI-DSS Compliance Achievement', prob: 'National retail chain faced $100K+ monthly fines due to critical cardholder data gaps.', sol: 'Full gap assessment, CDE architecture redesign, and tokenization implementation.', impact: 'Full Level 1 compliance in 11 weeks. Audit passed with zero findings.' },
            { title: 'Securing Patient Data', prob: 'Hospital network had 47 legacy apps with vulnerabilities. Phishing compromised 8,000 patient records.', sol: 'Vulnerability assessment, MFA enforcement, and AI-powered phishing detection.', impact: 'Phishing click rate dropped 23% to 2%. Zero HIPAA breaches in 24 months.' }
        ],
        industries: ['Banking & Financial Services', 'Healthcare & Life Sciences', 'Retail & E-Commerce', 'Manufacturing', 'Government & Public Sector', 'Telecom', 'Energy & Utilities'],
        why: [
            { h: 'Threat Intelligence-Driven', p: 'We leverage real-time global feeds to prioritize defenses where your actual risk is highest.' },
            { h: 'Compliance & Security Together', p: 'We integrate HIPAA, PCI-DSS, ISO 27001, DORA into your architecture from day one.' },
            { h: 'Vendor-Neutral Expertise', p: 'We select the tools right for your budget and risk profile, not a specific vendor.' },
            { h: 'Business Continuity Focus', p: 'We protect operations without slowing them down, tying security to business outcomes.' }
        ]
    },
    data: {
        title: 'Data & AI Services',
        desc: 'Your data is your most valuable business asset — but only if you can trust it and act on it intelligently. We build foundations that transform raw data into competitive advantage.',
        useCases: [
            { title: 'Predicting Customer Churn', prob: 'Telecom provider losing 12% subscribers annually with no advance warning.', sol: 'Churn prediction model using behavioral data and support history triggering automated retention.', impact: 'Churn reduced by 34%. CLV increased by $42 per subscriber.' },
            { title: 'Unified Analytics Platform', prob: 'Conglomerate with 14 business units on siloed systems. Reporting took 3 weeks.', sol: 'Cloud data lakehouse on Azure with unified data model and real-time Power BI dashboards.', impact: 'Reporting cycle reduced from 3 weeks to 2 hours. Accuracy improved to 99.2%.' },
            { title: 'Generative AI Knowledge Asst', prob: 'Firm employees spent 2.3 hours/day searching 12 years of project documentation.', sol: 'Secure Enterprise GenAI assistant using RAG architecture on existing repositories.', impact: 'Information retrieval time reduced by 78%. Productivity gained 1.4h/day.' }
        ],
        industries: ['Banking & Insurance', 'Retail & FMCG', 'Healthcare & Pharma', 'Telecom', 'Logistics', 'Public Sector'],
        why: [
            { h: 'Business Outcome Contracts', p: 'We define measurable KPIs before starting and structure engagements around delivering them.' },
            { h: 'Production-Ready Delivery', p: 'We go beyond proof-of-concept, delivering integrated solutions maintained for performance.' },
            { h: 'Responsible AI Framework', p: 'We build explainable AI with bias detection and data governance built in.' },
            { h: 'Cloud-Agnostic Expertise', p: 'We work across AWS, Azure, and GCP to select the right platform for your scale.' }
        ]
    },
    digital: {
        title: 'Digital Transformation',
        desc: 'Digital transformation is fundamentally changing how your business creates value. We reimagine processes and modernize legacy systems to make you faster and leaner.',
        useCases: [
            { title: 'Modernizing Core Banking', prob: '20-year-old monolithic platform. New product launches took 9-12 months.', sol: 'Phased strangler-fig modernization with cloud-native architecture and DevOps.', impact: 'Time-to-market reduced to 6 weeks. Downtime reduced by 91%.' },
            { title: 'Digitizing Claims Process', prob: '85% manual paper forms. Average resolution was 28 days at $186/claim.', sol: 'Digital claims portal with mobile upload and OCR/NLP extraction.', impact: 'Resolution time reduced to 4.2 days. Cost reduced to $47 (75% saving).' }
        ],
        industries: ['Banking', 'Insurance', 'Healthcare', 'Retail', 'Utilities', 'Logistics', 'Education'],
        why: [
            { h: 'Strategy Before Technology', p: 'We start with your business model and customer journeys, not a vendor recommendation.' },
            { h: 'Change Management Built In', p: 'We embed leadership alignment and workforce enablement into every engagement.' },
            { h: 'Phased, Measurable Delivery', p: 'We break transformation into 90-day sprints with clear milestones.' },
            { h: 'Legacy Modernization Mastery', p: 'We modernize complex systems without disruption, protecting your future.' }
        ]
    },
    enterprise: {
        title: 'Enterprise Applications',
        desc: 'The operational backbone of your business. We implement and optimize ERP, CRM, and HRMS platforms that your business can actually rely on.',
        useCases: [
            { title: 'SAP Implementation Rescue', prob: 'Failed $4.2M project, 11 months behind budget with user rejection.', sol: 'Rapid rescue assessment, restructured governance, and core module reconfiguration.', impact: 'Live in 14 weeks. User adoption 87%. Close cycle reduced to 4 days.' },
            { title: 'Global HRMS Unification', prob: 'Professional services firm on 6 legacy HR systems across 6 countries.', sol: 'Global Workday HCM implementation with unified reporting and self-service.', impact: 'Admin effort reduced 52%. Payroll processing cut from 5 days to 1.' }
        ],
        industries: ['Manufacturing', 'Professional Services', 'Financial Services', 'Retail', 'SaaS', 'Public Sector'],
        why: [
            { h: 'Platform-Certified Expertise', p: 'Active certifications across SAP, Oracle, Salesforce, Workday, and Microsoft.' },
            { h: 'Business Process First', p: 'We redesign workflows first, then configure software for maximum improvement.' },
            { h: 'Post Go-Live Commitment', p: 'Hypercare and optimization reviews for 12 months post-live as standard.' },
            { h: 'Fixed-Price Rescue', p: 'Predictable rescue engagements for projects that have gone off track.' }
        ]
    },
    workforce: {
        title: 'IT Workforce Solutions',
        desc: 'Access pre-vetted, highly skilled IT professionals across all technology domains — from project augmentation to managed teams.',
        useCases: [
            { title: 'Scaling Cloud Migration', prob: 'Needed to scale team from 3 to 22 engineers in 6 weeks for critical timeline.', sol: 'Deployed 19 pre-vetted AWS/Azure engineers within 6 weeks.', impact: 'Timeline met. Cost 38% lower than permanent hires. Zero recruitment fees.' },
            { title: 'Offshore Development Center', prob: 'UK firm needed 45 developers fast but building locally was 2.8x budget.', sol: 'Built and managed a dedicated ODC in India with full HR and governance.', impact: 'Team operational in 16 weeks. Costs 62% lower. Velocity increased 3x.' }
        ],
        industries: ['Financial Services', 'Healthcare', 'SaaS', 'Retail', 'Telecom', 'Professional Services'],
        why: [
            { h: 'Pre-Vetted Talent', p: 'Technically assessed and background-verified professionals ready for interview.' },
            { h: 'Flexible Engagement', p: 'Single contractors to fractional C-suite leadership structured around your need.' },
            { h: 'Retention-Focused', p: 'Career pathways and benefits that keep talent productive and committed.' },
            { h: '120+ Tech Specializations', p: 'Coverage from COBOL to Generative AI and cloud-native architectures.' }
        ]
    }
};

window.showServiceModal = function(key) {
    const data = serviceDetails[key];
    const modal = document.getElementById('serviceModalOverlay');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="modal-header">
            <h2>${data.title}</h2>
            <p class="modal-desc">${data.desc}</p>
        </div>
        <h3 style="color: var(--text-dark); margin-bottom: 20px;">Use Cases</h3>
        <div class="use-case-grid">
            ${data.useCases.map(uc => `
                <div class="use-case-card">
                    <h4>${uc.title}</h4>
                    <div class="uc-section"><span class="uc-label">Business Problem:</span> ${uc.prob}</div>
                    <div class="uc-section"><span class="uc-label">Solution Provided:</span> ${uc.sol}</div>
                    <div class="uc-section"><span class="uc-label">Business Impact:</span> ${uc.impact}</div>
                </div>
            `).join('')}
        </div>
        <div class="industry-tags">
            ${data.industries.map(ind => `<span class="ind-tag">${ind}</span>`).join('')}
        </div>
        <h3 style="color: var(--text-dark); text-align: center; margin-top: 40px;">Why Choose Our ${data.title} Practice</h3>
        <div class="why-modal-grid">
            ${data.why.map(w => `
                <div class="why-modal-item">
                    <h4>${w.h}</h4>
                    <p>${w.p}</p>
                </div>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 50px;">
            <p style="margin-bottom: 20px; color: #666;">Is your organization ready? Schedule a free assessment today.</p>
            <a href="contact.html" class="btn btn-red">Contact Our Experts Today &rarr;</a>
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeServiceModal = function() {
    const modal = document.getElementById('serviceModalOverlay');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.onclick = function(event) {
    const modal = document.getElementById('serviceModalOverlay');
    if (event.target == modal) {
        closeServiceModal();
    }
};

// Visit Tracking
async function trackVisit() {
    try {
        const lastVisit = localStorage.getItem('keinen_last_visit');
        const now = new Date().getTime();
        let isUnique = false;

        // If no visit in last 24 hours, consider unique
        if (!lastVisit || (now - parseInt(lastVisit)) > 24 * 60 * 60 * 1000) {
            isUnique = true;
            localStorage.setItem('keinen_last_visit', now.toString());
        }

        await fetch(`http://localhost:5001/api/track-visit?unique=${isUnique}`);
    } catch (err) {
        console.error('Failed to track visit:', err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetchDynamicContent();
    trackVisit();
});
