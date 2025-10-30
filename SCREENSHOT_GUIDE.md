# Screenshot Guide for ManageMe

## 📸 What Screenshots to Capture

To showcase ManageMe effectively, capture these 5 key screenshots:

### 1. **Main Dashboard** (`main-dashboard.png`)
**What to show**: The main task view with several tasks displayed
- Include tasks with different priorities (High, Medium, Low)
- Show the overall grid layout
- Make sure the UI is clean and professional
- **Ideal size**: 1920x1080 or 1440x900

### 2. **Task Creation** (`task-creation.png`)
**What to show**: The "Create New Task" dialog or form
- Show the form fields (title, description, priority selection)
- Demonstrate the UI for adding a new task
- Include any date/time pickers if visible
- **Ideal size**: Full window or focused dialog

### 3. **Priority View** (`priority-view.png`)
**What to show**: Tasks organized by priority with color coding
- Highlight the visual differences between priorities
- Show the color-coded cards (High/Medium/Low)
- Include enough tasks to demonstrate the organization
- **Ideal size**: 1920x1080 or 1440x900

### 4. **Snooze Functionality** (`snooze-functionality.png`)
**What to show**: The snooze feature in action
- Show the snooze dialog with time presets
- Or show a task with snooze information
- Demonstrate the quick preset buttons or custom time picker
- **Ideal size**: Focused on the snooze UI

### 5. **Settings Panel** (`settings-panel.png`)
**What to show**: The application settings
- Daily refresh time configuration
- Snooze presets customization
- Any other configuration options
- **Ideal size**: Full settings window

---

## 🎯 Tips for Great Screenshots

### Before Capturing:
1. ✅ **Clean up the UI**: Close unnecessary windows
2. ✅ **Use realistic data**: Create sample tasks that look professional
3. ✅ **Check the lighting**: If your app has themes, use the best-looking one
4. ✅ **Remove sensitive data**: No personal task names or information
5. ✅ **Maximize window**: Capture at a good resolution (1440x900 minimum)

### During Capture:
- **Windows**: Use `Win + Shift + S` for Snipping Tool
- **Mac**: Use `Cmd + Shift + 4` for screenshots
- **Linux**: Use `Shift + PrtScn` or screenshot tool

### After Capture:
1. Save as PNG (better quality than JPG)
2. Name files exactly as specified above
3. Resize if needed (max 2000px width recommended)
4. Optimize file size (aim for under 500KB each if possible)

---

## 📁 Where to Save Screenshots

Save all screenshots to:
```
C:\Portfolio\portfolio-portal\public\screenshots\manageme\
```

**Required filenames**:
- `main-dashboard.png`
- `task-creation.png`
- `priority-view.png`
- `snooze-functionality.png`
- `settings-panel.png`

---

## ✅ After Capturing Screenshots

Once you've saved all 5 screenshots:

1. **Start the portfolio server**:
   ```bash
   cd C:\Portfolio\portfolio-portal
   npm run dev
   ```

2. **View ManageMe project**:
   - Visit: http://localhost:3001
   - Find ManageMe in the featured projects
   - Click on it to see the detail page
   - The screenshots will appear in an interactive gallery

3. **Test the gallery**:
   - Click any thumbnail to open lightbox
   - Use arrow keys or buttons to navigate
   - Press ESC to close
   - Verify all images display correctly

---

## 🔧 If You Need to Update Screenshots Later

Simply replace the PNG files in:
```
public/screenshots/manageme/
```

The portfolio will automatically use the new images (you may need to refresh the browser).

---

## 🎨 Optional: Create a Thumbnail

If you want a specific thumbnail for the project card (beyond the first screenshot), you can:

1. Create a banner-style image (1200x630px recommended)
2. Save it as `thumbnail.png` in the same directory
3. Update the project JSON:
   ```json
   "thumbnailUrl": "/screenshots/manageme/thumbnail.png"
   ```

---

## 📝 Need Help?

If you have questions about:
- **Screenshot dimensions**: Any 16:9 ratio works well (1920x1080, 1440x900, etc.)
- **File formats**: PNG is preferred for UI screenshots
- **File size**: Try to keep under 500KB each for fast loading
- **Missing screenshots**: The gallery will work with 1-5 images

---

**Ready to capture!** 📸

Once you've saved the screenshots, the ManageMe project will be fully live on your portfolio!
