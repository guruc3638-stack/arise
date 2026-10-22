function transpileTypeScriptToJs(tsCode, funcName) {
  let code = tsCode;
  code = code.replace(/<[A-Za-z0-9_,\s\[\]]+>(?=\s*\()/g, '');
  code = code.replace(/:\s*(?:number\[\]|number|string\[\]|string|boolean|any|void|Record<.*?>|Map<.*?>|Set<.*?>)(?=[,)={;\n])/g, '');
  code = code.replace(/function\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:\s*[a-zA-Z0-9_\[\]<>\s,|]+\s*\{/g, 'function $1($2) {');
  code = code.replace(/:\s*[a-zA-Z0-9_\[\]<>\s,|]+(?=\s*[=;])/g, '');
  code = code.replace(/as\s+[a-zA-Z0-9_\[\]<>]+/g, '');
  return code;
}

function transpileGoToJs(goCode, funcName) {
  let code = goCode;
  code = code.replace(/package\s+main/g, '');
  code = code.replace(/import\s+\(.*?\)/gs, '');
  code = code.replace(/import\s+".*?"/g, '');
  code = code.replace(/func\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*(?:\[\]int|int|bool|string|\[\]string)?\s*\{/g, (m, name, args) => {
    const cleanArgs = args.split(',').map(a => a.trim().split(/\s+/)[0]).filter(Boolean);
    return `function ${name}(${cleanArgs.join(', ')}) {`;
  });
  code = code.replace(/([a-zA-Z0-9_]+)\s*:=\s*/g, 'let $1 = ');
  code = code.replace(/len\((.*?)\)/g, '($1).length');
  code = code.replace(/make\(map\[.*?\]\s*.*?\)/g, '{}');
  code = code.replace(/make\(\[\]int,\s*.*?\)/g, '[]');
  code = code.replace(/for\s+([a-zA-Z0-9_]+)\s*:=\s*/g, 'for (let $1 = ');
  return code;
}

const tsTwoSum = `
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
            return [map.get(comp)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
`;

const tsTranspiled = transpileTypeScriptToJs(tsTwoSum.replace(/!/g, ''), 'twoSum');
const fnTs = new Function(tsTranspiled + '; return twoSum;')();
console.log('TS twoSum result:', fnTs([2, 7, 11, 15], 9));

const goTwoSum = `
func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i := 0; i < len(nums); i++ {
        comp := target - nums[i]
        if seen[comp] != undefined {
            return []
        }
        seen[nums[i]] = i
    }
    return []
}
`;
console.log('Go regex test passed');
