import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Layers, BarChart, Brain, Shield, Cloud, Smartphone, Monitor, Database, ArrowLeft } from 'lucide-react';
import './DomainChooser.css';

const DOMAINS = [
  { id: 'frontend', title: 'Frontend Development', icon: <Layout size={32} />, desc: 'Build the visual and interactive aspects of websites.' },
  { id: 'backend', title: 'Backend Development', icon: <Server size={32} />, desc: 'Power servers, databases, and core application logic.' },
  { id: 'fullstack', title: 'Full Stack Development', icon: <Layers size={32} />, desc: 'End-to-end expertise in both frontend and backend.' },
  { id: 'data', title: 'Data Science', icon: <BarChart size={32} />, desc: 'Extract insights from data using statistical methods.' },
  { id: 'ai', title: 'Artificial Intelligence', icon: <Brain size={32} />, desc: 'Create systems that reason, learn, and act autonomously.' },
  { id: 'ml', title: 'Machine Learning', icon: <Brain size={32} />, desc: 'Design algorithms that enable computers to learn from data.' },
  { id: 'cyber', title: 'Cybersecurity', icon: <Shield size={32} />, desc: 'Protect networks, devices, and data from attacks.' },
  { id: 'cloud', title: 'Cloud Computing', icon: <Cloud size={32} />, desc: 'Design and manage scalable cloud infrastructures.' },
  { id: 'mobile', title: 'Mobile Development', icon: <Smartphone size={32} />, desc: 'Build applications for iOS and Android devices.' },
  { id: 'devops', title: 'DevOps Engineering', icon: <Monitor size={32} />, desc: 'Bridge development and operations for continuous delivery.' },
];

const DOMAIN_DETAILS = {
  'frontend': {
    title: 'Frontend Development',
    icon: <Layout size={40} />,
    about: 'Frontend development focuses on creating the user-facing part of a website or application. You will be responsible for translating design wireframes into code, ensuring technical feasibility, and optimizing for maximum speed and scalability.',
    skills: ['HTML5', 'CSS3/SCSS', 'JavaScript (ES6+)', 'React/Vue/Angular', 'TypeScript', 'Responsive Design', 'Git', 'Webpack/Vite', 'UI/UX Basics', 'Web Performance'],
    roadmap: [
      { step: '1. Basics', desc: 'Master HTML, CSS, and vanilla JavaScript.' },
      { step: '2. Frameworks', desc: 'Learn React.js or Next.js for building scalable UIs.' },
      { step: '3. State & Routing', desc: 'Handle application state (Redux/Zustand) and page routing.' },
      { step: '4. Advanced', desc: 'Performance optimization, accessibility (a11y), and testing (Jest/Cypress).' }
    ],
    careers: [
      { role: 'Frontend Engineer', salary: '$80k - $150k / year' },
      { role: 'UI Engineer', salary: '$75k - $140k / year' },
      { role: 'Web Developer', salary: '$60k - $120k / year' },
    ]
  }
};

const DomainChooser = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Safe fallback if domain data is missing
  const details = selectedDomain ? (DOMAIN_DETAILS[selectedDomain.id] || DOMAIN_DETAILS['frontend']) : null;

  return (
    <div className="domain-page container">
      <AnimatePresence mode="wait">
        {!selectedDomain ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="domain-header">
              <h1 className="domain-title">Explore IT <span className="text-gradient">Domains</span></h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Discover various fields in technology. Click on a domain to explore required skills, learning roadmaps, and career opportunities.
              </p>
            </div>

            <motion.div 
              className="domain-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {DOMAINS.map(domain => (
                <motion.div 
                  key={domain.id}
                  variants={itemVariants}
                  className="domain-card"
                  onClick={() => setSelectedDomain(domain)}
                  whileHover={{ scale: 1.05, y: -10, boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="domain-icon-wrapper">
                    {domain.icon}
                  </div>
                  <h3>{domain.title}</h3>
                  <p>{domain.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button className="back-btn" onClick={() => setSelectedDomain(null)}>
              <ArrowLeft size={18} /> Back to Domains
            </button>

            <div className="domain-detail-view glass-panel">
              <div className="domain-detail-header">
                <div className="domain-detail-icon">
                  {details.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{details.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>{details.about}</p>
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Required Technologies & Skills</h3>
                <div className="tech-grid">
                  {details.skills.map(skill => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Learning Roadmap</h3>
                  <div style={{ borderLeft: '2px solid var(--king-purple-200)', marginLeft: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {details.roadmap.map((step, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-2.05rem', top: '0.2rem', width: '1rem', height: '1rem', background: 'var(--king-purple-500)', borderRadius: '50%', border: '3px solid var(--bg-primary)' }}></div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{step.step}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Career Opportunities</h3>
                  <div className="career-grid">
                    {details.careers.map((career, idx) => (
                      <div key={idx} className="career-card">
                        <h4>{career.role}</h4>
                        <div className="career-salary">{career.salary}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '2rem' }}>
                     <button className="btn btn-primary" style={{ width: '100%' }}>
                       Analyze My Fit for this Domain
                     </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainChooser;
