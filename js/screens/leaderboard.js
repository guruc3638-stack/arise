/* ==========================================================================
   ARISE SCREEN G & H: LEADERBOARDS & FRIENDS COMPARISON
   Global Scopes (College, District, Maharashtra, India) + Friends System
   ========================================================================== */

function renderLeaderboardScreen() {
  const isFriendsTab = AriseState.leaderboardTab === 'friends';
  const scope = AriseState.leaderboardScope || 'maharashtra';
  const students = ARISE_DATA.leaderboards[scope] || ARISE_DATA.leaderboards.maharashtra;
  const user = ARISE_DATA.currentUser;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Header with Tabs: Global Leaderboard vs Friends -->
      <div class="leaderboard-header-bar">
        <div>
          <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Leaderboard & Rankings</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">
            Rankings are determined strictly by judge-verified DSA XP. Study time and course progress do not affect rank.
          </p>
        </div>

        <!-- Segmented Tab: Global vs Friends -->
        <div class="segmented-control">
          <button class="segment-btn ${!isFriendsTab ? 'active' : ''}" 
            onclick="AriseState.leaderboardTab = 'global'; AriseState.notify();">
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Global Rankings
            </span>
          </button>
          <button class="segment-btn ${isFriendsTab ? 'active' : ''}" 
            onclick="AriseState.leaderboardTab = 'friends'; AriseState.notify();">
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Friends Network (${ARISE_DATA.friends.length})
            </span>
          </button>
        </div>
      </div>

      ${!isFriendsTab ? renderGlobalLeaderboard(scope, students, user) : renderFriendsLeaderboard()}
    </div>
  `;
}

// VIEW 1: GLOBAL LEADERBOARD (4 Scopes)
function renderGlobalLeaderboard(scope, students, user) {
  const podiumTop3 = students.slice(0, 3);

  return `
    <!-- Scope Selector: College, District, Maharashtra, India -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
      <div class="segmented-control">
        ${[
          { id: 'college', label: 'College (COEP)' },
          { id: 'district', label: 'District (Pune)' },
          { id: 'maharashtra', label: 'Maharashtra' },
          { id: 'india', label: 'India' }
        ].map(s => `
          <button class="segment-btn ${s.id === scope ? 'active' : ''}" 
            onclick="AriseState.leaderboardScope = '${s.id}'; AriseState.notify();">
            ${s.label}
          </button>
        `).join('')}
      </div>

      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <div class="search-input-box" style="width: 240px; padding: 6px 10px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Filter student or college..." style="background: transparent; border: none; outline: none; font-size: 12px; color: var(--text-primary); width: 100%;" />
        </div>
      </div>
    </div>

    <!-- Top 3 Podium Strip (Subtle metallic hairline accents, not childish confetti) -->
    <div class="podium-strip">
      ${podiumTop3.map((st, idx) => {
        const medalColor = idx === 0 ? '#FBBF24' : idx === 1 ? '#CBD5E1' : '#D97706';
        const rankLabel = idx === 0 ? '1st Place' : idx === 1 ? '2nd Place' : '3rd Place';
        return `
          <div class="podium-card podium-card-${idx + 1}">
            <div style="font-size: 11px; font-weight: 700; color: ${medalColor}; letter-spacing: 0.08em; text-transform: uppercase;">
              ${rankLabel}
            </div>
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 2px solid ${medalColor}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #FFFFFF; margin: 4px 0;">
              ${st.avatar}
            </div>
            <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">${st.name}</div>
            <div class="text-small text-muted" style="max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${st.college}
            </div>
            <div style="margin-top: 6px; font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: #FFFFFF;">
              ${st.xp.toLocaleString()} <span style="font-size: 12px; color: #A78BFA;">XP</span>
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              ${st.solved} problems verified
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Leaderboard Data Table -->
    <div class="surface-opaque" style="padding: 0; overflow: hidden;">
      <table class="arise-table" aria-label="Global Verified Leaderboard Table">
        <thead>
          <tr>
            <th style="width: 80px;">Rank</th>
            <th>Student</th>
            <th>College</th>
            <th style="width: 140px;">Rank Movement</th>
            <th style="width: 120px;">Solved</th>
            <th style="width: 130px; text-align: right;">Verified XP</th>
          </tr>
        </thead>
        <tbody>
          ${students.map(st => `
            <tr class="${st.isCurrentUser ? 'user-row' : ''}">
              <td>
                <span class="font-mono" style="font-weight: 700; font-size: 13px; color: ${st.rank <= 3 ? '#FBBF24' : 'var(--text-secondary)'};">
                  #${st.rank}
                </span>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--text-primary);">
                    ${st.avatar}
                  </div>
                  <div>
                    <span style="font-weight: 600; color: var(--text-primary);">${st.name}</span>
                    ${st.isCurrentUser ? `<span class="badge" style="margin-left: 6px; background: rgba(139,92,246,0.3); color: #DDD6FE; font-size: 9px;">YOU</span>` : ''}
                  </div>
                </div>
              </td>
              <td><span class="text-secondary" style="font-size: 13px;">${st.college}</span></td>
              <td>
                <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-family: var(--font-mono); font-weight: 600; color: ${st.mv.startsWith('+') ? 'var(--success)' : st.mv.startsWith('-') ? 'var(--error)' : 'var(--text-muted)'};">
                  ${st.mv.startsWith('+') ? '▲' : st.mv.startsWith('-') ? '▼' : '—'} ${st.mv === '—' ? 'No change' : st.mv.replace('+', '').replace('-', '') + ' spots'}
                </span>
              </td>
              <td><span style="font-family: var(--font-mono); font-size: 12.5px;">${st.solved} verified</span></td>
              <td style="text-align: right;">
                <span class="font-mono" style="font-weight: 700; color: #FFFFFF; font-size: 14px;">
                  ${st.xp.toLocaleString()}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Sticky Current User Row Reminder at bottom -->
    <div style="padding: 12px 16px; border-radius: var(--radius-md); background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.3); display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="badge" style="background: rgba(139,92,246,0.3); color: #C4B5FD;">Your Position</span>
        <span style="font-size: 13px; color: var(--text-primary);">You are currently <b>#${user.rank[scope] || user.rank.maharashtra}</b> in ${scope} with <b>${user.verifiedXp} XP</b></span>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="AriseState.setScreen('dsa-problems')">
        Solve next problem for +50 XP →
      </button>
    </div>
  `;
}

// VIEW 2: FRIENDS LEADERBOARD & 4-WAY COMPARISON (With Add Friend Box & UID Lookup)
function renderFriendsLeaderboard() {
  const friends = ARISE_DATA.friends;
  const user = ARISE_DATA.currentUser;
  const comparedFriends = friends.filter(f => AriseState.compareFriends.includes(f.uid));

  return `
    <!-- ADD FRIEND BOX WITH UID INPUT & LOOKUP CARD -->
    <div class="add-friend-box">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-4); margin-bottom: var(--space-3);">
        <div>
          <h3 style="font-size: 15px; font-weight: 600;">Add Friend by ARISE ID</h3>
          <p class="text-small text-muted">
            Connect using unique ARISE UIDs. Mutual consent is strictly enforced.
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="text-small text-muted">Your ID:</span>
          <div class="uid-chip" style="padding: 2px 8px; font-size: 11px;">
            <span class="uid-val">${user.uid}</span>
            <button class="btn-copy" onclick="copyAriseUid('${user.uid}')" title="Copy your UID to share with classmates">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Friend Input Form -->
      <div style="display: flex; gap: var(--space-3); max-width: 540px;">
        <div class="input-wrapper" style="flex: 1;">
          <input id="friend-uid-input" type="text" class="input font-mono" placeholder="e.g. ARISE-3B7L9K" style="text-transform: uppercase;" />
        </div>
        <button class="btn btn-secondary" onclick="pasteFriendUid()">
          Paste
        </button>
        <button class="btn btn-primary" onclick="lookupAndAddFriend()">
          Add Friend
        </button>
      </div>

      <!-- Simulated Lookup Preview Card -->
      <div id="friend-lookup-card-slot"></div>
    </div>

    <!-- 4-WAY FRIENDS COMPARISON CHART -->
    <div class="glass-card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <div>
          <h3 style="font-size: 16px; font-weight: 600;">Multi-Friend Metric Comparison</h3>
          <p class="text-small text-muted">Comparing verified XP, difficulty distribution, and topic mastery (Up to 4 students)</p>
        </div>
        <span class="badge" style="background: rgba(34,211,238,0.1); color: var(--accent-cyan); border: 1px solid rgba(34,211,238,0.3);">
          Live Comparison Matrix
        </span>
      </div>

      <!-- Grouped comparison bars for Verified XP -->
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
          Verified DSA XP Comparison
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${friends.map(f => {
            const maxXp = 4500;
            const pct = Math.min(100, Math.round((f.verifiedXp / maxXp) * 100));
            const isUser = f.uid === user.uid;
            return `
              <div class="grouped-bar-row">
                <div class="bar-student-name">
                  <span style="font-weight: ${isUser ? '700' : '500'}; color: ${isUser ? '#C4B5FD' : 'var(--text-primary)'};">
                    ${f.displayName} ${isUser ? '(You)' : ''}
                  </span>
                </div>
                <div class="bar-track-outer">
                  <div style="height: 100%; width: ${pct}%; background: ${isUser ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.2)'}; border-radius: 9999px;"></div>
                </div>
                <div style="width: 80px; text-align: right; font-family: var(--font-mono); font-weight: 600; color: ${isUser ? '#FFFFFF' : 'var(--text-secondary)'}; font-size: 12.5px;">
                  ${f.verifiedXp} XP
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Topic Mastery Comparison Preview -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-top: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--border-subtle);">
        ${[
          { topic: 'Arrays', you: 28, sneha: 34, aditya: 26 },
          { topic: 'Trees', you: 21, sneha: 24, aditya: 16 },
          { topic: 'Graphs', you: 16, sneha: 18, aditya: 14 },
          { topic: 'Dynamic Prog', you: 18, sneha: 22, aditya: 12 }
        ].map(item => `
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-3);">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-bottom: 6px;">
              ${item.topic}
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-family: var(--font-mono);">
              <div style="display: flex; justify-content: space-between; color: #C4B5FD;">
                <span>You:</span> <b>${item.you}</b>
              </div>
              <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
                <span>Sneha:</span> <b>${item.sneha}</b>
              </div>
              <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
                <span>Aditya:</span> <b>${item.aditya}</b>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Friends Leaderboard Table -->
    <div class="surface-opaque" style="padding: 0; overflow: hidden;">
      <table class="arise-table" aria-label="Friends Rank Table">
        <thead>
          <tr>
            <th style="width: 80px;">Friend Rank</th>
            <th>Student</th>
            <th>College</th>
            <th style="width: 140px;">Problems Solved</th>
            <th style="width: 100px;">DSA Privacy</th>
            <th style="width: 120px; text-align: right;">Verified XP</th>
            <th style="width: 100px; text-align: center;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${friends.map((f, idx) => `
            <tr class="${f.isYou ? 'user-row' : ''}">
              <td>
                <span class="font-mono" style="font-weight: 700; font-size: 13px; color: ${idx === 0 ? '#FBBF24' : 'var(--text-secondary)'};">
                  #${idx + 1}
                </span>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: ${f.isYou ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.08)'}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #FFFFFF;">
                    ${f.avatar}
                  </div>
                  <div>
                    <span style="font-weight: 600; color: var(--text-primary);">${f.displayName}</span>
                    <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);">${f.uid}</div>
                  </div>
                </div>
              </td>
              <td><span class="text-secondary" style="font-size: 13px;">${f.college}</span></td>
              <td>
                ${f.dsaVisibility === 'private' ? `
                  <span class="text-muted" style="font-size: 11.5px; font-style: italic;">
                    DSA stats hidden by user
                  </span>
                ` : `
                  <span class="font-mono" style="font-size: 12px; color: var(--text-secondary);">
                    <b>${f.solved.total}</b> (${f.solved.easy}E/${f.solved.medium}M/${f.solved.hard}H)
                  </span>
                `}
              </td>
              <td>
                <span class="badge" style="font-size: 10px; background: ${f.dsaVisibility === 'private' ? 'rgba(251,113,133,0.1)' : 'rgba(52,211,153,0.1)'}; color: ${f.dsaVisibility === 'private' ? 'var(--error)' : 'var(--success)'};">
                  ${f.dsaVisibility === 'private' ? 'Private' : 'Shared'}
                </span>
              </td>
              <td style="text-align: right;">
                <span class="font-mono" style="font-weight: 700; color: #FFFFFF; font-size: 14px;">
                  ${f.verifiedXp.toLocaleString()}
                </span>
              </td>
              <td style="text-align: center;">
                ${!f.isYou ? `
                  <button class="btn btn-ghost btn-sm" style="color: var(--error); font-size: 11px;" onclick="confirmRemoveFriend('${f.uid}', '${f.displayName}')">
                    Remove
                  </button>
                ` : '<span class="text-muted text-small">—</span>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div style="margin-top: var(--space-4); font-size: 11.5px; color: var(--text-muted); text-align: center;">
      🔒 Friend visibility and ranking criteria are strictly enforced by ARISE backend authorization rules.
    </div>
  `;
}

// Interactive Helper: Paste UID
function pasteFriendUid() {
  const input = document.getElementById('friend-uid-input');
  if (input) {
    input.value = "ARISE-3B7L9K";
    lookupAndAddFriend();
  }
}

// Interactive Helper: Lookup & Preview Card
function lookupAndAddFriend() {
  const input = document.getElementById('friend-uid-input');
  const val = (input?.value || '').trim().toUpperCase();
  const slot = document.getElementById('friend-lookup-card-slot');
  if (!slot) return;

  if (!val) {
    showToast('Please enter a friend’s ARISE ID (e.g. ARISE-3B7L9K)', 'error');
    return;
  }

  if (val === ARISE_DATA.currentUser.uid) {
    showToast('You cannot add yourself as a friend.', 'error');
    return;
  }

  // Check if already friends
  if (ARISE_DATA.friends.some(f => f.uid === val)) {
    showToast('You are already friends with this student.', 'info');
    return;
  }

  const found = ARISE_DATA.searchDirectory.find(s => s.uid === val);
  if (!found) {
    slot.innerHTML = `
      <div style="margin-top: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(251,113,133,0.08); border: 1px solid rgba(251,113,133,0.3); color: var(--error); font-size: 13px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        No student found with ID "${val}". Please check the spelling.
      </div>
    `;
    return;
  }

  slot.innerHTML = `
    <div class="friend-lookup-preview">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--accent-gradient); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #FFFFFF;">
          ${found.avatar}
        </div>
        <div>
          <div style="font-weight: 600; color: var(--text-primary); font-size: 14px;">${found.displayName}</div>
          <div style="font-size: 12px; color: var(--text-muted);">${found.college} • <span class="font-mono" style="color: #A78BFA;">${found.uid}</span></div>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="sendFriendRequestConfirm('${found.uid}', '${found.displayName}')">
        Send Friend Request
      </button>
    </div>
  `;
}

function sendFriendRequestConfirm(uid, name) {
  showToast(`Friend request sent to ${name} (${uid}). Awaiting mutual acceptance.`, 'success');
  const slot = document.getElementById('friend-lookup-card-slot');
  if (slot) {
    slot.innerHTML = `
      <div style="margin-top: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.3); color: var(--success); font-size: 13px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Request sent! Both students appear in the Friends leaderboard once accepted.
      </div>
    `;
  }
}

function confirmRemoveFriend(uid, name) {
  if (confirm(`Remove ${name} from your friends list? They will be removed from your friends leaderboard immediately.`)) {
    ARISE_DATA.friends = ARISE_DATA.friends.filter(f => f.uid !== uid);
    showToast(`Removed ${name} from friends.`, 'info');
    AriseState.notify();
  }
}
