# Script to generate expanded learning_bank.py with 8 structured tracks
import json

COURSES = [
    # COURSE 1
    {
        "id": "course-dsa-101",
        "slug": "course-dsa-101",
        "title": "Foundations of Data Structures & Asymptotic Complexity",
        "description": "Rigorous foundation covering mathematical analysis of algorithms, amortized complexity, contiguous memory vs pointer-based structures.",
        "category": "Data Structures",
        "duration": "14 hours",
        "skills": ["Big-O Notation", "Static & Dynamic Arrays", "Pointer Arithmetic", "Singly & Doubly Linked Lists"],
        "lessons": [
            {
                "id": "lesson-dsa-101-l1",
                "position": 1,
                "title": "Introduction to Computational Complexity & Growth Rates",
                "duration_minutes": 25,
                "content_markdown": "# Computational Complexity\n\nUnderstanding how execution runtime scales relative to input size N.\n\nKey principles:\n- Time complexity vs space complexity\n- Worst-case, average-case, and best-case analysis\n- Drop lower-order terms and constant coefficients."
            },
            {
                "id": "lesson-dsa-101-l2",
                "position": 2,
                "title": "Asymptotic Notation: Big-O, Big-Omega, Big-Theta Proofs",
                "duration_minutes": 30,
                "content_markdown": "# Asymptotic Notations\n\n- **O(g(n))**: Asymptotic upper bound (`f(n) <= c * g(n)` for `n >= n0`)\n- **Ω(g(n))**: Asymptotic lower bound (`f(n) >= c * g(n)` for `n >= n0`)\n- **Θ(g(n))**: Asymptotically tight bound (both upper and lower bound)."
            },
            {
                "id": "lesson-dsa-101-l3",
                "position": 3,
                "title": "Dynamic Array Amortized Resizing Analysis",
                "duration_minutes": 35,
                "content_markdown": "# Dynamic Arrays & Amortization\n\nWhen a dynamic array (e.g. Python list or C++ vector) reaches capacity, it doubles its buffer size from N to 2N.\n\nWhile copying N elements takes O(N), this cost occurs only once every N insertions, yielding **O(1) amortized** time per append."
            },
            {
                "id": "lesson-dsa-101-l4",
                "position": 4,
                "title": "Two Pointer Mechanics on Contiguous Arrays",
                "duration_minutes": 30,
                "content_markdown": "# Two Pointer Technique\n\nBy leveraging monotonic properties in sorted sequences or window boundaries, two pointer approaches reduce naive O(N^2) search spaces down to linear O(N) single-pass scans."
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
                        {"option_index": 0, "text": "O(N^2)"},
                        {"option_index": 1, "text": "O(N log N)"},
                        {"option_index": 2, "text": "O(1) amortized per insert (O(N) total)"},
                        {"option_index": 3, "text": "O(log N)"}
                    ],
                    "correct_option_index": 2,
                    "explanation": "Geometric array doubling amortizes the occasional O(N) allocation cost across all insertions, ensuring O(1) amortized cost per append."
                },
                {
                    "id": "q-dsa-101-2",
                    "position": 2,
                    "prompt": "If algorithm A takes 3*n^2 + 100*n operations and algorithm B takes 0.01*n^3 operations, which algorithm has superior asymptotic scaling?",
                    "options": [
                        {"option_index": 0, "text": "Algorithm A, because O(n^2) grows strictly slower than O(n^3) for large n"},
                        {"option_index": 1, "text": "Algorithm B, because its constant factor 0.01 is smaller"},
                        {"option_index": 2, "text": "Both algorithms have identical asymptotic behavior"},
                        {"option_index": 3, "text": "It depends indefinitely on system memory bandwidth"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Asymptotic analysis ignores constant coefficients for sufficiently large n; n^2 dominates n^3 asymptotically regardless of constants."
                },
                {
                    "id": "q-dsa-101-3",
                    "position": 3,
                    "prompt": "Which definition correctly characterizes Big-Theta Θ(g(n))?",
                    "options": [
                        {"option_index": 0, "text": "Strict upper bound only"},
                        {"option_index": 1, "text": "Tight bound: f(n) is bounded both above and below by g(n) for large n"},
                        {"option_index": 2, "text": "Strict lower bound only"},
                        {"option_index": 3, "text": "Average case probabilistic distribution"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Big-Theta Θ(g(n)) requires constants c1, c2 > 0 such that c1*g(n) <= f(n) <= c2*g(n) for all n >= n0."
                },
                {
                    "id": "q-dsa-101-4",
                    "position": 4,
                    "prompt": "What is the worst-case time complexity of inserting a new node at the head of a singly linked list with a known head reference?",
                    "options": [
                        {"option_index": 0, "text": "O(1)"},
                        {"option_index": 1, "text": "O(N)"},
                        {"option_index": 2, "text": "O(log N)"},
                        {"option_index": 3, "text": "O(N^2)"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Inserting at the head merely requires adjusting the new node's next pointer and head reference, taking constant O(1) time."
                },
                {
                    "id": "q-dsa-101-5",
                    "position": 5,
                    "prompt": "Why does the two-pointer technique achieve O(N) complexity on a sorted array for the Two Sum problem compared to brute force?",
                    "options": [
                        {"option_index": 0, "text": "It uses dynamic programming memoization tables"},
                        {"option_index": 1, "text": "Each pointer moves monotonically inward at most N times total, pruning impossible pairs"},
                        {"option_index": 2, "text": "It computes a hash table lookup in O(1)"},
                        {"option_index": 3, "text": "It parallelizes the loops across multi-core processors"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Because the array is sorted, comparing sum with target deterministically dictates whether the left pointer increments or right pointer decrements without backtracking."
                }
            ]
        }
    },

    # COURSE 2
    {
        "id": "course-algo-201",
        "slug": "course-algo-201",
        "title": "Advanced Graph Theory & Network Traversal",
        "description": "Comprehensive traversal, shortest paths, DAG dependency resolution, cycle detection, and priority queue optimizations.",
        "category": "Algorithms",
        "duration": "18 hours",
        "skills": ["Breadth-First Search", "Depth-First Search", "Topological Sort", "Dijkstra's Algorithm"],
        "lessons": [
            {
                "id": "lesson-algo-201-l1",
                "position": 1,
                "title": "Graph Representations: Adjacency List vs Matrix Memory Analysis",
                "duration_minutes": 25,
                "content_markdown": "# Graph Representations\n\n- **Adjacency Matrix**: `O(V^2)` memory, `O(1)` edge lookup.\n- **Adjacency List**: `O(V + E)` memory, optimal for sparse networks."
            },
            {
                "id": "lesson-algo-201-l2",
                "position": 2,
                "title": "BFS Level-Order Discovery & Shortest Unweighted Paths",
                "duration_minutes": 30,
                "content_markdown": "# Breadth-First Search (BFS)\n\nBFS explores vertices layer-by-layer using a FIFO queue. In unweighted graphs, the first time a target vertex is reached, the path taken is guaranteed to have the minimum edge count."
            },
            {
                "id": "lesson-algo-201-l3",
                "position": 3,
                "title": "DFS Backtracking, Tree Edges & Cycle Detection",
                "duration_minutes": 35,
                "content_markdown": "# Depth-First Search & Edge Classification\n\nEdges classified into: Tree, Back, Forward, Cross. In directed graphs, a **Back Edge** to an active recursion stack ancestor proves the existence of a cycle."
            },
            {
                "id": "lesson-algo-201-l4",
                "position": 4,
                "title": "Kahn's Algorithm & In-Degree Topo Sort",
                "duration_minutes": 30,
                "content_markdown": "# Kahn's Algorithm\n\nTopological sorting by maintaining an in-degree array. Initialize queue with all vertices having in-degree = 0. Extract vertex, decrement neighbor in-degrees, and enqueue when in-degree hits 0."
            },
            {
                "id": "lesson-algo-201-l5",
                "position": 5,
                "title": "Dijkstra's Priority Queue Implementation & Proof",
                "duration_minutes": 40,
                "content_markdown": "# Dijkstra's Algorithm\n\nGreedy single-source shortest path for non-negative weights using a min-heap. Time complexity: `O((V + E) log V)`."
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
                        {"option_index": 0, "text": "O(V^2)"},
                        {"option_index": 1, "text": "O((V + E) log V)"},
                        {"option_index": 2, "text": "O(V log E)"},
                        {"option_index": 3, "text": "O(E^2)"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Each vertex is extracted from the heap once (V log V) and each edge may trigger a heap decrease-key (E log V), yielding O((V + E) log V)."
                },
                {
                    "id": "q-algo-201-2",
                    "position": 2,
                    "prompt": "Which of the following conditions MUST be satisfied to find a topological ordering of a directed graph?",
                    "options": [
                        {"option_index": 0, "text": "The graph must be strongly connected."},
                        {"option_index": 1, "text": "The graph must be a Directed Acyclic Graph (DAG)."},
                        {"option_index": 2, "text": "All edge weights must be strictly non-negative."},
                        {"option_index": 3, "text": "The graph must possess an Eulerian circuit."}
                    ],
                    "correct_option_index": 1,
                    "explanation": "A topological sort exists if and only if the directed graph contains no directed cycles (it is a DAG)."
                },
                {
                    "id": "q-algo-201-3",
                    "position": 3,
                    "prompt": "What does the presence of a 'Back Edge' in a DFS traversal of a directed graph indicate?",
                    "options": [
                        {"option_index": 0, "text": "The graph has disconnected components."},
                        {"option_index": 1, "text": "The graph contains a directed cycle."},
                        {"option_index": 2, "text": "The graph is bipartite."},
                        {"option_index": 3, "text": "All vertices have an in-degree of 1."}
                    ],
                    "correct_option_index": 1,
                    "explanation": "In DFS on directed graphs, an edge pointing to an ancestor currently on the recursion stack is a back edge, proving a cycle exists."
                },
                {
                    "id": "q-algo-201-4",
                    "position": 4,
                    "prompt": "In Kahn's topological sort algorithm, which vertices are placed into the initial processing queue?",
                    "options": [
                        {"option_index": 0, "text": "Vertices with in-degree = 0"},
                        {"option_index": 1, "text": "Vertices with out-degree = 0"},
                        {"option_index": 2, "text": "Vertices with the highest degree"},
                        {"option_index": 3, "text": "Arbitrary starting vertices"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Kahn's algorithm initializes by enqueuing all source vertices that have zero incoming dependencies (in-degree = 0)."
                },
                {
                    "id": "q-algo-201-5",
                    "position": 5,
                    "prompt": "Why does standard Dijkstra's algorithm fail when applied to graphs with negative weight edges?",
                    "options": [
                        {"option_index": 0, "text": "It encounters stack overflow errors."},
                        {"option_index": 1, "text": "The greedy assumption that a visited node has its optimal shortest distance finalized is violated."},
                        {"option_index": 2, "text": "It causes floating-point arithmetic exceptions."},
                        {"option_index": 3, "text": "Min-heaps cannot store negative keys."}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Dijkstra assumes that adding edges to a path cannot decrease total cost. A negative edge can create a cheaper path through an already finalized vertex."
                }
            ]
        }
    },

    # COURSE 3: Dynamic Programming
    {
        "id": "course-dp-301",
        "slug": "course-dp-301",
        "title": "Dynamic Programming & Optimal Substructure",
        "description": "Master memoization, tabulation, state-space reduction, multi-dimensional DP, subset sum, knapsack variants, and bitmask dynamic programming.",
        "category": "Algorithms",
        "duration": "16 hours",
        "skills": ["Memoization & Tabulation", "0/1 Knapsack & Unbounded", "Longest Common Subsequence", "Bitmask DP & State Compression"],
        "lessons": [
            {
                "id": "lesson-dp-301-l1",
                "position": 1,
                "title": "Principle of Optimality & Overlapping Subproblems Analysis",
                "duration_minutes": 30,
                "content_markdown": "# Principle of Optimality\n\nDynamic programming solves problems by combining solutions to subproblems.\n\nKey conditions:\n1. **Optimal Substructure**: An optimal solution contains optimal solutions to subproblems.\n2. **Overlapping Subproblems**: The recursive space contains a small number of distinct subproblems reused repeatedly.\n\nTop-down memoization stores results in a hash map/array during recursion. Bottom-up tabulation iteratively computes subproblems in topological order of dependencies."
            },
            {
                "id": "lesson-dp-301-l2",
                "position": 2,
                "title": "1D Dynamic Programming: Fibonacci, Climbing Stairs & House Robber",
                "duration_minutes": 25,
                "content_markdown": "# 1D Dynamic Programming\n\nIn 1D problems, the state is typically indexed by position `i`.\n\nSpace optimization pattern:\nWhen `dp[i]` depends strictly on `dp[i-1]` and `dp[i-2]`, we discard the full array and maintain two rolling scalar variables (`prev1`, `prev2`), optimizing auxiliary space from `O(N)` to `O(1)`."
            },
            {
                "id": "lesson-dp-301-l3",
                "position": 3,
                "title": "2D Grid & String DP: Longest Common Subsequence & Edit Distance",
                "duration_minutes": 35,
                "content_markdown": "# 2D String & Grid DP\n\nFor two strings of lengths M and N:\n- `dp[i][j]` represents the optimal subproblem for prefixes `s1[0..i-1]` and `s2[0..j-1]`.\n- **LCS recurrence**:\n  - If `s1[i-1] == s2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`\n  - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`\n- Time complexity: `O(M * N)`. Space can be optimized to `O(min(M, N))` using rolling row buffers."
            },
            {
                "id": "lesson-dp-301-l4",
                "position": 4,
                "title": "Knapsack Paradigm: 0/1 Knapsack, Bounded & Unbounded Variants",
                "duration_minutes": 35,
                "content_markdown": "# Knapsack Problems\n\nGiven weights `w[i]`, values `v[i]`, and max capacity `W`:\n- **0/1 Knapsack**: Each item may be chosen at most once. When flattening the table to a 1D array of size `W`, we must iterate capacity `w` **backwards** from `W` down to `w[i]` to avoid reusing the same item.\n- **Unbounded Knapsack**: Items may be chosen infinitely; we iterate capacity `w` **forwards** from `w[i]` up to `W`."
            },
            {
                "id": "lesson-dp-301-l5",
                "position": 5,
                "title": "State-Space Reduction & Bitmask Optimization Techniques",
                "duration_minutes": 40,
                "content_markdown": "# Bitmask Dynamic Programming\n\nWhen N is small (N <= 20) and subproblems depend on subsets of visited elements:\n- An integer bitmask `mask` (0 to `2^N - 1`) encodes subset membership in constant space.\n- Bitwise operations:\n  - Check if element `j` is in mask: `(mask >> j) & 1`\n  - Add element `j`: `mask | (1 << j)`\n- Traveling Salesperson Problem (TSP) transitions in `O(N^2 * 2^N)` compared to `O(N!)` brute force."
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
                        {"option_index": 0, "text": "To prevent CPU cache misses on contiguous memory accesses"},
                        {"option_index": 1, "text": "To ensure that values from the current item are not used more than once in the same iteration"},
                        {"option_index": 2, "text": "Because knapsack capacities must always be sorted primes"},
                        {"option_index": 3, "text": "Descending order is only needed for the unbounded knapsack variant"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Traversing backwards ensures that dp[w - weight[i]] comes from the previous item state rather than being overwritten by the current item in the current round."
                },
                {
                    "id": "q-dp-301-2",
                    "position": 2,
                    "prompt": "What are the necessary and sufficient conditions for a problem to be solvable via Dynamic Programming rather than Greedy?",
                    "options": [
                        {"option_index": 0, "text": "Continuous derivatives and convexity"},
                        {"option_index": 1, "text": "Optimal substructure and overlapping subproblems"},
                        {"option_index": 2, "text": "Strict polynomial-time matroid structure only"},
                        {"option_index": 3, "text": "Constant recursion tree height"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Dynamic programming fundamentally requires optimal substructure (optimal solution composed of optimal subsolutions) and overlapping subproblems."
                },
                {
                    "id": "q-dp-301-3",
                    "position": 3,
                    "prompt": "What is the minimum auxiliary space complexity required to compute the length of the Longest Common Subsequence of two strings of lengths M and N?",
                    "options": [
                        {"option_index": 0, "text": "O(M * N)"},
                        {"option_index": 1, "text": "O(min(M, N))"},
                        {"option_index": 2, "text": "O(1)"},
                        {"option_index": 3, "text": "O(M + N)"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Because computing row i only depends on row i-1, we only need to store two rows of the shorter string, achieving O(min(M, N)) space."
                },
                {
                    "id": "q-dp-301-4",
                    "position": 4,
                    "prompt": "In bitmask DP on N elements (N <= 20), what is the total number of distinct subset states represented by the mask?",
                    "options": [
                        {"option_index": 0, "text": "N^2"},
                        {"option_index": 1, "text": "2^N"},
                        {"option_index": 2, "text": "N!"},
                        {"option_index": 3, "text": "3^N"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "An N-bit integer can represent 2^N unique subsets, with bit i set to 1 if element i is included and 0 otherwise."
                },
                {
                    "id": "q-dp-301-5",
                    "position": 5,
                    "prompt": "For the matrix chain multiplication problem with dimensions p0, p1, ..., pn, what is the time complexity of the standard tabulation algorithm?",
                    "options": [
                        {"option_index": 0, "text": "O(N^2)"},
                        {"option_index": 1, "text": "O(N^3)"},
                        {"option_index": 2, "text": "O(2^N)"},
                        {"option_index": 3, "text": "O(N log N)"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Evaluating O(N^2) subproblems where each subproblem takes O(N) split options results in an overall O(N^3) time complexity."
                }
            ]
        }
    },

    # COURSE 4: Advanced Tree Architectures
    {
        "id": "course-trees-202",
        "slug": "course-trees-202",
        "title": "Advanced Tree Architectures & Balanced Search Trees",
        "description": "Deep dive into self-balancing binary search trees (AVL, Red-Black), Segment Trees, Fenwick (Binary Indexed) Trees, and Lowest Common Ancestor.",
        "category": "Data Structures",
        "duration": "15 hours",
        "skills": ["AVL Rotations & Invariants", "Red-Black Tree Properties", "Segment Trees & Range Queries", "Fenwick Trees (BIT)"],
        "lessons": [
            {
                "id": "lesson-trees-202-l1",
                "position": 1,
                "title": "Binary Search Tree Invariants, Traversal Orders & Path Sums",
                "duration_minutes": 25,
                "content_markdown": "# BST Invariants & Properties\n\n- Invariant: For any node X, `val(left_subtree) < val(X) < val(right_subtree)`.\n- **In-Order Traversal** (`Left -> Node -> Right`) yields sorted order in `O(N)`.\n- Unbalanced BSTs can degenerate to a linked list with `O(N)` search."
            },
            {
                "id": "lesson-trees-202-l2",
                "position": 2,
                "title": "Self-Balancing Trees: AVL Balance Factors & Single/Double Rotations",
                "duration_minutes": 35,
                "content_markdown": "# AVL Trees\n\n- **Balance Factor**: `height(left) - height(right) in {-1, 0, 1}`.\n- Rotations:\n  - LL Case: Right Rotation\n  - RR Case: Left Rotation\n  - LR Case: Left on child, then Right on root\n  - RL Case: Right on child, then Left on root\n- Guarantees strict `O(log N)` search, insertion, and deletion."
            },
            {
                "id": "lesson-trees-202-l3",
                "position": 3,
                "title": "Red-Black Trees: Color Invariants, Black-Height & Restructuring Proofs",
                "duration_minutes": 30,
                "content_markdown": "# Red-Black Trees\n\nProperties:\n1. Every node is either RED or BLACK.\n2. The root is always BLACK.\n3. Red nodes cannot have Red children (No consecutive reds).\n4. Every path from a node to its descendant leaves contains the same number of Black nodes (**black-height**).\n- Ensures height <= `2 * log2(N + 1)`."
            },
            {
                "id": "lesson-trees-202-l4",
                "position": 4,
                "title": "Segment Trees: Point Updates, Range Minimum Queries & Lazy Propagation",
                "duration_minutes": 40,
                "content_markdown": "# Segment Trees\n\n- Solves arbitrary associative range queries in `O(log N)`.\n- Internal nodes store aggregated range statistics (sum, min, max, gcd).\n- **Lazy Propagation**: Defers range updates to child subtrees until needed, maintaining `O(log N)` range modifications."
            },
            {
                "id": "lesson-trees-202-l5",
                "position": 5,
                "title": "Binary Indexed Trees (Fenwick Trees): Prefix Sum Inversion & 2's Complement",
                "duration_minutes": 30,
                "content_markdown": "# Fenwick Trees (BIT)\n\n- Computes prefix sums and updates elements in `O(log N)` time with `O(N)` space.\n- Bit manipulation magic: `lowbit(x) = x & (-x)`.\n  - Update index `i`: `i += i & (-i)`\n  - Query prefix `i`: `i -= i & (-i)`"
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
                        {"option_index": 0, "text": "0"},
                        {"option_index": 1, "text": "1"},
                        {"option_index": 2, "text": "2"},
                        {"option_index": 3, "text": "log2(N)"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "By definition, an AVL tree requires the balance factor |height(left) - height(right)| <= 1 for every node."
                },
                {
                    "id": "q-trees-202-2",
                    "position": 2,
                    "prompt": "Why is the space required for an array-backed Segment Tree on N elements traditionally allocated as 4 * N?",
                    "options": [
                        {"option_index": 0, "text": "To reserve room for 64-bit memory word alignment"},
                        {"option_index": 1, "text": "Because a segment tree is a full binary tree whose leaves span the smallest power of 2 >= N, at most 4N total nodes"},
                        {"option_index": 2, "text": "Because each node requires 4 pointers (parent, left, right, color)"},
                        {"option_index": 3, "text": "It is an arbitrary empirical heuristic"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "If N is 2^k + 1, rounding to the next power of 2 requires 2^(k+1), and a full tree with 2^(k+1) leaves contains 2^(k+2) - 1 < 4N nodes."
                },
                {
                    "id": "q-trees-202-3",
                    "position": 3,
                    "prompt": "In a Fenwick Tree (Binary Indexed Tree), what does the expression 'i & (-i)' calculate?",
                    "options": [
                        {"option_index": 0, "text": "The sign bit of integer i"},
                        {"option_index": 1, "text": "The value of the lowest set bit (least significant 1-bit) in i"},
                        {"option_index": 2, "text": "The integer quotient of i divided by 2"},
                        {"option_index": 3, "text": "The parity of integer i"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Using two's complement arithmetic, i & (-i) isolates the lowest power of 2 that divides i, representing the interval length managed by tree[i]."
                },
                {
                    "id": "q-trees-202-4",
                    "position": 4,
                    "prompt": "Which of the following is NOT an invariant of a valid Red-Black Tree?",
                    "options": [
                        {"option_index": 0, "text": "The root is black."},
                        {"option_index": 1, "text": "If a node is red, both of its children must be black."},
                        {"option_index": 2, "text": "Every simple path from root to leaf must contain the exact same number of red nodes."},
                        {"option_index": 3, "text": "Every simple path from a node to descendant leaves contains the same number of black nodes."}
                    ],
                    "correct_option_index": 2,
                    "explanation": "The invariant applies strictly to black nodes (black-height), not red nodes. Red nodes can vary in count along different paths."
                },
                {
                    "id": "q-trees-202-5",
                    "position": 5,
                    "prompt": "What is the query time complexity of finding the Lowest Common Ancestor (LCA) using Binary Lifting after O(N log N) preprocessing?",
                    "options": [
                        {"option_index": 0, "text": "O(N)"},
                        {"option_index": 1, "text": "O(log N)"},
                        {"option_index": 2, "text": "O(1)"},
                        {"option_index": 3, "text": "O(N^2)"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Binary lifting precalculates 2^k-th ancestors (up table) in O(N log N) time, allowing LCA lookups in O(log N) by jumping powers of 2."
                }
            ]
        }
    },

    # COURSE 5: Sorting & Searching
    {
        "id": "course-algo-102",
        "slug": "course-algo-102",
        "title": "Sorting, Searching & Divide-and-Conquer Paradigms",
        "description": "Formal proofs of comparison sort bounds (Ω(N log N)), randomized QuickSort, MergeSort inversion counting, Binary Search on monotonic solution spaces.",
        "category": "Algorithms",
        "duration": "12 hours",
        "skills": ["Comparison Sorting Lower Bounds", "Randomized QuickSort & Pivot Selection", "MergeSort Inversion Counting", "Binary Search on Answer Spaces"],
        "lessons": [
            {
                "id": "lesson-algo-102-l1",
                "position": 1,
                "title": "Decision Tree Theorem & the Ω(N log N) Comparison Lower Bound",
                "duration_minutes": 25,
                "content_markdown": "# Comparison Sort Lower Bound\n\nAny comparison-based sort can be modeled as a decision tree with `N!` possible permutation leaves.\nA binary tree with height `h` has at most `2^h` leaves.\nTherefore: `2^h >= N! => h >= log2(N!) = Ω(N log N)`.\nHence, no comparison sort can run faster than `O(N log N)` in the worst case."
            },
            {
                "id": "lesson-algo-102-l2",
                "position": 2,
                "title": "MergeSort Mechanics, Recurrence Solving by Master Theorem",
                "duration_minutes": 30,
                "content_markdown": "# MergeSort & Master Theorem\n\n- Recurrence: `T(N) = 2T(N/2) + O(N)`.\n- By Master Theorem: `a = 2, b = 2, f(N) = N`. Since `N^(log_b a) = N^1 = f(N)`, Case 2 applies: `T(N) = Θ(N log N)` in worst, average, and best cases.\n- Stable sorting behavior and optimal for linked list sorting."
            },
            {
                "id": "lesson-algo-102-l3",
                "position": 3,
                "title": "Randomized QuickSort: Expected O(N log N) Runtime & Worst-Case Defenses",
                "duration_minutes": 30,
                "content_markdown": "# QuickSort & Randomization\n\n- Partition algorithms: Lomuto vs Hoare partition.\n- Naive pivot selection on sorted arrays yields `O(N^2)` degradation.\n- Selecting a uniformly random pivot yields expected `O(N log N)` runtime with high probability, making adversarial worst-case inputs impossible."
            },
            {
                "id": "lesson-algo-102-l4",
                "position": 4,
                "title": "Linear-Time Non-Comparison Sorts: Counting, Radix & Bucket Sort",
                "duration_minutes": 30,
                "content_markdown": "# Non-Comparison Sorting\n\n- **Counting Sort**: `O(N + K)` time when integers lie in a bounded range `[0, K]`.\n- **Radix Sort**: Processes digits from least significant to most significant (LSD) using a stable sub-sort, achieving `O(d * (N + B))`.\n- Bypasses the `Ω(N log N)` lower bound by inspecting digital representation."
            },
            {
                "id": "lesson-algo-102-l5",
                "position": 5,
                "title": "Binary Search: Invariants, Boundary Conditions & Monotonic Feasibility Predicates",
                "duration_minutes": 35,
                "content_markdown": "# Binary Search on Answer Spaces\n\nBinary search applies to any monotonic boolean predicate `P(x)`:\n`[False, False, ..., False, True, True, ..., True]`\n- Midpoint overflow prevention: `mid = low + (high - low) // 2`.\n- Optimization problems: Minimize X such that `isValid(X) == True`."
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
                        {"option_index": 0, "text": "Because CPU instructions operate on log N bits at a time"},
                        {"option_index": 1, "text": "Because a decision tree sorting N items must distinguish between N! permutations, requiring depth at least log2(N!)"},
                        {"option_index": 2, "text": "Because array caching requires log N cycles per memory access"},
                        {"option_index": 3, "text": "Because recursion trees always branch with factor 2"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "A decision tree sorting N distinct elements must have at least N! leaves. A binary tree with L leaves has height >= log2(L), and Stirling's approximation gives log2(N!) = Θ(N log N)."
                },
                {
                    "id": "q-algo-102-2",
                    "position": 2,
                    "prompt": "What is the expected time complexity of QuickSelect for finding the k-th smallest element in an unordered array of size N?",
                    "options": [
                        {"option_index": 0, "text": "O(N)"},
                        {"option_index": 1, "text": "O(N log N)"},
                        {"option_index": 2, "text": "O(log N)"},
                        {"option_index": 3, "text": "O(N^2)"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Because QuickSelect only recurses into one half of the partition, the expected recurrence is T(N) = T(N/2) + O(N) = O(N + N/2 + N/4 + ...) = O(2N) = O(N)."
                },
                {
                    "id": "q-algo-102-3",
                    "position": 3,
                    "prompt": "Why is the expression 'mid = low + (high - low) // 2' preferred over 'mid = (low + high) // 2' in production implementations?",
                    "options": [
                        {"option_index": 0, "text": "It compiles to bitwise shift instructions automatically"},
                        {"option_index": 1, "text": "It prevents 32-bit signed integer overflow when low + high exceeds 2^31 - 1"},
                        {"option_index": 2, "text": "It works natively with floating-point numbers"},
                        {"option_index": 3, "text": "It guarantees an even index midpoint"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "When low + high exceeds 2,147,483,647 (the maximum 32-bit signed integer), (low + high) overflows to negative numbers. Subtracting first prevents this overflow."
                },
                {
                    "id": "q-algo-102-4",
                    "position": 4,
                    "prompt": "Which of the following sorting algorithms is stable and guaranteed O(N log N) in the worst case?",
                    "options": [
                        {"option_index": 0, "text": "HeapSort"},
                        {"option_index": 1, "text": "MergeSort"},
                        {"option_index": 2, "text": "QuickSort"},
                        {"option_index": 3, "text": "SelectionSort"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Standard MergeSort preserves relative ordering of equal keys (stable) and guarantees O(N log N) worst-case time, unlike HeapSort (unstable) or QuickSort (O(N^2) worst case)."
                },
                {
                    "id": "q-algo-102-5",
                    "position": 5,
                    "prompt": "When can Radix Sort achieve linear O(N) execution time?",
                    "options": [
                        {"option_index": 0, "text": "When the number of digits d is constant and the base B is O(N)"},
                        {"option_index": 1, "text": "Only when all elements are sorted in reverse"},
                        {"option_index": 2, "text": "Only on linked lists"},
                        {"option_index": 3, "text": "When elements are floating point numbers with infinite precision"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Radix sort runs in O(d * (N + B)). If the number of digits d is fixed and base B = O(N), the total runtime reduces to O(N)."
                }
            ]
        }
    },

    # COURSE 6: Greedy & Matroid
    {
        "id": "course-algo-301",
        "slug": "course-algo-301",
        "title": "Greedy Algorithms, Heuristics & Matroid Theory",
        "description": "Formal exchange arguments for greedy choice property, interval scheduling, Huffman coding, Minimum Spanning Trees (Kruskal, Prim), and Disjoint Set Union.",
        "category": "Algorithms",
        "duration": "14 hours",
        "skills": ["Greedy Choice Property Proofs", "Interval Scheduling & Partitioning", "Huffman Optimal Prefix Codes", "Disjoint Set Union (Union-Find)"],
        "lessons": [
            {
                "id": "lesson-algo-301-l1",
                "position": 1,
                "title": "The Greedy Choice Property & Exchange Argument Proof Strategy",
                "duration_minutes": 25,
                "content_markdown": "# Greedy Proof Techniques\n\n- **Greedy Choice Property**: A globally optimal solution can be reached by choosing a locally optimal choice.\n- **Exchange Argument Proof Structure**:\n  1. Assume optimal solution `OPT` differs from greedy solution `G`.\n  2. Identify the first choice where `OPT` and `G` diverge.\n  3. Swap the `OPT` choice with the `G` choice.\n  4. Prove that the swapped solution is equally or more optimal without violating feasibility.\n  5. Conclude that `G` is optimal."
            },
            {
                "id": "lesson-algo-301-l2",
                "position": 2,
                "title": "Interval Scheduling Maximization & Resource Allocation",
                "duration_minutes": 30,
                "content_markdown": "# Interval Scheduling\n\n- Problem: Select maximum number of mutually compatible intervals.\n- Optimal Greedy Strategy: Sort intervals by **earliest finish time** `f[i]`.\n- Proof: Choosing the interval that finishes earliest frees up the resource for the maximum remaining time horizon."
            },
            {
                "id": "lesson-algo-301-l3",
                "position": 3,
                "title": "Huffman Coding & Information Theoretic Compression",
                "duration_minutes": 30,
                "content_markdown": "# Huffman Coding\n\n- Creates an optimal prefix-free code for data compression.\n- Building the tree with a min-priority queue:\n  1. Insert all characters with their frequencies.\n  2. Extract the two least frequent nodes.\n  3. Combine them into an internal node with sum of frequencies.\n  4. Reinsert until one root node remains.\n- Time complexity: `O(N log N)`."
            },
            {
                "id": "lesson-algo-301-l4",
                "position": 4,
                "title": "Disjoint Set Union: Path Compression & Union-by-Rank O(α(N)) Proof",
                "duration_minutes": 35,
                "content_markdown": "# Disjoint Set Union (DSU / Union-Find)\n\nTwo critical optimizations:\n1. **Path Compression**: `parent[x] = find(parent[x])` flattens tree during find operations.\n2. **Union by Rank**: Attach shorter tree under root of taller tree.\n- Combined complexity: `O(α(N))` per operation, where `α(N)` is the Inverse Ackermann function (effectively constant, `α(N) < 5` for any practical universe size)."
            },
            {
                "id": "lesson-algo-301-l5",
                "position": 5,
                "title": "Minimum Spanning Trees: Cut Property, Kruskal's & Prim's Algorithms",
                "duration_minutes": 35,
                "content_markdown": "# Minimum Spanning Trees (MST)\n\n- **Cut Property**: For any cut in G, the crossing edge of minimum weight belongs to all MSTs.\n- **Kruskal's Algorithm**: Sort all edges by weight, add edge if it connects two disconnected components using DSU. Complexity: `O(E log E)`.\n- **Prim's Algorithm**: Grow a connected component using a min-heap. Complexity: `O(E log V)`."
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
                        {"option_index": 0, "text": "Every cut of the graph must contain at least 2 edges in the MST"},
                        {"option_index": 1, "text": "For any partition of vertices into two subsets, the minimum weight edge crossing the cut belongs to the MST"},
                        {"option_index": 2, "text": "The maximum weight edge in a cycle must belong to the MST"},
                        {"option_index": 3, "text": "Edges crossing cuts must have non-zero prime weights"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "The Cut Property guarantees that the strictly lightest edge crossing any cut (partition of vertices (S, V - S)) is part of every MST."
                },
                {
                    "id": "q-algo-301-2",
                    "position": 2,
                    "prompt": "What is the amortized time complexity per operation of Disjoint Set Union (DSU) when utilizing BOTH Path Compression and Union-by-Rank?",
                    "options": [
                        {"option_index": 0, "text": "O(log N)"},
                        {"option_index": 1, "text": "O(α(N)) where α is the Inverse Ackermann function"},
                        {"option_index": 2, "text": "O(N)"},
                        {"option_index": 3, "text": "O(1) strict worst-case"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Tarjan proved that combining path compression and union-by-rank achieves O(α(N)) amortized time, where α is the extremely slow-growing inverse Ackermann function."
                },
                {
                    "id": "q-algo-301-3",
                    "position": 3,
                    "prompt": "In the Interval Scheduling Maximization problem, which greedy sorting criterion provably guarantees an optimal solution?",
                    "options": [
                        {"option_index": 0, "text": "Earliest start time"},
                        {"option_index": 1, "text": "Shortest interval duration"},
                        {"option_index": 2, "text": "Earliest finish time"},
                        {"option_index": 3, "text": "Fewest conflicts with other intervals"}
                    ],
                    "correct_option_index": 2,
                    "explanation": "Sorting by earliest finish time leaves the maximum possible remaining time for subsequent intervals, which is proven optimal via exchange argument."
                },
                {
                    "id": "q-algo-301-4",
                    "position": 4,
                    "prompt": "Why are Huffman codes guaranteed to be prefix-free?",
                    "options": [
                        {"option_index": 0, "text": "Because symbols are strictly placed at the leaf nodes of the binary tree"},
                        {"option_index": 1, "text": "Because characters are hashed using CRC32"},
                        {"option_index": 2, "text": "Because codes are padded with zeroes at the beginning"},
                        {"option_index": 3, "text": "Because frequencies are required to be powers of 2"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "In a Huffman tree, all encoded symbols reside exclusively at the leaves. No leaf is an ancestor of another leaf, so no code can be a prefix of another."
                },
                {
                    "id": "q-algo-301-5",
                    "position": 5,
                    "prompt": "In Kruskal's algorithm, what data structure is utilized to detect and prevent cycles in O(α(V)) time?",
                    "options": [
                        {"option_index": 0, "text": "Breadth-First Search queue"},
                        {"option_index": 1, "text": "Disjoint Set Union (Union-Find)"},
                        {"option_index": 2, "text": "Fibonacci Heap"},
                        {"option_index": 3, "text": "Adjacency Matrix"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Kruskal checks whether the endpoints of edge (u, v) belong to the same component by calling find(u) and find(v) on a DSU structure."
                }
            ]
        }
    },

    # COURSE 7: System Design
    {
        "id": "course-sys-401",
        "slug": "course-sys-401",
        "title": "System Design Fundamentals & Scalable Architecture",
        "description": "High-throughput, distributed system design: load balancing, consistent hashing, caching hierarchies, database replication, CAP theorem, and event-driven architecture.",
        "category": "System Design",
        "duration": "20 hours",
        "skills": ["Consistent Hashing & Partitioning", "Caching Strategies (LRU, Write-Through)", "CAP Theorem & PACELC", "Message Queues & Event Streaming"],
        "lessons": [
            {
                "id": "lesson-sys-401-l1",
                "position": 1,
                "title": "Horizontal vs Vertical Scaling & Stateless Architecture Patterns",
                "duration_minutes": 25,
                "content_markdown": "# Scaling Strategies & Stateless Web Layers\n\n- **Vertical Scaling** (Scale Up): Add RAM/CPU to single server. Hit hardware ceilings and single point of failure.\n- **Horizontal Scaling** (Scale Out): Add more commodity servers behind a reverse proxy/load balancer (e.g. NGINX, HAProxy).\n- Stateless web services delegate session state to distributed stores (Redis, Memcached), allowing round-robin routing."
            },
            {
                "id": "lesson-sys-401-l2",
                "position": 2,
                "title": "Consistent Hashing: Virtual Nodes & Distributed Sharding",
                "duration_minutes": 35,
                "content_markdown": "# Consistent Hashing\n\n- Standard modular hashing (`hash(key) % N`) forces `(N - 1)/N` keys to relocate when a node is added/removed.\n- Consistent hashing maps both servers and keys onto a circular hash ring `[0, 2^32 - 1]`.\n- Adding/removing a server only relocates `K / N` keys on average.\n- **Virtual Nodes**: Multiple ring positions per physical server eliminate hot spots and balance key distribution."
            },
            {
                "id": "lesson-sys-401-l3",
                "position": 3,
                "title": "Caching Hierarchies: Cache-Aside, Write-Through, Write-Behind & Eviction",
                "duration_minutes": 30,
                "content_markdown": "# Distributed Caching Patterns\n\n- **Cache-Aside (Lazy Loading)**: Application queries cache; on miss, queries DB and populates cache.\n- **Write-Through**: Application writes to cache; cache synchronously writes to DB.\n- **Write-Behind (Write-Back)**: Application writes to cache; cache asynchronously writes to DB in batches (high throughput, durability risk on failure).\n- Eviction policies: LRU (Least Recently Used), LFU, FIFO, TTL expiry."
            },
            {
                "id": "lesson-sys-401-l4",
                "position": 4,
                "title": "Data Replication, Consensus & the CAP/PACELC Tradeoff Spectrum",
                "duration_minutes": 35,
                "content_markdown": "# CAP Theorem & PACELC\n\n- **CAP Theorem**: In the presence of a Network Partition (P), a distributed data store must choose between Consistency (C) and Availability (A).\n- **PACELC Theorem**: In an architectural partition (P), choose A or C; Else (E), choose Latency (L) or Consistency (C).\n- Synchronous vs Asynchronous replication and eventual consistency models."
            },
            {
                "id": "lesson-sys-401-l5",
                "position": 5,
                "title": "Asynchronous Decoupling: Kafka Event Streams, Pub-Sub & Dead-Letter Queues",
                "duration_minutes": 35,
                "content_markdown": "# Event-Driven Architecture\n\n- Synchronous REST RPC binds service availability tightly.\n- Message brokers (Kafka, RabbitMQ) decouple producers and consumers:\n  - Buffering spikes\n  - Backpressure management\n  - Guaranteed at-least-once delivery with idempotent consumers\n  - Dead-Letter Queues (DLQ) for unprocessable messages."
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
                        {"option_index": 0, "text": "K / N"},
                        {"option_index": 1, "text": "K / (N + 1)"},
                        {"option_index": 2, "text": "All K keys"},
                        {"option_index": 3, "text": "(N - 1) / N"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Consistent hashing only relocates keys belonging to the immediate segment taken over by the new server, which is on average K / (N + 1)."
                },
                {
                    "id": "q-sys-401-2",
                    "position": 2,
                    "prompt": "According to the CAP Theorem, when an unavoidable network partition occurs between data center nodes, which guarantee must the system sacrifice if it chooses to remain fully Available?",
                    "options": [
                        {"option_index": 0, "text": "Linearizable Consistency"},
                        {"option_index": 1, "text": "Durability"},
                        {"option_index": 2, "text": "Atomicity"},
                        {"option_index": 3, "text": "Latency"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "If the system answers requests during a partition (Availability), nodes cannot coordinate state synchronously, sacrificing linearizable Consistency."
                },
                {
                    "id": "q-sys-401-3",
                    "position": 3,
                    "prompt": "What is the primary operational trade-off of using a Write-Behind (Write-Back) caching strategy?",
                    "options": [
                        {"option_index": 0, "text": "Excessive database write contention on reads"},
                        {"option_index": 1, "text": "Risk of data loss if the cache server crashes before asynchronous writes flush to the persistent database"},
                        {"option_index": 2, "text": "Immediate cache invalidation on each GET request"},
                        {"option_index": 3, "text": "Inability to use TTL expiration"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Write-behind returns success as soon as the cache memory is updated, creating a window where a crash causes permanent data loss before persistent disk write."
                },
                {
                    "id": "q-sys-401-4",
                    "position": 4,
                    "prompt": "Why are virtual nodes utilized in consistent hashing implementations?",
                    "options": [
                        {"option_index": 0, "text": "To encrypt keys across TLS certificates"},
                        {"option_index": 1, "text": "To ensure uniform key distribution across physical servers and prevent hotspots"},
                        {"option_index": 2, "text": "To simulate multithreaded database locks"},
                        {"option_index": 3, "text": "To eliminate the need for hash functions"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "Assigning multiple virtual ring points per server smoothes out variance, ensuring servers receive roughly equal proportions of keys."
                },
                {
                    "id": "q-sys-401-5",
                    "position": 5,
                    "prompt": "What design property must message consumers implement to safely handle at-least-once message delivery from message brokers?",
                    "options": [
                        {"option_index": 0, "text": "Strict single-threaded execution"},
                        {"option_index": 1, "text": "Idempotency (re-processing the same message produces the identical state)"},
                        {"option_index": 2, "text": "Asynchronous zero-copy TCP sockets"},
                        {"option_index": 3, "text": "Stateless RAM buffers"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "At-least-once brokers may deliver duplicate messages on network timeouts; consumers must be idempotent (e.g. tracking unique message IDs) to prevent duplicate side effects."
                }
            ]
        }
    },

    # COURSE 8: String Algorithms
    {
        "id": "course-strings-201",
        "slug": "course-strings-201",
        "title": "String Algorithms, Pattern Matching & Automata",
        "description": "Sublinear string search, Knuth-Morris-Pratt (KMP) failure functions, Rabin-Karp rolling hashes, Tries, Suffix Arrays, and Aho-Corasick automaton.",
        "category": "Data Structures",
        "duration": "13 hours",
        "skills": ["KMP Prefix-Suffix (LPS) Array", "Rabin-Karp Polynomial Rolling Hash", "Trie Implementations & Autocomplete", "Suffix Arrays & LCP Arrays"],
        "lessons": [
            {
                "id": "lesson-strings-201-l1",
                "position": 1,
                "title": "String Matching Foundations: Naive vs Linear-Time Objectives",
                "duration_minutes": 20,
                "content_markdown": "# String Pattern Matching\n\nGiven text `T` of length N and pattern `P` of length M:\n- Naive algorithm: Checks pattern at every shift, leading to `O(N * M)` worst case (e.g. `T = 'AAAAAB'`, `P = 'AAB'`).\n- Advanced algorithms (KMP, Boyer-Moore, Rabin-Karp) achieve `O(N + M)` by avoiding redundant comparisons."
            },
            {
                "id": "lesson-strings-201-l2",
                "position": 2,
                "title": "Knuth-Morris-Pratt (KMP) Algorithm & π (LPS) Table Construction",
                "duration_minutes": 35,
                "content_markdown": "# Knuth-Morris-Pratt (KMP)\n\n- Computes the Longest Prefix which is also a Suffix (LPS) array for pattern `P` in `O(M)` time.\n- On a character mismatch at `P[j]`, the text pointer never backtracks; instead, `j` jumps to `lps[j-1]`.\n- Total runtime: `O(N + M)` with `O(M)` auxiliary space."
            },
            {
                "id": "lesson-strings-201-l3",
                "position": 3,
                "title": "Rabin-Karp Algorithm & Modular Collision-Resistant Rolling Hashes",
                "duration_minutes": 30,
                "content_markdown": "# Rabin-Karp Rolling Hash\n\n- Treats string substrings as base-`B` polynomials modulo large prime `Q`:\n  `H = (s[0]*B^(M-1) + s[1]*B^(M-2) + ... + s[M-1]) % Q`\n- Shifting the window by 1 character computes the new hash in `O(1)` time:\n  `H_new = ((H_old - s[old]*B^(M-1)) * B + s[new]) % Q`\n- Average time: `O(N + M)`. Excellent for multi-pattern and 2D grid search."
            },
            {
                "id": "lesson-strings-201-l4",
                "position": 4,
                "title": "Tries: Memory Layout, Prefix Lookups & Bitwise XOR Maximum Pairs",
                "duration_minutes": 30,
                "content_markdown": "# Tries (Prefix Trees)\n\n- Tree where each edge corresponds to a character.\n- Supports insert, search, and prefix matching in `O(L)` time, where L is string length, independent of dictionary size N.\n- **Binary Trie**: Storing binary representations of integers allows finding Maximum XOR pairs in `O(32)` time."
            },
            {
                "id": "lesson-strings-201-l5",
                "position": 5,
                "title": "Suffix Arrays & Longest Common Prefix (LCP) Array Construction",
                "duration_minutes": 35,
                "content_markdown": "# Suffix Arrays & LCP\n\n- A **Suffix Array** stores sorted indices of all suffixes of text `T` in `O(N log N)` or `O(N)` time.\n- Combined with the **Longest Common Prefix (LCP)** array via Kasai's algorithm (`O(N)`), answers:\n  - Substring search in `O(M log N)`\n  - Number of distinct substrings\n  - Longest repeated substring in linear time."
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
                        {"option_index": 0, "text": "The length of the longest palindromic substring ending at i"},
                        {"option_index": 1, "text": "The length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i]"},
                        {"option_index": 2, "text": "The total number of occurrences of character P[i]"},
                        {"option_index": 3, "text": "The edit distance to the reversed pattern"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "The LPS (pi) table stores the length of the longest proper prefix that matches a proper suffix of the same substring, enabling safe jump offsets without retreating the text cursor."
                },
                {
                    "id": "q-strings-201-2",
                    "position": 2,
                    "prompt": "What is the time complexity to update a polynomial rolling hash of window size M when sliding the window one position to the right in Rabin-Karp?",
                    "options": [
                        {"option_index": 0, "text": "O(1)"},
                        {"option_index": 1, "text": "O(M)"},
                        {"option_index": 2, "text": "O(log M)"},
                        {"option_index": 3, "text": "O(M^2)"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Subtracting the outgoing leading character and adding the incoming trailing character takes constant O(1) arithmetic operations modulo Q."
                },
                {
                    "id": "q-strings-201-3",
                    "position": 3,
                    "prompt": "What is the time complexity to search for a word of length L in a Trie containing N total words?",
                    "options": [
                        {"option_index": 0, "text": "O(L)"},
                        {"option_index": 1, "text": "O(N)"},
                        {"option_index": 2, "text": "O(N * L)"},
                        {"option_index": 3, "text": "O(log N)"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Trie lookups traverse one edge per character of the query word, taking strictly O(L) time regardless of how many thousands of words are stored."
                },
                {
                    "id": "q-strings-201-4",
                    "position": 4,
                    "prompt": "Given a Suffix Array of string T of length N, what is the time complexity to check if a pattern P of length M exists in T using binary search?",
                    "options": [
                        {"option_index": 0, "text": "O(M log N)"},
                        {"option_index": 1, "text": "O(N * M)"},
                        {"option_index": 2, "text": "O(N + M)"},
                        {"option_index": 3, "text": "O(log M)"}
                    ],
                    "correct_option_index": 0,
                    "explanation": "Binary search on the sorted suffix array takes O(log N) iterations, with each comparison taking at most O(M) character checks, yielding O(M log N)."
                },
                {
                    "id": "q-strings-201-5",
                    "position": 5,
                    "prompt": "Why can the naive string matching algorithm degrade to O(N * M) on repetitive inputs like text 'AAAAAAA' and pattern 'AAAAB'?",
                    "options": [
                        {"option_index": 0, "text": "Because it fails to handle ASCII values correctly"},
                        {"option_index": 1, "text": "Because on each mismatch, the text pointer resets all the way back, re-comparing characters that were already seen"},
                        {"option_index": 2, "text": "Because hash collisions occur on every iteration"},
                        {"option_index": 3, "text": "Because memory bandwidth limits recursive stack frames"}
                    ],
                    "correct_option_index": 1,
                    "explanation": "The naive algorithm resets its text index by M - 1 positions after nearly matching M characters, repeating M comparisons for every one of the N starting shifts."
                }
            ]
        }
    }
]

# Write to backend/app/data/learning_bank.py
target_py = 'd:/ARISE/backend/app/data/learning_bank.py'
with open(target_py, 'w', encoding='utf-8') as f:
    f.write('COURSES_SEED_DATA = ' + json.dumps(COURSES, indent=4) + '\n')

print(f"Successfully generated {len(COURSES)} structured learning tracks in {target_py}!")
