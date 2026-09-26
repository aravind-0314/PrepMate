/* ==========================================================================
   PrepMate — static content: quiz banks, interview questions, planner topics
   ========================================================================== */

const QUIZ_BANK = {
  aptitude: [
    { q:"A train 150m long crosses a pole in 15 seconds. What is its speed?", options:["36 km/h","10 km/h","45 km/h","54 km/h"], a:0 },
    { q:"If the ratio of two numbers is 3:5 and their sum is 96, what is the smaller number?", options:["30","36","40","24"], a:1 },
    { q:"A shopkeeper marks an item 40% above cost and gives a 10% discount. What is his profit percent?", options:["26%","30%","24%","28%"], a:0 },
    { q:"What is the next number in the series: 2, 6, 12, 20, 30, ?", options:["40","42","44","36"], a:1 },
    { q:"Simple interest on ₹5000 at 8% per annum for 2 years is:", options:["₹700","₹800","₹900","₹750"], a:1 },
    { q:"If 5 workers finish a job in 12 days, how many days will 10 workers take?", options:["6 days","8 days","4 days","10 days"], a:0 },
    { q:"The average of 5 consecutive numbers is 20. What is the largest number?", options:["21","22","23","24"], a:1 },
    { q:"A can do a piece of work in 10 days, B in 15 days. Working together, how many days will they take?", options:["6 days","5 days","7 days","8 days"], a:0 },
  ],
  technical: [
    { q:"What is the time complexity of binary search on a sorted array?", options:["O(n)","O(log n)","O(n log n)","O(1)"], a:1 },
    { q:"Which data structure uses FIFO order?", options:["Stack","Queue","Tree","Graph"], a:1 },
    { q:"In DBMS, which normal form removes transitive dependency?", options:["1NF","2NF","3NF","BCNF"], a:2 },
    { q:"Which of these is NOT a valid HTTP method?", options:["GET","POST","FETCH","DELETE"], a:2 },
    { q:"What does 'ACID' stand for in databases?", options:["Atomicity, Consistency, Isolation, Durability","Access, Control, Integrity, Data","Atomic, Concurrent, Isolated, Distributed","None of these"], a:0 },
    { q:"Which sorting algorithm has the best average time complexity?", options:["Bubble sort","Merge sort","Selection sort","Insertion sort"], a:1 },
    { q:"What is the default access modifier in Java for class members?", options:["public","private","protected","package-private"], a:3 },
    { q:"Which layer of the OSI model handles routing?", options:["Data Link","Network","Transport","Session"], a:1 },
  ],
  coding_logic: [
    { q:"What will `console.log(typeof NaN)` print in JavaScript?", options:["'number'","'NaN'","'undefined'","'object'"], a:0 },
    { q:"Which approach solves the Fibonacci sequence most efficiently for large n?", options:["Plain recursion","Memoized recursion / DP","Nested loops","Random guessing"], a:1 },
    { q:"What is the output of `5 // 2` in Python?", options:["2.5","2","3","2.0"], a:1 },
    { q:"Which data structure is best suited to check for balanced parentheses?", options:["Queue","Stack","Heap","Linked list"], a:1 },
    { q:"What is the space complexity of an iterative approach vs recursive for factorial?", options:["Iterative uses more space","They are always equal","Recursive typically uses more space (call stack)","Space complexity is not related to recursion"], a:2 },
    { q:"In an array-based implementation, what is the time complexity to insert at the beginning?", options:["O(1)","O(log n)","O(n)","O(n^2)"], a:2 },
  ],
  verbal: [
    { q:"Choose the correctly spelled word:", options:["Occassion","Occasion","Ocasion","Occaision"], a:1 },
    { q:"Fill in the blank: She is ___ honest person.", options:["a","an","the","no article needed"], a:1 },
    { q:"Choose the synonym of 'Ephemeral':", options:["Permanent","Fleeting","Ancient","Solid"], a:1 },
    { q:"Identify the correctly punctuated sentence:", options:["Its a great day.","It's a great day.","Its' a great day.","Its a great, day."], a:1 },
    { q:"Choose the antonym of 'Benevolent':", options:["Kind","Generous","Malevolent","Charitable"], a:2 },
    { q:"Complete the idiom: 'Bite the ___'", options:["dust","bullet","apple","sword"], a:1 },
  ]
};

const QUIZ_CATEGORY_LABELS = {
  aptitude: "Quantitative Aptitude",
  technical: "Core Technical (CS Fundamentals)",
  coding_logic: "Coding Logic",
  verbal: "Verbal & English"
};

const INTERVIEW_QUESTIONS = {
  hr: [
    { id:"hr1", q:"Tell me about yourself." },
    { id:"hr2", q:"Why should we hire you?" },
    { id:"hr3", q:"What are your strengths and weaknesses?" },
    { id:"hr4", q:"Where do you see yourself in five years?" },
    { id:"hr5", q:"Tell me about a time you faced conflict in a team and how you resolved it." },
    { id:"hr6", q:"Why do you want to work at this company?" },
    { id:"hr7", q:"Describe a challenge you overcame during your degree." },
    { id:"hr8", q:"Do you have any questions for us?" },
  ],
  technical: [
    { id:"t1", q:"Walk me through a project on your resume, focusing on your specific contribution." },
    { id:"t2", q:"How would you reverse a linked list? Explain your approach out loud." },
    { id:"t3", q:"What is the difference between a process and a thread?" },
    { id:"t4", q:"Explain normalization in databases with an example." },
    { id:"t5", q:"How does garbage collection work in the language you're most comfortable with?" },
    { id:"t6", q:"Design a simple rate limiter — what data structure would you use and why?" },
    { id:"t7", q:"What happens when you type a URL into a browser and press enter?" },
    { id:"t8", q:"How do you approach debugging a piece of code that isn't behaving as expected?" },
  ]
};

// Planner: a readiness roadmap grouped by track. Each item is a checkbox task.
const PLANNER_TRACKS = [
  {
    id: "quant",
    title: "Quantitative Aptitude",
    tasks: [
      { id:"q1", text:"Revise percentages, ratios and averages" },
      { id:"q2", text:"Practice time-speed-distance and time-and-work problems" },
      { id:"q3", text:"Complete two timed aptitude mock tests" },
      { id:"q4", text:"Review mistakes and rework the same problem types" },
    ]
  },
  {
    id: "cs-core",
    title: "Core CS Subjects",
    tasks: [
      { id:"c1", text:"Revise OS: processes, threads, scheduling, deadlocks" },
      { id:"c2", text:"Revise DBMS: normalization, transactions, indexing" },
      { id:"c3", text:"Revise CN: OSI/TCP layers, HTTP, DNS basics" },
      { id:"c4", text:"Revise OOP concepts with examples in your main language" },
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Coding",
    tasks: [
      { id:"d1", text:"Arrays, strings and two-pointer patterns" },
      { id:"d2", text:"Linked lists, stacks and queues" },
      { id:"d3", text:"Trees, graphs and traversal patterns" },
      { id:"d4", text:"Dynamic programming — solve 10 classic problems" },
      { id:"d5", text:"Do at least 3 timed coding-round simulations" },
    ]
  },
  {
    id: "interview",
    title: "Interview Readiness",
    tasks: [
      { id:"i1", text:"Prepare a 60-second self-introduction" },
      { id:"i2", text:"Prepare 3 STAR-format stories from projects/internships" },
      { id:"i3", text:"Run at least 5 mock interview questions out loud" },
      { id:"i4", text:"Research the target company's products and recent news" },
    ]
  },
  {
    id: "profile",
    title: "Resume & Profile",
    tasks: [
      { id:"p1", text:"Resume fits one page with quantified achievements" },
      { id:"p2", text:"GitHub has 2–3 well-documented projects" },
      { id:"p3", text:"LinkedIn headline and summary are up to date" },
      { id:"p4", text:"Ask a mentor or senior to review your resume" },
    ]
  }
];

// Readiness checklist: broader "am I placement ready" items, separate from the
// day-to-day planner tasks above.
const CHECKLIST_ITEMS = [
  { id:"chk1", text:"Resume is proofread and free of formatting issues" },
  { id:"chk2", text:"At least one project can be explained end-to-end in an interview" },
  { id:"chk3", text:"I know my resume's technical claims well enough to be questioned on them" },
  { id:"chk4", text:"I have a formal outfit ready for interview day" },
  { id:"chk5", text:"I have copies of certificates/marksheets organised" },
  { id:"chk6", text:"I can solve an easy-to-medium coding problem within 20 minutes" },
  { id:"chk7", text:"I have researched common questions asked by target companies" },
  { id:"chk8", text:"I have a working laptop/setup tested for online assessments" },
];
