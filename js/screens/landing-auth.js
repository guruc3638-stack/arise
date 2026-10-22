/* ==========================================================================
   ARISE SCREENS A, B, C, D, E: MARKETING & AUTHENTICATION
   Landing Page ("Learn. Solve. Rise."), Sign Up, Login, Verify, Onboarding
   ========================================================================== */

function renderMarketingAndAuthScreen() {
  if (AriseState.currentScreen === 'signup') {
    return renderSignUpScreen();
  } else if (AriseState.currentScreen === 'login') {
    return renderLoginScreen();
  } else if (AriseState.currentScreen === 'verify-email') {
    return renderVerifyEmailScreen();
  } else if (AriseState.currentScreen === 'onboarding') {
    return renderOnboardingScreen();
  }
  return renderLandingPage();
}

// SCREEN A: LANDING PAGE
function renderLandingPage() {
  const isLight = (typeof AriseTheme !== 'undefined' && AriseTheme.current === 'light');

  return `
    <div class="landing-page">
      <!-- Top Navigation Bar -->
      <header class="landing-nav">
        <div class="brand-link" onclick="AriseAuth.navigateTo('landing')" style="cursor: pointer;">
          <div class="brand-icon-mark">▲</div>
          <div class="brand-text-block">
            <span class="brand-name">ARISE</span>
            <span class="brand-tagline">Learn. Solve. Rise.</span>
          </div>
        </div>

        <nav class="landing-nav-links">
          <a href="#features-section" class="landing-nav-link" onclick="event.preventDefault(); document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });">Pillars</a>
          <a href="#tracks-section" class="landing-nav-link" onclick="event.preventDefault(); document.getElementById('tracks-section')?.scrollIntoView({ behavior: 'smooth' });">Curricula</a>
          <a href="#judge-section" class="landing-nav-link" onclick="event.preventDefault(); document.getElementById('judge-section')?.scrollIntoView({ behavior: 'smooth' });">AI Judge</a>
          <a href="#leaderboard-section" class="landing-nav-link" onclick="event.preventDefault(); document.getElementById('leaderboard-section')?.scrollIntoView({ behavior: 'smooth' });">Rankings</a>
        </nav>

        <div style="display: flex; align-items: center; gap: 10px;">
          <!-- Day / Night Mode Toggle -->
          <button class="theme-toggle-btn" onclick="AriseTheme.toggle()" title="Toggle Day/Night mode" aria-label="Toggle Night/Day theme">
            ${isLight ? `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #6366F1;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <span>Night</span>
            ` : `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #FBBF24;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              <span>Day</span>
            `}
          </button>

          <!-- Explicit Login and Register Options -->
          <button class="btn btn-ghost btn-sm" onclick="AriseAuth.navigateTo('login')" title="Log In to your student account">
            Log In
          </button>
          <button class="btn btn-primary btn-sm" onclick="AriseAuth.navigateTo('signup')" title="Register a free student account">
            Register Free →
          </button>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="landing-hero">
        <div class="hero-pill-badge">
          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #34D399; box-shadow: 0 0 8px #34D399;"></span>
          <span>v2.0 • Computer Science & Competitive Programming Ecosystem</span>
        </div>

        <h1 class="hero-title">
          Where Serious Engineers Rise.
        </h1>

        <p class="hero-subtitle">
          The premier platform engineered for computer science students. Master algorithms, verify code through our server-isolated AI judge, and climb authentic collegiate leaderboards. Zero fake XP, 100% proof of mastery.
        </p>

        <!-- Primary Dual CTAs: Register and Login -->
        <div class="hero-cta-group">
          <button class="btn btn-primary btn-lg" onclick="AriseAuth.navigateTo('signup')" style="box-shadow: 0 6px 24px rgba(139, 92, 246, 0.45); font-weight: 700;">
            Register Student Account Free →
          </button>
          <button class="btn btn-secondary btn-lg" onclick="AriseAuth.navigateTo('login')">
            Sign In to Account
          </button>
        </div>

        <!-- Language Pill Strip -->
        <div class="landing-lang-badges">
          <span class="lang-pill"><span class="lang-dot" style="background: #3B82F6;"></span> Python 3</span>
          <span class="lang-pill"><span class="lang-dot" style="background: #EC4899;"></span> C++ 20</span>
          <span class="lang-pill"><span class="lang-dot" style="background: #EAB308;"></span> Java 17</span>
          <span class="lang-pill"><span class="lang-dot" style="background: #06B6D4;"></span> C (C17)</span>
          <span class="lang-pill"><span class="lang-dot" style="background: #14B8A6;"></span> Go 1.22</span>
          <span class="lang-pill"><span class="lang-dot" style="background: #F97316;"></span> Rust 2021</span>
          <span class="lang-pill"><span class="lang-dot" style="background: #A855F7;"></span> Node.js</span>
        </div>

        <!-- Live Platform Preview Window -->
        <div class="landing-preview-window" id="judge-section">
          <div class="preview-window-bar">
            <div class="window-dots">
              <div class="window-dot" style="background: #EF4444;"></div>
              <div class="window-dot" style="background: #F59E0B;"></div>
              <div class="window-dot" style="background: #10B981;"></div>
            </div>
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">arise.platform/workspace/001 • Server-Isolated Judge & Gemini AI</span>
          </div>

          <div style="padding: 24px; text-align: left; display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-default); padding-bottom: 14px; flex-wrap: wrap; gap: 10px;">
              <div>
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #C4B5FD; letter-spacing: 0.06em;">Verified Student Session</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">
                  Aditi Kulkarni <span style="font-size: 13px; font-weight: 400; color: var(--text-muted); padding-left: 6px;">• PICT Pune</span>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="uid-chip"><span class="uid-val">AR-STUDENT99</span></div>
                <span class="badge badge-easy">● Easy</span>
              </div>
            </div>

            <!-- Key metrics in preview -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;">
              <div class="metric-card" style="padding: 12px 14px;">
                <span class="metric-label" style="font-size: 11px;">Verified XP</span>
                <span class="metric-value font-mono" style="font-size: 18px; color: var(--success);">3,420 XP</span>
              </div>
              <div class="metric-card" style="padding: 12px 14px;">
                <span class="metric-label" style="font-size: 11px;">State Rank</span>
                <span class="metric-value font-mono" style="font-size: 18px; color: #FBBF24;">#14</span>
              </div>
              <div class="metric-card" style="padding: 12px 14px;">
                <span class="metric-label" style="font-size: 11px;">Problems Solved</span>
                <span class="metric-value font-mono" style="font-size: 18px;">48 Solved</span>
              </div>
              <div class="metric-card" style="padding: 12px 14px;">
                <span class="metric-label" style="font-size: 11px;">Curricula Completed</span>
                <span class="metric-value font-mono" style="font-size: 18px; color: #C4B5FD;">2 Tracks</span>
              </div>
            </div>

            <!-- Code Sandbox Result Pill -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="font-mono" style="font-size: 12px; font-weight: 600; color: #A78BFA;">Problem 001: Two Sum</span>
                  <span class="badge" style="background: rgba(52, 211, 153, 0.15); color: #34D399; border: 1px solid rgba(52, 211, 153, 0.3); font-size: 11px;">✓ ACCEPTED</span>
                </div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">
                  3/3 Test Cases • 38ms • 14.2 MB
                </div>
              </div>
              <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; font-family: var(--font-mono); background: rgba(255,255,255,0.02); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #34D399;">
                <span style="color: var(--success); font-weight: 600;">+50 Verified XP Awarded</span> • Verified by server-isolated AST sandbox & Gemini AI unit tests
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4 Core Pillars Section -->
      <section class="landing-section" id="features-section">
        <div class="landing-section-header">
          <span class="hero-pill-badge" style="font-size: 11px;">FOUNDATIONAL PILLARS</span>
          <h2 style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">
            Engineering Rigor. Zero Fake Gamification.
          </h2>
          <p style="font-size: 15px; color: var(--text-secondary); max-width: 600px; margin: 8px auto 0;">
            Built for serious computer science students who demand authentic verification rather than superficial click counters.
          </p>
        </div>

        <div class="preview-pillars-grid">
          <div class="pillar-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 26px;">⚡</div>
              <div style="font-size: 12px; font-family: var(--font-mono); color: #A78BFA; font-weight: 700;">01 / JUDGE</div>
            </div>
            <h3 style="font-size: 17.5px; font-weight: 700; color: var(--text-primary); margin-top: 6px;">Sandboxed Judge Engine</h3>
            <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
              Execute code in 7 programming languages against strict hidden test matrices, memory bounds, and timeouts. Powered by Google Gemini AI for smart error diagnostics.
            </p>
          </div>

          <div class="pillar-card" id="tracks-section">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 26px;">📚</div>
              <div style="font-size: 12px; font-family: var(--font-mono); color: #22D3EE; font-weight: 700;">02 / TRACKS</div>
            </div>
            <h3 style="font-size: 17.5px; font-weight: 700; color: var(--text-primary); margin-top: 6px;">16-Page CS Curricula</h3>
            <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
              6 university-grade syllabi covering Data Structures, Graphs, Dynamic Programming, System Design, OS, and Cryptography. Verifiable certificate requires ≥ 80% on final exams.
            </p>
          </div>

          <div class="pillar-card" id="leaderboard-section">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 26px;">🏆</div>
              <div style="font-size: 12px; font-family: var(--font-mono); color: #34D399; font-weight: 700;">03 / RANKINGS</div>
            </div>
            <h3 style="font-size: 17.5px; font-weight: 700; color: var(--text-primary); margin-top: 6px;">Proof-of-Mastery Leaderboard</h3>
            <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
              Every point of XP is verified from judge executions. No fake XP for reading or clicking. State, college, and district rankings with cryptographic student UID privacy.
            </p>
          </div>

          <div class="pillar-card" id="self-study-section">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 26px;">📖</div>
              <div style="font-size: 12px; font-family: var(--font-mono); color: #FBBF24; font-weight: 700;">04 / FOCUS</div>
            </div>
            <h3 style="font-size: 17.5px; font-weight: 700; color: var(--text-primary); margin-top: 6px;">Distraction-Free Self Study</h3>
            <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
              Private academic PDF reader with bookmarking, multi-page jump navigation, and integrated focus timer. Study sessions award 0 XP to preserve competitive integrity.
            </p>
          </div>
        </div>
      </section>

      <!-- Platform Stats Strip -->
      <section class="landing-stats-banner">
        <div class="landing-stats-container">
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Verified DSA Problems</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">7</div>
            <div class="stat-label">Programming Languages</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">6</div>
            <div class="stat-label">16-Page CS Curricula</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">≥ 80%</div>
            <div class="stat-label">Rigorous Final Pass Mark</div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="landing-section">
        <div class="landing-section-header">
          <span class="hero-pill-badge" style="font-size: 11px;">WORKFLOW</span>
          <h2 style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">
            Three Steps to Verifiable Proof
          </h2>
        </div>

        <div class="landing-steps-grid">
          <div class="step-card">
            <div class="step-badge">1</div>
            <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Choose Your Track or Problem</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
              Select from 6 in-depth CS curricula or 500+ LeetCode problems filtered by topic (Arrays, Graphs, DP) and difficulty.
            </p>
          </div>

          <div class="step-card">
            <div class="step-badge">2</div>
            <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Code & Test Against Sandboxed Judge</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
              Write code in Python, C++, Java, C, Go, Rust, or JavaScript. Test against edge cases with instant Gemini AI diagnosis.
            </p>
          </div>

          <div class="step-card">
            <div class="step-badge">3</div>
            <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Earn Real XP & Rise on Leaderboards</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
              Submit your solution. Verified XP is written to your immutable ledger, advancing your college and district standings.
            </p>
          </div>
        </div>
      </section>

      <!-- Bottom Call to Action Banner -->
      <section class="landing-cta-banner">
        <div style="max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <h2 style="font-size: 34px; font-weight: 800; letter-spacing: -0.02em;">
            Ready to Prove Real Mastery?
          </h2>
          <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6;">
            Join engineering students mastering data structures, algorithms, and systems with honest verification.
          </p>
          <div style="display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap; justify-content: center;">
            <button class="btn btn-primary btn-lg" onclick="AriseAuth.navigateTo('signup')">
              Register Student Account (Free) →
            </button>
            <button class="btn btn-secondary btn-lg" onclick="AriseAuth.navigateTo('login')">
              Sign In to Account
            </button>
          </div>
        </div>
      </section>

      <!-- Landing Footer -->
      <footer class="landing-footer">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <div class="brand-link" onclick="AriseAuth.navigateTo('landing')" style="cursor: pointer;">
            <div class="brand-icon-mark" style="width: 24px; height: 24px; font-size: 12px;">▲</div>
            <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">ARISE</span>
          </div>
          <span>•</span>
          <span>© 2026 ARISE Learning Systems Inc. Designed for engineering students.</span>
        </div>

        <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
          <button class="theme-toggle-btn" onclick="AriseTheme.toggle()" title="Toggle Day/Night mode" style="padding: 4px 10px; font-size: 11.5px;">
            ${isLight ? '🌙 Night Mode' : '☀️ Day Mode'}
          </button>
          <a href="#/login" onclick="event.preventDefault(); AriseAuth.navigateTo('login')" style="color: var(--text-muted); font-size: 12px;">Log In</a>
          <a href="#/signup" onclick="event.preventDefault(); AriseAuth.navigateTo('signup')" style="color: var(--text-muted); font-size: 12px;">Register</a>
        </div>
      </footer>
    </div>
  `;
}

// SCREEN B: SIGN UP (Rule 1)
function renderSignUpScreen() {
  const isLight = (typeof AriseTheme !== 'undefined' && AriseTheme.current === 'light');

  return `
    <div class="auth-container">
      <div style="position: absolute; top: 20px; left: 24px; right: 24px; display: flex; justify-content: space-between; align-items: center;">
        <button class="btn btn-ghost btn-sm" onclick="AriseAuth.navigateTo('landing')" style="gap: 6px;">
          ← Back to Home
        </button>
        <button class="theme-toggle-btn" onclick="AriseTheme.toggle()" title="Toggle Day/Night mode">
          ${isLight ? '🌙 Night' : '☀️ Day'}
        </button>
      </div>

      <div class="auth-card">
        <div style="text-align: center;">
          <div class="brand-icon-mark" style="margin: 0 auto 12px; width: 40px; height: 40px; cursor: pointer;" onclick="AriseAuth.navigateTo('landing')">▲</div>
          <h1 style="font-size: 22px; font-weight: 700; color: var(--text-primary);">Join ARISE</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">A unique, stable ARISE student ID will be created for you</p>
        </div>

        <!-- Tab Switcher (One page with two tabs) -->
        <div class="auth-tabs" style="display: flex; background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 4px; border: 1px solid var(--border-subtle);">
          <button class="btn btn-ghost btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('login')">Log In</button>
          <button class="btn btn-primary btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('signup')">Register</button>
        </div>

        <!-- Inline Error Banner -->
        <div id="signup-error-box" class="alert-banner" style="display: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); color: #FCA5A5; font-size: 13px; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span id="signup-error-text"></span>
        </div>

        <form id="signup-form" onsubmit="event.preventDefault(); handleSignupSubmit();" style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="input-group">
            <label class="input-label" for="signup-email">College / University Email</label>
            <input type="email" id="signup-email" class="input" placeholder="student@coep.ac.in" required autocomplete="email" />
          </div>

          <div class="input-group">
            <label class="input-label" for="signup-display-name">Display (Hunter) Name <span class="text-muted">(Optional)</span></label>
            <input type="text" id="signup-display-name" class="input" placeholder="e.g. Rohan Deshmukh" autocomplete="name" />
          </div>

          <div class="input-group">
            <label class="input-label" for="signup-password">Password</label>
            <input type="password" id="signup-password" class="input" placeholder="Min. 8 characters" required minlength="8" autocomplete="new-password" />
            <span class="text-small text-muted">Minimum 8 characters</span>
          </div>

          <div class="input-group">
            <label class="input-label" for="signup-confirm-password">Confirm Password</label>
            <input type="password" id="signup-confirm-password" class="input" placeholder="Re-enter password" required minlength="8" autocomplete="new-password" />
          </div>

          <button type="submit" id="signup-submit-btn" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; margin-top: var(--space-2);">
            <span id="signup-btn-text">Register Account →</span>
          </button>
        </form>

        <div style="text-align: center; font-size: 13px; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
          Already have an account? <a href="#/login" onclick="event.preventDefault(); AriseAuth.navigateTo('login')">Log In</a>
        </div>
      </div>
    </div>
  `;
}

// SCREEN C: LOGIN (Rule 1)
function renderLoginScreen() {
  const isLight = (typeof AriseTheme !== 'undefined' && AriseTheme.current === 'light');

  return `
    <div class="auth-container">
      <div style="position: absolute; top: 20px; left: 24px; right: 24px; display: flex; justify-content: space-between; align-items: center;">
        <button class="btn btn-ghost btn-sm" onclick="AriseAuth.navigateTo('landing')" style="gap: 6px;">
          ← Back to Home
        </button>
        <button class="theme-toggle-btn" onclick="AriseTheme.toggle()" title="Toggle Day/Night mode">
          ${isLight ? '🌙 Night' : '☀️ Day'}
        </button>
      </div>

      <div class="auth-card">
        <div style="text-align: center;">
          <div class="brand-icon-mark" style="margin: 0 auto 12px; width: 40px; height: 40px; cursor: pointer;" onclick="AriseAuth.navigateTo('landing')">▲</div>
          <h1 style="font-size: 22px; font-weight: 700; color: var(--text-primary);">Welcome to ARISE</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">Sign in to continue solving and rising</p>
        </div>

        <!-- Tab Switcher (One page with two tabs) -->
        <div class="auth-tabs" style="display: flex; background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 4px; border: 1px solid var(--border-subtle);">
          <button class="btn btn-primary btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('login')">Log In</button>
          <button class="btn btn-ghost btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('signup')">Register</button>
        </div>

        <!-- Inline Error Banner -->
        <div id="login-error-box" class="alert-banner" style="display: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); color: #FCA5A5; font-size: 13px; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span id="login-error-text"></span>
        </div>

        <form id="login-form" onsubmit="event.preventDefault(); handleLoginSubmit();" style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="input-group">
            <label class="input-label" for="login-email">Email Address</label>
            <input type="email" id="login-email" class="input font-mono" placeholder="student@coep.ac.in" required autocomplete="email" />
          </div>

          <div class="input-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="input-label" for="login-password">Password</label>
              <a href="#" style="font-size: 12px; color: var(--accent-purple);" onclick="event.preventDefault(); showToast('Password reset link sent to registered email if it exists.', 'info');">Forgot password?</a>
            </div>
            <input type="password" id="login-password" class="input" placeholder="••••••••••••" required autocomplete="current-password" />
          </div>

          <button type="submit" id="login-submit-btn" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; margin-top: var(--space-2);">
            <span id="login-btn-text">Log In →</span>
          </button>
        </form>

        <div style="text-align: center; font-size: 13px; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
          New student? <a href="#/signup" onclick="event.preventDefault(); AriseAuth.navigateTo('signup')">Register an account</a>
        </div>
      </div>
    </div>
  `;
}

// SCREEN D: EMAIL VERIFICATION
function renderVerifyEmailScreen() {
  const email = (ARISE_DATA.currentUser && ARISE_DATA.currentUser.email) || "your email";
  return `
    <div class="auth-container">
      <div class="auth-card" style="text-align: center;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(139,92,246,0.15); border: 2px solid #8B5CF6; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #C4B5FD;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Check Your Inbox</h1>
        <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-5);">
          A verification link has been sent to <b>${email}</b>. Click the link to complete verification.
        </p>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <button class="btn btn-primary btn-lg" onclick="AriseAuth.navigateTo('onboarding')">
            Continue to Profile Setup →
          </button>
          <button class="btn btn-ghost btn-sm" onclick="showToast('Verification email resent', 'info')">
            Resend Email
          </button>
        </div>
      </div>
    </div>
  `;
}

// SCREEN E: STUDENT PROFILE SETUP (Rule 1 & Rule 4)
// "After signup, send the user to the Profile setup screen (display name, college, district, visibility toggles)."
function renderOnboardingScreen() {
  const user = ARISE_DATA.currentUser;
  const currentUid = user.uid && user.uid.startsWith("AR-") ? user.uid : "AR-XXXXXXXX";

  return `
    <div class="auth-container">
      <div class="auth-card" style="max-width: 520px;">
        <!-- Stepper -->
        <div class="onboarding-stepper">
          <div class="step-indicator completed" style="background: var(--success); color: #FFFFFF; border-color: var(--success);">✓</div>
          <div class="step-line" style="background: var(--success);"></div>
          <div class="step-indicator active">2</div>
          <div class="step-line"></div>
          <div class="step-indicator">3</div>
        </div>

        <div style="text-align: center; margin-bottom: var(--space-4);">
          <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF;">Student Profile Setup</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">Configure your public identity and privacy toggles</p>
        </div>

        <form id="onboarding-form" onsubmit="event.preventDefault(); handleProfileSetupSubmit();" style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="input-group">
            <label class="input-label" for="setup-display-name">Display (Hunter) Name</label>
            <input type="text" id="setup-display-name" class="input" value="${user.displayName && user.displayName !== 'Guest Learner' ? user.displayName : ''}" placeholder="e.g. Rohan Deshmukh" required minlength="2" maxlength="50" />
            <span class="text-small text-muted">Shown on class leaderboards and submissions</span>
          </div>

          <div class="input-group">
            <label class="input-label" for="setup-college">College / Institute</label>
            <input type="text" id="setup-college" class="input" placeholder="e.g. COEP Technological University, Pune" />
          </div>

          <div class="input-group">
            <label class="input-label" for="setup-district">District (Maharashtra)</label>
            <input type="text" id="setup-district" class="input" placeholder="e.g. Pune, Mumbai, Kolhapur" />
          </div>

          <!-- Server-Generated Unique UID (Rule 4 & 5: Read-only, client cannot type or edit it) -->
          <div style="padding: 14px; border-radius: var(--radius-md); background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.35); text-align: left;">
            <div style="font-size: 11px; text-transform: uppercase; color: #C4B5FD; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px;">
              Your System-Generated ARISE UID (Immutable)
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="font-mono" style="font-size: 16px; font-weight: 700; color: #FFFFFF;">${currentUid}</span>
              <button type="button" class="btn btn-secondary btn-sm" onclick="copyAriseUid('${currentUid}')">Copy</button>
            </div>
            <p style="font-size: 11.5px; color: var(--text-muted); margin-top: 6px;">
              Server-generated to guarantee uniqueness. Classmates use this UID to add you to mutual friend leaderboards.
            </p>
          </div>

          <!-- Visibility Toggles (Rule 1) -->
          <div style="display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle);">
            <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">
              Leaderboard Privacy Controls
            </div>

            <label style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #FFFFFF; cursor: pointer;">
              <input type="checkbox" id="setup-show-rank" checked style="accent-color: var(--accent-purple); width: 16px; height: 16px;" />
              <span>Show DSA rank on public leaderboards</span>
            </label>

            <label style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #FFFFFF; cursor: pointer;">
              <input type="checkbox" id="setup-show-progress" checked style="accent-color: var(--accent-purple); width: 16px; height: 16px;" />
              <span>Show verified solved problems and attempt counts</span>
            </label>
          </div>

          <button type="submit" id="onboarding-submit-btn" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; margin-top: var(--space-2);">
            Finish Setup & Launch Dashboard →
          </button>
        </form>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// AUTHENTICATION EVENT HANDLERS (Rule 1, Rule 4, Rule 5)
// --------------------------------------------------------------------------

async function handleLoginSubmit() {
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const errorBox = document.getElementById('login-error-box');
  const errorText = document.getElementById('login-error-text');
  const submitBtn = document.getElementById('login-submit-btn');
  const btnText = document.getElementById('login-btn-text');

  if (errorBox) errorBox.style.display = 'none';

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!email || !password) {
    if (errorBox && errorText) {
      errorText.textContent = "Please fill in all fields.";
      errorBox.style.display = 'flex';
    }
    return;
  }

  // Loading state
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.innerHTML = `<span class="loading-spinner"></span> Signing in...`;

  try {
    await AriseAuth.signIn(email, password);
  } catch (err) {
    // Show safe error message only (Never reveal whether email exists)
    if (errorBox && errorText) {
      errorText.textContent = err.message || "Invalid email or password.";
      errorBox.style.display = 'flex';
    }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = "Log In →";
  }
}

async function handleSignupSubmit() {
  const emailInput = document.getElementById('signup-email');
  const nameInput = document.getElementById('signup-display-name');
  const passwordInput = document.getElementById('signup-password');
  const confirmInput = document.getElementById('signup-confirm-password');
  const errorBox = document.getElementById('signup-error-box');
  const errorText = document.getElementById('signup-error-text');
  const submitBtn = document.getElementById('signup-submit-btn');
  const btnText = document.getElementById('signup-btn-text');

  if (errorBox) errorBox.style.display = 'none';

  const email = emailInput ? emailInput.value.trim() : '';
  const displayName = nameInput ? nameInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';
  const confirmPassword = confirmInput ? confirmInput.value : '';

  // Client-side validation (Rule 1)
  if (!email || !password || !confirmPassword) {
    if (errorBox && errorText) {
      errorText.textContent = "Please fill in all required fields.";
      errorBox.style.display = 'flex';
    }
    return;
  }

  if (!AriseAuth.validateEmail(email)) {
    if (errorBox && errorText) {
      errorText.textContent = "Please enter a valid email address.";
      errorBox.style.display = 'flex';
    }
    return;
  }

  if (password.length < 8) {
    if (errorBox && errorText) {
      errorText.textContent = "Password must be at least 8 characters long.";
      errorBox.style.display = 'flex';
    }
    return;
  }

  if (password !== confirmPassword) {
    if (errorBox && errorText) {
      errorText.textContent = "Passwords do not match. Please re-enter.";
      errorBox.style.display = 'flex';
    }
    return;
  }

  // Loading state
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.innerHTML = `<span class="loading-spinner"></span> Creating account...`;

  try {
    await AriseAuth.signUp(email, password, confirmPassword, displayName);
  } catch (err) {
    if (errorBox && errorText) {
      errorText.textContent = err.message || "Could not complete signup. Please try again.";
      errorBox.style.display = 'flex';
    }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = "Create Account →";
  }
}

async function handleProfileSetupSubmit() {
  const nameInput = document.getElementById('setup-display-name');
  const collegeInput = document.getElementById('setup-college');
  const districtInput = document.getElementById('setup-district');
  const showRankInput = document.getElementById('setup-show-rank');
  const showProgressInput = document.getElementById('setup-show-progress');
  const submitBtn = document.getElementById('onboarding-submit-btn');

  const displayName = nameInput ? nameInput.value.trim() : '';
  const collegeName = collegeInput ? collegeInput.value.trim() : '';
  const districtName = districtInput ? districtInput.value.trim() : '';
  const showDsaRank = showRankInput ? showRankInput.checked : true;
  const showDsaProgress = showProgressInput ? showProgressInput.checked : true;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving profile...";
  }

  try {
    const patchPayload = {
      display_name: displayName || undefined,
      college_name: collegeName || undefined,
      district_name: districtName || undefined,
      show_dsa_rank: showDsaRank,
      show_dsa_progress: showDsaProgress
    };

    const updatedProfile = await AriseState.apiRequest('/me', 'PATCH', patchPayload);
    AriseAuth.applyCleanUserProfile(updatedProfile);

    if (typeof showToast === 'function') {
      showToast("Profile configured! Launching dashboard...", "success");
    }

    AriseAuth.navigateTo('overview');
  } catch (err) {
    if (typeof showToast === 'function') {
      showToast(err.message || "Failed to update profile", "error");
    }
    // Proceed to dashboard on network error
    AriseAuth.navigateTo('overview');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Finish Setup & Launch Dashboard →";
    }
  }
}
