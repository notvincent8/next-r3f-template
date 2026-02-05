"use client"

import dynamic from "next/dynamic"

// Lazy-load the canvas to avoid SSR issues with Three.js
const CanvasWrapper = dynamic(() => import("./components/canvas/CanvasWrapper"), { ssr: false })

const Home = () => (
  <main className="canvas-root">
    <CanvasWrapper />
  </main>
)

export default Home
