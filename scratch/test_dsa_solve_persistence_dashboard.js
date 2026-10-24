const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('=== TESTING DSA SOLVE PERSISTENCE, XP AWARD, AND DASHBOARD UPDATES ===\n');

// Mock browser localStorage
const mockStorage = {
  _data: {},
  getItem(k) { return this._data[k] !== undefined ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
  clear() { this._data = {}; }
};

function createBrowserEnv(storage) {
  const dom = {
    elements: {},
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: id => {
      if (!dom.elements[id]) dom.elements[id] = { value: '', style: {} };
      return dom.elements[id];
    }
  };

  const sandbox = {
    window: {},
    document: dom,
    console: console,
    performance: performance,
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    showToast: (msg, type) => {},
    escapeHtml: s => String(s),
    localStorage: storage
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  function runFile(p) {
    let c = fs.readFileSync(p, 'utf8');
    if (p.includes('data.js')) c += '\n; globalThis.ARISE_DATA = ARISE_DATA;';
    if (p.includes('state.js')) c += '\n; globalThis.AriseState = AriseState;';
    if (p.includes('judge-engine.js')) c += '\n; globalThis.AriseJudgeEngine = AriseJudgeEngine;';
    vm.runInContext(c, sandbox);
  }

  runFile('d:/ARISE/js/data.js');
  runFile('d:/ARISE/js/state.js');
  runFile('d:/ARISE/js/auth.js');
  runFile('d:/ARISE/js/screens/overview.js');
  runFile('d:/ARISE/js/judge-engine.js');
  runFile('d:/ARISE/js/screens/dsa.js');
  runFile('d:/ARISE/js/app.js');

  return sandbox;
}

// --------------------------------------------------------------------------
// TEST 1: Initial clean state
// --------------------------------------------------------------------------
console.log('--- TEST 1: Verify initial state ---');
const env1 = createBrowserEnv(mockStorage);
assert.strictEqual(env1.ARISE_DATA.currentUser.verifiedXp, 0, 'Initial XP should be 0');
assert.strictEqual(env1.ARISE_DATA.currentUser.solvedStats.total, 0, 'Initial solved should be 0');

const p249_initial = env1.ARISE_DATA.problems.find(p => p.id === 'ARISE-P249');
assert.strictEqual(p249_initial.status, 'Unsolved', 'Problem ARISE-P249 should initially be Unsolved');

let dash1 = env1.renderOverviewDashboard();
assert(dash1.includes('0 <span style="font-size: 20px; font-weight: 600; color: #A78BFA;">XP</span>'), 'Dashboard should show 0 XP');
assert(dash1.includes('Unranked'), 'Dashboard should show Unranked');
console.log('✓ Initial clean state verified!');

// --------------------------------------------------------------------------
// TEST 2: Submit correct C++ solution to ARISE-P249 (Palindrome Linked List)
// --------------------------------------------------------------------------
console.log('\n--- TEST 2: Submit correct solution to ARISE-P249 ---');
env1.AriseState.activeProblem = p249_initial;
env1.AriseState.activeLanguage = 'cpp';
env1.document.getElementById('code-editor-input').value = `
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        vector<int> vals;
        ListNode* curr = head;
        while (curr != nullptr) {
            vals.push_back(curr->val);
            curr = curr->next;
        }
        int left = 0;
        int right = (int)vals.size() - 1;
        while (left < right) {
            if (vals[left] != vals[right]) return false;
            left++;
            right--;
        }
        return true;
    }
};
`;

env1.submitSolutionToJudge();

assert.strictEqual(env1.AriseState.judgeStatus, 'accepted', 'Judge status should be accepted');
assert.strictEqual(p249_initial.status, 'Solved', 'Problem status should now be Solved');
assert.strictEqual(env1.ARISE_DATA.currentUser.verifiedXp, 40, 'User XP should be 40');
assert.strictEqual(env1.ARISE_DATA.currentUser.solvedStats.total, 1, 'Total solved should be 1');

// Check dashboard immediately
let dash2 = env1.renderOverviewDashboard();
assert(dash2.includes('40 <span style="font-size: 20px; font-weight: 600; color: #A78BFA;">XP</span>'), 'Dashboard should immediately show 40 XP');
assert(dash2.includes('Palindrome Linked List (LeetCode #234)'), 'Dashboard recent solves should show problem title');
console.log('✓ Problem solved, 40 XP awarded, and dashboard updated immediately!');

// --------------------------------------------------------------------------
// TEST 3: Simulate browser reload / page refresh
// --------------------------------------------------------------------------
console.log('\n--- TEST 3: Reload page and verify permanent persistence ---');
const env2 = createBrowserEnv(mockStorage);

const p249_reloaded = env2.ARISE_DATA.problems.find(p => p.id === 'ARISE-P249');
assert.strictEqual(p249_reloaded.status, 'Solved', 'Problem ARISE-P249 should still be Solved after reload');
assert.strictEqual(env2.ARISE_DATA.currentUser.verifiedXp, 40, 'User XP should still be 40 after reload');
assert.strictEqual(env2.ARISE_DATA.currentUser.solvedStats.total, 1, 'Total solved should still be 1 after reload');

let dash3 = env2.renderOverviewDashboard();
assert(dash3.includes('40 <span style="font-size: 20px; font-weight: 600; color: #A78BFA;">XP</span>'), 'Dashboard should display 40 XP after reload');
console.log('✓ Permanent persistence verified! Solved status and XP remained intact across reload.');

// --------------------------------------------------------------------------
// TEST 4: Submit second problem (ARISE-P101)
// --------------------------------------------------------------------------
console.log('\n--- TEST 4: Submit second problem (ARISE-P101) ---');
const p101 = env2.ARISE_DATA.problems.find(p => p.id === 'ARISE-P101');
env2.AriseState.activeProblem = p101;
env2.AriseState.activeLanguage = 'javascript';
env2.document.getElementById('code-editor-input').value = `
function calibrateSensors(sensorReadings, target) {
    const seen = new Map();
    for (let i = 0; i < sensorReadings.length; i++) {
        const comp = target - sensorReadings[i];
        if (seen.has(comp)) {
            return [seen.get(comp), i];
        }
        seen.set(sensorReadings[i], i);
    }
    return [];
}
`;

env2.submitSolutionToJudge();

assert.strictEqual(env2.AriseState.judgeStatus, 'accepted', 'Second problem should be accepted');
assert.strictEqual(p101.status, 'Solved', 'Problem ARISE-P101 should now be Solved');
assert.strictEqual(env2.ARISE_DATA.currentUser.verifiedXp, 80, 'User XP should now be 80');
assert.strictEqual(env2.ARISE_DATA.currentUser.solvedStats.total, 2, 'Total solved should now be 2');

let dash4 = env2.renderOverviewDashboard();
assert(dash4.includes('80 <span style="font-size: 20px; font-weight: 600; color: #A78BFA;">XP</span>'), 'Dashboard should now show 80 XP');
console.log('✓ Second problem solved, XP reached 80, dashboard updated to 2 solves!');

// --------------------------------------------------------------------------
// TEST 5: Reload again and verify multiple solves persisted
// --------------------------------------------------------------------------
console.log('\n--- TEST 5: Reload again and verify 2 solves persisted ---');
const env3 = createBrowserEnv(mockStorage);
assert.strictEqual(env3.ARISE_DATA.currentUser.verifiedXp, 80, 'User XP should be 80 on fresh reload');
assert.strictEqual(env3.ARISE_DATA.currentUser.solvedStats.total, 2, 'Total solved should be 2 on fresh reload');
assert.strictEqual(env3.ARISE_DATA.problems.find(p => p.id === 'ARISE-P249').status, 'Solved');
assert.strictEqual(env3.ARISE_DATA.problems.find(p => p.id === 'ARISE-P101').status, 'Solved');

let dash5 = env3.renderOverviewDashboard();
assert(dash5.includes('80 <span style="font-size: 20px; font-weight: 600; color: #A78BFA;">XP</span>'), 'Dashboard shows 80 XP');
console.log('✓ All solves permanently persisted!');

console.log('\n======================================================');
console.log('ALL DSA SOLVE, XP, AND PERSISTENCE TESTS PASSED 100%!');
console.log('======================================================');
