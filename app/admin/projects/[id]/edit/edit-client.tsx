'use client';

import { useRouter } from 'next/navigation';
import { ProjectForm } from '@/components/admin/project-form';
import type { Project, CreateProjectInput, UpdateProjectInput } from '@/lib/types/project';

interface EditProjectClientProps {
  project: Project;
}

export function EditProjectClient({ project }: EditProjectClientProps) {
  const router = useRouter();

  const handleSubmit = async (data: CreateProjectInput | UpdateProjectInput) => {
    const response = await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert('Project updated successfully!');
      router.push('/admin/dashboard');
    } else {
      throw new Error(result.message || 'Failed to update project');
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  return <ProjectForm project={project} onSubmit={handleSubmit} onCancel={handleCancel} />;
}
