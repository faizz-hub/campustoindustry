import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Filter, 
  TrendingUp, 
  Plus, 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Compass,
  Search,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowUpDown
} from 'lucide-react';
import { OPPORTUNITIES_DATA, calculateMatch } from '../data/opportunitiesData';
import { getUserSkills, saveUserSkills } from '../utils/userSkills';
import { getJobFitWithAI } from '../services/geminiService';
import './Opportunities.css';

const Opportunities = () => {
  const [userSkills, setUserSkills] = useState(getUserSkills());
  const [filterType, setFilterType] = useState('all'); // all, internship, placement, eligible
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match'); // match, hot, company
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [aiAnalysisMap, setAiAnalysisMap] = useState({});
  const [analyzingId, setAnalyzingId] = useState(null);

  // Sync skills when updated across the app
  useEffect(() => {
    const handleSkillsUpdate = (e) => {
      if (e.detail) setUserSkills(e.detail);
    };
    window.addEventListener('elevate_skills_updated', handleSkillsUpdate);
    return () => window.removeEventListener('elevate_skills_updated', handleSkillsUpdate);
  }, []);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const skillName = newSkillInput.trim();
    if (!userSkills.some(s => s.toLowerCase() === skillName.toLowerCase())) {
      const updated = [...userSkills, skillName];
      setUserSkills(updated);
      saveUserSkills(updated);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = userSkills.filter(s => s !== skillToRemove);
    setUserSkills(updated);
    saveUserSkills(updated);
  };

  // Evaluate each opportunity against user's skills
  const evaluatedOpportunities = useMemo(() => {
    return OPPORTUNITIES_DATA.map(opp => {
      const match = calculateMatch(userSkills, opp.requiredSkills);
      return {
        ...opp,
        match
      };
    });
  }, [userSkills]);

  // High-level stats
  const totalCount = evaluatedOpportunities.length;
  const totalInternships = useMemo(() => evaluatedOpportunities.filter(o => o.type === 'Internship').length, [evaluatedOpportunities]);
  const totalPlacements = useMemo(() => evaluatedOpportunities.filter(o => o.type === 'Placement').length, [evaluatedOpportunities]);
  const eligibleOpportunities = useMemo(() => evaluatedOpportunities.filter(o => o.match.isEligible), [evaluatedOpportunities]);
  const eligibleCount = eligibleOpportunities.length;
  const eligibleInternships = eligibleOpportunities.filter(o => o.type === 'Internship').length;
  const eligiblePlacements = eligibleOpportunities.filter(o => o.type === 'Placement').length;

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Full Stack',
    'AI / ML',
    'Cloud / DevOps',
    'Mobile',
    'Cyber Security',
    'Core / Embedded'
  ];

  // Reset pagination when filters, search, or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, selectedCategory, searchQuery, sortBy, itemsPerPage]);

  // Filtered list
  const filteredList = useMemo(() => {
    return evaluatedOpportunities.filter(opp => {
      if (filterType === 'internship' && opp.type !== 'Internship') return false;
      if (filterType === 'placement' && opp.type !== 'Placement') return false;
      if (filterType === 'eligible' && !opp.match.isEligible) return false;
      if (selectedCategory !== 'All' && opp.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = opp.title.toLowerCase().includes(q);
        const matchCompany = opp.company.toLowerCase().includes(q);
        const matchLocation = opp.location.toLowerCase().includes(q);
        const matchSkill = opp.requiredSkills.some(s => s.toLowerCase().includes(q));
        const matchCategory = opp.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCompany && !matchLocation && !matchSkill && !matchCategory) {
          return false;
        }
      }
      return true;
    });
  }, [evaluatedOpportunities, filterType, selectedCategory, searchQuery]);

  // Sorted list
  const sortedList = useMemo(() => {
    const list = [...filteredList];
    if (sortBy === 'match') {
      list.sort((a, b) => b.match.percentage - a.match.percentage);
    } else if (sortBy === 'hot') {
      list.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0) || b.match.percentage - a.match.percentage);
    } else if (sortBy === 'company') {
      list.sort((a, b) => a.company.localeCompare(b.company));
    }
    return list;
  }, [filteredList, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedList.length / itemsPerPage) || 1;
  const currentPageClamped = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (currentPageClamped - 1) * itemsPerPage;
  const paginatedList = sortedList.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const el = document.getElementById('opp-grid-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPageClamped - delta && i <= currentPageClamped + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  // Call Gemini AI for specific Job Fit
  const handleAnalyzeFit = async (opp) => {
    if (aiAnalysisMap[opp.id]) return;
    setAnalyzingId(opp.id);
    const feedback = await getJobFitWithAI(userSkills, opp.title, opp.company, opp.requiredSkills);
    setAiAnalysisMap(prev => ({ ...prev, [opp.id]: feedback }));
    setAnalyzingId(null);
  };

  return (
    <div className="opportunities-page container">
      {/* Header */}
      <div className="opp-hero-section">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-badge mb-3">
            <span className="badge-hiring">🔥 Live Hiring Hub: {totalCount} Active Openings</span>
          </div>
          <h1 className="opp-title">
            Skill-Matched <span className="text-gradient">Internships & Placements</span>
          </h1>
          <p className="opp-subtitle">
            Explore 870+ verified opportunities across Tier-1 Product Giants, Indian Unicorns, FinTech Leaders, Service MNCs, and Semiconductor Hubs.
          </p>
        </motion.div>
      </div>

      {/* Dynamic Skill Readiness Banner (3D Glass) */}
      <motion.div 
        className="skill-readiness-banner glass-panel card-3d"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="banner-left">
          <div className="readiness-stat-box">
            <span className="stat-number text-gradient">{userSkills.length}</span>
            <span className="stat-label">Learned Skills</span>
          </div>
          <div className="banner-divider" />
          <div className="readiness-details">
            <h3 className="banner-headline">
              You qualify for <span className="highlight-text">{eligibleCount} Opportunities</span>!
            </h3>
            <p className="banner-subtext">
              Based on your mastered skills: <strong>{eligibleInternships} Internships</strong> and <strong>{eligiblePlacements} Full-Time Placement</strong> roles match your profile (≥ 70% threshold).
            </p>
            
            {/* Interactive User Skills Pills */}
            <div className="user-skills-wrap">
              {userSkills.map(skill => (
                <span key={skill} className="user-skill-pill">
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="skill-remove-btn"
                    title={`Remove ${skill}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              
              <form onSubmit={handleAddSkill} className="inline-skill-add">
                <input 
                  type="text" 
                  placeholder="+ Add skill (e.g. Docker, Python)"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="skill-input-compact"
                />
                <button type="submit" className="skill-add-btn" aria-label="Add skill">
                  <Plus size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="banner-right">
          <div className="circular-progress-wrap">
            <div className="circular-progress-circle">
              <span className="circle-val">{Math.round((eligibleCount / (totalCount || 1)) * 100)}%</span>
              <span className="circle-sub">Market Fit</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Anchor for scroll-to-top on page change */}
      <div id="opp-grid-anchor"></div>

      {/* Search & Toolbar */}
      <div className="opp-search-toolbar glass-panel">
        <div className="opp-search-input-wrapper">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search by company (e.g. Google, Zoho, TCS), role, skill (React, Python), or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="opp-search-field"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="clear-search-btn"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="opp-toolbar-actions">
          <div className="sort-dropdown-wrap">
            <ArrowUpDown size={15} className="sort-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="match">Sort: Best Skill Match</option>
              <option value="hot">Sort: Featured & Hot Roles</option>
              <option value="company">Sort: Company Name (A-Z)</option>
            </select>
          </div>

          <div className="page-size-wrap">
            <span className="page-size-label">Show:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="page-size-select"
            >
              <option value={12}>12 / page</option>
              <option value={24}>24 / page</option>
              <option value={48}>48 / page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters and Navigation */}
      <div className="opp-controls-bar">
        <div className="type-toggle-group">
          <button 
            className={`type-toggle-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Openings ({totalCount})
          </button>
          <button 
            className={`type-toggle-btn ${filterType === 'eligible' ? 'active' : ''}`}
            onClick={() => setFilterType('eligible')}
          >
            <CheckCircle2 size={16} /> Eligible For Me ({eligibleCount})
          </button>
          <button 
            className={`type-toggle-btn ${filterType === 'internship' ? 'active' : ''}`}
            onClick={() => setFilterType('internship')}
          >
            Internships ({totalInternships})
          </button>
          <button 
            className={`type-toggle-btn ${filterType === 'placement' ? 'active' : ''}`}
            onClick={() => setFilterType('placement')}
          >
            Placements ({totalPlacements})
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="category-pills">
          {categories.map(cat => {
            const countInCat = cat === 'All' 
              ? evaluatedOpportunities.length 
              : evaluatedOpportunities.filter(o => o.category === cat).length;

            return (
              <button
                key={cat}
                className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} <span className="cat-pill-count">({countInCat})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="results-meta-bar">
        <span className="results-count-text">
          Showing <strong>{sortedList.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, sortedList.length)}</strong> of <strong>{sortedList.length}</strong> opportunities
          {searchQuery && <span> matching "<em>{searchQuery}</em>"</span>}
        </span>
        {sortedList.length > 0 && (
          <span className="results-page-indicator">
            Page {currentPageClamped} of {totalPages}
          </span>
        )}
      </div>

      {/* Job Cards Grid with 3D Perspective */}
      <div className="opportunities-grid perspective-1000">
        <AnimatePresence mode="popLayout">
          {paginatedList.map((opp, idx) => {
            const isHighMatch = opp.match.percentage >= 70;
            const isMidMatch = opp.match.percentage >= 40 && opp.match.percentage < 70;
            const matchColorClass = isHighMatch ? 'match-high' : isMidMatch ? 'match-mid' : 'match-low';

            return (
              <motion.div
                key={opp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2) }}
                className="opp-card glass-panel card-3d"
              >
                {/* Top Badge bar */}
                <div className="opp-card-top">
                  <div className="type-badge-pill-group">
                    <span className="type-badge-pill" data-type={opp.type}>
                      {opp.type === 'Internship' ? 'Internship Opening' : 'Campus Placement'}
                    </span>
                    {opp.hot && (
                      <span className="hot-pill" title="Featured / Urgent Hiring">
                        <Flame size={12} /> Hot
                      </span>
                    )}
                  </div>
                  
                  {/* Match Percentage Pill */}
                  <div className={`match-badge ${matchColorClass}`}>
                    {opp.match.percentage}% Match
                  </div>
                </div>

                {/* Company & Role Header */}
                <div className="opp-card-header">
                  <div className="company-logo-avatar">
                    <Building2 size={24} />
                  </div>
                  <div className="header-info">
                    <h3 className="opp-job-title">{opp.title}</h3>
                    <p className="opp-company-name">{opp.company}</p>
                  </div>
                </div>

                {/* Key Details (Salary, Location, Deadline) */}
                <div className="opp-details-grid">
                  <div className="detail-item">
                    <DollarSign size={15} className="detail-icon" />
                    <span>{opp.stipendOrSalary}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={15} className="detail-icon" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={15} className="detail-icon" />
                    <span>Apply {opp.deadline}</span>
                  </div>
                </div>

                <p className="opp-description">
                  {opp.description}
                </p>

                {/* Skill Match Breakdown */}
                <div className="skill-breakdown-section">
                  <div className="breakdown-header">
                    <span className="label-title">Required Skills:</span>
                    <span className="match-status-text">
                      {opp.match.matchedSkills.length}/{opp.requiredSkills.length} mastered
                    </span>
                  </div>

                  <div className="skills-tags-cluster">
                    {opp.requiredSkills.map(skill => {
                      const isLearned = opp.match.matchedSkills.includes(skill);
                      return (
                        <span 
                          key={skill} 
                          className={`skill-tag ${isLearned ? 'skill-learned' : 'skill-missing'}`}
                          title={isLearned ? 'You have this skill!' : 'Skill needed to boost match'}
                        >
                          {isLearned ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* AI Fit Insight Box */}
                {aiAnalysisMap[opp.id] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ai-fit-box"
                  >
                    <div className="ai-fit-header">
                      <Sparkles size={14} className="sparkle-icon" />
                      <span>Campus to Industry Fit Analysis</span>
                    </div>
                    <p className="ai-fit-text">{aiAnalysisMap[opp.id]}</p>
                  </motion.div>
                )}

                {/* Footer Actions */}
                <div className="opp-card-footer">
                  <button 
                    className="btn-ai-fit"
                    onClick={() => handleAnalyzeFit(opp)}
                    disabled={analyzingId === opp.id}
                  >
                    <Sparkles size={14} />
                    {analyzingId === opp.id ? 'Analyzing...' : 'AI Fit Tip'}
                  </button>

                  <a 
                    href={opp.applyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`btn ${isHighMatch ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {isHighMatch ? 'Apply Now' : 'View Opening'}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedList.length === 0 && (
        <div className="empty-state-card glass-panel text-center">
          <Briefcase size={48} className="empty-icon" />
          <h3>No matching opportunities found</h3>
          <p>Try resetting your search query or switching categories.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => { setFilterType('all'); setSelectedCategory('All'); setSearchQuery(''); }}
          >
            Reset Filters & Search
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-bar glass-panel">
          <button 
            className="pagination-btn prev-next-btn"
            onClick={() => handlePageChange(currentPageClamped - 1)}
            disabled={currentPageClamped === 1}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div className="pagination-numbers">
            {getPageNumbers().map((p, pIdx) => {
              if (p === '...') {
                return <span key={`ellipsis-${pIdx}`} className="pagination-ellipsis">...</span>;
              }
              const isActive = p === currentPageClamped;
              return (
                <button
                  key={p}
                  className={`pagination-btn page-num-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button 
            className="pagination-btn prev-next-btn"
            onClick={() => handlePageChange(currentPageClamped + 1)}
            disabled={currentPageClamped === totalPages}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
