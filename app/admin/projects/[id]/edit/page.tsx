import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/utils/auth';
import { getProjectById } from '@/lib/utils/projects';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EditProjectClient } from './edit-client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-accent hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
            <p className="text-gray-400 text-sm mt-2">
              Update project information. The system will automatically scan for any
              sensitive information before saving.
            </p>
          </CardHeader>
          <CardContent>
            <EditProjectClient project={project} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
