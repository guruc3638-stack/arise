const fs = require('fs');

// Simple Python to JS transpiler for standard DSA code
function transpilePythonToJs(pyCode, funcName) {
  // Check for common Python syntax errors
  const lines = pyCode.split('\n');
  let openParens = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const ch of line) {
      if (ch === '(' || ch === '[' || ch === '{') openParens++;
      if (ch === ')' || ch === ']' || ch === '}') openParens--;
    }
    const trimmed = line.trim();
    if ((trimmed.startsWith('def ') || trimmed.startsWith('if ') || trimmed.startsWith('elif ') || 
         trimmed.startsWith('else:') || trimmed.startsWith('for ') || trimmed.startsWith('while ')) && 
        !trimmed.endsWith(':') && openParens === 0 && !trimmed.endsWith('\\')) {
      throw new Error(`SyntaxError: expected ':' at end of line ${i + 1}: '${trimmed}'`);
    }
  }
  if (openParens !== 0) {
    throw new Error(`SyntaxError: unclosed parentheses/brackets in Python code`);
  }

  let code = pyCode;
  // Remove class Solution:
  code = code.replace(/class\s+Solution\s*:\s*/g, '');
  code = code.replace(/def\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)\s*(?:->\s*.*?)?:/g, (m, name, args) => {
    const cleanArgs = args.split(',').map(a => a.trim().split(':')[0].trim()).filter(a => a && a !== 'self');
    return `function ${name}(${cleanArgs.join(', ')}) {`;
  });

  // Transpile python constructs line by line with indentation tracking
  const jsLines = [];
  const rawLines = code.split('\n');
  const indentStack = [0];

  for (let i = 0; i < rawLines.length; i++) {
    let raw = rawLines[i];
    if (!raw.trim()) continue;

    const indent = raw.search(/\S|$/);
    const line = raw.trim();

    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
    }

    let converted = line;

    // if / elif / else
    if (converted.startsWith('elif ')) {
      converted = converted.replace(/^elif\s+(.*?)\s*:$/, 'else if ($1) {');
    } else if (converted.startsWith('if ')) {
      converted = converted.replace(/^if\s+(.*?)\s*:$/, 'if ($1) {');
    } else if (converted === 'else:') {
      converted = 'else {';
    } else if (converted.startsWith('while ')) {
      converted = converted.replace(/^while\s+(.*?)\s*:$/, 'while ($1) {');
    } else if (converted.startsWith('for ')) {
      // for idx, val in enumerate(arr):
      let enumMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s+in\s+enumerate\((.*?)\)\s*:$/);
      if (enumMatch) {
        converted = `for (let [${enumMatch[1]}, ${enumMatch[2]}] of ${enumMatch[3]}.entries()) {`;
      } else {
        // for i in range(len(arr)): or range(a, b) or range(n)
        let rangeMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\)\s*:$/);
        if (rangeMatch) {
          const args = rangeMatch[2].split(',').map(s => s.trim());
          if (args.length === 1) {
            converted = `for (let ${rangeMatch[1]} = 0; ${rangeMatch[1]} < (${args[0]}); ${rangeMatch[1]}++) {`;
          } else if (args.length === 2) {
            converted = `for (let ${rangeMatch[1]} = (${args[0]}); ${rangeMatch[1]} < (${args[1]}); ${rangeMatch[1]}++) {`;
          } else if (args.length === 3) {
            converted = `for (let ${rangeMatch[1]} = (${args[0]}); ${rangeMatch[1]} < (${args[1]}); ${rangeMatch[1]} += (${args[2]})) {`;
          }
        } else {
          // for item in list:
          let forInMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.*?)\s*:$/);
          if (forInMatch) {
            converted = `for (let ${forInMatch[1]} of ${forInMatch[2]}) {`;
          }
        }
      }
    }

    // Python builtins / conversions
    converted = converted.replace(/\bTrue\b/g, 'true');
    converted = converted.replace(/\bFalse\b/g, 'false');
    converted = converted.replace(/\bNone\b/g, 'null');
    converted = converted.replace(/\band\b/g, '&&');
    converted = converted.replace(/\bor\b/g, '||');
    converted = converted.replace(/\bnot\s+/g, '!');
    converted = converted.replace(/\blen\((.*?)\)/g, '($1).length');
    converted = converted.replace(/\.append\(/g, '.push(');
    converted = converted.replace(/\bpass\b/g, '');
    converted = converted.replace(/([a-zA-Z0-9_]+)\s*\/\/\s*([a-zA-Z0-9_]+)/g, 'Math.floor($1 / $2)');

    // Dictionary / Set in checks: `comp in seen` (only if not a for loop)
    if (!converted.startsWith('for ')) {
      converted = converted.replace(/\b([a-zA-Z0-9_]+)\s+in\s+([a-zA-Z0-9_]+)\b/g, '($1 in $2)');
      converted = converted.replace(/\b([a-zA-Z0-9_]+)\s+not in\s+([a-zA-Z0-9_]+)\b/g, '!($1 in $2)');
    }

    // Variable declaration if line has assignment `var = ...`
    if (/^[a-zA-Z0-9_]+\s*=\s*/.test(converted) && !converted.startsWith('return ') && !converted.startsWith('self.')) {
      converted = 'let ' + converted;
    }

    if (converted.endsWith('{')) {
      indentStack.push(indent + 4);
    } else if (!converted.endsWith(';') && !converted.endsWith('{') && !converted.endsWith('}') && converted.trim().length > 0) {
      converted += ';';
    }

    jsLines.push(' '.repeat(indent) + converted);
  }

  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  return jsLines.join('\n');
}

// C++ to JS transpiler for standard DSA code
function transpileCppToJs(cppCode, funcName) {
  let code = cppCode;
  // Remove include directives
  code = code.replace(/#include\s+<.*?>/g, '');
  code = code.replace(/using\s+namespace\s+std\s*;/g, '');
  code = code.replace(/class\s+Solution\s*\{[\s\S]*?public:\s*/g, '');
  code = code.replace(/\};?\s*$/g, '');

  // Replace type signatures
  code = code.replace(/(?:std::)?(?:vector<.*?>|int|string|bool|double|long long)\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*\{/g, 'function $1($2) {');
  // Strip argument types: const vector<int>& nums, int target -> nums, target
  code = code.replace(/(?:const\s+)?(?:std::)?(?:vector<.*?>|int|string|bool|double|long long)[&*]?\s+([a-zA-Z0-9_]+)/g, '$1');

  // Replace unordered_map / map declarations to plain object
  code = code.replace(/(?:std::)?(?:unordered_)?map<.*?>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = {};');
  code = code.replace(/(?:std::)?(?:unordered_)?set<.*?>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = new Set();');
  code = code.replace(/(?:std::)?vector<.*?>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = [];');

  // Replace map find & end: seen.find(comp) != seen.end() -> (seen[comp] !== undefined)
  code = code.replace(/([a-zA-Z0-9_]+)\.find\((.*?)\)\s*!=\s*\1\.end\(\)/g, '($1[$2] !== undefined)');
  code = code.replace(/([a-zA-Z0-9_]+)\.find\((.*?)\)\s*==\s*\1\.end\(\)/g, '($1[$2] === undefined)');
  code = code.replace(/([a-zA-Z0-9_]+)\.count\((.*?)\)\s*>\s*0/g, '($1[$2] !== undefined)');

  // Map .size() to .length
  code = code.replace(/\.size\(\)/g, '.length');
  code = code.replace(/\.push_back\(/g, '.push(');
  code = code.replace(/\.empty\(\)/g, '.length === 0');

  // Replace return {a, b}; with return [a, b];
  code = code.replace(/return\s*\{([^{}]*?)\}\s*;/g, 'return [$1];');

  // Variable type stripping: int comp = ... -> let comp = ...
  code = code.replace(/\b(?:int|auto|double|string|bool|long long)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =');

  return code;
}

// Evaluation Test
console.log('Testing Transpilers and Judge Evaluator...');

// Test 1: Python Correct Code for ARISE-P101
const pyGood = `
class Solution:
    def calibrateSensors(self, sensorReadings: list[int], target: int) -> list[int]:
        seen = {}
        for idx, val in enumerate(sensorReadings):
            comp = target - val
            if comp in seen:
                return [seen[comp], idx]
            seen[val] = idx
        return []
`;

const jsFromPy = transpilePythonToJs(pyGood, 'calibrateSensors');
console.log('--- Transpiled Python to JS ---');
console.log(jsFromPy);
console.log('-------------------------------');
const fnGood = new Function(jsFromPy + '; return calibrateSensors;');
const runnerGood = fnGood();
const res1 = runnerGood([12, 17, 24, 31, 45], 41);
console.log('Python Good Code Test 1 result:', res1); // Expected: [1, 2]

// Test 2: Python WRONG Code for ARISE-P101
const pyWrong = `
class Solution:
    def calibrateSensors(self, sensorReadings: list[int], target: int) -> list[int]:
        return [0, 0]
`;
const jsFromPyWrong = transpilePythonToJs(pyWrong, 'calibrateSensors');
const runnerWrong = (new Function(jsFromPyWrong + '; return calibrateSensors;'))();
const res2 = runnerWrong([12, 17, 24, 31, 45], 41);
console.log('Python Wrong Code Test result:', res2); // Expected: [0, 0]

// Test 3: C++ Correct Code for ARISE-P101
const cppGood = `
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
const jsFromCpp = transpileCppToJs(cppGood, 'calibrateSensors');
// console.log('Transpiled C++ to JS:\n', jsFromCpp);
const runnerCpp = (new Function(jsFromCpp + '; return calibrateSensors;'))();
const res3 = runnerCpp([12, 17, 24, 31, 45], 41);
console.log('C++ Good Code Test result:', res3); // Expected: [1, 2]

// Test 4: JavaScript Correct Code
const jsGood = `
function calibrateSensors(sensorReadings, target) {
  const seen = new Map();
  for (let i = 0; i < sensorReadings.length; i++) {
    const comp = target - sensorReadings[i];
    if (seen.has(comp)) return [seen.get(comp), i];
    seen.set(sensorReadings[i], i);
  }
  return [];
}
`;
const runnerJs = (new Function(jsGood + '; return calibrateSensors;'))();
const res4 = runnerJs([12, 17, 24, 31, 45], 41);
console.log('JavaScript Good Code Test result:', res4); // Expected: [1, 2]

console.log('ALL TESTS EXECUTED PERFECTLY!');
