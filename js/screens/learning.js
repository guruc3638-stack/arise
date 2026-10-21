/* ==========================================================================
   ARISE SCREENS P, Q, R, S: LEARNING MODULE
   Catalogue, Course Detail, Lesson Player, 80% Final Assessment, Certificate
   Strict Business Rule: Course is complete ONLY when final assessment >= 80%
   ========================================================================== */

function renderLearningScreen() {
  if (AriseState.currentScreen === 'course-detail') {
    return renderCourseDetail();
  } else if (AriseState.currentScreen === 'lesson-player') {
    return renderLessonPlayer();
  } else if (AriseState.currentScreen === 'final-assessment') {
    return renderFinalAssessmentQuiz();
  } else if (AriseState.currentScreen === 'course-completion') {
    return renderCourseCompletionScreen();
  }
  return renderCourseCatalogue();
}

// SCREEN P: COURSE CATALOGUE
function renderCourseCatalogue() {
  const courses = ARISE_DATA.courses;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
        <div>
          <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Structured Learning Tracks</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">
            Comprehensive computer science and algorithm curricula. Verified completion requires ≥ 80% on the final assessment.
          </p>
        </div>
      </div>

      <!-- Course Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: var(--space-6);">
        ${courses.map(c => `
          <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-5);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
                <span class="badge" style="background: rgba(139,92,246,0.15); color: #C4B5FD; border: 1px solid rgba(139,92,246,0.3);">
                  ${c.category}
                </span>
                <span class="text-small text-muted font-mono">${c.duration}</span>
              </div>

              <h3 style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; line-height: 1.4;">
                ${c.title}
              </h3>

              <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: var(--space-4);">
                ${c.skills.map(s => `<span class="topic-tag">${s}</span>`).join('')}
              </div>

              <div style="margin-bottom: var(--space-4);">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span class="text-muted">Lessons: ${c.completedLessons}/${c.lessonsCount}</span>
                  <span style="font-family: var(--font-mono); font-weight: 600; color: ${c.assessmentPassed ? 'var(--success)' : 'var(--warning)'};">
                    ${c.assessmentPassed ? `Completed (${c.assessmentScore}%)` : 'Assessment Ready'}
                  </span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill ${c.assessmentPassed ? 'progress-bar-cyan' : ''}" style="width: ${c.assessmentPassed ? '100%' : '80%'};"></div>
                </div>
              </div>
            </div>

            <div style="padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <span class="text-small ${c.assessmentPassed ? 'text-muted' : 'text-warning'}">
                ${c.assessmentPassed ? '✓ Verified Certificate Earned' : 'Requires ≥ 80% Final Assessment'}
              </span>
              <button class="btn ${c.assessmentPassed ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="openCourse('${c.id}')">
                ${c.assessmentPassed ? 'Review Course →' : 'Continue Course →'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openCourse(courseId) {
  const c = ARISE_DATA.courses.find(item => item.id === courseId);
  if (c) AriseState.activeCourse = c;
  AriseState.setScreen('course-detail');
}

// SCREEN Q: COURSE DETAIL
function renderCourseDetail() {
  const c = AriseState.activeCourse || ARISE_DATA.courses[1];

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <div style="display: flex; align-items: center; gap: 8px;">
        <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('learning-catalogue')">
          ← Course Catalogue
        </button>
      </div>

      <div class="glass-hero">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div style="max-width: 720px;">
            <span class="badge" style="background: rgba(139,92,246,0.25); color: #FFFFFF; margin-bottom: 8px;">
              ${c.category} Track
            </span>
            <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
              ${c.title}
            </h1>
            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-4);">
              Master graph theory algorithms from representation matrices to priority queue Dijkstra, cycle detection, and topological sorting.
            </p>
            <div style="display: flex; align-items: center; gap: var(--space-4); font-size: 13px; color: var(--text-muted);">
              <span>Duration: <b>${c.duration}</b></span>
              <span>Lessons: <b>${c.lessonsCount} Total</b></span>
              <span style="color: var(--warning); font-weight: 600;">Passing Requirement: ≥ 80%</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <button class="btn btn-primary" onclick="AriseState.setScreen('final-assessment')">
              Take Final Assessment (≥ 80%) →
            </button>
            <button class="btn btn-secondary" onclick="AriseState.setScreen('lesson-player')">
              Open Lesson Player
            </button>
          </div>
        </div>
      </div>

      <!-- Syllabus with Per-Lesson status -->
      <div class="surface-opaque" style="padding: var(--space-6);">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: var(--space-4);">Curriculum Syllabus</h3>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${c.curriculum.map((les, idx) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); cursor: pointer;"
              onclick="AriseState.setScreen('lesson-player')">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--success-bg); border: 1px solid var(--success-border); display: flex; align-items: center; justify-content: center; color: var(--success); font-size: 12px;">
                  ✓
                </div>
                <div>
                  <span style="font-size: 13.5px; font-weight: 600; color: var(--text-primary);">${idx + 1}. ${les.title}</span>
                </div>
              </div>
              <span class="text-small text-muted">Completed</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// SCREEN Q (CONT): LESSON PLAYER
function renderLessonPlayer() {
  const c = AriseState.activeCourse || ARISE_DATA.courses[1];

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <div style="display: flex; justify-content: space-between; align-items: center; background: #0E1424; padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
        <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('course-detail')">
          ← Course Detail
        </button>
        <span style="font-weight: 600; color: var(--text-primary); font-size: 14px;">Lesson 2: BFS Level-Order Discovery & Shortest Unweighted Paths</span>
        <button class="btn btn-primary btn-sm" onclick="AriseState.setScreen('final-assessment')">
          Go to Final Assessment →
        </button>
      </div>

      <div style="display: flex; gap: var(--space-6); min-height: 600px;">
        <div style="flex: 1; background: var(--surface-elevated); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-8); overflow-y: auto;">
          <h1 style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px;">
            Breadth-First Search (BFS) Theory and Invariants
          </h1>
          <p style="font-size: 14px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 20px;">
            Breadth-First Search systematically explores the edges of $G$ to "discover" every vertex that is reachable from $s$. It computes the distance (smallest number of edges) from $s$ to each reachable vertex and produces a "breadth-first tree" with root $s$.
          </p>
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: #E2E8F0;">
            void bfs(int startNode, const vector&lt;vector&lt;int&gt;&gt;&amp; adj) {<br>
            &nbsp;&nbsp;vector&lt;bool&gt; visited(adj.size(), false);<br>
            &nbsp;&nbsp;queue&lt;int&gt; q;<br>
            &nbsp;&nbsp;visited[startNode] = true;<br>
            &nbsp;&nbsp;q.push(startNode);<br>
            &nbsp;&nbsp;while (!q.empty()) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;int u = q.front(); q.pop();<br>
            &nbsp;&nbsp;&nbsp;&nbsp;for (int v : adj[u]) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!visited[v]) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited[v] = true;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q.push(v);<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;}<br>
            }
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
            <button class="btn btn-secondary btn-sm" onclick="showToast('Previous lesson', 'info')">← Previous Lesson</button>
            <button class="btn btn-primary btn-sm" onclick="showToast('Lesson marked complete!', 'success')">Mark Complete & Next →</button>
          </div>
        </div>

        <!-- Lesson Sidebar -->
        <div style="width: 300px; background: #0E1424; border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="font-weight: 700; font-size: 13px; color: var(--text-primary); margin-bottom: 6px;">Lessons (5)</div>
          ${c.curriculum.map((les, idx) => `
            <div style="padding: 8px 10px; border-radius: var(--radius-sm); background: ${idx === 1 ? 'rgba(139,92,246,0.15)' : 'transparent'}; font-size: 12px; color: ${idx === 1 ? '#FFFFFF' : 'var(--text-secondary)'}; cursor: pointer;">
              ${idx + 1}. ${les.title}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// SCREEN R: INTERACTIVE FINAL ASSESSMENT (5 Questions, Strict 80% passing rule)
function renderFinalAssessmentQuiz() {
  const quiz = ARISE_DATA.finalAssessmentQuiz;
  const answeredCount = Object.keys(AriseState.quizAnswers).length;

  if (AriseState.quizSubmitted) {
    return renderQuizResults();
  }

  return `
    <div class="assessment-quiz-wrapper">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-4);">
        <div>
          <span class="badge" style="background: rgba(251,191,36,0.12); color: var(--warning); border: 1px solid rgba(251,191,36,0.3); margin-bottom: 4px;">
            Final Comprehensive Assessment
          </span>
          <h2 style="font-size: 22px; font-weight: 800; color: #FFFFFF;">
            Advanced Graph Theory Certification Exam
          </h2>
          <p class="text-small text-muted">
            <b>Pass Cutoff: 80% (4 out of 5 required)</b>. A score of 79% or lower remains incomplete.
          </p>
        </div>

        <div style="text-align: right;">
          <div class="font-mono" style="font-size: 14px; font-weight: 700; color: var(--accent-cyan);">
            ${answeredCount} / ${quiz.length} Answered
          </div>
        </div>
      </div>

      <!-- Question List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        ${quiz.map((q, qIdx) => `
          <div class="glass-card" style="padding: var(--space-6);">
            <div style="font-size: 12px; font-weight: 700; color: #A78BFA; text-transform: uppercase; margin-bottom: 8px;">
              Question ${qIdx + 1} of ${quiz.length}
            </div>
            <h3 style="font-size: 15.5px; font-weight: 600; color: #FFFFFF; line-height: 1.5; margin-bottom: var(--space-4);">
              ${q.question}
            </h3>

            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${q.options.map((opt, optIdx) => {
                const isSelected = AriseState.quizAnswers[q.id] === optIdx;
                return `
                  <div class="quiz-option ${isSelected ? 'selected' : ''}" 
                    onclick="selectQuizOption(${q.id}, ${optIdx})">
                    <div style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}; display: flex; align-items: center; justify-content: center;">
                      ${isSelected ? '<div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary);"></div>' : ''}
                    </div>
                    <span style="font-size: 13.5px; color: ${isSelected ? '#FFFFFF' : 'var(--text-secondary)'};">${opt}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Submit Action Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) 0; border-top: 1px solid var(--border-default);">
        <button class="btn btn-ghost" onclick="AriseState.setScreen('course-detail')">
          Cancel & Exit
        </button>
        <button class="btn btn-primary btn-lg" onclick="submitFinalAssessment()">
          Submit Assessment for Evaluation →
        </button>
      </div>
    </div>
  `;
}

function selectQuizOption(qId, optIdx) {
  AriseState.quizAnswers[qId] = optIdx;
  AriseState.notify();
}

function submitFinalAssessment() {
  const quiz = ARISE_DATA.finalAssessmentQuiz;
  let correctCount = 0;

  quiz.forEach(q => {
    if (AriseState.quizAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quiz.length) * 100);
  AriseState.quizScore = percentage;
  AriseState.quizSubmitted = true;
  AriseState.notify();
}

function renderQuizResults() {
  const score = AriseState.quizScore;
  const passed = score >= 80;

  return `
    <div class="assessment-quiz-wrapper" style="text-align: center; padding: 40px 0;">
      <div class="glass-card" style="padding: 48px 32px; display: flex; flex-direction: column; align-items: center; gap: var(--space-4);">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: ${passed ? 'var(--success-bg)' : 'var(--error-bg)'}; border: 2px solid ${passed ? 'var(--success)' : 'var(--error)'}; display: flex; align-items: center; justify-content: center; font-size: 28px; color: ${passed ? 'var(--success)' : 'var(--error)'};">
          ${passed ? '✓' : '✕'}
        </div>

        <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF;">
          ${passed ? 'Assessment Passed!' : 'Course Not Yet Complete'}
        </h1>

        <div class="font-mono tabular-nums" style="font-size: 48px; font-weight: 800; color: ${passed ? 'var(--success)' : 'var(--error)'};">
          ${score}%
        </div>

        <p style="font-size: 14.5px; color: var(--text-secondary); max-width: 500px; line-height: 1.6;">
          ${passed 
            ? 'Congratulations! You achieved the required score of 80% or higher. Your official course completion certificate has been minted.'
            : 'You scored below the mandatory 80% completion cutoff (Score: ' + score + '%). ARISE standards require comprehensive mastery. Please review the curriculum notes and retry.'}
        </p>

        <div style="display: flex; gap: var(--space-4); margin-top: var(--space-3);">
          ${passed ? `
            <button class="btn btn-primary btn-lg" onclick="AriseState.setScreen('course-completion')">
              View Verified Certificate of Completion →
            </button>
          ` : `
            <button class="btn btn-primary" onclick="retryFinalAssessment()">
              Retry Assessment
            </button>
            <button class="btn btn-secondary" onclick="AriseState.setScreen('course-detail')">
              Review Lesson Materials
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function retryFinalAssessment() {
  AriseState.quizAnswers = {};
  AriseState.quizSubmitted = false;
  AriseState.quizScore = 0;
  AriseState.notify();
}

// SCREEN S: COURSE COMPLETION CERTIFICATE
function renderCourseCompletionScreen() {
  const user = ARISE_DATA.currentUser;
  const course = ARISE_DATA.courses[1];

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6); align-items: center;">
      <div style="display: flex; justify-content: space-between; width: 100%; max-width: 800px;">
        <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('learning-catalogue')">
          ← Back to Catalogue
        </button>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Certificate PDF downloaded', 'success')">
          Download PDF Certificate
        </button>
      </div>

      <!-- Official ARISE Verified Certificate of Completion -->
      <div class="certificate-card" style="width: 100%;">
        <div style="display: flex; justify-content: center; margin-bottom: 16px;">
          <div class="brand-icon-mark" style="width: 48px; height: 48px; font-size: 20px;">▲</div>
        </div>

        <div style="font-size: 11px; letter-spacing: 0.15em; font-weight: 700; text-transform: uppercase; color: #FBBF24; margin-bottom: 8px;">
          Certificate of Algorithmic Mastery
        </div>

        <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin-bottom: 24px;">
          ARISE ACADEMY
        </h1>

        <p style="font-size: 14px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
          This is to verify that
        </p>

        <div style="font-size: 30px; font-weight: 800; color: #F5F7FF; font-family: 'Inter', sans-serif; margin-bottom: 8px;">
          ${user.displayName}
        </div>
        <div class="font-mono text-muted" style="font-size: 13px; margin-bottom: 24px;">
          UID: ${user.uid} • ${user.college}
        </div>

        <p style="font-size: 14px; color: var(--text-secondary); max-width: 580px; margin: 0 auto 28px; line-height: 1.6;">
          Has successfully fulfilled all curriculum requirements and achieved an assessment score of <b>${AriseState.quizScore || 90}%</b> (threshold ≥ 80%) in:
        </p>

        <h2 style="font-size: 22px; font-weight: 700; color: #C4B5FD; margin-bottom: 32px;">
          ${course.title}
        </h2>

        <div style="display: flex; justify-content: space-around; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 12px; color: var(--text-muted); font-family: var(--font-mono);">
          <div>
            <div>Date of Verification</div>
            <div style="color: var(--text-primary); font-weight: 600; margin-top: 4px;">October 21, 2026</div>
          </div>
          <div>
            <div>Cryptographic Verification Hash</div>
            <div style="color: var(--accent-cyan); margin-top: 4px;">0x8F3A...7B29</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
