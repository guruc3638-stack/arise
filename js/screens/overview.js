/* ==========================================================================
   ARISE SCREEN F: OVERVIEW DASHBOARD (FLAGSHIP)
   Art-directed Dark Glassmorphism, Tabular Numerals, 12-Column Grid
   ========================================================================== */

function renderOverviewDashboard() {
  const user = ARISE_DATA.currentUser;
  const currentScope = AriseState.leaderboardScope || 'maharashtra';
  const currentRank = user.rank[currentScope] || user.rank.maharashtra;

  // Sorted topic mastery by solved percentage
  const topTopics = [...ARISE_DATA.topics]
    .sort((a, b) => (b.solved / b.total) - (a.solved / a.total))
    .slice(0, 5);

  const recentSolves = [
    { id: "ARISE-P101", title: "Pairwise Sensor Target Calibration", difficulty: "Easy", topic: "Arrays", time: "Today, 14:20", xp: 40 },
    { id: "ARISE-P102", title: "Valid Packet Frame Delimiters", difficulty: "Easy", topic: "Stacks", time: "Yesterday", xp: 40 },
    { id: "ARISE-P201", title: "Tri-Sensor Equilibrium Calibration", difficulty: "Medium", topic: "Arrays", time: "2 days ago", xp: 80 },
    { id: "ARISE-P203", title: "Hydro-Reservoir Capacity Optimizer", difficulty: "Medium", topic: "Arrays", time: "4 days ago", xp: 85 }
  ];

  const earnedBadges = ARISE_DATA.badges.filter(b => b.status === 'earned').slice(0, 3);
  const activeScopeLeaderboard = ARISE_DATA.leaderboards[currentScope] || ARISE_DATA.leaderboards.maharashtra;

  return `
    <div class="overview-dashboard">
      <!-- 1. GREETING ROW -->
      <section class="greeting-row" aria-label="Welcome and Quick Actions">
        <div class="greeting-info">
          <div>
            <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Welcome back, ${user.displayName}</h1>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
              <span class="text-small text-muted">${user.college}</span>
              <span style="color: var(--border-strong);">•</span>
              <!-- UID Chip: System generated, read-only in mono with copy action -->
              <div class="uid-chip" title="System-generated unique ARISE ID">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">UID</span>
                <span class="uid-val">${user.uid}</span>
                <button class="btn-copy" onclick="copyAriseUid('${user.uid}')" aria-label="Copy ARISE UID">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="greeting-actions">
          <button class="btn btn-primary" onclick="AriseState.setScreen('dsa-problems')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Practice DSA
          </button>
          <button class="btn btn-secondary" onclick="AriseState.setScreen('learning-catalogue')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Continue Learning
          </button>
          <button class="btn btn-ghost" onclick="AriseState.setScreen('self-study')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Self Study
          </button>
        </div>
      </section>

      <!-- 2. HERO ROW: XP & RANK (Cols 1-8) + KEY METRICS (Cols 9-12) -->
      <section class="grid-12" aria-label="Primary Metrics and Verified XP">
        <div class="col-8">
          <div class="hero-xp-banner">
            <div class="hero-xp-left">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #C4B5FD;">Verified DSA Experience</span>
                  <span class="hero-judge-verified-badge" title="XP is awarded strictly when confirmed by the judge engine">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Verified by judge
                  </span>
                </div>
                <!-- Dominant Tabular XP -->
                <div class="hero-xp-number tabular-nums">
                  ${user.verifiedXp.toLocaleString()} <span style="font-size: 20px; font-weight: 600; color: #A78BFA;">XP</span>
                </div>
              </div>

              <!-- Scope selector and rank position -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <div style="font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                  <span>Rank in <b style="color: var(--text-primary); text-transform: capitalize;">${currentScope}</b>:</span>
                  <span style="font-size: 18px; font-weight: 700; color: #FFFFFF; font-family: var(--font-mono);">#${currentRank}</span>
                  <span style="font-size: 12px; font-weight: 600; color: var(--success); display: inline-flex; align-items: center; gap: 2px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    ${user.rankMovement}
                  </span>
                </div>

                <div class="hero-scope-pills">
                  ${['college', 'district', 'maharashtra', 'india'].map(s => `
                    <button class="hero-scope-pill ${s === currentScope ? 'active' : ''}" 
                      onclick="AriseState.leaderboardScope = '${s}'; AriseState.notify();">
                      ${s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Honest history sparkline / status -->
            <div class="hero-xp-right">
              <div class="sparkline-box">
                <svg width="110" height="32" viewBox="0 0 110 32" fill="none">
                  <path d="M2 28 L24 22 L46 25 L68 14 L90 17 L108 4" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="108" cy="4" r="3" fill="#8B5CF6"/>
                </svg>
                <div style="display: flex; flex-direction: column; font-size: 10px; line-height: 1.3;">
                  <span style="color: var(--text-secondary); font-weight: 600;">Last 7 Days</span>
                  <span style="color: var(--success);">+180 XP Verified</span>
                </div>
              </div>
              <span style="font-size: 10.5px; color: var(--text-muted);">Self-study or course time never awards DSA XP</span>
            </div>
          </div>
        </div>

        <!-- Metrics Grid (Cols 9-12) -->
        <div class="col-4" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div class="metric-card">
            <span class="metric-label">Problems Solved</span>
            <span class="metric-value">${user.solvedStats.total}</span>
            <span class="metric-meta text-muted" style="font-size: 11px;">
              <span style="color: var(--diff-easy); font-weight: 600;">${user.solvedStats.easy}E</span> • 
              <span style="color: var(--diff-medium); font-weight: 600;">${user.solvedStats.medium}M</span> • 
              <span style="color: var(--diff-hard); font-weight: 600;">${user.solvedStats.hard}H</span>
            </span>
          </div>

          <div class="metric-card">
            <span class="metric-label">Courses Completed</span>
            <span class="metric-value">${user.coursesCompleted}</span>
            <span class="metric-meta text-muted" style="font-size: 11px;">Final score ≥ 80%</span>
          </div>

          <div class="metric-card">
            <span class="metric-label">Overall Progress</span>
            <span class="metric-value" style="color: var(--accent-cyan);">68%</span>
            <div class="progress-bar-track" style="margin-top: 4px;">
              <div class="progress-bar-fill progress-bar-cyan" style="width: 68%;"></div>
            </div>
          </div>

          <div class="metric-card">
            <span class="metric-label">Acceptance Rate</span>
            <span class="metric-value">${user.acceptanceRate}</span>
            <span class="metric-meta text-muted" style="font-size: 11px;">Judge confirmed</span>
          </div>
        </div>
      </section>

      <!-- 3. TOPIC MASTERY (Cols 1-7) & CONTINUE LEARNING (Cols 8-12) -->
      <section class="grid-12" aria-label="Topic Progress and Active Course">
        <div class="col-7">
          <div class="glass-card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <div>
                  <h3 style="font-size: 16px; font-weight: 600;">Topic Mastery</h3>
                  <p class="text-small text-muted">Cyan progress indicates verified judge solves per domain</p>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('dsa-topics')">
                  View all 17 topics →
                </button>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                ${topTopics.map(t => {
                  const pct = Math.round((t.solved / t.total) * 100);
                  return `
                    <div class="topic-progress-row">
                      <div class="topic-label-solved">
                        <span style="font-weight: 500; color: var(--text-primary); font-size: 13px;">${t.name}</span>
                      </div>
                      <div style="flex: 1; margin: 0 var(--space-3);">
                        <div class="progress-bar-track">
                          <div class="progress-bar-fill progress-bar-cyan" style="width: ${pct}%;"></div>
                        </div>
                      </div>
                      <div style="min-width: 65px; text-align: right; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">
                        <span style="color: var(--text-primary); font-weight: 600;">${t.solved}</span>/${t.total}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--text-muted);">
              <span>Next recommended: <b style="color: #A78BFA;">Dynamic Programming</b></span>
              <span style="font-family: var(--font-mono);">18/48 solved</span>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="glass-card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
                <span class="badge" style="background: rgba(99,102,241,0.15); color: #C4B5FD; border: 1px solid rgba(99,102,241,0.3);">
                  In Progress Course
                </span>
                <span class="text-small text-muted">Pass cutoff: 80%</span>
              </div>

              <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Advanced Graph Theory & Network Traversal
              </h3>
              <p class="text-small text-secondary" style="margin-bottom: var(--space-4); line-height: 1.5;">
                Current Lesson: <b>BFS Level-Order Discovery & Shortest Unweighted Paths</b>
              </p>

              <div style="margin-bottom: var(--space-4);">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
                  <span class="text-muted">Curriculum Progress</span>
                  <span style="font-family: var(--font-mono); font-weight: 600; color: var(--text-primary);">16 / 16 Lessons</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 100%;"></div>
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
              <div style="font-size: 11px; color: var(--warning); display: flex; align-items: center; gap: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Final assessment pending
              </div>
              <button class="btn btn-primary btn-sm" onclick="AriseState.setScreen('final-assessment')">
                Take Assessment (≥80%) →
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. RECENT SOLVES & LEADERBOARD PREVIEW & RECENT BADGES -->
      <section class="grid-12" aria-label="Recent Activity and Achievements">
        <!-- Recently solved problems (Cols 1-8) -->
        <div class="col-8">
          <div class="surface-opaque" style="padding: var(--space-5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: 15px; font-weight: 600;">Recently Solved Problems</h3>
                <span class="badge" style="background: var(--success-bg); color: var(--success); border: 1px solid var(--success-border);">Judge Confirmed</span>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('dsa-problems')">Browse All Solves →</button>
            </div>

            <table class="arise-table" aria-label="Recently verified problems table">
              <thead>
                <tr>
                  <th style="width: 110px;">Problem ID</th>
                  <th>Title</th>
                  <th style="width: 100px;">Difficulty</th>
                  <th style="width: 110px;">Topic</th>
                  <th style="width: 110px;">Solved Time</th>
                  <th style="width: 80px; text-align: right;">XP</th>
                </tr>
              </thead>
              <tbody>
                ${recentSolves.map(p => `
                  <tr style="cursor: pointer;" onclick="openProblemWorkspace('${p.id}')">
                    <td><span class="font-mono" style="font-size: 12px; color: #A78BFA; font-weight: 600;">${p.id}</span></td>
                    <td style="font-weight: 500; color: var(--text-primary);">${p.title}</td>
                    <td>
                      <span class="badge badge-${p.difficulty.toLowerCase()}">
                        ${p.difficulty === 'Easy' ? '●' : p.difficulty === 'Medium' ? '■' : '▲'} ${p.difficulty}
                      </span>
                    </td>
                    <td><span class="topic-tag">${p.topic}</span></td>
                    <td style="font-size: 12px; color: var(--text-muted);">${p.time}</td>
                    <td style="text-align: right; font-family: var(--font-mono); font-weight: 600; color: var(--success);">+${p.xp}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Leaderboard Preview & Recent Achievements (Cols 9-12) -->
        <div class="col-4" style="display: flex; flex-direction: column; gap: var(--space-5);">
          <!-- Leaderboard preview -->
          <div class="glass-card" style="padding: var(--space-5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
              <h3 style="font-size: 14px; font-weight: 600;">State Top 3 & You</h3>
              <button class="btn btn-ghost btn-sm" style="padding: 2px 6px; font-size: 11px;" onclick="AriseState.setScreen('leaderboard')">
                Open Leaderboard →
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 4px;">
              ${activeScopeLeaderboard.slice(0, 3).map(st => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-radius: var(--radius-sm); background: rgba(255,255,255,0.02); font-size: 12.5px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-family: var(--font-mono); font-weight: 700; width: 16px; color: ${st.rank === 1 ? '#FBBF24' : st.rank === 2 ? '#E2E8F0' : '#D97706'};">#${st.rank}</span>
                    <span style="color: var(--text-primary); font-weight: 500;">${st.name}</span>
                  </div>
                  <span style="font-family: var(--font-mono); color: var(--text-secondary); font-size: 12px;">${st.xp} XP</span>
                </div>
              `).join('')}

              <!-- User Highlighted Row -->
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: var(--radius-sm); background: rgba(139,92,246,0.18); border: 1px solid rgba(139,92,246,0.4); margin-top: 4px; font-size: 12.5px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-family: var(--font-mono); font-weight: 700; width: 16px; color: #C4B5FD;">#${currentRank}</span>
                  <span style="color: #FFFFFF; font-weight: 600;">You</span>
                  <span class="badge" style="font-size: 9px; padding: 1px 4px; background: rgba(139,92,246,0.3); color: #DDD6FE;">COEP</span>
                </div>
                <span style="font-family: var(--font-mono); color: #FFFFFF; font-weight: 700; font-size: 12px;">${user.verifiedXp} XP</span>
              </div>
            </div>
          </div>

          <!-- Recent Badges -->
          <div class="glass-card" style="padding: var(--space-5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
              <h3 style="font-size: 14px; font-weight: 600;">Recent Achievements</h3>
              <button class="btn btn-ghost btn-sm" style="padding: 2px 6px; font-size: 11px;" onclick="AriseState.setScreen('badges')">
                View All (${ARISE_DATA.badges.length}) →
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${earnedBadges.map(b => `
                <div style="display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: var(--radius-sm); background: rgba(255,255,255,0.02);">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); display: flex; align-items: center; justify-content: center; color: #A78BFA; flex-shrink: 0;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-size: 12.5px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${b.name}</span>
                    <span style="font-size: 10.5px; color: var(--text-muted);">Unlocked ${b.unlockedDate}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
