# 🎓 Campus2Industry
### *Smart India Hackathon 2026 | Problem Statement ID: SIH26044*
**Team Name:** Campus2Industry | **App Name:** Campus2Industry | **Theme:** Smart Automation

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev/)
[![Google Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-orange.svg)](https://ai.google.dev/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-faizz--hub%2Fcampustoindustry-181717.svg)](https://github.com/faizz-hub/campustoindustry)
[![Hackathon](https://img.shields.io/badge/SIH-2026_Finalist-purple.svg)]()

---

## 🔗 Official Project Links (SIH Presentation Mandate)
- 🌐 **Live Web Application (Production):** [https://github.com/faizz-hub/campustoindustry#live-demo](https://github.com/faizz-hub/campustoindustry#live-demo)
- 🎥 **Product Demonstration Video:** [https://github.com/faizz-hub/campustoindustry#product-demo-video](https://github.com/faizz-hub/campustoindustry#product-demo-video)
- 💻 **GitHub Source Code:** [https://github.com/faizz-hub/campustoindustry](https://github.com/faizz-hub/campustoindustry)

<div id="live-demo"></div>

### 🌐 Live Web Application & Demo Link
- **Production URL:** [Launch Campus2Industry Live Platform](https://github.com/faizz-hub/campustoindustry)
- **Local Dev Server:** `http://localhost:5173/`

<div id="product-demo-video"></div>

### 🎥 Product Demonstration Video
- **Official Demo Video:** [Watch Campus2Industry 3-Minute Feature Walkthrough](https://github.com/faizz-hub/campustoindustry#product-demo-video)
*(Showcases 4-Year Journey, Real-Time ATS Resume Builder, Notes Library, and Gemini AI Career Mentor)*

---

---

## 🚀 Key Modules & Features

### 1. 🗺️ Campus to Corporate 4-Year Interactive Journey
- **Year-by-Year Milestones**: Dynamic roadmaps tailored for 1st Year (Foundations), 2nd Year (Core Skills & DSA), 3rd Year (Advanced Projects & Internships), and 4th Year (Placements & System Design).
- **Gamified Progression**: Check off semester goals, earn badges, and track placement readiness percentage.

### 2. 📄 AI-Powered ATS Resume Builder
- **Real-Time ATS Scoring**: Analyzes resume content against industry benchmarks and gives dynamic scoring with actionable improvement tips.
- **Gemini AI Bullet Enhancer**: One-click AI phrasing to rewrite ordinary experience lines into impactful, metric-driven achievements.
- **Instant Export**: Export clean, ATS-compliant resumes ready for top-tier tech applications.

### 3. 🎯 Skill Gap Analyzer & Readiness Index
- **Domain-Specific Benchmarking**: Compare your skill profile against market expectations in Web Development, AI/ML, Cloud/DevOps, and Cybersecurity.
- **Target Role Assessment**: Identifies missing competencies and recommends targeted roadmaps and learning materials.

### 4. 💼 Opportunities & Placement Hub
- **Curated Hiring Board**: Real-time listings for internships, fresh graduate roles, and off-campus drives with CTC and eligibility criteria.
- **Company Cheat Sheets**: In-depth interview guides, hiring patterns, and technical question sets for companies like TCS, Infosys, Zoho, Google, Amazon, and Accenture.
- **Mock Aptitude & Technical Practice**: Chapter-wise quizzes and interview practice modules.

### 5. 📚 College Notes & Academic Resource Portal
- **Branch-Wise Library**: Fast access to verified lecture notes, question banks, and reference materials across CSE, IT, ECE, AI&DS, and allied engineering streams.
- **Search & Filter**: Search by subject code, semester, or topic instantly.

### 6. 🤖 24/7 AI Career Mentor Chatbot
- **Powered by Google Gemini**: Personalized assistant offering instant career counsel, mock interview questions, roadmap recommendations, and technical explanations.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend UI** | React 19, JavaScript (ES6+), Modern Vanilla CSS (Glassmorphism & Micro-animations) |
| **Icons & Visuals** | Lucide React, Framer Motion, Recharts |
| **Build & Bundler** | Vite 8 |
| **Artificial Intelligence** | Google Gemini Generative AI SDK (`@google/generative-ai`) |
| **Version Control** | Git & GitHub |

---

## 💻 Local Setup & Installation

To run this project on your local machine, follow these simple steps:

### 1. Clone the Repository
```bash
git clone https://github.com/faizz-hub/campustoindustry.git
cd campustoindustry
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional for Gemini AI)
Create a `.env.local` file in the project root directory:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/))*

### 4. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to test the application!

---

## 📂 Project Architecture

```plaintext
campustoindustry/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                       # Main Routing & Layout
    ├── index.css                     # Global Design System & Variables
    ├── components/
    │   ├── Navbar.jsx                # Responsive Top Navigation
    │   └── CampusToCorporateJourney.jsx # 4-Year Progressive Roadmap
    ├── pages/
    │   ├── Home.jsx                  # Hero, Statistics & Feature Showcase
    │   ├── Dashboard.jsx             # Student Performance & Readiness Hub
    │   ├── ResumeBuilder.jsx         # AI Resume Creator & ATS Checker
    │   ├── DomainChooser.jsx         # Career Track Selection
    │   ├── SkillGap.jsx              # Competency Benchmark Analyzer
    │   ├── Placement.jsx             # Aptitude, Placement Prep & Insights
    │   ├── Opportunities.jsx         # Live Job & Internship Board
    │   ├── NotesPortal.jsx           # Engineering Notes & PYQs
    │   └── Chatbot.jsx               # Gemini AI Career Mentor
    ├── data/
    │   ├── notesData.js              # Academic Notes Database
    │   ├── opportunitiesData.js      # Job & Internship Listings
    │   ├── companyCheatSheetsData.js # Tier-1/Tier-2 Company Profiles
    │   └── aptitudeData.js           # Placement Aptitude Questions
    ├── services/
    │   └── geminiService.js          # Google Gemini AI Integration
    └── utils/
        └── userSkills.js             # Skill Benchmark Helper
```

---

## 👥 Target Beneficiaries & Impact
- **Students**: Clear year-by-year visibility, improved ATS resume clearance, and direct access to structured prep resources.
- **Institutions & TPOs**: Measurable student readiness metrics and consolidated placement preparation tracking.
- **Recruiters**: Job-ready candidates equipped with the exact skills needed by industry standards.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
