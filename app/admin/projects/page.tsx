import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/utils/auth';
import { getAllProjects } from '@/lib/utils/projects';
import { Card } from '@/components/ui/card';

export default async function AdminProjectsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const projects = await getAllProjects();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-accent hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Manage Projects</h1>
          <Link href="/admin/projects/new">
            <button className="btn btn-primary">New Project</button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-400 mb-4">No projects yet</p>
            <Link href="/admin/projects/new">
              <button className="btn btn-primary">Create Your First Project</button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.status === 'production'
                            ? 'bg-success/20 text-success'
                            : project.status === 'development'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {project.status}
                      </span>
                      {project.featured && (
                        <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{project.shortDescription}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-card border border-gray-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <button className="btn btn-secondary text-sm py-1">Edit</button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
