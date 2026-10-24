const fs = require('fs');
const judgeCode = fs.readFileSync('d:/ARISE/js/judge-engine.js', 'utf8');
eval(judgeCode);

const cppSample = `
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

console.log('--- Testing C++ Transpiler ---');
try {
  const js = AriseJudgeEngine.transpileCppToJs(cppSample, 'isPalindrome');
  console.log('TRANSPILED JS:\n' + js);
  const fn = AriseJudgeEngine.compileUserFunction(cppSample, 'cpp', 'isPalindrome');
  console.log('Compiled OK!');
} catch (e) {
  console.error('COMPILE ERROR:', e.message);
}
