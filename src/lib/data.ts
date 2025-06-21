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
  textureUrl?: string; // for model textures
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'mechatronics-robot',
    title: 'Autonomous Robot',
    description: 'A fully autonomous robot designed for warehouse navigation with obstacle avoidance and path planning capabilities.',
    category: 'mechatronics',
    image: '/model_render/arm.png',
    technologies: ['Arduino', 'ROS', 'C++', 'Sensor Fusion'],
    modelUrl: '/models/nean.glb',
    featured: true
  },
  {
    id: 'mechatronics-slicer',
    title: 'Onion Slicer Machine',
    description: 'A low-cost onion slicer system for restaurants and food processing industries for cutting many bulbs of onions faster.',
    category: 'mechatronics',
    image: '/model_render/slicer.png',
    technologies: ['CAD Design', '3D Printing', 'Arduino', 'Mechanical Design'],
    modelUrl: '/models/slicer.glb',
  },
  {
    id: 'mechatronics-stairs',
    title: 'Automated Folding Stairs',
    description: 'A unique staircase design that automatically adjusts its height and angle based on user preference and space constraints.',
    category: 'mechatronics',
    image: '/model_render/folding_stairs.jpg',
    technologies: ['CAD Design', '3D Printing', 'Arduino', 'Mechanical Design'],
    modelUrl: '/models/folding_stairs.glb',
  },
  {
    id: 'mechatronics-vase',
    title: 'Vase Design',
    description: 'A 3D-printed vase with intricate designs, showcasing advanced CAD modeling and 3D printing techniques.',
    category: 'mechatronics',
    image: '/model_render/vase.png',
    technologies: ['CAD Design', '3D Printing'],
    modelUrl: '/models/vase.glb',
  },
  {
    id: 'software-portfolio',
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React and Three.js for showcasing projects with interactive 3D elements.',
    category: 'software',
    image: '/placeholder.svg',
    technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    githubLink: 'https://github.com/thenzevhukwu/portfolio',
  },
  {
    id: 'software-social-3d-app',
    title: 'Social 3d Mobile Application',
    description: 'A social media application with 3D avatars and environments, allowing users to interact in a virtual space.',
    category: 'software',
    image: '/model_render/threed.png',
    technologies: ['React-Native', 'Expo', 'Clerk', 'Convex'],
    githubLink: 'https://github.com/thenzevhukwu/threed',
    featured: true
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
      'Control Systems',
      'CAD/CAM',
      'IoT Integration',
      'Simulation',
      'Sensor Integration',
      'Prototyping'
    ]
  },
  {
    category: 'Software Engineering',
    items: [
      'React Native app Development',
      'React/Next.js',
      'TypeScript',
      'Node.js',
      'RESTful APIs',
      'Database Design'
    ]
  },

  
  {
    category: 'AI/ML',
    items: [
      'Machine Learning',
      'Deep Learning (Pytorch, JAX, TF, etc)',
      'Imitation Learning',
      'Computer Vision',
      'Robot simulations (Gazebo)',
      'Natural Language Processing',
      'PyTorch/TensorFlow',
      'Reinforcement Learning',
      'Multi-GPU training'
    ]
  }

];
