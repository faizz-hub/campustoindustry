import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Paperclip, MoreVertical, Sparkles } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm ElevateAI, your personal career mentor. I can help you with placement preparation, analyze your skills, recommend a domain, or provide study guidance. How can I assist you today?", 
      type: 'ai',
      time: '10:00 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add User Message
    const newMessages = [...messages, { 
      id: Date.now(), 
      text: inputVal, 
      type: 'user',
      time: timeString
    }];
    setMessages(newMessages);
    setInputVal('');

    // Simulate AI typing and response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I can certainly help you with that. Let's start by looking at your current skills or the domain you're interested in pursuing. Have you used our Skill Gap tool yet?", 
        type: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page container">
      <motion.div 
        className="chat-container glass-panel"
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="chat-topbar">
          <div className="ai-profile">
            <div className="ai-avatar">
              <Sparkles size={24} />
            </div>
            <div className="ai-info">
              <h2>ElevateAI Mentor</h2>
              <div className="ai-status">
                <span className="status-dot"></span>
                Online | Ready to assist
              </div>
            </div>
          </div>
          <button className="icon-btn" style={{ background: 'transparent' }}>
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="chat-history">
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`chat-bubble-wrapper ${msg.type}`}
            >
              <div className="chat-bubble shadow-sm">
                {msg.text}
              </div>
              <div className="chat-time">{msg.time}</div>
            </motion.div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <button className="icon-btn" title="Attach file">
              <Paperclip size={20} />
            </button>
            <textarea 
              className="chat-textarea"
              placeholder="Message ElevateAI..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="action-btns">
              <button 
                className={`icon-btn send ${inputVal.trim() ? '' : 'disabled'}`}
                onClick={handleSend}
                style={{ opacity: inputVal.trim() ? 1 : 0.5 }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
            AI responses may not always be perfect. Double-check important facts.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
