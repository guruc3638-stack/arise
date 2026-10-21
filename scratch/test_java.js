const fs = require('fs');
const javaCode = `
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

function transpileJavaToJs(javaCode, funcName) {
    let code = javaCode;
    code = code.replace(/import\s+.*?;/g, '');
    code = code.replace(/class\s+Solution\s*\{[\s\S]*?public\s+/g, '');
    code = code.replace(/\};?\s*$/g, '');

    code = code.replace(/(?:int\[\]|int|String|boolean|double|List<.*?>)\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*\{/g, (m, name, args) => {
      const cleanArgs = args.split(',').map(a => a.trim().split(/\s+/).pop().replace(/[&*]/g, '')).filter(Boolean);
      return `function ${name}(${cleanArgs.join(', ')}) {`;
    });

    code = code.replace(/Map<.*?>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+HashMap<.*?>\(\);/g, 'let $1 = {};');
    code = code.replace(/Set<.*?>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+HashSet<.*?>\(\);/g, 'let $1 = new Set();');
    code = code.replace(/([a-zA-Z0-9_]+)\.containsKey\((.*?)\)/g, '($1[$2] !== undefined)');
    code = code.replace(/([a-zA-Z0-9_]+)\.get\((.*?)\)/g, '$1[$2]');
    code = code.replace(/([a-zA-Z0-9_]+)\.put\((.*?),\s*(.*?)\);/g, '$1[$2] = $3;');

    code = code.replace(/for\s*\(\s*int\s+([a-zA-Z0-9_]+)\s*=/g, 'for (let $1 =');
    code = code.replace(/\b(?:int|double|String|boolean|long)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =');

    code = code.replace(/return\s+new\s+int\[\]\s*\{([^{}]*?)\}\s*;/g, 'return [$1];');
    code = code.replace(/return\s+new\s+int\[0\];/g, 'return [];');

    return code;
}

const js = transpileJavaToJs(javaCode, 'calibrateSensors');
console.log('Transpiled JS:\n', js);
eval(js);
console.log('Test run:', calibrateSensors([12, 17, 24, 31, 45], 41));
