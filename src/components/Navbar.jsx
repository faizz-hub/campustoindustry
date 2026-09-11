import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Sun, Moon, Menu, X, Key, CheckCircle2, AlertCircle, ExternalLink, Loader } from 'lucide-react';
import { getGeminiApiKey, saveGeminiApiKey, testGeminiKey } from '../services/geminiService';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getGeminiApiKey());
  const [testStatus, setTestStatus] = useState(null); // { success: boolean, message: string }
  const [isTesting, setIsTesting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSaveAndTestKey = async (e) => {
    e.preventDefault();
    setIsTesting(true);
    setTestStatus(null);
    const cleaned = apiKeyInput.trim();
    saveGeminiApiKey(cleaned);
    const result = await testGeminiKey(cleaned);
    setTestStatus(result);
    setIsTesting(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs & Internships', path: '/opportunities', isHot: true },
    { name: 'Skill Gap', path: '/skill-gap' },
    { name: 'Placement Prep', path: '/placement' },
    { name: 'Notes', path: '/notes' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Resume', path: '/resume' },
    { name: 'Explore Domains', path: '/domains' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container flex-between" style={{ height: '100%' }}>
          <Link to="/" className="nav-logo">
            <GraduationCap className="icon" size={32} />
            <span>Campus to <span className="text-gradient">Industry</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {link.name}
                {link.isHot && <span className="badge-hiring" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>Hiring</span>}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {/* API Key / Quota Manager Button */}
            <button 
              onClick={() => setIsKeyModalOpen(true)} 
              className="theme-toggle" 
              title="Update Gemini API Key & Quota"
              style={{ color: 'var(--king-purple-600)' }}
            >
              <Key size={18} />
            </button>

            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/chat" className="btn btn-primary">
              AI Mentor
            </Link>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer glass-panel" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.25rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: location.pathname === link.path ? 'var(--king-purple-600)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {link.name}
                {link.isHot && <span className="badge-hiring" style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem' }}>Hiring</span>}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* GEMINI API KEY & QUOTA MODAL */}
      {isKeyModalOpen && (
        <div className="key-modal-overlay" onClick={() => setIsKeyModalOpen(false)}>
          <div className="key-modal-card glass-panel card-3d" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={20} className="text-gradient" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Update Gemini API Key & Quota</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsKeyModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
              If your Gemini quota has reached its free tier rate limit or is overloaded, paste your fresh Google Gemini API key below. It will be saved and used instantly across the entire portal.
            </p>

            <form onSubmit={handleSaveAndTestKey}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Google Gemini API Key:
                </label>
                <input 
                  type="password" 
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="modal-key-input"
                />
              </div>

              {testStatus && (
                <div className={`key-test-banner ${testStatus.success ? 'test-success' : 'test-fail'}`}>
                  {testStatus.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{testStatus.message}</span>
                </div>
              )}

              <div className="modal-actions-row flex-between" style={{ marginTop: '1.5rem' }}>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="get-key-link"
                >
                  Get Free Key at Google AI Studio <ExternalLink size={13} />
                </a>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isTesting || !apiKeyInput.trim()}
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
                >
                  {isTesting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Loader className="animate-spin" size={14} /> Verifying...
                    </span>
                  ) : (
                    'Save & Verify Quota'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
