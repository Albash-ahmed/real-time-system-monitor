# System Monitor - Detailed Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Operating System Concepts](#operating-system-concepts)
3. [Architecture & Design](#architecture--design)
4. [API Documentation](#api-documentation)
5. [Frontend Implementation](#frontend-implementation)
6. [Backend Implementation](#backend-implementation)
7. [Data Flow](#data-flow)
8. [Performance Optimization](#performance-optimization)

---

## Introduction

This Real-Time System Monitor is an educational project designed to demonstrate fundamental Operating System concepts through a practical, interactive application. It bridges theoretical OS knowledge with real-world system monitoring.

### Project Goals
- Visualize OS resource management in real-time
- Demonstrate process lifecycle and management
- Show memory allocation and virtual memory concepts
- Illustrate CPU scheduling and time-sharing
- Provide hands-on experience with system programming

---

## Operating System Concepts

### 1. Process Management

#### What is a Process?
A process is a program in execution. It includes:
- **Program Code** (text section)
- **Program Counter** (current activity)
- **Stack** (temporary data)
- **Data Section** (global variables)
- **Heap** (dynamically allocated memory)

#### Process States
```
NEW → READY → RUNNING → WAITING → TERMINATED
```

- **NEW**: Process is being created
- **READY**: Process is waiting to be assigned to CPU
- **RUNNING**: Instructions are being executed
- **WAITING**: Process is waiting for I/O or event
- **TERMINATED**: Process has finished execution

#### In Our Monitor
- We display all processes with their current state
- PID (Process ID) uniquely identifies each process
- CPU% shows how much processor time the process consumes
- Memory% shows the process's memory footprint
- Status field shows current process state

#### Process Termination
When we terminate a process:
1. OS sends SIGTERM (graceful shutdown request)
2. Process cleans up resources (close files, free memory)
3. If process doesn't respond, OS sends SIGKILL (force kill)
4. OS reclaims all resources (memory, file descriptors, etc.)

### 2. CPU Scheduling

#### What is CPU Scheduling?
CPU scheduling determines which process runs when. The OS scheduler:
- Decides which process gets CPU time
- Implements algorithms like Round-Robin, Priority Scheduling
- Manages context switching between processes

#### Context Switching
When CPU switches from one process to another:
1. Save state of current process (registers, program counter)
2. Load state of next process
3. Resume execution of next process

**Cost**: Context switches take time (overhead)

#### In Our Monitor
- **Overall CPU Usage**: % of time CPU is actively executing
- **Per-Core Usage**: Shows load distribution across cores
- **Context Switches**: Number of times OS switched processes
- **Interrupts**: Hardware interrupts handled by OS

#### Multi-Core Processing
Modern CPUs have multiple cores:
- Each core can execute a different process simultaneously
- OS scheduler distributes processes across cores
- Our monitor shows usage per core to visualize load balancing

### 3. Memory Management

#### Virtual Memory
Virtual memory provides:
- **Abstraction**: Each process thinks it has entire memory
- **Isolation**: Processes cannot access each other's memory
- **Larger Address Space**: Can use disk as "virtual RAM"

#### Memory Hierarchy
```
CPU Registers (fastest, smallest)
    ↓
L1 Cache
    ↓
L2 Cache
    ↓
L3 Cache
    ↓
Main Memory (RAM)
    ↓
Swap Space (slowest, largest)
```

#### Paging
- Memory divided into fixed-size pages (typically 4KB)
- OS maps virtual pages to physical page frames
- Page table tracks this mapping

#### In Our Monitor
- **Total Memory**: Physical RAM installed
- **Used Memory**: Currently allocated to processes
- **Available Memory**: Free + cached memory
- **Swap Space**: Disk-based overflow when RAM is full

#### Memory Pressure
When system runs low on memory:
1. OS starts paging (moving pages to disk)
2. Performance degrades (disk is much slower than RAM)
3. Eventually may trigger OOM (Out of Memory) killer
4. OOM killer terminates processes to free memory

### 4. File Systems

#### File System Structure
```
/ (root)
├── bin/        (binaries)
├── etc/        (configuration)
├── home/       (user data)
├── var/        (variable data)
└── tmp/        (temporary files)
```

#### Disk I/O Operations
- **Read**: Fetch data from disk to memory
- **Write**: Store data from memory to disk
- **Buffering**: OS caches frequently accessed data
- **Scheduling**: OS orders disk operations for efficiency

#### In Our Monitor
- **Disk Usage**: Total, used, free space per partition
- **Read/Write Bytes**: Total data transferred to/from disk
- **Read/Write Count**: Number of I/O operations
- **Partitions**: Different file systems mounted

### 5. Network I/O

#### Network Communication
- Processes communicate over network using sockets
- Data broken into packets (typically 1500 bytes)
- OS handles packet transmission and reception

#### Protocol Layers
```
Application Layer (HTTP, FTP, etc.)
    ↓
Transport Layer (TCP, UDP)
    ↓
Network Layer (IP)
    ↓
Data Link Layer (Ethernet, WiFi)
```

#### In Our Monitor
- **Bytes Sent/Received**: Total network traffic
- **Packets Sent/Received**: Number of packets transmitted
- **Errors**: Failed transmissions
- **Drops**: Packets discarded due to congestion

---

## Architecture & Design

### System Architecture

```
┌─────────────────────────────────────────┐
│           Web Browser                    │
│  ┌────────────────────────────────────┐ │
│  │      Frontend (HTML/CSS/JS)        │ │
│  │  - Dashboard UI                    │ │
│  │  - Charts (Chart.js)               │ │
│  │  - Real-time updates               │ │
│  └────────────────────────────────────┘ │
└─────────────────┬───────────────────────┘
                  │ HTTP/REST API
                  │ (JSON)
┌─────────────────▼───────────────────────┐
│       Flask Backend (Python)             │
│  ┌────────────────────────────────────┐ │
│  │     REST API Endpoints              │ │
│  │  - /api/cpu                        │ │
│  │  - /api/memory                     │ │
│  │  - /api/processes                  │ │
│  │  - etc.                            │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │     psutil Library                  │ │
│  │  - System metrics collection       │ │
│  │  - Process information             │ │
│  └────────────────────────────────────┘ │
└─────────────────┬───────────────────────┘
                  │ System Calls
┌─────────────────▼───────────────────────┐
│        Operating System                  │
│  - Process scheduler                     │
│  - Memory manager                        │
│  - File system                           │
│  - Network stack                         │
└──────────────────────────────────────────┘
```

### Design Patterns

#### 1. MVC Pattern
- **Model**: Backend (psutil data)
- **View**: Frontend HTML/CSS
- **Controller**: JavaScript + Flask routes

#### 2. REST API Pattern
- Stateless communication
- Resource-based endpoints
- JSON data format
- HTTP methods (GET, POST)

#### 3. Polling Pattern
- Frontend polls backend at intervals
- Configurable refresh rate
- Reduces server load vs. websockets

---

## API Documentation

### GET /api/cpu

**Description**: Fetch CPU usage statistics

**Response**:
```json
{
  "overall_usage": 45.2,
  "per_core": [42.1, 48.3, 43.9, 46.5],
  "core_count": 4,
  "logical_count": 8,
  "frequency": {
    "current": 2400.0,
    "min": 1000.0,
    "max": 3600.0
  },
  "times": {
    "user": 30.5,
    "system": 14.7,
    "idle": 54.8
  },
  "context_switches": 1234567,
  "interrupts": 987654
}
```

**OS Concept**: CPU Scheduling and Utilization

### GET /api/memory

**Description**: Fetch memory usage statistics

**Response**:
```json
{
  "virtual": {
    "total": 17179869184,
    "available": 8589934592,
    "used": 8589934592,
    "free": 8589934592,
    "percent": 50.0,
    "total_gb": 16.0,
    "used_gb": 8.0,
    "available_gb": 8.0
  },
  "swap": {
    "total": 4294967296,
    "used": 0,
    "free": 4294967296,
    "percent": 0.0,
    "total_gb": 4.0,
    "used_gb": 0.0
  }
}
```

**OS Concept**: Memory Management and Virtual Memory

### GET /api/processes

**Description**: Fetch list of running processes

**Response**:
```json
{
  "processes": [
    {
      "pid": 1234,
      "name": "python",
      "cpu_percent": 15.3,
      "memory_percent": 2.5,
      "status": "running",
      "num_threads": 4,
      "create_time": "2025-01-29 10:30:00"
    }
  ],
  "total_count": 150
}
```

**OS Concept**: Process Management

### POST /api/kill-process

**Description**: Terminate a process

**Request**:
```json
{
  "pid": 1234
}
```

**Response**:
```json
{
  "success": true,
  "message": "Process python (PID: 1234) terminated successfully",
  "os_concept": "Process termination triggers resource cleanup"
}
```

**OS Concept**: Process Lifecycle and Termination

---

## Frontend Implementation

### Technology Stack
- **HTML5**: Semantic markup, accessibility
- **CSS3**: Custom properties (variables), Flexbox, Grid
- **Vanilla JavaScript**: No frameworks, ES6+ features
- **Chart.js**: Data visualization library

### Key Features

#### 1. Dark/Light Mode
```javascript
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
```

Uses CSS custom properties to switch themes:
```css
:root {
    --bg-primary: #f5f7fa;
    --text-primary: #2d3748;
}

[data-theme="dark"] {
    --bg-primary: #0f172a;
    --text-primary: #f1f5f9;
}
```

#### 2. Real-Time Updates
```javascript
// Fetch data every 2 seconds
setInterval(fetchAllData, 2000);

async function fetchAllData() {
    await Promise.all([
        fetchCPUData(),
        fetchMemoryData(),
        fetchProcesses()
    ]);
}
```

#### 3. Performance Graphs
Uses Chart.js for smooth, animated line charts:
```javascript
const cpuChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [],
            borderColor: '#3b82f6',
            fill: true,
            tension: 0.4
        }]
    }
});
```

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Collapsible sections on small screens

---

## Backend Implementation

### Technology Stack
- **Flask 3.0.0**: Web framework
- **psutil 5.9.6**: System metrics library
- **Python 3.8+**: Programming language

### Key Modules

#### 1. CPU Monitoring
```python
@app.route('/api/cpu')
def get_cpu_info():
    cpu_percent = psutil.cpu_percent(interval=0.5)
    per_core = psutil.cpu_percent(interval=0.5, percpu=True)
    return jsonify({
        'overall_usage': cpu_percent,
        'per_core': per_core
    })
```

#### 2. Process Management
```python
@app.route('/api/processes')
def get_processes():
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        processes.append(proc.info)
    return jsonify({'processes': processes})
```

#### 3. Background Monitoring
Separate thread logs data continuously:
```python
def background_monitor():
    while True:
        cpu_percent = psutil.cpu_percent(interval=1)
        log_system_data(cpu_percent)
        time.sleep(10)

monitor_thread = threading.Thread(target=background_monitor, daemon=True)
monitor_thread.start()
```

---

## Data Flow

### Request Flow
1. **Frontend** sends HTTP GET request to API endpoint
2. **Flask** receives request, routes to appropriate handler
3. **Handler** calls psutil to get system metrics
4. **psutil** makes system calls to OS kernel
5. **OS** returns requested data
6. **Handler** formats data as JSON
7. **Flask** sends HTTP response
8. **Frontend** receives JSON, updates UI

### Update Cycle
```
Timer (2s) → fetchAllData() → API Calls → Update DOM → Repeat
```

---

## Performance Optimization

### Frontend Optimizations

#### 1. Debounced Search
```javascript
let searchTimeout;
document.getElementById('search').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterProcesses, 300);
});
```

#### 2. Limited Process Display
Only show top 50 processes to reduce DOM manipulation:
```javascript
const displayProcesses = processes.slice(0, 50);
```

#### 3. Chart Animation Control
Use `update('none')` for smooth updates without animation:
```javascript
cpuChart.update('none');
```

### Backend Optimizations

#### 1. Efficient Data Structures
Use deque for fixed-size history:
```python
from collections import deque
performance_history = {
    'cpu': deque(maxlen=60)
}
```

#### 2. Background Thread
Separate thread prevents blocking main request handler:
```python
threading.Thread(target=background_monitor, daemon=True)
```

#### 3. Interval Configuration
Balance between accuracy and performance:
```python
cpu_percent = psutil.cpu_percent(interval=0.5)  # 0.5s interval
```

---

## Educational Value

### Learning Outcomes

Students using this project will:
1. Understand process lifecycle and management
2. Learn about CPU scheduling and utilization
3. Grasp memory management concepts (virtual memory, paging)
4. See file system operations in action
5. Understand network I/O fundamentals
6. Gain experience with REST APIs
7. Learn frontend-backend communication
8. Practice with real-world system programming

### Suggested Exercises

1. **Modify Alert Thresholds**: Change when alerts trigger
2. **Add New Metrics**: Temperature, battery, GPU usage
3. **Implement Filtering**: Filter processes by user or type
4. **Create Reports**: Generate PDF reports from logged data
5. **Optimize Performance**: Reduce update frequency, cache data
6. **Add Authentication**: Secure the monitoring dashboard
7. **Deploy Remotely**: Monitor systems over network

---

## Conclusion

This system monitor serves as a bridge between Operating System theory and practice. By visualizing real-time system metrics, it makes abstract OS concepts tangible and understandable. The project demonstrates industry-standard tools (Flask, REST APIs, psutil) while maintaining educational focus on OS fundamentals.

The modular architecture allows for easy extension—students can add features, optimize performance, or adapt it for specific use cases. Whether used for learning, system administration, or development, this tool provides valuable insights into how operating systems manage resources.
