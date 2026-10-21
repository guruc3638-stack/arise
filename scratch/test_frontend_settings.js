/**
 * Test Frontend Screen V: Settings, Profile Editing & Server-Enforced Privacy Toggles
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const dataCode = fs.readFileSync(path.join(rootDir, 'js/data.js'), 'utf8');
const stateCode = fs.readFileSync(path.join(rootDir, 'js/state.js'), 'utf8');
const authCode = fs.readFileSync(path.join(rootDir, 'js/auth.js'), 'utf8');
const profileCode = fs.readFileSync(path.join(rootDir, 'js/screens/profile.js'), 'utf8');

const domMocks = `
const window = {
  location: { hash: '#/settings' },
  addEventListener: () => {},
  history: { pushState: () => {} },
  dispatchEvent: () => {}
};
const document = {
  getElementById: (id) => {
    if (id === 'edit-display-name-input') return { value: 'Updated Student Name' };
    if (id === 'edit-college-input') return { value: 'COEP Pune' };
    if (id === 'edit-profile-modal') return { classList: { remove: () => {}, add: () => {} } };
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};
const localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};
function showToast(msg, type) {}
`;

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  FormData: class {},
  fetch: null,
  ARISE_DATA: {
    currentUser: {
      uid: 'AR-SETTINGS01',
      displayName: 'Original Name',
      college: 'Original College',
      district: 'Mumbai',
      state: 'Maharashtra',
      verifiedXp: 120,
      privacySetting: 'public'
    }
  }
};
sandbox.globalThis = sandbox;

vm.createContext(sandbox);
vm.runInContext(domMocks, sandbox);
vm.runInContext(dataCode + '\nglobalThis.ARISE_DATA = ARISE_DATA;', sandbox);
vm.runInContext(stateCode + '\nglobalThis.AriseState = AriseState;', sandbox);
vm.runInContext(authCode + '\nglobalThis.AriseAuth = AriseAuth;', sandbox);
vm.runInContext(profileCode, sandbox);

async function runSettingsContractTests() {
  console.log('--- Testing Screen V: Settings, Profile Edit & Privacy Preferences ---');

  // Set mock authenticated user
  sandbox.AriseState.authToken = 'mock-jwt-settings';
  sandbox.AriseAuth.session = { access_token: 'mock-jwt-settings' };
  sandbox.globalThis.ARISE_DATA.currentUser = {
    uid: 'AR-SETTINGS01',
    displayName: 'Original Name',
    college: 'Original College',
    district: 'Mumbai',
    state: 'Maharashtra',
    verifiedXp: 120,
    privacySetting: 'public'
  };

  let lastPatchPayload = null;
  let lastPatchUrl = null;

  // Mock AriseState.apiRequest
  sandbox.AriseState.apiRequest = async (endpoint, method, body) => {
    if (endpoint === '/me' && method === 'PATCH') {
      lastPatchUrl = endpoint;
      lastPatchPayload = body;
      return {
        user_id: 'u-123',
        uid: 'AR-SETTINGS01',
        display_name: body.display_name || sandbox.globalThis.ARISE_DATA.currentUser.displayName,
        college_name: body.college_name || sandbox.globalThis.ARISE_DATA.currentUser.college,
        district_name: 'Mumbai',
        state_code: 'MH',
        verified_xp: 120,
        show_dsa_rank: body.show_dsa_rank !== undefined ? body.show_dsa_rank : true,
        show_dsa_progress: body.show_dsa_progress !== undefined ? body.show_dsa_progress : true
      };
    }
    if (endpoint === '/me/practice-stats') {
      return { total_submissions: 10, solved_count: 5, acceptance_rate: 50 };
    }
    if (endpoint === '/courses') {
      return [];
    }
    if (endpoint === '/me/course-completions') {
      return [];
    }
    if (endpoint === '/me/badges') {
      return { badges: [] };
    }
    if (endpoint === '/study-files') {
      return { files: [] };
    }
    if (endpoint === '/study-summary') {
      return { total_sessions: 0, total_seconds: 0 };
    }
    throw new Error('Unexpected apiRequest call: ' + endpoint);
  };

  // 1. Test setPrivacySetting('friends')
  await sandbox.setPrivacySetting('friends');
  if (lastPatchPayload.show_dsa_rank !== true || lastPatchPayload.show_dsa_progress !== false) {
    throw new Error("Expected friends privacy to set show_dsa_rank: true, show_dsa_progress: false, got: " + JSON.stringify(lastPatchPayload));
  }
  if (sandbox.globalThis.ARISE_DATA.currentUser.privacySetting !== 'friends') {
    throw new Error("Expected currentUser.privacySetting to be 'friends', got: " + sandbox.globalThis.ARISE_DATA.currentUser.privacySetting);
  }
  console.log("✓ TEST PASSED: Friends privacy tier properly mapped to show_dsa_rank=true, show_dsa_progress=false");

  // 2. Test setPrivacySetting('private')
  await sandbox.setPrivacySetting('private');
  if (lastPatchPayload.show_dsa_rank !== false || lastPatchPayload.show_dsa_progress !== false) {
    throw new Error("Expected private tier to set show_dsa_rank: false, show_dsa_progress: false, got: " + JSON.stringify(lastPatchPayload));
  }
  if (sandbox.globalThis.ARISE_DATA.currentUser.privacySetting !== 'private') {
    throw new Error("Expected currentUser.privacySetting to be 'private', got: " + sandbox.globalThis.ARISE_DATA.currentUser.privacySetting);
  }
  console.log("✓ TEST PASSED: Private privacy tier properly mapped to show_dsa_rank=false, show_dsa_progress=false");

  // 3. Test saveProfileChanges()
  await sandbox.saveProfileChanges();
  if (lastPatchPayload.display_name !== 'Updated Student Name' || lastPatchPayload.college_name !== 'COEP Pune') {
    throw new Error("Expected profile update to patch new name and college, got: " + JSON.stringify(lastPatchPayload));
  }
  if (sandbox.globalThis.ARISE_DATA.currentUser.displayName !== 'Updated Student Name') {
    throw new Error("Expected currentUser.displayName to update to 'Updated Student Name'");
  }
  if (sandbox.globalThis.ARISE_DATA.currentUser.college !== 'COEP Pune') {
    throw new Error("Expected currentUser.college to update to 'COEP Pune'");
  }
  console.log("✓ TEST PASSED: saveProfileChanges() successfully patched backend and updated local state");

  // 4. Test renderSettingsScreen()
  const settingsHtml = sandbox.renderSettingsScreen();
  if (!settingsHtml.includes('AR-SETTINGS01')) {
    throw new Error("Expected settings HTML to contain immutable read-only UID AR-SETTINGS01");
  }
  if (!settingsHtml.includes('Updated Student Name')) {
    throw new Error("Expected settings HTML to reflect updated student name");
  }
  if (!settingsHtml.includes('COEP Pune')) {
    throw new Error("Expected settings HTML to reflect updated college name");
  }
  console.log("✓ TEST PASSED: renderSettingsScreen() accurately displays immutable UID, profile fields, and privacy options");

  console.log("\n==================================================");
  console.log("ALL SETTINGS & PROFILE EDIT TESTS PASSED (100%)!");
  console.log("==================================================");
}

runSettingsContractTests().catch(err => {
  console.error("FAIL:", err);
  process.exit(1);
});
