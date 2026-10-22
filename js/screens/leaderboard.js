/* ==========================================================================
   ARISE SCREEN G & H: LEADERBOARDS & FRIENDS COMPARISON
   Global Scopes (College, District, Maharashtra, India) + Mutual Friends System
   Authoritative Verified DSA XP | Deterministic Tie-Breaking | Clean Accounts
   "Learn. Solve. Rise."
   ========================================================================== */

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

function renderLeaderboardScreen() {
  const isFriendsTab = AriseState.leaderboardTab === 'friends';
  const scope = AriseState.leaderboardScope || 'maharashtra';
  const user = ARISE_DATA.currentUser;

  // Trigger data fetching if authenticated and data not yet present
  if (typeof AriseState !== 'undefined' && AriseState.authToken) {
    if (!isFriendsTab) {
      if (!AriseState.leaderboardData || AriseState.leaderboardData.scope !== scope) {
        if (!AriseState.leaderboardLoading) {
          setTimeout(() => { AriseState.fetchLeaderboard(scope); }, 0);
        }
      }
    } else {
      if (!AriseState.friendsLeaderboardData && !AriseState._fetchingFriends) {
        AriseState._fetchingFriends = true;
        setTimeout(async () => {
          await Promise.all([
            AriseState.fetchFriendsLeaderboard(),
            AriseState.fetchFriends(),
            AriseState.fetchFriendRequests()
          ]);
          AriseState._fetchingFriends = false;
        }, 0);
      }
    }
  }

  // Determine students list
  let students = [];
  if (AriseState.leaderboardData && AriseState.leaderboardData.scope === scope && AriseState.leaderboardData.entries && AriseState.leaderboardData.entries.length > 0) {
    students = (AriseState.leaderboardData.entries || []).map(e => ({
      rank: e.rank,
      name: e.display_name,
      uid: e.uid,
      college: e.college_name || "Institution not set",
      district: e.district_name || "",
      state: e.state_code || "",
      xp: e.verified_xp,
      mv: e.rank_movement || "—",
      solved: e.solved_count !== null && e.solved_count !== undefined ? e.solved_count : "—",
      isCurrentUser: e.is_current_user || (e.uid === user.uid),
      avatar: (e.display_name || "Student").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    }));
  } else if (ARISE_DATA.leaderboards && ARISE_DATA.leaderboards[scope] && ARISE_DATA.leaderboards[scope].length > 0) {
    students = ARISE_DATA.leaderboards[scope];
  } else if (ARISE_DATA.leaderboards && ARISE_DATA.leaderboards.maharashtra) {
    students = ARISE_DATA.leaderboards.maharashtra;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Header with Tabs: Global Leaderboard vs Friends -->
      <div class="leaderboard-header-bar">
        <div>
          <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Leaderboard & Rankings</h1>
          <p class="text-small text-muted" style="margin-top: 4px;">
            Rankings are determined strictly by judge-verified DSA XP from the append-only ledger. Study time and course completions do not affect competition rank.
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
              Friends Network
            </span>
          </button>
        </div>
      </div>

      ${!isFriendsTab ? renderGlobalLeaderboard(scope, students, user) : renderFriendsLeaderboard()}
    </div>
  `;
}

// --------------------------------------------------------------------------
// VIEW 1: GLOBAL LEADERBOARD (4 Scopes: College, District, State, India)
// --------------------------------------------------------------------------
function renderGlobalLeaderboard(scope, students, user) {
  const podiumTop3 = students.slice(0, 3);
  const collegeLabel = user.college ? `College (${user.college.split(' ')[0]})` : 'College';
  const districtLabel = user.district ? `District (${user.district})` : 'District';

  // Find user's current rank
  let userRankDisplay = "Unranked";
  if (user.verifiedXp > 0) {
    const found = students.find(s => s.isCurrentUser || s.uid === user.uid);
    if (found) userRankDisplay = `#${found.rank}`;
    else if (user.rank && user.rank[scope]) userRankDisplay = `#${user.rank[scope]}`;
  }

  return `
    <!-- Scope Selector: College, District, Maharashtra, India -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
      <div class="segmented-control">
        ${[
          { id: 'college', label: collegeLabel },
          { id: 'district', label: districtLabel },
          { id: 'maharashtra', label: 'Maharashtra' },
          { id: 'india', label: 'India' }
        ].map(s => `
          <button class="segment-btn ${s.id === scope ? 'active' : ''}" 
            onclick="switchLeaderboardScope('${s.id}')">
            ${s.label}
          </button>
        `).join('')}
      </div>

      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <div class="search-input-box" style="width: 240px; padding: 6px 10px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Filter student or college..." style="background: transparent; border: none; outline: none; font-size: 12px; color: var(--text-primary); width: 100%;" oninput="filterLeaderboardRows(this.value)" />
        </div>
      </div>
    </div>

    <!-- Top 3 Podium Strip -->
    ${podiumTop3.length > 0 ? `
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
                ${escapeHtml(st.avatar)}
              </div>
              <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">${escapeHtml(st.name)}</div>
              <div class="text-small text-muted" style="max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${escapeHtml(st.college)}
              </div>
              <div style="margin-top: 6px; font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: #FFFFFF;">
                ${Number(st.xp || 0).toLocaleString()} <span style="font-size: 12px; color: #A78BFA;">XP</span>
              </div>
              <div style="font-size: 11px; color: var(--text-muted);">
                ${st.solved === '—' ? 'Private progress' : `${st.solved} problems verified`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    ` : `
      <div style="padding: 32px; text-align: center; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); color: var(--text-muted); font-size: 13.5px;">
        No ranked students found in this scope yet. Solve your first DSA problem to claim the #1 spot!
      </div>
    `}

    <!-- Leaderboard Data Table -->
    <div class="surface-opaque" style="padding: 0; overflow: hidden;">
      <table class="arise-table" id="leaderboard-table" aria-label="Global Verified Leaderboard Table">
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
          ${students.length > 0 ? students.map(st => `
            <tr class="${st.isCurrentUser ? 'user-row' : ''}">
              <td>
                <span class="font-mono" style="font-weight: 700; font-size: 13px; color: ${st.rank <= 3 ? '#FBBF24' : 'var(--text-secondary)'};">
                  #${st.rank}
                </span>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: ${st.isCurrentUser ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.08)'}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #FFFFFF;">
                    ${escapeHtml(st.avatar)}
                  </div>
                  <div>
                    <span style="font-weight: 600; color: var(--text-primary);">${escapeHtml(st.name)}</span>
                    ${st.isCurrentUser ? `<span class="badge" style="margin-left: 6px; background: rgba(139,92,246,0.3); color: #DDD6FE; font-size: 9px;">YOU</span>` : ''}
                    ${st.uid ? `<div style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">${escapeHtml(st.uid)}</div>` : ''}
                  </div>
                </div>
              </td>
              <td><span class="text-secondary" style="font-size: 13px;">${escapeHtml(st.college)}</span></td>
              <td>
                <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-family: var(--font-mono); font-weight: 600; color: ${String(st.mv).startsWith('+') ? 'var(--success)' : String(st.mv).startsWith('-') ? 'var(--error)' : 'var(--text-muted)'};">
                  ${String(st.mv).startsWith('+') ? '▲' : String(st.mv).startsWith('-') ? '▼' : '—'} ${st.mv === '—' ? 'No change' : String(st.mv).replace('+', '').replace('-', '') + ' spots'}
                </span>
              </td>
              <td>
                <span style="font-family: var(--font-mono); font-size: 12.5px;">
                  ${st.solved === '—' ? '<span class="text-muted" style="font-style: italic;">Private</span>' : `${st.solved} verified`}
                </span>
              </td>
              <td style="text-align: right;">
                <span class="font-mono" style="font-weight: 700; color: #FFFFFF; font-size: 14px;">
                  ${Number(st.xp || 0).toLocaleString()}
                </span>
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="6" style="text-align: center; padding: 32px; color: var(--text-muted); font-size: 13px;">
                No ranked records to display.
              </td>
            </tr>
          `}
        </tbody>
      </table>
    </div>

    <!-- Sticky Current User Position Reminder -->
    <div style="padding: 12px 16px; border-radius: var(--radius-md); background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.3); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="badge" style="background: rgba(139,92,246,0.3); color: #C4B5FD;">Your Position</span>
        <span style="font-size: 13px; color: var(--text-primary);">
          ${user.verifiedXp === 0 ? `
            You are currently <b>Unranked</b> in ${scope} with <b>0 XP</b>. Solve your first problem to enter the rankings!
          ` : `
            You are currently <b>${userRankDisplay}</b> in ${scope} with <b>${user.verifiedXp} verified XP</b>
          `}
        </span>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="AriseState.setScreen('dsa-problems')">
        ${user.verifiedXp === 0 ? 'Start Solving Problems →' : 'Solve Next Problem →'}
      </button>
    </div>
  `;
}

// --------------------------------------------------------------------------
// VIEW 2: FRIENDS LEADERBOARD & COMPARISON (Mutual Consent Enforced)
// --------------------------------------------------------------------------
function renderFriendsLeaderboard() {
  const user = ARISE_DATA.currentUser;
  
  // Real friends data from AriseState if available
  let friends = [];
  if (AriseState.friendsLeaderboardData && Array.isArray(AriseState.friendsLeaderboardData.entries)) {
    friends = AriseState.friendsLeaderboardData.entries.map((e, idx) => ({
      uid: e.uid,
      displayName: e.display_name,
      college: e.college_name || "Institution not set",
      verifiedXp: e.verified_xp,
      friendRank: e.rank || (idx + 1),
      solved: {
        total: e.solved_count !== null && e.solved_count !== undefined ? e.solved_count : 0,
        easy: 0,
        medium: 0,
        hard: 0
      },
      avatar: (e.display_name || "Student").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      dsaVisibility: e.solved_count === null ? 'private' : 'public',
      isYou: e.is_current_user || (e.uid === user.uid)
    }));
  } else if (Array.isArray(AriseState.friendsList) && AriseState.friendsList.length > 0) {
    friends = [
      {
        uid: user.uid,
        displayName: `${user.displayName} (You)`,
        college: user.college,
        verifiedXp: user.verifiedXp,
        friendRank: 1,
        solved: { total: user.solvedStats.total, easy: 0, medium: 0, hard: 0 },
        avatar: user.avatar,
        dsaVisibility: 'public',
        isYou: true
      },
      ...AriseState.friendsList.map((f, idx) => ({
        uid: f.uid,
        displayName: f.display_name,
        college: f.college_name || "Institution not set",
        verifiedXp: f.verified_xp || 0,
        friendRank: idx + 2,
        solved: { total: f.solved_count || 0, easy: 0, medium: 0, hard: 0 },
        avatar: (f.display_name || "Student").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
        dsaVisibility: f.show_dsa_progress ? 'public' : 'private',
        isYou: false
      }))
    ];
    friends.sort((a, b) => b.verifiedXp - a.verifiedXp);
  } else if (user.verifiedXp === 0 && (!AriseState.friendsList || AriseState.friendsList.length === 0)) {
    // Clean account with zero friends
    friends = [];
  } else if (Array.isArray(ARISE_DATA.friends)) {
    friends = ARISE_DATA.friends;
  }

  const incomingRequests = (AriseState.friendRequests && AriseState.friendRequests.incoming) || [];
  const outgoingRequests = (AriseState.friendRequests && AriseState.friendRequests.outgoing) || [];

  return `
    <!-- ADD FRIEND BOX WITH UID INPUT & LOOKUP CARD -->
    <div class="add-friend-box">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-4); margin-bottom: var(--space-3); flex-wrap: wrap;">
        <div>
          <h3 style="font-size: 15px; font-weight: 600;">Add Friend by ARISE ID</h3>
          <p class="text-small text-muted">
            Connect using unique ARISE UIDs. Mutual consent is strictly enforced — no unsolicited chats or spam.
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="text-small text-muted">Your ID:</span>
          <div class="uid-chip" style="padding: 2px 8px; font-size: 11px;">
            <span class="uid-val">${escapeHtml(user.uid)}</span>
            <button class="btn-copy" onclick="copyAriseUid('${user.uid}')" title="Copy your UID to share with classmates">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Friend Input Form -->
      <div style="display: flex; gap: var(--space-3); max-width: 540px;">
        <div class="input-wrapper" style="flex: 1;">
          <input id="friend-uid-input" type="text" class="input font-mono" placeholder="e.g. AR-A1B2C3D4" style="text-transform: uppercase;" />
        </div>
        <button class="btn btn-secondary" onclick="pasteFriendUid()">
          Paste
        </button>
        <button class="btn btn-primary" onclick="lookupAndAddFriend()">
          Send Friend Request
        </button>
      </div>

      <!-- Real Feedback Slot -->
      <div id="friend-lookup-card-slot"></div>
    </div>

    <!-- PENDING FRIEND REQUESTS SECTION (IF ANY) -->
    ${(incomingRequests.length > 0 || outgoingRequests.length > 0) ? `
      <div class="glass-card" style="padding: var(--space-4); margin-bottom: var(--space-4); border: 1px solid rgba(139,92,246,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 style="font-size: 13.5px; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            Friend Request Activity
          </h4>
          <span class="badge" style="background: rgba(139,92,246,0.2); color: #C4B5FD;">
            ${incomingRequests.length} incoming • ${outgoingRequests.length} pending
          </span>
        </div>

        ${incomingRequests.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
            <div style="font-size: 11.5px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Incoming Requests (Require Your Consent)</div>
            ${incomingRequests.map(req => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 8px;">
                <div>
                  <span style="font-weight: 600; color: var(--text-primary);">${escapeHtml(req.requester_name)}</span>
                  <span class="font-mono" style="font-size: 11px; color: #A78BFA; margin-left: 6px;">${escapeHtml(req.requester_uid)}</span>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-primary btn-sm" onclick="acceptFriendRequestAction('${req.id}', '${escapeHtml(req.requester_name)}')">Accept</button>
                  <button class="btn btn-secondary btn-sm" onclick="declineFriendRequestAction('${req.id}', '${escapeHtml(req.requester_name)}')">Decline</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${outgoingRequests.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px;">
            <div style="font-size: 11.5px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Outgoing Sent Requests</div>
            ${outgoingRequests.map(req => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 6px 12px; border-radius: var(--radius-md); font-size: 12.5px;">
                <span class="text-secondary">Sent to <b>${escapeHtml(req.recipient_name)}</b> (${escapeHtml(req.recipient_uid)})</span>
                <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-muted); font-size: 10px;">Awaiting acceptance</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    ` : ''}

    <!-- 4-WAY FRIENDS COMPARISON CHART -->
    ${friends.length > 0 ? `
      <div class="glass-card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 600;">Multi-Friend Metric Comparison</h3>
            <p class="text-small text-muted">Comparing verified XP strictly evaluated by the authoritative judge</p>
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
              const maxXp = Math.max(100, ...friends.map(item => item.verifiedXp || 0));
              const pct = Math.min(100, Math.round(((f.verifiedXp || 0) / maxXp) * 100));
              const isUser = f.isYou || f.uid === user.uid;
              return `
                <div class="grouped-bar-row">
                  <div class="bar-student-name">
                    <span style="font-weight: ${isUser ? '700' : '500'}; color: ${isUser ? '#C4B5FD' : 'var(--text-primary)'};">
                      ${escapeHtml(f.displayName)} ${isUser ? '(You)' : ''}
                    </span>
                  </div>
                  <div class="bar-track-outer">
                    <div style="height: 100%; width: ${pct}%; background: ${isUser ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.2)'}; border-radius: 9999px;"></div>
                  </div>
                  <div style="width: 80px; text-align: right; font-family: var(--font-mono); font-weight: 600; color: ${isUser ? '#FFFFFF' : 'var(--text-secondary)'}; font-size: 12.5px;">
                    ${Number(f.verifiedXp || 0).toLocaleString()} XP
                  </div>
                </div>
              `;
            }).join('')}
          </div>
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
                      ${escapeHtml(f.avatar)}
                    </div>
                    <div>
                      <span style="font-weight: 600; color: var(--text-primary);">${escapeHtml(f.displayName)}</span>
                      <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);">${escapeHtml(f.uid)}</div>
                    </div>
                  </div>
                </td>
                <td><span class="text-secondary" style="font-size: 13px;">${escapeHtml(f.college)}</span></td>
                <td>
                  ${f.dsaVisibility === 'private' ? `
                    <span class="text-muted" style="font-size: 11.5px; font-style: italic;">
                      Private
                    </span>
                  ` : `
                    <span class="font-mono" style="font-size: 12px; color: var(--text-secondary);">
                      <b>${f.solved.total}</b> verified
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
                    ${Number(f.verifiedXp || 0).toLocaleString()}
                  </span>
                </td>
                <td style="text-align: center;">
                  ${!f.isYou ? `
                    <button class="btn btn-ghost btn-sm" style="color: var(--error); font-size: 11px;" onclick="confirmRemoveFriend('${f.uid}', '${escapeHtml(f.displayName)}')">
                      Remove
                    </button>
                  ` : '<span class="text-muted text-small">—</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : `
      <div style="padding: 48px; text-align: center; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); margin-top: var(--space-4);">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-muted); margin-bottom: 12px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">No Friends Connected Yet</h4>
        <p class="text-small text-muted" style="max-width: 440px; margin: 0 auto 16px auto;">
          Connect with your classmates to compare DSA progress, solved counts, and verified XP side-by-side. Enter your classmate's ARISE ID above or share your ID (<span class="font-mono" style="color: #A78BFA;">${escapeHtml(user.uid)}</span>).
        </p>
      </div>
    `}

    <div style="margin-top: var(--space-4); font-size: 11.5px; color: var(--text-muted); text-align: center;">
      🔒 Friend relationships require mutual consent. Non-friends are never revealed in this comparison view.
    </div>
  `;
}

// --------------------------------------------------------------------------
// INTERACTIVE ACTION HANDLERS
// --------------------------------------------------------------------------
function switchLeaderboardScope(newScope) {
  AriseState.leaderboardScope = newScope;
  if (typeof AriseState !== 'undefined' && typeof AriseState.fetchLeaderboard === 'function') {
    AriseState.fetchLeaderboard(newScope);
  } else {
    AriseState.notify();
  }
}

function filterLeaderboardRows(query) {
  const q = (query || '').toLowerCase().trim();
  const table = document.getElementById('leaderboard-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(r => {
    const text = r.innerText.toLowerCase();
    r.style.display = text.includes(q) ? '' : 'none';
  });
}

function pasteFriendUid() {
  const input = document.getElementById('friend-uid-input');
  if (input) {
    if (navigator && navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(text => {
        input.value = text.trim().toUpperCase();
      }).catch(() => {
        input.value = "AR-COEP01";
      });
    } else {
      input.value = "AR-COEP01";
    }
  }
}

async function lookupAndAddFriend() {
  const input = document.getElementById('friend-uid-input');
  const val = (input?.value || '').trim().toUpperCase();
  const slot = document.getElementById('friend-lookup-card-slot');
  if (!slot) return;

  if (!val) {
    showToast("Please enter a friend's ARISE ID (e.g. AR-XXXXXXXX)", 'error');
    return;
  }

  if (val === ARISE_DATA.currentUser.uid) {
    showToast('You cannot send a friend request to yourself.', 'error');
    return;
  }

  try {
    const res = await AriseState.sendFriendRequest(val);
    slot.innerHTML = `
      <div style="margin-top: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.3); color: var(--success); font-size: 13px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Friend request sent to ${escapeHtml(res.recipient_name || val)} (${escapeHtml(res.recipient_uid || val)})! Awaiting mutual acceptance.
      </div>
    `;
    showToast(`Friend request sent to ${res.recipient_name || val}!`, 'success');
    if (input) input.value = '';
    AriseState.notify();
  } catch (err) {
    const safeMsg = err.message || 'Could not send friend request.';
    slot.innerHTML = `
      <div style="margin-top: 12px; padding: 12px; border-radius: var(--radius-md); background: rgba(251,113,133,0.08); border: 1px solid rgba(251,113,133,0.3); color: var(--error); font-size: 13px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        ${escapeHtml(safeMsg)}
      </div>
    `;
    showToast(safeMsg, 'error');
  }
}

async function acceptFriendRequestAction(requestId, requesterName) {
  try {
    await AriseState.acceptFriendRequest(requestId, null, requesterName);
    showToast(`Accepted friend request from ${requesterName}!`, 'success');
    AriseState.notify();
  } catch (err) {
    showToast(err.message || 'Could not accept friend request.', 'error');
  }
}

async function declineFriendRequestAction(requestId, requesterName) {
  try {
    await AriseState.declineFriendRequest(requestId);
    showToast(`Declined friend request from ${requesterName}.`, 'info');
    AriseState.notify();
  } catch (err) {
    showToast(err.message || 'Could not decline friend request.', 'error');
  }
}

async function confirmRemoveFriend(uid, name) {
  if (confirm(`Remove ${name} from your friends list? They will be removed from your friends comparison leaderboard immediately.`)) {
    try {
      if (typeof AriseState !== 'undefined' && AriseState.authToken) {
        await AriseState.removeFriend(uid);
      } else {
        ARISE_DATA.friends = ARISE_DATA.friends.filter(f => f.uid !== uid);
      }
      showToast(`Removed ${name} from friends.`, 'info');
      AriseState.notify();
    } catch (err) {
      showToast(err.message || 'Could not remove friend.', 'error');
    }
  }
}

// Window exposes for DOM events
window.renderLeaderboardScreen = renderLeaderboardScreen;
window.switchLeaderboardScope = switchLeaderboardScope;
window.filterLeaderboardRows = filterLeaderboardRows;
window.pasteFriendUid = pasteFriendUid;
window.lookupAndAddFriend = lookupAndAddFriend;
window.acceptFriendRequestAction = acceptFriendRequestAction;
window.declineFriendRequestAction = declineFriendRequestAction;
window.confirmRemoveFriend = confirmRemoveFriend;
