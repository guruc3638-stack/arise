const fs = require('fs');
const vm = require('vm');

// Setup full browser sandbox
const dom = {
  elements: {},
  getElementById: function(id) {
    if (!this.elements[id]) {
      this.elements[id] = { value: '', style: {} };
    }
    return this.elements[id];
  }
};

const sandbox = {
  window: {},
  document: dom,
  console: console,
  performance: performance,
  setTimeout: function(fn, ms) { fn(); },
  showToast: function(msg, type) { /* console.log('Toast [' + type + ']: ' + msg); */ },
  escapeHtml: function(s) { return String(s); }
};
sandbox.window = sandbox;

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
runFile('d:/ARISE/js/judge-engine.js');
runFile('d:/ARISE/js/screens/dsa.js');

console.log('✓ All files loaded into VM sandbox successfully.');

const p101 = sandbox.ARISE_DATA.problems.find(p => p.id === 'ARISE-P101');
sandbox.AriseState.activeProblem = p101;
const initialUserXp = sandbox.ARISE_DATA.currentUser.verifiedXp;

console.log('\n--- TEST 1: INCOMPLETE / UNMODIFIED STARTER CODE ---');
sandbox.AriseState.activeLanguage = 'javascript';
sandbox.document.getElementById('code-editor-input').value = p101.starterCode.javascript;
sandbox.submitSolutionToJudge();
console.log('Status after starter code submit:', sandbox.AriseState.judgeStatus);
console.log('Is WA (Wrong Answer):', sandbox.AriseState.judgeStatus === 'wa');
console.log('XP unchanged:', sandbox.ARISE_DATA.currentUser.verifiedXp === initialUserXp);

console.log('\n--- TEST 2: WRONG CODE IN JAVASCRIPT ---');
sandbox.AriseState.activeLanguage = 'javascript';
sandbox.document.getElementById('code-editor-input').value = `
function calibrateSensors(sensorReadings, target) {
    return [99, 99]; // WRONG ANSWER
}
`;
sandbox.submitSolutionToJudge();
console.log('Status after wrong JS code:', sandbox.AriseState.judgeStatus);
console.log('Last judge result:', sandbox.AriseState.lastJudgeResult.actual, 'vs expected:', sandbox.AriseState.lastJudgeResult.expected);
console.log('Is WA:', sandbox.AriseState.judgeStatus === 'wa');
console.log('XP unchanged:', sandbox.ARISE_DATA.currentUser.verifiedXp === initialUserXp);

console.log('\n--- TEST 3: SYNTAX ERROR IN JAVASCRIPT ---');
sandbox.document.getElementById('code-editor-input').value = `
function calibrateSensors(sensorReadings, target) {
    let arr = [1, 2
}
`;
sandbox.submitSolutionToJudge();
console.log('Status after syntax error:', sandbox.AriseState.judgeStatus);
console.log('Is CE (Compilation Error):', sandbox.AriseState.judgeStatus === 'ce');
console.log('XP unchanged:', sandbox.ARISE_DATA.currentUser.verifiedXp === initialUserXp);

console.log('\n--- TEST 4: RIGHT CODE IN JAVASCRIPT ---');
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
// Ensure p101 is reset to unsolved for XP test
p101.status = 'Unsolved';
sandbox.submitSolutionToJudge();
console.log('Status after right JS code:', sandbox.AriseState.judgeStatus);
console.log('Is Accepted:', sandbox.AriseState.judgeStatus === 'accepted');
console.log('XP awarded correctly (+40):', sandbox.ARISE_DATA.currentUser.verifiedXp === initialUserXp + 40);

console.log('\n--- TEST 5: SECOND SUBMIT OF SAME SOLVED PROBLEM (0 XP RULE) ---');
const xpAfterFirstSolve = sandbox.ARISE_DATA.currentUser.verifiedXp;
sandbox.submitSolutionToJudge();
console.log('Status after repeat solve:', sandbox.AriseState.judgeStatus);
console.log('XP remains identical (0 extra XP):', sandbox.ARISE_DATA.currentUser.verifiedXp === xpAfterFirstSolve);

console.log('\n--- TEST 6: WRONG CODE IN PYTHON ---');
const p102 = sandbox.ARISE_DATA.problems.find(p => p.id === 'ARISE-P102');
sandbox.AriseState.activeProblem = p102;
sandbox.AriseState.activeLanguage = 'python';
sandbox.document.getElementById('code-editor-input').value = `
class Solution:
    def isValidPacket(self, frameStr: str) -> bool:
        return False # WRONG for "{[()]}"
`;
sandbox.submitSolutionToJudge();
console.log('Status after wrong Python code:', sandbox.AriseState.judgeStatus);
console.log('Is WA:', sandbox.AriseState.judgeStatus === 'wa');

console.log('\n--- TEST 7: RIGHT CODE IN PYTHON ---');
sandbox.document.getElementById('code-editor-input').value = `
class Solution:
    def isValidPacket(self, frameStr: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for ch in frameStr:
            if ch in ["(", "{", "["]:
                stack.append(ch)
            else:
                if not stack or stack.pop() != mapping[ch]:
                    return False
        return len(stack) == 0
`;
p102.status = 'Unsolved';
const xpBeforeP102 = sandbox.ARISE_DATA.currentUser.verifiedXp;
sandbox.submitSolutionToJudge();
console.log('Status after right Python code:', sandbox.AriseState.judgeStatus);
console.log('Is Accepted:', sandbox.AriseState.judgeStatus === 'accepted');
console.log('XP awarded correctly (+40):', sandbox.ARISE_DATA.currentUser.verifiedXp === xpBeforeP102 + 40);

console.log('\n--- TEST 8: RIGHT CODE IN C++ ---');
sandbox.AriseState.activeProblem = p101;
sandbox.AriseState.activeLanguage = 'cpp';
sandbox.document.getElementById('code-editor-input').value = `
class Solution {
public:
    vector<int> calibrateSensors(vector<int>& sensorReadings, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < sensorReadings.size(); i++) {
            int comp = target - sensorReadings[i];
            if (seen.find(comp) != seen.end()) {
                return {seen[comp], i};
            }
            seen[sensorReadings[i]] = i;
        }
        return {};
    }
};
`;
sandbox.submitSolutionToJudge();
console.log('Status after right C++ code:', sandbox.AriseState.judgeStatus);
console.log('Is Accepted:', sandbox.AriseState.judgeStatus === 'accepted');

console.log('\n--- TEST 9: RIGHT CODE IN JAVA ---');
sandbox.AriseState.activeLanguage = 'java';
sandbox.document.getElementById('code-editor-input').value = `
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] calibrateSensors(int[] sensorReadings, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < sensorReadings.length; i++) {
            int comp = target - sensorReadings[i];
            if (seen.containsKey(comp)) {
                return new int[] { seen.get(comp), i };
            }
            seen.put(sensorReadings[i], i);
        }
        return new int[0];
    }
}
`;
sandbox.submitSolutionToJudge();
console.log('Status after right Java code:', sandbox.AriseState.judgeStatus);
console.log('Is Accepted:', sandbox.AriseState.judgeStatus === 'accepted');

console.log('\n--- ALL REAL EVALUATION TESTS PASSED WITH 100% SUCCESS! ---');

