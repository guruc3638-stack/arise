// Automated Frontend Auth & Route Guard Verification Script
// Simulates DOM and browser environment to verify Phase 1 requirements

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
global.window = {
  location: { hash: '#/dashboard', pathname: '/dashboard' },
  history: {
    stateUrl: '#/dashboard',
    pushState(state, title, url) { this.stateUrl = url; },
    replaceState(state, title, url) { this.stateUrl = url; }
  },
  addEventListener(event, fn) {
    if (!this._listeners) this._listeners = {};
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  },
  triggerEvent(event) {
    if (this._listeners && this._listeners[event]) {
      this._listeners[event].forEach(fn => fn());
    }
  },
  scrollTo() {}
};
global.document = {
  addEventListener() {},
  getElementById(id) {
    return {
      style: {},
      innerHTML: '',
      textContent: '',
      value: '',
      checked: true,
      disabled: false,
      classList: { remove() {}, add() {} }
    };
  }
};

const fs = require('fs');
const vm = require('vm');

console.log("=== RUNNING FRONTEND AUTH & ROUTE GUARD SUITE ===");

// 1. Verify index.html includes necessary scripts in correct dependency order
const indexHtml = fs.readFileSync('d:/ARISE/index.html', 'utf8');
const scriptOrder = [];
const scriptRegex = /<script src="([^"]+)"><\/script>/g;
let match;
while ((match = scriptRegex.exec(indexHtml)) !== null) {
  scriptOrder.push(match[1]);
}

console.log("Scripts loaded in index.html:", scriptOrder);
const supaIdx = scriptOrder.findIndex(s => s.includes('supabase-js'));
const authIdx = scriptOrder.findIndex(s => s.includes('js/auth.js'));
const appIdx = scriptOrder.findIndex(s => s.includes('js/app.js'));

if (supaIdx === -1 || authIdx === -1 || appIdx === -1) {
  console.error("FAIL: Missing essential auth scripts in index.html");
  process.exit(1);
}
if (!(supaIdx < authIdx && authIdx < appIdx)) {
  console.error("FAIL: Scripts not in correct dependency order (supabase-js < auth.js < app.js)");
  process.exit(1);
}
console.log("✓ TEST PASSED: Script tags properly configured in index.html in correct order");

// 2. Load and evaluate data.js, state.js, auth.js, landing-auth.js, overview.js, profile.js
vm.runInThisContext(fs.readFileSync('d:/ARISE/js/data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('d:/ARISE/js/state.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('d:/ARISE/js/auth.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('d:/ARISE/js/screens/landing-auth.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('d:/ARISE/js/screens/overview.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('d:/ARISE/js/screens/profile.js', 'utf8'));

// Initialize AriseAuth module
AriseAuth.init();

// 3. Test Unauthenticated Access Guard
console.log("\n--- Testing Route Protection Guard ---");
AriseAuth.clearLocalSession();
if (AriseAuth.isAuthenticated()) {
  console.error("FAIL: Fresh state should not be authenticated");
  process.exit(1);
}
console.log("✓ Initial state: Unauthenticated");

// Try to access /dashboard (overview)
AriseState.currentScreen = 'overview';
const guardResult = AriseAuth.enforceRouteGuard();
if (guardResult !== false || AriseState.currentScreen !== 'login') {
  console.error(`FAIL: Unauthenticated visit to overview must redirect to login, got ${AriseState.currentScreen}`);
  process.exit(1);
}
console.log("✓ TEST PASSED: Unauthenticated user visiting /dashboard is redirected to /login");

// Try to access other protected routes
const testProtected = ['leaderboard', 'dsa-problems', 'self-study', 'learning-catalogue', 'profile'];
for (const screen of testProtected) {
  AriseState.currentScreen = screen;
  AriseAuth.enforceRouteGuard();
  if (AriseState.currentScreen !== 'login') {
    console.error(`FAIL: Access to protected screen ${screen} was not blocked!`);
    process.exit(1);
  }
}
console.log(`✓ TEST PASSED: All protected routes (${testProtected.join(', ')}) redirect unauthenticated visitors to /login`);

// 4. Test Client-Side Validation
console.log("\n--- Testing Client-Side Validation ---");
if (AriseAuth.validateEmail("bademail") !== false) {
  console.error("FAIL: validateEmail('bademail') should be false");
  process.exit(1);
}
if (AriseAuth.validateEmail("student@coep.ac.in") !== true) {
  console.error("FAIL: validateEmail('student@coep.ac.in') should be true");
  process.exit(1);
}
if (AriseAuth.validatePassword("short") !== false) {
  console.error("FAIL: validatePassword('short') should be false (min 8 chars)");
  process.exit(1);
}
if (AriseAuth.validatePassword("SecurePass123!") !== true) {
  console.error("FAIL: validatePassword('SecurePass123!') should be true");
  process.exit(1);
}
console.log("✓ TEST PASSED: Email format and min 8 character password validation confirmed");

// 5. Test Authenticated Session and Clean Accounts
console.log("\n--- Testing Clean New Account Display (Rule 4) ---");
const mockCleanUser = {
  user_id: "user-clean-uuid-001",
  uid: "AR-CLEAN01",
  display_name: "Clean Demo Learner",
  college_name: "VJTI Mumbai",
  district_name: "Mumbai",
  state_code: "MH",
  verified_xp: 0,
  solved_count: 0,
  practice_count: 0,
  completed_courses_count: 0,
  rank_state: null,
  rank_display: "Unranked"
};

AriseAuth.setSession({ access_token: "mock-jwt-clean-token", token_type: "bearer" }, mockCleanUser);

if (!AriseAuth.isAuthenticated()) {
  console.error("FAIL: Should be authenticated after setSession");
  process.exit(1);
}

// Logged-in user opening /login should redirect to Dashboard
AriseState.currentScreen = 'login';
AriseAuth.enforceRouteGuard();
if (AriseState.currentScreen !== 'overview') {
  console.error(`FAIL: Logged-in user visiting /login must redirect to overview, got ${AriseState.currentScreen}`);
  process.exit(1);
}
console.log("✓ TEST PASSED: Logged-in user opening /login is redirected to Dashboard (overview)");

// Check clean metrics in ARISE_DATA.currentUser
if (ARISE_DATA.currentUser.verifiedXp !== 0) {
  console.error(`FAIL: Clean account must have 0 verified XP, got ${ARISE_DATA.currentUser.verifiedXp}`);
  process.exit(1);
}
if (ARISE_DATA.currentUser.rankDisplay !== "Unranked") {
  console.error(`FAIL: Clean account must show 'Unranked', got ${ARISE_DATA.currentUser.rankDisplay}`);
  process.exit(1);
}
if (ARISE_DATA.currentUser.solvedStats.total !== 0) {
  console.error(`FAIL: Clean account must show 0 solved problems, got ${ARISE_DATA.currentUser.solvedStats.total}`);
  process.exit(1);
}
console.log("✓ TEST PASSED: Clean user data structure reflects 0 XP, 0 Solved, and 'Unranked'");

// Check renderOverviewDashboard output for clean account
const overviewHtml = renderOverviewDashboard();
if (!overviewHtml.includes("Unranked")) {
  console.error("FAIL: Overview dashboard does not display 'Unranked' for clean account");
  process.exit(1);
}
if (!overviewHtml.includes("0 XP")) {
  console.error("FAIL: Overview dashboard does not display '0 XP' for clean account");
  process.exit(1);
}
if (!overviewHtml.includes("No problems solved yet")) {
  console.error("FAIL: Overview dashboard does not display empty state 'No problems solved yet'");
  process.exit(1);
}
if (!overviewHtml.includes("No badges earned yet")) {
  console.error("FAIL: Overview dashboard does not display clean empty badges state");
  process.exit(1);
}
console.log("✓ TEST PASSED: Overview Dashboard renders 'Unranked', '0 XP', and proper empty states ('No problems solved yet')");

// Check renderProfileView output for clean account
const profileHtml = renderProfileView();
if (!profileHtml.includes("Unranked")) {
  console.error("FAIL: Profile view does not display 'Unranked' for clean account");
  process.exit(1);
}
if (!profileHtml.includes("No courses completed yet")) {
  console.error("FAIL: Profile view does not display empty state 'No courses completed yet'");
  process.exit(1);
}
if (!profileHtml.includes("No milestone badges unlocked")) {
  console.error("FAIL: Profile view does not display empty state 'No milestone badges unlocked'");
  process.exit(1);
}
console.log("✓ TEST PASSED: Profile View renders 'Unranked' and proper clean empty states");

// 6. Test Logout and Back Button Protection (Rule 3)
console.log("\n--- Testing Logout & Back Button Protection ---");
AriseAuth.signOut();

if (AriseAuth.isAuthenticated()) {
  console.error("FAIL: User should not be authenticated after signOut");
  process.exit(1);
}
if (localStorage.getItem('arise_session') !== null || localStorage.getItem('arise_token') !== null) {
  console.error("FAIL: Session tokens not cleared from localStorage");
  process.exit(1);
}
if (AriseState.currentScreen !== 'login') {
  console.error(`FAIL: After signOut screen must be 'login', got ${AriseState.currentScreen}`);
  process.exit(1);
}
console.log("✓ TEST PASSED: Logout clears session, storage, and redirects to /login");

// Simulate Browser Back Button click
console.log("Simulating Browser Back Button click to #/dashboard...");
AriseState.currentScreen = 'overview'; // User navigated back in browser history
window.triggerEvent('popstate');

if (AriseState.currentScreen !== 'login') {
  console.error(`FAIL: Browser Back button revealed protected page! Current screen is ${AriseState.currentScreen}`);
  process.exit(1);
}
console.log("✓ TEST PASSED: Back button after logout does not show protected pages; redirects immediately to /login");

console.log("\n==================================================");
console.log("ALL FRONTEND AUTH & CLEAN ACCOUNT TESTS PASSED!");
console.log("==================================================");
