const assert = require('assert');

// We will construct the refined judge engine functions here to test thoroughly
// before putting them into js/judge-engine.js

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function arrayToListNode(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const dummy = new ListNode(0);
  let curr = dummy;
  for (let i = 0; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return dummy.next;
}

function listNodeToArray(head) {
  if (!head || typeof head !== 'object') return head;
  if (!('val' in head)) return head;
  const res = [];
  let curr = head;
  let limit = 0;
  while (curr && limit < 100000) {
    res.push(curr.val);
    curr = curr.next;
    limit++;
  }
  return res;
}

function arrayToTreeNode(arr) {
  if (!Array.isArray(arr) || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift();
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.left = new TreeNode(arr[i]);
        queue.push(curr.left);
      }
      i++;
    }
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.right = new TreeNode(arr[i]);
        queue.push(curr.right);
      }
      i++;
    }
  }
  return root;
}

function treeNodeToArray(root) {
  if (!root || typeof root !== 'object') return root;
  if (!('val' in root && ('left' in root || 'right' in root))) return root;
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr) {
      res.push(curr.val);
      queue.push(curr.left);
      queue.push(curr.right);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
}

function transpileCppToJs(cppCode, funcName) {
  let code = cppCode;
  code = code.replace(/#include\s+<.*?>/g, '');
  code = code.replace(/using\s+namespace\s+std\s*;/g, '');
  code = code.replace(/class\s+Solution\s*\{[\s\S]*?public:\s*/g, '');
  code = code.replace(/\};?\s*$/g, '');

  code = code.replace(/->/g, '.');
  code = code.replace(/\bnullptr\b/g, 'null');
  code = code.replace(/\bNULL\b/g, 'null');
  code = code.replace(/\bdelete\s+[^;]+;/g, '');

  code = code.replace(/(?:[A-Za-z0-9_<>:*\s&]+?)\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)\s*(?:const)?\s*\{/g, (m, name, args) => {
    if (['if', 'while', 'for', 'switch', 'catch'].includes(name)) return m;
    const cleanArgs = args.split(',').map(a => {
      const parts = a.trim().split(/\s+/);
      return parts[parts.length - 1].replace(/[*&]/g, '').trim();
    }).filter(Boolean);
    return `function ${name}(${cleanArgs.join(', ')}) {`;
  });

  code = code.replace(/(?:std::)?(?:unordered_)?map\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = {};');
  code = code.replace(/(?:std::)?(?:unordered_)?set\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = new Set();');
  code = code.replace(/(?:std::)?vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = [];');
  code = code.replace(/(?:std::)?vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*\(\s*([^,)]+)\s*,\s*([^)]+)\s*\)\s*;/g, 'let $1 = new Array($2).fill($3);');
  code = code.replace(/(?:std::)?vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*\(\s*([^)]+)\s*\)\s*;/g, 'let $1 = new Array($2).fill(0);');
  code = code.replace(/(?:std::)?vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =');

  code = code.replace(/([a-zA-Z0-9_]+)\.find\((.*?)\)\s*!=\s*\1\.end\(\)/g, '($1[$2] !== undefined)');
  code = code.replace(/([a-zA-Z0-9_]+)\.find\((.*?)\)\s*==\s*\1\.end\(\)/g, '($1[$2] === undefined)');
  code = code.replace(/([a-zA-Z0-9_]+)\.count\((.*?)\)\s*>\s*0/g, '($1[$2] !== undefined)');
  code = code.replace(/([a-zA-Z0-9_]+)\.count\((.*?)\)\s*==\s*0/g, '($1[$2] === undefined)');

  code = code.replace(/\((?:int|double|float|char|long|long\s+long)\)/g, '');
  code = code.replace(/\.size\(\)/g, '.length');
  code = code.replace(/\.push_back\(/g, '.push(');
  code = code.replace(/\.pop_back\(\)/g, '.pop()');
  code = code.replace(/\.empty\(\)/g, '.length === 0');
  code = code.replace(/return\s*\{([^{}]*?)\}\s*;/g, 'return [$1];');

  code = code.replace(/\b(?:ListNode\s*\*|TreeNode\s*\*|[A-Za-z0-9_]+(?:\s*\*|\s*&)?)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =');
  code = code.replace(/\b(?:ListNode\s*\*|TreeNode\s*\*|int|double|string|bool|long long|char)\s*\*?\s*([a-zA-Z0-9_]+)\s*;/g, 'let $1 = null;');

  code = code.replace(/\bmax\(/g, 'Math.max(');
  code = code.replace(/\bmin\(/g, 'Math.min(');
  code = code.replace(/\babs\(/g, 'Math.abs(');

  return code;
}

function transpilePythonToJs(pyCode, funcName) {
  let code = pyCode.replace(/#.*$/gm, '');
  code = code.replace(/:\s*(?:Optional\[.*?\]|List\[.*?\]|Dict\[.*?\]|Set\[.*?\]|int|str|bool|float|None|ListNode|TreeNode)(?=[,)\n])/g, '');
  code = code.replace(/->\s*.*?:/g, ':');
  code = code.replace(/class\s+Solution\s*:\s*/g, '');

  code = code.replace(/def\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)\s*:/g, (m, name, args) => {
    const cleanArgs = args.split(',').map(a => a.trim().split(':')[0].trim()).filter(a => a && a !== 'self');
    return `function ${name}(${cleanArgs.join(', ')}) {`;
  });

  const jsLines = [
    'function __py_eq(a, b) {',
    '  if (Array.isArray(a) && Array.isArray(b)) return JSON.stringify(a) === JSON.stringify(b);',
    '  return a === b;',
    '}',
    'function __py_in(item, coll) {',
    '  if (coll === null || coll === undefined) return false;',
    '  if (Array.isArray(coll) || typeof coll === "string") return coll.indexOf(item) !== -1;',
    '  if (coll instanceof Set || coll instanceof Map) return coll.has(item);',
    '  return (item in coll);',
    '}'
  ];
  const rawLines = code.split('\n');
  const indentStack = [0];
  const declaredVars = new Set();

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    if (!raw.trim()) continue;
    const indent = raw.search(/\S|$/);
    let converted = raw.trim();

    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
    }

    converted = converted.replace(/([a-zA-Z0-9_]+)\[::-1\]/g, '($1.slice().reverse())');
    converted = converted.replace(/([a-zA-Z0-9_]+)\[(\d+):(\d+)\]/g, '$1.slice($2, $3)');
    converted = converted.replace(/([a-zA-Z0-9_]+)\[:(\d+)\]/g, '$1.slice(0, $2)');
    converted = converted.replace(/([a-zA-Z0-9_]+)\[(\d+):\]/g, '$1.slice($2)');

    if (!converted.startsWith('for ')) {
      converted = converted.replace(/\b([a-zA-Z0-9_\.\[\]]+)\s+not\s+in\s+(\[.*?\]|[a-zA-Z0-9_\.\[\]]+)/g, '!__py_in($1, $2)');
      converted = converted.replace(/\b([a-zA-Z0-9_\.\[\]]+)\s+in\s+(\[.*?\]|[a-zA-Z0-9_\.\[\]]+)/g, '__py_in($1, $2)');
    }

    if (converted.startsWith('elif ')) {
      converted = converted.replace(/^elif\s+(.*?)\s*:$/, 'else if (Boolean($1)) {');
    } else if (converted.startsWith('if ')) {
      converted = converted.replace(/^if\s+(.*?)\s*:$/, 'if (Boolean($1)) {');
    } else if (converted === 'else:') {
      converted = 'else {';
    } else if (converted.startsWith('while ')) {
      converted = converted.replace(/^while\s+(.*?)\s*:$/, 'while (Boolean($1)) {');
    } else if (converted.startsWith('for ')) {
      const enumMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s+in\s+enumerate\((.*?)\)\s*:$/);
      if (enumMatch) {
        converted = `for (let [${enumMatch[1]}, ${enumMatch[2]}] of (${enumMatch[3]}).entries()) {`;
      } else {
        const rangeMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\)\s*:$/);
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
          const forInMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.*?)\s*:$/);
          if (forInMatch) {
            converted = `for (let ${forInMatch[1]} of (${forInMatch[2]})) {`;
          }
        }
      }
    }

    converted = converted.replace(/\b([a-zA-Z0-9_\.\[\]]+)\s*==\s*([a-zA-Z0-9_\.\[\]\(\)]+)\b/g, '__py_eq($1, $2)');

    converted = converted.replace(/\bTrue\b/g, 'true');
    converted = converted.replace(/\bFalse\b/g, 'false');
    converted = converted.replace(/\bNone\b/g, 'null');
    converted = converted.replace(/\band\b/g, '&&');
    converted = converted.replace(/\bor\b/g, '||');
    converted = converted.replace(/\bnot\s+([a-zA-Z0-9_]+)\b/g, '(!$1 || $1.length === 0)');
    converted = converted.replace(/\bnot\s+/g, '!');
    converted = converted.replace(/\blen\((.*?)\)/g, '($1).length');
    converted = converted.replace(/\.append\(/g, '.push(');
    converted = converted.replace(/\bpass\b/g, '');
    converted = converted.replace(/([a-zA-Z0-9_]+)\s*\/\/\s*([a-zA-Z0-9_]+)/g, 'Math.floor($1 / $2)');

    const assignMatch = converted.match(/^([a-zA-Z0-9_]+)\s*=\s*(.*)$/);
    if (assignMatch && !converted.startsWith('return ') && !converted.startsWith('self.')) {
      const varName = assignMatch[1];
      if (!declaredVars.has(varName)) {
        declaredVars.add(varName);
        converted = 'let ' + converted;
      }
    }

    if (converted.endsWith('{')) {
      indentStack.push(indent + 4);
    } else if (!converted.endsWith(';') && !converted.endsWith('{') && converted.trim().length > 0) {
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

function transpileJavaToJs(javaCode, funcName) {
  let code = javaCode;
  code = code.replace(/import\s+.*?;/g, '');
  code = code.replace(/class\s+Solution\s*\{[\s\S]*?public\s+/g, '');
  code = code.replace(/\};?\s*$/g, '');

  code = code.replace(/(?:int\[\]|int|String|boolean|double|List<.*?>|ListNode|TreeNode|void)\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*\{/g, (m, name, args) => {
    const cleanArgs = args.split(',').map(a => a.trim().split(/\s+/).pop().replace(/[&*]/g, '')).filter(Boolean);
    return `function ${name}(${cleanArgs.join(', ')}) {`;
  });

  code = code.replace(/(?:List<.*?>|ArrayList<.*?>)\s+([a-zA-Z0-9_]+)\s*=\s*new\s+ArrayList<.*?>\(\);/g, 'let $1 = [];');
  code = code.replace(/Map<.*?>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+HashMap<.*?>\(\);/g, 'let $1 = {};');
  code = code.replace(/Set<.*?>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+HashSet<.*?>\(\);/g, 'let $1 = new Set();');

  code = code.replace(/([a-zA-Z0-9_]+)\.add\(/g, '$1.push(');
  code = code.replace(/([a-zA-Z0-9_]+)\.size\(\)/g, '$1.length');
  code = code.replace(/([a-zA-Z0-9_]+)\.get\((.*?)\)/g, '$1[$2]');
  code = code.replace(/([a-zA-Z0-9_]+)\.set\((.*?),\s*(.*?)\)/g, '$1[$2] = $3');
  code = code.replace(/([a-zA-Z0-9_]+)\.containsKey\((.*?)\)/g, '($1[$2] !== undefined)');
  code = code.replace(/([a-zA-Z0-9_]+)\.put\((.*?),\s*(.*?)\);/g, '$1[$2] = $3;');
  code = code.replace(/\.equals\((.*?)\)/g, ' == $1');

  code = code.replace(/for\s*\(\s*(?:int|var)\s+([a-zA-Z0-9_]+)\s*=/g, 'for (let $1 =');
  code = code.replace(/\b(?:ListNode|TreeNode|int|double|String|boolean|long|var)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =');
  code = code.replace(/\b(?:ListNode|TreeNode|int|double|String|boolean|long|var)\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = null;');

  code = code.replace(/return\s+new\s+int\[\]\s*\{([^{}]*?)\}\s*;/g, 'return [$1];');
  code = code.replace(/return\s+new\s+int\[0\];/g, 'return [];');

  return code;
}

function transpileTypeScriptToJs(tsCode, funcName) {
  let code = tsCode;
  code = code.replace(/<[A-Za-z0-9_,\s\[\]]+>(?=\s*\()/g, '');
  code = code.replace(/:\s*(?:number\[\]|number|string\[\]|string|boolean|any|void|Record<.*?>|Map<.*?>|Set<.*?>|ListNode\s*\|\s*null|TreeNode\s*\|\s*null|ListNode|TreeNode)(?=[,)={;\n])/g, '');
  code = code.replace(/function\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:\s*[a-zA-Z0-9_\[\]<>\s,|]+\s*\{/g, 'function $1($2) {');
  code = code.replace(/:\s*[a-zA-Z0-9_\[\]<>\s,|]+(?=\s*[=;])/g, '');
  code = code.replace(/as\s+[a-zA-Z0-9_\[\]<>]+/g, '');
  code = code.replace(/!/g, '');
  return code;
}

function compileUserFunction(rawCode, language, funcName) {
  let runnableJs = rawCode;
  if (language === 'python') runnableJs = transpilePythonToJs(rawCode, funcName);
  else if (language === 'cpp') runnableJs = transpileCppToJs(rawCode, funcName);
  else if (language === 'java') runnableJs = transpileJavaToJs(rawCode, funcName);
  else if (language === 'typescript') runnableJs = transpileTypeScriptToJs(rawCode, funcName);

  const snakeName = funcName.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  const wrappedCode = `
    "use strict";
    ${runnableJs}
    if (typeof ${funcName} === 'function') return ${funcName};
    if (typeof ${snakeName} === 'function') return ${snakeName};
    if (typeof Solution === 'function') {
      const inst = new Solution();
      if (typeof inst.${funcName} === 'function') return inst.${funcName}.bind(inst);
      if (typeof inst.${snakeName} === 'function') return inst.${snakeName}.bind(inst);
    }
    throw new ReferenceError("Function '${funcName}' was not defined in your submission.");
  `;
  const factory = new Function('ListNode', 'TreeNode', wrappedCode);
  return factory(ListNode, TreeNode);
}

// Deep comparison
function deepEqual(actual, expected) {
  if (actual === expected) return true;
  if (actual === null || expected === null || actual === undefined || expected === undefined) {
    return actual === expected;
  }
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) < 1e-4;
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!deepEqual(actual[i], expected[i])) return false;
    }
    return true;
  }
  if (typeof actual === 'object' && typeof expected === 'object') {
    const actualKeys = Object.keys(actual).sort();
    const expectedKeys = Object.keys(expected).sort();
    if (actualKeys.length !== expectedKeys.length) return false;
    for (let i = 0; i < actualKeys.length; i++) {
      if (actualKeys[i] !== expectedKeys[i]) return false;
      if (!deepEqual(actual[actualKeys[i]], expected[expectedKeys[i]])) return false;
    }
    return true;
  }
  return String(actual).trim() === String(expected).trim();
}

function evaluateSubmission(problem, userCode, language) {
  const funcName = problem.functionName || problem.slug;
  const fn = compileUserFunction(userCode, language, funcName);

  const isLinkedListProblem = /linked[- ]?list|listnode/i.test(problem.title + ' ' + (problem.topic || '') + ' ' + (problem.tags || []).join(' ') + ' ' + (problem.slug || '')) || /ListNode|->next|\.next\b/.test(userCode);
  const isTreeProblem = /\btree\b|treenode/i.test(problem.title + ' ' + (problem.topic || '') + ' ' + (problem.tags || []).join(' ') + ' ' + (problem.slug || '')) || /TreeNode|->left|\.left\b/.test(userCode);

  for (const tc of problem.testCases) {
    // Parse input args
    const fnBody = '"use strict"; let ' + tc.input + '; return [' + tc.input.split(/,\s*(?=[a-zA-Z_][a-zA-Z0-9_]*\s*=)/).map(p => p.split('=')[0].trim()).join(', ') + '];';
    let args = (new Function(fnBody))();

    // Adapt args
    if (isLinkedListProblem) {
      args = args.map(arg => Array.isArray(arg) ? arrayToListNode(arg) : arg);
    } else if (isTreeProblem) {
      args = args.map(arg => Array.isArray(arg) ? arrayToTreeNode(arg) : arg);
    }

    let actual = fn.apply(null, args);

    if (actual && typeof actual === 'object' && ('val' in actual) && ('next' in actual)) {
      actual = listNodeToArray(actual);
    } else if (actual && typeof actual === 'object' && ('val' in actual) && ('left' in actual || 'right' in actual)) {
      actual = treeNodeToArray(actual);
    }

    let expected = JSON.parse(tc.expected);
    if (!deepEqual(actual, expected)) {
      return { status: 'wa', actual, expected };
    }
  }
  return { status: 'accepted' };
}

// ---------------------- RUN TESTS ----------------------

console.log('--- TEST 1: Palindrome Linked List in C++ ---');
const res1 = evaluateSubmission({
  title: 'Palindrome Linked List (LeetCode #234)',
  slug: 'isPalindrome',
  functionName: 'isPalindrome',
  topic: 'Linked Lists',
  testCases: [
    { input: 'head = [1, 2, 2, 1]', expected: 'true' },
    { input: 'head = [1, 2]', expected: 'false' }
  ]
}, `
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
`, 'cpp');
assert.strictEqual(res1.status, 'accepted');
console.log('✓ C++ Palindrome Linked List passed!');

console.log('--- TEST 2: Reverse Linked List in Python ---');
const res2 = evaluateSubmission({
  title: 'Reverse Linked List (LeetCode #206)',
  slug: 'reverseList',
  functionName: 'reverseList',
  topic: 'Linked Lists',
  testCases: [
    { input: 'head = [1, 2, 3, 4, 5]', expected: '[5, 4, 3, 2, 1]' }
  ]
}, `
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev
`, 'python');
assert.strictEqual(res2.status, 'accepted');
console.log('✓ Python Reverse Linked List passed!');

console.log('--- TEST 3: Invert Binary Tree in Java ---');
const res3 = evaluateSubmission({
  title: 'Invert Binary Tree (LeetCode #226)',
  slug: 'invertTree',
  functionName: 'invertTree',
  topic: 'Binary Trees',
  testCases: [
    { input: 'root = [4, 2, 7, 1, 3, 6, 9]', expected: '[4, 7, 2, 9, 6, 3, 1]' }
  ]
}, `
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}
`, 'java');
assert.strictEqual(res3.status, 'accepted');
console.log('✓ Java Invert Binary Tree passed!');

console.log('--- TEST 4: Two Sum in C++ ---');
const res4 = evaluateSubmission({
  title: 'Two Sum (LeetCode #1)',
  slug: 'twoSum',
  functionName: 'twoSum',
  topic: 'Arrays & Hashing',
  testCases: [
    { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' }
  ]
}, `
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); i++) {
            int comp = target - nums[i];
            if (seen.find(comp) != seen.end()) {
                return {seen[comp], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
`, 'cpp');
assert.strictEqual(res4.status, 'accepted');
console.log('✓ C++ Two Sum passed!');

console.log('\n>>> ALL ALGORITHMIC JUDGE TESTS COMPLETED WITH 100% SUCCESS! <<<');
