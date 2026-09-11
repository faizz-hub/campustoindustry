import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Check, 
  Copy, 
  Bot,
  RefreshCw,
  Award
} from 'lucide-react';
import { scanResumeWithAI } from '../services/geminiService';
import './ResumeBuilder.css';

const TARGET_ROLES = [
  "Full Stack Web Developer (MERN / Spring Boot)",
  "Frontend React / Next.js Specialist",
  "Backend & Cloud Microservices Engineer",
  "AI / Machine Learning & GenAI Engineer",
  "Data Engineer & Big Data Specialist",
  "Data Analyst & SQL / PowerBI Specialist",
  "Cloud & DevOps Engineer (AWS / Docker / K8s)",
  "Cybersecurity & Ethical Hacking Analyst",
  "Mobile App Developer (Flutter / iOS / Android)",
  "Product Manager (APM / Technical PM)",
  "UI/UX & Product Experience Designer",
  "Embedded Systems & IoT Engineer",
  "Game Developer & AR/VR Engineer",
  "QA Automation & Test Engineer",
  "TCS / Zoho / Cognizant SDE Graduate",
  "Core Systems & C++ Performance Engineer"
];

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    title: 'Computer Science Student',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    website: 'github.com/johndoe',
    summary: 'Passionate computer science student with a strong foundation in software engineering and algorithms. Looking for a summer internship to apply my skills in web development.',
    education: 'B.S. Computer Science\nUniversity of Technology (2022 - 2026)\nCGPA: 3.8/4.0',
    experience: 'Software Engineering Intern | TechCorp\nJune 2024 - Aug 2024\n- Developed a React frontend for the internal dashboard.\n- Improved API response time by 20% using Redis caching.',
    projects: 'E-commerce Platform\n- Built a full-stack e-commerce site using MERN stack.\n- Implemented Stripe for secure payments and JWT for authentication.',
    skills: 'JavaScript, React, Node.js, Python, Java, SQL, Git, Docker'
  });

  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [showAtsPanel, setShowAtsPanel] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [addedKeywords, setAddedKeywords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownload = () => {
    window.print();
  };

  const handleScanResume = async () => {
    setIsScanning(true);
    setShowAtsPanel(true);
    try {
      const result = await scanResumeWithAI({
        resumeData: formData,
        targetRole: selectedRole
      });
      setAtsResult(result);
    } catch (err) {
      console.error('Scan failed:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddKeywordToSkills = (keyword) => {
    const currentSkills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
    if (!currentSkills.some(s => s.toLowerCase() === keyword.toLowerCase())) {
      const updated = currentSkills.length > 0 ? `${formData.skills}, ${keyword}` : keyword;
      setFormData(prev => ({ ...prev, skills: updated }));
      setAddedKeywords(prev => [...prev, keyword]);
    }
  };

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="resume-page container">
      <div className="resume-header">
        <motion.h1 
          className="resume-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ATS-Friendly <span className="text-gradient">Resume Builder</span>
        </motion.h1>
        <p className="resume-subtitle">Create a clean, professional resume optimized for applicant tracking systems.</p>
      </div>

      <div className="resume-container">
        {/* LEFT COMPONENT: FORM */}
        <motion.div 
          className="resume-form glass-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="form-section">
            <h3>Personal Info</h3>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Professional Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Website/Links</label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Professional Summary</h3>
            <div className="input-group">
              <textarea name="summary" value={formData.summary} onChange={handleChange} rows="4"></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>Education</h3>
            <div className="input-group">
              <textarea name="education" value={formData.education} onChange={handleChange} rows="4"></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>Experience</h3>
            <div className="input-group">
              <textarea name="experience" value={formData.experience} onChange={handleChange} rows="6"></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>Projects</h3>
            <div className="input-group">
              <textarea name="projects" value={formData.projects} onChange={handleChange} rows="5"></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>Skills</h3>
            <div className="input-group">
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Comma separated skills" />
            </div>
          </div>
        </motion.div>

        {/* RIGHT COMPONENT: PREVIEW */}
        <motion.div 
          className="resume-preview-container"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="preview-actions flex-between" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
              <select 
                className="role-selector-input"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                title="Select Target Role for ATS evaluation"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              <button 
                className="btn btn-secondary ats-scan-btn"
                onClick={handleScanResume}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <RefreshCw size={16} className="spin-icon" />
                    <span>Scanning ATS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} color="#ec4899" />
                    <span>Scan with Gemini ATS</span>
                  </>
                )}
              </button>
            </div>

            <button className="btn btn-primary" onClick={handleDownload}>
              <Download size={18} style={{ marginRight: '0.5rem' }} /> Download PDF
            </button>
          </div>

          {/* AI ATS REVIEW DASHBOARD */}
          <AnimatePresence>
            {showAtsPanel && (
              <motion.div 
                className="ats-review-panel glass-panel card-3d"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isScanning ? (
                  <div className="ats-loading-state text-center" style={{ padding: '2rem' }}>
                    <RefreshCw size={32} className="spin-icon text-gradient" style={{ margin: '0 auto 1rem' }} />
                    <h4>Gemini AI is parsing resume content...</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Evaluating recruiter keyword density, impact metrics, and readability for <strong>{selectedRole}</strong>.
                    </p>
                  </div>
                ) : atsResult ? (
                  <div className="ats-results-content">
                    <div className="ats-score-banner">
                      <div className="ats-gauge">
                        <div 
                          className="ats-score-circle"
                          style={{
                            borderColor: atsResult.score >= 80 ? '#10b981' : atsResult.score >= 65 ? '#f59e0b' : '#ef4444'
                          }}
                        >
                          <span className="ats-score-val">{atsResult.score}</span>
                          <span className="ats-score-max">/100</span>
                        </div>
                      </div>

                      <div className="ats-score-details">
                        <div className="flex-between">
                          <span className="badge-hiring" style={{
                            background: atsResult.score >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            color: atsResult.score >= 80 ? '#10b981' : '#f59e0b'
                          }}>
                            {atsResult.verdict || 'Evaluation Complete'}
                          </span>
                          <button 
                            className="ats-close-btn"
                            onClick={() => setShowAtsPanel(false)}
                            title="Close ATS Panel"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="ats-summary-text">{atsResult.summaryFeedback}</p>
                      </div>
                    </div>

                    {/* Missing High-Impact Keywords */}
                    {atsResult.missingKeywords && atsResult.missingKeywords.length > 0 && (
                      <div className="ats-section-block">
                        <h5 className="ats-section-heading">
                          <AlertTriangle size={15} color="#f59e0b" /> Missing Keywords Detected by ATS
                        </h5>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                          Recruiters search for these exact terms. Click to auto-add into your skills list!
                        </p>
                        <div className="ats-keywords-grid">
                          {atsResult.missingKeywords.map((kw, i) => {
                            const isAdded = addedKeywords.includes(kw) || (formData.skills && formData.skills.toLowerCase().includes(kw.toLowerCase()));
                            return (
                              <button
                                key={i}
                                className={`ats-kw-chip ${isAdded ? 'kw-added' : ''}`}
                                onClick={() => handleAddKeywordToSkills(kw)}
                                disabled={isAdded}
                              >
                                {isAdded ? <Check size={12} /> : <Plus size={12} />}
                                <span>{kw}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bullet Point Rewrites with Metrics */}
                    {atsResult.bulletImprovements && atsResult.bulletImprovements.length > 0 && (
                      <div className="ats-section-block">
                        <h5 className="ats-section-heading">
                          <TrendingUp size={15} color="#8b5cf6" /> High-Impact Metric Rewrites
                        </h5>
                        <div className="ats-rewrites-list">
                          {atsResult.bulletImprovements.map((item, idx) => (
                            <div key={idx} className="ats-rewrite-card">
                              <div className="ats-rewrite-row">
                                <div className="ats-old-bullet">
                                  <span className="bullet-tag weak-tag">Before</span>
                                  <p>{item.originalBullet}</p>
                                </div>
                                <div className="ats-new-bullet">
                                  <div className="flex-between">
                                    <span className="bullet-tag strong-tag">Optimized</span>
                                    <button 
                                      className="ats-copy-bullet-btn"
                                      onClick={() => handleCopyBullet(item.improvedBullet, idx)}
                                      title="Copy rewritten bullet"
                                    >
                                      {copiedIndex === idx ? (
                                        <>
                                          <Check size={12} color="#10b981" /> Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Copy size={12} /> Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <p>{item.improvedBullet}</p>
                                  <span className="ats-reason-note">💡 {item.reason}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ATS Strengths & Best Practices */}
                    {atsResult.strengths && (
                      <div className="ats-section-block">
                        <h5 className="ats-section-heading">
                          <CheckCircle2 size={15} color="#10b981" /> Resume Strengths
                        </h5>
                        <ul className="ats-tips-list">
                          {atsResult.strengths.map((str, i) => (
                            <li key={i}>{str}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>


          <div className="resume-paper" id="resume-preview">
            <header className="resume-paper-header">
              <h1>{formData.fullName || 'Your Name'}</h1>
              <h2>{formData.title || 'Professional Title'}</h2>
              <div className="contact-info">
                {formData.email && <span><Mail size={12} /> {formData.email}</span>}
                {formData.phone && <span><Phone size={12} /> {formData.phone}</span>}
                {formData.location && <span><MapPin size={12} /> {formData.location}</span>}
                {formData.website && <span><Globe size={12} /> {formData.website}</span>}
              </div>
            </header>

            <div className="resume-body">
              {formData.summary && (
                <section className="resume-section">
                  <h3>Profile</h3>
                  <p>{formData.summary}</p>
                </section>
              )}

              {formData.education && (
                <section className="resume-section">
                  <h3>Education</h3>
                  <div className="pre-wrap">{formData.education}</div>
                </section>
              )}

              {formData.experience && (
                <section className="resume-section">
                  <h3>Experience</h3>
                  <div className="pre-wrap">{formData.experience}</div>
                </section>
              )}

              {formData.projects && (
                <section className="resume-section">
                  <h3>Projects</h3>
                  <div className="pre-wrap">{formData.projects}</div>
                </section>
              )}

              {formData.skills && (
                <section className="resume-section">
                  <h3>Skills</h3>
                  <div className="skills-list">
                    {formData.skills.split(',').map((skill, index) => (
                      <span key={index} className="skill-pill">{skill.trim()}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
