"use client"

import { useEffect, useSyncExternalStore } from "react"

type Size = { width: number; height: number }

let currentSize: Size = { width: 0, height: 0 }
const listeners = new Set<() => void>()

const updateSize = () => {
  currentSize = { width: window.innerWidth, height: window.innerHeight }
  for (const listener of listeners) {
    listener()
  }
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)

  // Initialize on first subscriber
  if (listeners.size === 1) {
    updateSize()
    window.addEventListener("resize", updateSize, { passive: true })
  }

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener("resize", updateSize)
    }
  }
}

const getSnapshot = (): Size => currentSize

const getServerSnapshot = (): Size => ({ width: 0, height: 0 })

/**
 * Shared resize hook. All instances share a single "resize" listener
 * (client-event-listeners). Uses useSyncExternalStore for tear-free reads.
 */
export const useResize = (): Size => {
  const size = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Ensure the size is initialized on mount (before any resize fires)
  useEffect(() => {
    if (currentSize.width === 0 && currentSize.height === 0) {
      updateSize()
    }
  }, [])

  return size
}
