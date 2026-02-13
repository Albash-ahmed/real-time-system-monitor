# Real-Time System Monitor - Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd system-monitor
pip install -r requirements.txt
```

**If you get permission errors:**
```bash
pip install -r requirements.txt --break-system-packages
```

### Step 2: Run the Application

**Option A - Using Script (Recommended):**

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

**Option B - Manual Start:**
```bash
cd backend
python app.py
```

### Step 3: Open Dashboard
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 📋 Quick Features Overview

### What You Can Monitor:
- ✅ **CPU Usage**: Overall and per-core
- ✅ **Memory**: RAM and swap space
- ✅ **Disk**: Storage and I/O operations
- ✅ **Network**: Bytes sent/received
- ✅ **Processes**: View, search, sort, and terminate

### Interactive Features:
- 📊 Real-time performance graphs
- ⚠️ Customizable alert thresholds
- 🔍 Process search and filtering
- 🌓 Dark/light mode toggle
- ⚡ Adjustable refresh intervals
- 📝 Automatic CSV logging

---

## 🎓 OS Concepts Demonstrated

This tool visualizes these Operating System concepts:
1. **CPU Scheduling** - Process time-sharing
2. **Memory Management** - Virtual memory and paging
3. **Process Management** - Process lifecycle
4. **File Systems** - Storage allocation
5. **Network I/O** - Data transmission

---

## 📁 Project Structure

```
system-monitor/
├── backend/
│   └── app.py              # Flask REST API
├── frontend/
│   ├── templates/
│   │   └── index.html      # Dashboard UI
│   └── static/
│       ├── css/
│       │   └── styles.css  # Styling
│       └── js/
│           └── app.js      # Frontend logic
├── requirements.txt        # Dependencies
├── start.sh               # Linux/Mac startup
├── start.bat              # Windows startup
├── README.md              # Full documentation
├── DOCUMENTATION.md       # Technical details
├── FEATURES_GUIDE.md      # Usage guide
└── PROJECT_STRUCTURE.md   # Code organization
```

---

## 🔧 Troubleshooting

**Problem: "Port already in use"**
- Close other applications using port 5000
- Or change port in `backend/app.py`

**Problem: "Module not found"**
- Ensure you installed requirements: `pip install -r requirements.txt`
- Try with `--break-system-packages` flag

**Problem: "Permission denied" when killing processes**
- Some system processes require administrator privileges
- Run application with elevated permissions if needed

---

## 📚 Documentation Files

- **README.md** - Complete project overview and setup
- **DOCUMENTATION.md** - Technical implementation details
- **FEATURES_GUIDE.md** - Feature usage and best practices
- **PROJECT_STRUCTURE.md** - Code organization and architecture

---

## 🎯 Quick Tips

1. **Set Alert Thresholds**: Adjust CPU/Memory/Disk alerts in the dashboard
2. **Enable CSV Logging**: Data automatically logged to `system_logs.csv`
3. **Try Dark Mode**: Click the moon/sun icon in top-right corner
4. **Adjust Refresh Rate**: Balance between real-time and performance
5. **Search Processes**: Type process name or PID to filter

---

## ⚡ Unique Features vs Task Manager

✅ **Web-based** - Access from any device
✅ **Educational** - OS concepts explained
✅ **Graphs** - Historical performance trends
✅ **CSV Export** - Automatic data logging
✅ **Alerts** - Customizable thresholds
✅ **Cross-platform** - Works on Windows, Mac, Linux

---

## 🛠️ Requirements

- Python 3.8 or higher
- pip package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 50MB free disk space

---

## 📊 Performance Impact

The monitor itself uses minimal resources:
- **CPU**: <1% when idle, ~2-3% during updates
- **Memory**: ~50-100 MB
- **Disk**: Logs grow at ~10KB per hour

---

## 🎓 Academic Use

Perfect for:
- Operating Systems courses
- System Administration training
- Performance analysis projects
- Learning system programming
- Understanding OS internals

---

## 🔐 Security Notes

- **Process Termination**: Requires confirmation before killing
- **CORS**: Enabled for development (configure for production)
- **No Authentication**: Add auth for production deployments
- **Local Only**: Binds to localhost by default

---

## 📞 Need Help?

1. Check the **README.md** for detailed setup instructions
2. Read **FEATURES_GUIDE.md** for usage examples
3. Review **DOCUMENTATION.md** for technical details
4. Examine browser console for JavaScript errors
5. Check backend terminal for Python errors

---

## 🎉 You're Ready!

Your system monitor is now ready to use. Open http://127.0.0.1:5000 in your browser and start monitoring!

**Happy Monitoring! 🚀📊**
