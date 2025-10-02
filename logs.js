// Load and display logs
function loadLogs() {
    const logs = JSON.parse(localStorage.getItem('bikeLogs') || '[]');
    const logsTableBody = document.getElementById('logsTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (logs.length === 0) {
        logsTableBody.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    
    logsTableBody.innerHTML = logs.map((log, index) => `
        <tr>
            <td>
                <div class="log-action">
                    <div class="log-icon ${log.action}">
                        ${log.action === 'locked' ? `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.5"/>
                                <rect x="2" y="7" width="12" height="7" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
                            </svg>
                        ` : `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7V5a4 4 0 0 1 8 0" stroke="currentColor" stroke-width="1.5"/>
                                <rect x="2" y="7" width="12" height="7" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
                            </svg>
                        `}
                    </div>
                    <span class="log-action-text">${capitalizeFirst(log.action)}</span>
                </div>
            </td>
            <td class="log-timestamp">${log.timestamp}</td>
            <td class="log-location">${log.location}</td>
            <td>
                <span class="log-status-badge ${log.action}">
                    ${log.action === 'locked' ? 'Secured' : 'Active'}
                </span>
            </td>
        </tr>
    `).join('');
}

// Clear all logs
function clearLogs() {
    if (confirm('Are you sure you want to clear all activity logs? This action cannot be undone.')) {
        localStorage.setItem('bikeLogs', '[]');
        loadLogs();
    }
}

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Refresh logs every 5 seconds
setInterval(loadLogs, 5000);
