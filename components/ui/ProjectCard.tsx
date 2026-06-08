import { ExternalLink, GitBranch } from 'lucide-react'

interface Project {
  _id: string
  title: string
  shortDesc: string
  techStack: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  thumbnail?: string
  featured: boolean
}

export default function ProjectCard({ project }: { project: Project }) {
  const categoryColors: Record<string, string> = {
    'Full-Stack': 'text-cyan border-cyan/30 bg-cyan/5',
    Frontend: 'text-violet border-violet/30 bg-violet/5',
    Backend: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  }

  return (
    <div className="glass-card group h-full flex flex-col overflow-hidden hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.06)] transition-all duration-500">
      {/* Thumbnail / gradient header */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-space via-violet/10 to-cyan/10">
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-space font-bold text-white/5 select-none">
              {project.title.charAt(0)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-violet/10" />
            {/* Decorative dots */}
            <div className="absolute top-4 right-4 grid grid-cols-3 gap-1.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
              ))}
            </div>
          </div>
        )}

        {/* Category badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-dm-mono border ${categoryColors[project.category] ?? 'text-white/50 border-white/10'}`}>
          {project.category}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-dm-mono text-amber-400 border border-amber-400/30 bg-amber-400/10">
            ★ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-space font-bold text-white text-lg mb-2 group-hover:text-cyan transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/55 font-inter text-sm leading-relaxed mb-4 flex-1">
          {project.shortDesc}
        </p>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs font-dm-mono text-white/40 border border-white/10 rounded-md bg-white/5">
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-0.5 text-xs font-dm-mono text-white/30 border border-white/5 rounded-md">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-space transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan hover:text-cyan/80 text-xs font-space transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
