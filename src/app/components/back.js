'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useLayoutEffect } from 'react'
import { useScroll } from 'framer-motion'

// --- Truck Component (Same Logic) ---
function Back() {
  const { scene } = useGLTF('/truck1.glb')
  const truckRef = useRef()
  const wheelsRef = useRef([])
  const { scrollYProgress } = useScroll()

  const wireScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: 'black',
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        })
      }
    })
    return clone
  }, [scene])

  useLayoutEffect(() => {
    const wheels = []
    scene.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes('wheel')) {
        wheels.push(child)
      }
    })
    wheelsRef.current = wheels
  }, [scene])

  const targetX = useRef(-5)
  const lastX = useRef(-5)

useFrame(() => {
  if (!truckRef.current) return
  const progress = scrollYProgress.get()

  let x = -8 // start further left

  // 0 → 0.2 (stay)
  if (progress < 0.2) {
    x = -8
  }

  // 0.2 → 0.4 (move right)
  else if (progress < 0.4) {
    const t = (progress - 0.2) / 0.2
    x = -8 + t * 22 // move to ~14
  }

  // 0.4 → 0.7 (STOP + HOLD for 30%)
  // else if (progress < 0.7) {
  //   x = 14
  // }

  // 0.7 → 1 (move back left)
  else {
    const t = (progress - 0.7) / 0.3
    x = 14 - t * 15 // go back to ~ -14
  }

  targetX.current = x

  truckRef.current.position.x = THREE.MathUtils.lerp(
    truckRef.current.position.x,
    targetX.current,
    0.08
  )

  // wheel rotation
  const deltaX = truckRef.current.position.x - lastX.current
  lastX.current = truckRef.current.position.x

  const wheelRadius = 1
  wheelsRef.current.forEach((wheel) => {
    wheel.rotation.x -= deltaX / wheelRadius
  })
})


  return (
    <group ref={truckRef} scale={3} position={[-5, -4.2, 0]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
      <primitive object={wireScene} />
    </group>
  )
}

// --- Main Scene Component ---
export default function Scene() {
  return (
    <div className="w-full" style={{ height: '400vh' }}>
      
      {/* 🔥 TEXT OVERLAY */}
      <div
        style={{
          position: 'relative',
          top: '20%',
          left: '8%',
          zIndex: 10,
          maxWidth: '500px',
          color: '#111',
          pointerEvents: 'auto',
        }}
      >
        
      </div>

      {/* 🌍 3D BACKGROUND */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          zIndex: 1,
          background: '#f0f0f0'
        }}
      >
        <Canvas camera={{ position: [3, 3, 25], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} />

          <Back/>

          {/* ❌ Disable rotation for background feel */}
          <OrbitControls enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>
    </div>
  )
}
