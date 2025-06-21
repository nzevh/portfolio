
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { projects, skills } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Skills Section */}
        <section className="py-24 bg-secondary">
          <div className="section-container">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Expertise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Bridging the gap between hardware and software with a diverse skill set spanning mechanical, electrical, and software engineering.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => (
                <div 
                  key={skillGroup.category} 
                  className={`glass-morphism p-8 rounded-lg animate-fade-in animation-delay-${index * 200}`}
                >
                  <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span className="text-muted-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="py-24">
          <div className="section-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl">
                  A selection of my recent work spanning mechatronics, software development.
                </p>
              </div>
              <Link 
                to="/projects" 
                className="inline-flex items-center text-sm font-medium mt-4 md:mt-0 hover:text-primary transition-colors animate-fade-in"
              >
                View All Projects
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="section-container text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's work together</h2>
              <p className="mb-8">
                I'm always open to new opportunities and collaborations. If you have a project in mind or just want to connect, feel free to reach out.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-foreground text-primary font-medium transition-all hover:opacity-90 hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
