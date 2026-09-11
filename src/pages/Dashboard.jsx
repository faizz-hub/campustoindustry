import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Trophy, 
  Code, 
  Target, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2,
  Flame,
  Award,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUserSkills, getTargetRole } from '../utils/userSkills';
import { OPPORTUNITIES_DATA, calculateMatch } from '../data/opportunitiesData';
import './Dashboard.css';

const Dashboard = () => {
  const [skills, setSkills] = useState(getUserSkills());
  const [targetRole, setTargetRole] = useState(getTargetRole());

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) setSkills(e.detail);
    };
    window.addEventListener('elevate_skills_updated', handleUpdate);
    return () => window.removeEventListener('elevate_skills_updated', handleUpdate);
  }, []);

  const eligibleJobs = OPPORTUNITIES_DATA.filter(opp => {
    const match = calculateMatch(skills, opp.requiredSkills);
    return match.isEligible;
  });

  const readinessPercentage = Math.round((eligibleJobs.length / OPPORTUNITIES_DATA.length) * 100);

  // Sample Data
  const activityData = [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 70 },
    { name: 'Wed', score: 68 },
    { name: 'Thu', score: 85 },
    { name: 'Fri', score: 82 },
    { name: 'Sat', score: 90 },
    { name: 'Sun', score: 95 },
  ];

  const skillData = skills.slice(0, 5).map((s, idx) => ({
    subject: s,
    level: Math.min(95, 70 + idx * 5)
  }));

  const recentActivities = [
    { id: 1, title: 'AI Mock Technical Interview', time: '2 hours ago', score: '8.5/10', type: 'interview' },
    { id: 2, title: 'Matched Swiggy Frontend Internship', time: '4 hours ago', score: '85% Fit', type: 'reading' },
    { id: 3, title: 'Solved "Two Sum" Challenge', time: '5 hours ago', score: '+50 XP', type: 'coding' },
    { id: 4, title: 'Quantitative Aptitude Test', time: '1 day ago', score: '95%', type: 'aptitude' },
  ];

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header">
        <motion.h1 
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your <span className="text-gradient">Progress</span> Dashboard
        </motion.h1>
        <motion.p 
          className="dashboard-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Track your skills, review matched job openings, and stay ready for placements.
        </motion.p>
      </div>

      {/* 3D JOB READINESS NOTIFICATION HERO */}
      <motion.div 
        className="glass-panel card-3d"
        style={{
          padding: '1.75rem 2rem',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.3)'
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--king-purple-600)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
          }}>
            <Briefcase size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge-hiring">Target: {targetRole}</span>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <CheckCircle2 size={14} /> {skills.length} Skills Learned
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              You currently qualify for <span className="highlight-text">{eligibleJobs.length} Live Openings</span>!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Based on your skills ({skills.join(', ')}), top companies like Swiggy, TCS & Zoho are hiring candidates with your exact profile.
            </p>
          </div>
        </div>

        <Link to="/opportunities" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
          View Matched Jobs <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* STUDENT GAMIFICATION: XP, LEVEL & UNLOCKED BADGES */}
      <motion.div 
        className="glass-panel card-3d dashboard-gamify-panel"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="gamify-header flex-between">
          <div className="flex-center" style={{ gap: '0.75rem', justifyContent: 'flex-start' }}>
            <div className="level-avatar-badge">
              <Zap size={20} color="#fbbf24" />
              <span>LVL 4</span>
            </div>
            <div>
              <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
                <h4 className="student-rank-title">Placement Crusader</h4>
                <span className="streak-pill">
                  <Flame size={14} color="#f97316" /> 5 Day Streak
                </span>
              </div>
              <p className="xp-count-text">
                <strong>1,650 XP</strong> / 2,000 XP to Level 5 (Corporate Ready)
              </p>
            </div>
          </div>

          <div className="xp-quick-stat">
            <span className="xp-bonus-text">+150 XP earned today</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="xp-progress-track">
          <div className="xp-progress-fill" style={{ width: '82.5%' }}></div>
        </div>

        {/* Achievement Badges Showcase */}
        <div className="badges-showcase-row">
          <div className="achievement-badge-card badge-unlocked">
            <div className="badge-icon-wrap" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
              🎙️
            </div>
            <div className="badge-text-meta">
              <span className="badge-name">AI Voice Champion</span>
              <span className="badge-sub">Gemini Voice Mock</span>
            </div>
          </div>

          <div className="achievement-badge-card badge-unlocked">
            <div className="badge-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              🎯
            </div>
            <div className="badge-text-meta">
              <span className="badge-name">Aptitude Warrior</span>
              <span className="badge-sub">TCS / Zoho Rounds</span>
            </div>
          </div>

          <div className="achievement-badge-card badge-unlocked">
            <div className="badge-icon-wrap" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#8b5cf6' }}>
              ⚡
            </div>
            <div className="badge-text-meta">
              <span className="badge-name">Skill Gap Hunter</span>
              <span className="badge-sub">Roadmap Master</span>
            </div>
          </div>

          <div className="achievement-badge-card badge-unlocked">
            <div className="badge-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              📄
            </div>
            <div className="badge-text-meta">
              <span className="badge-name">ATS Optimized</span>
              <span className="badge-sub">Resume Scored 85+</span>
            </div>
          </div>

          <div className="achievement-badge-card badge-in-progress">
            <div className="badge-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              💼
            </div>
            <div className="badge-text-meta">
              <span className="badge-name">Corporate Day 1</span>
              <span className="badge-sub">85% Complete</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <StatCard icon={<Briefcase color="#10b981" />} title="Matched Openings" value={`${eligibleJobs.length}`} trend={`${readinessPercentage}% Market Fit`} delay={0.05} />
        <StatCard icon={<Trophy color="#f59e0b" />} title="Overall Rank" value="Top 5%" trend="+2% this week" delay={0.1} />
        <StatCard icon={<Code color="#8b5cf6" />} title="Mastered Skills" value={`${skills.length}`} trend="Across 4 categories" delay={0.2} />
        <StatCard icon={<Target color="#ef4444" />} title="Mock Interviews" value="8" trend="Average Score: 8.5/10" delay={0.3} />
      </div>

      <div className="charts-container">
        {/* LINE CHART */}
        <motion.div 
          className="chart-card glass-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="chart-header">
            <h3>Weekly Performance Score</h3>
            <TrendingUp size={20} className="text-gradient" />
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tickMargin={10} />
                <YAxis stroke="#888" tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#a78bfa' }}
                />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* BAR CHART */}
        <motion.div 
          className="chart-card glass-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="chart-header">
            <h3>Skill Proficiency</h3>
            <BookOpen size={20} className="text-gradient" />
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#888" />
                <YAxis dataKey="subject" type="category" stroke="#888" width={80} />
                <Tooltip 
                  cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="level" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* RECENT ACTIVITY FEED */}
      <motion.div 
        className="recent-activity-section glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-list">
          {recentActivities.map((activity, index) => (
            <motion.div 
              key={activity.id} 
              className="activity-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
            >
              <div className="activity-icon">
                {activity.type === 'interview' && <Target size={18} color="#ef4444" />}
                {activity.type === 'coding' && <Code size={18} color="#10b981" />}
                {activity.type === 'aptitude' && <Trophy size={18} color="#f59e0b" />}
                {activity.type === 'reading' && <BookOpen size={18} color="#3b82f6" />}
              </div>
              <div className="activity-details">
                <h4>{activity.title}</h4>
                <span className="activity-time">{activity.time}</span>
              </div>
              <div className="activity-score">
                <span className="badge">{activity.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Sub-component for small stat cards
const StatCard = ({ icon, title, value, trend, delay }) => {
  return (
    <motion.div 
      className="stat-card glass-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)' }}
    >
      <div className="stat-icon-wrapper">
        {icon}
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p className="stat-title">{title}</p>
        <span className="stat-trend">{trend}</span>
      </div>
    </motion.div>
  );
};

export default Dashboard;
