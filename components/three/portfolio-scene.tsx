"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Billboard, Environment, Html, OrbitControls, Sparkles, Trail, ContactShadows } from "@react-three/drei"
import { Suspense, useMemo, useRef, useState, useCallback } from "react"
import type { Project } from "@/lib/projects"
import * as THREE from "three"
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing"
import OverlayProjectCard from "@/components/overlay-project-card"

type Props = {
  projects?: Project[]
  onSelect?: (p: Project) => void
  maxVisible?: number
  hoverMode?: "card" | "none"
  // How long the hover card should remain visible after hovering ends (ms)
  lingerMs?: number
}

// Toggle look: animated orbits or static centerpiece
const MODE: "orbits" | "static" = "orbits"

type HoverPayload = { project: Project; x: number; y: number } | null

function projectToScreen(point: THREE.Vector3, camera: THREE.Camera, size: { width: number; height: number }) {
  const p = point.clone().project(camera as THREE.PerspectiveCamera)
  return {
    x: (p.x + 1) * 0.5 * size.width,
    y: (1 - (p.y + 1) * 0.5) * size.height,
  }
}

function OrbitsNode({
  project,
  index,
  total,
  ringIndex,
  radius,
  baseSpeed,
  onClick,
  onHover,
  onLeave,
}: {
  project: Project
  index: number
  total: number
  ringIndex: number
  radius: number
  baseSpeed: number
  onClick?: () => void
  onHover?: (p: HoverPayload) => void
  onLeave?: () => void
}) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { camera, size } = useThree()

  // Angular offset for this item
  const phi = (index / total) * Math.PI * 2 + ringIndex * 0.2
  const speed = baseSpeed * (ringIndex === 0 ? 1 : 0.6)
  const world = useRef(new THREE.Vector3())

  const updateScreenPos = useCallback(() => {
    if (!ref.current) return
    ref.current.getWorldPosition(world.current)
    const { x, y } = projectToScreen(world.current, camera, size)
    onHover?.({ project, x, y })
  }, [camera, size, onHover, project])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const angle = phi + t * speed
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = Math.sin(angle * 1.2 + ringIndex) * 0.5
    ref.current.position.set(x, y + (hovered ? 0.15 : 0), z)
    ref.current.lookAt(0, 0, 0)
    if (hovered) updateScreenPos()
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      onPointerMove={(e) => {
        e.stopPropagation()
        if (hovered) updateScreenPos()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
        updateScreenPos()
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
        // Do NOT immediately clear the overlay; let parent start a delayed close
        onLeave?.()
      }}
    >
      {/* Node with trail */}
      <Trail width={2} color={"#ffffff"} length={1.2} decay={2.2} local>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[0.24, 0]} />
          <meshPhysicalMaterial
            color={hovered ? "#fafafa" : "#e5e5e5"}
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.2}
            reflectivity={1}
            transmission={0.12}
            thickness={0.5}
          />
        </mesh>
      </Trail>

      {/* Removed the in-scene text label above the model */}
      <Billboard position={[0, 0.8, 0]}>{/* Intentionally empty to keep minimal anchor without text */}</Billboard>
    </group>
  )
}

function OrbitsContent({
  projects,
  onSelect,
  onHover,
  onLeave,
}: Required<Pick<Props, "projects" | "onSelect">> & { onHover: (p: HoverPayload) => void; onLeave: () => void }) {
  const total = projects.length
  const half = Math.ceil(total / 2)
  const outer = projects.slice(0, half)
  const inner = projects.slice(half)

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 10, 6]} intensity={1} castShadow />
      <directionalLight position={[-6, -4, -6]} intensity={0.35} />

      {/* Subtle background motion */}
      <Sparkles count={120} speed={0.2} opacity={0.18} scale={[26, 14, 26]} size={1.6} color={"#ffffff"} />

      {/* Soft floor */}
      <ContactShadows position={[0, -2.2, 0]} opacity={0.25} blur={2.6} scale={24} />

      {/* Decorative rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <ringGeometry args={[4.8, 5, 64]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <ringGeometry args={[7.8, 8, 64]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* Outer ring */}
      {outer.map((p, i) => (
        <OrbitsNode
          key={p.id}
          project={p}
          index={i}
          total={outer.length}
          ringIndex={0}
          radius={8}
          baseSpeed={0.28}
          onClick={() => onSelect(p)}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}

      {/* Inner ring */}
      {inner.map((p, i) => (
        <OrbitsNode
          key={p.id}
          project={p}
          index={i}
          total={inner.length || 1}
          ringIndex={1}
          radius={5}
          baseSpeed={0.44}
          onClick={() => onSelect(p)}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </>
  )
}

function StaticSculpture() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[7, 9, 7]} intensity={1} castShadow />
      <directionalLight position={[-6, -5, -6]} intensity={0.35} />
      <Environment preset="studio" />
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1.6, 0.5, 240, 36]} />
        <meshPhysicalMaterial
          color="#eaeaea"
          metalness={0.85}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.18}
          transmission={0.08}
          thickness={0.6}
          reflectivity={1}
        />
      </mesh>
      <ContactShadows position={[0, -2.2, 0]} opacity={0.3} blur={2.4} scale={24} />
      <Sparkles count={80} speed={0.15} opacity={0.18} scale={[20, 10, 20]} size={1.5} color="#ffffff" />
    </>
  )
}

export default function PortfolioScene({
  projects = [],
  onSelect = () => { },
  maxVisible = 12,
  hoverMode = "card",
  lingerMs = 500,
}: Props) {
  const visible = useMemo(() => projects.slice(0, maxVisible), [projects, maxVisible])

  // DOM overlay hover card state
  const [hovered, setHovered] = useState<HoverPayload>(null)
  const [sticky, setSticky] = useState(false) // if user hovers the card
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleHover = useCallback((p: HoverPayload) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
    if (p) setHovered(p)
  }, [])

  const requestClose = useCallback(() => {
    if (sticky) return
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setHovered(null), lingerMs)
  }, [sticky, lingerMs])

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 2.1, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        className="bg-[linear-gradient(to_bottom,#0a0a0a,#000000)]"
        shadows
      >
        <fog attach="fog" args={["#000000", 14, 34]} />
        <color attach="background" args={["#000000"]} />
        <Suspense
          fallback={
            <Html>
              <div className="rounded bg-white/10 px-3 py-1 text-sm text-white/80">Loading scene…</div>
            </Html>
          }
        >
          <Environment preset="studio" />
          {MODE === "orbits" ? (
            <OrbitsContent
              projects={visible}
              onSelect={onSelect}
              onHover={handleHover}
              onLeave={requestClose} // start delayed hide when pointer leaves the model
            />
          ) : (
            <StaticSculpture />
          )}
        </Suspense>
        <OrbitControls enablePan={false} minDistance={6} maxDistance={18} maxPolarAngle={Math.PI * 0.78} />

        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.28} luminanceSmoothing={0.22} />
          <Vignette eskil={false} offset={0.22} darkness={0.58} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>

      {hoverMode === "card" && hovered ? (
        <OverlayProjectCard
          project={hovered.project}
          x={hovered.x}
          y={hovered.y}
          onOpenProject={(p) => onSelect(p)}
          onKeepOpen={() => setSticky(true)}
          onRequestClose={() => {
            setSticky(false)
            requestClose()
          }}
          autoHideMs={lingerMs}
        />
      ) : null}
    </div>
  )
}
