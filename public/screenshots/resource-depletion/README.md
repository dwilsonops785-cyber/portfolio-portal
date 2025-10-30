# SNO911 Resource Depletion Monitor - Screenshots

This folder contains screenshots and assets for the SNO911 Resource Depletion Monitor project.

## Current Files

- `sno911-logo.png` - SNO911 branding logo

## Needed Screenshots

To showcase the full capabilities of this production application, capture screenshots of:

### 1. Main Dashboard (`dashboard-overview.png`)
**What to capture:**
- Real-time zone status cards for all 4 zones (9, 10, 11, 12)
- Color-coded indicators (green/yellow/red)
- ALS and Suppression unit availability
- Last updated timestamps
- Navigation menu

### 2. Historical Events Timeline (`events-timeline.png`)
**What to capture:**
- List of recent resource depletion events
- Zone, alert type, severity columns
- Timestamps and event details
- Search/filter functionality

### 3. Analytics Dashboard (`analytics-dashboard.png`)
**What to capture:**
- Time series chart showing depletion trends
- Heatmap visualization
- Zone comparison graphs
- Statistical insights panel

### 4. Concurrent Events View (`concurrent-events.png`)
**What to capture:**
- Multi-zone depletion detection
- Timeline showing overlapping incidents
- Critical event indicators

### 5. Operations Log (`operations-log.png`)
**What to capture:**
- Team communication interface
- Log entries with timestamps
- User activity tracking

### 6. Login Screen (`login-page.png`)
**What to capture:**
- Secure authentication interface
- SNO911 branding
- Professional login form

## How to Capture

### If System is Running:
1. Access the dashboard at its deployed URL
2. Log in with your credentials
3. Navigate to each section
4. Use Windows Snipping Tool (`Win + Shift + S`)
5. Capture each key screen
6. Save with the filenames above

### If System is Not Accessible:
- Use the logo as a placeholder thumbnail
- Add a "Production System - Screenshots Coming Soon" note
- The comprehensive description already tells the story

## Image Guidelines

- **Format**: PNG
- **Resolution**: 1920x1080 or similar
- **Content**: Ensure no real operational data is visible
- **Quality**: Clear, readable interface elements

## Adding Screenshots to Portfolio

Once screenshots are saved here, update `data/projects/proj-resource-depletion.json`:

```json
"screenshots": [
  "/screenshots/resource-depletion/dashboard-overview.png",
  "/screenshots/resource-depletion/events-timeline.png",
  "/screenshots/resource-depletion/analytics-dashboard.png",
  "/screenshots/resource-depletion/concurrent-events.png",
  "/screenshots/resource-depletion/operations-log.png",
  "/screenshots/resource-depletion/login-page.png"
],
"thumbnailUrl": "/screenshots/resource-depletion/dashboard-overview.png"
```

## Note

This is a production emergency services system. If screenshots contain sensitive operational data, consider:
- Using test data
- Blurring sensitive information
- Creating mockups based on the actual interface
- Using the logo as the primary visual until screenshots are available
