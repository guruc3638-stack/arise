/* ==========================================================================
   ARISE SCREENS T, U, V: PROFILE, ACHIEVEMENTS & PRIVACY SETTINGS
   Verifiable Student Learning Record, Read-only UID, Server-Enforced Privacy
   ========================================================================== */

function renderProfileScreen() {
  if (AriseState.currentScreen === 'badges') {
    return renderBadgesScreen();
  } else if (AriseState.currentScreen === 'settings') {
    return renderSettingsScreen();
  }
  return renderProfileView();
}

// SCREEN T: PROFILE AND PROGRESS
function renderProfileView() {
  const user = ARISE_DATA.currentUser;
  const isCleanAccount = (!user.verifiedXp || user.verifiedXp === 0);
  const currentRankDisplay = (isCleanAccount || !user.rank || !user.rank.maharashtra) ? "Unranked" : `#${user.rank.maharashtra}`;
  const completedCourses = isCleanAccount ? [] : ARISE_DATA.courses.filter(c => c.assessmentPassed);
  const earnedBadges = isCleanAccount ? [] : ARISE_DATA.badges.filter(b => b.status === 'earned');

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Profile Header Card -->
      <div class="profile-header-card">
        <div style="display: flex; align-items: center; gap: var(--space-5);">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: ${user.avatarBg || 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)'}; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; color: #FFFFFF; box-shadow: var(--shadow-glow);">
            ${user.avatar || 'ST'}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h1 style="font-size: 24px; font-weight: 700; color: #FFFFFF;">${user.displayName}</h1>
              <span class="badge" style="background: rgba(139,92,246,0.2); color: #C4B5FD;">Verified Student</span>
            </div>
            <div style="font-size: 13.5px; color: var(--text-secondary); margin-top: 2px;">
              ${user.college} • ${user.district ? user.district + ', ' : ''}${user.state}
            </div>

            <!-- Read-Only UID Chip with Copy Action (Rule 4 & 5: Server-generated, immutable) -->
            <div style="margin-top: 8px;">
              <div class="uid-chip">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Unique ARISE ID</span>
                <span class="uid-val">${user.uid}</span>
                <button class="btn-copy" onclick="copyAriseUid('${user.uid}')" title="Copy UID to clipboard">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: var(--space-3);">
          <button class="btn btn-secondary" onclick="openEditProfileModal()">
            Edit Profile
          </button>
          <button class="btn btn-ghost" onclick="AriseState.setScreen('settings')">
            Privacy & Settings
          </button>
        </div>
      </div>

      <!-- Core Verifiable Stats -->
      <div class="grid-12">
        <div class="col-4">
          <div class="metric-card">
            <span class="metric-label">Verified DSA XP</span>
            <span class="metric-value" style="color: #FFFFFF;">
              ${user.verifiedXp.toLocaleString()} <span style="font-size: 16px; color: #A78BFA;">XP</span>
            </span>
            <span class="metric-meta text-muted" style="font-size: 11px;">Judge confirmed submissions</span>
          </div>
        </div>

        <div class="col-4">
          <div class="metric-card">
            <span class="metric-label">Overall State Rank</span>
            <span class="metric-value font-mono" style="color: #FFFFFF;">${currentRankDisplay}</span>
            <span class="metric-meta" style="color: ${isCleanAccount ? 'var(--text-muted)' : 'var(--success)'}; font-size: 11px;">
              ${isCleanAccount ? 'Solve problems to qualify for state rank' : 'Rank ▲ in Maharashtra'}
            </span>
          </div>
        </div>

        <div class="col-4">
          <div class="metric-card">
            <span class="metric-label">DSA Visibility</span>
            <span class="metric-value" style="font-size: 20px; text-transform: capitalize; color: var(--accent-cyan);">
              ${user.privacySetting}
            </span>
            <span class="metric-meta text-muted" style="font-size: 11px;">Enforced by server rules</span>
          </div>
        </div>
      </div>

      <!-- Completed Courses & Verified Certifications -->
      <div class="surface-opaque" style="padding: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div>
            <h3 style="font-size: 16px; font-weight: 700;">Completed Courses & Skill Tracks</h3>
            <p class="text-small text-muted">Courses completed with final score ≥ 80%</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('learning-catalogue')">
            Browse Catalogue →
          </button>
        </div>

        ${completedCourses.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${completedCourses.map(c => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle);">
                <div>
                  <div style="font-weight: 600; color: var(--text-primary); font-size: 14px;">${c.title}</div>
                  <div style="display: flex; gap: 6px; margin-top: 4px;">
                    ${c.skills.map(s => `<span class="topic-tag">${s}</span>`).join('')}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div class="badge" style="background: var(--success-bg); color: var(--success); border: 1px solid var(--success-border);">
                    Passed (${c.assessmentScore}%)
                  </div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Verified Certificate</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <!-- Rule 4: Clean Courses Empty State -->
          <div style="padding: var(--space-6); text-align: center; color: var(--text-muted);">
            <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">No courses completed yet</div>
            <p style="font-size: 12.5px; color: var(--text-secondary); max-width: 380px; margin: 0 auto 14px; line-height: 1.5;">
              Score 80% or higher on comprehensive course assessments to earn verified credentials on your student record.
            </p>
            <button class="btn btn-primary btn-sm" onclick="AriseState.setScreen('learning-catalogue')">Explore Learning Tracks →</button>
          </div>
        `}
      </div>

      <!-- Earned Badges Showcase -->
      <div class="glass-card" style="padding: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div>
            <h3 style="font-size: 16px; font-weight: 700;">Milestone Achievements</h3>
            <p class="text-small text-muted">Unlocked strictly via verified conditions</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="AriseState.setScreen('badges')">
            View All Badges (${ARISE_DATA.badges.length}) →
          </button>
        </div>

        ${earnedBadges.length > 0 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-4);">
            ${earnedBadges.map(b => `
              <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle);">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); display: flex; align-items: center; justify-content: center; color: #A78BFA; flex-shrink: 0;">
                  ★
                </div>
                <div>
                  <div style="font-weight: 600; color: var(--text-primary); font-size: 13.5px;">${b.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">Unlocked ${b.unlockedDate}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <!-- Rule 4: Clean Badges Empty State -->
          <div style="padding: var(--space-6); text-align: center; color: var(--text-muted);">
            <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">No milestone badges unlocked</div>
            <p style="font-size: 12.5px; color: var(--text-secondary); max-width: 380px; margin: 0 auto 14px; line-height: 1.5;">
              Badges are awarded automatically as you solve problems and build your streak in the sandbox.
            </p>
            <button class="btn btn-secondary btn-sm" onclick="AriseState.setScreen('dsa-problems')">Start Practicing →</button>
          </div>
        `}
      </div>
    </div>
  `;
}

// SCREEN U: ACHIEVEMENT BADGES COLLECTION
function renderBadgesScreen() {
  const badges = ARISE_DATA.badges;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
        <div>
          <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('profile')" style="margin-bottom: 6px;">
            ← Back to Profile
          </button>
          <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Achievement Collection</h1>
          <p class="text-small text-muted">
            Badges represent real, confirmed milestones. No fake achievements or cosmetic confetti.
          </p>
        </div>
      </div>

      <div class="badges-grid">
        ${badges.map(b => {
          const isEarned = b.status === 'earned';
          return `
            <div class="badge-card ${isEarned ? '' : 'locked'}" onclick="openBadgeDetail('${b.id}')">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: ${isEarned ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.04)'}; border: 2px solid ${isEarned ? '#8B5CF6' : 'rgba(255,255,255,0.15)'}; display: flex; align-items: center; justify-content: center; font-size: 20px; color: ${isEarned ? '#C4B5FD' : 'var(--text-muted)'}; margin-bottom: 4px;">
                ${isEarned ? '★' : '🔒'}
              </div>

              <div style="font-weight: 700; font-size: 14px; color: var(--text-primary); margin-bottom: 2px;">
                ${b.name}
              </div>
              <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">
                ${b.desc}
              </p>

              <div style="margin-top: auto; width: 100%; padding-top: 8px; border-top: 1px solid var(--border-subtle); font-size: 11px;">
                ${isEarned ? `
                  <span style="color: var(--success); font-weight: 600;">Unlocked ${b.unlockedDate}</span>
                ` : `
                  <div style="color: var(--text-muted); margin-bottom: 4px;">Progress: ${b.progress}%</div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill" style="width: ${b.progress}%;"></div>
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function openBadgeDetail(badgeId) {
  const b = ARISE_DATA.badges.find(item => item.id === badgeId);
  if (!b) return;

  let modal = document.getElementById('badge-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'badge-detail-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-window">
      <div class="modal-header">
        <h3 style="font-size: 16px; font-weight: 700;">Achievement Details</h3>
        <button class="btn btn-ghost btn-sm" onclick="modal.classList.remove('open')">✕</button>
      </div>
      <div class="modal-body" style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-4);">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: ${b.status === 'earned' ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${b.status === 'earned' ? '#8B5CF6' : 'rgba(255,255,255,0.1)'}; display: flex; align-items: center; justify-content: center; font-size: 28px; color: ${b.status === 'earned' ? '#C4B5FD' : 'var(--text-muted)'};">
          ${b.status === 'earned' ? '★' : '🔒'}
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #FFFFFF;">${b.name}</h2>
        <p style="font-size: 13.5px; color: var(--text-secondary); max-width: 420px; line-height: 1.6;">
          ${b.desc}
        </p>

        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 16px; width: 100%; text-align: left; font-size: 12.5px;">
          <div style="color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Requirement Condition</div>
          <div style="color: var(--text-primary); font-family: var(--font-mono);">${b.requirement || 'Confirmed judge submission across verified problem sets.'}</div>
          ${b.status === 'earned' ? `<div style="color: var(--success); font-weight: 600; margin-top: 8px;">✓ Achieved on ${b.unlockedDate}</div>` : ''}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="modal.classList.remove('open')">Close</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

// SCREEN V: SETTINGS & PRIVACY (Server-Enforced Rules)
function renderSettingsScreen() {
  const user = ARISE_DATA.currentUser;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6); max-width: 800px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Account & Privacy Settings</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">
            Configure platform preferences and leaderboard presence.
          </p>
        </div>
      </div>

      <!-- Privacy Section: Server Enforced Note -->
      <div class="surface-opaque" style="padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-5);">
        <div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">DSA Progress & Leaderboard Visibility</h3>
          <p class="text-small text-muted" style="margin-top: 4px; line-height: 1.5;">
            Choose how your solves and ranking appear to other students.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${[
            { id: 'public', title: 'Public (Recommended)', desc: 'Visible on College, District, State and National leaderboards with display name and verified XP.' },
            { id: 'friends', title: 'Visible to Friends Only', desc: 'Appears only on Friends leaderboard and comparison. Listed anonymously as "Private Student" on public scopes.' },
            { id: 'private', title: 'Private', desc: 'Hidden from all leaderboards. No other student can see your problem solves or topic progress.' }
          ].map(opt => `
            <div style="padding: 14px 18px; border-radius: var(--radius-md); background: ${user.privacySetting === opt.id ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${user.privacySetting === opt.id ? 'rgba(139,92,246,0.4)' : 'var(--border-subtle)'}; cursor: pointer;"
              onclick="ARISE_DATA.currentUser.privacySetting = '${opt.id}'; AriseState.notify(); showToast('Privacy updated to ' + '${opt.title}', 'success');">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 600; font-size: 14px; color: ${user.privacySetting === opt.id ? '#FFFFFF' : 'var(--text-primary)'};">${opt.title}</span>
                ${user.privacySetting === opt.id ? '<span style="color: var(--accent-primary); font-weight: 700;">✓ Active</span>' : ''}
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${opt.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Strict Spec Rule: Plain language backend enforcement notice -->
        <div style="padding: 12px; border-radius: var(--radius-md); background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.25); font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
          🔒 <b>Backend Security Note:</b> Privacy controls are enforced by ARISE server-side authorization policies. Data is blocked at the API query level, not through superficial client-side CSS hiding.
        </div>
      </div>
    </div>
  `;
}

// EDIT PROFILE MODAL (UID read-only & disabled)
function openEditProfileModal() {
  const user = ARISE_DATA.currentUser;
  let modal = document.getElementById('edit-profile-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'edit-profile-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-window">
      <div class="modal-header">
        <h3 style="font-size: 16px; font-weight: 700;">Edit Profile</h3>
        <button class="btn btn-ghost btn-sm" onclick="modal.classList.remove('open')">✕</button>
      </div>
      <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Read-only UID input -->
        <div class="input-group">
          <label class="input-label">
            ARISE Student UID
            <span class="text-small text-muted font-mono">Assigned by system</span>
          </label>
          <input type="text" class="input font-mono" value="${user.uid}" disabled style="cursor: not-allowed; opacity: 0.6; background: rgba(0,0,0,0.4);" />
          <span style="font-size: 11px; color: var(--text-muted);">Assigned automatically by ARISE on account creation and cannot be changed.</span>
        </div>

        <div class="input-group">
          <label class="input-label">Display Name</label>
          <input id="edit-display-name-input" type="text" class="input" value="${user.displayName}" />
        </div>

        <div class="input-group">
          <label class="input-label">College / Institute</label>
          <input id="edit-college-input" type="text" class="input" value="${user.college}" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="modal.classList.remove('open')">Cancel</button>
        <button class="btn btn-primary" onclick="saveProfileChanges()">Save Changes</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function saveProfileChanges() {
  const nameInput = document.getElementById('edit-display-name-input');
  const collegeInput = document.getElementById('edit-college-input');
  if (nameInput?.value) ARISE_DATA.currentUser.displayName = nameInput.value;
  if (collegeInput?.value) ARISE_DATA.currentUser.college = collegeInput.value;

  const modal = document.getElementById('edit-profile-modal');
  if (modal) modal.classList.remove('open');
  showToast('Profile updated successfully!', 'success');
  AriseState.notify();
}
