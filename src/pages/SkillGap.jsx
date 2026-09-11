import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Cpu, 
  Search, 
  ArrowRight, 
  Loader, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  Target, 
  Plus, 
  Compass, 
  ExternalLink, 
  CheckSquare, 
  Layers, 
  Award, 
  AlertTriangle,
  Play,
  Video 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUserSkills, saveUserSkills, getTargetRole, saveTargetRole } from '../utils/userSkills';
import { analyzeSkillGapWithAI, generateDeepConceptMastery, getOfflineConceptMastery } from '../services/geminiService';
import './SkillGap.css';

const SkillGap = () => {
  const [skills, setSkills] = useState(getUserSkills());
  const [targetRole, setTargetRoleState] = useState(getTargetRole());
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // Active view: 'analyzer' or 'conceptMastery'
  const [activeTab, setActiveTab] = useState('analyzer');
  const [selectedConceptSkill, setSelectedConceptSkill] = useState('HTML');
  const [conceptRoadmap, setConceptRoadmap] = useState(null);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);
  const [completedConcepts, setCompletedConcepts] = useState(() => {
    try {
      const saved = localStorage.getItem('elevate_completed_concepts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync state if changed elsewhere
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) setSkills(e.detail);
    };
    window.addEventListener('elevate_skills_updated', handleUpdate);
    return () => window.removeEventListener('elevate_skills_updated', handleUpdate);
  }, []);

  // Fetch concept roadmap whenever selectedConceptSkill changes or tab switched
  useEffect(() => {
    if (activeTab === 'conceptMastery') {
      loadConceptRoadmap(selectedConceptSkill);
    }
  }, [activeTab, selectedConceptSkill]);

  const roadmapCacheRef = useRef({});

  const loadConceptRoadmap = async (skillName) => {
    // 1. Instant load from cache if available (0ms)
    if (roadmapCacheRef.current[skillName]) {
      setConceptRoadmap(roadmapCacheRef.current[skillName]);
      setIsLoadingRoadmap(false);
      return;
    }

    // 2. Instant load from rich offline dataset (0ms latency!)
    const offlineData = getOfflineConceptMastery(skillName);
    setConceptRoadmap(offlineData);
    roadmapCacheRef.current[skillName] = offlineData;
    setIsLoadingRoadmap(false);

    // 3. Background fetch AI data without blocking UI
    try {
      const data = await generateDeepConceptMastery(skillName);
      if (data) {
        roadmapCacheRef.current[skillName] = data;
        setConceptRoadmap(data);
      }
    } catch (err) {
      console.warn("Using offline concept roadmap for:", skillName);
    }
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setTargetRoleState(newRole);
    saveTargetRole(newRole);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const val = inputValue.trim();
      if (!skills.some(s => s.toLowerCase() === val.toLowerCase())) {
        const updated = [...skills, val];
        setSkills(updated);
        saveUserSkills(updated);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    saveUserSkills(updated);
  };

  const markSkillAsLearned = (skill) => {
    if (!skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      const updated = [...skills, skill];
      setSkills(updated);
      saveUserSkills(updated);
    }
  };

  const handleAnalyze = async () => {
    if (skills.length === 0) return;
    setIsAnalyzing(true);
    setResults(null);

    const aiResponse = await analyzeSkillGapWithAI(skills, targetRole);
    setResults(aiResponse);
    setIsAnalyzing(false);
  };

  const openConceptGuideFor = (skillName) => {
    setSelectedConceptSkill(skillName);
    setActiveTab('conceptMastery');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const toggleConceptCompletion = (conceptKey) => {
    const updated = {
      ...completedConcepts,
      [conceptKey]: !completedConcepts[conceptKey]
    };
    setCompletedConcepts(updated);
    localStorage.setItem('elevate_completed_concepts', JSON.stringify(updated));
  };

  const targetRolesList = [
    'Full Stack Developer (MERN / Spring Boot)',
    'Frontend Specialist (React / Next.js / TypeScript)',
    'Backend & Cloud Engineer (Node / Java / Python / Go)',
    'AI / Machine Learning Engineer & GenAI Practitioner',
    'Data Engineer & PySpark Specialist',
    'Data Analyst & Business Intelligence Specialist',
    'Cloud & DevOps Specialist (AWS / Docker / Kubernetes)',
    'Cybersecurity & Ethical Hacking Specialist',
    'Mobile App Developer (Flutter / React Native / Swift)',
    'Product Manager (Technical PM / APM)',
    'UI/UX & Product Designer',
    'Embedded Systems & IoT Engineer',
    'Game Developer & AR/VR Engineer (Unity / Unreal)',
    'QA Automation & Testing Specialist (Playwright / Selenium)',
    'Core Systems & C++ Performance Engineer'
  ];

  const popularMasterySkills = ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Node.js', 'Python', 'SQL', 'Docker'];

  // Calculate mastery percentage for currently opened skill roadmap
  const allCurrentConcepts = conceptRoadmap?.stages?.flatMap(s => s.concepts.map(c => `${selectedConceptSkill}-${c.name}`)) || [];
  const completedCount = allCurrentConcepts.filter(k => completedConcepts[k]).length;
  const masteryPercentage = allCurrentConcepts.length > 0 ? Math.round((completedCount / allCurrentConcepts.length) * 100) : 0;

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      <div className="skill-gap-page">
        {/* Navigation Mode Switcher */}
        <div className="skill-mode-switch glass-panel">
          <button 
            className={`mode-btn ${activeTab === 'analyzer' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyzer')}
          >
            <Cpu size={18} /> AI Skill Gap Analyzer
          </button>
          <button 
            className={`mode-btn ${activeTab === 'conceptMastery' ? 'active' : ''}`}
            onClick={() => setActiveTab('conceptMastery')}
          >
            <Compass size={18} /> Concept Mastery Roadmap (Basics to Advanced)
          </button>
        </div>

        {/* TAB 1: AI SKILL GAP ANALYZER */}
        {activeTab === 'analyzer' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Form Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="skill-form shadow-lg card-3d glass-panel"
            >
              <div className="skill-form-header">
                <div className="inline-badge mb-2">
                  <span className="badge-hiring" style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                    Powered by Google Gemini 1.5
                  </span>
                </div>
                <h2>Target Role & <span className="text-gradient">Skill Gap Analyzer</span></h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Choose your target job role. Gemini AI will analyze your tech stack, reveal critical gaps, and provide actionable ways to fill each one.
                </p>
              </div>

              {/* Target Role Selector */}
              <div className="role-selector-wrap" style={{ marginBottom: '1.75rem' }}>
                <label className="form-label">Target Career Role:</label>
                <select 
                  value={targetRole} 
                  onChange={handleRoleChange}
                  className="role-select-input"
                >
                  {targetRolesList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Current Skills Tag Input */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Your Mastered Skills ({skills.length}):
                  </label>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Press Enter to add</span>
                </div>

                <div className="tag-input-container">
                  {skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                      <button onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    className="tag-input"
                    placeholder="e.g. Docker, TypeScript, Next.js..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: 600 }}
                onClick={handleAnalyze}
                disabled={skills.length === 0 || isAnalyzing}
              >
                {isAnalyzing ? (
                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                     <Loader className="animate-spin" size={20} /> Gemini AI is analyzing industry benchmarks...
                   </span>
                ) : (
                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                     <Sparkles size={20} /> Analyze Gaps for {targetRole}
                   </span>
                )}
              </button>
            </motion.div>

            {/* Real Gemini Analysis Results */}
            <AnimatePresence>
              {results && (
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel analysis-results card-3d"
                  style={{ marginTop: '2.5rem' }}
                >
                  {/* Top Score Banner */}
                  <div className="results-top-banner">
                    <div className="readiness-gauge">
                      <span className="gauge-score text-gradient">{results.readinessScore}%</span>
                      <span className="gauge-label">Role Readiness</span>
                    </div>
                    <div className="verdict-content">
                      <div className="verdict-tag">
                        <Sparkles size={14} /> Gemini Industry Verdict
                      </div>
                      <p className="verdict-text">{results.verdict}</p>
                    </div>
                  </div>

                  {/* Missing Skills Section with "Learn Concept Roadmap" CTA */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    <div className="section-title-wrap">
                      <Target size={18} className="text-gradient" />
                      <h4>Missing Skills & How to Fill Each Gap</h4>
                    </div>
                    <p className="section-hint">
                      Click <strong>"Concept Roadmap"</strong> on any skill to see exact concepts to master from basics to advanced, where to study, and practice milestones:
                    </p>
                    
                    <div className="gap-cards-container">
                      {results.missingSkills && results.missingSkills.map(skill => {
                        const isAlreadyAdded = skills.some(s => s.toLowerCase() === skill.toLowerCase());
                        return (
                          <div key={skill} className="gap-action-card glass-panel">
                            <div className="gap-card-left">
                              <span className="gap-skill-name">{skill}</span>
                              <span className="gap-required-tag">Required for {targetRole}</span>
                            </div>
                            <div className="gap-card-actions">
                              <button 
                                className="btn-deep-learn"
                                onClick={() => openConceptGuideFor(skill)}
                              >
                                <BookOpen size={14} /> Concept Roadmap
                              </button>
                              <button 
                                className={`missing-tag-btn ${isAlreadyAdded ? 'already-added' : ''}`}
                                onClick={() => markSkillAsLearned(skill)}
                                disabled={isAlreadyAdded}
                              >
                                {isAlreadyAdded ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                                {isAlreadyAdded ? 'Learned' : 'Mark Learned'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ATS Resume Keywords */}
                  {results.atsKeywords && results.atsKeywords.length > 0 && (
                    <div style={{ marginBottom: '2.5rem' }}>
                      <div className="section-title-wrap">
                        <BookOpen size={18} className="text-gradient" />
                        <h4>Recommended ATS Keywords for Resume Shortlisting</h4>
                      </div>
                      <div className="ats-keywords-container">
                        {results.atsKeywords.map((kw, i) => (
                          <span key={i} className="ats-keyword-pill">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning Path Roadmap */}
                  <div>
                    <div className="section-title-wrap">
                      <Cpu size={18} className="text-gradient" />
                      <h4>Personalized Phase-by-Phase Roadmap</h4>
                    </div>
                    
                    <div className="roadmap-timeline">
                      {results.roadmap && results.roadmap.map((step, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          key={idx} 
                          className="roadmap-step"
                        >
                          <div className="roadmap-step-header">
                            <span className="step-badge">Phase {step.step || idx + 1}</span>
                            <span className="step-duration">{step.duration}</span>
                          </div>
                          <h5 className="step-title">{step.title}</h5>
                          <p className="step-desc">{step.desc}</p>
                          {step.recommendedProject && (
                            <div className="step-project-box">
                              <strong>Portfolio Project:</strong> {step.recommendedProject}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom Action */}
                  <div className="results-action-footer">
                    <Link to="/opportunities" className="btn btn-primary">
                      <Briefcase size={18} /> View Matched Jobs for My Current Skills
                    </Link>
                    <button 
                      onClick={() => openConceptGuideFor(results.missingSkills?.[0] || 'HTML')}
                      className="btn btn-outline"
                    >
                      Open Concept Deep Dive <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* TAB 2: DEEP CONCEPT-BY-CONCEPT MASTERY GUIDE (BASICS TO ADVANCED) */}
        {activeTab === 'conceptMastery' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="concept-mastery-view"
          >
            {/* Quick Skill Selector Bar */}
            <div className="concept-selector-bar glass-panel card-3d">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Compass size={20} className="text-gradient" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Choose Concept to Master:</h3>
              </div>
              <div className="skill-pills-row">
                {popularMasterySkills.map(skillName => (
                  <button
                    key={skillName}
                    className={`mastery-skill-pill ${selectedConceptSkill.toLowerCase() === skillName.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setSelectedConceptSkill(skillName)}
                  >
                    {skillName}
                  </button>
                ))}
              </div>
            </div>

            {/* Roadmap Content */}
            {isLoadingRoadmap ? (
              <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
                <Loader className="animate-spin" size={36} style={{ color: 'var(--king-purple-600)', margin: '0 auto 1rem auto' }} />
                <h3>Generating Concept-by-Concept Mastery Blueprint...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Gemini is organizing topics from fundamentals to advanced production standards.</p>
              </div>
            ) : conceptRoadmap ? (
              <div className="concept-roadmap-content">
                {/* Header Card */}
                <div className="concept-header-card glass-panel card-3d">
                  <div className="concept-header-top">
                    <div>
                      <div className="inline-badge mb-2">
                        <span className="badge-hiring">Basics to Advanced Curriculum</span>
                      </div>
                      <h2 className="concept-guide-title">{conceptRoadmap.topic}</h2>
                      <p className="concept-guide-summary">{conceptRoadmap.summary}</p>
                    </div>
                    <div className="mastery-tracker-box">
                      <span className="tracker-val text-gradient">{masteryPercentage}%</span>
                      <span className="tracker-label">Concepts Mastered</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {completedCount}/{allCurrentConcepts.length} completed
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mastery-progress-bar-wrap">
                    <div className="mastery-progress-bar-fill" style={{ width: `${masteryPercentage}%` }} />
                  </div>

                  {masteryPercentage === 100 && (
                    <div className="completed-all-banner">
                      <Award size={20} color="#10b981" />
                      <span>Congratulations! You have mastered all core concepts of {conceptRoadmap.topic}.</span>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                        onClick={() => markSkillAsLearned(conceptRoadmap.topic)}
                      >
                        Add to My Mastered Skills
                      </button>
                    </div>
                  )}
                </div>

                {/* 3-Stage Concept Breakdown */}
                <div className="stages-container">
                  {conceptRoadmap.stages && conceptRoadmap.stages.map((stage, sIdx) => (
                    <div key={sIdx} className="stage-card glass-panel card-3d">
                      <div className="stage-card-header">
                        <div className="stage-number-badge">Stage {stage.stageNumber || sIdx + 1}</div>
                        <div>
                          <h3 className="stage-title">{stage.stageTitle}</h3>
                          <p className="stage-goal"><strong>Goal:</strong> {stage.stageGoal}</p>
                        </div>
                      </div>

                      {/* Concepts List */}
                      <div className="stage-concepts-grid">
                        {stage.concepts && stage.concepts.map((concept, cIdx) => {
                          const conceptKey = `${selectedConceptSkill}-${concept.name}`;
                          const isDone = completedConcepts[conceptKey];

                          return (
                            <div key={cIdx} className={`concept-item-card ${isDone ? 'concept-done' : ''}`}>
                              <div className="concept-item-header">
                                <label className="concept-checkbox-label">
                                  <input 
                                    type="checkbox" 
                                    checked={!!isDone}
                                    onChange={() => toggleConceptCompletion(conceptKey)}
                                  />
                                  <span className="concept-name">{concept.name}</span>
                                </label>
                                {isDone && <span className="done-pill"><CheckCircle2 size={12} /> Mastered</span>}
                              </div>

                              <p className="concept-explanation">{concept.explanation}</p>

                              {/* Specific Subtopics to Master */}
                              <div className="subtopics-wrap">
                                <span className="subtopics-title">Key Topics to Practice:</span>
                                <ul className="subtopics-list">
                                  {concept.keyTopicsToMaster && concept.keyTopicsToMaster.map((topicItem, tIdx) => (
                                    <li key={tIdx}>{topicItem}</li>
                                  ))}
                                </ul>
                              </div>

                              {/* Common Interview Pitfall */}
                              {concept.commonMistake && (
                                <div className="pitfall-box">
                                  <AlertTriangle size={14} className="pitfall-icon" />
                                  <span><strong>Fresher Mistake to Avoid:</strong> {concept.commonMistake}</span>
                                </div>
                              )}

                              {/* YouTube Recommended Resource */}
                              <div className="concept-yt-wrap" style={{ marginTop: '0.4rem' }}>
                                <a
                                  href={concept.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent((selectedConceptSkill || '') + ' ' + concept.name + ' tutorial')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-youtube-learn"
                                  title="Watch verified educational video tutorial on YouTube"
                                >
                                  <Play size={13} fill="#fff" />
                                  <span>Learn on YouTube: <strong>{concept.youtubeResource || `${concept.name} Full Tutorial`}</strong></span>
                                  <ExternalLink size={12} style={{ marginLeft: 'auto' }} />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Practice Milestone */}
                      {stage.practiceMilestone && (
                        <div className="milestone-box">
                          <CheckSquare size={16} className="milestone-icon" />
                          <span><strong>Stage Milestone Challenge:</strong> {stage.practiceMilestone}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Where to Learn (Curated Free Resources) */}
                {conceptRoadmap.curatedResources && conceptRoadmap.curatedResources.length > 0 && (
                  <div className="resources-section glass-panel card-3d">
                    <div className="section-title-wrap mb-3">
                      <BookOpen size={20} className="text-gradient" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Where & How to Study (Curated Free Sources)</h3>
                    </div>
                    <div className="resources-grid">
                      {conceptRoadmap.curatedResources.map((res, rIdx) => (
                        <a 
                          key={rIdx} 
                          href={res.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="resource-card glass-panel"
                        >
                          <div className="resource-header">
                            <span className="res-type-pill">{res.type}</span>
                            <ExternalLink size={14} />
                          </div>
                          <h4 className="res-title">{res.name}</h4>
                          <p className="res-desc">{res.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Capstone Project Challenge */}
                {conceptRoadmap.capstoneProject && (
                  <div className="capstone-section glass-panel card-3d">
                    <div className="section-title-wrap mb-2">
                      <Award size={22} className="text-gradient" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recommended Portfolio Capstone Project</h3>
                    </div>
                    <h4 className="capstone-title">{conceptRoadmap.capstoneProject.title}</h4>
                    <p className="capstone-desc">{conceptRoadmap.capstoneProject.description}</p>
                    
                    <div className="capstone-features">
                      <strong>Features to implement for full marks:</strong>
                      <ul>
                        {conceptRoadmap.capstoneProject.featuresToInclude && conceptRoadmap.capstoneProject.featuresToInclude.map((feat, fIdx) => (
                          <li key={fIdx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Real Interview Gotchas */}
                {conceptRoadmap.interviewQuestions && conceptRoadmap.interviewQuestions.length > 0 && (
                  <div className="interview-q-section glass-panel card-3d">
                    <div className="section-title-wrap mb-3">
                      <Target size={20} className="text-gradient" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Frequently Asked Campus Interview Questions</h3>
                    </div>
                    <div className="interview-q-list">
                      {conceptRoadmap.interviewQuestions.map((q, qIdx) => (
                        <div key={qIdx} className="interview-q-card">
                          <h5 className="q-text">Q: {q.question}</h5>
                          <p className="q-answer"><strong>Ideal Answer Points:</strong> {q.idealAnswerKeypoints}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SkillGap;
