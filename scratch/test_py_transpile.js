const fs = require('fs');
const judgeCode = fs.readFileSync('d:/ARISE/js/judge-engine.js', 'utf8');
eval(judgeCode);

const pySample = `
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        vals = []
        curr = head
        while curr:
            vals.append(curr.val)
            curr = curr.next
        return vals == vals[::-1]
`;

console.log('--- Testing Python Transpiler ---');
try {
  const js = AriseJudgeEngine.transpilePythonToJs(pySample, 'isPalindrome');
  console.log('TRANSPILED JS:\n' + js);
  const fn = AriseJudgeEngine.compileUserFunction(pySample, 'python', 'isPalindrome');
  console.log('Compiled OK!');
} catch (e) {
  console.error('COMPILE ERROR:', e.message);
}
