const fs = require('fs');

const jsData = {
  "ARISE-P101": {
    funcName: "calibrateSensors",
    starter: `/**
 * @param {number[]} sensorReadings
 * @param {number} target
 * @return {number[]}
 */
function calibrateSensors(sensorReadings, target) {
    // Write your optimal O(N) single-pass hash map solution
    
}`,
    solution: `function calibrateSensors(sensorReadings, target) {
    const seen = new Map();
    for (let i = 0; i < sensorReadings.length; i++) {
        const comp = target - sensorReadings[i];
        if (seen.has(comp)) {
            return [seen.get(comp), i];
        }
        seen.set(sensorReadings[i], i);
    }
    return [];
}`
  },
  "ARISE-P102": {
    funcName: "isValidPacket",
    starter: `/**
 * @param {string} frameStr
 * @return {boolean}
 */
function isValidPacket(frameStr) {
    // Write your stack-based bracket verification
    
}`,
    solution: `function isValidPacket(frameStr) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };
    for (const ch of frameStr) {
        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(ch);
        } else if (pairs[ch]) {
            if (stack.pop() !== pairs[ch]) return false;
        }
    }
    return stack.length === 0;
}`
  },
  "ARISE-P103": {
    funcName: "maxTelemetryGain",
    starter: `/**
 * @param {number[]} telemetryMetrics
 * @return {number}
 */
function maxTelemetryGain(telemetryMetrics) {
    // Write your optimal single-pass tracking logic
    
}`,
    solution: `function maxTelemetryGain(telemetryMetrics) {
    let minVal = Infinity, maxGain = 0;
    for (const m of telemetryMetrics) {
        if (m < minVal) minVal = m;
        else if (m - minVal > maxGain) maxGain = m - minVal;
    }
    return maxGain;
}`
  },
  "ARISE-P104": {
    funcName: "isSymmetric",
    starter: `/**
 * @param {number[]} root
 * @return {boolean}
 */
function isSymmetric(root) {
    // Write your mirror comparison logic
    
}`,
    solution: `function isSymmetric(root) {
    if (!root || root.length <= 1) return true;
    let idx = 1, levelSize = 2;
    while (idx < root.length) {
        const level = root.slice(idx, idx + levelSize);
        for (let i = 0; i < level.length / 2; i++) {
            if (level[i] !== level[level.length - 1 - i]) return false;
        }
        idx += levelSize;
        levelSize *= 2;
    }
    return true;
}`
  },
  "ARISE-P105": {
    funcName: "maxSubArray",
    starter: `/**
 * @param {number[]} signalStream
 * @return {number}
 */
function maxSubArray(signalStream) {
    // Write Kadane's algorithm here
    
}`,
    solution: `function maxSubArray(signalStream) {
    let curr = signalStream[0], maxEnergy = signalStream[0];
    for (let i = 1; i < signalStream.length; i++) {
        curr = Math.max(signalStream[i], curr + signalStream[i]);
        maxEnergy = Math.max(maxEnergy, curr);
    }
    return maxEnergy;
}`
  },
  "ARISE-P106": {
    funcName: "reverseList",
    starter: `/**
 * @param {number[]} head
 * @return {number[]}
 */
function reverseList(head) {
    // Invert the sequential chain
    
}`,
    solution: `function reverseList(head) {
    if (!Array.isArray(head)) return head;
    return [...head].reverse();
}`
  },
  "ARISE-P107": {
    funcName: "search",
    starter: `/**
 * @param {number[]} sensorLog
 * @param {number} target
 * @return {number}
 */
function search(sensorLog, target) {
    // Write O(log N) binary search
    
}`,
    solution: `function search(sensorLog, target) {
    let l = 0, r = sensorLog.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (sensorLog[mid] === target) return mid;
        if (sensorLog[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
  },
  "ARISE-P108": {
    funcName: "containsDuplicate",
    starter: `/**
 * @param {number[]} deviceIds
 * @return {boolean}
 */
function containsDuplicate(deviceIds) {
    // Identify any recurring device identifier
    
}`,
    solution: `function containsDuplicate(deviceIds) {
    return new Set(deviceIds).size !== deviceIds.length;
}`
  },
  "ARISE-P109": {
    funcName: "climbStairs",
    starter: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    // Dynamic programming progression
    
}`,
    solution: `function climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const next = a + b;
        a = b;
        b = next;
    }
    return b;
}`
  },
  "ARISE-P201": {
    funcName: "threeSumEquilibrium",
    starter: `/**
 * @param {number[]} sensorOffsets
 * @return {number[][]}
 */
function threeSumEquilibrium(sensorOffsets) {
    // Find all unique triplets summing to 0
    
}`,
    solution: `function threeSumEquilibrium(sensorOffsets) {
    sensorOffsets.sort((a, b) => a - b);
    const triplets = [];
    for (let i = 0; i < sensorOffsets.length - 2; i++) {
        if (i > 0 && sensorOffsets[i] === sensorOffsets[i - 1]) continue;
        let l = i + 1, r = sensorOffsets.length - 1;
        while (l < r) {
            const sum = sensorOffsets[i] + sensorOffsets[l] + sensorOffsets[r];
            if (sum === 0) {
                triplets.push([sensorOffsets[i], sensorOffsets[l], sensorOffsets[r]]);
                while (l < r && sensorOffsets[l] === sensorOffsets[l + 1]) l++;
                while (l < r && sensorOffsets[r] === sensorOffsets[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return triplets;
}`
  },
  "ARISE-P202": {
    funcName: "lengthOfLongestSubstring",
    starter: `/**
 * @param {string} tokenStream
 * @return {number}
 */
function lengthOfLongestSubstring(tokenStream) {
    // Sliding window for longest distinct substring
    
}`,
    solution: `function lengthOfLongestSubstring(tokenStream) {
    const seen = new Map();
    let maxLen = 0, l = 0;
    for (let r = 0; r < tokenStream.length; r++) {
        const ch = tokenStream[r];
        if (seen.has(ch) && seen.get(ch) >= l) {
            l = seen.get(ch) + 1;
        }
        seen.set(ch, r);
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`
  },
  "ARISE-P203": {
    funcName: "maxReservoirCapacity",
    starter: `/**
 * @param {number[]} markerHeights
 * @return {number}
 */
function maxReservoirCapacity(markerHeights) {
    // Two-pointer maximal area
    
}`,
    solution: `function maxReservoirCapacity(markerHeights) {
    let l = 0, r = markerHeights.length - 1, maxCap = 0;
    while (l < r) {
        const h = Math.min(markerHeights[l], markerHeights[r]);
        maxCap = Math.max(maxCap, h * (r - l));
        if (markerHeights[l] < markerHeights[r]) l++;
        else r--;
    }
    return maxCap;
}`
  },
  "ARISE-P204": {
    funcName: "productExceptSelf",
    starter: `/**
 * @param {number[]} nodeLoads
 * @return {number[]}
 */
function productExceptSelf(nodeLoads) {
    // O(N) products without division
    
}`,
    solution: `function productExceptSelf(nodeLoads) {
    const n = nodeLoads.length;
    const res = new Array(n).fill(1);
    let left = 1;
    for (let i = 0; i < n; i++) {
        res[i] = left;
        left *= nodeLoads[i];
    }
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nodeLoads[i];
    }
    return res;
}`
  },
  "ARISE-P205": {
    funcName: "coinChange",
    starter: `/**
 * @param {number[]} tokenDenominations
 * @param {number} targetQuota
 * @return {number}
 */
function coinChange(tokenDenominations, targetQuota) {
    // Dynamic programming coin change
    
}`,
    solution: `function coinChange(tokenDenominations, targetQuota) {
    const dp = new Array(targetQuota + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= targetQuota; i++) {
        for (const coin of tokenDenominations) {
            if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[targetQuota] === Infinity ? -1 : dp[targetQuota];
}`
  },
  "ARISE-P206": {
    funcName: "search",
    starter: `/**
 * @param {number[]} metricRegister
 * @param {number} target
 * @return {number}
 */
function search(metricRegister, target) {
    // O(log N) search on rotated sorted array
    
}`,
    solution: `function search(metricRegister, target) {
    let l = 0, r = metricRegister.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (metricRegister[mid] === target) return mid;
        if (metricRegister[l] <= metricRegister[mid]) {
            if (metricRegister[l] <= target && target < metricRegister[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (metricRegister[mid] < target && target <= metricRegister[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`
  },
  "ARISE-P207": {
    funcName: "LRUCache",
    starter: `class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        // Return value or -1
        return -1;
    }
    put(key, value) {
        // Insert or update key
    }
}`,
    solution: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}`
  },
  "ARISE-P208": {
    funcName: "numIslands",
    starter: `/**
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    // DFS / BFS island counting
    
}`,
    solution: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    let count = 0;
    const m = grid.length, n = grid[0].length;
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`
  },
  "ARISE-P209": {
    funcName: "groupAnagrams",
    starter: `/**
 * @param {string[]} eventTokens
 * @return {string[][]}
 */
function groupAnagrams(eventTokens) {
    // Group anagrams using sorted token keys
    
}`,
    solution: `function groupAnagrams(eventTokens) {
    const map = new Map();
    for (const s of eventTokens) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
}`
  },
  "ARISE-P301": {
    funcName: "trapRainwater",
    starter: `/**
 * @param {number[]} elevationProfiles
 * @return {number}
 */
function trapRainwater(elevationProfiles) {
    // Two-pointer water trapped
    
}`,
    solution: `function trapRainwater(elevationProfiles) {
    let l = 0, r = elevationProfiles.length - 1, leftMax = 0, rightMax = 0, water = 0;
    while (l < r) {
        if (elevationProfiles[l] < elevationProfiles[r]) {
            if (elevationProfiles[l] >= leftMax) leftMax = elevationProfiles[l];
            else water += leftMax - elevationProfiles[l];
            l++;
        } else {
            if (elevationProfiles[r] >= rightMax) rightMax = elevationProfiles[r];
            else water += rightMax - elevationProfiles[r];
            r--;
        }
    }
    return water;
}`
  },
  "ARISE-P302": {
    funcName: "findMedianSortedArrays",
    starter: `/**
 * @param {number[]} streamA
 * @param {number[]} streamB
 * @return {number}
 */
function findMedianSortedArrays(streamA, streamB) {
    // Compute median of two sorted streams
    
}`,
    solution: `function findMedianSortedArrays(streamA, streamB) {
    const merged = [];
    let i = 0, j = 0;
    while (i < streamA.length && j < streamB.length) {
        if (streamA[i] < streamB[j]) merged.push(streamA[i++]);
        else merged.push(streamB[j++]);
    }
    while (i < streamA.length) merged.push(streamA[i++]);
    while (j < streamB.length) merged.push(streamB[j++]);
    const n = merged.length;
    if (n % 2 === 1) return merged[Math.floor(n / 2)];
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
}`
  },
  "ARISE-P303": {
    funcName: "mergeKLists",
    starter: `/**
 * @param {number[][]} lists
 * @return {number[]}
 */
function mergeKLists(lists) {
    // Merge k sorted streams into one sorted stream
    
}`,
    solution: `function mergeKLists(lists) {
    const flat = [];
    for (const l of lists) {
        if (Array.isArray(l)) flat.push(...l);
    }
    flat.sort((a, b) => a - b);
    return flat;
}`
  },
  "ARISE-P304": {
    funcName: "minWindow",
    starter: `/**
 * @param {string} signalStr
 * @param {string} targetPattern
 * @return {string}
 */
function minWindow(signalStr, targetPattern) {
    // Sliding window minimum substring
    
}`,
    solution: `function minWindow(signalStr, targetPattern) {
    if (!targetPattern || !signalStr) return "";
    const need = {}, window = {};
    for (const ch of targetPattern) need[ch] = (need[ch] || 0) + 1;
    let have = 0, required = Object.keys(need).length;
    let res = [-1, -1], resLen = Infinity, l = 0;
    for (let r = 0; r < signalStr.length; r++) {
        const c = signalStr[r];
        window[c] = (window[c] || 0) + 1;
        if (need[c] && window[c] === need[c]) have++;
        while (have === required) {
            if (r - l + 1 < resLen) {
                res = [l, r];
                resLen = r - l + 1;
            }
            window[signalStr[l]]--;
            if (need[signalStr[l]] && window[signalStr[l]] < need[signalStr[l]]) have--;
            l++;
        }
    }
    return resLen === Infinity ? "" : signalStr.slice(res[0], res[1] + 1);
}`
  },
  "ARISE-P305": {
    funcName: "maxSlidingWindow",
    starter: `/**
 * @param {number[]} sensorStream
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(sensorStream, k) {
    // Monotonic deque sliding window maximum
    
}`,
    solution: `function maxSlidingWindow(sensorStream, k) {
    const res = [], deque = [];
    for (let i = 0; i < sensorStream.length; i++) {
        while (deque.length && deque[0] < i - k + 1) deque.shift();
        while (deque.length && sensorStream[deque[deque.length - 1]] < sensorStream[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) res.push(sensorStream[deque[0]]);
    }
    return res;
}`
  },
  "ARISE-P306": {
    funcName: "solveNQueens",
    starter: `/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {
    // Backtracking non-conflicting placements
    
}`,
    solution: `function solveNQueens(n) {
    const res = [];
    const cols = new Set(), posDiag = new Set(), negDiag = new Set();
    const board = Array.from({ length: n }, () => new Array(n).fill('.'));
    function backtrack(r) {
        if (r === n) {
            res.push(board.map(row => row.join('')));
            return;
        }
        for (let c = 0; c < n; c++) {
            if (cols.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) continue;
            cols.add(c); posDiag.add(r + c); negDiag.add(r - c);
            board[r][c] = 'Q';
            backtrack(r + 1);
            cols.delete(c); posDiag.delete(r + c); negDiag.delete(r - c);
            board[r][c] = '.';
        }
    }
    backtrack(0);
    return res;
}`
  }
};

let content = fs.readFileSync('d:/ARISE/js/data.js', 'utf8');
content += '\n; global.ARISE_DATA = ARISE_DATA;';
eval(content);

const problems = global.ARISE_DATA.problems;
problems.forEach(p => {
  const meta = jsData[p.id];
  if (meta) {
    p.functionName = meta.funcName;
    if (!p.starterCode) p.starterCode = {};
    p.starterCode.javascript = meta.starter;
    if (!p.solution) p.solution = {};
    if (!p.solution.code) p.solution.code = {};
    p.solution.code.javascript = meta.solution;
  }
});

// Now read original data.js and inject the new data
const beforeProblems = fs.readFileSync('d:/ARISE/js/data.js', 'utf8').split('problems: [')[0];
const afterProblems = fs.readFileSync('d:/ARISE/js/data.js', 'utf8').split('  // Topics')[1];

const updatedProblemsJson = JSON.stringify(problems, null, 2);
const finalDataContent = beforeProblems + 'problems: ' + updatedProblemsJson + ',\n\n  // Topics' + afterProblems;

fs.writeFileSync('d:/ARISE/js/data.js', finalDataContent, 'utf8');
console.log('Successfully updated d:/ARISE/js/data.js with functionName and JavaScript starterCode/solutions for all 24 problems!');
