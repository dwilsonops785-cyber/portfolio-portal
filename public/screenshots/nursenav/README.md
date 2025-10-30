# NurseNav SMS Manager Screenshots

This folder contains screenshots and media for the NurseNav SMS Manager project.

## Current Files

- `demo.gif` - Animated demonstration of the application (used as video demo)
- `logo.png` - SNO911 NurseNav logo

## Adding More Screenshots

To showcase different features of the application, consider taking screenshots of:

1. **Main Dashboard** - The primary interface showing message composition and controls
2. **Statistics View** - The pie chart and graphs showing delivery statistics
3. **Settings Panel** - Configuration options and folder selection
4. **Message Log** - Real-time activity feed showing SMS processing
5. **Directory Monitor** - The monitoring status and controls
6. **Export Report** - Sample of an exported report

### How to Add Screenshots

1. Take screenshots of the application (use Windows Snipping Tool or similar)
2. Save them in this folder with descriptive names:
   - `main-dashboard.png`
   - `statistics-view.png`
   - `settings-panel.png`
   - `message-log.png`
   - etc.

3. Update the project JSON file at `data/projects/proj-nursenav.json`
4. Add the screenshot paths to the `screenshots` array:

```json
"screenshots": [
  "/screenshots/nursenav/main-dashboard.png",
  "/screenshots/nursenav/statistics-view.png",
  "/screenshots/nursenav/settings-panel.png",
  "/screenshots/nursenav/message-log.png"
]
```

## Image Guidelines

- **Format**: PNG for screenshots, GIF for animations
- **Size**: Aim for 1920x1080 or similar standard resolution
- **Content**: Ensure no sensitive patient data is visible
- **Quality**: Use high-quality captures with clear, readable text
