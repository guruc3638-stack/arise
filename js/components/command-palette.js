/* ==========================================================================
   ARISE COMMAND PALETTE (Raycast-style ⌘K Instant Search)
   ========================================================================== */

function openCommandPalette() {
  let modal = document.getElementById('arise-command-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'arise-command-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-window" style="max-width: 600px; padding: 0; background: var(--surface-elevated); border: 1px solid var(--border-strong); box-shadow: 0 25px 60px rgba(0,0,0,0.85), var(--shadow-glow);">
      <div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--border-default); background: var(--surface-glass);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-primary);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input id="cmd-palette-input" type="text" placeholder="Type a command, problem, screen or topic..." style="flex: 1; background: transparent; border: none; outline: none; font-size: 15px; color: var(--text-primary); font-family: var(--font-ui);" autofocus />
        <span class="kbd-shortcut" style="font-size: 11px; padding: 2px 6px; background: var(--bg-tertiary); border: 1px solid var(--border-default); border-radius: 4px; color: var(--text-muted); font-family: var(--font-mono);">ESC</span>
      </div>
      <div id="cmd-palette-results" style="max-height: 380px; overflow-y: auto; padding: 8px 12px;"></div>
      <div style="padding: 10px 16px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); background: var(--bg-tertiary);">
        <span>Navigation: <b style="color: var(--text-secondary);">↑ ↓ to navigate</b></span>
        <span>Select: <b style="color: var(--text-secondary);">↵ to select</b></span>
        <span>Close: <b style="color: var(--text-secondary);">ESC</b></span>
      </div>
    </div>
  `;

  modal.classList.add('open');
  const input = document.getElementById('cmd-palette-input');
  input.focus();

  function renderResults(query = '') {
    const q = query.toLowerCase().trim();
    const resultsContainer = document.getElementById('cmd-palette-results');

    const commands = [
      // Screens
      { title: "Overview Dashboard", category: "Screen", icon: "layout", action: () => AriseState.setScreen('overview') },
      { title: "Global Leaderboard", category: "Screen", icon: "award", action: () => { AriseState.setScreen('leaderboard'); AriseState.leaderboardTab = 'global'; } },
      { title: "Friends Leaderboard & Comparison", category: "Screen", icon: "users", action: () => { AriseState.setScreen('leaderboard'); AriseState.leaderboardTab = 'friends'; } },
      { title: "DSA Topic Explorer", category: "Screen", icon: "grid", action: () => AriseState.setScreen('dsa-topics') },
      { title: "DSA Problem List", category: "Screen", icon: "list", action: () => AriseState.setScreen('dsa-problems') },
      { title: "DSA Coding Workspace", category: "Screen", icon: "code", action: () => AriseState.setScreen('dsa-workspace') },
      { title: "Self Study Library & PDF Reader", category: "Screen", icon: "book-open", action: () => AriseState.setScreen('self-study') },
      { title: "Learning Courses & Final Assessment", category: "Screen", icon: "cpu", action: () => AriseState.setScreen('learning-catalogue') },
      { title: "Profile & Achievements", category: "Screen", icon: "user", action: () => AriseState.setScreen('profile') },
      { title: "Design System & Figma Pages (01-12)", category: "Design System", icon: "figma", action: () => AriseState.setViewMode('design-system') },
      // Actions
      { title: "Copy My ARISE UID (ARISE-7K2M9Q)", category: "Action", icon: "copy", action: () => copyAriseUid('ARISE-7K2M9Q') },
      { title: "Simulate Problem Submission (Judge Run)", category: "Action", icon: "play", action: () => { AriseState.setScreen('dsa-workspace'); window.triggerJudgeSubmission?.('accepted'); } },
      { title: "Take Final Assessment Quiz (Course 201)", category: "Action", icon: "check-circle", action: () => AriseState.setScreen('final-assessment') },
      // Problems
      ...ARISE_DATA.problems.map(p => ({
        title: `${p.id}: ${p.title} (${p.difficulty})`,
        category: "Problem",
        icon: "code",
        action: () => { AriseState.activeProblem = p; AriseState.setScreen('dsa-workspace'); }
      })),
      // Topics
      ...ARISE_DATA.topics.slice(0, 8).map(t => ({
        title: `Topic: ${t.name} (${t.solved}/${t.total} solved)`,
        category: "DSA Topic",
        icon: "folder",
        action: () => AriseState.setScreen('dsa-topics')
      }))
    ];

    const filtered = commands.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--text-muted); font-size: 13px;">
          No matching commands or problems found for "${query}"
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map((item, idx) => `
      <div class="cmd-item" data-idx="${idx}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: var(--radius-md); cursor: pointer; transition: background 0.15s; margin-bottom: 2px;"
        onmouseover="this.style.background='var(--surface-glass-hover)'"
        onmouseout="this.style.background='transparent'">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="color: var(--accent-primary); display: flex;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span style="font-size: 13.5px; color: var(--text-primary); font-weight: 500;">${item.title}</span>
        </div>
        <span style="font-size: 11px; padding: 2px 8px; border-radius: var(--radius-xs); background: var(--bg-tertiary); border: 1px solid var(--border-subtle); color: var(--text-muted); font-family: var(--font-mono);">${item.category}</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.cmd-item').forEach((el, index) => {
      el.addEventListener('click', () => {
        closeCommandPalette();
        filtered[index].action();
      });
    });
  }

  renderResults('');

  input.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCommandPalette();
    }
  });
}

function closeCommandPalette() {
  const modal = document.getElementById('arise-command-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// Global keyboard shortcut: Cmd+K or Ctrl+K
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
});
