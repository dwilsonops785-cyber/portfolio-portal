import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getProjectBySlug, getAllProjects } from '@/lib/utils/projects';
import { Card } from '@/components/ui/card';
import { ScreenshotGallery } from '@/components/public/screenshot-gallery';
import { DemoAccessButton } from '@/components/public/demo-access-button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <Link href="/" className="text-accent hover:underline text-sm mb-4 inline-block">
            ← Back to Projects
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Title and Status */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            {project.featured && (
              <span className="text-sm px-3 py-1 bg-accent/20 text-accent rounded ml-4 flex-shrink-0">
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`text-sm px-4 py-2 rounded ${
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
              <span className="text-gray-400">Version {project.currentVersion}</span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {project.thumbnailUrl && (
          <div className="mb-8 rounded-lg overflow-hidden bg-gray-900">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Short Description */}
        <Card className="mb-8 p-6">
          <p className="text-lg text-gray-300">{project.shortDescription}</p>
        </Card>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
            <ScreenshotGallery screenshots={project.screenshots} projectTitle={project.title} />
          </Card>
        )}

        {/* Demo */}
        {project.demoUrl && project.demoType !== 'none' && (
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-bold mb-4">
              {project.demoType === 'live' ? 'Live Demo' : 'Video Demo'}
            </h2>
            <DemoAccessButton
              demoUrl={project.demoUrl}
              demoType={project.demoType || 'live'}
              projectSlug={project.slug}
            />
          </Card>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-card border border-gray-700 rounded-lg text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Labels */}
        {project.labels.length > 0 && (
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {project.labels.map((label) => (
                <span key={label} className="px-4 py-2 bg-accent/10 text-accent rounded-lg">
                  {label}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Metrics */}
        {project.metrics && (
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-bold mb-4">Project Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.metrics.startDate && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Start Date</div>
                  <div className="text-lg font-medium">
                    {new Date(project.metrics.startDate).toLocaleDateString()}
                  </div>
                </div>
              )}
              {project.metrics.completionDate && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Completion Date</div>
                  <div className="text-lg font-medium">
                    {new Date(project.metrics.completionDate).toLocaleDateString()}
                  </div>
                </div>
              )}
              {project.metrics.developmentHours && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Development Hours</div>
                  <div className="text-lg font-medium">{project.metrics.developmentHours}h</div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Metadata */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Project Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Created</span>
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated</span>
              <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>

        {/* Long Description - Moved to bottom */}
        {project.longDescription && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">About This Project</h2>
            <div className="prose prose-invert max-w-none
              prose-headings:font-bold
              prose-h1:text-3xl prose-h1:text-accent prose-h1:mb-6 prose-h1:mt-0
              prose-h2:text-2xl prose-h2:text-accent prose-h2:mb-5 prose-h2:mt-10 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-accent/30
              prose-h3:text-lg prose-h3:text-blue-400 prose-h3:mb-5 prose-h3:mt-8 prose-h3:font-bold prose-h3:text-center prose-h3:pb-3 prose-h3:border-b-2 prose-h3:border-blue-500
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
              prose-ul:my-3 prose-ul:space-y-2.5 prose-ul:bg-gray-900/30 prose-ul:p-4 prose-ul:rounded-lg prose-ul:border prose-ul:border-gray-800
              prose-li:text-gray-300 prose-li:leading-relaxed prose-li:text-[15px]
              prose-strong:text-white prose-strong:font-bold prose-strong:text-[15px]
              prose-code:text-accent prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              [&>*:first-child]:mt-0
              [&_ul]:list-none
              [&_li]:pl-0
              [&_li]:flex [&_li]:items-start [&_li]:gap-3
              [&_li::before]:content-[''] [&_li::before]:flex-shrink-0 [&_li::before]:w-1.5 [&_li::before]:h-1.5 [&_li::before]:rounded-full [&_li::before]:bg-accent [&_li::before]:mt-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({node, ...props}) => (
                    <h2 className="flex items-center gap-3 group" {...props}>
                      <span className="flex-shrink-0 w-1.5 h-8 bg-accent rounded-full"></span>
                      <span className="flex-1">{props.children}</span>
                    </h2>
                  ),
                }}
              >
                {project.longDescription}
              </ReactMarkdown>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
