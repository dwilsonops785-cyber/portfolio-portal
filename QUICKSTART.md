# Quick Start Guide

## 1. Install Dependencies

```bash
cd portfolio-portal
npm install
```

## 2. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3001`

## 3. Access Admin Panel

1. Navigate to `http://localhost:3001/admin/login`
2. Enter password: `admin123` (default for development)
3. You'll be redirected to the admin dashboard

## 4. Create Your First Project

1. From the dashboard, click "New Project"
2. Fill in the project details:
   - **Title**: Required
   - **Short Description**: Required
   - **Status**: Choose concept/development/production
   - **Technologies**: Comma-separated (e.g., "Next.js, TypeScript, OpenAI")
   - **Labels**: Comma-separated tags

3. The secrets scanner will automatically check your input
4. Click "Create Project" to save

## 5. View Your Portfolio

Navigate to `http://localhost:3001` to see your public portfolio with the projects you've created.

## Production Deployment

### Environment Variables

Before deploying, set the following environment variable:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**IMPORTANT**: Never use the default password in production!

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variable `ADMIN_PASSWORD`
4. Deploy

The build process will automatically:
- Optimize for production
- Generate static pages where possible
- Create API routes for dynamic functionality

## Key Features to Test

- [ ] Admin login
- [ ] Create a new project
- [ ] Edit an existing project
- [ ] View project on public page
- [ ] Filter projects by status
- [ ] Test secrets scanner (try entering "api_key=sk-test123")
- [ ] Featured project toggle

## Troubleshooting

### Build Errors

```bash
npm run build
```

Should complete successfully with no errors (warnings about img tags are acceptable).

### Can't Log In

Make sure you're using the correct password:
- Development: `admin123`
- Production: Your `ADMIN_PASSWORD` environment variable

### Projects Not Showing

Check that:
1. JSON files exist in `/data/projects/`
2. The example project loads at `/projects/example-project-template`

## Next Steps

1. Delete the example project from the admin panel
2. Create your first real project
3. Customize the theme colors in `tailwind.config.ts`
4. Add your project thumbnails and demo URLs
5. Set up your production deployment

---

**Ready to build!** 🚀
