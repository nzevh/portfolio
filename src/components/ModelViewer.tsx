import { useRef, useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


interface ModelViewerProps {
  modelUrl: string;
}

const Model = ({ modelUrl }: { modelUrl: string }) => {
  // Ensure the model URL is correctly prefixed
  const fullModelUrl = `/models/${modelUrl}`;
  const gltf = useLoader(GLTFLoader, fullModelUrl);
  return <primitive object={gltf.scene} scale={1} />;
}

const ModelViewer = ({ modelUrl }: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} />
          
          <Suspense fallback={null}>
            <Model modelUrl={modelUrl} />
          </Suspense>
          
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
