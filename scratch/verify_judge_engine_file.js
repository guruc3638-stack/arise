const fs = require('fs');
const assert = require('assert');

// Load judge-engine.js
const code = fs.readFileSync('d:/ARISE/js/judge-engine.js', 'utf8');

const context = {
  window: {},
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};

const fn = new Function('window', 'global', code);
fn(context.window, context.window);

const JudgeEngine = context.window.AriseJudgeEngine;
assert(JudgeEngine, 'AriseJudgeEngine should be exposed');

console.log('Testing User C++ Submission for Palindrome Linked List (#234)...');
const problem234 = {
  id: 'ARISE-P249',
  title: 'Palindrome Linked List (LeetCode #234)',
  slug: 'palindrome-linked-list',
  topic: 'Linked Lists',
  testCases: [
    { id: 1, input: 'head = [1, 2, 2, 1]', expected: 'true' },
    { id: 2, input: 'head = [1, 2]', expected: 'false' }
  ]
};

const userCppCode = `
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

const resCpp = JudgeEngine.evaluate(problem234, userCppCode, 'cpp', false);
console.log('C++ Result:', resCpp);
assert.strictEqual(resCpp.status, 'accepted', 'C++ should be accepted');

console.log('Testing User Python Submission for Palindrome Linked List (#234)...');
const userPyCode = `
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        vals = []
        curr = head
        while curr:
            vals.append(curr.val)
            curr = curr.next
        return vals == vals[::-1]
`;

const resPy = JudgeEngine.evaluate(problem234, userPyCode, 'python', false);
console.log('Python Result:', resPy);
assert.strictEqual(resPy.status, 'accepted', 'Python should be accepted');

console.log('Testing User Java Submission for Palindrome Linked List (#234)...');
const userJavaCode = `
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
            if (!vals.get(left).equals(vals.get(right))) return false;
            left++;
            right--;
        }
        return true;
    }
}
`;

const resJava = JudgeEngine.evaluate(problem234, userJavaCode, 'java', false);
console.log('Java Result:', resJava);
assert.strictEqual(resJava.status, 'accepted', 'Java should be accepted');

console.log('Testing JavaScript Submission for Palindrome Linked List (#234)...');
const userJsCode = `
function isPalindrome(head) {
    let vals = [];
    let curr = head;
    while (curr !== null) {
        vals.push(curr.val);
        curr = curr.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; i++, j--) {
        if (vals[i] !== vals[j]) return false;
    }
    return true;
}
`;

const resJs = JudgeEngine.evaluate(problem234, userJsCode, 'javascript', false);
console.log('JavaScript Result:', resJs);
assert.strictEqual(resJs.status, 'accepted', 'JS should be accepted');

console.log('Testing Reverse Linked List returning ListNode...');
const problem206 = {
  id: 'ARISE-P206',
  title: 'Reverse Linked List (LeetCode #206)',
  slug: 'reverse-linked-list',
  topic: 'Linked Lists',
  testCases: [
    { id: 1, input: 'head = [1, 2, 3, 4, 5]', expected: '[5, 4, 3, 2, 1]' }
  ]
};

const reverseCpp = `
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};
`;

const resRev = JudgeEngine.evaluate(problem206, reverseCpp, 'cpp', false);
console.log('Reverse Linked List C++ Result:', resRev);
assert.strictEqual(resRev.status, 'accepted', 'Reverse Linked List returning ListNode should be accepted');

console.log('Testing Invert Binary Tree in C++...');
const problem226 = {
  id: 'ARISE-P226',
  title: 'Invert Binary Tree (LeetCode #226)',
  slug: 'invert-binary-tree',
  topic: 'Binary Trees',
  testCases: [
    { id: 1, input: 'root = [4, 2, 7, 1, 3, 6, 9]', expected: '[4, 7, 2, 9, 6, 3, 1]' }
  ]
};

const treeCpp = `
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};
`;

const resTree = JudgeEngine.evaluate(problem226, treeCpp, 'cpp', false);
console.log('Tree C++ Result:', resTree);
assert.strictEqual(resTree.status, 'accepted', 'Invert Binary Tree in C++ should be accepted');

console.log('\n=========================================');
console.log('ALL VERIFICATIONS PASSED 100%!');
console.log('=========================================');
