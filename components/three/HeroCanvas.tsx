'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 8 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    const cyanColor = new THREE.Color('#00F5FF')
    const violetColor = new THREE.Color('#7B2FFF')
    const whiteColor = new THREE.Color('#ffffff')
    for (let i = 0; i < count; i++) {
      const rand = Math.random()
      const color =
        rand < 0.4 ? cyanColor : rand < 0.7 ? violetColor : whiteColor
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return col
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05
      meshRef.current.rotation.x = time * 0.02
      // Mouse parallax
      meshRef.current.rotation.y += mouseRef.current.x * 0.0002
      meshRef.current.rotation.x += mouseRef.current.y * 0.0002
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const wireRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15
      meshRef.current.rotation.y = time * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = time * 0.15
      wireRef.current.rotation.y = time * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Inner solid */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#00F5FF"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Wireframe outline */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial
            color="#00F5FF"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Outer glow sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial
            color="#00F5FF"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00F5FF" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7B2FFF" />
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 1000 : 3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <ParticleField count={isMobile ? 800 : 3000} />
      <FloatingIcosahedron />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
