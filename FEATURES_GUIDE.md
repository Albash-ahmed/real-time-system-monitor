# System Monitor - Features & Usage Guide

## Quick Navigation
- [Dashboard Overview](#dashboard-overview)
- [Monitoring Features](#monitoring-features)
- [Process Management](#process-management)
- [Performance Analysis](#performance-analysis)
- [Alert System](#alert-system)
- [Customization](#customization)

---

## Dashboard Overview

### Main Interface Components

```
┌─────────────────────────────────────────────────────────────┐
│  Real-Time System Monitor                     [Theme Toggle] │
│  Operating System Resource Monitoring & Analysis             │
├─────────────────────────────────────────────────────────────┤
│  [Alert Banner - shown when thresholds exceeded]             │
├─────────────────────────────────────────────────────────────┤
│  Platform | Uptime | Last Updated | Refresh Interval | 🔄    │
├──────────────┬──────────────┬──────────────┬───────────────┤
│ CPU Usage    │ Memory Usage │ Disk Usage   │ Network       │
│ 45.2%        │ 68.5%        │ 72.1%        │ ↑ 1.2GB       │
│ [Progress]   │ [Progress]   │ [Progress]   │ ↓ 2.5GB       │
│ 4 cores      │ 16.0 GB      │ 500 GB       │ Packets       │
│ OS Concept   │ OS Concept   │ OS Concept   │ OS Concept    │
├──────────────┴──────────────┴──────────────┴───────────────┤
│ [CPU Usage Trend Graph - Last 60 updates]                   │
├──────────────────────────────────────────────────────────────┤
│ [Memory Usage Trend Graph - Last 60 updates]                │
├──────────────────────────────────────────────────────────────┤
│ Per-Core CPU Usage                                           │
│ [Core 0: 42%] [Core 1: 48%] [Core 2: 44%] [Core 3: 46%]    │
├──────────────────────────────────────────────────────────────┤
│ Process Management                                           │
│ [Search...] [Sort by: CPU ▼]                               │
│ ┌──────────────────────────────────────────────────────────┐│
│ │PID  | Name    | CPU% | Mem% | Status | Threads | Action ││
│ │1234 | chrome  | 15.3 | 8.2  | run    | 12      | [Kill] ││
│ │5678 | python  | 5.1  | 2.3  | sleep  | 4       | [Kill] ││
│ └──────────────────────────────────────────────────────────┘│
├──────────────────────────────────────────────────────────────┤
│ Alert Thresholds                                             │
│ CPU: [80] % | Memory: [85] % | Disk: [90] % [Update]       │
└──────────────────────────────────────────────────────────────┘
```

---

## Monitoring Features

### 1. CPU Monitoring

**What You See:**
- Overall CPU usage percentage
- Per-core breakdown
- CPU frequency (current, min, max)
- Number of physical and logical cores

**How to Use:**
- Monitor for sustained high usage (>80%)
- Check if load is balanced across cores
- Identify CPU-intensive processes
- Observe frequency scaling (power management)

**OS Concept Link:**
> CPU Scheduling: The OS scheduler allocates processor time to processes using 
> algorithms like Round-Robin or Priority Scheduling. High CPU% indicates heavy 
> computation or poor optimization.

**Practical Tips:**
- **Single core at 100%**: Application may not be multi-threaded
- **All cores at 100%**: System under heavy load, consider upgrades
- **Frequent spikes**: Background processes or scheduled tasks

### 2. Memory Monitoring

**What You See:**
- Total physical RAM
- Used and available memory
- Memory usage percentage
- Swap space utilization

**How to Use:**
- Monitor for memory leaks (gradual increase)
- Watch swap usage (performance indicator)
- Identify memory-hungry processes
- Plan for RAM upgrades based on usage

**OS Concept Link:**
> Memory Management: The OS uses virtual memory to provide each process with 
> its own address space. Paging moves data between RAM and disk. High swap 
> usage indicates memory pressure and performance degradation.

**Practical Tips:**
- **>85% memory usage**: Consider closing applications
- **Swap usage >0**: System running low on RAM
- **Steadily increasing usage**: Potential memory leak

### 3. Disk Monitoring

**What You See:**
- Total, used, and free disk space
- Disk usage percentage per partition
- Read/Write operation counts
- I/O data transfer volume

**How to Use:**
- Monitor disk space to prevent full drives
- Track I/O for performance bottlenecks
- Identify write-heavy processes
- Plan storage upgrades

**OS Concept Link:**
> File System: The OS manages storage allocation, file organization, and I/O 
> operations. High disk usage can prevent saving files. High I/O can indicate 
> database operations, video rendering, or system backups.

**Practical Tips:**
- **>90% disk usage**: Clean up files, move data
- **High read operations**: Database queries, file searches
- **High write operations**: Downloads, rendering, backups

### 4. Network Monitoring

**What You See:**
- Total bytes sent and received
- Packet counts
- Network errors and drops

**How to Use:**
- Monitor data usage for bandwidth limits
- Identify network-heavy applications
- Detect abnormal network activity
- Troubleshoot connectivity issues

**OS Concept Link:**
> Network I/O: Data is transmitted in packets through protocol layers (TCP/IP). 
> The OS handles packet routing, error correction, and flow control. High 
> network usage indicates file transfers, streaming, or background updates.

**Practical Tips:**
- **Sudden spike in traffic**: Large download/upload or malware
- **High packet errors**: Network hardware issues
- **High packet drops**: Network congestion

---

## Process Management

### Viewing Processes

**Available Information:**
- **PID**: Unique Process ID assigned by OS
- **Name**: Executable name
- **CPU %**: Processor time consumed
- **Memory %**: RAM used by process
- **Status**: Current process state (running, sleeping, etc.)
- **Threads**: Number of concurrent execution threads
- **Created**: When process was started

### Process States

| State | Meaning | When It Occurs |
|-------|---------|----------------|
| Running | Actively executing on CPU | Process has CPU time |
| Sleeping | Waiting for I/O or event | Waiting for disk, network, user input |
| Stopped | Suspended, can be resumed | Debugger attached or Ctrl+Z |
| Zombie | Finished but not cleaned up | Parent hasn't collected exit status |

### Sorting Processes

**Sort Options:**
1. **By CPU**: Identify processor-intensive tasks
2. **By Memory**: Find memory-hungry applications
3. **By Name**: Locate specific processes alphabetically
4. **By PID**: Find processes by ID

**Use Cases:**
- **Troubleshooting**: Sort by CPU to find what's slowing system
- **Memory Management**: Sort by memory to free up RAM
- **Development**: Find your application by name

### Searching Processes

**Search Methods:**
- **By Name**: Type part of process name (e.g., "chrome")
- **By PID**: Enter process ID directly (e.g., "1234")

**Case-Insensitive**: Searches ignore capitalization

### Terminating Processes

**Process:**
1. Click "Kill" button next to process
2. Confirm termination in dialog box
3. System attempts graceful shutdown (SIGTERM)
4. If unresponsive, forces termination (SIGKILL)

**Important Notes:**
- ⚠️ Terminating system processes may cause instability
- 💾 Unsaved data in terminated processes will be lost
- 🔒 Some processes require administrator privileges
- 🔄 Terminated processes may be restarted by OS

**What Happens When You Kill a Process:**
1. OS sends termination signal
2. Process cleanup handlers execute
3. Open files are closed
4. Memory is freed
5. Child processes may be terminated
6. Process enters zombie state briefly
7. Parent process collects exit status
8. Process completely removed from system

---

## Performance Analysis

### Real-Time Graphs

**CPU Usage Trend:**
- Shows last 60 data points
- Updates every refresh interval
- Helps identify usage patterns
- Smooth line indicates stable operation
- Spikes indicate burst activity

**Memory Usage Trend:**
- Tracks RAM consumption over time
- Gradual increase may indicate memory leak
- Sudden drops show process termination
- Flat line indicates stable operation

**How to Interpret:**
- **Steady line**: Normal, stable operation
- **Gradual increase**: Memory leak or accumulation
- **Regular spikes**: Scheduled tasks or batch processing
- **Erratic pattern**: Unstable application or high system load

### CSV Data Logging

**What's Logged:**
- Timestamp of measurement
- CPU usage percentage
- Memory usage percentage
- Disk usage percentage
- Network sent/received (MB)
- Active alerts

**File Location:** `system_logs.csv` in project root

**How to Use:**
1. Let monitor run for extended period
2. Open CSV in Excel, Google Sheets, or Python
3. Create custom charts and analysis
4. Identify long-term trends
5. Correlate events with system changes

**Analysis Examples:**
```python
import pandas as pd
import matplotlib.pyplot as plt

# Load logs
df = pd.read_csv('system_logs.csv')

# Plot CPU usage over time
plt.plot(df['Timestamp'], df['CPU %'])
plt.title('CPU Usage Over Time')
plt.show()

# Find peak usage
peak_cpu = df['CPU %'].max()
print(f"Peak CPU Usage: {peak_cpu}%")
```

---

## Alert System

### Alert Thresholds

**Default Values:**
- CPU: 80%
- Memory: 85%
- Disk: 90%

**Why These Values:**
- CPU >80%: System becoming unresponsive
- Memory >85%: Risk of swap usage, performance drop
- Disk >90%: Critical, may prevent file saves

### Alert Types

**Visual Indicators:**
- 🔴 Red banner at top of dashboard
- ⚠️ Warning icon in banner
- Alert message with specific threshold

**Alert Format:**
```
⚠️ CPU usage critical: 87.3% (threshold: 80%) | Memory usage critical: 91.2% (threshold: 85%)
```

### Customizing Thresholds

**How to Change:**
1. Scroll to "Alert Thresholds" section
2. Enter new percentage values (1-100)
3. Click "Update Thresholds" button

**Use Cases:**
- **Lower Thresholds**: For critical systems, early warnings
- **Higher Thresholds**: For powerful systems, reduce false positives
- **Different Per Resource**: CPU 70%, Memory 90%, Disk 95%

**Example Scenarios:**

**Scenario 1: Development Machine**
- CPU: 90% (compiling is normal)
- Memory: 85% (IDEs use lots of RAM)
- Disk: 95% (local databases, build artifacts)

**Scenario 2: Production Server**
- CPU: 70% (maintain headroom)
- Memory: 80% (prevent swapping)
- Disk: 85% (critical for logging)

**Scenario 3: Gaming PC**
- CPU: 95% (games max out CPU)
- Memory: 90% (games load large textures)
- Disk: 80% (game saves, recordings)

---

## Customization

### Theme Selection

**Light Mode:**
- Bright, clean interface
- Better for well-lit environments
- Reduces eye strain in daylight

**Dark Mode:**
- Dark backgrounds, light text
- Better for low-light environments
- Reduces blue light emission
- Popular among developers

**Toggle:** Click moon/sun icon in top-right corner

**Persistence:** Theme choice saved in browser localStorage

### Refresh Interval

**Available Options:**
- 1 second (high frequency, more system load)
- 2 seconds (balanced, default)
- 5 seconds (low frequency, less system load)
- 10 seconds (minimal updates, very low load)

**How to Change:**
Select from dropdown in system info bar

**Considerations:**
- **Faster refresh**: More up-to-date, higher CPU usage
- **Slower refresh**: Less up-to-date, lower CPU usage
- **Network latency**: Choose longer intervals on slow connections
- **Critical monitoring**: Choose shorter intervals

### Manual Refresh

**When to Use:**
- Verify a sudden change
- Check current state without waiting
- After making system changes

**How:** Click "🔄 Refresh Now" button

---

## Comparison: System Monitor vs Task Manager

| Feature | System Monitor | Task Manager | Advantage |
|---------|---------------|--------------|-----------|
| **Web-Based** | ✅ Yes | ❌ No | Access from any device |
| **OS Concepts** | ✅ Explained | ❌ None | Educational value |
| **Performance Graphs** | ✅ Real-time | ⚠️ Limited | Better visualization |
| **CSV Export** | ✅ Automatic | ❌ Manual | Historical analysis |
| **Customizable Alerts** | ✅ Yes | ❌ No | Proactive monitoring |
| **Dark Mode** | ✅ Yes | ⚠️ System | User preference |
| **Remote Access** | ✅ Possible | ❌ No | Monitor from anywhere |
| **Process Details** | ⚠️ Good | ✅ Excellent | Task Manager wins |
| **Lightweight** | ✅ Yes | ✅ Yes | Equal |
| **Cross-Platform** | ✅ Yes | ❌ Windows only | System Monitor wins |

---

## Best Practices

### For Students
1. Run monitor while executing assignments
2. Observe process creation and termination
3. Monitor memory usage to detect leaks
4. Compare theoretical concepts with real behavior
5. Experiment with different workloads

### For Developers
1. Monitor application during development
2. Identify performance bottlenecks
3. Verify memory is released properly
4. Check CPU usage under load
5. Monitor network activity for APIs

### For System Administrators
1. Set conservative alert thresholds
2. Monitor during peak usage times
3. Review CSV logs for trends
4. Identify problematic processes
5. Plan capacity upgrades based on data

---

## Troubleshooting Common Issues

### High CPU Usage
**Symptoms:** System slow, fans loud, CPU >80%
**Solutions:**
1. Sort processes by CPU usage
2. Identify and close unnecessary applications
3. Check for runaway processes (100% CPU)
4. Update or reinstall problematic software
5. Check for malware

### High Memory Usage
**Symptoms:** System slow, swap usage high, Memory >85%
**Solutions:**
1. Sort processes by memory usage
2. Close memory-intensive applications
3. Clear browser tabs and cache
4. Restart memory-leaking applications
5. Consider RAM upgrade

### Disk Full
**Symptoms:** Cannot save files, Disk >90%
**Solutions:**
1. Delete temporary files
2. Empty trash/recycle bin
3. Move files to external storage
4. Uninstall unused applications
5. Use disk cleanup utilities

### Network Issues
**Symptoms:** Slow internet, high latency
**Solutions:**
1. Check bytes sent/received for spikes
2. Identify processes using network
3. Close bandwidth-heavy applications
4. Check for background updates
5. Verify no malware uploading data

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| F5 | Manual refresh |
| Ctrl+F | Focus search box |
| Esc | Clear search |

---

## Tips & Tricks

1. **Leave monitor running in background tab** for continuous logging
2. **Check graphs after system becomes slow** to identify cause
3. **Use CSV logs to prove system requirements** for upgrades
4. **Monitor while gaming** to see resource utilization
5. **Compare before/after** when optimizing code
6. **Set alerts for overnight monitoring** of long-running tasks

---

## Conclusion

This system monitor is more than a tool—it's an educational platform for understanding Operating Systems. By connecting real-time metrics with OS concepts, it bridges the gap between theory and practice. Whether you're a student learning OS fundamentals, a developer optimizing applications, or a system administrator maintaining servers, this monitor provides valuable insights into how your system manages resources.
