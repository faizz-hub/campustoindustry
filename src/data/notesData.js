// Academic Notes and Subject Data for All Engineering Departments & Semesters

export const DEPARTMENTS_DATA = [
  { id: 'cse', name: 'Computer Science & Engineering (CSE)', shortName: 'CSE', badge: 'Popular' },
  { id: 'aids', name: 'Artificial Intelligence & Data Science (AIDS)', shortName: 'AI & DS', badge: 'High Demand' },
  { id: 'csbs', name: 'Computer Science & Business Systems (CSBS)', shortName: 'CSBS', badge: 'Industry Oriented' },
  { id: 'ece', name: 'Electronics & Communication Engineering (ECE)', shortName: 'ECE', badge: 'Core' },
  { id: 'vlsi', name: 'VLSI Design & Technology', shortName: 'VLSI', badge: 'Emerging' },
  { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', badge: 'Core' },
];

export const SUBJECTS_BY_DEPT = {
  cse: {
    'sem-1': [
      { id: 'cse-eng-1', name: 'Professional English - I', code: 'HS3151' },
      { id: 'cse-math-1', name: 'Matrices and Calculus', code: 'MA3151' },
      { id: 'cse-phy-1', name: 'Engineering Physics', code: 'PH3151' },
      { id: 'cse-chem-1', name: 'Engineering Chemistry', code: 'CY3151' },
      { id: 'cse-python', name: 'Problem Solving & Python Programming', code: 'GE3151' },
    ],
    'sem-2': [
      { id: 'cse-eng-2', name: 'Professional English - II', code: 'HS3251' },
      { id: 'cse-math-2', name: 'Statistics and Numerical Methods', code: 'MA3251' },
      { id: 'cse-phy-2', name: 'Physics for Information Science', code: 'PH3256' },
      { id: 'cse-beee', name: 'Basic Electrical & Electronics Engg', code: 'BE3251' },
      { id: 'cse-prog-c', name: 'Programming in C', code: 'CS3251' },
    ],
    'sem-3': [
      { id: 'ds', name: 'Data Structures', code: 'CS3301' },
      { id: 'algo', name: 'Design & Analysis of Algorithms', code: 'CS3351' },
      { id: 'dbms', name: 'Database Management Systems', code: 'CS3391' },
      { id: 'os', name: 'Operating Systems', code: 'CS3451' },
      { id: 'dpco', name: 'Digital Principles & Computer Organization', code: 'CS3352' },
      { id: 'discrete-math', name: 'Discrete Mathematics', code: 'MA3354' },
    ],
    'sem-4': [
      { id: 'oops', name: 'Object Oriented Programming (Java / C++)', code: 'CS3491' },
      { id: 'cn', name: 'Computer Networks', code: 'CS3591' },
      { id: 'toc', name: 'Theory of Computation & Automata', code: 'CS3452' },
      { id: 'se', name: 'Software Engineering & Agile Methodologies', code: 'CS3401' },
      { id: 'ai-fund', name: 'Artificial Intelligence Foundations', code: 'AI3401' },
    ],
    'sem-5': [
      { id: 'compiler', name: 'Compiler Design', code: 'CS3501' },
      { id: 'web-tech', name: 'Full Stack Web Technology', code: 'CS3592' },
      { id: 'crypto', name: 'Cryptography and Network Security', code: 'CS3551' },
      { id: 'cloud', name: 'Cloud Computing & Virtualization', code: 'CS3552' },
      { id: 'dist-sys', name: 'Distributed Systems & Microservices', code: 'CS3553' },
    ],
    'sem-6': [
      { id: 'mad', name: 'Mobile Application Development', code: 'CS3691' },
      { id: 'big-data', name: 'Big Data Analytics & Spark', code: 'CCS334' },
      { id: 'iot', name: 'Internet of Things (IoT) Architectures', code: 'CS3601' },
      { id: 'hpc', name: 'High Performance Parallel Computing', code: 'CCS348' },
    ],
    'sem-7': [
      { id: 'deep-learn', name: 'Deep Learning & Neural Networks', code: 'CS3701' },
      { id: 'cyber-sec', name: 'Cyber Security & Ethical Hacking', code: 'CS3702' },
      { id: 'blockchain', name: 'Blockchain Technologies & Smart Contracts', code: 'CCS332' },
      { id: 'devops', name: 'DevOps & Site Reliability Engineering', code: 'CCS356' },
    ],
    'sem-8': [
      { id: 'prof-ethics', name: 'Professional Ethics & Intellectual Property', code: 'GE3791' },
      { id: 'capstone', name: 'Capstone Project Work & Viva Voce', code: 'CS3811' },
    ],
  },
  aids: {
    'sem-1': [
      { id: 'aids-math-1', name: 'Calculus and Linear Algebra', code: 'MA3152' },
      { id: 'aids-python', name: 'Python for Data Science', code: 'AD3151' },
      { id: 'aids-phy', name: 'Applied Physics for Computational Sciences', code: 'PH3152' },
      { id: 'aids-eng', name: 'Communicative English', code: 'HS3152' },
    ],
    'sem-2': [
      { id: 'aids-prob', name: 'Probability and Statistics for AI', code: 'MA3252' },
      { id: 'aids-ds-py', name: 'Data Structures using Python & C++', code: 'AD3251' },
      { id: 'aids-data-found', name: 'Foundations of Data Science', code: 'AD3252' },
      { id: 'aids-dig-elec', name: 'Digital Logic & Computer Systems', code: 'AD3253' },
    ],
    'sem-3': [
      { id: 'ds', name: 'Data Structures & Algorithms in AI', code: 'AD3301' },
      { id: 'dbms', name: 'Relational & NoSQL Database Systems', code: 'AD3391' },
      { id: 'ai-fund', name: 'Artificial Intelligence Principles', code: 'AD3351' },
      { id: 'data-exploration', name: 'Exploratory Data Analysis & Visualization', code: 'AD3352' },
    ],
    'sem-4': [
      { id: 'ml', name: 'Machine Learning Algorithms & Applications', code: 'AD3491' },
      { id: 'os', name: 'Operating Systems & Linux Internals', code: 'AD3451' },
      { id: 'cn', name: 'Data Communication and Networking', code: 'AD3452' },
      { id: 'opt-tech', name: 'Optimization Techniques for AI', code: 'AD3401' },
    ],
    'sem-5': [
      { id: 'deep-learn', name: 'Deep Learning Architectures & PyTorch', code: 'AD3501' },
      { id: 'nlp', name: 'Natural Language Processing & LLMs', code: 'AD3551' },
      { id: 'big-data', name: 'Big Data Tools & Hadoop/Spark', code: 'AD3552' },
      { id: 'data-ethics', name: 'AI Ethics, Governance and Bias Mitigation', code: 'AD3591' },
    ],
    'sem-6': [
      { id: 'comp-vision', name: 'Computer Vision & Image Processing', code: 'AD3601' },
      { id: 'gen-ai', name: 'Generative AI & Prompt Engineering', code: 'AD3651' },
      { id: 'reinf-learn', name: 'Reinforcement Learning Systems', code: 'AD3652' },
      { id: 'cloud-ai', name: 'Cloud AI & MLOps Infrastructure', code: 'AD3691' },
    ],
    'sem-7': [
      { id: 'ai-health', name: 'AI in Healthcare & Finance', code: 'AD3701' },
      { id: 'ai-security', name: 'Adversarial AI & Defense Systems', code: 'AD3702' },
      { id: 'robotics', name: 'Autonomous Systems and Robotics', code: 'AD3703' },
    ],
    'sem-8': [
      { id: 'aids-project', name: 'Major Industry Capstone Project', code: 'AD3811' },
      { id: 'prof-ethics', name: 'Professional Ethics in Engineering', code: 'GE3791' },
    ],
  },
  csbs: {
    'sem-1': [
      { id: 'csbs-math', name: 'Discrete & Computational Mathematics', code: 'CB3151' },
      { id: 'csbs-prog', name: 'Principles of Computer Programming', code: 'CB3152' },
      { id: 'csbs-biz-1', name: 'Business Communication & Etiquette', code: 'CB3153' },
      { id: 'csbs-phy', name: 'Physics for Computing Science', code: 'CB3154' },
    ],
    'sem-2': [
      { id: 'csbs-stats', name: 'Statistical Methods & Business Analytics', code: 'CB3251' },
      { id: 'csbs-finance', name: 'Financial Management & Accounting', code: 'CB3252' },
      { id: 'ds', name: 'Data Structures and Algorithms', code: 'CB3253' },
      { id: 'csbs-design-thinking', name: 'Design Thinking & Innovation', code: 'CB3254' },
    ],
    'sem-3': [
      { id: 'algo', name: 'Advanced Algorithms for Business Applications', code: 'CB3301' },
      { id: 'dbms', name: 'Modern Database Management Systems', code: 'CB3391' },
      { id: 'os', name: 'Operating Systems & System Software', code: 'CB3351' },
      { id: 'csbs-econ', name: 'Economics for Engineers', code: 'CB3352' },
    ],
    'sem-4': [
      { id: 'se', name: 'Software Design with Agile & Scrum', code: 'CB3401' },
      { id: 'cn', name: 'Computer Networks & Enterprise Infrastructure', code: 'CB3451' },
      { id: 'marketing-analytics', name: 'Marketing Research & Analytics', code: 'CB3452' },
      { id: 'enterprise-java', name: 'Enterprise Java Programming', code: 'CB3453' },
    ],
    'sem-5': [
      { id: 'ml', name: 'Machine Learning in Business Decision Making', code: 'CB3501' },
      { id: 'csbs-hrm', name: 'Human Resource Management & Org Behavior', code: 'CB3551' },
      { id: 'cloud', name: 'Cloud Solutions for Business Enterprises', code: 'CB3552' },
      { id: 'business-intelligence', name: 'Business Intelligence & PowerBI/Tableau', code: 'CB3553' },
    ],
    'sem-6': [
      { id: 'fintech', name: 'FinTech, Payments & Digital Banking', code: 'CB3601' },
      { id: 'it-service-mgmt', name: 'IT Service & Quality Management (ITIL)', code: 'CB3651' },
      { id: 'big-data', name: 'Enterprise Data Lake & Analytics', code: 'CB3652' },
    ],
    'sem-7': [
      { id: 'strategic-mgmt', name: 'Strategic Management & Global Business', code: 'CB3701' },
      { id: 'cyber-compliance', name: 'Cyber Law, GDPR & Regulatory Compliance', code: 'CB3702' },
    ],
    'sem-8': [
      { id: 'csbs-internship', name: 'Corporate Internship & Capstone Project', code: 'CB3811' },
    ],
  },
  ece: {
    'sem-1': [
      { id: 'ece-math-1', name: 'Engineering Mathematics - I', code: 'MA3151' },
      { id: 'ece-phy', name: 'Physics for Electronics Engineering', code: 'PH3153' },
      { id: 'ece-chem', name: 'Engineering Chemistry', code: 'CY3151' },
      { id: 'ece-circuit', name: 'Circuit Theory and Network Analysis', code: 'EC3151' },
    ],
    'sem-2': [
      { id: 'ece-math-2', name: 'Engineering Mathematics - II', code: 'MA3251' },
      { id: 'ece-devices', name: 'Electronic Devices and Semiconductor Physics', code: 'EC3251' },
      { id: 'ece-c-prog', name: 'C and C++ Programming for Embedded', code: 'EC3252' },
    ],
    'sem-3': [
      { id: 'ece-circuits-ana', name: 'Analog Circuits & Amplifier Design', code: 'EC3351' },
      { id: 'ece-digital', name: 'Digital Logic and Verilog HDL', code: 'EC3352' },
      { id: 'ece-signals', name: 'Signals and Systems (Continuous & Discrete)', code: 'EC3354' },
      { id: 'ece-em-fields', name: 'Electromagnetic Fields and Waves', code: 'EC3353' },
    ],
    'sem-4': [
      { id: 'ece-dsp', name: 'Digital Signal Processing (DSP) & Filters', code: 'EC3451' },
      { id: 'ece-comm-theory', name: 'Analog and Digital Communication Theory', code: 'EC3452' },
      { id: 'ece-linear-ic', name: 'Linear Integrated Circuits & Op-Amps', code: 'EC3401' },
      { id: 'ece-mp-mc', name: 'Microprocessors & Microcontrollers (8051/ARM)', code: 'EC3491' },
    ],
    'sem-5': [
      { id: 'vlsi-design', name: 'VLSI Design and CMOS Technology', code: 'EC3501' },
      { id: 'ece-antenna', name: 'Transmission Lines, Antennas and Waveguides', code: 'EC3551' },
      { id: 'cn', name: 'Computer Communication Networks', code: 'EC3552' },
      { id: 'ece-control-sys', name: 'Control Systems Engineering', code: 'EC3553' },
    ],
    'sem-6': [
      { id: 'ece-wireless', name: 'Wireless & Mobile Communication (4G/5G)', code: 'EC3651' },
      { id: 'ece-embedded', name: 'Embedded Systems and RTOS', code: 'EC3652' },
      { id: 'ece-optical', name: 'Optical Communication and Photonics', code: 'EC3653' },
    ],
    'sem-7': [
      { id: 'ece-microwave', name: 'Microwave and Radar Engineering', code: 'EC3701' },
      { id: 'ece-satellite', name: 'Satellite Communication & GPS', code: 'EC3702' },
    ],
    'sem-8': [
      { id: 'ece-project', name: 'Final Year Major Engineering Project', code: 'EC3811' },
    ],
  },
  vlsi: {
    'sem-1': [
      { id: 'vlsi-math-1', name: 'Calculus and Linear Algebra for VLSI', code: 'VL3151' },
      { id: 'vlsi-semi-phy', name: 'Physics of Semiconductor Devices', code: 'VL3152' },
      { id: 'vlsi-circuit', name: 'Network Analysis and Synthesis', code: 'VL3153' },
    ],
    'sem-2': [
      { id: 'vlsi-solid-state', name: 'Solid State Electronic Devices', code: 'VL3251' },
      { id: 'vlsi-c-hdl', name: 'Hardware Description Languages (Verilog)', code: 'VL3252' },
      { id: 'vlsi-diff-eq', name: 'Differential Equations & Transforms', code: 'VL3253' },
    ],
    'sem-3': [
      { id: 'vlsi-digital-ic', name: 'Digital IC Design and Synthesis', code: 'VL3301' },
      { id: 'vlsi-cmos-analog', name: 'CMOS Analog Integrated Circuit Design', code: 'VL3351' },
      { id: 'vlsi-mosfet', name: 'MOSFET Modeling and Characterization', code: 'VL3352' },
    ],
    'sem-4': [
      { id: 'vlsi-fpga', name: 'FPGA Architecture & Prototyping', code: 'VL3401' },
      { id: 'vlsi-testing', name: 'VLSI Testing and Fault Simulation', code: 'VL3451' },
      { id: 'vlsi-low-power', name: 'Low Power VLSI System Design', code: 'VL3452' },
    ],
    'sem-5': [
      { id: 'vlsi-soc', name: 'System on Chip (SoC) Design & AXI', code: 'VL3501' },
      { id: 'vlsi-physical-design', name: 'Physical Design Automation & Cadence Flow', code: 'VL3551' },
      { id: 'vlsi-rf-ic', name: 'RF and Mixed-Signal IC Design', code: 'VL3552' },
    ],
    'sem-6': [
      { id: 'vlsi-asic', name: 'ASIC Verification with SystemVerilog/UVM', code: 'VL3601' },
      { id: 'vlsi-mem-tech', name: 'Memory Architecture (SRAM, DRAM, Flash)', code: 'VL3651' },
    ],
    'sem-7': [
      { id: 'vlsi-tapeout', name: 'Tapeout Methodology & DRC/LVS Verification', code: 'VL3701' },
      { id: 'vlsi-quantum', name: 'Quantum & Nanoelectronics', code: 'VL3702' },
    ],
    'sem-8': [
      { id: 'vlsi-capstone', name: 'Silicon Tapeout Project & Dissertation', code: 'VL3811' },
    ],
  },
  mech: {
    'sem-1': [
      { id: 'mech-math-1', name: 'Matrices and Calculus', code: 'MA3151' },
      { id: 'mech-eng-graphics', name: 'Engineering Graphics & Drawing', code: 'GE3152' },
      { id: 'mech-phy', name: 'Engineering Physics', code: 'PH3151' },
      { id: 'mech-chem', name: 'Engineering Chemistry', code: 'CY3151' },
    ],
    'sem-2': [
      { id: 'mech-math-2', name: 'Statistics & Numerical Methods', code: 'MA3251' },
      { id: 'mech-mechanics', name: 'Engineering Mechanics (Statics & Dynamics)', code: 'ME3251' },
      { id: 'mech-mfg-tech-1', name: 'Manufacturing Technology - I', code: 'ME3252' },
    ],
    'sem-3': [
      { id: 'mech-thermo', name: 'Engineering Thermodynamics', code: 'ME3351' },
      { id: 'mech-som', name: 'Strength of Materials for Mechanical', code: 'ME3352' },
      { id: 'mech-fluid', name: 'Fluid Mechanics and Machinery', code: 'ME3353' },
      { id: 'mech-mfg-tech-2', name: 'Manufacturing Technology - II', code: 'ME3391' },
    ],
    'sem-4': [
      { id: 'mech-kom', name: 'Kinematics of Machinery (KOM)', code: 'ME3451' },
      { id: 'mech-applied-thermo', name: 'Thermal Engineering & Applied Thermodynamics', code: 'ME3452' },
      { id: 'mech-materials', name: 'Materials Science and Metallurgy', code: 'ME3401' },
      { id: 'mech-metrology', name: 'Engineering Metrology and Measurements', code: 'ME3491' },
    ],
    'sem-5': [
      { id: 'mech-dom', name: 'Dynamics of Machinery (DOM)', code: 'ME3551' },
      { id: 'mech-dme', name: 'Design of Machine Elements', code: 'ME3552' },
      { id: 'mech-heat-transfer', name: 'Heat and Mass Transfer', code: 'ME3553' },
      { id: 'mech-cad-cam', name: 'CAD/CAM Principles and CNC Programming', code: 'ME3591' },
    ],
    'sem-6': [
      { id: 'mech-design-transmission', name: 'Design of Transmission Systems', code: 'ME3651' },
      { id: 'mech-fem', name: 'Finite Element Analysis (FEA/ANSYS)', code: 'ME3652' },
      { id: 'mech-hydraulics', name: 'Hydraulics and Pneumatics Systems', code: 'ME3653' },
    ],
    'sem-7': [
      { id: 'mech-mechatronics', name: 'Mechatronics and Industrial Automation', code: 'ME3701' },
      { id: 'mech-robotics', name: 'Robotics and Automated Guided Vehicles', code: 'ME3702' },
      { id: 'mech-power-plant', name: 'Power Plant Engineering & Renewable Energy', code: 'ME3703' },
    ],
    'sem-8': [
      { id: 'mech-project', name: 'Major Final Year Project Work', code: 'ME3811' },
    ],
  },
};

// Rich curated notes for top subjects
export const CURATED_NOTES_MAP = {
  // Data Structures
  ds: [
    {
      id: 'ds-u1',
      title: 'Unit 1: Linear Data Structures (Arrays, Stacks, Queues & Applications)',
      type: 'PDF',
      size: '2.8 MB',
      author: 'Prof. R. Sundaram (HOD CSE)',
      downloads: '1.4k',
      pages: 48,
      topics: ['Array implementations', 'Infix to Postfix conversion', 'Circular Queues', 'Deque & Priority Queue', 'Call stack mechanics']
    },
    {
      id: 'ds-u2',
      title: 'Unit 2: Linked Lists (Singly, Doubly, Circular & Polynomial Arithmetic)',
      type: 'PDF',
      size: '3.1 MB',
      author: 'Dr. Anita Sharma',
      downloads: '1.9k',
      pages: 52,
      topics: ['Pointer manipulations', 'Reversing linked list', 'Doubly circular lists', 'Polynomial addition & multiplication']
    },
    {
      id: 'ds-u3',
      title: 'Unit 3: Non-Linear Structures (Binary Trees, BST, AVL Trees & Red-Black)',
      type: 'PDF',
      size: '4.2 MB',
      author: 'Dr. K. Balaji',
      downloads: '2.3k',
      pages: 64,
      topics: ['Tree traversals (Recursive & Iterative)', 'AVL Rotations', 'Binary Search Tree operations', 'B-Trees introduction']
    },
    {
      id: 'ds-u4',
      title: 'Unit 4: Graph Algorithms (BFS, DFS, Dijkstra, Prim & Kruskal)',
      type: 'PDF',
      size: '3.6 MB',
      author: 'Prof. S. Karthik',
      downloads: '1.7k',
      pages: 56,
      topics: ['Adjacency matrix vs list', 'Shortest path algorithms', 'Minimum Spanning Trees', 'Topological Sorting']
    },
    {
      id: 'ds-u5',
      title: 'Unit 5: Hashing Techniques & Sorting Algorithms (Quick, Merge, Radix, Heap)',
      type: 'PDF',
      size: '3.0 MB',
      author: 'Alumni Mentorship Cell',
      downloads: '2.1k',
      pages: 45,
      topics: ['Hash functions', 'Collision resolution (Chaining, Probing)', 'Comparison sort complexities', 'Heapify algorithm']
    },
    {
      id: 'ds-qb',
      title: 'Anna University Solved 2-Mark & 16-Mark Question Bank with Solutions',
      type: 'PDF',
      size: '5.5 MB',
      author: 'Anna University Academic Board',
      downloads: '3.8k',
      pages: 82,
      topics: ['Regulation 2021 questions', 'Nov/Dec & Apr/May solved questions', 'Common viva questions', 'Code snippet questions']
    },
    {
      id: 'ds-cheat',
      title: 'Data Structures Quick Revision & Time Complexity Cheat Sheet',
      type: 'TXT',
      size: '180 KB',
      author: 'Competitive Coding Club',
      downloads: '4.2k',
      pages: 12,
      topics: ['Big-O table for all operations', 'Recursion stack formulas', 'Standard algorithms summary']
    }
  ],

  // Design and Analysis of Algorithms
  algo: [
    {
      id: 'algo-u1',
      title: 'Unit 1: Foundations of Algorithm Analysis, Asymptotic Notations & Recurrence',
      type: 'PDF',
      size: '3.2 MB',
      author: 'Dr. Michael Chen',
      downloads: '1.2k',
      pages: 44,
      topics: ['Big-O, Omega, Theta notations', 'Master Theorem with proofs', 'Recursion Tree method', 'Divide and conquer analysis']
    },
    {
      id: 'algo-u2',
      title: 'Unit 2: Divide and Conquer & Greedy Strategies (Huffman, Fractional Knapsack)',
      type: 'PDF',
      size: '3.7 MB',
      author: 'Prof. Meenakshi Sundaram',
      downloads: '1.6k',
      pages: 58,
      topics: ['Merge sort & Quick sort proofs', 'Optimal caching', 'Huffman code tree creation', 'Job sequencing with deadlines']
    },
    {
      id: 'algo-u3',
      title: 'Unit 3: Dynamic Programming (0/1 Knapsack, LCS, Matrix Chain & Warshall)',
      type: 'PDF',
      size: '4.5 MB',
      author: 'Dr. V. Ramakrishnan',
      downloads: '2.4k',
      pages: 66,
      topics: ['Memoization vs Tabulation', 'Longest Common Subsequence', 'Matrix Chain Multiplication', 'All pairs shortest path']
    },
    {
      id: 'algo-u4',
      title: 'Unit 4: Backtracking & Branch and Bound (N-Queens, TSP, Subset Sum)',
      type: 'PDF',
      size: '3.4 MB',
      author: 'Prof. Priya Natarajan',
      downloads: '1.3k',
      pages: 49,
      topics: ['State space tree formulation', '8-Queens problem algorithm', 'Branch and bound TSP', 'Hamiltonian cycle']
    },
    {
      id: 'algo-u5',
      title: 'Unit 5: Tractability, P vs NP, NP-Complete & Approximation Algorithms',
      type: 'PDF',
      size: '2.9 MB',
      author: 'Dr. R. Sengottuvel',
      downloads: '1.5k',
      pages: 42,
      topics: ['Polynomial reductions', 'Cook-Levin theorem overview', 'Vertex cover approximation', 'Clique problem proof']
    },
    {
      id: 'algo-qb',
      title: 'DAA 2-Mark with Answers & 16-Mark Comprehensive Question Bank',
      type: 'PDF',
      size: '4.8 MB',
      author: 'AU Examination Wing',
      downloads: '2.9k',
      pages: 74,
      topics: ['Solved recurrence relations', 'Complexity derivations', 'Proof of correctness templates']
    }
  ],

  // Database Management Systems
  dbms: [
    {
      id: 'dbms-u1',
      title: 'Unit 1: Introduction to DBMS, Three-Tier Architecture & ER Modeling',
      type: 'PDF',
      size: '3.4 MB',
      author: 'Dr. S. K. Gupta',
      downloads: '1.8k',
      pages: 50,
      topics: ['DBMS vs File system', 'Three Schema Architecture', 'ER to Relational schema mapping', 'Extended ER features']
    },
    {
      id: 'dbms-u2',
      title: 'Unit 2: Relational Algebra, SQL, Complex Queries, Triggers & Normalization',
      type: 'PDF',
      size: '4.6 MB',
      author: 'Prof. Lakshmi Narayanan',
      downloads: '2.7k',
      pages: 68,
      topics: ['DDL, DML, DCL commands', 'Nested subqueries & Joins', 'PL/SQL procedures & triggers', '1NF, 2NF, 3NF, BCNF proofs']
    },
    {
      id: 'dbms-u3',
      title: 'Unit 3: Transaction Management, ACID Properties & Concurrency Control',
      type: 'PDF',
      size: '3.8 MB',
      author: 'Dr. Aruna Devi',
      downloads: '2.0k',
      pages: 54,
      topics: ['Serializability & conflict serializability', 'Two-Phase Locking (2PL)', 'Timestamp ordering protocol', 'Deadlock detection']
    },
    {
      id: 'dbms-u4',
      title: 'Unit 4: Physical Storage, Indexing, B+ Trees & Query Optimization',
      type: 'PDF',
      size: '3.5 MB',
      author: 'Prof. G. Venkatesh',
      downloads: '1.5k',
      pages: 46,
      topics: ['RAID architectures', 'Dense vs Sparse indexes', 'B+ Tree insertion and deletion', 'Cost-based query evaluation']
    },
    {
      id: 'dbms-u5',
      title: 'Unit 5: Distributed Databases, NoSQL Models & MongoDB Architecture',
      type: 'PDF',
      size: '3.1 MB',
      author: 'Cloud Data Lab',
      downloads: '1.9k',
      pages: 44,
      topics: ['CAP theorem explained', 'Key-value, Columnar, Document stores', 'MongoDB CRUD operations', 'Data fragmentation & replication']
    },
    {
      id: 'dbms-qb',
      title: 'DBMS 100 Important 2-Marks & Solved 16-Mark University Questions',
      type: 'PDF',
      size: '5.2 MB',
      author: 'Anna University Question Cell',
      downloads: '3.4k',
      pages: 80,
      topics: ['Schema normalization exercises', 'SQL query writing practice', 'Concurrency conflict solving']
    }
  ],

  // Operating Systems
  os: [
    {
      id: 'os-u1',
      title: 'Unit 1: Operating System Services, Dual Mode, System Calls & Structures',
      type: 'PDF',
      size: '2.9 MB',
      author: 'Dr. T. Natarajan',
      downloads: '1.5k',
      pages: 42,
      topics: ['Kernel vs User mode', 'System call sequence (fork, exec, wait)', 'Monolithic vs Microkernel architecture']
    },
    {
      id: 'os-u2',
      title: 'Unit 2: Process Management, CPU Scheduling Algorithms & Threading',
      type: 'PDF',
      size: '3.9 MB',
      author: 'Prof. Ramesh Kumar',
      downloads: '2.5k',
      pages: 58,
      topics: ['Process Control Block (PCB)', 'FCFS, SJF, SRTF, Priority, Round Robin', 'Multi-threading models', 'Gantt chart problems']
    },
    {
      id: 'os-u3',
      title: 'Unit 3: Synchronization, Critical Section, Semaphores & Deadlock Handling',
      type: 'PDF',
      size: '4.3 MB',
      author: 'Dr. Preethi Srinivasan',
      downloads: '2.8k',
      pages: 62,
      topics: ["Peterson's solution", 'Counting vs Binary semaphores', "Banker's Algorithm solved numericals", 'Resource allocation graphs']
    },
    {
      id: 'os-u4',
      title: 'Unit 4: Memory Management, Paging, Segmentation & Virtual Memory (LRU, FIFO)',
      type: 'PDF',
      size: '4.1 MB',
      author: 'Prof. K. Anand',
      downloads: '2.2k',
      pages: 55,
      topics: ['Address translation with TLB', 'Internal vs External fragmentation', 'Page replacement algorithms', 'Thrashing & Working set']
    },
    {
      id: 'os-u5',
      title: 'Unit 5: File Systems, Directory Structure, Disk Scheduling & Linux Case Study',
      type: 'PDF',
      size: '3.3 MB',
      author: 'Systems Programming Group',
      downloads: '1.8k',
      pages: 48,
      topics: ['Contiguous, Linked, Indexed allocation', 'SCAN, C-SCAN, LOOK disk scheduling', 'Linux VFS and Inodes', 'Security and protection']
    },
    {
      id: 'os-qb',
      title: 'Operating Systems Anna University Solved Papers & 2-Mark Answers',
      type: 'PDF',
      size: '5.4 MB',
      author: 'AU Examination Faculty',
      downloads: '3.5k',
      pages: 78,
      topics: ['Banker algorithm step-by-step', 'Scheduling chart numericals', 'Page fault computation']
    }
  ],

  // Computer Networks
  cn: [
    {
      id: 'cn-u1',
      title: 'Unit 1: Data Communication Fundamentals, OSI 7-Layer & TCP/IP Reference Model',
      type: 'PDF',
      size: '3.1 MB',
      author: 'Dr. V. Senthil',
      downloads: '1.6k',
      pages: 46,
      topics: ['Physical media', 'Packet switching vs Circuit switching', 'OSI layer-by-layer breakdown', 'Network topologies']
    },
    {
      id: 'cn-u2',
      title: 'Unit 2: Data Link Layer, Error Detection (CRC), Framing & MAC Protocols',
      type: 'PDF',
      size: '3.8 MB',
      author: 'Prof. D. Rajasekar',
      downloads: '1.9k',
      pages: 54,
      topics: ['Hamming code & CRC polynomial division', 'Stop-and-Wait, Go-Back-N, Selective Repeat', 'CSMA/CD & Ethernet standards']
    },
    {
      id: 'cn-u3',
      title: 'Unit 3: Network Layer, IP Addressing (IPv4/IPv6), Subnetting & Routing (OSPF, RIP)',
      type: 'PDF',
      size: '4.4 MB',
      author: 'Network Engineering Dept',
      downloads: '2.6k',
      pages: 65,
      topics: ['Classless Inter-Domain Routing (CIDR)', 'Distance Vector vs Link State Routing', 'ARP, RARP, ICMP, DHCP protocols', 'BGP overview']
    },
    {
      id: 'cn-u4',
      title: 'Unit 4: Transport Layer, TCP 3-Way Handshake, UDP & Congestion Control',
      type: 'PDF',
      size: '3.6 MB',
      author: 'Dr. Deepa Chandran',
      downloads: '2.1k',
      pages: 52,
      topics: ['Port numbers & Sockets', 'TCP connection establishment & termination', 'AIMD, Slow start & Congestion avoidance', 'UDP vs TCP comparison']
    },
    {
      id: 'cn-u5',
      title: 'Unit 5: Application Layer Protocols (DNS, HTTP/2, SMTP, FTP) & Network Security',
      type: 'PDF',
      size: '3.2 MB',
      author: 'Prof. M. Vijay',
      downloads: '1.7k',
      pages: 45,
      topics: ['DNS hierarchy & resolution', 'HTTP request/response structure', 'Email architectures', 'Firewalls and SSL/TLS handshake']
    },
    {
      id: 'cn-qb',
      title: 'Computer Networks 2-Mark & 16-Mark Question Bank with Solved Numericals',
      type: 'PDF',
      size: '4.9 MB',
      author: 'Anna University Board',
      downloads: '3.1k',
      pages: 76,
      topics: ['Subnet mask calculation problems', 'CRC polynomial solved problems', 'Routing table formulation exercises']
    }
  ],

  // Machine Learning
  ml: [
    {
      id: 'ml-u1',
      title: 'Unit 1: Supervised Learning Foundations, Linear Regression & Gradient Descent',
      type: 'PDF',
      size: '3.5 MB',
      author: 'Dr. A. Rajesh (AI Lab)',
      downloads: '2.2k',
      pages: 50,
      topics: ['Loss functions & Cost functions', 'Batch vs Stochastic Gradient Descent', 'Polynomial Regression', 'Bias-Variance Tradeoff']
    },
    {
      id: 'ml-u2',
      title: 'Unit 2: Classification, Logistic Regression, SVM & Decision Trees',
      type: 'PDF',
      size: '4.2 MB',
      author: 'Prof. K. Gayatri',
      downloads: '2.8k',
      pages: 60,
      topics: ['Sigmoid function & Log-odds', 'Maximum Margin Hyperplanes in SVM', 'Information Gain, Entropy, Gini Index', 'Pruning strategies']
    },
    {
      id: 'ml-u3',
      title: 'Unit 3: Ensemble Learning, Random Forests, AdaBoost & XGBoost',
      type: 'PDF',
      size: '3.9 MB',
      author: 'Dr. S. Vignesh',
      downloads: '2.5k',
      pages: 54,
      topics: ['Bagging vs Boosting', 'Voting classifiers', 'Gradient Boosting derivation', 'Hyperparameter tuning with GridSearchCV']
    },
    {
      id: 'ml-u4',
      title: 'Unit 4: Unsupervised Learning, K-Means Clustering, PCA & Dimensionality Reduction',
      type: 'PDF',
      size: '3.7 MB',
      author: 'Data Science Faculty',
      downloads: '1.9k',
      pages: 48,
      topics: ['Elbow method for K selection', 'Hierarchical clustering (Dendrograms)', 'Eigenvalues and Eigenvectors in PCA', 't-SNE visualization']
    },
    {
      id: 'ml-u5',
      title: 'Unit 5: Model Evaluation Metrics, Cross Validation, ROC-AUC & Neural Net Intro',
      type: 'PDF',
      size: '3.4 MB',
      author: 'AI Research Group',
      downloads: '2.1k',
      pages: 46,
      topics: ['Confusion Matrix, Precision, Recall, F1-Score', 'ROC curves and AUC interpretation', 'K-Fold Cross Validation', 'Perceptron learning rule']
    },
    {
      id: 'ml-qb',
      title: 'Machine Learning Anna University Question Bank & Practical Viva Guide',
      type: 'PDF',
      size: '5.1 MB',
      author: 'AI & Data Science Faculty Board',
      downloads: '3.2k',
      pages: 72,
      topics: ['Entropy calculation problems', 'Gradient descent step computations', 'Evaluation metric derivation questions']
    }
  ],

  // AU Previous Year Question Papers Fallback
  'au-questions': [
    { id: 'q2024', title: 'Anna University Solved Board Examination Question Paper - Nov/Dec 2024', type: 'PDF', size: '5.8 MB', author: 'Anna University Controller of Examinations', downloads: '4.9k', pages: 28 },
    { id: 'q2023', title: 'Anna University Solved Board Examination Question Paper - Apr/May 2023', type: 'PDF', size: '5.2 MB', author: 'Anna University Controller of Examinations', downloads: '4.1k', pages: 26 },
    { id: 'q2022', title: 'Anna University Solved Board Examination Question Paper - Nov/Dec 2022', type: 'PDF', size: '4.8 MB', author: 'Anna University Controller of Examinations', downloads: '3.7k', pages: 24 },
    { id: 'q2021', title: 'Anna University Regulation 2021 Model Question Paper with Answer Key', type: 'PDF', size: '4.5 MB', author: 'Centre for Academic Courses, AU', downloads: '5.3k', pages: 32 },
    { id: 'q-handbook', title: 'Comprehensive Engineering Exam Success Handbook & Scoring Strategies', type: 'PDF', size: '3.9 MB', author: 'Deans Academic Committee', downloads: '6.2k', pages: 40 },
  ]
};

// Generates high-quality syllabus-aligned notes dynamically for any subject
export const getNotesForSubject = (subjectId, subjectName, deptName = 'Engineering', semName = 'Semester') => {
  if (CURATED_NOTES_MAP[subjectId]) {
    return CURATED_NOTES_MAP[subjectId];
  }

  // If not curated, create complete comprehensive 8-item note pack!
  return [
    {
      id: `${subjectId}-u1`,
      title: `Unit 1: Fundamentals, Principles & Foundations of ${subjectName}`,
      type: 'PDF',
      size: '2.9 MB',
      author: `${deptName} Senior Faculty Team`,
      downloads: '1.1k',
      pages: 46,
      topics: [
        'Introduction & historical evolution',
        'Basic laws, definitions & terminologies',
        'Standard models and architectural taxonomy',
        'Mathematical formulation and basic principles'
      ]
    },
    {
      id: `${subjectId}-u2`,
      title: `Unit 2: Core Concepts, Methodologies & Structural Analysis`,
      type: 'PDF',
      size: '3.4 MB',
      author: `Prof. Academic Coordinator (${deptName})`,
      downloads: '1.4k',
      pages: 52,
      topics: [
        'Deep dive into second module principles',
        'Component interaction & subsystem modeling',
        'Standard algorithms and design workflows',
        'Solved illustrative examples and derivations'
      ]
    },
    {
      id: `${subjectId}-u3`,
      title: `Unit 3: Advanced Principles, System Design & Performance Analysis`,
      type: 'PDF',
      size: '4.1 MB',
      author: `Dr. Subject Matter Expert, ${deptName}`,
      downloads: '1.7k',
      pages: 60,
      topics: [
        'Optimization methods & criteria',
        'System trade-offs and efficiency metrics',
        'Industrial standard design rules',
        'Complex analytical problem solutions'
      ]
    },
    {
      id: `${subjectId}-u4`,
      title: `Unit 4: Implementation Frameworks, Protocols & Modern Applications`,
      type: 'PDF',
      size: '3.7 MB',
      author: `${deptName} Curriculum Development Cell`,
      downloads: '1.3k',
      pages: 54,
      topics: [
        'Practical implementation methodologies',
        'Modern software/hardware tools & platforms',
        'Standard operational protocols',
        'Integration with enterprise systems'
      ]
    },
    {
      id: `${subjectId}-u5`,
      title: `Unit 5: Real-World Case Studies, Standards & Emerging Industry Trends`,
      type: 'PDF',
      size: '3.2 MB',
      author: `Industry Advisory Board & Alumni`,
      downloads: '1.5k',
      pages: 48,
      topics: [
        'Recent innovations & patent disclosures',
        'Regulatory standards and compliance',
        'Benchmark comparative studies',
        'Future technological horizons'
      ]
    },
    {
      id: `${subjectId}-qb`,
      title: `${subjectName} - Important Part-A (2 Marks) & Part-B (16 Marks) Solved Question Bank`,
      type: 'PDF',
      size: '5.2 MB',
      author: 'Anna University Examination Cell',
      downloads: '2.8k',
      pages: 76,
      topics: [
        'Top 50 frequently asked Part-A 2-mark questions',
        'Solved 13-mark & 16-mark descriptive questions',
        'Previous 5 examination paper questions compiled',
        'Examiner marking scheme tips'
      ]
    },
    {
      id: `${subjectId}-cheat`,
      title: `${subjectName} - Quick Revision Notes, Formulas & Key Definitions`,
      type: 'TXT',
      size: '190 KB',
      author: 'University Rank Holders Circle',
      downloads: '3.1k',
      pages: 14,
      topics: [
        'Must-memorize formulas and laws',
        'Quick comparison tables and bullet notes',
        'Last-night revision checklist'
      ]
    },
    {
      id: `${subjectId}-solved-qp`,
      title: `${subjectName} - Anna University Previous 5 Years Solved Question Papers`,
      type: 'PDF',
      size: '6.4 MB',
      author: 'Controller of Examinations Board',
      downloads: '3.6k',
      pages: 92,
      topics: [
        'Regulation 2021 latest semester exam papers',
        'Step-by-step verified answer keys',
        'Common student error analysis'
      ]
    }
  ];
};
