/* ==========================================================================
   ARISE APPLICATION STATE & THEME CONTROLLER
   ========================================================================== */

const AriseTheme = {
  current: 'dark',

  init() {
    try {
      const saved = localStorage.getItem('arise_theme');
      if (saved === 'light' || saved === 'dark') {
        this.current = saved;
      }
    } catch (e) {}
    this.apply();
  },

  toggle() {
    this.current = (this.current === 'dark') ? 'light' : 'dark';
    try {
      localStorage.setItem('arise_theme', this.current);
    } catch (e) {}
    this.apply();
    if (typeof showToast === 'function') {
      showToast(`${this.current === 'dark' ? '🌙 Night mode' : '☀️ Day mode'} activated`, 'info');
    }
    if (typeof AriseState !== 'undefined' && typeof AriseState.notify === 'function') {
      AriseState.notify();
    }
  },

  apply() {
    if (typeof document !== 'undefined' && document.documentElement && typeof document.documentElement.setAttribute === 'function') {
      document.documentElement.setAttribute('data-theme', this.current);
      if (document.body && typeof document.body.setAttribute === 'function') {
        document.body.setAttribute('data-theme', this.current);
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.AriseTheme = AriseTheme;
}
AriseTheme.init();

const AriseState = {
  // Current active mode: 'prototype' | 'design-system'
  viewMode: 'prototype',

  // Current active screen: 'landing' (default landing page) | 'overview' | 'leaderboard' |
  // 'dsa-topics' | 'dsa-problems' | 'dsa-workspace' | 'self-study' | 'pdf-reader' |
  // 'learning-catalogue' | 'course-detail' | 'lesson-player' | 'final-assessment' |
  // 'course-completion' | 'profile' | 'badges' | 'settings' | 'signup' | 'login'
  currentScreen: 'landing',

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
  dsaFilterLanguage: 'all',   // 'all' | 'c' | 'cpp' | 'python' | 'java' | 'javascript' | 'typescript' | 'go' | 'rust'
  dsaSearchQuery: '',
  workspaceLeftTab: 'description', // 'description' | 'hints' | 'solution' | 'submissions'
  revealedHints: {}, // problemId -> number of hints revealed (0, 1, 2, 3)
  hintConfirmPending: false, // boolean flag for inline confirm dialog
  solutionUnlockConfirmPending: false, // boolean flag for unlocking solution confirmation
  unlockedSolutions: {}, // problemId -> boolean
  submissionsHistory: {}, // problemId -> array of submissions
  userCode: {}, // problemId_lang -> user's edited source code

  // Self Study state
  studyFiles: [],
  studyFilesLoaded: false,
  studyLoading: false,
  studySummary: { total_seconds: 0, total_minutes: 0, total_hours: 0.0, session_count: 0, last_session_at: null },
  studySummaryLoaded: false,
  studySummaryLoading: false,
  activeStudySessionId: null,
  activeDoc: (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.studyLibrary) ? ARISE_DATA.studyLibrary[0] : null,
  readerCurrentPage: 1,
  readerZoom: 100,
  readerViewMode: 'engine',
  timerRunning: false,
  timerSeconds: 0,
  timerInterval: null,

  // Badges state
  badgesList: [],
  badgesLoaded: false,
  badgesTotalUnlocked: 0,
  badgesLoading: false,

  // Learning state
  coursesList: [],
  coursesLoaded: false,
  courseDetailLoaded: {},
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
  compareFriends: [],

  // Notifications drawer open
  notificationsOpen: false,

  // Command palette open
  commandPaletteOpen: false,

  // Mobile more sheet open
  mobileMoreOpen: false,

  // Notification Management
  loadUserNotifications(userUid) {
    const uid = userUid || (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser ? ARISE_DATA.currentUser.uid : 'local');
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('arise_notifs_' + uid);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && typeof ARISE_DATA !== 'undefined') {
            ARISE_DATA.notifications = parsed;
            return parsed;
          }
        }
      } catch (e) {}
    }
    if (typeof ARISE_DATA !== 'undefined' && !Array.isArray(ARISE_DATA.notifications)) {
      ARISE_DATA.notifications = [];
    }
    return (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.notifications) ? ARISE_DATA.notifications : [];
  },

  saveNotificationsToStorage() {
    if (typeof localStorage === 'undefined' || typeof ARISE_DATA === 'undefined') return;
    const uid = (ARISE_DATA.currentUser ? ARISE_DATA.currentUser.uid : 'local');
    try {
      localStorage.setItem('arise_notifs_' + uid, JSON.stringify(ARISE_DATA.notifications || []));
    } catch (e) {}
  },

  addNotification(notif) {
    if (!notif) return null;
    if (typeof ARISE_DATA === 'undefined') return null;
    if (!Array.isArray(ARISE_DATA.notifications)) {
      ARISE_DATA.notifications = [];
    }

    // Prevent duplicate notification by id or requestId
    if (notif.id && ARISE_DATA.notifications.some(n => n.id === notif.id)) {
      return null;
    }
    if (notif.requestId && ARISE_DATA.notifications.some(n => n.requestId === notif.requestId)) {
      return null;
    }

    const item = {
      id: notif.id || ('notif-' + Date.now() + '-' + Math.floor(Math.random() * 1000)),
      title: notif.title || 'Notification',
      body: notif.body || '',
      time: notif.time || 'Just now',
      read: false,
      type: notif.type || 'info', // 'friend_request' | 'friend_request_sent' | 'friend_added' | 'solve_success' | 'milestone' | 'course_completion' | 'badge_unlocked' | 'rank_update'
      senderUid: notif.senderUid || null,
      senderName: notif.senderName || null,
      recipientUid: notif.recipientUid || null,
      requestId: notif.requestId || null,
      meta: notif.meta || null
    };

    ARISE_DATA.notifications.unshift(item);
    this.saveNotificationsToStorage();
    this.notify();
    return item;
  },

  markNotificationRead(notifId) {
    if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) {
      const n = ARISE_DATA.notifications.find(item => item.id === notifId);
      if (n) {
        n.read = true;
        this.saveNotificationsToStorage();
        this.notify();
      }
    }
  },

  markAllNotificationsRead() {
    if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) {
      ARISE_DATA.notifications.forEach(n => { n.read = true; });
      this.saveNotificationsToStorage();
      this.notify();
    }
  },

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
    if (this.dsaFilterDifficulty && this.dsaFilterDifficulty.toLowerCase() === (diff || '').toLowerCase() && diff.toLowerCase() !== 'all') {
      this.dsaFilterDifficulty = 'all';
    } else {
      this.dsaFilterDifficulty = diff;
    }
    this.notify();
  },

  setDsaFilterTopic(topic) {
    this.dsaFilterTopic = topic || 'all';
    this.notify();
  },

  setDsaFilterStatus(status) {
    this.dsaFilterStatus = status || 'all';
    this.notify();
  },

  setDsaSearchQuery(query) {
    this.dsaSearchQuery = query || '';
    this.notify();
  },

  setDsaFilterLanguage(lang) {
    if (this.dsaFilterLanguage && this.dsaFilterLanguage.toLowerCase() === (lang || '').toLowerCase() && lang.toLowerCase() !== 'all') {
      this.dsaFilterLanguage = 'all';
    } else {
      this.dsaFilterLanguage = lang;
      if (lang && lang !== 'all') {
        this.activeLanguage = lang;
      }
    }
    this.notify();
  },

  resetDsaFilters() {
    this.dsaFilterDifficulty = 'all';
    this.dsaFilterTopic = 'all';
    this.dsaFilterStatus = 'all';
    this.dsaFilterLanguage = 'all';
    this.dsaSearchQuery = '';
    this.notify();
  },

  setReaderPage(p) {
    const totalPages = (this.activeDoc && this.activeDoc.pages) ? this.activeDoc.pages : 16;
    const pageNum = Math.max(1, Math.min(totalPages, parseInt(p, 10) || 1));
    this.readerCurrentPage = pageNum;
    const iframe = typeof document !== 'undefined' ? document.getElementById('pdf-viewer-frame') : null;
    if (iframe && this.activeDoc && this.activeDoc.blobUrl) {
      try {
        iframe.src = `${this.activeDoc.blobUrl}#page=${pageNum}&zoom=${this.readerZoom}`;
      } catch (e) {}
    }
    this.notify();
  },

  nextReaderPage() {
    this.setReaderPage(this.readerCurrentPage + 1);
  },

  prevReaderPage() {
    this.setReaderPage(this.readerCurrentPage - 1);
  },

  setReaderZoom(zoom) {
    this.readerZoom = Math.max(50, Math.min(200, zoom));
    const iframe = typeof document !== 'undefined' ? document.getElementById('pdf-viewer-frame') : null;
    if (iframe && this.activeDoc && this.activeDoc.blobUrl) {
      try {
        iframe.src = `${this.activeDoc.blobUrl}#page=${this.readerCurrentPage}&zoom=${this.readerZoom}`;
      } catch (e) {}
    }
    this.notify();
  },

  setReaderViewMode(mode) {
    this.readerViewMode = mode;
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

  loadUserCode() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem('arise_user_code');
      if (stored) {
        this.userCode = JSON.parse(stored);
      }
    } catch (e) {}
  },

  saveUserCode(problemId, lang, code) {
    if (!this.userCode) this.userCode = {};
    const key = `${problemId}_${lang || 'javascript'}`;
    this.userCode[key] = code;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('arise_user_code', JSON.stringify(this.userCode));
      } catch (e) {}
    }
  },

  getUserCode(problemId, lang) {
    if (!this.userCode || Object.keys(this.userCode).length === 0) {
      this.loadUserCode();
    }
    const key = `${problemId}_${lang || 'javascript'}`;
    if (this.userCode && this.userCode[key] !== undefined) {
      return this.userCode[key];
    }
    return null;
  },

  clearUserCode(problemId, lang) {
    if (!this.userCode) return;
    const key = `${problemId}_${lang || 'javascript'}`;
    delete this.userCode[key];
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('arise_user_code', JSON.stringify(this.userCode));
      } catch (e) {}
    }
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

  apiBase: (function() {
    if (typeof window === 'undefined' || !window.location) return 'http://localhost:8000/api/v1';
    if (window.ARISE_API_URL) return window.ARISE_API_URL.replace(/\/+$/, '');
    try {
      const stored = localStorage.getItem('arise_api_url');
      if (stored) return stored.replace(/\/+$/, '');
    } catch (_) {}
    const host = window.location.hostname;
    if (!host || host === 'localhost' || host === '127.0.0.1') {
      return `http://${host || 'localhost'}:8000/api/v1`;
    }
    // Remote / Vercel deployment: relative /api/v1 routes to serverless functions or proxy
    return '/api/v1';
  })(),
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
      if (typeof this.apiBase === 'string' && this.apiBase.includes(':8000')) {
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
      } else {
        throw new Error("Unable to connect to ARISE API endpoint.");
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
        if (Array.isArray(ARISE_DATA.topics)) {
          ARISE_DATA.topics.forEach(t => {
            const tNameLower = (t.name || '').trim().toLowerCase();
            const tIdLower = (t.id || '').trim().toLowerCase();
            const count = (ARISE_DATA.problems || []).filter(p => {
              const pTopic = (p.topic || '').trim().toLowerCase();
              return (pTopic === tNameLower || pTopic === tIdLower || (tIdLower.length > 2 && pTopic.includes(tIdLower))) && p.status === 'Solved';
            }).length;
            t.userSolved = count;
            t.solved = count;
          });
        }
        // Persist solved problems to localStorage and sync leaderboards
        try {
          if (typeof localStorage !== 'undefined' && stats.problems_solved && stats.problems_solved.length > 0) {
            let saved = JSON.parse(localStorage.getItem('arise_solved_problem_ids') || '[]');
            stats.problems_solved.forEach(id => {
              if (!saved.includes(id)) saved.push(id);
            });
            localStorage.setItem('arise_solved_problem_ids', JSON.stringify(saved));
          }
        } catch (_) {}
        if (typeof syncLeaderboardWithUser === 'function') {
          syncLeaderboardWithUser(ARISE_DATA.currentUser);
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
      if (Array.isArray(this.friendRequests.incoming)) {
        this.friendRequests.incoming.forEach(req => {
          this.addNotification({
            id: `notif-incoming-${req.id}`,
            requestId: req.id,
            title: "Friend Request Received",
            body: `${req.requester_name || req.requester_uid} (ID: ${req.requester_uid}) sent you a friend request to compare DSA solves.`,
            type: "friend_request",
            senderUid: req.requester_uid,
            senderName: req.requester_name
          });
        });
      }
      this.notify();
      return this.friendRequests;
    } catch (err) {
      return { incoming: [], outgoing: [] };
    }
  },

  async sendFriendRequest(recipientUid) {
    let res = null;
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (token) {
      res = await this.apiRequest('/friend-requests', 'POST', { recipient_uid: recipientUid });
      await this.fetchFriendRequests();
    } else {
      res = { recipient_uid: recipientUid, recipient_name: recipientUid };
      if (!this.friendRequests) this.friendRequests = { incoming: [], outgoing: [] };
      this.friendRequests.outgoing.push({
        id: 'fr-' + Date.now(),
        recipient_uid: recipientUid,
        recipient_name: recipientUid,
        created_at: new Date().toISOString()
      });
    }

    const targetUid = (res && res.recipient_uid) || recipientUid;
    const targetName = (res && res.recipient_name) || targetUid;
    this.addNotification({
      title: "Friend Request Sent",
      body: `Friend request sent to student ID ${targetUid}. Waiting for mutual acceptance.`,
      type: "friend_request_sent",
      recipientUid: targetUid
    });
    return res;
  },

  async acceptFriendRequest(requestId, requesterUid = null, requesterName = null) {
    let res = null;
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (token && requestId && !String(requestId).startsWith('local-')) {
      res = await this.apiRequest(`/friend-requests/${requestId}/accept`, 'POST');
      await this.fetchFriendRequests();
      await this.fetchFriends();
      await this.fetchFriendsLeaderboard();
    }
    const partnerUid = (res && res.requester_uid) || requesterUid || 'Student';
    const partnerName = (res && res.requester_name) || requesterName || partnerUid;

    // Mark the request notification as read
    if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) {
      const reqNotif = ARISE_DATA.notifications.find(n => n.requestId === requestId || n.senderUid === partnerUid);
      if (reqNotif) reqNotif.read = true;
    }

    this.addNotification({
      title: "Friend Added",
      body: `You are now study partners with ${partnerName} (ID: ${partnerUid})! You can compare solves on the Friends Leaderboard.`,
      type: "friend_added",
      senderUid: partnerUid
    });
    return res;
  },

  async declineFriendRequest(requestId) {
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (token && requestId && !String(requestId).startsWith('local-')) {
      await this.apiRequest(`/friend-requests/${requestId}/decline`, 'POST');
      await this.fetchFriendRequests();
    }
    if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) {
      const reqNotif = ARISE_DATA.notifications.find(n => n.requestId === requestId);
      if (reqNotif) reqNotif.read = true;
    }
    this.saveNotificationsToStorage();
    this.notify();
  },

  async removeFriend(uid) {
    const res = await this.apiRequest(`/friends/${uid}`, 'DELETE');
    await this.fetchFriends();
    await this.fetchFriendsLeaderboard();
    return res;
  },

  async fetchCourses() {
    if (this.learningLoading) return this.coursesList;
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
      this.coursesLoaded = true;
      this.learningLoading = false;
      this.notify();
      return courses;
    } catch (err) {
      console.warn('Failed to fetch courses:', err.message);
      this.coursesLoaded = true;
      this.learningLoading = false;
      return this.coursesList || [];
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
        const courseTitle = this.activeCourseDetail?.title || "Computer Science Course";
        this.addNotification({
          title: "🎓 Course Certified Milestone!",
          body: `Congratulations! You scored ${res.score_percentage}% on '${courseTitle}' and earned verified track completion!`,
          type: "course_completion",
          meta: { courseId, score: res.score_percentage }
        });
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
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (!token) {
      this.studyFilesLoaded = true;
      return this.studyFiles || [];
    }
    if (this.studyLoading) return this.studyFiles || [];
    this.authToken = token;
    this.studyLoading = true;
    try {
      const files = await this.apiRequest('/study-files');
      this.studyFiles = Array.isArray(files) ? files : [];
      if (typeof ARISE_DATA !== 'undefined') {
        const pageLookup = {
          "Course_101_Data_Structures_Assessment.pdf": 16,
          "Course_201_Graph_Algorithms_Assessment.pdf": 16,
          "Course_202_Dynamic_Programming_Assessment.pdf": 16,
          "Course_301_System_Design_Assessment.pdf": 16,
          "Course_302_Operating_Systems_Assessment.pdf": 16,
          "Course_401_Combinatorics_Crypto_Assessment.pdf": 16
        };
        ARISE_DATA.studyLibrary = this.studyFiles.map(f => {
          const pg = f.page_count || pageLookup[f.original_filename] || 16;
          const sz = f.size_bytes || 0;
          const formattedSize = sz >= 1048576 ? `${(sz / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(sz / 1024))} KB`;
          return {
            id: f.id,
            title: f.original_filename,
            original_filename: f.original_filename,
            subject: 'Self Study Material',
            pages: pg,
            fileSize: formattedSize,
            lastOpened: 'Just now',
            created_at: f.created_at,
            storage_key: f.storage_key,
            blobUrl: f.blobUrl || null
          };
        });
      }
      this.studyFilesLoaded = true;
      this.studyLoading = false;
      this.notify();
      return this.studyFiles;
    } catch (err) {
      this.studyFilesLoaded = true;
      this.studyLoading = false;
      return this.studyFiles || [];
    }
  },

  async uploadStudyPdf(file) {
    if (!file) throw new Error("Please select a file to upload.");
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);

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

    // Generate blob URL from the user's uploaded file so it is 100% the exact file uploaded
    let blobUrl = null;
    let detectedPages = 15;
    try {
      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        blobUrl = URL.createObjectURL(file);
      }
      const text = await file.text();
      const pageMatches = text.match(/\/Type\s*\/Page\b/g);
      if (pageMatches && pageMatches.length > 0) {
        detectedPages = pageMatches.length;
      } else {
        const countMatch = text.match(/\/Count\s+(\d+)/);
        if (countMatch && parseInt(countMatch[1], 10) > 0) {
          detectedPages = parseInt(countMatch[1], 10);
        }
      }
    } catch (e) {}

    if (!token) {
      // Local fallback for guest/unauthenticated demo session
      const localId = 'study-local-' + Date.now();
      const localDoc = {
        id: localId,
        user_id: 'local',
        original_filename: file.name,
        title: file.name,
        mime_type: 'application/pdf',
        size_bytes: file.size,
        pages: detectedPages,
        blobUrl: blobUrl,
        created_at: new Date().toISOString()
      };
      if (!this.studyFiles) this.studyFiles = [];
      this.studyFiles.unshift(localDoc);
      if (typeof ARISE_DATA !== 'undefined') {
        if (!ARISE_DATA.studyLibrary) ARISE_DATA.studyLibrary = [];
        ARISE_DATA.studyLibrary.unshift({
          id: localId,
          title: file.name,
          original_filename: file.name,
          subject: 'Self Study Material',
          pages: detectedPages,
          fileSize: file.size >= 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`,
          lastOpened: 'Just now',
          created_at: localDoc.created_at,
          blobUrl: blobUrl
        });
      }
      this.activeDoc = localDoc;
      this.readerCurrentPage = 1;
      this.notify();
      return localDoc;
    }

    this.authToken = token;
    const formData = new FormData();
    formData.append('file', file);

    let res;
    try {
      res = await fetch(`${this.apiBase}/study-files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
    } catch (fetchErr) {
      const altBase = this.apiBase.includes('localhost')
        ? this.apiBase.replace('localhost', '127.0.0.1')
        : this.apiBase.replace('127.0.0.1', 'localhost');
      try {
        res = await fetch(`${altBase}/study-files`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        this.apiBase = altBase;
      } catch (err2) {
        throw new Error("Unable to connect to ARISE backend server (port 8000). Please ensure backend is running.");
      }
    }

    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message || data.detail || 'Upload failed');
      err.status = res.status;
      throw err;
    }

    data.blobUrl = blobUrl;
    data.pages = data.page_count || detectedPages;

    await this.fetchStudyFiles();
    const found = (this.studyFiles || []).find(f => f.id === data.id);
    if (found) {
      found.blobUrl = blobUrl;
      found.pages = data.pages;
    }
    const foundData = (ARISE_DATA.studyLibrary || []).find(f => f.id === data.id);
    if (foundData) {
      foundData.blobUrl = blobUrl;
      foundData.pages = data.pages;
    }
    this.activeDoc = found || foundData || data;
    this.readerCurrentPage = 1;
    this.notify();
    return data;
  },

  async deleteStudyFile(fileId) {
    const res = await this.apiRequest(`/study-files/${fileId}`, 'DELETE');
    await this.fetchStudyFiles();
    return res;
  },

  async startStudySession(studyFileId = null) {
    this.timerRunning = true;
    this.timerSeconds = 0;
    if (!this.timerInterval && typeof setInterval !== 'undefined') {
      this.timerInterval = setInterval(() => {
        if (this.timerRunning) {
          this.timerSeconds++;
          const timerEl = typeof document !== 'undefined' ? document.getElementById('study-timer-display') : null;
          if (timerEl) {
            const minutes = Math.floor(this.timerSeconds / 60);
            const seconds = this.timerSeconds % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          } else if (this.currentScreen === 'pdf-reader') {
            this.notify();
          }
        }
      }, 1000);
    }

    if (this.authToken) {
      try {
        const res = await this.apiRequest('/study-sessions', 'POST', { study_file_id: studyFileId });
        this.activeStudySessionId = res.id;
        this.notify();
        return res;
      } catch (err) {
        console.warn('Could not start remote study session:', err.message);
      }
    }
    this.notify();
    return { id: 'local-' + Date.now(), study_file_id: studyFileId };
  },

  async finishStudySession() {
    const duration = this.timerSeconds || 0;
    this.timerRunning = false;
    if (this.timerInterval && typeof clearInterval !== 'undefined') {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    // Always log session locally if studied for at least 5 seconds
    if (duration >= 5) {
      const todayStr = new Date().toISOString().slice(0, 10);
      try {
        if (typeof localStorage !== 'undefined') {
          const sessions = JSON.parse(localStorage.getItem('arise_study_sessions') || '[]');
          sessions.unshift({
            id: 'sess-' + Date.now(),
            docId: (this.activeDoc && this.activeDoc.id) || 'doc-general',
            docTitle: (this.activeDoc && (this.activeDoc.original_filename || this.activeDoc.title)) || 'Study Session',
            durationSeconds: duration,
            startedAt: new Date(Date.now() - duration * 1000).toISOString(),
            endedAt: new Date().toISOString(),
            dateStr: todayStr
          });
          localStorage.setItem('arise_study_sessions', JSON.stringify(sessions));
        }
      } catch (_) {}
    }

    let finishRes = null;
    if (this.activeStudySessionId && !this.activeStudySessionId.startsWith('local-') && this.authToken) {
      try {
        finishRes = await this.apiRequest(`/study-sessions/${this.activeStudySessionId}/finish`, 'POST');
      } catch (err) {
        console.warn('Could not record finish study session:', err.message);
      }
    }
    this.activeStudySessionId = null;
    this.timerSeconds = 0;
    await this.fetchStudySummary();
    this.notify();
    return finishRes;
  },

  async logManualStudyTime(minutes = 30, note = 'Document Study') {
    const seconds = Math.max(60, minutes * 60);
    const todayStr = new Date().toISOString().slice(0, 10);
    try {
      if (typeof localStorage !== 'undefined') {
        const sessions = JSON.parse(localStorage.getItem('arise_study_sessions') || '[]');
        sessions.unshift({
          id: 'manual-' + Date.now(),
          docId: 'manual',
          docTitle: note,
          durationSeconds: seconds,
          startedAt: new Date(Date.now() - seconds * 1000).toISOString(),
          endedAt: new Date().toISOString(),
          dateStr: todayStr
        });
        localStorage.setItem('arise_study_sessions', JSON.stringify(sessions));
      }
    } catch (_) {}

    await this.fetchStudySummary();
    this.notify();
  },

  async fetchStudySummary() {
    let localSessions = [];
    try {
      if (typeof localStorage !== 'undefined') {
        localSessions = JSON.parse(localStorage.getItem('arise_study_sessions') || '[]');
      }
    } catch (_) {}

    const todayStr = new Date().toISOString().slice(0, 10);
    const localTodaySecs = localSessions.filter(s => s.dateStr === todayStr).reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    const localTotalSecs = localSessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    
    // Calculate local streak
    const datesWithStudy = new Set(localSessions.map(s => s.dateStr).filter(Boolean));
    let localStreak = 0;
    let curr = new Date();
    let checkDateStr = curr.toISOString().slice(0, 10);
    if (!datesWithStudy.has(checkDateStr)) {
      curr.setDate(curr.getDate() - 1);
      checkDateStr = curr.toISOString().slice(0, 10);
    }
    while (datesWithStudy.has(checkDateStr)) {
      localStreak++;
      curr.setDate(curr.getDate() - 1);
      checkDateStr = curr.toISOString().slice(0, 10);
    }

    let remoteSummary = null;
    if (this.authToken && !this.studySummaryLoading) {
      this.studySummaryLoading = true;
      try {
        remoteSummary = await this.apiRequest('/study-sessions/summary');
      } catch (err) {
        console.warn('Could not fetch remote study summary:', err.message);
      }
      this.studySummaryLoading = false;
    }

    const totalSeconds = Math.max((remoteSummary && remoteSummary.total_seconds) || 0, localTotalSecs);
    const todaySeconds = Math.max((remoteSummary && remoteSummary.today_seconds) || 0, localTodaySecs);
    const sessionCount = Math.max((remoteSummary && remoteSummary.session_count) || 0, localSessions.length);
    const streak = Math.max((remoteSummary && remoteSummary.daily_streak) || 0, localStreak, todaySeconds > 0 ? 1 : 0);

    this.studySummary = {
      total_seconds: totalSeconds,
      total_minutes: Math.round(totalSeconds / 60),
      total_hours: Number((totalSeconds / 3600).toFixed(1)),
      session_count: sessionCount,
      today_seconds: todaySeconds,
      today_minutes: Math.round(todaySeconds / 60),
      today_hours: Number((todaySeconds / 3600).toFixed(1)),
      daily_streak: streak,
      last_session_at: (remoteSummary && remoteSummary.last_session_at) || (localSessions[0] ? localSessions[0].endedAt : null)
    };

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('arise_study_summary', JSON.stringify(this.studySummary));
      }
    } catch (_) {}

    this.studySummaryLoaded = true;
    this.notify();
    return this.studySummary;
  },

  async fetchBadges() {
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (!token) {
      this.badgesLoaded = true;
      return null;
    }
    if (this.badgesLoading) return this.badgesList;
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

        // Notify user about unlocked badge milestones
        if (!this._notifiedBadgeSlugs) {
          this._notifiedBadgeSlugs = new Set();
        }
        res.badges.forEach(b => {
          if (b.is_unlocked && !this._notifiedBadgeSlugs.has(b.slug)) {
            this._notifiedBadgeSlugs.add(b.slug);
            this.addNotification({
              title: `🏆 Milestone Unlocked: ${b.name}`,
              body: `Achievement unlocked: ${b.description}`,
              type: "badge_unlocked",
              meta: { badgeSlug: b.slug }
            });
          }
        });
      }
      this.badgesLoaded = true;
      this.badgesLoading = false;
      this.notify();
      return res;
    } catch (err) {
      this.badgesLoaded = true;
      this.badgesLoading = false;
      return null;
    }
  }
};

if (typeof window !== 'undefined') {
  window.AriseState = AriseState;
}
if (typeof globalThis !== 'undefined') {
  globalThis.AriseState = AriseState;
}



