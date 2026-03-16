import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CheckSquare, Code, Send, Play, Clock, Award } from 'lucide-react';
import './Placement.css';

const Placement = () => {
  const [activeTab, setActiveTab] = useState('interview');

  return (
    <div className="placement-page container">
      <div className="placement-header">
        <h1 className="placement-title">Placement <span className="text-gradient">Preparation</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Master your interviews, test your aptitude, and sharpen your coding skills.</p>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          <MessageSquare size={18} /> Mock Interview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'aptitude' ? 'active' : ''}`}
          onClick={() => setActiveTab('aptitude')}
        >
          <CheckSquare size={18} /> Aptitude Test
        </button>
        <button 
          className={`tab-btn ${activeTab === 'coding' ? 'active' : ''}`}
          onClick={() => setActiveTab('coding')}
        >
          <Code size={18} /> Coding Round
        </button>
      </div>

      <div className="module-container mb-8">
        <AnimatePresence mode="wait">
          {activeTab === 'interview' && <MockInterview key="interview" />}
          {activeTab === 'aptitude' && <AptitudeTest key="aptitude" />}
          {activeTab === 'coding' && <CodingRound key="coding" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- MOCK INTERVIEW COMPONENT ---
const MockInterview = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI technical interviewer. Are you ready to begin your mock interview for the Software Engineer role?", type: 'ai' }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now(), text: inputVal, type: 'user' }];
    setMessages(newMessages);
    setInputVal('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "That's a good start. Let's move to a technical question: Can you explain the difference between processes and threads?", 
        type: 'ai' 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="chat-window shadow-lg"
    >
      <div className="chat-header">
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
        AI Interviewer (Technical)
      </div>
      <div className="chat-messages">
        {messages.map(msg => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={msg.id} 
            className={`message ${msg.type}`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input 
          type="text" 
          placeholder="Type your answer here..." 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
};

// --- APTITUDE TEST COMPONENT ---
const AptitudeTest = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="glass-panel" style={{ padding: '2rem' }}
    >
      {!submitted ? (
        <>
          <div className="test-header">
            <h3 style={{ fontSize: '1.25rem' }}>Quantitative Analysis</h3>
            <div className="timer flex-center" style={{ gap: '0.5rem' }}>
              <Clock size={20} /> {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="question-text">
            1. If a pipe can fill a tank in 4 hours, and another can empty it in 6 hours, how long will it take to fill the tank if both are open?
          </div>
          
          <div className="options-grid" style={{ marginBottom: '2rem' }}>
            {['10 hours', '12 hours', '8 hours', '14 hours'].map((opt, idx) => (
              <button 
                key={idx} 
                className={`option-btn ${selectedOpt === idx ? 'selected' : ''}`}
                onClick={() => setSelectedOpt(idx)}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={() => setSubmitted(true)} disabled={selectedOpt === null}>
              Submit Answer
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <Award size={64} style={{ color: 'var(--king-purple-500)', margin: '0 auto 1.5rem auto' }} />
          <h2>Test Submitted!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You scored 1/1 on this practice module.</p>
          <button className="btn btn-outline" onClick={() => { setSubmitted(false); setSelectedOpt(null); }}>
            Try Next Question
          </button>
        </div>
      )}
    </motion.div>
  );
};

// --- CODING ROUND COMPONENT ---
const CodingRound = () => {
  const [code, setCode] = useState('function twoSum(nums, target) {\n  // Write your logic here\n  \n}\n');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="editor-layout"
    >
      <div className="problem-desc glass-panel">
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Two Sum</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
        </p>
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
          <strong>Example:</strong><br/>
          Input: nums = [2,7,11,15], target = 9<br/>
          Output: [0,1]
        </div>
      </div>
      
      <div className="code-editor-area">
        <div className="editor-header">
          <span>main.js</span>
          <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
            <Play size={14} /> Run Code
          </button>
        </div>
        <textarea 
          className="textarea-editor" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
        <div style={{ background: '#111', color: '#10b981', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', borderTop: '1px solid #333' }}>
          &gt; auto-evaluator checking implementation...<br/>
          &gt; awaiting execution
        </div>
      </div>
    </motion.div>
  );
};

export default Placement;
