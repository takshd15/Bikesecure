// Load bike status from localStorage on page load
function loadBikeStatus() {
    const isLocked = localStorage.getItem('bikeLocked');
    
    // Default to locked if not set
    if (isLocked === null) {
        localStorage.setItem('bikeLocked', 'true');
        localStorage.setItem('lastAction', 'locked');
        localStorage.setItem('lastActionTime', '25/09/2025 at 14:46:57');
    }
    
    updateUI();
}

// Toggle bike lock/unlock
function toggleBikeLock() {
    const isLocked = localStorage.getItem('bikeLocked') === 'true';
    const newStatus = !isLocked;
    const action = newStatus ? 'locked' : 'unlocked';
    const timestamp = getCurrentTimestamp();
    
    // Save to localStorage
    localStorage.setItem('bikeLocked', newStatus.toString());
    localStorage.setItem('lastAction', action);
    localStorage.setItem('lastActionTime', timestamp);
    
    // Add to logs
    addLogEntry(action, timestamp);
    
    // Update UI
    updateUI();
}

// Update all UI elements based on current status
function updateUI() {
    const isLocked = localStorage.getItem('bikeLocked') === 'true';
    const lastAction = localStorage.getItem('lastAction') || 'locked';
    const lastActionTime = localStorage.getItem('lastActionTime') || '25/09/2025 at 14:46:57';
    
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    if (isLocked) {
        statusBadge.textContent = 'LOCKED';
        statusBadge.className = 'status-badge locked';
    } else {
        statusBadge.textContent = 'UNLOCKED';
        statusBadge.className = 'status-badge unlocked';
    }
    
    // Update last activity
    const lastActivity = document.getElementById('lastActivity');
    lastActivity.textContent = `Last ${lastAction} on ${lastActionTime}`;
    
    // Update main status title
    const mainStatusTitle = document.getElementById('mainStatusTitle');
    mainStatusTitle.textContent = `Your bike is currently ${isLocked ? 'locked' : 'unlocked'}`;
    
    // Update main status subtitle
    const mainStatusSubtitle = document.getElementById('mainStatusSubtitle');
    mainStatusSubtitle.textContent = isLocked ? 'Your bike is secure and protected' : 'Your bike is ready to use';
    
    // Update button texts
    const btnTextSmall = document.getElementById('btnTextSmall');
    const btnTextMain = document.getElementById('btnTextMain');
    btnTextSmall.textContent = isLocked ? 'Unlock Bike' : 'Lock Bike';
    btnTextMain.textContent = isLocked ? 'Unlock My Bike' : 'Lock My Bike';
    
    // Update toggle description
    const toggleDescription = document.getElementById('toggleDescription');
    toggleDescription.textContent = isLocked ? 'Click to unlock your bike remotely' : 'Click to lock your bike remotely';
    
    // Update lock icon
    updateLockIcon(isLocked);
    
    // Update main card background
    const mainStatusCard = document.getElementById('mainStatusCard');
    if (isLocked) {
        mainStatusCard.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)';
    } else {
        mainStatusCard.style.background = 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)';
    }
    
    // Update lock icon background
    const lockIconBg = document.getElementById('lockIconBg');
    if (isLocked) {
        lockIconBg.style.backgroundColor = '#fef2f2';
    } else {
        lockIconBg.style.backgroundColor = '#dcfce7';
    }
}

// Update the lock icon SVG
function updateLockIcon(isLocked) {
    const lockIcon = document.getElementById('lockIcon');
    const color = isLocked ? '#ef4444' : '#22c55e';
    
    if (isLocked) {
        lockIcon.innerHTML = `
            <path d="M12 20V16a12 12 0 0 1 24 0v4" stroke="${color}" stroke-width="3"/>
            <rect x="8" y="20" width="32" height="20" rx="4" fill="${color}"/>
            <circle cx="24" cy="30" r="3" fill="white"/>
            <path d="M24 33v3" stroke="white" stroke-width="2"/>
        `;
    } else {
        lockIcon.innerHTML = `
            <path d="M12 20V16a12 12 0 0 1 24 0" stroke="${color}" stroke-width="3"/>
            <rect x="8" y="20" width="32" height="20" rx="4" fill="${color}"/>
            <circle cx="24" cy="30" r="3" fill="white"/>
            <path d="M24 33v3" stroke="white" stroke-width="2"/>
        `;
    }
}

// Get current timestamp
function getCurrentTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
}

// Add log entry to localStorage
function addLogEntry(action, timestamp) {
    let logs = JSON.parse(localStorage.getItem('bikeLogs') || '[]');
    
    logs.unshift({
        action: action,
        timestamp: timestamp,
        location: 'Dashboard'
    });
    
    // Keep only last 50 logs
    if (logs.length > 50) {
        logs = logs.slice(0, 50);
    }
    
    localStorage.setItem('bikeLogs', JSON.stringify(logs));
}

// Initialize logs with some hardcoded data if empty
function initializeLogs() {
    const logs = localStorage.getItem('bikeLogs');
    if (!logs || JSON.parse(logs).length === 0) {
        const defaultLogs = [
            { action: 'locked', timestamp: '25/09/2025 at 14:46:57', location: 'Dashboard' },
            { action: 'unlocked', timestamp: '25/09/2025 at 12:30:15', location: 'Mobile App' },
            { action: 'locked', timestamp: '25/09/2025 at 09:15:42', location: 'Dashboard' },
            { action: 'unlocked', timestamp: '24/09/2025 at 18:22:33', location: 'Dashboard' },
            { action: 'locked', timestamp: '24/09/2025 at 16:45:10', location: 'Mobile App' },
            { action: 'unlocked', timestamp: '24/09/2025 at 14:30:25', location: 'Dashboard' },
            { action: 'locked', timestamp: '24/09/2025 at 09:05:18', location: 'Dashboard' },
            { action: 'unlocked', timestamp: '23/09/2025 at 17:55:40', location: 'Dashboard' },
            { action: 'locked', timestamp: '23/09/2025 at 15:20:12', location: 'Mobile App' },
            { action: 'unlocked', timestamp: '23/09/2025 at 13:10:05', location: 'Dashboard' }
        ];
        localStorage.setItem('bikeLogs', JSON.stringify(defaultLogs));
    }
}

// Initialize logs on first load
initializeLogs();
