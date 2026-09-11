import { GoogleGenerativeAI } from '@google/generative-ai';

export const getGeminiApiKey = () => {
  try {
    const customKey = localStorage.getItem('elevate_gemini_api_key');
    if (customKey && customKey.trim()) {
      return customKey.trim();
    }
  } catch (e) {
    console.warn('Error reading stored API key:', e);
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const saveGeminiApiKey = (newKey) => {
  try {
    const cleaned = (newKey || '').trim();
    if (cleaned) {
      localStorage.setItem('elevate_gemini_api_key', cleaned);
    } else {
      localStorage.removeItem('elevate_gemini_api_key');
    }
    window.dispatchEvent(new CustomEvent('elevate_api_key_updated', { detail: cleaned }));
    return true;
  } catch (e) {
    console.error('Error saving API key:', e);
    return false;
  }
};

export const testGeminiKey = async (keyToTest) => {
  const key = keyToTest || getGeminiApiKey();
  if (!key) return { success: false, message: 'No API key provided.' };

  try {
    const client = new GoogleGenerativeAI(key);
    const model = client.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const res = await model.generateContent("Respond with 'Active'.");
    return { success: true, message: 'API Key is verified and working with active quota!' };
  } catch (err) {
    console.error('Key test error:', err);
    if (err.message?.includes('429') || err.message?.includes('quota') || err.message?.includes('RESOURCE_EXHAUSTED')) {
      return { success: false, message: 'Quota exceeded (Rate Limit 429). Please generate a fresh free key at Google AI Studio.' };
    }
    if (err.message?.includes('503') || err.message?.includes('overloaded')) {
      return { success: false, message: 'Google Gemini servers are temporarily overloaded. Please retry in 30 seconds.' };
    }
    return { success: false, message: err.message || 'Failed to verify API key.' };
  }
};

const getGeminiClient = () => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.warn('Gemini API key is not defined. Operating in smart fallback mode.');
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Real Gemini AI Analysis for Skill Gap
 */
export const analyzeSkillGapWithAI = async (currentSkills = [], targetRole = 'Full Stack Developer') => {
  const genAI = getGeminiClient();

  if (!genAI) {
    return getOfflineSkillAnalysis(currentSkills, targetRole);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
You are a senior tech recruiter and engineering lead at top tech companies.
A student currently has the following skills: [${currentSkills.join(', ')}].
Their target career role is: "${targetRole}".

Analyze what they are missing to be 100% job-ready in 2025/2026. Return a valid JSON object matching this exact schema:
{
  "readinessScore": number (0 to 100),
  "missingSkills": string[],
  "atsKeywords": string[],
  "verdict": string (one encouraging, sharp summary sentence),
  "roadmap": [
    {
      "step": number,
      "title": string,
      "duration": string (e.g. "2 Weeks"),
      "desc": string,
      "recommendedProject": string
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error('Gemini Skill Gap API error, falling back to smart analysis:', err);
    return getOfflineSkillAnalysis(currentSkills, targetRole);
  }
};

/**
 * Real Gemini AI Mock Interview Evaluator & Staged Flow
 * Follows realistic campus interview stages:
 * Stage 1: Self Introduction & Elevator Pitch ("Tell me about yourself")
 * Stage 2: Project Architecture & Practical Hurdles
 * Stage 3 & 4: Deep Technical Core (DSA, OS, Frameworks, DB, APIs)
 * Stage 5+: Advanced Production Scenarios / Behavioral
 */
export const evaluateInterviewAnswerWithAI = async (
  conversation = [], 
  userLatestAnswer = '', 
  role = 'Software Engineer',
  roundNumber = 1
) => {
  const genAI = getGeminiClient();
  const lastAiMessage = conversation.filter(m => m.type === 'ai').slice(-1)[0]?.text || "Tell me about yourself.";

  if (!genAI) {
    return getOfflineInterviewFeedback(userLatestAnswer, lastAiMessage, roundNumber, role);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
You are an expert technical interviewer at a top company (Google, Zoho, TCS, Amazon) conducting a realistic campus placement interview for a "${role}" role.

Current Interview Stage:
- Round ${roundNumber}
${roundNumber === 1 ? 'STAGE 1: SELF INTRODUCTION & ELEVATOR PITCH (Candidate was asked to introduce themselves, background, and tech interests)' : ''}
${roundNumber === 2 ? 'STAGE 2: PROJECT ARCHITECTURE & PRACTICAL EXPERIENCE (Candidate was asked about a past project, tech stack, and debugging hurdles)' : ''}
${roundNumber === 3 ? 'STAGE 3: CORE TECHNICAL DEEP DIVE (Crucial technical fundamentals: DSA, OS, language internals, frameworks, or database architecture for ' + role + ')' : ''}
${roundNumber === 4 ? 'STAGE 4: ADVANCED TECHNICAL & SYSTEM OPTIMIZATION (Memory leaks, concurrency, scaling, caching, or Big-O complexity)' : ''}
${roundNumber >= 5 ? 'STAGE 5: BEHAVIORAL & SITUATIONAL / WRAP-UP (Production outages, conflict resolution, or team deadlines)' : ''}

Question previously asked: "${lastAiMessage}"
Candidate's response: "${userLatestAnswer}"

CRITICAL INSTRUCTIONS FOR GRADING & PROGRESSION:
1. Stage-Appropriate Scoring:
   - For Round 1 (Self Intro): Grade on communication clarity, structure (Present-Past-Future / elevator pitch), confidence, and relevance to ${role}.
   - For Round 2 (Projects): Grade on project ownership ("I created/architected"), rationale behind tech stack choices, and how they tackled roadblocks.
   - For Round 3 & 4 (Deep Technical): THIS IS THE MOST CRITICAL PART OF THE INTERVIEW. Grade strictly on technical accuracy, depth, Big-O complexity, memory implications, and edge-case handling.
   - For Round 5+ (Behavioral/Advanced): Grade on STAR approach, problem-solving mindset, and collaboration.

2. Handling "I don't know" or vague answers:
   - If candidate says "i don't know", "no idea", "not sure", "idk", "skip", or gives empty answers:
     - Assign 1 to 3 out of 10.
     - Acknowledge honesty, explain what was expected.
     - In "howToImprove", teach how to handle uncertainty or articulate partial thoughts.
     - In "idealAnswer", provide the gold-standard answer.
     - In "nextQuestion", transition forward to give them a fresh opportunity.

3. Flow to Next Stage in "nextQuestion":
   - If Round 1: Next question MUST smoothly transition into Stage 2 (Projects). Example: "Thank you for the introduction! Now, let's discuss your hands-on experience. Could you walk me through your most impactful technical project? What tech stack did you choose and what was the hardest bug you solved?"
   - If Round 2: Next question MUST pivot into Stage 3 (Core Technical Deep Dive for ${role}). Example: "Solid project context! Now let's move into our core technical assessment. [Ask an in-depth track-specific question e.g. React virtual DOM / processes vs threads / DB indexing / Python GIL / Big-O DSA]."
   - If Round 3: Next question MUST ask a probing follow-up or advanced technical scenario (Stage 4).
   - If Round 4: Next question should test production scaling, concurrency, or a situational question.

Return a JSON with this exact structure:
{
  "score": number (1-10),
  "feedback": string (constructive critique on their answer),
  "howToImprove": string (concrete 1-2 actionable tips),
  "idealAnswer": string (concise gold-standard answer expected in top interviews),
  "nextQuestion": string (natural transition to the next question)
}
`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (e) {
    console.error('Gemini Interview API error, using smart fallback:', e);
    return getOfflineInterviewFeedback(userLatestAnswer, lastAiMessage, roundNumber, role);
  }
};

function getOfflineInterviewFeedback(userAnswer, lastQuestion, roundNumber = 1, role = 'Software Engineer') {
  const norm = (userAnswer || '').toLowerCase().trim();
  const isDontKnow = norm.includes("don't know") || norm.includes("dont know") || norm.includes("no idea") || norm.includes("not sure") || norm.includes("idk") || norm.includes("skip") || norm.length < 5;

  if (roundNumber === 1) {
    // Stage 1: Self Introduction
    if (isDontKnow) {
      return {
        score: 3,
        feedback: "In campus placements, your self-introduction is the first impression! Even a short, structured introduction is far better than skipping.",
        howToImprove: "Use the Present-Past-Future formula: 1) Who you are (degree, college, graduation year), 2) Key technical skills & projects built, 3) Why you're passionate about software engineering.",
        idealAnswer: "Hello! I am a final-year Computer Science student passionate about building scalable web applications. Recently, I've mastered React, Node.js, and SQL, and built a full-stack job tracking platform. I love solving algorithmic challenges and I'm excited about this engineering opportunity.",
        nextQuestion: "No worries, let's move forward into your practical work: Could you walk me through a favorite project you've built? What technologies did you choose, and what technical challenge did you solve?"
      };
    }
    return {
      score: 8,
      feedback: "Great self-introduction! You communicated your background and enthusiasm clearly, setting a positive tone for the interview.",
      howToImprove: "To make your elevator pitch even stronger, mention 1-2 specific production tools or frameworks you are proficient in and link them directly to the role requirements.",
      idealAnswer: "A compelling candidate introduction highlights degree & college, key technologies mastered, 1 standout project, and enthusiasm for the specific company role.",
      nextQuestion: "Excellent introduction! Now let's explore your hands-on experience: Can you walk me through the architecture of your most impactful project? What tech stack did you pick, and what was the most difficult technical hurdle you resolved?"
    };
  } else if (roundNumber === 2) {
    // Stage 2: Project Experience -> Transition to Core Technical
    if (isDontKnow) {
      return {
        score: 3,
        feedback: "Interviewers want to see that you have written real code outside of classroom exams.",
        howToImprove: "Prepare at least two solid portfolio projects. Be ready to explain the architecture, database schema, and why you chose specific libraries over alternatives.",
        idealAnswer: "I built a real-time collaborative code editor using React, Node.js, and WebSockets. The biggest hurdle was handling simultaneous state sync without race conditions, which I solved by implementing operational transformation algorithms.",
        nextQuestion: "Understood. Now let's transition into the core technical assessment for this role: Can you explain the difference between processes and threads, and how modern operating systems schedule them in memory?"
      };
    }
    return {
      score: 8,
      feedback: "Strong explanation of your project architecture and how you tackled implementation obstacles.",
      howToImprove: "Include quantitative metrics where possible (e.g. 'reduced API latency by 40%' or 'tested with 1,000 concurrent mock users') to demonstrate production awareness.",
      idealAnswer: "A top candidate outlines the problem statement, system architecture (frontend, backend, database), explains a tough debugging challenge, and highlights testing.",
      nextQuestion: "Very impressive project work! Now let's dive into the core technical round: Can you explain how processes and threads differ in memory allocation, and how an OS handles context switching?"
    };
  } else if (roundNumber === 3) {
    // Stage 3: Core Technical Deep Dive
    if (isDontKnow) {
      return {
        score: 2,
        feedback: "Processes and threads are fundamental operating system concepts frequently tested in TCS, Zoho, and product company rounds.",
        howToImprove: "Review core OS and CS fundamentals. If unsure during an interview, explain what you know about memory (stack vs heap) and ask for a hint.",
        idealAnswer: "A process has its own isolated address space (code, data, heap, stack), providing memory safety. Threads share the parent process's memory space and heap, making creation and context switching significantly faster.",
        nextQuestion: "Let's test another foundational technical topic: What happens under the hood when you type a URL into a browser and press Enter?"
      };
    }
    return {
      score: 8,
      feedback: "Solid technical explanation of memory separation, thread lifecycles, and scheduling mechanisms.",
      howToImprove: "Explicitly mention CPU register saving during context switches and how thread safety / race conditions are prevented using mutexes or semaphores.",
      idealAnswer: "Processes have separate memory address spaces, providing process isolation. Threads exist within a process and share memory (heap), which makes context switching lightweight but requires synchronization.",
      nextQuestion: "Great technical depth! Let's examine system performance and optimization: How do you detect and fix memory leaks or database query bottlenecks in your code?"
    };
  } else {
    // Stage 4+: Advanced Technical & Behavioral
    return {
      score: 8,
      feedback: "Thorough problem-solving mindset with practical awareness of debugging and production trade-offs.",
      howToImprove: "Connect your answer to monitoring tools (e.g. Chrome DevTools, APM, SQL EXPLAIN queries) and mention preventive automated testing.",
      idealAnswer: "Profiling memory using heap snapshots, analyzing query execution plans (EXPLAIN), adding indexing, and applying debounce/memoization strategies.",
      nextQuestion: "Final question: Describe a scenario where a feature you deployed failed in testing or production. How did you diagnose the issue and communicate with your team?"
    };
  }
}


/**
 * Generate Overall Interview Performance Report
 */
export const generateOverallInterviewSummary = async (evaluatedRounds = [], role = 'Software Engineer') => {
  const genAI = getGeminiClient();

  if (!genAI || evaluatedRounds.length === 0) {
    const avgScore = evaluatedRounds.length > 0 
      ? Math.round((evaluatedRounds.reduce((acc, r) => acc + (r.score || 5), 0) / evaluatedRounds.length) * 10) / 10 
      : 7;
    return {
      hiringVerdict: avgScore >= 7.5 ? "Strong Candidate - Recommended for Next Round" : avgScore >= 5 ? "Borderline - Good Potential with Revision" : "Needs Foundation Improvement",
      overallScore: avgScore,
      technicalRating: Math.min(100, Math.round(avgScore * 10)),
      communicationRating: Math.min(100, Math.round((avgScore + 1) * 9)),
      roleFitRating: Math.min(100, Math.round(avgScore * 9.5)),
      strengths: [
        "Willingness to tackle difficult technical questions under timed pressure",
        "Clear conceptual baseline on core programming foundations",
        "Honest and transparent technical communication"
      ],
      keyAreasToImprove: [
        "Revise operating system internals, memory models, and thread lifecycle",
        "Always state Big-O runtime and memory space complexities upfront",
        "Prepare concrete examples from your past projects to back up theoretical answers"
      ],
      executiveSummary: `The candidate showed solid effort across ${evaluatedRounds.length} interview questions. With focused preparation on trade-offs and edge-case handling, they will be well positioned for campus placement technical rounds.`
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
You are a Lead Campus Recruiter at a top tech company evaluating a candidate's complete mock interview session for a "${role}" role.
Here are the evaluated questions and candidate answers from this session:
${JSON.stringify(evaluatedRounds, null, 2)}

Provide an authoritative, constructive final performance scorecard in JSON with:
{
  "hiringVerdict": string (e.g. "Strong Hire - Recommended for Final Round" or "Borderline - Practice Core Concepts" or "Not Ready - Rebuild Fundamentals"),
  "overallScore": number (average 1-10 with 1 decimal place),
  "technicalRating": number (0-100 percentage),
  "communicationRating": number (0-100 percentage),
  "roleFitRating": number (0-100 percentage),
  "strengths": string[] (3 bullet points highlighting what candidate did well),
  "keyAreasToImprove": string[] (3 specific technical topics/skills candidate must study before their actual interview),
  "executiveSummary": string (3 encouraging, sharp sentences summarizing their performance and realistic hiring chances)
}
`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error('Gemini Overall Summary error:', err);
    const avgScore = evaluatedRounds.length > 0 
      ? Math.round((evaluatedRounds.reduce((acc, r) => acc + (r.score || 5), 0) / evaluatedRounds.length) * 10) / 10 
      : 7;
    return {
      hiringVerdict: avgScore >= 7.5 ? "Strong Candidate - Recommended for Next Round" : "Borderline - Good Potential with Revision",
      overallScore: avgScore,
      technicalRating: Math.round(avgScore * 10),
      communicationRating: 80,
      roleFitRating: 75,
      strengths: ["Honest technical communication", "Willingness to attempt complex topics"],
      keyAreasToImprove: ["Focus on system memory and threading internals", "Structure answers using the STAR method"],
      executiveSummary: "Good effort throughout the mock interview. Continue revising foundational computer science concepts to guarantee campus placement success."
    };
  }
};

/**
 * Real Gemini AI Job Fit Analysis
 */
export const getJobFitWithAI = async (userSkills = [], jobTitle, company, requiredSkills = []) => {
  const genAI = getGeminiClient();

  if (!genAI) {
    const matchCount = requiredSkills.filter(r => userSkills.some(u => u.toLowerCase() === r.toLowerCase())).length;
    return `You already cover ${matchCount}/${requiredSkills.length} core requirements. Highlight your practical project work and revise ${requiredSkills.filter(r => !userSkills.some(u => u.toLowerCase() === r.toLowerCase())).slice(0, 2).join(', ')} to maximize selection chances.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const prompt = `
A student is applying for "${jobTitle}" at "${company}".
Their current skills: [${userSkills.join(', ')}].
Required skills for this role: [${requiredSkills.join(', ')}].

Provide a concise 2-sentence actionable tip:
1) Highlight their biggest strength for this specific role.
2) One specific topic or project to prepare before applying to impress the interviewer.
Keep tone enthusiastic, practical, and under 50 words.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    console.error('Gemini Job Fit API error:', e);
    return `Strong profile for ${company}. Make sure your GitHub showcases at least one project using ${requiredSkills.slice(0, 2).join(' & ')} to fast-track your resume shortlist.`;
  }
};

// High quality offline fallback in case API key is exhausted or offline
function getOfflineSkillAnalysis(currentSkills, targetRole) {
  const allCore = ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Data Structures', 'Docker'];
  const missing = allCore.filter(s => !currentSkills.some(cs => cs.toLowerCase() === s.toLowerCase()));

  return {
    readinessScore: Math.min(95, Math.max(35, currentSkills.length * 15)),
    missingSkills: missing.length > 0 ? missing : ['System Design', 'Cloud Deployment (AWS/Vercel)'],
    atsKeywords: ['RESTful APIs', 'State Management', 'Fullstack Architecture', 'Unit Testing', 'CI/CD Pipelines'],
    verdict: `Great foundation! Adding ${missing.slice(0, 2).join(' and ')} will make you an irresistible candidate for ${targetRole} roles.`,
    roadmap: [
      {
        step: 1,
        title: 'Industry Best Practices & Version Control',
        duration: '1-2 Weeks',
        desc: 'Master Git workflows, semantic commits, and team pull requests.',
        recommendedProject: 'Collaborative Open Source Contribution'
      },
      {
        step: 2,
        title: 'Backend Integration & Databases',
        duration: '2-3 Weeks',
        desc: 'Build secure REST/GraphQL APIs with database indexing and JWT auth.',
        recommendedProject: 'Full Stack SaaS Portal with Role-Based Access'
      },
      {
        step: 3,
        title: 'Production Deployment & Performance',
        duration: '2 Weeks',
        desc: 'Containerize with Docker and set up automated GitHub Actions CI/CD.',
        recommendedProject: 'Live Portfolio with Automated Health Checks'
      }
    ]
  };
}

/**
 * Deep Concept-by-Concept Mastery Roadmap (Basics to Advanced) for any skill or role
 */
export const generateDeepConceptMastery = async (topic = 'HTML') => {
  const genAI = getGeminiClient();

  if (!genAI) {
    return getOfflineConceptMastery(topic);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
You are a Staff Software Engineer and Tech Mentor designing a comprehensive, concept-by-concept learning curriculum for "${topic}".
Create a detailed "Basics to Advanced" mastery roadmap that teaches the candidate exactly what concepts to master, how to study them, and which projects to build.

Return valid JSON with this exact structure:
{
  "topic": "${topic}",
  "estimatedTime": string (e.g. "3-4 Weeks (10-12 hrs/week)"),
  "summary": string (2 sentences explaining why mastering this concept is essential for tech placements),
  "stages": [
    {
      "stageNumber": 1,
      "stageTitle": "Stage 1: Absolute Fundamentals & Core Syntax",
      "stageGoal": "Build an unbreakable foundation without relying on frameworks or shortcuts.",
      "concepts": [
        {
          "name": string (Concept name),
          "explanation": string (What this concept does in practical web engineering),
          "keyTopicsToMaster": string[] (3-4 specific subtopics to learn),
          "commonMistake": string (What freshers do wrong in interviews or code),
          "youtubeResource": string (Short video title, e.g. "HTML Full Course - freeCodeCamp"),
          "youtubeUrl": string (Exact YouTube URL or verified search URL, e.g. "https://www.youtube.com/watch?v=kUMe1FH4CHE")
        }
      ],
      "practiceMilestone": string (Specific hands-on exercise to solidify this stage)
    },
    {
      "stageNumber": 2,
      "stageTitle": "Stage 2: Intermediate Architecture & Best Practices",
      "stageGoal": "Write clean, accessible, and maintainable production code.",
      "concepts": [
        {
          "name": string,
          "explanation": string,
          "keyTopicsToMaster": string[],
          "commonMistake": string
        }
      ],
      "practiceMilestone": string
    },
    {
      "stageNumber": 3,
      "stageTitle": "Stage 3: Advanced Optimization & Production Standards",
      "stageGoal": "Master performance, security, and edge cases asked in Senior/MNC interviews.",
      "concepts": [
        {
          "name": string,
          "explanation": string,
          "keyTopicsToMaster": string[],
          "commonMistake": string
        }
      ],
      "practiceMilestone": string
    }
  ],
  "curatedResources": [
    {
      "name": string,
      "type": "Official Docs" | "Interactive Course" | "Video Tutorial" | "GitHub Practice",
      "url": string,
      "description": string
    }
  ],
  "interviewQuestions": [
    {
      "question": string,
      "idealAnswerKeypoints": string
    }
  ],
  "capstoneProject": {
    "title": string,
    "description": string,
    "featuresToInclude": string[]
  }
}
`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error('Gemini Deep Concept Mastery error, returning offline blueprint:', err);
    return getOfflineConceptMastery(topic);
  }
};

export function getOfflineConceptMastery(topic) {
  const norm = (topic || 'HTML').toLowerCase().trim();

  if (norm.includes('html')) {
    return {
      topic: "HTML5 & Web Semantics",
      estimatedTime: "2-3 Weeks (6-8 hrs/week)",
      summary: "HTML is the backbone of the web. Modern hiring managers don't just look for <div> tags—they test semantic structure, accessibility (a11y), SEO meta tags, and browser DOM rendering architecture.",
      stages: [
        {
          stageNumber: 1,
          stageTitle: "Stage 1: Core Fundamentals & Semantic Elements",
          stageGoal: "Eliminate 'div soup' and build structured, meaningful HTML documents.",
          concepts: [
            {
              name: "Semantic Layout Architecture",
              explanation: "Using <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer> to structure web pages clearly.",
              keyTopicsToMaster: ["Semantic vs Non-semantic elements", "Document Outline & Heading Hierarchy (H1-H6)", "Appropriate use of <section> vs <article>"],
              commonMistake: "Using multiple <h1> tags indiscriminately or wrapping everything in endless generic <div> tags.",
              youtubeResource: "HTML5 Semantic Layout & Web Structure (freeCodeCamp)",
              youtubeUrl: "https://www.youtube.com/results?search_query=HTML5+Semantic+Elements+tutorial+freecodecamp"
            },
            {
              name: "Modern Forms & Interactive Inputs",
              explanation: "Collecting and validating user data natively before JavaScript even runs.",
              keyTopicsToMaster: ["HTML5 Form inputs (email, tel, url, date, file)", "Native validation attributes (required, pattern, min/max)", "<label> 'for' association and <fieldset>/<legend> grouping"],
              commonMistake: "Skipping the <label> tag or failing to link it with input 'id', breaking screen reader accessibility.",
              youtubeResource: "HTML5 Form Validation & Accessibility Tutorial (Traversy Media)",
              youtubeUrl: "https://www.youtube.com/results?search_query=HTML5+Form+Validation+Accessibility+Traversy+Media"
            }
          ],
          practiceMilestone: "Build a semantic, fully validated multi-step student registration form without any JavaScript validation."
        },
        {
          stageNumber: 2,
          stageTitle: "Stage 2: Web Accessibility (a11y) & SEO Architecture",
          stageGoal: "Ensure your web apps are usable by anyone with assistive technologies and rank high on search engines.",
          concepts: [
            {
              name: "WCAG Accessibility & ARIA Roles",
              explanation: "Making pages accessible to screen readers through WAI-ARIA standards and accessible naming.",
              keyTopicsToMaster: ["aria-label, aria-labelledby, and aria-describedby", "Keyboard navigability & tabIndex (0, -1)", "Image alt text best practices for screen readers"],
              commonMistake: "Using <div onClick=...> instead of a semantic <button>, preventing keyboard navigation via Enter/Space.",
              youtubeResource: "Web Accessibility (a11y) & ARIA Tutorial (Fireship)",
              youtubeUrl: "https://www.youtube.com/results?search_query=Web+Accessibility+a11y+ARIA+Fireship"
            },
            {
              name: "Technical SEO & Open Graph Meta Tags",
              explanation: "Providing structured metadata to search crawlers and social media platforms (Twitter/LinkedIn cards).",
              keyTopicsToMaster: ["Viewport, charset, description, and canonical tags", "Open Graph (og:title, og:image, og:description)", "JSON-LD structured data schema basics"],
              commonMistake: "Missing viewport meta tag, causing mobile devices to render desktop layouts with broken scaling.",
              youtubeResource: "Technical SEO & Open Graph Meta Tags Guide (Google Search Central)",
              youtubeUrl: "https://www.youtube.com/results?search_query=Technical+SEO+Open+Graph+Meta+Tags+tutorial"
            }
          ],
          practiceMilestone: "Audit a webpage with Google Lighthouse and achieve a 100/100 Accessibility & SEO score."
        },
        {
          stageNumber: 3,
          stageTitle: "Stage 3: Advanced Media, Storage & Performance",
          stageGoal: "Master modern browser media APIs, offline storage, and critical rendering path optimization.",
          concepts: [
            {
              name: "Responsive Media & Modern Image Formats",
              explanation: "Serving modern image formats and responsive image sets to cut bandwidth by 60%+.",
              keyTopicsToMaster: ["<picture> element with WebP/AVIF formats", "srcset and sizes attributes for resolution switching", "Native lazy loading (loading='lazy')"],
              commonMistake: "Serving a 4MB 4K banner image to mobile devices on 4G networks instead of responsive srcset.",
              youtubeResource: "Responsive Images & Modern WebP Formats (Kevin Powell)",
              youtubeUrl: "https://www.youtube.com/results?search_query=Responsive+Images+srcset+Kevin+Powell"
            },
            {
              name: "Browser DOM & Critical Rendering Path",
              explanation: "Understanding how the browser translates raw HTML bytes into DOM trees and pixels on the screen.",
              keyTopicsToMaster: ["HTML parsing, tokenizer, and DOM construction", "Script execution blocking vs async vs defer attributes", "Web Storage API (localStorage, sessionStorage, cookies)"],
              commonMistake: "Placing heavy synchronous script tags in <head> without 'defer', blocking first contentful paint (FCP).",
              youtubeResource: "How Browsers Work: DOM & Critical Rendering Path (Google Chrome Developers)",
              youtubeUrl: "https://www.youtube.com/results?search_query=How+Browsers+Work+DOM+Critical+Rendering+Path"
            }
          ],
          practiceMilestone: "Build a high-performance, accessible Portfolio landing page with 95+ Core Web Vitals score."
        }
      ],
      curatedResources: [
        {
          name: "MDN Web Docs - HTML Structure & a11y",
          type: "Official Docs",
          url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
          description: "The world's gold standard reference for every HTML element, attribute, and modern best practice."
        },
        {
          name: "web.dev - Learn HTML by Google",
          type: "Interactive Course",
          url: "https://web.dev/learn/html",
          description: "Google's deep dive course covering modern semantic HTML, accessibility, and performance."
        },
        {
          name: "W3C Web Accessibility Initiative (WAI)",
          type: "Official Docs",
          url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
          description: "Official guide on WCAG compliance and building accessible digital products."
        }
      ],
      interviewQuestions: [
        {
          question: "What is the difference between <script>, <script async>, and <script defer>?",
          idealAnswerKeypoints: "Regular script blocks HTML parsing during fetch & execution. Async fetches in parallel and executes immediately once fetched (interrupting parser). Defer fetches in parallel and executes only after HTML parsing finishes in document order."
        },
        {
          question: "Why should you use semantic HTML over <div> tags for campus placement assessments?",
          idealAnswerKeypoints: "Semantic tags enhance accessibility for screen readers (WCAG), improve search engine indexing (SEO), streamline DOM maintainability, and signal software engineering maturity."
        }
      ],
      capstoneProject: {
        title: "Enterprise Product Documentation Portal",
        description: "A developer documentation site with accessible keyboard navigation, responsive media, dark/light theme persistence, and zero Lighthouse accessibility warnings.",
        featuresToInclude: [
          "Semantic layout (<header>, <nav>, <main>, <aside> with table of contents)",
          "Accessible modal dialog using native <dialog> element",
          "Responsive <picture> elements with WebP fallback",
          "100/100 Google Lighthouse Accessibility & SEO score"
        ]
      }
    };
  }

  // Default fallback for other topics (Instant load guaranteed)
  return {
    topic: topic,
    estimatedTime: "3-4 Weeks (8-10 hrs/week)",
    summary: `Mastering ${topic} from fundamentals to production best practices is critical for passing technical rounds at top product companies and MNCs.`,
    stages: [
      {
        stageNumber: 1,
        stageTitle: `Stage 1: ${topic} Core Foundations`,
        stageGoal: "Master core syntax, data types, and fundamental building blocks.",
        concepts: [
          {
            name: "Core Syntax & Mechanics",
            explanation: `Learn the essential syntax rules, variables, data structures, and standard libraries of ${topic}.`,
            keyTopicsToMaster: ["Variables, Scopes & Memory Model", "Conditionals, Loops & Control Flow", "Functions & Error Handling"],
            commonMistake: "Copying code snippets without understanding underlying memory allocation and scope resolution.",
            youtubeResource: `${topic} Full Course for Beginners (freeCodeCamp)`,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' full course for beginners freecodecamp')}`
          }
        ],
        practiceMilestone: `Solve 15 basic algorithmic problems and build a CLI or starter prototype using ${topic}.`
      },
      {
        stageNumber: 2,
        stageTitle: `Stage 2: Architecture & Clean Code in ${topic}`,
        stageGoal: "Write scalable, modular, and testable code following industry conventions.",
        concepts: [
          {
            name: "Object-Oriented & Modular Design",
            explanation: `Structure scalable software components, interfaces, and abstractions in ${topic}.`,
            keyTopicsToMaster: ["Design Patterns & SOLID principles", "Module management and dependencies", "Unit testing & Mocking"],
            commonMistake: "Writing monolithic spaghetti code without proper separation of concerns.",
            youtubeResource: `${topic} Design Patterns & SOLID Principles Tutorial`,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' design patterns solid principles tutorial')}`
          }
        ],
        practiceMilestone: `Build a modular full-stack or backend service with unit test coverage.`
      },
      {
        stageNumber: 3,
        stageTitle: `Stage 3: Advanced Performance & Placement Edge Cases`,
        stageGoal: `Optimize ${topic} for high throughput, low latency, and senior interview questions.`,
        concepts: [
          {
            name: "Optimization, Concurrency & Production Deployment",
            explanation: `Handle asynchronous execution, memory leaks, and production monitoring.`,
            keyTopicsToMaster: ["Asynchronous programming & Concurrency", "Profiling & Memory Optimization", "Docker Containerization & CI/CD"],
            commonMistake: "Failing to consider time and space complexities (Big-O) under heavy production loads.",
            youtubeResource: `Advanced ${topic} Performance Optimization & Production Deployment`,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('advanced ' + topic + ' performance optimization deployment')}`
          }
        ],
        practiceMilestone: `Deploy a production-ready application with automated testing and containerization.`
      }
    ],
    curatedResources: [
      {
        name: `${topic} Official Documentation`,
        type: "Official Docs",
        url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' official documentation')}`,
        description: `Official documentation and community guide for ${topic}.`
      },
      {
        name: "freeCodeCamp Curriculum",
        type: "Interactive Course",
        url: "https://www.freecodecamp.org",
        description: "Interactive projects and certifications from world-class developers."
      }
    ],
    interviewQuestions: [
      {
        question: `How does ${topic} handle concurrency and memory management?`,
        idealAnswerKeypoints: "Explain memory allocation (stack vs heap), garbage collection mechanisms, and event loop / threading models."
      }
    ],
    capstoneProject: {
      title: `Full-Featured ${topic} Production Showcase`,
      description: `A scalable project demonstrating clean architecture, error boundaries, performance benchmarks, and automated tests.`,
      featuresToInclude: [
        "Modular architecture with clear separation of business logic",
        "Comprehensive unit test suite",
        "Dockerized setup and deployment documentation"
      ]
    }
  };
}

/**
 * AI ATS Resume Scanner
 * Evaluates candidate's resume for Applicant Tracking Systems and tech recruiters.
 */
export const scanResumeWithAI = async ({ resumeData, targetRole = 'Full Stack Developer' }) => {
  const client = getGeminiClient();

  const fallbackResult = getFallbackResumeScan(resumeData, targetRole);

  if (!client) {
    return fallbackResult;
  }

  const prompt = `
You are an expert Fortune 500 Tech Recruiter & ATS (Applicant Tracking System) Algorithm Specialist.
Analyze the following candidate's resume for the target role: "${targetRole}".

Candidate Resume Details:
- Title: ${resumeData.title || 'Student / Engineer'}
- Summary: ${resumeData.summary || 'None provided'}
- Skills: ${resumeData.skills || 'None provided'}
- Experience: ${resumeData.experience || 'None provided'}
- Projects: ${resumeData.projects || 'None provided'}
- Education: ${resumeData.education || 'None provided'}

Output strictly valid JSON with this exact schema:
{
  "score": <number between 40 and 95 based on relevance, keyword match, and quantifiable metric impact>,
  "verdict": "<'Excellent Match' | 'Competitive' | 'Needs Optimization' | 'High Risk of Filter Rejection'>",
  "summaryFeedback": "<2-3 sentences analyzing the overall impact, tone, and ATS readability>",
  "missingKeywords": [
    "<High-frequency keyword recruiters filter for that is missing or weak in the resume>",
    "<Another missing keyword>",
    "<Another missing keyword>",
    "<Another missing keyword>",
    "<Another missing keyword>"
  ],
  "bulletImprovements": [
    {
      "originalBullet": "<A weak bullet from experience/projects or typical weak bullet if short>",
      "improvedBullet": "<Rewritten with strong action verb, tech stack, and quantifiable metric like '% improved' or 'users served'>",
      "reason": "<Why this change makes the ATS rank higher>"
    },
    {
      "originalBullet": "<Another bullet to improve>",
      "improvedBullet": "<Rewritten version>",
      "reason": "<Reason for improvement>"
    }
  ],
  "strengths": [
    "<Specific strong aspect of the candidate's resume>",
    "<Another positive point>"
  ],
  "atsFormattingTips": [
    "<Actionable ATS optimization tip (e.g. single-column layout, standard headers)>",
    "<Actionable tip on action verbs>"
  ]
}

DO NOT include markdown code fences or backticks. Return RAW JSON only.
`;

  try {
    const model = client.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    console.warn('Gemini ATS Scan error, serving high-fidelity fallback:', err);
    return fallbackResult;
  }
};

const getFallbackResumeScan = (resumeData, targetRole) => {
  const skillsText = (resumeData.skills || '').toLowerCase();
  const summaryText = (resumeData.summary || '').toLowerCase();
  const expText = (resumeData.experience || '').toLowerCase();

  let score = 72;
  const missing = [];

  if (!skillsText.includes('git')) missing.push('Git & GitHub Collaboration');
  if (!skillsText.includes('docker')) missing.push('Docker / Containerization');
  if (!skillsText.includes('test') && !expText.includes('test')) missing.push('Unit Testing (Jest / PyTest)');
  if (!skillsText.includes('api') && !expText.includes('rest')) missing.push('RESTful API Design & Integration');
  if (!skillsText.includes('sql') && !skillsText.includes('database')) missing.push('Relational Databases (PostgreSQL / MySQL)');
  if (!skillsText.includes('agile') && !expText.includes('scrum')) missing.push('Agile / Scrum Methodology');

  if (missing.length <= 2) score = 88;
  else if (missing.length <= 4) score = 76;
  else score = 65;

  return {
    score,
    verdict: score >= 80 ? "Competitive" : "Needs Optimization",
    summaryFeedback: `Your resume demonstrates good technical foundation for ${targetRole}, but needs stronger metric-driven accomplishments and standard ATS keyword density to pass automated screening filters.`,
    missingKeywords: missing.slice(0, 5),
    bulletImprovements: [
      {
        originalBullet: "Developed a React frontend for the internal dashboard.",
        improvedBullet: "Architected and delivered 12+ responsive React/Redux dashboard components, accelerating end-user query speed by 28%.",
        reason: "Uses strong action verb 'Architected' and highlights measurable impact ('28% speed')."
      },
      {
        originalBullet: "Built a full-stack e-commerce site using MERN stack.",
        improvedBullet: "Engineered scalable MERN e-commerce web application with Stripe payment gateways and JWT auth, handling 50+ concurrent mock transactions.",
        reason: "Specifies engineering details, security mechanisms, and scale metrics."
      }
    ],
    strengths: [
      "Clear, chronological layout with standard headings readable by all ATS parsers.",
      "Good inclusion of modern programming languages and relevant project work."
    ],
    atsFormattingTips: [
      "Ensure all skills are written in industry standard names (e.g. 'Node.js' instead of 'Node').",
      "Always quantify project outcomes using metrics (e.g. %, ms, lines of code, user count) to rank in the top 10% of ATS applicants."
    ]
  };
};

