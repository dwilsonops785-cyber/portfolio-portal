import Link from 'next/link';
import type { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="glass-card p-6 hover:border-accent/50 transition-all duration-300 h-full">
        {project.thumbnailUrl && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-900 h-48">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold hover:text-accent transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded ml-2 flex-shrink-0">
              Featured
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs px-3 py-1 rounded ${
              project.status === 'production'
                ? 'bg-success/20 text-success'
                : project.status === 'development'
                ? 'bg-warning/20 text-warning'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {project.status}
          </span>
          {project.currentVersion && (
            <span className="text-xs text-gray-500">v{project.currentVersion}</span>
          )}
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {project.labels.slice(0, 3).map((label) => (
            <span key={label} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
              {label}
            </span>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-card border border-gray-700 rounded text-gray-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 text-gray-500">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
