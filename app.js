// ==================== Configuration ====================
const API_BASE_URL = window.location.origin;
let refreshInterval = 2000; // Default 2 seconds
let refreshTimer = null;
let cpuChart = null;
let memoryChart = null;

// Process data storage
let allProcesses = [];
let currentSort = 'cpu';

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('System Monitor initializing...');
    
    // Load theme preference
    loadTheme();
    
    // Initialize charts
    initializeCharts();
    
    // Initial data fetch
    fetchAllData();
    
    // Start auto-refresh
    startAutoRefresh();
    
    // Setup search listener
    document.getElementById('process-search').addEventListener('input', filterProcesses);
    
    console.log('System Monitor initialized successfully');
});

// ==================== Theme Management ====================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    document.getElementById('theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Update charts
    updateChartTheme();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        gridColor: isDark ? '#334155' : '#e2e8f0',
        textColor: isDark ? '#94a3b8' : '#718096',
        cpuColor: '#3b82f6',
        memoryColor: '#8b5cf6'
    };
}

// ==================== Chart Initialization ====================
function initializeCharts() {
    const colors = getChartColors();
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: colors.textColor,
                    callback: function(value) {
                        return value + '%';
                    }
                },
                grid: {
                    color: colors.gridColor
                }
            }
        },
        animation: {
            duration: 750
        }
    };
    
    // CPU Chart
    const cpuCtx = document.getElementById('cpu-chart').getContext('2d');
    cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'CPU Usage %',
                data: [],
                borderColor: colors.cpuColor,
                backgroundColor: colors.cpuColor + '20',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: commonOptions
    });
    
    // Memory Chart
    const memoryCtx = document.getElementById('memory-chart').getContext('2d');
    memoryChart = new Chart(memoryCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Memory Usage %',
                data: [],
                borderColor: colors.memoryColor,
                backgroundColor: colors.memoryColor + '20',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: commonOptions
    });
}

function updateChartTheme() {
    const colors = getChartColors();
    
    // Update CPU chart
    if (cpuChart) {
        cpuChart.options.scales.y.ticks.color = colors.textColor;
        cpuChart.options.scales.y.grid.color = colors.gridColor;
        cpuChart.data.datasets[0].borderColor = colors.cpuColor;
        cpuChart.data.datasets[0].backgroundColor = colors.cpuColor + '20';
        cpuChart.update();
    }
    
    // Update Memory chart
    if (memoryChart) {
        memoryChart.options.scales.y.ticks.color = colors.textColor;
        memoryChart.options.scales.y.grid.color = colors.gridColor;
        memoryChart.data.datasets[0].borderColor = colors.memoryColor;
        memoryChart.data.datasets[0].backgroundColor = colors.memoryColor + '20';
        memoryChart.update();
    }
}

// ==================== Auto-Refresh Management ====================
function startAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
    refreshTimer = setInterval(fetchAllData, refreshInterval);
}

function updateRefreshInterval() {
    refreshInterval = parseInt(document.getElementById('refresh-interval').value);
    startAutoRefresh();
    console.log('Refresh interval updated to:', refreshInterval, 'ms');
}

function manualRefresh() {
    fetchAllData();
    console.log('Manual refresh triggered');
}

// ==================== Data Fetching ====================
async function fetchAllData() {
    try {
        await Promise.all([
            fetchSystemInfo(),
            fetchCPUData(),
            fetchMemoryData(),
            fetchDiskData(),
            fetchNetworkData(),
            fetchProcesses(),
            fetchAlerts(),
            updatePerformanceHistory()
        ]);
        
        // Update last updated timestamp
        const now = new Date();
        document.getElementById('last-updated').textContent = 
            now.toLocaleTimeString();
            
    } catch (error) {
        console.error('Error fetching data:', error);
        showAlert('Error fetching system data. Please check the backend connection.', 'error');
    }
}

async function fetchSystemInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/system-info`);
        const data = await response.json();
        
        document.getElementById('platform').textContent = 
            `${data.platform} ${data.platform_release}`;
        
        // Calculate uptime
        const uptimeSeconds = data.uptime_seconds;
        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        
        document.getElementById('uptime').textContent = 
            `${days}d ${hours}h ${minutes}m`;
            
    } catch (error) {
        console.error('Error fetching system info:', error);
    }
}

async function fetchCPUData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cpu`);
        const data = await response.json();
        
        // Update overall CPU usage
        const cpuPercent = data.overall_usage;
        document.getElementById('cpu-percent').textContent = `${cpuPercent}%`;
        
        // Update progress bar
        const cpuProgress = document.getElementById('cpu-progress');
        cpuProgress.style.width = `${cpuPercent}%`;
        cpuProgress.setAttribute('data-level', getUsageLevel(cpuPercent));
        
        // Update CPU details
        document.getElementById('cpu-cores').textContent = data.core_count;
        document.getElementById('cpu-logical').textContent = data.logical_count;
        
        if (data.frequency) {
            document.getElementById('cpu-freq').textContent = 
                `${data.frequency.current} MHz`;
        }
        
        // Update per-core usage
        updateCoreUsage(data.per_core);
        
    } catch (error) {
        console.error('Error fetching CPU data:', error);
    }
}

async function fetchMemoryData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/memory`);
        const data = await response.json();
        
        const memPercent = data.virtual.percent;
        document.getElementById('memory-percent').textContent = `${memPercent}%`;
        
        // Update progress bar
        const memProgress = document.getElementById('memory-progress');
        memProgress.style.width = `${memPercent}%`;
        memProgress.setAttribute('data-level', getUsageLevel(memPercent));
        
        // Update memory details
        document.getElementById('memory-total').textContent = 
            `${data.virtual.total_gb} GB`;
        document.getElementById('memory-used').textContent = 
            `${data.virtual.used_gb} GB`;
        document.getElementById('memory-available').textContent = 
            `${data.virtual.available_gb} GB`;
            
    } catch (error) {
        console.error('Error fetching memory data:', error);
    }
}

async function fetchDiskData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/disk`);
        const data = await response.json();
        
        if (data.partitions && data.partitions.length > 0) {
            // Use first partition (usually main drive)
            const mainDisk = data.partitions[0];
            
            document.getElementById('disk-percent').textContent = 
                `${mainDisk.percent}%`;
            
            // Update progress bar
            const diskProgress = document.getElementById('disk-progress');
            diskProgress.style.width = `${mainDisk.percent}%`;
            diskProgress.setAttribute('data-level', getUsageLevel(mainDisk.percent));
            
            // Update disk details
            document.getElementById('disk-total').textContent = 
                `${mainDisk.total_gb} GB`;
            document.getElementById('disk-used').textContent = 
                `${mainDisk.used_gb} GB`;
            document.getElementById('disk-free').textContent = 
                `${mainDisk.free_gb} GB`;
        }
        
    } catch (error) {
        console.error('Error fetching disk data:', error);
    }
}

async function fetchNetworkData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/network`);
        const data = await response.json();
        
        document.getElementById('network-sent').textContent = 
            `${data.sent_mb.toFixed(2)} MB`;
        document.getElementById('network-recv').textContent = 
            `${data.recv_mb.toFixed(2)} MB`;
        
        document.getElementById('packets-sent').textContent = 
            data.packets_sent.toLocaleString();
        document.getElementById('packets-recv').textContent = 
            data.packets_recv.toLocaleString();
            
    } catch (error) {
        console.error('Error fetching network data:', error);
    }
}

async function fetchProcesses() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/processes`);
        const data = await response.json();
        
        allProcesses = data.processes;
        displayProcesses(allProcesses);
        
    } catch (error) {
        console.error('Error fetching processes:', error);
    }
}

async function fetchAlerts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/alerts`);
        const data = await response.json();
        
        if (data.alerts && data.alerts.length > 0) {
            displayAlerts(data.alerts);
        } else {
            hideAlerts();
        }
        
    } catch (error) {
        console.error('Error fetching alerts:', error);
    }
}

async function updatePerformanceHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/history`);
        const data = await response.json();
        
        if (data.cpu && data.cpu.length > 0) {
            // Update CPU chart
            cpuChart.data.labels = data.timestamps.map((_, i) => i);
            cpuChart.data.datasets[0].data = data.cpu;
            cpuChart.update('none'); // No animation for smoother updates
            
            // Update Memory chart
            memoryChart.data.labels = data.timestamps.map((_, i) => i);
            memoryChart.data.datasets[0].data = data.memory;
            memoryChart.update('none');
        }
        
    } catch (error) {
        console.error('Error updating performance history:', error);
    }
}

// ==================== Display Functions ====================
function updateCoreUsage(coreData) {
    const container = document.getElementById('core-usage-container');
    container.innerHTML = '';
    
    coreData.forEach((usage, index) => {
        const coreDiv = document.createElement('div');
        coreDiv.className = 'core-item';
        coreDiv.innerHTML = `
            <div class="core-label">Core ${index}</div>
            <div class="core-value">${usage}%</div>
        `;
        container.appendChild(coreDiv);
    });
}

function displayProcesses(processes) {
    const tbody = document.getElementById('process-tbody');
    tbody.innerHTML = '';
    
    // Limit to top 50 processes for performance
    const displayProcesses = processes.slice(0, 50);
    
    displayProcesses.forEach(proc => {
        const row = document.createElement('tr');
        
        // Highlight high usage
        const cpuClass = proc.cpu_percent > 50 ? 'high-usage' : '';
        const memClass = proc.memory_percent > 50 ? 'high-usage' : '';
        
        // Status badge
        let statusClass = 'status-other';
        if (proc.status === 'running') statusClass = 'status-running';
        else if (proc.status === 'sleeping') statusClass = 'status-sleeping';
        
        row.innerHTML = `
            <td>${proc.pid}</td>
            <td title="${proc.name}">${truncateText(proc.name, 30)}</td>
            <td class="${cpuClass}">${proc.cpu_percent}%</td>
            <td class="${memClass}">${proc.memory_percent.toFixed(2)}%</td>
            <td><span class="status-badge ${statusClass}">${proc.status}</span></td>
            <td>${proc.num_threads}</td>
            <td>${proc.create_time}</td>
            <td>
                <button class="btn btn-danger" onclick="killProcess(${proc.pid}, '${proc.name}')">
                    Kill
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    document.getElementById('process-count').textContent = processes.length;
}

function displayAlerts(alerts) {
    const banner = document.getElementById('alert-banner');
    const messages = alerts.map(alert => alert.message).join(' | ');
    banner.textContent = '⚠️ ' + messages;
    banner.classList.remove('hidden');
}

function hideAlerts() {
    const banner = document.getElementById('alert-banner');
    banner.classList.add('hidden');
}

function showAlert(message, type = 'info') {
    const banner = document.getElementById('alert-banner');
    banner.textContent = message;
    banner.style.background = type === 'error' ? '#ef4444' : '#3b82f6';
    banner.classList.remove('hidden');
    
    setTimeout(() => {
        banner.classList.add('hidden');
    }, 5000);
}

// ==================== Process Management ====================
function sortProcesses() {
    currentSort = document.getElementById('sort-by').value;
    
    let sortedProcesses = [...allProcesses];
    
    switch(currentSort) {
        case 'cpu':
            sortedProcesses.sort((a, b) => b.cpu_percent - a.cpu_percent);
            break;
        case 'memory':
            sortedProcesses.sort((a, b) => b.memory_percent - a.memory_percent);
            break;
        case 'name':
            sortedProcesses.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'pid':
            sortedProcesses.sort((a, b) => a.pid - b.pid);
            break;
    }
    
    displayProcesses(sortedProcesses);
}

function filterProcesses() {
    const searchTerm = document.getElementById('process-search').value.toLowerCase();
    
    if (!searchTerm) {
        displayProcesses(allProcesses);
        return;
    }
    
    const filtered = allProcesses.filter(proc => {
        return proc.name.toLowerCase().includes(searchTerm) ||
               proc.pid.toString().includes(searchTerm);
    });
    
    displayProcesses(filtered);
}

async function killProcess(pid, name) {
    const confirmed = confirm(
        `Are you sure you want to terminate process "${name}" (PID: ${pid})?\n\n` +
        `This action cannot be undone and may cause data loss or system instability.`
    );
    
    if (!confirmed) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/kill-process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pid })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showAlert(`✓ ${data.message}`, 'success');
            // Refresh process list
            fetchProcesses();
        } else {
            showAlert(`✗ Failed to kill process: ${data.error}`, 'error');
        }
        
    } catch (error) {
        console.error('Error killing process:', error);
        showAlert('✗ Error communicating with server', 'error');
    }
}

// ==================== Threshold Management ====================
async function updateThresholds() {
    const cpuThreshold = document.getElementById('cpu-threshold').value;
    const memoryThreshold = document.getElementById('memory-threshold').value;
    const diskThreshold = document.getElementById('disk-threshold').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/update-thresholds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpu: parseFloat(cpuThreshold),
                memory: parseFloat(memoryThreshold),
                disk: parseFloat(diskThreshold)
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showAlert('✓ Alert thresholds updated successfully', 'success');
        } else {
            showAlert('✗ Failed to update thresholds', 'error');
        }
        
    } catch (error) {
        console.error('Error updating thresholds:', error);
        showAlert('✗ Error communicating with server', 'error');
    }
}

// ==================== Utility Functions ====================
function getUsageLevel(percent) {
    if (percent < 60) return 'low';
    if (percent < 80) return 'medium';
    return 'high';
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// ==================== Error Handling ====================
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// ==================== Cleanup on page unload ====================
window.addEventListener('beforeunload', function() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
});

console.log('System Monitor JavaScript loaded successfully');
