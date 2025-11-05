import { getAllProjects } from '@/lib/utils/projects';
import { ProjectsGallery } from './projects-gallery';
import { ProjectShowcaseCarousel } from '@/components/public/project-showcase-carousel';

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
              SNO911 AI-Assisted Development Applications
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              Showcasing the power of human-AI collaboration in software development.
              Explore projects built with cutting-edge AI assistance and modern technologies to address operational needs in public safety.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:flex lg:gap-4">
              <div className="glass-card px-3 py-3 sm:px-6 sm:py-4 hover:border-accent/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-accent">{projects.length}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Projects</div>
              </div>
              <div className="glass-card px-3 py-3 sm:px-6 sm:py-4 hover:border-success/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-success">
                  {projects.filter(p => p.status === 'production').length}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Production</div>
              </div>
              <div className="glass-card px-3 py-3 sm:px-6 sm:py-4 hover:border-warning/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-warning">
                  {projects.filter(p => p.status === 'development').length}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Development</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Carousel */}
      <ProjectShowcaseCarousel projects={projects} />

      {/* Projects Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ProjectsGallery projects={projects} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
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
