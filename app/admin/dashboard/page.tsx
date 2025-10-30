import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/utils/auth';
import { getProjectStats } from '@/lib/utils/projects';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const stats = await getProjectStats();

  const handleLogout = async () => {
    'use server';
    const { clearAuthCookie } = await import('@/lib/utils/auth');
    await clearAuthCookie();
    redirect('/admin/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your portfolio projects</p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="secondary">View Site</Button>
            </Link>
            <form action={handleLogout}>
              <Button variant="secondary" type="submit">Logout</Button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{stats.total}</div>
                <div className="text-gray-400">Total Projects</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">{stats.byStatus.production}</div>
                <div className="text-gray-400">Production</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-warning mb-2">{stats.byStatus.development}</div>
                <div className="text-gray-400">Development</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-400 mb-2">{stats.byStatus.concept}</div>
                <div className="text-gray-400">Concept</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/projects/new">
                <div className="p-6 border border-gray-700 rounded-lg hover:border-accent transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-accent mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <h3 className="font-semibold mb-1">New Project</h3>
                  <p className="text-sm text-gray-400">Create a new project entry</p>
                </div>
              </Link>

              <Link href="/admin/projects">
                <div className="p-6 border border-gray-700 rounded-lg hover:border-accent transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-accent mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <h3 className="font-semibold mb-1">Manage Projects</h3>
                  <p className="text-sm text-gray-400">Edit or delete existing projects</p>
                </div>
              </Link>

              <Link href="/">
                <div className="p-6 border border-gray-700 rounded-lg hover:border-accent transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-accent mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <h3 className="font-semibold mb-1">View Site</h3>
                  <p className="text-sm text-gray-400">See the public portfolio</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Storage</span>
                <span>JSON Files</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Security</span>
                <span className="text-success">Secrets Scanner Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Featured Projects</span>
                <span>{stats.featured}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
