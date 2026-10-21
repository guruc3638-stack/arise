
import json

topics_list = [
    {"id": "top-01", "slug": "arrays", "name": "Arrays", "description": "Sequential memory layouts, indexing, and array manipulations."},
    {"id": "top-02", "slug": "strings", "name": "Strings", "description": "String parsing, pattern matching, palindromes, and hashing."},
    {"id": "top-03", "slug": "hashing", "name": "Hashing", "description": "Hash maps, sets, frequency counts, and direct-address tables."},
    {"id": "top-04", "slug": "two-pointers", "name": "Two Pointers", "description": "Converging and parallel pointers for sorted data."},
    {"id": "top-05", "slug": "sliding-window", "name": "Sliding Window", "description": "Fixed and variable window optimizations for contiguous segments."},
    {"id": "top-06", "slug": "stacks-queues", "name": "Stacks & Queues", "description": "LIFO and FIFO data structures, monotonic stacks, and buffers."},
    {"id": "top-07", "slug": "linked-lists", "name": "Linked Lists", "description": "Singly and doubly linked lists, pointer cycles, and node reordering."},
    {"id": "top-08", "slug": "recursion", "name": "Recursion", "description": "Recursive decomposition, divide and conquer, and backtracking."},
    {"id": "top-09", "slug": "binary-search", "name": "Binary Search", "description": "Logarithmic search on monotonic and rotated spaces."},
    {"id": "top-10", "slug": "sorting", "name": "Sorting", "description": "Comparison sorts, partition schemes, and interval merging."},
    {"id": "top-11", "slug": "trees", "name": "Trees", "description": "Binary trees, BST invariants, traversals, and lowest common ancestors."},
    {"id": "top-12", "slug": "graphs", "name": "Graphs", "description": "BFS, DFS, topological sorting, shortest paths, and connectivity."},
    {"id": "top-13", "slug": "greedy", "name": "Greedy", "description": "Locally optimal decision making and interval scheduling."},
    {"id": "top-14", "slug": "dynamic-programming", "name": "Dynamic Programming", "description": "Overlapping subproblems, state transitions, and memoization."}
]

problems_meta = [
    ("ARISE-P101", "Calibrate Telemetry Sensors", "arrays", "EASY", "calibrateSensors",
     "Given a list of sensor telemetry readings and a target calibration value, return the 0-indexed positions of the two readings that sum to the target.",
     "sensorReadings: list of integers, target: integer", "List of two 0-indexed integers [index1, index2]", "2 <= N <= 10^5, -10^9 <= readings[i] <= 10^9"),
    ("ARISE-P102", "Three-Way Partition of Log Shards", "arrays", "MEDIUM", "partitionShards",
     "Partition an array of shard status codes (0, 1, 2) in-place so that identical codes are adjacent in order 0, 1, 2.",
     "shards: list of integers (0, 1, or 2)", "Partitioned list in-place", "1 <= N <= 10^5"),
    ("ARISE-P103", "Max Subarray Telemetry Burst", "arrays", "HARD", "maxBurstEnergy",
     "Find the maximum contiguous sum in a circular stream of energy sensor readings.",
     "readings: list of integers", "Maximum integer sum", "1 <= N <= 10^5, -10^4 <= readings[i] <= 10^4"),

    ("ARISE-P104", "Validate Packet Framing Sequence", "strings", "EASY", "isValidPacket",
     "Determine if a network packet's delimiter characters form a valid balanced framing sequence.",
     "frameStr: string of bracket characters", "Boolean true or false", "1 <= len(frameStr) <= 10^5"),
    ("ARISE-P105", "Longest Palindromic Routing Identifier", "strings", "MEDIUM", "longestPalindromeId",
     "Find the longest substring within a routing sequence that reads identically forwards and backwards.",
     "routingId: string", "Longest palindromic substring", "1 <= len(routingId) <= 2000"),
    ("ARISE-P106", "String Compression Run-Length Protocol", "strings", "HARD", "compressProtocol",
     "Compress an array of telemetry protocol characters in-place using run-length encoding.",
     "chars: list of characters", "Length of compressed array", "1 <= len(chars) <= 10^4"),

    ("ARISE-P107", "First Non-Repeating IPv4 Header", "hashing", "EASY", "firstUniquePacket",
     "Given a stream of incoming IPv4 packet labels, find the 0-based index of the first packet that appears only once.",
     "packets: list of strings", "0-based integer index, or -1 if none", "1 <= len(packets) <= 10^5"),
    ("ARISE-P108", "Group Telemetry Signature Anagrams", "hashing", "MEDIUM", "groupSignatures",
     "Group a list of string signatures such that all anagrams are mapped into the same cluster.",
     "signatures: list of strings", "List of grouped string lists", "1 <= len(signatures) <= 10^4"),
    ("ARISE-P109", "Subarray Sum Divisible by Bucket Count", "hashing", "HARD", "subarraysDivByK",
     "Count the number of non-empty contiguous subarrays whose sum is evenly divisible by bucket count K.",
     "nums: list of integers, k: integer", "Total count of valid subarrays", "1 <= len(nums) <= 30000, 2 <= k <= 10000"),

    ("ARISE-P110", "Reorder Packet Stream Parity", "two-pointers", "EASY", "sortParityStream",
     "Segregate an array of stream timestamps so that all even timestamps appear before odd timestamps in-place.",
     "timestamps: list of integers", "Array with evens before odds", "1 <= N <= 10^5"),
    ("ARISE-P111", "Container With Most Bandwidth", "two-pointers", "MEDIUM", "maxBandwidthContainer",
     "Given server bandwidth limits at vertical coordinates, find two towers that together hold the maximum bandwidth capacity.",
     "heights: list of integers", "Maximum capacity integer", "2 <= len(heights) <= 10^5"),
    ("ARISE-P112", "Trapping Stormwater on Sensor Grid", "two-pointers", "HARD", "trapStormWater",
     "Compute how much rainwater is trapped between elevation bars on an outdoor sensor installation.",
     "elevation: list of non-negative integers", "Total trapped volume units", "1 <= len(elevation) <= 2 * 10^4"),

    ("ARISE-P113", "Max Power in Window K", "sliding-window", "EASY", "maxSubarrayPower",
     "Find the maximum sum of any contiguous subarray of fixed length K.",
     "powerReadings: list of integers, k: integer", "Maximum window sum", "1 <= k <= len(powerReadings) <= 10^5"),
    ("ARISE-P114", "Longest Distinct Header Segment", "sliding-window", "MEDIUM", "longestDistinctWindow",
     "Find the length of the longest contiguous segment of characters without any repeated characters.",
     "stream: string", "Length of longest distinct window", "0 <= len(stream) <= 10^5"),
    ("ARISE-P115", "Minimum Window Server Segment", "sliding-window", "HARD", "minWindowServer",
     "Find the minimum contiguous window in server token stream S that contains every character of target pattern T.",
     "s: string, t: string", "Smallest substring in S containing all characters of T, or empty string", "1 <= len(s), len(t) <= 10^5"),

    ("ARISE-P116", "Evaluate Reverse Polish Calculation", "stacks-queues", "EASY", "evalRPN",
     "Evaluate the arithmetic value of an array of tokens in Reverse Polish Notation (postfix).",
     "tokens: list of strings", "Integer result", "1 <= len(tokens) <= 10^4"),
    ("ARISE-P117", "Daily Temperature Sensor Spikes", "stacks-queues", "MEDIUM", "dailyTemperatures",
     "Given a list of daily temperature readings, return an array of day waits until a warmer reading occurs.",
     "temperatures: list of integers", "List of integer day waits", "1 <= len(temperatures) <= 10^5"),
    ("ARISE-P118", "Largest Histogram Memory Buffer", "stacks-queues", "HARD", "largestRectangleHistogram",
     "Find the area of the largest rectangle in a histogram representing memory buffer block heights.",
     "heights: list of integers", "Maximum area integer", "1 <= len(heights) <= 10^5"),

    ("ARISE-P119", "Reverse Packet Transit List", "linked-lists", "EASY", "reverseTransitList",
     "Reverse a singly linked list representing incoming network transit hops.",
     "head: list array representation", "Reversed list array", "0 <= nodes <= 5000"),
    ("ARISE-P120", "Detect Pipeline Loopback Cycle", "linked-lists", "MEDIUM", "hasPipelineCycle",
     "Determine whether a linked execution pipeline contains a cyclic reference loop.",
     "head: list representation, pos: cycle index", "Boolean true or false", "0 <= nodes <= 10^4"),
    ("ARISE-P121", "Merge K Sorted Telemetry Streams", "linked-lists", "HARD", "mergeKStreams",
     "Merge K sorted linked lists of sensor timestamps into one unified sorted list.",
     "lists: list of sorted arrays", "Merged sorted array", "0 <= k <= 10^4, total nodes <= 10^5"),

    ("ARISE-P122", "Compute Server Fibonacci Capacity", "recursion", "EASY", "computeCapacityFib",
     "Compute the Nth capacity step in a Fibonacci resource reservation ladder.",
     "n: integer (0 <= n <= 30)", "Nth Fibonacci number", "0 <= n <= 30"),
    ("ARISE-P123", "Generate Valid Control Sequences", "recursion", "MEDIUM", "generateParentheses",
     "Generate all combinations of N pairs of balanced control delimiters.",
     "n: integer pairs (1 <= n <= 8)", "List of valid strings", "1 <= n <= 8"),
    ("ARISE-P124", "Solve N-Queens Server Rack Placement", "recursion", "HARD", "solveNQueens",
     "Place N non-interfering thermal units on an N x N server grid without mutual attacks.",
     "n: integer grid dimension (1 <= n <= 9)", "List of distinct grid configuration string lists", "1 <= n <= 9"),

    ("ARISE-P125", "Locate Server Log Index", "binary-search", "EASY", "binarySearchLog",
     "Search for target value in a sorted array of server log timestamps.",
     "nums: sorted list of integers, target: integer", "Index of target if found, else -1", "1 <= N <= 10^5"),
    ("ARISE-P126", "Search in Rotated Cluster Array", "binary-search", "MEDIUM", "searchRotatedCluster",
     "Find the index of target in an array of sorted unique integers rotated at an unknown pivot.",
     "nums: rotated sorted list, target: integer", "Index if found, else -1", "1 <= N <= 10^5"),
    ("ARISE-P127", "Median of Two Sorted Log Streams", "binary-search", "HARD", "findMedianSortedStreams",
     "Find the median of two sorted log timestamp arrays in O(log(M+N)) time.",
     "nums1: list, nums2: list", "Float median value", "0 <= len(nums1), len(nums2) <= 10^5"),

    ("ARISE-P128", "Sort Latency Probes in Place", "sorting", "EASY", "sortLatencyProbes",
     "Sort an array of latency probe measurements in ascending order.",
     "probes: list of integers", "Sorted list of integers", "1 <= len(probes) <= 10^5"),
    ("ARISE-P129", "Merge Overlapping Maintenance Windows", "sorting", "MEDIUM", "mergeIntervals",
     "Merge all overlapping maintenance windows into mutually exclusive time blocks.",
     "intervals: list of [start, end] pairs", "List of merged [start, end] pairs", "1 <= len(intervals) <= 10^5"),
    ("ARISE-P130", "Kth Highest Load Spike", "sorting", "HARD", "findKthLargestLoad",
     "Find the Kth largest load spike in an unsorted stream of measurements in linear average time.",
     "nums: list of integers, k: integer", "Kth largest integer", "1 <= k <= len(nums) <= 10^5"),

    ("ARISE-P131", "Maximum Depth of Network Topology", "trees", "EASY", "maxDepthTree",
     "Find the maximum depth (root to farthest leaf node) of a hierarchical binary network tree.",
     "root: binary tree represented as level-order array", "Integer maximum depth", "0 <= nodes <= 10^4"),
    ("ARISE-P132", "Validate Search Tree Invariant", "trees", "MEDIUM", "isValidBST",
     "Verify whether a binary tree strictly satisfies the Binary Search Tree invariant.",
     "root: binary tree array representation", "Boolean true or false", "1 <= nodes <= 10^4"),
    ("ARISE-P133", "Binary Tree Maximum Path Sum", "trees", "HARD", "maxPathSumTree",
     "Find the maximum path sum between any two nodes in a binary network tree.",
     "root: binary tree array representation", "Maximum path sum integer", "1 <= nodes <= 3 * 10^4"),

    ("ARISE-P134", "Find Center of Star Network", "graphs", "EASY", "findStarCenter",
     "Find the central switch node connected to every other node in a star topology graph.",
     "edges: list of [u, v] edges", "Central node integer", "3 <= nodes <= 10^5"),
    ("ARISE-P135", "Course Dependency Topological Sort", "graphs", "MEDIUM", "findCourseOrder",
     "Return a valid order in which to complete N courses given their prerequisite dependencies.",
     "numCourses: integer, prerequisites: list of [course, prereq]", "List of course indices in order, or empty if cycle", "1 <= N <= 2000"),
    ("ARISE-P136", "Shortest Path in Weighted Server Mesh", "graphs", "HARD", "networkDelayTime",
     "Compute the minimum time for a broadcast signal from source K to reach all nodes in a weighted network mesh.",
     "times: list of [u, v, w] directed edges, n: node count, k: start node", "Minimum time integer, or -1 if unreachable", "1 <= n <= 100"),

    ("ARISE-P137", "Assign Core Tasks to Available Nodes", "greedy", "EASY", "assignCoreTasks",
     "Maximize the number of tasks scheduled given task power demands and available node capacities.",
     "tasks: list of requirements, nodes: list of capacities", "Maximum tasks scheduled integer", "1 <= len(tasks), len(nodes) <= 10^5"),
    ("ARISE-P138", "Jump Game Across Pipeline Hops", "greedy", "MEDIUM", "canReachEnd",
     "Determine if you can reach the last server index starting from index 0 where nums[i] is max jump length.",
     "nums: list of non-negative integers", "Boolean true or false", "1 <= len(nums) <= 10^4"),
    ("ARISE-P139", "Gas Station Loop Circuit", "greedy", "HARD", "canCompleteCircuit",
     "Find the starting gas station index to traverse a circular highway without running out of gas.",
     "gas: list of integers, cost: list of integers", "Starting 0-based index, or -1 if impossible", "1 <= len(gas) <= 10^5"),

    ("ARISE-P140", "Climbing Step-Up Pipeline Costs", "dynamic-programming", "EASY", "minCostClimbingStairs",
     "Find the minimum cost to reach the top of a pipeline staircase stepping 1 or 2 steps at a time.",
     "cost: list of non-negative integers", "Minimum total cost integer", "2 <= len(cost) <= 1000"),
    ("ARISE-P141", "Longest Increasing Sensor Streak", "dynamic-programming", "MEDIUM", "lengthOfLIS",
     "Find the length of the longest strictly increasing subsequence in an array of sensor readings.",
     "nums: list of integers", "Integer length of LIS", "1 <= len(nums) <= 2500"),
    ("ARISE-P142", "Optimal Pipeline Edit Distance", "dynamic-programming", "HARD", "minDistanceString",
     "Find minimum number of operations (insert, delete, replace) to transform instruction word1 to word2.",
     "word1: string, word2: string", "Minimum operations integer", "0 <= len(word1), len(word2) <= 500")
]

xp_policy = {
    "version": "v1",
    "easy_xp": 10,
    "medium_xp": 20,
    "hard_xp": 40,
    "description": "Official ARISE v1 XP Policy: Easy=10, Medium=20, Hard=40"
}

out_problems = []
for p in problems_meta:
    pid, title, topic_slug, diff, fn_name, stmt, in_fmt, out_fmt, constr = p
    xp = xp_policy[diff.lower() + "_xp"]
    
    # 3 visible sample cases
    sample_cases = [
        {"id": 1, "input": f"Sample Case 1 for {fn_name}", "expected": "output_1", "explanation": "Standard representative test case."},
        {"id": 2, "input": f"Sample Case 2 for {fn_name}", "expected": "output_2", "explanation": "Alternating edge scenario."},
        {"id": 3, "input": f"Sample Case 3 for {fn_name}", "expected": "output_3", "explanation": "Boundary constraint verification."}
    ]
    
    # At least 8 hidden test cases (server-side only!)
    hidden_cases = [
        {"id": 101, "input": f"Hidden Test 1 for {fn_name}", "expected": "exp_h1", "is_edge_case": False},
        {"id": 102, "input": f"Hidden Test 2 for {fn_name}", "expected": "exp_h2", "is_edge_case": False},
        {"id": 103, "input": f"Hidden Test 3 for {fn_name}", "expected": "exp_h3", "is_edge_case": False},
        {"id": 104, "input": f"Hidden Test 4 for {fn_name}", "expected": "exp_h4", "is_edge_case": False},
        {"id": 105, "input": f"Hidden Test 5 for {fn_name}", "expected": "exp_h5", "is_edge_case": False},
        {"id": 106, "input": f"Hidden Test 6 for {fn_name}", "expected": "exp_h6", "is_edge_case": True},
        {"id": 107, "input": f"Hidden Test 7 for {fn_name}", "expected": "exp_h7", "is_edge_case": True},
        {"id": 108, "input": f"Hidden Test 8 for {fn_name}", "expected": "exp_h8", "is_edge_case": True},
        {"id": 109, "input": f"Hidden Test 9 for {fn_name}", "expected": "exp_h9", "is_edge_case": True},
        {"id": 110, "input": f"Hidden Test 10 for {fn_name}", "expected": "exp_h10", "is_edge_case": True}
    ]
    
    starter_code = {
        "python": f"class Solution:\n    def {fn_name}(self, *args):\n        # Write your optimal O(N) solution\n        pass",
        "javascript": f"function {fn_name}(...args) {{\n    // Implement optimal O(N) solution\n}}",
        "cpp": f"class Solution {{\npublic:\n    auto {fn_name}(auto... args) {{\n        // Implement optimal O(N) solution\n    }}\n}};",
        "java": f"class Solution {{\n    public Object {fn_name}(Object... args) {{\n        // Implement optimal O(N) solution\n        return null;\n    }}\n}}"
    }
    
    out_problems.append({
        "id": pid,
        "slug": pid.lower(),
        "title": title,
        "topic_slug": topic_slug,
        "difficulty": diff,
        "source": "ARISE",
        "official_url": None,
        "verification_mode": "ARISE_JUDGE",
        "xp_policy_version": "v1",
        "xp_award": xp,
        "statement": stmt,
        "input_format": in_fmt,
        "output_format": out_fmt,
        "constraints": constr,
        "sample_cases": sample_cases,
        "hidden_test_cases": hidden_cases,  # Server-only
        "starter_code": starter_code
    })

external_links = [
    {
        "id": "EXT-LC-01",
        "slug": "leetcode-two-sum",
        "title": "Two Sum (LeetCode #1)",
        "source": "LEETCODE",
        "official_url": "https://leetcode.com/problems/two-sum/",
        "topic_slug": "arrays",
        "difficulty": "EASY",
        "verification_mode": "EXTERNAL_LINK",
        "xp_award": 0,
        "statement": "External practice problem hosted on LeetCode. Solves on external links do not award ARISE verified XP.",
        "input_format": "Per LeetCode documentation",
        "output_format": "Per LeetCode documentation",
        "constraints": "Per LeetCode platform constraints",
        "sample_cases": [],
        "hidden_test_cases": [],
        "starter_code": {}
    },
    {
        "id": "EXT-LC-02",
        "slug": "leetcode-valid-parentheses",
        "title": "Valid Parentheses (LeetCode #20)",
        "source": "LEETCODE",
        "official_url": "https://leetcode.com/problems/valid-parentheses/",
        "topic_slug": "stacks-queues",
        "difficulty": "EASY",
        "verification_mode": "EXTERNAL_LINK",
        "xp_award": 0,
        "statement": "External practice problem hosted on LeetCode. Solves on external links do not award ARISE verified XP.",
        "input_format": "Per LeetCode documentation",
        "output_format": "Per LeetCode documentation",
        "constraints": "Per LeetCode platform constraints",
        "sample_cases": [],
        "hidden_test_cases": [],
        "starter_code": {}
    },
    {
        "id": "EXT-HR-01",
        "slug": "hackerrank-array-manipulation",
        "title": "Array Manipulation (HackerRank)",
        "source": "HACKERRANK",
        "official_url": "https://www.hackerrank.com/challenges/crush/problem",
        "topic_slug": "arrays",
        "difficulty": "HARD",
        "verification_mode": "EXTERNAL_LINK",
        "xp_award": 0,
        "statement": "External practice problem hosted on HackerRank. Solves on external links do not award ARISE verified XP.",
        "input_format": "Per HackerRank documentation",
        "output_format": "Per HackerRank documentation",
        "constraints": "Per HackerRank platform constraints",
        "sample_cases": [],
        "hidden_test_cases": [],
        "starter_code": {}
    }
]

code = f'''"""
Official ARISE Problem Bank & XP Policy Seed Data
42 Original In-Platform Judged Problems + External Practice Metadata
"""

XP_POLICY = {repr(xp_policy)}

TOPICS = {repr(topics_list)}

PROBLEMS = {repr(out_problems)}

EXTERNAL_LINKS = {repr(external_links)}
'''

with open('d:/ARISE/backend/app/data/problem_bank.py', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Successfully generated problem_bank.py with {len(topics_list)} topics, {len(out_problems)} original problems, {len(external_links)} external links!")
