import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Paperclip, MoreVertical, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm CampusAI, your personal career mentor from Campus to Industry. I can help you with placement preparation, analyze your skills, recommend a domain, or provide study guidance. How can I assist you today?", 
      type: 'ai',
      time: '10:00 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputVal.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = inputVal;

    // Add User Message
    const newMessages = [...messages, { 
      id: Date.now(), 
      text: userMessage, 
      type: 'user',
      time: timeString
    }];
    setMessages(newMessages);
    setInputVal('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not set. Please set VITE_GEMINI_API_KEY in your .env.local file.");
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-3.6-flash",
        systemInstruction: "You are CampusAI, a highly intelligent and unique career mentor AI like Google Gemini for the Campus to Industry platform. Focus on answering questions about the web domain, technology, placement preparation, and career guidance. Provide unique, encouraging, and highly informative answers."
      });

      // Prepare simple chat text for context without overwhelming tokens
      const prompt = `User's new message: "${userMessage}"\n\nRespond uniquely and helpfully as CampusAI, a career and tech mentor. If the message relates to the web domain, provide specifically insightful answers.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: responseText, 
        type: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Sorry, I'm having trouble connecting right now. " + (error.message || ""), 
        type: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
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
              <h2>CampusAI Mentor</h2>
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
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chat-bubble-wrapper ai"
            >
              <div className="chat-bubble shadow-sm" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                CampusAI is thinking...
              </div>
            </motion.div>
          )}
          <div ref={chatBottomRef} />
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <button className="icon-btn" title="Attach file">
              <Paperclip size={20} />
            </button>
            <textarea 
              className="chat-textarea"
              placeholder="Message CampusAI..."
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
