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
  return `
    <div class="landing-page">
      <!-- Landing Navigation -->
      <header class="landing-nav">
        <div class="brand-link" onclick="AriseState.setScreen('landing')">
          <div class="brand-icon-mark">▲</div>
          <div class="brand-text-block">
            <span class="brand-name">ARISE</span>
            <span class="brand-tagline">Learn. Solve. Rise.</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: var(--space-4);">
          <button class="btn btn-ghost" onclick="AriseState.setScreen('login')">Log In</button>
          <button class="btn btn-primary" onclick="AriseState.setScreen('signup')">Get Started Free →</button>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="landing-hero">
        <div class="hero-pill-badge">
          <span>● Engineering & College Student Learning Platform</span>
        </div>

        <h1 class="hero-title">
          Learn the principles.<br/>Solve the problems. Rise.
        </h1>

        <p class="hero-subtitle">
          The premier computer science and competitive programming ecosystem engineered for students. Verified DSA XP, zero fake gamification, and honest proof of mastery.
        </p>

        <div class="hero-cta-group">
          <button class="btn btn-primary btn-lg" onclick="AriseState.setScreen('signup')">
            Create Free Student Account →
          </button>
          <button class="btn btn-secondary btn-lg" onclick="AriseState.setScreen('overview')">
            Explore Live Dashboard Preview
          </button>
        </div>

        <!-- Product Preview Window (Art-directed preview) -->
        <div class="landing-preview-window">
          <div class="preview-window-bar">
            <div class="window-dots">
              <div class="window-dot"></div>
              <div class="window-dot"></div>
              <div class="window-dot"></div>
            </div>
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">arise.platform/app/overview • 1440px Desktop</span>
          </div>
          <div style="padding: 24px; background: #080B14; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-default); padding-bottom: 16px; margin-bottom: 20px;">
              <div>
                <div style="font-size: 12px; color: #C4B5FD; font-weight: 600;">ACTIVE STUDENT SESSION</div>
                <div style="font-size: 20px; font-weight: 700; color: #FFFFFF;">Rohan Deshmukh • COEP Tech University</div>
              </div>
              <div class="uid-chip"><span class="uid-val">ARISE-7K2M9Q</span></div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
              <div class="metric-card"><span class="metric-label">Verified XP</span><span class="metric-value">3,420 XP</span></div>
              <div class="metric-card"><span class="metric-label">State Rank</span><span class="metric-value font-mono">#14</span></div>
              <div class="metric-card"><span class="metric-label">Problems Solved</span><span class="metric-value">48 Solved</span></div>
              <div class="metric-card"><span class="metric-label">Courses Completed</span><span class="metric-value">2 Track</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Core Pillars -->
      <div class="preview-pillars-grid">
        <div class="pillar-card">
          <div style="font-size: 24px; color: #A78BFA;">01</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #FFFFFF;">Verified Submissions Only</h3>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
            Every point of XP is verified by an isolated sandbox judge engine. Reading notes, watching videos, or fake clicks never award DSA rank.
          </p>
        </div>

        <div class="pillar-card">
          <div style="font-size: 24px; color: #22D3EE;">02</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #FFFFFF;">System-Generated UID & Privacy</h3>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
            Every student receives a cryptographic UID like <code style="color: #A78BFA; font-family: var(--font-mono);">ARISE-7K2M9Q</code>. Mutual consent is strictly enforced for friend leaderboards.
          </p>
        </div>

        <div class="pillar-card">
          <div style="font-size: 24px; color: #34D399;">03</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #FFFFFF;">Rigorous 80% Passing Cutoff</h3>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
            Courses are complete only when passing the comprehensive final assessment with 80% or higher. 79% remains incomplete until mastery is demonstrated.
          </p>
        </div>
      </div>

      <!-- Landing Footer -->
      <footer style="margin-top: auto; border-top: 1px solid var(--border-default); padding: 32px var(--space-8); display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-muted); background: #060910;">
        <div>© 2026 ARISE Learning Systems Inc. Designed for engineering students in India.</div>
        <div style="display: flex; gap: var(--space-4);">
          <a href="#" style="color: var(--text-muted);">Terms of Service</a>
          <a href="#" style="color: var(--text-muted);">Privacy Policy</a>
          <a href="#" style="color: var(--text-muted);">Backend Verification Rules</a>
        </div>
      </footer>
    </div>
  `;
}

// SCREEN B: SIGN UP
function renderSignUpScreen() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div style="text-align: center;">
          <div class="brand-icon-mark" style="margin: 0 auto 12px; width: 40px; height: 40px;">▲</div>
          <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF;">Join ARISE</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">A unique ARISE student ID will be created for you</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="input-group">
            <label class="input-label">College Email Address</label>
            <input type="email" class="input" placeholder="student@coep.ac.in" />
          </div>

          <div class="input-group">
            <label class="input-label">Password</label>
            <input type="password" class="input" placeholder="••••••••••••" />
            <span class="text-small text-muted">Minimum 8 characters with numbers and symbols</span>
          </div>

          <button class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;" onclick="AriseState.setScreen('verify-email')">
            Create Account →
          </button>
        </div>

        <div style="text-align: center; font-size: 13px; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
          Already have an account? <a href="#" onclick="AriseState.setScreen('login')">Log In</a>
        </div>
      </div>
    </div>
  `;
}

// SCREEN C: LOGIN
function renderLoginScreen() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div style="text-align: center;">
          <div class="brand-icon-mark" style="margin: 0 auto 12px; width: 40px; height: 40px;">▲</div>
          <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF;">Welcome to ARISE</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">Sign in to continue solving and rising</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="input-group">
            <label class="input-label">Email or ARISE ID</label>
            <input type="text" class="input font-mono" placeholder="ARISE-7K2M9Q or email" value="rohan@coep.ac.in" />
          </div>

          <div class="input-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="input-label">Password</label>
              <a href="#" style="font-size: 12px;" onclick="showToast('Password reset link sent', 'info')">Forgot password?</a>
            </div>
            <input type="password" class="input" value="••••••••••••" />
          </div>

          <button class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;" onclick="AriseState.setScreen('overview')">
            Log In →
          </button>
        </div>

        <div style="text-align: center; font-size: 13px; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
          New student? <a href="#" onclick="AriseState.setScreen('signup')">Create an account</a>
        </div>
      </div>
    </div>
  `;
}

// SCREEN D: EMAIL VERIFICATION
function renderVerifyEmailScreen() {
  return `
    <div class="auth-container">
      <div class="auth-card" style="text-align: center;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(139,92,246,0.15); border: 2px solid #8B5CF6; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #C4B5FD;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Check Your Inbox</h1>
        <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-5);">
          We sent a verification link to <b>student@coep.ac.in</b>. Please verify to activate your account.
        </p>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <button class="btn btn-primary btn-lg" onclick="AriseState.setScreen('onboarding')">
            Simulate Email Verified →
          </button>
          <button class="btn btn-ghost btn-sm" onclick="showToast('New verification code sent', 'info')">
            Resend Email (cooldown 45s)
          </button>
        </div>
      </div>
    </div>
  `;
}

// SCREEN E: STUDENT ONBOARDING (3 Steps Max with Generated UID Confirmation)
function renderOnboardingScreen() {
  return `
    <div class="auth-container">
      <div class="auth-card" style="max-width: 500px;">
        <!-- Stepper: 3 steps max -->
        <div class="onboarding-stepper">
          <div class="step-indicator completed">✓</div>
          <div class="step-line" style="background: var(--success);"></div>
          <div class="step-indicator active">2</div>
          <div class="step-line"></div>
          <div class="step-indicator">3</div>
        </div>

        <div style="text-align: center; margin-bottom: var(--space-4);">
          <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF;">Complete Student Profile</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">Step 2 of 3: Academic Information</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="input-group">
            <label class="input-label">Display (Hunter) Name</label>
            <input type="text" class="input" value="Rohan Deshmukh" />
          </div>

          <div class="input-group">
            <label class="input-label">College / Institute</label>
            <input type="text" class="input" value="COEP Technological University, Pune" />
          </div>

          <div class="input-group">
            <label class="input-label">District (Maharashtra)</label>
            <input type="text" class="input" value="Pune" />
          </div>

          <!-- Generated UID preview confirmation (Strict rule: User never types it) -->
          <div style="padding: 14px; border-radius: var(--radius-md); background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.35); text-align: left;">
            <div style="font-size: 11px; text-transform: uppercase; color: #C4B5FD; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px;">
              Your System-Generated ARISE ID
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="font-mono" style="font-size: 16px; font-weight: 700; color: #FFFFFF;">ARISE-7K2M9Q</span>
              <button class="btn btn-secondary btn-sm" onclick="copyAriseUid('ARISE-7K2M9Q')">Copy</button>
            </div>
            <p style="font-size: 11.5px; color: var(--text-muted); margin-top: 6px;">
              Generated automatically to ensure uniqueness. You will use this ID to connect with classmates on the Friends Leaderboard.
            </p>
          </div>

          <button class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; margin-top: var(--space-2);" onclick="AriseState.setScreen('overview'); showToast('Welcome to ARISE! UID: ARISE-7K2M9Q', 'success');">
            Finish Onboarding & Launch Dashboard →
          </button>
        </div>
      </div>
    </div>
  `;
}
