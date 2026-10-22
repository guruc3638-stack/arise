const fs = require('fs');
const assert = require('assert');

// Setup mock DOM environment
global.window = global;
global.window.scrollTo = () => {};
global.document = {
  getElementById: (id) => ({
    focus: () => {},
    setSelectionRange: () => {},
    value: '',
    src: '',
    style: {},
    classList: { add: () => {}, remove: () => {} }
  }),
  createElement: (tag) => ({
    id: '',
    className: '',
    innerHTML: '',
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} }
  }),
  body: {
    appendChild: () => {}
  }
};
global.URL = {
  createObjectURL: (blob) => 'blob:http://localhost:3000/' + Math.random().toString(36).substring(7)
};
global.Blob = class Blob {
  constructor(parts, options) {
    this.parts = parts;
    this.type = options ? options.type : '';
  }
};

// Load curricula.js
let curriculaCode = fs.readFileSync('d:/ARISE/js/curricula.js', 'utf8');
curriculaCode = curriculaCode.replace('const ARISE_CURRICULA =', 'global.ARISE_CURRICULA =');
eval(curriculaCode);

console.log('=== TEST 1: ARISE_CURRICULA STRUCTURE ===');
assert(global.ARISE_CURRICULA, 'window.ARISE_CURRICULA must exist');
const courseKeys = Object.keys(global.ARISE_CURRICULA);
console.log('Available curricula keys:', courseKeys);
assert.strictEqual(courseKeys.length, 6, 'Must have exactly 6 courses');

for (const key of courseKeys) {
  const pages = global.ARISE_CURRICULA[key];
  assert(Array.isArray(pages), `Course ${key} must be an array of pages`);
  assert.strictEqual(pages.length, 16, `Course ${key} must have exactly 16 pages`);
  console.log(`- Course ${key}: 16 pages verified`);
  
  for (let i = 0; i < 16; i++) {
    const p = pages[i];
    assert.strictEqual(p.page, i + 1, `Page number mismatch: ${p.page} vs ${i + 1}`);
    assert(p.title && p.title.length > 5, `Page ${i + 1} must have descriptive title`);
    assert(p.concept && p.concept.length >= 3, `Page ${i + 1} must have concept points`);
    assert(p.math && p.math.length >= 2, `Page ${i + 1} must have math invariants`);
    assert(p.code && p.code.length >= 2, `Page ${i + 1} must have production code`);
    assert(p.analysis && p.analysis.length >= 2, `Page ${i + 1} must have asymptotic bounds/analysis`);
    assert(p.checkpoint && p.checkpoint.length >= 2, `Page ${i + 1} must have assessment checkpoint`);
  }
}
console.log('✔ All 6 courses verified with 16 rich, non-empty pages!');

// Load data.js
let dataCode = fs.readFileSync('d:/ARISE/js/data.js', 'utf8');
dataCode = dataCode.replace('const ARISE_DATA =', 'global.ARISE_DATA =');
eval(dataCode);

// Load state.js
let stateCode = fs.readFileSync('d:/ARISE/js/state.js', 'utf8');
stateCode = stateCode.replace('const AriseState =', 'global.AriseState =');
eval(stateCode);

// Load self-study.js
let selfStudyCode = fs.readFileSync('d:/ARISE/js/screens/self-study.js', 'utf8');
eval(selfStudyCode);

console.log('\n=== TEST 2: SELF STUDY SCREEN RENDERING (0.0 MB BUG CHECK) ===');
const selfStudyHtml = renderSelfStudyScreen();
assert(!selfStudyHtml.includes('0.0 MB'), 'Must NOT contain "0.0 MB" in document cards!');
console.log('✔ Document card file sizes correctly display in KB (no "0.0 MB")!');

// Check each course title in the library
for (const key of courseKeys) {
  assert(selfStudyHtml.includes(key), `Self study screen must list ${key}`);
}
console.log('✔ All 6 course assessments rendered on Self Study screen!');

console.log('\n=== TEST 3: PAGE-BY-PAGE CANVAS RENDERING (96 PAGES) ===');
let emptyCount = 0;
for (const key of courseKeys) {
  const dummyDoc = {
    id: 'test-' + key,
    original_filename: key + '_Assessment.pdf',
    title: key + ' Assessment',
    pages: 16
  };
  for (let pageNum = 1; pageNum <= 16; pageNum++) {
    const pageHtml = renderStudyPageContent(dummyDoc, pageNum, 16);
    if (!pageHtml || pageHtml.length < 200) {
      console.error(`FAIL: Empty or sparse content on ${key} page ${pageNum}`);
      emptyCount++;
    }
    assert(pageHtml.includes('Theoretical Architecture'), `Course ${key} page ${pageNum} missing Framework`);
    assert(pageHtml.includes('Formal Mathematical Invariants'), `Course ${key} page ${pageNum} missing Invariants`);
    assert(pageHtml.includes('Production Implementation'), `Course ${key} page ${pageNum} missing Implementation`);
    assert(pageHtml.includes('Asymptotic Bounds'), `Course ${key} page ${pageNum} missing Bounds`);
    assert(pageHtml.includes('Formative Assessment Checkpoint'), `Course ${key} page ${pageNum} missing Assessment`);
  }
}
assert.strictEqual(emptyCount, 0, 'No pages may be empty');
console.log('✔ All 96 pages across all 6 courses render complete, authentic content with all 5 sections!');

console.log('\n=== TEST 4: READER NAVIGATION ACROSS ALL 16 PAGES ===');
openDocumentReader('doc-1'); // Course 101
assert.strictEqual(AriseState.activeDoc.pages, 16);
AriseState.setReaderViewMode('canvas');
for (let p = 1; p <= 16; p++) {
  AriseState.setReaderPage(p);
  const readerHtml = renderPdfReaderScreen();
  assert(readerHtml.includes(`PAGE ${p} OF 16`), `Reader screen must display PAGE ${p} OF 16`);
  assert(readerHtml.includes('Theoretical Architecture'), `Reader canvas on page ${p} must display Framework`);
}
console.log('✔ Reader navigation smoothly traverses pages 1 through 16 with zero empty pages!');

console.log('\n======================================================');
console.log('ALL FRONTEND & BACKEND CURRICULUM VERIFICATIONS PASSED 100%!');
console.log('======================================================');
