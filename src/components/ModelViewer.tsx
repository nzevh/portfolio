import { useRef, useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


interface ModelViewerProps {
  modelUrl: string;
}

const Model = ({ modelUrl }: { modelUrl: string }) => {
  // Handle both .obj and .glb/.gltf files
  const fileExtension = modelUrl.split('.').pop()?.toLowerCase();
  
  if (fileExtension === 'obj') {
    const obj = useLoader(OBJLoader, modelUrl);
    return <primitive object={obj} scale={1} />;
  } else {
    const gltf = useLoader(GLTFLoader, modelUrl);
    return <primitive object={gltf.scene} scale={1} />;
  }
}

const ModelViewer = ({ modelUrl }: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

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
