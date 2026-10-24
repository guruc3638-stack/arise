/* ==========================================================================
   ARISE MAIN APPLICATION ROUTER & CONTROLLER
   "Learn. Solve. Rise."
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAriseApp();
});

function initAriseApp() {
  // Subscribe renderer to state changes
  AriseState.subscribe(renderCurrentAppView);

  // Initial render
  renderCurrentAppView();

  // Setup keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Esc closes modals
    if (e.key === 'Escape') {
      closeCommandPalette();
      closeNotificationsDrawer();
      const openModals = document.querySelectorAll('.modal-backdrop.open');
      openModals.forEach(m => m.classList.remove('open'));
    }
  });
}

function renderCurrentAppView() {
  const root = document.getElementById('arise-root');
  if (!root) return;

  const isDesignSystemMode = AriseState.viewMode === 'design-system';
  const isMarketingAuthScreen = ['landing', 'signup', 'login', 'verify-email', 'onboarding'].includes(AriseState.currentScreen);
  const isMobileViewport = AriseState.viewport === '390';

  // Rule 2 & 3: Route Protection Guard
  if (typeof AriseAuth !== 'undefined' && typeof AriseAuth.enforceRouteGuard === 'function') {
    if (!AriseAuth.enforceRouteGuard()) {
      return; // Route guard will redirect and re-render
    }
  }

  let bodyContentHtml = '';

  if (isDesignSystemMode) {
    bodyContentHtml = renderDesignSystemView();
  } else if (isMarketingAuthScreen) {
    bodyContentHtml = renderMarketingAndAuthScreen();
  } else {
    // Standard Authenticated App Screen
    bodyContentHtml = `
      <div class="app-container">
        <!-- Mobile Sidebar Backdrop -->
        <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="closeMobileSidebar()"></div>

        <!-- Exact Sidebar Navigation Order -->
        ${renderSidebarNavigation()}

        <!-- Main Wrapper (Header + Centered 1240 Content) -->
        <div class="main-wrapper">
          ${renderAppHeader()}
          <main class="main-content">
            ${renderScreenContent(AriseState.currentScreen)}
          </main>
        </div>
      </div>
    `;
  }

  // If in 390px mobile viewport mode, wrap inside native iPhone simulator frame
  if (isMobileViewport && !isDesignSystemMode && !isMarketingAuthScreen) {
    bodyContentHtml = renderMobileNativeFrame(renderScreenContent(AriseState.currentScreen));
  }

  root.innerHTML = `
    <div class="prototype-shell">
      <div class="prototype-canvas-wrapper viewport-${AriseState.viewport}">
        ${bodyContentHtml}
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// PROTOTYPE CONTROL BAR (Hidden - kept empty for backward compatibility)
// --------------------------------------------------------------------------
function renderPrototypeControlBar() {
  return '';
}

function jumpToScreen(screenVal) {
  if (screenVal === 'leaderboard-global') {
    AriseState.leaderboardTab = 'global';
    AriseState.setScreen('leaderboard');
  } else if (screenVal === 'leaderboard-friends') {
    AriseState.leaderboardTab = 'friends';
    AriseState.setScreen('leaderboard');
  } else if (screenVal === 'dsa-judge') {
    AriseState.setScreen('dsa-workspace');
    triggerJudgeSubmission('accepted');
  } else if (screenVal === 'notifs') {
    AriseState.setScreen('overview');
    toggleNotificationsDrawer();
  } else if (screenVal === 'mobile-view') {
    AriseState.setViewport('390');
    AriseState.setScreen('overview');
  } else {
    AriseState.setScreen(screenVal);
  }
}

// --------------------------------------------------------------------------
// SIDEBAR (248px -> 72px rail) — Exact Order:
// 1. Overview, 2. Leaderboard, 3. DSA, 4. Self Study, 5. Learning, 6. Profile
// --------------------------------------------------------------------------
function renderSidebarNavigation() {
  const current = AriseState.currentScreen;
  const isCollapsed = AriseState.sidebarCollapsed;
  const user = (typeof ARISE_DATA !== 'undefined' && ARISE_DATA.currentUser) ? ARISE_DATA.currentUser : null;
  const currentScope = AriseState.leaderboardScope || 'maharashtra';

  // Dynamic Leaderboard Badge: Only show rank number after questions are solved and user is ranked
  let leaderboardBadge = null;
  if (user && user.verifiedXp > 0) {
    if (user.rank && user.rank[currentScope]) {
      leaderboardBadge = `#${user.rank[currentScope]}`;
    } else if (user.rankDisplay && user.rankDisplay !== 'Unranked') {
      leaderboardBadge = user.rankDisplay.startsWith('#') ? user.rankDisplay : `#${user.rankDisplay}`;
    }
  }

  // Dynamic DSA Badge: Only show number of solved questions after questions are solved
  const solvedCount = (user && user.solvedStats && user.solvedStats.total > 0) ? user.solvedStats.total : 0;
  const dsaBadge = solvedCount > 0 ? String(solvedCount) : null;

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
      active: current === 'overview',
      badge: null
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      active: current === 'leaderboard',
      badge: leaderboardBadge
    },
    {
      id: 'dsa',
      label: 'DSA',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      active: current.startsWith('dsa'),
      badge: dsaBadge
    },
    {
      id: 'self-study',
      label: 'Self Study',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
      active: current === 'self-study' || current === 'pdf-reader',
      badge: null
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
      active: current.startsWith('learning') || current.startsWith('course') || current.startsWith('final-assessment') || current.startsWith('lesson'),
      badge: null
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      active: current === 'profile' || current === 'badges' || current === 'settings',
      badge: null
    }
  ];

  return `
    <aside class="sidebar ${isCollapsed ? 'collapsed' : ''}" aria-label="Main Navigation">
      <div class="sidebar-header">
        <div class="brand-link" onclick="closeMobileSidebar(); AriseState.setScreen('overview')" style="cursor: pointer;">
          <div class="brand-icon-mark">▲</div>
          <div class="brand-text-block">
            <span class="brand-name">ARISE</span>
            <span class="brand-tagline">Learn. Solve. Rise.</span>
          </div>
        </div>
      </div>

      <!-- Exact 6 Sidebar Nav Items -->
      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <div class="nav-item ${item.active ? 'active' : ''}" 
            onclick="handleNavClick('${item.id}')" 
            title="${item.label}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
            ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </div>
        `).join('')}
      </nav>

      <!-- Sidebar Footer with Collapse Action and Logout (Single theme toggle is upside in navbar) -->
      <div class="sidebar-footer">
        <button class="collapse-btn" onclick="toggleSidebarCollapse()" title="Toggle Sidebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          <span class="nav-label">${isCollapsed ? '' : 'Collapse Rail'}</span>
        </button>
        <button class="collapse-btn logout-sidebar-btn" onclick="closeMobileSidebar(); AriseAuth.signOut();" title="Sign Out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span class="nav-label">${isCollapsed ? '' : 'Log Out'}</span>
        </button>
      </div>
    </aside>
  `;
}

function toggleMobileSidebar(forceState) {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;

  const willOpen = (typeof forceState === 'boolean')
    ? forceState
    : !sidebar.classList.contains('mobile-open');

  if (willOpen) {
    sidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('open');
  } else {
    sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('open');
  }
}

function closeMobileSidebar() {
  toggleMobileSidebar(false);
}

function handleNavClick(navId) {
  closeMobileSidebar();
  if (navId === 'dsa') AriseState.setScreen('dsa-problems');
  else if (navId === 'learning') AriseState.setScreen('learning-catalogue');
  else AriseState.setScreen(navId);
}

function toggleSidebarCollapse() {
  AriseState.sidebarCollapsed = !AriseState.sidebarCollapsed;
  AriseState.notify();
}

function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('user-header-dropdown');
  if (dropdown) {
    const isShowing = dropdown.style.display === 'block';
    dropdown.style.display = isShowing ? 'none' : 'block';
  }
}

function closeUserDropdown() {
  const dropdown = document.getElementById('user-header-dropdown');
  if (dropdown) dropdown.style.display = 'none';
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu-pill-wrapper')) {
      closeUserDropdown();
    }
  });
}

// --------------------------------------------------------------------------
// SLIM HEADER (Breadcrumb, Search with ⌘K, Notifications, Avatar with UID & Menu)
// --------------------------------------------------------------------------
function renderAppHeader() {
  const current = AriseState.currentScreen;
  const user = ARISE_DATA.currentUser;
  const unreadCount = ARISE_DATA.notifications.filter(n => !n.read).length;

  let currentTitle = 'Overview Dashboard';
  if (current === 'leaderboard') currentTitle = 'Leaderboard & Rankings';
  else if (current.startsWith('dsa')) currentTitle = 'DSA Practice & Judge Sandbox';
  else if (current === 'self-study' || current === 'pdf-reader') currentTitle = 'Self Study Material';
  else if (current.startsWith('learning') || current.startsWith('course') || current.startsWith('final-assessment')) currentTitle = 'Learning Curricula';
  else if (current === 'profile' || current === 'badges' || current === 'settings') currentTitle = 'Student Learning Record';

  return `
    <header class="header">
      <div class="header-left">
        <!-- Mobile hamburger toggle button (visible <= 768px) -->
        <button class="mobile-menu-btn" onclick="toggleMobileSidebar()" aria-label="Toggle navigation menu" title="Open Navigation">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <div class="header-breadcrumb">
          <span class="breadcrumb-root">ARISE</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${currentTitle}</span>
        </div>
      </div>

      <!-- Search Input with Raycast ⌘K hint -->
      <div class="header-center">
        <div class="search-input-box" onclick="openCommandPalette()" role="button" aria-label="Search problems, topics or actions">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span style="font-size: 13px; color: var(--text-muted); flex: 1;">Search problems, topics, commands...</span>
          <span class="kbd-shortcut">⌘K</span>
        </div>
      </div>

      <div class="header-right">
        <!-- Single Theme Toggle in Navbar Header -->
        <button class="theme-toggle-btn" onclick="AriseTheme.toggle()" title="${(typeof AriseTheme !== 'undefined' && AriseTheme.current === 'light') ? 'Switch to Night mode' : 'Switch to Day mode'}" aria-label="Toggle theme">
          ${(typeof AriseTheme !== 'undefined' && AriseTheme.current === 'light') ? `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #6366F1;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <span>Night Mode</span>
          ` : `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #FBBF24;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <span>Day Mode</span>
          `}
        </button>

        <!-- Notification Bell Icon with Unread Badge -->
        <button class="notification-bell-btn" onclick="toggleNotificationsDrawer()" aria-label="View notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          ${unreadCount > 0 ? '<span class="notification-unread-dot"></span>' : ''}
        </button>

        <!-- User Profile Pill in Header with Dropdown (Rule 3) -->
        <div class="user-menu-pill-wrapper" style="position: relative;">
          <div class="user-menu-pill" onclick="toggleUserDropdown(event)" role="button" aria-haspopup="true" style="cursor: pointer;">
            <div class="user-avatar-mini">${user.avatar || 'ST'}</div>
            <span class="user-name-mini">${user.displayName}</span>
            <span class="font-mono" style="font-size: 11px; color: #A78BFA; padding-left: 2px;">${user.uid}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px; opacity: 0.7;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div id="user-header-dropdown" class="glass-card" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); width: 230px; border: 1px solid var(--border-default); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 8px; z-index: 1000; background: var(--surface-elevated);">
            <div style="padding: 10px 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 6px;">
              <div style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${user.displayName}</div>
              <div class="font-mono" style="font-size: 11px; color: #A78BFA; margin-top: 2px;">${user.uid}</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('profile'); closeUserDropdown();" style="width: 100%; justify-content: flex-start; gap: 8px; font-size: 13px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Student Profile
            </button>
            <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('settings'); closeUserDropdown();" style="width: 100%; justify-content: flex-start; gap: 8px; font-size: 13px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Privacy & Settings
            </button>
            <div style="border-top: 1px solid var(--border-subtle); margin: 6px 0;"></div>
            <button class="btn btn-ghost btn-sm" onclick="AriseAuth.signOut(); closeUserDropdown();" style="width: 100%; justify-content: flex-start; gap: 8px; font-size: 13px; color: #EF4444;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

// --------------------------------------------------------------------------
// SCREEN CONTENT ROUTER
// --------------------------------------------------------------------------
function renderScreenContent(screenId) {
  switch (screenId) {
    case 'overview': return renderOverviewDashboard();
    case 'leaderboard': return renderLeaderboardScreen();
    case 'dsa-topics':
    case 'dsa-problems':
    case 'dsa-workspace': return renderDsaScreen();
    case 'self-study':
    case 'pdf-reader': return renderSelfStudyScreen();
    case 'learning-catalogue':
    case 'course-detail':
    case 'lesson-player':
    case 'final-assessment':
    case 'course-completion': return renderLearningScreen();
    case 'profile':
    case 'badges':
    case 'settings': return renderProfileScreen();
    default: return renderOverviewDashboard();
  }
}
