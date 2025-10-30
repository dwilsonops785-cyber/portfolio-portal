# RTIC Shift Scheduler - Screenshots

This folder contains screenshots and assets for the RTIC Shift Scheduler project.

## Quick Start

**See [SCREENSHOT_GUIDE.md](SCREENSHOT_GUIDE.md) for detailed instructions on what screenshots to capture.**

---

## Needed Screenshots

### Must Have (Priority)
1. `dashboard-main.png` - Main dashboard with calendar ⭐ (will be thumbnail)
2. `my-schedule-fab.png` - My Schedule FAB feature ⭐ (signature feature)
3. `calendar-full-view.png` - Full calendar page view
4. `admin-dashboard.png` - Admin dashboard overview
5. `shift-management.png` - Shift management interface

### Nice to Have
6. `my-schedule-tabs.png` - Three-tab My Schedule interface
7. `user-management.png` - User administration page
8. `create-shift-modal.png` - Create shift modal form
9. `color-coded-shifts.png` - Calendar showing color-coded statuses
10. `mobile-responsive.png` - Mobile responsive layout

---

## How to Add Screenshots

1. **Start the application:**
   ```bash
   cd C:\RTICScheduler\rtic-scheduler
   npm run dev
   ```

2. **Capture screenshots:**
   - Use `Windows + Shift + S` to capture
   - Save as PNG with exact filenames above
   - Save to this folder

3. **Update project JSON:**
   - Let me know when screenshots are ready
   - I'll update the project file to include them

---

## Application Access

- **Local Dev:** http://localhost:3000
- **Login:** Use your Supabase-configured credentials
- **Admin Access:** Requires `is_admin = true` in profiles table

---

## Screenshot Tips

✅ **Do:**
- Use high resolution (1920x1080 or 1600x900)
- Show populated data (not empty states)
- Include various color-coded shifts
- Capture in full-screen browser
- Hide bookmark bars

❌ **Don't:**
- Use real user data (use test accounts)
- Include personal information
- Show error states
- Capture with browser dev tools open (except for mobile view)

---

## Current Status

**Project JSON:** ✅ Created at `data/projects/proj-rtic-scheduler.json`

**Screenshots Directory:** ✅ Ready for your screenshots

**Screenshot Guide:** ✅ Detailed instructions available

**Next Step:** Capture screenshots and add them to this folder!

---

## Features to Highlight in Screenshots

The screenshots should showcase:

- **Shift Management:** Create, edit, delete shifts with staffing rules
- **Color-Coded Calendar:** Visual status indicators
- **My Schedule FAB:** Floating action button with three tabs
- **Real-time Updates:** Live data from Supabase
- **Role-Based Access:** Admin and user views
- **Mobile Responsive:** Works on all devices
- **Professional UI:** Clean, modern design with Tailwind CSS

---

## Adding to Portfolio

Once screenshots are saved here, update `data/projects/proj-rtic-scheduler.json`:

```json
"screenshots": [
  "/screenshots/rtic-scheduler/dashboard-main.png",
  "/screenshots/rtic-scheduler/my-schedule-fab.png",
  "/screenshots/rtic-scheduler/calendar-full-view.png",
  "/screenshots/rtic-scheduler/admin-dashboard.png",
  "/screenshots/rtic-scheduler/shift-management.png"
],
"thumbnailUrl": "/screenshots/rtic-scheduler/dashboard-main.png"
```

---

**Ready for your screenshots!** 📸
