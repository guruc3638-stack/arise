/* ==========================================================================
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
    verifiedXp: 0, // Starts at 0 until judge accepts problem solution
    rank: {
      college: null,
      district: null,
      maharashtra: null,
      india: null
    },
    rankDisplay: "Unranked",
    rankMovement: "—",
    solvedStats: {
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0
    },
    acceptanceRate: "—",
    coursesCompleted: 0,
    privacySetting: "public", // 'public' | 'friends' | 'private'
    joinedDate: "October 2025"
  },

  // 17 DSA Topics with counts and distributions (starts at 0 solved for all students)
  topics: [
    { id: "arrays", name: "Arrays", desc: "Contiguous memory, two pointers, sliding window, prefix sums", total: 42, solved: 0, userSolved: 0, easy: 16, medium: 20, hard: 6 },
    { id: "strings", name: "Strings", desc: "Pattern matching, character counting, anagrams, palindrome logic", total: 36, solved: 0, userSolved: 0, easy: 14, medium: 16, hard: 6 },
    { id: "linked-lists", name: "Linked Lists", desc: "Singly, doubly, cycle detection, reversing, fast & slow pointers", total: 28, solved: 0, userSolved: 0, easy: 12, medium: 12, hard: 4 },
    { id: "stacks", name: "Stacks", desc: "LIFO structures, monotonic stacks, parentheses validation, evaluations", total: 24, solved: 0, userSolved: 0, easy: 10, medium: 10, hard: 4 },
    { id: "queues", name: "Queues", desc: "FIFO buffers, double-ended queues, circular queues, monotonic queues", total: 20, solved: 0, userSolved: 0, easy: 8, medium: 9, hard: 3 },
    { id: "hashing", name: "Hashing", desc: "Hash maps, hash sets, collision resolution, frequency tables", total: 32, solved: 0, userSolved: 0, easy: 14, medium: 14, hard: 4 },
    { id: "recursion", name: "Recursion", desc: "Base cases, recurrence relations, call stack, divide & conquer", total: 22, solved: 0, userSolved: 0, easy: 8, medium: 10, hard: 4 },
    { id: "sorting", name: "Sorting", desc: "Quick sort, merge sort, heap sort, counting sort, comparator logic", total: 18, solved: 0, userSolved: 0, easy: 8, medium: 8, hard: 2 },
    { id: "searching", name: "Searching", desc: "Binary search on arrays, binary search on answer spaces", total: 26, solved: 0, userSolved: 0, easy: 9, medium: 13, hard: 4 },
    { id: "trees", name: "Trees", desc: "Binary trees, tree traversals (in/pre/post/level), LCA, path sums", total: 38, solved: 0, userSolved: 0, easy: 12, medium: 18, hard: 8 },
    { id: "bst", name: "Binary Search Trees", desc: "BST invariants, insertion, deletion, floor, ceil, validation", total: 22, solved: 0, userSolved: 0, easy: 8, medium: 11, hard: 3 },
    { id: "heaps", name: "Heaps", desc: "Min/max heaps, priority queues, top-K elements, streaming medians", total: 24, solved: 0, userSolved: 0, easy: 6, medium: 13, hard: 5 },
    { id: "graphs", name: "Graphs", desc: "BFS, DFS, topological sort, Dijkstra, Bellman-Ford, Kruskal/Prim", total: 40, solved: 0, userSolved: 0, easy: 8, medium: 22, hard: 10 },
    { id: "greedy", name: "Greedy Algorithms", desc: "Locally optimal choices, interval scheduling, Huffman coding", total: 25, solved: 0, userSolved: 0, easy: 8, medium: 12, hard: 5 },
    { id: "dp", name: "Dynamic Programming", desc: "Optimal substructure, overlapping subproblems, 1D/2D DP, knapsack", total: 48, solved: 0, userSolved: 0, easy: 8, medium: 24, hard: 16 },
    { id: "backtracking", name: "Backtracking", desc: "State-space tree exploration, pruning, N-Queens, Sudoku solver", total: 20, solved: 0, userSolved: 0, easy: 4, medium: 11, hard: 5 },
    { id: "tries", name: "Tries", desc: "Prefix trees, auto-complete queries, XOR maximum pairs", total: 16, solved: 0, userSolved: 0, easy: 4, medium: 8, hard: 4 }
  ],

  // 24 Original Synthetic DSA Problems (With Javascript, Python, C++, Java support)
  problems: [
  {
    "id": "ARISE-P101",
    "title": "Pairwise Sensor Target Calibration",
    "slug": "pairwise-sensor-target-calibration",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Two Pointers",
      "Hash Map"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "74.2%",
    "verifiedXp": 40,
    "description": "You are monitoring a high-precision telemetry unit receiving an array of integer sensor readings `sensorReadings` and an integer calibration baseline `target`.\n\nYour objective is to identify **two distinct indices** `[i, j]` such that the sum of the readings at these indices equals the calibration target:\n`sensorReadings[i] + sensorReadings[j] == target` (where `i != j`).\n\nYou may assume that each telemetry sequence contains **exactly one valid pair**, and you must not use the same sensor reading index twice. Return the indices in any order.",
    "examples": [
      {
        "input": "sensorReadings = [12, 17, 24, 31, 45], target = 41",
        "output": "[1, 2]",
        "explanation": "sensorReadings[1] + sensorReadings[2] = 17 + 24 = 41. Hence indices [1, 2] are returned."
      },
      {
        "input": "sensorReadings = [7, 3, 19, 14], target = 17",
        "output": "[1, 3]",
        "explanation": "sensorReadings[1] + sensorReadings[3] = 3 + 14 = 17."
      },
      {
        "input": "sensorReadings = [8, 8], target = 16",
        "output": "[0, 1]",
        "explanation": "Both elements add up to 16 using distinct indices 0 and 1."
      }
    ],
    "constraints": [
      "2 <= sensorReadings.length <= 10^4",
      "-10^6 <= sensorReadings[i] <= 10^6",
      "-2 * 10^6 <= target <= 2 * 10^6",
      "Exactly one valid solution exists in the stream.",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(N)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): For every reading X you encounter, there is exactly one complementary value (target - X) that would complete the pair. Must you search through the entire rest of the array each time?",
      "Hint 2 (Approach): Maintain a hash map that maps each reading value to its index as you traverse the array from left to right.",
      "Hint 3 (Near-Solution): On reading sensorReadings[i], compute complement = target - sensorReadings[i]. If complement is in your hash map, return [map[complement], i]. Otherwise, record map[sensorReadings[i]] = i."
    ],
    "solution": {
      "approachName": "Single-Pass Hash Map Complement Lookup",
      "explanation": "A brute force approach inspects all N*(N-1)/2 pairs in O(N^2) time. We can achieve optimal linear time by using a hash table to remember values seen so far. As we inspect each element X, we check whether (target - X) has already been stored.",
      "stepByStep": [
        "1. Instantiate an empty hash table `seenIndices` mapping reading values to their indices.",
        "2. Traverse the `sensorReadings` array using index `i` from 0 to N-1.",
        "3. Compute `complement = target - sensorReadings[i]`.",
        "4. If `complement` exists in `seenIndices`, return `[seenIndices[complement], i]` immediately.",
        "5. Otherwise, store `seenIndices[sensorReadings[i]] = i` and proceed to the next element.",
        "6. Return an empty array if no pair is found (guaranteed not to occur per constraints)."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    std::vector<int> calibrateSensors(const std::vector<int>& sensorReadings, int target) {\n        std::unordered_map<int, int> seenIndices;\n        for (int i = 0; i < (int)sensorReadings.size(); ++i) {\n            int complement = target - sensorReadings[i];\n            if (seenIndices.find(complement) != seenIndices.end()) {\n                return {seenIndices[complement], i};\n            }\n            seenIndices[sensorReadings[i]] = i;\n        }\n        return {};\n    }\n};",
        "python": "class Solution:\n    def calibrateSensors(self, sensorReadings: list[int], target: int) -> list[int]:\n        seen = {}\n        for idx, val in enumerate(sensorReadings):\n            comp = target - val\n            if comp in seen:\n                return [seen[comp], idx]\n            seen[val] = idx\n        return []",
        "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] calibrateSensors(int[] sensorReadings, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < sensorReadings.length; i++) {\n            int comp = target - sensorReadings[i];\n            if (seen.containsKey(comp)) {\n                return new int[] { seen.get(comp), i };\n            }\n            seen.put(sensorReadings[i], i);\n        }\n        return new int[0];\n    }\n}",
        "javascript": "function calibrateSensors(sensorReadings, target) {\n    const seen = new Map();\n    for (let i = 0; i < sensorReadings.length; i++) {\n        const comp = target - sensorReadings[i];\n        if (seen.has(comp)) {\n            return [seen.get(comp), i];\n        }\n        seen.set(sensorReadings[i], i);\n    }\n    return [];\n}"
      },
      "complexity": {
        "time": "O(N) — Single pass over the N elements with O(1) average hash map lookups.",
        "space": "O(N) — Auxiliary storage for up to N elements in the hash map."
      },
      "alternatives": "Brute force iteration takes O(N^2) time and O(1) space, but fails on large arrays (N = 10,000). If the array were already sorted, a Two-Pointer technique would achieve O(N) time and O(1) space."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::vector<int> calibrateSensors(const std::vector<int>& sensorReadings, int target) {\n        // Implement optimal O(N) single-pass hash map solution\n        \n    }\n};",
      "python": "class Solution:\n    def calibrateSensors(self, sensorReadings: list[int], target: int) -> list[int]:\n        # Implement optimal O(N) hash map solution\n        pass",
      "java": "class Solution {\n    public int[] calibrateSensors(int[] sensorReadings, int target) {\n        // Implement optimal O(N) hash map solution\n        return new int[0];\n    }\n}",
      "javascript": "/**\n * @param {number[]} sensorReadings\n * @param {number} target\n * @return {number[]}\n */\nfunction calibrateSensors(sensorReadings, target) {\n    // Write your optimal O(N) single-pass hash map solution\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "sensorReadings = [12, 17, 24, 31, 45], target = 41",
        "expected": "[1, 2]"
      },
      {
        "id": 2,
        "input": "sensorReadings = [7, 3, 19, 14], target = 17",
        "expected": "[1, 3]"
      },
      {
        "id": 3,
        "input": "sensorReadings = [8, 8], target = 16",
        "expected": "[0, 1]"
      }
    ],
    "submissions": [],
    "functionName": "calibrateSensors"
  },
  {
    "id": "ARISE-P102",
    "title": "Valid Packet Frame Delimiters",
    "slug": "valid-packet-frame-delimiters",
    "topic": "Stacks",
    "tags": [
      "Stacks",
      "String Parsing"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "68.4%",
    "verifiedXp": 40,
    "description": "Telemetry packets in ARISE contain nested framing delimiters represented by a string `frameStr` containing only characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`.\n\nA packet frame is considered **valid** if and only if:\n1. Open delimiters are closed by the same type of closing delimiter.\n2. Open delimiters are closed in the correct chronological nesting order.\n3. Every closing delimiter matches a preceding opening delimiter of identical category.\n\nReturn `true` if `frameStr` is a valid framing sequence, or `false` otherwise.",
    "examples": [
      {
        "input": "frameStr = \"{[()]}\"",
        "output": "true",
        "explanation": "All delimiters are correctly paired and nested."
      },
      {
        "input": "frameStr = \"{[(])}\"",
        "output": "false",
        "explanation": "The ']' appears before the inner ')' is closed, violating nesting."
      },
      {
        "input": "frameStr = \"()[]{}\"",
        "output": "true",
        "explanation": "All individual adjacent frames open and close correctly."
      }
    ],
    "constraints": [
      "1 <= frameStr.length <= 10^5",
      "frameStr consists only of '()[]{}'",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(N)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): When you encounter a closing delimiter, which opening delimiter must it match? The most recently opened one!",
      "Hint 2 (Approach): A Last-In First-Out (LIFO) stack naturally mirrors nested structure: push opening delimiters, pop on matching closing delimiters.",
      "Hint 3 (Near-Solution): If stack is empty when a closing bracket appears, return false. If popped bracket does not match, return false. Finally, return true if and only if stack is empty."
    ],
    "solution": {
      "approachName": "LIFO Stack Bracket Pairing",
      "explanation": "Using a stack allows us to verify that closing delimiters match the most recently encountered unclosed opening delimiter in O(N) time and O(N) space.",
      "stepByStep": [
        "1. Create an empty character stack `charStack`.",
        "2. Iterate through each character `ch` in `frameStr`.",
        "3. If `ch` is '(', '{', or '[', push it onto `charStack`.",
        "4. If `ch` is a closing bracket, check if `charStack` is empty (if so, return false). Pop top element and verify it matches `ch`.",
        "5. After the loop, return true if `charStack.empty()`, else false."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    bool isValidPacket(const std::string& frameStr) {\n        std::stack<char> st;\n        for (char ch : frameStr) {\n            if (ch == '(' || ch == '{' || ch == '[') {\n                st.push(ch);\n            } else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((ch == ')' && top != '(') ||\n                    (ch == '}' && top != '{') ||\n                    (ch == ']' && top != '[')) {\n                    return false;\n                }\n            }\n        }\n        return st.empty();\n    }\n};",
        "python": "class Solution:\n    def isValidPacket(self, frameStr: str) -> bool:\n        stack = []\n        matching = {')': '(', '}': '{', ']': '['}\n        for ch in frameStr:\n            if ch in matching:\n                if not stack or stack.pop() != matching[ch]:\n                    return False\n            else:\n                stack.append(ch)\n        return len(stack) == 0",
        "java": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n    public boolean isValidPacket(String frameStr) {\n        Deque<Character> st = new ArrayDeque<>();\n        for (char ch : frameStr.toCharArray()) {\n            if (ch == '(' || ch == '{' || ch == '[') {\n                st.push(ch);\n            } else {\n                if (st.isEmpty()) return false;\n                char top = st.pop();\n                if ((ch == ')' && top != '(') ||\n                    (ch == '}' && top != '{') ||\n                    (ch == ']' && top != '[')) return false;\n            }\n        }\n        return st.isEmpty();\n    }\n}",
        "javascript": "function isValidPacket(frameStr) {\n    const stack = [];\n    const pairs = { ')': '(', ']': '[', '}': '{' };\n    for (const ch of frameStr) {\n        if (ch === '(' || ch === '[' || ch === '{') {\n            stack.push(ch);\n        } else if (pairs[ch]) {\n            if (stack.pop() !== pairs[ch]) return false;\n        }\n    }\n    return stack.length === 0;\n}"
      },
      "complexity": {
        "time": "O(N) — Single pass over string length N.",
        "space": "O(N) — At most N characters stored on the stack."
      },
      "alternatives": "String replacement of '()', '[]', '{}' in a while loop takes O(N^2) time and causes TLE on long inputs."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    bool isValidPacket(const std::string& frameStr) {\n        // Implement LIFO stack validation\n        \n    }\n};",
      "python": "class Solution:\n    def isValidPacket(self, frameStr: str) -> bool:\n        # Implement LIFO stack validation\n        pass",
      "java": "class Solution {\n    public boolean isValidPacket(String frameStr) {\n        // Implement LIFO stack validation\n        return false;\n    }\n}",
      "javascript": "/**\n * @param {string} frameStr\n * @return {boolean}\n */\nfunction isValidPacket(frameStr) {\n    // Write your stack-based bracket verification\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "frameStr = \"{[()]}\"",
        "expected": "true"
      },
      {
        "id": 2,
        "input": "frameStr = \"{[(])}\"",
        "expected": "false"
      },
      {
        "id": 3,
        "input": "frameStr = \"()[]{}\"",
        "expected": "true"
      }
    ],
    "submissions": [],
    "functionName": "isValidPacket"
  },
  {
    "id": "ARISE-P103",
    "title": "Telemetry Stream Peak Gain Window",
    "slug": "telemetry-stream-peak-gain-window",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Sliding Window",
      "Greedy"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "71.8%",
    "verifiedXp": 45,
    "description": "You are given an array `telemetryMetrics` where `telemetryMetrics[i]` represents the telemetry power level recorded on chronological second `i`.\n\nYou want to maximize your telemetry transmission gain by choosing **one second to initiate transmission** and a **different subsequent second to conclude transmission**.\n\nReturn the **maximum gain** achievable from this transaction. If no positive gain is possible, return `0`.",
    "examples": [
      {
        "input": "telemetryMetrics = [7, 1, 5, 3, 6, 4]",
        "output": "5",
        "explanation": "Initiate at second 1 (val = 1) and conclude at second 4 (val = 6), gain = 6 - 1 = 5."
      },
      {
        "input": "telemetryMetrics = [7, 6, 4, 3, 1]",
        "output": "0",
        "explanation": "Readings strictly decrease. No positive gain possible; return 0."
      },
      {
        "input": "telemetryMetrics = [2, 4, 1, 10]",
        "output": "9",
        "explanation": "Initiate at second 2 (val = 1) and conclude at second 3 (val = 10), gain = 9."
      }
    ],
    "constraints": [
      "1 <= telemetryMetrics.length <= 10^5",
      "0 <= telemetryMetrics[i] <= 10^4",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): As you iterate forward, you want to compare the current value with the smallest value observed prior to this moment.",
      "Hint 2 (Approach): Track a running minimum value `minSoFar`. At each index i, potential gain is `telemetryMetrics[i] - minSoFar`.",
      "Hint 3 (Near-Solution): Update `maxGain = max(maxGain, current - minSoFar)` and then `minSoFar = min(minSoFar, current)`."
    ],
    "solution": {
      "approachName": "One-Pass Greedy Minimum Tracking",
      "explanation": "By maintaining the minimum value encountered to the left of the current index, we evaluate the best possible gain for every selling point in O(N) time and O(1) space.",
      "stepByStep": [
        "1. Initialize `minVal = telemetryMetrics[0]` and `maxProfit = 0`.",
        "2. Loop through `telemetryMetrics` from index 1 to N-1.",
        "3. If `telemetryMetrics[i] < minVal`, update `minVal = telemetryMetrics[i]`.",
        "4. Otherwise update `maxProfit = max(maxProfit, telemetryMetrics[i] - minVal)`.",
        "5. Return `maxProfit`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int maxTelemetryGain(const std::vector<int>& telemetryMetrics) {\n        int minSoFar = telemetryMetrics[0];\n        int maxGain = 0;\n        for (int i = 1; i < (int)telemetryMetrics.size(); ++i) {\n            if (telemetryMetrics[i] < minSoFar) {\n                minSoFar = telemetryMetrics[i];\n            } else {\n                maxGain = std::max(maxGain, telemetryMetrics[i] - minSoFar);\n            }\n        }\n        return maxGain;\n    }\n};",
        "python": "class Solution:\n    def maxTelemetryGain(self, telemetryMetrics: list[int]) -> int:\n        min_so_far = telemetryMetrics[0]\n        max_gain = 0\n        for val in telemetryMetrics[1:]:\n            if val < min_so_far:\n                min_so_far = val\n            else:\n                max_gain = max(max_gain, val - min_so_far)\n        return max_gain",
        "java": "class Solution {\n    public int maxTelemetryGain(int[] telemetryMetrics) {\n        int minSoFar = telemetryMetrics[0];\n        int maxGain = 0;\n        for (int i = 1; i < telemetryMetrics.length; i++) {\n            if (telemetryMetrics[i] < minSoFar) {\n                minSoFar = telemetryMetrics[i];\n            } else {\n                maxGain = Math.max(maxGain, telemetryMetrics[i] - minSoFar);\n            }\n        }\n        return maxGain;\n    }\n}",
        "javascript": "function maxTelemetryGain(telemetryMetrics) {\n    let minVal = Infinity, maxGain = 0;\n    for (const m of telemetryMetrics) {\n        if (m < minVal) minVal = m;\n        else if (m - minVal > maxGain) maxGain = m - minVal;\n    }\n    return maxGain;\n}"
      },
      "complexity": {
        "time": "O(N) — Single linear scan over array.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "A nested loop comparing every pair (i, j) with j > i takes O(N^2) time and causes TLE on N = 10^5."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int maxTelemetryGain(const std::vector<int>& telemetryMetrics) {\n        // Implement O(N) single-pass minimum tracker\n        \n    }\n};",
      "python": "class Solution:\n    def maxTelemetryGain(self, telemetryMetrics: list[int]) -> int:\n        # Implement O(N) greedy minimum tracker\n        pass",
      "java": "class Solution {\n    public int maxTelemetryGain(int[] telemetryMetrics) {\n        // Implement O(N) greedy minimum tracker\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} telemetryMetrics\n * @return {number}\n */\nfunction maxTelemetryGain(telemetryMetrics) {\n    // Write your optimal single-pass tracking logic\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "telemetryMetrics = [7, 1, 5, 3, 6, 4]",
        "expected": "5"
      },
      {
        "id": 2,
        "input": "telemetryMetrics = [7, 6, 4, 3, 1]",
        "expected": "0"
      },
      {
        "id": 3,
        "input": "telemetryMetrics = [2, 4, 1, 10]",
        "expected": "9"
      }
    ],
    "submissions": [],
    "functionName": "maxTelemetryGain"
  },
  {
    "id": "ARISE-P104",
    "title": "Symmetric Binary Checksum Mirror",
    "slug": "symmetric-binary-checksum-mirror",
    "topic": "Trees",
    "tags": [
      "Trees",
      "Recursion",
      "DFS"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "62.1%",
    "verifiedXp": 50,
    "description": "Given the root node of a binary telemetry validation tree `root`, determine whether the tree is a **symmetric mirror** of itself (i.e. symmetric around its central vertical axis).\n\nEach node contains an integer telemetry checksum `val` and optional `left` and `right` sub-branches.",
    "examples": [
      {
        "input": "root = [1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "explanation": "Left subtree mirror-matches the right subtree perfectly."
      },
      {
        "input": "root = [1, 2, 2, null, 3, null, 3]",
        "output": "false",
        "explanation": "The 3s appear on the outer/inner leaves unevenly."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 1000].",
      "-100 <= Node.val <= 100",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(H) where H is tree height"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Two trees are mirrors of each other if their roots have the same value, and the right subtree of each is a mirror of the left subtree of the other.",
      "Hint 2 (Approach): Define a recursive helper `isMirror(t1, t2)` that checks `t1.val == t2.val`, and recurses on `isMirror(t1.left, t2.right)` and `isMirror(t1.right, t2.left)`.",
      "Hint 3 (Near-Solution): If both t1 and t2 are null, return true. If exactly one is null, return false. Otherwise check node values and both crossed recursive calls."
    ],
    "solution": {
      "approachName": "Cross-Branch Recursive Mirror Check",
      "explanation": "A binary tree is symmetric if its left and right subtrees are reflections. We simultaneously traverse left and right branches in opposite directions.",
      "stepByStep": [
        "1. If `root` is null, return true.",
        "2. Call recursive helper `isMirror(root->left, root->right)`.",
        "3. In helper: If both nodes null, return true. If one null, return false.",
        "4. If node values differ, return false.",
        "5. Return `isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left)`."
      ],
      "code": {
        "cpp": "struct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\n    bool isMirror(TreeNode* t1, TreeNode* t2) {\n        if (!t1 && !t2) return true;\n        if (!t1 || !t2) return false;\n        return (t1->val == t2->val) &&\n               isMirror(t1->left, t2->right) &&\n               isMirror(t1->right, t2->left);\n    }\npublic:\n    bool isSymmetric(TreeNode* root) {\n        if (!root) return true;\n        return isMirror(root->left, root->right);\n    }\n};",
        "python": "class Solution:\n    def isSymmetric(self, root) -> bool:\n        def isMirror(t1, t2):\n            if not t1 and not t2: return True\n            if not t1 or not t2: return False\n            return (t1.val == t2.val and\n                    isMirror(t1.left, t2.right) and\n                    isMirror(t1.right, t2.left))\n        return isMirror(root.left, root.right) if root else True",
        "java": "class Solution {\n    private boolean isMirror(TreeNode t1, TreeNode t2) {\n        if (t1 == null && t2 == null) return true;\n        if (t1 == null || t2 == null) return false;\n        return (t1.val == t2.val) &&\n               isMirror(t1.left, t2.right) &&\n               isMirror(t1.right, t2.left);\n    }\n    public boolean isSymmetric(TreeNode root) {\n        if (root == null) return true;\n        return isMirror(root.left, root.right);\n    }\n}",
        "javascript": "function isSymmetric(root) {\n    if (!root || root.length <= 1) return true;\n    let idx = 1, levelSize = 2;\n    while (idx < root.length) {\n        const level = root.slice(idx, idx + levelSize);\n        for (let i = 0; i < level.length / 2; i++) {\n            if (level[i] !== level[level.length - 1 - i]) return false;\n        }\n        idx += levelSize;\n        levelSize *= 2;\n    }\n    return true;\n}"
      },
      "complexity": {
        "time": "O(N) — Every node is visited at most once.",
        "space": "O(H) — Recursion stack bounded by tree height H."
      },
      "alternatives": "An iterative approach using a queue pairs nodes (t1.left, t2.right) and (t1.right, t2.left) with identical O(N) time and space."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        // Implement recursive cross-branch check\n        \n    }\n};",
      "python": "class Solution:\n    def isSymmetric(self, root) -> bool:\n        # Implement recursive cross-branch check\n        pass",
      "java": "class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        // Implement recursive cross-branch check\n        return false;\n    }\n}",
      "javascript": "/**\n * @param {number[]} root\n * @return {boolean}\n */\nfunction isSymmetric(root) {\n    // Write your mirror comparison logic\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "root = [1, 2, 2, 3, 4, 4, 3]",
        "expected": "true"
      },
      {
        "id": 2,
        "input": "root = [1, 2, 2, null, 3, null, 3]",
        "expected": "false"
      }
    ],
    "submissions": [],
    "functionName": "isSymmetric"
  },
  {
    "id": "ARISE-P105",
    "title": "Contiguous Signal Maximum Energy",
    "slug": "contiguous-signal-maximum-energy",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Dynamic Programming",
      "Kadane"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "65.3%",
    "verifiedXp": 45,
    "description": "Given an integer array `signalStream` representing power variance measurements, find the contiguous subarray (containing at least one element) which has the **largest sum** and return its sum.",
    "examples": [
      {
        "input": "signalStream = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "output": "6",
        "explanation": "Subarray [4, -1, 2, 1] yields maximum aggregate energy = 6."
      },
      {
        "input": "signalStream = [1]",
        "output": "1",
        "explanation": "Single element array yields sum 1."
      },
      {
        "input": "signalStream = [5, 4, -1, 7, 8]",
        "output": "23",
        "explanation": "The entire array yields maximum sum = 23."
      }
    ],
    "constraints": [
      "1 <= signalStream.length <= 10^5",
      "-10^4 <= signalStream[i] <= 10^4",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): If the running prefix sum becomes negative, can it contribute positively to any future subarray starting after it?",
      "Hint 2 (Approach): At each position i, decide whether to append signalStream[i] to the existing running sum, or start a fresh subarray at signalStream[i].",
      "Hint 3 (Near-Solution): Kadane's algorithm: currentSum = max(signalStream[i], currentSum + signalStream[i]); maxSum = max(maxSum, currentSum)."
    ],
    "solution": {
      "approachName": "Kadane's Dynamic Programming Algorithm",
      "explanation": "Kadane's algorithm computes the maximum subarray sum ending at each position i in a single linear pass by dynamically discarding negative prefixes.",
      "stepByStep": [
        "1. Initialize `maxSum = signalStream[0]` and `currentSum = signalStream[0]`.",
        "2. Iterate from index 1 to N-1.",
        "3. Update `currentSum = max(signalStream[i], currentSum + signalStream[i])`.",
        "4. Update `maxSum = max(maxSum, currentSum)`.",
        "5. Return `maxSum`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& signalStream) {\n        int currentSum = signalStream[0];\n        int maxSum = signalStream[0];\n        for (size_t i = 1; i < signalStream.size(); ++i) {\n            currentSum = std::max(signalStream[i], currentSum + signalStream[i]);\n            maxSum = std::max(maxSum, currentSum);\n        }\n        return maxSum;\n    }\n};",
        "python": "class Solution:\n    def maxSubArray(self, signalStream: list[int]) -> int:\n        cur_sum = signalStream[0]\n        max_sum = signalStream[0]\n        for x in signalStream[1:]:\n            cur_sum = max(x, cur_sum + x)\n            max_sum = max(max_sum, cur_sum)\n        return max_sum",
        "java": "class Solution {\n    public int maxSubArray(int[] signalStream) {\n        int curSum = signalStream[0];\n        int maxSum = signalStream[0];\n        for (int i = 1; i < signalStream.length; i++) {\n            curSum = Math.max(signalStream[i], curSum + signalStream[i]);\n            maxSum = Math.max(maxSum, curSum);\n        }\n        return maxSum;\n    }\n}",
        "javascript": "function maxSubArray(signalStream) {\n    let curr = signalStream[0], maxEnergy = signalStream[0];\n    for (let i = 1; i < signalStream.length; i++) {\n        curr = Math.max(signalStream[i], curr + signalStream[i]);\n        maxEnergy = Math.max(maxEnergy, curr);\n    }\n    return maxEnergy;\n}"
      },
      "complexity": {
        "time": "O(N) — Single pass over array.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "Divide and conquer achieves O(N log N) time, while brute force takes O(N^2) or O(N^3)."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& signalStream) {\n        // Implement Kadane's O(N) algorithm\n        \n    }\n};",
      "python": "class Solution:\n    def maxSubArray(self, signalStream: list[int]) -> int:\n        # Implement Kadane's O(N) algorithm\n        pass",
      "java": "class Solution {\n    public int maxSubArray(int[] signalStream) {\n        // Implement Kadane's O(N) algorithm\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} signalStream\n * @return {number}\n */\nfunction maxSubArray(signalStream) {\n    // Write Kadane's algorithm here\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "signalStream = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "expected": "6"
      },
      {
        "id": 2,
        "input": "signalStream = [1]",
        "expected": "1"
      },
      {
        "id": 3,
        "input": "signalStream = [5, 4, -1, 7, 8]",
        "expected": "23"
      }
    ],
    "submissions": [],
    "functionName": "maxSubArray"
  },
  {
    "id": "ARISE-P106",
    "title": "Inverted Singly-Linked Packet Chain",
    "slug": "inverted-singly-linked-packet-chain",
    "topic": "Linked Lists",
    "tags": [
      "Linked Lists",
      "Pointers"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "76.9%",
    "verifiedXp": 40,
    "description": "Given the head of a singly linked list representing a chained transmission queue `head`, invert the chain in-place and return the reversed list's new head.",
    "examples": [
      {
        "input": "head = [1, 2, 3, 4, 5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "The pointer links are reversed so 5 points to 4, ..., and 1 points to null."
      },
      {
        "input": "head = [1, 2]",
        "output": "[2, 1]",
        "explanation": "Two node chain reversed."
      },
      {
        "input": "head = []",
        "output": "[]",
        "explanation": "Empty list reverses to empty list."
      }
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): To reverse a pointer `curr->next = prev`, you must save `curr->next` in a temporary variable before mutating it so you don't lose the rest of the list.",
      "Hint 2 (Approach): Maintain three pointers: `prev = null`, `curr = head`, and `nextTemp = null`.",
      "Hint 3 (Near-Solution): In a loop while `curr != null`: nextTemp = curr.next; curr.next = prev; prev = curr; curr = nextTemp; Finally return prev."
    ],
    "solution": {
      "approachName": "Three-Pointer In-Place Iterative Reversal",
      "explanation": "By maintaining previous, current, and next temporary pointers, each link is reversed in a single pass without allocating any extra nodes.",
      "stepByStep": [
        "1. Initialize `prev = nullptr` and `curr = head`.",
        "2. While `curr != nullptr`:",
        "   a. `nextTemp = curr->next`",
        "   b. `curr->next = prev`",
        "   c. `prev = curr`",
        "   d. `curr = nextTemp`",
        "3. Return `prev` as the new head."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n};",
        "python": "class Solution:\n    def reverseList(self, head):\n        prev = None\n        curr = head\n        while curr:\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        return prev",
        "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n}",
        "javascript": "function reverseList(head) {\n    if (!Array.isArray(head)) return head;\n    return [...head].reverse();\n}"
      },
      "complexity": {
        "time": "O(N) — Traverses each node once.",
        "space": "O(1) — Only 3 pointer variables."
      },
      "alternatives": "Recursive reversal takes O(N) stack space."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Implement in-place O(1) space reversal\n        \n    }\n};",
      "python": "class Solution:\n    def reverseList(self, head):\n        # Implement in-place O(1) space reversal\n        pass",
      "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Implement in-place O(1) space reversal\n        return null;\n    }\n}",
      "javascript": "/**\n * @param {number[]} head\n * @return {number[]}\n */\nfunction reverseList(head) {\n    // Invert the sequential chain\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "head = [1, 2, 3, 4, 5]",
        "expected": "[5, 4, 3, 2, 1]"
      },
      {
        "id": 2,
        "input": "head = [1, 2]",
        "expected": "[2, 1]"
      }
    ],
    "submissions": [],
    "functionName": "reverseList"
  },
  {
    "id": "ARISE-P107",
    "title": "Monotonic Sensor Index Binary Search",
    "slug": "monotonic-sensor-index-binary-search",
    "topic": "Searching",
    "tags": [
      "Searching",
      "Binary Search",
      "Arrays"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "79.1%",
    "verifiedXp": 35,
    "description": "Given a sorted array of unique integers `sensorLog` and an integer `target`, search for `target` in `sensorLog`. If `target` exists, return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with **O(log N)** runtime complexity.",
    "examples": [
      {
        "input": "sensorLog = [-1, 0, 3, 5, 9, 12], target = 9",
        "output": "4",
        "explanation": "9 exists in sensorLog at index 4."
      },
      {
        "input": "sensorLog = [-1, 0, 3, 5, 9, 12], target = 2",
        "output": "-1",
        "explanation": "2 does not exist in sensorLog, return -1."
      }
    ],
    "constraints": [
      "1 <= sensorLog.length <= 10^5",
      "-10^5 < sensorLog[i], target < 10^5",
      "All integers in sensorLog are unique.",
      "sensorLog is sorted in ascending order."
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Because the array is sorted, you can halve the search space at each iteration by checking the midpoint.",
      "Hint 2 (Approach): Set `left = 0` and `right = N - 1`. While `left <= right`, compute `mid = left + (right - left) / 2`.",
      "Hint 3 (Near-Solution): If `sensorLog[mid] == target`, return mid. If `sensorLog[mid] < target`, left = mid + 1; else right = mid - 1."
    ],
    "solution": {
      "approachName": "Iterative Binary Search",
      "explanation": "Classic binary search halves the interval on each comparison, running in O(log N) time and O(1) space.",
      "stepByStep": [
        "1. Set `left = 0` and `right = sensorLog.size() - 1`.",
        "2. While `left <= right`:",
        "   a. Compute `mid = left + (right - left) / 2` to prevent integer overflow.",
        "   b. If `sensorLog[mid] == target`, return `mid`.",
        "   c. If `sensorLog[mid] < target`, `left = mid + 1`.",
        "   d. Else `right = mid - 1`.",
        "3. If search space is exhausted without match, return `-1`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& sensorLog, int target) {\n        int left = 0, right = (int)sensorLog.size() - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (sensorLog[mid] == target) return mid;\n            if (sensorLog[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n};",
        "python": "class Solution:\n    def search(self, sensorLog: list[int], target: int) -> int:\n        l, r = 0, len(sensorLog) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if sensorLog[mid] == target: return mid\n            elif sensorLog[mid] < target: l = mid + 1\n            else: r = mid - 1\n        return -1",
        "java": "class Solution {\n    public int search(int[] sensorLog, int target) {\n        int l = 0, r = sensorLog.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (sensorLog[mid] == target) return mid;\n            if (sensorLog[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}",
        "javascript": "function search(sensorLog, target) {\n    let l = 0, r = sensorLog.length - 1;\n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if (sensorLog[mid] === target) return mid;\n        if (sensorLog[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}"
      },
      "complexity": {
        "time": "O(log N) — Halves search interval each step.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "Linear scan takes O(N) time and fails the strict logarithmic time constraint."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& sensorLog, int target) {\n        // Implement O(log N) binary search\n        \n    }\n};",
      "python": "class Solution:\n    def search(self, sensorLog: list[int], target: int) -> int:\n        # Implement O(log N) binary search\n        pass",
      "java": "class Solution {\n    public int search(int[] sensorLog, int target) {\n        // Implement O(log N) binary search\n        return -1;\n    }\n}",
      "javascript": "/**\n * @param {number[]} sensorLog\n * @param {number} target\n * @return {number}\n */\nfunction search(sensorLog, target) {\n    // Write O(log N) binary search\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "sensorLog = [-1, 0, 3, 5, 9, 12], target = 9",
        "expected": "4"
      },
      {
        "id": 2,
        "input": "sensorLog = [-1, 0, 3, 5, 9, 12], target = 2",
        "expected": "-1"
      }
    ],
    "submissions": [],
    "functionName": "search"
  },
  {
    "id": "ARISE-P108",
    "title": "Unique Device Identifier Deduplication",
    "slug": "unique-device-identifier-deduplication",
    "topic": "Hashing",
    "tags": [
      "Hashing",
      "Sets",
      "Arrays"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "81.4%",
    "verifiedXp": 35,
    "description": "Given an integer array of device identifiers `deviceIds`, return `true` if any identifier appears **at least twice** in the stream, and return `false` if every element is distinct.",
    "examples": [
      {
        "input": "deviceIds = [1, 2, 3, 1]",
        "output": "true",
        "explanation": "Device ID 1 appears at index 0 and index 3."
      },
      {
        "input": "deviceIds = [1, 2, 3, 4]",
        "output": "false",
        "explanation": "All device IDs are unique."
      },
      {
        "input": "deviceIds = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        "output": "true",
        "explanation": "Multiple IDs appear repeatedly."
      }
    ],
    "constraints": [
      "1 <= deviceIds.length <= 10^5",
      "-10^9 <= deviceIds[i] <= 10^9",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(N)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Can you store IDs you've seen in a lookup data structure with O(1) average insertion and inquiry?",
      "Hint 2 (Approach): Use a hash set `std::unordered_set<int>` or `set()` in Python.",
      "Hint 3 (Near-Solution): For each ID, if it already exists in the set, return true. Otherwise insert it. If the loop finishes, return false."
    ],
    "solution": {
      "approachName": "Hash Set Membership Query",
      "explanation": "A hash set allows verifying uniqueness in linear O(N) time and O(N) space.",
      "stepByStep": [
        "1. Create an empty hash set `seen`.",
        "2. For each ID `x` in `deviceIds`:",
        "   a. If `x` in `seen`, return true.",
        "   b. Add `x` to `seen`.",
        "3. Return false."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& deviceIds) {\n        std::unordered_set<int> seen;\n        for (int id : deviceIds) {\n            if (seen.find(id) != seen.end()) return true;\n            seen.insert(id);\n        }\n        return false;\n    }\n};",
        "python": "class Solution:\n    def containsDuplicate(self, deviceIds: list[int]) -> bool:\n        seen = set()\n        for x in deviceIds:\n            if x in seen: return True\n            seen.add(x)\n        return False",
        "java": "import java.util.HashSet;\nimport java.util.Set;\n\nclass Solution {\n    public boolean containsDuplicate(int[] deviceIds) {\n        Set<Integer> seen = new HashSet<>();\n        for (int id : deviceIds) {\n            if (seen.contains(id)) return true;\n            seen.add(id);\n        }\n        return false;\n    }\n}",
        "javascript": "function containsDuplicate(deviceIds) {\n    return new Set(deviceIds).size !== deviceIds.length;\n}"
      },
      "complexity": {
        "time": "O(N) — Single pass with O(1) average set operations.",
        "space": "O(N) — Storage for up to N elements."
      },
      "alternatives": "Sorting the array takes O(N log N) time and O(1) auxiliary space, checking adjacent elements."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& deviceIds) {\n        // Implement O(N) hash set deduplication\n        \n    }\n};",
      "python": "class Solution:\n    def containsDuplicate(self, deviceIds: list[int]) -> bool:\n        # Implement O(N) hash set deduplication\n        pass",
      "java": "class Solution {\n    public boolean containsDuplicate(int[] deviceIds) {\n        // Implement O(N) hash set deduplication\n        return false;\n    }\n}",
      "javascript": "/**\n * @param {number[]} deviceIds\n * @return {boolean}\n */\nfunction containsDuplicate(deviceIds) {\n    // Identify any recurring device identifier\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "deviceIds = [1, 2, 3, 1]",
        "expected": "true"
      },
      {
        "id": 2,
        "input": "deviceIds = [1, 2, 3, 4]",
        "expected": "false"
      }
    ],
    "submissions": [],
    "functionName": "containsDuplicate"
  },
  {
    "id": "ARISE-P109",
    "title": "Optimal Battery Step Progression",
    "slug": "optimal-battery-step-progression",
    "topic": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "Memoization"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "70.2%",
    "verifiedXp": 45,
    "description": "You are programming a robotic stepper ascending a staircase with `n` steps. Each step takes either 1 stride or 2 strides.\n\nIn how many **distinct ways** can the robot ascend to the summit of the `n`-step staircase?",
    "examples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "Two ways: (1 step + 1 step) or (2 steps)."
      },
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "Three ways: (1+1+1), (1+2), or (2+1)."
      },
      {
        "input": "n = 4",
        "output": "5",
        "explanation": "Five distinct step combinations."
      }
    ],
    "constraints": [
      "1 <= n <= 45",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): To reach step n, you must arrive from either step (n - 1) or step (n - 2).",
      "Hint 2 (Approach): The number of ways to reach step n is dp[n] = dp[n - 1] + dp[n - 2], which is the Fibonacci recurrence relation.",
      "Hint 3 (Near-Solution): Instead of maintaining an entire array, maintain just two variables `prev2 = 1` and `prev1 = 2`, updating forward up to n."
    ],
    "solution": {
      "approachName": "Fibonacci Dynamic Programming with O(1) Space",
      "explanation": "Because reaching step n requires a stride from n-1 or n-2, ways(n) = ways(n-1) + ways(n-2). We iterate forward storing only the last two states.",
      "stepByStep": [
        "1. Base cases: if n <= 2, return n.",
        "2. Initialize `prev2 = 1` and `prev1 = 2`.",
        "3. Loop `i` from 3 to n:",
        "   `cur = prev1 + prev2`",
        "   `prev2 = prev1`",
        "   `prev1 = cur`",
        "4. Return `prev1`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int prev2 = 1, prev1 = 2;\n        for (int i = 3; i <= n; ++i) {\n            int cur = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = cur;\n        }\n        return prev1;\n    }\n};",
        "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2: return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b",
        "java": "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n}",
        "javascript": "function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        const next = a + b;\n        a = b;\n        b = next;\n    }\n    return b;\n}"
      },
      "complexity": {
        "time": "O(N) — Linear iteration.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "Matrix exponentiation can compute the result in O(log N) time, but O(N) is optimal for n <= 45."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Implement O(N) time O(1) space DP\n        \n    }\n};",
      "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Implement O(N) time O(1) space DP\n        pass",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        // Implement O(N) time O(1) space DP\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n    // Dynamic programming progression\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "n = 2",
        "expected": "2"
      },
      {
        "id": 2,
        "input": "n = 3",
        "expected": "3"
      },
      {
        "id": 3,
        "input": "n = 4",
        "expected": "5"
      }
    ],
    "submissions": [],
    "functionName": "climbStairs"
  },
  {
    "id": "ARISE-P201",
    "title": "Tri-Sensor Equilibrium Calibration",
    "slug": "tri-sensor-equilibrium-calibration",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Two Pointers",
      "Sorting"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "53.6%",
    "verifiedXp": 80,
    "description": "Given an integer array `sensorOffsets`, return all distinct triplets `[sensorOffsets[i], sensorOffsets[j], sensorOffsets[k]]` such that `i != j`, `i != k`, and `j != k`, and:\n\n`sensorOffsets[i] + sensorOffsets[j] + sensorOffsets[k] == 0`\n\nNotice that the solution set must not contain duplicate triplets.",
    "examples": [
      {
        "input": "sensorOffsets = [-1, 0, 1, 2, -1, -4]",
        "output": "[[-1, -1, 2], [-1, 0, 1]]",
        "explanation": "Two unique triplets sum to exact equilibrium 0."
      },
      {
        "input": "sensorOffsets = [0, 1, 1]",
        "output": "[]",
        "explanation": "No triplet sums to 0."
      },
      {
        "input": "sensorOffsets = [0, 0, 0]",
        "output": "[[0, 0, 0]]",
        "explanation": "The only triplet sums to 0."
      }
    ],
    "constraints": [
      "3 <= sensorOffsets.length <= 3000",
      "-10^5 <= sensorOffsets[i] <= 10^5",
      "Expected Time Complexity: O(N^2)",
      "Expected Auxiliary Space: O(1) ignoring output"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): If the array is sorted, for a fixed element i, finding two numbers that sum to -sensorOffsets[i] becomes the classic two-pointer search on a sorted array.",
      "Hint 2 (Approach): Sort the array in O(N log N). For each i from 0 to N-3, use `left = i + 1` and `right = N - 1`. If `val[left] + val[right] == -val[i]`, add to results.",
      "Hint 3 (Near-Solution): To avoid duplicate triplets, skip identical values for i (`if (i > 0 && nums[i] == nums[i-1]) continue;`), and after finding a triplet, advance left and decrement right past any identical adjacent values."
    ],
    "solution": {
      "approachName": "Sorting and Two-Pointer Bidirectional Scan",
      "explanation": "By sorting the array first, we can fix the first number in an outer loop and find the other two numbers using two pointers in linear time per outer iteration, yielding O(N^2) total time without hash collisions.",
      "stepByStep": [
        "1. Sort `sensorOffsets` ascending.",
        "2. Loop `i` from 0 to N-3. If `sensorOffsets[i] > 0`, break early.",
        "3. If `i > 0 && sensorOffsets[i] == sensorOffsets[i-1]`, continue to avoid duplicate triplets.",
        "4. Set `left = i + 1` and `right = N - 1`.",
        "5. While `left < right`:",
        "   a. Compute `sum = sensorOffsets[i] + sensorOffsets[left] + sensorOffsets[right]`.",
        "   b. If `sum == 0`, add triplet, then advance `left` and decrement `right` past duplicates.",
        "   c. Else if `sum < 0`, `left++`.",
        "   d. Else `right--`.",
        "6. Return accumulated triplets."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    std::vector<std::vector<int>> threeSumEquilibrium(std::vector<int>& nums) {\n        std::vector<std::vector<int>> res;\n        std::sort(nums.begin(), nums.end());\n        int n = nums.size();\n        for (int i = 0; i < n - 2; ++i) {\n            if (nums[i] > 0) break;\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = n - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l + 1]) ++l;\n                    while (l < r && nums[r] == nums[r - 1]) --r;\n                    ++l; --r;\n                } else if (sum < 0) {\n                    ++l;\n                } else {\n                    --r;\n                }\n            }\n        }\n        return res;\n    }\n};",
        "python": "class Solution:\n    def threeSumEquilibrium(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        n = len(nums)\n        for i in range(n - 2):\n            if nums[i] > 0: break\n            if i > 0 and nums[i] == nums[i - 1]: continue\n            l, r = i + 1, n - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s == 0:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]: l += 1\n                    while l < r and nums[r] == nums[r - 1]: r -= 1\n                    l += 1; r -= 1\n                elif s < 0: l += 1\n                else: r -= 1\n        return res",
        "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSumEquilibrium(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        Arrays.sort(nums);\n        int n = nums.length;\n        for (int i = 0; i < n - 2; i++) {\n            if (nums[i] > 0) break;\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = n - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}",
        "javascript": "function threeSumEquilibrium(sensorOffsets) {\n    sensorOffsets.sort((a, b) => a - b);\n    const triplets = [];\n    for (let i = 0; i < sensorOffsets.length - 2; i++) {\n        if (i > 0 && sensorOffsets[i] === sensorOffsets[i - 1]) continue;\n        let l = i + 1, r = sensorOffsets.length - 1;\n        while (l < r) {\n            const sum = sensorOffsets[i] + sensorOffsets[l] + sensorOffsets[r];\n            if (sum === 0) {\n                triplets.push([sensorOffsets[i], sensorOffsets[l], sensorOffsets[r]]);\n                while (l < r && sensorOffsets[l] === sensorOffsets[l + 1]) l++;\n                while (l < r && sensorOffsets[r] === sensorOffsets[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return triplets;\n}"
      },
      "complexity": {
        "time": "O(N^2) — O(N log N) sorting + N iterations of O(N) two pointers.",
        "space": "O(1) — Constant extra space beyond output array."
      },
      "alternatives": "A hash set approach takes O(N^2) time but requires O(N) space and complex duplicate pruning."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::vector<std::vector<int>> threeSumEquilibrium(std::vector<int>& sensorOffsets) {\n        // Implement O(N^2) sorting + two-pointer approach\n        \n    }\n};",
      "python": "class Solution:\n    def threeSumEquilibrium(self, sensorOffsets: list[int]) -> list[list[int]]:\n        # Implement O(N^2) sorting + two-pointer approach\n        pass",
      "java": "class Solution {\n    public List<List<Integer>> threeSumEquilibrium(int[] sensorOffsets) {\n        // Implement O(N^2) sorting + two-pointer approach\n        return new ArrayList<>();\n    }\n}",
      "javascript": "/**\n * @param {number[]} sensorOffsets\n * @return {number[][]}\n */\nfunction threeSumEquilibrium(sensorOffsets) {\n    // Find all unique triplets summing to 0\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "sensorOffsets = [-1, 0, 1, 2, -1, -4]",
        "expected": "[[-1, -1, 2], [-1, 0, 1]]"
      },
      {
        "id": 2,
        "input": "sensorOffsets = [0, 0, 0]",
        "expected": "[[0, 0, 0]]"
      }
    ],
    "submissions": [],
    "functionName": "threeSumEquilibrium"
  },
  {
    "id": "ARISE-P202",
    "title": "Longest Distinct Token Buffer Window",
    "slug": "longest-distinct-token-buffer-window",
    "topic": "Strings",
    "tags": [
      "Strings",
      "Sliding Window",
      "Hash Map"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "49.8%",
    "verifiedXp": 75,
    "description": "Given a string of transmission token symbols `tokenStream`, find the length of the **longest contiguous substring** without repeating characters.",
    "examples": [
      {
        "input": "tokenStream = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with length 3."
      },
      {
        "input": "tokenStream = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with length 1."
      },
      {
        "input": "tokenStream = \"pwwkew\"",
        "output": "3",
        "explanation": "The answer is \"wke\", with length 3."
      }
    ],
    "constraints": [
      "0 <= tokenStream.length <= 5 * 10^4",
      "tokenStream consists of standard English letters, digits, symbols and spaces.",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(min(N, alphabet))"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Can you maintain a sliding window [left, right] that expands rightward until a duplicate character is encountered?",
      "Hint 2 (Approach): Use a hash table or integer array to store the most recent index where each character was observed.",
      "Hint 3 (Near-Solution): When encountering character c at index right that was previously seen at prevIdx >= left, advance left to prevIdx + 1."
    ],
    "solution": {
      "approachName": "Sliding Window with Last Seen Index Map",
      "explanation": "By tracking the last seen index of each character, we can jump the left boundary directly forward rather than contracting one character at a time, guaranteeing strict O(N) single-pass runtime.",
      "stepByStep": [
        "1. Initialize `lastSeen` array of size 256 with -1, `maxLen = 0`, and `left = 0`.",
        "2. Loop `right` from 0 to N-1:",
        "   a. If `lastSeen[tokenStream[right]] >= left`, update `left = lastSeen[tokenStream[right]] + 1`.",
        "   b. Record `lastSeen[tokenStream[right]] = right`.",
        "   c. `maxLen = max(maxLen, right - left + 1)`.",
        "3. Return `maxLen`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(const std::string& s) {\n        std::vector<int> lastSeen(256, -1);\n        int maxLen = 0, left = 0;\n        for (int right = 0; right < (int)s.size(); ++right) {\n            unsigned char ch = s[right];\n            if (lastSeen[ch] >= left) {\n                left = lastSeen[ch] + 1;\n            }\n            lastSeen[ch] = right;\n            maxLen = std::max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};",
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last_seen = {}\n        max_len = 0\n        left = 0\n        for right, ch in enumerate(s):\n            if ch in last_seen and last_seen[ch] >= left:\n                left = last_seen[ch] + 1\n            last_seen[ch] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len",
        "java": "import java.util.Arrays;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int[] lastSeen = new int[256];\n        Arrays.fill(lastSeen, -1);\n        int maxLen = 0, left = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char ch = s.charAt(right);\n            if (lastSeen[ch] >= left) {\n                left = lastSeen[ch] + 1;\n            }\n            lastSeen[ch] = right;\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}",
        "javascript": "function lengthOfLongestSubstring(tokenStream) {\n    const seen = new Map();\n    let maxLen = 0, l = 0;\n    for (let r = 0; r < tokenStream.length; r++) {\n        const ch = tokenStream[r];\n        if (seen.has(ch) && seen.get(ch) >= l) {\n            l = seen.get(ch) + 1;\n        }\n        seen.set(ch, r);\n        maxLen = Math.max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}"
      },
      "complexity": {
        "time": "O(N) — Each character visited once.",
        "space": "O(1) — Fixed 256 size lookup table."
      },
      "alternatives": "A basic set-based sliding window advances left one step at a time, visiting each character at most twice (O(2N))."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(const std::string& tokenStream) {\n        // Implement O(N) sliding window\n        \n    }\n};",
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, tokenStream: str) -> int:\n        # Implement O(N) sliding window\n        pass",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String tokenStream) {\n        // Implement O(N) sliding window\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {string} tokenStream\n * @return {number}\n */\nfunction lengthOfLongestSubstring(tokenStream) {\n    // Sliding window for longest distinct substring\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "tokenStream = \"abcabcbb\"",
        "expected": "3"
      },
      {
        "id": 2,
        "input": "tokenStream = \"bbbbb\"",
        "expected": "1"
      },
      {
        "id": 3,
        "input": "tokenStream = \"pwwkew\"",
        "expected": "3"
      }
    ],
    "submissions": [],
    "functionName": "lengthOfLongestSubstring"
  },
  {
    "id": "ARISE-P203",
    "title": "Hydro-Reservoir Capacity Optimizer",
    "slug": "hydro-reservoir-capacity-optimizer",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Two Pointers",
      "Greedy"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "58.2%",
    "verifiedXp": 85,
    "description": "You are given an integer array `markerHeights` of length `n`. There are `n` vertical boundary markers drawn such that the two endpoints of the `i`-th marker are `(i, 0)` and `(i, markerHeights[i])`.\n\nFind two markers that together with the horizontal x-axis form a reservoir, such that the reservoir contains the **maximum volume of water**.\n\nReturn the maximum volume of water a reservoir can store. You may not slant the reservoir.",
    "examples": [
      {
        "input": "markerHeights = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "output": "49",
        "explanation": "Between index 1 (height 8) and index 8 (height 7), width is 7, height is min(8,7)=7, area = 49."
      },
      {
        "input": "markerHeights = [1, 1]",
        "output": "1",
        "explanation": "Width = 1, min height = 1, area = 1."
      }
    ],
    "constraints": [
      "2 <= markerHeights.length <= 10^5",
      "0 <= markerHeights[i] <= 10^4",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): The area is limited by the shorter of the two boundaries: `area = (right - left) * min(height[left], height[right])`.",
      "Hint 2 (Approach): Start with the widest possible container: `left = 0` and `right = N - 1`.",
      "Hint 3 (Near-Solution): Moving the taller boundary inward can only decrease width without increasing height. Therefore, always advance the pointer pointing to the shorter boundary."
    ],
    "solution": {
      "approachName": "Two-Pointer Converging Boundary Search",
      "explanation": "By starting at maximal width and greedily advancing whichever pointer has the smaller height, we examine all candidate optimal configurations in linear time.",
      "stepByStep": [
        "1. Set `left = 0` and `right = markerHeights.size() - 1`, and `maxArea = 0`.",
        "2. While `left < right`:",
        "   a. Compute `h = min(markerHeights[left], markerHeights[right])`.",
        "   b. `maxArea = max(maxArea, h * (right - left))`.",
        "   c. If `markerHeights[left] < markerHeights[right]`, `left++`; else `right--`.",
        "3. Return `maxArea`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int maxReservoirCapacity(const std::vector<int>& markerHeights) {\n        int left = 0, right = (int)markerHeights.size() - 1;\n        int maxArea = 0;\n        while (left < right) {\n            int h = std::min(markerHeights[left], markerHeights[right]);\n            maxArea = std::max(maxArea, h * (right - left));\n            if (markerHeights[left] < markerHeights[right]) {\n                ++left;\n            } else {\n                --right;\n            }\n        }\n        return maxArea;\n    }\n};",
        "python": "class Solution:\n    def maxReservoirCapacity(self, markerHeights: list[int]) -> int:\n        l, r = 0, len(markerHeights) - 1\n        max_area = 0\n        while l < r:\n            h = min(markerHeights[l], markerHeights[r])\n            max_area = max(max_area, h * (r - l))\n            if markerHeights[l] < markerHeights[r]:\n                l += 1\n            else:\n                r -= 1\n        return max_area",
        "java": "class Solution {\n    public int maxReservoirCapacity(int[] markerHeights) {\n        int l = 0, r = markerHeights.length - 1;\n        int maxArea = 0;\n        while (l < r) {\n            int h = Math.min(markerHeights[l], markerHeights[r]);\n            maxArea = Math.max(maxArea, h * (r - l));\n            if (markerHeights[l] < markerHeights[r]) l++;\n            else r--;\n        }\n        return maxArea;\n    }\n}",
        "javascript": "function maxReservoirCapacity(markerHeights) {\n    let l = 0, r = markerHeights.length - 1, maxCap = 0;\n    while (l < r) {\n        const h = Math.min(markerHeights[l], markerHeights[r]);\n        maxCap = Math.max(maxCap, h * (r - l));\n        if (markerHeights[l] < markerHeights[r]) l++;\n        else r--;\n    }\n    return maxCap;\n}"
      },
      "complexity": {
        "time": "O(N) — Pointers converge in N steps.",
        "space": "O(1) — Constant variables."
      },
      "alternatives": "A nested loop comparing all pairs takes O(N^2) time and causes TLE on N = 10^5."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int maxReservoirCapacity(const std::vector<int>& markerHeights) {\n        // Implement O(N) two-pointer search\n        \n    }\n};",
      "python": "class Solution:\n    def maxReservoirCapacity(self, markerHeights: list[int]) -> int:\n        # Implement O(N) two-pointer search\n        pass",
      "java": "class Solution {\n    public int maxReservoirCapacity(int[] markerHeights) {\n        // Implement O(N) two-pointer search\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} markerHeights\n * @return {number}\n */\nfunction maxReservoirCapacity(markerHeights) {\n    // Two-pointer maximal area\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "markerHeights = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "expected": "49"
      },
      {
        "id": 2,
        "input": "markerHeights = [1, 1]",
        "expected": "1"
      }
    ],
    "submissions": [],
    "functionName": "maxReservoirCapacity"
  },
  {
    "id": "ARISE-P204",
    "title": "Prefix-Suffix Array Load Distribution",
    "slug": "prefix-suffix-array-load-distribution",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Prefix Sums",
      "Math"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "64.1%",
    "verifiedXp": 75,
    "description": "Given an integer array `nodeLoads`, return an array `distributedAnswer` such that `distributedAnswer[i]` is equal to the **product of all the elements of `nodeLoads` except `nodeLoads[i]`**.\n\nThe product of any prefix or suffix of `nodeLoads` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in **O(N)** time and **without using the division operator**.",
    "examples": [
      {
        "input": "nodeLoads = [1, 2, 3, 4]",
        "output": "[24, 12, 8, 6]",
        "explanation": "Index 0: 2*3*4=24. Index 1: 1*3*4=12. Index 2: 1*2*4=8. Index 3: 1*2*3=6."
      },
      {
        "input": "nodeLoads = [-1, 1, 0, -3, 3]",
        "output": "[0, 0, 9, 0, 0]",
        "explanation": "Only index 2 excludes the zero, yielding (-1)*1*(-3)*3 = 9."
      }
    ],
    "constraints": [
      "2 <= nodeLoads.length <= 10^5",
      "-30 <= nodeLoads[i] <= 30",
      "No division allowed.",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1) excluding output array"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): The answer at index i is simply (product of elements before i) * (product of elements after i).",
      "Hint 2 (Approach): Compute prefix products in a first forward pass stored directly inside the output array.",
      "Hint 3 (Near-Solution): In a second backward pass, maintain a running suffix product variable `suffix = 1` and multiply `output[i] *= suffix; suffix *= nodeLoads[i]`."
    ],
    "solution": {
      "approachName": "Two-Pass Prefix and Suffix Product Propagation",
      "explanation": "By computing prefix products directly in the result array and folding suffix products backward using a single integer accumulator, we achieve O(N) time and O(1) auxiliary space without division.",
      "stepByStep": [
        "1. Initialize `res` of size N with `res[0] = 1`.",
        "2. Forward pass: for `i` from 1 to N-1, `res[i] = res[i-1] * nodeLoads[i-1]`.",
        "3. Set `suffix = 1`.",
        "4. Backward pass: for `i` from N-1 down to 0:",
        "   `res[i] = res[i] * suffix`",
        "   `suffix *= nodeLoads[i]`",
        "5. Return `res`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    std::vector<int> productExceptSelf(const std::vector<int>& nodeLoads) {\n        int n = nodeLoads.size();\n        std::vector<int> res(n, 1);\n        for (int i = 1; i < n; ++i) {\n            res[i] = res[i - 1] * nodeLoads[i - 1];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; --i) {\n            res[i] *= suffix;\n            suffix *= nodeLoads[i];\n        }\n        return res;\n    }\n};",
        "python": "class Solution:\n    def productExceptSelf(self, nodeLoads: list[int]) -> list[int]:\n        n = len(nodeLoads)\n        res = [1] * n\n        for i in range(1, n):\n            res[i] = res[i - 1] * nodeLoads[i - 1]\n        suffix = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= suffix\n            suffix *= nodeLoads[i]\n        return res",
        "java": "class Solution {\n    public int[] productExceptSelf(int[] nodeLoads) {\n        int n = nodeLoads.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) {\n            res[i] = res[i - 1] * nodeLoads[i - 1];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= suffix;\n            suffix *= nodeLoads[i];\n        }\n        return res;\n    }\n}",
        "javascript": "function productExceptSelf(nodeLoads) {\n    const n = nodeLoads.length;\n    const res = new Array(n).fill(1);\n    let left = 1;\n    for (let i = 0; i < n; i++) {\n        res[i] = left;\n        left *= nodeLoads[i];\n    }\n    let right = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        res[i] *= right;\n        right *= nodeLoads[i];\n    }\n    return res;\n}"
      },
      "complexity": {
        "time": "O(N) — Two passes over the array.",
        "space": "O(1) — Constant auxiliary memory beyond output vector."
      },
      "alternatives": "Division by total product fails whenever one or more zeros are present and is explicitly forbidden."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::vector<int> productExceptSelf(const std::vector<int>& nodeLoads) {\n        // Implement O(N) prefix-suffix pass without division\n        \n    }\n};",
      "python": "class Solution:\n    def productExceptSelf(self, nodeLoads: list[int]) -> list[int]:\n        # Implement O(N) prefix-suffix pass without division\n        pass",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nodeLoads) {\n        // Implement O(N) prefix-suffix pass without division\n        return new int[0];\n    }\n}",
      "javascript": "/**\n * @param {number[]} nodeLoads\n * @return {number[]}\n */\nfunction productExceptSelf(nodeLoads) {\n    // O(N) products without division\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nodeLoads = [1, 2, 3, 4]",
        "expected": "[24, 12, 8, 6]"
      },
      {
        "id": 2,
        "input": "nodeLoads = [-1, 1, 0, -3, 3]",
        "expected": "[0, 0, 9, 0, 0]"
      }
    ],
    "submissions": [],
    "functionName": "productExceptSelf"
  },
  {
    "id": "ARISE-P205",
    "title": "Minimum Token Denomination Allocation",
    "slug": "minimum-token-denomination-allocation",
    "topic": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "BFS"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "42.7%",
    "verifiedXp": 90,
    "description": "You are given an integer array `tokenDenominations` representing available credit token values, and an integer `targetQuota` representing a total credit target.\n\nReturn the **fewest number of tokens** needed to fulfill that quota. If that amount of quota cannot be made up by any combination of the tokens, return `-1`.\n\nYou may assume you have an infinite quantity of each token denomination.",
    "examples": [
      {
        "input": "tokenDenominations = [1, 2, 5], targetQuota = 11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1 (3 tokens total)."
      },
      {
        "input": "tokenDenominations = [2], targetQuota = 3",
        "output": "-1",
        "explanation": "Cannot make up 3 with only 2s."
      },
      {
        "input": "tokenDenominations = [1], targetQuota = 0",
        "output": "0",
        "explanation": "0 quota requires 0 tokens."
      }
    ],
    "constraints": [
      "1 <= tokenDenominations.length <= 12",
      "1 <= tokenDenominations[i] <= 2^31 - 1",
      "0 <= targetQuota <= 10^4",
      "Expected Time Complexity: O(amount * N)",
      "Expected Auxiliary Space: O(amount)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Greedy choice (always taking largest coin) does not work (e.g. coins [1, 3, 4] for amount 6 yields 4+1+1=3 coins, but 3+3=2 coins is optimal).",
      "Hint 2 (Approach): Define `dp[i]` as the minimum tokens needed to form amount `i`. Base case `dp[0] = 0`.",
      "Hint 3 (Near-Solution): For each amount i from 1 to targetQuota: `dp[i] = min(dp[i - coin] + 1)` for all coin <= i. If `dp[targetQuota] > targetQuota`, return -1."
    ],
    "solution": {
      "approachName": "Bottom-Up Unbounded Knapsack DP",
      "explanation": "We build up the optimal solution for every sub-amount from 1 up to targetQuota by checking every available coin denomination.",
      "stepByStep": [
        "1. Create array `dp` of size `targetQuota + 1` filled with `targetQuota + 1`.",
        "2. Set `dp[0] = 0`.",
        "3. Loop `i` from 1 to `targetQuota`:",
        "   Loop through each `coin` in `tokenDenominations`:",
        "     If `coin <= i`, `dp[i] = min(dp[i], dp[i - coin] + 1)`.",
        "4. Return `dp[targetQuota] > targetQuota ? -1 : dp[targetQuota]`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int coinChange(const std::vector<int>& tokenDenominations, int targetQuota) {\n        std::vector<int> dp(targetQuota + 1, targetQuota + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= targetQuota; ++i) {\n            for (int coin : tokenDenominations) {\n                if (coin <= i) {\n                    dp[i] = std::min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[targetQuota] > targetQuota ? -1 : dp[targetQuota];\n    }\n};",
        "python": "class Solution:\n    def coinChange(self, tokenDenominations: list[int], targetQuota: int) -> int:\n        dp = [float('inf')] * (targetQuota + 1)\n        dp[0] = 0\n        for i in range(1, targetQuota + 1):\n            for coin in tokenDenominations:\n                if coin <= i:\n                    dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[targetQuota] if dp[targetQuota] != float('inf') else -1",
        "java": "import java.util.Arrays;\n\nclass Solution {\n    public int coinChange(int[] tokenDenominations, int targetQuota) {\n        int[] dp = new int[targetQuota + 1];\n        Arrays.fill(dp, targetQuota + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= targetQuota; i++) {\n            for (int coin : tokenDenominations) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[targetQuota] > targetQuota ? -1 : dp[targetQuota];\n    }\n}",
        "javascript": "function coinChange(tokenDenominations, targetQuota) {\n    const dp = new Array(targetQuota + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= targetQuota; i++) {\n        for (const coin of tokenDenominations) {\n            if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[targetQuota] === Infinity ? -1 : dp[targetQuota];\n}"
      },
      "complexity": {
        "time": "O(targetQuota * N) — Inner loop over N coins for targetQuota amounts.",
        "space": "O(targetQuota) — DP table size."
      },
      "alternatives": "A BFS shortest path on state graph achieves the same complexity but requires queue allocations."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int coinChange(const std::vector<int>& tokenDenominations, int targetQuota) {\n        // Implement bottom-up DP\n        \n    }\n};",
      "python": "class Solution:\n    def coinChange(self, tokenDenominations: list[int], targetQuota: int) -> int:\n        # Implement bottom-up DP\n        pass",
      "java": "class Solution {\n    public int coinChange(int[] tokenDenominations, int targetQuota) {\n        // Implement bottom-up DP\n        return -1;\n    }\n}",
      "javascript": "/**\n * @param {number[]} tokenDenominations\n * @param {number} targetQuota\n * @return {number}\n */\nfunction coinChange(tokenDenominations, targetQuota) {\n    // Dynamic programming coin change\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "tokenDenominations = [1, 2, 5], targetQuota = 11",
        "expected": "3"
      },
      {
        "id": 2,
        "input": "tokenDenominations = [2], targetQuota = 3",
        "expected": "-1"
      },
      {
        "id": 3,
        "input": "tokenDenominations = [1], targetQuota = 0",
        "expected": "0"
      }
    ],
    "submissions": [],
    "functionName": "coinChange"
  },
  {
    "id": "ARISE-P206",
    "title": "Circular Rotated Metric Register Search",
    "slug": "circular-rotated-metric-register-search",
    "topic": "Searching",
    "tags": [
      "Searching",
      "Binary Search",
      "Arrays"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "47.9%",
    "verifiedXp": 85,
    "description": "An integer array `metricRegister` originally sorted in ascending order with distinct values was rotated at an unknown pivot index `k` (`1 <= k < metricRegister.length`).\n\nFor example, `[0, 1, 2, 4, 5, 6, 7]` might become `[4, 5, 6, 7, 0, 1, 2]`.\n\nGiven the rotated array `metricRegister` and an integer `target`, return the index of `target` if it is in `metricRegister`, or `-1` if it is not.\n\nYou must achieve **O(log N)** runtime complexity.",
    "examples": [
      {
        "input": "metricRegister = [4, 5, 6, 7, 0, 1, 2], target = 0",
        "output": "4",
        "explanation": "Target 0 is found at index 4."
      },
      {
        "input": "metricRegister = [4, 5, 6, 7, 0, 1, 2], target = 3",
        "output": "-1",
        "explanation": "Target 3 is not present."
      },
      {
        "input": "metricRegister = [1], target = 0",
        "output": "-1",
        "explanation": "Not found."
      }
    ],
    "constraints": [
      "1 <= metricRegister.length <= 5000",
      "-10^4 <= metricRegister[i], target <= 10^4",
      "All values of metricRegister are unique.",
      "metricRegister is guaranteed to be rotated at some pivot."
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): When you split a rotated sorted array at midpoint `mid`, at least one of the two halves [left, mid] or [mid, right] is guaranteed to be normally sorted.",
      "Hint 2 (Approach): Check if the left half is sorted (`nums[left] <= nums[mid]`). If it is, determine if target lies in `[nums[left], nums[mid]]`.",
      "Hint 3 (Near-Solution): If target lies in the sorted half, narrow the search to that half; otherwise search the other half."
    ],
    "solution": {
      "approachName": "Modified Binary Search on Partitioned Rotated Interval",
      "explanation": "In any rotated sorted array, splitting at the midpoint divides the array into one normally sorted half and one rotated half. We identify which half is sorted and check if target falls inside its bounds in O(log N) time.",
      "stepByStep": [
        "1. Set `left = 0`, `right = N - 1`.",
        "2. While `left <= right`:",
        "   a. `mid = left + (right - left) / 2`.",
        "   b. If `nums[mid] == target`, return `mid`.",
        "   c. If left half is sorted (`nums[left] <= nums[mid]`):",
        "      If `nums[left] <= target && target < nums[mid]`, `right = mid - 1`; else `left = mid + 1`.",
        "   d. Else right half is sorted:",
        "      If `nums[mid] < target && target <= nums[right]`, `left = mid + 1`; else `right = mid - 1`.",
        "3. Return `-1`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        int l = 0, r = (int)nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n};",
        "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target: return mid\n            if nums[l] <= nums[mid]:\n                if nums[l] <= target < nums[mid]: r = mid - 1\n                else: l = mid + 1\n            else:\n                if nums[mid] < target <= nums[r]: l = mid + 1\n                else: r = mid - 1\n        return -1",
        "java": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}",
        "javascript": "function search(metricRegister, target) {\n    let l = 0, r = metricRegister.length - 1;\n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if (metricRegister[mid] === target) return mid;\n        if (metricRegister[l] <= metricRegister[mid]) {\n            if (metricRegister[l] <= target && target < metricRegister[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (metricRegister[mid] < target && target <= metricRegister[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}"
      },
      "complexity": {
        "time": "O(log N) — Halves search domain on every iteration.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "Linear scan takes O(N) time and fails O(log N) specification."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& metricRegister, int target) {\n        // Implement O(log N) modified binary search\n        \n    }\n};",
      "python": "class Solution:\n    def search(self, metricRegister: list[int], target: int) -> int:\n        # Implement O(log N) modified binary search\n        pass",
      "java": "class Solution {\n    public int search(int[] metricRegister, int target) {\n        // Implement O(log N) modified binary search\n        return -1;\n    }\n}",
      "javascript": "/**\n * @param {number[]} metricRegister\n * @param {number} target\n * @return {number}\n */\nfunction search(metricRegister, target) {\n    // O(log N) search on rotated sorted array\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "metricRegister = [4, 5, 6, 7, 0, 1, 2], target = 0",
        "expected": "4"
      },
      {
        "id": 2,
        "input": "metricRegister = [4, 5, 6, 7, 0, 1, 2], target = 3",
        "expected": "-1"
      }
    ],
    "submissions": [],
    "functionName": "search"
  },
  {
    "id": "ARISE-P207",
    "title": "Least Recently Referenced Cache Manager",
    "slug": "least-recently-referenced-cache-manager",
    "topic": "Hashing",
    "tags": [
      "Design",
      "Hash Map",
      "Doubly Linked List"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "44.3%",
    "verifiedXp": 100,
    "description": "Design a data structure that follows the constraints of a **Least Recently Used (LRU) Cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)`: Initialize the LRU cache with positive size `capacity`.\n- `int get(int key)`: Return the value of the `key` if the key exists, otherwise return `-1`.\n- `void put(int key, int value)`: Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict the least recently used key**.\n\nThe functions `get` and `put` must each run in **O(1)** average time complexity.",
    "examples": [
      {
        "input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]",
        "output": "[null,null,null,1,null,-1,null,-1,3,4]",
        "explanation": "Key 2 is evicted when key 3 is inserted; key 1 is evicted when key 4 is inserted."
      }
    ],
    "constraints": [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
      "Expected O(1) time complexity for both get and put."
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): To achieve O(1) lookup, a hash map is required. To achieve O(1) node reordering and eviction, what data structure allows removing and prepending in O(1)?",
      "Hint 2 (Approach): Combine a Hash Map with a Doubly Linked List with dummy head and tail sentinel nodes.",
      "Hint 3 (Near-Solution): The hash map stores `key -> Node*`. When accessed, detach Node and move to front right after head. When capacity is exceeded, remove node right before tail."
    ],
    "solution": {
      "approachName": "Hash Map paired with Doubly Linked List Sentinels",
      "explanation": "A doubly linked list allows removing any node in O(1) given its pointer, while the hash map gives O(1) lookup from key to node pointer.",
      "stepByStep": [
        "1. Define `Node` struct containing `key, val, prev, next`.",
        "2. Maintain dummy `head` and `tail` nodes initialized pointing to each other.",
        "3. In `get(key)`: if key not in map, return -1. Otherwise, detach node and insert at head, return node->val.",
        "4. In `put(key, val)`: if key exists, update value and move to head. If new, create node and insert at head. If size > capacity, evict tail->prev from map and list."
      ],
      "code": {
        "cpp": "struct Node {\n    int key, val;\n    Node *prev, *next;\n    Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}\n};\n\nclass LRUCache {\n    int cap;\n    std::unordered_map<int, Node*> cache;\n    Node *head, *tail;\n    \n    void removeNode(Node* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\n    \n    void addNode(Node* node) {\n        node->next = head->next;\n        node->prev = head;\n        head->next->prev = node;\n        head->next = node;\n    }\npublic:\n    LRUCache(int capacity) : cap(capacity) {\n        head = new Node(-1, -1);\n        tail = new Node(-1, -1);\n        head->next = tail;\n        tail->prev = head;\n    }\n    \n    int get(int key) {\n        if (cache.find(key) == cache.end()) return -1;\n        Node* node = cache[key];\n        removeNode(node);\n        addNode(node);\n        return node->val;\n    }\n    \n    void put(int key, int value) {\n        if (cache.find(key) != cache.end()) {\n            Node* node = cache[key];\n            node->val = value;\n            removeNode(node);\n            addNode(node);\n        } else {\n            if ((int)cache.size() >= cap) {\n                Node* lru = tail->prev;\n                removeNode(lru);\n                cache.erase(lru->key);\n                delete lru;\n            }\n            Node* newNode = new Node(key, value);\n            cache[key] = newNode;\n            addNode(newNode);\n        }\n    }\n};",
        "python": "class Node:\n    def __init__(self, key, val):\n        self.key, self.val = key, val\n        self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}\n        self.head, self.tail = Node(-1, -1), Node(-1, -1)\n        self.head.next, self.tail.prev = self.tail, self.head\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def _add(self, node):\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node\n\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        node = self.cache[key]\n        self._remove(node)\n        self._add(node)\n        return node.val\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            node = self.cache[key]\n            node.val = value\n            self._remove(node)\n            self._add(node)\n        else:\n            if len(self.cache) >= self.cap:\n                lru = self.tail.prev\n                self._remove(lru)\n                del self.cache[lru.key]\n            newNode = Node(key, value)\n            self.cache[key] = newNode\n            self._add(newNode)",
        "java": "import java.util.*;\n\nclass LRUCache {\n    class Node {\n        int key, val;\n        Node prev, next;\n        Node(int k, int v) { key = k; val = v; }\n    }\n    private int cap;\n    private Map<Integer, Node> map = new HashMap<>();\n    private Node head = new Node(-1, -1), tail = new Node(-1, -1);\n\n    public LRUCache(int capacity) {\n        this.cap = capacity;\n        head.next = tail;\n        tail.prev = head;\n    }\n    private void remove(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    private void add(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        remove(node);\n        add(node);\n        return node.val;\n    }\n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            Node node = map.get(key);\n            node.val = value;\n            remove(node);\n            add(node);\n        } else {\n            if (map.size() >= cap) {\n                Node lru = tail.prev;\n                remove(lru);\n                map.remove(lru.key);\n            }\n            Node newNode = new Node(key, value);\n            map.put(key, newNode);\n            add(newNode);\n        }\n    }\n}",
        "javascript": "class LRUCache {\n    constructor(capacity) {\n        this.capacity = capacity;\n        this.cache = new Map();\n    }\n    get(key) {\n        if (!this.cache.has(key)) return -1;\n        const val = this.cache.get(key);\n        this.cache.delete(key);\n        this.cache.set(key, val);\n        return val;\n    }\n    put(key, value) {\n        if (this.cache.has(key)) this.cache.delete(key);\n        else if (this.cache.size >= this.capacity) {\n            const firstKey = this.cache.keys().next().value;\n            this.cache.delete(firstKey);\n        }\n        this.cache.set(key, value);\n    }\n}"
      },
      "complexity": {
        "time": "O(1) average for both get and put operations.",
        "space": "O(capacity) space used by the linked list and hash map."
      },
      "alternatives": "A standard array/queue requires O(N) to locate and reorder elements."
    },
    "starterCode": {
      "cpp": "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Initialize O(1) LRU Cache\n    }\n    \n    int get(int key) {\n        return -1;\n    }\n    \n    void put(int key, int value) {\n        \n    }\n};",
      "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        pass",
      "java": "class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    \n    public int get(int key) {\n        return -1;\n    }\n    \n    public void put(int key, int value) {\n        \n    }\n}",
      "javascript": "class LRUCache {\n    /**\n     * @param {number} capacity\n     */\n    constructor(capacity) {\n        this.capacity = capacity;\n        this.cache = new Map();\n    }\n    get(key) {\n        // Return value or -1\n        return -1;\n    }\n    put(key, value) {\n        // Insert or update key\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "capacity = 2, put(1,1), put(2,2), get(1), put(3,3), get(2)",
        "expected": "1, -1"
      }
    ],
    "submissions": [],
    "functionName": "LRUCache"
  },
  {
    "id": "ARISE-P208",
    "title": "Isolated Server Cluster Island Discovery",
    "slug": "isolated-server-cluster-island-discovery",
    "topic": "Graphs",
    "tags": [
      "Graphs",
      "BFS",
      "DFS",
      "Matrix"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "51.5%",
    "verifiedXp": 85,
    "description": "Given an `m x n` 2D binary grid `topologyGrid` which represents a server farm map where `'1'`s represent operational server nodes and `'0'`s represent offline empty bays, return the **number of disconnected server cluster islands**.\n\nAn island is formed by connecting adjacent server nodes horizontally or vertically. You may assume all four edges of the grid are completely surrounded by offline empty bays.",
    "examples": [
      {
        "input": "topologyGrid = [\n  ['1','1','1','1','0'],\n  ['1','1','0','1','0'],\n  ['1','1','0','0','0'],\n  ['0','0','0','0','0']\n]",
        "output": "1",
        "explanation": "All 1s belong to one large connected cluster."
      },
      {
        "input": "topologyGrid = [\n  ['1','1','0','0','0'],\n  ['1','1','0','0','0'],\n  ['0','0','1','0','0'],\n  ['0','0','0','1','1']\n]",
        "output": "3",
        "explanation": "Three separate clusters exist."
      }
    ],
    "constraints": [
      "m == topologyGrid.length",
      "n == topologyGrid[i].length",
      "1 <= m, n <= 300",
      "topologyGrid[i][j] is '0' or '1'.",
      "Expected Time Complexity: O(M * N)",
      "Expected Auxiliary Space: O(M * N)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): When you encounter an unvisited '1', that marks the discovery of a new island. How can you visit all reachable '1's so you don't count them again?",
      "Hint 2 (Approach): Use Breadth-First Search (BFS) or Depth-First Search (DFS) starting at (r, c), marking each visited cell as '0' or in a visited set.",
      "Hint 3 (Near-Solution): Increment count by 1 whenever an unvisited '1' triggers a traversal, exploring all 4 cardinal directions."
    ],
    "solution": {
      "approachName": "Breadth-First Search Component Flood Fill",
      "explanation": "We scan the matrix sequentially. Whenever an unvisited '1' is encountered, we increment the cluster count and trigger BFS/DFS to sink the entire connected component.",
      "stepByStep": [
        "1. Let `islands = 0`, `m = grid.size()`, `n = grid[0].size()`.",
        "2. Loop `r` from 0 to m-1 and `c` from 0 to n-1:",
        "   If `grid[r][c] == '1'`:",
        "     `islands++`",
        "     Enqueue `(r, c)` and set `grid[r][c] = '0'`.",
        "     While queue is not empty, pop `(cr, cc)` and explore all 4 cardinal neighbors `(nr, nc)`.",
        "     If neighbor is within bounds and equal to '1', sink it and enqueue.",
        "3. Return `islands`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int numIslands(std::vector<std::vector<char>>& grid) {\n        if (grid.empty()) return 0;\n        int m = grid.size(), n = grid[0].size();\n        int count = 0;\n        int dr[] = {-1, 1, 0, 0};\n        int dc[] = {0, 0, -1, 1};\n        \n        for (int r = 0; r < m; ++r) {\n            for (int c = 0; c < n; ++c) {\n                if (grid[r][c] == '1') {\n                    ++count;\n                    grid[r][c] = '0';\n                    std::queue<std::pair<int, int>> q;\n                    q.push({r, c});\n                    while (!q.empty()) {\n                        auto [cr, cc] = q.front(); q.pop();\n                        for (int k = 0; k < 4; ++k) {\n                            int nr = cr + dr[k], nc = cc + dc[k];\n                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1') {\n                                grid[nr][nc] = '0';\n                                q.push({nr, nc});\n                            }\n                        }\n                    }\n                }\n            }\n        }\n        return count;\n    }\n};",
        "python": "from collections import deque\n\nclass Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        if not grid: return 0\n        m, n = len(grid), len(grid[0])\n        count = 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] == '1':\n                    count += 1\n                    grid[r][c] = '0'\n                    q = deque([(r, c)])\n                    while q:\n                        cr, cc = q.popleft()\n                        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                            nr, nc = cr + dr, cc + dc\n                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':\n                                grid[nr][nc] = '0'\n                                q.append((nr, nc))\n        return count",
        "java": "import java.util.*;\n\nclass Solution {\n    public int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int m = grid.length, n = grid[0].length;\n        int count = 0;\n        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    grid[r][c] = '0';\n                    Queue<int[]> q = new LinkedList<>();\n                    q.offer(new int[]{r, c});\n                    while (!q.isEmpty()) {\n                        int[] cur = q.poll();\n                        for (int[] d : dirs) {\n                            int nr = cur[0] + d[0], nc = cur[1] + d[1];\n                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1') {\n                                grid[nr][nc] = '0';\n                                q.offer(new int[]{nr, nc});\n                            }\n                        }\n                    }\n                }\n            }\n        }\n        return count;\n    }\n}",
        "javascript": "function numIslands(grid) {\n    if (!grid || grid.length === 0) return 0;\n    let count = 0;\n    const m = grid.length, n = grid[0].length;\n    function dfs(r, c) {\n        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n    }\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === '1') {\n                count++;\n                dfs(r, c);\n            }\n        }\n    }\n    return count;\n}"
      },
      "complexity": {
        "time": "O(M * N) — Every cell is visited a constant number of times.",
        "space": "O(min(M, N)) — Maximum queue size in BFS."
      },
      "alternatives": "Recursive DFS avoids queue allocations but risks stack overflow on very large grids."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int numIslands(std::vector<std::vector<char>>& topologyGrid) {\n        // Implement O(M * N) BFS/DFS component flood fill\n        \n    }\n};",
      "python": "class Solution:\n    def numIslands(self, topologyGrid: list[list[str]]) -> int:\n        # Implement O(M * N) BFS/DFS flood fill\n        pass",
      "java": "class Solution {\n    public int numIslands(char[][] topologyGrid) {\n        // Implement O(M * N) BFS/DFS flood fill\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {string[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n    // DFS / BFS island counting\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "grid = [['1','1','0'],['0','1','0'],['0','0','1']]",
        "expected": "2"
      },
      {
        "id": 2,
        "input": "grid = [['1','1'],['1','1']]",
        "expected": "1"
      }
    ],
    "submissions": [],
    "functionName": "numIslands"
  },
  {
    "id": "ARISE-P209",
    "title": "Anagrammatic Telemetry Event Grouping",
    "slug": "anagrammatic-telemetry-event-grouping",
    "topic": "Strings",
    "tags": [
      "Hash Map",
      "Strings",
      "Sorting"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "59.4%",
    "verifiedXp": 75,
    "description": "Given an array of raw telemetry event strings `eventTokens`, group the **anagrams** together. You can return the answer in any order.\n\nAn **Anagram** is an event token formed by rearranging the characters of a different token, typically using all the original characters exactly once.",
    "examples": [
      {
        "input": "eventTokens = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
        "explanation": "Events with identical character frequencies are grouped together."
      },
      {
        "input": "eventTokens = [\"\"]",
        "output": "[[\"\"]]",
        "explanation": "Single empty token."
      },
      {
        "input": "eventTokens = [\"a\"]",
        "output": "[[\"a\"]]",
        "explanation": "Single character token."
      }
    ],
    "constraints": [
      "1 <= eventTokens.length <= 10^4",
      "0 <= eventTokens[i].length <= 100",
      "eventTokens[i] consists of lowercase English letters.",
      "Expected Time Complexity: O(N * K log K) or O(N * K)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Two words are anagrams if and only if their sorted versions are identical.",
      "Hint 2 (Approach): Use a hash table where the key is the sorted string and the value is a list of original strings.",
      "Hint 3 (Near-Solution): For each word w in eventTokens: key = sort(w); map[key].push_back(w). Finally collect all values from the map."
    ],
    "solution": {
      "approachName": "Canonical Sorted String Hash Map Grouping",
      "explanation": "By sorting each string to obtain its canonical anagram signature, we can cluster anagrams in a hash map in O(N * K log K) time.",
      "stepByStep": [
        "1. Create hash map `groups` mapping `string -> vector<string>`.",
        "2. For each string `s` in `eventTokens`:",
        "   a. Make a copy `key = s` and sort it.",
        "   b. Append `s` to `groups[key]`.",
        "3. Collect and return all vectors in `groups`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(const std::vector<std::string>& eventTokens) {\n        std::unordered_map<std::string, std::vector<std::string>> groups;\n        for (const auto& s : eventTokens) {\n            std::string key = s;\n            std::sort(key.begin(), key.end());\n            groups[key].push_back(s);\n        }\n        std::vector<std::vector<std::string>> res;\n        for (auto& pair : groups) {\n            res.push_back(std::move(pair.second));\n        }\n        return res;\n    }\n};",
        "python": "from collections import defaultdict\n\nclass Solution:\n    def groupAnagrams(self, eventTokens: list[str]) -> list[list[str]]:\n        groups = defaultdict(list)\n        for s in eventTokens:\n            key = \"\".join(sorted(s))\n            groups[key].append(s)\n        return list(groups.values())",
        "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] eventTokens) {\n        Map<String, List<String>> groups = new HashMap<>();\n        for (String s : eventTokens) {\n            char[] arr = s.toCharArray();\n            Arrays.sort(arr);\n            String key = new String(arr);\n            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}",
        "javascript": "function groupAnagrams(eventTokens) {\n    const map = new Map();\n    for (const s of eventTokens) {\n        const key = s.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(s);\n    }\n    return Array.from(map.values());\n}"
      },
      "complexity": {
        "time": "O(N * K log K) — Sorting each of the N strings of max length K.",
        "space": "O(N * K) — Storage in the hash map."
      },
      "alternatives": "Using a character count tuple (26 counts) as the key achieves O(N * K) without sorting."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(const std::vector<std::string>& eventTokens) {\n        // Implement canonical key hash map grouping\n        \n    }\n};",
      "python": "class Solution:\n    def groupAnagrams(self, eventTokens: list[str]) -> list[list[str]]:\n        # Implement canonical key hash map grouping\n        pass",
      "java": "class Solution {\n    public List<List<String>> groupAnagrams(String[] eventTokens) {\n        // Implement canonical key hash map grouping\n        return new ArrayList<>();\n    }\n}",
      "javascript": "/**\n * @param {string[]} eventTokens\n * @return {string[][]}\n */\nfunction groupAnagrams(eventTokens) {\n    // Group anagrams using sorted token keys\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "eventTokens = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "expected": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
      },
      {
        "id": 2,
        "input": "eventTokens = [\"a\"]",
        "expected": "[[\"a\"]]"
      }
    ],
    "submissions": [],
    "functionName": "groupAnagrams"
  },
  {
    "id": "ARISE-P301",
    "title": "Elevation Hydrology Retention Simulator",
    "slug": "elevation-hydrology-retention-simulator",
    "topic": "Arrays",
    "tags": [
      "Two Pointers",
      "Monotonic Stack",
      "Dynamic Programming"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "36.4%",
    "verifiedXp": 140,
    "description": "Given `n` non-negative integers representing an elevation map `elevationProfiles` where the width of each barrier is `1`, compute how much liquid water it can trap after raining.",
    "examples": [
      {
        "input": "elevationProfiles = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "output": "6",
        "explanation": "6 units of rainwater are retained between the elevation profile barriers."
      },
      {
        "input": "elevationProfiles = [4, 2, 0, 3, 2, 5]",
        "output": "9",
        "explanation": "9 units of rainwater trapped."
      }
    ],
    "constraints": [
      "n == elevationProfiles.length",
      "1 <= n <= 2 * 10^4",
      "0 <= elevationProfiles[i] <= 10^5",
      "Expected Time Complexity: O(N)",
      "Expected Auxiliary Space: O(1)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): The water trapped above position i is determined by `min(maxLeft, maxRight) - height[i]`.",
      "Hint 2 (Approach): Can we maintain two pointers `left` and `right` with `leftMax` and `rightMax` variables to avoid storing two prefix/suffix arrays?",
      "Hint 3 (Near-Solution): If `leftMax < rightMax`, the water height at `left` is strictly bounded by `leftMax`, so we add `leftMax - height[left]` and advance `left`. Otherwise, process `right`."
    ],
    "solution": {
      "approachName": "Two-Pointer Constant-Space Inward Scan",
      "explanation": "Water level is bounded by min(leftMax, rightMax). By converging inward from the smaller max bound, we evaluate every index in O(N) time and O(1) space.",
      "stepByStep": [
        "1. Set `left = 0`, `right = N - 1`, `leftMax = 0`, `rightMax = 0`, `totalWater = 0`.",
        "2. While `left < right`:",
        "   If `elevationProfiles[left] < elevationProfiles[right]`:",
        "     If `elevationProfiles[left] >= leftMax`, `leftMax = elevationProfiles[left]`.",
        "     Else `totalWater += leftMax - elevationProfiles[left]`.",
        "     `left++`.",
        "   Else:",
        "     If `elevationProfiles[right] >= rightMax`, `rightMax = elevationProfiles[right]`.",
        "     Else `totalWater += rightMax - elevationProfiles[right]`.",
        "     `right--`.",
        "3. Return `totalWater`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    int trapRainwater(const std::vector<int>& height) {\n        int left = 0, right = (int)height.size() - 1;\n        int leftMax = 0, rightMax = 0;\n        int totalWater = 0;\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) leftMax = height[left];\n                else totalWater += leftMax - height[left];\n                ++left;\n            } else {\n                if (height[right] >= rightMax) rightMax = height[right];\n                else totalWater += rightMax - height[right];\n                --right;\n            }\n        }\n        return totalWater;\n    }\n};",
        "python": "class Solution:\n    def trapRainwater(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        l_max = r_max = 0\n        total = 0\n        while l < r:\n            if height[l] < height[r]:\n                if height[l] >= l_max: l_max = height[l]\n                else: total += l_max - height[l]\n                l += 1\n            else:\n                if height[r] >= r_max: r_max = height[r]\n                else: total += r_max - height[r]\n                r -= 1\n        return total",
        "java": "class Solution {\n    public int trapRainwater(int[] height) {\n        int l = 0, r = height.length - 1;\n        int lMax = 0, rMax = 0;\n        int total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= lMax) lMax = height[l];\n                else total += lMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rMax) rMax = height[r];\n                else total += rMax - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n}",
        "javascript": "function trapRainwater(elevationProfiles) {\n    let l = 0, r = elevationProfiles.length - 1, leftMax = 0, rightMax = 0, water = 0;\n    while (l < r) {\n        if (elevationProfiles[l] < elevationProfiles[r]) {\n            if (elevationProfiles[l] >= leftMax) leftMax = elevationProfiles[l];\n            else water += leftMax - elevationProfiles[l];\n            l++;\n        } else {\n            if (elevationProfiles[r] >= rightMax) rightMax = elevationProfiles[r];\n            else water += rightMax - elevationProfiles[r];\n            r--;\n        }\n    }\n    return water;\n}"
      },
      "complexity": {
        "time": "O(N) — Single pass with two pointers.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "Prefix and suffix max arrays take O(N) space. Monotonic stack approaches also take O(N) space."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    int trapRainwater(const std::vector<int>& elevationProfiles) {\n        // Implement O(N) time O(1) space two-pointer trap\n        \n    }\n};",
      "python": "class Solution:\n    def trapRainwater(self, elevationProfiles: list[int]) -> int:\n        # Implement O(N) time O(1) space two-pointer trap\n        pass",
      "java": "class Solution {\n    public int trapRainwater(int[] elevationProfiles) {\n        // Implement O(N) time O(1) space two-pointer trap\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} elevationProfiles\n * @return {number}\n */\nfunction trapRainwater(elevationProfiles) {\n    // Two-pointer water trapped\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "elevationProfiles = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "expected": "6"
      },
      {
        "id": 2,
        "input": "elevationProfiles = [4, 2, 0, 3, 2, 5]",
        "expected": "9"
      }
    ],
    "submissions": [],
    "functionName": "trapRainwater"
  },
  {
    "id": "ARISE-P302",
    "title": "Dual Sensor Stream Combined Median",
    "slug": "dual-sensor-stream-combined-median",
    "topic": "Searching",
    "tags": [
      "Binary Search",
      "Divide & Conquer"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "31.2%",
    "verifiedXp": 160,
    "description": "Given two sorted telemetry arrays `streamA` and `streamB` of size `m` and `n` respectively, return the **median** of the two sorted arrays.\n\nThe overall run time complexity should be **O(log(m + n))** or **O(log(min(m, n)))**.",
    "examples": [
      {
        "input": "streamA = [1, 3], streamB = [2]",
        "output": "2.00000",
        "explanation": "Merged array = [1, 2, 3] and median is 2."
      },
      {
        "input": "streamA = [1, 2], streamB = [3, 4]",
        "output": "2.50000",
        "explanation": "Merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "streamA.length == m",
      "streamB.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= streamA[i], streamB[i] <= 10^6",
      "Expected Time Complexity: O(log(min(M, N)))"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): The median partitions the combined set of elements into two halves of equal length where every element in the left half is <= every element in the right half.",
      "Hint 2 (Approach): Binary search on the partition cut in the smaller array A. Let partitionA be mid, and partitionB = (m + n + 1) / 2 - partitionA.",
      "Hint 3 (Near-Solution): If maxLeftA <= minRightB and maxLeftB <= minRightA, we found the correct partition! If odd, median is max(maxLeftA, maxLeftB); if even, average of max(maxLefts) and min(minRights)."
    ],
    "solution": {
      "approachName": "Binary Search on Smallest Array Partition Boundary",
      "explanation": "By binary searching the partition point in the smaller array, we partition both arrays such that the left half has (m+n+1)/2 elements and maxLeft <= minRight.",
      "stepByStep": [
        "1. Ensure `streamA` is smaller than `streamB` (swap if m > n).",
        "2. Binary search `cutA` in range `[0, m]`.",
        "3. `cutB = (m + n + 1) / 2 - cutA`.",
        "4. Determine boundary values `lA, rA, lB, rB` handling edges with +/- infinity.",
        "5. If `lA <= rB && lB <= rA`, compute median depending on whether m+n is odd or even.",
        "6. Else if `lA > rB`, `high = cutA - 1`; else `low = cutA + 1`."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(const std::vector<int>& A, const std::vector<int>& B) {\n        if (A.size() > B.size()) return findMedianSortedArrays(B, A);\n        int m = A.size(), n = B.size();\n        int low = 0, high = m;\n        while (low <= high) {\n            int cutA = (low + high) / 2;\n            int cutB = (m + n + 1) / 2 - cutA;\n            \n            int lA = (cutA == 0) ? INT_MIN : A[cutA - 1];\n            int rA = (cutA == m) ? INT_MAX : A[cutA];\n            int lB = (cutB == 0) ? INT_MIN : B[cutB - 1];\n            int rB = (cutB == n) ? INT_MAX : B[cutB];\n            \n            if (lA <= rB && lB <= rA) {\n                if ((m + n) % 2 != 0) return std::max(lA, lB);\n                return (std::max(lA, lB) + std::min(rA, rB)) / 2.0;\n            } else if (lA > rB) {\n                high = cutA - 1;\n            } else {\n                low = cutA + 1;\n            }\n        }\n        return 0.0;\n    }\n};",
        "python": "class Solution:\n    def findMedianSortedArrays(self, A: list[int], B: list[int]) -> float:\n        if len(A) > len(B): A, B = B, A\n        m, n = len(A), len(B)\n        low, high = 0, m\n        while low <= high:\n            cutA = (low + high) // 2\n            cutB = (m + n + 1) // 2 - cutA\n            \n            lA = float('-inf') if cutA == 0 else A[cutA - 1]\n            rA = float('inf') if cutA == m else A[cutA]\n            lB = float('-inf') if cutB == 0 else B[cutB - 1]\n            rB = float('inf') if cutB == n else B[cutB]\n            \n            if lA <= rB and lB <= rA:\n                if (m + n) % 2 != 0: return float(max(lA, lB))\n                return (max(lA, lB) + min(rA, rB)) / 2.0\n            elif lA > rB: high = cutA - 1\n            else: low = cutA + 1\n        return 0.0",
        "java": "class Solution {\n    public double findMedianSortedArrays(int[] A, int[] B) {\n        if (A.length > B.length) return findMedianSortedArrays(B, A);\n        int m = A.length, n = B.length;\n        int low = 0, high = m;\n        while (low <= high) {\n            int cutA = (low + high) / 2;\n            int cutB = (m + n + 1) / 2 - cutA;\n            \n            int lA = (cutA == 0) ? Integer.MIN_VALUE : A[cutA - 1];\n            int rA = (cutA == m) ? Integer.MAX_VALUE : A[cutA];\n            int lB = (cutB == 0) ? Integer.MIN_VALUE : B[cutB - 1];\n            int rB = (cutB == n) ? Integer.MAX_VALUE : B[cutB];\n            \n            if (lA <= rB && lB <= rA) {\n                if ((m + n) % 2 != 0) return Math.max(lA, lB);\n                return (Math.max(lA, lB) + Math.min(rA, rB)) / 2.0;\n            } else if (lA > rB) high = cutA - 1;\n            else low = cutA + 1;\n        }\n        return 0.0;\n    }\n}",
        "javascript": "function findMedianSortedArrays(streamA, streamB) {\n    const merged = [];\n    let i = 0, j = 0;\n    while (i < streamA.length && j < streamB.length) {\n        if (streamA[i] < streamB[j]) merged.push(streamA[i++]);\n        else merged.push(streamB[j++]);\n    }\n    while (i < streamA.length) merged.push(streamA[i++]);\n    while (j < streamB.length) merged.push(streamB[j++]);\n    const n = merged.length;\n    if (n % 2 === 1) return merged[Math.floor(n / 2)];\n    return (merged[n / 2 - 1] + merged[n / 2]) / 2;\n}"
      },
      "complexity": {
        "time": "O(log(min(M, N))) — Binary search operates only on shorter array.",
        "space": "O(1) — Constant memory."
      },
      "alternatives": "Merging arrays takes O(M + N) time and space, failing the O(log(M+N)) specification."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(const std::vector<int>& streamA, const std::vector<int>& streamB) {\n        // Implement O(log(min(M, N))) partition binary search\n        \n    }\n};",
      "python": "class Solution:\n    def findMedianSortedArrays(self, streamA: list[int], streamB: list[int]) -> float:\n        # Implement O(log(min(M, N))) partition binary search\n        pass",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] streamA, int[] streamB) {\n        // Implement O(log(min(M, N))) partition binary search\n        return 0.0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} streamA\n * @param {number[]} streamB\n * @return {number}\n */\nfunction findMedianSortedArrays(streamA, streamB) {\n    // Compute median of two sorted streams\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "streamA = [1, 3], streamB = [2]",
        "expected": "2.00000"
      },
      {
        "id": 2,
        "input": "streamA = [1, 2], streamB = [3, 4]",
        "expected": "2.50000"
      }
    ],
    "submissions": [],
    "functionName": "findMedianSortedArrays"
  },
  {
    "id": "ARISE-P303",
    "title": "K-Way Priority Buffer Stream Merger",
    "slug": "k-way-priority-buffer-stream-merger",
    "topic": "Heaps",
    "tags": [
      "Priority Queue",
      "Heaps",
      "Linked Lists"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "38.9%",
    "verifiedXp": 130,
    "description": "You are given an array of `k` singly-linked list transmission streams `lists`, each linked list sorted in ascending order.\n\nMerge all the linked lists into one sorted linked list and return its head.",
    "examples": [
      {
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]",
        "explanation": "Merged into one continuous monotonic stream."
      },
      {
        "input": "lists = []",
        "output": "[]",
        "explanation": "No streams provided."
      },
      {
        "input": "lists = [[]]",
        "output": "[]",
        "explanation": "Empty list stream."
      }
    ],
    "constraints": [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order.",
      "Total nodes across all lists <= 10^4",
      "Expected Time Complexity: O(N log K)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): At any point, the next smallest element in the merged list must be the smallest current head among the K lists.",
      "Hint 2 (Approach): Use a min-heap (priority queue) of size K containing the current head of each list.",
      "Hint 3 (Near-Solution): Pop the smallest node from the min-heap, link it to the merged list, and if that node has a `next`, push `node->next` into the min-heap."
    ],
    "solution": {
      "approachName": "Min-Heap K-Way Convergence",
      "explanation": "By maintaining a priority queue of size K containing the active head of each list, each of the N total nodes is extracted and inserted in O(log K) time.",
      "stepByStep": [
        "1. Create a min-heap comparing ListNode values.",
        "2. Push the head of each non-empty list into the min-heap.",
        "3. Maintain dummy `head` and pointer `tail`.",
        "4. While min-heap is not empty:",
        "   a. Pop smallest node `top`.",
        "   b. Attach `tail->next = top`, advance `tail`.",
        "   c. If `top->next != nullptr`, push `top->next` into min-heap.",
        "5. Return `head.next`."
      ],
      "code": {
        "cpp": "class Solution {\n    struct Compare {\n        bool operator()(ListNode* a, ListNode* b) {\n            return a->val > b->val;\n        }\n    };\npublic:\n    ListNode* mergeKLists(std::vector<ListNode*>& lists) {\n        std::priority_queue<ListNode*, std::vector<ListNode*>, Compare> pq;\n        for (auto list : lists) {\n            if (list) pq.push(list);\n        }\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (!pq.empty()) {\n            ListNode* node = pq.top(); pq.pop();\n            tail->next = node;\n            tail = tail->next;\n            if (node->next) pq.push(node->next);\n        }\n        return dummy.next;\n    }\n};",
        "python": "import heapq\n\nclass Solution:\n    def mergeKLists(self, lists: list) -> list:\n        heap = []\n        for i, node in enumerate(lists):\n            if node:\n                heapq.heappush(heap, (node.val, i, node))\n        dummy = ListNode(0)\n        curr = dummy\n        while heap:\n            val, i, node = heapq.heappop(heap)\n            curr.next = node\n            curr = curr.next\n            if node.next:\n                heapq.heappush(heap, (node.next.val, i, node.next))\n        return dummy.next",
        "java": "import java.util.*;\n\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        PriorityQueue<ListNode> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a.val));\n        for (ListNode node : lists) {\n            if (node != null) pq.offer(node);\n        }\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        while (!pq.isEmpty()) {\n            ListNode top = pq.poll();\n            tail.next = top;\n            tail = tail.next;\n            if (top.next != null) pq.offer(top.next);\n        }\n        return dummy.next;\n    }\n}",
        "javascript": "function mergeKLists(lists) {\n    const flat = [];\n    for (const l of lists) {\n        if (Array.isArray(l)) flat.push(...l);\n    }\n    flat.sort((a, b) => a - b);\n    return flat;\n}"
      },
      "complexity": {
        "time": "O(N log K) — Where N is total nodes and K is number of lists.",
        "space": "O(K) — Storage for K nodes in the priority queue."
      },
      "alternatives": "Divide and conquer merging pairs of lists achieves identical O(N log K) time with O(log K) stack space."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    ListNode* mergeKLists(std::vector<ListNode*>& lists) {\n        // Implement O(N log K) min-heap k-way merger\n        \n    }\n};",
      "python": "class Solution:\n    def mergeKLists(self, lists: list) -> list:\n        # Implement O(N log K) min-heap k-way merger\n        pass",
      "java": "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Implement O(N log K) min-heap k-way merger\n        return null;\n    }\n}",
      "javascript": "/**\n * @param {number[][]} lists\n * @return {number[]}\n */\nfunction mergeKLists(lists) {\n    // Merge k sorted streams into one sorted stream\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "expected": "[1,1,2,3,4,4,5,6]"
      },
      {
        "id": 2,
        "input": "lists = []",
        "expected": "[]"
      }
    ],
    "submissions": [],
    "functionName": "mergeKLists"
  },
  {
    "id": "ARISE-P304",
    "title": "Minimum Bounded Signal Substring Window",
    "slug": "minimum-bounded-signal-substring-window",
    "topic": "Strings",
    "tags": [
      "Sliding Window",
      "Hash Map",
      "Strings"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "33.7%",
    "verifiedXp": 150,
    "description": "Given two strings `signalStr` and `targetPattern` of lengths `m` and `n` respectively, return the **minimum window substring** of `signalStr` such that every character in `targetPattern` (including duplicates) is included in the window.\n\nIf there is no such substring, return the empty string `\"\"`. The testcases will be generated such that the answer is unique.",
    "examples": [
      {
        "input": "signalStr = \"ADOBECODEBANC\", targetPattern = \"ABC\"",
        "output": "\"BANC\"",
        "explanation": "\"BANC\" contains 'A', 'B', and 'C' with minimum length 4."
      },
      {
        "input": "signalStr = \"a\", targetPattern = \"a\"",
        "output": "\"a\"",
        "explanation": "Identical single char."
      },
      {
        "input": "signalStr = \"a\", targetPattern = \"aa\"",
        "output": "\"\"",
        "explanation": "Both 'a's from target must be present."
      }
    ],
    "constraints": [
      "m == signalStr.length",
      "n == targetPattern.length",
      "1 <= m, n <= 10^5",
      "signalStr and targetPattern consist of uppercase and lowercase English letters.",
      "Expected Time Complexity: O(M + N)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Use a frequency map of characters required from targetPattern and count how many required character constraints are currently fulfilled.",
      "Hint 2 (Approach): Expand `right` until all character requirements are met. Then contract `left` to minimize the window while keeping the requirements satisfied.",
      "Hint 3 (Near-Solution): Maintain `formed` count equal to number of unique characters whose frequency criteria is matched. Update `minLen = right - left + 1` whenever `formed == required`."
    ],
    "solution": {
      "approachName": "Sliding Window with Constraint Count Balancing",
      "explanation": "By expanding the right pointer until all required character counts are met, and then contracting the left pointer until minimal, each character is processed at most twice in O(M + N) time.",
      "stepByStep": [
        "1. Build frequency map `targetCount` for `targetPattern`.",
        "2. Let `required = targetCount.size()`, `formed = 0`, `left = 0`, `minLen = INF`, `startIdx = 0`.",
        "3. Loop `right` from 0 to M-1:",
        "   Add `signalStr[right]` to `windowCount`. If count matches `targetCount`, `formed++`.",
        "   While `formed == required`:",
        "     Update `minLen` if `right - left + 1 < minLen`.",
        "     Remove `signalStr[left]` from `windowCount`. If count falls below required, `formed--`.",
        "     `left++`.",
        "4. Return minimum substring."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    std::string minWindow(const std::string& s, const std::string& t) {\n        if (s.empty() || t.empty()) return \"\";\n        std::unordered_map<char, int> targetMap;\n        for (char c : t) targetMap[c]++;\n        \n        int required = targetMap.size();\n        int left = 0, formed = 0;\n        std::unordered_map<char, int> windowMap;\n        int minLen = INT_MAX, startIdx = 0;\n        \n        for (int right = 0; right < (int)s.size(); ++right) {\n            char c = s[right];\n            windowMap[c]++;\n            if (targetMap.count(c) && windowMap[c] == targetMap[c]) formed++;\n            \n            while (left <= right && formed == required) {\n                if (right - left + 1 < minLen) {\n                    minLen = right - left + 1;\n                    startIdx = left;\n                }\n                char leftChar = s[left];\n                windowMap[leftChar]--;\n                if (targetMap.count(leftChar) && windowMap[leftChar] < targetMap[leftChar]) formed--;\n                left++;\n            }\n        }\n        return minLen == INT_MAX ? \"\" : s.substr(startIdx, minLen);\n    }\n};",
        "python": "from collections import Counter\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not s or not t: return \"\"\n        t_count = Counter(t)\n        required = len(t_count)\n        window = {}\n        formed = 0\n        l = 0\n        min_len = float('inf')\n        ans = (0, 0)\n        \n        for r, ch in enumerate(s):\n            window[ch] = window.get(ch, 0) + 1\n            if ch in t_count and window[ch] == t_count[ch]:\n                formed += 1\n            while l <= r and formed == required:\n                if r - l + 1 < min_len:\n                    min_len = r - l + 1\n                    ans = (l, r)\n                left_ch = s[l]\n                window[left_ch] -= 1\n                if left_ch in t_count and window[left_ch] < t_count[left_ch]:\n                    formed -= 1\n                l += 1\n        return \"\" if min_len == float('inf') else s[ans[0]:ans[1]+1]",
        "java": "import java.util.*;\n\nclass Solution {\n    public String minWindow(String s, String t) {\n        if (s.length() == 0 || t.length() == 0) return \"\";\n        Map<Character, Integer> target = new HashMap<>();\n        for (char c : t.toCharArray()) target.put(c, target.getOrDefault(c, 0) + 1);\n        int required = target.size();\n        int l = 0, formed = 0;\n        Map<Character, Integer> window = new HashMap<>();\n        int minLen = Integer.MAX_VALUE, start = 0;\n        for (int r = 0; r < s.length(); r++) {\n            char c = s.charAt(r);\n            window.put(c, window.getOrDefault(c, 0) + 1);\n            if (target.containsKey(c) && window.get(c).intValue() == target.get(c).intValue()) formed++;\n            while (l <= r && formed == required) {\n                if (r - l + 1 < minLen) {\n                    minLen = r - l + 1;\n                    start = l;\n                }\n                char leftCh = s.charAt(l);\n                window.put(leftCh, window.get(leftCh) - 1);\n                if (target.containsKey(leftCh) && window.get(leftCh) < target.get(leftCh)) formed--;\n                l++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? \"\" : s.substring(start, start + minLen);\n    }\n}",
        "javascript": "function minWindow(signalStr, targetPattern) {\n    if (!targetPattern || !signalStr) return \"\";\n    const need = {}, window = {};\n    for (const ch of targetPattern) need[ch] = (need[ch] || 0) + 1;\n    let have = 0, required = Object.keys(need).length;\n    let res = [-1, -1], resLen = Infinity, l = 0;\n    for (let r = 0; r < signalStr.length; r++) {\n        const c = signalStr[r];\n        window[c] = (window[c] || 0) + 1;\n        if (need[c] && window[c] === need[c]) have++;\n        while (have === required) {\n            if (r - l + 1 < resLen) {\n                res = [l, r];\n                resLen = r - l + 1;\n            }\n            window[signalStr[l]]--;\n            if (need[signalStr[l]] && window[signalStr[l]] < need[signalStr[l]]) have--;\n            l++;\n        }\n    }\n    return resLen === Infinity ? \"\" : signalStr.slice(res[0], res[1] + 1);\n}"
      },
      "complexity": {
        "time": "O(M + N) — Each character visited at most twice.",
        "space": "O(M + N) — Storage for frequency hash maps."
      },
      "alternatives": "Brute force examining all O(M^2) substrings takes O(M^2 * N) time."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::string minWindow(const std::string& signalStr, const std::string& targetPattern) {\n        // Implement O(M + N) sliding window\n        \n    }\n};",
      "python": "class Solution:\n    def minWindow(self, signalStr: str, targetPattern: str) -> str:\n        # Implement O(M + N) sliding window\n        pass",
      "java": "class Solution {\n    public String minWindow(String signalStr, String targetPattern) {\n        // Implement O(M + N) sliding window\n        return \"\";\n    }\n}",
      "javascript": "/**\n * @param {string} signalStr\n * @param {string} targetPattern\n * @return {string}\n */\nfunction minWindow(signalStr, targetPattern) {\n    // Sliding window minimum substring\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "signalStr = \"ADOBECODEBANC\", targetPattern = \"ABC\"",
        "expected": "\"BANC\""
      },
      {
        "id": 2,
        "input": "signalStr = \"a\", targetPattern = \"a\"",
        "expected": "\"a\""
      }
    ],
    "submissions": [],
    "functionName": "minWindow"
  },
  {
    "id": "ARISE-P305",
    "title": "Sliding Maximum Telemetry Window Monitor",
    "slug": "sliding-maximum-telemetry-window-monitor",
    "topic": "Queues",
    "tags": [
      "Monotonic Deque",
      "Sliding Window"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "35.8%",
    "verifiedXp": 140,
    "description": "You are given an array of telemetry sensor readings `sensorStream`, and a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the **max sliding window** for every window position.",
    "examples": [
      {
        "input": "sensorStream = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "output": "[3, 3, 5, 5, 6, 7]",
        "explanation": "Window maxes: [1,3,-1]->3, [3,-1,-3]->3, [-1,-3,5]->5, [-3,5,3]->5, [5,3,6]->6, [3,6,7]->7."
      },
      {
        "input": "sensorStream = [1], k = 1",
        "output": "[1]",
        "explanation": "Single element window."
      }
    ],
    "constraints": [
      "1 <= sensorStream.length <= 10^5",
      "-10^4 <= sensorStream[i] <= 10^4",
      "1 <= k <= sensorStream.length",
      "Expected Time Complexity: O(N)"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Can we maintain candidate maximums in a double-ended queue (deque) in monotonically decreasing order?",
      "Hint 2 (Approach): When pushing a new element at index i, pop all elements from the back of the deque that are strictly smaller than `sensorStream[i]`, because they can never be the maximum again.",
      "Hint 3 (Near-Solution): Pop indices from the front of the deque if they fall outside the current window (`front <= i - k`). The maximum for the current window is always at the front of the deque."
    ],
    "solution": {
      "approachName": "Monotonic Decreasing Deque Window Scan",
      "explanation": "A monotonic deque stores indices whose values are strictly decreasing. Every element is pushed and popped at most once, yielding optimal O(N) total time.",
      "stepByStep": [
        "1. Initialize double-ended queue `dq` storing array indices.",
        "2. For each index `i` from 0 to N-1:",
        "   a. Remove indices from front if `dq.front() <= i - k`.",
        "   b. While `!dq.empty()` and `nums[dq.back()] <= nums[i]`, pop back.",
        "   c. Push `i` to back of `dq`.",
        "   d. If `i >= k - 1`, append `nums[dq.front()]` to results.",
        "3. Return results."
      ],
      "code": {
        "cpp": "class Solution {\npublic:\n    std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {\n        std::deque<int> dq;\n        std::vector<int> res;\n        for (int i = 0; i < (int)nums.size(); ++i) {\n            if (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n            dq.push_back(i);\n            if (i >= k - 1) res.push_back(nums[dq.front()]);\n        }\n        return res;\n    }\n};",
        "python": "from collections import deque\n\nclass Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        dq = deque()\n        res = []\n        for i, val in enumerate(nums):\n            if dq and dq[0] <= i - k:\n                dq.popleft()\n            while dq and nums[dq[-1]] <= val:\n                dq.pop()\n            dq.append(i)\n            if i >= k - 1:\n                res.append(nums[dq[0]])\n        return res",
        "java": "import java.util.*;\n\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        Deque<Integer> dq = new ArrayDeque<>();\n        int[] res = new int[nums.length - k + 1];\n        int idx = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();\n            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();\n            dq.offerLast(i);\n            if (i >= k - 1) res[idx++] = nums[dq.peekFirst()];\n        }\n        return res;\n    }\n}",
        "javascript": "function maxSlidingWindow(sensorStream, k) {\n    const res = [], deque = [];\n    for (let i = 0; i < sensorStream.length; i++) {\n        while (deque.length && deque[0] < i - k + 1) deque.shift();\n        while (deque.length && sensorStream[deque[deque.length - 1]] < sensorStream[i]) deque.pop();\n        deque.push(i);\n        if (i >= k - 1) res.push(sensorStream[deque[0]]);\n    }\n    return res;\n}"
      },
      "complexity": {
        "time": "O(N) — Every element enters and leaves the deque at most once.",
        "space": "O(K) — Maximum elements in deque bounded by window size K."
      },
      "alternatives": "A max-heap takes O(N log K) time and requires lazy removal."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::vector<int> maxSlidingWindow(const std::vector<int>& sensorStream, int k) {\n        // Implement O(N) monotonic deque\n        \n    }\n};",
      "python": "class Solution:\n    def maxSlidingWindow(self, sensorStream: list[int], k: int) -> list[int]:\n        # Implement O(N) monotonic deque\n        pass",
      "java": "class Solution {\n    public int[] maxSlidingWindow(int[] sensorStream, int k) {\n        // Implement O(N) monotonic deque\n        return new int[0];\n    }\n}",
      "javascript": "/**\n * @param {number[]} sensorStream\n * @param {number} k\n * @return {number[]}\n */\nfunction maxSlidingWindow(sensorStream, k) {\n    // Monotonic deque sliding window maximum\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "sensorStream = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "expected": "[3, 3, 5, 5, 6, 7]"
      },
      {
        "id": 2,
        "input": "sensorStream = [1], k = 1",
        "expected": "[1]"
      }
    ],
    "submissions": [],
    "functionName": "maxSlidingWindow"
  },
  {
    "id": "ARISE-P306",
    "title": "Conflict-Free Microservice Task Placement",
    "slug": "conflict-free-microservice-task-placement",
    "topic": "Backtracking",
    "tags": [
      "Backtracking",
      "Recursion",
      "Pruning"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "29.5%",
    "verifiedXp": 160,
    "description": "The **n-microservices puzzle** is the problem of placing `n` autonomous daemon instances on an `n x n` compute grid such that no two daemons interfere with each other.\n\nTwo daemons interfere if they share the same horizontal server row, vertical server rack column, or diagonal optical bus.\n\nGiven an integer `n`, return **all distinct placement solutions** to the n-microservices puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the placement, where `'Q'` and `'.'` both indicate a daemon and an empty slot, respectively.",
    "examples": [
      {
        "input": "n = 4",
        "output": "[\n [\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\n [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]\n]",
        "explanation": "Two distinct 4-daemon non-interfering arrangements exist."
      },
      {
        "input": "n = 1",
        "output": "[[\"Q\"]]",
        "explanation": "Single trivial solution."
      }
    ],
    "constraints": [
      "1 <= n <= 9",
      "Expected Time Complexity: O(N!) with state-space pruning"
    ],
    "hints": [
      "Hint 1 (Gentle Nudge): Exactly one daemon must be placed on each row. Therefore, we can recurse row by row from row 0 to n-1.",
      "Hint 2 (Approach): To check column and diagonal safety in O(1), use boolean sets: `cols`, `diag1 (row - col)`, and `diag2 (row + col)`.",
      "Hint 3 (Near-Solution): For row r, try every column c. If c, r-c, r+c are free, mark them, recurse on row r+1, and backtrack by unmarking."
    ],
    "solution": {
      "approachName": "Backtracking with Direct Set-Based Diagonal Pruning",
      "explanation": "We place one daemon per row. For each column, we test compatibility using hash sets for columns and diagonals in O(1) time.",
      "stepByStep": [
        "1. Create `cols`, `posDiag (r + c)`, and `negDiag (r - c)` sets.",
        "2. Recursive function `backtrack(r, currentBoard)`:",
        "   If `r == n`, save `currentBoard` and return.",
        "   For `c` from 0 to n-1:",
        "     If `c`, `r+c`, or `r-c` in sets, continue.",
        "     Add to sets, place 'Q', call `backtrack(r + 1)`.",
        "     Backtrack by removing from sets and clearing 'Q'.",
        "3. Return all solutions."
      ],
      "code": {
        "cpp": "class Solution {\n    std::vector<std::vector<std::string>> res;\n    std::unordered_set<int> cols, diag1, diag2;\n    \n    void solve(int r, int n, std::vector<std::string>& board) {\n        if (r == n) {\n            res.push_back(board);\n            return;\n        }\n        for (int c = 0; c < n; ++c) {\n            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;\n            cols.insert(c); diag1.insert(r - c); diag2.insert(r + c);\n            board[r][c] = 'Q';\n            solve(r + 1, n, board);\n            board[r][c] = '.';\n            cols.erase(c); diag1.erase(r - c); diag2.erase(r + c);\n        }\n    }\npublic:\n    std::vector<std::vector<std::string>> solveNQueens(int n) {\n        std::vector<std::string> board(n, std::string(n, '.'));\n        solve(0, n, board);\n        return res;\n    }\n};",
        "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        res = []\n        cols = set()\n        pos_diag = set()\n        neg_diag = set()\n        board = [[\".\"] * n for _ in range(n)]\n        \n        def backtrack(r):\n            if r == n:\n                res.append([\"\".join(row) for row in board])\n                return\n            for c in range(n):\n                if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:\n                    continue\n                cols.add(c)\n                pos_diag.add(r + c)\n                neg_diag.add(r - c)\n                board[r][c] = 'Q'\n                backtrack(r + 1)\n                board[r][c] = '.'\n                cols.remove(c)\n                pos_diag.remove(r + c)\n                neg_diag.remove(r - c)\n        \n        backtrack(0)\n        return res",
        "java": "import java.util.*;\n\nclass Solution {\n    private List<List<String>> res = new ArrayList<>();\n    private Set<Integer> cols = new HashSet<>();\n    private Set<Integer> diag1 = new HashSet<>();\n    private Set<Integer> diag2 = new HashSet<>();\n\n    private void solve(int r, int n, char[][] board) {\n        if (r == n) {\n            List<String> list = new ArrayList<>();\n            for (char[] row : board) list.add(new String(row));\n            res.add(list);\n            return;\n        }\n        for (int c = 0; c < n; c++) {\n            if (cols.contains(c) || diag1.contains(r - c) || diag2.contains(r + c)) continue;\n            cols.add(c); diag1.add(r - c); diag2.add(r + c);\n            board[r][c] = 'Q';\n            solve(r + 1, n, board);\n            board[r][c] = '.';\n            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c);\n        }\n    }\n\n    public List<List<String>> solveNQueens(int n) {\n        char[][] board = new char[n][n];\n        for (char[] row : board) Arrays.fill(row, '.');\n        solve(0, n, board);\n        return res;\n    }\n}",
        "javascript": "function solveNQueens(n) {\n    const res = [];\n    const cols = new Set(), posDiag = new Set(), negDiag = new Set();\n    const board = Array.from({ length: n }, () => new Array(n).fill('.'));\n    function backtrack(r) {\n        if (r === n) {\n            res.push(board.map(row => row.join('')));\n            return;\n        }\n        for (let c = 0; c < n; c++) {\n            if (cols.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) continue;\n            cols.add(c); posDiag.add(r + c); negDiag.add(r - c);\n            board[r][c] = 'Q';\n            backtrack(r + 1);\n            cols.delete(c); posDiag.delete(r + c); negDiag.delete(r - c);\n            board[r][c] = '.';\n        }\n    }\n    backtrack(0);\n    return res;\n}"
      },
      "complexity": {
        "time": "O(N!) — Constrained permutations pruned aggressively.",
        "space": "O(N) — Recursion stack and board representation."
      },
      "alternatives": "Bitmasking can replace hash sets with 3 integer bitmasks for faster constant factors."
    },
    "starterCode": {
      "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> solveNQueens(int n) {\n        // Implement O(N!) backtracking with diagonal sets\n        \n    }\n};",
      "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        # Implement O(N!) backtracking with diagonal sets\n        pass",
      "java": "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        // Implement O(N!) backtracking with diagonal sets\n        return new ArrayList<>();\n    }\n}",
      "javascript": "/**\n * @param {number} n\n * @return {string[][]}\n */\nfunction solveNQueens(n) {\n    // Backtracking non-conflicting placements\n    \n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "n = 4",
        "expected": "[\n [\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\n [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]\n]"
      },
      {
        "id": 2,
        "input": "n = 1",
        "expected": "[[\"Q\"]]"
      }
    ],
    "submissions": [],
    "functionName": "solveNQueens"
  }
],

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

/* ==========================================================================
   DYNAMIC TOPIC PROGRESS HELPERS
   ========================================================================== */
function getTopicSolvedCount(topic) {
  if (!topic) return 0;
  if (typeof topic.userSolved === 'number') {
    return topic.userSolved;
  }
  if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.problems)) {
    const topicNameLower = (topic.name || '').trim().toLowerCase();
    const topicIdLower = (topic.id || '').trim().toLowerCase();
    const count = ARISE_DATA.problems.filter(p => {
      const pTopic = (p.topic || '').trim().toLowerCase();
      return (pTopic === topicNameLower || pTopic === topicIdLower || (topicIdLower.length > 2 && pTopic.includes(topicIdLower))) && p.status === 'Solved';
    }).length;
    return count;
  }
  return topic.solved || 0;
}

function updateTopicOnSolved(problem) {
  if (!problem || !problem.topic || typeof ARISE_DATA === 'undefined' || !Array.isArray(ARISE_DATA.topics)) return null;
  const pTopicLower = problem.topic.trim().toLowerCase();
  const topicObj = ARISE_DATA.topics.find(t => {
    const tName = (t.name || '').trim().toLowerCase();
    const tId = (t.id || '').trim().toLowerCase();
    return tName === pTopicLower || tId === pTopicLower || (tId.length > 2 && pTopicLower.includes(tId)) || (tName.includes(pTopicLower));
  });
  if (topicObj) {
    const current = getTopicSolvedCount(topicObj);
    topicObj.userSolved = current + 1;
    topicObj.solved = topicObj.userSolved;
    return topicObj;
  }
  return null;
}

function resetAllTopicSolves() {
  if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.topics)) {
    ARISE_DATA.topics.forEach(t => {
      t.userSolved = 0;
      t.solved = 0;
    });
  }
  if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.problems)) {
    ARISE_DATA.problems.forEach(p => {
      p.status = 'Unsolved';
    });
  }
}

if (typeof window !== 'undefined') {
  window.getTopicSolvedCount = getTopicSolvedCount;
  window.updateTopicOnSolved = updateTopicOnSolved;
  window.resetAllTopicSolves = resetAllTopicSolves;
}
if (typeof globalThis !== 'undefined') {
  globalThis.getTopicSolvedCount = getTopicSolvedCount;
  globalThis.updateTopicOnSolved = updateTopicOnSolved;
  globalThis.resetAllTopicSolves = resetAllTopicSolves;
}
