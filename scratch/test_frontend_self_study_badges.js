const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

// 1. Verify function exports in self-study.js and profile.js
const selfStudySource = fs.readFileSync('d:/ARISE/js/screens/self-study.js', 'utf8');
assert(selfStudySource.includes('renderSelfStudyScreen'), 'must contain renderSelfStudyScreen');
assert(selfStudySource.includes('renderSelfStudyLibrary'), 'must contain renderSelfStudyLibrary');
assert(selfStudySource.includes('renderPdfReaderScreen'), 'must contain renderPdfReaderScreen');
assert(selfStudySource.includes('openUploadDocumentModal'), 'must contain openUploadDocumentModal');
assert(selfStudySource.includes('toggleStudyTimer'), 'must contain toggleStudyTimer');
assert(selfStudySource.includes('finishStudySession'), 'must contain finishStudySession');

const profileSource = fs.readFileSync('d:/ARISE/js/screens/profile.js', 'utf8');
assert(profileSource.includes('renderBadgesScreen'), 'must contain renderBadgesScreen');
assert(profileSource.includes('openBadgeDetail'), 'must contain openBadgeDetail');

// 2. Setup simulated browser environment
const toasts = [];
const apiCalls = [];

const sandbox = {
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
  window: {
    location: { hash: '' },
    history: { pushState: () => {}, replaceState: () => {} },
    scrollTo: () => {}
  },
  document: {
    getElementById(id) {
      if (id === 'upload-file-status') return { style: {} };
      if (id === 'upload-file-name') return { textContent: '' };
      if (id === 'upload-file-size') return { textContent: '' };
      if (id === 'upload-doc-modal') return { classList: { remove: () => {}, add: () => {} } };
      if (id === 'session-summary-modal') return { classList: { remove: () => {}, add: () => {} } };
      if (id === 'badge-detail-modal') return { classList: { remove: () => {}, add: () => {} } };
      return null;
    },
    createElement() {
      return {
        id: '',
        className: '',
        innerHTML: '',
        classList: { add: () => {}, remove: () => {} }
      };
    },
    body: {
      appendChild: () => {}
    }
  },
  localStorage: {
    store: { arise_token: 'dummy-token' },
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; }
  },
  showToast(msg, type) {
    toasts.push({ msg, type });
  },
  confirm() { return true; },
  console: { log: console.log, warn: console.warn, error: console.error },
  ARISE_DATA: {
    currentUser: {
      uid: 'AR-STUDENT77',
      displayName: 'Rahul Shinde',
      college: 'Walchand College of Engineering',
      district: 'Sangli',
      state: 'Maharashtra',
      verifiedXp: 40,
      rank: { maharashtra: 5 },
      coursesCompleted: 0
    },
    studyLibrary: [],
    badges: []
  },
  FormData: class {
    constructor() { this.fields = {}; }
    append(k, v) { this.fields[k] = v; }
  },
  fetch: async (url, opts = {}) => {
    apiCalls.push({ url, method: opts.method || 'GET', body: opts.body });
    const method = opts.method || 'GET';
    const path = url.replace('http://localhost:8000/api/v1', '');

    if (path === '/study-files' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => sandbox.mockFiles || []
      };
    }

    if (path === '/study-files' && method === 'POST') {
      return {
        ok: true,
        status: 201,
        json: async () => ({
          id: 'file-doc-1',
          user_id: 'usr-1',
          original_filename: 'network_flow_research.pdf',
          mime_type: 'application/pdf',
          size_bytes: 2048576,
          storage_key: 'keys/file-doc-1.pdf',
          created_at: new Date().toISOString()
        })
      };
    }

    if (path === '/study-files/file-doc-1' && method === 'DELETE') {
      sandbox.mockFiles = [];
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      };
    }

    if (path === '/study-sessions' && method === 'POST') {
      return {
        ok: true,
        status: 201,
        json: async () => ({
          id: 'sess-100',
          user_id: 'usr-1',
          started_at: new Date().toISOString()
        })
      };
    }

    if (path === '/study-sessions/sess-100/finish' && method === 'POST') {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 'sess-100',
          duration_seconds: 1800,
          ended_at: new Date().toISOString()
        })
      };
    }

    if (path === '/study-sessions/summary' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          total_seconds: 1800,
          total_minutes: 30,
          total_hours: 0.5,
          session_count: 1,
          last_session_at: new Date().toISOString()
        })
      };
    }

    if (path === '/me/badges' && method === 'GET') {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          total_unlocked: 1,
          badges: [
            {
              id: 'b-first-solve',
              slug: 'b-first-solve',
              name: 'First Blood',
              description: 'Awarded on your first judge-verified problem solve.',
              category: 'DSA Milestones',
              icon_key: 'zap',
              is_unlocked: true,
              unlocked_at: new Date().toISOString(),
              progress_percent: 100,
              requirement: 'Solve 1 verified DSA problem in the sandbox.'
            },
            {
              id: 'b-century-50',
              slug: 'b-century-50',
              name: 'Half Century',
              description: 'Solve 50 unique algorithm problems.',
              category: 'DSA Milestones',
              icon_key: 'award',
              is_unlocked: false,
              unlocked_at: null,
              progress_percent: 2,
              requirement: 'Requires 50 verified problem solves (Current: 1/50).'
            },
            {
              id: 'b-algo-scholar',
              slug: 'b-algo-scholar',
              name: 'Algorithm Scholar',
              description: 'Complete any structured CS track with final score >= 80%.',
              category: 'Academy Tracks',
              icon_key: 'book-open',
              is_unlocked: false,
              unlocked_at: null,
              progress_percent: 0,
              requirement: 'Complete any structured track with score >= 80%.'
            }
          ]
        })
      };
    }

    return {
      ok: false,
      status: 404,
      json: async () => ({ detail: 'Not found' })
    };
  }
};

vm.createContext(sandbox);

const stateSource = fs.readFileSync('d:/ARISE/js/state.js', 'utf8');
vm.runInContext(stateSource + '\n;globalThis.AriseState = AriseState;', sandbox);
vm.runInContext(selfStudySource, sandbox);
vm.runInContext(profileSource, sandbox);

async function runTests() {
  console.log('--- Testing Phase 6: Self Study Library, Private PDF Upload & Badges ---');

  const AriseState = sandbox.AriseState;

  // 1. Initial State: Clean account
  assert.strictEqual(AriseState.studyFiles.length, 0, 'Initially 0 study files');
  assert.strictEqual(AriseState.badgesList.length, 0, 'Initially 0 badges loaded');

  // Test empty library HTML rendering
  const emptyLibraryHtml = sandbox.renderSelfStudyLibrary();
  assert(emptyLibraryHtml.includes('Self Study Library'), 'Library renders header');
  assert(emptyLibraryHtml.includes('No study documents uploaded yet'), 'Clean account shows empty state');
  assert(emptyLibraryHtml.includes('Rule 7:'), 'Disclaimer strip emphasizes Rule 7 0 XP rule');

  // 2. Client-side Upload Validation
  // Non-PDF rejected
  const fakeTxt = { name: 'notes.txt', type: 'text/plain', size: 1000 };
  let txtError = null;
  try {
    await AriseState.uploadStudyPdf(fakeTxt);
  } catch (err) {
    txtError = err;
  }
  assert(txtError !== null, 'Non-PDF file must be rejected');
  assert.strictEqual(txtError.status, 400);

  // Oversized (>10MB) rejected
  const giantPdf = { name: 'huge.pdf', type: 'application/pdf', size: 11 * 1024 * 1024 };
  let sizeError = null;
  try {
    await AriseState.uploadStudyPdf(giantPdf);
  } catch (err) {
    sizeError = err;
  }
  assert(sizeError !== null, 'Oversized file >10MB must be rejected');
  assert.strictEqual(sizeError.status, 413);

  // 3. Valid PDF Upload
  const validPdf = { name: 'network_flow_research.pdf', type: 'application/pdf', size: 2048576 };
  sandbox.mockFiles = [
    {
      id: 'file-doc-1',
      original_filename: 'network_flow_research.pdf',
      size_bytes: 2048576,
      created_at: new Date().toISOString()
    }
  ];
  const uploadRes = await AriseState.uploadStudyPdf(validPdf);
  assert.strictEqual(uploadRes.id, 'file-doc-1');
  assert.strictEqual(AriseState.studyFiles.length, 1, 'studyFiles populated');

  // Render library with uploaded file
  const populatedLibraryHtml = sandbox.renderSelfStudyLibrary();
  assert(populatedLibraryHtml.includes('network_flow_research.pdf'), 'Renders uploaded file');
  assert(populatedLibraryHtml.includes('Open Reader →'), 'Renders open reader button');

  // 4. Study Session Tracking & 0 XP Rule
  const initialXp = sandbox.ARISE_DATA.currentUser.verifiedXp;
  assert.strictEqual(initialXp, 40, 'Initial verified XP is 40');

  // Start study session
  const startRes = await AriseState.startStudySession('file-doc-1');
  assert.strictEqual(startRes.id, 'sess-100');
  assert.strictEqual(AriseState.timerRunning, true);

  // Reader HTML rendering
  const readerHtml = sandbox.renderPdfReaderScreen();
  assert(readerHtml.includes('network_flow_research'), 'Reader renders document title');
  assert(readerHtml.includes('← Back to Library'), 'Reader renders back navigation');

  // Finish study session
  AriseState.timerSeconds = 1800; // 30 minutes
  const finishRes = await AriseState.finishStudySession();
  assert.strictEqual(finishRes.duration_seconds, 1800);
  assert.strictEqual(AriseState.timerRunning, false);

  // Study summary updated
  assert.strictEqual(AriseState.studySummary.session_count, 1);
  assert.strictEqual(AriseState.studySummary.total_hours, 0.5);

  // STRICT INTEGRITY RULE: Verified XP is UNCHANGED
  assert.strictEqual(sandbox.ARISE_DATA.currentUser.verifiedXp, 40, 'Study session awards strictly 0 XP');

  // 5. Badges Showcase & Idempotency
  const badgesData = await AriseState.fetchBadges();
  assert.strictEqual(badgesData.total_unlocked, 1);
  assert.strictEqual(AriseState.badgesList.length, 3);

  const firstBlood = AriseState.badgesList.find(b => b.slug === 'b-first-solve');
  assert.strictEqual(firstBlood.is_unlocked, true);

  const century = AriseState.badgesList.find(b => b.slug === 'b-century-50');
  assert.strictEqual(century.is_unlocked, false);
  assert.strictEqual(century.progress_percent, 2);

  // Render Badges Screen
  const badgesScreenHtml = sandbox.renderBadgesScreen();
  assert(badgesScreenHtml.includes('Achievement Collection'), 'Badges screen header');
  assert(badgesScreenHtml.includes('First Blood'), 'Renders unlocked badge');
  assert(badgesScreenHtml.includes('Half Century'), 'Renders locked badge');
  assert(badgesScreenHtml.includes('Progress: 2%'), 'Renders progress percentage');

  // Test Badge Detail Modal
  sandbox.openBadgeDetail('b-first-solve');

  // 6. Delete File
  await AriseState.deleteStudyFile('file-doc-1');
  assert.strictEqual(AriseState.studyFiles.length, 0, 'File deleted successfully');

  console.log('✓ All 6 Phase 6 frontend contract test suites PASSED successfully!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
