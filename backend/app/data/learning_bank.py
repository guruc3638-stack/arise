COURSES_SEED_DATA = [
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
    }
]
