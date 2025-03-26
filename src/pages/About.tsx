
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
              About Me
            </h1>
            
            <div className="prose prose-lg max-w-none animate-fade-in animation-delay-200">
              <p className="text-xl text-muted-foreground mb-8">
                I'm a Mechatronics Engineer and Software Developer with a passion for creating innovative solutions that bridge the gap between hardware and software.
              </p>
              
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-12">
                <img 
                  src="/placeholder.svg" 
                  alt="John Doe" 
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">My Background</h2>
              <p>
                With a strong foundation in mechanical and electrical engineering principles, combined with expertise in software development, I bring a unique perspective to every project. My interdisciplinary approach allows me to design and implement complete systems that integrate hardware and software seamlessly.
              </p>
              
              <p>
                Throughout my career, I've worked on a diverse range of projects, including autonomous robots, embedded systems, web applications, and AI/ML solutions. This breadth of experience has given me a comprehensive understanding of the entire development process, from concept to deployment.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">My Approach</h2>
              <p>
                I believe in a user-centered design approach, where technology serves human needs and enhances human capabilities. When developing solutions, I focus on creating systems that are not only technically sophisticated but also intuitive, accessible, and enjoyable to use.
              </p>
              
              <p>
                My process typically involves thorough research and planning, iterative prototyping, rigorous testing, and continuous refinement. I'm a strong advocate for clean, maintainable code and well-documented systems that can be built upon and extended over time.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Outside of Work</h2>
              <p>
                When I'm not designing robots or writing code, you might find me exploring new technologies, contributing to open-source projects, or mentoring aspiring engineers. I'm passionate about sharing knowledge and helping others develop their skills in engineering and software development.
              </p>
              
              <div className="my-12 p-8 rounded-lg neo-blur">
                <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
                <p className="mb-6">
                  I'm always open to interesting conversations, collaboration opportunities, and new challenges. If you have a project in mind or just want to say hello, I'd love to hear from you.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 hover:translate-y-[-2px] active:translate-y-[0px]"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
