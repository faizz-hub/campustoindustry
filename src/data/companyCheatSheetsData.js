// ============================================================================
// 50+ COMPANY PLACEMENT CHEAT SHEETS COMPREHENSIVE DATASET
// Covers Service MNCs, Product Giants, FinTech/Banks, and Core/Semiconductor
// ============================================================================

export const COMPANY_CATEGORIES = [
  "All (52)",
  "Service & Digital MNCs",
  "Tier-1 Product Giants",
  "FinTech & Banking",
  "Core & Semiconductor"
];

export const COMPANY_CHEAT_SHEETS = [
  // ==========================================================================
  // 1. SERVICE & DIGITAL MNCS (15 Companies)
  // ==========================================================================
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    category: 'Service & Digital MNCs',
    badge: 'NQT 2025/2026',
    packageTier: '₹3.36 LPA (Ninja) | ₹7.0 LPA (Digital) | ₹9.0 - 11.5 LPA (Prime)',
    eligibility: 'Minimum 60% or 6.0 CGPA throughout 10th, 12th & Degree. Maximum 1 active backlog permitted during registration.',
    accentColor: '#8b5cf6',
    rounds: [
      { roundNum: 'Round 1', title: 'Foundation Section (75 mins)', details: 'Numerical Ability (20 Qs), Reasoning Ability (20 Qs), Verbal Ability (25 Qs). Standard negative marking 0.25.' },
      { roundNum: 'Round 2', title: 'Advanced Section (Digital & Prime Qualifier, 90 mins)', details: 'Advanced Quantitative & Reasoning (15 Qs), Advanced Coding (2 problems in C, C++, Java, or Python).' },
      { roundNum: 'Round 3', title: 'Technical, Managerial & HR Round (30-45 mins)', details: 'Deep dive into your resume projects, OOPs concepts, SQL queries (JOINs), and situational leadership questions.' }
    ],
    repeatedTopics: [
      { category: 'Quantitative', topics: 'Time & Work, Profit & Loss, Logarithms, Permutations & Probability, Mixtures & Alligations.' },
      { category: 'Coding', topics: 'Prime number ranges & factors, String palindrome & anagrams, Matrix spiral print, Array rotation without extra space.' },
      { category: 'Tech Interview', topics: 'Difference between abstract class and interface, normalization forms (1NF-3NF), Garbage collection in Java/Python.' }
    ],
    proTips: [
      'Digital & Prime cutoffs require passing at least 1 full test case and all hidden test cases in Coding Round 2.',
      'Always prepare two technical project explanations: one high-level architecture overview and one challenging bug you solved.'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    category: 'Service & Digital MNCs',
    badge: 'InfiTQ & On-Campus',
    packageTier: '₹3.6 LPA (System Engineer) | ₹6.25 LPA (DSE) | ₹9.5 LPA (Specialist Programmer)',
    eligibility: '65%+ or 6.5 CGPA in 10th, 12th, and B.E/B.Tech with up to 1 backlog permitted.',
    accentColor: '#10b981',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Test (Pseudocode + Aptitude + Puzzle Solving)', details: 'Reasoning Ability (15 Qs), Mathematical Ability (10 Qs), Verbal (20 Qs), Pseudocode (5 Qs), Puzzle Solving (4 Qs).' },
      { roundNum: 'Round 2', title: 'Hands-on Coding (For DSE & SP roles, 3 hours)', details: '3 algorithmic problems covering Dynamic Programming, Greedy approaches, and Graph Theory (BFS/DFS).' },
      { roundNum: 'Round 3', title: 'Technical & HR Interview (30 mins)', details: 'Time complexity analysis (Big-O), code dry runs, and scenario-based problem solving.' }
    ],
    repeatedTopics: [
      { category: 'Pseudocode', topics: 'Bitwise XOR operations, short-circuit evaluation, recursion tree tracing.' },
      { category: 'Coding', topics: 'Longest Increasing Subsequence, 0/1 Knapsack variations, Minimum spanning tree, Dijkstra pathfinding.' },
      { category: 'Tech Interview', topics: 'Inheritance vs Composition, Method Overloading vs Overriding, Indexing mechanisms in B-Trees.' }
    ],
    proTips: [
      'Infosys online test sections are individually timed; you cannot navigate back to a previous section once submitted.',
      'Puzzle solving section awards high weightage; practice pattern grids and Sudoku-style deductions.'
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    category: 'Service & Digital MNCs',
    badge: 'GenC & Next',
    packageTier: '₹4.0 LPA (GenC) | ₹5.4 LPA (GenC Elevate) | ₹6.75 LPA (GenC Next)',
    eligibility: 'Minimum 60% in 10th, 12th & Graduation. No active backlogs at time of selection.',
    accentColor: '#3b82f6',
    rounds: [
      { roundNum: 'Round 1', title: 'Communication & Aptitude Assessment', details: 'Listening comprehension, reading aloud, and quantitative/logical reasoning.' },
      { roundNum: 'Round 2', title: 'Automata Fix & Coding (70 mins)', details: '7 debugging questions (fix syntax and logical bugs in 20 mins) + 2 standard coding problems.' },
      { roundNum: 'Round 3', title: 'Technical & HR Interview', details: 'Questions on SDLC (Agile vs Waterfall), DBMS indexes, basic Cloud concepts, and resume projects.' }
    ],
    repeatedTopics: [
      { category: 'Automata Fix', topics: 'Array indexing out-of-bounds fixes, off-by-one loop errors, missing null termination in strings.' },
      { category: 'Coding', topics: 'Remove duplicates from sorted arrays, count vowel permutations, binary search implementations.' },
      { category: 'Tech Interview', topics: 'Primary key vs Unique key, ACID properties, Difference between SQL and NoSQL databases.' }
    ],
    proTips: [
      'For Automata Fix, do not rewrite the entire algorithm — only correct the 1-2 errant lines to save time.',
      'Speak clearly and confidently in the Communication round; AI voice speech models grade pronunciation and fluency.'
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    category: 'Service & Digital MNCs',
    badge: 'Elite & Turbo',
    packageTier: '₹3.5 LPA (Elite) | ₹6.5 LPA (Turbo) | ₹8.0 LPA (Velocity)',
    eligibility: '60% throughout 10th, 12th and Graduation. Up to 1 backlog permitted at registration.',
    accentColor: '#06b6d4',
    rounds: [
      { roundNum: 'Round 1', title: 'National Level Assessment (NLTH, 128 mins)', details: 'English (20 min), Quantitative (20 min), Logical Reasoning (20 min), Written Communication Essay (20 min), Coding (2 Qs, 48 min).' },
      { roundNum: 'Round 2', title: 'Technical Interview (20-30 mins)', details: 'Basics of C/C++/Java, DBMS basics, and final year project walk-through.' },
      { roundNum: 'Round 3', title: 'HR & Location Readiness', details: 'Willingness to relocate, work in 24/7 rotational shifts, and communication skills.' }
    ],
    repeatedTopics: [
      { category: 'Essay Writing', topics: 'AI impact on jobs, renewable energy, remote work culture. (Evaluated by automated grammar tools).' },
      { category: 'Coding', topics: 'GCD of array, string vowels count, Fibonacci matrix multiplication, armstrong numbers.' },
      { category: 'Tech Interview', topics: 'Static keyword in Java, pointers in C, primary vs foreign key constraints.' }
    ],
    proTips: [
      'The Essay round is strictly evaluated by an automated grammar bot: ensure 0 spelling mistakes, standard punctuation, and a clean 3-paragraph structure.',
      'Turbo qualifier test tests Medium DSA; practice sliding window and HashMaps.'
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    category: 'Service & Digital MNCs',
    badge: 'ASE & FSE Hiring',
    packageTier: '₹4.5 LPA (Associate Software Engineer) | ₹6.5 - 8.5 LPA (Adv ASE)',
    eligibility: '65% or 6.5 CGPA with no active backlogs. All engineering disciplines eligible.',
    accentColor: '#a855f7',
    rounds: [
      { roundNum: 'Round 1', title: 'Cognitive & Technical Assessment (90 mins)', details: 'Cognitive: English, Critical Thinking, Abstract Reasoning (50 Qs). Technical: Common Apps, MS Office, Pseudocode, Network Security (40 Qs).' },
      { roundNum: 'Round 2', title: 'Coding Assessment (45 mins)', details: '2 mandatory coding problems in C/C++/Java/Python/DotNet. Elimination round.' },
      { roundNum: 'Round 3', title: 'Communication Assessment (Virtual, 30 mins)', details: 'Sentence mastery, vocabulary, fluency, and pronunciation graded by Pearson AI voice model.' },
      { roundNum: 'Round 4', title: 'Virtual Interview (20-30 mins)', details: 'Tech + HR questions based on your resume and scenario questions.' }
    ],
    repeatedTopics: [
      { category: 'Pseudocode', topics: 'Bitwise bit shifts, XOR toggling, recursive return values, array indexing puzzles.' },
      { category: 'Coding', topics: 'Array binary operations, string replacement, matrix difference, sum of odd/even elements.' },
      { category: 'Tech Interview', topics: 'Cloud computing models (IaaS/PaaS/SaaS), SDLC stages, differences between list and tuple.' }
    ],
    proTips: [
      'Accenture uses Pearson AI for Communication Assessment. Wear a quiet noise-cancelling headset and enunciate every syllable cleanly.',
      'Coding assessment test cases are strict on time complexity; avoid nested loops when O(N) HashMaps suffice.'
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    category: 'Service & Digital MNCs',
    badge: 'Exceller Program',
    packageTier: '₹4.25 LPA (Analyst) | ₹5.75 LPA (Senior Analyst) | ₹7.5 LPA (Associate Consultant)',
    eligibility: '60% or 6.0 CGPA throughout 10th, 12th & Graduation. Max 1 year education gap permitted.',
    accentColor: '#0ea5e9',
    rounds: [
      { roundNum: 'Round 1', title: 'Technical Assessment (Pseudocode & MCQ)', details: 'Pseudocode (30 mins), English Communication MCQ (30 mins).' },
      { roundNum: 'Round 2', title: 'Game-Based Aptitude (24 mins, 4 Games)', details: 'Deductive reasoning, grid challenges, motion challenges, and inductive logic games.' },
      { roundNum: 'Round 3', title: 'Spoken English & Behavioral Assessment', details: 'Listening, repeat sentence, and situational leadership questions.' },
      { roundNum: 'Round 4', title: 'Technical & HR Interview (30 mins)', details: 'Core CS concepts, projects, and situational HR.' }
    ],
    repeatedTopics: [
      { category: 'Game Aptitude', topics: 'Switch Challenge (deducing symbol rules), Digit Challenge (mental math operators), Motion Challenge (minimum ball moves).' },
      { category: 'Pseudocode', topics: 'C/C++ nested loops, conditional logic branches, recursion depth tracing.' },
      { category: 'Interview', topics: 'Polymorphism real-world example, SQL Aggregate functions, REST API methods (GET/POST/PUT).' }
    ],
    proTips: [
      'Capgemini Game-Based Aptitude is unique: practice Grid and Switch challenge puzzles online before the exam to understand symbol permutations.',
      'Maintain steady speed in the games; accuracy counts more than frantic clicking.'
    ]
  },
  {
    id: 'hcl',
    name: 'HCLTech',
    category: 'Service & Digital MNCs',
    badge: 'First Careers & Campus',
    packageTier: '₹4.25 LPA (Graduate Trainee) | ₹6.5 LPA (SuperCoder)',
    eligibility: '65%+ in Degree, 60%+ in 10th & 12th. CS/IT, ECE, EEE and allied branches.',
    accentColor: '#2563eb',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Aptitude & Tech Assessment', details: 'Quantitative, Reasoning, Verbal, and Core CS MCQs (Operating Systems, DBMS, Networking).' },
      { roundNum: 'Round 2', title: 'Coding Round (60 mins, 2 Problems)', details: 'Array algorithms, String manipulations, and Linked List operations.' },
      { roundNum: 'Round 3', title: 'Technical Interview (30 mins)', details: 'Live coding problem walk-through and foundational concepts.' },
      { roundNum: 'Round 4', title: 'HR Round', details: 'Communication check, career goals, and onboarding readiness.' }
    ],
    repeatedTopics: [
      { category: 'Quantitative', topics: 'Speed & Time, Boats & Streams, Simple & Compound Interest, Logarithms.' },
      { category: 'Coding', topics: 'Reverse linked list, Find peak element, Count set bits, Valid parentheses.' },
      { category: 'Tech Interview', topics: 'OS virtual memory, Deadlock 4 conditions, OSI model 7 layers, Normalization.' }
    ],
    proTips: [
      'Review Networking fundamentals (TCP vs UDP, DNS lookup flow) — HCL interviewers frequently probe infrastructure basics.'
    ]
  },
  {
    id: 'tech_mahindra',
    name: 'Tech Mahindra',
    category: 'Service & Digital MNCs',
    badge: 'SuperCoder & Associate',
    packageTier: '₹3.6 LPA (Associate) | ₹5.5 LPA (Elevate) | ₹7.0 LPA (SuperCoder)',
    eligibility: '60% or 6.0 CGPA across academics. All engineering disciplines welcome.',
    accentColor: '#dc2626',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Aptitude & Psychometric Test', details: 'Logical reasoning, verbal ability, and personality traits matching.' },
      { roundNum: 'Round 2', title: 'Technical & Essay Writing Round', details: 'Core computing concepts MCQ + Essay writing.' },
      { roundNum: 'Round 3', title: 'SuperCoder Coding Challenge', details: '2 algorithmic problems for higher package consideration.' },
      { roundNum: 'Round 4', title: 'Tech + HR Combined Interview', details: 'Resume project discussion and cultural fitment.' }
    ],
    repeatedTopics: [
      { category: 'Logical', topics: 'Blood relations, seating arrangements, coding-decoding, number analogies.' },
      { category: 'Coding', topics: 'Matrix multiplication, array frequency map, palindrome strings, anagram groups.' },
      { category: 'Tech Interview', topics: 'Java memory model, Python decorators, SQL inner vs outer joins.' }
    ],
    proTips: [
      'In psychometric round, be consistent with your answers; repeated cross-checking questions will flag discrepancies.'
    ]
  },
  {
    id: 'ltimindtree',
    name: 'LTIMindtree',
    category: 'Service & Digital MNCs',
    badge: 'IGNITE & EDGE',
    packageTier: '₹4.0 LPA (Graduate Engineer) | ₹6.5 LPA (EDGE Specialist)',
    eligibility: '60% or 6.0 CGPA with no standing arrears.',
    accentColor: '#16a34a',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (120 mins)', details: 'Quantitative, Logical, Verbal, Technical MCQs (Data Structures, DBMS, Cloud), and 1-2 Coding questions.' },
      { roundNum: 'Round 2', title: 'Spoken English Assessment', details: 'Automated fluency and listening test.' },
      { roundNum: 'Round 3', title: 'Technical Interview', details: 'Problem solving on whiteboard/notepad, project architecture, and OOPs concepts.' },
      { roundNum: 'Round 4', title: 'HR Round', details: 'Behavioral, teamwork scenarios, and relocation flexibility.' }
    ],
    repeatedTopics: [
      { category: 'Tech MCQ', topics: 'Binary tree traversals (Inorder/Preorder), SQL subqueries, Time complexity comparisons.' },
      { category: 'Coding', topics: 'Two Pointer technique, Subarray with given sum, Merge overlapping intervals.' },
      { category: 'Interview', topics: 'Difference between HashMap and TreeMap, React component lifecycle, indexing pros/cons.' }
    ],
    proTips: [
      'Focus on clean coding principles (KISS, DRY) during the interview — they value code readability and modular methods.'
    ]
  },
  {
    id: 'persistent',
    name: 'Persistent Systems',
    category: 'Service & Digital MNCs',
    badge: 'Campus Drive',
    packageTier: '₹4.75 LPA to ₹7.5 LPA',
    eligibility: 'Minimum 60% in 10th, 12th & Graduation. B.E/B.Tech (CS, IT, ECE).',
    accentColor: '#f97316',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Quantitative, Logical, Computer Science fundamentals (OS, DBMS, Computer Networks), and 2 Coding questions.' },
      { roundNum: 'Round 2', title: 'Advanced Coding Test (60 mins)', details: 'Graph algorithms, Trees, and Dynamic Programming.' },
      { roundNum: 'Round 3', title: 'Technical Interview (45 mins)', details: 'Deep architectural dive into final year project, live algorithm coding.' },
      { roundNum: 'Round 4', title: 'HR Round (15 mins)', details: 'Culture fit and company values.' }
    ],
    repeatedTopics: [
      { category: 'CS Fundamentals', topics: 'Deadlock avoidance (Banker algorithm), Paging and segmentation, TCP 3-way handshake.' },
      { category: 'Coding', topics: 'Level order traversal, Detect cycle in directed graph, Longest common subsequence.' },
      { category: 'Interview', topics: 'Microservices vs Monolithic architecture, Dependency Injection, Docker container lifecycle.' }
    ],
    proTips: [
      'Persistent Systems places huge emphasis on Computer Science core fundamentals. Revise OS process sync and DBMS transactions thoroughly.'
    ]
  },
  {
    id: 'hexaware',
    name: 'Hexaware Technologies',
    category: 'Service & Digital MNCs',
    badge: 'Premier & Pega Graduate',
    packageTier: '₹4.0 LPA (Standard) | ₹6.0 LPA (Pega / Cloud) | ₹8.5 LPA (Premier)',
    eligibility: '60% throughout 10th, 12th, and Degree. Max 1 active backlog at application.',
    accentColor: '#84cc16',
    rounds: [
      { roundNum: 'Round 1', title: 'Aptitude & Technical MCQs', details: 'Quant, Logical, Verbal, and Domain specific MCQs.' },
      { roundNum: 'Round 2', title: 'Coding Round', details: '2 Medium difficulty coding problems.' },
      { roundNum: 'Round 3', title: 'Communication Assessment (Mettl/Versant)', details: 'Reading, listening, and repetition test.' },
      { roundNum: 'Round 4', title: 'Technical & HR Interview', details: 'Problem walkthrough, resume projects, and career aspirations.' }
    ],
    repeatedTopics: [
      { category: 'Aptitude', topics: 'Permutation & Combination, Probability, Data Interpretation graphs.' },
      { category: 'Coding', topics: 'String anagrams, Balanced parentheses, Array rotation, Matrix boundary traversal.' },
      { category: 'Interview', topics: 'Exception handling hierarchy in Java/Python, MVC pattern, SQL GROUP BY vs HAVING.' }
    ],
    proTips: [
      'If you have knowledge of Cloud (AWS/Azure) or Low-Code platforms (Pega/Salesforce), mention it early to qualify for higher package tiers.'
    ]
  },
  {
    id: 'virtusa',
    name: 'Virtusa',
    category: 'Service & Digital MNCs',
    badge: 'Neural Hack Contest',
    packageTier: '₹4.5 LPA (Associate) | ₹6.5 LPA (Neural Hack Winner)',
    eligibility: '65%+ in Graduation, 60%+ in 10th & 12th. No standing backlogs.',
    accentColor: '#14b8a6',
    rounds: [
      { roundNum: 'Round 1', title: 'National Coding Contest / Online Test', details: 'MCQs on CS fundamentals + 2 Full-stack coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Hackathon / Machine Round', details: 'Hands-on project prototyping or complex data structure implementation.' },
      { roundNum: 'Round 3', title: 'Technical HR Interview', details: 'Code review, project explanation, and system design basics.' },
      { roundNum: 'Round 4', title: 'HR Round', details: 'Behavioral and cultural readiness.' }
    ],
    repeatedTopics: [
      { category: 'Coding', topics: 'Topological sort, Dijkstra algorithm, Trie prefix search, Dynamic programming grid paths.' },
      { category: 'Full Stack', topics: 'REST API architecture, JWT authentication flow, Database schema indexing.' },
      { category: 'Interview', topics: 'SOLID design principles, Thread pools in Java, Asynchronous promises in JavaScript.' }
    ],
    proTips: [
      'Virtusa Neural Hack is a great backdoor: winning or reaching finals guarantees direct interview calls for top tier packages.'
    ]
  },
  {
    id: 'mphasis',
    name: 'Mphasis',
    category: 'Service & Digital MNCs',
    badge: 'Graduate Hiring',
    packageTier: '₹4.0 LPA to ₹5.5 LPA',
    eligibility: '60% throughout academics. B.E/B.Tech CS, IT, ECE, EEE.',
    accentColor: '#e11d48',
    rounds: [
      { roundNum: 'Round 1', title: 'AMCAT / SVAR Aptitude Test', details: 'Quantitative, Logical Reasoning, Verbal, and Computer Programming MCQs.' },
      { roundNum: 'Round 2', title: 'SVAR Voice Assessment', details: 'Speech clarity, fluency, and sentence repetition.' },
      { roundNum: 'Round 3', title: 'Technical Interview', details: 'Object Oriented Programming, Database queries, and project debugging.' },
      { roundNum: 'Round 4', title: 'HR Interview', details: 'Relocation, work ethic, and behavioral fit.' }
    ],
    repeatedTopics: [
      { category: 'Quantitative', topics: 'Percentages, Ratio & Proportion, Averages, Profit & Loss.' },
      { category: 'Coding', topics: 'Array element frequency, String reverse without library, Prime factorization.' },
      { category: 'Interview', topics: 'Polymorphism (compile time vs runtime), Encapsulation, SQL Constraints.' }
    ],
    proTips: [
      'AMCAT programming section tests memory allocation concepts (stack vs heap). Review pointers and reference variables.'
    ]
  },
  {
    id: 'birlasoft',
    name: 'Birlasoft',
    category: 'Service & Digital MNCs',
    badge: 'Analyst Trainee',
    packageTier: '₹3.6 LPA to ₹4.5 LPA',
    eligibility: '60% in 10th, 12th & Graduation. Max 1 backlog allowed.',
    accentColor: '#059669',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Quantitative, Reasoning, Verbal, Computer Fundamentals, and Coding (1 problem).' },
      { roundNum: 'Round 2', title: 'Technical Interview (25 mins)', details: 'Basic programming concepts in C/Java/Python, SQL syntax, and final year project.' },
      { roundNum: 'Round 3', title: 'HR Round (15 mins)', details: 'Communication skills and company values.' }
    ],
    repeatedTopics: [
      { category: 'Aptitude', topics: 'Time and Distance, Syllogisms, Sentence Correction, Blood Relations.' },
      { category: 'Coding', topics: 'Find second largest element, Check palindrome, Matrix transpose.' },
      { category: 'Interview', topics: 'Differences between C++ and Java, SQL DDL vs DML commands, GitHub commands.' }
    ],
    proTips: [
      'Show confidence in SQL queries — writing clean JOINs and GROUP BY queries on the spot usually clinches the offer.'
    ]
  },
  {
    id: 'dxc',
    name: 'DXC Technology',
    category: 'Service & Digital MNCs',
    badge: 'Associate Professional',
    packageTier: '₹4.0 LPA to ₹5.0 LPA',
    eligibility: '60% or 6.0 CGPA across academics. No standing backlogs.',
    accentColor: '#7c3aed',
    rounds: [
      { roundNum: 'Round 1', title: 'Aptitude + Automata Coding (100 mins)', details: 'Numerical, Reasoning, English, Computer Science MCQs, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview (30 mins)', details: 'Live coding explanation, database normalization, and OOPs principles.' },
      { roundNum: 'Round 3', title: 'HR Discussion', details: 'Shift readiness, relocation, and career roadmap.' }
    ],
    repeatedTopics: [
      { category: 'Aptitude', topics: 'Probability, Coding-decoding, Analogies, Sentence completion.' },
      { category: 'Coding', topics: 'Array duplicates removal, String compression, Binary search in sorted array.' },
      { category: 'Interview', topics: 'Difference between process and thread, Indexing in databases, Inheritance types.' }
    ],
    proTips: [
      'DXC values calm, clear communication. Practice speaking your thought process aloud before writing code.'
    ]
  },

  // ==========================================================================
  // 2. TIER-1 PRODUCT & TECH GIANTS (13 Companies)
  // ==========================================================================
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    category: 'Tier-1 Product Giants',
    badge: 'Product Hiring',
    packageTier: '₹5.6 LPA to ₹8.5 LPA (Software Developer & QA)',
    eligibility: 'Open to all engineering & arts branches! No strict percentage or CGPA cutoff. Pure problem-solving evaluation.',
    accentColor: '#ef4444',
    rounds: [
      { roundNum: 'Round 1', title: 'General Aptitude & C/C++ Programming Flow (90 mins)', details: 'Pointers, recursion, output guessing for nested loops, bitwise operations, and quantitative reasoning.' },
      { roundNum: 'Round 2', title: 'Basic Programming Round (5-7 Problems, 2-3 hours)', details: 'String manipulation, array transformation, patterns, and number series without using built-in libraries.' },
      { roundNum: 'Round 3', title: 'Advanced Programming / Machine Coding Round (3 hours)', details: 'Building console applications: Railway Reservation System, Splitwise, Taxi Booking, or Maze Solver with full OOP design.' },
      { roundNum: 'Round 4 & 5', title: 'Technical HR & General HR Rounds', details: 'Explaining your machine coding design choices, data structure selection, and cultural alignment.' }
    ],
    repeatedTopics: [
      { category: 'C / Flow Analysis', topics: 'Pointer arithmetic, pre/post increment inside loops, recursive function call stack outputs.' },
      { category: 'Coding', topics: 'Zig-zag pattern printing, String compression (e.g. a1b2c3), Longest substring without repeating characters, Matrix rotation.' },
      { category: 'Design', topics: 'Clean OOP classes without global variables, handling corner validation cases cleanly.' }
    ],
    proTips: [
      'Zoho strictly forbids built-in collection libraries (no C++ STL, no Java Collections). You must write custom logic for queues or linked lists if needed.',
      'Prioritize code cleanliness, meaningful variable names, and modular methods in Round 3.'
    ]
  },
  {
    id: 'google',
    name: 'Google',
    category: 'Tier-1 Product Giants',
    badge: 'Code With Google / STEP',
    packageTier: '₹22 LPA to ₹35+ LPA (Base + Stocks + Bonus)',
    eligibility: 'Open to all branches. Strong Data Structures and Algorithms background required.',
    accentColor: '#ea4335',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Coding Challenge (90 mins)', details: '2 Algorithmic problems on Google hiring platform (LeetCode Hard level).' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'Data structures, algorithm optimization, and time/space complexity analysis on Google Docs.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'Graph algorithms, dynamic programming, or tree balancing.' },
      { roundNum: 'Round 4', title: 'Technical Interview 3 (45 mins)', details: 'Complex problem solving and edge case handling.' },
      { roundNum: 'Round 5', title: 'Googliness & Leadership (45 mins)', details: 'Hypothetical scenarios, ethics, teamwork, and navigating ambiguity.' }
    ],
    repeatedTopics: [
      { category: 'Algorithms', topics: 'Dijkstra, Bellman-Ford, Segment Trees, Trie with wildcard search, Dynamic Programming with bitmasking.' },
      { category: 'Data Structures', topics: 'Monotonic Stack, Priority Queue, Disjoint Set Union (DSU), Custom LRU Cache.' },
      { category: 'Googliness', topics: 'Handling disagreements with teammates, managing tight deadlines, ethical decision making.' }
    ],
    proTips: [
      'Google expects you to communicate your thought process before writing a single line of code. Ask clarifying questions on constraints (e.g. integer limits, negative values).'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Tier-1 Product Giants',
    badge: 'Engage / Campus SDE',
    packageTier: '₹18 LPA to ₹30+ LPA',
    eligibility: '7.0+ CGPA with no active backlogs. B.Tech/M.Tech (CS, IT, ECE, EE).',
    accentColor: '#00a4ef',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins, 3 Qs)', details: 'Codility platform. Array manipulations, Tree traversals, Dynamic programming.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45-60 mins)', details: 'Core DSA live coding on Microsoft Teams + time complexity proofs.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45-60 mins)', details: 'Advanced problem solving, System Design basics, and OS concepts.' },
      { roundNum: 'Round 4', title: 'AA (As Appropriate / Partner) Round', details: 'Cultural fit, past projects, system architecture, and leadership principles.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Binary Search on answer space, Reverse Nodes in k-Group, Word Break DP, Lowest Common Ancestor (LCA).' },
      { category: 'Core CS', topics: 'Memory management, Virtual tables in C++, Cache coherence, Thread synchronization.' },
      { category: 'Design', topics: 'Design URL Shortener, Design Parking Lot using OOP.' }
    ],
    proTips: [
      'Microsoft loves bug-free production-ready code. Always test your code mentally against null inputs, single-element arrays, and overflow constraints.'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Tier-1 Product Giants',
    badge: 'Amazon WOW & Campus',
    packageTier: '₹16 LPA to ₹28+ LPA',
    eligibility: '6.5+ CGPA with no active arrears. All branches eligible.',
    accentColor: '#ff9900',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (OA1 + OA2)', details: 'Debugging (7 Qs in 20 min), Coding (2 Qs in 70 min), Work Style Assessment (16 Leadership Principles).' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: '1-2 DSA coding questions + 2 Amazon Leadership Principle (LP) behavioral questions.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Data structure optimization (Trees/Graphs/Heaps) + 2 LP questions.' },
      { roundNum: 'Round 4', title: 'Bar Raiser Round (60 mins)', details: 'Strict evaluation on Customer Obsession, Ownership, and scalable architecture.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Top K Frequent Elements, Course Schedule (Graph Cycle), Trapping Rain Water, Rotten Oranges BFS.' },
      { category: 'Leadership Principles', topics: 'Customer Obsession, Ownership, Bias for Action, Disagree and Commit, Dive Deep.' },
      { category: 'Design', topics: 'Design Amazon Locker, Design Shopping Cart system.' }
    ],
    proTips: [
      '50% of Amazon interview evaluation is based on Leadership Principles! Prepare 2-3 stories using the STAR method (Situation, Task, Action, Result) for every LP.'
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe',
    category: 'Tier-1 Product Giants',
    badge: 'SheCodes & Campus MTS',
    packageTier: '₹20 LPA to ₹32+ LPA',
    eligibility: '7.5+ CGPA in B.Tech/M.Tech (CS, IT, ECE, Mathematics).',
    accentColor: '#fa0f00',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (120 mins)', details: 'Aptitude, Core CS MCQs, and 2 hard algorithmic coding questions on HackerRank.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Data structures, Trees, Graph theory, and String algorithms (KMP, Rabin-Karp).' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Operating Systems internals, Pointers, Memory leaks, and System Design.' },
      { roundNum: 'Round 4', title: 'Director / HR Round (45 mins)', details: 'Project deep dive, passion for graphics/multimedia/cloud, and culture fit.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Median of Two Sorted Arrays, Maximum Subarray Sum in Circular Array, Trie autocomplete.' },
      { category: 'Core CS', topics: 'Virtual memory paging, Fork bomb prevention, Mutex vs Semaphore, Cache eviction.' },
      { category: 'Mathematics', topics: 'Probability, Geometry algorithms (Convex Hull), Matrix transformations.' }
    ],
    proTips: [
      'Adobe loves candidates with strong mathematical and algorithmic maturity. Brush up on coordinate geometry and bitwise tricks.'
    ]
  },
  {
    id: 'oracle',
    name: 'Oracle',
    category: 'Tier-1 Product Giants',
    badge: 'Server Tech & Cloud',
    packageTier: '₹14 LPA to ₹20+ LPA',
    eligibility: '7.0+ CGPA throughout academics. CS, IT, ECE.',
    accentColor: '#c74634',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (105 mins)', details: 'Coding (2 Qs), Core CS (OS, DBMS, Computer Networks, Software Engineering), Quant & Logic.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'Data structures (LinkedList, Trees), SQL joins and query optimization.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'System Design, Concurrency, multithreading, and resume projects.' },
      { roundNum: 'Round 4', title: 'HR Round (30 mins)', details: 'Behavioral, career roadmap, and company knowledge.' }
    ],
    repeatedTopics: [
      { category: 'DBMS', topics: 'B-Tree & B+ Tree indexing, ACID transactions, WAL (Write Ahead Logging), Deadlock handling in databases.' },
      { category: 'DSA', topics: 'Serialize and Deserialize Binary Tree, Merge K Sorted Lists, LRU Cache.' },
      { category: 'OS', topics: 'Process scheduling algorithms, Virtual memory, File system allocation.' }
    ],
    proTips: [
      'Oracle heavily tests DBMS internals (how indexes work on disk, buffer pool management). Prepare database storage architectures well.'
    ]
  },
  {
    id: 'cisco',
    name: 'Cisco',
    category: 'Tier-1 Product Giants',
    badge: 'Ideathon & Campus',
    packageTier: '₹15 LPA to ₹24+ LPA',
    eligibility: '7.0+ CGPA in B.Tech CS, IT, ECE, EEE. No active backlogs.',
    accentColor: '#1ba0d7',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Aptitude, Computer Networking MCQs, Operating Systems MCQs, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Deep dive into Networking protocols (TCP/IP, BGP, OSPF), C/C++ memory management, and DSA.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'Socket programming, multithreading, and project architecture.' },
      { roundNum: 'Round 4', title: 'Managerial & HR Round (45 mins)', details: 'Cisco culture, collaboration, and ethical problem solving.' }
    ],
    repeatedTopics: [
      { category: 'Networking', topics: 'Subnetting, TCP 3-way handshake & 4-way termination, DNS resolution, ARP, VLANs, HTTP vs HTTPS.' },
      { category: 'DSA', topics: 'Subarray sum equals K, Tree diameter, Graph BFS/DFS, Bit manipulation.' },
      { category: 'Systems', topics: 'Socket creation in C, select() vs poll() vs epoll(), Memory alignment.' }
    ],
    proTips: [
      'Network subnetting and packet lifecycle are mandatory for Cisco. Be prepared to explain exactly what happens from typing a URL to rendering the packet on screen.'
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    category: 'Tier-1 Product Giants',
    badge: 'Graduate SDE Hiring',
    packageTier: '₹25 LPA to ₹40+ LPA (Base + RSUs)',
    eligibility: '7.5+ CGPA with strong problem solving skills.',
    accentColor: '#0052cc',
    rounds: [
      { roundNum: 'Round 1', title: 'HackerRank Online Assessment (90 mins)', details: '3 Algorithmic problems (Medium to Hard level).' },
      { roundNum: 'Round 2', title: 'Coding Round (60 mins)', details: 'Clean modular coding with unit test cases and separation of concerns.' },
      { roundNum: 'Round 3', title: 'System Design / Architecture Round (60 mins)', details: 'Low Level Design (LLD) with OOP design patterns (Factory, Observer, Strategy).' },
      { roundNum: 'Round 4', title: 'Values & Leadership Round (45 mins)', details: 'Open company no bullshit, Build with heart and balance, Don\'t #@!% the customer.' }
    ],
    repeatedTopics: [
      { category: 'LLD', topics: 'Design Rate Limiter, Design File System, Design In-Memory Key-Value Store with TTL.' },
      { category: 'DSA', topics: 'Sliding Window Maximum, Word Ladder, Longest Valid Parentheses, Minimum Window Substring.' },
      { category: 'Atlassian Values', topics: 'Specific examples where you took accountability, learned from a failure, or challenged the status quo.' }
    ],
    proTips: [
      'Atlassian judges clean coding standards above all. Write self-documenting methods, avoid monolithic functions, and validate edge cases.'
    ]
  },
  {
    id: 'uber',
    name: 'Uber',
    category: 'Tier-1 Product Giants',
    badge: 'Uber HackTag & Campus',
    packageTier: '₹24 LPA to ₹38+ LPA',
    eligibility: '7.0+ CGPA. All branches eligible.',
    accentColor: '#000000',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (Codesignal, 70 mins)', details: '4 Coding problems with tight execution time constraints.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Data structures & Algorithms (Graph traversals, Dynamic programming).' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Concurrency, Thread-safe data structures, or Low Level Design.' },
      { roundNum: 'Round 4', title: 'Managerial & Cultural Fit (45 mins)', details: 'Navigating trade-offs, scaling systems, and ownership.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Alien Dictionary, Word Search II (Trie), Shortest Path in a Grid with Obstacles Elimination, Median of Stream.' },
      { category: 'Design', topics: 'Design Ride Matching algorithm, Design Location Tracking service with geohashes.' },
      { category: 'Concurrency', topics: 'Read-Write Locks, Producer-Consumer queue, Race condition debugging.' }
    ],
    proTips: [
      'Codesignal OA requires high speed: solve questions 1, 2, and 4 first before investing heavy time in question 3.'
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    category: 'Tier-1 Product Giants',
    badge: 'Campus SDE 1',
    packageTier: '₹16 LPA to ₹26+ LPA',
    eligibility: '7.0+ CGPA in B.Tech/M.Tech CS/IT/ECE.',
    accentColor: '#fc8019',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Coding Test (90 mins, 3 Qs)', details: 'HackerEarth platform. Strings, Trees, and Dynamic programming.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Live coding problem solving + Code optimization.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Object Oriented Design (LLD), Database modeling, and API design.' },
      { roundNum: 'Round 4', title: 'Hiring Manager Round (45 mins)', details: 'Culture fit, past project architecture, and handling high-scale real-time orders.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Course Schedule, Lowest Common Ancestor, Coin Change, Edit Distance.' },
      { category: 'Design', topics: 'Design Food Delivery platform schema, Design Delivery Partner allocation system.' },
      { category: 'Web Fundamentals', topics: 'Caching (Redis), REST conventions, Database indexing, Event-driven architecture.' }
    ],
    proTips: [
      'Swiggy values practical backend/fullstack experience. Know how Redis caching and message queues (Kafka) prevent database overload.'
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    category: 'Tier-1 Product Giants',
    badge: 'GRiD & Campus SDE',
    packageTier: '₹18 LPA to ₹32+ LPA',
    eligibility: 'Open to all engineering branches through Flipkart GRiD.',
    accentColor: '#2874f0',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins, 3 Qs)', details: 'Data structures and mathematical problem solving.' },
      { roundNum: 'Round 2', title: 'Machine Coding Round (90-120 mins)', details: 'Building an extensible, working console application in 90 minutes with full OOP design.' },
      { roundNum: 'Round 3', title: 'Problem Solving & DSA (60 mins)', details: 'Hard algorithmic optimization and code dry runs.' },
      { roundNum: 'Round 4', title: 'Hiring Manager Round (45 mins)', details: 'Customer centricity, ownership, and engineering design choices.' }
    ],
    repeatedTopics: [
      { category: 'Machine Coding', topics: 'Design Flipkart Flash Sale system, Design Ride Sharing, Design Task Planner.' },
      { category: 'DSA', topics: 'Longest Consecutive Sequence, Trapping Rain Water, Binary Tree Maximum Path Sum.' },
      { category: 'Design Principles', topics: 'Factory Pattern, Singleton Pattern, SOLID principles, Extensibility.' }
    ],
    proTips: [
      'The Machine Coding round is elimination-heavy: your code must compile, run, handle sample test cases, and adhere to clean design patterns.'
    ]
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'Tier-1 Product Giants',
    badge: 'FinTech SDE 1',
    packageTier: '₹18 LPA to ₹28+ LPA',
    eligibility: '7.0+ CGPA in B.Tech. Strong problem solving and web fundamentals.',
    accentColor: '#0c2340',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: '3 Algorithmic problems on HackerEarth.' },
      { roundNum: 'Round 2', title: 'DSA & Problem Solving (60 mins)', details: 'Graph, Tree, and Array algorithms.' },
      { roundNum: 'Round 3', title: 'Low Level Design / Machine Coding (90 mins)', details: 'Design payment gateway routing, idempotency, and retry mechanisms.' },
      { roundNum: 'Round 4', title: 'Cultural Fit & Architecture (45 mins)', details: 'Values, reliability, security mindset, and distributed systems basics.' }
    ],
    repeatedTopics: [
      { category: 'Design', topics: 'Design Idempotent Payment API, Design Webhook Dispatcher, Design Ledger system.' },
      { category: 'DSA', topics: 'LFU Cache, Word Ladder II, Number of Islands, Maximum Subarray.' },
      { category: 'Transactions', topics: 'Two-phase commit, Database ACID properties, Distributed locks.' }
    ],
    proTips: [
      'Highlight reliability and data consistency in your answers: financial systems cannot afford lost requests or double payments.'
    ]
  },
  {
    id: 'zomato',
    name: 'Zomato',
    category: 'Tier-1 Product Giants',
    badge: 'Associate SDE',
    packageTier: '₹15 LPA to ₹24+ LPA',
    eligibility: '7.0+ CGPA. Strong coding and system fundamentals.',
    accentColor: '#cb202d',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Coding Test (90 mins, 3 Qs)', details: 'Medium/Hard algorithmic problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Data structures & Algorithms live coding.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'System Design basics, Database queries, and concurrency.' },
      { roundNum: 'Round 4', title: 'Culture & HR Round (30 mins)', details: 'Product obsession, pace of execution, and work ethic.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Rotten Oranges, Merge Intervals, Subsets II, Jump Game.' },
      { category: 'Design', topics: 'Design Restaurant Search with Filters, Design Order Status Tracking.' },
      { category: 'Architecture', topics: 'Sharding, CDN caching, WebSockets for live location updates.' }
    ],
    proTips: [
      'Zomato looks for hustle and product intuition. Try the app, identify potential UX/system bottlenecks, and discuss them intelligently.'
    ]
  },

  // ==========================================================================
  // 3. FINTECH & GLOBAL INVESTMENT BANKS (12 Companies)
  // ==========================================================================
  {
    id: 'goldman_sachs',
    name: 'Goldman Sachs',
    category: 'FinTech & Banking',
    badge: 'Engineering Campus Hiring',
    packageTier: '₹20 LPA to ₹30+ LPA',
    eligibility: '6.5+ CGPA across 10th, 12th & Degree. All engineering branches eligible.',
    accentColor: '#1d4ed8',
    rounds: [
      { roundNum: 'Round 1', title: 'Aptitude & Technical Assessment (HackerRank, 135 mins)', details: 'Quant (Numerical), Advanced Math/Probability, CS MCQs, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45-60 mins)', details: 'Data structures, algorithm optimization, and discrete mathematics.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45-60 mins)', details: 'Puzzles, probability riddles, multithreading, and OOP design.' },
      { roundNum: 'Round 4', title: 'Senior VP / Leadership Round (45 mins)', details: 'Integrity, handling high-stakes pressure, and career aspirations.' }
    ],
    repeatedTopics: [
      { category: 'Puzzles & Math', topics: 'Birthday paradox, Monty Hall problem, 25 horses 5 tracks, Coin toss expectations.' },
      { category: 'DSA', topics: 'Trapping Rain Water, Median of Stream, Fractional Knapsack, LRU Cache.' },
      { category: 'Core CS', topics: 'Java memory model, Garbage collection algorithms, Thread synchronization, SQL query plan.' }
    ],
    proTips: [
      'Goldman Sachs tests mathematical aptitude and probability riddles heavily. Practice classic interview puzzles from Fifty Challenging Problems in Probability.'
    ]
  },
  {
    id: 'morgan_stanley',
    name: 'Morgan Stanley',
    category: 'FinTech & Banking',
    badge: 'Technology Analyst',
    packageTier: '₹18 LPA to ₹26+ LPA',
    eligibility: '7.0+ CGPA with no backlogs. CS, IT, ECE.',
    accentColor: '#002b49',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Quantitative, Computer Science fundamentals (OS, DBMS, OOPs), and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'DSA, binary search, tree traversals, and SQL queries.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Operating Systems memory, Java/C++ internals, and project deep dive.' },
      { roundNum: 'Round 4', title: 'Professional & Cultural Interview (45 mins)', details: 'Risk management, collaboration, and ethical conduct.' }
    ],
    repeatedTopics: [
      { category: 'Core CS', topics: 'Virtual functions, Pointer mechanics, ACID properties, Page fault handling, Deadlock detection.' },
      { category: 'DSA', topics: 'Lowest Common Ancestor, Top K Elements, Binary Tree Level Order, Subarray Sum.' },
      { category: 'Finance Awareness', topics: 'Basic understanding of stock exchanges, high frequency trading concepts, latency sensitivity.' }
    ],
    proTips: [
      'Deep understanding of C++ or Java memory (heap vs stack, pass by value vs reference) is scrutinized heavily.'
    ]
  },
  {
    id: 'jpmorgan',
    name: 'JP Morgan Chase & Co.',
    category: 'FinTech & Banking',
    badge: 'Code For Good / SEP',
    packageTier: '₹14 LPA to ₹20+ LPA',
    eligibility: '7.0+ CGPA. All branches eligible through Code For Good Hackathon.',
    accentColor: '#111827',
    rounds: [
      { roundNum: 'Round 1', title: 'Coding Challenge (60 mins, 2 Qs)', details: 'Medium difficulty array and string algorithmic questions.' },
      { roundNum: 'Round 2', title: 'HireVue Video Assessment', details: '2 Behavioral questions recorded on camera.' },
      { roundNum: 'Round 3', title: 'Code For Good (24-Hour Hackathon)', details: 'Building an end-to-end solution for a non-profit NGO with mentor evaluations.' },
      { roundNum: 'Round 4', title: 'Technical & Fitment Interview', details: 'Hackathon code review, tech choices, and team dynamics.' }
    ],
    repeatedTopics: [
      { category: 'Full Stack', topics: 'React frontend, Spring Boot/Node backend, REST APIs, Git workflows.' },
      { category: 'DSA', topics: 'Two sum, Merge sorted arrays, BFS traversal, String anagrams.' },
      { category: 'HireVue', topics: 'Tell me about a time you resolved a conflict in a group project.' }
    ],
    proTips: [
      'In Code For Good, mentors evaluate collaboration, empathy, and listening skills as much as technical skills. Never dominate conversations; encourage all teammates.'
    ]
  },
  {
    id: 'wells_fargo',
    name: 'Wells Fargo',
    category: 'FinTech & Banking',
    badge: 'Technology Associate',
    packageTier: '₹12 LPA to ₹18+ LPA',
    eligibility: '7.0+ CGPA with no active backlogs.',
    accentColor: '#d71e28',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (AMCAT platform, 100 mins)', details: 'English, Business Analysis, CS fundamentals, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'DSA live coding, database schema design, and Java/Python basics.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'System Design, Security best practices (OWASP Top 10), and Cloud concepts.' },
      { roundNum: 'Round 4', title: 'HR Round (20 mins)', details: 'Compliance, integrity, and behavioral scenarios.' }
    ],
    repeatedTopics: [
      { category: 'Security', topics: 'SQL Injection prevention, Cross-Site Scripting (XSS), HTTPS encryption, JWT validation.' },
      { category: 'DSA', topics: 'Reverse Linked List in Pairs, Kth Largest in Stream, Maximum Subarray Sum.' },
      { category: 'Databases', topics: 'Normalization, Clustered vs Non-clustered index, Stored Procedures.' }
    ],
    proTips: [
      'Financial institutions care immensely about software security. Mentioning secure coding habits sets you apart immediately.'
    ]
  },
  {
    id: 'barclays',
    name: 'Barclays',
    category: 'FinTech & Banking',
    badge: 'Graduate Analyst (BA3)',
    packageTier: '₹12 LPA to ₹16+ LPA',
    eligibility: '60%+ or 6.0 CGPA across all degrees.',
    accentColor: '#00aeef',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (HackerEarth, 90 mins)', details: 'Technical MCQs (Java, OOPs, SQL) + 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Values & Technical Interview (45 mins)', details: 'Coding problems, project walkthrough, and Barclays RISES values.' },
      { roundNum: 'Round 3', title: 'Vice President / Director Interview', details: 'System design, financial technology interest, and case studies.' }
    ],
    repeatedTopics: [
      { category: 'Barclays Values', topics: 'Respect, Integrity, Service, Excellence, Stewardship (RISES).' },
      { category: 'DSA', topics: 'Binary Search Tree validation, String permutations, Fibonacci DP variations.' },
      { category: 'Tech', topics: 'Java Spring framework, Microservices, REST principles.' }
    ],
    proTips: [
      'Barclays heavily weights their RISES values. Have an example ready for each value from your college or internship experience.'
    ]
  },
  {
    id: 'citi',
    name: 'Citi',
    category: 'FinTech & Banking',
    badge: 'Technology Analyst',
    packageTier: '₹14 LPA to ₹20+ LPA',
    eligibility: '7.0+ CGPA. CS, IT, ECE, EEE.',
    accentColor: '#003b70',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Quant, Logical, Verbal, CS Fundamentals MCQs, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview (45 mins)', details: 'DSA, DBMS normalization, and OOPs concepts in Java/C++.' },
      { roundNum: 'Round 3', title: 'Techno-Managerial Interview (45 mins)', details: 'Architecture of resume projects and real-time banking scenarios.' },
      { roundNum: 'Round 4', title: 'HR Round (20 mins)', details: 'Communication, ethical dilemmas, and team fit.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Detect loop in Linked List, Find missing number, Level order traversal, Anagram strings.' },
      { category: 'DBMS', topics: 'Transactions, ACID properties, Write-Ahead Logging, Foreign key cascades.' },
      { category: 'Architecture', topics: 'Load balancers, Horizontal vs Vertical scaling, High availability.' }
    ],
    proTips: [
      'Understand how payment gateways process credit card transactions securely (tokenization, PCI-DSS compliance).'
    ]
  },
  {
    id: 'standard_chartered',
    name: 'Standard Chartered Bank',
    category: 'FinTech & Banking',
    badge: 'Graduate Engineer',
    packageTier: '₹10 LPA to ₹16+ LPA',
    eligibility: '6.5+ CGPA with no active arrears.',
    accentColor: '#00843d',
    rounds: [
      { roundNum: 'Round 1', title: 'Valued Behaviors & Cognitive Test', details: 'Interactive cognitive games, situational judgment, and verbal ability.' },
      { roundNum: 'Round 2', title: 'Technical Coding Assessment', details: '2 Medium difficulty algorithm challenges.' },
      { roundNum: 'Round 3', title: 'Technical Interview', details: 'Core CS subjects, software engineering lifecycle, and code reviews.' },
      { roundNum: 'Round 4', title: 'HR Interview', details: 'Cultural alignment and banking domain interest.' }
    ],
    repeatedTopics: [
      { category: 'Situational', topics: 'Prioritizing competing tasks, handling customer data breaches, managing feedback.' },
      { category: 'Coding', topics: 'Subarray product less than K, Longest substring, Binary tree paths.' },
      { category: 'Core CS', topics: 'OS process vs thread, Synchronized keyword, SQL triggers.' }
    ],
    proTips: [
      'Standard Chartered values collaborative behaviors: show willingness to learn new technologies and embrace diverse viewpoints.'
    ]
  },
  {
    id: 'bny_mellon',
    name: 'BNY Mellon',
    category: 'FinTech & Banking',
    badge: 'CODE DIVAS & Campus',
    packageTier: '₹15 LPA to ₹22+ LPA',
    eligibility: '7.0+ CGPA in B.Tech/M.Tech (CS, IT, ECE, Data Science).',
    accentColor: '#1e3a8a',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (HackerEarth, 120 mins)', details: '3 Algorithmic coding problems (Medium to Hard).' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Data structures, algorithm proofs, and code dry runs.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'System Design, low-latency architectures, and Java/C++ internals.' },
      { roundNum: 'Round 4', title: 'HR / Leadership Round (30 mins)', details: 'Ethical judgment and career aspirations.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Word Search, Graph coloring, Disjoint Set Union, Monotonic queue.' },
      { category: 'Concurrency', topics: 'Atomic variables, ConcurrentHashMap internals, Deadlock prevention.' },
      { category: 'Databases', topics: 'PostgreSQL vs MongoDB, Query optimization plans, Index selectivity.' }
    ],
    proTips: [
      'CODE DIVAS is an outstanding hackathon for female engineers to get direct fast-track interviews into BNY Mellon.'
    ]
  },
  {
    id: 'fidelity',
    name: 'Fidelity Investments',
    category: 'FinTech & Banking',
    badge: 'Associate Software Engineer',
    packageTier: '₹9 LPA to ₹15+ LPA',
    eligibility: '6.5+ CGPA. All branches eligible.',
    accentColor: '#15803d',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Aptitude, Core CS MCQs, and 2 Coding questions.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'OOPs concepts, Java/Python questions, and SQL joins.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'Project architecture, cloud basics, and problem solving.' },
      { roundNum: 'Round 4', title: 'HR Round (20 mins)', details: 'Customer focus, teamwork, and long-term career goals.' }
    ],
    repeatedTopics: [
      { category: 'Aptitude', topics: 'Percentages, Work and Time, Syllogisms, Series completion.' },
      { category: 'Coding', topics: 'Array rotation, String anagrams, Find cycle in linked list.' },
      { category: 'Interview', topics: 'Encapsulation vs Abstraction, SQL stored procedures, CI/CD pipeline overview.' }
    ],
    proTips: [
      'Fidelity values clean code and structured thinking. Clearly explain your variable naming and modular design.'
    ]
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'FinTech & Banking',
    badge: 'Campus SDE 1',
    packageTier: '₹18 LPA to ₹30+ LPA',
    eligibility: '7.5+ CGPA. B.Tech/M.Tech CS/IT/ECE.',
    accentColor: '#0079c1',
    rounds: [
      { roundNum: 'Round 1', title: 'HackerRank Online Assessment (90 mins, 3 Qs)', details: 'Algorithms, Dynamic Programming, and Graph theory.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'DSA live coding with edge case handling.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'System Design (LLD), concurrency, and database transactions.' },
      { roundNum: 'Round 4', title: 'Culture & Leadership Round (45 mins)', details: 'Collaboration, handling pressure, and innovation.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Merge Intervals, Course Schedule II, LRU Cache, Trapping Rain Water.' },
      { category: 'Design', topics: 'Design Distributed Cache, Design Payment Checkout flow with retry logic.' },
      { category: 'Security', topics: 'OAuth 2.0 flow, Encryption standards (AES, RSA), Token verification.' }
    ],
    proTips: [
      'Understand OAuth 2.0 authorization flows and how distributed transactions maintain ACID guarantees.'
    ]
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    category: 'FinTech & Banking',
    badge: 'Campus Engineering',
    packageTier: '₹20 LPA to ₹33+ LPA',
    eligibility: '7.0+ CGPA. Strong engineering principles and algorithm knowledge.',
    accentColor: '#5f259f',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (Codesignal / HackerEarth)', details: '3 Algorithmic problems.' },
      { roundNum: 'Round 2', title: 'Machine Coding Round (90 mins)', details: 'Writing modular, working code for problems like Splitwise or Payment Gateway.' },
      { roundNum: 'Round 3', title: 'Data Structures & Algorithms (60 mins)', details: 'Complex tree, graph, and DP problems.' },
      { roundNum: 'Round 4', title: 'Hiring Manager Round (45 mins)', details: 'Engineering depth, past project challenges, and architectural trade-offs.' }
    ],
    repeatedTopics: [
      { category: 'Machine Coding', topics: 'Design Payment Wallet, Design Splitwise, Design In-Memory Cache.' },
      { category: 'DSA', topics: 'Median of Two Sorted Arrays, Word Ladder, Longest Palindromic Substring.' },
      { category: 'Scale', topics: 'Handling UPI flash surges (e.g. IPL final), Sharding, Kafka consumers.' }
    ],
    proTips: [
      'PhonePe places high weightage on the Machine Coding round. Ensure clean separation between Model, Service, and Repository layers.'
    ]
  },
  {
    id: 'cred',
    name: 'CRED',
    category: 'FinTech & Banking',
    badge: 'Backend & Full Stack',
    packageTier: '₹22 LPA to ₹36+ LPA',
    eligibility: 'Open to all branches. Strong taste in engineering excellence and craft.',
    accentColor: '#18181b',
    rounds: [
      { roundNum: 'Round 1', title: 'HackerRank Challenge / Take Home Assignment', details: 'Algorithmic problems or building a functional microservice.' },
      { roundNum: 'Round 2', title: 'Machine Coding Round (90 mins)', details: 'Live coding an extensible system with unit tests.' },
      { roundNum: 'Round 3', title: 'System Architecture & CS Fundamentals (60 mins)', details: 'Database indexing, concurrency, memory optimization, and network protocols.' },
      { roundNum: 'Round 4', title: 'Founder / Leadership Round (45 mins)', details: 'Product craft, taste, and engineering obsession.' }
    ],
    repeatedTopics: [
      { category: 'Design', topics: 'Design Credit Card Reward system, Design Distributed Rate Limiter.' },
      { category: 'DSA', topics: 'Graph Topological Sort, Segment Trees, Sliding Window Maximum.' },
      { category: 'Craft', topics: 'Clean git commits, REST vs gRPC, Event-driven state machines.' }
    ],
    proTips: [
      'CRED values high design craft and attention to detail. Avoid sloppy naming or unhandled edge cases.'
    ]
  },

  // ==========================================================================
  // 4. CORE, SEMICONDUCTOR, TELECOM & HARDWARE (12 Companies)
  // ==========================================================================
  {
    id: 'qualcomm',
    name: 'Qualcomm',
    category: 'Core & Semiconductor',
    badge: 'Campus Associate Engineer',
    packageTier: '₹14 LPA to ₹22+ LPA',
    eligibility: '7.0+ CGPA in B.Tech/M.Tech (ECE, CS, IT, EEE).',
    accentColor: '#0056b3',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (HackerEarth, 90 mins)', details: 'C Programming, Data Structures, Operating Systems, Computer Architecture, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'C pointers, bitwise operations, memory layout, and linked list manipulations.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'OS internals (Interrupts, IPC, DMA), device drivers, and computer architecture.' },
      { roundNum: 'Round 4', title: 'HR Round (30 mins)', details: 'Behavioral, teamwork, and interest in wireless/semiconductor systems.' }
    ],
    repeatedTopics: [
      { category: 'Bitwise & C', topics: 'Reverse bits, Count set bits, Set/Clear/Toggle bit macros, Endianness detection, Pointer arithmetic.' },
      { category: 'OS & Embedded', topics: 'Interrupt Service Routines (ISR), Volatile keyword, DMA, Mutex vs Spinlock, Cache coherency.' },
      { category: 'Computer Arch', topics: 'Pipelining hazards, RISC vs CISC, Virtual memory translation (TLB).' }
    ],
    proTips: [
      'Master the C programming language down to assembly and register levels: Qualcomm interviewers love pointer puzzles and volatile keyword gotchas.'
    ]
  },
  {
    id: 'intel',
    name: 'Intel',
    category: 'Core & Semiconductor',
    badge: 'Graduate Software Engineer',
    packageTier: '₹13 LPA to ₹20+ LPA',
    eligibility: '7.0+ CGPA. CS, IT, ECE, Microelectronics.',
    accentColor: '#0071c5',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Quantitative, Digital Electronics, C/C++ programming, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Data structures, algorithm complexity, and memory management.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Computer Architecture, CPU caches, multithreading, and Linux kernel basics.' },
      { roundNum: 'Round 4', title: 'HR / Managerial Round (30 mins)', details: 'Cultural fit and team collaboration.' }
    ],
    repeatedTopics: [
      { category: 'Architecture', topics: 'Cache hierarchy (L1/L2/L3), Branch prediction, SIMD instructions, Memory barriers.' },
      { category: 'C / C++', topics: 'Custom malloc implementation, Smart pointers, RAII, Virtual memory pages.' },
      { category: 'DSA', topics: 'Binary Search, Bitwise XOR manipulations, Priority Queue, Graph BFS.' }
    ],
    proTips: [
      'Understanding cache lines, cache misses (false sharing), and memory alignment gives a huge edge at Intel.'
    ]
  },
  {
    id: 'nvidia',
    name: 'Nvidia',
    category: 'Core & Semiconductor',
    badge: 'System Software / AI Systems',
    packageTier: '₹18 LPA to ₹32+ LPA',
    eligibility: '7.5+ CGPA in B.Tech/M.Tech (CS, ECE, EE).',
    accentColor: '#76b900',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (HackerRank, 90 mins)', details: 'C/C++ advanced MCQs, GPU computing concepts, and 2 algorithmic coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Advanced C++, pointers, template metaprogramming, and concurrent programming.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Operating Systems (memory management, kernel drivers) and Computer Architecture.' },
      { roundNum: 'Round 4', title: 'Technical Interview 3 (60 mins)', details: 'Parallel computing algorithms, CUDA basics, and deep project architecture.' },
      { roundNum: 'Round 5', title: 'HR Round (30 mins)', details: 'Leadership and culture fit.' }
    ],
    repeatedTopics: [
      { category: 'Parallel Computing', topics: 'CUDA threads/blocks/grids, Shared memory bank conflicts, Amdahl\'s law.' },
      { category: 'Modern C++', topics: 'Move semantics, rvalue references, Memory order (acquire/release), constexpr.' },
      { category: 'Systems', topics: 'Page table walk, Memory mapped I/O, Cache eviction policies, Lock-free queues.' }
    ],
    proTips: [
      'Nvidia tests modern C++ (C++14/17) and systems programming rigorously. Know move semantics, perfect forwarding, and multithreaded synchronization.'
    ]
  },
  {
    id: 'amd',
    name: 'AMD',
    category: 'Core & Semiconductor',
    badge: 'Silicon & Software Engineer',
    packageTier: '₹13 LPA to ₹22+ LPA',
    eligibility: '7.0+ CGPA in B.Tech/M.Tech (ECE, CS, EEE).',
    accentColor: '#ed1c24',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'C/C++ Programming, Digital Design, OS, and 2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'Data structures, pointers, and memory layout.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Computer Architecture, CPU/GPU pipeline, and debugging.' },
      { roundNum: 'Round 4', title: 'HR Round (30 mins)', details: 'Values and team readiness.' }
    ],
    repeatedTopics: [
      { category: 'Architecture', topics: 'Superscalar architectures, Out-of-order execution, Memory controllers, PCIe bus.' },
      { category: 'C++', topics: 'Virtual destructor necessity, Operator overloading, Bitwise masking.' },
      { category: 'DSA', topics: 'Linked List cycle detection, Tree traversals, Graph shortest paths.' }
    ],
    proTips: [
      'Understand hardware-software co-design: how compiler optimizations translate C code into efficient machine instructions.'
    ]
  },
  {
    id: 'texas_instruments',
    name: 'Texas Instruments',
    category: 'Core & Semiconductor',
    badge: 'Embedded Systems & Software',
    packageTier: '₹15 LPA to ₹24+ LPA',
    eligibility: '7.5+ CGPA in B.Tech/M.Tech (ECE, EE, CS).',
    accentColor: '#cc0000',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Technical Assessment (90 mins)', details: 'Analog/Digital circuits, Microcontrollers, C programming, and Aptitude.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'C programming, pointers, embedded registers, and digital electronics.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'Microcontroller architecture (ARM Cortex), Timers, PWM, ADC/DAC, and UART/SPI/I2C.' },
      { roundNum: 'Round 4', title: 'HR Round (30 mins)', details: 'Values, integrity, and long-term research mindset.' }
    ],
    repeatedTopics: [
      { category: 'Protocols', topics: 'I2C vs SPI vs UART vs CAN (speed, wire count, arbitration, full/half duplex).' },
      { category: 'Embedded C', topics: 'Bit masking, Volatile keyword, Inline assembly, Interrupt priority.' },
      { category: 'Microcontrollers', topics: 'Timer counter calculations, ADC sampling rate, Nyquist theorem, DMA channels.' }
    ],
    proTips: [
      'Communication protocols (SPI vs I2C timing diagrams) are guaranteed questions at TI. Draw the clock and data lines clearly.'
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung R&D Institute',
    category: 'Core & Semiconductor',
    badge: 'PRISM & Campus SDE',
    packageTier: '₹14 LPA to ₹22+ LPA',
    eligibility: '7.0+ CGPA in B.Tech/M.Tech (CS, IT, ECE). No active backlogs.',
    accentColor: '#1428a0',
    rounds: [
      { roundNum: 'Round 1', title: 'Samsung Global Coding Test (3 hours, 1 Problem)', details: 'Strict 50/50 test case passing rule. Focuses on Graph BFS/DFS, Backtracking, or Dynamic Programming.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'Code review of the test problem + Core CS subjects.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'Operating Systems, C/C++ memory, and project architecture.' },
      { roundNum: 'Round 4', title: 'HR Round (20 mins)', details: 'Behavioral and cultural fit.' }
    ],
    repeatedTopics: [
      { category: 'Coding Test', topics: 'Bipartite Graph, Wormhole problem, Traveling Salesperson, Endoscope grid BFS, Fisherman puzzle.' },
      { category: 'Core CS', topics: 'Virtual functions, Mutex vs Semaphore, IPC mechanisms, SQL queries.' },
      { category: 'OS', topics: 'Page replacement algorithms (LRU/FIFO), Inverted page tables, Thrashing.' }
    ],
    proTips: [
      'Samsung has a unique coding test format: only 1 question, but you MUST pass all 50 hidden test cases to clear Round 1. Practice classic Samsung PRISM interview questions on backtracking.'
    ]
  },
  {
    id: 'bosch',
    name: 'Robert Bosch',
    category: 'Core & Semiconductor',
    badge: 'Automotive & IoT Software',
    packageTier: '₹6 LPA to ₹10+ LPA',
    eligibility: '65%+ in 10th, 12th & Degree. ECE, CS, EEE, Mechanical with coding skills.',
    accentColor: '#e20015',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (75 mins)', details: 'Aptitude, Core Technical MCQs (C, Microprocessors), and 1 Coding problem.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'C programming, embedded systems, automotive bus protocols (CAN/LIN).' },
      { roundNum: 'Round 3', title: 'Managerial & HR Interview (30 mins)', details: 'Project walk-through, safety-critical systems, and teamwork.' }
    ],
    repeatedTopics: [
      { category: 'Automotive / Embedded', topics: 'CAN protocol arbitration, RTOS (tasks, queues, priorities), Memory leak detection.' },
      { category: 'C Programming', topics: 'Function pointers, Structure padding, Bit fields, Dynamic memory allocation.' },
      { category: 'Interview', topics: 'Difference between polling and interrupt, MISRA C coding guidelines.' }
    ],
    proTips: [
      'Mention safety-critical software reliability (MISRA C guidelines, ISO 26262 overview) to impress Bosch panel members.'
    ]
  },
  {
    id: 'schneider',
    name: 'Schneider Electric',
    category: 'Core & Semiconductor',
    badge: 'Graduate Engineer Trainee',
    packageTier: '₹6.5 LPA to ₹10+ LPA',
    eligibility: '65% or 6.5 CGPA throughout academics.',
    accentColor: '#3dcd58',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Aptitude & Technical Test', details: 'Quant, Logical, Verbal, Domain MCQs, and Basic Coding.' },
      { roundNum: 'Round 2', title: 'Group Discussion (GD / Case Study)', details: 'Renewable energy, smart grid, sustainability, and digital transformation.' },
      { roundNum: 'Round 3', title: 'Technical Interview', details: 'Core engineering concepts, IoT integration, and project review.' },
      { roundNum: 'Round 4', title: 'HR Round', details: 'Culture fit and company values.' }
    ],
    repeatedTopics: [
      { category: 'Domain', topics: 'Energy management, Industrial IoT, SCADA basics, PLC programming fundamentals.' },
      { category: 'Software', topics: 'Python scripting, REST APIs for sensor telemetry, SQL databases.' },
      { category: 'GD Topics', topics: 'EV charging infrastructure, AI in energy conservation.' }
    ],
    proTips: [
      'Schneider focuses heavily on sustainability and energy efficiency. Read their recent news on Smart Buildings and EcoStruxure platform.'
    ]
  },
  {
    id: 'siemens',
    name: 'Siemens',
    category: 'Core & Semiconductor',
    badge: 'Campus Software Trainee',
    packageTier: '₹7 LPA to ₹12+ LPA',
    eligibility: '7.0+ CGPA in B.Tech/M.Tech (CS, IT, ECE, EE).',
    accentColor: '#00646e',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Aptitude, Core CS (Data Structures, OOPs, OS), and 2 Coding questions.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (45 mins)', details: 'Live coding in C++ or Java, OOPs design patterns, and database design.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (45 mins)', details: 'Multithreading, memory management, and industrial automation software concepts.' },
      { roundNum: 'Round 4', title: 'HR Interview (30 mins)', details: 'Behavioral, career vision, and work ethics.' }
    ],
    repeatedTopics: [
      { category: 'OOPs & Patterns', topics: 'Factory pattern, Observer pattern, Virtual tables, Abstract classes.' },
      { category: 'DSA', topics: 'Binary Search Tree, Linked List reversal, Matrix pathfinding.' },
      { category: 'Systems', topics: 'Inter-process communication (Shared memory, Sockets), Deadlock handling.' }
    ],
    proTips: [
      'Siemens values rigorous engineering quality. Write modular, exception-safe code and explain your edge-case checks.'
    ]
  },
  {
    id: 'airtel',
    name: 'Airtel Digital',
    category: 'Core & Semiconductor',
    badge: 'Campus SDE',
    packageTier: '₹12 LPA to ₹18+ LPA',
    eligibility: '7.0+ CGPA. CS, IT, ECE.',
    accentColor: '#ed1b24',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Coding Test (90 mins, 3 Qs)', details: 'Medium/Hard algorithms on HackerEarth.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (60 mins)', details: 'DSA, Tree/Graph traversals, and code optimization.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (60 mins)', details: 'System Design basics, Telecom digital platform architecture, and DB modeling.' },
      { roundNum: 'Round 4', title: 'HR Round (30 mins)', details: 'Behavioral and culture fit.' }
    ],
    repeatedTopics: [
      { category: 'DSA', topics: 'Subarray with given sum, Graph cycle detection, LRU Cache, String anagrams.' },
      { category: 'Design', topics: 'Design Notification Service (SMS/Push), Design Real-Time Telecom Data Usage Tracker.' },
      { category: 'Scale', topics: 'Handling millions of concurrent requests, Redis caching, Kafka queues.' }
    ],
    proTips: [
      'Airtel Digital serves 350M+ users: demonstrate awareness of high-throughput caching and message queues in your design answers.'
    ]
  },
  {
    id: 'jio',
    name: 'Jio Platforms',
    category: 'Core & Semiconductor',
    badge: 'Graduate Engineer Trainee',
    packageTier: '₹6 LPA to ₹10+ LPA',
    eligibility: '60% throughout academics. All engineering streams.',
    accentColor: '#0f3e99',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (90 mins)', details: 'Quant, Logical, Verbal, Domain MCQs (Cloud, Networking, CS), and 1-2 Coding problems.' },
      { roundNum: 'Round 2', title: 'Technical Interview 1 (40 mins)', details: 'Programming concepts (Java/Python/C++), SQL, and project walkthrough.' },
      { roundNum: 'Round 3', title: 'Technical Interview 2 (30 mins)', details: 'Cloud concepts (5G, IoT, AI/ML), API design, and system fundamentals.' },
      { roundNum: 'Round 4', title: 'HR Round (20 mins)', details: 'Relocation, work ethic, and culture fit.' }
    ],
    repeatedTopics: [
      { category: 'Aptitude', topics: 'Time and Work, Profit & Loss, Syllogisms, Reading comprehension.' },
      { category: 'Coding', topics: 'Array element counts, String palindrome, Matrix spiral traversal.' },
      { category: 'Domain', topics: '5G architecture overview, Cloud native computing, Database indexing.' }
    ],
    proTips: [
      'Jio is scaling massive 5G and AI initiatives. Mention familiarity with Cloud native technologies (Docker, Kubernetes) to stand out.'
    ]
  },
  {
    id: 'collins',
    name: 'Collins Aerospace',
    category: 'Core & Semiconductor',
    badge: 'Graduate Software Engineer',
    packageTier: '₹7 LPA to ₹11+ LPA',
    eligibility: '65%+ in Degree. B.Tech CS, IT, ECE, Aerospace.',
    accentColor: '#0a2540',
    rounds: [
      { roundNum: 'Round 1', title: 'Online Assessment (75 mins)', details: 'Aptitude, C/C++ Programming MCQs, and 1 Coding problem.' },
      { roundNum: 'Round 2', title: 'Technical Interview (45 mins)', details: 'C/C++ memory management, Avionics software standards (DO-178C basics), and RTOS.' },
      { roundNum: 'Round 3', title: 'Managerial & HR Interview (30 mins)', details: 'Safety mindset, attention to detail, and behavioral questions.' }
    ],
    repeatedTopics: [
      { category: 'Embedded C', topics: 'Pointers, Dynamic vs Static memory, Volatile keyword, Structure bit fields.' },
      { category: 'RTOS', topics: 'Priority inversion, Priority inheritance, Task scheduling, Deadlock.' },
      { category: 'Standards', topics: 'DO-178C software safety levels, Unit testing coverage (MC/DC).' }
    ],
    proTips: [
      'Aerospace code allows zero tolerance for unhandled exceptions. Emphasize defensive programming and rigorous unit testing in your answers.'
    ]
  }
];
