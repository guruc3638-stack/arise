import json
import re
import sys
import os

ALL_24_LEETCODE_PROBLEMS = [
    # ---------------- EASY (1-9) ----------------
    {
        "id": "ARISE-P101",
        "leetcode_num": 1,
        "title": "Two Sum (LeetCode #1)",
        "slug": "two-sum",
        "topic": "Arrays",
        "tags": ["Arrays", "Hash Table", "Two Pointers"],
        "difficulty": "Easy",
        "acceptance": "53.8%",
        "verifiedXp": 40,
        "functionName": "twoSum",
        "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.",
        "examples": [
            {"input": "nums = [2, 7, 11, 15], target = 9", "output": "[0, 1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."},
            {"input": "nums = [3, 2, 4], target = 6", "output": "[1, 2]", "explanation": "nums[1] + nums[2] = 2 + 4 = 6."},
            {"input": "nums = [3, 3], target = 6", "output": "[0, 1]", "explanation": "nums[0] + nums[1] = 3 + 3 = 6."}
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
        "testCases": [
            {"id": 1, "input": "nums = [2, 7, 11, 15], target = 9", "expected": "[0, 1]"},
            {"id": 2, "input": "nums = [3, 2, 4], target = 6", "expected": "[1, 2]"},
            {"id": 3, "input": "nums = [3, 3], target = 6", "expected": "[0, 1]"}
        ],
        "starter": {
            "c": "/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Implement optimal O(N) hash map solution\n    *returnSize = 0;\n    return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> twoSum(const std::vector<int>& nums, int target) {\n        // Implement optimal O(N) hash map solution\n        return {};\n    }\n};",
            "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Implement optimal O(N) hash map solution\n        pass",
            "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Implement optimal O(N) hash map solution\n        return new int[0];\n    }\n}",
            "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Write your optimal O(N) hash map solution\n    \n}",
            "typescript": "function twoSum(nums: number[], target: number): number[] {\n    // Implement optimal O(N) hash map solution\n    return [];\n}",
            "go": "func twoSum(nums []int, target int) []int {\n    // Implement optimal O(N) hash map solution\n    return []int{}\n}",
            "rust": "impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Implement optimal O(N) hash map solution\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "c": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    int* res = (int*)malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j; *returnSize = 2; return res;\n            }\n        }\n    }\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> twoSum(const std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < (int)nums.size(); ++i) {\n            int comp = target - nums[i];\n            if (seen.find(comp) != seen.end()) return {seen[comp], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
            "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, val in enumerate(nums):\n            comp = target - val\n            if comp in seen:\n                return [seen[comp], i]\n            seen[val] = i\n        return []",
            "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (seen.containsKey(comp)) return new int[] { seen.get(comp), i };\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
            "javascript": "function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (seen.has(comp)) return [seen.get(comp), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}",
            "typescript": "function twoSum(nums: number[], target: number): number[] {\n    const seen = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (seen.has(comp)) return [seen.get(comp)!, i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}",
            "go": "func twoSum(nums []int, target int) []int {\n    seen := make(map[int]int)\n    for i, num := range nums {\n        comp := target - num\n        if idx, ok := seen[comp]; ok {\n            return []int{idx, i}\n        }\n        seen[num] = i\n    }\n    return []int{}\n}",
            "rust": "use std::collections::HashMap;\nimpl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        let mut seen = HashMap::new();\n        for (i, &num) in nums.iter().enumerate() {\n            let comp = target - num;\n            if let Some(&idx) = seen.get(&comp) {\n                return vec![idx as i32, i as i32];\n            }\n            seen.insert(num, i);\n        }\n        vec![]\n    }\n}"
        }
    },
    {
        "id": "ARISE-P102",
        "leetcode_num": 20,
        "title": "Valid Parentheses (LeetCode #20)",
        "slug": "valid-parentheses",
        "topic": "Stacks",
        "tags": ["String", "Stack"],
        "difficulty": "Easy",
        "acceptance": "41.5%",
        "verifiedXp": 40,
        "functionName": "isValid",
        "description": "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        "examples": [
            {"input": "s = '()'", "output": "true", "explanation": "The parenthesis pair matches."},
            {"input": "s = '()[]{}'", "output": "true", "explanation": "All bracket pairs are correctly nested and closed."},
            {"input": "s = '(]'", "output": "false", "explanation": "Mismatched bracket types."}
        ],
        "constraints": [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'."
        ],
        "hints": [
            "Hint 1: A LIFO stack data structure is ideal for tracking open brackets in sequence.",
            "Hint 2: When encountering an opening bracket, push it onto the stack. On closing bracket, check if it matches stack top."
        ],
        "testCases": [
            {"id": 1, "input": "s = '()'", "expected": "true"},
            {"id": 2, "input": "s = '()[]{}'", "expected": "true"},
            {"id": 3, "input": "s = '(]'", "expected": "false"}
        ],
        "starter": {
            "c": "bool isValid(char* s) {\n    // Implement optimal O(N) stack solution\n    return false;\n}",
            "cpp": "class Solution {\npublic:\n    bool isValid(const std::string& s) {\n        // Implement optimal O(N) stack solution\n        return false;\n    }\n};",
            "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Implement optimal O(N) stack solution\n        pass",
            "java": "class Solution {\n    public boolean isValid(String s) {\n        // Implement optimal O(N) stack solution\n        return false;\n    }\n}",
            "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    // Write your optimal O(N) stack solution\n    \n}",
            "typescript": "function isValid(s: string): boolean {\n    // Implement optimal O(N) stack solution\n    return false;\n}",
            "go": "func isValid(s string) bool {\n    // Implement optimal O(N) stack solution\n    return false\n}",
            "rust": "impl Solution {\n    pub fn is_valid(s: String) -> bool {\n        // Implement optimal O(N) stack solution\n        false\n    }\n}"
        },
        "solutionCode": {
            "c": "bool isValid(char* s) {\n    int n = strlen(s);\n    char stack[10000]; int top = -1;\n    for (int i = 0; i < n; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else {\n            if (top == -1) return false;\n            char o = stack[top--];\n            if (c == ')' && o != '(') return false;\n            if (c == '}' && o != '{') return false;\n            if (c == ']' && o != '[') return false;\n        }\n    }\n    return top == -1;\n}",
            "cpp": "class Solution {\npublic:\n    bool isValid(const std::string& s) {\n        std::stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return st.empty();\n    }\n};",
            "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        pairs = {')': '(', '}': '{', ']': '['}\n        for ch in s:\n            if ch in pairs:\n                if not stack or stack[-1] != pairs[ch]:\n                    return False\n                stack.pop()\n            else:\n                stack.append(ch)\n        return len(stack) == 0",
            "java": "import java.util.Stack;\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') stack.push(c);\n            else {\n                if (stack.isEmpty()) return false;\n                char top = stack.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}",
            "javascript": "function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let i = 0; i < s.length; i++) {\n        const ch = s[i];\n        if (ch === '(' || ch === '{' || ch === '[') {\n            stack.push(ch);\n        } else {\n            if (stack.length === 0 || stack.pop() !== map[ch]) return false;\n        }\n    }\n    return stack.length === 0;\n}",
            "typescript": "function isValid(s: string): boolean {\n    const stack: string[] = [];\n    const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n    for (const ch of s) {\n        if (ch === '(' || ch === '{' || ch === '[') {\n            stack.push(ch);\n        } else {\n            if (stack.length === 0 || stack.pop() !== map[ch]) return false;\n        }\n    }\n    return stack.length === 0;\n}",
            "go": "func isValid(s string) bool {\n    stack := []rune{}\n    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}\n    for _, ch := range s {\n        if ch == '(' || ch == '{' || ch == '[' {\n            stack = append(stack, ch)\n        } else {\n            if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {\n                return false\n            }\n            stack = stack[:len(stack)-1]\n        }\n    }\n    return len(stack) == 0\n}",
            "rust": "impl Solution {\n    pub fn is_valid(s: String) -> bool {\n        let mut stack = Vec::new();\n        for ch in s.chars() {\n            match ch {\n                '(' | '{' | '[' => stack.push(ch),\n                ')' => if stack.pop() != Some('(') { return false; },\n                '}' => if stack.pop() != Some('{') { return false; },\n                ']' => if stack.pop() != Some('[') { return false; },\n                _ => ()\n            }\n        }\n        stack.is_empty()\n    }\n}"
        }
    },
    {
        "id": "ARISE-P103",
        "leetcode_num": 121,
        "title": "Best Time to Buy and Sell Stock (LeetCode #121)",
        "slug": "best-time-to-buy-and-sell-stock",
        "topic": "Arrays",
        "tags": ["Array", "Dynamic Programming", "Two Pointers"],
        "difficulty": "Easy",
        "acceptance": "54.1%",
        "verifiedXp": 40,
        "functionName": "maxProfit",
        "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
        "examples": [
            {"input": "prices = [7, 1, 5, 3, 6, 4]", "output": "5", "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."},
            {"input": "prices = [7, 6, 4, 3, 1]", "output": "0", "explanation": "In this case, no transactions are done and the max profit = 0."}
        ],
        "constraints": [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4"
        ],
        "hints": [
            "Hint 1: All the results are obtained from prices[j] - prices[i] where j > i.",
            "Hint 2: Keep track of the minimum price seen so far as you iterate through the list."
        ],
        "testCases": [
            {"id": 1, "input": "prices = [7, 1, 5, 3, 6, 4]", "expected": "5"},
            {"id": 2, "input": "prices = [7, 6, 4, 3, 1]", "expected": "0"}
        ],
        "starter": {
            "c": "int maxProfit(int* prices, int pricesSize) {\n    // Implement optimal O(N) single-pass solution\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(const std::vector<int>& prices) {\n        // Implement optimal O(N) single-pass solution\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Implement optimal O(N) single-pass solution\n        pass",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        // Implement optimal O(N) single-pass solution\n        return 0;\n    }\n}",
            "javascript": "/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n    // Write your optimal O(N) single-pass solution\n    \n}",
            "typescript": "function maxProfit(prices: number[]): number {\n    // Implement optimal O(N) single-pass solution\n    return 0;\n}",
            "go": "func maxProfit(prices []int) int {\n    // Implement optimal O(N) single-pass solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn max_profit(prices: Vec<i32>) -> i32 {\n        // Implement optimal O(N) single-pass solution\n        0\n    }\n}"
        },
        "solutionCode": {
            "c": "int maxProfit(int* prices, int pricesSize) {\n    int minP = 1000000000; int maxP = 0;\n    for (int i = 0; i < pricesSize; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxP) maxP = prices[i] - minP;\n    }\n    return maxP;\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(const std::vector<int>& prices) {\n        int minP = 1e9, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = std::max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};",
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_p = float('inf')\n        max_p = 0\n        for p in prices:\n            if p < min_p:\n                min_p = p\n            elif p - min_p > max_p:\n                max_p = p - min_p\n        return max_p",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE;\n        int maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxP) maxP = p - minP;\n        }\n        return maxP;\n    }\n}",
            "javascript": "function maxProfit(prices) {\n    let minP = Infinity, maxP = 0;\n    for (let i = 0; i < prices.length; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxP) maxP = prices[i] - minP;\n    }\n    return maxP;\n}",
            "typescript": "function maxProfit(prices: number[]): number {\n    let minP = Infinity, maxP = 0;\n    for (const p of prices) {\n        if (p < minP) minP = p;\n        else if (p - minP > maxP) maxP = p - minP;\n    }\n    return maxP;\n}",
            "go": "func maxProfit(prices []int) int {\n    minP := int(1e9)\n    maxP := 0\n    for _, p := range prices {\n        if p < minP { minP = p }\n        if p - minP > maxP { maxP = p - minP }\n    }\n    return maxP\n}",
            "rust": "impl Solution {\n    pub fn max_profit(prices: Vec<i32>) -> i32 {\n        let mut min_p = i32::MAX;\n        let mut max_p = 0;\n        for p in prices {\n            if p < min_p { min_p = p; }\n            else if p - min_p > max_p { max_p = p - min_p; }\n        }\n        max_p\n    }\n}"
        }
    },
    {
        "id": "ARISE-P104",
        "leetcode_num": 101,
        "title": "Symmetric Tree (LeetCode #101)",
        "slug": "symmetric-tree",
        "topic": "Trees",
        "tags": ["Tree", "Depth-First Search", "Breadth-First Search"],
        "difficulty": "Easy",
        "acceptance": "55.7%",
        "verifiedXp": 40,
        "functionName": "isSymmetric",
        "description": "Given the `root` of a binary tree (passed as a level-order array or tree structure), check whether it is a **mirror of itself** (i.e., symmetric around its center).",
        "examples": [
            {"input": "root = [1, 2, 2, 3, 4, 4, 3]", "output": "true", "explanation": "The tree is symmetric around the root."},
            {"input": "root = [1, 2, 2, null, 3, null, 3]", "output": "false", "explanation": "The right and left subtrees are asymmetric."}
        ],
        "constraints": [
            "The number of nodes in the tree is in the range [1, 1000].",
            "-100 <= Node.val <= 100"
        ],
        "hints": [
            "Hint 1: Two trees are mirrors of each other if their roots have equal values, and right subtree is mirror of left subtree."
        ],
        "testCases": [
            {"id": 1, "input": "root = [1, 2, 2, 3, 4, 4, 3]", "expected": "true"},
            {"id": 2, "input": "root = [1, 2, 2, null, 3, null, 3]", "expected": "false"}
        ],
        "starter": {
            "c": "bool isSymmetric(int* root, int rootSize) {\n    // Implement optimal O(N) recursive check\n    return false;\n}",
            "cpp": "class Solution {\npublic:\n    bool isSymmetric(const std::vector<int>& root) {\n        // Implement optimal O(N) check\n        return false;\n    }\n};",
            "python": "class Solution:\n    def isSymmetric(self, root: list) -> bool:\n        # Implement optimal O(N) check\n        pass",
            "java": "class Solution {\n    public boolean isSymmetric(int[] root) {\n        // Implement optimal O(N) check\n        return false;\n    }\n}",
            "javascript": "function isSymmetric(root) {\n    // Write your optimal O(N) check\n    \n}",
            "typescript": "function isSymmetric(root: (number | null)[]): boolean {\n    // Implement optimal O(N) check\n    return false;\n}",
            "go": "func isSymmetric(root []int) bool {\n    // Implement optimal O(N) check\n    return false\n}",
            "rust": "impl Solution {\n    pub fn is_symmetric(root: Vec<Option<i32>>) -> bool {\n        // Implement optimal O(N) check\n        false\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function isSymmetric(root) {\n    if (!root || root.length <= 1) return true;\n    function checkMirror(i, j) {\n        if (i >= root.length && j >= root.length) return true;\n        if (i >= root.length || j >= root.length) return false;\n        if (root[i] !== root[j]) return false;\n        return checkMirror(2 * i + 1, 2 * j + 2) && checkMirror(2 * i + 2, 2 * j + 1);\n    }\n    return checkMirror(1, 2);\n}",
            "python": "class Solution:\n    def isSymmetric(self, root: list) -> bool:\n        if not root or len(root) <= 1: return True\n        def check(i, j):\n            if i >= len(root) and j >= len(root): return True\n            if i >= len(root) or j >= len(root): return False\n            if root[i] != root[j]: return False\n            return check(2 * i + 1, 2 * j + 2) and check(2 * i + 2, 2 * j + 1)\n        return check(1, 2)"
        }
    },
    {
        "id": "ARISE-P105",
        "leetcode_num": 53,
        "title": "Maximum Subarray (LeetCode #53 - Kadane's)",
        "slug": "maximum-subarray",
        "topic": "Arrays",
        "tags": ["Array", "Divide and Conquer", "Dynamic Programming"],
        "difficulty": "Easy",
        "acceptance": "50.4%",
        "verifiedXp": 40,
        "functionName": "maxSubArray",
        "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
        "examples": [
            {"input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", "output": "6", "explanation": "The subarray [4, -1, 2, 1] has the largest sum 6."},
            {"input": "nums = [1]", "output": "1", "explanation": "The subarray [1] has the largest sum 1."},
            {"input": "nums = [5, 4, -1, 7, 8]", "output": "23", "explanation": "The subarray [5, 4, -1, 7, 8] has the largest sum 23."}
        ],
        "constraints": [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4"
        ],
        "hints": [
            "Hint 1: Kadane's algorithm maintains the current running sum and global max sum.",
            "Hint 2: If the running sum becomes negative, reset it to the current element."
        ],
        "testCases": [
            {"id": 1, "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", "expected": "6"},
            {"id": 2, "input": "nums = [1]", "expected": "1"},
            {"id": 3, "input": "nums = [5, 4, -1, 7, 8]", "expected": "23"}
        ],
        "starter": {
            "c": "int maxSubArray(int* nums, int numsSize) {\n    // Implement optimal O(N) Kadane's algorithm\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& nums) {\n        // Implement optimal O(N) Kadane's algorithm\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # Implement optimal O(N) Kadane's algorithm\n        pass",
            "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        // Implement optimal O(N) Kadane's algorithm\n        return 0;\n    }\n}",
            "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n    // Write your optimal O(N) Kadane's algorithm\n    \n}",
            "typescript": "function maxSubArray(nums: number[]): number {\n    // Implement optimal O(N) Kadane's algorithm\n    return 0;\n}",
            "go": "func maxSubArray(nums []int) int {\n    // Implement optimal O(N) Kadane's algorithm\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn max_sub_array(nums: Vec<i32>) -> i32 {\n        // Implement optimal O(N) Kadane's algorithm\n        0\n    }\n}"
        },
        "solutionCode": {
            "c": "int maxSubArray(int* nums, int numsSize) {\n    int maxS = nums[0]; int currS = nums[0];\n    for (int i = 1; i < numsSize; i++) {\n        currS = nums[i] > (currS + nums[i]) ? nums[i] : (currS + nums[i]);\n        if (currS > maxS) maxS = currS;\n    }\n    return maxS;\n}",
            "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& nums) {\n        int maxS = nums[0], currS = nums[0];\n        for (size_t i = 1; i < nums.size(); ++i) {\n            currS = std::max(nums[i], currS + nums[i]);\n            maxS = std::max(maxS, currS);\n        }\n        return maxS;\n    }\n};",
            "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        curr_s = max_s = nums[0]\n        for x in nums[1:]:\n            curr_s = max(x, curr_s + x)\n            max_s = max(max_s, curr_s)\n        return max_s",
            "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxS = nums[0], currS = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currS = Math.max(nums[i], currS + nums[i]);\n            maxS = Math.max(maxS, currS);\n        }\n        return maxS;\n    }\n}",
            "javascript": "function maxSubArray(nums) {\n    let currS = nums[0], maxS = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currS = Math.max(nums[i], currS + nums[i]);\n        maxS = Math.max(maxS, currS);\n    }\n    return maxS;\n}"
        }
    },
    {
        "id": "ARISE-P106",
        "leetcode_num": 206,
        "title": "Reverse Linked List (LeetCode #206)",
        "slug": "reverse-linked-list",
        "topic": "Linked Lists",
        "tags": ["Linked List", "Recursion"],
        "difficulty": "Easy",
        "acceptance": "75.8%",
        "verifiedXp": 40,
        "functionName": "reverseList",
        "description": "Given the `head` of a singly linked list (represented as an array of values `head`), reverse the list, and return the reversed list.",
        "examples": [
            {"input": "head = [1, 2, 3, 4, 5]", "output": "[5, 4, 3, 2, 1]", "explanation": "The list nodes are inverted in order."},
            {"input": "head = [1, 2]", "output": "[2, 1]", "explanation": "Two-element list reversed."},
            {"input": "head = []", "output": "[]", "explanation": "Empty list reversed is empty."}
        ],
        "constraints": [
            "The number of nodes in the list is the range [0, 5000].",
            "-5000 <= Node.val <= 5000"
        ],
        "hints": [
            "Hint 1: Maintain three pointers: prev, curr, and next_node to iteratively rewire pointers."
        ],
        "testCases": [
            {"id": 1, "input": "head = [1, 2, 3, 4, 5]", "expected": "[5, 4, 3, 2, 1]"},
            {"id": 2, "input": "head = [1, 2]", "expected": "[2, 1]"},
            {"id": 3, "input": "head = []", "expected": "[]"}
        ],
        "starter": {
            "c": "int* reverseList(int* head, int headSize, int* returnSize) {\n    // Implement optimal O(N) reversal\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> reverseList(std::vector<int>& head) {\n        // Implement optimal O(N) reversal\n        return {};\n    }\n};",
            "python": "class Solution:\n    def reverseList(self, head: list[int]) -> list[int]:\n        # Implement optimal O(N) reversal\n        pass",
            "java": "class Solution {\n    public int[] reverseList(int[] head) {\n        // Implement optimal O(N) reversal\n        return new int[0];\n    }\n}",
            "javascript": "function reverseList(head) {\n    // Write your optimal O(N) reversal\n    \n}",
            "typescript": "function reverseList(head: number[]): number[] {\n    // Implement optimal O(N) reversal\n    return [];\n}",
            "go": "func reverseList(head []int) []int {\n    // Implement optimal O(N) reversal\n    return []int{}\n}",
            "rust": "impl Solution {\n    pub fn reverse_list(head: Vec<i32>) -> Vec<i32> {\n        // Implement optimal O(N) reversal\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function reverseList(head) {\n    return head.slice().reverse();\n}",
            "python": "class Solution:\n    def reverseList(self, head: list[int]) -> list[int]:\n        return head[::-1]"
        }
    },
    {
        "id": "ARISE-P107",
        "leetcode_num": 704,
        "title": "Binary Search (LeetCode #704)",
        "slug": "binary-search",
        "topic": "Searching",
        "tags": ["Array", "Binary Search"],
        "difficulty": "Easy",
        "acceptance": "57.2%",
        "verifiedXp": 40,
        "functionName": "search",
        "description": "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
        "examples": [
            {"input": "nums = [-1, 0, 3, 5, 9, 12], target = 9", "output": "4", "explanation": "9 exists in nums and its index is 4."},
            {"input": "nums = [-1, 0, 3, 5, 9, 12], target = 2", "output": "-1", "explanation": "2 does not exist in nums so return -1."}
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
        "testCases": [
            {"id": 1, "input": "nums = [-1, 0, 3, 5, 9, 12], target = 9", "expected": "4"},
            {"id": 2, "input": "nums = [-1, 0, 3, 5, 9, 12], target = 2", "expected": "-1"}
        ],
        "starter": {
            "c": "int search(int* nums, int numsSize, int target) {\n    // Implement optimal O(log N) binary search\n    return -1;\n}",
            "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        // Implement optimal O(log N) binary search\n        return -1;\n    }\n};",
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Implement optimal O(log N) binary search\n        pass",
            "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Implement optimal O(log N) binary search\n        return -1;\n    }\n}",
            "javascript": "function search(nums, target) {\n    // Write your optimal O(log N) binary search\n    \n}",
            "typescript": "function search(nums: number[], target: number): number {\n    // Implement optimal O(log N) binary search\n    return -1;\n}",
            "go": "func search(nums []int, target int) int {\n    // Implement optimal O(log N) binary search\n    return -1\n}",
            "rust": "impl Solution {\n    pub fn search(nums: Vec<i32>, target: i32) -> i32 {\n        // Implement optimal O(log N) binary search\n        -1\n    }\n}"
        },
        "solutionCode": {
            "c": "int search(int* nums, int numsSize, int target) {\n    int l = 0, r = numsSize - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}",
            "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        int l = 0, r = (int)nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};",
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return -1",
            "javascript": "function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}"
        }
    },
    {
        "id": "ARISE-P108",
        "leetcode_num": 217,
        "title": "Contains Duplicate (LeetCode #217)",
        "slug": "contains-duplicate",
        "topic": "Hashing",
        "tags": ["Array", "Hash Table", "Sorting"],
        "difficulty": "Easy",
        "acceptance": "61.3%",
        "verifiedXp": 40,
        "functionName": "containsDuplicate",
        "description": "Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.",
        "examples": [
            {"input": "nums = [1, 2, 3, 1]", "output": "true", "explanation": "Element 1 appears twice."},
            {"input": "nums = [1, 2, 3, 4]", "output": "false", "explanation": "All elements are distinct."},
            {"input": "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]", "output": "true", "explanation": "Multiple duplicates exist."}
        ],
        "constraints": [
            "1 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9"
        ],
        "hints": [
            "Hint 1: A hash set allows O(1) average lookup and insertion.",
            "Hint 2: Insert each element into the set. If it already exists, return true."
        ],
        "testCases": [
            {"id": 1, "input": "nums = [1, 2, 3, 1]", "expected": "true"},
            {"id": 2, "input": "nums = [1, 2, 3, 4]", "expected": "false"},
            {"id": 3, "input": "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]", "expected": "true"}
        ],
        "starter": {
            "c": "bool containsDuplicate(int* nums, int numsSize) {\n    // Implement optimal O(N) hash set solution\n    return false;\n}",
            "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& nums) {\n        // Implement optimal O(N) hash set solution\n        return false;\n    }\n};",
            "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        # Implement optimal O(N) hash set solution\n        pass",
            "java": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Implement optimal O(N) hash set solution\n        return false;\n    }\n}",
            "javascript": "function containsDuplicate(nums) {\n    // Write your optimal O(N) hash set solution\n    \n}",
            "typescript": "function containsDuplicate(nums: number[]): boolean {\n    // Implement optimal O(N) hash set solution\n    return false;\n}",
            "go": "func containsDuplicate(nums []int) bool {\n    // Implement optimal O(N) hash set solution\n    return false\n}",
            "rust": "impl Solution {\n    pub fn contains_duplicate(nums: Vec<i32>) -> bool {\n        // Implement optimal O(N) hash set solution\n        false\n    }\n}"
        },
        "solutionCode": {
            "c": "bool containsDuplicate(int* nums, int numsSize) {\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] == nums[j]) return true;\n        }\n    }\n    return false;\n}",
            "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& nums) {\n        std::unordered_set<int> seen;\n        for (int x : nums) {\n            if (seen.count(x)) return true;\n            seen.insert(x);\n        }\n        return false;\n    }\n};",
            "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        seen = set()\n        for x in nums:\n            if x in seen:\n                return True\n            seen.add(x)\n        return False",
            "javascript": "function containsDuplicate(nums) {\n    const seen = new Set();\n    for (let i = 0; i < nums.length; i++) {\n        if (seen.has(nums[i])) return true;\n        seen.add(nums[i]);\n    }\n    return false;\n}"
        }
    },
    {
        "id": "ARISE-P109",
        "leetcode_num": 70,
        "title": "Climbing Stairs (LeetCode #70)",
        "slug": "climbing-stairs",
        "topic": "Dynamic Programming",
        "tags": ["Math", "Dynamic Programming", "Memoization"],
        "difficulty": "Easy",
        "acceptance": "52.8%",
        "verifiedXp": 40,
        "functionName": "climbStairs",
        "description": "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
        "examples": [
            {"input": "n = 2", "output": "2", "explanation": "There are two ways: (1+1) and (2)."},
            {"input": "n = 3", "output": "3", "explanation": "There are three ways: (1+1+1), (1+2), and (2+1)."}
        ],
        "constraints": [
            "1 <= n <= 45"
        ],
        "hints": [
            "Hint 1: To reach step n, you must come from either step (n-1) or step (n-2).",
            "Hint 2: dp[n] = dp[n-1] + dp[n-2], which matches the Fibonacci sequence!"
        ],
        "testCases": [
            {"id": 1, "input": "n = 2", "expected": "2"},
            {"id": 2, "input": "n = 3", "expected": "3"},
            {"id": 3, "input": "n = 5", "expected": "8"}
        ],
        "starter": {
            "c": "int climbStairs(int n) {\n    // Implement optimal O(N) DP / Fibonacci solution\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Implement optimal O(N) DP solution\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Implement optimal O(N) DP solution\n        pass",
            "java": "class Solution {\n    public int climbStairs(int n) {\n        // Implement optimal O(N) DP solution\n        return 0;\n    }\n}",
            "javascript": "function climbStairs(n) {\n    // Write your optimal O(N) DP solution\n    \n}",
            "typescript": "function climbStairs(n: number): number {\n    // Implement optimal O(N) DP solution\n    return 0;\n}",
            "go": "func climbStairs(n int) int {\n    // Implement optimal O(N) DP solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn climb_stairs(n: i32) -> i32 {\n        // Implement optimal O(N) DP solution\n        0\n    }\n}"
        },
        "solutionCode": {
            "c": "int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b; a = b; b = c;\n    }\n    return b;\n}",
            "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; ++i) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};",
            "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b",
            "javascript": "function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        const c = a + b; a = b; b = c;\n    }\n    return b;\n}"
        }
    },

    # ---------------- MEDIUM (10-18) ----------------
    {
        "id": "ARISE-P201",
        "leetcode_num": 15,
        "title": "3Sum (LeetCode #15)",
        "slug": "3sum",
        "topic": "Arrays",
        "tags": ["Array", "Two Pointers", "Sorting"],
        "difficulty": "Medium",
        "acceptance": "34.7%",
        "verifiedXp": 60,
        "functionName": "threeSum",
        "description": "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
        "examples": [
            {"input": "nums = [-1, 0, 1, 2, -1, -4]", "output": "[[-1, -1, 2], [-1, 0, 1]]", "explanation": "The distinct triplets are [-1, 0, 1] and [-1, -1, 2]."},
            {"input": "nums = [0, 1, 1]", "output": "[]", "explanation": "The only possible triplet does not sum up to 0."},
            {"input": "nums = [0, 0, 0]", "output": "[[0, 0, 0]]", "explanation": "The only possible triplet sums up to 0."}
        ],
        "constraints": [
            "3 <= nums.length <= 3000",
            "-10^5 <= nums[i] <= 10^5"
        ],
        "hints": [
            "Hint 1: Sort the array first so you can use two pointers and easily skip duplicate elements."
        ],
        "testCases": [
            {"id": 1, "input": "nums = [-1, 0, 1, 2, -1, -4]", "expected": "[[-1, -1, 2], [-1, 0, 1]]"},
            {"id": 2, "input": "nums = [0, 1, 1]", "expected": "[]"},
            {"id": 3, "input": "nums = [0, 0, 0]", "expected": "[[0, 0, 0]]"}
        ],
        "starter": {
            "c": "int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // Implement optimal O(N^2) sorting + two-pointer solution\n    *returnSize = 0;\n    return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {\n        // Implement optimal O(N^2) sorting + two-pointer solution\n        return {};\n    }\n};",
            "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Implement optimal O(N^2) sorting + two-pointer solution\n        pass",
            "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Implement optimal O(N^2) sorting + two-pointer solution\n        return new ArrayList<>();\n    }\n}",
            "javascript": "function threeSum(nums) {\n    // Write your optimal O(N^2) two-pointer solution\n    \n}",
            "typescript": "function threeSum(nums: number[]): number[][] {\n    // Implement optimal O(N^2) two-pointer solution\n    return [];\n}",
            "go": "func threeSum(nums []int) [][]int {\n    // Implement optimal O(N^2) two-pointer solution\n    return [][]int{}\n}",
            "rust": "impl Solution {\n    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {\n        // Implement optimal O(N^2) two-pointer solution\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function threeSum(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                res.push([nums[i], nums[l], nums[r]]);\n                while (l < r && nums[l] === nums[l + 1]) l++;\n                while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}",
            "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums) - 2):\n            if i > 0 and nums[i] == nums[i - 1]: continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s == 0:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]: l += 1\n                    while l < r and nums[r] == nums[r - 1]: r -= 1\n                    l += 1; r -= 1\n                elif s < 0: l += 1\n                else: r -= 1\n        return res"
        }
    },
    {
        "id": "ARISE-P202",
        "leetcode_num": 3,
        "title": "Longest Substring Without Repeating Characters (LeetCode #3)",
        "slug": "longest-substring-without-repeating-characters",
        "topic": "Strings",
        "tags": ["Hash Table", "String", "Sliding Window"],
        "difficulty": "Medium",
        "acceptance": "34.8%",
        "verifiedXp": 60,
        "functionName": "lengthOfLongestSubstring",
        "description": "Given a string `s`, find the length of the **longest substring** without repeating characters.",
        "examples": [
            {"input": "s = 'abcabcbb'", "output": "3", "explanation": "The answer is 'abc', with the length of 3."},
            {"input": "s = 'bbbbb'", "output": "1", "explanation": "The answer is 'b', with the length of 1."},
            {"input": "s = 'pwwkew'", "output": "3", "explanation": "The answer is 'wke', with the length of 3."}
        ],
        "constraints": [
            "0 <= s.length <= 5 * 10^4",
            "s consists of English letters, digits, symbols and spaces."
        ],
        "hints": [
            "Hint 1: Maintain a sliding window [left, right] and a hash map of seen characters with their last seen indices."
        ],
        "testCases": [
            {"id": 1, "input": "s = 'abcabcbb'", "expected": "3"},
            {"id": 2, "input": "s = 'bbbbb'", "expected": "1"},
            {"id": 3, "input": "s = 'pwwkew'", "expected": "3"}
        ],
        "starter": {
            "c": "int lengthOfLongestSubstring(char* s) {\n    // Implement optimal O(N) sliding window\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(const std::string& s) {\n        // Implement optimal O(N) sliding window\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Implement optimal O(N) sliding window\n        pass",
            "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Implement optimal O(N) sliding window\n        return 0;\n    }\n}",
            "javascript": "function lengthOfLongestSubstring(s) {\n    // Write your optimal O(N) sliding window\n    \n}",
            "typescript": "function lengthOfLongestSubstring(s: string): number {\n    // Implement optimal O(N) sliding window\n    return 0;\n}",
            "go": "func lengthOfLongestSubstring(s string) int {\n    // Implement optimal O(N) sliding window\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn length_of_longest_substring(s: String) -> i32 {\n        // Implement optimal O(N) sliding window\n        0\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function lengthOfLongestSubstring(s) {\n    let seen = new Map();\n    let maxLen = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        if (seen.has(s[r]) && seen.get(s[r]) >= l) {\n            l = seen.get(s[r]) + 1;\n        }\n        seen.set(s[r], r);\n        maxLen = Math.max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}",
            "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        l = max_len = 0\n        for r, ch in enumerate(s):\n            if ch in seen and seen[ch] >= l:\n                l = seen[ch] + 1\n            seen[ch] = r\n            max_len = max(max_len, r - l + 1)\n        return max_len"
        }
    },
    {
        "id": "ARISE-P203",
        "leetcode_num": 11,
        "title": "Container With Most Water (LeetCode #11)",
        "slug": "container-with-most-water",
        "topic": "Arrays",
        "tags": ["Array", "Two Pointers", "Greedy"],
        "difficulty": "Medium",
        "acceptance": "55.3%",
        "verifiedXp": 60,
        "functionName": "maxArea",
        "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
        "examples": [
            {"input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]", "output": "49", "explanation": "The vertical lines at indices 1 and 8 hold max area = min(8, 7) * (8 - 1) = 7 * 7 = 49."},
            {"input": "height = [1, 1]", "output": "1", "explanation": "Width 1 * min(1, 1) = 1."}
        ],
        "constraints": [
            "n == height.length",
            "2 <= n <= 10^5",
            "0 <= height[i] <= 10^4"
        ],
        "hints": [
            "Hint 1: Two pointers at both ends. The area is limited by the shorter line. Advance the pointer with the smaller height."
        ],
        "testCases": [
            {"id": 1, "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]", "expected": "49"},
            {"id": 2, "input": "height = [1, 1]", "expected": "1"}
        ],
        "starter": {
            "c": "int maxArea(int* height, int heightSize) {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int maxArea(const std::vector<int>& height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Implement optimal O(N) two-pointer solution\n        pass",
            "java": "class Solution {\n    public int maxArea(int[] height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n}",
            "javascript": "function maxArea(height) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
            "typescript": "function maxArea(height: number[]): number {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
            "go": "func maxArea(height []int) int {\n    // Implement optimal O(N) two-pointer solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn max_area(height: Vec<i32>) -> i32 {\n        // Implement optimal O(N) two-pointer solution\n        0\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function maxArea(height) {\n    let l = 0, r = height.length - 1, maxA = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        maxA = Math.max(maxA, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}",
            "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_a = 0\n        while l < r:\n            h = min(height[l], height[r])\n            max_a = max(max_a, h * (r - l))\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_a"
        }
    },
    {
        "id": "ARISE-P204",
        "leetcode_num": 238,
        "title": "Product of Array Except Self (LeetCode #238)",
        "slug": "product-of-array-except-self",
        "topic": "Arrays",
        "tags": ["Array", "Prefix Sum"],
        "difficulty": "Medium",
        "acceptance": "66.2%",
        "verifiedXp": 60,
        "functionName": "productExceptSelf",
        "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
        "examples": [
            {"input": "nums = [1, 2, 3, 4]", "output": "[24, 12, 8, 6]", "explanation": "2*3*4=24, 1*3*4=12, 1*2*4=8, 1*2*3=6."},
            {"input": "nums = [-1, 1, 0, -3, 3]", "output": "[0, 0, 9, 0, 0]", "explanation": "Indices with 0 in array yield 0 except index 2."}
        ],
        "constraints": [
            "2 <= nums.length <= 10^5",
            "-30 <= nums[i] <= 30",
            "The product of any prefix or suffix fits in a 32-bit integer."
        ],
        "hints": [
            "Hint 1: Construct prefix products from left, then multiply by suffix products from right in a second pass."
        ],
        "testCases": [
            {"id": 1, "input": "nums = [1, 2, 3, 4]", "expected": "[24, 12, 8, 6]"},
            {"id": 2, "input": "nums = [-1, 1, 0, -3, 3]", "expected": "[0, 0, 9, 0, 0]"}
        ],
        "starter": {
            "c": "int* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    // Implement optimal O(N) prefix-suffix product without division\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> productExceptSelf(const std::vector<int>& nums) {\n        // Implement optimal O(N) solution\n        return {};\n    }\n};",
            "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        # Implement optimal O(N) solution\n        pass",
            "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Implement optimal O(N) solution\n        return new int[0];\n    }\n}",
            "javascript": "function productExceptSelf(nums) {\n    // Write your optimal O(N) prefix-suffix solution\n    \n}",
            "typescript": "function productExceptSelf(nums: number[]): number[] {\n    // Implement optimal O(N) solution\n    return [];\n}",
            "go": "func productExceptSelf(nums []int) []int {\n    // Implement optimal O(N) solution\n    return []int{}\n}",
            "rust": "impl Solution {\n    pub fn product_except_self(nums: Vec<i32>) -> Vec<i32> {\n        // Implement optimal O(N) solution\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function productExceptSelf(nums) {\n    const n = nums.length;\n    const res = new Array(n).fill(1);\n    let pref = 1;\n    for (let i = 0; i < n; i++) {\n        res[i] = pref;\n        pref *= nums[i];\n    }\n    let suff = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        res[i] *= suff;\n        suff *= nums[i];\n    }\n    return res;\n}",
            "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        pref = 1\n        for i in range(n):\n            res[i] = pref\n            pref *= nums[i]\n        suff = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= suff\n            suff *= nums[i]\n        return res"
        }
    },
    {
        "id": "ARISE-P205",
        "leetcode_num": 322,
        "title": "Coin Change (LeetCode #322)",
        "slug": "coin-change",
        "topic": "Dynamic Programming",
        "tags": ["Array", "Dynamic Programming", "Breadth-First Search"],
        "difficulty": "Medium",
        "acceptance": "43.5%",
        "verifiedXp": 60,
        "functionName": "coinChange",
        "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
        "examples": [
            {"input": "coins = [1, 2, 5], amount = 11", "output": "3", "explanation": "11 = 5 + 5 + 1 (3 coins)."},
            {"input": "coins = [2], amount = 3", "output": "-1", "explanation": "Amount 3 cannot be formed with denomination 2."},
            {"input": "coins = [1], amount = 0", "output": "0", "explanation": "0 amount takes 0 coins."}
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
        "testCases": [
            {"id": 1, "input": "coins = [1, 2, 5], amount = 11", "expected": "3"},
            {"id": 2, "input": "coins = [2], amount = 3", "expected": "-1"},
            {"id": 3, "input": "coins = [1], amount = 0", "expected": "0"}
        ],
        "starter": {
            "c": "int coinChange(int* coins, int coinsSize, int amount) {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1;\n}",
            "cpp": "class Solution {\npublic:\n    int coinChange(const std::vector<int>& coins, int amount) {\n        // Implement optimal O(amount * len(coins)) DP\n        return -1;\n    }\n};",
            "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # Implement optimal O(amount * len(coins)) DP\n        pass",
            "java": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Implement optimal O(amount * len(coins)) DP\n        return -1;\n    }\n}",
            "javascript": "function coinChange(coins, amount) {\n    // Write your optimal O(amount * len(coins)) DP\n    \n}",
            "typescript": "function coinChange(coins: number[], amount: number): number {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1;\n}",
            "go": "func coinChange(coins []int, amount int) int {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1\n}",
            "rust": "impl Solution {\n    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {\n        // Implement optimal O(amount * len(coins)) DP\n        -1\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (let c of coins) {\n            if (i >= c && dp[i - c] !== Infinity) {\n                dp[i] = Math.min(dp[i], dp[i - c] + 1);\n            }\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}",
            "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for c in coins:\n                if i >= c:\n                    dp[i] = min(dp[i], dp[i - c] + 1)\n        return -1 if dp[amount] == float('inf') else int(dp[amount])"
        }
    },
    {
        "id": "ARISE-P206",
        "leetcode_num": 33,
        "title": "Search in Rotated Sorted Array (LeetCode #33)",
        "slug": "search-in-rotated-sorted-array",
        "topic": "Searching",
        "tags": ["Array", "Binary Search"],
        "difficulty": "Medium",
        "acceptance": "40.3%",
        "verifiedXp": 60,
        "functionName": "search",
        "description": "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`).\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
        "examples": [
            {"input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0", "output": "4", "explanation": "Target 0 is found at index 4."},
            {"input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 3", "output": "-1", "explanation": "Target 3 is not in nums."}
        ],
        "constraints": [
            "1 <= nums.length <= 5000",
            "-10^4 <= nums[i] <= 10^4",
            "All values of nums are unique."
        ],
        "hints": [
            "Hint 1: At least one half of the array (left half [l..mid] or right half [mid..r]) is always strictly sorted."
        ],
        "testCases": [
            {"id": 1, "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0", "expected": "4"},
            {"id": 2, "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 3", "expected": "-1"}
        ],
        "starter": {
            "c": "int search(int* nums, int numsSize, int target) {\n    // Implement optimal O(log N) rotated binary search\n    return -1;\n}",
            "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        // Implement optimal O(log N) rotated binary search\n        return -1;\n    }\n};",
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Implement optimal O(log N) rotated binary search\n        pass",
            "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Implement optimal O(log N) rotated binary search\n        return -1;\n    }\n}",
            "javascript": "function search(nums, target) {\n    // Write your optimal O(log N) rotated binary search\n    \n}",
            "typescript": "function search(nums: number[], target: number): number {\n    // Implement optimal O(log N) rotated binary search\n    return -1;\n}",
            "go": "func search(nums []int, target int) int {\n    // Implement optimal O(log N) rotated binary search\n    return -1\n}",
            "rust": "impl Solution {\n    pub fn search(nums: Vec<i32>, target: i32) -> i32 {\n        // Implement optimal O(log N) rotated binary search\n        -1\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[l] <= nums[mid]) {\n            if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}",
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target: return mid\n            if nums[l] <= nums[mid]:\n                if nums[l] <= target < nums[mid]: r = mid - 1\n                else: l = mid + 1\n            else:\n                if nums[mid] < target <= nums[r]: l = mid + 1\n                else: r = mid - 1\n        return -1"
        }
    },
    {
        "id": "ARISE-P207",
        "leetcode_num": 146,
        "title": "LRU Cache (LeetCode #146)",
        "slug": "lru-cache",
        "topic": "Hashing",
        "tags": ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
        "difficulty": "Medium",
        "acceptance": "42.1%",
        "verifiedXp": 60,
        "functionName": "LRUCache",
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
        "testCases": [
            {
                "id": 1,
                "input": "capacity = 2, operations = [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2]]",
                "expected": "[null, null, 1, null, -1]"
            }
        ],
        "starter": {
            "c": "// Implement LRU Cache with O(1) get and put\nint LRUCache(int capacity, void* operations) { return 0; }",
            "cpp": "class LRUCache {\npublic:\n    LRUCache(int capacity) {}\n    int get(int key) { return -1; }\n    void put(int key, int value) {}\n};",
            "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n    def get(self, key: int) -> int:\n        return -1\n    def put(self, key: int, value: int) -> None:\n        pass",
            "java": "class LRUCache {\n    public LRUCache(int capacity) {}\n    public int get(int key) { return -1; }\n    public void put(int key, int value) {}\n}",
            "javascript": "function LRUCache(capacity, operations) {\n    // Implement LRU Cache supporting get and put\n    \n}",
            "typescript": "function LRUCache(capacity: number, operations: any[][]): any[] {\n    return [];\n}",
            "go": "type LRUCache struct {}\nfunc Constructor(capacity int) LRUCache { return LRUCache{} }\nfunc (this *LRUCache) Get(key int) int { return -1 }\nfunc (this *LRUCache) Put(key int, value int) {}",
            "rust": "struct LRUCache {}\nimpl LRUCache {\n    pub fn new(capacity: i32) -> Self { Self {} }\n    pub fn get(&mut self, key: i32) -> i32 { -1 }\n    pub fn put(&mut self, key: i32, value: i32) {}\n}"
        },
        "solutionCode": {
            "javascript": "function LRUCache(capacity, operations) {\n    const map = new Map();\n    const out = [];\n    for (const op of operations) {\n        if (op[0] === 'put') {\n            if (map.has(op[1])) map.delete(op[1]);\n            else if (map.size >= capacity) {\n                const firstKey = map.keys().next().value;\n                map.delete(firstKey);\n            }\n            map.set(op[1], op[2]);\n            out.push(null);\n        } else if (op[0] === 'get') {\n            if (!map.has(op[1])) out.push(-1);\n            else {\n                const v = map.get(op[1]);\n                map.delete(op[1]);\n                map.set(op[1], v);\n                out.push(v);\n            }\n        }\n    }\n    return out;\n}"
        }
    },
    {
        "id": "ARISE-P208",
        "leetcode_num": 200,
        "title": "Number of Islands (LeetCode #200)",
        "slug": "number-of-islands",
        "topic": "Graphs",
        "tags": ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
        "difficulty": "Medium",
        "acceptance": "58.4%",
        "verifiedXp": 60,
        "functionName": "numIslands",
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
        "starter": {
            "c": "int numIslands(char** grid, int gridSize, int* gridColSize) {\n    // Implement optimal O(M * N) DFS/BFS\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int numIslands(std::vector<std::vector<char>>& grid) {\n        // Implement optimal O(M * N) DFS/BFS\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # Implement optimal O(M * N) DFS/BFS\n        pass",
            "java": "class Solution {\n    public int numIslands(char[][] grid) {\n        // Implement optimal O(M * N) DFS/BFS\n        return 0;\n    }\n}",
            "javascript": "function numIslands(grid) {\n    // Write your optimal O(M * N) DFS/BFS\n    \n}",
            "typescript": "function numIslands(grid: string[][]): number {\n    // Implement optimal O(M * N) DFS/BFS\n    return 0;\n}",
            "go": "func numIslands(grid [][]byte) int {\n    // Implement optimal O(M * N) DFS/BFS\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn num_islands(grid: Vec<Vec<char>>) -> i32 {\n        // Implement optimal O(M * N) DFS/BFS\n        0\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function numIslands(grid) {\n    if (!grid || grid.length === 0) return 0;\n    let count = 0;\n    const m = grid.length, n = grid[0].length;\n    function dfs(r, c) {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n    }\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === '1') {\n                count++;\n                dfs(r, c);\n            }\n        }\n    }\n    return count;\n}",
            "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        if not grid: return 0\n        m, n = len(grid), len(grid[0])\n        count = 0\n        def dfs(r, c):\n            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1': return\n            grid[r][c] = '0'\n            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] == '1':\n                    count += 1\n                    dfs(r, c)\n        return count"
        }
    },
    {
        "id": "ARISE-P209",
        "leetcode_num": 49,
        "title": "Group Anagrams (LeetCode #49)",
        "slug": "group-anagrams",
        "topic": "Strings",
        "tags": ["Array", "Hash Table", "String", "Sorting"],
        "difficulty": "Medium",
        "acceptance": "67.8%",
        "verifiedXp": 60,
        "functionName": "groupAnagrams",
        "description": "Given an array of strings `strs`, group the **anagrams** together. You can return the answer in **any order**.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        "examples": [
            {
                "input": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
                "output": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]",
                "explanation": "bat stands alone, nat/tan share letters, and ate/eat/tea share letters."
            },
            {"input": "strs = [\"\"]", "output": "[[\"\"]]", "explanation": "Empty string grouping."},
            {"input": "strs = [\"a\"]", "output": "[[\"a\"]]", "explanation": "Single character grouping."}
        ],
        "constraints": [
            "1 <= strs.length <= 10^4",
            "0 <= strs[i].length <= 100",
            "strs[i] consists of lowercase English letters."
        ],
        "hints": [
            "Hint 1: Two strings are anagrams if and only if their sorted character sequences are identical."
        ],
        "testCases": [
            {
                "id": 1,
                "input": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
                "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]"
            },
            {"id": 2, "input": "strs = [\"\"]", "expected": "[[\"\"]]"},
            {"id": 3, "input": "strs = [\"a\"]", "expected": "[[\"a\"]]"}
        ],
        "starter": {
            "c": "char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    // Implement optimal O(N * K log K) hash map grouping\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n        // Implement optimal O(N * K log K) hash map grouping\n        return {};\n    }\n};",
            "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        # Implement optimal O(N * K log K) hash map grouping\n        pass",
            "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Implement optimal O(N * K log K) hash map grouping\n        return new ArrayList<>();\n    }\n}",
            "javascript": "function groupAnagrams(strs) {\n    // Write your optimal O(N * K log K) hash map grouping\n    \n}",
            "typescript": "function groupAnagrams(strs: string[]): string[][] {\n    // Implement optimal O(N * K log K) hash map grouping\n    return [];\n}",
            "go": "func groupAnagrams(strs []string) [][]string {\n    // Implement optimal O(N * K log K) hash map grouping\n    return [][]string{}\n}",
            "rust": "impl Solution {\n    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {\n        // Implement optimal O(N * K log K) hash map grouping\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function groupAnagrams(strs) {\n    const map = new Map();\n    for (const s of strs) {\n        const key = s.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(s);\n    }\n    return Array.from(map.values());\n}",
            "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        from collections import defaultdict\n        d = defaultdict(list)\n        for s in strs:\n            d[''.join(sorted(s))].append(s)\n        return list(d.values())"
        }
    },

    # ---------------- HARD (19-24) ----------------
    {
        "id": "ARISE-P301",
        "leetcode_num": 42,
        "title": "Trapping Rain Water (LeetCode #42)",
        "slug": "trapping-rain-water",
        "topic": "Arrays",
        "tags": ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
        "difficulty": "Hard",
        "acceptance": "60.8%",
        "verifiedXp": 80,
        "functionName": "trap",
        "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
        "examples": [
            {"input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", "output": "6", "explanation": "6 units of rain water are being trapped."},
            {"input": "height = [4, 2, 0, 3, 2, 5]", "output": "9", "explanation": "9 units of rain water are trapped."}
        ],
        "constraints": [
            "n == height.length",
            "1 <= n <= 2 * 10^4",
            "0 <= height[i] <= 10^5"
        ],
        "hints": [
            "Hint 1: Use two pointers at left and right with left_max and right_max trackers."
        ],
        "testCases": [
            {"id": 1, "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", "expected": "6"},
            {"id": 2, "input": "height = [4, 2, 0, 3, 2, 5]", "expected": "9"}
        ],
        "starter": {
            "c": "int trap(int* height, int heightSize) {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
            "cpp": "class Solution {\npublic:\n    int trap(const std::vector<int>& height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n};",
            "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Implement optimal O(N) two-pointer solution\n        pass",
            "java": "class Solution {\n    public int trap(int[] height) {\n        // Implement optimal O(N) two-pointer solution\n        return 0;\n    }\n}",
            "javascript": "function trap(height) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
            "typescript": "function trap(height: number[]): number {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
            "go": "func trap(height []int) int {\n    // Implement optimal O(N) two-pointer solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn trap(height: Vec<i32>) -> i32 {\n        // Implement optimal O(N) two-pointer solution\n        0\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function trap(height) {\n    let l = 0, r = height.length - 1;\n    let lMax = 0, rMax = 0, res = 0;\n    while (l < r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else res += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else res += rMax - height[r];\n            r--;\n        }\n    }\n    return res;\n}",
            "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        l_max = r_max = res = 0\n        while l < r:\n            if height[l] <= height[r]:\n                if height[l] >= l_max: l_max = height[l]\n                else: res += l_max - height[l]\n                l += 1\n            else:\n                if height[r] >= r_max: r_max = height[r]\n                else: res += r_max - height[r]\n                r -= 1\n        return res"
        }
    },
    {
        "id": "ARISE-P302",
        "leetcode_num": 4,
        "title": "Median of Two Sorted Arrays (LeetCode #4)",
        "slug": "median-of-two-sorted-arrays",
        "topic": "Searching",
        "tags": ["Array", "Binary Search", "Divide and Conquer"],
        "difficulty": "Hard",
        "acceptance": "39.5%",
        "verifiedXp": 80,
        "functionName": "findMedianSortedArrays",
        "description": "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the **median** of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`.",
        "examples": [
            {"input": "nums1 = [1, 3], nums2 = [2]", "output": "2", "explanation": "Merged array = [1, 2, 3] and median is 2."},
            {"input": "nums1 = [1, 2], nums2 = [3, 4]", "output": "2.5", "explanation": "Merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5."}
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
        "testCases": [
            {"id": 1, "input": "nums1 = [1, 3], nums2 = [2]", "expected": "2"},
            {"id": 2, "input": "nums1 = [1, 2], nums2 = [3, 4]", "expected": "2.5"}
        ],
        "starter": {
            "c": "double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    // Implement optimal O(log(min(m, n))) binary search\n    return 0.0;\n}",
            "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(const std::vector<int>& nums1, const std::vector<int>& nums2) {\n        // Implement optimal O(log(min(m, n))) binary search\n        return 0.0;\n    }\n};",
            "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        # Implement optimal O(log(min(m, n))) binary search\n        pass",
            "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Implement optimal O(log(min(m, n))) binary search\n        return 0.0;\n    }\n}",
            "javascript": "function findMedianSortedArrays(nums1, nums2) {\n    // Write your optimal O(log(min(m, n))) binary search\n    \n}",
            "typescript": "function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    // Implement optimal O(log(min(m, n))) binary search\n    return 0;\n}",
            "go": "func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    // Implement optimal O(log(min(m, n))) binary search\n    return 0.0\n}",
            "rust": "impl Solution {\n    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {\n        // Implement optimal O(log(min(m, n))) binary search\n        0.0\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function findMedianSortedArrays(nums1, nums2) {\n    const merged = [];\n    let i = 0, j = 0;\n    while (i < nums1.length && j < nums2.length) {\n        if (nums1[i] < nums2[j]) merged.push(nums1[i++]);\n        else merged.push(nums2[j++]);\n    }\n    while (i < nums1.length) merged.push(nums1[i++]);\n    while (j < nums2.length) merged.push(nums2[j++]);\n    const mid = Math.floor(merged.length / 2);\n    if (merged.length % 2 === 1) return merged[mid];\n    return (merged[mid - 1] + merged[mid]) / 2.0;\n}",
            "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        merged = sorted(nums1 + nums2)\n        mid = len(merged) // 2\n        if len(merged) % 2 == 1: return float(merged[mid])\n        return (merged[mid - 1] + merged[mid]) / 2.0"
        }
    },
    {
        "id": "ARISE-P303",
        "leetcode_num": 23,
        "title": "Merge k Sorted Lists (LeetCode #23)",
        "slug": "merge-k-sorted-lists",
        "topic": "Heaps",
        "tags": ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
        "difficulty": "Hard",
        "acceptance": "51.8%",
        "verifiedXp": 80,
        "functionName": "mergeKLists",
        "description": "You are given an array of `k` linked-lists `lists` (each represented as a sorted array), each linked-list is sorted in ascending order.\n\n*Merge all the linked-lists into one sorted linked-list and return it.*",
        "examples": [
            {"input": "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]", "output": "[1, 1, 2, 3, 4, 4, 5, 6]", "explanation": "The merged sorted list is [1, 1, 2, 3, 4, 4, 5, 6]."},
            {"input": "lists = []", "output": "[]", "explanation": "Empty list of lists returns empty."},
            {"input": "lists = [[]]", "output": "[]", "explanation": "Single empty list returns empty."}
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
        "testCases": [
            {"id": 1, "input": "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]", "expected": "[1, 1, 2, 3, 4, 4, 5, 6]"},
            {"id": 2, "input": "lists = []", "expected": "[]"},
            {"id": 3, "input": "lists = [[]]", "expected": "[]"}
        ],
        "starter": {
            "c": "int* mergeKLists(int** lists, int listsSize, int* listsColSize, int* returnSize) {\n    // Implement optimal O(N log K) min-heap merger\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> mergeKLists(std::vector<std::vector<int>>& lists) {\n        // Implement optimal O(N log K) min-heap merger\n        return {};\n    }\n};",
            "python": "class Solution:\n    def mergeKLists(self, lists: list[list[int]]) -> list[int]:\n        # Implement optimal O(N log K) min-heap merger\n        pass",
            "java": "import java.util.*;\nclass Solution {\n    public List<Integer> mergeKLists(int[][] lists) {\n        // Implement optimal O(N log K) min-heap merger\n        return new ArrayList<>();\n    }\n}",
            "javascript": "function mergeKLists(lists) {\n    // Write your optimal O(N log K) min-heap merger\n    \n}",
            "typescript": "function mergeKLists(lists: number[][]): number[] {\n    // Implement optimal O(N log K) min-heap merger\n    return [];\n}",
            "go": "func mergeKLists(lists [][]int) []int {\n    // Implement optimal O(N log K) min-heap merger\n    return []int{}\n}",
            "rust": "impl Solution {\n    pub fn merge_k_lists(lists: Vec<Vec<i32>>) -> Vec<i32> {\n        // Implement optimal O(N log K) min-heap merger\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function mergeKLists(lists) {\n    const res = [];\n    for (const l of lists) {\n        for (const val of l) res.push(val);\n    }\n    return res.sort((a, b) => a - b);\n}",
            "python": "class Solution:\n    def mergeKLists(self, lists: list[list[int]]) -> list[int]:\n        import heapq\n        heap = []\n        for l in lists:\n            for val in l:\n                heapq.heappush(heap, val)\n        return [heapq.heappop(heap) for _ in range(len(heap))]"
        }
    },
    {
        "id": "ARISE-P304",
        "leetcode_num": 76,
        "title": "Minimum Window Substring (LeetCode #76)",
        "slug": "minimum-window-substring",
        "topic": "Strings",
        "tags": ["Hash Table", "String", "Sliding Window"],
        "difficulty": "Hard",
        "acceptance": "42.3%",
        "verifiedXp": 80,
        "functionName": "minWindow",
        "description": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (**including duplicates**) is included in the window. If there is no such substring, return the empty string `\"\"`.\n\nThe testcases will be generated such that the answer is **unique**.",
        "examples": [
            {"input": "s = 'ADOBECODEBANC', t = 'ABC'", "output": "BANC", "explanation": "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t."},
            {"input": "s = 'a', t = 'a'", "output": "a", "explanation": "The entire string s is the minimum window."},
            {"input": "s = 'a', t = 'aa'", "output": "", "explanation": "Both 'a's from t must be included in the window, not possible so empty."}
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
        "testCases": [
            {"id": 1, "input": "s = 'ADOBECODEBANC', t = 'ABC'", "expected": "BANC"},
            {"id": 2, "input": "s = 'a', t = 'a'", "expected": "a"},
            {"id": 3, "input": "s = 'a', t = 'aa'", "expected": ""}
        ],
        "starter": {
            "c": "char* minWindow(char* s, char* t) {\n    // Implement optimal O(N) sliding window\n    return \"\";\n}",
            "cpp": "class Solution {\npublic:\n    std::string minWindow(const std::string& s, const std::string& t) {\n        // Implement optimal O(N) sliding window\n        return \"\";\n    }\n};",
            "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Implement optimal O(N) sliding window\n        pass",
            "java": "class Solution {\n    public String minWindow(String s, String t) {\n        // Implement optimal O(N) sliding window\n        return \"\";\n    }\n}",
            "javascript": "function minWindow(s, t) {\n    // Write your optimal O(N) sliding window\n    \n}",
            "typescript": "function minWindow(s: string, t: string): string {\n    // Implement optimal O(N) sliding window\n    return \"\";\n}",
            "go": "func minWindow(s string, t string) string {\n    // Implement optimal O(N) sliding window\n    return \"\"\n}",
            "rust": "impl Solution {\n    pub fn min_window(s: String, t: String) -> String {\n        // Implement optimal O(N) sliding window\n        String::new()\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function minWindow(s, t) {\n    if (!s || !t || s.length < t.length) return '';\n    const target = {};\n    for (const c of t) target[c] = (target[c] || 0) + 1;\n    let required = Object.keys(target).length;\n    let window = {};\n    let formed = 0;\n    let l = 0, minLen = Infinity, start = 0;\n    for (let r = 0; r < s.length; r++) {\n        const c = s[r];\n        window[c] = (window[c] || 0) + 1;\n        if (target[c] && window[c] === target[c]) formed++;\n        while (l <= r && formed === required) {\n            if (r - l + 1 < minLen) {\n                minLen = r - l + 1;\n                start = l;\n            }\n            const lc = s[l];\n            window[lc]--;\n            if (target[lc] && window[lc] < target[lc]) formed--;\n            l++;\n        }\n    }\n    return minLen === Infinity ? '' : s.substring(start, start + minLen);\n}"
        }
    },
    {
        "id": "ARISE-P305",
        "leetcode_num": 239,
        "title": "Sliding Window Maximum (LeetCode #239)",
        "slug": "sliding-window-maximum",
        "topic": "Queues",
        "tags": ["Array", "Queue", "Sliding Window", "Monotonic Queue"],
        "difficulty": "Hard",
        "acceptance": "46.7%",
        "verifiedXp": 80,
        "functionName": "maxSlidingWindow",
        "description": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.",
        "examples": [
            {"input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3", "output": "[3, 3, 5, 5, 6, 7]", "explanation": "Window position yields max 3, 3, 5, 5, 6, 7."},
            {"input": "nums = [1], k = 1", "output": "[1]", "explanation": "Single element array."}
        ],
        "constraints": [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4",
            "1 <= k <= nums.length"
        ],
        "hints": [
            "Hint 1: Use a monotonic deque storing indices in decreasing order of values."
        ],
        "testCases": [
            {"id": 1, "input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3", "expected": "[3, 3, 5, 5, 6, 7]"},
            {"id": 2, "input": "nums = [1], k = 1", "expected": "[1]"}
        ],
        "starter": {
            "c": "int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {\n    // Implement optimal O(N) monotonic deque\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {\n        // Implement optimal O(N) monotonic deque\n        return {};\n    }\n};",
            "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        # Implement optimal O(N) monotonic deque\n        pass",
            "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Implement optimal O(N) monotonic deque\n        return new int[0];\n    }\n}",
            "javascript": "function maxSlidingWindow(nums, k) {\n    // Write your optimal O(N) monotonic deque\n    \n}",
            "typescript": "function maxSlidingWindow(nums: number[], k: number): number[] {\n    // Implement optimal O(N) monotonic deque\n    return [];\n}",
            "go": "func maxSlidingWindow(nums []int, k int) []int {\n    // Implement optimal O(N) monotonic deque\n    return []int{}\n}",
            "rust": "impl Solution {\n    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {\n        // Implement optimal O(N) monotonic deque\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function maxSlidingWindow(nums, k) {\n    const q = [];\n    const res = [];\n    for (let i = 0; i < nums.length; i++) {\n        while (q.length && q[0] <= i - k) q.shift();\n        while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();\n        q.push(i);\n        if (i >= k - 1) res.push(nums[q[0]]);\n    }\n    return res;\n}",
            "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        from collections import deque\n        q = deque()\n        res = []\n        for i, x in enumerate(nums):\n            while q and q[0] <= i - k: q.popleft()\n            while q and nums[q[-1]] <= x: q.pop()\n            q.append(i)\n            if i >= k - 1: res.append(nums[q[0]])\n        return res"
        }
    },
    {
        "id": "ARISE-P306",
        "leetcode_num": 51,
        "title": "N-Queens (LeetCode #51)",
        "slug": "n-queens",
        "topic": "Backtracking",
        "tags": ["Array", "Backtracking"],
        "difficulty": "Hard",
        "acceptance": "66.5%",
        "verifiedXp": 80,
        "functionName": "solveNQueens",
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
        "starter": {
            "c": "char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {\n    // Implement optimal backtracking\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<std::vector<std::string>> solveNQueens(int n) {\n        // Implement optimal backtracking\n        return {};\n    }\n};",
            "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        # Implement optimal backtracking\n        pass",
            "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        // Implement optimal backtracking\n        return new ArrayList<>();\n    }\n}",
            "javascript": "function solveNQueens(n) {\n    // Write your optimal backtracking\n    \n}",
            "typescript": "function solveNQueens(n: number): string[][] {\n    // Implement optimal backtracking\n    return [];\n}",
            "go": "func solveNQueens(n int) [][]string {\n    // Implement optimal backtracking\n    return [][]string{}\n}",
            "rust": "impl Solution {\n    pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {\n        // Implement optimal backtracking\n        vec![]\n    }\n}"
        },
        "solutionCode": {
            "javascript": "function solveNQueens(n) {\n    const res = [];\n    const cols = new Set(), d1 = new Set(), d2 = new Set();\n    const board = Array.from({ length: n }, () => new Array(n).fill('.'));\n    function backtrack(r) {\n        if (r === n) {\n            res.push(board.map(row => row.join('')));\n            return;\n        }\n        for (let c = 0; c < n; c++) {\n            if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;\n            board[r][c] = 'Q';\n            cols.add(c); d1.add(r - c); d2.add(r + c);\n            backtrack(r + 1);\n            board[r][c] = '.';\n            cols.delete(c); d1.delete(r - c); d2.delete(r + c);\n        }\n    }\n    backtrack(0);\n    return res;\n}",
            "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        res = []\n        cols, d1, d2 = set(), set(), set()\n        board = [['.' for _ in range(n)] for _ in range(n)]\n        def backtrack(r):\n            if r == n:\n                res.append([''.join(row) for row in board])\n                return\n            for c in range(n):\n                if c in cols or (r - c) in d1 or (r + c) in d2: continue\n                board[r][c] = 'Q'\n                cols.add(c); d1.add(r - c); d2.add(r + c)\n                backtrack(r + 1)\n                board[r][c] = '.'\n                cols.remove(c); d1.remove(r - c); d2.remove(r + c)\n        backtrack(0)\n        return res"
        }
    }
]

print(f"Loaded all {len(ALL_24_LEETCODE_PROBLEMS)} authentic LeetCode problems successfully.")
