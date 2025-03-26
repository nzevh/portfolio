import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_e378k3v";
    const templateId = "template_ww05sde";
    const publicKey = "FACo1uB6hIe6lY1zK";

    emailjs.send(serviceId, templateId, formData, publicKey)
      .then(() => {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        setIsSubmitting(false);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "There was an error sending your message. Please try again later.",
        });
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <div className="section-container">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to connect? Feel free to reach out through the form below or via my social media channels.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 animate-fade-in animation-delay-200">
              <div className="space-y-8">
                <div className="glass-morphism p-6 rounded-lg">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a 
                        href="mailto:hello@example.com" 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        favourdimora43@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="glass-morphism p-6 rounded-lg">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">
                        Bells University of Technology, Ota
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass-morphism p-6 rounded-lg">
                  <h3 className="font-medium mb-3">Connect</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/thenzevhukwu/skillful-3d-portfolio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/favour-adimora" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="mailto:favourdimora43@gmail.com" 
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 animate-fade-in animation-delay-400">
              <form 
                onSubmit={handleSubmit} 
                className="glass-morphism p-8 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
