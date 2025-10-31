import { getAllProjects } from '@/lib/utils/projects';
import { ProjectsGallery } from './projects-gallery';
import { ProjectShowcaseCarousel } from '@/components/public/project-showcase-carousel';

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              SNO911 AI-Assisted Development Applications
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Showcasing the power of human-AI collaboration in software development.
              Explore projects built with cutting-edge AI assistance and modern technologies to address operational needs in public safety.
            </p>
            <div className="flex gap-4">
              <div className="glass-card px-6 py-4">
                <div className="text-3xl font-bold text-accent">{projects.length}</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="glass-card px-6 py-4">
                <div className="text-3xl font-bold text-success">
                  {projects.filter(p => p.status === 'production').length}
                </div>
                <div className="text-sm text-gray-400">In Production</div>
              </div>
              <div className="glass-card px-6 py-4">
                <div className="text-3xl font-bold text-warning">
                  {projects.filter(p => p.status === 'development').length}
                </div>
                <div className="text-sm text-gray-400">In Development</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Carousel */}
      <ProjectShowcaseCarousel projects={projects} />

      {/* Projects Gallery */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <ProjectsGallery projects={projects} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Portfolio Portal - Showcasing AI-Assisted Development
            </p>
            <a
              href="/admin/login"
              className="text-gray-500 hover:text-accent text-sm transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
