'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/public/project-card';
import { ProjectFilter } from '@/components/public/project-filter';
import type { Project, ProjectStatus } from '@/lib/types/project';

interface ProjectsGalleryProps {
  projects: Project[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = projects.filter(
    (project) => statusFilter === 'all' || project.status === statusFilter
  );

  const counts = {
    all: projects.length,
    concept: projects.filter(p => p.status === 'concept').length,
    development: projects.filter(p => p.status === 'development').length,
    production: projects.filter(p => p.status === 'production').length,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filter */}
      <div className="lg:col-span-1">
        <ProjectFilter
          currentStatus={statusFilter}
          onStatusChange={setStatusFilter}
          counts={counts}
        />
      </div>

      {/* Projects Grid */}
      <div className="lg:col-span-3">
        {filteredProjects.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-400">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
