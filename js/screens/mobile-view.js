/* ==========================================================================
   ARISE SCREEN X: RESPONSIVE MOBILE VIEW (390px Native Layout)
   5-Tab Bottom Nav, More Sheet, Touch-Friendly 44px Targets,
   Mobile Stacked Coding Workspace (Problem, Code, Output) + Sticky Actions
   ========================================================================== */

function renderMobileNativeFrame(innerContentHtml) {
  const current = AriseState.currentScreen;
  const user = ARISE_DATA.currentUser;

  return `
    <div class="mobile-device-bezel">
      <!-- Dynamic Island / Notch Mockup -->
      <div class="mobile-notch">
        <div class="mobile-notch-camera"></div>
      </div>

      <!-- Mobile Status Bar (9:41, WiFi, Battery) -->
      <div class="mobile-status-bar">
        <span>9:41</span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
        </div>
      </div>

      <!-- Mobile Top Bar: Screen Title, Search, Notifications -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid var(--border-default); background: rgba(13,18,32,0.85); backdrop-filter: blur(12px);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="brand-icon-mark" style="width: 26px; height: 26px; font-size: 11px;">▲</div>
          <span style="font-weight: 800; font-size: 14px; letter-spacing: 0.05em; color: #FFFFFF;">ARISE</span>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="btn-icon-only btn-ghost btn-sm" onclick="openCommandPalette()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button class="notification-bell-btn btn-sm" onclick="toggleNotificationsDrawer()" style="width: 32px; height: 32px; position: relative;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            ${((typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) ? ARISE_DATA.notifications.filter(n => !n.read).length : 0) > 0 ? '<span class="notification-unread-dot" style="top: 5px; right: 5px;"></span>' : ''}
          </button>
        </div>
      </div>

      <!-- Mobile Scrollable Body -->
      <div class="mobile-screen-body" style="padding: 16px;">
        ${innerContentHtml}
      </div>

      <!-- Mobile Bottom Navigation Bar (5 Items + More Sheet) -->
      <div class="mobile-bottom-nav">
        <div class="mobile-nav-item ${current === 'overview' ? 'active' : ''}" onclick="AriseState.setScreen('overview')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Overview</span>
        </div>

        <div class="mobile-nav-item ${current === 'leaderboard' ? 'active' : ''}" onclick="AriseState.setScreen('leaderboard')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>Ranking</span>
        </div>

        <div class="mobile-nav-item ${current.startsWith('dsa') ? 'active' : ''}" onclick="AriseState.setScreen('dsa-problems')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <span>DSA</span>
        </div>

        <div class="mobile-nav-item ${current.startsWith('learning') || current.startsWith('course') ? 'active' : ''}" onclick="AriseState.setScreen('learning-catalogue')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <span>Learn</span>
        </div>

        <div class="mobile-nav-item ${current === 'profile' || current === 'badges' ? 'active' : ''}" onclick="AriseState.setScreen('profile')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Profile</span>
        </div>

        <div class="mobile-nav-item" onclick="toggleMobileMoreSheet()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          <span>More</span>
        </div>
      </div>

      <!-- Home Indicator -->
      <div class="mobile-home-indicator"></div>

      <!-- More Bottom Sheet (Exposing Self Study & Settings) -->
      <div id="mobile-more-sheet" class="mobile-bottom-sheet ${AriseState.mobileMoreOpen ? 'open' : ''}">
        <div class="sheet-drag-handle"></div>
        <div style="font-weight: 700; font-size: 15px; color: var(--text-primary); margin-bottom: 8px;">Additional Modules</div>
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(255,255,255,0.04); cursor: pointer;"
            onclick="AriseState.setScreen('self-study'); toggleMobileMoreSheet();">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #A78BFA;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <div>
              <div style="font-weight: 600; color: var(--text-primary); font-size: 13.5px;">Self Study Library</div>
              <div style="font-size: 11px; color: var(--text-muted);">PDF reader & timer (No XP awarded)</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(255,255,255,0.04); cursor: pointer;"
            onclick="AriseState.setScreen('settings'); toggleMobileMoreSheet();">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #22D3EE;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <div>
              <div style="font-weight: 600; color: var(--text-primary); font-size: 13.5px;">Settings & Privacy</div>
              <div style="font-size: 11px; color: var(--text-muted);">DSA visibility & server security rules</div>
            </div>
          </div>
        </div>

        <button class="btn btn-ghost btn-sm" onclick="toggleMobileMoreSheet()" style="margin-top: 4px;">
          Close Sheet
        </button>
      </div>
    </div>
  `;
}

function toggleMobileMoreSheet() {
  AriseState.mobileMoreOpen = !AriseState.mobileMoreOpen;
  const sheet = document.getElementById('mobile-more-sheet');
  if (sheet) {
    if (AriseState.mobileMoreOpen) sheet.classList.add('open');
    else sheet.classList.remove('open');
  }
}
