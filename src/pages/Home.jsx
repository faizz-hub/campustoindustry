import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Target, Cpu, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-blob hero-blob-1"></div>
        <div className="hero-bg-blob hero-blob-2"></div>
        
        <div className="container">
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-badge mb-4">
              <span style={{ 
                background: 'var(--king-purple-100)', 
                color: 'var(--king-purple-700)',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Introducing ElevateCareer AI
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-title">
              Shape Your Future with <br />
              <span className="text-gradient">Intelligent Guidance</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-subtitle">
              The ultimate college career platform. Access premium notes, test your skills, prepare for placements, and get personalized AI insights.
            </motion.p>
            
            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/placement" className="btn btn-primary">
                Start Preparing <ArrowRight size={20} />
              </Link>
              <Link to="/domains" className="btn btn-outline">
                Explore Domains
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <motion.div 
          className="stats-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="glass-panel stat-card">
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Placement Rate</p>
          </motion.div>
          <motion.div variants={itemVariants} className="glass-panel stat-card">
            <h3 className="stat-number">50k+</h3>
            <p className="stat-label">Notes Downloaded</p>
          </motion.div>
          <motion.div variants={itemVariants} className="glass-panel stat-card">
            <h3 className="stat-number">10k+</h3>
            <p className="stat-label">Interviews Mocked</p>
          </motion.div>
          <motion.div variants={itemVariants} className="glass-panel stat-card">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">AI Mentorship</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title">Everything You Need to <span className="text-gradient">Succeed</span></h2>
        
        <div className="features-grid">
          <motion.div 
            className="glass-panel feature-card"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper">
              <BookOpen size={32} />
            </div>
            <h3 className="feature-title">Academic Notes</h3>
            <p className="feature-desc">Comprehensive study materials for every department, semester, and subject carefully curated by top performers.</p>
            <Link to="/notes" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Access Notes <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="glass-panel feature-card"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper">
              <Target size={32} />
            </div>
            <h3 className="feature-title">Placement Prep</h3>
            <p className="feature-desc">Ace your interviews with AI mock interviews, timed aptitude tests, and real-world coding challenges.</p>
            <Link to="/placement" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Start Practice <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="glass-panel feature-card"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper">
              <Cpu size={32} />
            </div>
            <h3 className="feature-title">Skill Gap Analysis</h3>
            <p className="feature-desc">Input your current skills and let our AI build a personalized roadmap to land your dream role in tech.</p>
            <Link to="/skill-gap" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Find Gaps <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>© 2026 ElevateCareer AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
