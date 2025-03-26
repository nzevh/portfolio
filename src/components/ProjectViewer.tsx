
import { Project, projects } from "@/lib/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";

const ProjectViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
      setLoading(false);
    } else {
      // Project not found, redirect to projects page
      setTimeout(() => navigate('/projects'), 100);
    }
  }, [id, navigate]);

  if (loading || !project) {
    return (
      <div className="section-container min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-secondary rounded mb-4"></div>
          <div className="h-4 w-96 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container pt-32 pb-20 animate-fade-in">
      <Link 
        to="/projects" 
        className="inline-flex items-center text-sm font-medium mb-8 hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="text-sm font-medium px-3 py-1 rounded-full bg-secondary">
              {project.category === 'mechatronics' ? 'Mechatronics Engineering' : 
               project.category === 'software' ? 'Software Engineering' : 'AI/ML'}
            </div>
            {project.featured && (
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                Featured
              </div>
            )}
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-sm px-3 py-1 rounded-full bg-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:opacity-90"
              >
                Live Demo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-input font-medium transition-all hover:bg-secondary"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-lg border border-border overflow-hidden bg-card shadow-sm">
            {project.category === 'mechatronics' && project.modelUrl ? (
              <div className="aspect-square w-full">
                <ModelViewer modelUrl={project.modelUrl} />
              </div>
            ) : (
              <div className="aspect-video w-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
