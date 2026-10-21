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

// SCREEN B: SIGN UP (Rule 1)
function renderSignUpScreen() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div style="text-align: center;">
          <div class="brand-icon-mark" style="margin: 0 auto 12px; width: 40px; height: 40px;">▲</div>
          <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF;">Join ARISE</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">A unique, stable ARISE student ID will be created for you</p>
        </div>

        <!-- Tab Switcher (One page with two tabs) -->
        <div class="auth-tabs" style="display: flex; background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 4px; border: 1px solid var(--border-subtle);">
          <button class="btn btn-ghost btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('login')">Log In</button>
          <button class="btn btn-primary btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('signup')">Sign Up</button>
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
            <span id="signup-btn-text">Create Account →</span>
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
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div style="text-align: center;">
          <div class="brand-icon-mark" style="margin: 0 auto 12px; width: 40px; height: 40px;">▲</div>
          <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF;">Welcome to ARISE</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">Sign in to continue solving and rising</p>
        </div>

        <!-- Tab Switcher (One page with two tabs) -->
        <div class="auth-tabs" style="display: flex; background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 4px; border: 1px solid var(--border-subtle);">
          <button class="btn btn-primary btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('login')">Log In</button>
          <button class="btn btn-ghost btn-sm" style="flex: 1; justify-content: center;" onclick="AriseAuth.navigateTo('signup')">Sign Up</button>
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
          New student? <a href="#/signup" onclick="event.preventDefault(); AriseAuth.navigateTo('signup')">Create an account</a>
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
