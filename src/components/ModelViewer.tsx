import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelViewerProps {
  modelUrl: string;
  scale?: number;
}

const ModelViewer = ({ modelUrl, scale = 0.1 }: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState<THREE.Group | null>(null);

  // Load the GLTF model from the provided URL with colors and textures
  useEffect(() => {
    if (modelUrl) {
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          setModel(gltf.scene);
          setIsLoading(false);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          setIsLoading(false); // Stop loading if there's an error
        }
      );
    }
  }, [modelUrl]);

  return (
    <div className="relative w-full h-full bg-gray-200"> {/* Background color added here */}
      <div ref={containerRef} className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 40 }}
          gl={{ antialias: true }}
          style={{ background: '#333333' }} // Light gray background for the 3D canvas
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} />

          {/* Display model with textures and colors, or a simple cube if not loaded */}
          {model ? (
            <primitive object={model} scale={[scale, scale, scale]} />
          ) : (
            <Box args={[2, 2, 2]}>
              <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.4} />
            </Box>
          )}

          <OrbitControls enableDamping dampingFactor={0.05} rotateSpeed={0.5} />
        </Canvas>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
