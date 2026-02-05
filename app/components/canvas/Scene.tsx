"use client"

import { Grid, OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import type { DirectionalLight, Mesh } from "three"

// Hoisted static JSX to avoid re-creation on every render (rendering-hoist-jsx)
const boxGeo = <boxGeometry args={[1, 1, 1]} />

// Rotating cube controlled by Leva
const RotatingCube = () => {
  const ref = useRef<Mesh>(null)

  const { speed, color, wireframe } = useControls("Cube", {
    speed: { value: 1, min: 0, max: 10, step: 0.1 },
    color: "#ff6030",
    wireframe: false,
  })

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * speed
    ref.current.rotation.y += delta * speed * 0.6
  })

  return (
    <mesh ref={ref} position={[0, 1, 0]} castShadow>
      {boxGeo}
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  )
}

// Lights with visible helpers
const Lights = () => {
  const dirRef = useRef<DirectionalLight>(null)

  const { intensity, position } = useControls("Light", {
    intensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
    position: { value: [4, 6, 4], step: 0.5 },
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={dirRef}
        intensity={intensity}
        position={position}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {dirRef.current && <directionalLightHelper args={[dirRef.current, 1]} />}
    </>
  )
}

const Scene = () => {
  const { cellColor, sectionColor } = useControls("Grid", {
    cellColor: "#6f6f6f",
    sectionColor: "#9d4b4b",
  })

  return (
    <>
      <RotatingCube />
      <Lights />

      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor={cellColor}
        sectionSize={3}
        sectionThickness={1.2}
        sectionColor={sectionColor}
        fadeDistance={25}
        fadeStrength={1}
        followCamera
        infiniteGrid
      />

      <OrbitControls makeDefault />
    </>
  )
}

export default Scene
