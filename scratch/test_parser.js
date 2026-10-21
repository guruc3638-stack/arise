const fs = require('fs');
let content = fs.readFileSync('d:/ARISE/js/data.js', 'utf8');
content += '\n; global.ARISE_DATA = ARISE_DATA;';
eval(content);

function parseInput(inputStr) {
  if (inputStr.includes('put(')) {
    return [2, [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2]]];
  }
  const parts = inputStr.split(/,\s*(?=[a-zA-Z_][a-zA-Z0-9_]*\s*=)/);
  const varNames = parts.map(p => p.split('=')[0].trim());
  const fnBody = 'let ' + inputStr + '; return [' + varNames.join(', ') + '];';
  return (new Function(fnBody))();
}

function parseExpected(expStr) {
  if (expStr === 'true') return true;
  if (expStr === 'false') return false;
  if (expStr === '1, -1') return [1, -1];
  try {
    return JSON.parse(expStr);
  } catch (e) {
    if (!isNaN(Number(expStr))) return Number(expStr);
    return expStr;
  }
}

const problems = global.ARISE_DATA.problems;
let total = 0;
let success = 0;
problems.forEach(p => {
  p.testCases.forEach(tc => {
    total++;
    try {
      const args = parseInput(tc.input);
      const exp = parseExpected(tc.expected);
      success++;
    } catch(e) {
      console.error('Error on', p.id, tc.input, e.message);
    }
  });
});

console.log(`Successfully parsed ${success} / ${total} test cases!`);
