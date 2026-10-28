const fs = require('fs');
const vm = require('vm');

function runTest() {
  console.log('=== TEST: LOGIN -> SOLVE DSA -> LOGOUT -> RE-LOGIN PERSISTENCE ===\n');

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
    window: {
      location: { hash: '#/', pathname: '/' },
      history: {
        pushState: () => {},
        replaceState: () => {}
      },
      addEventListener: () => {}
    },
    document: {
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    setTimeout: (fn) => fn(),
    showToast: (msg, type) => {
      console.log(`  [Toast ${type}]: ${msg}`);
    }
  };
  context.window.localStorage = localStorage;
  context.globalThis = context;

  vm.createContext(context);

  // Load files in order
  const dataJs = fs.readFileSync('js/data.js', 'utf8');
  vm.runInContext(dataJs, context);

  const stateJs = fs.readFileSync('js/state.js', 'utf8');
  vm.runInContext(stateJs, context);

  const authJs = fs.readFileSync('js/auth.js', 'utf8');
  vm.runInContext(authJs, context);

  const judgeEngineJs = fs.readFileSync('js/judge-engine.js', 'utf8');
  vm.runInContext(judgeEngineJs, context);

  const dsaJs = fs.readFileSync('js/screens/dsa.js', 'utf8');
  vm.runInContext(dsaJs, context);

  const ARISE_DATA = context.ARISE_DATA || context.window.ARISE_DATA;
  const AriseState = context.AriseState || context.window.AriseState;
  const AriseAuth = context.AriseAuth || context.window.AriseAuth;

  // STEP 1: Verify Initial Guest State
  console.log('1. Checking Initial Unauthenticated State:');
  AriseAuth.init();
  const guest = ARISE_DATA.currentUser;
  console.log('   UID:', guest.uid, '(Expected: AR-UNAUTHENTICATED)');
  console.log('   Display Name:', guest.displayName, '(Expected: Guest Learner)');
  console.log('   Verified XP:', guest.verifiedXp, '(Expected: 0)');
  console.log('   Solved Count:', guest.solvedStats.total, '(Expected: 0)');
  console.log('   Problems Solved in Array:', ARISE_DATA.problems.filter(p => p.status === 'Solved').length, '(Expected: 0)');
  if (guest.verifiedXp !== 0 || guest.solvedStats.total !== 0 || guest.uid !== 'AR-UNAUTHENTICATED') {
    throw new Error('Initial guest state check failed!');
  }
  console.log('   -> Initial guest state verified clean.\n');

  // STEP 2: Student Logs In (Clean Account with 0 XP)
  console.log('2. Student signs in with clean account:');
  const studentProfile = {
    uid: "AR-TESTSTUDENT",
    name: "Aakash Patel",
    display_name: "Aakash Patel",
    college_name: "VJTI Mumbai",
    district_name: "Mumbai",
    state_code: "Maharashtra",
    verified_xp: 0,
    solved_count: 0,
    practice_count: 0
  };
  AriseAuth.setSession({ access_token: "mock-token-123", user: studentProfile }, studentProfile);

  console.log('   Logged In User:', ARISE_DATA.currentUser.displayName);
  console.log('   UID:', ARISE_DATA.currentUser.uid);
  console.log('   Verified XP:', ARISE_DATA.currentUser.verifiedXp, '(Expected: 0)');
  console.log('   Solved Count:', ARISE_DATA.currentUser.solvedStats.total, '(Expected: 0)');
  if (ARISE_DATA.currentUser.verifiedXp !== 0 || ARISE_DATA.currentUser.solvedStats.total !== 0) {
    throw new Error('Clean student initial state failed!');
  }
  console.log('   -> Student logged in with 0 XP.\n');

  // STEP 3: Student Solves Question 1 (Two Sum - Easy - 40 XP)
  console.log('3. Student solves Problem 1 (ARISE-P101 Two Sum):');
  const prob1 = ARISE_DATA.problems[0]; // Two Sum
  context.handleJudgeEvaluationResult({
    status: 'accepted',
    totalCases: 3,
    runtime: '4 ms',
    memory: '11.4 MB',
    verifiedXp: 40,
    message: 'Accepted'
  }, prob1, 'javascript');

  console.log('   Verified XP after P1:', ARISE_DATA.currentUser.verifiedXp, '(Expected: 40)');
  console.log('   Solved count after P1:', ARISE_DATA.currentUser.solvedStats.total, '(Expected: 1)');
  console.log('   Easy count after P1:', ARISE_DATA.currentUser.solvedStats.easy, '(Expected: 1)');
  console.log('   Problem 1 status:', prob1.status, '(Expected: Solved)');
  if (ARISE_DATA.currentUser.verifiedXp !== 40 || ARISE_DATA.currentUser.solvedStats.total !== 1) {
    throw new Error('Problem 1 solve failed!');
  }
  console.log('   -> Problem 1 solved correctly.\n');

  // STEP 4: Student Solves Question 2 (Add Two Numbers - Medium - 50 XP)
  console.log('4. Student solves Problem 2 (ARISE-P102 Add Two Numbers):');
  const prob2 = ARISE_DATA.problems[1]; // Add Two Numbers
  context.handleJudgeEvaluationResult({
    status: 'accepted',
    totalCases: 3,
    runtime: '6 ms',
    memory: '12.0 MB',
    verifiedXp: 50,
    message: 'Accepted'
  }, prob2, 'javascript');

  console.log('   Verified XP after P2:', ARISE_DATA.currentUser.verifiedXp, '(Expected: 90)');
  console.log('   Solved count after P2:', ARISE_DATA.currentUser.solvedStats.total, '(Expected: 2)');
  console.log('   Medium count after P2:', ARISE_DATA.currentUser.solvedStats.medium, '(Expected: 1)');
  console.log('   Problem 2 status:', prob2.status, '(Expected: Solved)');
  if (ARISE_DATA.currentUser.verifiedXp !== 90 || ARISE_DATA.currentUser.solvedStats.total !== 2) {
    throw new Error('Problem 2 solve failed!');
  }
  console.log('   -> Problem 2 solved correctly.\n');

  // STEP 5: Student Logs Out
  console.log('5. Student logs out (AriseAuth.signOut()):');
  AriseAuth.signOut();

  const loggedOutUser = ARISE_DATA.currentUser;
  console.log('   Current User UID:', loggedOutUser.uid, '(Expected: AR-UNAUTHENTICATED)');
  console.log('   Current User Display Name:', loggedOutUser.displayName, '(Expected: Guest Learner)');
  console.log('   Current User Verified XP:', loggedOutUser.verifiedXp, '(Expected: 0)');
  console.log('   Current User Solved Count:', loggedOutUser.solvedStats.total, '(Expected: 0)');
  console.log('   Active localStorage arise_verified_xp:', localStorage.getItem('arise_verified_xp'), '(Expected: null)');
  console.log('   Active localStorage arise_solved_stats:', localStorage.getItem('arise_solved_stats'), '(Expected: null)');
  console.log('   Problems Solved in Array after logout:', ARISE_DATA.problems.filter(p => p.status === 'Solved').length, '(Expected: 0)');

  if (loggedOutUser.verifiedXp !== 0 || loggedOutUser.solvedStats.total !== 0 || loggedOutUser.uid !== 'AR-UNAUTHENTICATED') {
    throw new Error('Logout failed! Score or solved questions leaked after logout!');
  }
  if (localStorage.getItem('arise_verified_xp') !== null || localStorage.getItem('arise_solved_stats') !== null) {
    throw new Error('Active localStorage keys not cleared on logout!');
  }
  if (ARISE_DATA.problems.filter(p => p.status === 'Solved').length !== 0) {
    throw new Error('Problems status not reset to Unsolved on logout!');
  }
  console.log('   -> Logout cleanly wiped all scores, solved stats, and active storage!\n');

  // STEP 6: Student Logs Back In
  console.log('6. Student logs back in with the same account:');
  AriseAuth.setSession({ access_token: "mock-token-456", user: studentProfile }, studentProfile);

  console.log('   Logged In User:', ARISE_DATA.currentUser.displayName);
  console.log('   UID:', ARISE_DATA.currentUser.uid);
  console.log('   Restored Verified XP:', ARISE_DATA.currentUser.verifiedXp, '(Expected: 90)');
  console.log('   Restored Solved Count:', ARISE_DATA.currentUser.solvedStats.total, '(Expected: 2)');
  console.log('   Prob 1 status:', prob1.status, '(Expected: Solved)');
  console.log('   Prob 2 status:', prob2.status, '(Expected: Solved)');
  console.log('   Prob 3 status:', ARISE_DATA.problems[2].status, '(Expected: Unsolved)');

  if (ARISE_DATA.currentUser.verifiedXp !== 90 || ARISE_DATA.currentUser.solvedStats.total !== 2) {
    throw new Error(`Re-login persistence failed! Got XP: ${ARISE_DATA.currentUser.verifiedXp}, Solved: ${ARISE_DATA.currentUser.solvedStats.total}`);
  }
  if (prob1.status !== 'Solved' || prob2.status !== 'Solved') {
    throw new Error('Solved problems were not restored on re-login!');
  }
  console.log('   -> Progress cleanly restored! Solves were NOT overwritten by 148 fake problems.\n');

  // STEP 7: Another user signs in (clean user)
  console.log('7. Another user logs in (brand new learner):');
  AriseAuth.signOut();
  const newUserProfile = {
    uid: "AR-NEWSTUDENT99",
    name: "Pooja Hegde",
    display_name: "Pooja Hegde",
    college_name: "COEP",
    district_name: "Pune",
    state_code: "Maharashtra",
    verified_xp: 0,
    solved_count: 0,
    practice_count: 0
  };
  AriseAuth.setSession({ access_token: "mock-token-789", user: newUserProfile }, newUserProfile);
  console.log('   New User Verified XP:', ARISE_DATA.currentUser.verifiedXp, '(Expected: 0)');
  console.log('   New User Solved Count:', ARISE_DATA.currentUser.solvedStats.total, '(Expected: 0)');
  console.log('   Problems Solved for New User:', ARISE_DATA.problems.filter(p => p.status === 'Solved').length, '(Expected: 0)');

  if (ARISE_DATA.currentUser.verifiedXp !== 0 || ARISE_DATA.currentUser.solvedStats.total !== 0) {
    throw new Error('New user wrongly inherited previous user data!');
  }
  console.log('   -> New user account is completely isolated and has 0 XP.\n');

  console.log('🎉 ALL INTEGRATION TESTS PASSED 100%! THE BUG IS FULLY FIXED!');
}

runTest();
