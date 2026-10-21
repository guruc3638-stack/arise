const fs = require('fs');
let genCode = fs.readFileSync('C:/Users/Anil/.gemini/antigravity-ide/brain/46cb489e-d17b-4545-ab7c-e9cbfdbf8da0/scratch/generate_arise_problems.js', 'utf8');
const cutoff = genCode.indexOf('// Read current data.js');
genCode = genCode.substring(0, cutoff);
genCode += "\n; global.originalProblems = originalProblems;";
eval(genCode);

const problems = global.originalProblems;

// Attach functionName and JavaScript starterCode/solutions from scratch/apply_full_js_support.js
const applyCode = fs.readFileSync('d:/ARISE/scratch/apply_full_js_support.js', 'utf8');
const jsDataCode = applyCode.substring(applyCode.indexOf('const jsData = {'), applyCode.indexOf('let content = fs.readFileSync'));
eval(jsDataCode + '; global.jsData = jsData;');

problems.forEach(p => {
  const meta = global.jsData[p.id];
  if (meta) {
    p.functionName = meta.funcName;
    if (!p.starterCode) p.starterCode = {};
    p.starterCode.javascript = meta.starter;
    if (!p.solution) p.solution = {};
    if (!p.solution.code) p.solution.code = {};
    p.solution.code.javascript = meta.solution;
  }
});

const dataTemplate = `/* ==========================================================================
   ARISE DATA STORE — MOCK DATABASE & AUTHENTIC PROBLEMS
   "Learn. Solve. Rise."
   ========================================================================== */

const ARISE_DATA = {
  // Current logged in user (System-generated read-only UID)
  currentUser: {
    uid: "ARISE-7K2M9Q",
    displayName: "Rohan Deshmukh",
    handle: "rohan_coder",
    college: "COEP Technological University, Pune",
    district: "Pune",
    state: "Maharashtra",
    avatar: "RD",
    avatarBg: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
    verifiedXp: 3420, // Strictly from judge-confirmed solves
    rank: {
      college: 3,
      district: 8,
      maharashtra: 14,
      india: 86
    },
    rankMovement: "+2", // ▲ 2
    solvedStats: {
      total: 48,
      easy: 26,
      medium: 18,
      hard: 4
    },
    acceptanceRate: "72.4%",
    coursesCompleted: 2,
    privacySetting: "public", // 'public' | 'friends' | 'private'
    joinedDate: "October 2025"
  },

  // 17 DSA Topics with counts and distributions
  topics: [
    { id: "arrays", name: "Arrays", desc: "Contiguous memory, two pointers, sliding window, prefix sums", total: 42, solved: 28, easy: 16, medium: 20, hard: 6 },
    { id: "strings", name: "Strings", desc: "Pattern matching, character counting, anagrams, palindrome logic", total: 36, solved: 22, easy: 14, medium: 16, hard: 6 },
    { id: "linked-lists", name: "Linked Lists", desc: "Singly, doubly, cycle detection, reversing, fast & slow pointers", total: 28, solved: 19, easy: 12, medium: 12, hard: 4 },
    { id: "stacks", name: "Stacks", desc: "LIFO structures, monotonic stacks, parentheses validation, evaluations", total: 24, solved: 18, easy: 10, medium: 10, hard: 4 },
    { id: "queues", name: "Queues", desc: "FIFO buffers, double-ended queues, circular queues, monotonic queues", total: 20, solved: 14, easy: 8, medium: 9, hard: 3 },
    { id: "hashing", name: "Hashing", desc: "Hash maps, hash sets, collision resolution, frequency tables", total: 32, solved: 24, easy: 14, medium: 14, hard: 4 },
    { id: "recursion", name: "Recursion", desc: "Base cases, recurrence relations, call stack, divide & conquer", total: 22, solved: 15, easy: 8, medium: 10, hard: 4 },
    { id: "sorting", name: "Sorting", desc: "Quick sort, merge sort, heap sort, counting sort, comparator logic", total: 18, solved: 15, easy: 8, medium: 8, hard: 2 },
    { id: "searching", name: "Searching", desc: "Binary search on arrays, binary search on answer spaces", total: 26, solved: 17, easy: 9, medium: 13, hard: 4 },
    { id: "trees", name: "Trees", desc: "Binary trees, tree traversals (in/pre/post/level), LCA, path sums", total: 38, solved: 21, easy: 12, medium: 18, hard: 8 },
    { id: "bst", name: "Binary Search Trees", desc: "BST invariants, insertion, deletion, floor, ceil, validation", total: 22, solved: 13, easy: 8, medium: 11, hard: 3 },
    { id: "heaps", name: "Heaps", desc: "Min/max heaps, priority queues, top-K elements, streaming medians", total: 24, solved: 12, easy: 6, medium: 13, hard: 5 },
    { id: "graphs", name: "Graphs", desc: "BFS, DFS, topological sort, Dijkstra, Bellman-Ford, Kruskal/Prim", total: 40, solved: 16, easy: 8, medium: 22, hard: 10 },
    { id: "greedy", name: "Greedy Algorithms", desc: "Locally optimal choices, interval scheduling, Huffman coding", total: 25, solved: 14, easy: 8, medium: 12, hard: 5 },
    { id: "dp", name: "Dynamic Programming", desc: "Optimal substructure, overlapping subproblems, 1D/2D DP, knapsack", total: 48, solved: 18, easy: 8, medium: 24, hard: 16 },
    { id: "backtracking", name: "Backtracking", desc: "State-space tree exploration, pruning, N-Queens, Sudoku solver", total: 20, solved: 8, easy: 4, medium: 11, hard: 5 },
    { id: "tries", name: "Tries", desc: "Prefix trees, auto-complete queries, XOR maximum pairs", total: 16, solved: 6, easy: 4, medium: 8, hard: 4 }
  ],

  // 24 Original Synthetic DSA Problems (With Javascript, Python, C++, Java support)
  problems: ${JSON.stringify(problems, null, 2)},

  // Leaderboard mock students across 4 scopes (strictly ranked by verified DSA XP)
  leaderboards: {
    college: [
      { rank: 1, name: "Prathamesh Sawant", college: "COEP Technological University", xp: 4890, mv: "+1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 2, name: "Shreya Kulkarni", college: "COEP Technological University", xp: 4120, mv: "—", solved: 58, isCurrentUser: false, avatar: "SK" },
      { rank: 3, name: "Rohan Deshmukh", college: "COEP Technological University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: true, avatar: "RD" },
      { rank: 4, name: "Varun Jadhav", college: "COEP Technological University", xp: 3100, mv: "-1", solved: 43, isCurrentUser: false, avatar: "VJ" },
      { rank: 5, name: "Aniket More", college: "COEP Technological University", xp: 2850, mv: "—", solved: 39, isCurrentUser: false, avatar: "AM" }
    ],
    district: [
      { rank: 1, name: "Aarav Mehta", college: "PICT Pune", xp: 6240, mv: "+1", solved: 82, isCurrentUser: false, avatar: "AM" },
      { rank: 2, name: "Devansh Joshi", college: "MIT World Peace University", xp: 5810, mv: "—", solved: 76, isCurrentUser: false, avatar: "DJ" },
      { rank: 3, name: "Prathamesh Sawant", college: "COEP Tech University", xp: 4890, mv: "-1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 8, name: "Rohan Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: true, avatar: "RD" }
    ],
    maharashtra: [
      { rank: 1, name: "Siddharth Verma", college: "IIT Bombay", xp: 9480, mv: "—", solved: 130, isCurrentUser: false, avatar: "SV" },
      { rank: 2, name: "Neha Sengupta", college: "VJTI Mumbai", xp: 8750, mv: "+1", solved: 118, isCurrentUser: false, avatar: "NS" },
      { rank: 3, name: "Aarav Mehta", college: "PICT Pune", xp: 6240, mv: "-1", solved: 82, isCurrentUser: false, avatar: "AM" },
      { rank: 7, name: "Sneha Kulkarni", college: "VJTI Mumbai", xp: 3890, mv: "+3", solved: 54, isCurrentUser: false, avatar: "SK" },
      { rank: 14, name: "Rohan Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: true, avatar: "RD" }
    ],
    india: [
      { rank: 1, name: "Kabir Sen", college: "IIT Delhi", xp: 14200, mv: "—", solved: 198, isCurrentUser: false, avatar: "KS" },
      { rank: 2, name: "Rhea Chawla", college: "IIIT Hyderabad", xp: 13850, mv: "+2", solved: 192, isCurrentUser: false, avatar: "RC" },
      { rank: 3, name: "Aryan Goel", college: "IIT Bombay", xp: 12900, mv: "-1", solved: 178, isCurrentUser: false, avatar: "AG" },
      { rank: 86, name: "Rohan Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+5", solved: 48, isCurrentUser: true, avatar: "RD" }
    ]
  },

  // Friends System & Network
  friends: [
    {
      uid: "ARISE-4P9W2T",
      displayName: "Sneha Kulkarni",
      college: "VJTI Mumbai",
      verifiedXp: 3890,
      friendRank: 1,
      mv: "+1",
      solved: { total: 54, easy: 28, medium: 21, hard: 5 },
      topics: { arrays: 34, trees: 24, graphs: 18, dp: 22 },
      avatar: "SK",
      dsaVisibility: "public"
    },
    {
      uid: "ARISE-7K2M9Q", // Current user
      displayName: "Rohan Deshmukh (You)",
      college: "COEP Technological University",
      verifiedXp: 3420,
      friendRank: 2,
      mv: "+2",
      solved: { total: 48, easy: 26, medium: 18, hard: 4 },
      topics: { arrays: 28, trees: 21, graphs: 16, dp: 18 },
      avatar: "RD",
      dsaVisibility: "public",
      isYou: true
    },
    {
      uid: "ARISE-8M3X1L",
      displayName: "Aditya Patil",
      college: "PICT Pune",
      verifiedXp: 3150,
      friendRank: 3,
      mv: "-1",
      solved: { total: 42, easy: 24, medium: 15, hard: 3 },
      topics: { arrays: 26, trees: 16, graphs: 14, dp: 12 },
      avatar: "AP",
      dsaVisibility: "public"
    },
    {
      uid: "ARISE-2K6Y8R",
      displayName: "Tanvi Joshi",
      college: "SPIT Mumbai",
      verifiedXp: 2780,
      friendRank: 4,
      mv: "—",
      solved: { total: 38, easy: 22, medium: 14, hard: 2 },
      topics: { arrays: 20, trees: 14, graphs: 12, dp: 10 },
      avatar: "TJ",
      dsaVisibility: "public"
    },
    {
      uid: "ARISE-9R5V3N",
      displayName: "Omkar Shinde",
      college: "Walchand Sangli",
      verifiedXp: 2420,
      friendRank: 5,
      mv: "—",
      solved: { total: 32, easy: 19, medium: 11, hard: 2 },
      topics: { arrays: 18, trees: 11, graphs: 8, dp: 7 },
      avatar: "OS",
      dsaVisibility: "private" // Notice: keeps DSA progress private!
    }
  ],

  // Mock Lookup Directory for Add Friend (Search by exact UID)
  searchDirectory: [
    {
      uid: "ARISE-3B7L9K",
      displayName: "Priya Sharma",
      college: "Government College of Engineering, Pune",
      verifiedXp: 2980,
      avatar: "PS"
    },
    {
      uid: "ARISE-6N2H4X",
      displayName: "Gaurav Kadam",
      college: "Cummins College of Engineering, Pune",
      verifiedXp: 3340,
      avatar: "GK"
    }
  ],

  // Pending Friend Requests
  pendingRequests: [
    {
      uid: "ARISE-5J1Q7M",
      displayName: "Aniket More",
      college: "COEP Technological University",
      verifiedXp: 2850,
      time: "2 hours ago",
      type: "incoming"
    }
  ],

  // Self Study Library (No XP awarded rule)
  studyLibrary: [
    {
      id: "doc-1",
      title: "Advanced Graph Algorithms & Network Flow.pdf",
      subject: "Algorithms",
      pages: 64,
      lastOpened: "Yesterday",
      fileSize: "4.2 MB",
      outline: ["1. Introduction to Max Flow", "2. Ford-Fulkerson Method", "3. Edmonds-Karp O(VE^2)", "4. Dinic's Algorithm", "5. Bipartite Matching Applications"]
    },
    {
      id: "doc-2",
      title: "MIT 6.006 Dynamic Programming Lecture Notes.pdf",
      subject: "Core CS",
      pages: 42,
      lastOpened: "3 days ago",
      fileSize: "2.8 MB",
      outline: ["1. 5 Easy Steps to DP", "2. Memoization vs Tabulation", "3. Longest Common Subsequence", "4. Knapsack Variants"]
    },
    {
      id: "doc-3",
      title: "Database Internals: Indexing and B+ Trees.pdf",
      subject: "Databases",
      pages: 58,
      lastOpened: "Oct 18, 2026",
      fileSize: "5.1 MB",
      outline: ["1. Storage Engines", "2. B+ Tree Invariants", "3. Concurrency Latches", "4. WAL & Recovery"]
    }
  ],

  // Learning Courses (With strict 80% passing final assessment)
  courses: [
    {
      id: "course-dsa-101",
      title: "Foundations of Data Structures & Asymptotic Complexity",
      category: "Data Structures",
      duration: "14 hours",
      lessonsCount: 12,
      completedLessons: 12,
      assessmentPassed: true,
      assessmentScore: 92, // Passed (>= 80%)
      skills: ["Big-O Notation", "Static & Dynamic Arrays", "Pointer Arithmetic", "Singly & Doubly Linked Lists"],
      curriculum: [
        { id: "l1", title: "Introduction to Computational Complexity & Growth Rates", status: "completed" },
        { id: "l2", title: "Asymptotic Notation: Big-O, Big-Omega, Big-Theta Proofs", status: "completed" },
        { id: "l3", title: "Dynamic Array Amortized Resizing Analysis", status: "completed" },
        { id: "l4", title: "Two Pointer Mechanics on Contiguous Arrays", status: "completed" }
      ]
    },
    {
      id: "course-algo-201",
      title: "Advanced Graph Theory & Network Traversal",
      category: "Algorithms",
      duration: "18 hours",
      lessonsCount: 16,
      completedLessons: 16,
      assessmentPassed: false, // Ready to take final assessment!
      assessmentScore: null,
      skills: ["Breadth-First Search", "Depth-First Search", "Topological Sort", "Dijkstra's Algorithm"],
      curriculum: [
        { id: "l1", title: "Graph Representations: Adjacency List vs Matrix Memory Analysis", status: "completed" },
        { id: "l2", title: "BFS Level-Order Discovery & Shortest Unweighted Paths", status: "completed" },
        { id: "l3", title: "DFS Backtracking, Tree Edges & Cycle Detection", status: "completed" },
        { id: "l4", title: "Kahn's Algorithm & In-Degree Topo Sort", status: "completed" },
        { id: "l5", title: "Dijkstra's Priority Queue Implementation & Proof", status: "completed" }
      ]
    }
  ],

  // Interactive 5-Question Final Assessment for Course 201 (Requires >= 80% to pass)
  finalAssessmentQuiz: [
    {
      id: 1,
      question: "What is the tightest upper bound time complexity of Dijkstra's algorithm implemented with a Min-Heap priority queue on graph G(V, E)?",
      options: [
        "O(V^2)",
        "O((V + E) log V)",
        "O(V log E)",
        "O(E^2)"
      ],
      correctIndex: 1,
      explanation: "Each vertex is extracted from the heap once (V log V) and each edge may trigger a heap decrease-key (E log V), yielding O((V + E) log V)."
    },
    {
      id: 2,
      question: "Which of the following conditions MUST be satisfied to find a topological ordering of a directed graph?",
      options: [
        "The graph must be strongly connected.",
        "The graph must be a Directed Acyclic Graph (DAG).",
        "All edge weights must be strictly non-negative.",
        "The graph must possess an Eulerian circuit."
      ],
      correctIndex: 1,
      explanation: "A topological sort only exists if and only if the directed graph contains no directed cycles (it is a DAG)."
    },
    {
      id: 3,
      question: "What does the presence of a 'Back Edge' in a DFS traversal of a directed graph indicate?",
      options: [
        "The graph has disconnected components.",
        "The graph contains a directed cycle.",
        "The graph is bipartite.",
        "All vertices have an in-degree of 1."
      ],
      correctIndex: 1,
      explanation: "In DFS on directed graphs, an edge pointing to an ancestor currently on the recursion stack is a back edge, proving a cycle exists."
    },
    {
      id: 4,
      question: "In Kahn's topological sort algorithm, which vertices are placed into the initial processing queue?",
      options: [
        "Vertices with in-degree = 0",
        "Vertices with out-degree = 0",
        "Vertices with the highest degree",
        "Arbitrary starting vertices"
      ],
      correctIndex: 0,
      explanation: "Kahn's algorithm initializes by enqueuing all source vertices that have zero incoming dependencies (in-degree = 0)."
    },
    {
      id: 5,
      question: "Why does standard Dijkstra's algorithm fail when applied to graphs with negative weight edges?",
      options: [
        "It encounters stack overflow errors.",
        "The greedy assumption that a visited node has its optimal shortest distance finalized is violated.",
        "It causes floating-point arithmetic exceptions.",
        "Min-heaps cannot store negative keys."
      ],
      correctIndex: 1,
      explanation: "Dijkstra assumes that adding edges to a path cannot decrease total cost. A negative edge can create a cheaper path through an already finalized vertex."
    }
  ],

  // Achievement Badges (Earned with real unlock dates, locked with requirements)
  badges: [
    {
      id: "b-first-solve",
      name: "First Blood Solve",
      desc: "Earned by achieving a judge-verified submission on any DSA problem.",
      category: "Milestone",
      status: "earned",
      unlockedDate: "October 14, 2025",
      icon: "zap"
    },
    {
      id: "b-two-pointer",
      name: "Two Pointer Virtuoso",
      desc: "Successfully verified 15 two-pointer array problems with O(1) space.",
      category: "Topic Mastery",
      status: "earned",
      unlockedDate: "November 28, 2025",
      icon: "code"
    },
    {
      id: "b-graph-trailblazer",
      name: "Graph Trailblazer",
      desc: "Solved 15 Medium or Hard Graph traversal problems confirmed by judge.",
      category: "Topic Mastery",
      status: "earned",
      unlockedDate: "January 19, 2026",
      icon: "git-commit"
    },
    {
      id: "b-century-50",
      name: "50 Verified Solves",
      desc: "Reached 48 out of 50 judge-verified original problems.",
      category: "Milestone",
      status: "locked",
      requirement: "Complete 2 more verified DSA submissions (Current: 48/50).",
      progress: 96,
      icon: "award"
    },
    {
      id: "b-dp-grandmaster",
      name: "Dynamic Programming Grandmaster",
      desc: "Solve 25 Medium/Hard Dynamic Programming challenges.",
      category: "Mastery",
      status: "locked",
      requirement: "Requires 25 DP solves confirmed by judge. Currently solved: 18/25.",
      progress: 72,
      icon: "cpu"
    },
    {
      id: "b-top-10-mh",
      name: "Maharashtra Top 10",
      desc: "Ascend to the top 10 verified DSA leaderboard in Maharashtra state.",
      category: "Rank",
      status: "locked",
      requirement: "Achieve state rank <= 10. Current state rank: #14.",
      progress: 71,
      icon: "trending-up"
    }
  ],

  // System Notifications
  notifications: [
    {
      id: "notif-1",
      title: "Friend Request Received",
      body: "Aniket More (COEP Pune) sent you a friend request to compare DSA solves.",
      time: "2 hours ago",
      read: false,
      type: "friend_request",
      senderUid: "ARISE-5J1Q7M"
    },
    {
      id: "notif-2",
      title: "Judge Verification Confirmed",
      body: "Your submission for 'Pairwise Sensor Target Calibration' was verified by the judge. +40 XP awarded.",
      time: "Yesterday",
      read: true,
      type: "solve_success"
    },
    {
      id: "notif-3",
      title: "Rank Update in Maharashtra",
      body: "You moved up 2 spots to Rank #14 in Maharashtra after your verified solve.",
      time: "2 days ago",
      read: true,
      type: "rank_update"
    }
  ]
};
`;

fs.writeFileSync('d:/ARISE/js/data.js', dataTemplate, 'utf8');
console.log('SUCCESS: Written perfectly formatted data.js with', problems.length, 'enhanced problems!');
