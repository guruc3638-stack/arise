/* ==========================================================================
   ARISE NOTIFICATION CENTER (SCREEN W)
   Friend Requests (Sent & Received with UIDs), Milestones & Judge Solves
   ========================================================================== */

function toggleNotificationsDrawer() {
  let drawer = document.getElementById('arise-notifications-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'arise-notifications-drawer';
    drawer.className = 'modal-backdrop';
    document.body.appendChild(drawer);
  }

  const notifs = (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) 
    ? ARISE_DATA.notifications 
    : [];
  const unreadCount = notifs.filter(n => !n.read).length;

  drawer.innerHTML = `
    <div class="modal-window" style="max-width: 480px; height: 90vh; display: flex; flex-direction: column; background: #0B0F19; border: 1px solid var(--border-default); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
      <div class="modal-header" style="padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <h3 style="font-size: 17px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">Notifications</h3>
          ${unreadCount > 0 ? `<span class="badge" style="background: rgba(139,92,246,0.25); color: #DDD6FE; font-size: 11px; padding: 2px 8px;">${unreadCount} New</span>` : ''}
        </div>
        <button class="btn btn-ghost btn-sm" onclick="closeNotificationsDrawer()" style="padding: 4px 8px; color: var(--text-muted);" title="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
        ${notifs.length === 0 ? `
          <div style="padding: 48px 24px; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.25); display: flex; align-items: center; justify-content: center; font-size: 24px;">
              🔔
            </div>
            <div style="font-weight: 700; color: #FFFFFF; font-size: 15px;">No notifications yet</div>
            <p style="font-size: 12.5px; color: var(--text-secondary); max-width: 300px; line-height: 1.5; margin: 0;">
              When you send friend requests to student IDs, connect with peers, or conquer solve & course milestones, notifications will appear here.
            </p>
          </div>
        ` : notifs.map(n => {
          let badgeHtml = '';
          let iconHtml = '🔔';
          let borderHighlight = n.read ? 'var(--border-subtle)' : 'rgba(139,92,246,0.3)';
          let bgHighlight = n.read ? 'rgba(255,255,255,0.02)' : 'rgba(139,92,246,0.06)';

          if (n.type === 'friend_request_sent') {
            iconHtml = '📤';
            badgeHtml = `<span class="badge" style="background: rgba(56,189,248,0.15); color: #38BDF8; font-family: var(--font-mono); font-size: 11px;">Sent to: ${escapeNotifText(n.recipientUid || 'Student')}</span>`;
          } else if (n.type === 'friend_request') {
            iconHtml = '👤';
            badgeHtml = `<span class="badge" style="background: rgba(139,92,246,0.15); color: #C4B5FD; font-family: var(--font-mono); font-size: 11px;">From ID: ${escapeNotifText(n.senderUid || 'Student')}</span>`;
            if (!n.read) borderHighlight = 'rgba(139,92,246,0.4)';
          } else if (n.type === 'friend_added') {
            iconHtml = '🤝';
            badgeHtml = `<span class="badge" style="background: rgba(52,211,153,0.15); color: #34D399; font-family: var(--font-mono); font-size: 11px;">Connected ID: ${escapeNotifText(n.senderUid || 'Peer')}</span>`;
          } else if (n.type === 'milestone') {
            iconHtml = '🏆';
            badgeHtml = `<span class="badge" style="background: rgba(245,158,11,0.15); color: #FBBF24; font-size: 11px; font-weight: 700;">Milestone</span>`;
            if (!n.read) borderHighlight = 'rgba(245,158,11,0.4)';
          } else if (n.type === 'solve_success') {
            iconHtml = '⚡';
            badgeHtml = `<span class="badge" style="background: rgba(16,185,129,0.15); color: #10B981; font-size: 11px;">Judge Verified</span>`;
          } else if (n.type === 'course_completion') {
            iconHtml = '🎓';
            badgeHtml = `<span class="badge" style="background: rgba(139,92,246,0.15); color: #C4B5FD; font-size: 11px; font-weight: 700;">Track Certified</span>`;
            if (!n.read) borderHighlight = 'rgba(139,92,246,0.45)';
          } else if (n.type === 'badge_unlocked') {
            iconHtml = '🎖️';
            badgeHtml = `<span class="badge" style="background: rgba(236,72,153,0.15); color: #F472B6; font-size: 11px;">Achievement</span>`;
          } else if (n.type === 'rank_update') {
            iconHtml = '📈';
            badgeHtml = `<span class="badge" style="background: rgba(245,158,11,0.15); color: #FBBF24; font-size: 11px;">Leaderboard</span>`;
          }

          return `
            <div class="notif-item-card" onclick="markNotificationRead('${n.id}')" style="padding: 14px; border-radius: var(--radius-md); background: ${bgHighlight}; border: 1px solid ${borderHighlight}; display: flex; flex-direction: column; gap: 8px; cursor: pointer; transition: background 0.15s ease;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span style="font-size: 16px;">${iconHtml}</span>
                  <span style="font-weight: 700; font-size: 13.5px; color: ${n.read ? 'var(--text-secondary)' : '#FFFFFF'};">${escapeNotifText(n.title)}</span>
                  ${badgeHtml}
                </div>
                <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); white-space: nowrap;">${n.time || 'Just now'}</span>
              </div>
              <p style="font-size: 12.5px; color: ${n.read ? 'var(--text-muted)' : 'var(--text-primary)'}; line-height: 1.5; margin: 0;">${escapeNotifText(n.body)}</p>

              ${n.type === 'friend_request' && !n.read ? `
                <div style="display: flex; gap: 8px; margin-top: 6px;" onclick="event.stopPropagation()">
                  <button class="btn btn-primary btn-sm" onclick="acceptFriendRequest('${n.id}', '${n.senderUid || ''}', '${n.requestId || ''}')" style="font-size: 12px; padding: 4px 10px;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Accept Request
                  </button>
                  <button class="btn btn-ghost btn-sm" onclick="declineFriendRequest('${n.id}', '${n.requestId || ''}')" style="font-size: 12px; padding: 4px 10px; color: var(--text-muted);">
                    Decline
                  </button>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <div class="modal-footer" style="padding: 12px 20px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-muted);">
        <span>Privacy & verified activity only</span>
        <button class="btn btn-ghost btn-sm" onclick="markAllNotificationsRead()" style="font-size: 12px;">Mark all as read</button>
      </div>
    </div>
  `;

  drawer.classList.add('open');

  drawer.onclick = (e) => {
    if (e.target === drawer) closeNotificationsDrawer();
  };
}

function escapeNotifText(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function closeNotificationsDrawer() {
  const drawer = document.getElementById('arise-notifications-drawer');
  if (drawer) drawer.classList.remove('open');
}

async function acceptFriendRequest(notifId, senderUid, requestId = null) {
  if (typeof AriseState !== 'undefined' && typeof AriseState.acceptFriendRequest === 'function') {
    try {
      await AriseState.acceptFriendRequest(requestId || notifId, senderUid);
      showToast(`Friend request accepted from ${senderUid || 'student'}!`, 'success');
    } catch (e) {
      showToast(e.message || 'Could not accept friend request', 'error');
    }
  } else {
    // Fallback mark as read
    markNotificationRead(notifId);
    showToast(`Friend request accepted from ${senderUid || 'student'}!`, 'success');
  }
  closeNotificationsDrawer();
}

async function declineFriendRequest(notifId, requestId = null) {
  if (typeof AriseState !== 'undefined' && typeof AriseState.declineFriendRequest === 'function') {
    try {
      await AriseState.declineFriendRequest(requestId || notifId);
      showToast('Friend request declined.', 'info');
    } catch (e) {
      showToast(e.message || 'Could not decline friend request', 'error');
    }
  } else {
    markNotificationRead(notifId);
    showToast('Friend request declined.', 'info');
  }
  closeNotificationsDrawer();
}

function markNotificationRead(notifId) {
  if (typeof AriseState !== 'undefined' && typeof AriseState.markNotificationRead === 'function') {
    AriseState.markNotificationRead(notifId);
  } else if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) {
    const notif = ARISE_DATA.notifications.find(n => n.id === notifId);
    if (notif) notif.read = true;
    if (typeof AriseState !== 'undefined' && typeof AriseState.notify === 'function') AriseState.notify();
  }
}

function markAllNotificationsRead() {
  if (typeof AriseState !== 'undefined' && typeof AriseState.markAllNotificationsRead === 'function') {
    AriseState.markAllNotificationsRead();
  } else if (typeof ARISE_DATA !== 'undefined' && Array.isArray(ARISE_DATA.notifications)) {
    ARISE_DATA.notifications.forEach(n => n.read = true);
    if (typeof AriseState !== 'undefined' && typeof AriseState.notify === 'function') AriseState.notify();
  }
  showToast('All notifications marked as read', 'info');
  closeNotificationsDrawer();
}
