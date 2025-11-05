import Link from 'next/link';
import type { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className="glass-card p-4 sm:p-6 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 h-full flex flex-col">
        {project.thumbnailUrl && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {project.featured && (
              <div className="absolute top-2 right-2 bg-accent/90 backdrop-blur-sm text-black text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
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
                <span className="text-xs text-gray-500 font-mono">v{project.currentVersion}</span>
              )}
            </div>

            {project.labels.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {project.labels.slice(0, 2).map((label) => (
                  <span key={label} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                    {label}
                  </span>
                ))}
                {project.labels.length > 2 && (
                  <span className="text-xs px-2 py-1 text-gray-500">
                    +{project.labels.length - 2}
                  </span>
                )}
              </div>
            )}

            <div className="flex gap-1.5 flex-wrap">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-card border border-gray-700 rounded text-gray-400"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
