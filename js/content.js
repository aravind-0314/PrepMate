/* ==========================================================================
   PrepMate — Static Content

   Member 3:
   FireDrill + Assessment Intelligence

   Includes:
   - Quiz question banks
   - Difficulty levels
   - Interview questions
   - Study planner
   - Readiness checklist
   ========================================================================== */


/* ==========================================================================
   QUIZ BANK
   ========================================================================== */

const QUIZ_BANK = {

  /* ========================================================================
     APTITUDE
     ======================================================================== */

  aptitude: [

    /* ------------------------------ EASY -------------------------------- */

    {
      q: "A train 150m long crosses a pole in 15 seconds. What is its speed?",
      options: [
        "36 km/h",
        "10 km/h",
        "45 km/h",
        "54 km/h"
      ],
      a: 0,
      difficulty: "easy"
    },

    {
      q: "If the ratio of two numbers is 3:5 and their sum is 96, what is the smaller number?",
      options: [
        "30",
        "36",
        "40",
        "24"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "Simple interest on ₹5000 at 8% per annum for 2 years is:",
      options: [
        "₹700",
        "₹800",
        "₹900",
        "₹750"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "If 5 workers finish a job in 12 days, how many days will 10 workers take?",
      options: [
        "6 days",
        "8 days",
        "4 days",
        "10 days"
      ],
      a: 0,
      difficulty: "easy"
    },


    /* ----------------------------- MEDIUM ------------------------------- */

    {
      q: "A shopkeeper marks an item 40% above cost and gives a 10% discount. What is his profit percent?",
      options: [
        "26%",
        "30%",
        "24%",
        "28%"
      ],
      a: 0,
      difficulty: "medium"
    },

    {
      q: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
      options: [
        "40",
        "42",
        "44",
        "36"
      ],
      a: 1,
      difficulty: "medium"
    },

    {
      q: "The average of 5 consecutive numbers is 20. What is the largest number?",
      options: [
        "21",
        "22",
        "23",
        "24"
      ],
      a: 1,
      difficulty: "medium"
    },

    {
      q: "A can do a piece of work in 10 days, B in 15 days. Working together, how many days will they take?",
      options: [
        "6 days",
        "5 days",
        "7 days",
        "8 days"
      ],
      a: 0,
      difficulty: "medium"
    },


    /* -------------------------------- HARD ------------------------------- */

    {
      q: "A sum of money becomes ₹12,100 in 2 years at 10% compound interest per year. What was the principal?",
      options: [
        "₹9,000",
        "₹10,000",
        "₹11,000",
        "₹12,000"
      ],
      a: 1,
      difficulty: "hard"
    },

    {
      q: "A boat travels 30 km downstream in 2 hours and the same distance upstream in 3 hours. What is the speed of the boat in still water?",
      options: [
        "10 km/h",
        "12.5 km/h",
        "15 km/h",
        "20 km/h"
      ],
      a: 1,
      difficulty: "hard"
    },

    {
      q: "A and B together can complete a work in 12 days. A alone can complete it in 20 days. How many days will B alone take?",
      options: [
        "24 days",
        "25 days",
        "30 days",
        "36 days"
      ],
      a: 2,
      difficulty: "hard"
    },

    {
      q: "A number is increased by 20% and then decreased by 20%. What is the overall percentage change?",
      options: [
        "No change",
        "4% decrease",
        "4% increase",
        "2% decrease"
      ],
      a: 1,
      difficulty: "hard"
    }

  ],


  /* ========================================================================
     TECHNICAL
     ======================================================================== */

  technical: [

    /* ------------------------------ EASY -------------------------------- */

    {
      q: "What is the time complexity of binary search on a sorted array?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(1)"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "Which data structure uses FIFO order?",
      options: [
        "Stack",
        "Queue",
        "Tree",
        "Graph"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "Which of these is NOT a valid HTTP method?",
      options: [
        "GET",
        "POST",
        "FETCH",
        "DELETE"
      ],
      a: 2,
      difficulty: "easy"
    },

    {
      q: "Which layer of the OSI model handles routing?",
      options: [
        "Data Link",
        "Network",
        "Transport",
        "Session"
      ],
      a: 1,
      difficulty: "easy"
    },


    /* ----------------------------- MEDIUM ------------------------------- */

    {
      q: "In DBMS, which normal form removes transitive dependency?",
      options: [
        "1NF",
        "2NF",
        "3NF",
        "BCNF"
      ],
      a: 2,
      difficulty: "medium"
    },

    {
      q: "What does 'ACID' stand for in databases?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Access, Control, Integrity, Data",
        "Atomic, Concurrent, Isolated, Distributed",
        "None of these"
      ],
      a: 0,
      difficulty: "medium"
    },

    {
      q: "Which sorting algorithm has the best average time complexity among these options?",
      options: [
        "Bubble sort",
        "Merge sort",
        "Selection sort",
        "Insertion sort"
      ],
      a: 1,
      difficulty: "medium"
    },

    {
      q: "What is the default access modifier in Java for class members?",
      options: [
        "public",
        "private",
        "protected",
        "package-private"
      ],
      a: 3,
      difficulty: "medium"
    },


    /* -------------------------------- HARD ------------------------------- */

    {
      q: "What is the worst-case time complexity of Quick Sort when the pivot is always the smallest element?",
      options: [
        "O(log n)",
        "O(n)",
        "O(n log n)",
        "O(n²)"
      ],
      a: 3,
      difficulty: "hard"
    },

    {
      q: "Which data structure is commonly used to implement Dijkstra's shortest path algorithm efficiently?",
      options: [
        "Stack",
        "Priority Queue",
        "Linked List",
        "Hash Table"
      ],
      a: 1,
      difficulty: "hard"
    },

    {
      q: "What is the main purpose of a database index?",
      options: [
        "To increase table size",
        "To reduce database security",
        "To speed up data retrieval",
        "To remove all duplicate data"
      ],
      a: 2,
      difficulty: "hard"
    },

    {
      q: "Which algorithm is commonly used to find a Minimum Spanning Tree?",
      options: [
        "Binary Search",
        "Kruskal's Algorithm",
        "BFS only",
        "Linear Search"
      ],
      a: 1,
      difficulty: "hard"
    },

    {
      q: "Which situation can cause a deadlock in an operating system?",
      options: [
        "Processes waiting for resources held by each other",
        "A process completing normally",
        "A process releasing all resources",
        "A process executing without resources"
      ],
      a: 0,
      difficulty: "hard"
    },

    {
      q: "What is the average-case time complexity of searching in a well-designed hash table?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ],
      a: 0,
      difficulty: "hard"
    }

  ],


  /* ========================================================================
     CODING LOGIC
     ======================================================================== */

  coding_logic: [

    /* ------------------------------ EASY -------------------------------- */

    {
      q: "What will console.log(typeof NaN) print in JavaScript?",
      options: [
        "'number'",
        "'NaN'",
        "'undefined'",
        "'object'"
      ],
      a: 0,
      difficulty: "easy"
    },

    {
      q: "What is the output of 5 // 2 in Python?",
      options: [
        "2.5",
        "2",
        "3",
        "2.0"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "Which data structure is best suited to check for balanced parentheses?",
      options: [
        "Queue",
        "Stack",
        "Heap",
        "Linked list"
      ],
      a: 1,
      difficulty: "easy"
    },


    /* ----------------------------- MEDIUM ------------------------------- */

    {
      q: "Which approach solves the Fibonacci sequence most efficiently for large n?",
      options: [
        "Plain recursion",
        "Memoized recursion / DP",
        "Nested loops",
        "Random guessing"
      ],
      a: 1,
      difficulty: "medium"
    },

    {
      q: "What is the space complexity of an iterative approach vs recursive for factorial?",
      options: [
        "Iterative uses more space",
        "They are always equal",
        "Recursive typically uses more space (call stack)",
        "Space complexity is not related to recursion"
      ],
      a: 2,
      difficulty: "medium"
    },

    {
      q: "In an array-based implementation, what is the time complexity to insert at the beginning?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      a: 2,
      difficulty: "medium"
    },


    /* -------------------------------- HARD ------------------------------- */

    {
      q: "What is the time complexity of Merge Sort?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(n²)"
      ],
      a: 2,
      difficulty: "hard"
    },

    {
      q: "Which technique solves problems by breaking them into smaller overlapping subproblems and storing their results?",
      options: [
        "Dynamic Programming",
        "Linear Search",
        "Binary Search",
        "Randomized Search"
      ],
      a: 0,
      difficulty: "hard"
    },

    {
      q: "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      a: 2,
      difficulty: "hard"
    },

    {
      q: "Which algorithmic technique is commonly used for the 0/1 Knapsack problem?",
      options: [
        "Dynamic Programming",
        "Binary Search",
        "Breadth First Search only",
        "Simple Traversal"
      ],
      a: 0,
      difficulty: "hard"
    }

  ],


  /* ========================================================================
     VERBAL
     ======================================================================== */

  verbal: [

    /* ------------------------------ EASY -------------------------------- */

    {
      q: "Choose the correctly spelled word:",
      options: [
        "Occassion",
        "Occasion",
        "Ocasion",
        "Occaision"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "Fill in the blank: She is ___ honest person.",
      options: [
        "a",
        "an",
        "the",
        "no article needed"
      ],
      a: 1,
      difficulty: "easy"
    },

    {
      q: "Identify the correctly punctuated sentence:",
      options: [
        "Its a great day.",
        "It's a great day.",
        "Its' a great day.",
        "Its a great, day."
      ],
      a: 1,
      difficulty: "easy"
    },


    /* ----------------------------- MEDIUM ------------------------------- */

    {
      q: "Choose the synonym of 'Ephemeral':",
      options: [
        "Permanent",
        "Fleeting",
        "Ancient",
        "Solid"
      ],
      a: 1,
      difficulty: "medium"
    },

    {
      q: "Choose the antonym of 'Benevolent':",
      options: [
        "Kind",
        "Generous",
        "Malevolent",
        "Charitable"
      ],
      a: 2,
      difficulty: "medium"
    },

    {
      q: "Complete the idiom: 'Bite the ___'",
      options: [
        "dust",
        "bullet",
        "apple",
        "sword"
      ],
      a: 1,
      difficulty: "medium"
    },


    /* -------------------------------- HARD ------------------------------- */

    {
      q: "Choose the word closest in meaning to 'Pragmatic':",
      options: [
        "Practical",
        "Emotional",
        "Careless",
        "Imaginary"
      ],
      a: 0,
      difficulty: "hard"
    },

    {
      q: "Choose the correct sentence:",
      options: [
        "Neither of the students have completed the assignment.",
        "Neither of the students has completed the assignment.",
        "Neither of the students are completing the assignment.",
        "Neither students has completed the assignment."
      ],
      a: 1,
      difficulty: "hard"
    },

    {
      q: "Had I known about the meeting, I ___ attended it.",
      options: [
        "will have",
        "would have",
        "would",
        "have"
      ],
      a: 1,
      difficulty: "hard"
    },

    {
      q: "Which sentence uses the word 'ubiquitous' correctly?",
      options: [
        "The ubiquitous internet is available almost everywhere.",
        "He ubiquitous the book yesterday.",
        "She was feeling ubiquitous after the exam.",
        "The machine ubiquitous very quickly."
      ],
      a: 0,
      difficulty: "hard"
    }

  ]

};


/* ==========================================================================
   CATEGORY LABELS
   ========================================================================== */

const QUIZ_CATEGORY_LABELS = {

  aptitude:
    "Quantitative Aptitude",

  technical:
    "Core Technical (CS Fundamentals)",

  coding_logic:
    "Coding Logic",

  verbal:
    "Verbal & English"

};


/* ==========================================================================
   INTERVIEW QUESTIONS
   ========================================================================== */

const INTERVIEW_QUESTIONS = {

  hr: [

    {
      id: "hr1",
      q: "Tell me about yourself."
    },

    {
      id: "hr2",
      q: "Why should we hire you?"
    },

    {
      id: "hr3",
      q: "What are your strengths and weaknesses?"
    },

    {
      id: "hr4",
      q: "Where do you see yourself in five years?"
    },

    {
      id: "hr5",
      q: "Tell me about a time you faced conflict in a team and how you resolved it."
    },

    {
      id: "hr6",
      q: "Why do you want to work at this company?"
    },

    {
      id: "hr7",
      q: "Describe a challenge you overcame during your degree."
    },

    {
      id: "hr8",
      q: "Do you have any questions for us?"
    }

  ],


  technical: [

    {
      id: "t1",
      q: "Walk me through a project on your resume, focusing on your specific contribution."
    },

    {
      id: "t2",
      q: "How would you reverse a linked list? Explain your approach out loud."
    },

    {
      id: "t3",
      q: "What is the difference between a process and a thread?"
    },

    {
      id: "t4",
      q: "Explain normalization in databases with an example."
    },

    {
      id: "t5",
      q: "How does garbage collection work in the language you're most comfortable with?"
    },

    {
      id: "t6",
      q: "Design a simple rate limiter — what data structure would you use and why?"
    },

    {
      id: "t7",
      q: "What happens when you type a URL into a browser and press enter?"
    },

    {
      id: "t8",
      q: "How do you approach debugging a piece of code that isn't behaving as expected?"
    }

  ]

};


/* ==========================================================================
   STUDY PLANNER
   ========================================================================== */

const PLANNER_TRACKS = [

  {
    id: "quant",

    title: "Quantitative Aptitude",

    tasks: [

      {
        id: "q1",
        text: "Revise percentages, ratios and averages"
      },

      {
        id: "q2",
        text: "Practice time-speed-distance and time-and-work problems"
      },

      {
        id: "q3",
        text: "Complete two timed aptitude mock tests"
      },

      {
        id: "q4",
        text: "Review mistakes and rework the same problem types"
      }

    ]

  },


  {
    id: "cs-core",

    title: "Core CS Subjects",

    tasks: [

      {
        id: "c1",
        text: "Revise OS: processes, threads, scheduling, deadlocks"
      },

      {
        id: "c2",
        text: "Revise DBMS: normalization, transactions, indexing"
      },

      {
        id: "c3",
        text: "Revise CN: OSI/TCP layers, HTTP, DNS basics"
      },

      {
        id: "c4",
        text: "Revise OOP concepts with examples in your main language"
      }

    ]

  },


  {
    id: "dsa",

    title: "Data Structures & Coding",

    tasks: [

      {
        id: "d1",
        text: "Arrays, strings and two-pointer patterns"
      },

      {
        id: "d2",
        text: "Linked lists, stacks and queues"
      },

      {
        id: "d3",
        text: "Trees, graphs and traversal patterns"
      },

      {
        id: "d4",
        text: "Dynamic programming — solve 10 classic problems"
      },

      {
        id: "d5",
        text: "Do at least 3 timed coding-round simulations"
      }

    ]

  },


  {
    id: "interview",

    title: "Interview Readiness",

    tasks: [

      {
        id: "i1",
        text: "Prepare a 60-second self-introduction"
      },

      {
        id: "i2",
        text: "Prepare 3 STAR-format stories from projects/internships"
      },

      {
        id: "i3",
        text: "Run at least 5 mock interview questions out loud"
      },

      {
        id: "i4",
        text: "Research the target company's products and recent news"
      }

    ]

  },


  {
    id: "profile",

    title: "Resume & Profile",

    tasks: [

      {
        id: "p1",
        text: "Resume fits one page with quantified achievements"
      },

      {
        id: "p2",
        text: "GitHub has 2–3 well-documented projects"
      },

      {
        id: "p3",
        text: "LinkedIn headline and summary are up to date"
      },

      {
        id: "p4",
        text: "Ask a mentor or senior to review your resume"
      }

    ]

  }

];


/* ==========================================================================
   READINESS CHECKLIST
   ========================================================================== */

const CHECKLIST_ITEMS = [

  {
    id: "chk1",
    text: "Resume is proofread and free of formatting issues"
  },

  {
    id: "chk2",
    text: "At least one project can be explained end-to-end in an interview"
  },

  {
    id: "chk3",
    text: "I know my resume's technical claims well enough to be questioned on them"
  },

  {
    id: "chk4",
    text: "I have a formal outfit ready for interview day"
  },

  {
    id: "chk5",
    text: "I have copies of certificates/marksheets organised"
  },

  {
    id: "chk6",
    text: "I can solve an easy-to-medium coding problem within 20 minutes"
  },

  {
    id: "chk7",
    text: "I have researched common questions asked by target companies"
  },

  {
    id: "chk8",
    text: "I have a working laptop/setup tested for online assessments"
  }

];