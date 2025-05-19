import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Bounds } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface ModelViewerProps {
  modelUrl: string;
  textureUrl?: string;
  scale?: number;
}

const ModelViewer = ({
  modelUrl,
  textureUrl,
  scale = 0.1,
}: ModelViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scene, setScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const loadedScene = gltf.scene;

        if (textureUrl) {
          const texLoader = new TextureLoader();
          texLoader.load(
            textureUrl,
            (tex) => {
              loadedScene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  mesh.material = new THREE.MeshPhysicalMaterial({
                    map: tex,
                    metalness: 0.3,
                    roughness: 0.4,
                  });
                }
              });

              setScene(loadedScene);
              setIsLoading(false);
            },
            undefined,
            (err) => {
              console.error('Error loading texture:', err);
              setScene(loadedScene);
              setIsLoading(false);
            }
          );
        } else {
          setScene(loadedScene);
          setIsLoading(false);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        setIsLoading(false);
      }
    );
  }, [modelUrl, textureUrl]);

  return (
    <div className="relative w-full h-full bg-gray-200">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true }}
        style={{ background: '#333333' }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[1, 1, 1]} intensity={0.35} />

        <Bounds fit clip margin={1.2}>
          {scene ? (
            <primitive
              object={scene}
              scale={[scale, scale, scale]}
              rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
            />
          ) : (
            <Box args={[2, 2, 2]}>
              <meshStandardMaterial
                color="#2563eb"
                metalness={0.3}
                roughness={0.4}
              />
            </Box>
          )}
        </Bounds>

        <OrbitControls makeDefault enableDamping dampingFactor={0.05} rotateSpeed={0.5} />
      </Canvas>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
