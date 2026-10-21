/* ==========================================================================
   ARISE APPLICATION STATE
   ========================================================================== */

const AriseState = {
  // Current active mode: 'prototype' | 'design-system'
  viewMode: 'prototype',

  // Current active screen: 'overview' | 'leaderboard' | 'dsa-topics' | 'dsa-problems' |
  // 'dsa-workspace' | 'self-study' | 'pdf-reader' | 'learning-catalogue' | 'course-detail' |
  // 'lesson-player' | 'final-assessment' | 'course-completion' | 'profile' | 'badges' |
  // 'settings' | 'landing' | 'signup' | 'login' | 'verify-email' | 'onboarding'
  currentScreen: 'overview',

  // Current viewport: '1440' | '1280' | '768' | '390'
  viewport: '1440',

  // Sidebar collapsed state
  sidebarCollapsed: false,

  // Design System viewer active page: '01' to '12'
  dsActivePage: '01',

  // Leaderboard active tab: 'global' | 'friends'
  leaderboardTab: 'global',
  leaderboardScope: 'maharashtra', // 'college' | 'district' | 'maharashtra' | 'india'
  leaderboardData: null,
  friendsLeaderboardData: null,
  friendRequests: { incoming: [], outgoing: [] },
  friendsList: [],
  leaderboardLoading: false,

  // DSA active state
  activeProblem: null, // Initialized from data
  activeLanguage: 'javascript',
  judgeStatus: 'idle', // 'idle' | 'running' | 'accepted' | 'wa' | 'ce' | 're' | 'tle' | 'unavailable'
  lastJudgeResult: null,
  judgeResult: null,
  activeTestCaseIndex: 0,
  dsaFilterDifficulty: 'all', // 'all' | 'Easy' | 'Medium' | 'Hard'
  dsaFilterTopic: 'all',      // 'all' | specific topic
  dsaFilterStatus: 'all',     // 'all' | 'unsolved' | 'attempted' | 'solved'
  dsaSearchQuery: '',
  workspaceLeftTab: 'description', // 'description' | 'hints' | 'solution' | 'submissions'
  revealedHints: {}, // problemId -> number of hints revealed (0, 1, 2, 3)
  hintConfirmPending: false, // boolean flag for inline confirm dialog
  solutionUnlockConfirmPending: false, // boolean flag for unlocking solution confirmation
  unlockedSolutions: {}, // problemId -> boolean
  submissionsHistory: {}, // problemId -> array of submissions

  // Self Study state
  studyFiles: [],
  studyLoading: false,
  studySummary: { total_seconds: 0, total_minutes: 0, total_hours: 0.0, session_count: 0, last_session_at: null },
  activeStudySessionId: null,
  activeDoc: (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.studyLibrary) ? ARISE_DATA.studyLibrary[0] : null,
  timerRunning: false,
  timerSeconds: 0,
  timerInterval: null,

  // Badges state
  badgesList: [],
  badgesTotalUnlocked: 0,
  badgesLoading: false,

  // Learning state
  coursesList: [],
  activeCourseId: 'course-algo-201',
  activeCourseDetail: null,
  activeLessonId: null,
  activeLessonDetail: null,
  completedLessonIds: new Set(),
  courseCompletions: [],
  activeCourse: (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) ? ARISE_DATA.courses[1] : null,
  quizAnswers: {},
  quizSubmitted: false,
  quizSubmitting: false,
  quizScore: 0,
  quizPassed: false,
  quizBreakdown: null,
  lastAttempt: null,
  learningLoading: false,

  // Friends comparison active selections (up to 4 friends)
  compareFriends: ["ARISE-4P9W2T", "ARISE-8M3X1L"],

  // Notifications drawer open
  notificationsOpen: false,

  // Command palette open
  commandPaletteOpen: false,

  // Mobile more sheet open
  mobileMoreOpen: false,

  // Listeners
  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
  },

  notify() {
    this.listeners.forEach(fn => fn());
  },

  setScreen(screen) {
    this.currentScreen = screen;
    this.viewMode = 'prototype';
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setViewport(vp) {
    this.viewport = vp;
    this.notify();
  },

  setViewMode(mode) {
    this.viewMode = mode;
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setDsPage(page) {
    this.dsActivePage = page;
    this.viewMode = 'design-system';
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setDsaFilterDifficulty(diff) {
    this.dsaFilterDifficulty = diff;
    this.notify();
  },

  setDsaFilterStatus(status) {
    this.dsaFilterStatus = status;
    this.notify();
  },

  setWorkspaceLeftTab(tab) {
    this.workspaceLeftTab = tab;
    this.hintConfirmPending = false;
    this.solutionUnlockConfirmPending = false;
    this.notify();
  },

  requestHintReveal() {
    this.hintConfirmPending = true;
    this.notify();
  },

  cancelHintConfirm() {
    this.hintConfirmPending = false;
    this.notify();
  },

  confirmHintReveal(problemId) {
    const current = this.revealedHints[problemId] || 0;
    this.revealedHints[problemId] = Math.min(3, current + 1);
    this.hintConfirmPending = false;
    this.notify();
  },

  requestSolutionUnlock() {
    this.solutionUnlockConfirmPending = true;
    this.notify();
  },

  cancelSolutionUnlock() {
    this.solutionUnlockConfirmPending = false;
    this.notify();
  },

  confirmSolutionUnlock(problemId) {
    this.unlockedSolutions[problemId] = true;
    this.solutionUnlockConfirmPending = false;
    this.notify();
  },

  recordSubmission(problemId, sub) {
    if (!this.submissionsHistory[problemId]) {
      this.submissionsHistory[problemId] = [];
    }
    this.submissionsHistory[problemId].unshift(sub);
    // Submitting also unlocks solution
    this.unlockedSolutions[problemId] = true;
    this.notify();
  },

  apiBase: (typeof window !== 'undefined' && window.location && window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8000/api/v1'
    : (typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname !== 'localhost')
      ? `http://${window.location.hostname}:8000/api/v1`
      : 'http://localhost:8000/api/v1',
  authToken: typeof localStorage !== 'undefined' ? (localStorage.getItem('arise_token') || null) : null,

  async apiRequest(path, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    let res;
    try {
      res = await fetch(`${this.apiBase}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      });
    } catch (fetchErr) {
      const altBase = this.apiBase.includes('localhost')
        ? this.apiBase.replace('localhost', '127.0.0.1')
        : this.apiBase.replace('127.0.0.1', 'localhost');
      try {
        res = await fetch(`${altBase}${path}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null
        });
        this.apiBase = altBase;
      } catch (err2) {
        throw new Error("Unable to connect to ARISE backend server (port 8000). Please ensure backend is running.");
      }
    }
    
    // Rule 3: Handle expired or invalid tokens: API returns 401, frontend signs user out and redirects to /login
    if (res.status === 401) {
      if (typeof AriseAuth !== 'undefined' && typeof AriseAuth.signOut === 'function') {
        AriseAuth.signOut();
      }
      const err = new Error("Session expired or unauthorized. Please log in again.");
      err.status = 401;
      throw err;
    }

    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message || 'Request failed');
      err.code = data.code;
      err.status = res.status;
      throw err;
    }
    return data;
  },

  async login(email, password) {
    if (typeof AriseAuth !== 'undefined' && typeof AriseAuth.signIn === 'function') {
      return await AriseAuth.signIn(email, password);
    }
  },

  async signup(email, password, displayName) {
    if (typeof AriseAuth !== 'undefined' && typeof AriseAuth.signUp === 'function') {
      return await AriseAuth.signUp(email, password, password, displayName);
    }
  },

  async fetchProfile() {
    if (!this.authToken) return;
    try {
      const profile = await this.apiRequest('/me');
      if (typeof ARISE_DATA !== 'undefined') {
        ARISE_DATA.currentUser.uid = profile.uid;
        ARISE_DATA.currentUser.name = profile.display_name;
        ARISE_DATA.currentUser.verifiedXp = profile.verified_xp;
        ARISE_DATA.currentUser.problemsSolved = profile.solved_count;
        if (profile.rank_state) ARISE_DATA.currentUser.stateRank = profile.rank_state;
      }
      this.notify();
    } catch (err) {
      console.warn('Could not sync profile from API:', err.message);
    }
  },

  async updateProfile(updates) {
    if (!this.authToken) return null;
    try {
      const updated = await this.apiRequest('/me', 'PATCH', updates);
      if (typeof AriseAuth !== 'undefined' && typeof AriseAuth.applyCleanUserProfile === 'function') {
        AriseAuth.applyCleanUserProfile(updated);
      }
      this.notify();
      return updated;
    } catch (err) {
      console.warn('Failed to update profile:', err.message);
      throw err;
    }
  },

  async syncPracticeStats() {
    if (!this.authToken) return null;
    try {
      const stats = await this.apiRequest('/me/practice-stats');
      if (stats && typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) {
        ARISE_DATA.currentUser.verifiedXp = stats.total_verified_xp;
        ARISE_DATA.currentUser.solvedStats.total = stats.unique_solved_count;
        
        const solvedSet = new Set((stats.problems_solved || []).map(id => String(id).toUpperCase()));
        if (Array.isArray(ARISE_DATA.problems)) {
          ARISE_DATA.problems.forEach(p => {
            if (solvedSet.has(String(p.id).toUpperCase())) {
              p.status = 'Solved';
            }
          });
        }
      }
      this.notify();
      return stats;
    } catch (err) {
      console.warn('Could not sync practice stats:', err.message);
      return null;
    }
  },

  async fetchProblems() {
    try {
      const problems = await this.apiRequest('/problems?page_size=100');
      if (Array.isArray(problems) && problems.length > 0 && typeof ARISE_DATA !== 'undefined') {
        // Keep problem catalogue synced
        this.notify();
      }
    } catch (err) {
      // Fallback to static catalogue
    }
  },

  async fetchLeaderboard(scope = this.leaderboardScope) {
    this.leaderboardScope = scope;
    this.leaderboardLoading = true;
    this.notify();
    try {
      const res = await this.apiRequest(`/leaderboards?scope=${scope}&page_size=50`);
      this.leaderboardData = res;
      this.leaderboardLoading = false;
      this.notify();
      return res;
    } catch (err) {
      this.leaderboardLoading = false;
      this.notify();
      return null;
    }
  },

  async fetchFriendsLeaderboard() {
    if (!this.authToken) return null;
    try {
      const res = await this.apiRequest('/leaderboards/friends?page_size=50');
      this.friendsLeaderboardData = res;
      this.notify();
      return res;
    } catch (err) {
      return null;
    }
  },

  async fetchFriends() {
    if (!this.authToken) return [];
    try {
      const res = await this.apiRequest('/friends');
      this.friendsList = Array.isArray(res) ? res : [];
      this.notify();
      return this.friendsList;
    } catch (err) {
      return [];
    }
  },

  async fetchFriendRequests() {
    if (!this.authToken) return { incoming: [], outgoing: [] };
    try {
      const res = await this.apiRequest('/friend-requests');
      this.friendRequests = res || { incoming: [], outgoing: [] };
      this.notify();
      return this.friendRequests;
    } catch (err) {
      return { incoming: [], outgoing: [] };
    }
  },

  async sendFriendRequest(recipientUid) {
    const res = await this.apiRequest('/friend-requests', 'POST', { recipient_uid: recipientUid });
    await this.fetchFriendRequests();
    return res;
  },

  async acceptFriendRequest(requestId) {
    const res = await this.apiRequest(`/friend-requests/${requestId}/accept`, 'POST');
    await this.fetchFriendRequests();
    await this.fetchFriends();
    await this.fetchFriendsLeaderboard();
    return res;
  },

  async declineFriendRequest(requestId) {
    const res = await this.apiRequest(`/friend-requests/${requestId}/decline`, 'POST');
    await this.fetchFriendRequests();
    return res;
  },

  async removeFriend(uid) {
    const res = await this.apiRequest(`/friends/${uid}`, 'DELETE');
    await this.fetchFriends();
    await this.fetchFriendsLeaderboard();
    return res;
  },

  async fetchCourses() {
    this.learningLoading = true;
    try {
      const courses = await this.apiRequest('/courses');
      if (Array.isArray(courses)) {
        this.coursesList = courses;
        if (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.courses) {
          ARISE_DATA.courses = courses.map(c => ({
            id: c.id,
            slug: c.slug,
            title: c.title,
            description: c.description,
            category: c.category,
            duration: c.duration,
            lessonsCount: c.lessons_count,
            completedLessons: c.completed_lessons,
            assessmentPassed: c.is_completed,
            assessmentScore: c.best_score,
            skills: c.skills || [],
            curriculum: (c.curriculum || []).map(l => ({
              id: l.id,
              title: l.title,
              position: l.position,
              durationMinutes: l.duration_minutes,
              isCompleted: l.is_completed
            }))
          }));
        }
      }
      this.learningLoading = false;
      this.notify();
      return courses;
    } catch (err) {
      console.warn('Failed to fetch courses:', err.message);
      this.learningLoading = false;
      return null;
    }
  },

  async fetchCourseDetail(courseId) {
    this.activeCourseId = courseId;
    this.learningLoading = true;
    try {
      const detail = await this.apiRequest(`/courses/${courseId}`);
      this.activeCourseDetail = detail;
      this.activeCourse = detail;

      const completed = new Set();
      if (Array.isArray(detail.curriculum)) {
        detail.curriculum.forEach(l => {
          if (l.is_completed) completed.add(l.id);
        });
      }
      this.completedLessonIds = completed;

      if (detail.is_completed && detail.best_score) {
        this.quizScore = detail.best_score;
        this.quizPassed = true;
      }

      this.learningLoading = false;
      this.notify();
      return detail;
    } catch (err) {
      console.warn(`Failed to fetch course detail for ${courseId}:`, err.message);
      this.learningLoading = false;
      return null;
    }
  },

  async fetchLessonDetail(lessonId) {
    this.activeLessonId = lessonId;
    try {
      const lesson = await this.apiRequest(`/lessons/${lessonId}`);
      this.activeLessonDetail = lesson;
      this.notify();
      return lesson;
    } catch (err) {
      console.warn(`Failed to fetch lesson detail for ${lessonId}:`, err.message);
      return null;
    }
  },

  async completeLesson(lessonId) {
    try {
      const res = await this.apiRequest(`/lessons/${lessonId}/complete`, 'POST');
      if (res && res.is_completed) {
        this.completedLessonIds.add(lessonId);
        if (this.activeCourseDetail && Array.isArray(this.activeCourseDetail.curriculum)) {
          const l = this.activeCourseDetail.curriculum.find(item => item.id === lessonId);
          if (l) l.is_completed = true;
          this.activeCourseDetail.completed_lessons = this.activeCourseDetail.curriculum.filter(x => x.is_completed).length;
        }
        if (this.activeLessonDetail && this.activeLessonDetail.id === lessonId) {
          this.activeLessonDetail.is_completed = true;
        }
        this.fetchCourses().catch(() => {});
        this.notify();
      }
      return res;
    } catch (err) {
      console.warn(`Failed to complete lesson ${lessonId}:`, err.message);
      throw err;
    }
  },

  async submitFinalTest(courseId, answers) {
    this.quizSubmitting = true;
    this.notify();
    try {
      const res = await this.apiRequest(`/courses/${courseId}/final-test-attempts`, 'POST', { answers });
      this.lastAttempt = res;
      this.quizScore = res.score_percentage;
      this.quizPassed = res.is_passed;
      this.quizBreakdown = res.breakdown || null;
      this.quizSubmitted = true;
      this.quizSubmitting = false;

      if (res.is_passed) {
        if (this.activeCourseDetail) {
          this.activeCourseDetail.is_completed = true;
          this.activeCourseDetail.best_score = Math.max(this.activeCourseDetail.best_score || 0, res.score_percentage);
        }
        await this.fetchCourseCompletions();
        await this.fetchCourses();
        if (typeof AriseAuth !== 'undefined' && typeof AriseAuth.syncProfileWithBackend === 'function') {
          AriseAuth.syncProfileWithBackend().catch(() => {});
        }
      }
      this.notify();
      return res;
    } catch (err) {
      this.quizSubmitting = false;
      this.notify();
      throw err;
    }
  },

  async fetchCourseCompletions() {
    if (!this.authToken) return [];
    try {
      const res = await this.apiRequest('/me/course-completions');
      this.courseCompletions = Array.isArray(res) ? res : [];
      if (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) {
        ARISE_DATA.currentUser.coursesCompleted = this.courseCompletions.length;
      }
      this.notify();
      return this.courseCompletions;
    } catch (err) {
      return [];
    }
  },

  async fetchStudyFiles() {
    if (!this.authToken) return [];
    this.studyLoading = true;
    try {
      const files = await this.apiRequest('/study-files');
      this.studyFiles = Array.isArray(files) ? files : [];
      if (typeof ARISE_DATA !== 'undefined') {
        ARISE_DATA.studyLibrary = this.studyFiles.map(f => ({
          id: f.id,
          title: f.original_filename,
          subject: 'Self Study Material',
          pages: 1,
          fileSize: `${(f.size_bytes / (1024 * 1024)).toFixed(1)} MB`,
          lastOpened: 'Just now',
          created_at: f.created_at
        }));
      }
      this.studyLoading = false;
      this.notify();
      return this.studyFiles;
    } catch (err) {
      this.studyLoading = false;
      return [];
    }
  },

  async uploadStudyPdf(file) {
    if (!file) throw new Error("Please select a file to upload.");
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (!token) throw new Error("Authentication required.");

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      const err = new Error("Uploaded file is not a valid PDF document.");
      err.status = 400;
      throw err;
    }
    if (file.size > 10 * 1024 * 1024) {
      const err = new Error("File size exceeds conservative 10MB limit.");
      err.status = 413;
      throw err;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${this.apiBase}/study-files`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message || data.detail || 'Upload failed');
      err.status = res.status;
      throw err;
    }

    await this.fetchStudyFiles();
    return data;
  },

  async deleteStudyFile(fileId) {
    const res = await this.apiRequest(`/study-files/${fileId}`, 'DELETE');
    await this.fetchStudyFiles();
    return res;
  },

  async startStudySession(studyFileId = null) {
    try {
      const res = await this.apiRequest('/study-sessions', 'POST', { study_file_id: studyFileId });
      this.activeStudySessionId = res.id;
      this.timerRunning = true;
      this.timerSeconds = 0;
      if (!this.timerInterval && typeof setInterval !== 'undefined') {
        this.timerInterval = setInterval(() => {
          if (this.timerRunning) {
            this.timerSeconds++;
            if (this.currentScreen === 'pdf-reader') this.notify();
          }
        }, 1000);
      }
      this.notify();
      return res;
    } catch (err) {
      console.warn('Could not start study session:', err.message);
      return null;
    }
  },

  async finishStudySession() {
    this.timerRunning = false;
    if (this.timerInterval && typeof clearInterval !== 'undefined') {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    let finishRes = null;
    if (this.activeStudySessionId) {
      try {
        finishRes = await this.apiRequest(`/study-sessions/${this.activeStudySessionId}/finish`, 'POST');
      } catch (err) {
        console.warn('Could not record finish study session:', err.message);
      }
    }
    this.activeStudySessionId = null;
    await this.fetchStudySummary();
    this.notify();
    return finishRes;
  },

  async fetchStudySummary() {
    if (!this.authToken) return null;
    try {
      const summary = await this.apiRequest('/study-sessions/summary');
      this.studySummary = summary;
      this.notify();
      return summary;
    } catch (err) {
      return null;
    }
  },

  async fetchBadges() {
    if (!this.authToken) return null;
    this.badgesLoading = true;
    try {
      const res = await this.apiRequest('/me/badges');
      if (res && Array.isArray(res.badges)) {
        this.badgesList = res.badges;
        this.badgesTotalUnlocked = res.total_unlocked;
        if (typeof ARISE_DATA !== 'undefined') {
          ARISE_DATA.badges = res.badges.map(b => ({
            id: b.id,
            slug: b.slug,
            name: b.name,
            desc: b.description,
            category: b.category,
            status: b.is_unlocked ? 'earned' : 'locked',
            unlockedDate: b.unlocked_at ? new Date(b.unlocked_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null,
            progress: b.progress_percent || 0,
            requirement: b.requirement
          }));
        }
      }
      this.badgesLoading = false;
      this.notify();
      return res;
    } catch (err) {
      this.badgesLoading = false;
      return null;
    }
  }
};



