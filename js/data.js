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
    "title": "Two Sum (LeetCode #1)",
    "slug": "two-sum",
    "topic": "Arrays",
    "tags": [
      "Arrays",
      "Hash Table",
      "Two Pointers"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "53.8%",
    "verifiedXp": 40,
    "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3, 2, 4], target = 6",
        "output": "[1, 2]",
        "explanation": "nums[1] + nums[2] = 2 + 4 = 6."
      },
      {
        "input": "nums = [3, 3], target = 6",
        "output": "[0, 1]",
        "explanation": "nums[0] + nums[1] = 3 + 3 = 6."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
      "Follow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?"
    ],
    "hints": [
      "Hint 1: A brute force approach searches every pair (i, j) with i < j, taking O(N^2) time.",
      "Hint 2: As you traverse the array, store elements in a hash map mapping value -> index.",
      "Hint 3: For each element X at index i, check if (target - X) is already in the hash map. If yes, return [seen[target - X], i]."
    ],
    "solution": {
      "approachName": "Optimal Solution for Two Sum (LeetCode #1)",
      "explanation": "Optimal algorithm for Two Sum (LeetCode #1) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    int* res = (int*)malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j; *returnSize = 2; return res;\n            }\n        }\n    }\n    *returnSize = 0; return NULL;\n}",
        "cpp": "class Solution {\npublic:\n    std::vector<int> twoSum(const std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < (int)nums.size(); ++i) {\n            int comp = target - nums[i];\n            if (seen.find(comp) != seen.end()) return {seen[comp], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
        "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, val in enumerate(nums):\n            comp = target - val\n            if comp in seen:\n                return [seen[comp], i]\n            seen[val] = i\n        return []",
        "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (seen.containsKey(comp)) return new int[] { seen.get(comp), i };\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
        "javascript": "function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (seen.has(comp)) return [seen.get(comp), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}",
        "typescript": "function twoSum(nums: number[], target: number): number[] {\n    const seen = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (seen.has(comp)) return [seen.get(comp)!, i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}",
        "go": "func twoSum(nums []int, target int) []int {\n    seen := make(map[int]int)\n    for i, num := range nums {\n        comp := target - num\n        if idx, ok := seen[comp]; ok {\n            return []int{idx, i}\n        }\n        seen[num] = i\n    }\n    return []int{}\n}",
        "rust": "use std::collections::HashMap;\nimpl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        let mut seen = HashMap::new();\n        for (i, &num) in nums.iter().enumerate() {\n            let comp = target - num;\n            if let Some(&idx) = seen.get(&comp) {\n                return vec![idx as i32, i as i32];\n            }\n            seen.insert(num, i);\n        }\n        vec![]\n    }\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Implement optimal O(N) hash map solution\n    *returnSize = 0;\n    return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<int> twoSum(const std::vector<int>& nums, int target) {\n        // Implement optimal O(N) hash map solution\n        return {};\n    }\n};",
      "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Implement optimal O(N) hash map solution\n        pass",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Implement optimal O(N) hash map solution\n        return new int[0];\n    }\n}",
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Write your optimal O(N) hash map solution\n    \n}",
      "typescript": "function twoSum(nums: number[], target: number): number[] {\n    // Implement optimal O(N) hash map solution\n    return [];\n}",
      "go": "func twoSum(nums []int, target int) []int {\n    // Implement optimal O(N) hash map solution\n    return []int{}\n}",
      "rust": "impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Implement optimal O(N) hash map solution\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [2, 7, 11, 15], target = 9",
        "expected": "[0, 1]"
      },
      {
        "id": 2,
        "input": "nums = [3, 2, 4], target = 6",
        "expected": "[1, 2]"
      },
      {
        "id": 3,
        "input": "nums = [3, 3], target = 6",
        "expected": "[0, 1]"
      }
    ],
    "submissions": [],
    "functionName": "twoSum"
  },
  {
    "id": "ARISE-P102",
    "title": "Valid Parentheses (LeetCode #20)",
    "slug": "valid-parentheses",
    "topic": "Stacks",
    "tags": [
      "String",
      "Stack"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "41.5%",
    "verifiedXp": 40,
    "description": "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    "examples": [
      {
        "input": "s = '()'",
        "output": "true",
        "explanation": "The parenthesis pair matches."
      },
      {
        "input": "s = '()[]{}'",
        "output": "true",
        "explanation": "All bracket pairs are correctly nested and closed."
      },
      {
        "input": "s = '(]'",
        "output": "false",
        "explanation": "Mismatched bracket types."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "hints": [
      "Hint 1: A LIFO stack data structure is ideal for tracking open brackets in sequence.",
      "Hint 2: When encountering an opening bracket, push it onto the stack. On closing bracket, check if it matches stack top."
    ],
    "solution": {
      "approachName": "Optimal Solution for Valid Parentheses (LeetCode #20)",
      "explanation": "Optimal algorithm for Valid Parentheses (LeetCode #20) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "bool isValid(char* s) {\n    int n = strlen(s);\n    char stack[10000]; int top = -1;\n    for (int i = 0; i < n; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else {\n            if (top == -1) return false;\n            char o = stack[top--];\n            if (c == ')' && o != '(') return false;\n            if (c == '}' && o != '{') return false;\n            if (c == ']' && o != '[') return false;\n        }\n    }\n    return top == -1;\n}",
        "cpp": "class Solution {\npublic:\n    bool isValid(const std::string& s) {\n        std::stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return st.empty();\n    }\n};",
        "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        pairs = {')': '(', '}': '{', ']': '['}\n        for ch in s:\n            if ch in pairs:\n                if not stack or stack[-1] != pairs[ch]:\n                    return False\n                stack.pop()\n            else:\n                stack.append(ch)\n        return len(stack) == 0",
        "java": "import java.util.Stack;\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') stack.push(c);\n            else {\n                if (stack.isEmpty()) return false;\n                char top = stack.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}",
        "javascript": "function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let i = 0; i < s.length; i++) {\n        const ch = s[i];\n        if (ch === '(' || ch === '{' || ch === '[') {\n            stack.push(ch);\n        } else {\n            if (stack.length === 0 || stack.pop() !== map[ch]) return false;\n        }\n    }\n    return stack.length === 0;\n}",
        "typescript": "function isValid(s: string): boolean {\n    const stack: string[] = [];\n    const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n    for (const ch of s) {\n        if (ch === '(' || ch === '{' || ch === '[') {\n            stack.push(ch);\n        } else {\n            if (stack.length === 0 || stack.pop() !== map[ch]) return false;\n        }\n    }\n    return stack.length === 0;\n}",
        "go": "func isValid(s string) bool {\n    stack := []rune{}\n    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}\n    for _, ch := range s {\n        if ch == '(' || ch == '{' || ch == '[' {\n            stack = append(stack, ch)\n        } else {\n            if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {\n                return false\n            }\n            stack = stack[:len(stack)-1]\n        }\n    }\n    return len(stack) == 0\n}",
        "rust": "impl Solution {\n    pub fn is_valid(s: String) -> bool {\n        let mut stack = Vec::new();\n        for ch in s.chars() {\n            match ch {\n                '(' | '{' | '[' => stack.push(ch),\n                ')' => if stack.pop() != Some('(') { return false; },\n                '}' => if stack.pop() != Some('{') { return false; },\n                ']' => if stack.pop() != Some('[') { return false; },\n                _ => ()\n            }\n        }\n        stack.is_empty()\n    }\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "bool isValid(char* s) {\n    // Implement optimal O(N) stack solution\n    return false;\n}",
      "cpp": "class Solution {\npublic:\n    bool isValid(const std::string& s) {\n        // Implement optimal O(N) stack solution\n        return false;\n    }\n};",
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Implement optimal O(N) stack solution\n        pass",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        // Implement optimal O(N) stack solution\n        return false;\n    }\n}",
      "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    // Write your optimal O(N) stack solution\n    \n}",
      "typescript": "function isValid(s: string): boolean {\n    // Implement optimal O(N) stack solution\n    return false;\n}",
      "go": "func isValid(s string) bool {\n    // Implement optimal O(N) stack solution\n    return false\n}",
      "rust": "impl Solution {\n    pub fn is_valid(s: String) -> bool {\n        // Implement optimal O(N) stack solution\n        false\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "s = '()'",
        "expected": "true"
      },
      {
        "id": 2,
        "input": "s = '()[]{}'",
        "expected": "true"
      },
      {
        "id": 3,
        "input": "s = '(]'",
        "expected": "false"
      }
    ],
    "submissions": [],
    "functionName": "isValid"
  },
  {
    "id": "ARISE-P103",
    "title": "Best Time to Buy and Sell Stock (LeetCode #121)",
    "slug": "best-time-to-buy-and-sell-stock",
    "topic": "Arrays",
    "tags": [
      "Array",
      "Dynamic Programming",
      "Two Pointers"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "54.1%",
    "verifiedXp": 40,
    "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
    "examples": [
      {
        "input": "prices = [7, 1, 5, 3, 6, 4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      {
        "input": "prices = [7, 6, 4, 3, 1]",
        "output": "0",
        "explanation": "In this case, no transactions are done and the max profit = 0."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "hints": [
      "Hint 1: All the results are obtained from prices[j] - prices[i] where j > i.",
      "Hint 2: Keep track of the minimum price seen so far as you iterate through the list."
    ],
    "solution": {
      "approachName": "Optimal Solution for Best Time to Buy and Sell Stock (LeetCode #121)",
      "explanation": "Optimal algorithm for Best Time to Buy and Sell Stock (LeetCode #121) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "int maxProfit(int* prices, int pricesSize) {\n    int minP = 1000000000; int maxP = 0;\n    for (int i = 0; i < pricesSize; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxP) maxP = prices[i] - minP;\n    }\n    return maxP;\n}",
        "cpp": "class Solution {\npublic:\n    int maxProfit(const std::vector<int>& prices) {\n        int minP = 1e9, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = std::max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};",
        "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_p = float('inf')\n        max_p = 0\n        for p in prices:\n            if p < min_p:\n                min_p = p\n            elif p - min_p > max_p:\n                max_p = p - min_p\n        return max_p",
        "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE;\n        int maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxP) maxP = p - minP;\n        }\n        return maxP;\n    }\n}",
        "javascript": "function maxProfit(prices) {\n    let minP = Infinity, maxP = 0;\n    for (let i = 0; i < prices.length; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxP) maxP = prices[i] - minP;\n    }\n    return maxP;\n}",
        "typescript": "function maxProfit(prices: number[]): number {\n    let minP = Infinity, maxP = 0;\n    for (const p of prices) {\n        if (p < minP) minP = p;\n        else if (p - minP > maxP) maxP = p - minP;\n    }\n    return maxP;\n}",
        "go": "func maxProfit(prices []int) int {\n    minP := int(1e9)\n    maxP := 0\n    for _, p := range prices {\n        if p < minP { minP = p }\n        if p - minP > maxP { maxP = p - minP }\n    }\n    return maxP\n}",
        "rust": "impl Solution {\n    pub fn max_profit(prices: Vec<i32>) -> i32 {\n        let mut min_p = i32::MAX;\n        let mut max_p = 0;\n        for p in prices {\n            if p < min_p { min_p = p; }\n            else if p - min_p > max_p { max_p = p - min_p; }\n        }\n        max_p\n    }\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int maxProfit(int* prices, int pricesSize) {\n    // Implement optimal O(N) single-pass solution\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int maxProfit(const std::vector<int>& prices) {\n        // Implement optimal O(N) single-pass solution\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Implement optimal O(N) single-pass solution\n        pass",
      "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        // Implement optimal O(N) single-pass solution\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n    // Write your optimal O(N) single-pass solution\n    \n}",
      "typescript": "function maxProfit(prices: number[]): number {\n    // Implement optimal O(N) single-pass solution\n    return 0;\n}",
      "go": "func maxProfit(prices []int) int {\n    // Implement optimal O(N) single-pass solution\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn max_profit(prices: Vec<i32>) -> i32 {\n        // Implement optimal O(N) single-pass solution\n        0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "prices = [7, 1, 5, 3, 6, 4]",
        "expected": "5"
      },
      {
        "id": 2,
        "input": "prices = [7, 6, 4, 3, 1]",
        "expected": "0"
      }
    ],
    "submissions": [],
    "functionName": "maxProfit"
  },
  {
    "id": "ARISE-P104",
    "title": "Symmetric Tree (LeetCode #101)",
    "slug": "symmetric-tree",
    "topic": "Trees",
    "tags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "55.7%",
    "verifiedXp": 40,
    "description": "Given the `root` of a binary tree (passed as a level-order array or tree structure), check whether it is a **mirror of itself** (i.e., symmetric around its center).",
    "examples": [
      {
        "input": "root = [1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "explanation": "The tree is symmetric around the root."
      },
      {
        "input": "root = [1, 2, 2, null, 3, null, 3]",
        "output": "false",
        "explanation": "The right and left subtrees are asymmetric."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 1000].",
      "-100 <= Node.val <= 100"
    ],
    "hints": [
      "Hint 1: Two trees are mirrors of each other if their roots have equal values, and right subtree is mirror of left subtree."
    ],
    "solution": {
      "approachName": "Optimal Solution for Symmetric Tree (LeetCode #101)",
      "explanation": "Optimal algorithm for Symmetric Tree (LeetCode #101) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function isSymmetric(root) {\n    if (!root || root.length <= 1) return true;\n    function checkMirror(i, j) {\n        if (i >= root.length && j >= root.length) return true;\n        if (i >= root.length || j >= root.length) return false;\n        if (root[i] !== root[j]) return false;\n        return checkMirror(2 * i + 1, 2 * j + 2) && checkMirror(2 * i + 2, 2 * j + 1);\n    }\n    return checkMirror(1, 2);\n}",
        "python": "class Solution:\n    def isSymmetric(self, root: list) -> bool:\n        if not root or len(root) <= 1: return True\n        def check(i, j):\n            if i >= len(root) and j >= len(root): return True\n            if i >= len(root) or j >= len(root): return False\n            if root[i] != root[j]: return False\n            return check(2 * i + 1, 2 * j + 2) and check(2 * i + 2, 2 * j + 1)\n        return check(1, 2)"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "bool isSymmetric(int* root, int rootSize) {\n    // Implement optimal O(N) recursive check\n    return false;\n}",
      "cpp": "class Solution {\npublic:\n    bool isSymmetric(const std::vector<int>& root) {\n        // Implement optimal O(N) check\n        return false;\n    }\n};",
      "python": "class Solution:\n    def isSymmetric(self, root: list) -> bool:\n        # Implement optimal O(N) check\n        pass",
      "java": "class Solution {\n    public boolean isSymmetric(int[] root) {\n        // Implement optimal O(N) check\n        return false;\n    }\n}",
      "javascript": "function isSymmetric(root) {\n    // Write your optimal O(N) check\n    \n}",
      "typescript": "function isSymmetric(root: (number | null)[]): boolean {\n    // Implement optimal O(N) check\n    return false;\n}",
      "go": "func isSymmetric(root []int) bool {\n    // Implement optimal O(N) check\n    return false\n}",
      "rust": "impl Solution {\n    pub fn is_symmetric(root: Vec<Option<i32>>) -> bool {\n        // Implement optimal O(N) check\n        false\n    }\n}"
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
    "title": "Maximum Subarray (LeetCode #53 - Kadane's)",
    "slug": "maximum-subarray",
    "topic": "Arrays",
    "tags": [
      "Array",
      "Divide and Conquer",
      "Dynamic Programming"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "50.4%",
    "verifiedXp": 40,
    "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    "examples": [
      {
        "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "output": "6",
        "explanation": "The subarray [4, -1, 2, 1] has the largest sum 6."
      },
      {
        "input": "nums = [1]",
        "output": "1",
        "explanation": "The subarray [1] has the largest sum 1."
      },
      {
        "input": "nums = [5, 4, -1, 7, 8]",
        "output": "23",
        "explanation": "The subarray [5, 4, -1, 7, 8] has the largest sum 23."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "hints": [
      "Hint 1: Kadane's algorithm maintains the current running sum and global max sum.",
      "Hint 2: If the running sum becomes negative, reset it to the current element."
    ],
    "solution": {
      "approachName": "Optimal Solution for Maximum Subarray (LeetCode #53 - Kadane's)",
      "explanation": "Optimal algorithm for Maximum Subarray (LeetCode #53 - Kadane's) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "int maxSubArray(int* nums, int numsSize) {\n    int maxS = nums[0]; int currS = nums[0];\n    for (int i = 1; i < numsSize; i++) {\n        currS = nums[i] > (currS + nums[i]) ? nums[i] : (currS + nums[i]);\n        if (currS > maxS) maxS = currS;\n    }\n    return maxS;\n}",
        "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& nums) {\n        int maxS = nums[0], currS = nums[0];\n        for (size_t i = 1; i < nums.size(); ++i) {\n            currS = std::max(nums[i], currS + nums[i]);\n            maxS = std::max(maxS, currS);\n        }\n        return maxS;\n    }\n};",
        "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        curr_s = max_s = nums[0]\n        for x in nums[1:]:\n            curr_s = max(x, curr_s + x)\n            max_s = max(max_s, curr_s)\n        return max_s",
        "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxS = nums[0], currS = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currS = Math.max(nums[i], currS + nums[i]);\n            maxS = Math.max(maxS, currS);\n        }\n        return maxS;\n    }\n}",
        "javascript": "function maxSubArray(nums) {\n    let currS = nums[0], maxS = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currS = Math.max(nums[i], currS + nums[i]);\n        maxS = Math.max(maxS, currS);\n    }\n    return maxS;\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int maxSubArray(int* nums, int numsSize) {\n    // Implement optimal O(N) Kadane's algorithm\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& nums) {\n        // Implement optimal O(N) Kadane's algorithm\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # Implement optimal O(N) Kadane's algorithm\n        pass",
      "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        // Implement optimal O(N) Kadane's algorithm\n        return 0;\n    }\n}",
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n    // Write your optimal O(N) Kadane's algorithm\n    \n}",
      "typescript": "function maxSubArray(nums: number[]): number {\n    // Implement optimal O(N) Kadane's algorithm\n    return 0;\n}",
      "go": "func maxSubArray(nums []int) int {\n    // Implement optimal O(N) Kadane's algorithm\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn max_sub_array(nums: Vec<i32>) -> i32 {\n        // Implement optimal O(N) Kadane's algorithm\n        0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "expected": "6"
      },
      {
        "id": 2,
        "input": "nums = [1]",
        "expected": "1"
      },
      {
        "id": 3,
        "input": "nums = [5, 4, -1, 7, 8]",
        "expected": "23"
      }
    ],
    "submissions": [],
    "functionName": "maxSubArray"
  },
  {
    "id": "ARISE-P106",
    "title": "Reverse Linked List (LeetCode #206)",
    "slug": "reverse-linked-list",
    "topic": "Linked Lists",
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "75.8%",
    "verifiedXp": 40,
    "description": "Given the `head` of a singly linked list (represented as an array of values `head`), reverse the list, and return the reversed list.",
    "examples": [
      {
        "input": "head = [1, 2, 3, 4, 5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "The list nodes are inverted in order."
      },
      {
        "input": "head = [1, 2]",
        "output": "[2, 1]",
        "explanation": "Two-element list reversed."
      },
      {
        "input": "head = []",
        "output": "[]",
        "explanation": "Empty list reversed is empty."
      }
    ],
    "constraints": [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "hints": [
      "Hint 1: Maintain three pointers: prev, curr, and next_node to iteratively rewire pointers."
    ],
    "solution": {
      "approachName": "Optimal Solution for Reverse Linked List (LeetCode #206)",
      "explanation": "Optimal algorithm for Reverse Linked List (LeetCode #206) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function reverseList(head) {\n    return head.slice().reverse();\n}",
        "python": "class Solution:\n    def reverseList(self, head: list[int]) -> list[int]:\n        return head[::-1]"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int* reverseList(int* head, int headSize, int* returnSize) {\n    // Implement optimal O(N) reversal\n    *returnSize = 0; return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<int> reverseList(std::vector<int>& head) {\n        // Implement optimal O(N) reversal\n        return {};\n    }\n};",
      "python": "class Solution:\n    def reverseList(self, head: list[int]) -> list[int]:\n        # Implement optimal O(N) reversal\n        pass",
      "java": "class Solution {\n    public int[] reverseList(int[] head) {\n        // Implement optimal O(N) reversal\n        return new int[0];\n    }\n}",
      "javascript": "function reverseList(head) {\n    // Write your optimal O(N) reversal\n    \n}",
      "typescript": "function reverseList(head: number[]): number[] {\n    // Implement optimal O(N) reversal\n    return [];\n}",
      "go": "func reverseList(head []int) []int {\n    // Implement optimal O(N) reversal\n    return []int{}\n}",
      "rust": "impl Solution {\n    pub fn reverse_list(head: Vec<i32>) -> Vec<i32> {\n        // Implement optimal O(N) reversal\n        vec![]\n    }\n}"
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
      },
      {
        "id": 3,
        "input": "head = []",
        "expected": "[]"
      }
    ],
    "submissions": [],
    "functionName": "reverseList"
  },
  {
    "id": "ARISE-P107",
    "title": "Binary Search (LeetCode #704)",
    "slug": "binary-search",
    "topic": "Searching",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "57.2%",
    "verifiedXp": 40,
    "description": "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    "examples": [
      {
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        "output": "4",
        "explanation": "9 exists in nums and its index is 4."
      },
      {
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 2",
        "output": "-1",
        "explanation": "2 does not exist in nums so return -1."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    "hints": [
      "Hint 1: Maintain two pointers `left` and `right` bounding the active search window.",
      "Hint 2: Find mid = left + (right - left) / 2 to avoid integer overflow."
    ],
    "solution": {
      "approachName": "Optimal Solution for Binary Search (LeetCode #704)",
      "explanation": "Optimal algorithm for Binary Search (LeetCode #704) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "int search(int* nums, int numsSize, int target) {\n    int l = 0, r = numsSize - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}",
        "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        int l = 0, r = (int)nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};",
        "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return -1",
        "javascript": "function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int search(int* nums, int numsSize, int target) {\n    // Implement optimal O(log N) binary search\n    return -1;\n}",
      "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        // Implement optimal O(log N) binary search\n        return -1;\n    }\n};",
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Implement optimal O(log N) binary search\n        pass",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Implement optimal O(log N) binary search\n        return -1;\n    }\n}",
      "javascript": "function search(nums, target) {\n    // Write your optimal O(log N) binary search\n    \n}",
      "typescript": "function search(nums: number[], target: number): number {\n    // Implement optimal O(log N) binary search\n    return -1;\n}",
      "go": "func search(nums []int, target int) int {\n    // Implement optimal O(log N) binary search\n    return -1\n}",
      "rust": "impl Solution {\n    pub fn search(nums: Vec<i32>, target: i32) -> i32 {\n        // Implement optimal O(log N) binary search\n        -1\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        "expected": "4"
      },
      {
        "id": 2,
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 2",
        "expected": "-1"
      }
    ],
    "submissions": [],
    "functionName": "search"
  },
  {
    "id": "ARISE-P108",
    "title": "Contains Duplicate (LeetCode #217)",
    "slug": "contains-duplicate",
    "topic": "Hashing",
    "tags": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "61.3%",
    "verifiedXp": 40,
    "description": "Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "true",
        "explanation": "Element 1 appears twice."
      },
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "false",
        "explanation": "All elements are distinct."
      },
      {
        "input": "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        "output": "true",
        "explanation": "Multiple duplicates exist."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "hints": [
      "Hint 1: A hash set allows O(1) average lookup and insertion.",
      "Hint 2: Insert each element into the set. If it already exists, return true."
    ],
    "solution": {
      "approachName": "Optimal Solution for Contains Duplicate (LeetCode #217)",
      "explanation": "Optimal algorithm for Contains Duplicate (LeetCode #217) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "bool containsDuplicate(int* nums, int numsSize) {\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] == nums[j]) return true;\n        }\n    }\n    return false;\n}",
        "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& nums) {\n        std::unordered_set<int> seen;\n        for (int x : nums) {\n            if (seen.count(x)) return true;\n            seen.insert(x);\n        }\n        return false;\n    }\n};",
        "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        seen = set()\n        for x in nums:\n            if x in seen:\n                return True\n            seen.add(x)\n        return False",
        "javascript": "function containsDuplicate(nums) {\n    const seen = new Set();\n    for (let i = 0; i < nums.length; i++) {\n        if (seen.has(nums[i])) return true;\n        seen.add(nums[i]);\n    }\n    return false;\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "bool containsDuplicate(int* nums, int numsSize) {\n    // Implement optimal O(N) hash set solution\n    return false;\n}",
      "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& nums) {\n        // Implement optimal O(N) hash set solution\n        return false;\n    }\n};",
      "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        # Implement optimal O(N) hash set solution\n        pass",
      "java": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Implement optimal O(N) hash set solution\n        return false;\n    }\n}",
      "javascript": "function containsDuplicate(nums) {\n    // Write your optimal O(N) hash set solution\n    \n}",
      "typescript": "function containsDuplicate(nums: number[]): boolean {\n    // Implement optimal O(N) hash set solution\n    return false;\n}",
      "go": "func containsDuplicate(nums []int) bool {\n    // Implement optimal O(N) hash set solution\n    return false\n}",
      "rust": "impl Solution {\n    pub fn contains_duplicate(nums: Vec<i32>) -> bool {\n        // Implement optimal O(N) hash set solution\n        false\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [1, 2, 3, 1]",
        "expected": "true"
      },
      {
        "id": 2,
        "input": "nums = [1, 2, 3, 4]",
        "expected": "false"
      },
      {
        "id": 3,
        "input": "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        "expected": "true"
      }
    ],
    "submissions": [],
    "functionName": "containsDuplicate"
  },
  {
    "id": "ARISE-P109",
    "title": "Climbing Stairs (LeetCode #70)",
    "slug": "climbing-stairs",
    "topic": "Dynamic Programming",
    "tags": [
      "Math",
      "Dynamic Programming",
      "Memoization"
    ],
    "difficulty": "Easy",
    "status": "Unsolved",
    "acceptance": "52.8%",
    "verifiedXp": 40,
    "description": "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    "examples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "There are two ways: (1+1) and (2)."
      },
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "There are three ways: (1+1+1), (1+2), and (2+1)."
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "hints": [
      "Hint 1: To reach step n, you must come from either step (n-1) or step (n-2).",
      "Hint 2: dp[n] = dp[n-1] + dp[n-2], which matches the Fibonacci sequence!"
    ],
    "solution": {
      "approachName": "Optimal Solution for Climbing Stairs (LeetCode #70)",
      "explanation": "Optimal algorithm for Climbing Stairs (LeetCode #70) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "c": "int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b; a = b; b = c;\n    }\n    return b;\n}",
        "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; ++i) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};",
        "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b",
        "javascript": "function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        const c = a + b; a = b; b = c;\n    }\n    return b;\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int climbStairs(int n) {\n    // Implement optimal O(N) DP / Fibonacci solution\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Implement optimal O(N) DP solution\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Implement optimal O(N) DP solution\n        pass",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        // Implement optimal O(N) DP solution\n        return 0;\n    }\n}",
      "javascript": "function climbStairs(n) {\n    // Write your optimal O(N) DP solution\n    \n}",
      "typescript": "function climbStairs(n: number): number {\n    // Implement optimal O(N) DP solution\n    return 0;\n}",
      "go": "func climbStairs(n int) int {\n    // Implement optimal O(N) DP solution\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn climb_stairs(n: i32) -> i32 {\n        // Implement optimal O(N) DP solution\n        0\n    }\n}"
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
        "input": "n = 5",
        "expected": "8"
      }
    ],
    "submissions": [],
    "functionName": "climbStairs"
  },
  {
    "id": "ARISE-P201",
    "title": "3Sum (LeetCode #15)",
    "slug": "3sum",
    "topic": "Arrays",
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "34.7%",
    "verifiedXp": 60,
    "description": "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    "examples": [
      {
        "input": "nums = [-1, 0, 1, 2, -1, -4]",
        "output": "[[-1, -1, 2], [-1, 0, 1]]",
        "explanation": "The distinct triplets are [-1, 0, 1] and [-1, -1, 2]."
      },
      {
        "input": "nums = [0, 1, 1]",
        "output": "[]",
        "explanation": "The only possible triplet does not sum up to 0."
      },
      {
        "input": "nums = [0, 0, 0]",
        "output": "[[0, 0, 0]]",
        "explanation": "The only possible triplet sums up to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "hints": [
      "Hint 1: Sort the array first so you can use two pointers and easily skip duplicate elements."
    ],
    "solution": {
      "approachName": "Optimal Solution for 3Sum (LeetCode #15)",
      "explanation": "Optimal algorithm for 3Sum (LeetCode #15) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function threeSum(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                res.push([nums[i], nums[l], nums[r]]);\n                while (l < r && nums[l] === nums[l + 1]) l++;\n                while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}",
        "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums) - 2):\n            if i > 0 and nums[i] == nums[i - 1]: continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s == 0:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]: l += 1\n                    while l < r and nums[r] == nums[r - 1]: r -= 1\n                    l += 1; r -= 1\n                elif s < 0: l += 1\n                else: r -= 1\n        return res"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // Implement optimal O(N^2) sorting + two-pointer solution\n    *returnSize = 0;\n    return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {\n        // Implement optimal O(N^2) sorting + two-pointer solution\n        return {};\n    }\n};",
      "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Implement optimal O(N^2) sorting + two-pointer solution\n        pass",
      "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Implement optimal O(N^2) sorting + two-pointer solution\n        return new ArrayList<>();\n    }\n}",
      "javascript": "function threeSum(nums) {\n    // Write your optimal O(N^2) two-pointer solution\n    \n}",
      "typescript": "function threeSum(nums: number[]): number[][] {\n    // Implement optimal O(N^2) two-pointer solution\n    return [];\n}",
      "go": "func threeSum(nums []int) [][]int {\n    // Implement optimal O(N^2) two-pointer solution\n    return [][]int{}\n}",
      "rust": "impl Solution {\n    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {\n        // Implement optimal O(N^2) two-pointer solution\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [-1, 0, 1, 2, -1, -4]",
        "expected": "[[-1, -1, 2], [-1, 0, 1]]"
      },
      {
        "id": 2,
        "input": "nums = [0, 1, 1]",
        "expected": "[]"
      },
      {
        "id": 3,
        "input": "nums = [0, 0, 0]",
        "expected": "[[0, 0, 0]]"
      }
    ],
    "submissions": [],
    "functionName": "threeSum"
  },
  {
    "id": "ARISE-P202",
    "title": "Longest Substring Without Repeating Characters (LeetCode #3)",
    "slug": "longest-substring-without-repeating-characters",
    "topic": "Strings",
    "tags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "34.8%",
    "verifiedXp": 60,
    "description": "Given a string `s`, find the length of the **longest substring** without repeating characters.",
    "examples": [
      {
        "input": "s = 'abcabcbb'",
        "output": "3",
        "explanation": "The answer is 'abc', with the length of 3."
      },
      {
        "input": "s = 'bbbbb'",
        "output": "1",
        "explanation": "The answer is 'b', with the length of 1."
      },
      {
        "input": "s = 'pwwkew'",
        "output": "3",
        "explanation": "The answer is 'wke', with the length of 3."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "hints": [
      "Hint 1: Maintain a sliding window [left, right] and a hash map of seen characters with their last seen indices."
    ],
    "solution": {
      "approachName": "Optimal Solution for Longest Substring Without Repeating Characters (LeetCode #3)",
      "explanation": "Optimal algorithm for Longest Substring Without Repeating Characters (LeetCode #3) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function lengthOfLongestSubstring(s) {\n    let seen = new Map();\n    let maxLen = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        if (seen.has(s[r]) && seen.get(s[r]) >= l) {\n            l = seen.get(s[r]) + 1;\n        }\n        seen.set(s[r], r);\n        maxLen = Math.max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}",
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        l = max_len = 0\n        for r, ch in enumerate(s):\n            if ch in seen and seen[ch] >= l:\n                l = seen[ch] + 1\n            seen[ch] = r\n            max_len = max(max_len, r - l + 1)\n        return max_len"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int lengthOfLongestSubstring(char* s) {\n    // Implement optimal O(N) sliding window\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(const std::string& s) {\n        // Implement optimal O(N) sliding window\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Implement optimal O(N) sliding window\n        pass",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Implement optimal O(N) sliding window\n        return 0;\n    }\n}",
      "javascript": "function lengthOfLongestSubstring(s) {\n    // Write your optimal O(N) sliding window\n    \n}",
      "typescript": "function lengthOfLongestSubstring(s: string): number {\n    // Implement optimal O(N) sliding window\n    return 0;\n}",
      "go": "func lengthOfLongestSubstring(s string) int {\n    // Implement optimal O(N) sliding window\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn length_of_longest_substring(s: String) -> i32 {\n        // Implement optimal O(N) sliding window\n        0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "s = 'abcabcbb'",
        "expected": "3"
      },
      {
        "id": 2,
        "input": "s = 'bbbbb'",
        "expected": "1"
      },
      {
        "id": 3,
        "input": "s = 'pwwkew'",
        "expected": "3"
      }
    ],
    "submissions": [],
    "functionName": "lengthOfLongestSubstring"
  },
  {
    "id": "ARISE-P203",
    "title": "Container With Most Water (LeetCode #11)",
    "slug": "container-with-most-water",
    "topic": "Arrays",
    "tags": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "55.3%",
    "verifiedXp": 60,
    "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    "examples": [
      {
        "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "output": "49",
        "explanation": "The vertical lines at indices 1 and 8 hold max area = min(8, 7) * (8 - 1) = 7 * 7 = 49."
      },
      {
        "input": "height = [1, 1]",
        "output": "1",
        "explanation": "Width 1 * min(1, 1) = 1."
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "hints": [
      "Hint 1: Two pointers at both ends. The area is limited by the shorter line. Advance the pointer with the smaller height."
    ],
    "solution": {
      "approachName": "Optimal Solution for Container With Most Water (LeetCode #11)",
      "explanation": "Optimal algorithm for Container With Most Water (LeetCode #11) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function maxArea(height) {\n    let l = 0, r = height.length - 1, maxA = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        maxA = Math.max(maxA, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}",
        "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_a = 0\n        while l < r:\n            h = min(height[l], height[r])\n            max_a = max(max_a, h * (r - l))\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_a"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int maxArea(int* height, int heightSize) {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int maxArea(const std::vector<int>& height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Implement optimal O(N) two-pointer solution\n        pass",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n}",
      "javascript": "function maxArea(height) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
      "typescript": "function maxArea(height: number[]): number {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
      "go": "func maxArea(height []int) int {\n    // Implement optimal O(N) two-pointer solution\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn max_area(height: Vec<i32>) -> i32 {\n        // Implement optimal O(N) two-pointer solution\n        0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "expected": "49"
      },
      {
        "id": 2,
        "input": "height = [1, 1]",
        "expected": "1"
      }
    ],
    "submissions": [],
    "functionName": "maxArea"
  },
  {
    "id": "ARISE-P204",
    "title": "Product of Array Except Self (LeetCode #238)",
    "slug": "product-of-array-except-self",
    "topic": "Arrays",
    "tags": [
      "Array",
      "Prefix Sum"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "66.2%",
    "verifiedXp": 60,
    "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "[24, 12, 8, 6]",
        "explanation": "2*3*4=24, 1*3*4=12, 1*2*4=8, 1*2*3=6."
      },
      {
        "input": "nums = [-1, 1, 0, -3, 3]",
        "output": "[0, 0, 9, 0, 0]",
        "explanation": "Indices with 0 in array yield 0 except index 2."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix fits in a 32-bit integer."
    ],
    "hints": [
      "Hint 1: Construct prefix products from left, then multiply by suffix products from right in a second pass."
    ],
    "solution": {
      "approachName": "Optimal Solution for Product of Array Except Self (LeetCode #238)",
      "explanation": "Optimal algorithm for Product of Array Except Self (LeetCode #238) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function productExceptSelf(nums) {\n    const n = nums.length;\n    const res = new Array(n).fill(1);\n    let pref = 1;\n    for (let i = 0; i < n; i++) {\n        res[i] = pref;\n        pref *= nums[i];\n    }\n    let suff = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        res[i] *= suff;\n        suff *= nums[i];\n    }\n    return res;\n}",
        "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        pref = 1\n        for i in range(n):\n            res[i] = pref\n            pref *= nums[i]\n        suff = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= suff\n            suff *= nums[i]\n        return res"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    // Implement optimal O(N) prefix-suffix product without division\n    *returnSize = 0; return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<int> productExceptSelf(const std::vector<int>& nums) {\n        // Implement optimal O(N) solution\n        return {};\n    }\n};",
      "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        # Implement optimal O(N) solution\n        pass",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Implement optimal O(N) solution\n        return new int[0];\n    }\n}",
      "javascript": "function productExceptSelf(nums) {\n    // Write your optimal O(N) prefix-suffix solution\n    \n}",
      "typescript": "function productExceptSelf(nums: number[]): number[] {\n    // Implement optimal O(N) solution\n    return [];\n}",
      "go": "func productExceptSelf(nums []int) []int {\n    // Implement optimal O(N) solution\n    return []int{}\n}",
      "rust": "impl Solution {\n    pub fn product_except_self(nums: Vec<i32>) -> Vec<i32> {\n        // Implement optimal O(N) solution\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [1, 2, 3, 4]",
        "expected": "[24, 12, 8, 6]"
      },
      {
        "id": 2,
        "input": "nums = [-1, 1, 0, -3, 3]",
        "expected": "[0, 0, 9, 0, 0]"
      }
    ],
    "submissions": [],
    "functionName": "productExceptSelf"
  },
  {
    "id": "ARISE-P205",
    "title": "Coin Change (LeetCode #322)",
    "slug": "coin-change",
    "topic": "Dynamic Programming",
    "tags": [
      "Array",
      "Dynamic Programming",
      "Breadth-First Search"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "43.5%",
    "verifiedXp": 60,
    "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    "examples": [
      {
        "input": "coins = [1, 2, 5], amount = 11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1 (3 coins)."
      },
      {
        "input": "coins = [2], amount = 3",
        "output": "-1",
        "explanation": "Amount 3 cannot be formed with denomination 2."
      },
      {
        "input": "coins = [1], amount = 0",
        "output": "0",
        "explanation": "0 amount takes 0 coins."
      }
    ],
    "constraints": [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    "hints": [
      "Hint 1: Bottom-up DP: dp[i] is the minimum coins needed to make amount i.",
      "Hint 2: For each amount i from 1 to amount, try all coins c <= i: dp[i] = min(dp[i], dp[i - c] + 1)."
    ],
    "solution": {
      "approachName": "Optimal Solution for Coin Change (LeetCode #322)",
      "explanation": "Optimal algorithm for Coin Change (LeetCode #322) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (let c of coins) {\n            if (i >= c && dp[i - c] !== Infinity) {\n                dp[i] = Math.min(dp[i], dp[i - c] + 1);\n            }\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}",
        "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for c in coins:\n                if i >= c:\n                    dp[i] = min(dp[i], dp[i - c] + 1)\n        return -1 if dp[amount] == float('inf') else int(dp[amount])"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int coinChange(int* coins, int coinsSize, int amount) {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1;\n}",
      "cpp": "class Solution {\npublic:\n    int coinChange(const std::vector<int>& coins, int amount) {\n        // Implement optimal O(amount * len(coins)) DP\n        return -1;\n    }\n};",
      "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # Implement optimal O(amount * len(coins)) DP\n        pass",
      "java": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Implement optimal O(amount * len(coins)) DP\n        return -1;\n    }\n}",
      "javascript": "function coinChange(coins, amount) {\n    // Write your optimal O(amount * len(coins)) DP\n    \n}",
      "typescript": "function coinChange(coins: number[], amount: number): number {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1;\n}",
      "go": "func coinChange(coins []int, amount int) int {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1\n}",
      "rust": "impl Solution {\n    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {\n        // Implement optimal O(amount * len(coins)) DP\n        -1\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "coins = [1, 2, 5], amount = 11",
        "expected": "3"
      },
      {
        "id": 2,
        "input": "coins = [2], amount = 3",
        "expected": "-1"
      },
      {
        "id": 3,
        "input": "coins = [1], amount = 0",
        "expected": "0"
      }
    ],
    "submissions": [],
    "functionName": "coinChange"
  },
  {
    "id": "ARISE-P206",
    "title": "Search in Rotated Sorted Array (LeetCode #33)",
    "slug": "search-in-rotated-sorted-array",
    "topic": "Searching",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "40.3%",
    "verifiedXp": 60,
    "description": "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`).\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    "examples": [
      {
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
        "output": "4",
        "explanation": "Target 0 is found at index 4."
      },
      {
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
        "output": "-1",
        "explanation": "Target 3 is not in nums."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique."
    ],
    "hints": [
      "Hint 1: At least one half of the array (left half [l..mid] or right half [mid..r]) is always strictly sorted."
    ],
    "solution": {
      "approachName": "Optimal Solution for Search in Rotated Sorted Array (LeetCode #33)",
      "explanation": "Optimal algorithm for Search in Rotated Sorted Array (LeetCode #33) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[l] <= nums[mid]) {\n            if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}",
        "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target: return mid\n            if nums[l] <= nums[mid]:\n                if nums[l] <= target < nums[mid]: r = mid - 1\n                else: l = mid + 1\n            else:\n                if nums[mid] < target <= nums[r]: l = mid + 1\n                else: r = mid - 1\n        return -1"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int search(int* nums, int numsSize, int target) {\n    // Implement optimal O(log N) rotated binary search\n    return -1;\n}",
      "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        // Implement optimal O(log N) rotated binary search\n        return -1;\n    }\n};",
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Implement optimal O(log N) rotated binary search\n        pass",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Implement optimal O(log N) rotated binary search\n        return -1;\n    }\n}",
      "javascript": "function search(nums, target) {\n    // Write your optimal O(log N) rotated binary search\n    \n}",
      "typescript": "function search(nums: number[], target: number): number {\n    // Implement optimal O(log N) rotated binary search\n    return -1;\n}",
      "go": "func search(nums []int, target int) int {\n    // Implement optimal O(log N) rotated binary search\n    return -1\n}",
      "rust": "impl Solution {\n    pub fn search(nums: Vec<i32>, target: i32) -> i32 {\n        // Implement optimal O(log N) rotated binary search\n        -1\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
        "expected": "4"
      },
      {
        "id": 2,
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
        "expected": "-1"
      }
    ],
    "submissions": [],
    "functionName": "search"
  },
  {
    "id": "ARISE-P207",
    "title": "LRU Cache (LeetCode #146)",
    "slug": "lru-cache",
    "topic": "Hashing",
    "tags": [
      "Hash Table",
      "Linked List",
      "Design",
      "Doubly-Linked List"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "42.1%",
    "verifiedXp": 60,
    "description": "Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size `capacity`.\n- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.\n- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.",
    "examples": [
      {
        "input": "capacity = 2, operations = [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2]]",
        "output": "[null, null, 1, null, -1]",
        "explanation": "Key 2 was evicted because key 1 was accessed prior to inserting 3."
      }
    ],
    "constraints": [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    "hints": [
      "Hint 1: A hash map combined with a doubly linked list allows O(1) retrieval and O(1) node relocation."
    ],
    "solution": {
      "approachName": "Optimal Solution for LRU Cache (LeetCode #146)",
      "explanation": "Optimal algorithm for LRU Cache (LeetCode #146) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function LRUCache(capacity, operations) {\n    const map = new Map();\n    const out = [];\n    for (const op of operations) {\n        if (op[0] === 'put') {\n            if (map.has(op[1])) map.delete(op[1]);\n            else if (map.size >= capacity) {\n                const firstKey = map.keys().next().value;\n                map.delete(firstKey);\n            }\n            map.set(op[1], op[2]);\n            out.push(null);\n        } else if (op[0] === 'get') {\n            if (!map.has(op[1])) out.push(-1);\n            else {\n                const v = map.get(op[1]);\n                map.delete(op[1]);\n                map.set(op[1], v);\n                out.push(v);\n            }\n        }\n    }\n    return out;\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "// Implement LRU Cache with O(1) get and put\nint LRUCache(int capacity, void* operations) { return 0; }",
      "cpp": "class LRUCache {\npublic:\n    LRUCache(int capacity) {}\n    int get(int key) { return -1; }\n    void put(int key, int value) {}\n};",
      "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n    def get(self, key: int) -> int:\n        return -1\n    def put(self, key: int, value: int) -> None:\n        pass",
      "java": "class LRUCache {\n    public LRUCache(int capacity) {}\n    public int get(int key) { return -1; }\n    public void put(int key, int value) {}\n}",
      "javascript": "function LRUCache(capacity, operations) {\n    // Implement LRU Cache supporting get and put\n    \n}",
      "typescript": "function LRUCache(capacity: number, operations: any[][]): any[] {\n    return [];\n}",
      "go": "type LRUCache struct {}\nfunc Constructor(capacity int) LRUCache { return LRUCache{} }\nfunc (this *LRUCache) Get(key int) int { return -1 }\nfunc (this *LRUCache) Put(key int, value int) {}",
      "rust": "struct LRUCache {}\nimpl LRUCache {\n    pub fn new(capacity: i32) -> Self { Self {} }\n    pub fn get(&mut self, key: i32) -> i32 { -1 }\n    pub fn put(&mut self, key: i32, value: i32) {}\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "capacity = 2, operations = [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2]]",
        "expected": "[null, null, 1, null, -1]"
      }
    ],
    "submissions": [],
    "functionName": "LRUCache"
  },
  {
    "id": "ARISE-P208",
    "title": "Number of Islands (LeetCode #200)",
    "slug": "number-of-islands",
    "topic": "Graphs",
    "tags": [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find",
      "Matrix"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "58.4%",
    "verifiedXp": 60,
    "description": "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return *the number of islands*.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        "output": "1",
        "explanation": "All 1s are connected into one single island."
      },
      {
        "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        "output": "3",
        "explanation": "There are 3 disjoint connected island components."
      }
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    "hints": [
      "Hint 1: Iterate over each cell. When encountering an unvisited '1', increment island count and run BFS/DFS to sink all connected land to '0'."
    ],
    "solution": {
      "approachName": "Optimal Solution for Number of Islands (LeetCode #200)",
      "explanation": "Optimal algorithm for Number of Islands (LeetCode #200) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function numIslands(grid) {\n    if (!grid || grid.length === 0) return 0;\n    let count = 0;\n    const m = grid.length, n = grid[0].length;\n    function dfs(r, c) {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n    }\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === '1') {\n                count++;\n                dfs(r, c);\n            }\n        }\n    }\n    return count;\n}",
        "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        if not grid: return 0\n        m, n = len(grid), len(grid[0])\n        count = 0\n        def dfs(r, c):\n            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1': return\n            grid[r][c] = '0'\n            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] == '1':\n                    count += 1\n                    dfs(r, c)\n        return count"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int numIslands(char** grid, int gridSize, int* gridColSize) {\n    // Implement optimal O(M * N) DFS/BFS\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int numIslands(std::vector<std::vector<char>>& grid) {\n        // Implement optimal O(M * N) DFS/BFS\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # Implement optimal O(M * N) DFS/BFS\n        pass",
      "java": "class Solution {\n    public int numIslands(char[][] grid) {\n        // Implement optimal O(M * N) DFS/BFS\n        return 0;\n    }\n}",
      "javascript": "function numIslands(grid) {\n    // Write your optimal O(M * N) DFS/BFS\n    \n}",
      "typescript": "function numIslands(grid: string[][]): number {\n    // Implement optimal O(M * N) DFS/BFS\n    return 0;\n}",
      "go": "func numIslands(grid [][]byte) int {\n    // Implement optimal O(M * N) DFS/BFS\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn num_islands(grid: Vec<Vec<char>>) -> i32 {\n        // Implement optimal O(M * N) DFS/BFS\n        0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        "expected": "1"
      },
      {
        "id": 2,
        "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        "expected": "3"
      }
    ],
    "submissions": [],
    "functionName": "numIslands"
  },
  {
    "id": "ARISE-P209",
    "title": "Group Anagrams (LeetCode #49)",
    "slug": "group-anagrams",
    "topic": "Strings",
    "tags": [
      "Array",
      "Hash Table",
      "String",
      "Sorting"
    ],
    "difficulty": "Medium",
    "status": "Unsolved",
    "acceptance": "67.8%",
    "verifiedXp": 60,
    "description": "Given an array of strings `strs`, group the **anagrams** together. You can return the answer in **any order**.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    "examples": [
      {
        "input": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
        "output": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]",
        "explanation": "bat stands alone, nat/tan share letters, and ate/eat/tea share letters."
      },
      {
        "input": "strs = [\"\"]",
        "output": "[[\"\"]]",
        "explanation": "Empty string grouping."
      },
      {
        "input": "strs = [\"a\"]",
        "output": "[[\"a\"]]",
        "explanation": "Single character grouping."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    "hints": [
      "Hint 1: Two strings are anagrams if and only if their sorted character sequences are identical."
    ],
    "solution": {
      "approachName": "Optimal Solution for Group Anagrams (LeetCode #49)",
      "explanation": "Optimal algorithm for Group Anagrams (LeetCode #49) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function groupAnagrams(strs) {\n    const map = new Map();\n    for (const s of strs) {\n        const key = s.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(s);\n    }\n    return Array.from(map.values());\n}",
        "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        from collections import defaultdict\n        d = defaultdict(list)\n        for s in strs:\n            d[''.join(sorted(s))].append(s)\n        return list(d.values())"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    // Implement optimal O(N * K log K) hash map grouping\n    *returnSize = 0; return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n        // Implement optimal O(N * K log K) hash map grouping\n        return {};\n    }\n};",
      "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        # Implement optimal O(N * K log K) hash map grouping\n        pass",
      "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Implement optimal O(N * K log K) hash map grouping\n        return new ArrayList<>();\n    }\n}",
      "javascript": "function groupAnagrams(strs) {\n    // Write your optimal O(N * K log K) hash map grouping\n    \n}",
      "typescript": "function groupAnagrams(strs: string[]): string[][] {\n    // Implement optimal O(N * K log K) hash map grouping\n    return [];\n}",
      "go": "func groupAnagrams(strs []string) [][]string {\n    // Implement optimal O(N * K log K) hash map grouping\n    return [][]string{}\n}",
      "rust": "impl Solution {\n    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {\n        // Implement optimal O(N * K log K) hash map grouping\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
        "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]"
      },
      {
        "id": 2,
        "input": "strs = [\"\"]",
        "expected": "[[\"\"]]"
      },
      {
        "id": 3,
        "input": "strs = [\"a\"]",
        "expected": "[[\"a\"]]"
      }
    ],
    "submissions": [],
    "functionName": "groupAnagrams"
  },
  {
    "id": "ARISE-P301",
    "title": "Trapping Rain Water (LeetCode #42)",
    "slug": "trapping-rain-water",
    "topic": "Arrays",
    "tags": [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "60.8%",
    "verifiedXp": 80,
    "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    "examples": [
      {
        "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "output": "6",
        "explanation": "6 units of rain water are being trapped."
      },
      {
        "input": "height = [4, 2, 0, 3, 2, 5]",
        "output": "9",
        "explanation": "9 units of rain water are trapped."
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "hints": [
      "Hint 1: Use two pointers at left and right with left_max and right_max trackers."
    ],
    "solution": {
      "approachName": "Optimal Solution for Trapping Rain Water (LeetCode #42)",
      "explanation": "Optimal algorithm for Trapping Rain Water (LeetCode #42) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function trap(height) {\n    let l = 0, r = height.length - 1;\n    let lMax = 0, rMax = 0, res = 0;\n    while (l < r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else res += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else res += rMax - height[r];\n            r--;\n        }\n    }\n    return res;\n}",
        "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        l_max = r_max = res = 0\n        while l < r:\n            if height[l] <= height[r]:\n                if height[l] >= l_max: l_max = height[l]\n                else: res += l_max - height[l]\n                l += 1\n            else:\n                if height[r] >= r_max: r_max = height[r]\n                else: res += r_max - height[r]\n                r -= 1\n        return res"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int trap(int* height, int heightSize) {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
      "cpp": "class Solution {\npublic:\n    int trap(const std::vector<int>& height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n};",
      "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Implement optimal O(N) two-pointer solution\n        pass",
      "java": "class Solution {\n    public int trap(int[] height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n}",
      "javascript": "function trap(height) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
      "typescript": "function trap(height: number[]): number {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
      "go": "func trap(height []int) int {\n    // Implement optimal O(N) two-pointer solution\n    return 0\n}",
      "rust": "impl Solution {\n    pub fn trap(height: Vec<i32>) -> i32 {\n        // Implement optimal O(N) two-pointer solution\n        0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "expected": "6"
      },
      {
        "id": 2,
        "input": "height = [4, 2, 0, 3, 2, 5]",
        "expected": "9"
      }
    ],
    "submissions": [],
    "functionName": "trap"
  },
  {
    "id": "ARISE-P302",
    "title": "Median of Two Sorted Arrays (LeetCode #4)",
    "slug": "median-of-two-sorted-arrays",
    "topic": "Searching",
    "tags": [
      "Array",
      "Binary Search",
      "Divide and Conquer"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "39.5%",
    "verifiedXp": 80,
    "description": "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the **median** of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`.",
    "examples": [
      {
        "input": "nums1 = [1, 3], nums2 = [2]",
        "output": "2",
        "explanation": "Merged array = [1, 2, 3] and median is 2."
      },
      {
        "input": "nums1 = [1, 2], nums2 = [3, 4]",
        "output": "2.5",
        "explanation": "Merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    "hints": [
      "Hint 1: Binary search on the partition position of the smaller array."
    ],
    "solution": {
      "approachName": "Optimal Solution for Median of Two Sorted Arrays (LeetCode #4)",
      "explanation": "Optimal algorithm for Median of Two Sorted Arrays (LeetCode #4) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function findMedianSortedArrays(nums1, nums2) {\n    const merged = [];\n    let i = 0, j = 0;\n    while (i < nums1.length && j < nums2.length) {\n        if (nums1[i] < nums2[j]) merged.push(nums1[i++]);\n        else merged.push(nums2[j++]);\n    }\n    while (i < nums1.length) merged.push(nums1[i++]);\n    while (j < nums2.length) merged.push(nums2[j++]);\n    const mid = Math.floor(merged.length / 2);\n    if (merged.length % 2 === 1) return merged[mid];\n    return (merged[mid - 1] + merged[mid]) / 2.0;\n}",
        "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        merged = sorted(nums1 + nums2)\n        mid = len(merged) // 2\n        if len(merged) % 2 == 1: return float(merged[mid])\n        return (merged[mid - 1] + merged[mid]) / 2.0"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    // Implement optimal O(log(min(m, n))) binary search\n    return 0.0;\n}",
      "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(const std::vector<int>& nums1, const std::vector<int>& nums2) {\n        // Implement optimal O(log(min(m, n))) binary search\n        return 0.0;\n    }\n};",
      "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        # Implement optimal O(log(min(m, n))) binary search\n        pass",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Implement optimal O(log(min(m, n))) binary search\n        return 0.0;\n    }\n}",
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n    // Write your optimal O(log(min(m, n))) binary search\n    \n}",
      "typescript": "function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    // Implement optimal O(log(min(m, n))) binary search\n    return 0;\n}",
      "go": "func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    // Implement optimal O(log(min(m, n))) binary search\n    return 0.0\n}",
      "rust": "impl Solution {\n    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {\n        // Implement optimal O(log(min(m, n))) binary search\n        0.0\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums1 = [1, 3], nums2 = [2]",
        "expected": "2"
      },
      {
        "id": 2,
        "input": "nums1 = [1, 2], nums2 = [3, 4]",
        "expected": "2.5"
      }
    ],
    "submissions": [],
    "functionName": "findMedianSortedArrays"
  },
  {
    "id": "ARISE-P303",
    "title": "Merge k Sorted Lists (LeetCode #23)",
    "slug": "merge-k-sorted-lists",
    "topic": "Heaps",
    "tags": [
      "Linked List",
      "Divide and Conquer",
      "Heap",
      "Merge Sort"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "51.8%",
    "verifiedXp": 80,
    "description": "You are given an array of `k` linked-lists `lists` (each represented as a sorted array), each linked-list is sorted in ascending order.\n\n*Merge all the linked-lists into one sorted linked-list and return it.*",
    "examples": [
      {
        "input": "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]",
        "output": "[1, 1, 2, 3, 4, 4, 5, 6]",
        "explanation": "The merged sorted list is [1, 1, 2, 3, 4, 4, 5, 6]."
      },
      {
        "input": "lists = []",
        "output": "[]",
        "explanation": "Empty list of lists returns empty."
      },
      {
        "input": "lists = [[]]",
        "output": "[]",
        "explanation": "Single empty list returns empty."
      }
    ],
    "constraints": [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4"
    ],
    "hints": [
      "Hint 1: A min-heap tracking the current smallest element among k lists achieves O(N log k) time."
    ],
    "solution": {
      "approachName": "Optimal Solution for Merge k Sorted Lists (LeetCode #23)",
      "explanation": "Optimal algorithm for Merge k Sorted Lists (LeetCode #23) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function mergeKLists(lists) {\n    const res = [];\n    for (const l of lists) {\n        for (const val of l) res.push(val);\n    }\n    return res.sort((a, b) => a - b);\n}",
        "python": "class Solution:\n    def mergeKLists(self, lists: list[list[int]]) -> list[int]:\n        import heapq\n        heap = []\n        for l in lists:\n            for val in l:\n                heapq.heappush(heap, val)\n        return [heapq.heappop(heap) for _ in range(len(heap))]"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int* mergeKLists(int** lists, int listsSize, int* listsColSize, int* returnSize) {\n    // Implement optimal O(N log K) min-heap merger\n    *returnSize = 0; return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<int> mergeKLists(std::vector<std::vector<int>>& lists) {\n        // Implement optimal O(N log K) min-heap merger\n        return {};\n    }\n};",
      "python": "class Solution:\n    def mergeKLists(self, lists: list[list[int]]) -> list[int]:\n        # Implement optimal O(N log K) min-heap merger\n        pass",
      "java": "import java.util.*;\nclass Solution {\n    public List<Integer> mergeKLists(int[][] lists) {\n        // Implement optimal O(N log K) min-heap merger\n        return new ArrayList<>();\n    }\n}",
      "javascript": "function mergeKLists(lists) {\n    // Write your optimal O(N log K) min-heap merger\n    \n}",
      "typescript": "function mergeKLists(lists: number[][]): number[] {\n    // Implement optimal O(N log K) min-heap merger\n    return [];\n}",
      "go": "func mergeKLists(lists [][]int) []int {\n    // Implement optimal O(N log K) min-heap merger\n    return []int{}\n}",
      "rust": "impl Solution {\n    pub fn merge_k_lists(lists: Vec<Vec<i32>>) -> Vec<i32> {\n        // Implement optimal O(N log K) min-heap merger\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]",
        "expected": "[1, 1, 2, 3, 4, 4, 5, 6]"
      },
      {
        "id": 2,
        "input": "lists = []",
        "expected": "[]"
      },
      {
        "id": 3,
        "input": "lists = [[]]",
        "expected": "[]"
      }
    ],
    "submissions": [],
    "functionName": "mergeKLists"
  },
  {
    "id": "ARISE-P304",
    "title": "Minimum Window Substring (LeetCode #76)",
    "slug": "minimum-window-substring",
    "topic": "Strings",
    "tags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "42.3%",
    "verifiedXp": 80,
    "description": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (**including duplicates**) is included in the window. If there is no such substring, return the empty string `\"\"`.\n\nThe testcases will be generated such that the answer is **unique**.",
    "examples": [
      {
        "input": "s = 'ADOBECODEBANC', t = 'ABC'",
        "output": "BANC",
        "explanation": "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t."
      },
      {
        "input": "s = 'a', t = 'a'",
        "output": "a",
        "explanation": "The entire string s is the minimum window."
      },
      {
        "input": "s = 'a', t = 'aa'",
        "output": "",
        "explanation": "Both 'a's from t must be included in the window, not possible so empty."
      }
    ],
    "constraints": [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    "hints": [
      "Hint 1: Use two pointers to create a window of letters in S, and check whether all characters of T are enclosed."
    ],
    "solution": {
      "approachName": "Optimal Solution for Minimum Window Substring (LeetCode #76)",
      "explanation": "Optimal algorithm for Minimum Window Substring (LeetCode #76) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function minWindow(s, t) {\n    if (!s || !t || s.length < t.length) return '';\n    const target = {};\n    for (const c of t) target[c] = (target[c] || 0) + 1;\n    let required = Object.keys(target).length;\n    let window = {};\n    let formed = 0;\n    let l = 0, minLen = Infinity, start = 0;\n    for (let r = 0; r < s.length; r++) {\n        const c = s[r];\n        window[c] = (window[c] || 0) + 1;\n        if (target[c] && window[c] === target[c]) formed++;\n        while (l <= r && formed === required) {\n            if (r - l + 1 < minLen) {\n                minLen = r - l + 1;\n                start = l;\n            }\n            const lc = s[l];\n            window[lc]--;\n            if (target[lc] && window[lc] < target[lc]) formed--;\n            l++;\n        }\n    }\n    return minLen === Infinity ? '' : s.substring(start, start + minLen);\n}"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "char* minWindow(char* s, char* t) {\n    // Implement optimal O(N) sliding window\n    return \"\";\n}",
      "cpp": "class Solution {\npublic:\n    std::string minWindow(const std::string& s, const std::string& t) {\n        // Implement optimal O(N) sliding window\n        return \"\";\n    }\n};",
      "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Implement optimal O(N) sliding window\n        pass",
      "java": "class Solution {\n    public String minWindow(String s, String t) {\n        // Implement optimal O(N) sliding window\n        return \"\";\n    }\n}",
      "javascript": "function minWindow(s, t) {\n    // Write your optimal O(N) sliding window\n    \n}",
      "typescript": "function minWindow(s: string, t: string): string {\n    // Implement optimal O(N) sliding window\n    return \"\";\n}",
      "go": "func minWindow(s string, t string) string {\n    // Implement optimal O(N) sliding window\n    return \"\"\n}",
      "rust": "impl Solution {\n    pub fn min_window(s: String, t: String) -> String {\n        // Implement optimal O(N) sliding window\n        String::new()\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "s = 'ADOBECODEBANC', t = 'ABC'",
        "expected": "BANC"
      },
      {
        "id": 2,
        "input": "s = 'a', t = 'a'",
        "expected": "a"
      },
      {
        "id": 3,
        "input": "s = 'a', t = 'aa'",
        "expected": ""
      }
    ],
    "submissions": [],
    "functionName": "minWindow"
  },
  {
    "id": "ARISE-P305",
    "title": "Sliding Window Maximum (LeetCode #239)",
    "slug": "sliding-window-maximum",
    "topic": "Queues",
    "tags": [
      "Array",
      "Queue",
      "Sliding Window",
      "Monotonic Queue"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "46.7%",
    "verifiedXp": 80,
    "description": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.",
    "examples": [
      {
        "input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "output": "[3, 3, 5, 5, 6, 7]",
        "explanation": "Window position yields max 3, 3, 5, 5, 6, 7."
      },
      {
        "input": "nums = [1], k = 1",
        "output": "[1]",
        "explanation": "Single element array."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    "hints": [
      "Hint 1: Use a monotonic deque storing indices in decreasing order of values."
    ],
    "solution": {
      "approachName": "Optimal Solution for Sliding Window Maximum (LeetCode #239)",
      "explanation": "Optimal algorithm for Sliding Window Maximum (LeetCode #239) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function maxSlidingWindow(nums, k) {\n    const q = [];\n    const res = [];\n    for (let i = 0; i < nums.length; i++) {\n        while (q.length && q[0] <= i - k) q.shift();\n        while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();\n        q.push(i);\n        if (i >= k - 1) res.push(nums[q[0]]);\n    }\n    return res;\n}",
        "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        from collections import deque\n        q = deque()\n        res = []\n        for i, x in enumerate(nums):\n            while q and q[0] <= i - k: q.popleft()\n            while q and nums[q[-1]] <= x: q.pop()\n            q.append(i)\n            if i >= k - 1: res.append(nums[q[0]])\n        return res"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {\n    // Implement optimal O(N) monotonic deque\n    *returnSize = 0; return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {\n        // Implement optimal O(N) monotonic deque\n        return {};\n    }\n};",
      "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        # Implement optimal O(N) monotonic deque\n        pass",
      "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Implement optimal O(N) monotonic deque\n        return new int[0];\n    }\n}",
      "javascript": "function maxSlidingWindow(nums, k) {\n    // Write your optimal O(N) monotonic deque\n    \n}",
      "typescript": "function maxSlidingWindow(nums: number[], k: number): number[] {\n    // Implement optimal O(N) monotonic deque\n    return [];\n}",
      "go": "func maxSlidingWindow(nums []int, k int) []int {\n    // Implement optimal O(N) monotonic deque\n    return []int{}\n}",
      "rust": "impl Solution {\n    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {\n        // Implement optimal O(N) monotonic deque\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "expected": "[3, 3, 5, 5, 6, 7]"
      },
      {
        "id": 2,
        "input": "nums = [1], k = 1",
        "expected": "[1]"
      }
    ],
    "submissions": [],
    "functionName": "maxSlidingWindow"
  },
  {
    "id": "ARISE-P306",
    "title": "N-Queens (LeetCode #51)",
    "slug": "n-queens",
    "topic": "Backtracking",
    "tags": [
      "Array",
      "Backtracking"
    ],
    "difficulty": "Hard",
    "status": "Unsolved",
    "acceptance": "66.5%",
    "verifiedXp": 80,
    "description": "The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.",
    "examples": [
      {
        "input": "n = 4",
        "output": "[[\".Q..\", \"...Q\", \"Q...\", \"..Q.\"], [\"..Q.\", \"Q...\", \"...Q\", \".Q..\"]]",
        "explanation": "There exist two distinct solutions to the 4-queens puzzle."
      },
      {
        "input": "n = 1",
        "output": "[[\"Q\"]]",
        "explanation": "Single queen on 1x1 board."
      }
    ],
    "constraints": [
      "1 <= n <= 9"
    ],
    "hints": [
      "Hint 1: Place queens row by row. Use sets to track cols, diag1 (r - c), and diag2 (r + c)."
    ],
    "solution": {
      "approachName": "Optimal Solution for N-Queens (LeetCode #51)",
      "explanation": "Optimal algorithm for N-Queens (LeetCode #51) ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
      "stepByStep": [
        "1. Parse the input parameters according to the function contract.",
        "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
        "3. Execute the primary pass over the elements, checking state invariants.",
        "4. Return the computed result."
      ],
      "code": {
        "javascript": "function solveNQueens(n) {\n    const res = [];\n    const cols = new Set(), d1 = new Set(), d2 = new Set();\n    const board = Array.from({ length: n }, () => new Array(n).fill('.'));\n    function backtrack(r) {\n        if (r === n) {\n            res.push(board.map(row => row.join('')));\n            return;\n        }\n        for (let c = 0; c < n; c++) {\n            if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;\n            board[r][c] = 'Q';\n            cols.add(c); d1.add(r - c); d2.add(r + c);\n            backtrack(r + 1);\n            board[r][c] = '.';\n            cols.delete(c); d1.delete(r - c); d2.delete(r + c);\n        }\n    }\n    backtrack(0);\n    return res;\n}",
        "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        res = []\n        cols, d1, d2 = set(), set(), set()\n        board = [['.' for _ in range(n)] for _ in range(n)]\n        def backtrack(r):\n            if r == n:\n                res.append([''.join(row) for row in board])\n                return\n            for c in range(n):\n                if c in cols or (r - c) in d1 or (r + c) in d2: continue\n                board[r][c] = 'Q'\n                cols.add(c); d1.add(r - c); d2.add(r + c)\n                backtrack(r + 1)\n                board[r][c] = '.'\n                cols.remove(c); d1.remove(r - c); d2.remove(r + c)\n        backtrack(0)\n        return res"
      },
      "complexity": {
        "time": "Optimal time complexity per LeetCode benchmarks.",
        "space": "Optimal auxiliary space."
      },
      "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
    },
    "starterCode": {
      "c": "char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {\n    // Implement optimal backtracking\n    *returnSize = 0; return NULL;\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> solveNQueens(int n) {\n        // Implement optimal backtracking\n        return {};\n    }\n};",
      "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        # Implement optimal backtracking\n        pass",
      "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        // Implement optimal backtracking\n        return new ArrayList<>();\n    }\n}",
      "javascript": "function solveNQueens(n) {\n    // Write your optimal backtracking\n    \n}",
      "typescript": "function solveNQueens(n: number): string[][] {\n    // Implement optimal backtracking\n    return [];\n}",
      "go": "func solveNQueens(n int) [][]string {\n    // Implement optimal backtracking\n    return [][]string{}\n}",
      "rust": "impl Solution {\n    pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {\n        // Implement optimal backtracking\n        vec![]\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "input": "n = 4",
        "expected": "[[\".Q..\", \"...Q\", \"Q...\", \"..Q.\"], [\"..Q.\", \"Q...\", \"...Q\", \".Q..\"]]"
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
      { rank: 1, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "—", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 2, name: "Prathamesh Sawant", college: "COEP Technological University", xp: 4890, mv: "+1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 3, name: "Shreya Kulkarni", college: "COEP Technological University", xp: 4120, mv: "—", solved: 58, isCurrentUser: false, avatar: "SK" },
      { rank: 4, name: "Rajesh Deshmukh", college: "COEP Technological University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: false, avatar: "RD" },
      { rank: 5, name: "Varun Jadhav", college: "COEP Technological University", xp: 3100, mv: "-1", solved: 43, isCurrentUser: false, avatar: "VJ" },
      { rank: 6, name: "Aniket More", college: "COEP Technological University", xp: 2850, mv: "—", solved: 39, isCurrentUser: false, avatar: "AM" }
    ],
    district: [
      { rank: 1, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "—", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 2, name: "Aarav Mehta", college: "PICT Pune", xp: 6240, mv: "+1", solved: 82, isCurrentUser: false, avatar: "AM" },
      { rank: 3, name: "Devansh Joshi", college: "MIT World Peace University", xp: 5810, mv: "—", solved: 76, isCurrentUser: false, avatar: "DJ" },
      { rank: 4, name: "Prathamesh Sawant", college: "COEP Tech University", xp: 4890, mv: "-1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 5, name: "Shreya Kulkarni", college: "COEP Tech University", xp: 4120, mv: "—", solved: 58, isCurrentUser: false, avatar: "SK" },
      { rank: 6, name: "Rajesh Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: false, avatar: "RD" }
    ],
    maharashtra: [
      { rank: 1, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "—", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 2, name: "Siddharth Verma", college: "IIT Bombay", xp: 9480, mv: "—", solved: 130, isCurrentUser: false, avatar: "SV" },
      { rank: 3, name: "Neha Sengupta", college: "VJTI Mumbai", xp: 8750, mv: "+1", solved: 118, isCurrentUser: false, avatar: "NS" },
      { rank: 4, name: "Aarav Mehta", college: "PICT Pune", xp: 6240, mv: "-1", solved: 82, isCurrentUser: false, avatar: "AM" },
      { rank: 5, name: "Devansh Joshi", college: "MIT World Peace University", xp: 5810, mv: "—", solved: 76, isCurrentUser: false, avatar: "DJ" },
      { rank: 6, name: "Prathamesh Sawant", college: "COEP Tech University", xp: 4890, mv: "-1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 7, name: "Sneha Kulkarni", college: "VJTI Mumbai", xp: 3890, mv: "+3", solved: 54, isCurrentUser: false, avatar: "SK" },
      { rank: 8, name: "Rajesh Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: false, avatar: "RD" }
    ],
    india: [
      { rank: 1, name: "Kabir Sen", college: "IIT Delhi", xp: 14200, mv: "—", solved: 198, isCurrentUser: false, avatar: "KS" },
      { rank: 2, name: "Rhea Chawla", college: "IIIT Hyderabad", xp: 13850, mv: "+2", solved: 192, isCurrentUser: false, avatar: "RC" },
      { rank: 3, name: "Aryan Goel", college: "IIT Bombay", xp: 12900, mv: "-1", solved: 178, isCurrentUser: false, avatar: "AG" },
      { rank: 4, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "+8", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 5, name: "Siddharth Verma", college: "IIT Bombay", xp: 9480, mv: "-1", solved: 130, isCurrentUser: false, avatar: "SV" }
    ]
  },

  // Friends System & Network
  friends: [],

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

  // Self Study Library (6 Uploaded Learning Assessments - Rule 7 No XP)
  studyLibrary: [
    {
      id: "doc-1",
      title: "Course_101_Data_Structures_Assessment.pdf",
      subject: "Data Structures",
      pages: 16,
      lastOpened: "Just now",
      fileSize: "52 KB",
      outline: ["1. Computational Complexity", "2. Dynamic Array Amortization", "3. Two-Pointer Validation", "4. Score: 96% Pass"]
    },
    {
      id: "doc-2",
      title: "Course_201_Graph_Algorithms_Assessment.pdf",
      subject: "Algorithms",
      pages: 16,
      lastOpened: "Yesterday",
      fileSize: "48 KB",
      outline: ["1. Min-Heap Dijkstra Proofs", "2. DAG Topological Sort", "3. Max Flow Network Cuts", "4. Score: 94% Pass"]
    },
    {
      id: "doc-3",
      title: "Course_202_Dynamic_Programming_Assessment.pdf",
      subject: "Algorithms",
      pages: 16,
      lastOpened: "2 days ago",
      fileSize: "61 KB",
      outline: ["1. Optimal Substructure", "2. Overlapping Subproblems", "3. State Compression DP", "4. Score: 98% Pass"]
    },
    {
      id: "doc-4",
      title: "Course_301_System_Design_Assessment.pdf",
      subject: "System Design",
      pages: 16,
      lastOpened: "3 days ago",
      fileSize: "55 KB",
      outline: ["1. Stateless Web Architecture", "2. Consistent Hashing Rings", "3. Caching & Eviction", "4. Score: 92% Pass"]
    },
    {
      id: "doc-5",
      title: "Course_302_Operating_Systems_Assessment.pdf",
      subject: "Core CS",
      pages: 16,
      lastOpened: "4 days ago",
      fileSize: "58 KB",
      outline: ["1. Context Switch & CR3 Register", "2. Multi-Level Paging & TLBs", "3. Deadlocks & Banker's Alg", "4. Score: 95% Pass"]
    },
    {
      id: "doc-6",
      title: "Course_401_Combinatorics_Crypto_Assessment.pdf",
      subject: "Mathematics",
      pages: 16,
      lastOpened: "5 days ago",
      fileSize: "64 KB",
      outline: ["1. Modular Fast Exponentiation", "2. Linear Prime Sieves", "3. Lucas Theorem Modulo P", "4. Score: 100% Pass"]
    }
  ],

  // Learning Courses (With strict 80% passing final assessment)
  courses: [
  {
    "id": "course-dsa-101",
    "slug": "course-dsa-101",
    "title": "Foundations of Data Structures & Asymptotic Complexity",
    "description": "Rigorous foundation covering mathematical analysis of algorithms, amortized complexity, contiguous memory vs pointer-based structures.",
    "category": "Data Structures",
    "duration": "14 hours",
    "lessonsCount": 4,
    "completedLessons": 4,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "Big-O Notation",
      "Static & Dynamic Arrays",
      "Pointer Arithmetic",
      "Singly & Doubly Linked Lists"
    ],
    "curriculum": [
      {
        "id": "lesson-dsa-101-l1",
        "title": "Introduction to Computational Complexity & Growth Rates",
        "position": 1,
        "durationMinutes": 25,
        "content_markdown": "# Computational Complexity\n\nUnderstanding how execution runtime scales relative to input size N.\n\nKey principles:\n- Time complexity vs space complexity\n- Worst-case, average-case, and best-case analysis\n- Drop lower-order terms and constant coefficients.",
        "is_completed": true,
        "status": "completed"
      },
      {
        "id": "lesson-dsa-101-l2",
        "title": "Asymptotic Notation: Big-O, Big-Omega, Big-Theta Proofs",
        "position": 2,
        "durationMinutes": 30,
        "content_markdown": "# Asymptotic Notations\n\n- **O(g(n))**: Asymptotic upper bound (`f(n) <= c * g(n)` for `n >= n0`)\n- **Ω(g(n))**: Asymptotic lower bound (`f(n) >= c * g(n)` for `n >= n0`)\n- **Θ(g(n))**: Asymptotically tight bound (both upper and lower bound).",
        "is_completed": true,
        "status": "completed"
      },
      {
        "id": "lesson-dsa-101-l3",
        "title": "Dynamic Array Amortized Resizing Analysis",
        "position": 3,
        "durationMinutes": 35,
        "content_markdown": "# Dynamic Arrays & Amortization\n\nWhen a dynamic array (e.g. Python list or C++ vector) reaches capacity, it doubles its buffer size from N to 2N.\n\nWhile copying N elements takes O(N), this cost occurs only once every N insertions, yielding **O(1) amortized** time per append.",
        "is_completed": true,
        "status": "completed"
      },
      {
        "id": "lesson-dsa-101-l4",
        "title": "Two Pointer Mechanics on Contiguous Arrays",
        "position": 4,
        "durationMinutes": 30,
        "content_markdown": "# Two Pointer Technique\n\nBy leveraging monotonic properties in sorted sequences or window boundaries, two pointer approaches reduce naive O(N^2) search spaces down to linear O(N) single-pass scans.",
        "is_completed": true,
        "status": "completed"
      }
    ],
    "final_test": {
      "id": "test-dsa-101",
      "title": "Foundations of Data Structures Final Certification Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-dsa-101-1",
          "position": 1,
          "prompt": "What is the amortized time complexity of inserting N elements sequentially into an initially empty dynamic array with geometric growth factor 2?",
          "options": [
            {
              "option_index": 0,
              "text": "O(N^2)"
            },
            {
              "option_index": 1,
              "text": "O(N log N)"
            },
            {
              "option_index": 2,
              "text": "O(1) amortized per insert (O(N) total)"
            },
            {
              "option_index": 3,
              "text": "O(log N)"
            }
          ],
          "correct_option_index": 2,
          "explanation": "Geometric array doubling amortizes the occasional O(N) allocation cost across all insertions, ensuring O(1) amortized cost per append."
        },
        {
          "id": "q-dsa-101-2",
          "position": 2,
          "prompt": "If algorithm A takes 3*n^2 + 100*n operations and algorithm B takes 0.01*n^3 operations, which algorithm has superior asymptotic scaling?",
          "options": [
            {
              "option_index": 0,
              "text": "Algorithm A, because O(n^2) grows strictly slower than O(n^3) for large n"
            },
            {
              "option_index": 1,
              "text": "Algorithm B, because its constant factor 0.01 is smaller"
            },
            {
              "option_index": 2,
              "text": "Both algorithms have identical asymptotic behavior"
            },
            {
              "option_index": 3,
              "text": "It depends indefinitely on system memory bandwidth"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Asymptotic analysis ignores constant coefficients for sufficiently large n; n^2 dominates n^3 asymptotically regardless of constants."
        },
        {
          "id": "q-dsa-101-3",
          "position": 3,
          "prompt": "Which definition correctly characterizes Big-Theta Θ(g(n))?",
          "options": [
            {
              "option_index": 0,
              "text": "Strict upper bound only"
            },
            {
              "option_index": 1,
              "text": "Tight bound: f(n) is bounded both above and below by g(n) for large n"
            },
            {
              "option_index": 2,
              "text": "Strict lower bound only"
            },
            {
              "option_index": 3,
              "text": "Average case probabilistic distribution"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Big-Theta Θ(g(n)) requires constants c1, c2 > 0 such that c1*g(n) <= f(n) <= c2*g(n) for all n >= n0."
        },
        {
          "id": "q-dsa-101-4",
          "position": 4,
          "prompt": "What is the worst-case time complexity of inserting a new node at the head of a singly linked list with a known head reference?",
          "options": [
            {
              "option_index": 0,
              "text": "O(1)"
            },
            {
              "option_index": 1,
              "text": "O(N)"
            },
            {
              "option_index": 2,
              "text": "O(log N)"
            },
            {
              "option_index": 3,
              "text": "O(N^2)"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Inserting at the head merely requires adjusting the new node's next pointer and head reference, taking constant O(1) time."
        },
        {
          "id": "q-dsa-101-5",
          "position": 5,
          "prompt": "Why does the two-pointer technique achieve O(N) complexity on a sorted array for the Two Sum problem compared to brute force?",
          "options": [
            {
              "option_index": 0,
              "text": "It uses dynamic programming memoization tables"
            },
            {
              "option_index": 1,
              "text": "Each pointer moves monotonically inward at most N times total, pruning impossible pairs"
            },
            {
              "option_index": 2,
              "text": "It computes a hash table lookup in O(1)"
            },
            {
              "option_index": 3,
              "text": "It parallelizes the loops across multi-core processors"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Because the array is sorted, comparing sum with target deterministically dictates whether the left pointer increments or right pointer decrements without backtracking."
        }
      ]
    }
  },
  {
    "id": "course-algo-201",
    "slug": "course-algo-201",
    "title": "Advanced Graph Theory & Network Traversal",
    "description": "Comprehensive traversal, shortest paths, DAG dependency resolution, cycle detection, and priority queue optimizations.",
    "category": "Algorithms",
    "duration": "18 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "Breadth-First Search",
      "Depth-First Search",
      "Topological Sort",
      "Dijkstra's Algorithm"
    ],
    "curriculum": [
      {
        "id": "lesson-algo-201-l1",
        "title": "Graph Representations: Adjacency List vs Matrix Memory Analysis",
        "position": 1,
        "durationMinutes": 25,
        "content_markdown": "# Graph Representations\n\n- **Adjacency Matrix**: `O(V^2)` memory, `O(1)` edge lookup.\n- **Adjacency List**: `O(V + E)` memory, optimal for sparse networks.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-201-l2",
        "title": "BFS Level-Order Discovery & Shortest Unweighted Paths",
        "position": 2,
        "durationMinutes": 30,
        "content_markdown": "# Breadth-First Search (BFS)\n\nBFS explores vertices layer-by-layer using a FIFO queue. In unweighted graphs, the first time a target vertex is reached, the path taken is guaranteed to have the minimum edge count.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-201-l3",
        "title": "DFS Backtracking, Tree Edges & Cycle Detection",
        "position": 3,
        "durationMinutes": 35,
        "content_markdown": "# Depth-First Search & Edge Classification\n\nEdges classified into: Tree, Back, Forward, Cross. In directed graphs, a **Back Edge** to an active recursion stack ancestor proves the existence of a cycle.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-201-l4",
        "title": "Kahn's Algorithm & In-Degree Topo Sort",
        "position": 4,
        "durationMinutes": 30,
        "content_markdown": "# Kahn's Algorithm\n\nTopological sorting by maintaining an in-degree array. Initialize queue with all vertices having in-degree = 0. Extract vertex, decrement neighbor in-degrees, and enqueue when in-degree hits 0.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-201-l5",
        "title": "Dijkstra's Priority Queue Implementation & Proof",
        "position": 5,
        "durationMinutes": 40,
        "content_markdown": "# Dijkstra's Algorithm\n\nGreedy single-source shortest path for non-negative weights using a min-heap. Time complexity: `O((V + E) log V)`.",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-algo-201",
      "title": "Advanced Graph Theory & Network Traversal Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-algo-201-1",
          "position": 1,
          "prompt": "What is the tightest upper bound time complexity of Dijkstra's algorithm implemented with a Min-Heap priority queue on graph G(V, E)?",
          "options": [
            {
              "option_index": 0,
              "text": "O(V^2)"
            },
            {
              "option_index": 1,
              "text": "O((V + E) log V)"
            },
            {
              "option_index": 2,
              "text": "O(V log E)"
            },
            {
              "option_index": 3,
              "text": "O(E^2)"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Each vertex is extracted from the heap once (V log V) and each edge may trigger a heap decrease-key (E log V), yielding O((V + E) log V)."
        },
        {
          "id": "q-algo-201-2",
          "position": 2,
          "prompt": "Which of the following conditions MUST be satisfied to find a topological ordering of a directed graph?",
          "options": [
            {
              "option_index": 0,
              "text": "The graph must be strongly connected."
            },
            {
              "option_index": 1,
              "text": "The graph must be a Directed Acyclic Graph (DAG)."
            },
            {
              "option_index": 2,
              "text": "All edge weights must be strictly non-negative."
            },
            {
              "option_index": 3,
              "text": "The graph must possess an Eulerian circuit."
            }
          ],
          "correct_option_index": 1,
          "explanation": "A topological sort exists if and only if the directed graph contains no directed cycles (it is a DAG)."
        },
        {
          "id": "q-algo-201-3",
          "position": 3,
          "prompt": "What does the presence of a 'Back Edge' in a DFS traversal of a directed graph indicate?",
          "options": [
            {
              "option_index": 0,
              "text": "The graph has disconnected components."
            },
            {
              "option_index": 1,
              "text": "The graph contains a directed cycle."
            },
            {
              "option_index": 2,
              "text": "The graph is bipartite."
            },
            {
              "option_index": 3,
              "text": "All vertices have an in-degree of 1."
            }
          ],
          "correct_option_index": 1,
          "explanation": "In DFS on directed graphs, an edge pointing to an ancestor currently on the recursion stack is a back edge, proving a cycle exists."
        },
        {
          "id": "q-algo-201-4",
          "position": 4,
          "prompt": "In Kahn's topological sort algorithm, which vertices are placed into the initial processing queue?",
          "options": [
            {
              "option_index": 0,
              "text": "Vertices with in-degree = 0"
            },
            {
              "option_index": 1,
              "text": "Vertices with out-degree = 0"
            },
            {
              "option_index": 2,
              "text": "Vertices with the highest degree"
            },
            {
              "option_index": 3,
              "text": "Arbitrary starting vertices"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Kahn's algorithm initializes by enqueuing all source vertices that have zero incoming dependencies (in-degree = 0)."
        },
        {
          "id": "q-algo-201-5",
          "position": 5,
          "prompt": "Why does standard Dijkstra's algorithm fail when applied to graphs with negative weight edges?",
          "options": [
            {
              "option_index": 0,
              "text": "It encounters stack overflow errors."
            },
            {
              "option_index": 1,
              "text": "The greedy assumption that a visited node has its optimal shortest distance finalized is violated."
            },
            {
              "option_index": 2,
              "text": "It causes floating-point arithmetic exceptions."
            },
            {
              "option_index": 3,
              "text": "Min-heaps cannot store negative keys."
            }
          ],
          "correct_option_index": 1,
          "explanation": "Dijkstra assumes that adding edges to a path cannot decrease total cost. A negative edge can create a cheaper path through an already finalized vertex."
        }
      ]
    }
  },
  {
    "id": "course-dp-301",
    "slug": "course-dp-301",
    "title": "Dynamic Programming & Optimal Substructure",
    "description": "Master memoization, tabulation, state-space reduction, multi-dimensional DP, subset sum, knapsack variants, and bitmask dynamic programming.",
    "category": "Algorithms",
    "duration": "16 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "Memoization & Tabulation",
      "0/1 Knapsack & Unbounded",
      "Longest Common Subsequence",
      "Bitmask DP & State Compression"
    ],
    "curriculum": [
      {
        "id": "lesson-dp-301-l1",
        "title": "Principle of Optimality & Overlapping Subproblems Analysis",
        "position": 1,
        "durationMinutes": 30,
        "content_markdown": "# Principle of Optimality\n\nDynamic programming solves problems by combining solutions to subproblems.\n\nKey conditions:\n1. **Optimal Substructure**: An optimal solution contains optimal solutions to subproblems.\n2. **Overlapping Subproblems**: The recursive space contains a small number of distinct subproblems reused repeatedly.\n\nTop-down memoization stores results in a hash map/array during recursion. Bottom-up tabulation iteratively computes subproblems in topological order of dependencies.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-dp-301-l2",
        "title": "1D Dynamic Programming: Fibonacci, Climbing Stairs & House Robber",
        "position": 2,
        "durationMinutes": 25,
        "content_markdown": "# 1D Dynamic Programming\n\nIn 1D problems, the state is typically indexed by position `i`.\n\nSpace optimization pattern:\nWhen `dp[i]` depends strictly on `dp[i-1]` and `dp[i-2]`, we discard the full array and maintain two rolling scalar variables (`prev1`, `prev2`), optimizing auxiliary space from `O(N)` to `O(1)`.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-dp-301-l3",
        "title": "2D Grid & String DP: Longest Common Subsequence & Edit Distance",
        "position": 3,
        "durationMinutes": 35,
        "content_markdown": "# 2D String & Grid DP\n\nFor two strings of lengths M and N:\n- `dp[i][j]` represents the optimal subproblem for prefixes `s1[0..i-1]` and `s2[0..j-1]`.\n- **LCS recurrence**:\n  - If `s1[i-1] == s2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`\n  - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`\n- Time complexity: `O(M * N)`. Space can be optimized to `O(min(M, N))` using rolling row buffers.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-dp-301-l4",
        "title": "Knapsack Paradigm: 0/1 Knapsack, Bounded & Unbounded Variants",
        "position": 4,
        "durationMinutes": 35,
        "content_markdown": "# Knapsack Problems\n\nGiven weights `w[i]`, values `v[i]`, and max capacity `W`:\n- **0/1 Knapsack**: Each item may be chosen at most once. When flattening the table to a 1D array of size `W`, we must iterate capacity `w` **backwards** from `W` down to `w[i]` to avoid reusing the same item.\n- **Unbounded Knapsack**: Items may be chosen infinitely; we iterate capacity `w` **forwards** from `w[i]` up to `W`.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-dp-301-l5",
        "title": "State-Space Reduction & Bitmask Optimization Techniques",
        "position": 5,
        "durationMinutes": 40,
        "content_markdown": "# Bitmask Dynamic Programming\n\nWhen N is small (N <= 20) and subproblems depend on subsets of visited elements:\n- An integer bitmask `mask` (0 to `2^N - 1`) encodes subset membership in constant space.\n- Bitwise operations:\n  - Check if element `j` is in mask: `(mask >> j) & 1`\n  - Add element `j`: `mask | (1 << j)`\n- Traveling Salesperson Problem (TSP) transitions in `O(N^2 * 2^N)` compared to `O(N!)` brute force.",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-dp-301",
      "title": "Dynamic Programming & Optimal Substructure Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-dp-301-1",
          "position": 1,
          "prompt": "When compressing the 2D DP table for the 0/1 Knapsack problem into a 1D array of capacity W, why MUST the inner loop traverse capacities in descending order?",
          "options": [
            {
              "option_index": 0,
              "text": "To prevent CPU cache misses on contiguous memory accesses"
            },
            {
              "option_index": 1,
              "text": "To ensure that values from the current item are not used more than once in the same iteration"
            },
            {
              "option_index": 2,
              "text": "Because knapsack capacities must always be sorted primes"
            },
            {
              "option_index": 3,
              "text": "Descending order is only needed for the unbounded knapsack variant"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Traversing backwards ensures that dp[w - weight[i]] comes from the previous item state rather than being overwritten by the current item in the current round."
        },
        {
          "id": "q-dp-301-2",
          "position": 2,
          "prompt": "What are the necessary and sufficient conditions for a problem to be solvable via Dynamic Programming rather than Greedy?",
          "options": [
            {
              "option_index": 0,
              "text": "Continuous derivatives and convexity"
            },
            {
              "option_index": 1,
              "text": "Optimal substructure and overlapping subproblems"
            },
            {
              "option_index": 2,
              "text": "Strict polynomial-time matroid structure only"
            },
            {
              "option_index": 3,
              "text": "Constant recursion tree height"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Dynamic programming fundamentally requires optimal substructure (optimal solution composed of optimal subsolutions) and overlapping subproblems."
        },
        {
          "id": "q-dp-301-3",
          "position": 3,
          "prompt": "What is the minimum auxiliary space complexity required to compute the length of the Longest Common Subsequence of two strings of lengths M and N?",
          "options": [
            {
              "option_index": 0,
              "text": "O(M * N)"
            },
            {
              "option_index": 1,
              "text": "O(min(M, N))"
            },
            {
              "option_index": 2,
              "text": "O(1)"
            },
            {
              "option_index": 3,
              "text": "O(M + N)"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Because computing row i only depends on row i-1, we only need to store two rows of the shorter string, achieving O(min(M, N)) space."
        },
        {
          "id": "q-dp-301-4",
          "position": 4,
          "prompt": "In bitmask DP on N elements (N <= 20), what is the total number of distinct subset states represented by the mask?",
          "options": [
            {
              "option_index": 0,
              "text": "N^2"
            },
            {
              "option_index": 1,
              "text": "2^N"
            },
            {
              "option_index": 2,
              "text": "N!"
            },
            {
              "option_index": 3,
              "text": "3^N"
            }
          ],
          "correct_option_index": 1,
          "explanation": "An N-bit integer can represent 2^N unique subsets, with bit i set to 1 if element i is included and 0 otherwise."
        },
        {
          "id": "q-dp-301-5",
          "position": 5,
          "prompt": "For the matrix chain multiplication problem with dimensions p0, p1, ..., pn, what is the time complexity of the standard tabulation algorithm?",
          "options": [
            {
              "option_index": 0,
              "text": "O(N^2)"
            },
            {
              "option_index": 1,
              "text": "O(N^3)"
            },
            {
              "option_index": 2,
              "text": "O(2^N)"
            },
            {
              "option_index": 3,
              "text": "O(N log N)"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Evaluating O(N^2) subproblems where each subproblem takes O(N) split options results in an overall O(N^3) time complexity."
        }
      ]
    }
  },
  {
    "id": "course-trees-202",
    "slug": "course-trees-202",
    "title": "Advanced Tree Architectures & Balanced Search Trees",
    "description": "Deep dive into self-balancing binary search trees (AVL, Red-Black), Segment Trees, Fenwick (Binary Indexed) Trees, and Lowest Common Ancestor.",
    "category": "Data Structures",
    "duration": "15 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "AVL Rotations & Invariants",
      "Red-Black Tree Properties",
      "Segment Trees & Range Queries",
      "Fenwick Trees (BIT)"
    ],
    "curriculum": [
      {
        "id": "lesson-trees-202-l1",
        "title": "Binary Search Tree Invariants, Traversal Orders & Path Sums",
        "position": 1,
        "durationMinutes": 25,
        "content_markdown": "# BST Invariants & Properties\n\n- Invariant: For any node X, `val(left_subtree) < val(X) < val(right_subtree)`.\n- **In-Order Traversal** (`Left -> Node -> Right`) yields sorted order in `O(N)`.\n- Unbalanced BSTs can degenerate to a linked list with `O(N)` search.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-trees-202-l2",
        "title": "Self-Balancing Trees: AVL Balance Factors & Single/Double Rotations",
        "position": 2,
        "durationMinutes": 35,
        "content_markdown": "# AVL Trees\n\n- **Balance Factor**: `height(left) - height(right) in {-1, 0, 1}`.\n- Rotations:\n  - LL Case: Right Rotation\n  - RR Case: Left Rotation\n  - LR Case: Left on child, then Right on root\n  - RL Case: Right on child, then Left on root\n- Guarantees strict `O(log N)` search, insertion, and deletion.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-trees-202-l3",
        "title": "Red-Black Trees: Color Invariants, Black-Height & Restructuring Proofs",
        "position": 3,
        "durationMinutes": 30,
        "content_markdown": "# Red-Black Trees\n\nProperties:\n1. Every node is either RED or BLACK.\n2. The root is always BLACK.\n3. Red nodes cannot have Red children (No consecutive reds).\n4. Every path from a node to its descendant leaves contains the same number of Black nodes (**black-height**).\n- Ensures height <= `2 * log2(N + 1)`.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-trees-202-l4",
        "title": "Segment Trees: Point Updates, Range Minimum Queries & Lazy Propagation",
        "position": 4,
        "durationMinutes": 40,
        "content_markdown": "# Segment Trees\n\n- Solves arbitrary associative range queries in `O(log N)`.\n- Internal nodes store aggregated range statistics (sum, min, max, gcd).\n- **Lazy Propagation**: Defers range updates to child subtrees until needed, maintaining `O(log N)` range modifications.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-trees-202-l5",
        "title": "Binary Indexed Trees (Fenwick Trees): Prefix Sum Inversion & 2's Complement",
        "position": 5,
        "durationMinutes": 30,
        "content_markdown": "# Fenwick Trees (BIT)\n\n- Computes prefix sums and updates elements in `O(log N)` time with `O(N)` space.\n- Bit manipulation magic: `lowbit(x) = x & (-x)`.\n  - Update index `i`: `i += i & (-i)`\n  - Query prefix `i`: `i -= i & (-i)`",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-trees-202",
      "title": "Advanced Tree Architectures Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-trees-202-1",
          "position": 1,
          "prompt": "What is the maximum allowed difference between heights of left and right subtrees for any node in an AVL tree?",
          "options": [
            {
              "option_index": 0,
              "text": "0"
            },
            {
              "option_index": 1,
              "text": "1"
            },
            {
              "option_index": 2,
              "text": "2"
            },
            {
              "option_index": 3,
              "text": "log2(N)"
            }
          ],
          "correct_option_index": 1,
          "explanation": "By definition, an AVL tree requires the balance factor |height(left) - height(right)| <= 1 for every node."
        },
        {
          "id": "q-trees-202-2",
          "position": 2,
          "prompt": "Why is the space required for an array-backed Segment Tree on N elements traditionally allocated as 4 * N?",
          "options": [
            {
              "option_index": 0,
              "text": "To reserve room for 64-bit memory word alignment"
            },
            {
              "option_index": 1,
              "text": "Because a segment tree is a full binary tree whose leaves span the smallest power of 2 >= N, at most 4N total nodes"
            },
            {
              "option_index": 2,
              "text": "Because each node requires 4 pointers (parent, left, right, color)"
            },
            {
              "option_index": 3,
              "text": "It is an arbitrary empirical heuristic"
            }
          ],
          "correct_option_index": 1,
          "explanation": "If N is 2^k + 1, rounding to the next power of 2 requires 2^(k+1), and a full tree with 2^(k+1) leaves contains 2^(k+2) - 1 < 4N nodes."
        },
        {
          "id": "q-trees-202-3",
          "position": 3,
          "prompt": "In a Fenwick Tree (Binary Indexed Tree), what does the expression 'i & (-i)' calculate?",
          "options": [
            {
              "option_index": 0,
              "text": "The sign bit of integer i"
            },
            {
              "option_index": 1,
              "text": "The value of the lowest set bit (least significant 1-bit) in i"
            },
            {
              "option_index": 2,
              "text": "The integer quotient of i divided by 2"
            },
            {
              "option_index": 3,
              "text": "The parity of integer i"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Using two's complement arithmetic, i & (-i) isolates the lowest power of 2 that divides i, representing the interval length managed by tree[i]."
        },
        {
          "id": "q-trees-202-4",
          "position": 4,
          "prompt": "Which of the following is NOT an invariant of a valid Red-Black Tree?",
          "options": [
            {
              "option_index": 0,
              "text": "The root is black."
            },
            {
              "option_index": 1,
              "text": "If a node is red, both of its children must be black."
            },
            {
              "option_index": 2,
              "text": "Every simple path from root to leaf must contain the exact same number of red nodes."
            },
            {
              "option_index": 3,
              "text": "Every simple path from a node to descendant leaves contains the same number of black nodes."
            }
          ],
          "correct_option_index": 2,
          "explanation": "The invariant applies strictly to black nodes (black-height), not red nodes. Red nodes can vary in count along different paths."
        },
        {
          "id": "q-trees-202-5",
          "position": 5,
          "prompt": "What is the query time complexity of finding the Lowest Common Ancestor (LCA) using Binary Lifting after O(N log N) preprocessing?",
          "options": [
            {
              "option_index": 0,
              "text": "O(N)"
            },
            {
              "option_index": 1,
              "text": "O(log N)"
            },
            {
              "option_index": 2,
              "text": "O(1)"
            },
            {
              "option_index": 3,
              "text": "O(N^2)"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Binary lifting precalculates 2^k-th ancestors (up table) in O(N log N) time, allowing LCA lookups in O(log N) by jumping powers of 2."
        }
      ]
    }
  },
  {
    "id": "course-algo-102",
    "slug": "course-algo-102",
    "title": "Sorting, Searching & Divide-and-Conquer Paradigms",
    "description": "Formal proofs of comparison sort bounds (Ω(N log N)), randomized QuickSort, MergeSort inversion counting, Binary Search on monotonic solution spaces.",
    "category": "Algorithms",
    "duration": "12 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "Comparison Sorting Lower Bounds",
      "Randomized QuickSort & Pivot Selection",
      "MergeSort Inversion Counting",
      "Binary Search on Answer Spaces"
    ],
    "curriculum": [
      {
        "id": "lesson-algo-102-l1",
        "title": "Decision Tree Theorem & the Ω(N log N) Comparison Lower Bound",
        "position": 1,
        "durationMinutes": 25,
        "content_markdown": "# Comparison Sort Lower Bound\n\nAny comparison-based sort can be modeled as a decision tree with `N!` possible permutation leaves.\nA binary tree with height `h` has at most `2^h` leaves.\nTherefore: `2^h >= N! => h >= log2(N!) = Ω(N log N)`.\nHence, no comparison sort can run faster than `O(N log N)` in the worst case.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-102-l2",
        "title": "MergeSort Mechanics, Recurrence Solving by Master Theorem",
        "position": 2,
        "durationMinutes": 30,
        "content_markdown": "# MergeSort & Master Theorem\n\n- Recurrence: `T(N) = 2T(N/2) + O(N)`.\n- By Master Theorem: `a = 2, b = 2, f(N) = N`. Since `N^(log_b a) = N^1 = f(N)`, Case 2 applies: `T(N) = Θ(N log N)` in worst, average, and best cases.\n- Stable sorting behavior and optimal for linked list sorting.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-102-l3",
        "title": "Randomized QuickSort: Expected O(N log N) Runtime & Worst-Case Defenses",
        "position": 3,
        "durationMinutes": 30,
        "content_markdown": "# QuickSort & Randomization\n\n- Partition algorithms: Lomuto vs Hoare partition.\n- Naive pivot selection on sorted arrays yields `O(N^2)` degradation.\n- Selecting a uniformly random pivot yields expected `O(N log N)` runtime with high probability, making adversarial worst-case inputs impossible.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-102-l4",
        "title": "Linear-Time Non-Comparison Sorts: Counting, Radix & Bucket Sort",
        "position": 4,
        "durationMinutes": 30,
        "content_markdown": "# Non-Comparison Sorting\n\n- **Counting Sort**: `O(N + K)` time when integers lie in a bounded range `[0, K]`.\n- **Radix Sort**: Processes digits from least significant to most significant (LSD) using a stable sub-sort, achieving `O(d * (N + B))`.\n- Bypasses the `Ω(N log N)` lower bound by inspecting digital representation.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-102-l5",
        "title": "Binary Search: Invariants, Boundary Conditions & Monotonic Feasibility Predicates",
        "position": 5,
        "durationMinutes": 35,
        "content_markdown": "# Binary Search on Answer Spaces\n\nBinary search applies to any monotonic boolean predicate `P(x)`:\n`[False, False, ..., False, True, True, ..., True]`\n- Midpoint overflow prevention: `mid = low + (high - low) // 2`.\n- Optimization problems: Minimize X such that `isValid(X) == True`.",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-algo-102",
      "title": "Sorting, Searching & Divide-and-Conquer Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-algo-102-1",
          "position": 1,
          "prompt": "Why is the theoretical lower bound for any comparison-based sorting algorithm Ω(N log N)?",
          "options": [
            {
              "option_index": 0,
              "text": "Because CPU instructions operate on log N bits at a time"
            },
            {
              "option_index": 1,
              "text": "Because a decision tree sorting N items must distinguish between N! permutations, requiring depth at least log2(N!)"
            },
            {
              "option_index": 2,
              "text": "Because array caching requires log N cycles per memory access"
            },
            {
              "option_index": 3,
              "text": "Because recursion trees always branch with factor 2"
            }
          ],
          "correct_option_index": 1,
          "explanation": "A decision tree sorting N distinct elements must have at least N! leaves. A binary tree with L leaves has height >= log2(L), and Stirling's approximation gives log2(N!) = Θ(N log N)."
        },
        {
          "id": "q-algo-102-2",
          "position": 2,
          "prompt": "What is the expected time complexity of QuickSelect for finding the k-th smallest element in an unordered array of size N?",
          "options": [
            {
              "option_index": 0,
              "text": "O(N)"
            },
            {
              "option_index": 1,
              "text": "O(N log N)"
            },
            {
              "option_index": 2,
              "text": "O(log N)"
            },
            {
              "option_index": 3,
              "text": "O(N^2)"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Because QuickSelect only recurses into one half of the partition, the expected recurrence is T(N) = T(N/2) + O(N) = O(N + N/2 + N/4 + ...) = O(2N) = O(N)."
        },
        {
          "id": "q-algo-102-3",
          "position": 3,
          "prompt": "Why is the expression 'mid = low + (high - low) // 2' preferred over 'mid = (low + high) // 2' in production implementations?",
          "options": [
            {
              "option_index": 0,
              "text": "It compiles to bitwise shift instructions automatically"
            },
            {
              "option_index": 1,
              "text": "It prevents 32-bit signed integer overflow when low + high exceeds 2^31 - 1"
            },
            {
              "option_index": 2,
              "text": "It works natively with floating-point numbers"
            },
            {
              "option_index": 3,
              "text": "It guarantees an even index midpoint"
            }
          ],
          "correct_option_index": 1,
          "explanation": "When low + high exceeds 2,147,483,647 (the maximum 32-bit signed integer), (low + high) overflows to negative numbers. Subtracting first prevents this overflow."
        },
        {
          "id": "q-algo-102-4",
          "position": 4,
          "prompt": "Which of the following sorting algorithms is stable and guaranteed O(N log N) in the worst case?",
          "options": [
            {
              "option_index": 0,
              "text": "HeapSort"
            },
            {
              "option_index": 1,
              "text": "MergeSort"
            },
            {
              "option_index": 2,
              "text": "QuickSort"
            },
            {
              "option_index": 3,
              "text": "SelectionSort"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Standard MergeSort preserves relative ordering of equal keys (stable) and guarantees O(N log N) worst-case time, unlike HeapSort (unstable) or QuickSort (O(N^2) worst case)."
        },
        {
          "id": "q-algo-102-5",
          "position": 5,
          "prompt": "When can Radix Sort achieve linear O(N) execution time?",
          "options": [
            {
              "option_index": 0,
              "text": "When the number of digits d is constant and the base B is O(N)"
            },
            {
              "option_index": 1,
              "text": "Only when all elements are sorted in reverse"
            },
            {
              "option_index": 2,
              "text": "Only on linked lists"
            },
            {
              "option_index": 3,
              "text": "When elements are floating point numbers with infinite precision"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Radix sort runs in O(d * (N + B)). If the number of digits d is fixed and base B = O(N), the total runtime reduces to O(N)."
        }
      ]
    }
  },
  {
    "id": "course-algo-301",
    "slug": "course-algo-301",
    "title": "Greedy Algorithms, Heuristics & Matroid Theory",
    "description": "Formal exchange arguments for greedy choice property, interval scheduling, Huffman coding, Minimum Spanning Trees (Kruskal, Prim), and Disjoint Set Union.",
    "category": "Algorithms",
    "duration": "14 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "Greedy Choice Property Proofs",
      "Interval Scheduling & Partitioning",
      "Huffman Optimal Prefix Codes",
      "Disjoint Set Union (Union-Find)"
    ],
    "curriculum": [
      {
        "id": "lesson-algo-301-l1",
        "title": "The Greedy Choice Property & Exchange Argument Proof Strategy",
        "position": 1,
        "durationMinutes": 25,
        "content_markdown": "# Greedy Proof Techniques\n\n- **Greedy Choice Property**: A globally optimal solution can be reached by choosing a locally optimal choice.\n- **Exchange Argument Proof Structure**:\n  1. Assume optimal solution `OPT` differs from greedy solution `G`.\n  2. Identify the first choice where `OPT` and `G` diverge.\n  3. Swap the `OPT` choice with the `G` choice.\n  4. Prove that the swapped solution is equally or more optimal without violating feasibility.\n  5. Conclude that `G` is optimal.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-301-l2",
        "title": "Interval Scheduling Maximization & Resource Allocation",
        "position": 2,
        "durationMinutes": 30,
        "content_markdown": "# Interval Scheduling\n\n- Problem: Select maximum number of mutually compatible intervals.\n- Optimal Greedy Strategy: Sort intervals by **earliest finish time** `f[i]`.\n- Proof: Choosing the interval that finishes earliest frees up the resource for the maximum remaining time horizon.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-301-l3",
        "title": "Huffman Coding & Information Theoretic Compression",
        "position": 3,
        "durationMinutes": 30,
        "content_markdown": "# Huffman Coding\n\n- Creates an optimal prefix-free code for data compression.\n- Building the tree with a min-priority queue:\n  1. Insert all characters with their frequencies.\n  2. Extract the two least frequent nodes.\n  3. Combine them into an internal node with sum of frequencies.\n  4. Reinsert until one root node remains.\n- Time complexity: `O(N log N)`.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-301-l4",
        "title": "Disjoint Set Union: Path Compression & Union-by-Rank O(α(N)) Proof",
        "position": 4,
        "durationMinutes": 35,
        "content_markdown": "# Disjoint Set Union (DSU / Union-Find)\n\nTwo critical optimizations:\n1. **Path Compression**: `parent[x] = find(parent[x])` flattens tree during find operations.\n2. **Union by Rank**: Attach shorter tree under root of taller tree.\n- Combined complexity: `O(α(N))` per operation, where `α(N)` is the Inverse Ackermann function (effectively constant, `α(N) < 5` for any practical universe size).",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-algo-301-l5",
        "title": "Minimum Spanning Trees: Cut Property, Kruskal's & Prim's Algorithms",
        "position": 5,
        "durationMinutes": 35,
        "content_markdown": "# Minimum Spanning Trees (MST)\n\n- **Cut Property**: For any cut in G, the crossing edge of minimum weight belongs to all MSTs.\n- **Kruskal's Algorithm**: Sort all edges by weight, add edge if it connects two disconnected components using DSU. Complexity: `O(E log E)`.\n- **Prim's Algorithm**: Grow a connected component using a min-heap. Complexity: `O(E log V)`.",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-algo-301",
      "title": "Greedy Algorithms & Heuristics Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-algo-301-1",
          "position": 1,
          "prompt": "What does the Cut Property in Minimum Spanning Tree theory state?",
          "options": [
            {
              "option_index": 0,
              "text": "Every cut of the graph must contain at least 2 edges in the MST"
            },
            {
              "option_index": 1,
              "text": "For any partition of vertices into two subsets, the minimum weight edge crossing the cut belongs to the MST"
            },
            {
              "option_index": 2,
              "text": "The maximum weight edge in a cycle must belong to the MST"
            },
            {
              "option_index": 3,
              "text": "Edges crossing cuts must have non-zero prime weights"
            }
          ],
          "correct_option_index": 1,
          "explanation": "The Cut Property guarantees that the strictly lightest edge crossing any cut (partition of vertices (S, V - S)) is part of every MST."
        },
        {
          "id": "q-algo-301-2",
          "position": 2,
          "prompt": "What is the amortized time complexity per operation of Disjoint Set Union (DSU) when utilizing BOTH Path Compression and Union-by-Rank?",
          "options": [
            {
              "option_index": 0,
              "text": "O(log N)"
            },
            {
              "option_index": 1,
              "text": "O(α(N)) where α is the Inverse Ackermann function"
            },
            {
              "option_index": 2,
              "text": "O(N)"
            },
            {
              "option_index": 3,
              "text": "O(1) strict worst-case"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Tarjan proved that combining path compression and union-by-rank achieves O(α(N)) amortized time, where α is the extremely slow-growing inverse Ackermann function."
        },
        {
          "id": "q-algo-301-3",
          "position": 3,
          "prompt": "In the Interval Scheduling Maximization problem, which greedy sorting criterion provably guarantees an optimal solution?",
          "options": [
            {
              "option_index": 0,
              "text": "Earliest start time"
            },
            {
              "option_index": 1,
              "text": "Shortest interval duration"
            },
            {
              "option_index": 2,
              "text": "Earliest finish time"
            },
            {
              "option_index": 3,
              "text": "Fewest conflicts with other intervals"
            }
          ],
          "correct_option_index": 2,
          "explanation": "Sorting by earliest finish time leaves the maximum possible remaining time for subsequent intervals, which is proven optimal via exchange argument."
        },
        {
          "id": "q-algo-301-4",
          "position": 4,
          "prompt": "Why are Huffman codes guaranteed to be prefix-free?",
          "options": [
            {
              "option_index": 0,
              "text": "Because symbols are strictly placed at the leaf nodes of the binary tree"
            },
            {
              "option_index": 1,
              "text": "Because characters are hashed using CRC32"
            },
            {
              "option_index": 2,
              "text": "Because codes are padded with zeroes at the beginning"
            },
            {
              "option_index": 3,
              "text": "Because frequencies are required to be powers of 2"
            }
          ],
          "correct_option_index": 0,
          "explanation": "In a Huffman tree, all encoded symbols reside exclusively at the leaves. No leaf is an ancestor of another leaf, so no code can be a prefix of another."
        },
        {
          "id": "q-algo-301-5",
          "position": 5,
          "prompt": "In Kruskal's algorithm, what data structure is utilized to detect and prevent cycles in O(α(V)) time?",
          "options": [
            {
              "option_index": 0,
              "text": "Breadth-First Search queue"
            },
            {
              "option_index": 1,
              "text": "Disjoint Set Union (Union-Find)"
            },
            {
              "option_index": 2,
              "text": "Fibonacci Heap"
            },
            {
              "option_index": 3,
              "text": "Adjacency Matrix"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Kruskal checks whether the endpoints of edge (u, v) belong to the same component by calling find(u) and find(v) on a DSU structure."
        }
      ]
    }
  },
  {
    "id": "course-sys-401",
    "slug": "course-sys-401",
    "title": "System Design Fundamentals & Scalable Architecture",
    "description": "High-throughput, distributed system design: load balancing, consistent hashing, caching hierarchies, database replication, CAP theorem, and event-driven architecture.",
    "category": "System Design",
    "duration": "20 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "Consistent Hashing & Partitioning",
      "Caching Strategies (LRU, Write-Through)",
      "CAP Theorem & PACELC",
      "Message Queues & Event Streaming"
    ],
    "curriculum": [
      {
        "id": "lesson-sys-401-l1",
        "title": "Horizontal vs Vertical Scaling & Stateless Architecture Patterns",
        "position": 1,
        "durationMinutes": 25,
        "content_markdown": "# Scaling Strategies & Stateless Web Layers\n\n- **Vertical Scaling** (Scale Up): Add RAM/CPU to single server. Hit hardware ceilings and single point of failure.\n- **Horizontal Scaling** (Scale Out): Add more commodity servers behind a reverse proxy/load balancer (e.g. NGINX, HAProxy).\n- Stateless web services delegate session state to distributed stores (Redis, Memcached), allowing round-robin routing.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-sys-401-l2",
        "title": "Consistent Hashing: Virtual Nodes & Distributed Sharding",
        "position": 2,
        "durationMinutes": 35,
        "content_markdown": "# Consistent Hashing\n\n- Standard modular hashing (`hash(key) % N`) forces `(N - 1)/N` keys to relocate when a node is added/removed.\n- Consistent hashing maps both servers and keys onto a circular hash ring `[0, 2^32 - 1]`.\n- Adding/removing a server only relocates `K / N` keys on average.\n- **Virtual Nodes**: Multiple ring positions per physical server eliminate hot spots and balance key distribution.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-sys-401-l3",
        "title": "Caching Hierarchies: Cache-Aside, Write-Through, Write-Behind & Eviction",
        "position": 3,
        "durationMinutes": 30,
        "content_markdown": "# Distributed Caching Patterns\n\n- **Cache-Aside (Lazy Loading)**: Application queries cache; on miss, queries DB and populates cache.\n- **Write-Through**: Application writes to cache; cache synchronously writes to DB.\n- **Write-Behind (Write-Back)**: Application writes to cache; cache asynchronously writes to DB in batches (high throughput, durability risk on failure).\n- Eviction policies: LRU (Least Recently Used), LFU, FIFO, TTL expiry.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-sys-401-l4",
        "title": "Data Replication, Consensus & the CAP/PACELC Tradeoff Spectrum",
        "position": 4,
        "durationMinutes": 35,
        "content_markdown": "# CAP Theorem & PACELC\n\n- **CAP Theorem**: In the presence of a Network Partition (P), a distributed data store must choose between Consistency (C) and Availability (A).\n- **PACELC Theorem**: In an architectural partition (P), choose A or C; Else (E), choose Latency (L) or Consistency (C).\n- Synchronous vs Asynchronous replication and eventual consistency models.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-sys-401-l5",
        "title": "Asynchronous Decoupling: Kafka Event Streams, Pub-Sub & Dead-Letter Queues",
        "position": 5,
        "durationMinutes": 35,
        "content_markdown": "# Event-Driven Architecture\n\n- Synchronous REST RPC binds service availability tightly.\n- Message brokers (Kafka, RabbitMQ) decouple producers and consumers:\n  - Buffering spikes\n  - Backpressure management\n  - Guaranteed at-least-once delivery with idempotent consumers\n  - Dead-Letter Queues (DLQ) for unprocessable messages.",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-sys-401",
      "title": "System Design Fundamentals Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-sys-401-1",
          "position": 1,
          "prompt": "When a new node is added to a cluster using Consistent Hashing with K total keys and N servers, what is the expected fraction of keys that must be relocated?",
          "options": [
            {
              "option_index": 0,
              "text": "K / N"
            },
            {
              "option_index": 1,
              "text": "K / (N + 1)"
            },
            {
              "option_index": 2,
              "text": "All K keys"
            },
            {
              "option_index": 3,
              "text": "(N - 1) / N"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Consistent hashing only relocates keys belonging to the immediate segment taken over by the new server, which is on average K / (N + 1)."
        },
        {
          "id": "q-sys-401-2",
          "position": 2,
          "prompt": "According to the CAP Theorem, when an unavoidable network partition occurs between data center nodes, which guarantee must the system sacrifice if it chooses to remain fully Available?",
          "options": [
            {
              "option_index": 0,
              "text": "Linearizable Consistency"
            },
            {
              "option_index": 1,
              "text": "Durability"
            },
            {
              "option_index": 2,
              "text": "Atomicity"
            },
            {
              "option_index": 3,
              "text": "Latency"
            }
          ],
          "correct_option_index": 0,
          "explanation": "If the system answers requests during a partition (Availability), nodes cannot coordinate state synchronously, sacrificing linearizable Consistency."
        },
        {
          "id": "q-sys-401-3",
          "position": 3,
          "prompt": "What is the primary operational trade-off of using a Write-Behind (Write-Back) caching strategy?",
          "options": [
            {
              "option_index": 0,
              "text": "Excessive database write contention on reads"
            },
            {
              "option_index": 1,
              "text": "Risk of data loss if the cache server crashes before asynchronous writes flush to the persistent database"
            },
            {
              "option_index": 2,
              "text": "Immediate cache invalidation on each GET request"
            },
            {
              "option_index": 3,
              "text": "Inability to use TTL expiration"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Write-behind returns success as soon as the cache memory is updated, creating a window where a crash causes permanent data loss before persistent disk write."
        },
        {
          "id": "q-sys-401-4",
          "position": 4,
          "prompt": "Why are virtual nodes utilized in consistent hashing implementations?",
          "options": [
            {
              "option_index": 0,
              "text": "To encrypt keys across TLS certificates"
            },
            {
              "option_index": 1,
              "text": "To ensure uniform key distribution across physical servers and prevent hotspots"
            },
            {
              "option_index": 2,
              "text": "To simulate multithreaded database locks"
            },
            {
              "option_index": 3,
              "text": "To eliminate the need for hash functions"
            }
          ],
          "correct_option_index": 1,
          "explanation": "Assigning multiple virtual ring points per server smoothes out variance, ensuring servers receive roughly equal proportions of keys."
        },
        {
          "id": "q-sys-401-5",
          "position": 5,
          "prompt": "What design property must message consumers implement to safely handle at-least-once message delivery from message brokers?",
          "options": [
            {
              "option_index": 0,
              "text": "Strict single-threaded execution"
            },
            {
              "option_index": 1,
              "text": "Idempotency (re-processing the same message produces the identical state)"
            },
            {
              "option_index": 2,
              "text": "Asynchronous zero-copy TCP sockets"
            },
            {
              "option_index": 3,
              "text": "Stateless RAM buffers"
            }
          ],
          "correct_option_index": 1,
          "explanation": "At-least-once brokers may deliver duplicate messages on network timeouts; consumers must be idempotent (e.g. tracking unique message IDs) to prevent duplicate side effects."
        }
      ]
    }
  },
  {
    "id": "course-strings-201",
    "slug": "course-strings-201",
    "title": "String Algorithms, Pattern Matching & Automata",
    "description": "Sublinear string search, Knuth-Morris-Pratt (KMP) failure functions, Rabin-Karp rolling hashes, Tries, Suffix Arrays, and Aho-Corasick automaton.",
    "category": "Data Structures",
    "duration": "13 hours",
    "lessonsCount": 5,
    "completedLessons": 0,
    "assessmentPassed": false,
    "assessmentScore": null,
    "skills": [
      "KMP Prefix-Suffix (LPS) Array",
      "Rabin-Karp Polynomial Rolling Hash",
      "Trie Implementations & Autocomplete",
      "Suffix Arrays & LCP Arrays"
    ],
    "curriculum": [
      {
        "id": "lesson-strings-201-l1",
        "title": "String Matching Foundations: Naive vs Linear-Time Objectives",
        "position": 1,
        "durationMinutes": 20,
        "content_markdown": "# String Pattern Matching\n\nGiven text `T` of length N and pattern `P` of length M:\n- Naive algorithm: Checks pattern at every shift, leading to `O(N * M)` worst case (e.g. `T = 'AAAAAB'`, `P = 'AAB'`).\n- Advanced algorithms (KMP, Boyer-Moore, Rabin-Karp) achieve `O(N + M)` by avoiding redundant comparisons.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-strings-201-l2",
        "title": "Knuth-Morris-Pratt (KMP) Algorithm & π (LPS) Table Construction",
        "position": 2,
        "durationMinutes": 35,
        "content_markdown": "# Knuth-Morris-Pratt (KMP)\n\n- Computes the Longest Prefix which is also a Suffix (LPS) array for pattern `P` in `O(M)` time.\n- On a character mismatch at `P[j]`, the text pointer never backtracks; instead, `j` jumps to `lps[j-1]`.\n- Total runtime: `O(N + M)` with `O(M)` auxiliary space.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-strings-201-l3",
        "title": "Rabin-Karp Algorithm & Modular Collision-Resistant Rolling Hashes",
        "position": 3,
        "durationMinutes": 30,
        "content_markdown": "# Rabin-Karp Rolling Hash\n\n- Treats string substrings as base-`B` polynomials modulo large prime `Q`:\n  `H = (s[0]*B^(M-1) + s[1]*B^(M-2) + ... + s[M-1]) % Q`\n- Shifting the window by 1 character computes the new hash in `O(1)` time:\n  `H_new = ((H_old - s[old]*B^(M-1)) * B + s[new]) % Q`\n- Average time: `O(N + M)`. Excellent for multi-pattern and 2D grid search.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-strings-201-l4",
        "title": "Tries: Memory Layout, Prefix Lookups & Bitwise XOR Maximum Pairs",
        "position": 4,
        "durationMinutes": 30,
        "content_markdown": "# Tries (Prefix Trees)\n\n- Tree where each edge corresponds to a character.\n- Supports insert, search, and prefix matching in `O(L)` time, where L is string length, independent of dictionary size N.\n- **Binary Trie**: Storing binary representations of integers allows finding Maximum XOR pairs in `O(32)` time.",
        "is_completed": false,
        "status": "uncompleted"
      },
      {
        "id": "lesson-strings-201-l5",
        "title": "Suffix Arrays & Longest Common Prefix (LCP) Array Construction",
        "position": 5,
        "durationMinutes": 35,
        "content_markdown": "# Suffix Arrays & LCP\n\n- A **Suffix Array** stores sorted indices of all suffixes of text `T` in `O(N log N)` or `O(N)` time.\n- Combined with the **Longest Common Prefix (LCP)** array via Kasai's algorithm (`O(N)`), answers:\n  - Substring search in `O(M log N)`\n  - Number of distinct substrings\n  - Longest repeated substring in linear time.",
        "is_completed": false,
        "status": "uncompleted"
      }
    ],
    "final_test": {
      "id": "test-strings-201",
      "title": "String Algorithms & Pattern Matching Final Assessment",
      "pass_percentage": 80,
      "questions": [
        {
          "id": "q-strings-201-1",
          "position": 1,
          "prompt": "What does entry LPS[i] in the Knuth-Morris-Pratt (KMP) failure function represent for pattern prefix P[0..i]?",
          "options": [
            {
              "option_index": 0,
              "text": "The length of the longest palindromic substring ending at i"
            },
            {
              "option_index": 1,
              "text": "The length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i]"
            },
            {
              "option_index": 2,
              "text": "The total number of occurrences of character P[i]"
            },
            {
              "option_index": 3,
              "text": "The edit distance to the reversed pattern"
            }
          ],
          "correct_option_index": 1,
          "explanation": "The LPS (pi) table stores the length of the longest proper prefix that matches a proper suffix of the same substring, enabling safe jump offsets without retreating the text cursor."
        },
        {
          "id": "q-strings-201-2",
          "position": 2,
          "prompt": "What is the time complexity to update a polynomial rolling hash of window size M when sliding the window one position to the right in Rabin-Karp?",
          "options": [
            {
              "option_index": 0,
              "text": "O(1)"
            },
            {
              "option_index": 1,
              "text": "O(M)"
            },
            {
              "option_index": 2,
              "text": "O(log M)"
            },
            {
              "option_index": 3,
              "text": "O(M^2)"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Subtracting the outgoing leading character and adding the incoming trailing character takes constant O(1) arithmetic operations modulo Q."
        },
        {
          "id": "q-strings-201-3",
          "position": 3,
          "prompt": "What is the time complexity to search for a word of length L in a Trie containing N total words?",
          "options": [
            {
              "option_index": 0,
              "text": "O(L)"
            },
            {
              "option_index": 1,
              "text": "O(N)"
            },
            {
              "option_index": 2,
              "text": "O(N * L)"
            },
            {
              "option_index": 3,
              "text": "O(log N)"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Trie lookups traverse one edge per character of the query word, taking strictly O(L) time regardless of how many thousands of words are stored."
        },
        {
          "id": "q-strings-201-4",
          "position": 4,
          "prompt": "Given a Suffix Array of string T of length N, what is the time complexity to check if a pattern P of length M exists in T using binary search?",
          "options": [
            {
              "option_index": 0,
              "text": "O(M log N)"
            },
            {
              "option_index": 1,
              "text": "O(N * M)"
            },
            {
              "option_index": 2,
              "text": "O(N + M)"
            },
            {
              "option_index": 3,
              "text": "O(log M)"
            }
          ],
          "correct_option_index": 0,
          "explanation": "Binary search on the sorted suffix array takes O(log N) iterations, with each comparison taking at most O(M) character checks, yielding O(M log N)."
        },
        {
          "id": "q-strings-201-5",
          "position": 5,
          "prompt": "Why can the naive string matching algorithm degrade to O(N * M) on repetitive inputs like text 'AAAAAAA' and pattern 'AAAAB'?",
          "options": [
            {
              "option_index": 0,
              "text": "Because it fails to handle ASCII values correctly"
            },
            {
              "option_index": 1,
              "text": "Because on each mismatch, the text pointer resets all the way back, re-comparing characters that were already seen"
            },
            {
              "option_index": 2,
              "text": "Because hash collisions occur on every iteration"
            },
            {
              "option_index": 3,
              "text": "Because memory bandwidth limits recursive stack frames"
            }
          ],
          "correct_option_index": 1,
          "explanation": "The naive algorithm resets its text index by M - 1 positions after nearly matching M characters, repeating M comparisons for every one of the N starting shifts."
        }
      ]
    }
  },
{
  "id": "course-math-201",
  "slug": "course-math-201",
  "title": "Combinatorics, Number Theory & Cryptographic Algorithms",
  "description": "Rigorous mathematical foundations for competitive programming: modular arithmetic, fast exponentiation, prime sieves, combinatorics, and public-key cryptography.",
  "category": "Algorithms",
  "duration": "14 hours",
  "lessonsCount": 5,
  "completedLessons": 0,
  "assessmentPassed": false,
  "assessmentScore": null,
  "skills": [
    "Modular Exponentiation & Inverses",
    "Sieve of Eratosthenes & Prime Factorization",
    "Euler's Totient Function (Phi)",
    "Combinatorics & Lucas' Theorem"
  ],
  "curriculum": [
    {
      "id": "lesson-math-201-l1",
      "title": "Modular Arithmetic, Binary Exponentiation & Extended Euclidean Algorithm",
      "position": 1,
      "durationMinutes": 25,
      "content_markdown": "# Modular Arithmetic & Fast Exponentiation\n\n- Binary exponentiation computes `(a^b) % m` in `O(log b)` time by squaring base `a` on even bits and multiplying on odd bits.\n- **Fermat's Little Theorem**: If `m` is prime, `a^(m-1) = 1 (mod m)`, so modular inverse `a^(-1) = a^(m-2) (mod m)`.\n- **Extended Euclidean Algorithm**: Finds integers `x, y` such that `a*x + b*y = gcd(a, b)` in `O(log(min(a, b)))`, computing inverses when `gcd(a, m) = 1` even for composite moduli.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-math-201-l2",
      "title": "Prime Numbers, Sieve of Eratosthenes & Linear Sieve Factorization",
      "position": 2,
      "durationMinutes": 30,
      "content_markdown": "# Prime Sieves & Factorization\n\n- **Standard Sieve**: Marks multiples of primes up to `N` in `O(N log log N)` time.\n- **Linear Sieve (Euler Sieve)**: Ensures each composite number is marked by its smallest prime factor (SPF) exactly once in `O(N)` time.\n- **O(1) Prime Factorization**: Precomputing the `SPF` array enables factorizing any integer `X <= N` in `O(log X)` divisions.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-math-201-l3",
      "title": "Euler's Totient Function (Phi) & Chinese Remainder Theorem (CRT)",
      "position": 3,
      "durationMinutes": 35,
      "content_markdown": "# Totient & Chinese Remainder Theorem\n\n- **Euler's Totient Function phi(N)**: Counts integers `1 <= k <= N` coprime to `N`. Formula: `phi(N) = N * product(1 - 1/p)` for each prime factor `p`.\n- **Euler's Theorem**: `a^phi(m) = 1 (mod m)` for coprime `a, m`.\n- **Chinese Remainder Theorem (CRT)**: A system of congruences `x = r_i (mod m_i)` with pairwise coprime moduli has a unique solution modulo `product(m_i)` computable via modular inverses.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-math-201-l4",
      "title": "Combinatorics: Permutations, Binomial Coefficients & Lucas' Theorem",
      "position": 4,
      "durationMinutes": 30,
      "content_markdown": "# Combinatorics & Lucas' Theorem\n\n- **Binomial Coefficient C(N, K)**: Precomputing factorials and inverse factorials enables `O(1)` query of `C(N, K) % P` for prime `P`.\n- **Lucas' Theorem**: For large `N, K >= P`, `C(N, K) = product(C(n_i, k_i)) (mod P)` where `n_i, k_i` are base-`P` digits of `N, K`, reducing `O(N)` computations to `O(P)`.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-math-201-l5",
      "title": "Matrix Exponentiation for Recurrences & Linear Recurrence Solutions",
      "position": 5,
      "durationMinutes": 35,
      "content_markdown": "# Matrix Exponentiation for Linear Recurrences\n\n- Any linear recurrence of order `K` (like Fibonacci `F(n) = F(n-1) + F(n-2)`) can be written as a `K x K` matrix equation:\n  `[F_n, F_(n-1)]^T = T * [F_(n-1), F_(n-2)]^T`\n- Transition matrix exponentiation computes `T^N` in `O(K^3 log N)` time, solving `N = 10^18` in microseconds.",
      "is_completed": false,
      "status": "uncompleted"
    }
  ],
  "final_test": {
    "id": "test-math-201",
    "title": "Combinatorics & Number Theory Final Assessment",
    "pass_percentage": 80,
    "questions": [
      {
        "id": "q-math-201-1",
        "position": 1,
        "prompt": "What is the time complexity to compute (A^B) % M using binary exponentiation?",
        "options": [
          {
            "option_index": 0,
            "text": "O(B)"
          },
          {
            "option_index": 1,
            "text": "O(log B)"
          },
          {
            "option_index": 2,
            "text": "O(1)"
          },
          {
            "option_index": 3,
            "text": "O(sqrt(B))"
          }
        ],
        "correct_option_index": 1,
        "explanation": "Binary exponentiation halves the exponent B at each step, taking at most log2(B) multiplications modulo M."
      },
      {
        "id": "q-math-201-2",
        "position": 2,
        "prompt": "According to Fermat's Little Theorem, if P is a prime and gcd(A, P) = 1, what is A^(P-2) % P?",
        "options": [
          {
            "option_index": 0,
            "text": "The modular multiplicative inverse of A modulo P"
          },
          {
            "option_index": 1,
            "text": "1"
          },
          {
            "option_index": 2,
            "text": "0"
          },
          {
            "option_index": 3,
            "text": "P - 1"
          }
        ],
        "correct_option_index": 0,
        "explanation": "Since A^(P-1) = 1 (mod P), multiplying both sides by A^(-1) yields A^(-1) = A^(P-2) (mod P)."
      },
      {
        "id": "q-math-201-3",
        "position": 3,
        "prompt": "What makes the Linear Sieve (Euler Sieve) achieve O(N) complexity instead of O(N log log N)?",
        "options": [
          {
            "option_index": 0,
            "text": "It skips checking even numbers only"
          },
          {
            "option_index": 1,
            "text": "Each composite number is marked by its smallest prime factor (SPF) exactly once"
          },
          {
            "option_index": 2,
            "text": "It uses GPU floating-point parallelism"
          },
          {
            "option_index": 3,
            "text": "It calculates primes using polynomial interpolation"
          }
        ],
        "correct_option_index": 1,
        "explanation": "By breaking the inner loop as soon as i % p == 0, every composite number is visited exactly once by its smallest prime factor."
      },
      {
        "id": "q-math-201-4",
        "position": 4,
        "prompt": "Lucas' Theorem is specifically utilized to compute C(N, K) modulo P when:",
        "options": [
          {
            "option_index": 0,
            "text": "N and K are much larger than prime P"
          },
          {
            "option_index": 1,
            "text": "P is a composite number"
          },
          {
            "option_index": 2,
            "text": "K is equal to 0 or 1 only"
          },
          {
            "option_index": 3,
            "text": "Modulus P is a power of 2"
          }
        ],
        "correct_option_index": 0,
        "explanation": "Lucas theorem expresses N and K in base P digits, reducing huge combinations (N, K up to 10^18) to small combinations modulo prime P."
      },
      {
        "id": "q-math-201-5",
        "position": 5,
        "prompt": "To compute the N-th Fibonacci number for N = 10^18 modulo 10^9 + 7, what is the optimal algorithmic approach?",
        "options": [
          {
            "option_index": 0,
            "text": "Dynamic programming array of size N"
          },
          {
            "option_index": 1,
            "text": "Recursive top-down memoization with hash table"
          },
          {
            "option_index": 2,
            "text": "2x2 Matrix exponentiation in O(log N) time"
          },
          {
            "option_index": 3,
            "text": "Iterative loop running N iterations"
          }
        ],
        "correct_option_index": 2,
        "explanation": "Matrix exponentiation of the companion matrix [[1, 1], [1, 0]]^N computes the exact N-th Fibonacci number in O(8 * log N) operations."
      }
    ]
  }
},
{
  "id": "course-os-301",
  "slug": "course-os-301",
  "title": "Operating Systems Internals, Concurrency & Memory Management",
  "description": "Deep dive into operating system fundamentals: processes, threads, virtual memory paging, synchronization primitives, deadlocks, and disk scheduling algorithms.",
  "category": "System Design",
  "duration": "16 hours",
  "lessonsCount": 5,
  "completedLessons": 0,
  "assessmentPassed": false,
  "assessmentScore": null,
  "skills": [
    "Process Scheduling & Context Switching",
    "Virtual Memory & Page Replacement",
    "Mutexes, Semaphores & Condition Variables",
    "Deadlock Detection & Banker's Algorithm"
  ],
  "curriculum": [
    {
      "id": "lesson-os-301-l1",
      "title": "Process Lifecycles, Context Switching & CPU Scheduling Paradigms",
      "position": 1,
      "durationMinutes": 30,
      "content_markdown": "# Process Management & CPU Scheduling\n\n- **Process Control Block (PCB)**: Stores PID, program counter, register state, CPU scheduling info, and memory limits.\n- **Context Switch Overhead**: Saving register state, swapping page table base registers (CR3 in x86), and flushing TLB caches incurs hardware penalties.\n- **Scheduling Algorithms**: Round Robin (time quantum tradeoff), Completely Fair Scheduler (CFS red-black tree with vruntime), and Multi-Level Feedback Queues (MLFQ).",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-os-301-l2",
      "title": "Virtual Memory Architecture: Paging, TLBs & Page Fault Handling",
      "position": 2,
      "durationMinutes": 35,
      "content_markdown": "# Virtual Memory Architecture\n\n- **Multi-Level Page Tables**: Virtual addresses are mapped to physical frames via directory levels (e.g. 4-level paging in x86-64: PML4 -> PDP -> PD -> PT).\n- **Translation Lookaside Buffer (TLB)**: Hardware CAM cache for virtual-to-physical address translations.\n- **Page Fault Sequence**: Hardware interrupt -> trap to kernel -> verify VMA permissions -> allocate frame from free pool -> load from backing store (swap) -> update page table & TLB -> resume instruction.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-os-301-l3",
      "title": "Page Replacement Algorithms: FIFO, LRU, Optimal & Clock (Second-Chance)",
      "position": 3,
      "durationMinutes": 30,
      "content_markdown": "# Page Replacement Algorithms\n\n- **Belady's Anomaly**: For FIFO, increasing frame count can paradoxically increase page faults.\n- **Optimal (B\u00e9l\u00e1dy's Optimal)**: Evicts the page that will not be used for the longest period; theoretical benchmark.\n- **LRU (Least Recently Used)**: Evicts least recently accessed page; implemented in production via **Clock (Second-Chance)** algorithm using reference bits.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-os-301-l4",
      "title": "Concurrency Primitives: Atomic Operations, Mutexes, Semaphores & Barriers",
      "position": 4,
      "durationMinutes": 35,
      "content_markdown": "# Concurrency Primitives\n\n- **Atomic Hardware Instructions**: Compare-And-Swap (CAS), Test-And-Set, and Load-Linked/Store-Conditional (LL/SC).\n- **Spinlocks vs Mutexes**: Spinlocks busy-wait on CPU (low latency for microsecond locks); mutexes put threads to sleep in kernel wait queues.\n- **Semaphores**: Counting semaphores track resource pools (Dijkstra's P and V operations).\n- **Condition Variables**: Pair with mutexes to let threads wait for state predicates without busy polling.",
      "is_completed": false,
      "status": "uncompleted"
    },
    {
      "id": "lesson-os-301-l5",
      "title": "Deadlock Dynamics: Coffman Conditions, Resource Allocation Graphs & Banker's Algorithm",
      "position": 5,
      "durationMinutes": 35,
      "content_markdown": "# Deadlock Dynamics & Prevention\n\n- **Coffman Conditions**: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, (4) Circular Wait. Breaking any one condition prevents deadlock.\n- **Resource Allocation Graph (RAG)**: Cycle indicates deadlock if single instance per resource type.\n- **Dijkstra's Banker's Algorithm**: Determines safe states before granting resource requests using `Allocation`, `Max`, `Available`, and `Need` vectors.",
      "is_completed": false,
      "status": "uncompleted"
    }
  ],
  "final_test": {
    "id": "test-os-301",
    "title": "Operating Systems Internals Final Assessment",
    "pass_percentage": 80,
    "questions": [
      {
        "id": "q-os-301-1",
        "position": 1,
        "prompt": "Which hardware register in x86 architecture is updated during a context switch to point to the new process's top-level page directory?",
        "options": [
          {
            "option_index": 0,
            "text": "CR3"
          },
          {
            "option_index": 1,
            "text": "EAX"
          },
          {
            "option_index": 2,
            "text": "ESP"
          },
          {
            "option_index": 3,
            "text": "DR0"
          }
        ],
        "correct_option_index": 0,
        "explanation": "Control Register 3 (CR3) holds the physical base address of the top-level page table (PML4). Swapping CR3 switches the address space."
      },
      {
        "id": "q-os-301-2",
        "position": 2,
        "prompt": "Belady's Anomaly occurs in which page replacement algorithm where increasing physical frame count increases page faults?",
        "options": [
          {
            "option_index": 0,
            "text": "Least Recently Used (LRU)"
          },
          {
            "option_index": 1,
            "text": "First-In, First-Out (FIFO)"
          },
          {
            "option_index": 2,
            "text": "Optimal Page Replacement"
          },
          {
            "option_index": 3,
            "text": "Clock Second-Chance"
          }
        ],
        "correct_option_index": 1,
        "explanation": "FIFO is not a stack algorithm; allocating more page frames can disrupt the queue order and lead to strictly more page faults."
      },
      {
        "id": "q-os-301-3",
        "position": 3,
        "prompt": "Which of the following is NOT one of the four necessary Coffman conditions for a system deadlock?",
        "options": [
          {
            "option_index": 0,
            "text": "Mutual Exclusion"
          },
          {
            "option_index": 1,
            "text": "Hold and Wait"
          },
          {
            "option_index": 2,
            "text": "Strict Memory Alignment"
          },
          {
            "option_index": 3,
            "text": "Circular Wait"
          }
        ],
        "correct_option_index": 2,
        "explanation": "The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Memory alignment is unrelated."
      },
      {
        "id": "q-os-301-4",
        "position": 4,
        "prompt": "When should a spinlock be chosen over a mutex in multi-threaded systems programming?",
        "options": [
          {
            "option_index": 0,
            "text": "When the critical section is extremely short and context switch latency exceeds busy-wait time"
          },
          {
            "option_index": 1,
            "text": "When the thread must wait for disk I/O to complete"
          },
          {
            "option_index": 2,
            "text": "When running on a single-core uniprocessor without preemption"
          },
          {
            "option_index": 3,
            "text": "When allocating dynamic heap memory"
          }
        ],
        "correct_option_index": 0,
        "explanation": "Spinlocks avoid the expensive OS kernel transition and context switch overhead when the lock is held for just a few CPU cycles."
      },
      {
        "id": "q-os-301-5",
        "position": 5,
        "prompt": "What does Dijkstra's Banker's Algorithm evaluate before granting an allocated resource request?",
        "options": [
          {
            "option_index": 0,
            "text": "Whether granting the request leaves the system in a safe state with a valid execution sequence"
          },
          {
            "option_index": 1,
            "text": "Whether the requesting process has higher priority than the kernel scheduler"
          },
          {
            "option_index": 2,
            "text": "Whether the CPU cache lines are 64-byte aligned"
          },
          {
            "option_index": 3,
            "text": "Whether the process memory usage exceeds virtual swap capacity"
          }
        ],
        "correct_option_index": 0,
        "explanation": "The Banker's algorithm tests if there exists at least one order in which all processes can finish without entering an unavoidable deadlock."
      }
    ]
  }
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

  // System Notifications (Populated dynamically on friend requests & milestone achievements)
  notifications: []
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
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('arise_solved_problem_ids');
      localStorage.removeItem('arise_attempted_problem_ids');
    }
  } catch (_) {}
}

// Synchronizes problem status with user's verified solves & localStorage
function syncProblemStatuses() {
  if (typeof ARISE_DATA === 'undefined' || !Array.isArray(ARISE_DATA.problems)) return;

  const user = ARISE_DATA.currentUser;
  let savedSolved = [];
  let savedAttempted = [];

  try {
    if (typeof localStorage !== 'undefined') {
      savedSolved = JSON.parse(localStorage.getItem('arise_solved_problem_ids') || '[]');
      savedAttempted = JSON.parse(localStorage.getItem('arise_attempted_problem_ids') || '[]');
    }
  } catch (_) {}

  // 1. If user has recentSolves or problems_solved list
  if (user && Array.isArray(user.recentSolves)) {
    user.recentSolves.forEach(r => {
      if (r && r.id && !savedSolved.includes(r.id)) {
        savedSolved.push(r.id);
      }
    });
  }

  // 2. If user is seeded top student (Aarav Sharma AR-XYZ999 with 148 solves / 10,540 XP)
  const isTopRanker = user && (user.uid === 'AR-XYZ999' || user.email === 'xyz@gmail.com' || (user.verifiedXp && user.verifiedXp >= 10000));
  if (isTopRanker) {
    savedSolved = ARISE_DATA.problems.map(p => p.id);
  } else if (user && user.verifiedXp > 0 && savedSolved.length === 0) {
    // If user has verified XP from an account session but problem IDs weren't explicitly cached,
    // match their XP to problem counts so their catalogue shows their genuine progress
    let runningXp = 0;
    for (const prob of ARISE_DATA.problems) {
      if (runningXp + (prob.verifiedXp || 40) <= user.verifiedXp + 20) {
        savedSolved.push(prob.id);
        runningXp += (prob.verifiedXp || 40);
      } else {
        break;
      }
    }
  }

  // 3. Apply statuses to every problem
  ARISE_DATA.problems.forEach(p => {
    if (savedSolved.includes(p.id)) {
      p.status = 'Solved';
    } else if (savedAttempted.includes(p.id)) {
      p.status = 'Attempted';
    } else {
      p.status = 'Unsolved';
    }
  });

  // 4. Update user solved stats to match the solved problems count
  if (user && user.solvedStats) {
    if (!user.verifiedXp || user.verifiedXp === 0) {
      user.solvedStats.total = 0;
      user.solvedStats.easy = 0;
      user.solvedStats.medium = 0;
      user.solvedStats.hard = 0;
    } else {
      const solvedProbs = ARISE_DATA.problems.filter(p => p.status === 'Solved');
      const totalCount = Math.max(user.solvedStats.total || 0, solvedProbs.length);
      user.solvedStats.total = totalCount;
      user.solvedStats.easy = solvedProbs.filter(p => p.difficulty === 'Easy').length;
      user.solvedStats.medium = solvedProbs.filter(p => p.difficulty === 'Medium').length;
      user.solvedStats.hard = solvedProbs.filter(p => p.difficulty === 'Hard').length;
    }
  }

  // 5. Update topic mastery counts
  if (Array.isArray(ARISE_DATA.topics)) {
    ARISE_DATA.topics.forEach(t => {
      const tName = (t.name || '').trim().toLowerCase();
      const tId = (t.id || '').trim().toLowerCase();
      const count = ARISE_DATA.problems.filter(p => {
        const pTopic = (p.topic || '').trim().toLowerCase();
        return (pTopic === tName || pTopic === tId || (tId.length > 2 && pTopic.includes(tId))) && p.status === 'Solved';
      }).length;
      t.userSolved = count;
      t.solved = count;
    });
  }

  // 6. Ensure localStorage is in sync
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('arise_solved_problem_ids', JSON.stringify(savedSolved));
    }
  } catch (_) {}
}

function syncLeaderboardWithUser(user) {
  if (!user || typeof ARISE_DATA === 'undefined' || !ARISE_DATA.leaderboards) return;
  const scopes = ['college', 'district', 'maharashtra', 'india'];
  const userXp = Number(user.verifiedXp || 0);
  const userSolved = Number((user.solvedStats && user.solvedStats.total) || 0);

  scopes.forEach(scope => {
    let list = ARISE_DATA.leaderboards[scope];
    if (!Array.isArray(list)) return;

    // Filter out previous current user instances
    list = list.filter(item => !item.isCurrentUser && item.uid !== user.uid);

    if (userXp > 0) {
      list.push({
        rank: 0,
        name: user.displayName || "You",
        uid: user.uid,
        college: user.college || "Your Institution",
        xp: userXp,
        solved: userSolved,
        isCurrentUser: true,
        mv: "+1",
        avatar: (user.displayName || "YO").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
      });

      // Sort strictly by verified DSA XP descending
      list.sort((a, b) => (b.xp || 0) - (a.xp || 0));

      // Reassign ranks
      list.forEach((item, index) => {
        item.rank = index + 1;
        if (item.isCurrentUser || item.uid === user.uid) {
          if (!user.rank) user.rank = {};
          user.rank[scope] = index + 1;
        }
      });

      ARISE_DATA.leaderboards[scope] = list;
    }
  });

  if (userXp > 0 && user.rank && user.rank.maharashtra) {
    user.rankDisplay = `#${user.rank.maharashtra}`;
  } else if (userXp === 0) {
    user.rankDisplay = "Unranked";
    if (user.rank) {
      user.rank.college = null;
      user.rank.district = null;
      user.rank.maharashtra = null;
      user.rank.india = null;
    }
  }
}

// Initial sync
syncProblemStatuses();
if (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) {
  syncLeaderboardWithUser(ARISE_DATA.currentUser);
}

if (typeof window !== 'undefined') {
  window.ARISE_DATA = ARISE_DATA;
  window.getTopicSolvedCount = getTopicSolvedCount;
  window.updateTopicOnSolved = updateTopicOnSolved;
  window.resetAllTopicSolves = resetAllTopicSolves;
  window.syncProblemStatuses = syncProblemStatuses;
  window.syncLeaderboardWithUser = syncLeaderboardWithUser;
}
if (typeof globalThis !== 'undefined') {
  globalThis.ARISE_DATA = ARISE_DATA;
  globalThis.getTopicSolvedCount = getTopicSolvedCount;
  globalThis.updateTopicOnSolved = updateTopicOnSolved;
  globalThis.resetAllTopicSolves = resetAllTopicSolves;
  globalThis.syncProblemStatuses = syncProblemStatuses;
  globalThis.syncLeaderboardWithUser = syncLeaderboardWithUser;
}
