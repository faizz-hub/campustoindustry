import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Target, 
  ArrowRight,
  Laptop,
  CheckSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './CampusToCorporateJourney.css';

const CampusToCorporateJourney = () => {
  const [activeMilestone, setActiveMilestone] = useState(1);

  const milestones = [
    {
      id: 1,
      title: "Campus Foundation",
      subtitle: "Semester Books & Theory",
      desc: "Starting at the college gates with academic syllabus, core CS theory, and semester exams.",
      icon: <GraduationCap size={18} color="#8b5cf6" />,
      percent: 15,
      route: "/notes",
      linkText: "Explore Notes"
    },
    {
      id: 2,
      title: "Concept Mastery",
      subtitle: "DSA & Modern Web Stack",
      desc: "Mastering practical industry skills from basics to advanced (React, Python, System Design).",
      icon: <BookOpen size={18} color="#3b82f6" />,
      percent: 40,
      route: "/skill-gap",
      linkText: "View Roadmaps"
    },
    {
      id: 3,
      title: "Placement Assessment",
      subtitle: "Aptitude & Coding Rounds",
      desc: "Practicing time-bound quantitative aptitude and solving coding challenges for TCS, Zoho & MNCs.",
      icon: <Target size={18} color="#f59e0b" />,
      percent: 65,
      route: "/placement",
      linkText: "Practice Aptitude"
    },
    {
      id: 4,
      title: "Voice AI Mock Interview",
      subtitle: "Technical & Behavioral Rounds",
      desc: "Speaking live answers into the microphone with instant Gemini AI feedback and scoring.",
      icon: <Laptop size={18} color="#ec4899" />,
      percent: 85,
      route: "/placement",
      linkText: "Start Interview"
    },
    {
      id: 5,
      title: "Corporate Day 1",
      subtitle: "Placement Offer Letter",
      desc: "Landing top campus placement with ₹7-10 LPA CTC or high-stipend internships at leading tech companies!",
      icon: <Building2 size={18} color="#10b981" />,
      percent: 100,
      route: "/opportunities",
      linkText: "View Openings"
    }
  ];

  // Auto-cycle through milestones during animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMilestone(prev => (prev < 5 ? prev + 1 : 1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentInfo = milestones.find(m => m.id === activeMilestone) || milestones[0];

  return (
    <div className="campus-journey-container glass-panel card-3d">
      {/* Top Banner with Title */}
      <div className="journey-top-bar">
        <div className="journey-badge-wrap">
          <span className="badge-hiring" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
            <Sparkles size={12} /> Student Career Evolution
          </span>
          <h3 className="journey-main-title">
            From College Campus to <span className="text-gradient">Tech Corporate Hub</span>
          </h3>
        </div>
      </div>

      {/* The 3D Campus-to-Corporate Visual Track */}
      <div className="journey-viewport">
        {/* Background Grid & Horizon Glow */}
        <div className="cyber-horizon"></div>

        {/* LEFT ZONE: The College Campus */}
        <div className="scene-zone zone-campus">
          <div className="zone-landmark landmark-campus">
            <div className="campus-roof"></div>
            <div className="campus-pillars">
              <span></span><span></span><span></span>
            </div>
            <div className="campus-door"></div>
          </div>
          <div className="floating-campus-items">
            <div className="cap-icon float-3d">
              <GraduationCap size={28} color="#a78bfa" />
            </div>
            <div className="books-badge">Campus 2026</div>
          </div>
        </div>

        {/* CENTER: The Glowing Neon Career Highway */}
        <div className="career-highway">
          <div className="highway-road">
            <div className="highway-stripes"></div>
            <div className="energy-pulse-light"></div>
          </div>

          {/* Interactive Milestone Checkpoints along the road */}
          <div className="milestones-row">
            {milestones.map((m) => {
              const isPassed = activeMilestone >= m.id;
              const isCurrent = activeMilestone === m.id;

              return (
                <div 
                  key={m.id} 
                  className={`milestone-node ${isPassed ? 'node-passed' : ''} ${isCurrent ? 'node-active' : ''}`}
                  style={{ left: `${m.percent}%` }}
                  onClick={() => setActiveMilestone(m.id)}
                  title={`Click to view: ${m.title}`}
                >
                  <div className="node-marker">
                    {m.icon}
                  </div>
                  <div className="node-label">
                    <span>{m.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* THE RUNNING STUDENT CHARACTER */}
          <motion.div 
            className="student-runner-avatar"
            animate={{
              left: `${currentInfo.percent}%`,
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2.2,
              ease: "easeInOut"
            }}
          >
            <div className="runner-character">
              {/* Particle Trail behind runner */}
              <div className="runner-particle-trail">
                <span></span><span></span><span></span>
              </div>

              {/* Character Visual SVG */}
              <div className="runner-figure">
                <div className="runner-head">
                  {/* Graduation cap or corporate headset depending on stage */}
                  {activeMilestone <= 2 ? (
                    <span className="runner-cap">🎓</span>
                  ) : activeMilestone <= 4 ? (
                    <span className="runner-cap">🎧</span>
                  ) : (
                    <span className="runner-cap">💼</span>
                  )}
                </div>
                <div className="runner-torso">
                  {activeMilestone >= 4 ? (
                    <div className="tech-badge">ID</div>
                  ) : (
                    <div className="student-backpack">🎒</div>
                  )}
                </div>
                <div className="runner-legs">
                  <span className="leg leg-left"></span>
                  <span className="leg leg-right"></span>
                </div>
              </div>

              <div className="runner-shadow"></div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT ZONE: The Corporate Tech Towers */}
        <div className="scene-zone zone-corporate">
          {activeMilestone === 5 && (
            <div className="celebration-particles">
              <span className="confetti c1">🎉</span>
              <span className="confetti c2">⭐</span>
              <span className="confetti c3">✨</span>
              <span className="confetti c4">🎊</span>
              <span className="confetti c5">🚀</span>
            </div>
          )}
          <div className="zone-landmark landmark-corporate">
            <div className="tower tower-1">
              <div className="tower-windows"></div>
              <div className="tower-logo">TCS</div>
            </div>
            <div className="tower tower-2">
              <div className="tower-windows"></div>
              <div className="tower-logo">ZOHO</div>
            </div>
            <div className="tower tower-3">
              <div className="tower-windows"></div>
              <div className="tower-logo">GOOGLE</div>
            </div>
          </div>
          <div className="floating-corporate-items">
            <div className="offer-letter-pill float-3d-slow">
              <Award size={18} color="#10b981" />
              <span>Offer Letter: ₹8.5 LPA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Milestone Information Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentInfo.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="milestone-detail-card"
        >
          <div className="milestone-info-left">
            <div className="step-count-pill">Step {currentInfo.id} of 5</div>
            <div>
              <h4 className="detail-step-title">{currentInfo.title}: {currentInfo.subtitle}</h4>
              <p className="detail-step-desc">{currentInfo.desc}</p>
            </div>
          </div>

          <div className="milestone-info-right">
            <Link to={currentInfo.route} className="btn btn-primary detail-action-btn">
              {currentInfo.linkText} <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CampusToCorporateJourney;
