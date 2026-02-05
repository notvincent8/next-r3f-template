"use client"

import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"
import { useResize } from "@/app/hooks/useResize"
import Scene from "./Scene"

const CanvasWrapper = () => {
  const { background } = useControls("Scene", {
    background: "#151520",
  })

  const { width, height } = useResize()

  return (
    <>
      <Leva
        collapsed={true}
        titleBar={{
          title: "Controls",
          drag: false,
          filter: false,
        }}
      />
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 50 }} style={{ background, width, height }}>
        <Scene />
      </Canvas>
    </>
  )
}

export default CanvasWrapper
