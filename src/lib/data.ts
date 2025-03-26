
export type ProjectCategory = 'mechatronics' | 'software' | 'ai-ml';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  modelUrl?: string; // for 3D models
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'mechatronics-robot',
    title: 'Autonomous Robot',
    description: 'A fully autonomous robot designed for warehouse navigation with obstacle avoidance and path planning capabilities.',
    category: 'mechatronics',
    image: '/placeholder.svg',
    technologies: ['Arduino', 'ROS', 'C++', 'Sensor Fusion'],
    modelUrl: '/robot.obj',
    featured: true
  },
  {
    id: 'mechatronics-drone',
    title: 'Smart Drone System',
    description: 'A custom-built drone with advanced stabilization and autonomous flight capabilities for aerial surveying.',
    category: 'mechatronics',
    image: '/placeholder.svg',
    technologies: ['ESP32', 'IMU Sensors', 'Embedded Systems', 'Control Theory'],
    modelUrl: 'sample-model-url',
  },
  {
    id: 'mechatronics-prosthetic',
    title: 'Biomechanical Prosthetic Hand',
    description: 'A low-cost prosthetic hand with advanced grip patterns and natural motion control.',
    category: 'mechatronics',
    image: '/placeholder.svg',
    technologies: ['CAD Design', 'Microcontrollers', 'Servo Motors', 'EMG Sensors'],
    modelUrl: 'sample-model-url',
  },
  {
    id: 'software-portfolio',
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React and Three.js for showcasing projects with interactive 3D elements.',
    category: 'software',
    image: '/placeholder.svg',
    technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    link: 'https://example.com',
    githubLink: 'https://github.com/username/portfolio',
    featured: true
  },
  {
    id: 'software-cms',
    title: 'Content Management System',
    description: 'A full-stack CMS with user authentication, content creation, and administrative capabilities.',
    category: 'software',
    image: '/placeholder.svg',
    technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
    githubLink: 'https://github.com/username/cms'
  },
  {
    id: 'software-ecommerce',
    title: 'E-commerce Platform',
    description: 'A responsive e-commerce platform with product management, cart functionality, and payment processing.',
    category: 'software',
    image: '/placeholder.svg',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Styled Components']
  },
  {
    id: 'ai-ml-nlp',
    title: 'Natural Language Processing Tool',
    description: 'A tool for sentiment analysis and entity recognition in large text datasets using transformer models.',
    category: 'ai-ml',
    image: '/placeholder.svg',
    technologies: ['Python', 'PyTorch', 'BERT', 'Hugging Face'],
    githubLink: 'https://github.com/username/nlp-tool',
    featured: true
  },
  {
    id: 'ai-ml-cv',
    title: 'Computer Vision System',
    description: 'A computer vision system for real-time object detection and classification optimized for edge devices.',
    category: 'ai-ml',
    image: '/placeholder.svg',
    technologies: ['TensorFlow', 'OpenCV', 'Raspberry Pi', 'YOLOv5']
  },
  {
    id: 'ai-ml-recommender',
    title: 'Recommendation Engine',
    description: 'A recommendation engine that uses collaborative filtering and content-based approaches for personalized suggestions.',
    category: 'ai-ml',
    image: '/placeholder.svg',
    technologies: ['Python', 'Scikit-learn', 'FastAPI', 'Redis']
  }
];

export const skills = [
  {
    category: 'Mechatronics Engineering',
    items: [
      'Robotics Design & Development',
      'Embedded Systems',
      'Control Systems',
      'CAD/CAM',
      'Circuit Design',
      'IoT Integration',
      'Sensor Integration',
      'Prototyping'
    ]
  },
  {
    category: 'Software Engineering',
    items: [
      'Full-Stack Development',
      'React/Next.js',
      'TypeScript',
      'Node.js',
      'RESTful APIs',
      'Database Design',
      'DevOps',
      'UI/UX Design'
    ]
  },
  {
    category: 'AI/ML',
    items: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Data Analysis',
      'PyTorch/TensorFlow',
      'Reinforcement Learning',
      'MLOps'
    ]
  }
];
