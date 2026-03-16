import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, FileText, Download, Eye, Layers, Book } from 'lucide-react';
import './NotesPortal.css';

// Dummy Data
const DEPARTMENTS = [
  { id: 'mech', name: 'Mechanical Engineering', icon: <Layers size={28} /> },
  { id: 'csbs', name: 'CSBS', icon: <Layers size={28} /> },
  { id: 'cse', name: 'CSE', icon: <Layers size={28} /> },
  { id: 'vlsi', name: 'VLSI', icon: <Layers size={28} /> },
  { id: 'aids', name: 'AIDS', icon: <Layers size={28} /> },
  { id: 'ece', name: 'ECE', icon: <Layers size={28} /> },
];

const SEMESTERS = Array.from({ length: 8 }, (_, i) => ({
  id: `sem-${i + 1}`,
  name: `Semester ${i + 1}`,
}));

const SUBJECTS_MAP = {
  'cse': {
    'sem-3': [
      { id: 'ds', name: 'Data Structures' },
      { id: 'algo', name: 'Algorithms' },
      { id: 'dbms', name: 'Database Management Systems' },
      { id: 'os', name: 'Operating Systems' },
    ]
  }
};

const NOTES_MAP = {
  'ds': [
    { id: 'n1', title: 'Unit 1: Linked Lists Complete', type: 'PDF', size: '2.4 MB', author: 'Dr. Smith' },
    { id: 'n2', title: 'Unit 2: Trees & Graphs', type: 'PDF', size: '3.1 MB', author: 'Prof. John' },
    { id: 'n3', title: 'Sorting Algorithms Cheat Sheet', type: 'TXT', size: '120 KB', author: 'Alumni Team' },
  ]
};

const NotesPortal = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    department: null,
    semester: null,
    subject: null,
  });

  const handleSelect = (key, value, nextStep) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setStep(nextStep);
  };

  const jumpToStep = (targetStep) => {
    if (targetStep < step) {
      setStep(targetStep);
      if (targetStep === 1) setSelections({ department: null, semester: null, subject: null });
      if (targetStep === 2) setSelections(prev => ({ ...prev, semester: null, subject: null }));
      if (targetStep === 3) setSelections(prev => ({ ...prev, subject: null }));
    }
  };

  const getBreadcrumbs = () => {
    return (
      <div className="breadcrumb-nav">
        <span 
          className={`breadcrumb-item ${step === 1 ? 'active' : ''}`}
          onClick={() => jumpToStep(1)}
        >
          Departments
        </span>
        {selections.department && (
           <>
            <ChevronRight size={16} />
            <span 
              className={`breadcrumb-item ${step === 2 ? 'active' : ''}`}
              onClick={() => jumpToStep(2)}
            >
              {selections.department.name}
            </span>
           </>
        )}
        {selections.semester && (
           <>
            <ChevronRight size={16} />
            <span 
              className={`breadcrumb-item ${step === 3 ? 'active' : ''}`}
              onClick={() => jumpToStep(3)}
            >
              {selections.semester.name}
            </span>
           </>
        )}
        {selections.subject && (
           <>
            <ChevronRight size={16} />
            <span className="breadcrumb-item active">
              {selections.subject.name}
            </span>
           </>
        )}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="notes-page container">
      <div className="notes-header">
        <h1 className="notes-title">Academic <span className="text-gradient">Notes Portal</span></h1>
        <p className="notes-subtitle">Access complete study materials, lectures, and resources tailored for your curriculum.</p>
      </div>

      {getBreadcrumbs()}

      <div className="notes-content-area" style={{ minHeight: '50vh' }}>
        <AnimatePresence mode="wait">
          
          {/* STEP 1: DEPARTMENTS */}
          {step === 1 && (
            <motion.div 
              key="step1"
              className="grid-cards"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              {DEPARTMENTS.map(dept => (
                <div 
                  key={dept.id} 
                  className="glass-panel selection-card"
                  onClick={() => handleSelect('department', dept, 2)}
                >
                  <div className="selection-icon">
                    {dept.icon}
                  </div>
                  <h3 className="selection-title">{dept.name}</h3>
                </div>
              ))}
            </motion.div>
          )}

          {/* STEP 2: SEMESTERS */}
          {step === 2 && (
            <motion.div 
              key="step2"
              className="grid-cards"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              {SEMESTERS.map(sem => (
                <div 
                  key={sem.id} 
                  className="glass-panel selection-card"
                  onClick={() => handleSelect('semester', sem, 3)}
                >
                  <div className="selection-icon">
                    <Folder size={28} />
                  </div>
                  <h3 className="selection-title">{sem.name}</h3>
                </div>
              ))}
            </motion.div>
          )}

          {/* STEP 3: SUBJECTS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              className="grid-cards"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              {SUBJECTS_MAP[selections.department.id]?.[selections.semester.id] ? (
                SUBJECTS_MAP[selections.department.id][selections.semester.id].map(sub => (
                  <div 
                    key={sub.id} 
                    className="glass-panel selection-card"
                    onClick={() => handleSelect('subject', sub, 4)}
                  >
                    <div className="selection-icon">
                      <Book size={28} />
                    </div>
                    <h3 className="selection-title">{sub.name}</h3>
                  </div>
                ))
              ) : (
                <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No subjects uploaded yet for {selections.department.name} - {selections.semester.name}. Try CSE - Semester 3.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: NOTES */}
          {step === 4 && (
            <motion.div 
              key="step4"
              variants={containerVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{selections.subject.name} Complete Notes</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Download PDFs or view text notes online.</p>
              </div>

              <div className="documents-list">
                {NOTES_MAP[selections.subject.id] ? (
                  NOTES_MAP[selections.subject.id].map(note => (
                    <div key={note.id} className="document-item glass-panel">
                      <div className="doc-info">
                        <div className="doc-icon">
                          <FileText size={32} />
                        </div>
                        <div>
                          <h4 className="doc-title">{note.title}</h4>
                          <div className="doc-meta">
                            <span>{note.type}</span>
                            <span>•</span>
                            <span>{note.size}</span>
                            <span>•</span>
                            <span>By {note.author}</span>
                          </div>
                        </div>
                      </div>
                      <div className="doc-actions" style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                          <Eye size={18} /> View
                        </button>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                          <Download size={18} /> Download
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No notes found for this subject.</p>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesPortal;
