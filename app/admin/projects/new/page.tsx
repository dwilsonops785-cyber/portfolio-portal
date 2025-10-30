'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectForm } from '@/components/admin/project-form';
import type { CreateProjectInput, UpdateProjectInput } from '@/lib/types/project';

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = async (data: CreateProjectInput | UpdateProjectInput) => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert('Project created successfully!');
      router.push('/admin/dashboard');
    } else {
      throw new Error(result.message || 'Failed to create project');
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

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
            <CardTitle>Create New Project</CardTitle>
            <p className="text-gray-400 text-sm mt-2">
              Add a new project to your portfolio. The system will automatically scan for any
              sensitive information before saving.
            </p>
          </CardHeader>
          <CardContent>
            <ProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
