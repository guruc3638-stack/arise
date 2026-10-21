const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

// 1. Verify learning.js structure and function exports
const learningSource = fs.readFileSync('d:/ARISE/js/screens/learning.js', 'utf8');
assert(learningSource.includes('renderLearningScreen'), 'must contain renderLearningScreen');
assert(learningSource.includes('renderCourseCatalogue'), 'must contain renderCourseCatalogue');
assert(learningSource.includes('renderCourseDetail'), 'must contain renderCourseDetail');
assert(learningSource.includes('renderLessonPlayer'), 'must contain renderLessonPlayer');
assert(learningSource.includes('renderFinalAssessmentQuiz'), 'must contain renderFinalAssessmentQuiz');
assert(learningSource.includes('renderQuizResults'), 'must contain renderQuizResults');
assert(learningSource.includes('renderCourseCompletionScreen'), 'must contain renderCourseCompletionScreen');
assert(learningSource.includes('markCurrentLessonCompleted'), 'must contain markCurrentLessonCompleted');
assert(learningSource.includes('selectQuizOption'), 'must contain selectQuizOption');
assert(learningSource.includes('handleFinalAssessmentSubmit'), 'must contain handleFinalAssessmentSubmit');
assert(learningSource.includes('retryFinalAssessment'), 'must contain retryFinalAssessment');

// 2. Setup simulated browser sandbox
const toasts = [];
const apiCalls = [];

const sandbox = {
  window: {
    location: { hash: '' },
    history: { pushState: () => {}, replaceState: () => {} },
    scrollTo: () => {}
  },
  document: {
    getElementById: () => null
  },
  localStorage: {
    store: { arise_token: 'dummy-token' },
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; }
  },
  showToast(msg, type) {
    toasts.push({ msg, type });
  },
  console: { log: () => {}, warn: () => {}, error: () => {} },
  ARISE_DATA: {
    currentUser: {
      uid: 'AR-STUDENT99',
      displayName: 'Aditi Kulkarni',
      college: 'PICT Pune',
      district: 'Pune',
      state: 'Maharashtra',
      verifiedXp: 0,
      coursesCompleted: 0
    },
    courses: [],
    studyLibrary: [{ id: 'doc-1', title: 'Doc 1' }]
  },
  fetch: async (url, opts = {}) => {
    apiCalls.push({ url, method: opts.method || 'GET', body: opts.body });
    const method = opts.method || 'GET';
    const path = url.replace('http://localhost:8000/api/v1', '');

    if (path === '/courses' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => [
          {
            id: 'course-dsa-101',
            slug: 'course-dsa-101',
            title: 'Foundations of Data Structures & Asymptotic Complexity',
            description: 'Rigorous foundation covering mathematical analysis.',
            category: 'Data Structures',
            duration: '14 hours',
            lessons_count: 4,
            completed_lessons: 0,
            skills: ['Big-O', 'Arrays'],
            is_completed: false,
            best_score: null
          },
          {
            id: 'course-algo-201',
            slug: 'course-algo-201',
            title: 'Advanced Graph Theory & Network Traversal',
            description: 'Comprehensive traversal and shortest paths.',
            category: 'Algorithms',
            duration: '18 hours',
            lessons_count: 5,
            completed_lessons: 0,
            skills: ['BFS', 'DFS', 'Dijkstra'],
            is_completed: false,
            best_score: null
          }
        ]
      };
    }

    if (path === '/courses/course-algo-201' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 'course-algo-201',
          slug: 'course-algo-201',
          title: 'Advanced Graph Theory & Network Traversal',
          description: 'Comprehensive traversal, shortest paths, DAG dependency resolution.',
          category: 'Algorithms',
          duration: '18 hours',
          lessons_count: 5,
          completed_lessons: 0,
          skills: ['BFS', 'DFS', 'Topological Sort', "Dijkstra's Algorithm"],
          curriculum: [
            { id: 'lesson-algo-201-l1', course_id: 'course-algo-201', title: 'Graph Representations', position: 1, duration_minutes: 25, is_completed: false },
            { id: 'lesson-algo-201-l2', course_id: 'course-algo-201', title: 'BFS Level-Order Discovery', position: 2, duration_minutes: 30, is_completed: false },
            { id: 'lesson-algo-201-l3', course_id: 'course-algo-201', title: 'DFS Backtracking', position: 3, duration_minutes: 35, is_completed: false },
            { id: 'lesson-algo-201-l4', course_id: 'course-algo-201', title: "Kahn's Algorithm", position: 4, duration_minutes: 30, is_completed: false },
            { id: 'lesson-algo-201-l5', course_id: 'course-algo-201', title: "Dijkstra's Priority Queue", position: 5, duration_minutes: 40, is_completed: false }
          ],
          final_test: {
            id: 'test-algo-201',
            course_id: 'course-algo-201',
            title: 'Advanced Graph Theory Final Assessment',
            pass_percentage: 80,
            question_count: 5,
            questions: [
              { id: 'q-algo-201-1', position: 1, prompt: 'Dijkstra heap complexity?', options: [{ option_index: 0, text: 'O(V^2)' }, { option_index: 1, text: 'O((V+E) log V)' }] },
              { id: 'q-algo-201-2', position: 2, prompt: 'Topological sort requirement?', options: [{ option_index: 0, text: 'Strongly connected' }, { option_index: 1, text: 'DAG' }] },
              { id: 'q-algo-201-3', position: 3, prompt: 'Back edge in directed graph?', options: [{ option_index: 0, text: 'Disconnected' }, { option_index: 1, text: 'Cycle' }] },
              { id: 'q-algo-201-4', position: 4, prompt: 'Kahn initial queue?', options: [{ option_index: 0, text: 'in-degree = 0' }, { option_index: 1, text: 'out-degree = 0' }] },
              { id: 'q-algo-201-5', position: 5, prompt: 'Why Dijkstra fails negative weights?', options: [{ option_index: 0, text: 'Stack overflow' }, { option_index: 1, text: 'Greedy assumption violated' }] }
            ]
          },
          is_completed: false,
          best_score: null
        })
      };
    }

    if (path === '/lessons/lesson-algo-201-l1' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 'lesson-algo-201-l1',
          course_id: 'course-algo-201',
          title: 'Graph Representations: Adjacency List vs Matrix',
          position: 1,
          content_markdown: '# Graph Representations\n\nAdjacency list uses O(V+E) memory.',
          duration_minutes: 25,
          is_completed: false
        })
      };
    }

    if (path === '/lessons/lesson-algo-201-l1/complete' && method === 'POST') {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          lesson_id: 'lesson-algo-201-l1',
          is_completed: true,
          completed_at: new Date().toISOString()
        })
      };
    }

    if (path === '/courses/course-algo-201/final-test-attempts' && method === 'POST') {
      const parsedBody = JSON.parse(opts.body);
      const answers = parsedBody.answers || {};

      // Server evaluated scoring:
      // Q1:1, Q2:1, Q3:1, Q4:0, Q5:1
      let correct = 0;
      if (answers['q-algo-201-1'] === 1) correct++;
      if (answers['q-algo-201-2'] === 1) correct++;
      if (answers['q-algo-201-3'] === 1) correct++;
      if (answers['q-algo-201-4'] === 0) correct++;
      if (answers['q-algo-201-5'] === 1) correct++;

      const pct = Math.round((correct / 5) * 100);
      const isPassed = pct >= 80;

      return {
        ok: true,
        status: 201,
        json: async () => ({
          id: 'att-12345678',
          course_id: 'course-algo-201',
          final_test_id: 'test-algo-201',
          user_id: 'usr-1',
          total_questions: 5,
          correct_count: correct,
          score_percentage: pct,
          is_passed: isPassed,
          attempted_at: new Date().toISOString(),
          breakdown: [
            { question_id: 'q-algo-201-1', position: 1, prompt: 'Dijkstra heap complexity?', is_correct: answers['q-algo-201-1'] === 1, explanation: 'O((V+E)log V)' },
            { question_id: 'q-algo-201-2', position: 2, prompt: 'Topological sort requirement?', is_correct: answers['q-algo-201-2'] === 1, explanation: 'Requires DAG' },
            { question_id: 'q-algo-201-3', position: 3, prompt: 'Back edge?', is_correct: answers['q-algo-201-3'] === 1, explanation: 'Proves cycle' },
            { question_id: 'q-algo-201-4', position: 4, prompt: 'Kahn initial queue?', is_correct: answers['q-algo-201-4'] === 0, explanation: 'in-degree=0' },
            { question_id: 'q-algo-201-5', position: 5, prompt: 'Why Dijkstra fails negative?', is_correct: answers['q-algo-201-5'] === 1, explanation: 'Greedy assumption violated' }
          ]
        })
      };
    }

    if (path === '/me/course-completions' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => [
          {
            course_id: 'course-algo-201',
            course_slug: 'course-algo-201',
            course_title: 'Advanced Graph Theory & Network Traversal',
            final_test_attempt_id: 'att-12345678',
            score_percent: 80,
            completed_at: new Date().toISOString()
          }
        ]
      };
    }

    return {
      ok: false,
      status: 404,
      json: async () => ({ detail: 'Not found' })
    };
  }
};

vm.createContext(sandbox);

// 3. Load state.js and learning.js into sandbox
const stateSource = fs.readFileSync('d:/ARISE/js/state.js', 'utf8');
vm.runInContext(stateSource + '\n;globalThis.AriseState = AriseState;', sandbox);
vm.runInContext(learningSource, sandbox);

async function runTests() {
  console.log('--- Testing Phase 5: Learning Tracks, Lesson Player & 80% Final Assessment ---');

  const AriseState = sandbox.AriseState;

  // 1. Initial State: Clean account
  assert.strictEqual(AriseState.coursesList.length, 0, 'Initially courses list is empty');
  assert.strictEqual(AriseState.quizScore, 0, 'Initially quiz score is 0');
  assert.strictEqual(AriseState.quizPassed, false, 'Initially quizPassed is false');

  // 2. Fetch courses list
  const courses = await AriseState.fetchCourses();
  assert.strictEqual(courses.length, 2, 'Should load 2 courses from API');
  assert.strictEqual(AriseState.coursesList.length, 2, 'coursesList stored in state');
  assert.strictEqual(sandbox.ARISE_DATA.courses.length, 2, 'ARISE_DATA.courses synced');
  assert.strictEqual(courses[0].completed_lessons, 0, 'Clean account has 0 completed lessons');
  assert.strictEqual(courses[0].is_completed, false, 'Clean account has is_completed = false');

  // Test Catalogue HTML rendering
  const catalogueHtml = sandbox.renderCourseCatalogue();
  assert(catalogueHtml.includes('Structured Learning Tracks'), 'Catalogue renders header');
  assert(catalogueHtml.includes('Advanced Graph Theory & Network Traversal'), 'Catalogue renders course card');
  assert(catalogueHtml.includes('Requires ≥ 80% Final Assessment'), 'Catalogue highlights 80% rule');

  // 3. Fetch Course Detail
  const detail = await AriseState.fetchCourseDetail('course-algo-201');
  assert.strictEqual(detail.id, 'course-algo-201');
  assert.strictEqual(detail.curriculum.length, 5);
  assert.strictEqual(AriseState.completedLessonIds.size, 0, 'No lessons completed yet');

  // Test Course Detail HTML rendering
  const detailHtml = sandbox.renderCourseDetail();
  assert(detailHtml.includes('Passing Requirement: ≥ 80% on Final Assessment'), 'Detail renders passing requirement');
  assert(detailHtml.includes('Graph Representations'), 'Detail renders curriculum syllabus');

  // 4. Lesson Player & Completion
  const lesson1 = await AriseState.fetchLessonDetail('lesson-algo-201-l1');
  assert.strictEqual(lesson1.id, 'lesson-algo-201-l1');
  assert(lesson1.content_markdown.includes('Graph Representations'), 'Lesson content loaded');

  const playerHtml = sandbox.renderLessonPlayer();
  assert(playerHtml.includes('Lesson 1: Graph Representations'), 'Lesson player renders active lesson');
  assert(playerHtml.includes('Mark as Completed & Continue →'), 'Lesson player renders completion CTA');

  // Mark lesson 1 completed
  const compRes = await AriseState.completeLesson('lesson-algo-201-l1');
  assert.strictEqual(compRes.is_completed, true);
  assert(AriseState.completedLessonIds.has('lesson-algo-201-l1'), 'lesson 1 in completedLessonIds set');
  assert.strictEqual(AriseState.activeCourseDetail.completed_lessons, 1, 'completed_lessons updated to 1');

  // 5. Final Assessment: Failing Attempt (60% < 80%)
  // Q1:1 (corr), Q2:1 (corr), Q3:1 (corr), Q4:1 (wrong), Q5:0 (wrong) -> 3/5 = 60%
  const failAnswers = {
    'q-algo-201-1': 1,
    'q-algo-201-2': 1,
    'q-algo-201-3': 1,
    'q-algo-201-4': 1, // wrong
    'q-algo-201-5': 0  // wrong
  };
  const failAttempt = await AriseState.submitFinalTest('course-algo-201', failAnswers);
  assert.strictEqual(failAttempt.score_percentage, 60);
  assert.strictEqual(failAttempt.is_passed, false);
  assert.strictEqual(AriseState.quizPassed, false);
  assert.strictEqual(AriseState.quizScore, 60);

  // Render Fail Results
  const failResultHtml = sandbox.renderQuizResults();
  assert(failResultHtml.includes('Course Not Yet Complete'), 'Fail screen title');
  assert(failResultHtml.includes('60%'), 'Fail screen shows 60%');
  assert(failResultHtml.includes('Retry Assessment'), 'Fail screen has Retry button');
  assert(!failResultHtml.includes('View Verified Certificate'), 'No certificate CTA on failure');

  // Retry assessment
  sandbox.retryFinalAssessment();
  assert.strictEqual(AriseState.quizSubmitted, false);
  assert.strictEqual(AriseState.quizScore, 0);

  // 6. Final Assessment: Passing Attempt (80% >= 80%)
  // Q1:1 (corr), Q2:1 (corr), Q3:1 (corr), Q4:0 (corr), Q5:0 (wrong) -> 4/5 = 80%
  const passAnswers = {
    'q-algo-201-1': 1,
    'q-algo-201-2': 1,
    'q-algo-201-3': 1,
    'q-algo-201-4': 0, // correct
    'q-algo-201-5': 0  // wrong
  };
  const passAttempt = await AriseState.submitFinalTest('course-algo-201', passAnswers);
  assert.strictEqual(passAttempt.score_percentage, 80);
  assert.strictEqual(passAttempt.is_passed, true);
  assert.strictEqual(AriseState.quizPassed, true);
  assert.strictEqual(AriseState.quizScore, 80);
  assert.strictEqual(sandbox.ARISE_DATA.currentUser.coursesCompleted, 1, 'coursesCompleted incremented to 1');

  // Render Pass Results
  const passResultHtml = sandbox.renderQuizResults();
  assert(passResultHtml.includes('Assessment Passed!'), 'Pass screen title');
  assert(passResultHtml.includes('80%'), 'Pass screen shows 80%');
  assert(passResultHtml.includes('View Verified Certificate of Completion →'), 'Pass screen has certificate button');

  // 7. Render Certificate Screen
  const certHtml = sandbox.renderCourseCompletionScreen();
  assert(certHtml.includes('Certificate of Algorithmic Mastery'), 'Certificate title');
  assert(certHtml.includes('ARISE ACADEMY'), 'Brand header');
  assert(certHtml.includes('Aditi Kulkarni'), 'Student name rendered');
  assert(certHtml.includes('UID: AR-STUDENT99 • PICT Pune'), 'UID and college rendered');
  assert(certHtml.includes('Advanced Graph Theory & Network Traversal'), 'Course title rendered');
  assert(certHtml.includes('80%'), 'Score rendered');
  assert(certHtml.includes('Cryptographic Verification Hash'), 'Verification hash rendered');

  console.log('✓ All 7 Phase 5 frontend contract test suites PASSED successfully!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
