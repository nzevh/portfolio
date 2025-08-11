"use client"
import { Canvas } from "@react-three/fiber"
import { Center, ContactShadows, Environment, Html, OrbitControls, useGLTF, useTexture } from "@react-three/drei"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useAssetExists } from "@/hooks/use-asset-exists"
import * as THREE from "three"

type ModelViewerProps = {
  src?: string
  alt?: string
  className?: string
  bg?: string
  textures?: {
    map?: string
    normalMap?: string
    roughnessMap?: string
    metalnessMap?: string
    aoMap?: string
    displacementMap?: string
    emissiveMap?: string
  }
}

type TextureSet = {
  map?: THREE.Texture
  normalMap?: THREE.Texture
  roughnessMap?: THREE.Texture
  metalnessMap?: THREE.Texture
  aoMap?: THREE.Texture
  displacementMap?: THREE.Texture
  emissiveMap?: THREE.Texture
}

function ModelContent({ src = "/models/robot.glb", textures }: { src?: string; textures?: ModelViewerProps['textures'] }) {
  const gltf = useGLTF(src)
  const ref = useMemo(() => new THREE.Group(), [])
  
  // Load textures using useTexture hook
  const loadedTextures = useTexture(
    textures ? {
      ...(textures.map && { map: textures.map }),
      ...(textures.normalMap && { normalMap: textures.normalMap }),
      ...(textures.roughnessMap && { roughnessMap: textures.roughnessMap }),
      ...(textures.metalnessMap && { metalnessMap: textures.metalnessMap }),
      ...(textures.aoMap && { aoMap: textures.aoMap }),
      ...(textures.displacementMap && { displacementMap: textures.displacementMap }),
      ...(textures.emissiveMap && { emissiveMap: textures.emissiveMap }),
    } : {}
  ) as TextureSet

  useEffect(() => {
    if (gltf?.scene) {
      ref.clear()
      // Clone the scene to avoid modifying the original
      const scene = gltf.scene.clone()
      
      // Apply textures to all materials in the scene
      if (Object.keys(loadedTextures).length > 0) {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            // Handle both single materials and material arrays
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            
            materials.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial || 
                  material instanceof THREE.MeshPhysicalMaterial ||
                  material instanceof THREE.MeshBasicMaterial ||
                  material instanceof THREE.MeshLambertMaterial ||
                  material instanceof THREE.MeshPhongMaterial) {
                
                // Apply textures to material
                Object.entries(loadedTextures).forEach(([key, texture]) => {
                  if (texture && key in material) {
                    // Configure texture properties for better quality
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                    texture.generateMipmaps = true
                    texture.minFilter = THREE.LinearMipmapLinearFilter
                    texture.magFilter = THREE.LinearFilter
                    
                    // Apply the texture to the material
                    ;(material as any)[key] = texture
                  }
                })
                
                // Update material to reflect texture changes
                material.needsUpdate = true
              }
            })
          }
        })
      }
      
      ref.add(scene)
      
      // Compute bounding box for more accurate fitting
      const box = new THREE.Box3().setFromObject(scene)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      // Get the maximum dimension to ensure the model fits in all directions
      const maxDim = Math.max(size.x, size.y, size.z)
      
      // Scale to fit within a target size (adjust this value to control how much of the viewport the model fills)
      const targetSize = 2.0 // Adjust this to make model bigger (higher) or smaller (lower)
      const scale = targetSize / maxDim
      scene.scale.setScalar(scale)
      
      // Center the model at origin
      scene.position.copy(center.multiplyScalar(-scale))
    }
  }, [gltf, loadedTextures])

  return <primitive object={ref} />
}

function FallbackModel({ textures }: { textures?: ModelViewerProps['textures'] }) {
  // Load textures for fallback model if provided
  const loadedTextures = useTexture(
    textures ? {
      ...(textures.map && { map: textures.map }),
      ...(textures.normalMap && { normalMap: textures.normalMap }),
      ...(textures.roughnessMap && { roughnessMap: textures.roughnessMap }),
      ...(textures.metalnessMap && { metalnessMap: textures.metalnessMap }),
      ...(textures.aoMap && { aoMap: textures.aoMap }),
    } : {}
  ) as TextureSet

  const material = useMemo(() => {
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: "#e5e5e5",
      metalness: 0.6,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
    })

    // Apply loaded textures to fallback material
    Object.entries(loadedTextures).forEach(([key, texture]) => {
      if (texture && key in baseMaterial) {
        // Configure texture properties
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        
        ;(baseMaterial as any)[key] = texture
      }
    })

    return baseMaterial
  }, [loadedTextures])

  return (
    <Center>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.7, 0.25, 200, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Center>
  )
}

// Preload common assets
useGLTF.preload("/assets/3d/duck.glb")

// Preload textures if they exist
const preloadTextures = (textures?: ModelViewerProps['textures']) => {
  if (textures) {
    Object.values(textures).forEach(url => {
      if (url) {
        useTexture.preload(url)
      }
    })
  }
}

export default function ModelViewer({
  src = "/assets/3d/duck.glb",
  alt = "3D model",
  className = "",
  bg = "#0a0a0a",
  textures,
}: ModelViewerProps) {
  const exists = useAssetExists(src)
  const [effectiveSrc, setEffectiveSrc] = useState<string | null>(null)

  // Preload textures when component mounts
  useEffect(() => {
    preloadTextures(textures)
  }, [textures])

  useEffect(() => {
    if (exists === true) setEffectiveSrc(src)
    if (exists === false) setEffectiveSrc(null)
  }, [exists, src])

  return (
    <div className={`w-full h-[60vh] rounded-xl border border-white/10 overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        className="bg-[linear-gradient(to_bottom,#0a0a0a,#000000)]"
      >
        <color attach="background" args={[bg]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <Suspense
          fallback={
            <Html>
              <div className="rounded bg-white/10 px-3 py-1 text-sm text-white/80">Loading 3D model…</div>
            </Html>
          }
        >
          <Environment preset="studio" />
          {effectiveSrc ? (
            <ModelContent src={effectiveSrc} textures={textures} />
          ) : (
            <FallbackModel textures={textures} />
          )}
          <ContactShadows position={[0, -1.4, 0]} opacity={0.25} blur={2.2} scale={10} />
        </Suspense>
        <OrbitControls 
          target={[0, 0, 0]} 
          enablePan={false} 
          minDistance={2.5} 
          maxDistance={10} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
      <span className="sr-only">{alt}</span>
    </div>
  )
}