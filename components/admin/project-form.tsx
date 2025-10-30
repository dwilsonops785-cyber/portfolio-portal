'use client';

import React, { useState, useEffect } from 'react';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SecretsValidator } from './secrets-validator';
import { scanForSecrets } from '@/lib/security/secrets-scanner';
import type { Project, CreateProjectInput, UpdateProjectInput } from '@/lib/types/project';
import type { SecretFinding } from '@/lib/security/secrets-scanner';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectInput>({
    title: project?.title || '',
    shortDescription: project?.shortDescription || '',
    longDescription: project?.longDescription || '',
    status: project?.status || 'concept',
    labels: project?.labels || [],
    technologies: project?.technologies || [],
    demoUrl: project?.demoUrl || '',
    demoType: project?.demoType || 'none',
    thumbnailUrl: project?.thumbnailUrl || '',
    currentVersion: project?.currentVersion || '',
    featured: project?.featured || false,
    metrics: project?.metrics || {},
  });

  const [labelsInput, setLabelsInput] = useState(project?.labels?.join(', ') || '');
  const [techInput, setTechInput] = useState(project?.technologies?.join(', ') || '');
  const [secretFindings, setSecretFindings] = useState<SecretFinding[]>([]);
  const [severity, setSeverity] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scan for secrets whenever form data changes
  useEffect(() => {
    const textContent = [
      formData.title,
      formData.shortDescription,
      formData.longDescription || '',
      formData.demoUrl || '',
      labelsInput,
      techInput,
    ].join('\n');

    const result = scanForSecrets(textContent);
    setSecretFindings(result.findings);
    setSeverity(result.severity);
  }, [formData, labelsInput, techInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (secretFindings.length > 0) {
      alert('Please remove all secrets before saving');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        labels: labelsInput.split(',').map(l => l.trim()).filter(Boolean),
        technologies: techInput.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (project) {
        await onSubmit({ ...submitData, id: project.id } as UpdateProjectInput);
      } else {
        await onSubmit(submitData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SecretsValidator findings={secretFindings} severity={severity} />

      <Input
        label="Project Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="My Awesome Project"
        required
      />

      <Textarea
        label="Short Description *"
        value={formData.shortDescription}
        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
        placeholder="A brief description of the project..."
        rows={3}
        required
      />

      <Textarea
        label="Long Description"
        value={formData.longDescription}
        onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
        placeholder="Detailed information about the project..."
        rows={6}
      />

      <div>
        <label className="label">Status *</label>
        <select
          className="input"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          required
        >
          <option value="concept">Concept</option>
          <option value="development">Development</option>
          <option value="production">Production</option>
        </select>
      </div>

      <Input
        label="Labels (comma-separated)"
        value={labelsInput}
        onChange={(e) => setLabelsInput(e.target.value)}
        placeholder="AI, Automation, Web"
      />

      <Input
        label="Technologies (comma-separated)"
        value={techInput}
        onChange={(e) => setTechInput(e.target.value)}
        placeholder="Next.js, TypeScript, OpenAI"
      />

      <Input
        label="Demo URL"
        type="url"
        value={formData.demoUrl}
        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
        placeholder="https://example.com/demo"
      />

      <div>
        <label className="label">Demo Type</label>
        <select
          className="input"
          value={formData.demoType}
          onChange={(e) => setFormData({ ...formData, demoType: e.target.value as any })}
        >
          <option value="none">None</option>
          <option value="live">Live Demo</option>
          <option value="video">Video Demo</option>
        </select>
      </div>

      <Input
        label="Thumbnail URL"
        type="url"
        value={formData.thumbnailUrl}
        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
        placeholder="https://example.com/thumbnail.jpg"
      />

      <Input
        label="Current Version"
        value={formData.currentVersion}
        onChange={(e) => setFormData({ ...formData, currentVersion: e.target.value })}
        placeholder="1.0.0"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="text-sm text-gray-300">
          Feature this project on the homepage
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting || secretFindings.length > 0}>
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
