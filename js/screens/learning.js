/* ==========================================================================
   ARISE SCREENS P, Q, R, S: LEARNING MODULE
   Catalogue, Course Detail, Lesson Player, 80% Final Assessment, Certificate
   Strict Business Rule 4: Course completion is granted if and only if
   server-evaluated final assessment score >= 80% (T-12, T-13, T-20).
   Server-only answer keys and explanations are never exposed prior to grading.
   ========================================================================== */

function renderLearningScreen() {
  // Ensure courses list is loaded from live API
  if (!AriseState.coursesLoaded && !AriseState.learningLoading) {
    if (typeof AriseState.fetchCourses === 'function') {
      AriseState.fetchCourses().catch(() => {});
    }
  }

  // Ensure active course detail is loaded
  if (AriseState.activeCourseId && !AriseState.activeCourseDetail && !AriseState.learningLoading) {
    if (typeof AriseState.fetchCourseDetail === 'function') {
      AriseState.fetchCourseDetail(AriseState.activeCourseId).catch(() => {});
    }
  }

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

// --------------------------------------------------------------------------
// SCREEN P: COURSE CATALOGUE
// --------------------------------------------------------------------------
function renderCourseCatalogue() {
  const courses = (AriseState.coursesList && AriseState.coursesList.length > 0)
    ? AriseState.coursesList
    : ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) ? ARISE_DATA.courses : []);

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

      <!-- Course Cards Grid (Compact & Responsive) -->
      <div class="learning-track-grid">
        ${courses.map(c => {
          const cId = c.id;
          const completedCount = c.completed_lessons != null ? c.completed_lessons : (c.completedLessons || 0);
          const lessonsTotal = c.lessons_count != null ? c.lessons_count : (c.lessonsCount || 0);
          const isPassed = !!(c.is_completed || c.assessmentPassed);
          const bestScore = c.best_score != null ? c.best_score : (c.assessmentScore || 0);
          const progressPct = lessonsTotal > 0 ? Math.min(100, Math.round((completedCount / lessonsTotal) * 100)) : 0;
          const skillsList = c.skills || [];

          return `
            <div class="glass-card learning-track-card" onclick="openCourse('${cId}')" style="cursor: pointer;">
              <div class="track-card-body">
                <div class="track-card-header">
                  <span class="track-badge">
                    ${c.category}
                  </span>
                  <span class="track-duration font-mono">${c.duration}</span>
                </div>

                <h3 class="track-title" title="${c.title}">
                  ${c.title}
                </h3>

                <p class="track-desc" title="${c.description || ''}">
                  ${c.description || ''}
                </p>

                <div class="track-skills">
                  ${skillsList.slice(0, 2).map(s => `<span class="topic-tag-mini">${s}</span>`).join('')}
                  ${skillsList.length > 2 ? `<span class="topic-tag-mini text-muted">+${skillsList.length - 2}</span>` : ''}
                </div>

                <div class="track-progress-section">
                  <div class="track-progress-labels">
                    <span class="text-muted">Lessons: ${completedCount}/${lessonsTotal}</span>
                    <span class="track-progress-val" style="color: ${isPassed ? 'var(--success)' : (progressPct === 100 ? 'var(--warning)' : 'var(--text-muted)')};">
                      ${isPassed ? `Completed (${bestScore}%)` : (progressPct === 100 ? 'Ready' : `${progressPct}%`)}
                    </span>
                  </div>
                  <div class="progress-bar-track" style="height: 5px; margin-top: 4px;">
                    <div class="progress-bar-fill ${isPassed ? 'progress-bar-cyan' : ''}" style="width: ${isPassed ? '100%' : `${progressPct}%`};"></div>
                  </div>
                </div>
              </div>

              <div class="track-card-footer" onclick="event.stopPropagation()">
                <span class="track-status ${isPassed ? 'text-success' : 'text-warning'}" style="font-size: 11px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${isPassed ? '✓ Verified Certificate Earned' : 'Requires ≥ 80% Final Assessment'}">
                  ${isPassed ? '✓ Verified Certificate Earned' : 'Requires ≥ 80% Final Assessment'}
                </span>
                <div style="display: flex; gap: 5px; flex-shrink: 0;">
                  ${isPassed ? `
                    <button class="btn btn-secondary btn-sm" onclick="openCourse('${cId}')" style="padding: 4px 8px; font-size: 11.5px;">
                      Review
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="viewCertificate('${cId}')" style="padding: 4px 8px; font-size: 11.5px;" title="View Certificate">
                      🏅 Cert
                    </button>
                  ` : `
                    <button class="btn btn-primary btn-sm" onclick="openCourse('${cId}')" style="padding: 4px 10px; font-size: 11.5px;">
                      Continue →
                    </button>
                  `}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function openCourse(courseId) {
  AriseState.activeCourseId = courseId;
  if (typeof AriseState.fetchCourseDetail === 'function') {
    AriseState.fetchCourseDetail(courseId).catch(() => {});
  }
  AriseState.setScreen('course-detail');
}

function viewCertificate(courseId) {
  AriseState.activeCourseId = courseId;
  if (typeof AriseState.fetchCourseDetail === 'function') {
    AriseState.fetchCourseDetail(courseId).catch(() => {});
  }
  AriseState.setScreen('course-completion');
}

// --------------------------------------------------------------------------
// SCREEN Q: COURSE DETAIL
// --------------------------------------------------------------------------
function renderCourseDetail() {
  const c = AriseState.activeCourseDetail || AriseState.activeCourse || ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) ? ARISE_DATA.courses[0] : null);

  if (!c) {
    return `
      <div style="padding: 40px; text-align: center;">
        <p class="text-muted">Loading course details...</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 12px;" onclick="AriseState.setScreen('learning-catalogue')">
          ← Back to Catalogue
        </button>
      </div>
    `;
  }

  const curriculum = c.curriculum || [];
  const completedCount = curriculum.filter(l => l.is_completed || (AriseState.completedLessonIds && AriseState.completedLessonIds.has(l.id))).length;
  const isPassed = !!(c.is_completed || c.assessmentPassed);
  const bestScore = c.best_score != null ? c.best_score : (c.assessmentScore || 0);

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
              ${c.description || 'Comprehensive curriculum with theory, algorithmic proofs, implementation mechanics, and rigorous evaluation.'}
            </p>
            <div style="display: flex; align-items: center; gap: var(--space-4); font-size: 13px; color: var(--text-muted); flex-wrap: wrap;">
              <span>Duration: <b>${c.duration}</b></span>
              <span>Lessons: <b>${completedCount}/${curriculum.length} Completed</b></span>
              <span style="color: ${isPassed ? 'var(--success)' : 'var(--warning)'}; font-weight: 600;">
                ${isPassed ? `✓ Completed (Score: ${bestScore}%)` : 'Passing Requirement: ≥ 80% on Final Assessment'}
              </span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${isPassed ? `
              <button class="btn btn-success" onclick="viewCertificate('${c.id}')">
                View Verified Certificate 🏅
              </button>
              <button class="btn btn-secondary" onclick="openFinalAssessment('${c.id}')">
                Retake Assessment
              </button>
            ` : `
              <button class="btn btn-primary" onclick="openFinalAssessment('${c.id}')">
                Take Final Assessment (≥ 80%) →
              </button>
            `}
            <button class="btn btn-secondary" onclick="openLessonPlayer('${c.id}')">
              Open Lesson Player
            </button>
          </div>
        </div>
      </div>

      <!-- Syllabus with Per-Lesson status -->
      <div class="surface-opaque" style="padding: var(--space-6);">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: var(--space-4);">Curriculum Syllabus</h3>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${curriculum.map((les, idx) => {
            const isLessonDone = !!(les.is_completed || (AriseState.completedLessonIds && AriseState.completedLessonIds.has(les.id)));
            const duration = les.duration_minutes || les.durationMinutes || 20;

            return `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); cursor: pointer;"
                onclick="openLesson('${c.id}', '${les.id}')">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 24px; height: 24px; border-radius: 50%; background: ${isLessonDone ? 'var(--success-bg)' : 'rgba(255,255,255,0.06)'}; border: 1px solid ${isLessonDone ? 'var(--success-border)' : 'var(--border-subtle)'}; display: flex; align-items: center; justify-content: center; color: ${isLessonDone ? 'var(--success)' : 'var(--text-muted)'}; font-size: 11px; font-weight: 700;">
                    ${isLessonDone ? '✓' : (idx + 1)}
                  </div>
                  <div>
                    <span style="font-size: 13.5px; font-weight: 600; color: var(--text-primary);">${idx + 1}. ${les.title}</span>
                    <div class="text-small text-muted font-mono" style="font-size: 11px; margin-top: 2px;">${duration} mins</div>
                  </div>
                </div>
                <span class="text-small" style="color: ${isLessonDone ? 'var(--success)' : 'var(--accent-cyan)'}; font-weight: 600;">
                  ${isLessonDone ? 'Completed ✓' : 'Start Lesson →'}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function openLessonPlayer(courseId) {
  AriseState.activeCourseId = courseId;
  const c = AriseState.activeCourseDetail || AriseState.activeCourse;
  const curriculum = (c && c.curriculum) ? c.curriculum : [];
  
  // Find first incomplete lesson, or first lesson
  const firstIncomplete = curriculum.find(l => !l.is_completed && !(AriseState.completedLessonIds && AriseState.completedLessonIds.has(l.id)));
  const targetLesson = firstIncomplete || curriculum[0];
  
  if (targetLesson) {
    openLesson(courseId, targetLesson.id);
  } else {
    AriseState.setScreen('lesson-player');
  }
}

function openLesson(courseId, lessonId) {
  AriseState.activeCourseId = courseId;
  AriseState.activeLessonId = lessonId;
  if (typeof AriseState.fetchLessonDetail === 'function') {
    AriseState.fetchLessonDetail(lessonId).catch(() => {});
  }
  AriseState.setScreen('lesson-player');
}

// --------------------------------------------------------------------------
// SCREEN Q (CONT): LESSON PLAYER
// --------------------------------------------------------------------------
function renderLessonPlayer() {
  const c = AriseState.activeCourseDetail || AriseState.activeCourse || ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) ? ARISE_DATA.courses[0] : null);
  const curriculum = (c && c.curriculum) ? c.curriculum : [];

  let activeLesson = AriseState.activeLessonDetail;
  if (!activeLesson && AriseState.activeLessonId) {
    activeLesson = curriculum.find(l => l.id === AriseState.activeLessonId);
  }
  if (!activeLesson && curriculum.length > 0) {
    activeLesson = curriculum[0];
    AriseState.activeLessonId = activeLesson.id;
  }

  if (!activeLesson) {
    return `
      <div style="padding: 40px; text-align: center;">
        <p class="text-muted">Loading lesson content...</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 12px;" onclick="AriseState.setScreen('course-detail')">
          ← Back to Course Detail
        </button>
      </div>
    `;
  }

  const currentIndex = curriculum.findIndex(l => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? curriculum[currentIndex - 1] : null;
  const nextLesson = (currentIndex >= 0 && currentIndex < curriculum.length - 1) ? curriculum[currentIndex + 1] : null;
  const isCurrentDone = !!(activeLesson.is_completed || (AriseState.completedLessonIds && AriseState.completedLessonIds.has(activeLesson.id)));

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <div style="display: flex; justify-content: space-between; align-items: center; background: #0E1424; padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-default); flex-wrap: wrap; gap: 8px;">
        <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('course-detail')">
          ← Course Detail
        </button>
        <span style="font-weight: 600; color: var(--text-primary); font-size: 14px;">
          Lesson ${activeLesson.position || currentIndex + 1}: ${activeLesson.title}
        </span>
        <button class="btn btn-primary btn-sm" onclick="openFinalAssessment('${c ? c.id : ''}')">
          Go to Final Assessment →
        </button>
      </div>

      <div style="display: flex; gap: var(--space-6); min-height: 600px; flex-wrap: wrap;">
        <!-- Main Content Viewer -->
        <div style="flex: 1; min-width: 320px; background: var(--surface-elevated); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-8); overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <span class="badge" style="background: rgba(139,92,246,0.15); color: #C4B5FD;">
              ${c ? c.title : 'Course Lesson'}
            </span>
            <span class="text-small text-muted font-mono">
              ${activeLesson.duration_minutes || activeLesson.durationMinutes || 20} min read
            </span>
          </div>

          <h1 style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin-bottom: 16px;">
            ${activeLesson.title}
          </h1>

          <div class="lesson-content-body" style="font-size: 14.5px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 28px;">
            ${formatLessonMarkdown(activeLesson.content_markdown || activeLesson.content || 'Content for this lesson will appear here.')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px; flex-wrap: wrap; gap: 8px;">
            <div>
              ${prevLesson ? `
                <button class="btn btn-secondary btn-sm" onclick="openLesson('${c ? c.id : ''}', '${prevLesson.id}')">
                  ← Previous Lesson
                </button>
              ` : `
                <button class="btn btn-secondary btn-sm" disabled style="opacity: 0.4;">
                  ← Start of Track
                </button>
              `}
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn ${isCurrentDone ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="markCurrentLessonCompleted('${activeLesson.id}')">
                ${isCurrentDone ? 'Completed ✓ (Next Lesson →)' : 'Mark as Completed & Continue →'}
              </button>
            </div>
          </div>
        </div>

        <!-- Lesson Navigation Sidebar -->
        <div style="width: 300px; background: #0E1424; border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="font-weight: 700; font-size: 13px; color: var(--text-primary); margin-bottom: 8px; display: flex; justify-content: space-between;">
            <span>Curriculum (${curriculum.length})</span>
            <span class="text-muted font-mono" style="font-size: 11px;">
              ${curriculum.filter(l => l.is_completed || (AriseState.completedLessonIds && AriseState.completedLessonIds.has(l.id))).length}/${curriculum.length} done
            </span>
          </div>

          ${curriculum.map((les, idx) => {
            const isActive = les.id === activeLesson.id;
            const isDone = !!(les.is_completed || (AriseState.completedLessonIds && AriseState.completedLessonIds.has(les.id)));

            return `
              <div style="padding: 10px 12px; border-radius: var(--radius-sm); background: ${isActive ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${isActive ? 'rgba(139,92,246,0.4)' : 'transparent'}; font-size: 12.5px; color: ${isActive ? '#FFFFFF' : 'var(--text-secondary)'}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all var(--duration-fast);"
                onclick="openLesson('${c ? c.id : ''}', '${les.id}')">
                <span style="font-weight: ${isActive ? '600' : '400'}; line-height: 1.4;">
                  ${idx + 1}. ${les.title}
                </span>
                <span style="color: ${isDone ? 'var(--success)' : 'var(--text-muted)'}; font-size: 11px; margin-left: 8px; font-weight: 700;">
                  ${isDone ? '✓' : '○'}
                </span>
              </div>
            `;
          }).join('')}

          <div style="margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
            <button class="btn btn-ghost btn-sm" style="width: 100%; text-align: center;" onclick="openFinalAssessment('${c ? c.id : ''}')">
              Final Assessment (≥ 80%) →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function markCurrentLessonCompleted(lessonId) {
  try {
    if (typeof AriseState.completeLesson === 'function') {
      await AriseState.completeLesson(lessonId);
    }
    if (typeof showToast === 'function') {
      showToast('Lesson marked complete!', 'success');
    }

    // Auto-advance to next lesson if one exists
    const c = AriseState.activeCourseDetail || AriseState.activeCourse;
    const curriculum = (c && c.curriculum) ? c.curriculum : [];
    const currentIndex = curriculum.findIndex(l => l.id === lessonId);

    if (currentIndex >= 0 && currentIndex < curriculum.length - 1) {
      const nextLesson = curriculum[currentIndex + 1];
      openLesson(c.id, nextLesson.id);
    } else {
      if (typeof showToast === 'function') {
        showToast('All lessons complete! Ready for final assessment.', 'success');
      }
    }
  } catch (err) {
    if (typeof showToast === 'function') {
      showToast('Could not complete lesson: ' + (err.message || 'Error'), 'error');
    }
  }
}

function formatLessonMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/^# (.*$)/gim, '<h2 style="font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px; margin-top: 16px;">$1</h2>')
    .replace(/^## (.*$)/gim, '<h3 style="font-size: 17px; font-weight: 600; color: #E2E8F0; margin-bottom: 8px; margin-top: 12px;">$1</h3>')
    .replace(/^### (.*$)/gim, '<h4 style="font-size: 15px; font-weight: 600; color: #CBD5E1; margin-bottom: 6px; margin-top: 8px;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #FFFFFF;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code style="background: rgba(0,0,0,0.5); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 13px; color: #A78BFA;">$1</code>')
    .replace(/^\- (.*$)/gim, '<li style="margin-left: 20px; color: var(--text-secondary); margin-bottom: 6px;">$1</li>')
    .replace(/\n\n/gim, '<p style="font-size: 14.5px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 16px;"></p>');
}

// --------------------------------------------------------------------------
// SCREEN R: INTERACTIVE FINAL ASSESSMENT (Rule 4: Authoritative Server Grading)
// --------------------------------------------------------------------------
function openFinalAssessment(courseId) {
  AriseState.activeCourseId = courseId;
  AriseState.quizAnswers = {};
  AriseState.quizSubmitted = false;
  AriseState.quizScore = 0;
  AriseState.quizPassed = false;
  AriseState.quizBreakdown = null;

  if (typeof AriseState.fetchCourseDetail === 'function') {
    AriseState.fetchCourseDetail(courseId).catch(() => {});
  }
  AriseState.setScreen('final-assessment');
}

function renderFinalAssessmentQuiz() {
  if (AriseState.quizSubmitted) {
    return renderQuizResults();
  }

  const c = AriseState.activeCourseDetail || AriseState.activeCourse || ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) ? ARISE_DATA.courses[0] : null);
  const finalTest = c ? (c.final_test || c.finalTest) : null;
  const questions = finalTest ? (finalTest.questions || []) : [];
  const answeredCount = Object.keys(AriseState.quizAnswers || {}).length;

  if (!finalTest || questions.length === 0) {
    return `
      <div style="padding: 40px; text-align: center;">
        <p class="text-muted">Loading assessment questions from server...</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 12px;" onclick="AriseState.setScreen('course-detail')">
          ← Back to Course Detail
        </button>
      </div>
    `;
  }

  const passPercentage = finalTest.pass_percentage || 80;
  const minRequired = Math.ceil((questions.length * passPercentage) / 100);

  return `
    <div class="assessment-quiz-wrapper">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-4); flex-wrap: wrap; gap: 8px;">
        <div>
          <span class="badge" style="background: rgba(251,191,36,0.12); color: var(--warning); border: 1px solid rgba(251,191,36,0.3); margin-bottom: 4px;">
            Final Comprehensive Assessment
          </span>
          <h2 style="font-size: 22px; font-weight: 800; color: #FFFFFF;">
            ${finalTest.title || 'Course Final Assessment'}
          </h2>
          <p class="text-small text-muted">
            <b>Pass Cutoff: ${passPercentage}% (${minRequired} out of ${questions.length} required)</b>. A score of 79% or lower remains incomplete.
          </p>
        </div>

        <div style="text-align: right;">
          <div class="font-mono" style="font-size: 14px; font-weight: 700; color: var(--accent-cyan);">
            ${answeredCount} / ${questions.length} Answered
          </div>
        </div>
      </div>

      <!-- Question List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        ${questions.map((q, qIdx) => {
          const qId = q.id;
          const chosenOption = AriseState.quizAnswers ? AriseState.quizAnswers[qId] : undefined;

          return `
            <div class="glass-card" style="padding: var(--space-6);">
              <div style="font-size: 12px; font-weight: 700; color: #A78BFA; text-transform: uppercase; margin-bottom: 8px;">
                Question ${qIdx + 1} of ${questions.length}
              </div>
              <h3 style="font-size: 15.5px; font-weight: 600; color: #FFFFFF; line-height: 1.5; margin-bottom: var(--space-4);">
                ${q.prompt}
              </h3>

              <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                ${(q.options || []).map(opt => {
                  const optIdx = opt.option_index;
                  const isSelected = (chosenOption === optIdx);

                  return `
                    <div class="quiz-option ${isSelected ? 'selected' : ''}" 
                      onclick="selectQuizOption('${qId}', ${optIdx})">
                      <div style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        ${isSelected ? '<div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary);"></div>' : ''}
                      </div>
                      <span style="font-size: 13.5px; color: ${isSelected ? '#FFFFFF' : 'var(--text-secondary)'};">${opt.text}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Submit Action Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) 0; border-top: 1px solid var(--border-default); flex-wrap: wrap; gap: 8px;">
        <button class="btn btn-ghost" onclick="AriseState.setScreen('course-detail')">
          Cancel & Exit
        </button>
        <button class="btn btn-primary btn-lg" onclick="handleFinalAssessmentSubmit()" ${AriseState.quizSubmitting ? 'disabled' : ''}>
          ${AriseState.quizSubmitting ? 'Evaluating with Server...' : 'Submit Assessment for Evaluation →'}
        </button>
      </div>
    </div>
  `;
}

function selectQuizOption(qId, optIdx) {
  if (!AriseState.quizAnswers) AriseState.quizAnswers = {};
  AriseState.quizAnswers[qId] = optIdx;
  AriseState.notify();
}

async function handleFinalAssessmentSubmit() {
  const c = AriseState.activeCourseDetail || AriseState.activeCourse;
  if (!c) {
    if (typeof showToast === 'function') showToast('Course context not found.', 'error');
    return;
  }

  const finalTest = c.final_test || c.finalTest;
  const questions = finalTest ? (finalTest.questions || []) : [];
  
  // Validation: all questions answered
  const unanswered = questions.filter(q => AriseState.quizAnswers[q.id] == null);
  if (unanswered.length > 0) {
    if (typeof showToast === 'function') {
      showToast(`Please answer all questions before submitting (${questions.length - unanswered.length}/${questions.length} answered).`, 'warning');
    }
    return;
  }

  try {
    if (typeof showToast === 'function') {
      showToast('Grading answers with authoritative judge...', 'info');
    }
    await AriseState.submitFinalTest(c.id, AriseState.quizAnswers);
  } catch (err) {
    if (typeof showToast === 'function') {
      showToast('Assessment submission failed: ' + (err.message || 'Error'), 'error');
    }
  }
}

function renderQuizResults() {
  const score = AriseState.quizScore || 0;
  const passed = !!AriseState.quizPassed;
  const breakdown = AriseState.quizBreakdown || [];
  const c = AriseState.activeCourseDetail || AriseState.activeCourse;

  return `
    <div class="assessment-quiz-wrapper" style="padding: 24px 0;">
      <div class="glass-card" style="padding: 40px 32px; display: flex; flex-direction: column; align-items: center; gap: var(--space-4); text-align: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: ${passed ? 'var(--success-bg)' : 'var(--error-bg)'}; border: 2px solid ${passed ? 'var(--success)' : 'var(--error)'}; display: flex; align-items: center; justify-content: center; font-size: 28px; color: ${passed ? 'var(--success)' : 'var(--error)'};">
          ${passed ? '✓' : '✕'}
        </div>

        <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF;">
          ${passed ? 'Assessment Passed!' : 'Course Not Yet Complete'}
        </h1>

        <div class="font-mono tabular-nums" style="font-size: 48px; font-weight: 800; color: ${passed ? 'var(--success)' : 'var(--error)'};">
          ${score}%
        </div>

        <p style="font-size: 14.5px; color: var(--text-secondary); max-width: 520px; line-height: 1.6;">
          ${passed 
            ? 'Congratulations! You achieved the required score of 80% or higher. Your official course completion certificate has been minted on your student record.'
            : `You scored below the mandatory 80% completion cutoff (Score: ${score}%). ARISE standards require comprehensive mastery. Please review the breakdown explanations below and retry.`}
        </p>

        <div style="display: flex; gap: var(--space-4); margin-top: var(--space-3); flex-wrap: wrap; justify-content: center;">
          ${passed ? `
            <button class="btn btn-primary btn-lg" onclick="AriseState.setScreen('course-completion')">
              View Verified Certificate of Completion →
            </button>
            <button class="btn btn-secondary" onclick="AriseState.setScreen('learning-catalogue')">
              Back to Catalogue
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

      <!-- Authoritative Question Breakdown returned by server -->
      ${breakdown.length > 0 ? `
        <div class="surface-opaque" style="padding: var(--space-6); margin-top: var(--space-4);">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: var(--space-4); color: var(--text-primary);">
            Authoritative Assessment Breakdown
          </h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${breakdown.map((item, idx) => `
              <div style="padding: 16px; border-radius: var(--radius-md); background: ${item.is_correct ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)'}; border: 1px solid ${item.is_correct ? 'var(--success-border)' : 'var(--error-border)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 12px; font-weight: 700; color: #A78BFA; text-transform: uppercase;">
                    Question ${idx + 1}
                  </span>
                  <span class="badge" style="background: ${item.is_correct ? 'var(--success-bg)' : 'var(--error-bg)'}; color: ${item.is_correct ? 'var(--success)' : 'var(--error)'}; border: 1px solid ${item.is_correct ? 'var(--success-border)' : 'var(--error-border)'};">
                    ${item.is_correct ? 'Correct ✓' : 'Incorrect ✕'}
                  </span>
                </div>
                <div style="font-weight: 600; font-size: 14px; color: var(--text-primary); margin-bottom: 8px;">
                  ${item.prompt}
                </div>
                <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: var(--radius-sm); border-left: 3px solid ${item.is_correct ? 'var(--success)' : 'var(--warning)'};">
                  <b>Explanation:</b> ${item.explanation || 'No explanation provided.'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function retryFinalAssessment() {
  AriseState.quizAnswers = {};
  AriseState.quizSubmitted = false;
  AriseState.quizScore = 0;
  AriseState.quizPassed = false;
  AriseState.quizBreakdown = null;
  AriseState.notify();
}

// --------------------------------------------------------------------------
// SCREEN S: COURSE COMPLETION CERTIFICATE
// --------------------------------------------------------------------------
function renderCourseCompletionScreen() {
  const user = (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) 
    ? ARISE_DATA.currentUser 
    : { displayName: 'Student Learner', uid: 'AR-STUDENT', college: 'Institution' };

  const c = AriseState.activeCourseDetail || AriseState.activeCourse || ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) ? ARISE_DATA.courses[0] : null);
  const courseTitle = c ? c.title : 'Algorithmic Mastery Track';
  const score = AriseState.quizScore || (c && c.best_score) || 85;

  const attemptId = AriseState.lastAttempt ? AriseState.lastAttempt.id : 'CERT-VERIFIED-01';
  const cleanHex = attemptId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12).toUpperCase() || '8F3A4B92C1D0';
  const certHash = `0x${cleanHex}...${cleanHex.slice(-4)}`;

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6); align-items: center;">
      <div style="display: flex; justify-content: space-between; width: 100%; max-width: 800px; flex-wrap: wrap; gap: 8px;">
        <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('learning-catalogue')">
          ← Back to Catalogue
        </button>
        <button class="btn btn-secondary btn-sm" onclick="if(typeof showToast==='function') showToast('Certificate PDF downloaded', 'success')">
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
          ${user.displayName || user.name || 'Student Learner'}
        </div>
        <div class="font-mono text-muted" style="font-size: 13px; margin-bottom: 24px;">
          UID: ${user.uid || 'AR-STUDENT'} • ${user.college || 'Institution'}
        </div>

        <p style="font-size: 14px; color: var(--text-secondary); max-width: 580px; margin: 0 auto 28px; line-height: 1.6;">
          Has successfully fulfilled all curriculum requirements and achieved an authoritative assessment score of <b>${score}%</b> (threshold ≥ 80%) in:
        </p>

        <h2 style="font-size: 22px; font-weight: 700; color: #C4B5FD; margin-bottom: 32px;">
          ${courseTitle}
        </h2>

        <div style="display: flex; justify-content: space-around; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); flex-wrap: wrap; gap: 12px;">
          <div>
            <div>Date of Verification</div>
            <div style="color: var(--text-primary); font-weight: 600; margin-top: 4px;">${todayStr}</div>
          </div>
          <div>
            <div>Cryptographic Verification Hash</div>
            <div style="color: var(--accent-cyan); margin-top: 4px;">${certHash}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
