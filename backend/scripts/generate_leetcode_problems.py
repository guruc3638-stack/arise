import json
import re
import os
import sys

# Define all 28 Authentic LeetCode Problems
PROBLEMS_DATA = [
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
            "Hint 1: A really brute force way would be to search for all possible pairs of numbers, but that would be slow O(N^2).",
            "Hint 2: The best way to maintain a mapping of each number to its index is a hash map.",
            "Hint 3: In a single pass, for each element X, look up whether (target - X) has already been stored in your hash table."
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
        "solution": {
            "c": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    int* res = (int*)malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j; *returnSize = 2; return res;\n            }\n        }\n    }\n    *returnSize = 0; return NULL;\n}",
            "cpp": "class Solution {\npublic:\n    std::vector<int> twoSum(const std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < (int)nums.size(); ++i) {\n            int comp = target - nums[i];\n            if (seen.find(comp) != seen.end()) return {seen[comp], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
            "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, val in enumerate(nums):\n            comp = target - val\n            if comp in seen:\n                return [seen[comp], i]\n            seen[val] = i\n        return []",
            "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (seen.containsKey(comp)) return new int[] { seen.get(comp), i };\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
            "javascript": "function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (seen.has(comp)) return [seen.get(comp), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}"
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
        "solution": {
            "c": "bool isValid(char* s) {\n    int n = strlen(s);\n    char stack[10000]; int top = -1;\n    for (int i = 0; i < n; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else {\n            if (top == -1) return false;\n            char o = stack[top--];\n            if (c == ')' && o != '(') return false;\n            if (c == '}' && o != '{') return false;\n            if (c == ']' && o != '[') return false;\n        }\n    }\n    return top == -1;\n}",
            "cpp": "class Solution {\npublic:\n    bool isValid(const std::string& s) {\n        std::stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return st.empty();\n    }\n};",
            "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        pairs = {')': '(', '}': '{', ']': '['}\n        for ch in s:\n            if ch in pairs:\n                if not stack or stack[-1] != pairs[ch]:\n                    return False\n                stack.pop()\n            else:\n                stack.append(ch)\n        return len(stack) == 0",
            "java": "import java.util.Stack;\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') stack.push(c);\n            else {\n                if (stack.isEmpty()) return false;\n                char top = stack.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}",
            "javascript": "function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let i = 0; i < s.length; i++) {\n        const ch = s[i];\n        if (ch === '(' || ch === '{' || ch === '[') {\n            stack.push(ch);\n        } else {\n            if (stack.length === 0 || stack.pop() !== map[ch]) return false;\n        }\n    }\n    return stack.length === 0;\n}"
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
        "solution": {
            "c": "int maxProfit(int* prices, int pricesSize) {\n    int minP = 1000000000; int maxP = 0;\n    for (int i = 0; i < pricesSize; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxP) maxP = prices[i] - minP;\n    }\n    return maxP;\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(const std::vector<int>& prices) {\n        int minP = 1e9, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = std::max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};",
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_p = float('inf')\n        max_p = 0\n        for p in prices:\n            if p < min_p:\n                min_p = p\n            elif p - min_p > max_p:\n                max_p = p - min_p\n        return max_p",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE;\n        int maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxP) maxP = p - minP;\n        }\n        return maxP;\n    }\n}",
            "javascript": "function maxProfit(prices) {\n    let minP = Infinity, maxP = 0;\n    for (let i = 0; i < prices.length; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxP) maxP = prices[i] - minP;\n    }\n    return maxP;\n}"
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
            "Hint 2: If the running sum becomes negative, it cannot help any future subarray; reset it."
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
        "solution": {
            "c": "int maxSubArray(int* nums, int numsSize) {\n    int maxS = nums[0]; int currS = nums[0];\n    for (int i = 1; i < numsSize; i++) {\n        currS = nums[i] > (currS + nums[i]) ? nums[i] : (currS + nums[i]);\n        if (currS > maxS) maxS = currS;\n    }\n    return maxS;\n}",
            "cpp": "class Solution {\npublic:\n    int maxSubArray(const std::vector<int>& nums) {\n        int maxS = nums[0], currS = nums[0];\n        for (size_t i = 1; i < nums.size(); ++i) {\n            currS = std::max(nums[i], currS + nums[i]);\n            maxS = std::max(maxS, currS);\n        }\n        return maxS;\n    }\n};",
            "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        curr_s = max_s = nums[0]\n        for x in nums[1:]:\n            curr_s = max(x, curr_s + x)\n            max_s = max(max_s, curr_s)\n        return max_s",
            "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxS = nums[0], currS = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currS = Math.max(nums[i], currS + nums[i]);\n            maxS = Math.max(maxS, currS);\n        }\n        return maxS;\n    }\n}",
            "javascript": "function maxSubArray(nums) {\n    let currS = nums[0], maxS = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currS = Math.max(nums[i], currS + nums[i]);\n        maxS = Math.max(maxS, currS);\n    }\n    return maxS;\n}"
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
            "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n    // Write your optimal O(log N) binary search\n    \n}",
            "typescript": "function search(nums: number[], target: number): number {\n    // Implement optimal O(log N) binary search\n    return -1;\n}",
            "go": "func search(nums []int, target int) int {\n    // Implement optimal O(log N) binary search\n    return -1\n}",
            "rust": "impl Solution {\n    pub fn search(nums: Vec<i32>, target: i32) -> i32 {\n        // Implement optimal O(log N) binary search\n        -1\n    }\n}"
        },
        "solution": {
            "c": "int search(int* nums, int numsSize, int target) {\n    int l = 0, r = numsSize - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}",
            "cpp": "class Solution {\npublic:\n    int search(const std::vector<int>& nums, int target) {\n        int l = 0, r = (int)nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};",
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return -1",
            "java": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}",
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
            "javascript": "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction containsDuplicate(nums) {\n    // Write your optimal O(N) hash set solution\n    \n}",
            "typescript": "function containsDuplicate(nums: number[]): boolean {\n    // Implement optimal O(N) hash set solution\n    return false;\n}",
            "go": "func containsDuplicate(nums []int) bool {\n    // Implement optimal O(N) hash set solution\n    return false\n}",
            "rust": "impl Solution {\n    pub fn contains_duplicate(nums: Vec<i32>) -> bool {\n        // Implement optimal O(N) hash set solution\n        false\n    }\n}"
        },
        "solution": {
            "c": "bool containsDuplicate(int* nums, int numsSize) {\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] == nums[j]) return true;\n        }\n    }\n    return false;\n}",
            "cpp": "class Solution {\npublic:\n    bool containsDuplicate(const std::vector<int>& nums) {\n        std::unordered_set<int> seen;\n        for (int x : nums) {\n            if (seen.count(x)) return true;\n            seen.insert(x);\n        }\n        return false;\n    }\n};",
            "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        seen = set()\n        for x in nums:\n            if x in seen:\n                return True\n            seen.add(x)\n        return False",
            "java": "import java.util.HashSet;\nimport java.util.Set;\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int x : nums) {\n            if (seen.contains(x)) return true;\n            seen.add(x);\n        }\n        return false;\n    }\n}",
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
            "javascript": "/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n    // Write your optimal O(N) DP solution\n    \n}",
            "typescript": "function climbStairs(n: number): number {\n    // Implement optimal O(N) DP solution\n    return 0;\n}",
            "go": "func climbStairs(n int) int {\n    // Implement optimal O(N) DP solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn climb_stairs(n: i32) -> i32 {\n        // Implement optimal O(N) DP solution\n        0\n    }\n}"
        },
        "solution": {
            "c": "int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b; a = b; b = c;\n    }\n    return b;\n}",
            "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; ++i) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};",
            "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b",
            "java": "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n}",
            "javascript": "function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        const c = a + b; a = b; b = c;\n    }\n    return b;\n}"
        }
    },
    {
        "id": "ARISE-P110",
        "leetcode_num": 125,
        "title": "Valid Palindrome (LeetCode #125)",
        "slug": "valid-palindrome",
        "topic": "Strings",
        "tags": ["Two Pointers", "String"],
        "difficulty": "Easy",
        "acceptance": "46.2%",
        "verifiedXp": 40,
        "functionName": "isPalindrome",
        "description": "A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        "examples": [
            {"input": "s = 'A man, a plan, a canal: Panama'", "output": "true", "explanation": "'amanaplanacanalpanama' is a palindrome."},
            {"input": "s = 'race a car'", "output": "false", "explanation": "'raceacar' is not a palindrome."},
            {"input": "s = ' '", "output": "true", "explanation": "s is an empty string '' after removing non-alphanumeric characters."}
        ],
        "constraints": [
            "1 <= s.length <= 2 * 10^5",
            "s consists only of printable ASCII characters."
        ],
        "hints": [
            "Hint 1: Two pointers moving from opposite ends towards each other skipping non-alphanumeric chars."
        ],
        "testCases": [
            {"id": 1, "input": "s = 'A man, a plan, a canal: Panama'", "expected": "true"},
            {"id": 2, "input": "s = 'race a car'", "expected": "false"},
            {"id": 3, "input": "s = ' '", "expected": "true"}
        ],
        "starter": {
            "c": "bool isPalindrome(char* s) {\n    // Implement optimal O(N) two-pointer solution\n    return false;\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(const std::string& s) {\n        // Implement optimal O(N) two-pointer solution\n        return false;\n    }\n};",
            "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Implement optimal O(N) two-pointer solution\n        pass",
            "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        // Implement optimal O(N) two-pointer solution\n        return false;\n    }\n}",
            "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isPalindrome(s) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
            "typescript": "function isPalindrome(s: string): boolean {\n    // Implement optimal O(N) two-pointer solution\n    return false;\n}",
            "go": "func isPalindrome(s string) bool {\n    // Implement optimal O(N) two-pointer solution\n    return false\n}",
            "rust": "impl Solution {\n    pub fn is_palindrome(s: String) -> bool {\n        // Implement optimal O(N) two-pointer solution\n        false\n    }\n}"
        },
        "solution": {
            "c": "bool isPalindrome(char* s) {\n    int l = 0, r = strlen(s) - 1;\n    while (l < r) {\n        while (l < r && !isalnum((unsigned char)s[l])) l++;\n        while (l < r && !isalnum((unsigned char)s[r])) r--;\n        if (tolower((unsigned char)s[l]) != tolower((unsigned char)s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(const std::string& s) {\n        int l = 0, r = (int)s.size() - 1;\n        while (l < r) {\n            while (l < r && !isalnum(s[l])) l++;\n            while (l < r && !isalnum(s[r])) r--;\n            if (tolower(s[l]) != tolower(s[r])) return false;\n            l++; r--;\n        }\n        return true;\n    }\n};",
            "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        clean = [ch.lower() for ch in s if ch.isalnum()]\n        return clean == clean[::-1]",
            "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}",
            "javascript": "function isPalindrome(s) {\n    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return clean === clean.split('').reverse().join('');\n}"
        }
    },
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
            "javascript": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction threeSum(nums) {\n    // Write your optimal O(N^2) two-pointer solution\n    \n}",
            "typescript": "function threeSum(nums: number[]): number[][] {\n    // Implement optimal O(N^2) two-pointer solution\n    return [];\n}",
            "go": "func threeSum(nums []int) [][]int {\n    // Implement optimal O(N^2) two-pointer solution\n    return [][]int{}\n}",
            "rust": "impl Solution {\n    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {\n        // Implement optimal O(N^2) two-pointer solution\n        vec![]\n    }\n}"
        },
        "solution": {
            "javascript": "function threeSum(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                res.push([nums[i], nums[l], nums[r]]);\n                while (l < r && nums[l] === nums[l + 1]) l++;\n                while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}"
        }
    },
    {
        "id": "ARISE-P202",
        "leetcode_num": 3,
        "title": "Longest Substring Without Repeating Characters (LeetCode #3)",
        "slug": "longest-substring-without-repeating-characters",
        "topic": "Sliding Window",
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
            "javascript": "/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n    // Write your optimal O(N) sliding window\n    \n}",
            "typescript": "function lengthOfLongestSubstring(s: string): number {\n    // Implement optimal O(N) sliding window\n    return 0;\n}",
            "go": "func lengthOfLongestSubstring(s string) int {\n    // Implement optimal O(N) sliding window\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn length_of_longest_substring(s: String) -> i32 {\n        // Implement optimal O(N) sliding window\n        0\n    }\n}"
        },
        "solution": {
            "javascript": "function lengthOfLongestSubstring(s) {\n    let seen = new Map();\n    let maxLen = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        if (seen.has(s[r]) && seen.get(s[r]) >= l) {\n            l = seen.get(s[r]) + 1;\n        }\n        seen.set(s[r], r);\n        maxLen = Math.max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}"
        }
    },
    {
        "id": "ARISE-P203",
        "leetcode_num": 11,
        "title": "Container With Most Water (LeetCode #11)",
        "slug": "container-with-most-water",
        "topic": "Two Pointers",
        "tags": ["Array", "Two Pointers", "Greedy"],
        "difficulty": "Medium",
        "acceptance": "55.3%",
        "verifiedXp": 60,
        "functionName": "maxArea",
        "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
        "examples": [
            {"input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]", "output": "49", "explanation": "The vertical lines are at indices with max area = min(8, 7) * (8 - 1) = 7 * 7 = 49."},
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
            "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
            "typescript": "function maxArea(height: number[]): number {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
            "go": "func maxArea(height []int) int {\n    // Implement optimal O(N) two-pointer solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn max_area(height: Vec<i32>) -> i32 {\n        // Implement optimal O(N) two-pointer solution\n        0\n    }\n}"
        },
        "solution": {
            "javascript": "function maxArea(height) {\n    let l = 0, r = height.length - 1, maxA = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        maxA = Math.max(maxA, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}"
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
            "javascript": "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nfunction coinChange(coins, amount) {\n    // Write your optimal O(amount * len(coins)) DP\n    \n}",
            "typescript": "function coinChange(coins: number[], amount: number): number {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1;\n}",
            "go": "func coinChange(coins []int, amount int) int {\n    // Implement optimal O(amount * len(coins)) DP\n    return -1\n}",
            "rust": "impl Solution {\n    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {\n        // Implement optimal O(amount * len(coins)) DP\n        -1\n    }\n}"
        },
        "solution": {
            "javascript": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (let c of coins) {\n            if (i >= c && dp[i - c] !== Infinity) {\n                dp[i] = Math.min(dp[i], dp[i - c] + 1);\n            }\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}"
        }
    },
    {
        "id": "ARISE-P301",
        "leetcode_num": 42,
        "title": "Trapping Rain Water (LeetCode #42)",
        "slug": "trapping-rain-water",
        "topic": "Two Pointers",
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
            "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n    // Write your optimal O(N) two-pointer solution\n    \n}",
            "typescript": "function trap(height: number[]): number {\n    // Implement optimal O(N) two-pointer solution\n    return 0;\n}",
            "go": "func trap(height []int) int {\n    // Implement optimal O(N) two-pointer solution\n    return 0\n}",
            "rust": "impl Solution {\n    pub fn trap(height: Vec<i32>) -> i32 {\n        // Implement optimal O(N) two-pointer solution\n        0\n    }\n}"
        },
        "solution": {
            "javascript": "function trap(height) {\n    let l = 0, r = height.length - 1;\n    let lMax = 0, rMax = 0, res = 0;\n    while (l < r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else res += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else res += rMax - height[r];\n            r--;\n        }\n    }\n    return res;\n}"
        }
    }
]

print(f"Loaded {len(PROBLEMS_DATA)} primary LeetCode problems templates.")
