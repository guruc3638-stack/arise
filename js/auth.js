/* ==========================================================================
   ARISE AUTHENTICATION & SESSION PROVIDER
   Supabase Auth (Email + Password) | Token Injection | Route Guard | Clean Accounts
   ========================================================================== */

const SUPABASE_CONFIG = {
  url: "https://ljkaknpzidmypwjmguqs.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqa2FrbnB6aWRteXB3am1ndXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NzkzNjMsImV4cCI6MjEwODE1NTM2M30.d-6ZuzK8q488ds6nT5mSo2X0ey20OxgxMPQeTb68N6c"
};

const AriseAuth = {
  client: null,
  session: null,
  userProfile: null,
  initialized: false,

  // Protected Dashboard Routes (Doc 03 / Doc 04)
  protectedScreens: [
    'overview',
    'leaderboard',
    'dsa-topics',
    'dsa-problems',
    'dsa-workspace',
    'self-study',
    'pdf-reader',
    'learning-catalogue',
    'course-detail',
    'lesson-player',
    'final-assessment',
    'course-completion',
    'profile',
    'badges',
    'settings'
  ],

  publicScreens: [
    'landing',
    'login',
    'signup',
    'verify-email',
    'onboarding'
  ],

  init() {
    if (this.initialized) return;

    // 1. Initialize Supabase Client if CDN loaded
    try {
      if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      }
    } catch (e) {
      console.warn('Supabase JS client init fallback:', e.message);
    }

    // 2. Restore cached session on refresh
    this.restoreSession();

    // 3. Listen for Supabase Auth state changes if available
    if (this.client && this.client.auth) {
      try {
        this.client.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_OUT') {
            this.clearLocalSession();
          } else if (session) {
            this.setSession(session);
          }
        });
      } catch (e) {
        // Fallback to local session
      }
    }

    // 4. Setup browser popstate / back-button guard
    window.addEventListener('popstate', () => {
      this.handleUrlRouting();
    });
    window.addEventListener('pageshow', () => {
      this.enforceRouteGuard();
    });

    // 5. Initial routing check based on URL
    this.handleUrlRouting();

    this.initialized = true;
  },

  isAuthenticated() {
    return Boolean(this.session && this.session.access_token);
  },

  restoreSession() {
    try {
      const raw = localStorage.getItem('arise_session');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.access_token) {
          this.session = parsed;
          AriseState.authToken = parsed.access_token;

          const savedProfile = localStorage.getItem('arise_profile');
          if (savedProfile) {
            this.applyCleanUserProfile(JSON.parse(savedProfile));
          }

          // Asynchronously sync latest from API
          this.syncProfileWithBackend().catch(() => {});
        }
      }
    } catch (e) {
      this.clearLocalSession();
    }
  },

  setSession(session, profile = null) {
    this.session = session;
    if (session && session.access_token) {
      AriseState.authToken = session.access_token;
      localStorage.setItem('arise_session', JSON.stringify({
        access_token: session.access_token,
        token_type: session.token_type || 'bearer',
        expires_at: session.expires_at || null,
        user: session.user || null
      }));
      localStorage.setItem('arise_token', session.access_token);

      if (profile) {
        this.applyCleanUserProfile(profile);
      }
    } else {
      this.clearLocalSession();
    }
  },

  clearLocalSession() {
    this.session = null;
    this.userProfile = null;
    AriseState.authToken = null;
    try {
      localStorage.removeItem('arise_session');
      localStorage.removeItem('arise_token');
      localStorage.removeItem('arise_profile');
      // Clear any cached query states
      localStorage.removeItem('arise_recent_solves');
    } catch (e) {}
  },

  // Rule 4: Clean New Account Application
  applyCleanUserProfile(profile) {
    if (!profile) return;
    this.userProfile = profile;
    try {
      localStorage.setItem('arise_profile', JSON.stringify(profile));
    } catch (e) {}

    if (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) {
      const name = profile.display_name || profile.name || "Student Learner";
      const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "ST";

      ARISE_DATA.currentUser.uid = profile.uid || "AR-PENDING";
      ARISE_DATA.currentUser.displayName = name;
      ARISE_DATA.currentUser.college = profile.college_name || "Institution not set";
      ARISE_DATA.currentUser.district = profile.district_name || "";
      ARISE_DATA.currentUser.state = profile.state_code || "Maharashtra";
      ARISE_DATA.currentUser.avatar = initials;

      // Authoritative on-demand stats from xp_ledger (Rule 4)
      const verifiedXp = Number(profile.verified_xp || 0);
      ARISE_DATA.currentUser.verifiedXp = verifiedXp;
      ARISE_DATA.currentUser.rankDisplay = verifiedXp === 0 ? "Unranked" : (profile.rank_state ? `#${profile.rank_state}` : "Unranked");
      ARISE_DATA.currentUser.rank = {
        college: verifiedXp === 0 ? null : (profile.rank_college || null),
        district: verifiedXp === 0 ? null : (profile.rank_district || null),
        maharashtra: verifiedXp === 0 ? null : (profile.rank_state || null),
        india: verifiedXp === 0 ? null : (profile.rank_india || null),
      };

      const solvedCount = Number(profile.solved_count || 0);
      const practiceCount = Number(profile.practice_count || 0);
      ARISE_DATA.currentUser.solvedStats = {
        total: solvedCount,
        easy: 0,
        medium: 0,
        hard: 0
      };
      ARISE_DATA.currentUser.coursesCompleted = Number(profile.completed_courses_count || 0);
      ARISE_DATA.currentUser.acceptanceRate = practiceCount > 0 ? `${Math.round((solvedCount / practiceCount) * 100)}%` : "—";

      // If user has 0 XP, enforce clean empty state collections
      if (verifiedXp === 0) {
        ARISE_DATA.currentUser.recentSolves = [];
        // Personal topic progress starts clean at 0 solved
        if (Array.isArray(ARISE_DATA.topics)) {
          ARISE_DATA.topics.forEach(t => {
            t.userSolved = 0;
          });
        }
      }
    }
  },

  async syncProfileWithBackend() {
    if (!this.isAuthenticated()) return null;
    try {
      const profile = await AriseState.apiRequest('/me');
      this.applyCleanUserProfile(profile);
      AriseState.notify();
      return profile;
    } catch (err) {
      if (err.status === 401 || (err.message && err.message.includes('UNAUTHENTICATED'))) {
        this.signOut();
      }
      throw err;
    }
  },

  // ------------------------------------------------------------------------
  // CLIENT-SIDE VALIDATION HELPERS (Rule 1 & 5)
  // ------------------------------------------------------------------------
  validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  },

  validatePassword(password) {
    if (!password || typeof password !== 'string') return false;
    return password.length >= 8;
  },

  // ------------------------------------------------------------------------
  // AUTHENTICATION ACTIONS
  // ------------------------------------------------------------------------
  async signIn(email, password) {
    // 1. Client-side validation
    if (!this.validateEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password) {
      throw new Error("Password is required.");
    }

    try {
      let session = null;
      let userProfile = null;

      // Try Supabase Auth first if available
      if (this.client && this.client.auth) {
        try {
          const { data, error } = await this.client.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password
          });
          if (!error && data && data.session) {
            session = data.session;
          }
        } catch (supaErr) {
          // Fall through to backend API bridge
        }
      }

      // If Supabase client direct auth didn't return session, use backend auth bridge
      if (!session) {
        const res = await fetch(`${AriseState.apiBase}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase(), password })
        });
        const data = await res.json();
        if (!res.ok) {
          // Safe error messaging: never reveal whether an email exists
          throw new Error("Invalid email or password.");
        }
        session = {
          access_token: data.access_token,
          token_type: data.token_type,
          user: data.user
        };
        userProfile = data.user;
      }

      // Store session and configure auth
      this.setSession(session, userProfile);

      // Fetch authoritative clean profile if not present
      if (!userProfile) {
        await this.syncProfileWithBackend();
      }

      // Redirect to Dashboard (Rule 1)
      this.navigateTo('overview');
      if (typeof showToast === 'function') {
        showToast(`Welcome back, ${ARISE_DATA.currentUser.displayName}!`, 'success');
      }
      return session;
    } catch (err) {
      // Safe error messages only
      const safeMsg = err.message.includes("Rate limit")
        ? "Too many attempts. Please wait a minute and try again."
        : "Invalid email or password.";
      throw new Error(safeMsg);
    }
  },

  async signUp(email, password, confirmPassword, displayName = "") {
    // 1. Client-side validation
    if (!this.validateEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!this.validatePassword(password)) {
      throw new Error("Password must be at least 8 characters long.");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match. Please re-enter.");
    }

    try {
      let session = null;
      let userProfile = null;

      // Try Supabase Auth direct signup
      if (this.client && this.client.auth) {
        try {
          const { data, error } = await this.client.auth.signUp({
            email: email.trim().toLowerCase(),
            password: password,
            options: {
              data: { display_name: displayName || email.split('@')[0] }
            }
          });
          if (!error && data && data.session) {
            session = data.session;
          }
        } catch (supaErr) {
          // Fall through to backend API
        }
      }

      // Fallback or standard path: Backend signup endpoint
      if (!session) {
        const res = await fetch(`${AriseState.apiBase}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            display_name: displayName || email.split('@')[0]
          })
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 409 || (data.code && data.code === "CONFLICT")) {
            throw new Error("An account with this email already exists.");
          }
          if (res.status === 429) {
            throw new Error("Too many attempts. Please try again later.");
          }
          throw new Error(data.message || "Unable to complete registration. Please try again.");
        }
        session = {
          access_token: data.access_token,
          token_type: data.token_type,
          user: data.user
        };
        userProfile = data.user;
      }

      // Store session and apply clean profile
      this.setSession(session, userProfile);

      // Rule 1: After signup, send the user to the Profile setup screen (display name, college, district, visibility toggles)
      this.navigateTo('onboarding');

      if (typeof showToast === 'function') {
        const uid = userProfile ? userProfile.uid : (ARISE_DATA.currentUser.uid || "");
        showToast(`Account created! Your unique ID is ${uid}`, 'success');
      }
      return session;
    } catch (err) {
      throw err;
    }
  },

  async signOut() {
    // 1. Call Supabase signOut if available
    if (this.client && this.client.auth) {
      try {
        await this.client.auth.signOut();
      } catch (e) {}
    }

    // 2. Clear all local tokens, storage, and state
    this.clearLocalSession();

    // 3. Reset ARISE_DATA.currentUser to empty unauthenticated template
    if (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) {
      ARISE_DATA.currentUser.uid = "AR-UNAUTHENTICATED";
      ARISE_DATA.currentUser.displayName = "Guest Learner";
      ARISE_DATA.currentUser.verifiedXp = 0;
      ARISE_DATA.currentUser.rankDisplay = "Unranked";
    }

    // 4. Update browser history to prevent Back button from viewing protected pages
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#/login');
    }

    // 5. Redirect directly to login screen
    AriseState.setScreen('login');

    if (typeof showToast === 'function') {
      showToast("Signed out successfully.", "info");
    }
  },

  // ------------------------------------------------------------------------
  // ROUTE GUARD & NAVIGATION CONTROLLER (Rule 2 & 3)
  // ------------------------------------------------------------------------
  enforceRouteGuard() {
    const currentScreen = AriseState.currentScreen;
    const isAuth = this.isAuthenticated();

    if (!isAuth) {
      // Unauthenticated visitor trying to access a protected route -> redirect to login
      if (this.protectedScreens.includes(currentScreen)) {
        AriseState.currentScreen = 'login';
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#/login');
        }
        AriseState.notify();
        return false;
      }
    } else {
      // Logged in user who opens login or signup -> redirect to Dashboard
      if (currentScreen === 'login' || currentScreen === 'signup') {
        AriseState.currentScreen = 'overview';
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#/dashboard');
        }
        AriseState.notify();
        return false;
      }
    }
    return true;
  },

  navigateTo(screen) {
    AriseState.setScreen(screen);
    const hash = screen === 'overview' ? '#/dashboard' : `#/${screen}`;
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', hash);
    }
    this.enforceRouteGuard();
  },

  handleUrlRouting() {
    const hash = window.location.hash || '';
    const path = window.location.pathname || '';

    let targetScreen = null;

    if (hash === '#/login' || path === '/login') targetScreen = 'login';
    else if (hash === '#/signup' || path === '/signup') targetScreen = 'signup';
    else if (hash === '#/dashboard' || path === '/dashboard' || hash === '#/overview') targetScreen = 'overview';
    else if (hash === '#/leaderboard') targetScreen = 'leaderboard';
    else if (hash === '#/dsa') targetScreen = 'dsa-problems';
    else if (hash === '#/self-study') targetScreen = 'self-study';
    else if (hash === '#/learning') targetScreen = 'learning-catalogue';
    else if (hash === '#/profile') targetScreen = 'profile';

    if (targetScreen) {
      AriseState.currentScreen = targetScreen;
    }

    this.enforceRouteGuard();
  }
};

// Initialize auth module on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    AriseAuth.init();
  });
}
