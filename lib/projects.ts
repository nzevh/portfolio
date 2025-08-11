export type Project = {
  id: string
  title: string
  problem: string
  method: string
  result: string
  tags?: string[]
  link?: string
  image?: string
  // New: 3D models (GLB/GLTF URLs)
  models?: string[]
  // New: additional gallery images
  gallery?: string[]
}

export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Stirling Engine Prototype",
    problem:
      "Robotic platforms needed a compact, low‑noise power source that converts external heat to mechanical work with high reliability and minimal acoustic signature.",
    method:
      "• Designed and built a compact Stirling engine in Fusion 360 tailored for low‑noise robotic integration.\n• Performed thermodynamic cycle analysis to optimize displacer and power piston dimensions for efficiency.\n• Simulated heat transfer and fluid dynamics in CAD/CFD to predict performance across temperature differentials.\n• Conducted bench testing for power output, efficiency, and durability under extended operation.",
    result:
      "Demonstrated efficient heat‑to‑mechanical energy conversion with a low acoustic footprint and stable performance over extended runs.",
    tags: ["Fusion 360", "Mechanism", "Thermodynamics", "Prototype"],
    link: "#",
    image: "/stirling-engine-monochrome.png",
    models: ["/robotic-arm/arm-model.glb"],
    gallery: ["/placeholder-na4i8.png", "/stirling-engine-section-view-monochrome.png", "/stirling-engine-testbench-monochrome.png"],
  },

  {
    id: "2",
    title: "Robotic Arm",
    problem:
      "Design a four‑axis robotic arm with accurate, smooth articulation and strong structural integrity while remaining manufacturable.",
    method:
      "• Modeled a four‑axis arm in Fusion 360 with attention to kinematic reach and joint packaging.\n• Engineered each joint/axis for full‑range motion and repeatable precision across 4 DOF.\n• Optimized link topology and materials for stiffness‑to‑weight and manufacturability.\n• Produced detailed 3D renders and manufacturing drawings for assembly and components.",
    result:
      "Achieved full‑range, precise motion in simulation with a production‑ready CAD package and documentation for fabrication.",
    tags: ["Fusion 360", "Robotics", "Mechanism", "CAD"],
    link: "#",
    image: "/robotic-arm/arm-1.png",
    models: ["/robotic-arm/arm-model.glb"],
    gallery: ["/robotic-arm/arm-1.png", "/robotic-arm-exploded-view-monochrome.png", "/robotic-arm-joint-detail-monochrome.png"],
  },

  {
    id: "3",
    title: "Automated Folding Stairs",
    problem:
      "Create a staircase system that automatically adjusts height and angle to improve accessibility and space utilization in constrained environments.",
    method:
      "• Designed the mechanism in Fusion 360 to auto‑adjust rise/run within spatial constraints.\n• Built detailed 3D CAD models and assemblies to validate fit, motion envelopes, and structural integrity.\n• Focused on stability and efficiency of the linkage system with manufacturable components.\n• Generated high‑fidelity renders and drawings to communicate assembly and parts fabrication.",
    result:
      "Validated an automated folding staircase mechanism that deploys and retracts smoothly, improving space usage while maintaining structural safety margins in CAD studies.",
    tags: ["Fusion 360", "Mechanism", "Accessibility", "CAD"],
    link: "#",
    image: "/folding-stairs/stairs-1.jpg",
    models: ["/folding-stairs/stairs-model.glb"],
    gallery: [
      "/folding-stairs/stairs-1.jpg",
      "/folding-stairs/stairs-2.jpg",
      "/folding-stairs/stairs-3.jpg",
    ],
  },
  {
    id: "4",
    title: "Mechanical Onion Slicer",
    problem:
      "Design and develop a manually powered onion slicing system that delivers consistent slice thickness, minimizes preparation time, and reduces repetitive strain, while maintaining food safety standards for home and commercial kitchen use.",
    method:
      "• Created a modular slicer assembly in Fusion 360, incorporating an adjustable blade array to allow slice thickness variation from 1 mm to 5 mm.\n" +
      "• Engineered a hand-crank rotary feed system with a geared transmission to maintain a constant cutting speed regardless of operator input.\n" +
      "• Modeled and simulated the blade path and onion feed alignment to ensure uniformity in slice geometry and reduce deformation of soft layers.\n" +
      "• Designed food-safe housing and protective blade guards to meet safety requirements, integrating quick-release components for easy cleaning.\n" +
      "• Performed structural FEA on blade holders and rotary arms to ensure rigidity under high-torque operation, selecting stainless steel for durability and hygiene.\n" +
      "• Generated detailed exploded-view renders, part drawings, and manufacturing tolerances for CNC fabrication and injection-molded components.\n" +
      "• Optimized ergonomics by designing a contoured hand-crank handle and a non-slip base to ensure stable operation during continuous slicing cycles.",
    result:
      "Delivered a validated CAD prototype of a compact, user-friendly onion slicer that produces precision slices with minimal operator effort. The design improved kitchen workflow by reducing preparation time by an estimated 40% in simulations, while ensuring consistent slice thickness and compliance with food safety standards.",
    tags: ["Fusion 360", "Mechanism", "Food Processing", "Ergonomics", "CAD", "FEA Analysis"],
    link: "#",
    image: "/slicer/slicer-1.png",
    models: ["/slicer/slicer-model.glb"],
    gallery: [
      "/slicer/slicer-1.png",
      "/placeholder.svg?height=720&width=1280",
      "/placeholder.svg?height=720&width=1280",
    ],
  },  
]
