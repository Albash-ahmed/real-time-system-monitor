"""
Real-Time System Monitor - Backend API
Flask-based REST API for system resource monitoring
Demonstrates OS concepts: Process Management, Memory Management, CPU Scheduling
"""

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import psutil
import platform
import datetime
import csv
import os
from collections import deque
import threading
import time

app = Flask(__name__, 
            template_folder='../frontend/templates',
            static_folder='../frontend/static')
CORS(app)

# Configuration
LOG_FILE = 'system_logs.csv'
ALERT_THRESHOLDS = {
    'cpu': 80.0,
    'memory': 85.0,
    'disk': 90.0
}

# In-memory storage for performance history
performance_history = {
    'cpu': deque(maxlen=60),  # Last 60 data  points
    'memory': deque(maxlen=60),
    'timestamps': deque(maxlen=60)
}

# Alert tracking
active_alerts = []

# ==================== Logging Module ====================
def initialize_log_file():
    """Initialize CSV log file with headers"""
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Timestamp', 'CPU %', 'Memory %', 'Disk %', 
                           'Network Sent (MB)', 'Network Recv (MB)', 'Alerts'])

def log_system_data(cpu_percent, mem_percent, disk_percent, net_sent, net_recv, alerts):
    """Log system performance data to CSV"""
    try:
        with open(LOG_FILE, 'a', newline='') as f:
            writer = csv.writer(f)
            timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            writer.writerow([timestamp, cpu_percent, mem_percent, disk_percent, 
                           net_sent, net_recv, '|'.join(alerts)])
    except Exception as e:
        print(f"Logging error: {e}")

# ==================== Alert Module ====================
def check_alerts(cpu_percent, mem_percent, disk_percent):
    """Check for threshold violations and generate alerts"""
    global active_alerts
    alerts = []
    
    if cpu_percent > ALERT_THRESHOLDS['cpu']:
        alerts.append({
            'type': 'cpu',
            'severity': 'warning',
            'message': f'CPU usage critical: {cpu_percent:.1f}% (threshold: {ALERT_THRESHOLDS["cpu"]}%)',
            'timestamp': datetime.datetime.now().isoformat(),
            'concept': 'CPU Scheduling - High processor utilization detected'
        })
    
    if mem_percent > ALERT_THRESHOLDS['memory']:
        alerts.append({
            'type': 'memory',
            'severity': 'warning',
            'message': f'Memory usage critical: {mem_percent:.1f}% (threshold: {ALERT_THRESHOLDS["memory"]}%)',
            'timestamp': datetime.datetime.now().isoformat(),
            'concept': 'Memory Management - High memory pressure detected'
        })
    
    if disk_percent > ALERT_THRESHOLDS['disk']:
        alerts.append({
            'type': 'disk',
            'severity': 'error',
            'message': f'Disk usage critical: {disk_percent:.1f}% (threshold: {ALERT_THRESHOLDS["disk"]}%)',
            'timestamp': datetime.datetime.now().isoformat(),
            'concept': 'Storage Management - Low disk space'
        })
    
    active_alerts = alerts
    return alerts

# ==================== CPU Monitoring Module ====================
@app.route('/api/cpu')
def get_cpu_info():
    """
    GET /api/cpu - Fetch CPU usage data
    OS Concept: CPU Scheduling & Utilization
    """
    try:
        # Overall CPU usage
        cpu_percent = psutil.cpu_percent(interval=0.5)
        
        # Per-core usage
        per_core = psutil.cpu_percent(interval=0.5, percpu=True)
        
        # CPU frequency
        cpu_freq = psutil.cpu_freq()
        
        # CPU stats
        cpu_stats = psutil.cpu_stats()
        
        # CPU times
        cpu_times = psutil.cpu_times_percent(interval=0.5)
        
        data = {
            'overall_usage': round(cpu_percent, 2),
            'per_core': [round(core, 2) for core in per_core],
            'core_count': psutil.cpu_count(logical=False),
            'logical_count': psutil.cpu_count(logical=True),
            'frequency': {
                'current': round(cpu_freq.current, 2) if cpu_freq else 0,
                'min': round(cpu_freq.min, 2) if cpu_freq else 0,
                'max': round(cpu_freq.max, 2) if cpu_freq else 0
            } if cpu_freq else None,
            'times': {
                'user': round(cpu_times.user, 2),
                'system': round(cpu_times.system, 2),
                'idle': round(cpu_times.idle, 2)
            },
            'context_switches': cpu_stats.ctx_switches,
            'interrupts': cpu_stats.interrupts,
            'os_concept': 'CPU Scheduling: Tracks processor utilization across cores and time'
        }
        
        # Update history
        timestamp = datetime.datetime.now().isoformat()
        performance_history['cpu'].append(cpu_percent)
        performance_history['timestamps'].append(timestamp)
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Memory Monitoring Module ====================
@app.route('/api/memory')
def get_memory_info():
    """
    GET /api/memory - Fetch memory usage data
    OS Concept: Memory Management & Virtual Memory
    """
    try:
        # Virtual memory
        virtual_mem = psutil.virtual_memory()
        
        # Swap memory
        swap_mem = psutil.swap_memory()
        
        data = {
            'virtual': {
                'total': virtual_mem.total,
                'available': virtual_mem.available,
                'used': virtual_mem.used,
                'free': virtual_mem.free,
                'percent': round(virtual_mem.percent, 2),
                'total_gb': round(virtual_mem.total / (1024**3), 2),
                'used_gb': round(virtual_mem.used / (1024**3), 2),
                'available_gb': round(virtual_mem.available / (1024**3), 2)
            },
            'swap': {
                'total': swap_mem.total,
                'used': swap_mem.used,
                'free': swap_mem.free,
                'percent': round(swap_mem.percent, 2),
                'total_gb': round(swap_mem.total / (1024**3), 2) if swap_mem.total > 0 else 0,
                'used_gb': round(swap_mem.used / (1024**3), 2) if swap_mem.used > 0 else 0
            },
            'os_concept': 'Memory Management: Virtual memory, paging, and swap space utilization'
        }
        
        # Update history
        performance_history['memory'].append(virtual_mem.percent)
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Disk Monitoring Module ====================
@app.route('/api/disk')
def get_disk_info():
    """
    GET /api/disk - Fetch disk usage data
    OS Concept: File System & Storage Management
    """
    try:
        partitions = []
        for partition in psutil.disk_partitions():
            try:
                usage = psutil.disk_usage(partition.mountpoint)
                partitions.append({
                    'device': partition.device,
                    'mountpoint': partition.mountpoint,
                    'fstype': partition.fstype,
                    'total': usage.total,
                    'used': usage.used,
                    'free': usage.free,
                    'percent': round(usage.percent, 2),
                    'total_gb': round(usage.total / (1024**3), 2),
                    'used_gb': round(usage.used / (1024**3), 2),
                    'free_gb': round(usage.free / (1024**3), 2)
                })
            except PermissionError:
                continue
        
        # Disk I/O statistics
        disk_io = psutil.disk_io_counters()
        
        data = {
            'partitions': partitions,
            'io_stats': {
                'read_count': disk_io.read_count,
                'write_count': disk_io.write_count,
                'read_bytes': disk_io.read_bytes,
                'write_bytes': disk_io.write_bytes,
                'read_mb': round(disk_io.read_bytes / (1024**2), 2),
                'write_mb': round(disk_io.write_bytes / (1024**2), 2)
            } if disk_io else None,
            'os_concept': 'File System: Storage allocation, I/O operations, and disk management'
        }
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Network Monitoring Module ====================
@app.route('/api/network')
def get_network_info():
    """
    GET /api/network - Fetch network activity data
    OS Concept: Network I/O & Inter-Process Communication
    """
    try:
        net_io = psutil.net_io_counters()
        
        data = {
            'bytes_sent': net_io.bytes_sent,
            'bytes_recv': net_io.bytes_recv,
            'packets_sent': net_io.packets_sent,
            'packets_recv': net_io.packets_recv,
            'sent_mb': round(net_io.bytes_sent / (1024**2), 2),
            'recv_mb': round(net_io.bytes_recv / (1024**2), 2),
            'errors_in': net_io.errin,
            'errors_out': net_io.errout,
            'drop_in': net_io.dropin,
            'drop_out': net_io.dropout,
            'os_concept': 'Network I/O: Data transmission and inter-process communication'
        }
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Process Management Module ====================
@app.route('/api/processes')
def get_processes():
    """
    GET /api/processes - Fetch running processes
    OS Concept: Process Management & Scheduling
    """
    try:
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 
                                        'status', 'create_time', 'num_threads']):
            try:
                pinfo = proc.info
                processes.append({
                    'pid': pinfo['pid'],
                    'name': pinfo['name'],
                    'cpu_percent': round(pinfo['cpu_percent'] or 0, 2),
                    'memory_percent': round(pinfo['memory_percent'] or 0, 2),
                    'status': pinfo['status'],
                    'num_threads': pinfo['num_threads'],
                    'create_time': datetime.datetime.fromtimestamp(
                        pinfo['create_time']
                    ).strftime('%Y-%m-%d %H:%M:%S')
                })
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue
        
        # Sort by CPU usage by default
        processes.sort(key=lambda x: x['cpu_percent'], reverse=True)
        
        data = {
            'processes': processes[:100],  # Return top 100 processes
            'total_count': len(processes),
            'os_concept': 'Process Management: Process scheduling, context switching, and resource allocation'
        }
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/kill-process', methods=['POST'])
def kill_process():
    """
    POST /api/kill-process - Terminate a process safely
    OS Concept: Process Termination & Resource Cleanup
    """
    try:
        data = request.get_json()
        pid = data.get('pid')
        
        if not pid:
            return jsonify({'error': 'PID is required'}), 400
        
        # Check if process exists
        if not psutil.pid_exists(pid):
            return jsonify({'error': 'Process not found'}), 404
        
        # Get process info before termination
        proc = psutil.Process(pid)
        proc_name = proc.name()
        
        # Attempt graceful termination first
        proc.terminate()
        
        # Wait up to 3 seconds for process to terminate
        try:
            proc.wait(timeout=3)
        except psutil.TimeoutExpired:
            # Force kill if still running
            proc.kill()
        
        return jsonify({
            'success': True,
            'message': f'Process {proc_name} (PID: {pid}) terminated successfully',
            'os_concept': 'Process termination triggers resource cleanup and state transition'
        })
    except psutil.NoSuchProcess:
        return jsonify({'error': 'Process not found'}), 404
    except psutil.AccessDenied:
        return jsonify({'error': 'Access denied. Insufficient privileges to terminate process'}), 403
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== System Info Module ====================
@app.route('/api/system-info')
def get_system_info():
    """
    GET /api/system-info - Fetch general system information
    """
    try:
        boot_time = datetime.datetime.fromtimestamp(psutil.boot_time())
        
        data = {
            'platform': platform.system(),
            'platform_release': platform.release(),
            'platform_version': platform.version(),
            'architecture': platform.machine(),
            'processor': platform.processor(),
            'boot_time': boot_time.strftime('%Y-%m-%d %H:%M:%S'),
            'uptime_seconds': int(time.time() - psutil.boot_time())
        }
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Alerts & History Module ====================
@app.route('/api/alerts')
def get_alerts():
    """
    GET /api/alerts - Fetch active alerts
    """
    return jsonify({'alerts': active_alerts})

@app.route('/api/history')
def get_history():
    """
    GET /api/history - Fetch performance history for graphs
    """
    return jsonify({
        'cpu': list(performance_history['cpu']),
        'memory': list(performance_history['memory']),
        'timestamps': list(performance_history['timestamps'])
    })

@app.route('/api/update-thresholds', methods=['POST'])
def update_thresholds():
    """
    POST /api/update-thresholds - Update alert thresholds
    """
    try:
        data = request.get_json()
        if 'cpu' in data:
            ALERT_THRESHOLDS['cpu'] = float(data['cpu'])
        if 'memory' in data:
            ALERT_THRESHOLDS['memory'] = float(data['memory'])
        if 'disk' in data:
            ALERT_THRESHOLDS['disk'] = float(data['disk'])
        
        return jsonify({
            'success': True,
            'thresholds': ALERT_THRESHOLDS
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Background Monitoring ====================
def background_monitor():
    """Background thread for continuous monitoring and logging"""
    while True:
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            mem_percent = psutil.virtual_memory().percent
            disk_percent = psutil.disk_usage('/').percent
            net_io = psutil.net_io_counters()
            
            # Check alerts
            alerts = check_alerts(cpu_percent, mem_percent, disk_percent)
            alert_messages = [alert['message'] for alert in alerts]
            
            # Log data
            log_system_data(
                cpu_percent, 
                mem_percent, 
                disk_percent,
                round(net_io.bytes_sent / (1024**2), 2),
                round(net_io.bytes_recv / (1024**2), 2),
                alert_messages
            )
            
            time.sleep(10)  # Log every 10 seconds
        except Exception as e:
            print(f"Background monitor error: {e}")
            time.sleep(10)

# ==================== Frontend Route ====================
@app.route('/')
def index():
    """Serve the main dashboard"""
    return render_template('index.html')

# ==================== Application Startup ====================
if __name__ == '__main__':
    # Initialize logging
    initialize_log_file()
    
    # Start background monitoring thread
    monitor_thread = threading.Thread(target=background_monitor, daemon=True)
    monitor_thread.start()
    
    print("=" * 60)
    print("Real-Time System Monitor - Starting...")
    print("=" * 60)
    print(f"Platform: {platform.system()} {platform.release()}")
    print(f"CPU Cores: {psutil.cpu_count(logical=False)} physical, {psutil.cpu_count(logical=True)} logical")
    print(f"Total Memory: {round(psutil.virtual_memory().total / (1024**3), 2)} GB")
    print(f"Log File: {LOG_FILE}")
    print("=" * 60)
    print("Server running on http://127.0.0.1:5000")
    print("=" * 60)
    
    # Run Flask app
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
