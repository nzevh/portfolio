import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


interface ModelViewerProps {
  modelUrl: string;
}

const ModelViewer = ({ modelUrl }: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState<any>(null);

  // Load the 3D model
  useEffect(() => {
    const loadModel = async () => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(modelUrl, (gltf) => {
        setModel(gltf);
        setIsLoading(false);
      });
    };

    loadModel();
  }, [modelUrl]);

  // Simulate loading
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} />
          
          {/* Simple 3D cube as a placeholder */}
          {/* In a real implementation, you would load the 3D model from modelUrl */}

          {/* Show model if loaded, otherwise show a simple 3D cube as a placeholder */}
          {model ? (
            <primitive object={model.scene} scale={0.5} />
          ) : (
            <Box args={[2, 2, 2]}>
              <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.4} />
            </Box>
          )}
          
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            rotateSpeed={0.5}
          />
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
