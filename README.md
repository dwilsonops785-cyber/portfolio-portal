# Portfolio Portal - Phase 1

A modern portfolio showcase system for AI-assisted development projects, built with Next.js 14+ and comprehensive security features.

## Features

### Security
- **Comprehensive Secrets Scanner**: Automatically detects and prevents credential exposure
  - API keys, tokens, and authentication credentials
  - Cloud provider keys (AWS, Azure, GCP)
  - Database connection strings
  - OAuth tokens and client secrets
  - Campaign identifiers and marketing credentials
  - Private keys and SSH keys
  - Service-specific keys (Stripe, GitHub, Slack, etc.)

### Admin Features
- Simple password-based authentication
- Project CRUD operations (Create, Read, Update, Delete)
- Real-time secrets validation during content editing
- Project status management (Concept, Development, Production)
- Technology and label tagging
- Featured project highlighting
- Version tracking

### Public Features
- Modern dark-themed portfolio showcase
- Project filtering by status
- Responsive design (mobile-first)
- Individual project detail pages
- Professional glassmorphism UI

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: JSON files (ready for KV migration)
- **Deployment**: Optimized for Vercel

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local and set your admin password
# ADMIN_PASSWORD=your_secure_password
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the site.

### Admin Access

1. Navigate to `/admin/login`
2. Default development password: `admin123`
3. **IMPORTANT**: Set `ADMIN_PASSWORD` environment variable in production!

### Creating Projects

1. Log in to the admin dashboard
2. Click "New Project" or navigate to `/admin/projects/new`
3. Fill in project details
4. The secrets scanner will automatically validate your input
5. Save the project

## Project Structure

```
/app
  /page.tsx                        - Landing page
  /projects/[slug]/page.tsx        - Project detail page
  /admin
    /login/page.tsx                - Admin login
    /dashboard/page.tsx            - Admin dashboard
    /projects/new/page.tsx         - Create project
    /projects/[id]/edit/page.tsx   - Edit project
  /api
    /auth/route.ts                 - Authentication API
    /projects/route.ts             - Projects CRUD API

/components
  /ui                              - Reusable UI components
  /admin                           - Admin-specific components
  /public                          - Public-facing components

/lib
  /security
    /secrets-scanner.ts            - Main scanner
    /patterns.ts                   - Detection patterns
  /utils
    /projects.ts                   - Project utilities
    /auth.ts                       - Auth utilities
  /types
    /project.ts                    - TypeScript types

/data
  /projects                        - JSON storage
    /example-project.json          - Example template
```

## Security Scanner

The built-in secrets scanner detects:
- Generic API keys and tokens
- Bearer tokens and JWTs
- OAuth credentials (client secrets, access tokens)
- Campaign identifiers and secrets
- Cloud provider credentials
- Database connection strings
- Private keys
- Webhook URLs with tokens
- Base64 encoded secrets
- Suspicious variable names

All content is scanned in real-time before saving.

## Environment Variables

```env
# Required in production
ADMIN_PASSWORD=your_secure_password_here

# Automatic
NODE_ENV=development|production
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `ADMIN_PASSWORD`: Your secure admin password
4. Deploy

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- File system access for JSON storage
- Environment variables

## Data Storage

Phase 1 uses JSON files stored in `/data/projects/`. Each project is stored as an individual JSON file.

**Ready for Migration**: The data layer is abstracted and can be easily migrated to Vercel KV or other databases in future phases.

## Customization

### Theme Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  background: "#0A0A0B",  // Near black
  card: "#111113",        // Card background
  accent: "#00D4FF",      // Cyan accent
  success: "#10B981",     // Green
  warning: "#F59E0B",     // Orange
  error: "#EF4444",       // Red
}
```

### Typography

Edit `app/globals.css`:
```css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

## Project Data Schema

```typescript
interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription?: string
  status: 'concept' | 'development' | 'production'
  labels: string[]
  technologies: string[]
  metrics?: {
    startDate?: string
    completionDate?: string
    developmentHours?: number
  }
  thumbnailUrl?: string
  demoUrl?: string
  demoType?: 'live' | 'video' | 'none'
  currentVersion?: string
  createdAt: string
  updatedAt: string
  featured: boolean
  sortOrder: number
}
```

## Future Enhancements (Phase 2+)

- Advanced project content (code snippets, galleries, changelogs)
- Analytics and metrics tracking
- Search functionality
- Tag-based filtering
- RSS feed
- Dark/light theme toggle
- Migration to Vercel KV
- GitHub integration
- Automated screenshots

## License

MIT

## Support

For issues or questions, please refer to the project documentation or create an issue in your repository.

---

**Built with AI assistance - Showcasing the future of development**
