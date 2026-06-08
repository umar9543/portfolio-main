'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.5
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#7B2FFF" wireframe transparent opacity={0.7} />
        </mesh>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7B2FFF" transparent opacity={0.05} />
        </mesh>
      </group>
    </Float>
  )
}

export default function FloatingCube() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ background: 'transparent', width: '200px', height: '200px' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7B2FFF" />
      <RotatingCube />
    </Canvas>
  )
}
