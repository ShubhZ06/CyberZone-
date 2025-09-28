"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ThreeHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scene: any,
      camera: any,
      renderer: any,
      hexagons: any[] = []

    const init = async () => {
      const THREE = await import("three")

      // Scene setup
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

      if (mountRef.current) {
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mountRef.current.appendChild(renderer.domElement)
      }

      // Create hexagonal geometry
      const hexGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 6)
      const hexMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
      })

      // Create multiple hexagons
      for (let i = 0; i < 5; i++) {
        const hex = new THREE.Mesh(hexGeometry, hexMaterial.clone())
        hex.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)
        hex.rotation.x = Math.random() * Math.PI
        hex.rotation.z = Math.random() * Math.PI
        scene.add(hex)
        hexagons.push(hex)
      }

      camera.position.z = 8

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)

        hexagons.forEach((hex, index) => {
          hex.rotation.x += 0.01 * (index + 1)
          hex.rotation.y += 0.01 * (index + 1)
          hex.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
        })

        renderer.render(scene, camera)
      }
      animate()
    }

    init()

    // Cleanup
    return () => {
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement)
      }
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
