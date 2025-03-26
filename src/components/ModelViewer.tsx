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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const gltfLoader = new GLTFLoader();
        const gltf = await new Promise((resolve, reject) => {
          gltfLoader.load(
            modelUrl,
            resolve,
            undefined,
            (error) => reject(new Error(error.message))
          );
        });
        setModel(gltf);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load model');
        console.error('Error loading model:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (modelUrl) {
      loadModel();
    }
  }, [modelUrl]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} />
          
          {!error && model ? (
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
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-red-500">Failed to load model</div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
