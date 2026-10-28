const fs = require('fs');
const vm = require('vm');

function runTest() {
  console.log('=== TESTING DSA 148 BASELINE & INCREMENT FLOW ===\n');

  // Create simulated browser environment
  const mockStorage = {};
  const localStorage = {
    getItem: (k) => (k in mockStorage ? mockStorage[k] : null),
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; },
    clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
  };

  const context = {
    console,
    localStorage,
    window: {},
    document: {
      getElementById: () => null,
      querySelectorAll: () => []
    },
    setTimeout: (fn, ms) => fn(), // execute synchronously in test
    showToast: (msg, type) => {
      console.log(`  [Toast ${type}]: ${msg}`);
    }
  };
  context.window = context;
  context.globalThis = context;

  vm.createContext(context);

  // Load js/data.js
  const dataJs = fs.readFileSync('js/data.js', 'utf8');
  vm.runInContext(dataJs, context);

  // Load js/state.js
  const stateJs = fs.readFileSync('js/state.js', 'utf8');
  vm.runInContext(stateJs, context);

  // Load js/judge-engine.js
  const judgeEngineJs = fs.readFileSync('js/judge-engine.js', 'utf8');
  vm.runInContext(judgeEngineJs, context);

  // Load js/screens/dsa.js
  const dsaJs = fs.readFileSync('js/screens/dsa.js', 'utf8');
  vm.runInContext(dsaJs, context);

  const { ARISE_DATA, AriseState } = context;
  ARISE_DATA.currentUser = Object.assign({}, ARISE_DATA.demoUser);
  context.syncProblemStatuses();

  // 1. Initial State Check
  console.log('1. Checking Initial Baseline State:');
  const user = ARISE_DATA.currentUser;
  console.log('   Total Solved:', user.solvedStats.total, '(Expected: 148)');
  console.log('   Easy:', user.solvedStats.easy, 'Medium:', user.solvedStats.medium, 'Hard:', user.solvedStats.hard);
  console.log('   Verified XP:', user.verifiedXp, '(Expected: 10540)');
  console.log('   Problem 148 (ARISE-P248) Status:', ARISE_DATA.problems[147].status, '(Expected: Solved)');
  console.log('   Problem 149 (ARISE-P249) Status:', ARISE_DATA.problems[148].status, '(Expected: Unsolved)');

  if (user.solvedStats.total !== 148 || user.verifiedXp !== 10540) {
    throw new Error(`Baseline failed! Total: ${user.solvedStats.total}, XP: ${user.verifiedXp}`);
  }

  // 2. Solve problem 149 (ARISE-P249 - Palindrome Linked List)
  console.log('\n2. Submitting unsolved question ARISE-P249:');
  const prob249 = ARISE_DATA.problems[148]; // ARISE-P249
  let navigatedScreen = null;
  AriseState.setScreen = (s) => {
    navigatedScreen = s;
    console.log(`   -> AriseState.setScreen called with: '${s}'`);
  };

  context.handleJudgeEvaluationResult({
    status: 'accepted',
    totalCases: 3,
    runtime: '4 ms',
    memory: '11.4 MB',
    verifiedXp: prob249.verifiedXp || 40,
    message: 'Accepted'
  }, prob249, 'javascript');

  console.log('   Total Solved after solve:', user.solvedStats.total, '(Expected: 149)');
  console.log('   Easy Solved after solve:', user.solvedStats.easy, '(Expected: 41)');
  console.log('   Verified XP after solve:', user.verifiedXp, '(Expected: 10580)');
  console.log('   Prob 249 status:', prob249.status, '(Expected: Solved)');
  console.log('   Navigated screen:', navigatedScreen, '(Expected: dsa-problems)');

  if (user.solvedStats.total !== 149 || user.verifiedXp !== 10580 || navigatedScreen !== 'dsa-problems') {
    throw new Error('Unsolved question solve failed!');
  }

  // 3. Repeat Submit on the SAME question ARISE-P249 (Practice)
  console.log('\n3. Re-submitting already solved question ARISE-P249:');
  navigatedScreen = null;
  context.handleJudgeEvaluationResult({
    status: 'accepted',
    totalCases: 3,
    runtime: '3 ms',
    memory: '11.2 MB',
    verifiedXp: prob249.verifiedXp || 40,
    message: 'Accepted'
  }, prob249, 'javascript');

  console.log('   Total Solved after repeat solve:', user.solvedStats.total, '(Expected: 149 - MUST NOT INCREMENT)');
  console.log('   Verified XP after repeat solve:', user.verifiedXp, '(Expected: 10580 - MUST NOT INCREMENT)');
  console.log('   Navigated screen:', navigatedScreen, '(Expected: dsa-problems)');

  if (user.solvedStats.total !== 149 || user.verifiedXp !== 10580 || navigatedScreen !== 'dsa-problems') {
    throw new Error('Repeat solve failed! Total or XP was wrongly credited!');
  }

  // 4. Submit a baseline solved question ARISE-P101 (Two Sum)
  console.log('\n4. Re-submitting baseline solved question ARISE-P101 (Two Sum):');
  const prob101 = ARISE_DATA.problems[0]; // Two sum
  navigatedScreen = null;
  context.handleJudgeEvaluationResult({
    status: 'accepted',
    totalCases: 3,
    runtime: '2 ms',
    memory: '11.0 MB',
    verifiedXp: prob101.verifiedXp || 40,
    message: 'Accepted'
  }, prob101, 'javascript');

  console.log('   Total Solved after Two Sum practice:', user.solvedStats.total, '(Expected: 149)');
  console.log('   Verified XP after Two Sum practice:', user.verifiedXp, '(Expected: 10580)');

  if (user.solvedStats.total !== 149 || user.verifiedXp !== 10580) {
    throw new Error('Baseline question repeat solve failed!');
  }

  // 5. Submit next unsolved question ARISE-P250
  console.log('\n5. Submitting second unsolved question ARISE-P250:');
  const prob250 = ARISE_DATA.problems[149]; // ARISE-P250
  navigatedScreen = null;
  context.handleJudgeEvaluationResult({
    status: 'accepted',
    totalCases: 3,
    runtime: '4 ms',
    memory: '11.3 MB',
    verifiedXp: prob250.verifiedXp || 40,
    message: 'Accepted'
  }, prob250, 'javascript');

  console.log('   Total Solved after ARISE-P250:', user.solvedStats.total, '(Expected: 150)');
  console.log('   Verified XP after ARISE-P250:', user.verifiedXp, '(Expected: 10620)');
  console.log('   Prob 250 status:', prob250.status, '(Expected: Solved)');

  if (user.solvedStats.total !== 150 || user.verifiedXp !== 10620) {
    throw new Error('Second unsolved solve failed!');
  }

  // 6. Simulate Page Reload / New Session Persistence
  console.log('\n6. Simulating Page Reload / syncProblemStatuses():');
  context.syncProblemStatuses();
  console.log('   Total Solved after reload:', user.solvedStats.total, '(Expected: 150)');
  console.log('   Verified XP after reload:', user.verifiedXp, '(Expected: 10620)');
  console.log('   Solved count in problems array:', ARISE_DATA.problems.filter(p => p.status === 'Solved').length, '(Expected: 150)');
  console.log('   Unsolved count in problems array:', ARISE_DATA.problems.filter(p => p.status === 'Unsolved').length, '(Expected: 10)');

  if (user.solvedStats.total !== 150 || user.verifiedXp !== 10620) {
    throw new Error('Persistence after reload failed!');
  }

  console.log('\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

runTest();
