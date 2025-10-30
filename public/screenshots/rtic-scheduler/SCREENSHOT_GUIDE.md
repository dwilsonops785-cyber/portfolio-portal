# RTIC Shift Scheduler - Screenshot Guide

## Directory Ready!

Save your screenshots directly to this folder:
```
C:\Portfolio\portfolio-portal\public\screenshots\rtic-scheduler\
```

---

## Recommended Screenshots (8-10 images)

### 1. **dashboard-main.png** ⭐ Primary Image
**What to capture:**
- Main dashboard with calendar view
- Quick stats at the top (total shifts, users, etc.)
- Month calendar with color-coded shifts
- Navigation sidebar visible
- Welcome message
- This will be set as the thumbnail image

**Why important:** Shows the main interface and calendar at a glance

---

### 2. **my-schedule-fab.png** ⭐ Key Feature
**What to capture:**
- Click the blue FAB (Floating Action Button) in bottom-right
- Capture the slide-in modal with "Upcoming Shifts" tab
- Show countdown timers to next shift
- Display shift cards with details
- Show "Vacate Shift" buttons

**Why important:** Showcases the signature FAB feature

---

### 3. **my-schedule-tabs.png**
**What to capture:**
- My Schedule modal showing all three tabs:
  - Upcoming
  - Pending Requests
  - History
- Show tab navigation at the top
- Display content in one of the tabs

**Why important:** Demonstrates the three-tab interface

---

### 4. **calendar-full-view.png**
**What to capture:**
- Full calendar page (navigate to Calendar in sidebar)
- Month view with multiple color-coded shifts
- Legend showing what each color means
- Visual indicators for staffing status
- Filter options if available

**Why important:** Shows comprehensive calendar functionality

---

### 5. **admin-dashboard.png**
**What to capture:**
- Admin dashboard view (requires admin login)
- System statistics overview
- Quick links to admin functions
- User count, shift count, pending actions
- Professional admin interface

**Why important:** Demonstrates administrative capabilities

---

### 6. **user-management.png**
**What to capture:**
- User management page (Admin → Users)
- Table showing all users
- Columns: Name, Email, Role, Hours Worked, Status
- Search bar functionality
- Admin badges on users
- Action buttons

**Why important:** Shows user administration features

---

### 7. **shift-management.png**
**What to capture:**
- Shift management page (Admin → Shift Management)
- Table of all shifts
- Create Shift button
- Shift details: date, time, staffing status
- Visual status indicators (green/yellow/orange)
- Edit/Delete buttons

**Why important:** Demonstrates shift administration

---

### 8. **create-shift-modal.png**
**What to capture:**
- Click "Create Shift" button
- Show the modal form with fields:
  - Date picker
  - Start time / End time
  - Min/Max staff
  - Max LEO
  - Notes
  - Toggle for open for signup
- Professional form design

**Why important:** Shows shift creation workflow

---

### 9. **color-coded-shifts.png** (Optional)
**What to capture:**
- Calendar or dashboard showing multiple shift statuses:
  - Light Blue (open for signup)
  - Yellow (pending approvals)
  - Green (fully assigned)
  - Orange (understaffed)
  - Red striped (vacated)
- Include the legend if visible

**Why important:** Illustrates the color-coding system

---

### 10. **mobile-responsive.png** (Optional)
**What to capture:**
- Open browser dev tools (F12)
- Switch to mobile view (phone icon)
- Capture the responsive mobile layout
- Show FAB is accessible on mobile
- Demonstrate touch-friendly interface

**Why important:** Shows mobile optimization

---

## Quick Capture Instructions

### Using Windows Snipping Tool:
1. Open the RTIC Scheduler in your browser
2. Log in (use admin credentials for admin screenshots)
3. Navigate to the page you want to capture
4. Press `Windows + Shift + S`
5. Select and capture the screen area
6. Open Paint (`Windows + R` → type `mspaint`)
7. Paste (`Ctrl + V`)
8. Save as PNG with the exact filename from above
9. Save to: `C:\Portfolio\portfolio-portal\public\screenshots\rtic-scheduler\`

### File Naming Rules:
✅ **Use these exact names:**
- `dashboard-main.png`
- `my-schedule-fab.png`
- `my-schedule-tabs.png`
- `calendar-full-view.png`
- `admin-dashboard.png`
- `user-management.png`
- `shift-management.png`
- `create-shift-modal.png`
- `color-coded-shifts.png`
- `mobile-responsive.png`

❌ **Don't use:**
- Spaces in filenames
- Capital letters
- Different extensions (use PNG only)

---

## Image Specifications

- **Format:** PNG
- **Recommended Size:** 1920x1080 or 1600x900
- **Quality:** High resolution, clear text
- **Content Guidelines:**
  - Use test/sample data if possible
  - Avoid showing real user names or emails
  - Blur sensitive information if needed
  - Show realistic but generic shift times

---

## Setup Instructions Before Capturing

### 1. Start the Application
```bash
cd C:\RTICScheduler\rtic-scheduler
npm run dev
```
Open http://localhost:3000

### 2. Create Test Data (if needed)
You may need to add sample shifts to make the calendar look populated. The PROJECT_STATUS.md file has SQL you can run in Supabase.

### 3. Login Scenarios

**For User Screenshots:**
- Login with regular user account
- Capture: dashboard, calendar, My Schedule FAB

**For Admin Screenshots:**
- Login with admin account
- Capture: admin dashboard, user management, shift management

### 4. Best Practices
- **Full Screen**: Maximize browser for clean screenshots
- **Hide Bookmarks**: Hide bookmarks bar (Ctrl+Shift+B)
- **Clear Notifications**: Dismiss any toast notifications before capturing
- **Sample Data**: Ensure calendar has several shifts visible
- **Colors**: Make sure various shift statuses are represented

---

## What Happens Next

Once you save the PNG files in this folder:

1. Let me know you're done
2. I'll update the project JSON to include all screenshots
3. The images will appear in your portfolio:
   - **Homepage card:** Will show `dashboard-main.png`
   - **Project detail page:** Will show all images in a gallery
   - **Lightbox viewer:** Click any image to view full-screen

---

## Example File Structure

After you add your screenshots, this folder should look like:

```
C:\Portfolio\portfolio-portal\public\screenshots\rtic-scheduler\
├── SCREENSHOT_GUIDE.md          ← This file
├── dashboard-main.png           ← Add this ⭐
├── my-schedule-fab.png          ← Add this ⭐
├── my-schedule-tabs.png         ← Add this
├── calendar-full-view.png       ← Add this
├── admin-dashboard.png          ← Add this
├── user-management.png          ← Add this
├── shift-management.png         ← Add this
├── create-shift-modal.png       ← Add this
├── color-coded-shifts.png       ← Add this (optional)
└── mobile-responsive.png        ← Add this (optional)
```

---

## Priority Order

If you can only capture a few screenshots right now, prioritize in this order:

1. **dashboard-main.png** (MUST HAVE - main interface)
2. **my-schedule-fab.png** (MUST HAVE - signature feature)
3. **calendar-full-view.png** (shows calendar functionality)
4. **admin-dashboard.png** (demonstrates admin features)
5. **shift-management.png** (shows shift admin)
6. *(Others are nice-to-have)*

Even just the first 3 screenshots will make a great impression!

---

## Tips for Great Screenshots

### Dashboard
- Make sure the calendar is showing the current month with shifts
- Ensure quick stats at the top are visible
- Show the sidebar navigation

### My Schedule FAB
- Click the blue button first
- Wait for the modal to fully slide in
- Show at least 1-2 upcoming shifts with countdown timers
- Make sure the tabs are visible at the top

### Calendar
- Show a month with good shift coverage
- Ensure different color-coded shifts are visible
- Include the legend if it's on the page

### Admin Pages
- Show populated tables (not empty states)
- Display search/filter controls
- Include action buttons (Create, Edit, Delete)

---

## Need Help?

- **Can't login?** Check that you have user credentials set up
- **Empty calendar?** Add sample shifts using the admin interface or SQL
- **Not sure what to capture?** Focus on the most visually impressive screens
- **Questions?** Just ask!

---

**Ready to go!** Start the dev server, login, and capture your screenshots. The folder is ready for them!
