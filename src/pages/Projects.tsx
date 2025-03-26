
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import ProjectViewer from '@/components/ProjectViewer';
import { projects, ProjectCategory } from '@/lib/data';

const categories: { value: ProjectCategory | 'all', label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'mechatronics', label: 'Mechatronics Engineering' },
  { value: 'software', label: 'Software Engineering' },
  { value: 'ai-ml', label: 'AI/ML' }
];

const Projects = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');

  // If we have an ID, show the project viewer
  if (id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <ProjectViewer />
        </main>
        <Footer />
      </div>
    );
  }

  // Filter projects by category
  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my work across different disciplines, from robotics and embedded systems to web applications and AI solutions.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-lg bg-secondary/50">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    category === cat.value
                      ? 'bg-background shadow-sm'
                      : 'hover:bg-background/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
