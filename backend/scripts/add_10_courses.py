import json
import re

c9 = {
    "id": "course-math-201",
    "slug": "course-math-201",
    "title": "Combinatorics, Number Theory & Cryptographic Algorithms",
    "description": "Rigorous mathematical foundations for competitive programming: modular arithmetic, fast exponentiation, prime sieves, combinatorics, and public-key cryptography.",
    "category": "Algorithms",
    "duration": "14 hours",
    "skills": [
        "Modular Exponentiation & Inverses",
        "Sieve of Eratosthenes & Prime Factorization",
        "Euler's Totient Function (Phi)",
        "Combinatorics & Lucas' Theorem"
    ],
    "curriculum": [
        {
            "id": "lesson-math-201-l1",
            "position": 1,
            "title": "Modular Arithmetic, Binary Exponentiation & Extended Euclidean Algorithm",
            "duration_minutes": 25,
            "content_markdown": "# Modular Arithmetic & Fast Exponentiation\n\n- Binary exponentiation computes `(a^b) % m` in `O(log b)` time by squaring base `a` on even bits and multiplying on odd bits.\n- **Fermat's Little Theorem**: If `m` is prime, `a^(m-1) = 1 (mod m)`, so modular inverse `a^(-1) = a^(m-2) (mod m)`.\n- **Extended Euclidean Algorithm**: Finds integers `x, y` such that `a*x + b*y = gcd(a, b)` in `O(log(min(a, b)))`, computing inverses when `gcd(a, m) = 1` even for composite moduli."
        },
        {
            "id": "lesson-math-201-l2",
            "position": 2,
            "title": "Prime Numbers, Sieve of Eratosthenes & Linear Sieve Factorization",
            "duration_minutes": 30,
            "content_markdown": "# Prime Sieves & Factorization\n\n- **Standard Sieve**: Marks multiples of primes up to `N` in `O(N log log N)` time.\n- **Linear Sieve (Euler Sieve)**: Ensures each composite number is marked by its smallest prime factor (SPF) exactly once in `O(N)` time.\n- **O(1) Prime Factorization**: Precomputing the `SPF` array enables factorizing any integer `X <= N` in `O(log X)` divisions."
        },
        {
            "id": "lesson-math-201-l3",
            "position": 3,
            "title": "Euler's Totient Function (Phi) & Chinese Remainder Theorem (CRT)",
            "duration_minutes": 35,
            "content_markdown": "# Totient & Chinese Remainder Theorem\n\n- **Euler's Totient Function phi(N)**: Counts integers `1 <= k <= N` coprime to `N`. Formula: `phi(N) = N * product(1 - 1/p)` for each prime factor `p`.\n- **Euler's Theorem**: `a^phi(m) = 1 (mod m)` for coprime `a, m`.\n- **Chinese Remainder Theorem (CRT)**: A system of congruences `x = r_i (mod m_i)` with pairwise coprime moduli has a unique solution modulo `product(m_i)` computable via modular inverses."
        },
        {
            "id": "lesson-math-201-l4",
            "position": 4,
            "title": "Combinatorics: Permutations, Binomial Coefficients & Lucas' Theorem",
            "duration_minutes": 30,
            "content_markdown": "# Combinatorics & Lucas' Theorem\n\n- **Binomial Coefficient C(N, K)**: Precomputing factorials and inverse factorials enables `O(1)` query of `C(N, K) % P` for prime `P`.\n- **Lucas' Theorem**: For large `N, K >= P`, `C(N, K) = product(C(n_i, k_i)) (mod P)` where `n_i, k_i` are base-`P` digits of `N, K`, reducing `O(N)` computations to `O(P)`."
        },
        {
            "id": "lesson-math-201-l5",
            "position": 5,
            "title": "Matrix Exponentiation for Recurrences & Linear Recurrence Solutions",
            "duration_minutes": 35,
            "content_markdown": "# Matrix Exponentiation for Linear Recurrences\n\n- Any linear recurrence of order `K` (like Fibonacci `F(n) = F(n-1) + F(n-2)`) can be written as a `K x K` matrix equation:\n  `[F_n, F_(n-1)]^T = T * [F_(n-1), F_(n-2)]^T`\n- Transition matrix exponentiation computes `T^N` in `O(K^3 log N)` time, solving `N = 10^18` in microseconds."
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
                    {"option_index": 0, "text": "O(B)"},
                    {"option_index": 1, "text": "O(log B)"},
                    {"option_index": 2, "text": "O(1)"},
                    {"option_index": 3, "text": "O(sqrt(B))"}
                ],
                "correct_option_index": 1,
                "explanation": "Binary exponentiation halves the exponent B at each step, taking at most log2(B) multiplications modulo M."
            },
            {
                "id": "q-math-201-2",
                "position": 2,
                "prompt": "According to Fermat's Little Theorem, if P is a prime and gcd(A, P) = 1, what is A^(P-2) % P?",
                "options": [
                    {"option_index": 0, "text": "The modular multiplicative inverse of A modulo P"},
                    {"option_index": 1, "text": "1"},
                    {"option_index": 2, "text": "0"},
                    {"option_index": 3, "text": "P - 1"}
                ],
                "correct_option_index": 0,
                "explanation": "Since A^(P-1) = 1 (mod P), multiplying both sides by A^(-1) yields A^(-1) = A^(P-2) (mod P)."
            },
            {
                "id": "q-math-201-3",
                "position": 3,
                "prompt": "What makes the Linear Sieve (Euler Sieve) achieve O(N) complexity instead of O(N log log N)?",
                "options": [
                    {"option_index": 0, "text": "It skips checking even numbers only"},
                    {"option_index": 1, "text": "Each composite number is marked by its smallest prime factor (SPF) exactly once"},
                    {"option_index": 2, "text": "It uses GPU floating-point parallelism"},
                    {"option_index": 3, "text": "It calculates primes using polynomial interpolation"}
                ],
                "correct_option_index": 1,
                "explanation": "By breaking the inner loop as soon as i % p == 0, every composite number is visited exactly once by its smallest prime factor."
            },
            {
                "id": "q-math-201-4",
                "position": 4,
                "prompt": "Lucas' Theorem is specifically utilized to compute C(N, K) modulo P when:",
                "options": [
                    {"option_index": 0, "text": "N and K are much larger than prime P"},
                    {"option_index": 1, "text": "P is a composite number"},
                    {"option_index": 2, "text": "K is equal to 0 or 1 only"},
                    {"option_index": 3, "text": "Modulus P is a power of 2"}
                ],
                "correct_option_index": 0,
                "explanation": "Lucas theorem expresses N and K in base P digits, reducing huge combinations (N, K up to 10^18) to small combinations modulo prime P."
            },
            {
                "id": "q-math-201-5",
                "position": 5,
                "prompt": "To compute the N-th Fibonacci number for N = 10^18 modulo 10^9 + 7, what is the optimal algorithmic approach?",
                "options": [
                    {"option_index": 0, "text": "Dynamic programming array of size N"},
                    {"option_index": 1, "text": "Recursive top-down memoization with hash table"},
                    {"option_index": 2, "text": "2x2 Matrix exponentiation in O(log N) time"},
                    {"option_index": 3, "text": "Iterative loop running N iterations"}
                ],
                "correct_option_index": 2,
                "explanation": "Matrix exponentiation of the companion matrix [[1, 1], [1, 0]]^N computes the exact N-th Fibonacci number in O(8 * log N) operations."
            }
        ]
    }
}

c10 = {
    "id": "course-os-301",
    "slug": "course-os-301",
    "title": "Operating Systems Internals, Concurrency & Memory Management",
    "description": "Deep dive into operating system fundamentals: processes, threads, virtual memory paging, synchronization primitives, deadlocks, and disk scheduling algorithms.",
    "category": "System Design",
    "duration": "16 hours",
    "skills": [
        "Process Scheduling & Context Switching",
        "Virtual Memory & Page Replacement",
        "Mutexes, Semaphores & Condition Variables",
        "Deadlock Detection & Banker's Algorithm"
    ],
    "curriculum": [
        {
            "id": "lesson-os-301-l1",
            "position": 1,
            "title": "Process Lifecycles, Context Switching & CPU Scheduling Paradigms",
            "duration_minutes": 30,
            "content_markdown": "# Process Management & CPU Scheduling\n\n- **Process Control Block (PCB)**: Stores PID, program counter, register state, CPU scheduling info, and memory limits.\n- **Context Switch Overhead**: Saving register state, swapping page table base registers (CR3 in x86), and flushing TLB caches incurs hardware penalties.\n- **Scheduling Algorithms**: Round Robin (time quantum tradeoff), Completely Fair Scheduler (CFS red-black tree with vruntime), and Multi-Level Feedback Queues (MLFQ)."
        },
        {
            "id": "lesson-os-301-l2",
            "position": 2,
            "title": "Virtual Memory Architecture: Paging, TLBs & Page Fault Handling",
            "duration_minutes": 35,
            "content_markdown": "# Virtual Memory Architecture\n\n- **Multi-Level Page Tables**: Virtual addresses are mapped to physical frames via directory levels (e.g. 4-level paging in x86-64: PML4 -> PDP -> PD -> PT).\n- **Translation Lookaside Buffer (TLB)**: Hardware CAM cache for virtual-to-physical address translations.\n- **Page Fault Sequence**: Hardware interrupt -> trap to kernel -> verify VMA permissions -> allocate frame from free pool -> load from backing store (swap) -> update page table & TLB -> resume instruction."
        },
        {
            "id": "lesson-os-301-l3",
            "position": 3,
            "title": "Page Replacement Algorithms: FIFO, LRU, Optimal & Clock (Second-Chance)",
            "duration_minutes": 30,
            "content_markdown": "# Page Replacement Algorithms\n\n- **Belady's Anomaly**: For FIFO, increasing frame count can paradoxically increase page faults.\n- **Optimal (Bélády's Optimal)**: Evicts the page that will not be used for the longest period; theoretical benchmark.\n- **LRU (Least Recently Used)**: Evicts least recently accessed page; implemented in production via **Clock (Second-Chance)** algorithm using reference bits."
        },
        {
            "id": "lesson-os-301-l4",
            "position": 4,
            "title": "Concurrency Primitives: Atomic Operations, Mutexes, Semaphores & Barriers",
            "duration_minutes": 35,
            "content_markdown": "# Concurrency Primitives\n\n- **Atomic Hardware Instructions**: Compare-And-Swap (CAS), Test-And-Set, and Load-Linked/Store-Conditional (LL/SC).\n- **Spinlocks vs Mutexes**: Spinlocks busy-wait on CPU (low latency for microsecond locks); mutexes put threads to sleep in kernel wait queues.\n- **Semaphores**: Counting semaphores track resource pools (Dijkstra's P and V operations).\n- **Condition Variables**: Pair with mutexes to let threads wait for state predicates without busy polling."
        },
        {
            "id": "lesson-os-301-l5",
            "position": 5,
            "title": "Deadlock Dynamics: Coffman Conditions, Resource Allocation Graphs & Banker's Algorithm",
            "duration_minutes": 35,
            "content_markdown": "# Deadlock Dynamics & Prevention\n\n- **Coffman Conditions**: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, (4) Circular Wait. Breaking any one condition prevents deadlock.\n- **Resource Allocation Graph (RAG)**: Cycle indicates deadlock if single instance per resource type.\n- **Dijkstra's Banker's Algorithm**: Determines safe states before granting resource requests using `Allocation`, `Max`, `Available`, and `Need` vectors."
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
                    {"option_index": 0, "text": "CR3"},
                    {"option_index": 1, "text": "EAX"},
                    {"option_index": 2, "text": "ESP"},
                    {"option_index": 3, "text": "DR0"}
                ],
                "correct_option_index": 0,
                "explanation": "Control Register 3 (CR3) holds the physical base address of the top-level page table (PML4). Swapping CR3 switches the address space."
            },
            {
                "id": "q-os-301-2",
                "position": 2,
                "prompt": "Belady's Anomaly occurs in which page replacement algorithm where increasing physical frame count increases page faults?",
                "options": [
                    {"option_index": 0, "text": "Least Recently Used (LRU)"},
                    {"option_index": 1, "text": "First-In, First-Out (FIFO)"},
                    {"option_index": 2, "text": "Optimal Page Replacement"},
                    {"option_index": 3, "text": "Clock Second-Chance"}
                ],
                "correct_option_index": 1,
                "explanation": "FIFO is not a stack algorithm; allocating more page frames can disrupt the queue order and lead to strictly more page faults."
            },
            {
                "id": "q-os-301-3",
                "position": 3,
                "prompt": "Which of the following is NOT one of the four necessary Coffman conditions for a system deadlock?",
                "options": [
                    {"option_index": 0, "text": "Mutual Exclusion"},
                    {"option_index": 1, "text": "Hold and Wait"},
                    {"option_index": 2, "text": "Strict Memory Alignment"},
                    {"option_index": 3, "text": "Circular Wait"}
                ],
                "correct_option_index": 2,
                "explanation": "The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Memory alignment is unrelated."
            },
            {
                "id": "q-os-301-4",
                "position": 4,
                "prompt": "When should a spinlock be chosen over a mutex in multi-threaded systems programming?",
                "options": [
                    {"option_index": 0, "text": "When the critical section is extremely short and context switch latency exceeds busy-wait time"},
                    {"option_index": 1, "text": "When the thread must wait for disk I/O to complete"},
                    {"option_index": 2, "text": "When running on a single-core uniprocessor without preemption"},
                    {"option_index": 3, "text": "When allocating dynamic heap memory"}
                ],
                "correct_option_index": 0,
                "explanation": "Spinlocks avoid the expensive OS kernel transition and context switch overhead when the lock is held for just a few CPU cycles."
            },
            {
                "id": "q-os-301-5",
                "position": 5,
                "prompt": "What does Dijkstra's Banker's Algorithm evaluate before granting an allocated resource request?",
                "options": [
                    {"option_index": 0, "text": "Whether granting the request leaves the system in a safe state with a valid execution sequence"},
                    {"option_index": 1, "text": "Whether the requesting process has higher priority than the kernel scheduler"},
                    {"option_index": 2, "text": "Whether the CPU cache lines are 64-byte aligned"},
                    {"option_index": 3, "text": "Whether the process memory usage exceeds virtual swap capacity"}
                ],
                "correct_option_index": 0,
                "explanation": "The Banker's algorithm tests if there exists at least one order in which all processes can finish without entering an unavoidable deadlock."
            }
        ]
    }
}

with open('d:/ARISE/backend/app/data/learning_bank.py', 'r', encoding='utf-8') as f:
    text = f.read()

courses = eval(text[text.index('['):text.rindex(']')+1])
print('Original courses count:', len(courses))
if not any(c['id'] == 'course-math-201' for c in courses):
    courses.append(c9)
if not any(c['id'] == 'course-os-301' for c in courses):
    courses.append(c10)
print('Total courses count after update:', len(courses))

new_code = 'LEARNING_COURSES = ' + json.dumps(courses, indent=4) + '\n'
with open('d:/ARISE/backend/app/data/learning_bank.py', 'w', encoding='utf-8') as f:
    f.write(new_code)
print('Updated learning_bank.py successfully!')
