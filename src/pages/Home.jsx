import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Target, 
  Cpu, 
  Briefcase, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  Bot 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CampusToCorporateJourney from '../components/CampusToCorporateJourney';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
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
        
        {/* 3D Floating Badges */}
        <div className="floating-3d-elements">
          <div className="float-badge float-item-1 float-3d">
            <Code2 size={16} color="#61dafb" />
            <span>React & Node</span>
          </div>
          <div className="float-badge float-item-2 float-3d-slow">
            <Sparkles size={16} color="#ec4899" />
            <span>Gemini 1.5 AI</span>
          </div>
          <div className="float-badge float-item-3 float-3d">
            <Briefcase size={16} color="#10b981" />
            <span>Campus Hiring 2026</span>
          </div>
        </div>

        <div className="container hero-split-layout">
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-badge mb-4">
              <span className="badge-hiring" style={{ fontSize: '0.825rem', padding: '0.4rem 0.9rem' }}>
                Active Internship & Placement Season 2025/2026
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-title">
              Master Your Skills. <br />
              <span className="text-gradient">Unlock Placements with AI</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-subtitle">
              The intelligent college career platform. Learn industry-standard technologies, track your job eligibility in real-time, and crack interviews with Google Gemini AI.
            </motion.p>
            
            <motion.div variants={itemVariants} className="hero-actions">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/opportunities" className="btn btn-primary">
                  <Briefcase size={18} /> View Matched Jobs
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/skill-gap" className="btn btn-outline">
                  <Cpu size={18} /> Analyze Skill Gap
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3D Running Student Animation: Campus to Industry */}
          <motion.div 
            className="hero-journey-panel-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CampusToCorporateJourney />
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
          <motion.div variants={itemVariants} className="glass-panel stat-card card-3d">
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Placement Rate</p>
          </motion.div>
          <motion.div variants={itemVariants} className="glass-panel stat-card card-3d">
            <h3 className="stat-number">50k+</h3>
            <p className="stat-label">Notes Downloaded</p>
          </motion.div>
          <motion.div variants={itemVariants} className="glass-panel stat-card card-3d">
            <h3 className="stat-number">10k+</h3>
            <p className="stat-label">AI Interviews Evaluated</p>
          </motion.div>
          <motion.div variants={itemVariants} className="glass-panel stat-card card-3d">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Gemini AI Mentorship</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>
          Everything You Need to <span className="text-gradient">Succeed</span>
        </h2>
        
        <div className="features-grid">
          {/* Opportunities Feature Card */}
          <motion.div 
            className="glass-panel feature-card card-3d"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Briefcase size={32} />
            </div>
            <div className="badge-hiring" style={{ width: 'fit-content', marginBottom: '0.5rem' }}>New Feature</div>
            <h3 className="feature-title">870+ Skill-Matched Opportunities</h3>
            <p className="feature-desc">
              Over 870+ verified tech internships and campus placements filtered directly by how many skills you have learned. Live match percentages and 1-click apply!
            </p>
            <Link to="/opportunities" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Explore 870+ Openings <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Skill Gap Analysis Feature Card */}
          <motion.div 
            className="glass-panel feature-card card-3d"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper">
              <Cpu size={32} />
            </div>
            <h3 className="feature-title">Gemini Skill Gap AI</h3>
            <p className="feature-desc">
              Input your tech stack and target role. Gemini AI generates your role readiness score, missing skills, ATS keywords, and curated roadmap.
            </p>
            <Link to="/skill-gap" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Analyze Skills <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Placement Prep Feature Card */}
          <motion.div 
            className="glass-panel feature-card card-3d"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper">
              <Target size={32} />
            </div>
            <h3 className="feature-title">AI Mock Interviewer</h3>
            <p className="feature-desc">
              Practice role-specific interview questions (TCS, Zoho, SDE). Gemini AI scores your answer from 1-10 and gives instant constructive feedback.
            </p>
            <Link to="/placement" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Start Practice <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Academic Notes Feature Card */}
          <motion.div 
            className="glass-panel feature-card card-3d"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon-wrapper">
              <BookOpen size={32} />
            </div>
            <h3 className="feature-title">Academic Notes Portal</h3>
            <p className="feature-desc">
              Comprehensive semester study materials for engineering subjects carefully curated for university exams and conceptual foundation.
            </p>
            <Link to="/notes" style={{ color: 'var(--king-purple-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              Access Notes <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>© 2026 Campus to Industry AI • Built for ambitious students & engineers.</p>
      </footer>
    </div>
  );
};

export default Home;
