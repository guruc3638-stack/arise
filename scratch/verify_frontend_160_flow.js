const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

// Create mock browser DOM/window environment
const sandbox = {
  window: {},
  document: {
    title: 'ARISE',
    body: { innerHTML: '' },
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; },
    clear() { this.store = {}; }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  performance: { now: () => Date.now() },
  escapeHtml: s => s
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

vm.createContext(sandbox);

// Load js files in order
const files = [
  'js/data.js',
  'js/state.js',
  'js/judge-engine.js',
  'js/auth.js',
  'js/app.js',
  'js/screens/overview.js',
  'js/screens/dsa.js'
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  vm.runInContext(content, sandbox);
}

const data = sandbox.ARISE_DATA;
console.log('✓ All JS scripts evaluated cleanly.');
console.log('✓ Total DSA problems in catalogue:', data.problems.length);
assert.strictEqual(data.problems.length, 160, 'Total problems should be 160');

// Test 1: Clean Account
console.log('\n--- TEST 1: CLEAN ACCOUNT FLOW ---');
sandbox.localStorage.clear();
data.currentUser.uid = 'ARISE-7K2M9Q';
data.currentUser.email = 'rohan@example.com';
data.currentUser.verifiedXp = 0;
data.currentUser.solvedStats = { total: 0, easy: 0, medium: 0, hard: 0 };
sandbox.syncProblemStatuses();

const cleanSolved = data.problems.filter(p => p.status === 'Solved');
const cleanUnsolved = data.problems.filter(p => p.status === 'Unsolved');
console.log(`Clean Account: Solved = ${cleanSolved.length}, Unsolved = ${cleanUnsolved.length}`);
assert.strictEqual(cleanSolved.length, 0);
assert.strictEqual(cleanUnsolved.length, 160);

// Check sidebar badge for clean account
const sidebarCleanHtml = sandbox.renderSidebarNavigation(false, 'overview');
assert(!sidebarCleanHtml.includes('<span class="nav-badge">0</span>'), 'Clean account must not show 0 badge');
console.log('✓ Sidebar DSA badge correctly hidden when 0 solves.');

// Check DSA screen for clean account
const dsaListCleanHtml = sandbox.renderDsaProblemList();
assert(dsaListCleanHtml.includes('All <span class="diff-count">160</span>'), 'Must show All 160 in difficulty filter');
assert(dsaListCleanHtml.includes('Solved: <b style="color: var(--success); font-family: var(--font-mono);">0</b>'), 'Solved must be 0');
assert(dsaListCleanHtml.includes('Unsolved: <b style="color: var(--text-secondary); font-family: var(--font-mono);">160</b>'), 'Unsolved must be 160');
console.log('✓ DSA Problem list shows All 160 problems with 0 solved for clean user.');

// Test 2: Top Ranker (Aarav Sharma / AR-XYZ999 / xyz@gmail.com with 148 solves / 10,540 XP)
console.log('\n--- TEST 2: TOP RANKER FLOW (AARAV SHARMA) ---');
data.currentUser.uid = 'AR-XYZ999';
data.currentUser.email = 'xyz@gmail.com';
data.currentUser.verifiedXp = 10540;
data.currentUser.solvedStats = { total: 148, easy: 40, medium: 50, hard: 58 };
sandbox.syncProblemStatuses();

const aaravSolved = data.problems.filter(p => p.status === 'Solved');
const aaravUnsolved = data.problems.filter(p => p.status === 'Unsolved');
console.log(`Top Ranker: Solved = ${aaravSolved.length}, Unsolved = ${aaravUnsolved.length}`);
assert.strictEqual(aaravSolved.length, 148);
assert.strictEqual(aaravUnsolved.length, 12);
assert.strictEqual(data.currentUser.solvedStats.total, 148);

// Verify XP calculation strictly matches solved problems
const totalAwardedXp = aaravSolved.reduce((sum, p) => sum + p.verifiedXp, 0);
console.log(`Top Ranker Solved Problems XP Sum = ${totalAwardedXp} XP (Expected: 10,540 XP)`);
assert.strictEqual(totalAwardedXp, 10540);
assert.strictEqual(data.currentUser.verifiedXp, 10540);
console.log('✓ Solved problems XP matches exact 10,540 XP!');

// Check sidebar badge for top ranker
const sidebarTopHtml = sandbox.renderSidebarNavigation(false, 'dsa');
assert(sidebarTopHtml.includes('<span class="nav-badge">148</span>'), 'Top ranker sidebar must show badge 148');
console.log('✓ Sidebar DSA badge shows 148!');

// Check DSA screen for top ranker
const dsaListTopHtml = sandbox.renderDsaProblemList();
assert(dsaListTopHtml.includes('All <span class="diff-count">160</span>'), 'Problem list shows All 160');
assert(dsaListTopHtml.includes('Solved: <b style="color: var(--success); font-family: var(--font-mono);">148</b>'), 'Shows Solved: 148');
assert(dsaListTopHtml.includes('Unsolved: <b style="color: var(--text-secondary); font-family: var(--font-mono);">12</b>'), 'Shows Unsolved: 12');
console.log('✓ DSA Problem list shows All 160 with 148 Solved and 12 Unsolved!');

// Test 3: Overview Screen Progress
console.log('\n--- TEST 3: OVERVIEW PROGRESS ---');
const overviewHtml = sandbox.renderOverviewDashboard();
assert(overviewHtml.includes('93%'), 'Overview overall progress must show 93% (148/160)');
assert(overviewHtml.includes('148'), 'Overview must show 148 solved');
console.log('✓ Overview shows 93% progress and 148 solved problems!');

console.log('\n========================================');
console.log('ALL VERIFICATION TESTS PASSED PERFECTLY!');
console.log('========================================');
