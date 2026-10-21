const fs = require('fs');
const vm = require('vm');

console.log('=== TESTING DSA TOPIC MASTERY: ZERO INITIALLY & DYNAMIC UPDATE ON SOLVE ===\n');

// 1. Setup DOM / Browser Mock
const dom = {
  elements: {},
  addEventListener: function() {},
  removeEventListener: function() {},
  getElementById: function(id) {
    if (!this.elements[id]) {
      this.elements[id] = { value: '', style: {} };
    }
    return this.elements[id];
  }
};

const toasts = [];
const sandbox = {
  window: {},
  document: dom,
  console: console,
  performance: performance,
  setTimeout: function(fn, ms) { fn(); },
  showToast: function(msg, type) { toasts.push({ msg, type }); },
  escapeHtml: function(s) { return String(s); },
  localStorage: {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  }
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

vm.createContext(sandbox);

function runFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  if (filePath.includes('data.js')) code += '\n; globalThis.ARISE_DATA = ARISE_DATA;';
  if (filePath.includes('state.js')) code += '\n; globalThis.AriseState = AriseState;';
  if (filePath.includes('judge-engine.js')) code += '\n; globalThis.AriseJudgeEngine = AriseJudgeEngine;';
  vm.runInContext(code, sandbox);
}

runFile('d:/ARISE/js/data.js');
runFile('d:/ARISE/js/state.js');
runFile('d:/ARISE/js/auth.js');
runFile('d:/ARISE/js/screens/overview.js');
runFile('d:/ARISE/js/judge-engine.js');
runFile('d:/ARISE/js/screens/dsa.js');
runFile('d:/ARISE/js/app.js');

console.log('✓ All frontend scripts loaded into VM context.');

// STEP 1: Verify Initial State (ALL 17 TOPICS MUST BE 0 SOLVED)
console.log('\n--- STEP 1: VERIFY INITIAL TOPIC MASTERY (ALL TOPICS 0 SOLVED) ---');
const topics = sandbox.ARISE_DATA.topics;
if (topics.length !== 17) {
  console.error(`FAIL: Expected 17 topics, got ${topics.length}`);
  process.exit(1);
}

topics.forEach(t => {
  const count = sandbox.getTopicSolvedCount(t);
  if (count !== 0) {
    console.error(`FAIL: Topic '${t.name}' must have 0 initial solved, got ${count}`);
    process.exit(1);
  }
});
console.log('✓ All 17 topics have getTopicSolvedCount(t) === 0 initially.');

// Render DSA Topic Explorer HTML
const initialExplorerHtml = sandbox.renderDsaTopicExplorer();
if (!initialExplorerHtml.includes('Solved: <b style="color: var(--text-primary); font-family: var(--font-mono);">0</b> / 42')) {
  console.error('FAIL: Arrays topic card did not render "Solved: 0 / 42"');
  process.exit(1);
}
if (!initialExplorerHtml.includes('Solved: <b style="color: var(--text-primary); font-family: var(--font-mono);">0</b> / 36')) {
  console.error('FAIL: Strings topic card did not render "Solved: 0 / 36"');
  process.exit(1);
}
// Progress bars must be width: 0%
const width0Matches = initialExplorerHtml.match(/style="width: 0%;"/g);
if (!width0Matches || width0Matches.length < 17) {
  console.error(`FAIL: Expected at least 17 progress bars with width: 0%, got ${width0Matches ? width0Matches.length : 0}`);
  process.exit(1);
}
console.log('✓ renderDsaTopicExplorer renders all 17 topic cards with Solved: 0 / <total> and 0% progress bars.');

// Verify Sidebar Navigation initially does NOT show numbers
const initialSidebarHtml = sandbox.renderSidebarNavigation();
if (initialSidebarHtml.includes('#14')) {
  console.error('FAIL: Sidebar navigation must NOT show #14 initially!');
  process.exit(1);
}
if (initialSidebarHtml.includes('class="nav-badge">17<') || initialSidebarHtml.includes('class="nav-badge">0<')) {
  console.error('FAIL: Sidebar navigation must NOT show 17 or 0 initially!');
  process.exit(1);
}
console.log('✓ Sidebar Navigation initially has no numbers (clean rail with 0 badges).');

// STEP 2: Solve First Question (Arrays: ARISE-P101)
console.log('\n--- STEP 2: SOLVE FIRST QUESTION (Arrays: ARISE-P101) ---');
const p101 = sandbox.ARISE_DATA.problems.find(p => p.id === 'ARISE-P101');
sandbox.AriseState.activeProblem = p101;
sandbox.AriseState.activeLanguage = 'javascript';
sandbox.document.getElementById('code-editor-input').value = `
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

sandbox.submitSolutionToJudge();

if (sandbox.AriseState.judgeStatus !== 'accepted') {
  console.error(`FAIL: Expected judgeStatus accepted, got ${sandbox.AriseState.judgeStatus}`);
  process.exit(1);
}

// Check Arrays Topic Count
const arraysTopic = sandbox.ARISE_DATA.topics.find(t => t.id === 'arrays');
const arraysSolved1 = sandbox.getTopicSolvedCount(arraysTopic);
if (arraysSolved1 !== 1) {
  console.error(`FAIL: Arrays topic should have 1 solved, got ${arraysSolved1}`);
  process.exit(1);
}
console.log('✓ Arrays topic count dynamically incremented to 1.');

// Check HTML re-render for Topic Explorer
const explorerHtmlAfterSolve1 = sandbox.renderDsaTopicExplorer();
if (!explorerHtmlAfterSolve1.includes('Solved: <b style="color: var(--text-primary); font-family: var(--font-mono);">1</b> / 42')) {
  console.error('FAIL: Arrays topic card did not update to "Solved: 1 / 42"');
  process.exit(1);
}
// Percentage for 1/42 is 2%
if (!explorerHtmlAfterSolve1.includes('width: 2%;')) {
  console.error('FAIL: Arrays progress bar did not update to width: 2%');
  process.exit(1);
}
// Other topics must still be 0
const stringsTopic = sandbox.ARISE_DATA.topics.find(t => t.id === 'strings');
if (sandbox.getTopicSolvedCount(stringsTopic) !== 0) {
  console.error(`FAIL: Strings topic should still be 0, got ${sandbox.getTopicSolvedCount(stringsTopic)}`);
  process.exit(1);
}
console.log('✓ renderDsaTopicExplorer displays Arrays with "Solved: 1 / 42" and 2% cyan progress bar.');

// Verify Sidebar Navigation NOW shows numbers after solve 1
const sidebarHtmlAfterSolve1 = sandbox.renderSidebarNavigation();
if (!sidebarHtmlAfterSolve1.includes('#14')) {
  console.error('FAIL: Sidebar navigation must show #14 after solving problem!');
  process.exit(1);
}
if (!sidebarHtmlAfterSolve1.includes('class="nav-badge">1<')) {
  console.error('FAIL: Sidebar navigation must show 1 on DSA after 1 solve!');
  process.exit(1);
}
console.log('✓ Sidebar Navigation now displays Leaderboard #14 and DSA 1 badges.');

// STEP 3: Solve Second Question in Same Topic (Arrays: ARISE-P103)
console.log('\n--- STEP 3: SOLVE SECOND QUESTION IN SAME TOPIC (Arrays: ARISE-P103) ---');
const p103 = sandbox.ARISE_DATA.problems.find(p => p.id === 'ARISE-P103');
sandbox.AriseState.activeProblem = p103;
sandbox.AriseState.activeLanguage = 'javascript';
sandbox.document.getElementById('code-editor-input').value = p103.solution.code.javascript;

sandbox.submitSolutionToJudge();

const arraysSolved2 = sandbox.getTopicSolvedCount(arraysTopic);
if (arraysSolved2 !== 2) {
  console.error(`FAIL: Arrays topic should now have 2 solved, got ${arraysSolved2}`);
  process.exit(1);
}
console.log('✓ Arrays topic count dynamically incremented to 2.');

const explorerHtmlAfterSolve2 = sandbox.renderDsaTopicExplorer();
if (!explorerHtmlAfterSolve2.includes('Solved: <b style="color: var(--text-primary); font-family: var(--font-mono);">2</b> / 42')) {
  console.error('FAIL: Arrays topic card did not update to "Solved: 2 / 42"');
  process.exit(1);
}
// Percentage for 2/42 is 5%
if (!explorerHtmlAfterSolve2.includes('width: 5%;')) {
  console.error('FAIL: Arrays progress bar did not update to width: 5%');
  process.exit(1);
}
console.log('✓ renderDsaTopicExplorer displays Arrays with "Solved: 2 / 42" and 5% progress bar.');

// Verify Sidebar Navigation DSA badge updates to 2
const sidebarHtmlAfterSolve2 = sandbox.renderSidebarNavigation();
if (!sidebarHtmlAfterSolve2.includes('class="nav-badge">2<')) {
  console.error('FAIL: Sidebar navigation must show 2 on DSA after 2 solves!');
  process.exit(1);
}
console.log('✓ Sidebar Navigation DSA badge dynamically updated to 2.');

// STEP 4: Solve a Different Topic (Stacks: ARISE-P102)
console.log('\n--- STEP 4: SOLVE A DIFFERENT TOPIC (Stacks: ARISE-P102) ---');
const p102 = sandbox.ARISE_DATA.problems.find(p => p.id === 'ARISE-P102');
sandbox.AriseState.activeProblem = p102;
sandbox.AriseState.activeLanguage = 'javascript';
sandbox.document.getElementById('code-editor-input').value = p102.solution.code.javascript;

sandbox.submitSolutionToJudge();

const stacksTopic = sandbox.ARISE_DATA.topics.find(t => t.id === 'stacks');
const stacksSolved = sandbox.getTopicSolvedCount(stacksTopic);
if (stacksSolved !== 1) {
  console.error(`FAIL: Stacks topic should have 1 solved, got ${stacksSolved}`);
  process.exit(1);
}
console.log('✓ Stacks topic count dynamically incremented to 1.');

const explorerHtmlAfterSolve3 = sandbox.renderDsaTopicExplorer();
if (!explorerHtmlAfterSolve3.includes('Solved: <b style="color: var(--text-primary); font-family: var(--font-mono);">1</b> / 24')) {
  console.error('FAIL: Stacks topic card did not update to "Solved: 1 / 24"');
  process.exit(1);
}
console.log('✓ renderDsaTopicExplorer displays Stacks with "Solved: 1 / 24" (4%).');

// STEP 5: Repeat Submission of Already Solved Question (0 Extra Count)
console.log('\n--- STEP 5: REPEAT SUBMISSION OF ALREADY SOLVED QUESTION ---');
sandbox.AriseState.activeProblem = p101;
sandbox.document.getElementById('code-editor-input').value = `
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
sandbox.submitSolutionToJudge();

const arraysSolvedRepeat = sandbox.getTopicSolvedCount(arraysTopic);
if (arraysSolvedRepeat !== 2) {
  console.error(`FAIL: Arrays topic count should stay at 2 on repeat solve, got ${arraysSolvedRepeat}`);
  process.exit(1);
}
console.log('✓ Repeat solve does not duplicate topic solve count (Arrays remains 2).');

// STEP 6: Verify Overview Dashboard Reflects Updated Solves
console.log('\n--- STEP 6: VERIFY OVERVIEW DASHBOARD TOPIC MASTERY ---');
const overviewHtml = sandbox.renderOverviewDashboard();
if (!overviewHtml.includes('2</span>/42')) {
  console.error('FAIL: Overview dashboard did not display 2/42 for Arrays');
  process.exit(1);
}
console.log('✓ Overview Dashboard correctly displays Arrays with 2/42 solved.');

console.log('\n=============================================================');
console.log('ALL TOPIC MASTERY DYNAMIC UPDATE CONTRACT TESTS PASSED (100%)');
console.log('=============================================================');
