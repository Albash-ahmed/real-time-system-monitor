# Real-Time System Monitor

A comprehensive **real-time system monitoring tool** built for academic purposes to demonstrate Operating System concepts including **Process Management**, **Memory Management**, **CPU Scheduling**, and **File Systems**. This project uses Python (Flask + psutil) for the backend and vanilla HTML/CSS/JavaScript for the frontend.

![System Monitor](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 🎯 Project Overview

This system monitor provides real-time insights into:
- **CPU Usage**: Overall and per-core utilization
- **Memory Management**: RAM and swap space monitoring
- **Disk Operations**: Storage usage and I/O statistics
- **Network Activity**: Bytes sent/received, packet statistics
- **Process Management**: View, sort, search, and terminate processes
- **Performance Trends**: Historical graphs for CPU and memory
- **Smart Alerts**: Threshold-based notifications
- **OS Concepts**: Educational explanations linking metrics to OS theory

---

## ✨ Key Features

### Core Monitoring
- ✅ **Real-time CPU monitoring** with per-core breakdown
- ✅ **Memory usage tracking** (physical RAM + swap)
- ✅ **Disk usage statistics** across all partitions
- ✅ **Network I/O monitoring** (bytes sent/received)
- ✅ **Running processes display** with detailed information

### Advanced Features
- 📊 **Live performance graphs** using Chart.js
- 📈 **Historical data tracking** (last 60 data points)
- ⚠️ **Threshold-based alerts** (customizable thresholds)
- 📝 **CSV logging** for performance analysis
- 🔍 **Process search and filtering**
- 🎯 **Process sorting** (by CPU, memory, name, PID)
- 🛑 **Safe process termination** with confirmation
- 🌓 **Dark/Light mode toggle**
- ⚡ **Customizable refresh intervals**
- 🔄 **Manual refresh capability**
- 📱 **Responsive design** for all devices

### OS Concepts Demonstrated
- **CPU Scheduling**: Process time-sharing and utilization
- **Memory Management**: Virtual memory and physical RAM allocation
- **Process Management**: Process lifecycle and resource allocation
- **File Systems**: Storage allocation and disk I/O
- **Network I/O**: Data transmission and inter-process communication

---

## 🏗️ Architecture

```
system-monitor/
│
├── backend/
│   └── app.py                 # Flask REST API server
│
├── frontend/
│   ├── templates/
│   │   └── index.html        # Main dashboard HTML
│   └── static/
│       ├── css/
│       │   └── styles.css    # Styling with dark/light mode
│       └── js/
│           └── app.js        # Frontend logic and API calls
│
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Python 3.8+** installed
- **pip** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone or Download the Project
```bash
# Navigate to project directory
cd system-monitor
```

### Step 2: Install Dependencies
```bash
# Install required Python packages
pip install -r requirements.txt

# OR install with system packages flag if needed
pip install -r requirements.txt --break-system-packages
```

### Step 3: Run the Backend Server
```bash
# Navigate to backend directory
cd backend

# Run Flask application
python app.py
```

The server will start on `http://127.0.0.1:5000`

### Step 4: Access the Dashboard
Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 📡 API Endpoints

### System Resources
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cpu` | GET | CPU usage, per-core stats, frequency |
| `/api/memory` | GET | RAM and swap memory statistics |
| `/api/disk` | GET | Disk usage and I/O counters |
| `/api/network` | GET | Network bytes and packets |
| `/api/system-info` | GET | Platform, uptime, architecture |

### Process Management
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/processes` | GET | List all running processes |
| `/api/kill-process` | POST | Terminate a process by PID |

### Monitoring & Alerts
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/alerts` | GET | Get active threshold alerts |
| `/api/history` | GET | Performance history for graphs |
| `/api/update-thresholds` | POST | Update alert thresholds |

---

## 🎓 Operating System Concepts

### 1. CPU Scheduling
**What it demonstrates:**
- **Time-sharing**: How the OS allocates CPU time across processes
- **Utilization**: Percentage of time the CPU is actively executing
- **Multi-core processing**: Load distribution across physical cores

**In the app:**
- Overall CPU usage percentage
- Per-core breakdown showing load balancing
- CPU frequency (clock speed)
- Context switches and interrupts count

### 2. Memory Management
**What it demonstrates:**
- **Virtual Memory**: Abstraction layer over physical RAM
- **Paging**: Memory allocation in fixed-size pages
- **Swap Space**: Disk-based overflow when RAM is full
- **Memory Pressure**: System state when RAM is scarce

**In the app:**
- Total, used, and available physical memory
- Memory usage percentage
- Swap space utilization
- Real-time memory consumption trends

### 3. Process Management
**What it demonstrates:**
- **Process Lifecycle**: Creation, execution, termination
- **Process Scheduling**: How OS decides which process runs
- **Resource Allocation**: CPU and memory assigned to each process
- **Process Termination**: Resource cleanup and state transitions

**In the app:**
- List of all running processes
- PID (Process ID) for unique identification
- CPU and memory consumption per process
- Process status (running, sleeping, etc.)
- Safe process termination with SIGTERM/SIGKILL

### 4. File Systems
**What it demonstrates:**
- **Storage Allocation**: How disk space is used
- **I/O Operations**: Read/write operations to disk
- **File System Hierarchy**: Partitions and mount points

**In the app:**
- Total, used, and free disk space
- Disk usage percentage per partition
- Read/write byte counts
- I/O operation counters

### 5. Network I/O
**What it demonstrates:**
- **Data Transmission**: Network communication
- **Inter-Process Communication**: Processes communicating over network
- **Packet-based Communication**: How data is transmitted

**In the app:**
- Total bytes sent and received
- Packet statistics
- Network errors and drops

---

## 🎨 User Interface Features

### Dashboard Cards
- **CPU Card**: Real-time usage with progress bar
- **Memory Card**: RAM utilization and available memory
- **Disk Card**: Storage capacity and usage
- **Network Card**: Data transmission statistics

### Interactive Elements
- **Search Processes**: Filter by name or PID
- **Sort Processes**: By CPU, memory, name, or PID
- **Kill Process**: Terminate processes with confirmation
- **Theme Toggle**: Switch between light and dark mode
- **Refresh Control**: Adjust update frequency (1s - 10s)
- **Manual Refresh**: Force immediate data update

### Performance Graphs
- **CPU Trend**: Line chart showing last 60 CPU measurements
- **Memory Trend**: Line chart showing last 60 memory measurements
- **Real-time Updates**: Graphs update automatically

### Alert System
- **Visual Banners**: Prominent alerts when thresholds exceeded
- **Configurable Thresholds**: Set custom alert levels
- **Multiple Alert Types**: CPU, memory, and disk alerts

---

## 🔧 Configuration

### Alert Thresholds
Default thresholds can be modified in the UI or in `backend/app.py`:
```python
ALERT_THRESHOLDS = {
    'cpu': 80.0,      # CPU usage > 80%
    'memory': 85.0,   # Memory usage > 85%
    'disk': 90.0      # Disk usage > 90%
}
```

### Refresh Interval
Default: 2 seconds
- Can be changed in the UI dropdown (1s, 2s, 5s, 10s)
- Balances between real-time updates and system load

### Data Logging
- All system metrics are logged to `system_logs.csv`
- Logs include: timestamp, CPU%, memory%, disk%, network, alerts
- Useful for historical analysis and trend identification

---

## 📊 Performance Considerations

### Frontend Optimization
- **Debounced Search**: Reduces unnecessary filtering operations
- **Limited Process Display**: Shows top 50 processes for performance
- **Efficient Chart Updates**: Uses Chart.js `update('none')` for smooth rendering
- **Minimal DOM Manipulation**: Batch updates where possible

### Backend Optimization
- **Threaded Flask**: Handles multiple concurrent requests
- **Background Monitoring**: Separate thread for logging
- **Efficient Data Structures**: Using deque for fixed-size history
- **Cached Process Data**: Reduces repeated system calls

---

## 🛡️ Security Considerations

### Process Termination
- Requires user confirmation before killing processes
- Uses graceful termination (SIGTERM) first
- Falls back to force kill (SIGKILL) if needed
- Handles permission errors gracefully

### API Security
- CORS enabled for development (configure for production)
- Input validation on all POST endpoints
- Error handling prevents information leakage

---

## 🐛 Troubleshooting

### Common Issues

**1. Permission Denied Errors**
```bash
# Run with elevated privileges (Linux/Mac)
sudo python backend/app.py

# Windows: Run command prompt as Administrator
```

**2. Port Already in Use**
```bash
# Change port in backend/app.py
app.run(debug=True, host='0.0.0.0', port=5001)  # Use 5001 instead
```

**3. psutil Installation Issues**
```bash
# Install build tools first (Linux)
sudo apt-get install python3-dev gcc

# Then install psutil
pip install psutil
```

**4. Chart Not Displaying**
- Check browser console for JavaScript errors
- Ensure Chart.js CDN is accessible
- Verify internet connection (for CDN resources)

---

## 🎯 Use Cases

### 1. Educational
- **CS Students**: Learn OS concepts hands-on
- **Teaching Tool**: Demonstrate scheduling and memory management
- **Lab Assignments**: Basis for OS course projects

### 2. System Administration
- **Resource Monitoring**: Track system health
- **Performance Analysis**: Identify bottlenecks
- **Process Management**: Monitor and control processes

### 3. Development
- **Application Testing**: Monitor resource usage during tests
- **Performance Profiling**: Identify resource-heavy operations
- **Debugging**: Track system state during development

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **Remote Monitoring**: Monitor multiple systems from one dashboard
- [ ] **Database Integration**: Store long-term historical data
- [ ] **User Authentication**: Multi-user support with access control
- [ ] **Advanced Alerts**: Email/SMS notifications
- [ ] **Process Behavior Analysis**: Machine learning for anomaly detection
- [ ] **Docker Integration**: Containerized deployment
- [ ] **GPU Monitoring**: For systems with dedicated graphics
- [ ] **Temperature Sensors**: Hardware temperature tracking
- [ ] **Battery Status**: For laptop systems
- [ ] **Cloud Deployment**: Deploy to AWS/Azure/GCP

---

## 📚 Technologies Used

### Backend
- **Python 3.8+**: Core programming language
- **Flask 3.0.0**: Web framework for REST API
- **psutil 5.9.6**: System and process utilities
- **Flask-CORS**: Cross-Origin Resource Sharing support

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Async/await, fetch API
- **Chart.js 4.4.0**: Data visualization
- **Google Fonts**: Inter font family

---

## 📝 Academic Value

This project demonstrates multiple key Operating System concepts:

1. **Concurrency**: Multiple processes running simultaneously
2. **Resource Management**: OS allocating CPU, memory, disk to processes
3. **Scheduling Algorithms**: Visible through CPU time allocation
4. **Memory Hierarchy**: RAM, swap, virtual memory interaction
5. **System Calls**: psutil makes system calls to get resource info
6. **Process States**: Running, sleeping, terminated states
7. **I/O Operations**: Disk and network I/O tracking

---

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional OS metrics (GPU, battery, sensors)
- Enhanced visualizations
- Performance optimizations
- Cross-platform compatibility improvements
- Documentation enhancements

---

## 📄 License

This project is created for **academic purposes** and is free to use and modify.

---

## 👨‍💻 Author

Created as an educational tool to demonstrate Operating System concepts through practical implementation.

---

## 🙏 Acknowledgments

- **psutil library**: For providing excellent cross-platform system utilities
- **Flask framework**: For making API development straightforward
- **Chart.js**: For beautiful, responsive charts
- **Operating Systems community**: For comprehensive educational resources

---

## 📞 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review the API documentation
3. Examine browser console for errors
4. Verify backend logs for server-side issues

---

## 🎓 Learning Resources

To understand the OS concepts better:
- **Operating System Concepts** by Silberschatz, Galvin, Gagne
- **Modern Operating Systems** by Andrew Tanenbaum
- **Linux System Programming** by Robert Love
- **psutil documentation**: https://psutil.readthedocs.io/

---

**Happy Monitoring! 🚀**
