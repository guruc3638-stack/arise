const fs = require('fs');

const path = 'd:/ARISE/js/data.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update currentUser to start at 0 verifiedXp, 0 solved, Unranked
const oldCurrentUser = `  currentUser: {
    uid: "ARISE-7K2M9Q",
    displayName: "Rohan Deshmukh",
    handle: "rohan_coder",
    college: "COEP Technological University, Pune",
    district: "Pune",
    state: "Maharashtra",
    avatar: "RD",
    avatarBg: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
    verifiedXp: 3420, // Strictly from judge-confirmed solves
    rank: {
      college: 3,
      district: 8,
      maharashtra: 14,
      india: 86
    },
    rankMovement: "+2", // ▲ 2
    solvedStats: {
      total: 48,
      easy: 26,
      medium: 18,
      hard: 4
    },
    acceptanceRate: "72.4%",
    coursesCompleted: 2,
    privacySetting: "public", // 'public' | 'friends' | 'private'
    joinedDate: "October 2025"
  },`;

const newCurrentUser = `  currentUser: {
    uid: "ARISE-7K2M9Q",
    displayName: "Rohan Deshmukh",
    handle: "rohan_coder",
    college: "COEP Technological University, Pune",
    district: "Pune",
    state: "Maharashtra",
    avatar: "RD",
    avatarBg: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
    verifiedXp: 0, // Starts at 0 until judge accepts problem solution
    rank: {
      college: null,
      district: null,
      maharashtra: null,
      india: null
    },
    rankDisplay: "Unranked",
    rankMovement: "—",
    solvedStats: {
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0
    },
    acceptanceRate: "—",
    coursesCompleted: 0,
    privacySetting: "public", // 'public' | 'friends' | 'private'
    joinedDate: "October 2025"
  },`;

if (content.includes(oldCurrentUser)) {
  content = content.replace(oldCurrentUser, newCurrentUser);
  console.log('Replaced currentUser');
} else {
  console.log('Could not find exact oldCurrentUser snippet, checking substring');
}

// 2. Ensure all topics have solved: 0, userSolved: 0
content = content.replace(/\{ id: "([a-z-]+)", name: "([^"]+)", desc: "([^"]+)", total: (\d+), solved: \d+, easy: (\d+), medium: (\d+), hard: (\d+) \}/g, 
  '{ id: "$1", name: "$2", desc: "$3", total: $4, solved: 0, userSolved: 0, easy: $5, medium: $6, hard: $7 }');

// 3. In problems array, replace all "status": "Solved" and "status": "Attempted" with "status": "Unsolved"
// Only within problems
content = content.replace(/"status": "(?:Solved|Attempted)"/g, '"status": "Unsolved"');

// 4. In submissions array for problems, clear initial mock submissions:
content = content.replace(/"submissions": \[\s*\{[\s\S]*?\}\s*\]/g, '"submissions": []');

// 5. Add helper functions at the end if not already present
const helpersCode = `
/* ==========================================================================
   DYNAMIC TOPIC PROGRESS HELPERS
   ========================================================================== */
function getTopicSolvedCount(topic) {
  if (!topic) return 0;
  if (typeof topic.userSolved === 'number') {
    return topic.userSolved;
  }
  if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.problems)) {
    const topicNameLower = (topic.name || '').trim().toLowerCase();
    const topicIdLower = (topic.id || '').trim().toLowerCase();
    const count = ARISE_DATA.problems.filter(p => {
      const pTopic = (p.topic || '').trim().toLowerCase();
      return (pTopic === topicNameLower || pTopic === topicIdLower || (topicIdLower.length > 2 && pTopic.includes(topicIdLower))) && p.status === 'Solved';
    }).length;
    return count;
  }
  return topic.solved || 0;
}

function updateTopicOnSolved(problem) {
  if (!problem || !problem.topic || typeof ARISE_DATA === 'undefined' || !Array.isArray(ARISE_DATA.topics)) return null;
  const pTopicLower = problem.topic.trim().toLowerCase();
  const topicObj = ARISE_DATA.topics.find(t => {
    const tName = (t.name || '').trim().toLowerCase();
    const tId = (t.id || '').trim().toLowerCase();
    return tName === pTopicLower || tId === pTopicLower || (tId.length > 2 && pTopicLower.includes(tId)) || (tName.includes(pTopicLower));
  });
  if (topicObj) {
    const current = getTopicSolvedCount(topicObj);
    topicObj.userSolved = current + 1;
    topicObj.solved = topicObj.userSolved;
    return topicObj;
  }
  return null;
}

function resetAllTopicSolves() {
  if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.topics)) {
    ARISE_DATA.topics.forEach(t => {
      t.userSolved = 0;
      t.solved = 0;
    });
  }
  if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.problems)) {
    ARISE_DATA.problems.forEach(p => {
      p.status = 'Unsolved';
    });
  }
}

if (typeof window !== 'undefined') {
  window.getTopicSolvedCount = getTopicSolvedCount;
  window.updateTopicOnSolved = updateTopicOnSolved;
  window.resetAllTopicSolves = resetAllTopicSolves;
}
if (typeof globalThis !== 'undefined') {
  globalThis.getTopicSolvedCount = getTopicSolvedCount;
  globalThis.updateTopicOnSolved = updateTopicOnSolved;
  globalThis.resetAllTopicSolves = resetAllTopicSolves;
}
`;

if (!content.includes('function getTopicSolvedCount')) {
  content = content.trim() + '\n' + helpersCode;
  console.log('Appended dynamic topic progress helpers to data.js');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully written updated data.js');
