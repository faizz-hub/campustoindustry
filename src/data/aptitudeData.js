export const APTITUDE_TRACKS = {
  tcs: {
    name: 'TCS NQT & Wipro (Quantitative)',
    description: 'Numerical ability, time & work, percentages, profit & loss, and algebra.',
    timeSeconds: 600,
    questions: [
      {
        id: 'q1',
        question: 'If 12 men or 18 women can complete a work in 14 days, then how many days will 8 men and 16 women take to complete the same work?',
        options: ['7 days', '8 days', '9 days', '10 days'],
        correctIndex: 2,
        explanation: '12 Men = 18 Women => 1 Man = 1.5 Women. Total work in terms of women = 18 * 14 = 252 women-days. 8 Men + 16 Women = (8 * 1.5) + 16 = 12 + 16 = 28 women. Time taken = 252 / 28 = 9 days.'
      },
      {
        id: 'q2',
        question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
        options: ['65 seconds', '89 seconds', '100 seconds', '150 seconds'],
        correctIndex: 1,
        explanation: 'Speed of the train = Length of train / Time = 240 m / 24 s = 10 m/s. Total distance to cross platform = 240 m + 650 m = 890 m. Time required = 890 m / 10 m/s = 89 seconds.'
      },
      {
        id: 'q3',
        question: 'The price of sugar rises by 25%. By what percentage should a family reduce its consumption so that the total expenditure remains unchanged?',
        options: ['20%', '25%', '15%', '18.5%'],
        correctIndex: 0,
        explanation: 'Formula: Reduction % = [r / (100 + r)] * 100%. Here r = 25%. Reduction = [25 / (100 + 25)] * 100% = [25 / 125] * 100% = 1/5 * 100% = 20%.'
      },
      {
        id: 'q4',
        question: 'A sum of money doubles itself at compound interest in 15 years. In how many years will it become 8 times of itself at the same rate?',
        options: ['30 years', '45 years', '60 years', '25 years'],
        correctIndex: 1,
        explanation: 'Amount doubles in 15 years: 2^1 in 15 years. To become 8 times = 2^3 times. The required time is 3 * 15 = 45 years.'
      },
      {
        id: 'q5',
        question: 'A pipe can fill a cistern in 6 hours, while another pipe empties it in 8 hours. If both pipes are opened together, how long will it take to fill the empty cistern?',
        options: ['12 hours', '18 hours', '24 hours', '30 hours'],
        correctIndex: 2,
        explanation: 'Net fill rate per hour = (1/6) - (1/8) = (4 - 3) / 24 = 1/24. Thus, it will take exactly 24 hours to fill the cistern.'
      }
    ]
  },
  zoho: {
    name: 'Zoho & Infosys (Logical & Puzzles)',
    description: 'Pattern deduction, blood relations, syllogisms, and sequencing puzzles.',
    timeSeconds: 600,
    questions: [
      {
        id: 'z1',
        question: 'Find the missing number in the series: 3, 7, 15, 31, 63, ?',
        options: ['95', '115', '127', '128'],
        correctIndex: 2,
        explanation: 'Pattern is (x * 2) + 1. 3*2+1 = 7, 7*2+1 = 15, 15*2+1 = 31, 31*2+1 = 63, 63*2+1 = 127.'
      },
      {
        id: 'z2',
        question: 'Pointing to a photograph, a man said: "I have no brother or sister, but that man\'s father is my father\'s son." Whose photograph was it?',
        options: ['His own', 'His son', 'His father', 'His nephew'],
        correctIndex: 1,
        explanation: 'Since the speaker has no brother or sister, "my father\'s son" is the speaker himself. Thus, "that man\'s father is myself", meaning the photograph is of his son.'
      },
      {
        id: 'z3',
        question: 'In a certain code, "COMPUTER" is written as "RFUVQNPC". How is "MEDICINE" written in that same code?',
        options: ['EOJDJEFM', 'EOJDEJFM', 'MFEJDJOE', 'DJEOFMJE'],
        correctIndex: 0,
        explanation: 'The first and last letters are swapped and positions inverted with a +1 character shift across the inner sequence.'
      },
      {
        id: 'z4',
        question: 'Statement: All engineers are creative. Some creative people are leaders. Conclusions: I. Some engineers are leaders. II. All leaders are creative.',
        options: ['Only I follows', 'Only II follows', 'Neither I nor II follows', 'Both I and II follow'],
        correctIndex: 2,
        explanation: 'There is no direct universal intersection between engineers and leaders, and the premise only specifies "some" creative people are leaders.'
      },
      {
        id: 'z5',
        question: 'If Monday falls on 1st January 2024 (a Leap Year), what day of the week will 1st January 2025 be?',
        options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        correctIndex: 1,
        explanation: '2024 is a leap year having 366 days. 366 mod 7 = 2 odd days. Moving forward 2 days from Monday gives Wednesday.'
      }
    ]
  },
  zoho_coding: {
    name: 'Zoho C/C++ Output & Technical Aptitude',
    description: 'Pointer arithmetic, loop execution order, recursion tracing, and memory layout.',
    timeSeconds: 600,
    questions: [
      {
        id: 'zc1',
        question: 'What is the output of the C snippet: int a = 5; printf("%d %d %d", a++, ++a, a); ?',
        options: ['5 7 7', 'Compiler / Undefined Behavior', '5 6 7', '6 7 7'],
        correctIndex: 1,
        explanation: 'Modifying a variable multiple times without a sequence point leads to Undefined Behavior in C standard.'
      },
      {
        id: 'zc2',
        question: 'What will be the value of *ptr after execution: int arr[] = {10, 20, 30}; int *ptr = arr; ptr++; (*ptr)++; ?',
        options: ['10', '20', '21', '30'],
        correctIndex: 2,
        explanation: 'ptr++ points to arr[1] (20). (*ptr)++ increments the value at arr[1] from 20 to 21.'
      },
      {
        id: 'zc3',
        question: 'How many times will "Zoho" be printed? void fun(int n){ if(n<=0) return; printf("Zoho "); fun(n-1); fun(n-1); } fun(3);',
        options: ['3 times', '7 times', '8 times', '15 times'],
        correctIndex: 1,
        explanation: 'Total calls with print statement: 2^3 - 1 = 7 times (for n=3, 2^3-1 nodes in execution tree).'
      },
      {
        id: 'zc4',
        question: 'What does bitwise expression (x & (x - 1)) == 0 check for a positive integer x?',
        options: ['Checks if x is even', 'Checks if x is prime', 'Checks if x is a power of 2', 'Checks if x is odd'],
        correctIndex: 2,
        explanation: 'A power of 2 has only 1 set bit in binary. Subtracting 1 flips all bits up to that bit. Bitwise AND yields 0.'
      },
      {
        id: 'zc5',
        question: 'What is the space complexity of a recursive Fibonacci function without memoization for input N?',
        options: ['O(1)', 'O(N) call stack', 'O(2^N)', 'O(N log N)'],
        correctIndex: 1,
        explanation: 'The maximum depth of the recursive call stack at any instance is N, making auxiliary space O(N).'
      }
    ]
  },
  google: {
    name: 'Google & Product Giants (Advanced Problem Solving)',
    description: 'Data structures, algorithm efficiency, graph logic, and probability logic.',
    timeSeconds: 600,
    questions: [
      {
        id: 'g1',
        question: 'What is the tight worst-case time complexity of searching an element in a Balanced Binary Search Tree (AVL / Red-Black)?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctIndex: 1,
        explanation: 'Balanced BSTs guarantee tree height stays capped at O(log N), ensuring search executes in O(log N).'
      },
      {
        id: 'g2',
        question: 'In a directed acyclic graph (DAG), which algorithm is used to find a linear ordering of vertices such that for every directed edge u -> v, u comes before v?',
        options: ['Dijkstra Algorithm', 'Topological Sort (Kahn / DFS)', 'Kruskal Algorithm', 'Floyd-Warshall'],
        correctIndex: 1,
        explanation: 'Topological sorting is uniquely defined for DAGs to establish dependencies.'
      },
      {
        id: 'g3',
        question: 'You have 25 horses and a track where max 5 horses can race at once. What is the minimum number of races needed to find the top 3 fastest horses without a stopwatch?',
        options: ['5 races', '6 races', '7 races', '8 races'],
        correctIndex: 2,
        explanation: 'Run 5 preliminary races (25 horses), 1 winner race (race 6), and 1 final race between candidate horses for 2nd and 3rd place (race 7).'
      },
      {
        id: 'g4',
        question: 'Which amortized time complexity does an push operation take in a dynamic array (std::vector / ArrayList)?',
        options: ['O(N)', 'O(1) amortized', 'O(log N)', 'O(N^2)'],
        correctIndex: 1,
        explanation: 'Doubling capacity when full spreads out array reallocation costs over N elements, averaging O(1) per push.'
      },
      {
        id: 'g5',
        question: 'What is the total number of edges in a complete undirected graph with N vertices?',
        options: ['N * (N - 1)', 'N * (N - 1) / 2', 'N^2', '2^N'],
        correctIndex: 1,
        explanation: 'Each vertex connects to N-1 others. Since undirected, divide by 2: N*(N-1)/2.'
      }
    ]
  },
  amazon: {
    name: 'Amazon SDE (Workplace & Data Logic)',
    description: 'Analytical reasoning, business metrics, array windows, and customer obsession logic.',
    timeSeconds: 600,
    questions: [
      {
        id: 'a1',
        question: 'An e-commerce system processes 10,000 transactions per second. If latency increases from 50ms to 200ms, what happens to concurrent connections according to Little\'s Law (L = λ * W)?',
        options: ['Connections drop by 4x', 'Connections increase 4x (from 500 to 2000)', 'Connections remain constant', 'Transactions drop to 0'],
        correctIndex: 1,
        explanation: 'L = λ * W => 10,000 * 0.05s = 500. With 0.20s latency, L = 10,000 * 0.20s = 2000 concurrent connections.'
      },
      {
        id: 'a2',
        question: 'What is the optimal algorithm to find the Maximum Sum Subarray in an array of integers (containing both positive and negative values)?',
        options: ['Binary Search', 'Kadane\'s Algorithm (O(N))', 'Two Pointer Technique', 'Merge Sort'],
        correctIndex: 1,
        explanation: 'Kadane\'s algorithm maintains local maximum sum and global maximum in linear O(N) time.'
      },
      {
        id: 'a3',
        question: 'Which data structure is optimal for implementing an LRU (Least Recently Used) Cache with O(1) get and put operations?',
        options: ['Doubly Linked List + Hash Map', 'Min Heap + Array', 'Stack + Queue', 'Binary Search Tree'],
        correctIndex: 0,
        explanation: 'Hash Map provides O(1) lookup to nodes, and Doubly Linked List enables O(1) node insertion/removal.'
      },
      {
        id: 'a4',
        question: 'If a service has 99.99% availability SLA per year, what is the maximum allowable total downtime per year?',
        options: ['52 minutes', '8.76 hours', '52.5 minutes', '3.65 days'],
        correctIndex: 2,
        explanation: '365 days * 24 hours * 60 mins = 525,600 mins. Downtime = 0.01% of 525,600 = ~52.56 minutes.'
      },
      {
        id: 'a5',
        question: 'What is the time complexity of building a Binary Heap from an unordered array of N elements using Heapify?',
        options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'],
        correctIndex: 1,
        explanation: 'Bottom-up heap construction runs in O(N) mathematically because fewer operations are performed at higher tree levels.'
      }
    ]
  },
  tcs_digital: {
    name: 'TCS Digital & Prime (Advanced Quantitative)',
    description: 'Permutations, probability, logarithms, remainder theorems, and advanced algebra.',
    timeSeconds: 600,
    questions: [
      {
        id: 'td1',
        question: 'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always come together?',
        options: ['360', '480', '720', '5040'],
        correctIndex: 2,
        explanation: 'Vowels (E, A, I) = 3 vowels. Group them as 1 entity. Remaining consonants (L, D, N, G) = 4. Total entities = 4+1 = 5. Arrangements = 5! * 3! = 120 * 6 = 720.'
      },
      {
        id: 'td2',
        question: 'What is the remainder when 2^100 is divided by 7?',
        options: ['1', '2', '4', '6'],
        correctIndex: 1,
        explanation: '2^3 = 8 ≡ 1 (mod 7). 2^100 = (2^3)^33 * 2^1 = (1)^33 * 2 = 2 (mod 7).'
      },
      {
        id: 'td3',
        question: 'Two cards are drawn at random from a standard deck of 52 cards. What is the probability that both cards are Kings?',
        options: ['1 / 221', '1 / 169', '4 / 663', '1 / 13'],
        correctIndex: 0,
        explanation: 'P = (4/52) * (3/51) = (1/13) * (1/17) = 1 / 221.'
      },
      {
        id: 'td4',
        question: 'Find log_2(64) + log_3(81) - log_5(125):',
        options: ['5', '7', '8', '10'],
        correctIndex: 0,
        explanation: 'log_2(2^6) = 6. log_3(3^4) = 4. log_5(5^3) = 3. Result = 6 + 4 - 3 = 7... wait: 6 + 4 - 3 = 7.'
      },
      {
        id: 'td5',
        question: 'A container has 80 liters of pure milk. 8 liters are removed and replaced with water. This process is repeated once more. What is the final quantity of pure milk left?',
        options: ['64.8 liters', '65.2 liters', '72.0 liters', '58.4 liters'],
        correctIndex: 0,
        explanation: 'Remaining Milk = Initial * (1 - x/V)^n = 80 * (1 - 8/80)^2 = 80 * (0.9)^2 = 80 * 0.81 = 64.8 liters.'
      }
    ]
  },
  cognizant_next: {
    name: 'Cognizant GenC Elevate & Next (Automata & Tech Logic)',
    description: 'Automata syntax bug fixing, OOP principles, SQL join edge cases, and web fundamentals.',
    timeSeconds: 600,
    questions: [
      {
        id: 'cn1',
        question: 'In SQL, what is the output difference between LEFT JOIN and INNER JOIN when no matching row exists in the right table?',
        options: [
          'LEFT JOIN omits the row completely',
          'LEFT JOIN keeps the left row and fills right table columns with NULL values',
          'BOTH return identical output',
          'INNER JOIN throws a syntax error'
        ],
        correctIndex: 1,
        explanation: 'LEFT JOIN guarantees all rows from the left table are returned, populating missing right columns with NULL.'
      },
      {
        id: 'cn2',
        question: 'Which HTTP status code signifies "301 Moved Permanently"?',
        options: ['200 OK', '301 Permanent Redirect', '404 Not Found', '500 Internal Server Error'],
        correctIndex: 1,
        explanation: 'HTTP 301 indicates permanent resource redirection.'
      },
      {
        id: 'cn3',
        question: 'In Java / OOP, can an interface extend another interface?',
        options: ['No, interfaces can only be implemented', 'Yes, using the "extends" keyword', 'Yes, using the "implements" keyword', 'Only abstract classes can extend'],
        correctIndex: 1,
        explanation: 'An interface in Java extends another interface using the `extends` keyword.'
      },
      {
        id: 'cn4',
        question: 'Fix the Automata Bug: "for(int i=0; i<=arr.length; i++) { sum += arr[i]; }" for array of length N:',
        options: [
          'Change i=0 to i=1',
          'Change i<=arr.length to i<arr.length to prevent ArrayIndexOutOfBoundsException',
          'Change sum += arr[i] to sum = arr[i]',
          'No bug present'
        ],
        correctIndex: 1,
        explanation: 'Array indices range from 0 to length-1. Using <= accesses arr[length], throwing ArrayIndexOutOfBoundsException.'
      },
      {
        id: 'cn5',
        question: 'What is the purpose of an Index on a database table column?',
        options: ['To encrypt table data', 'To speed up SELECT queries by avoiding full table scans', 'To restrict NULL values', 'To enforce foreign key rules'],
        correctIndex: 1,
        explanation: 'B-Tree indexes speed up row retrieval by providing rapid O(log N) lookup pointers.'
      }
    ]
  },
  accenture_crit: {
    name: 'Accenture & Capgemini (Critical & Abstract Reasoning)',
    description: 'Syllogisms, Venn diagram deduction, statement assumptions, and spatial patterns.',
    timeSeconds: 600,
    questions: [
      {
        id: 'ac1',
        question: 'Statement: "Buy brand X solar panels to reduce your electricity bill by 40%." Assumptions: I. People want to reduce electricity bills. II. Brand X solar panels are effective.',
        options: ['Only assumption I is implicit', 'Only assumption II is implicit', 'Both I and II are implicit', 'Neither I nor II is implicit'],
        correctIndex: 2,
        explanation: 'An advertisement assumes target consumers care about the promised benefit (reducing bills) and that the product delivers it.'
      },
      {
        id: 'ac2',
        question: 'In a group of 100 students: 60 study Java, 50 study Python, and 20 study both. How many students study neither Java nor Python?',
        options: ['10', '20', '30', '40'],
        correctIndex: 0,
        explanation: 'Students taking at least one = 60 + 50 - 20 = 90. Neither = 100 - 90 = 10.'
      },
      {
        id: 'ac3',
        question: 'Complete the analogy: Clock : Time :: Thermometer : ?',
        options: ['Heat', 'Temperature', 'Mercury', 'Degrees'],
        correctIndex: 1,
        explanation: 'A clock measures time; a thermometer measures temperature.'
      },
      {
        id: 'ac4',
        question: 'If A + B means A is the mother of B; A - B means A is the brother of B; A * B means A is the father of B. Which expression means P is the uncle of Q?',
        options: ['P - R * Q', 'P + R * Q', 'P * R - Q', 'P - R + Q'],
        correctIndex: 0,
        explanation: 'P - R means P is brother of R. R * Q means R is father of Q. Thus, P is the brother of Q\'s father => P is uncle of Q.'
      },
      {
        id: 'ac5',
        question: 'Five cars A, B, C, D, E are ranked by speed. Car A is faster than B but slower than C. Car D is faster than E but slower than B. Which car is the fastest?',
        options: ['Car A', 'Car B', 'Car C', 'Car D'],
        correctIndex: 2,
        explanation: 'Order from fastest to slowest: C > A > B > D > E. Car C is fastest.'
      }
    ]
  },
  verbal: {
    name: 'Cognizant & Accenture (Verbal & English)',
    description: 'Sentence correction, critical reading, error spotting, and contextual vocabulary.',
    timeSeconds: 480,
    questions: [
      {
        id: 'v1',
        question: 'Choose the word most nearly OPPOSITE in meaning to: EPHEMERAL',
        options: ['Transient', 'Permanent', 'Fleeting', 'Fragile'],
        correctIndex: 1,
        explanation: 'Ephemeral means lasting for a very short time. Permanent means lasting indefinitely.'
      },
      {
        id: 'v2',
        question: 'Identify the error in the sentence: "Neither the principal nor the teachers (A) / were present (B) / at the annual conference (C) / yesterday (D)."',
        options: ['Part A', 'Part B', 'Part C', 'No error'],
        correctIndex: 3,
        explanation: 'When subjects are joined by "neither...nor", the verb agrees with the closer subject ("teachers", which is plural, so "were" is correct).'
      },
      {
        id: 'v3',
        question: 'Fill in the blank: "The candidate was confident ______ cracking the campus interview."',
        options: ['at', 'about', 'of', 'in'],
        correctIndex: 2,
        explanation: 'The standard English preposition paired with "confident" when expressing certainty about an action is "confident of".'
      },
      {
        id: 'v4',
        question: 'Select the synonym for: METICULOUS',
        options: ['Careless', 'Diligent', 'Hasty', 'Vague'],
        correctIndex: 1,
        explanation: 'Meticulous means showing great attention to detail; very careful and precise (diligent).'
      },
      {
        id: 'v5',
        question: 'Choose the correct passive voice: "The software engineer fixed the critical bug."',
        options: [
          'The critical bug was fixed by the software engineer.',
          'The critical bug had been fixed by the software engineer.',
          'The critical bug is fixed by the software engineer.',
          'The critical bug has fixed the software engineer.'
        ],
        correctIndex: 0,
        explanation: 'Past simple active (fixed) converts to past simple passive (was fixed + by subject).'
      }
    ]
  }
};
