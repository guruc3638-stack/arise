const assert = require('assert');

// 1. Data Structures
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
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

// 2. C++ Transpiler
function transpileCppToJs(cppCode, funcName) {
  let code = cppCode;
  code = code.replace(/#include\s+<.*?>/g, '');
  code = code.replace(/using\s+namespace\s+std\s*;/g, '');
  code = code.replace(/class\s+Solution\s*\{[\s\S]*?public:\s*/g, '');
  code = code.replace(/\};?\s*$/g, '');

  code = code.replace(/->/g, '.');
  code = code.replace(/\bnullptr\b/g, 'null');
  code = code.replace(/\bNULL\b/g, 'null');

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

  code = code.replace(/\(int\)/g, '');
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

// 3. Python Transpiler
function transpilePythonToJs(pyCode, funcName) {
  let code = pyCode.replace(/#.*$/gm, '');
  code = code.replace(/:\s*(?:Optional\[.*?\]|List\[.*?\]|Dict\[.*?\]|Set\[.*?\]|int|str|bool|float|None|ListNode|TreeNode)(?=[,)\n])/g, '');
  code = code.replace(/->\s*.*?:/g, ':');
  code = code.replace(/class\s+Solution\s*:\s*/g, '');

  code = code.replace(/def\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)\s*:/g, (m, name, args) => {
    const cleanArgs = args.split(',').map(a => a.trim().split(':')[0].trim()).filter(a => a && a !== 'self');
    return `function ${name}(${cleanArgs.join(', ')}) {`;
  });

  const jsLines = [];
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

    if (converted.startsWith('elif ')) {
      converted = converted.replace(/^elif\s+(.*?)\s*:$/, 'else if (Boolean($1)) {');
    } else if (converted.startsWith('if ')) {
      converted = converted.replace(/^if\s+(.*?)\s*:$/, 'if (Boolean($1)) {');
    } else if (converted === 'else:') {
      converted = 'else {';
    } else if (converted.startsWith('while ')) {
      converted = converted.replace(/^while\s+(.*?)\s*:$/, 'while (Boolean($1)) {');
    } else if (converted.startsWith('for ')) {
      const rangeMatch = converted.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\)\s*:$/);
      if (rangeMatch) {
        converted = `for (let ${rangeMatch[1]} = 0; ${rangeMatch[1]} < (${rangeMatch[2]}); ${rangeMatch[1]}++) {`;
      }
    }

    converted = converted.replace(/\b([a-zA-Z0-9_]+)\s*==\s*([a-zA-Z0-9_]+)\b/g, (m, a, b) => {
      return `(Array.isArray(${a}) && Array.isArray(${b}) ? JSON.stringify(${a}) === JSON.stringify(${b}) : ${a} === ${b})`;
    });

    converted = converted.replace(/\bTrue\b/g, 'true');
    converted = converted.replace(/\bFalse\b/g, 'false');
    converted = converted.replace(/\bNone\b/g, 'null');
    converted = converted.replace(/\band\b/g, '&&');
    converted = converted.replace(/\bor\b/g, '||');
    converted = converted.replace(/\blen\((.*?)\)/g, '($1).length');
    converted = converted.replace(/\.append\(/g, '.push(');

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

// 4. Java Transpiler
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

function compileCode(rawCode, lang, funcName) {
  let js = rawCode;
  if (lang === 'cpp') js = transpileCppToJs(rawCode, funcName);
  else if (lang === 'python') js = transpilePythonToJs(rawCode, funcName);
  else if (lang === 'java') js = transpileJavaToJs(rawCode, funcName);

  const factory = new Function('ListNode', 'TreeNode', `
    "use strict";
    ${js}
    if (typeof ${funcName} === 'function') return ${funcName};
    if (typeof Solution === 'function') {
      const inst = new Solution();
      if (typeof inst.${funcName} === 'function') return inst.${funcName}.bind(inst);
    }
    throw new ReferenceError("Function '${funcName}' not found");
  `);
  return factory(ListNode, null);
}

// ==========================================
// TEST 1: User's exact C++ code
// ==========================================
console.log('Testing C++ user code...');
const userCpp = `
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

const fnCpp = compileCode(userCpp, 'cpp', 'isPalindrome');
assert.strictEqual(fnCpp(arrayToListNode([1, 2, 2, 1])), true, 'C++ [1, 2, 2, 1]');
assert.strictEqual(fnCpp(arrayToListNode([1, 2])), false, 'C++ [1, 2]');
console.log('✓ C++ passed!');

// ==========================================
// TEST 2: Python user code
// ==========================================
console.log('Testing Python user code...');
const userPy = `
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        vals = []
        curr = head
        while curr:
            vals.append(curr.val)
            curr = curr.next
        return vals == vals[::-1]
`;

const fnPy = compileCode(userPy, 'python', 'isPalindrome');
assert.strictEqual(fnPy(arrayToListNode([1, 2, 2, 1])), true, 'Python [1, 2, 2, 1]');
assert.strictEqual(fnPy(arrayToListNode([1, 2])), false, 'Python [1, 2]');
console.log('✓ Python passed!');

// ==========================================
// TEST 3: Java user code
// ==========================================
console.log('Testing Java user code...');
const userJava = `
class Solution {
    public boolean isPalindrome(ListNode head) {
        List<Integer> vals = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            vals.add(curr.val);
            curr = curr.next;
        }
        int left = 0;
        int right = vals.size() - 1;
        while (left < right) {
            if (vals.get(left) != vals.get(right)) return false;
            left++;
            right--;
        }
        return true;
    }
}
`;

const fnJava = compileCode(userJava, 'java', 'isPalindrome');
assert.strictEqual(fnJava(arrayToListNode([1, 2, 2, 1])), true, 'Java [1, 2, 2, 1]');
assert.strictEqual(fnJava(arrayToListNode([1, 2])), false, 'Java [1, 2]');
console.log('✓ Java passed!');

console.log('\nALL MULTI-LANGUAGE TEST CASES PASSED SUCCESSFULLY!');
