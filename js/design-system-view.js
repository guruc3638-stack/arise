/* ==========================================================================
   ARISE DESIGN SYSTEM VIEWER — FIGMA PAGES 01 TO 12
   Tokens, Component Matrix, Developer Handoff, Contrast Audit
   ========================================================================== */

function renderDesignSystemView() {
  const activePage = AriseState.dsActivePage || '01';

  const pages = [
    { id: '01', title: '01 — Cover & Product Vision' },
    { id: '02', title: '02 — Foundations' },
    { id: '03', title: '03 — Components' },
    { id: '04', title: '04 — Marketing & Authentication' },
    { id: '05', title: '05 — Overview Dashboard' },
    { id: '06', title: '06 — Leaderboard & Friends' },
    { id: '07', title: '07 — DSA Experience' },
    { id: '08', title: '08 — Self Study' },
    { id: '09', title: '09 — Learning' },
    { id: '10', title: '10 — Profile & Achievements' },
    { id: '11', title: '11 — Settings & States' },
    { id: '12', title: '12 — Responsive Mobile & Handoff' }
  ];

  return `
    <div class="ds-viewer-layout">
      <!-- Design System Navigation Sidebar -->
      <aside class="ds-sidebar">
        <div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #A78BFA; margin-bottom: 4px;">
            FIGMA ARCHITECTURE
          </div>
          <h2 style="font-size: 16px; font-weight: 700; color: #FFFFFF;">ARISE Design System</h2>
        </div>

        <nav style="display: flex; flex-direction: column; gap: 3px;">
          ${pages.map(p => `
            <div class="ds-page-link ${p.id === activePage ? 'active' : ''}" onclick="AriseState.setDsPage('${p.id}')">
              <span class="ds-page-num">${p.id}</span>
              <span style="font-weight: 500;">${p.title.split('—')[1]?.trim() || p.title}</span>
            </div>
          `).join('')}
        </nav>

        <div style="margin-top: auto; padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-muted);">
          <span>WCAG 2.2 AA Verified</span><br/>
          <span>Tokens mapped to CSS & Tailwind</span>
        </div>
      </aside>

      <!-- Design System Page Content Area -->
      <main class="ds-content-area">
        ${renderDesignSystemPageContent(activePage)}
      </main>
    </div>
  `;
}

function renderDesignSystemPageContent(pageId) {
  switch (pageId) {
    case '01': return renderDsPage01Cover();
    case '02': return renderDsPage02Foundations();
    case '03': return renderDsPage03Components();
    case '04': return renderDsPage04MarketingAuth();
    case '05': return renderDsPage05Dashboard();
    case '06': return renderDsPage06Leaderboard();
    case '07': return renderDsPage07Dsa();
    case '08': return renderDsPage08SelfStudy();
    case '09': return renderDsPage09Learning();
    case '10': return renderDsPage10Profile();
    case '11': return renderDsPage11Settings();
    case '12': return renderDsPage12Handoff();
    default: return renderDsPage01Cover();
  }
}

// PAGE 01: COVER & PRODUCT VISION
function renderDsPage01Cover() {
  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-8);">
      <div class="glass-hero" style="padding: 60px 48px;">
        <div class="hero-pill-badge" style="margin-bottom: 16px;">
          PAGE 01 — COVER & SYSTEM BLUEPRINT
        </div>
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
          <div class="brand-icon-mark" style="width: 52px; height: 52px; font-size: 24px;">▲</div>
          <h1 style="font-size: 44px; font-weight: 800; letter-spacing: -0.03em;">ARISE</h1>
        </div>
        <div style="font-size: 20px; font-weight: 600; color: #C4B5FD; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px;">
          "Learn. Solve. Rise."
        </div>
        <p style="font-size: 16px; color: var(--text-secondary); max-width: 780px; line-height: 1.7;">
          ARISE is an elite student learning and Data Structures & Algorithms ecosystem created for engineering and collegiate programmers in India (Maharashtra focus). Art-directed with developer-first restraint (Linear precision, Vercel minimalism, Raycast speed) and selective glassmorphism.
        </p>
      </div>

      <div class="grid-12">
        <div class="col-6">
          <div class="glass-card">
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #FFFFFF;">System Axioms & Integrity Rules</h3>
            <ul style="padding-left: 20px; font-size: 13.5px; line-height: 1.8; color: var(--text-secondary);">
              <li><b>Strict DSA XP:</b> XP and rank come ONLY from verified submissions confirmed by the judge engine.</li>
              <li><b>Zero Vanity Time XP:</b> Reading PDFs or watching lessons never awards competitive rank XP.</li>
              <li><b>80% Pass Criterion:</b> Courses are complete only when scoring ≥ 80% on the final assessment.</li>
              <li><b>Read-Only Cryptographic UID:</b> Students never choose or edit their UID (<code style="color: #A78BFA;">ARISE-7K2M9Q</code>).</li>
              <li><b>Mutual Consent Friends System:</b> Both students must approve connection requests.</li>
            </ul>
          </div>
        </div>

        <div class="col-6">
          <div class="glass-card">
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #FFFFFF;">Art Direction Principles</h3>
            <ul style="padding-left: 20px; font-size: 13.5px; line-height: 1.8; color: var(--text-secondary);">
              <li><b>Selective Glass:</b> Glass is reserved for heroes, selected pills, and modals.</li>
              <li><b>Calm Dense Surfaces:</b> Code, tabular data, and test cases use opaque #0B0F1C surfaces for maximum contrast.</li>
              <li><b>Icon + Text:</b> Status is never conveyed by color alone (WCAG 2.2 AA).</li>
              <li><b>Tabular Numerals:</b> Monospaced digits ensure zero jitter during metric updates.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// PAGE 02: FOUNDATIONS
function renderDsPage02Foundations() {
  const colorTokens = [
    { name: "bg/base", hex: "#080B14", role: "Primary dark canvas" },
    { name: "bg/secondary", hex: "#0D1220", role: "Secondary panel backdrop" },
    { name: "surface/elevated", hex: "#11182A", role: "Cards and elevated modals" },
    { name: "surface/editor", hex: "#0B0F1C", role: "IDE workspace coding area" },
    { name: "accent/primary", hex: "#8B5CF6", role: "Violet primary actions & glows" },
    { name: "accent/secondary", hex: "#6366F1", role: "Indigo gradient pairing" },
    { name: "accent/cyan", hex: "#22D3EE", role: "Progress bars & key data highlights" },
    { name: "text/primary", hex: "#F5F7FF", role: "Headings & high-contrast text" },
    { name: "text/secondary", hex: "#A4AEC5", role: "Body text & descriptions" },
    { name: "text/muted", hex: "#6F7B94", role: "Labels, hints & borders" },
    { name: "success", hex: "#34D399", role: "Accepted solves & completed status" },
    { name: "warning", hex: "#FBBF24", role: "Medium difficulty & pending items" },
    { name: "error", hex: "#FB7185", role: "Wrong answer & runtime errors" }
  ];

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-8);">
      <div>
        <div class="hero-pill-badge" style="margin-bottom: 8px;">PAGE 02 — DESIGN FOUNDATIONS</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF;">Color, Typography, Spacing & Glass Tokens</h1>
        <p class="text-small text-muted">All tokens are defined as CSS Custom Properties and verified WCAG 2.2 AA compliant.</p>
      </div>

      <!-- Color Tokens Swatches -->
      <div>
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Semantic Color Tokens</h3>
        <div class="swatch-grid">
          ${colorTokens.map(c => `
            <div class="swatch-card">
              <div class="swatch-preview" style="background: ${c.hex};"></div>
              <div class="swatch-meta">
                <span class="swatch-name">${c.name}</span>
                <span class="swatch-val">${c.hex}</span>
                <span style="font-size: 11px; color: var(--text-muted);">${c.role}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Typography Scale -->
      <div class="surface-opaque" style="padding: var(--space-6);">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: var(--space-4);">Typography Scale</h3>
        <div class="type-sample-row">
          <span style="font-size: 40px; font-weight: 800; line-height: 48px;">Display 40/48</span>
          <span class="font-mono text-muted">40px / 48px • Inter Bold</span>
        </div>
        <div class="type-sample-row">
          <span style="font-size: 32px; font-weight: 700; line-height: 40px;">Heading 1 (H1) 32/40</span>
          <span class="font-mono text-muted">32px / 40px • Inter Bold</span>
        </div>
        <div class="type-sample-row">
          <span style="font-size: 24px; font-weight: 600; line-height: 32px;">Heading 2 (H2) 24/32</span>
          <span class="font-mono text-muted">24px / 32px • Inter SemiBold</span>
        </div>
        <div class="type-sample-row">
          <span style="font-size: 18px; font-weight: 600; line-height: 28px;">Heading 3 (H3) 18/28</span>
          <span class="font-mono text-muted">18px / 28px • Inter SemiBold</span>
        </div>
        <div class="type-sample-row">
          <span style="font-size: 14px; line-height: 22px;">Body 14/22 — Crisp legible UI body copy across all components.</span>
          <span class="font-mono text-muted">14px / 22px • Inter Regular</span>
        </div>
        <div class="type-sample-row">
          <span style="font-size: 12px; line-height: 18px; color: var(--text-secondary);">Small 12/18 — Metadata, secondary badges and sub-labels.</span>
          <span class="font-mono text-muted">12px / 18px • Inter Regular</span>
        </div>
        <div class="type-sample-row">
          <span class="font-mono" style="font-size: 13px; line-height: 20px; color: #C4B5FD;">Mono 13/20 — JetBrains Mono: ARISE-7K2M9Q | int left = 0;</span>
          <span class="font-mono text-muted">13px / 20px • JetBrains Mono</span>
        </div>
      </div>

      <!-- Spacing Grid & Radius -->
      <div class="grid-12">
        <div class="col-6">
          <div class="glass-card">
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">4px Spacing System</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: var(--font-mono); font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 4px; height: 16px; background: #8B5CF6;"></div>
                <span>--space-1: 4px</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 16px; background: #8B5CF6;"></div>
                <span>--space-2: 8px</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 16px; height: 16px; background: #8B5CF6;"></div>
                <span>--space-4: 16px</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 24px; height: 16px; background: #8B5CF6;"></div>
                <span>--space-6: 24px (Grid Gutter)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 32px; height: 16px; background: #8B5CF6;"></div>
                <span>--space-8: 32px (Page Margin)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="glass-card">
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">Radius Tokens</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-secondary);">
              <div><b>12px</b>: Inputs, table rows, segmented buttons</div>
              <div><b>16px</b>: Standard cards and containers</div>
              <div><b>20px</b>: Hero banners and dialog modals</div>
              <div><b>Full (9999px)</b>: Status pills, difficulty tags, avatars</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// PAGE 03: COMPONENT MATRIX (All Variants and States)
function renderDsPage03Components() {
  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-8);">
      <div>
        <div class="hero-pill-badge" style="margin-bottom: 8px;">PAGE 03 — COMPONENT LIBRARY</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF;">Interactive Component Variant Matrix</h1>
        <p class="text-small text-muted">Complete states: Default, Hover, Focus (2px violet ring), Active, Disabled, Loading.</p>
      </div>

      <!-- Button Variants & States -->
      <div class="surface-opaque" style="padding: var(--space-6);">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: var(--space-4);">Button Component Hierarchy</h3>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: center;">
          <button class="btn btn-primary">Primary Action</button>
          <button class="btn btn-secondary">Secondary Glass</button>
          <button class="btn btn-ghost">Ghost Button</button>
          <button class="btn btn-destructive">Destructive Action</button>
          <button class="btn btn-primary btn-loading">Loading Button</button>
          <button class="btn btn-primary" disabled>Disabled State</button>
          <button class="btn btn-primary btn-sm">Small Size</button>
          <button class="btn btn-primary btn-lg">Large Hero CTA</button>
        </div>
      </div>

      <!-- Difficulty Badges & Topic Tags -->
      <div class="glass-card">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: var(--space-4);">Difficulty Badges & Metadata Chips</h3>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;">
          <span class="badge badge-easy">● Easy Problem</span>
          <span class="badge badge-medium">■ Medium Problem</span>
          <span class="badge badge-hard">▲ Hard Problem</span>
          <span class="topic-tag">Arrays</span>
          <span class="topic-tag">Dynamic Programming</span>
          <span class="topic-tag">Graphs & BFS</span>
          <div class="uid-chip">
            <span>UID</span>
            <span class="uid-val">ARISE-7K2M9Q</span>
            <button class="btn-copy">📋</button>
          </div>
        </div>
      </div>

      <!-- Metric Cards Preview -->
      <div class="grid-12">
        <div class="col-4">
          <div class="metric-card">
            <span class="metric-label">Verified DSA XP</span>
            <span class="metric-value">3,420 XP</span>
            <span class="metric-meta text-muted">Judge confirmed</span>
          </div>
        </div>
        <div class="col-4">
          <div class="metric-card">
            <span class="metric-label">Curriculum Progress</span>
            <span class="metric-value" style="color: var(--accent-cyan);">68%</span>
            <div class="progress-bar-track">
              <div class="progress-bar-fill progress-bar-cyan" style="width: 68%;"></div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="metric-card">
            <span class="metric-label">Acceptance Rate</span>
            <span class="metric-value">72.4%</span>
            <span class="metric-meta" style="color: var(--success);">Top 15% in State</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// PAGES 04 - 11 SPECS (Modular)
function renderDsPage04MarketingAuth() {
  return renderDsDocPage('04', 'Marketing & Authentication Specification', 'Landing page hero, Sign Up with password strength, Login with blind error state, and 3-step Onboarding generating ARISE UID.');
}

function renderDsPage05Dashboard() {
  return renderDsDocPage('05', 'Overview Dashboard Specification', 'Flagship screen with 12-column grid, dominant verified XP tabular numeral, rank-scope selector, compact topic mastery with cyan fills, and recently solved problems table.');
}

function renderDsPage06Leaderboard() {
  return renderDsDocPage('06', 'Leaderboard & Friends System Specification', '4 scopes (College, District, Maharashtra, India) ranked strictly by judge-verified XP. Friends tab with mutual consent Add Friend box, UID lookup preview, and 4-way comparison matrix.');
}

function renderDsPage07Dsa() {
  return renderDsDocPage('07', 'DSA Experience & 7 Judge States Specification', '17 topics, dense multi-filter problem table, 3-panel resizable IDE workspace, and all 7 judge states: Running, Accepted, Wrong Answer, Compilation Error, Runtime Error, Time Limit Exceeded, Judge Unavailable.');
}

function renderDsPage08SelfStudy() {
  return renderDsDocPage('08', 'Self Study Module Specification', 'Library cards, PDF upload modal, calm light-toned reading surface within dark shell, study timer, and honest integrity rule: "Study sessions do not affect rank."');
}

function renderDsPage09Learning() {
  return renderDsDocPage('09', 'Learning Track & 80% Cutoff Specification', 'Course syllabus, lesson player with code examples, final assessment quiz with strict 80% passing rule (79% remains incomplete), and verified ARISE Certificate.');
}

function renderDsPage10Profile() {
  return renderDsDocPage('10', 'Profile & Achievements Specification', 'Header with read-only UID chip, topic progress bars, completed courses component, earned badges with unlock dates, and locked badges with real requirements.');
}

function renderDsPage11Settings() {
  return renderDsDocPage('11', 'Settings & System States Specification', 'Server-enforced privacy controls, preview of what others see, skeleton loaders, and zero-data empty states.');
}

function renderDsDocPage(num, title, summary) {
  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <div class="hero-pill-badge">PAGE ${num} — MODULE BLUEPRINT</div>
      <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF;">${title}</h1>
      <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.7; max-width: 800px;">${summary}</p>

      <div class="glass-card">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">Active Prototype Integration</h3>
        <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 16px;">
          This module is fully built and functioning in the interactive prototype. You can switch to the live app mode or jump directly to the screen using the top controls.
        </p>
        <button class="btn btn-primary" onclick="AriseState.setViewMode('prototype')">
          Launch Live Interactive Prototype →
        </button>
      </div>
    </div>
  `;
}

// PAGE 12: DEVELOPER HANDOFF & TOKENS MAPPING
function renderDsPage12Handoff() {
  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-8);">
      <div>
        <div class="hero-pill-badge" style="margin-bottom: 8px;">PAGE 12 — DEVELOPER HANDOFF</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF;">Token-to-Tailwind / CSS Mapping Table</h1>
        <p class="text-small text-muted">Complete mapping of semantic design tokens to CSS variables and Tailwind config keys.</p>
      </div>

      <table class="handoff-table" aria-label="Token to Tailwind Mapping">
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Value</th>
            <th>CSS Variable</th>
            <th>Tailwind Key</th>
            <th>WCAG Contrast</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bg/base</td>
            <td><code>#080B14</code></td>
            <td><code>var(--bg-base)</code></td>
            <td><code>bg-base</code></td>
            <td>Pass (AAA Base)</td>
          </tr>
          <tr>
            <td>bg/secondary</td>
            <td><code>#0D1220</code></td>
            <td><code>var(--bg-secondary)</code></td>
            <td><code>bg-secondary</code></td>
            <td>Pass (AAA Base)</td>
          </tr>
          <tr>
            <td>surface/glass</td>
            <td><code>rgba(255,255,255,0.05)</code></td>
            <td><code>var(--surface-glass)</code></td>
            <td><code>bg-glass backdrop-blur-md</code></td>
            <td>Pass (AA on dark)</td>
          </tr>
          <tr>
            <td>accent/primary</td>
            <td><code>#8B5CF6</code></td>
            <td><code>var(--accent-primary)</code></td>
            <td><code>violet-500</code></td>
            <td>Pass (AA UI)</td>
          </tr>
          <tr>
            <td>accent/cyan</td>
            <td><code>#22D3EE</code></td>
            <td><code>var(--accent-cyan)</code></td>
            <td><code>cyan-400</code></td>
            <td>Pass (11.4:1 AA)</td>
          </tr>
          <tr>
            <td>text/primary</td>
            <td><code>#F5F7FF</code></td>
            <td><code>var(--text-primary)</code></td>
            <td><code>text-primary</code></td>
            <td>16.8:1 (AAA)</td>
          </tr>
          <tr>
            <td>text/secondary</td>
            <td><code>#A4AEC5</code></td>
            <td><code>var(--text-secondary)</code></td>
            <td><code>text-secondary</code></td>
            <td>7.2:1 (AA)</td>
          </tr>
          <tr>
            <td>text/muted</td>
            <td><code>#6F7B94</code></td>
            <td><code>var(--text-muted)</code></td>
            <td><code>text-muted</code></td>
            <td>4.6:1 (AA)</td>
          </tr>
        </tbody>
      </table>

      <!-- Handoff Notes -->
      <div class="glass-card">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">Component Anatomy & State Rules</h3>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
          <div>• <b>Focus states:</b> Always render visible 2px violet ring (<code style="color: #A78BFA;">#8B5CF6</code>) with 2px offset on keyboard focus.</div>
          <div>• <b>Judge states:</b> Never show "Accepted" or award XP before judge confirms. Display pending spinner and evaluation state.</div>
          <div>• <b>Privacy protection:</b> Server authorization rules enforce leaderboard and friends visibility. Toggle is accompanied by server disclaimer.</div>
          <div>• <b>UID integrity:</b> ARISE UID is generated via cryptographic random token, displayed read-only in JetBrains Mono.</div>
        </div>
      </div>
    </div>
  `;
}
