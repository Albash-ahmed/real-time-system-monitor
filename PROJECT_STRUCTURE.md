# System Monitor - Project Structure

## Directory Tree

```
system-monitor/
│
├── backend/
│   └── app.py                      # Main Flask application and REST API
│
├── frontend/
│   ├── templates/
│   │   └── index.html             # Main dashboard HTML
│   │
│   └── static/
│       ├── css/
│       │   └── styles.css         # Complete stylesheet with themes
│       │
│       └── js/
│           └── app.js             # Frontend JavaScript logic
│
├── requirements.txt                # Python dependencies
├── .gitignore                      # Git ignore rules
│
├── start.sh                        # Linux/Mac startup script
├── start.bat                       # Windows startup script
│
├── README.md                       # Main project documentation
├── DOCUMENTATION.md                # Detailed technical documentation
├── FEATURES_GUIDE.md              # Feature usage guide
└── PROJECT_STRUCTURE.md           # This file
```

---

## File Descriptions

### Backend Files

#### `backend/app.py` (740 lines)
**Purpose:** Main Flask application providing REST API

**Key Components:**
- **Imports:** Flask, psutil, threading, csv, datetime
- **Configuration:** Alert thresholds, log file settings
- **Data Structures:** Performance history deques, alert tracking
- **Modules:**
  - Logging Module: CSV data logging
  - Alert Module: Threshold checking
  - CPU Monitoring: Overall and per-core stats
  - Memory Monitoring: RAM and swap tracking
  - Disk Monitoring: Storage and I/O stats
  - Network Monitoring: Traffic statistics
  - Process Management: List and terminate processes
  - System Info: Platform and uptime
  - Alert & History: Active alerts and trends
  - Background Monitor: Continuous logging thread

**API Endpoints (11 routes):**
1. `GET /` - Serve dashboard
2. `GET /api/cpu` - CPU statistics
3. `GET /api/memory` - Memory statistics
4. `GET /api/disk` - Disk statistics
5. `GET /api/network` - Network statistics
6. `GET /api/processes` - Process list
7. `POST /api/kill-process` - Terminate process
8. `GET /api/system-info` - System information
9. `GET /api/alerts` - Active alerts
10. `GET /api/history` - Performance history
11. `POST /api/update-thresholds` - Update alert thresholds

**Key Features:**
- Thread-safe operations
- Background monitoring thread
- CSV logging every 10 seconds
- CORS enabled for development
- Error handling and validation
- OS concept explanations in responses

---

### Frontend Files

#### `frontend/templates/index.html` (240 lines)
**Purpose:** Main dashboard interface

**Structure:**
- **Header:** Title, subtitle, theme toggle
- **Alert Banner:** Dynamic warning messages
- **System Info Bar:** Platform, uptime, refresh controls
- **Resource Grid (4 cards):**
  - CPU Usage
  - Memory Usage
  - Disk Usage
  - Network Activity
- **Performance Graphs (2 charts):**
  - CPU Usage Trend
  - Memory Usage Trend
- **Per-Core CPU Display:** Dynamic core grid
- **Process Management:**
  - Search and filter
  - Sortable table
  - Kill process buttons
- **Threshold Configuration:** Customizable alerts
- **Footer:** OS concepts summary

**External Dependencies:**
- Google Fonts (Inter)
- Chart.js 4.4.0 (CDN)

---

#### `frontend/static/css/styles.css` (650 lines)
**Purpose:** Complete styling with dual themes

**Structure:**
1. **CSS Variables:** Theme colors and sizes
2. **Global Styles:** Base typography, layout
3. **Theme Toggle:** Button styling
4. **Header:** Title and subtitle styles
5. **Alert Banner:** Warning message styling
6. **System Info Card:** Info bar styling
7. **Resource Grid:** Card layout
8. **Resource Cards:** Metric displays
9. **Progress Bars:** Usage indicators
10. **OS Concept Badges:** Educational highlights
11. **Graphs:** Chart containers
12. **Section Cards:** Content sections
13. **Core Grid:** Per-core CPU display
14. **Process Controls:** Search and sort
15. **Table:** Process list styling
16. **Buttons:** Action button styles
17. **Threshold Controls:** Alert configuration
18. **Footer:** Bottom section
19. **Responsive Design:** Mobile breakpoints
20. **Animations:** Smooth transitions

**Key Features:**
- CSS custom properties for theming
- Dark and light mode support
- Flexbox and Grid layouts
- Smooth transitions and animations
- Responsive design (mobile-first)
- Consistent spacing and typography
- Professional color scheme
- Accessibility considerations

---

#### `frontend/static/js/app.js` (600 lines)
**Purpose:** Frontend logic and API communication

**Structure:**
1. **Configuration:** API URLs, intervals
2. **Initialization:** DOMContentLoaded setup
3. **Theme Management:** Toggle and persistence
4. **Chart Initialization:** Chart.js setup
5. **Auto-Refresh:** Interval management
6. **Data Fetching Functions (9):**
   - fetchSystemInfo()
   - fetchCPUData()
   - fetchMemoryData()
   - fetchDiskData()
   - fetchNetworkData()
   - fetchProcesses()
   - fetchAlerts()
   - updatePerformanceHistory()
7. **Display Functions:**
   - updateCoreUsage()
   - displayProcesses()
   - displayAlerts()
8. **Process Management:**
   - sortProcesses()
   - filterProcesses()
   - killProcess()
9. **Threshold Management:** updateThresholds()
10. **Utility Functions:** Helper methods
11. **Error Handling:** Global error catching

**Key Features:**
- Async/await for API calls
- Promise.all for parallel requests
- LocalStorage for theme persistence
- Debounced search for performance
- Chart.js integration
- Real-time DOM updates
- Error handling and user feedback
- No external dependencies (except Chart.js)

---

### Configuration Files

#### `requirements.txt` (4 lines)
**Purpose:** Python package dependencies

**Packages:**
- Flask 3.0.0: Web framework
- flask-cors 4.0.0: CORS support
- psutil 5.9.6: System utilities
- Werkzeug 3.0.1: WSGI utilities

**Installation:**
```bash
pip install -r requirements.txt
```

---

#### `.gitignore` (40 lines)
**Purpose:** Exclude files from version control

**Categories:**
- Python cache files
- Virtual environments
- Build artifacts
- Logs and CSV files
- IDE files
- OS files
- Environment files
- Testing files

---

### Startup Scripts

#### `start.sh` (35 lines)
**Purpose:** Automated setup and launch for Linux/Mac

**Features:**
- Checks Python 3 installation
- Checks pip installation
- Installs dependencies
- Starts Flask server
- Error handling

**Usage:**
```bash
chmod +x start.sh
./start.sh
```

---

#### `start.bat` (50 lines)
**Purpose:** Automated setup and launch for Windows

**Features:**
- Checks Python installation
- Checks pip installation
- Installs dependencies
- Starts Flask server
- Error handling
- Pause at end for error viewing

**Usage:**
```cmd
start.bat
```

---

### Documentation Files

#### `README.md` (450 lines)
**Purpose:** Main project documentation

**Sections:**
1. Project Overview
2. Key Features
3. Architecture
4. Installation & Setup
5. API Endpoints
6. Operating System Concepts
7. UI Features
8. Configuration
9. Performance Considerations
10. Security Considerations
11. Troubleshooting
12. Use Cases
13. Future Enhancements
14. Technologies Used
15. Academic Value
16. Contributing
17. License

---

#### `DOCUMENTATION.md` (700 lines)
**Purpose:** Detailed technical documentation

**Sections:**
1. Introduction
2. Operating System Concepts (in-depth)
3. Architecture & Design
4. API Documentation (detailed)
5. Frontend Implementation
6. Backend Implementation
7. Data Flow
8. Performance Optimization
9. Educational Value

---

#### `FEATURES_GUIDE.md` (600 lines)
**Purpose:** User guide and feature walkthrough

**Sections:**
1. Dashboard Overview
2. Monitoring Features (detailed)
3. Process Management
4. Performance Analysis
5. Alert System
6. Customization
7. Comparison with Task Manager
8. Best Practices
9. Troubleshooting
10. Tips & Tricks

---

#### `PROJECT_STRUCTURE.md` (This file)
**Purpose:** Overview of project organization

**Sections:**
1. Directory Tree
2. File Descriptions
3. Code Organization
4. Dependencies
5. Build Process

---

## Code Organization

### Backend Architecture

```
app.py
├── Configuration
│   ├── Alert Thresholds
│   ├── Log File Settings
│   └── Data Structures
│
├── Utility Functions
│   ├── initialize_log_file()
│   ├── log_system_data()
│   └── check_alerts()
│
├── API Endpoints
│   ├── System Resources (5 routes)
│   ├── Process Management (2 routes)
│   ├── Monitoring & Alerts (3 routes)
│   └── Frontend Route (1 route)
│
├── Background Thread
│   └── background_monitor()
│
└── Application Startup
    ├── Initialize logging
    ├── Start background thread
    └── Run Flask app
```

### Frontend Architecture

```
index.html + styles.css + app.js
├── UI Components
│   ├── Header
│   ├── Alert Banner
│   ├── System Info Bar
│   ├── Resource Cards (4)
│   ├── Performance Graphs (2)
│   ├── Per-Core Display
│   ├── Process Table
│   ├── Threshold Config
│   └── Footer
│
├── State Management
│   ├── Theme (localStorage)
│   ├── Refresh Interval
│   ├── Process Data
│   └── Chart Data
│
├── Event Handlers
│   ├── Theme Toggle
│   ├── Refresh Controls
│   ├── Process Search
│   ├── Process Sort
│   ├── Kill Process
│   └── Update Thresholds
│
└── API Communication
    ├── Fetch Functions (9)
    ├── Display Functions (3)
    └── Update Functions (2)
```

---

## Dependencies

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Flask | 3.0.0 | Web framework |
| flask-cors | 4.0.0 | CORS support |
| psutil | 5.9.6 | System metrics |
| Werkzeug | 3.0.1 | WSGI utilities |

**Transitive Dependencies:**
- click, Jinja2, MarkupSafe, itsdangerous, blinker

### Frontend Dependencies

| Library | Version | Source | Purpose |
|---------|---------|--------|---------|
| Chart.js | 4.4.0 | CDN | Data visualization |
| Inter Font | - | Google Fonts | Typography |

**No npm or package.json needed** - vanilla JavaScript

---

## Build Process

### Development

**No build step required!** This is a pure Python + vanilla JS project.

**To run:**
1. Install Python dependencies: `pip install -r requirements.txt`
2. Run Flask server: `python backend/app.py`
3. Open browser: `http://127.0.0.1:5000`

### Production Considerations

For production deployment:
1. **Disable Flask debug mode:**
   ```python
   app.run(debug=False, host='0.0.0.0', port=5000)
   ```

2. **Use production WSGI server:**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
   ```

3. **Configure CORS properly:**
   ```python
   CORS(app, origins=['https://yourdomain.com'])
   ```

4. **Set up reverse proxy (Nginx):**
   ```nginx
   location / {
       proxy_pass http://localhost:5000;
       proxy_set_header Host $host;
   }
   ```

5. **Enable HTTPS:**
   - Use Let's Encrypt for SSL certificates
   - Configure SSL in Nginx

---

## File Size Summary

| File | Lines | Size | Complexity |
|------|-------|------|------------|
| backend/app.py | 740 | ~25KB | High |
| frontend/templates/index.html | 240 | ~10KB | Medium |
| frontend/static/css/styles.css | 650 | ~20KB | Medium |
| frontend/static/js/app.js | 600 | ~20KB | High |
| README.md | 450 | ~35KB | Low |
| DOCUMENTATION.md | 700 | ~50KB | Low |
| FEATURES_GUIDE.md | 600 | ~45KB | Low |

**Total Project Size:** ~200KB (excluding dependencies)

---

## Code Metrics

### Backend (Python)
- **Lines of Code:** ~740
- **Functions:** 15
- **API Endpoints:** 11
- **Modules:** 8
- **Comments:** ~100 lines (13%)

### Frontend (JavaScript)
- **Lines of Code:** ~600
- **Functions:** 23
- **Event Handlers:** 6
- **API Calls:** 9
- **Comments:** ~80 lines (13%)

### Styling (CSS)
- **Lines of Code:** ~650
- **CSS Variables:** 15
- **Sections:** 20
- **Media Queries:** 1
- **Comments:** ~30 lines (5%)

---

## Testing Strategy

### Manual Testing Checklist
- [ ] All API endpoints return correct data
- [ ] Frontend updates in real-time
- [ ] Process search works correctly
- [ ] Process sorting works for all options
- [ ] Process termination works (with confirmation)
- [ ] Theme toggle persists across sessions
- [ ] Refresh interval changes take effect
- [ ] Charts render and update smoothly
- [ ] Alerts appear when thresholds exceeded
- [ ] Threshold updates work correctly
- [ ] Responsive design works on mobile
- [ ] All OS concept explanations display

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Platform Compatibility
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+)

---

## Maintenance Notes

### Regular Updates
- Update Flask to latest stable version
- Update psutil for new OS features
- Update Chart.js for new features
- Review and update OS concept explanations

### Performance Monitoring
- Monitor CSV log file size
- Check background thread performance
- Verify no memory leaks in long-running instances
- Test with large number of processes

### Security Audits
- Review CORS configuration
- Validate all user inputs
- Check for SQL injection (not applicable)
- Verify process termination security

---

## Contributing Guidelines

### Code Style
- **Python:** PEP 8 compliance
- **JavaScript:** ES6+ features, camelCase
- **CSS:** BEM-like naming, organized sections

### Adding Features
1. Update backend API if needed
2. Update frontend display
3. Update documentation
4. Test across platforms
5. Update FEATURES_GUIDE.md

### Reporting Issues
- Use descriptive titles
- Include OS and browser version
- Provide steps to reproduce
- Include error messages

---

## License & Attribution

**License:** MIT (permissive, educational use)

**Attribution:**
- psutil library by Giampaolo Rodola
- Chart.js by Chart.js contributors
- Flask by Armin Ronacher & Pallets team
- Inter font by Rasmus Andersson

---

## Support & Resources

### Documentation
- README.md: Quick start and overview
- DOCUMENTATION.md: Technical deep dive
- FEATURES_GUIDE.md: User manual

### External Resources
- [Flask Documentation](https://flask.palletsprojects.com/)
- [psutil Documentation](https://psutil.readthedocs.io/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

### Learning Resources
- Operating System Concepts (Silberschatz)
- Modern Operating Systems (Tanenbaum)
- Linux System Programming (Love)

---

**Project maintained as educational resource for Operating Systems courses.**
