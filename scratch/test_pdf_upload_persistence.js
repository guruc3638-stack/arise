// Comprehensive test suite for PDF upload, persistence, and library rendering
const fs = require('fs');
const assert = require('assert');

// Mock browser globals
global.window = {
  location: { hostname: 'localhost' }
};
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] !== undefined ? this.store[k] : null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};
global.document = {
  getElementById(id) {
    if (id === 'upload-doc-modal') return { classList: { remove() {} } };
    if (id === 'study-file-input') return { value: '', files: [] };
    if (id === 'btn-confirm-upload') return { disabled: false, textContent: '' };
    return null;
  },
  createElement() {
    return { id: '', className: '', innerHTML: '', classList: { add() {}, remove() {} } };
  },
  body: { appendChild() {} },
  addEventListener() {}
};
global.URL = {
  createObjectURL(blob) { return 'blob:http://localhost:3000/mock-pdf-blob-uuid'; }
};
global.showToast = (msg, type) => {
  // console.log(`[TOAST ${type}] ${msg}`);
};

// Load code
const dataCode = fs.readFileSync('d:/ARISE/js/data.js', 'utf8');
const stateCode = fs.readFileSync('d:/ARISE/js/state.js', 'utf8');
const selfStudyCode = fs.readFileSync('d:/ARISE/js/screens/self-study.js', 'utf8');

eval(dataCode);
eval(stateCode);
eval(selfStudyCode);

async function runUploadPersistenceTests() {
  console.log('=== Running PDF Upload & Persistence Test Suite ===');

  // TEST 1: Clean account with no files
  localStorage.clear();
  AriseState.studyFiles = [];
  ARISE_DATA.studyLibrary = [];
  
  let html = renderSelfStudyLibrary();
  assert(html.includes('No study documents uploaded yet'), 'Empty library state must be shown for clean account');
  console.log('✓ Test 1 Passed: Clean account shows empty state');

  // TEST 2: Validation rejection
  let errorCaught = null;
  try {
    await AriseState.uploadStudyPdf({ name: 'malware.exe', type: 'application/x-msdownload', size: 1000 });
  } catch (err) {
    errorCaught = err;
  }
  assert(errorCaught && errorCaught.status === 400, 'Non-PDF must throw 400 status');

  errorCaught = null;
  try {
    await AriseState.uploadStudyPdf({ name: 'huge.pdf', type: 'application/pdf', size: 12 * 1024 * 1024 });
  } catch (err) {
    errorCaught = err;
  }
  assert(errorCaught && errorCaught.status === 413, 'Over 10MB must throw 413 status');
  console.log('✓ Test 2 Passed: File validation rejects invalid formats and oversized files');

  // TEST 3: Upload valid PDF
  const testFile = {
    name: 'Advanced_Operating_Systems_Lecture3.pdf',
    type: 'application/pdf',
    size: 245 * 1024, // 245 KB
    text: async () => '%PDF-1.4\n/Type /Page\n/Type /Page\n/Type /Page\n%%EOF'
  };

  const uploadedDoc = await AriseState.uploadStudyPdf(testFile);
  assert(uploadedDoc, 'Upload returns uploaded document object');
  assert.strictEqual(uploadedDoc.original_filename, 'Advanced_Operating_Systems_Lecture3.pdf');
  assert.strictEqual(uploadedDoc.pages, 3);
  assert(uploadedDoc.blobUrl, 'Blob URL created');

  // Check localStorage persistence
  const savedJson = localStorage.getItem('arise_uploaded_study_files');
  assert(savedJson, 'Document must be persisted in localStorage');
  const parsedSaved = JSON.parse(savedJson);
  assert.strictEqual(parsedSaved.length, 1);
  assert.strictEqual(parsedSaved[0].original_filename, 'Advanced_Operating_Systems_Lecture3.pdf');

  // Check HTML rendering in library
  html = renderSelfStudyLibrary();
  assert(!html.includes('No study documents uploaded yet'), 'Empty state must disappear');
  assert(html.includes('Advanced_Operating_Systems_Lecture3.pdf'), 'Uploaded file must appear in library HTML');
  assert(html.includes('Uploaded PDF'), 'Badge shows Uploaded PDF');
  assert(html.includes('Open Reader →'), 'Open Reader button rendered');
  console.log('✓ Test 3 Passed: Upload immediately renders in library HTML with correct badge');

  // TEST 4: Open in Reader
  await openDocumentReader(uploadedDoc.id);
  assert.strictEqual(AriseState.currentScreen, 'pdf-reader', 'Current screen set to pdf-reader');
  assert.strictEqual(AriseState.activeDoc.id, uploadedDoc.id, 'Active doc set to uploaded doc');

  const readerHtml = renderPdfReaderScreen();
  assert(readerHtml.includes('Advanced_Operating_Systems_Lecture3'), 'Reader renders document title');
  assert(readerHtml.includes('pdf-viewer-frame'), 'Reader renders iframe viewer');
  assert(readerHtml.includes('← Back to Library'), 'Back to Library button rendered');
  console.log('✓ Test 4 Passed: Reader opens uploaded document with interactive viewer');

  // TEST 5: Persistence across simulated reload
  // Clear RAM state
  AriseState.studyFiles = [];
  ARISE_DATA.studyLibrary = [];
  AriseState.activeDoc = null;

  // New simulated session should load the uploaded file from localStorage
  const freshDocs = getUnifiedStudyDocs();
  assert.strictEqual(freshDocs.length, 1, 'Unified docs must recover file from localStorage');
  assert.strictEqual(freshDocs[0].original_filename, 'Advanced_Operating_Systems_Lecture3.pdf');

  html = renderSelfStudyLibrary();
  assert(html.includes('Advanced_Operating_Systems_Lecture3.pdf'), 'Reloaded session still shows uploaded document in library');
  console.log('✓ Test 5 Passed: File persists across reloads and screen transitions');

  // TEST 6: Delete uploaded document
  await AriseState.deleteStudyFile(uploadedDoc.id);
  const afterDeleteSaved = JSON.parse(localStorage.getItem('arise_uploaded_study_files') || '[]');
  assert.strictEqual(afterDeleteSaved.length, 0, 'File must be removed from localStorage');

  html = renderSelfStudyLibrary();
  assert(!html.includes('Advanced_Operating_Systems_Lecture3.pdf'), 'Deleted file removed from library HTML');
  assert(html.includes('No study documents uploaded yet'), 'Library returns to empty state after delete');
  console.log('✓ Test 6 Passed: Deleting document properly cleans up and updates library screen');

  console.log('\nAll 6 PDF upload and persistence tests PASSED successfully!');
}

runUploadPersistenceTests().catch(err => {
  console.error('Test failure:', err);
  process.exit(1);
});
