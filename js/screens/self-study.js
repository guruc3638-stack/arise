/* ==========================================================================
   ARISE SCREENS M, N, O: SELF STUDY MODULE
   Library, Upload Dialog, Clean Reader, Study Timer & Session Summary
   Strict Integrity Rule 7: Self-study time and document reading strictly
   award ZERO XP and do not impact leaderboard rank (Doc 08 T-09).
   File Upload Rule: Private PDF-only with %PDF validation and 10MB cap (T-10, T-11).
   ========================================================================== */

function renderSelfStudyScreen() {
  if (AriseState.authToken && !AriseState.studyFilesLoaded && !AriseState.studyLoading) {
    if (typeof AriseState.fetchStudyFiles === 'function') {
      AriseState.fetchStudyFiles().catch(() => {});
    }
  }

  if (AriseState.authToken && !AriseState.studySummaryLoaded && !AriseState.studySummaryLoading) {
    if (typeof AriseState.fetchStudySummary === 'function') {
      AriseState.fetchStudySummary().catch(() => {});
    }
  }

  if (AriseState.currentScreen === 'pdf-reader') {
    return renderPdfReaderScreen();
  }
  return renderSelfStudyLibrary();
}

// --------------------------------------------------------------------------
// SCREEN M: SELF STUDY LIBRARY
// --------------------------------------------------------------------------
function renderSelfStudyLibrary() {
  const docs = (AriseState.studyFiles && AriseState.studyFiles.length > 0)
    ? AriseState.studyFiles
    : ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.studyLibrary) ? ARISE_DATA.studyLibrary : []);

  const summary = AriseState.studySummary || { total_hours: 0.0, session_count: 0, total_minutes: 0 };
  const hasFiles = docs.length > 0;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Top header with Upload action -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Self Study Library</h1>
            <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); border: 1px solid var(--border-default);">
              Private Documents & Notes
            </span>
          </div>
          <p class="text-small text-muted" style="margin-top: 4px;">
            Read personal academic papers, algorithm proofs, and reference PDFs. <b>Note:</b> Study time never awards DSA XP.
          </p>
        </div>

        <div style="display: flex; gap: var(--space-3);">
          <button class="btn btn-primary" onclick="openUploadDocumentModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload PDF Document
          </button>
        </div>
      </div>

      <!-- Study Stats & Integrity Rule Strip -->
      <div class="glass-card" style="padding: var(--space-4) var(--space-6); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
        <div style="display: flex; align-items: center; gap: var(--space-6); flex-wrap: wrap;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Cumulative Study Time</div>
            <div class="font-mono tabular-nums" style="font-size: 20px; font-weight: 700; color: #FFFFFF;">
              ${(summary.total_hours || 0).toFixed(1)} <span style="font-size: 13px; color: var(--text-muted);">hours</span>
            </div>
          </div>
          <div style="width: 1px; height: 32px; background: var(--border-subtle);"></div>
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Logged Sessions</div>
            <div class="font-mono tabular-nums" style="font-size: 20px; font-weight: 700; color: #FFFFFF;">
              ${summary.session_count || 0}
            </div>
          </div>
          <div style="width: 1px; height: 32px; background: var(--border-subtle);"></div>
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Uploaded PDFs</div>
            <div class="font-mono tabular-nums" style="font-size: 20px; font-weight: 700; color: var(--accent-cyan);">
              ${docs.length}
            </div>
          </div>
        </div>

        <div style="font-size: 11.5px; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 6px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan);">
          <b>Rule 7:</b> Study sessions strictly award 0 XP. Rankings reflect judge-verified code submissions only.
        </div>
      </div>

      <!-- Documents Grid or Empty State -->
      ${hasFiles ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5);">
          ${docs.map(doc => {
            const docId = doc.id;
            const title = doc.original_filename || doc.title || 'Untitled PDF';
            const sizeDisplay = doc.size_bytes ? `${(doc.size_bytes / (1024 * 1024)).toFixed(1)} MB` : (doc.fileSize || '1.2 MB');
            const dateStr = doc.created_at ? new Date(doc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : (doc.lastOpened || 'Recent');

            return `
              <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-4); cursor: pointer;" onclick="openDocumentReader('${docId}')">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span class="badge" style="background: rgba(139,92,246,0.15); color: #C4B5FD; border: 1px solid rgba(139,92,246,0.3);">
                      PDF Document
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${sizeDisplay}</span>
                  </div>
                  <h3 style="font-size: 15.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; line-height: 1.4; word-break: break-word;">
                    ${title}
                  </h3>
                  <p class="text-small text-muted">
                    Private Document • Uploaded ${dateStr}
                  </p>
                </div>

                <div style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;" onclick="event.stopPropagation()">
                  <button class="btn btn-ghost btn-sm text-error" onclick="handleDeleteStudyFile('${docId}')" title="Delete document" style="font-size: 11.5px; padding: 4px 8px;">
                    Delete
                  </button>
                  <button class="btn btn-secondary btn-sm" onclick="openDocumentReader('${docId}')">
                    Open Reader →
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <!-- Clean Account: Empty Library State -->
        <div class="glass-card" style="padding: 48px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-4);">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.25); display: flex; align-items: center; justify-content: center; color: var(--accent-primary); font-size: 24px;">
            📄
          </div>
          <h2 style="font-size: 18px; font-weight: 700; color: #FFFFFF;">No study documents uploaded yet</h2>
          <p style="font-size: 13.5px; color: var(--text-secondary); max-width: 440px; line-height: 1.6;">
            Upload your personal academic papers, algorithm proofs, or lecture PDFs (up to 10MB) for private, distraction-free reading with integrated focus timer.
          </p>
          <button class="btn btn-primary" onclick="openUploadDocumentModal()">
            Upload Your First PDF Document →
          </button>
        </div>
      `}

      <!-- Honest Disclaimer Bar -->
      <div style="padding: 12px 16px; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
        <span>ℹ️ Self study time and document reading strictly award zero XP and do not affect leaderboard rankings. Rankings reflect judge-verified code submissions only (Rule 7, Doc 08 T-09).</span>
      </div>
    </div>
  `;
}

async function handleDeleteStudyFile(fileId) {
  if (!confirm("Are you sure you want to delete this study document?")) return;
  try {
    if (typeof AriseState.deleteStudyFile === 'function') {
      await AriseState.deleteStudyFile(fileId);
      if (typeof showToast === 'function') showToast('Study document deleted.', 'info');
    }
  } catch (err) {
    if (typeof showToast === 'function') showToast('Could not delete file: ' + err.message, 'error');
  }
}

function openDocumentReader(docId) {
  const docs = (AriseState.studyFiles && AriseState.studyFiles.length > 0)
    ? AriseState.studyFiles
    : ((typeof ARISE_DATA !== 'undefined' && ARISE_DATA.studyLibrary) ? ARISE_DATA.studyLibrary : []);

  const d = docs.find(item => item.id === docId);
  if (d) AriseState.activeDoc = d;

  // Start study session
  if (typeof AriseState.startStudySession === 'function') {
    AriseState.startStudySession(docId).catch(() => {});
  } else {
    AriseState.timerRunning = true;
    AriseState.timerSeconds = 0;
  }
  AriseState.setScreen('pdf-reader');
}

// --------------------------------------------------------------------------
// SCREEN N: PDF / DOCUMENT READER
// --------------------------------------------------------------------------
function renderPdfReaderScreen() {
  const doc = AriseState.activeDoc || (AriseState.studyFiles && AriseState.studyFiles[0]) || { original_filename: 'Self Study Document.pdf', title: 'Self Study Document.pdf' };
  const docTitle = doc.original_filename || doc.title || 'Self Study Document.pdf';
  const minutes = Math.floor(AriseState.timerSeconds / 60);
  const seconds = AriseState.timerSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Reader Chrome Navigation Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: #0E1424; padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-default); flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-ghost btn-sm" onclick="AriseState.setScreen('self-study')">
            ← Back to Library
          </button>
          <span style="color: var(--border-strong);">|</span>
          <span style="font-weight: 600; color: var(--text-primary); font-size: 14px; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${docTitle}
          </span>
          <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-muted);">PDF Document</span>
        </div>

        <div style="display: flex; align-items: center; gap: var(--space-4);">
          <!-- Study Timer Floating Control -->
          <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.35); border: 1px solid var(--border-default); padding: 4px 10px; border-radius: var(--radius-full);">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${AriseState.timerRunning ? 'var(--success)' : 'var(--warning)'}; box-shadow: 0 0 6px ${AriseState.timerRunning ? 'var(--success)' : 'var(--warning)'};"></div>
            <span id="study-timer-display" class="font-mono tabular-nums" style="font-weight: 700; font-size: 13px; color: #FFFFFF;">${timeFormatted}</span>
            <button class="btn-copy" onclick="toggleStudyTimer()" title="${AriseState.timerRunning ? 'Pause Timer' : 'Resume Timer'}">
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
            <button class="btn btn-ghost btn-sm" onclick="showToast('Reading Mode Active', 'info')">Calm Mode</button>
          </div>
        </div>
      </div>

      <!-- Calm Light Page Surface for optimal reading comfort -->
      <div class="reader-canvas">
        <h1 style="font-size: 26px; font-weight: 800; color: #0F172A; margin-bottom: 8px; font-family: 'Inter', sans-serif;">
          ${docTitle.replace(/\.pdf$/i, '')}
        </h1>
        <div style="font-size: 13px; color: #64748B; margin-bottom: 32px; border-bottom: 2px solid #E2E8F0; padding-bottom: 12px; font-family: 'Inter', sans-serif;">
          Subject: Self Study & Academic Research • Format: PDF • Distraction-free Study Mode
        </div>

        <div style="font-size: 15px; color: #334155; line-height: 1.85;">
          <h2 style="font-size: 19px; font-weight: 700; color: #1E293B; margin: 24px 0 12px; font-family: 'Inter', sans-serif;">
            1. Problem Formulation & Invariants
          </h2>
          <p style="margin-bottom: 16px;">
            Let $G = (V, E)$ be a directed graph with non-negative edge capacity $c(u, v) \ge 0$ for each edge $(u, v) \in E$. We define two distinguished vertices: a source $s$ and a sink $t$. A flow is a real-valued function $f: V \times V \to \mathbb{R}$ satisfying capacity constraints and conservation of flow across all intermediate nodes.
          </p>
          <div style="background: #F1F5F9; border-left: 4px solid #6366F1; padding: 16px; margin: 20px 0; border-radius: 4px; font-family: var(--font-mono); font-size: 13px; color: #1E293B;">
            Capacity constraint: For all u, v in V, f(u, v) &lt;= c(u, v)<br>
            Skew symmetry: f(u, v) = -f(v, u)<br>
            Flow conservation: For all u in V \\ {s, t}, sum(f(u, v)) = 0
          </div>
          <p style="margin-bottom: 16px;">
            The residual network $G_f$ induced by flow $f$ consists of edges that can admit more net flow. The Ford-Fulkerson method repeatedly finds augmenting paths in the residual network from source to sink until no augmenting path remains.
          </p>
        </div>

        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #64748B; font-family: 'Inter', sans-serif;">
          <span>Document Reader Surface</span>
          <div style="display: flex; gap: 8px;">
            <button style="padding: 6px 12px; border-radius: 6px; border: 1px solid #CBD5E1; background: #FFFFFF; color: #0F172A; cursor: pointer;" onclick="showToast('Beginning of document', 'info')">Top</button>
            <button style="padding: 6px 12px; border-radius: 6px; border: 1px solid #CBD5E1; background: #FFFFFF; color: #0F172A; cursor: pointer;" onclick="finishStudySession()">Complete Session</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// SCREEN O: STUDY TIMER & SESSION SUMMARY MODAL
// --------------------------------------------------------------------------
function toggleStudyTimer() {
  AriseState.timerRunning = !AriseState.timerRunning;
  if (AriseState.timerRunning) {
    if (typeof showToast === 'function') showToast('Study timer resumed', 'info');
    if (!AriseState.timerInterval) {
      AriseState.timerInterval = setInterval(() => {
        if (AriseState.timerRunning) {
          AriseState.timerSeconds++;
          const timerEl = typeof document !== 'undefined' ? document.getElementById('study-timer-display') : null;
          if (timerEl) {
            const minutes = Math.floor(AriseState.timerSeconds / 60);
            const seconds = AriseState.timerSeconds % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          } else if (AriseState.currentScreen === 'pdf-reader') {
            AriseState.notify();
          }
        }
      }, 1000);
    }
  } else {
    if (typeof showToast === 'function') showToast('Study timer paused', 'info');
  }
  AriseState.notify();
}

async function finishStudySession() {
  const secs = AriseState.timerSeconds || 0;
  const mins = Math.max(1, Math.round(secs / 60));

  if (typeof AriseState.finishStudySession === 'function') {
    await AriseState.finishStudySession();
  } else {
    AriseState.timerRunning = false;
  }

  const docTitle = AriseState.activeDoc?.original_filename || AriseState.activeDoc?.title || 'Algorithmic Research Material';

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
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('session-summary-modal').classList.remove('open')">✕</button>
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
              ${docTitle}
            </div>
          </div>
        </div>

        <div style="padding: 12px; border-radius: var(--radius-md); background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.25); font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
          ℹ️ <b>ARISE Integrity Rule 7:</b> Study sessions do not award XP or affect your leaderboard rank. Verified XP is earned strictly by solving judge-confirmed DSA problems (Doc 08 T-09).
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="closeSessionSummaryModal()">Continue</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeSessionSummaryModal() {
  const modal = document.getElementById('session-summary-modal');
  if (modal) modal.classList.remove('open');
  AriseState.timerSeconds = 0;
  AriseState.setScreen('self-study');
}

// --------------------------------------------------------------------------
// UPLOAD DOCUMENT MODAL (Rule: PDF only, %PDF validation, <= 10MB)
// --------------------------------------------------------------------------
let selectedUploadFile = null;

function openUploadDocumentModal() {
  selectedUploadFile = null;
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
        <h3 style="font-size: 16px; font-weight: 700;">Upload Private Study Material</h3>
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('upload-doc-modal').classList.remove('open')">✕</button>
      </div>
      <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Inline Upload Error Box -->
        <div id="upload-doc-error" style="display: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); color: #FCA5A5; font-size: 13px; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span id="upload-doc-error-text"></span>
        </div>

        <input type="file" id="study-file-input" accept=".pdf,application/pdf" style="display: none;" onchange="handleStudyFileSelected(event)">

        <div id="upload-dropzone" style="border: 2px dashed var(--border-strong); border-radius: var(--radius-lg); padding: 36px 20px; text-align: center; background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.2s ease;"
          onclick="document.getElementById('study-file-input').click()"
          ondragover="event.preventDefault(); this.style.borderColor='var(--accent-primary)'; this.style.background='rgba(139,92,246,0.06)';"
          ondragleave="this.style.borderColor='var(--border-strong)'; this.style.background='rgba(255,255,255,0.02)';"
          ondrop="event.preventDefault(); this.style.borderColor='var(--border-strong)'; this.style.background='rgba(255,255,255,0.02)'; if (event.dataTransfer.files && event.dataTransfer.files[0]) { handleStudyFileSelected({ target: { files: event.dataTransfer.files } }); }">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color: var(--accent-primary); margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <div style="font-weight: 600; color: var(--text-primary); font-size: 14px;">Select PDF document or drop file here</div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">Supported: Valid PDF only (%PDF magic bytes) • Maximum size: 10 MB</div>
        </div>

        <div id="upload-file-status" style="display: none; padding: 12px; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div id="upload-file-name" style="font-size: 13px; font-weight: 600; color: #FFFFFF;">Selected File</div>
              <div id="upload-file-size" style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">0 KB</div>
            </div>
            <span class="badge" style="background: var(--success-bg); color: var(--success);">Ready</span>
          </div>
        </div>

        <div style="padding: 10px 14px; border-radius: var(--radius-sm); background: rgba(255,255,255,0.02); font-size: 12px; color: var(--text-muted);">
          🔒 Uploaded files are strictly private to your account and never shared with other students (Doc 08 T-10).
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('upload-doc-modal').classList.remove('open')">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-upload" onclick="submitStudyPdfUpload()">Upload to Library</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function handleStudyFileSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  selectedUploadFile = file;
  const statusBox = document.getElementById('upload-file-status');
  const nameEl = document.getElementById('upload-file-name');
  const sizeEl = document.getElementById('upload-file-size');
  const errorBox = document.getElementById('upload-doc-error');

  if (errorBox) errorBox.style.display = 'none';

  if (statusBox && nameEl && sizeEl) {
    nameEl.textContent = file.name;
    sizeEl.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    statusBox.style.display = 'block';
  }
}

async function submitStudyPdfUpload() {
  const inputEl = document.getElementById('study-file-input');
  if (!selectedUploadFile && inputEl && inputEl.files && inputEl.files[0]) {
    selectedUploadFile = inputEl.files[0];
  }

  const errorBox = document.getElementById('upload-doc-error');
  const errorText = document.getElementById('upload-doc-error-text');

  function showModalError(msg) {
    if (errorBox && errorText) {
      errorText.textContent = msg;
      errorBox.style.display = 'flex';
    }
    if (typeof showToast === 'function') showToast(msg, 'error');
  }

  if (!selectedUploadFile) {
    showModalError('Please select a PDF document first.');
    return;
  }

  // Client-side validations
  if (!selectedUploadFile.name.toLowerCase().endsWith('.pdf') && selectedUploadFile.type !== 'application/pdf') {
    showModalError('Only valid PDF documents are allowed (T-11).');
    return;
  }
  if (selectedUploadFile.size > 10 * 1024 * 1024) {
    showModalError('File size exceeds the conservative 10MB limit (T-11).');
    return;
  }

  const btn = document.getElementById('btn-confirm-upload');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Uploading...';
  }

  try {
    if (typeof AriseState.uploadStudyPdf === 'function') {
      await AriseState.uploadStudyPdf(selectedUploadFile);
      selectedUploadFile = null;
      if (inputEl) inputEl.value = '';
      const modal = document.getElementById('upload-doc-modal');
      if (modal) modal.classList.remove('open');
      if (typeof showToast === 'function') {
        showToast('Document uploaded successfully to your private library!', 'success');
      }
      AriseState.notify();
    }
  } catch (err) {
    showModalError('Upload rejected: ' + (err.message || 'Error'));
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Upload to Library';
    }
  }
}
