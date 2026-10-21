const fs = require('fs');
const vm = require('vm');

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
  showToast: function(msg, type) {},
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

const p102 = sandbox.ARISE_DATA.problems.find(p => p.id === 'ARISE-P102');
console.log('P102 functionName:', p102.functionName);
console.log('P102 testcases:', JSON.stringify(p102.testCases, null, 2));

const pyCode = `class Solution:
    def isValidPacket(self, frameStr: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for ch in frameStr:
            if ch in ["(", "{", "["]:
                stack.append(ch)
            else:
                if not stack or stack.pop() != mapping[ch]:
                    return False
        return len(stack) == 0`;

console.log('\n--- Transpiled JS: ---');
// Let's call compileUserFunction logic or view transpilePythonToJs
const transpiled = sandbox.AriseJudgeEngine.transpilePythonToJs ? sandbox.AriseJudgeEngine.transpilePythonToJs(pyCode, p102.functionName) : 'not exposed';
console.log(transpiled);

console.log('\n--- Evaluating Solution: ---');
const evalRes = sandbox.AriseJudgeEngine.evaluate(p102, pyCode, 'python', false);
console.log('Eval result:', JSON.stringify(evalRes, null, 2));
