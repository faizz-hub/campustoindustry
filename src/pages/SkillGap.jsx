import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Search, ArrowRight, Loader } from 'lucide-react';
import './SkillGap.css';

const SkillGap = () => {
  const [skills, setSkills] = useState(['HTML', 'CSS']);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        setSkills([...skills, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAnalyze = () => {
    if (skills.length === 0) return;
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate AI API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        missing: ['JavaScript', 'React', 'Git', 'Tailwind CSS'],
        roadmap: [
          { title: 'Core Logic (JavaScript)', desc: 'Learn variables, loops, DOM manipulation, and ES6+ features to make your static web pages interactive.' },
          { title: 'Version Control (Git)', desc: 'Understand branching, merging, and GitHub to collaborate with engineering teams.' },
          { title: 'Frontend Framework (React)', desc: 'Master components, state, and hooks to build scalable Single Page Applications.' }
        ]
      });
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div className="skill-gap-page">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="skill-form shadow-lg"
        >
          <div className="skill-form-header">
            <Cpu size={48} className="text-gradient" style={{ margin: '0 auto 1rem auto', color: 'var(--king-purple-600)' }} />
            <h2>AI Skill Gap <span className="text-gradient">Analyzer</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Enter your current technologies to find out what's missing for top industry roles.</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Current Skills (Press Enter to add)</label>
            <div className="tag-input-container">
              {skills.map(skill => (
                <span key={skill} className="skill-tag">
                  {skill}
                  <button onClick={() => removeSkill(skill)}><X size={14} /></button>
                </span>
              ))}
              <input 
                type="text" 
                className="tag-input"
                placeholder="e.g. HTML, Python..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            onClick={handleAnalyze}
            disabled={skills.length === 0 || isAnalyzing}
          >
            {isAnalyzing ? (
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Loader className="animate-spin" size={20} /> Analyzing Industry Trends...
               </span>
            ) : (
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Search size={20} /> Identify My Skill Gaps
               </span>
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass-panel analysis-results"
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Analysis Complete</h3>
              
              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Missing Critical Skills</h4>
                <div className="missing-skills-container">
                  {results.missing.map(skill => (
                    <span key={skill} className="missing-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>AI Recommended Learning Path</h4>
                <div className="roadmap-timeline">
                  {results.roadmap.map((step, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      key={idx} 
                      className="roadmap-step"
                    >
                      <h5 className="step-title">{step.title}</h5>
                      <p className="step-desc">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                 <button className="btn btn-outline">
                    Explore Relevant Domains <ArrowRight size={18} />
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillGap;
