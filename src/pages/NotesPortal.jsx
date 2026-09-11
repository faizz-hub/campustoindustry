import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Folder, 
  FileText, 
  Download, 
  Eye, 
  Layers, 
  Book, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Clock, 
  FileCheck, 
  X,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { DEPARTMENTS_DATA, SUBJECTS_BY_DEPT, getNotesForSubject } from '../data/notesData';
import './NotesPortal.css';

const DEPT_ICONS = {
  cse: <Layers size={28} />,
  aids: <Sparkles size={28} />,
  csbs: <BookOpen size={28} />,
  ece: <Layers size={28} />,
  vlsi: <Layers size={28} />,
  mech: <Layers size={28} />,
};

const SEMESTERS = Array.from({ length: 8 }, (_, i) => ({
  id: `sem-${i + 1}`,
  name: `Semester ${i + 1}`,
  number: i + 1,
}));

const NotesPortal = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    department: null,
    semester: null,
    subject: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewNote, setPreviewNote] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelect = (key, value, nextStep) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setStep(nextStep);
    setSearchQuery('');
    setActiveFilter('all');
  };

  const jumpToStep = (targetStep) => {
    if (targetStep < step) {
      setStep(targetStep);
      setSearchQuery('');
      setActiveFilter('all');
      if (targetStep === 1) setSelections({ department: null, semester: null, subject: null });
      if (targetStep === 2) setSelections(prev => ({ ...prev, semester: null, subject: null }));
      if (targetStep === 3) setSelections(prev => ({ ...prev, subject: null }));
    }
  };

  // Get subjects for current department & semester
  const currentSubjects = useMemo(() => {
    if (!selections.department || !selections.semester) return [];
    const deptId = selections.department.id;
    const semId = selections.semester.id;

    if (SUBJECTS_BY_DEPT[deptId]?.[semId]) {
      return SUBJECTS_BY_DEPT[deptId][semId];
    }

    // Default subjects if not explicitly defined
    return [
      { id: `${deptId}-${semId}-core1`, name: `${selections.department.shortName || 'Engineering'} Core Systems`, code: 'EN3001' },
      { id: `${deptId}-${semId}-core2`, name: `Applied Numerical Methods & Analysis`, code: 'MA3002' },
      { id: `${deptId}-${semId}-core3`, name: `Departmental Elective & Design Labs`, code: 'EN3003' },
      { id: 'au-questions', name: 'Anna University Solved Previous Question Papers', code: 'AU-EXAM' },
    ];
  }, [selections.department, selections.semester]);

  // Get notes for the selected subject
  const currentNotes = useMemo(() => {
    if (!selections.subject) return [];
    return getNotesForSubject(
      selections.subject.id, 
      selections.subject.name, 
      selections.department?.name, 
      selections.semester?.name
    );
  }, [selections.subject, selections.department, selections.semester]);

  // Filtered notes based on search & category
  const filteredNotes = useMemo(() => {
    return currentNotes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.topics && note.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      if (!matchesSearch) return false;

      if (activeFilter === 'units') {
        return note.title.toLowerCase().includes('unit');
      }
      if (activeFilter === 'qb') {
        return note.title.toLowerCase().includes('question') || note.title.toLowerCase().includes('paper');
      }
      if (activeFilter === 'cheatsheet') {
        return note.title.toLowerCase().includes('cheat') || note.title.toLowerCase().includes('revision') || note.type === 'TXT';
      }
      return true;
    });
  }, [currentNotes, searchQuery, activeFilter]);

  // Handle Note Download
  const handleDownload = (note) => {
    showToast(`Downloading: ${note.title}...`);
    // Create a generated file for immediate instant download
    const content = `=====================================================
ANNA UNIVERSITY ACADEMIC NOTES PORTAL - ELEVATE CAREER
=====================================================

Subject: ${selections.subject?.name} (${selections.subject?.code || 'N/A'})
Department: ${selections.department?.name}
Semester: ${selections.semester?.name}
Document: ${note.title}
Format: ${note.type} | Size: ${note.size}
Author: ${note.author}
Published: Regulation 2021 Approved Curriculum

-----------------------------------------------------
SYLLABUS & KEY TOPICS COVERED:
-----------------------------------------------------
${note.topics && note.topics.length > 0 
  ? note.topics.map((t, idx) => `  ${idx + 1}. ${t}`).join('\n') 
  : '  • Complete Unit Module Concepts\n  • Formula Derivations & Diagrams\n  • Solved Examples & University Pattern Questions'}

-----------------------------------------------------
CORE STUDY SUMMARY:
-----------------------------------------------------
1. Fundamental Definitions and Architectural Layouts.
2. Step-by-Step Analytical Derivations and Worked Problems.
3. Anna University 2-Mark Frequent Questions with Keypoints.
4. Part-B & Part-C (13/16 Marks) Structural Answers.
5. Previous Exam Analysis with Examiner Marking Scheme.

Downloaded via Elevate Career Notes Portal.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = note.title.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 45);
    link.download = `${safeName}.${note.type === 'TXT' ? 'txt' : 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
  };

  return (
    <div className="notes-page container">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            className="notes-toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <CheckCircle2 size={20} color="#10b981" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="notes-header">
        <div className="notes-badge-tag">
          <GraduationCap size={16} /> Anna University Regulation 2021
        </div>
        <h1 className="notes-title">Academic <span className="text-gradient">Notes Portal</span></h1>
        <p className="notes-subtitle">
          Complete, verified study materials, lecture notes, unit-wise question banks, and solved past papers for every engineering subject.
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <button 
          className={`breadcrumb-item ${step === 1 ? 'active' : ''}`}
          onClick={() => jumpToStep(1)}
        >
          Departments
        </button>
        {selections.department && (
          <>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <button 
              className={`breadcrumb-item ${step === 2 ? 'active' : ''}`}
              onClick={() => jumpToStep(2)}
            >
              {selections.department.shortName || selections.department.name}
            </button>
          </>
        )}
        {selections.semester && (
          <>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <button 
              className={`breadcrumb-item ${step === 3 ? 'active' : ''}`}
              onClick={() => jumpToStep(3)}
            >
              {selections.semester.name}
            </button>
          </>
        )}
        {selections.subject && (
          <>
            <ChevronRight size={16} className="breadcrumb-sep" />
            <span className="breadcrumb-item active">
              {selections.subject.name}
            </span>
          </>
        )}

        {step > 1 && (
          <button 
            className="btn-back-step" 
            onClick={() => jumpToStep(step - 1)}
            title="Go back to previous step"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="notes-content-area">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: DEPARTMENTS */}
          {step === 1 && (
            <motion.div 
              key="step1"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              <div className="step-headline">
                <h2>Select Your Department</h2>
                <p>Choose your engineering stream to view curated semester materials</p>
              </div>

              <div className="grid-cards">
                {DEPARTMENTS_DATA.map(dept => (
                  <div 
                    key={dept.id} 
                    className="glass-panel selection-card department-card"
                    onClick={() => handleSelect('department', dept, 2)}
                  >
                    <div className="selection-icon">
                      {DEPT_ICONS[dept.id] || <Layers size={28} />}
                    </div>
                    <div className="selection-info">
                      <div className="card-badge">{dept.badge}</div>
                      <h3 className="selection-title">{dept.name}</h3>
                      <p className="card-subtext">8 Semesters • Full Syllabus Notes</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEMESTERS */}
          {step === 2 && (
            <motion.div 
              key="step2"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              <div className="step-headline">
                <h2>{selections.department.name}</h2>
                <p>Select your semester to access subjects and course packs</p>
              </div>

              <div className="grid-cards semesters-grid">
                {SEMESTERS.map(sem => (
                  <div 
                    key={sem.id} 
                    className="glass-panel selection-card semester-card"
                    onClick={() => handleSelect('semester', sem, 3)}
                  >
                    <div className="selection-icon">
                      <Folder size={28} />
                    </div>
                    <div className="selection-info">
                      <h3 className="selection-title">{sem.name}</h3>
                      <p className="card-subtext">Year {Math.ceil(sem.number / 2)} Curriculum</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUBJECTS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              <div className="step-headline">
                <h2>{selections.department.shortName || selections.department.name} - {selections.semester.name}</h2>
                <p>Select a subject to access complete notes, question banks, and study guides</p>
              </div>

              <div className="grid-cards subjects-grid">
                {currentSubjects.map(sub => (
                  <div 
                    key={sub.id} 
                    className="glass-panel selection-card subject-card"
                    onClick={() => handleSelect('subject', sub, 4)}
                  >
                    <div className="subject-card-top">
                      <div className="selection-icon subject-icon">
                        <Book size={26} />
                      </div>
                      <span className="subject-code-badge">{sub.code || 'CURR'}</span>
                    </div>
                    <h3 className="selection-title subject-title">{sub.name}</h3>
                    <div className="subject-card-footer">
                      <span className="material-count-pill">
                        <CheckCircle2 size={14} color="#10b981" /> 8 Study Materials Available
                      </span>
                      <span className="view-notes-action">
                        Open Notes <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: NOTES */}
          {step === 4 && (
            <motion.div 
              key="step4"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              <div className="notes-hero-panel glass-panel">
                <div className="notes-hero-header">
                  <div className="notes-hero-meta">
                    <span className="subject-code-badge large">{selections.subject.code || 'AU-2021'}</span>
                    <span className="subject-dept-badge">{selections.department.shortName || selections.department.name}</span>
                    <span className="subject-sem-badge">{selections.semester.name}</span>
                  </div>
                  <h2 className="notes-subject-heading">{selections.subject.name}</h2>
                  <p className="notes-subject-desc">
                    Comprehensive study pack verified by engineering faculty. Includes Unit 1 to Unit 5 full notes, 2-mark & 16-mark solved question banks, and previous year Anna University examination papers.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="notes-controls-bar">
                  <div className="notes-search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input 
                      type="text"
                      className="notes-search-input"
                      placeholder="Search unit, topic, question bank..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button className="clear-search" onClick={() => setSearchQuery('')}>
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="filter-chips">
                    <button 
                      className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('all')}
                    >
                      All ({currentNotes.length})
                    </button>
                    <button 
                      className={`filter-chip ${activeFilter === 'units' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('units')}
                    >
                      Unit Notes
                    </button>
                    <button 
                      className={`filter-chip ${activeFilter === 'qb' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('qb')}
                    >
                      Question Banks & QP
                    </button>
                    <button 
                      className={`filter-chip ${activeFilter === 'cheatsheet' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('cheatsheet')}
                    >
                      Quick Sheets
                    </button>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="documents-list">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map(note => (
                    <motion.div 
                      key={note.id} 
                      className="document-item glass-panel"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="doc-info">
                        <div className={`doc-icon-wrapper ${note.type.toLowerCase()}`}>
                          <FileText size={28} />
                          <span className="doc-type-label">{note.type}</span>
                        </div>
                        <div className="doc-details">
                          <h4 className="doc-title">{note.title}</h4>
                          <div className="doc-meta">
                            <span className="meta-badge author">By {note.author}</span>
                            <span className="meta-sep">•</span>
                            <span className="meta-item">{note.size}</span>
                            {note.pages && (
                              <>
                                <span className="meta-sep">•</span>
                                <span className="meta-item">{note.pages} pages</span>
                              </>
                            )}
                            {note.downloads && (
                              <>
                                <span className="meta-sep">•</span>
                                <span className="meta-item download-stat">{note.downloads} downloads</span>
                              </>
                            )}
                          </div>

                          {/* Topics covered */}
                          {note.topics && note.topics.length > 0 && (
                            <div className="topics-pill-list">
                              {note.topics.slice(0, 3).map((topic, idx) => (
                                <span key={idx} className="topic-pill">{topic}</span>
                              ))}
                              {note.topics.length > 3 && (
                                <span className="topic-pill more">+{note.topics.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="doc-actions">
                        <button 
                          className="btn btn-outline preview-btn"
                          onClick={() => setPreviewNote(note)}
                        >
                          <Eye size={18} /> View Online
                        </button>
                        <button 
                          className="btn btn-primary download-btn"
                          onClick={() => handleDownload(note)}
                        >
                          <Download size={18} /> Download
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="glass-panel empty-notes-state">
                    <BookOpen size={48} color="var(--king-purple-400)" />
                    <h3>No matching notes found</h3>
                    <p>Try searching for a different keyword or switch the filter category.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Interactive Note Preview Modal */}
      <AnimatePresence>
        {previewNote && (
          <div className="modal-backdrop" onClick={() => setPreviewNote(null)}>
            <motion.div 
              className="modal-content glass-panel"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="modal-header">
                <div className="modal-title-box">
                  <span className="modal-badge">{previewNote.type} Document</span>
                  <h3>{previewNote.title}</h3>
                  <p className="modal-meta">
                    Author: {previewNote.author} • Size: {previewNote.size} • {previewNote.pages ? `${previewNote.pages} Pages` : 'Curated'}
                  </p>
                </div>
                <button className="modal-close-btn" onClick={() => setPreviewNote(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="preview-section">
                  <h4>Syllabus Coverage & High-Weightage Topics</h4>
                  <ul className="preview-topics-list">
                    {previewNote.topics && previewNote.topics.length > 0 ? (
                      previewNote.topics.map((item, idx) => (
                        <li key={idx}>
                          <FileCheck size={16} color="var(--king-purple-500)" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><FileCheck size={16} color="var(--king-purple-500)" /> Core Module Concepts & Engineering Applications</li>
                        <li><FileCheck size={16} color="var(--king-purple-500)" /> Formula Cheat Sheet & Analytical Proofs</li>
                        <li><FileCheck size={16} color="var(--king-purple-500)" /> Frequent Part-A (2 Marks) & Part-B (16 Marks) Solved Solutions</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="preview-notice-box">
                  <Sparkles size={20} color="var(--king-purple-500)" />
                  <div>
                    <strong>Faculty Recommended Study Material</strong>
                    <p>This resource aligns with Anna University Regulation 2021 curriculum and includes examiner marking rubrics.</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-outline" onClick={() => setPreviewNote(null)}>
                  Close
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    handleDownload(previewNote);
                    setPreviewNote(null);
                  }}
                >
                  <Download size={18} /> Download Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesPortal;
