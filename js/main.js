// Visitor Tracking Logic for Static Pages (Port 5502)
(function() {
    let sessionId = localStorage.getItem('keinen_session_id');
    if (!sessionId) {
        sessionId = 'static-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
        localStorage.setItem('keinen_session_id', sessionId);
    }

    const trackVisit = async () => {
        try {
            await fetch('http://localhost:5000/api/track-visit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    page: window.location.pathname
                })
            });
            console.log('[TRACKER] Static visit recorded');
        } catch (err) {
            console.error('[TRACKER ERROR]', err);
        }
    };
    trackVisit();
})();

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

        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default link behavior
            const cat = item.dataset.category;
            
            // Always try to show modal if we are on index.html or the homepage
            if (typeof showServiceModal === 'function' && document.getElementById('serviceModalOverlay')) {
                showServiceModal(cat);
            } else {
                // Fallback for other pages
                window.location.href = `index.html#${cat}`;
            }
        });
    });
}

// Service Modal Logic
const serviceDetails = {
    cyber: {
        title: 'Cybersecurity',
        desc: 'In a world of escalating cyber threats, one breach can cost millions — in fines, lost customers, and brand damage. We help organizations proactively identify vulnerabilities, build resilient defenses, and respond to incidents before they become business-ending events. Our cybersecurity practice protects your people, your data, and your reputation.',
        useCases: [
            { title: 'Stopping a Ransomware Attack Before It Shuts Down Operations', prob: 'A mid-sized manufacturing company experienced repeated malware intrusions that locked down plant floor systems, causing production stoppages lasting 12-18 hours each time and costing an estimated $200K per incident.', sol: 'We deployed a 24/7 managed detection and response (MDR) solution, implemented network micro-segmentation to contain lateral movement, and conducted tabletop exercises to prepare the incident response team.', impact: 'Zero ransomware incidents in 18 months post-deployment. Mean time to detect (MTTD) reduced from 72 hours to under 4 hours. Cyber insurance premium reduced by 22%.' },
            { title: 'Achieving PCI-DSS Compliance Without Disrupting Retail Operations', prob: 'A national retail chain faced a PCI-DSS audit with critical gaps in cardholder data environments. Non-compliance risked $100K+ in monthly fines and potential loss of payment processing licenses.', sol: 'We performed a full gap assessment, redesigned the cardholder data environment (CDE) architecture, implemented tokenization for payment data, and provided audit-ready documentation and remediation tracking.', impact: 'Full PCI-DSS Level 1 compliance achieved in 11 weeks. Audit passed with zero critical findings. Ongoing compliance management reduced internal effort by 60%.' },
            { title: 'Securing a Healthcare Organization Against Patient Data Breaches', prob: 'A regional hospital network had 47 legacy applications with unpatched vulnerabilities and no centralized identity governance. A single phishing attack compromised 3 employee accounts and exposed 8,000 patient records.', sol: 'We conducted a vulnerability assessment across all systems, enforced multi-factor authentication (MFA) across the entire organization, implemented privileged access management (PAM), and deployed email security with AI-powered phishing detection.', impact: 'Phishing click rate reduced from 23% to under 2%. Zero HIPAA breach notifications in the 24 months following deployment. IT security team response time improved by 68%.' },
            { title: 'Building a Zero Trust Architecture for a Distributed Workforce', prob: 'A financial services firm with 1,200 remote employees relied on a VPN-based perimeter model that created a single point of failure and could not enforce granular access policies across cloud and on-premises systems.', sol: 'We designed and implemented a Zero Trust architecture using identity-centric access controls, continuous device health verification, and software-defined perimeters (SDP) integrated with existing IAM infrastructure.', impact: 'Unauthorized access attempts blocked increased by 94%. VPN infrastructure decommissioned, saving $280K annually. Regulatory audit passed with commendation on access governance practices.' },
            { title: 'Third-Party Vendor Risk Management for a Financial Institution', prob: 'A regional bank discovered that 60% of its critical data was accessible to third-party vendors with no formal security assessments, creating significant exposure under DORA and RBI cybersecurity frameworks.', sol: 'We built a vendor risk management (VRM) program including automated security questionnaires, continuous monitoring of vendor security posture, and contractual security SLA frameworks for all Tier-1 vendors.', impact: 'Vendor risk visibility increased from 12% to 100% coverage. Three high-risk vendors identified and replaced before a potential breach. Regulatory compliance achieved 8 weeks ahead of deadline.' }
        ],
        industries: ['Banking & Financial Services', 'Healthcare & Life Sciences', 'Retail & E-Commerce', 'Manufacturing', 'Government & Public Sector', 'Telecom & Technology', 'Legal & Professional Services', 'Energy & Utilities'],
        why: [
            { h: 'Threat Intelligence-Driven Approach', p: 'We leverage real-time global threat intelligence feeds and industry-specific attack data to prioritize defenses where your actual risk is highest — not where it looks impressive on paper.' },
            { h: 'Compliance & Security Together', p: 'We integrate regulatory compliance (HIPAA, PCI-DSS, ISO 27001, DORA, NIST) into your security architecture so you never have to choose between secure and compliant.' },
            { h: 'Vendor-Neutral Expertise', p: 'We are not tied to a single security vendor. We select and configure the tools that are genuinely right for your environment, budget, and risk profile.' },
            { h: 'Business Continuity Focus', p: 'Every security recommendation is evaluated through a business impact lens. We protect operations without slowing them down, keeping your security investment tied to real business outcomes.' }
        ]
    },
    data: {
        title: 'Data & AI Services',
        desc: 'Your data is your most valuable business asset — but only if you can trust it, access it quickly, and act on it intelligently. We help organizations build data foundations, deploy AI and machine learning solutions, and create analytics capabilities that transform raw data into competitive advantage. From strategy to production deployment, we turn your data into decisions.',
        useCases: [
            { title: 'Predicting Customer Churn Before It Happens', prob: 'A telecom provider was losing 12% of its subscriber base annually to churn. Retention teams had no advance warning — they only knew a customer had left after the contract ended, making win-back campaigns 5x more expensive than prevention.', sol: 'We built a churn prediction model using 18 months of behavioral data, network quality metrics, support interaction history, and billing patterns. The model scores every customer weekly and triggers automated retention workflows for high-risk segments.', impact: 'Churn rate reduced by 34% in the first year. Customer lifetime value (CLV) increased by $42 per subscriber. Retention campaign costs reduced by 28% through precise targeting.' },
            { title: 'Unifying Siloed Data Across 14 Business Units into One Analytics Platform', prob: 'A diversified conglomerate operated 14 business units on separate ERP, CRM, and finance systems. Leadership had no consolidated view of performance. Monthly reporting took 3 weeks and was often outdated by the time it was distributed.', sol: 'We designed and implemented a modern cloud data lakehouse architecture on Azure, built ETL pipelines from all 14 source systems, created a unified data model, and deployed an executive Power BI dashboard suite with real-time refresh.', impact: 'Reporting cycle reduced from 3 weeks to 2 hours. Data accuracy improved from 67% to 99.2%. Executive team now makes capital allocation decisions weekly instead of monthly.' },
            { title: 'AI-Powered Demand Forecasting for a Consumer Goods Manufacturer', prob: 'A FMCG manufacturer was managing inventory using a 12-week static forecast model. Overstock cost $8M annually in warehousing, while stockouts of top SKUs were causing $4M in lost sales each year.', sol: 'We replaced the legacy forecasting model with an ML-based demand sensing system that incorporates POS data, weather patterns, promotional calendars, and macroeconomic signals. The system generates SKU-level forecasts updated daily.', impact: 'Forecast accuracy improved from 71% to 94%. Inventory holding costs reduced by $5.2M annually. Out-of-stock incidents reduced by 61%, recovering approximately $3.1M in previously lost revenue.' },
            { title: 'Deploying a Generative AI Assistant for Internal Knowledge Management', prob: 'A professional services firm with 3,000 employees had 12 years of project documentation, contracts, and research reports stored across SharePoint, email archives, and local drives. Employees spent an average of 2.3 hours per day searching for information.', sol: 'We built a secure, enterprise Generative AI knowledge assistant using RAG (Retrieval Augmented Generation) architecture on top of the firm\'s existing document repositories. The assistant provides sourced, accurate answers with document citations.', impact: 'Information retrieval time reduced by 78%. Employee productivity gained equivalent to 1.4 hours per employee per day. Onboarding time for new consultants reduced by 40%.' },
            { title: 'Real-Time Fraud Detection for a Digital Payments Platform', prob: 'A fintech company processing 2 million daily transactions was experiencing $1.8M in monthly fraud losses. The existing rule-based detection system had a 31% false positive rate, blocking legitimate transactions and frustrating customers.', sol: 'We developed and deployed a real-time ML fraud detection engine using graph neural networks to identify suspicious transaction patterns, device fingerprinting, and behavioral biometrics. The model learns and updates continuously.', impact: 'Fraud losses reduced by 83% within 90 days of go-live. False positive rate dropped from 31% to 3.7%. Transaction approval rate improved by 11%, directly increasing revenue.' }
        ],
        industries: ['Banking & Insurance', 'Retail & FMCG', 'Healthcare & Pharma', 'Telecom', 'Manufacturing & Supply Chain', 'Media & Entertainment', 'Logistics & Mobility', 'Public Sector'],
        why: [
            { h: 'Business Outcome Contracts', p: 'We define measurable KPIs before a project starts and structure our engagement around delivering them. Every AI model we build is tied to a specific, quantifiable business result.' },
            { h: 'Production-Ready Delivery', p: 'We go beyond proof-of-concept. Every AI solution we deliver is production-grade, integrated into your workflows, and maintained for performance drift and model accuracy over time.' },
            { h: 'Responsible AI Framework', p: 'We build explainable, auditable AI systems with bias detection, data governance, and compliance documentation built in from day one — not bolted on after deployment.' },
            { h: 'Cloud-Agnostic Expertise', p: 'We work across AWS, Azure, and Google Cloud, selecting the right data platform for your scale, cost, and governance requirements without platform bias.' }
        ]
    },
    digital: {
        title: 'Digital Transformation',
        desc: 'Digital transformation is not about technology — it is about fundamentally changing how your business creates and delivers value. We partner with leadership teams to reimagine processes, modernize legacy systems, and build digital capabilities that make your organization faster, leaner, and more responsive to customers. We deliver transformation that sticks.',
        useCases: [
            { title: 'Modernizing a 20-Year-Old Core Banking System Without Service Disruption', prob: 'A mid-sized bank was running on a monolithic core banking platform built in 2004. New product launches took 9-12 months, system downtime averaged 14 hours per quarter, and the platform could not support open banking API requirements mandated by regulation.', sol: 'We led a phased strangler-fig modernization approach, wrapping legacy systems with APIs, migrating workloads module by module to a cloud-native architecture, and introducing DevOps practices to accelerate delivery without big-bang risk.', impact: 'New product time-to-market reduced from 9 months to 6 weeks. System downtime reduced by 91%. Open banking APIs launched on schedule, enabling 23 new fintech partnerships within 12 months.' },
            { title: 'Digitizing a Paper-Based Claims Process in Insurance', prob: 'A general insurance company processed 85% of claims through paper forms, manual data entry, and physical mail. Average claims resolution time was 28 days, customer satisfaction scores were at 41%, and processing cost per claim was $186.', sol: 'We redesigned the end-to-end claims journey using customer experience workshops, built a digital claims portal with mobile document upload, deployed OCR and NLP to extract and validate claim data automatically, and integrated with existing policy management systems.', impact: 'Claims resolution time reduced from 28 days to 4.2 days. Customer satisfaction score increased from 41% to 79%. Cost per claim reduced from $186 to $47 — a 75% reduction saving $14M annually.' },
            { title: 'Transforming Field Operations for a Utilities Company', prob: 'A utility company dispatched 800 field technicians using paper work orders, phone-based communication, and spreadsheet scheduling. First-time fix rates were at 56%, overtime costs were high due to poor routing, and compliance documentation was incomplete 40% of the time.', sol: 'We implemented a mobile-first field service management platform, integrated with GIS data for optimized routing, built real-time technician tracking and job management, and created digital compliance checklists with automated regulatory reporting.', impact: 'First-time fix rate improved from 56% to 88%. Fuel and overtime costs reduced by $2.3M annually. Regulatory compliance documentation completeness reached 99.6%.' },
            { title: 'Building a Digital-First Customer Experience for a Retail Bank', prob: 'A traditional retail bank was losing 3,200 customers per month to digital-native neobanks. Mobile app ratings stood at 2.1 stars. 67% of transactions still required branch visits due to poor digital service coverage.', sol: 'We led a CX transformation program — redesigning the mobile banking app with UX research, enabling end-to-end digital account opening, loan application, and service requests, and deploying an AI-powered chatbot handling 80+ query types.', impact: 'Mobile app rating improved from 2.1 to 4.6 stars within 6 months. Digital transactions increased by 210%. Branch dependency for routine transactions reduced by 64%. Customer attrition reversed — net new account growth of 8% in Year 1.' }
        ],
        industries: ['Banking & Financial Services', 'Insurance', 'Healthcare', 'Retail & Consumer', 'Utilities & Energy', 'Government & Public Sector', 'Logistics & Transportation', 'Education'],
        why: [
            { h: 'Strategy Before Technology', p: 'We start with your business model, customer journeys, and competitive pressures — not with a technology vendor recommendation. Our roadmaps are grounded in business logic, not technology fashion.' },
            { h: 'Change Management Built In', p: 'Technology is only 30% of transformation. We embed organizational change management, leadership alignment, and workforce enablement into every engagement so adoption is never an afterthought.' },
            { h: 'Phased, Measurable Delivery', p: 'We break transformation into 90-day value sprints with clear milestones and measurable outcomes. You see business returns in months, not years.' },
            { h: 'Legacy Modernization Expertise', p: 'We specialize in organizations with complex, entrenched legacy systems. We know how to modernize without business disruption — protecting operations while building for the future.' }
        ]
    },
    enterprise: {
        title: 'Enterprise Applications',
        desc: 'Enterprise applications are the operational backbone of your business. When they are implemented poorly, they cost millions and frustrate everyone. When done right, they eliminate bottlenecks, connect your organization, and create the single source of truth your leadership needs. We implement, customize, and optimize ERP, CRM, HRMS, and cloud platforms that your business can actually rely on.',
        useCases: [
            { title: 'Rescuing a Failed SAP Implementation and Delivering on Time', prob: 'A manufacturing group had invested $4.2M in an SAP S/4HANA implementation over 18 months. The project was 11 months behind schedule, 60% over budget, and end users were rejecting the system due to poor fit with shop-floor processes.', sol: 'We conducted a rapid project rescue assessment, restructured the implementation governance, reconfigured core manufacturing and finance modules to match actual process requirements, and delivered a structured change management program with role-based training.', impact: 'System went live 14 weeks after our engagement. User adoption reached 87% within 60 days of go-live. Month-end close cycle reduced from 12 days to 4 days. ROI achieved within 18 months of go-live.' },
            { title: 'Unifying HR Operations Across 6 Countries on a Single HRMS Platform', prob: 'A multinational professional services firm managed payroll, performance, and talent processes on 6 different legacy HR systems across as many countries. HR teams spent 40% of their time reconciling data between systems, and employee self-service capabilities were non-existent.', sol: 'We led a global Workday HCM implementation covering Core HR, Payroll (4 countries), Recruiting, and Learning. We developed country-specific configurations to meet local labor laws and created a unified reporting layer for global workforce analytics.', impact: 'HR administrative effort reduced by 52%. Payroll processing time cut from 5 days to 1 day across all markets. Employee self-service adoption reached 94%. Global workforce reporting available in real-time for the first time.' },
            { title: 'Implementing Salesforce CRM to Unify a Fragmented Sales Organization', prob: 'A technology distributor operated with 4 separate sales teams managing pipelines in spreadsheets, personal email, and three different CRM tools. Sales leadership had no reliable forecast visibility, and deals regularly fell through the cracks due to poor handoff processes.', sol: 'We implemented Salesforce Sales Cloud with custom pipeline stages mapped to their sales methodology, built automated lead routing and follow-up sequences, integrated with their ERP for real-time inventory and pricing, and created management dashboards with accurate forecasting.', impact: 'Sales pipeline visibility improved from 40% to 98% of active deals tracked. Deal close rate improved by 19%. Sales forecast accuracy improved from 55% to 88%. New rep onboarding time reduced by 35%.' },
            { title: 'Oracle Cloud ERP Migration for a Multi-Entity Finance Operation', prob: 'A diversified holding company running Oracle E-Business Suite on-premises faced a support end-of-life deadline. The on-premises infrastructure cost $1.8M annually in maintenance, and the finance team struggled with multi-entity consolidation taking 9 days each quarter.', sol: 'We managed a full Oracle Fusion Cloud ERP migration covering Financials, Procurement, and Project Accounting across 12 legal entities. We designed an intercompany elimination automation and a one-click consolidation reporting model.', impact: 'Infrastructure maintenance cost eliminated ($1.8M annual saving). Quarterly consolidation cycle reduced from 9 days to 11 hours. Finance team capacity freed up by 30%, redeployed to business partnering activities.' }
        ],
        industries: ['Manufacturing & Industrial', 'Professional Services', 'Healthcare & Life Sciences', 'Retail & Distribution', 'Financial Services', 'Public Sector & NGOs', 'Real Estate & Construction', 'Technology & SaaS'],
        why: [
            { h: 'Platform-Certified Expertise', p: 'Our consultants hold active certifications across SAP, Oracle, Salesforce, Workday, and Microsoft Dynamics. We go into every project with proven, platform-specific depth — not generalist consulting.' },
            { h: 'Business Process Redesign First', p: 'We do not simply configure software to match broken processes. We redesign workflows first, then configure the application — ensuring you get a system that improves how work gets done.' },
            { h: 'Post Go-Live Support Commitment', p: 'Enterprise application value is realized over time. We provide structured hypercare, performance optimization reviews, and ongoing enhancement roadmaps for 12 months post go-live as standard.' },
            { h: 'Fixed-Price Rescue Capability', p: 'For troubled implementations, we offer fixed-price rescue engagements with defined scope and milestone-based delivery — restoring confidence and predictability when projects have gone off track.' }
        ]
    },
    workforce: {
        title: 'IT Workforce Solutions',
        desc: 'The right technology talent, deployed at the right time, is often the difference between a project that succeeds and one that stalls. We provide organizations with access to pre-vetted, highly skilled IT professionals across all technology domains — from short-term project augmentation to long-term managed teams. Our talent solutions are built around your business goals, not staffing metrics.',
        useCases: [
            { title: 'Scaling a Cloud Migration Team from 3 to 22 Engineers in 6 Weeks', prob: 'A financial services company committed to a 14-month cloud migration timeline but had only 3 internal cloud engineers. Hiring through traditional recruitment was taking 16 weeks per hire, making the project timeline impossible to meet.', sol: 'We deployed a blended team of 19 pre-vetted AWS and Azure engineers within 6 weeks — covering cloud architects, DevOps engineers, security specialists, and migration analysts. Our team integrated directly with the client\'s internal delivery governance.', impact: 'Cloud migration timeline met as committed. Total deployment cost was 38% lower than equivalent permanent hires with recruitment fees. Four team members converted to permanent roles at project completion, providing continuity at zero additional recruitment cost.' },
            { title: 'Building a Dedicated Offshore Development Center for a UK Technology Firm', prob: 'A UK-based SaaS company needed to expand its engineering team by 45 developers but faced a severe talent shortage and salary inflation in the UK market. Building locally would take 18+ months and cost 2.8x their target budget.', sol: 'We designed, built, and managed a dedicated offshore development center (ODC) in India — handling location selection, legal entity setup, hiring, infrastructure, HR, and governance. The team operates as a seamless extension of the UK headquarters.', impact: 'Full 45-person team operational in 16 weeks. Engineering cost per head 62% lower than UK equivalents. Employee retention at 91% after Year 1 — significantly above industry average for ODCs. Product release velocity increased by 3x.' },
            { title: 'Providing Specialized Cybersecurity Talent to Bridge a Critical Compliance Gap', prob: 'A healthcare network needed to complete a HIPAA security remediation program within 90 days to meet a regulatory deadline. They required three security engineers with niche skills in healthcare-specific security frameworks — skills that were near-impossible to find quickly in their market.', sol: 'We identified and deployed three certified HIPAA security specialists within 2 weeks — a security architect, a penetration tester with healthcare EHR system experience, and a compliance documentation specialist. All were available for immediate engagement.', impact: 'All three HIPAA remediation milestones met ahead of the 90-day regulatory deadline. Client avoided $1.2M in estimated non-compliance penalties. Two specialists extended into 12-month managed security advisory roles.' },
            { title: 'IT Leadership as a Service: CTO and CISO Fractional Roles for a Growth-Stage Company', prob: 'A Series B fintech startup needed enterprise-grade technology leadership but could not justify $400K+ annual salaries for a full-time CTO and CISO. They were scaling rapidly and making technology decisions without experienced executive oversight, creating risk.', sol: 'We placed a fractional CTO (3 days/week) and fractional CISO (2 days/week) from our senior leadership pool. Both executives participated in board meetings, investor due diligence, and strategic planning alongside operational responsibilities.', impact: 'Technology strategy formalized within 60 days. Seed-round investor diligence passed with no material IT findings. Engineering team grew from 8 to 34 under the fractional CTO\'s leadership. Series C raise completed 4 months later, with technology capability cited as a key investor confidence factor.' },
            { title: 'Managed IT Support Desk: Replacing an Underperforming Internal Team', prob: 'A 2,400-employee retail organization ran an internal IT support desk with 14 staff. Average ticket resolution time was 3.8 days, first contact resolution was 44%, and staff turnover was 62% annually — creating constant knowledge loss and service degradation.', sol: 'We transitioned the support desk to a fully managed model with 24/7 coverage, ITIL-aligned processes, an AI-assisted ticketing triage system, and dedicated service managers with monthly SLA reporting to IT leadership.', impact: 'First contact resolution improved from 44% to 81%. Average resolution time reduced from 3.8 days to 6.2 hours. Annual cost reduced by $420K vs. the internal team model. Staff turnover eliminated as an issue for the client organization.' }
        ],
        industries: ['Banking & Financial Services', 'Healthcare & Life Sciences', 'Technology & SaaS', 'Retail & Consumer', 'Government & Defense', 'Telecom & Media', 'Manufacturing & Engineering', 'Professional Services'],
        why: [
            { h: 'Pre-Vetted, Interview-Ready Talent', p: 'Every candidate in our network has been technically assessed, reference-checked, and background-verified. You interview only the most qualified professionals, reducing your time-to-hire by up to 75%.' },
            { h: 'Flexible Engagement Models', p: 'From single-contractor placements to fully managed teams to fractional C-suite leadership, we structure engagements around your actual need — not a standard staffing template.' },
            { h: 'Retention-Focused Delivery', p: 'We build retention mechanisms into every team deployment — structured onboarding, career development pathways, and competitive benefits packages that keep your talent productive and committed.' },
            { h: 'Domain Depth Across All Technology Stacks', p: 'Our talent network covers over 120 technology specializations, from niche legacy platforms like COBOL and AS/400 to cutting-edge skills in generative AI, Kubernetes, and cloud-native architectures.' }
        ]
    }
};

window.showServiceModal = (category) => {
    const modal = document.getElementById('serviceModalOverlay');
    const modalContent = document.getElementById('modalContent');
    const data = serviceDetails[category];
    
    if (!modal || !modalContent || !data) return;

    modalContent.innerHTML = `
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

window.addEventListener('DOMContentLoaded', () => {
    fetchDynamicContent();
});
