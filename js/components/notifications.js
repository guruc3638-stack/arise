/* ==========================================================================
   ARISE NOTIFICATION CENTER (SCREEN W)
   Friend Requests, Judge Confirmations, Rank Movement
   ========================================================================== */

function toggleNotificationsDrawer() {
  let drawer = document.getElementById('arise-notifications-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'arise-notifications-drawer';
    drawer.className = 'modal-backdrop';
    document.body.appendChild(drawer);
  }

  const unreadCount = ARISE_DATA.notifications.filter(n => !n.read).length;

  drawer.innerHTML = `
    <div class="modal-window" style="max-width: 460px; height: 90vh; display: flex; flex-direction: column;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <h3 style="font-size: 16px; font-weight: 600;">Notifications</h3>
          ${unreadCount > 0 ? `<span class="badge" style="background: rgba(139,92,246,0.2); color: #C4B5FD;">${unreadCount} New</span>` : ''}
        </div>
        <button class="btn btn-ghost btn-sm" onclick="closeNotificationsDrawer()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div style="flex: 1; overflow-y: auto; padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3);">
        ${ARISE_DATA.notifications.map(n => `
          <div style="padding: 14px; border-radius: var(--radius-md); background: ${n.read ? 'rgba(255,255,255,0.03)' : 'rgba(139,92,246,0.08)'}; border: 1px solid ${n.read ? 'var(--border-subtle)' : 'rgba(139,92,246,0.25)'}; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-weight: 600; font-size: 13.5px; color: ${n.read ? 'var(--text-secondary)' : 'var(--text-primary)'};">${n.title}</span>
              <span style="font-size: 11px; color: var(--text-muted);">${n.time}</span>
            </div>
            <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">${n.body}</p>

            ${n.type === 'friend_request' && !n.read ? `
              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button class="btn btn-primary btn-sm" onclick="acceptFriendRequest('${n.id}', '${n.senderUid}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Accept Request
                </button>
                <button class="btn btn-ghost btn-sm" onclick="declineFriendRequest('${n.id}')">
                  Decline
                </button>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <div class="modal-footer" style="justify-content: space-between; font-size: 12px; color: var(--text-muted);">
        <span>Privacy & mutual consent enforced</span>
        <button class="btn btn-ghost btn-sm" onclick="markAllNotificationsRead()">Mark all as read</button>
      </div>
    </div>
  `;

  drawer.classList.add('open');

  drawer.onclick = (e) => {
    if (e.target === drawer) closeNotificationsDrawer();
  };
}

function closeNotificationsDrawer() {
  const drawer = document.getElementById('arise-notifications-drawer');
  if (drawer) drawer.classList.remove('open');
}

function acceptFriendRequest(notifId, senderUid) {
  const notif = ARISE_DATA.notifications.find(n => n.id === notifId);
  if (notif) notif.read = true;

  // Add friend to active friends list
  const pending = ARISE_DATA.pendingRequests.find(p => p.uid === senderUid);
  if (pending) {
    ARISE_DATA.friends.push({
      uid: pending.uid,
      displayName: pending.displayName,
      college: pending.college,
      verifiedXp: pending.verifiedXp,
      friendRank: ARISE_DATA.friends.length + 1,
      mv: "—",
      solved: { total: 39, easy: 21, medium: 15, hard: 3 },
      topics: { arrays: 22, trees: 12, graphs: 10, dp: 8 },
      avatar: "AM",
      dsaVisibility: "public"
    });
    // Remove from pending
    ARISE_DATA.pendingRequests = ARISE_DATA.pendingRequests.filter(p => p.uid !== senderUid);
  }

  showToast(`Friend request accepted! You are now friends with Aniket More.`, 'success');
  closeNotificationsDrawer();
  AriseState.notify();
}

function declineFriendRequest(notifId) {
  const notif = ARISE_DATA.notifications.find(n => n.id === notifId);
  if (notif) notif.read = true;
  showToast('Friend request declined.', 'info');
  closeNotificationsDrawer();
  AriseState.notify();
}

function markAllNotificationsRead() {
  ARISE_DATA.notifications.forEach(n => n.read = true);
  showToast('All notifications marked as read', 'info');
  closeNotificationsDrawer();
  AriseState.notify();
}
