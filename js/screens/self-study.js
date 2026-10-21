/* ==========================================================================
   ARISE SCREENS M, N, O: SELF STUDY MODULE
   Library, Upload Dialog, Clean Reader, Study Timer & Session Summary
   Strict Rule: Study sessions NEVER award DSA XP
   ========================================================================== */

function renderSelfStudyScreen() {
  if (AriseState.currentScreen === 'pdf-reader') {
    return renderPdfReaderScreen();
  }
  return renderSelfStudyLibrary();
}

// SCREEN M: SELF STUDY LIBRARY
function renderSelfStudyLibrary() {
  const docs = ARISE_DATA.studyLibrary;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Top header with Upload action -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Self Study Library</h1>
            <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); border: 1px solid var(--border-default);">
              Personal Notes & Papers
            </span>
          </div>
          <p class="text-small text-muted" style="margin-top: 4px;">
            Read academic papers, PDFs and study guides. <b>Note:</b> Study time never awards DSA XP.
          </p>
        </div>

        <div style="display: flex; gap: var(--space-3);">
          <button class="btn btn-primary" onclick="openUploadDocumentModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload Material
          </button>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="glass-card" style="padding: var(--space-4); display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); flex-wrap: wrap;">
        <div class="search-input-box" style="flex: 1; max-width: 360px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search saved materials..." style="background: transparent; border: none; outline: none; font-size: 13px; color: var(--text-primary); width: 100%;" />
        </div>

        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn-secondary btn-sm">All Subjects</button>
          <button class="btn btn-ghost btn-sm">Algorithms</button>
          <button class="btn btn-ghost btn-sm">Core CS</button>
          <button class="btn btn-ghost btn-sm">Databases</button>
        </div>
      </div>

      <!-- Documents Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5);">
        ${docs.map(doc => `
          <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-4); cursor: pointer;" onclick="openDocumentReader('${doc.id}')">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(139,92,246,0.15); color: #C4B5FD; border: 1px solid rgba(139,92,246,0.3);">
                  ${doc.subject}
                </span>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${doc.fileSize}</span>
              </div>
              <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; line-height: 1.4;">
                ${doc.title}
              </h3>
              <p class="text-small text-muted">
                ${doc.pages} pages • Opened ${doc.lastOpened}
              </p>
            </div>

            <div style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <span class="text-small text-muted">PDF Document</span>
              <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openDocumentReader('${doc.id}')">
                Open Reader →
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Honest Disclaimer Bar -->
      <div style="padding: 12px 16px; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
        <span>ℹ️ Study time and personal document reading never award rank points. Rankings reflect judge-verified code submissions only.</span>
      </div>
    </div>
  `;
}

function openDocumentReader(docId) {
  const d = ARISE_DATA.studyLibrary.find(item => item.id === docId);
  if (d) AriseState.activeDoc = d;
  AriseState.setScreen('pdf-reader');
}

// SCREEN N: PDF / DOCUMENT READER (Calm light-toned reading surface within dark shell)
function renderPdfReaderScreen() {
  const doc = AriseState.activeDoc || ARISE_DATA.studyLibrary[0];
  const minutes = Math.floor(AriseState.timerSeconds / 60);
  const seconds = AriseState.timerSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Reader Chrome Navigation Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: #0E1424; padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('self-study')">
            ← Back to Library
          </button>
          <span style="color: var(--border-strong);">|</span>
          <span style="font-weight: 600; color: var(--text-primary); font-size: 14px;">${doc.title}</span>
          <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-muted);">Page 1 of ${doc.pages}</span>
        </div>

        <div style="display: flex; align-items: center; gap: var(--space-4);">
          <!-- Study Timer Floating Control -->
          <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.35); border: 1px solid var(--border-default); padding: 4px 10px; border-radius: var(--radius-full);">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${AriseState.timerRunning ? 'var(--success)' : 'var(--warning)'}; box-shadow: 0 0 6px ${AriseState.timerRunning ? 'var(--success)' : 'var(--warning)'};"></div>
            <span class="font-mono tabular-nums" style="font-weight: 700; font-size: 13px; color: #FFFFFF;">${timeFormatted}</span>
            <button class="btn-copy" onclick="toggleStudyTimer()" title="${AriseState.timerRunning ? 'Pause Timer' : 'Start Timer'}">
              ${AriseState.timerRunning 
                ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
                : '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'}
            </button>
            <button class="btn-copy" onclick="finishStudySession()" title="Finish & Save Session Summary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
          </div>

          <div style="display: flex; gap: 4px;">
            <button class="btn btn-ghost btn-sm" onclick="showToast('Zoom Level: 100%', 'info')">100%</button>
            <button class="btn btn-ghost btn-sm" onclick="showToast('Outline toggled', 'info')">Outline</button>
          </div>
        </div>
      </div>

      <!-- Calm Light Page Surface for optimal reading comfort -->
      <div class="reader-canvas">
        <h1 style="font-size: 28px; font-weight: 800; color: #0F172A; margin-bottom: 8px; font-family: 'Inter', sans-serif;">
          ${doc.title.replace('.pdf', '')}
        </h1>
        <div style="font-size: 13px; color: #64748B; margin-bottom: 32px; border-bottom: 2px solid #E2E8F0; padding-bottom: 12px; font-family: 'Inter', sans-serif;">
          Author: MIT OpenCourseWare & Department of EECS • Subject: ${doc.subject} • ${doc.pages} Pages
        </div>

        <div style="font-size: 15px; color: #334155; line-height: 1.85;">
          <h2 style="font-size: 20px; font-weight: 700; color: #1E293B; margin: 24px 0 12px; font-family: 'Inter', sans-serif;">
            1. Problem Formulation & Invariants
          </h2>
          <p style="margin-bottom: 16px;">
            Let $G = (V, E)$ be a directed graph with non-negative edge capacity $c(u, v) \ge 0$ for each edge $(u, v) \in E$. We define two distinguished vertices: a source $s$ and a sink $t$. A flow is a real-valued function $f: V \times V \to \mathbb{R}$ satisfying capacity constraints and conservation of flow across all intermediate nodes.
          </p>
          <div style="background: #F1F5F9; border-left: 4px solid #6366F1; padding: 16px; margin: 20px 0; border-radius: 4px; font-family: var(--font-mono); font-size: 13px; color: #1E293B;">
            Capacity constraint: For all u, v in V, f(u, v) &lt;= c(u, v)<br>
            Skew symmetry: f(u, v) = -f(v, u)<br>
            Flow conservation: For all u in V \ {s, t}, sum(f(u, v)) = 0
          </div>
          <p style="margin-bottom: 16px;">
            The residual network $G_f$ induced by flow $f$ consists of edges that can admit more net flow. The Ford-Fulkerson method repeatedly finds augmenting paths in the residual network from source to sink until no augmenting path remains.
          </p>
        </div>

        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #64748B; font-family: 'Inter', sans-serif;">
          <span>Page 1 of ${doc.pages}</span>
          <div style="display: flex; gap: 8px;">
            <button style="padding: 6px 12px; border-radius: 6px; border: 1px solid #CBD5E1; background: #FFFFFF; color: #0F172A; cursor: pointer;">Previous</button>
            <button style="padding: 6px 12px; border-radius: 6px; border: 1px solid #CBD5E1; background: #FFFFFF; color: #0F172A; cursor: pointer;">Next Page →</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// SCREEN O: STUDY TIMER & SESSION SUMMARY MODAL
function toggleStudyTimer() {
  AriseState.timerRunning = !AriseState.timerRunning;
  if (AriseState.timerRunning) {
    showToast('Study timer started', 'info');
    if (!AriseState.timerInterval) {
      AriseState.timerInterval = setInterval(() => {
        if (AriseState.timerRunning) {
          AriseState.timerSeconds++;
          if (AriseState.currentScreen === 'pdf-reader') AriseState.notify();
        }
      }, 1000);
    }
  } else {
    showToast('Study timer paused', 'info');
  }
  AriseState.notify();
}

function finishStudySession() {
  AriseState.timerRunning = false;
  const mins = Math.floor(AriseState.timerSeconds / 60);

  let modal = document.getElementById('session-summary-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'session-summary-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-window">
      <div class="modal-header">
        <h3 style="font-size: 16px; font-weight: 700;">Study Session Summary</h3>
        <button class="btn btn-ghost btn-sm" onclick="modal.classList.remove('open')">✕</button>
      </div>
      <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-4); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted);">Session Duration</div>
            <div class="font-mono tabular-nums" style="font-size: 26px; font-weight: 700; color: #FFFFFF;">${mins} Minutes</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted);">Material Studied</div>
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${AriseState.activeDoc?.title || 'Advanced Graph Algorithms'}
            </div>
          </div>
        </div>

        <div style="padding: 12px; border-radius: var(--radius-md); background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.25); font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
          ℹ️ <b>ARISE Integrity Rule:</b> Study sessions do not award XP or affect your leaderboard rank. Verified XP is earned strictly by solving judge-confirmed DSA problems.
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('session-summary-modal').classList.remove('open')">Discard</button>
        <button class="btn btn-primary" onclick="saveStudySession()">Save Session Record</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function saveStudySession() {
  const modal = document.getElementById('session-summary-modal');
  if (modal) modal.classList.remove('open');
  showToast('Study session record saved successfully!', 'success');
  AriseState.timerSeconds = 0;
  AriseState.notify();
}

function openUploadDocumentModal() {
  let modal = document.getElementById('upload-doc-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'upload-doc-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-window">
      <div class="modal-header">
        <h3 style="font-size: 16px; font-weight: 700;">Upload Study Material</h3>
        <button class="btn btn-ghost btn-sm" onclick="modal.classList.remove('open')">✕</button>
      </div>
      <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="border: 2px dashed var(--border-strong); border-radius: var(--radius-lg); padding: 36px 20px; text-align: center; background: rgba(255,255,255,0.02); cursor: pointer;"
          onclick="simulateUploadProgress()">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color: var(--accent-primary); margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <div style="font-weight: 600; color: var(--text-primary); font-size: 14px;">Drag and drop PDF here, or click to browse</div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">Supported: PDF, EPUB • Max file size: 50 MB</div>
        </div>

        <div id="upload-progress-box" style="display: none;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
            <span style="color: var(--text-secondary);">Uploading: Network_Flow_Notes.pdf</span>
            <span class="font-mono" style="color: var(--accent-cyan);">100%</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-bar-cyan" style="width: 100%;"></div>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">Subject Domain</label>
          <input type="text" class="input" placeholder="e.g. Algorithms, Distributed Systems" value="Advanced Algorithms" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('upload-doc-modal').classList.remove('open')">Cancel</button>
        <button class="btn btn-primary" onclick="finishUploadModal()">Save to Library</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function simulateUploadProgress() {
  const box = document.getElementById('upload-progress-box');
  if (box) box.style.display = 'block';
}

function finishUploadModal() {
  const modal = document.getElementById('upload-doc-modal');
  if (modal) modal.classList.remove('open');
  showToast('Document uploaded successfully to your personal library!', 'success');
}
