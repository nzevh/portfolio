
import { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const delayClass = `animation-delay-${(index % 3) * 200}`;
  
  return (
    <div 
    className={cn("group h-full animate-fade-in", 
      index === 0 ? "" : delayClass
    )}
    >
      <div className="h-full rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
        <div className="aspect-video w-full overflow-hidden rounded-md bg-muted mb-5">
          <img 
            src={project.image} 
            alt={project.title} 
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary">
            {project.category === 'mechatronics' ? 'Mechatronics Engineering' : 
             project.category === 'software' ? 'Software Engineering' : 'AI/ML'}
          </div>
          {project.featured && (
            <div className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
              Featured
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-secondary/50">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-secondary/50">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <Link 
            to={`/projects/${project.id}`}
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            View Details
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Link>

          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              <Github className="mr-1 h-3.5 w-3.5" />
              Code
            </a>
          )}

          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
