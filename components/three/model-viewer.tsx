"use client"

import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Center, ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useAssetExists } from "@/hooks/use-asset-exists"

type ModelViewerProps = { src?: string; alt?: string; className?: string; bg?: string }

function prepareMaterial(mat: THREE.Material | THREE.Material[]) {
  const apply = (m: any) => {
    m.needsUpdate = true
    if (m.map) {
      (m.map as any).colorSpace = THREE.SRGBColorSpace
    }
    if (m.emissiveMap) {
      (m.emissiveMap as any).colorSpace = THREE.SRGBColorSpace
    }
    if (m.envMap) {
      m.envMap.mapping = THREE.EquirectangularReflectionMapping
    }
    if (m.isMeshPhysicalMaterial || m.isMeshStandardMaterial) {
      if (typeof m.envMapIntensity === "undefined") m.envMapIntensity = 1
    }
  }
  Array.isArray(mat) ? mat.forEach(apply) : apply(mat)
}

function autoFitToFrame(obj: THREE.Object3D, padding = 1.25, target = 1.6) {
  const box = new THREE.Box3().setFromObject(obj)
  if (box.isEmpty()) return
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = (target / maxDim) * padding
  obj.scale.setScalar(scale)
  const newCenter = center.multiplyScalar(scale)
  obj.position.sub(newCenter)
}

function ModelContent({ src }: { src: string }) {
  const gltf = useGLTF(src) as any
  const ref = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    const scene = gltf?.scene
    if (!scene || !ref.current) return
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true
        prepareMaterial(child.material)
      }
    })
    const container = ref.current
    container.clear()
    const inst = scene.clone(true)
    container.add(inst)
    autoFitToFrame(inst)
  }, [gltf])

  return <group ref={ref} />
}

function FallbackModel() {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e5e5e5",
        metalness: 0.6,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.25,
      }),
    [],
  )
  return (
    <Center>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.7, 0.25, 200, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </Center>
  )
}

useGLTF.preload("/folding-stairs/stairs-model.glb")
useGLTF.preload("/robotic-arm/arm-model.glb")
useGLTF.preload("/slicer/slicer-model.glb")

export default function ModelViewer({
  src = "/folding-stairs/stairs-model.glb",
  alt = "3D model",
  className = "",
  bg = "#0a0a0a",
}: ModelViewerProps) {
  const exists = useAssetExists(src)
  const [effectiveSrc, setEffectiveSrc] = useState<string | null>(null)

  useEffect(() => {
    setEffectiveSrc(exists ? src : null)
  }, [exists, src])

  return (
    <div className={`w-full h-[60vh] rounded-xl border border-white/10 overflow-hidden ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1, 3.5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        <color attach="background" args={[bg]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
        <Suspense
          fallback={
            <Html center>
              <div className="rounded bg-white/10 px-3 py-1 text-sm text-white/80">Loading 3D model…</div>
            </Html>
          }
        >
          <Environment preset="studio" />
          {effectiveSrc ? <ModelContent src={effectiveSrc} /> : <FallbackModel />}
          <ContactShadows position={[0, -1.4, 0]} opacity={0.25} blur={2.2} scale={10} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={1.6} maxDistance={8} />
      </Canvas>
      <span className="sr-only">{alt}</span>
    </div>
  )
}
