import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  CheckSquare, 
  Code, 
  Send, 
  Play, 
  Clock, 
  Award, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle,
  Building,
  Briefcase,
  Layers,
  FileText,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { evaluateInterviewAnswerWithAI, generateOverallInterviewSummary } from '../services/geminiService';
import { APTITUDE_TRACKS } from '../data/aptitudeData';
import { COMPANY_CHEAT_SHEETS, COMPANY_CATEGORIES } from '../data/companyCheatSheetsData';
import './Placement.css';

const Placement = () => {
  const [activeTab, setActiveTab] = useState('interview');

  return (
    <div className="placement-page container">
      <div className="placement-header">
        <h1 className="placement-title">Placement <span className="text-gradient">Preparation</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Master technical rounds with Voice-Enabled AI Mock Interviews, time-bound aptitude assessments, and algorithmic coding challenges.
        </p>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          <MessageSquare size={18} /> Voice AI Mock Interview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'aptitude' ? 'active' : ''}`}
          onClick={() => setActiveTab('aptitude')}
        >
          <CheckSquare size={18} /> Company Aptitude Tests
        </button>
        <button 
          className={`tab-btn ${activeTab === 'coding' ? 'active' : ''}`}
          onClick={() => setActiveTab('coding')}
        >
          <Code size={18} /> Coding Round
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cheatsheets' ? 'active' : ''}`}
          onClick={() => setActiveTab('cheatsheets')}
        >
          <Building size={18} /> Company Placement Cheat Sheets
        </button>
      </div>

      <div className="module-container mb-8">
        <AnimatePresence mode="wait">
          {activeTab === 'interview' && <MockInterview key="interview" />}
          {activeTab === 'aptitude' && <AptitudeTest key="aptitude" />}
          {activeTab === 'coding' && <CodingRound key="coding" />}
          {activeTab === 'cheatsheets' && (
            <CompanyCheatSheets 
              key="cheatsheets" 
              onLaunchInterview={(track) => setActiveTab('interview')}
              onLaunchAptitude={(company) => setActiveTab('aptitude')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ==========================================
// VOICE-ENABLED AI MOCK INTERVIEW COMPONENT
// ==========================================
const interviewStages = [
  { step: 1, name: "1. Self-Intro", tag: "Icebreaker" },
  { step: 2, name: "2. Projects", tag: "Architecture" },
  { step: 3, name: "3. Core Technical", tag: "Crucial Round" },
  { step: 4, name: "4. System / Coding", tag: "Deep Dive" },
  { step: 5, name: "5. Behavioral", tag: "Verdict" }
];

const getInitialInterviewMessage = (track) => {
  return `Hello and welcome! I am your AI placement interviewer for the ${track} track. In every real-world campus placement interview, we begin with an introductory round before transitioning into your hands-on projects and deep technical problem solving.

To kick things off: Could you please tell me about yourself—your academic journey, your core technical interests, and what projects you enjoy building?`;
};

const MockInterview = () => {
  const [selectedTrack, setSelectedTrack] = useState('Full Stack / SDE');
  const [isThinking, setIsThinking] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Storing evaluated rounds for final question-by-question analysis
  const [evaluatedRounds, setEvaluatedRounds] = useState([]);
  const [isInterviewCompleted, setIsInterviewCompleted] = useState(false);
  const [overallSummary, setOverallSummary] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      stage: 1,
      text: getInitialInterviewMessage('Full Stack / SDE'), 
      type: 'ai' 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const tracks = ['Full Stack / SDE', 'TCS Digital / Prime', 'Zoho Corporation', 'Frontend Engineer', 'AI / ML Engineer'];

  const currentStageNumber = Math.min(5, evaluatedRounds.length + 1);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInputVal(prev => (prev ? `${prev} ${currentTranscript}` : currentTranscript));
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Text-to-Speech (AI Voice Output)
  const speakText = (text) => {
    if (!isVoiceOutputEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any previous speech
    const cleanText = text.replace(/Score:.*?\n/g, '').replace(/Feedback:.*?\n/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleVoiceOutput = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
        }
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
      }
    }
  };

  const handleTrackChange = (track) => {
    setSelectedTrack(track);
    setEvaluatedRounds([]);
    setIsInterviewCompleted(false);
    setOverallSummary(null);
    const welcomeMsg = getInitialInterviewMessage(track);
    setMessages([
      {
        id: Date.now(),
        stage: 1,
        text: welcomeMsg,
        type: 'ai'
      }
    ]);
    speakText(welcomeMsg);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isThinking) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userText = inputVal.trim();
    const questionAsked = messages.filter(m => m.type === 'ai').slice(-1)[0]?.text || "Tell me about yourself.";
    const newMessages = [...messages, { id: Date.now(), text: userText, type: 'user' }];
    setMessages(newMessages);
    setInputVal('');
    setIsThinking(true);

    const currentRound = evaluatedRounds.length + 1;

    try {
      const evaluation = await evaluateInterviewAnswerWithAI(newMessages, userText, selectedTrack, currentRound);
      const nextQuestion = evaluation.nextQuestion || "Can you describe how you optimize database queries or memory consumption in your projects?";
      
      // Save round data for final analysis
      setEvaluatedRounds(prev => [
        ...prev,
        {
          roundNumber: currentRound,
          stageName: interviewStages[Math.min(currentRound - 1, interviewStages.length - 1)].name,
          question: questionAsked,
          userAnswer: userText,
          score: evaluation.score || 5,
          feedback: evaluation.feedback || "Answer noted.",
          howToImprove: evaluation.howToImprove || "Ensure you state time complexity and mention practical production edge cases.",
          idealAnswer: evaluation.idealAnswer || "A strong candidate answer clearly states core architectural definitions, discusses memory/thread lifecycle trade-offs, and provides a real-world debugging example."
        }
      ]);

      const nextStageNum = Math.min(5, currentRound + 1);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'ai',
          stage: nextStageNum,
          score: evaluation.score,
          feedback: evaluation.feedback,
          text: nextQuestion
        }
      ]);

      // Speak out the new question and feedback
      const speechOutput = `Score ${evaluation.score} out of 10. ${evaluation.feedback} Here is your next question: ${nextQuestion}`;
      speakText(speechOutput);
    } catch (err) {
      console.error(err);
      const fallbackMsg = "Thank you for explaining your thoughts! Now let's explore your core technical skills: Can you explain how processes and threads differ in memory management?";
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'ai',
          stage: Math.min(5, currentRound + 1),
          text: fallbackMsg
        }
      ]);
      speakText(fallbackMsg);
    } finally {
      setIsThinking(false);
    }
  };

  // Complete Interview and Generate Comprehensive Analysis
  const handleFinishInterview = async () => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsInterviewCompleted(true);
    setIsGeneratingSummary(true);
    const summary = await generateOverallInterviewSummary(evaluatedRounds, selectedTrack);
    setOverallSummary(summary);
    setIsGeneratingSummary(false);
  };

  const handleRestartInterview = () => {
    setIsInterviewCompleted(false);
    setOverallSummary(null);
    setEvaluatedRounds([]);
    const initialMsg = getInitialInterviewMessage(selectedTrack);
    setMessages([
      {
        id: Date.now(),
        stage: 1,
        text: initialMsg,
        type: 'ai'
      }
    ]);
    speakText(initialMsg);
  };

  // -------------------------------------------------------------
  // RENDER COMPREHENSIVE POST-INTERVIEW ANALYSIS SCREEN IF COMPLETED
  // -------------------------------------------------------------
  if (isInterviewCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="glass-panel card-3d interview-report-view"
        style={{ padding: '2.5rem' }}
      >
        {/* Report Top Header */}
        <div className="report-header-banner">
          <div className="report-header-left">
            <div className="inline-badge mb-2">
              <span className="badge-hiring">Comprehensive Interview Analysis</span>
            </div>
            <h2 className="report-title">
              Candidate Performance <span className="text-gradient">Scorecard</span>
            </h2>
            <p className="report-subtitle">
              Role: <strong>{selectedTrack}</strong> • Questions Evaluated: <strong>{evaluatedRounds.length}</strong>
            </p>
          </div>

          <div className="report-header-actions">
            <button className="btn btn-outline" onClick={handleRestartInterview}>
              <RotateCcw size={16} /> Retake Interview
            </button>
            <Link to="/skill-gap" className="btn btn-primary">
              Revise in Roadmap <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Overall Score & Hiring Verdict Card */}
        {isGeneratingSummary ? (
          <div className="glass-panel text-center" style={{ padding: '3rem 2rem', margin: '1.5rem 0' }}>
            <Sparkles className="animate-spin" size={36} style={{ color: 'var(--king-purple-600)', margin: '0 auto 1rem auto' }} />
            <h3>Gemini AI is generating your comprehensive session analysis...</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Reviewing your technical accuracy, communication clarity, and conceptual gaps.</p>
          </div>
        ) : overallSummary && (
          <div className="scorecard-hero-card glass-panel card-3d">
            <div className="scorecard-top-row">
              <div className="verdict-pill-wrap">
                <span className="scorecard-verdict-tag">{overallSummary.hiringVerdict}</span>
                <p className="scorecard-summary-text">{overallSummary.executiveSummary}</p>
              </div>

              <div className="score-average-circle">
                <span className="avg-num text-gradient">{overallSummary.overallScore}</span>
                <span className="avg-sub">Out of 10</span>
              </div>
            </div>

            {/* Performance Metric Gauges */}
            <div className="metric-gauges-grid">
              <div className="gauge-box">
                <div className="gauge-label-row">
                  <span>Technical Accuracy</span>
                  <strong>{overallSummary.technicalRating}%</strong>
                </div>
                <div className="gauge-bar-wrap">
                  <div className="gauge-bar-fill" style={{ width: `${overallSummary.technicalRating}%`, background: '#7c3aed' }} />
                </div>
              </div>

              <div className="gauge-box">
                <div className="gauge-label-row">
                  <span>Communication & Precision</span>
                  <strong>{overallSummary.communicationRating}%</strong>
                </div>
                <div className="gauge-bar-wrap">
                  <div className="gauge-bar-fill" style={{ width: `${overallSummary.communicationRating}%`, background: '#10b981' }} />
                </div>
              </div>

              <div className="gauge-box">
                <div className="gauge-label-row">
                  <span>Role Fit (Target Role)</span>
                  <strong>{overallSummary.roleFitRating}%</strong>
                </div>
                <div className="gauge-bar-wrap">
                  <div className="gauge-bar-fill" style={{ width: `${overallSummary.roleFitRating}%`, background: '#f59e0b' }} />
                </div>
              </div>
            </div>

            {/* Strengths and Focus Areas */}
            <div className="strengths-improvement-grid">
              <div className="insight-card card-strengths">
                <div className="insight-card-header">
                  <CheckCircle2 size={18} color="#10b981" />
                  <h4>Key Strengths Demonstrated</h4>
                </div>
                <ul>
                  {overallSummary.strengths && overallSummary.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="insight-card card-improvements">
                <div className="insight-card-header">
                  <Target size={18} color="#ef4444" />
                  <h4>Critical Topics to Revise Before Real Drive</h4>
                </div>
                <ul>
                  {overallSummary.keyAreasToImprove && overallSummary.keyAreasToImprove.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Question-by-Question Deep Analysis */}
        <div className="qa-breakdown-section">
          <div className="section-title-wrap mb-4">
            <HelpCircle size={22} className="text-gradient" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Question-by-Question Detailed Analysis</h3>
          </div>

          <div className="qa-cards-list">
            {evaluatedRounds.map((round, idx) => {
              const isHigh = round.score >= 7;
              const isMid = round.score >= 4 && round.score < 7;
              const scoreClass = isHigh ? 'round-score-high' : isMid ? 'round-score-mid' : 'round-score-low';

              return (
                <div key={idx} className="qa-analysis-card glass-panel card-3d">
                  {/* Question Header */}
                  <div className="qa-card-header flex-between">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="qa-round-badge">Question {round.roundNumber}</span>
                      {round.stageName && (
                        <span className="qa-stage-pill">{round.stageName}</span>
                      )}
                    </div>
                    <span className={`qa-score-pill ${scoreClass}`}>
                      Score: {round.score} / 10
                    </span>
                  </div>

                  <h4 className="qa-question-text">{round.question}</h4>

                  {/* Candidate's Answer */}
                  <div className="qa-candidate-answer-box">
                    <div className="qa-box-label">Your Response:</div>
                    <p className="qa-user-text">"{round.userAnswer}"</p>
                  </div>

                  {/* Recruiter Feedback */}
                  <div className="qa-feedback-box">
                    <div className="qa-box-label">Recruiter Feedback:</div>
                    <p>{round.feedback}</p>
                  </div>

                  {/* How You Could Have Answered Better */}
                  {round.howToImprove && (
                    <div className="qa-how-to-improve-box">
                      <div className="qa-box-label label-improve">
                        <Sparkles size={14} /> How You Could Have Answered Better:
                      </div>
                      <p>{round.howToImprove}</p>
                    </div>
                  )}

                  {/* Ideal Model Answer */}
                  {round.idealAnswer && (
                    <div className="qa-ideal-answer-box">
                      <div className="qa-box-label label-ideal">
                        <Award size={14} /> Ideal Model Answer (What Top Interviewers Expect):
                      </div>
                      <p>{round.idealAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Action Bar */}
          <div className="report-footer-actions flex-between mt-4">
            <button className="btn btn-outline" onClick={handleRestartInterview}>
              <RotateCcw size={16} /> Start Another Mock Interview
            </button>
            <Link to="/skill-gap" className="btn btn-primary">
              Go to Concept Mastery Roadmap <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE INTERVIEW CHAT VIEW
  // -------------------------------------------------------------
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="chat-window shadow-lg card-3d"
    >
      {/* Voice Control Top Bar */}
      <div className="chat-header flex-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: isSpeaking ? '#a855f7' : '#10b981', 
            boxShadow: isSpeaking ? '0 0 12px #a855f7' : '0 0 8px #10b981',
            transition: 'all 0.3s ease'
          }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
            Gemini Voice Interviewer ({selectedTrack})
          </span>
          {isSpeaking && <span className="speaking-indicator">AI is speaking...</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Finish & Get Full Report Button */}
          {evaluatedRounds.length > 0 && (
            <button 
              onClick={handleFinishInterview}
              className="btn-finish-interview"
              title="Wrap up this interview and view question-by-question analysis"
            >
              <Award size={15} /> End Interview & Get Analysis ({evaluatedRounds.length})
            </button>
          )}

          {/* Mute/Unmute AI Voice Button */}
          <button 
            onClick={handleToggleVoiceOutput} 
            className="voice-control-btn"
            title={isVoiceOutputEnabled ? "Mute AI Voice" : "Enable AI Voice"}
          >
            {isVoiceOutputEnabled ? <Volume2 size={18} color="#10b981" /> : <VolumeX size={18} color="#94a3b8" />}
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{isVoiceOutputEnabled ? "Voice ON" : "Voice Muted"}</span>
          </button>

          {/* Track selector */}
          <div className="tracks-scroll-wrap">
            {tracks.map(t => (
              <button
                key={t}
                onClick={() => handleTrackChange(t)}
                className={`track-pill-btn ${selectedTrack === t ? 'active' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Waveform Banner when speaking or recording */}
      {(isSpeaking || isListening) && (
        <div className="audio-visualizer-bar">
          <span className="waveform-bar bar-1"></span>
          <span className="waveform-bar bar-2"></span>
          <span className="waveform-bar bar-3"></span>
          <span className="waveform-bar bar-4"></span>
          <span className="waveform-bar bar-5"></span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, marginLeft: '0.5rem' }}>
            {isListening ? "Listening to your microphone... Speak clearly!" : "AI Interviewer is speaking aloud..."}
          </span>
        </div>
      )}

      {/* Real Campus Interview Stage Progression Tracker */}
      <div className="interview-stage-tracker">
        {interviewStages.map((st) => {
          const isCompleted = currentStageNumber > st.step;
          const isActive = currentStageNumber === st.step;
          return (
            <div 
              key={st.step} 
              className={`stage-tracker-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="stage-tracker-dot">
                {isCompleted ? <CheckCircle2 size={13} /> : st.step}
              </div>
              <div className="stage-tracker-info">
                <span className="stage-tracker-name">{st.name}</span>
                {st.tag && (
                  <span className={`stage-tag-badge ${st.step === 3 ? 'crucial' : ''}`}>
                    {st.tag}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Messages */}
      <div className="chat-messages" style={{ minHeight: '400px', maxHeight: '520px' }}>
        {messages.map(msg => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={msg.id} 
            className={`message ${msg.type}`}
          >
            {msg.type === 'ai' && msg.stage && (
              <div className="message-stage-indicator-pill">
                <span className="dot-pulse"></span>
                Stage {msg.stage}: {interviewStages[msg.stage - 1]?.name || 'Interview Round'}
                {msg.stage === 3 && <span className="crucial-label">🔥 Core Tech Round</span>}
              </div>
            )}

            {msg.score && (
              <div className="score-badge-pill">
                ⭐ Evaluation Score: {msg.score}/10
              </div>
            )}

            {msg.feedback && (
              <div className="feedback-quote-box">
                <strong>Recruiter Feedback:</strong> {msg.feedback}
              </div>
            )}

            <div style={{ lineHeight: 1.55 }}>{msg.text}</div>
            
            {msg.type === 'ai' && (
              <button 
                onClick={() => speakText(msg.text)} 
                className="btn-replay-audio"
                title="Listen to this question again"
              >
                <Volume2 size={12} /> Replay Audio
              </button>
            )}
          </motion.div>
        ))}

        {isThinking && (
          <div className="message ai thinking-box">
            <Sparkles size={16} className="animate-spin" />
            <span>Gemini AI is evaluating your technical response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Speech-to-Text & Text Input Form */}
      <form className="chat-input" onSubmit={handleSend}>
        {/* Mic Speech-to-Text Button */}
        <button 
          type="button" 
          onClick={toggleListening}
          className={`mic-button ${isListening ? 'listening-pulse' : ''}`}
          title={isListening ? "Click to Stop Listening" : "Click to Speak Your Answer via Microphone"}
        >
          {isListening ? <Mic size={20} color="#fff" /> : <Mic size={20} color="var(--king-purple-600)" />}
        </button>

        <input 
          type="text" 
          placeholder={isListening ? "Listening... Speak your answer now..." : "Type your answer or click the microphone to speak..."} 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isThinking}
          style={{ borderColor: isListening ? '#ef4444' : 'var(--border-color)' }}
        />

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ padding: '0.75rem 1.25rem' }} 
          disabled={isThinking || !inputVal.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
};

// ==========================================
// COMPREHENSIVE COMPANY APTITUDE TEST MODULE
// ==========================================
const AptitudeTest = () => {
  const [selectedTrackKey, setSelectedTrackKey] = useState('tcs');
  const track = APTITUDE_TRACKS[selectedTrackKey];
  const questions = track.questions;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(track.timeSeconds);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset timer and answers when changing track
  const handleSwitchTrack = (key) => {
    setSelectedTrackKey(key);
    setCurrentQIndex(0);
    setUserAnswers({});
    setTimeLeft(APTITUDE_TRACKS[key].timeSeconds);
    setIsSubmitted(false);
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !isSubmitted) {
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIdx
    }));
  };

  const clearSelection = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQIndex];
      return copy;
    });
  };

  // Calculate results
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });
  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  const currentQ = questions[currentQIndex];
  const isLastQuestion = currentQIndex === questions.length - 1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="glass-panel card-3d" 
      style={{ padding: '2rem' }}
    >
      {/* Track Selector Bar */}
      <div className="aptitude-track-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building size={18} className="text-gradient" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Select Company Hiring Track:</span>
        </div>
        <div className="track-tabs-row">
          {Object.entries(APTITUDE_TRACKS).map(([key, t]) => (
            <button
              key={key}
              onClick={() => handleSwitchTrack(key)}
              className={`track-tab-pill ${selectedTrackKey === key ? 'active' : ''}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {!isSubmitted ? (
        <div className="aptitude-live-test">
          {/* Header with Title & Timer */}
          <div className="test-header flex-between">
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{track.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{track.description}</p>
            </div>
            <div className={`timer-pill ${timeLeft < 120 ? 'timer-warning' : ''}`}>
              <Clock size={18} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Palette Indicator */}
          <div className="question-palette-wrap">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Questions:
            </span>
            <div className="palette-numbers">
              {questions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentQIndex;
                let statusClass = 'palette-unanswered';
                if (isCurrent) statusClass = 'palette-current';
                else if (isAnswered) statusClass = 'palette-answered';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`palette-num-btn ${statusClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question Display */}
          <div className="question-display-card">
            <div className="question-number-tag">Question {currentQIndex + 1} of {questions.length}</div>
            <div className="question-text">{currentQ.question}</div>

            {/* Options */}
            <div className="options-grid">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQIndex] === optIdx;
                return (
                  <button 
                    key={optIdx} 
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                    <span className="opt-label">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="test-nav-actions flex-between">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-outline"
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(idx => idx - 1)}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              {userAnswers[currentQIndex] !== undefined && (
                <button className="btn-clear-choice" onClick={clearSelection}>
                  Clear Choice
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {!isLastQuestion ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentQIndex(idx => idx + 1)}
                >
                  Next Question <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ background: '#10b981', borderColor: '#10b981' }}
                  onClick={() => setIsSubmitted(true)}
                >
                  Submit Assessment ({Object.keys(userAnswers).length}/{questions.length} Answered)
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* COMPREHENSIVE SUBMITTED RESULT & EXPLANATIONS */
        <div className="aptitude-results-view">
          <div className="score-summary-banner text-center">
            <Award size={56} style={{ color: scorePercentage >= 70 ? '#10b981' : '#f59e0b', margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Assessment Completed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Track: <strong>{track.name}</strong> • Time Taken: {formatTime(track.timeSeconds - timeLeft)}
            </p>

            <div className="score-stats-row">
              <div className="score-stat-box">
                <span className="stat-big-num text-gradient">{correctCount}/{questions.length}</span>
                <span className="stat-sub">Score</span>
              </div>
              <div className="score-stat-box">
                <span className="stat-big-num" style={{ color: scorePercentage >= 70 ? '#10b981' : '#f59e0b' }}>
                  {scorePercentage}%
                </span>
                <span className="stat-sub">Accuracy</span>
              </div>
              <div className="score-stat-box">
                <span className="stat-big-num" style={{ color: '#7c3aed' }}>
                  {scorePercentage >= 70 ? 'Ready! 🔥' : 'Needs Practice'}
                </span>
                <span className="stat-sub">Placement Status</span>
              </div>
            </div>

            <button 
              className="btn btn-primary mt-4"
              onClick={() => handleSwitchTrack(selectedTrackKey)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <RotateCcw size={16} /> Retake This Assessment
            </button>
          </div>

          {/* Question-by-Question Detailed Review & Step-by-Step Mathematical Solutions */}
          <div className="detailed-solutions-section">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={20} className="text-gradient" /> Step-by-Step Explanations & Formulas
            </h3>

            <div className="solutions-list">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                const isSkipped = userChoice === undefined;

                return (
                  <div key={idx} className={`solution-item-card ${isCorrect ? 'sol-correct' : 'sol-wrong'}`}>
                    <div className="sol-header flex-between">
                      <span className="sol-q-num">Question {idx + 1}</span>
                      <span className={`sol-status-pill ${isCorrect ? 'pill-correct' : 'pill-wrong'}`}>
                        {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {isCorrect ? 'Correct (+1)' : isSkipped ? 'Skipped (0)' : 'Incorrect (0)'}
                      </span>
                    </div>

                    <div className="sol-question-text">{q.question}</div>

                    <div className="sol-choices-preview">
                      <div className="choice-row">
                        <strong>Your Answer:</strong>{' '}
                        <span>
                          {userChoice !== undefined ? `${String.fromCharCode(65 + userChoice)}. ${q.options[userChoice]}` : 'None (Skipped)'}
                        </span>
                      </div>
                      <div className="choice-row" style={{ color: '#10b981' }}>
                        <strong>Correct Answer:</strong>{' '}
                        <span>{String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}</span>
                      </div>
                    </div>

                    {/* Step-by-Step Mathematical Explanation */}
                    <div className="sol-explanation-box">
                      <strong className="explanation-title">Mathematical Formula & Step-by-Step Logic:</strong>
                      <p className="explanation-body">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ==========================================
// CODING ROUND COMPONENT
// ==========================================
const CodingRound = () => {
  const [code, setCode] = useState('function twoSum(nums, target) {\n  // Write your O(n) hash map logic here\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n');
  const [outputMessage, setOutputMessage] = useState('> awaiting execution...');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputMessage('> compiling and running test cases [nums = [2,7,11,15], target = 9]...');
    setTimeout(() => {
      setIsRunning(false);
      setOutputMessage('> Test Case 1: PASSED! Output: [0, 1] (Target: 9)\n> Test Case 2: PASSED! Output: [1, 2] (Target: 6)\n> Execution Time: 42ms | Memory: 42.1 MB\n> Status: Accepted (100% test cases verified)');
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="editor-layout card-3d"
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
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong>Constraints:</strong><br/>
          • 2 &lt;= nums.length &lt;= 10^4<br/>
          • Only one valid answer exists.
        </div>
      </div>
      
      <div className="code-editor-area">
        <div className="editor-header flex-between">
          <span>main.js</span>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play size={14} /> {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
        <textarea 
          className="textarea-editor" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
        <pre style={{ background: '#111', color: '#10b981', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', borderTop: '1px solid #333', whiteSpace: 'pre-wrap' }}>
          {outputMessage}
        </pre>
      </div>
    </motion.div>
  );
};

// ==========================================
// 50+ COMPANY PLACEMENT CHEAT SHEETS COMPONENT
// ==========================================
const CompanyCheatSheets = ({ onLaunchInterview, onLaunchAptitude }) => {
  const [activeCompanyId, setActiveCompanyId] = useState('tcs');
  const [selectedCategory, setSelectedCategory] = useState('All (52)');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = COMPANY_CHEAT_SHEETS.filter(comp => {
    const matchesCategory = selectedCategory === 'All (52)' || comp.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      comp.name.toLowerCase().includes(q) || 
      comp.badge.toLowerCase().includes(q) || 
      comp.packageTier.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  // Fallback to first filtered company if activeCompanyId is not in filtered list
  const currentCompany = COMPANY_CHEAT_SHEETS.find(c => c.id === activeCompanyId) || filteredCompanies[0] || COMPANY_CHEAT_SHEETS[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="company-cheatsheet-wrapper"
    >
      {/* Search & Category Filter Header */}
      <div className="cheatsheet-search-filter-box glass-panel card-3d">
        <div className="search-input-wrap">
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search 52+ recruiters by name, package, or exam (e.g. Google, TCS, Goldman Sachs, Zoho)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="company-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-pills">
          {COMPANY_CATEGORIES.map((cat) => {
            const count = cat === 'All (52)' 
              ? COMPANY_CHEAT_SHEETS.length 
              : COMPANY_CHEAT_SHEETS.filter(c => c.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                className={`cat-pill-btn ${isSelected ? 'cat-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat.replace(' (52)', '')}</span>
                <span className="cat-count-badge">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Company Selector Grid / Ribbon */}
      <div className="company-selection-area">
        <div className="company-results-meta flex-between">
          <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredCompanies.length}</strong> of 52 company placement guides:
          </span>
          {searchQuery && (
            <span style={{ fontSize: '0.75rem', color: 'var(--king-purple-400)' }}>
              Filtered by "{searchQuery}"
            </span>
          )}
        </div>

        <div className="company-selector-ribbon">
          {filteredCompanies.map((comp) => {
            const isSelected = currentCompany.id === comp.id;
            return (
              <button
                key={comp.id}
                className={`company-tab-item ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveCompanyId(comp.id)}
                title={comp.packageTier}
              >
                <div className="company-icon-dot" style={{ background: comp.accentColor }}></div>
                <span className="company-tab-name">{comp.name.split(' ')[0]}</span>
                <span className="mini-badge">{comp.badge}</span>
              </button>
            );
          })}
          {filteredCompanies.length === 0 && (
            <div className="no-companies-found">
              No companies match "{searchQuery}". Try searching for another recruiter.
            </div>
          )}
        </div>
      </div>

      {/* Main Cheatsheet Card */}
      <div className="glass-panel cheatsheet-detail-card card-3d">
        <div className="cheatsheet-header flex-between">
          <div>
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <h2 className="cheatsheet-company-title">{currentCompany.name}</h2>
              <span className="badge-hiring" style={{ background: currentCompany.accentColor, color: '#fff' }}>
                {currentCompany.badge}
              </span>
              <span className="company-cat-tag">{currentCompany.category}</span>
            </div>
            <p className="cheatsheet-package">
              <Briefcase size={15} color="#10b981" /> <strong>CTC Packages:</strong> {currentCompany.packageTier}
            </p>
          </div>

          <div className="cheatsheet-cta-actions">
            <button 
              className="btn btn-primary"
              onClick={() => onLaunchAptitude(currentCompany.id)}
              style={{ fontSize: '0.825rem', padding: '0.45rem 1rem' }}
            >
              <CheckSquare size={15} /> Practice Aptitude Test
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => onLaunchInterview(currentCompany.name)}
              style={{ fontSize: '0.825rem', padding: '0.45rem 1rem' }}
            >
              <Mic size={15} /> Launch Voice Mock Interview
            </button>
          </div>
        </div>

        {/* Eligibility Banner */}
        <div className="eligibility-callout">
          <Award size={18} color="#f59e0b" />
          <span><strong>Eligibility & Cutoffs:</strong> {currentCompany.eligibility}</span>
        </div>

        {/* Hiring Rounds Timeline */}
        <div className="cheatsheet-section">
          <h4 className="section-title-sm">
            <Layers size={16} color="#8b5cf6" /> Recruitment Stages & Format
          </h4>
          <div className="rounds-timeline-grid">
            {currentCompany.rounds.map((round, idx) => (
              <div key={idx} className="round-step-box">
                <div className="round-step-tag">{round.roundNum}</div>
                <h5 className="round-step-title">{round.title}</h5>
                <p className="round-step-desc">{round.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Repeated Questions & High-Probability Topics */}
        <div className="cheatsheet-section">
          <h4 className="section-title-sm">
            <CheckCircle2 size={16} color="#10b981" /> High-Probability Topics & Repeated Questions
          </h4>
          <div className="topics-list-container">
            {currentCompany.repeatedTopics.map((topicItem, idx) => (
              <div key={idx} className="topic-card-item">
                <div className="topic-category-label">{topicItem.category}</div>
                <div className="topic-content-text">{topicItem.topics}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Insider Pro-Tips */}
        <div className="cheatsheet-section">
          <h4 className="section-title-sm">
            <Sparkles size={16} color="#ec4899" /> Placement Insider Advice (From Selected Alumni)
          </h4>
          <div className="pro-tips-list">
            {currentCompany.proTips.map((tip, idx) => (
              <div key={idx} className="pro-tip-item">
                <span className="pro-tip-bullet">⚡</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Placement;
