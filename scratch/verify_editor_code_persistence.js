const fs = require('fs');
const assert = require('assert');

// Mock localStorage
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

global.window = global;
global.showToast = () => {};
global.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
global.window.scrollTo = () => {};
global.document = {
  getElementById: (id) => {
    if (id === 'code-editor-input') {
      return {
        value: global._editorValue || '',
        focus: () => {}
      };
    }
    return {
      focus: () => {},
      value: '',
      style: {},
      classList: { add: () => {}, remove: () => {} }
    };
  },
  createElement: () => ({ appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }),
  body: { appendChild: () => {} }
};

// Load data.js
let dataCode = fs.readFileSync('d:/ARISE/js/data.js', 'utf8');
dataCode = dataCode.replace('const ARISE_DATA =', 'global.ARISE_DATA =');
eval(dataCode);

// Load state.js
let stateCode = fs.readFileSync('d:/ARISE/js/state.js', 'utf8');
stateCode = stateCode.replace('const AriseState =', 'global.AriseState =');
eval(stateCode);

// Load dsa.js
let dsaCode = fs.readFileSync('d:/ARISE/js/screens/dsa.js', 'utf8');
eval(dsaCode);

console.log('=== TEST 1: SAVE USER CODE & LOCALSTORAGE PERSISTENCE ===');
const problemId = 'ARISE-P101';
const userPythonCode = `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            comp = target - num
            if comp in seen:
                return [seen[comp], i]
            seen[num] = i
        return []
`;

AriseState.saveUserCode(problemId, 'python', userPythonCode);
const retrieved = AriseState.getUserCode(problemId, 'python');
assert.strictEqual(retrieved, userPythonCode, 'Retrieved code must match saved code');
assert(storage['arise_user_code'], 'Must persist to localStorage');
console.log('✔ User code correctly saved to state and localStorage!');

console.log('\n=== TEST 2: RENDER WORKSPACE WITH USER CODE ===');
AriseState.activeProblem = ARISE_DATA.problems[0]; // ARISE-P101
AriseState.activeLanguage = 'python';

let html = renderDsaCodingWorkspace();
assert(html.includes('for i, num in enumerate(nums)'), 'Workspace HTML must include user written code, NOT default pass');
assert(!html.includes('# Implement optimal O(N) hash map solution\n        pass'), 'Must NOT wipe out with default starter template');
console.log('✔ Workspace renders with preserved user code in editor textarea!');

console.log('\n=== TEST 3: LANGUAGE SWITCHING PRESERVES BOTH CODES ===');
global._editorValue = userPythonCode;
switchEditorLanguage('javascript');
assert.strictEqual(AriseState.activeLanguage, 'javascript');

// In JS, user hasn't typed yet, so default starter code is used
let jsHtml = renderDsaCodingWorkspace();
assert(jsHtml.includes('function twoSum(nums, target)'), 'JS should show JS starter or saved code');

// Now user writes JS code
const userJsCode = `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
}`;
global._editorValue = userJsCode;
AriseState.saveUserCode(problemId, 'javascript', userJsCode);

// Switch back to Python
switchEditorLanguage('python');
assert.strictEqual(AriseState.activeLanguage, 'python');
let pyHtml = renderDsaCodingWorkspace();
assert(pyHtml.includes('for i, num in enumerate(nums)'), 'Switching back to Python restores user Python code');

// Switch back to JavaScript
switchEditorLanguage('javascript');
let jsHtml2 = renderDsaCodingWorkspace();
assert(jsHtml2.includes('const map = new Map();'), 'Switching back to JavaScript restores user JavaScript code');
console.log('✔ Multi-language code persistence verified across language toggles!');

console.log('\n=== TEST 4: RESET CODE EXPLICITLY RESTORES STARTER TEMPLATE ===');
resetEditorCode(problemId);
let resetHtml = renderDsaCodingWorkspace();
assert(!resetHtml.includes('const map = new Map();'), 'User JS code was wiped by explicit Reset Code');
assert(resetHtml.includes('// Write your optimal O(N) hash map solution'), 'Starter template restored after explicit reset');
console.log('✔ Explicit Reset Code correctly restores starter template on demand!');

console.log('\n======================================================');
console.log('ALL FRONTEND EDITOR CODE PERSISTENCE TESTS PASSED 100%!');
console.log('======================================================');
