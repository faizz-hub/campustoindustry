import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotesPortal from './pages/NotesPortal';
import Placement from './pages/Placement';
import SkillGap from './pages/SkillGap';
import DomainChooser from './pages/DomainChooser';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Opportunities from './pages/Opportunities';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/notes" element={<NotesPortal />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/domains" element={<DomainChooser />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
