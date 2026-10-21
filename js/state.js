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
  activeDoc: ARISE_DATA.studyLibrary[0],
  timerRunning: false,
  timerSeconds: 1420, // 23 mins 40 secs
  timerInterval: null,

  // Learning state
  activeCourse: ARISE_DATA.courses[1], // Graph Theory
  quizAnswers: {},
  quizSubmitted: false,
  quizScore: 0,

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

  apiBase: 'http://localhost:8000/api/v1',
  authToken: typeof localStorage !== 'undefined' ? (localStorage.getItem('arise_token') || null) : null,

  async apiRequest(path, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.authToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('arise_token') : null);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`${this.apiBase}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });
    
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
  }
};



