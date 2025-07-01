'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

function MicrotubuleStructure() {
  const meshRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Create microtubule geometry
  const { nodes, lines } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    const lines: [number, number][] = []
    
    // Generate microtubule lattice structure
    const radius = 2
    const height = 8
    const segments = 13 // Microtubules typically have 13 protofilaments
    const layers = 20
    
    // Create helical structure of microtubules
    for (let layer = 0; layer < layers; layer++) {
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2
        const y = (layer / layers) * height - height / 2
        const twist = layer * 0.2 // Helical twist
        
        const x = Math.cos(angle + twist) * radius
        const z = Math.sin(angle + twist) * radius
        
        nodes.push(new THREE.Vector3(x, y, z))
        
        // Connect to adjacent nodes
        const currentIndex = layer * segments + seg
        const nextSeg = (seg + 1) % segments
        const nextIndex = layer * segments + nextSeg
        
        if (layer < layers - 1) {
          const nextLayerIndex = (layer + 1) * segments + seg
          lines.push([currentIndex, nextLayerIndex])
        }
        
        lines.push([currentIndex, nextIndex])
      }
    }
    
    return { nodes, lines }
  }, [])

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  const nodeColor = isDark ? '#ffffff' : '#000000'
  const lineColor = isDark ? '#666666' : '#999999'

  return (
    <group ref={meshRef}>
      {/* Render nodes (tubulin dimers) */}
      {nodes.map((position, index) => (
        <mesh key={`node-${index}`} position={position}>
          <sphereGeometry args={[0.02, 8, 6]} />
          <meshBasicMaterial 
            color={nodeColor} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
      
      {/* Render connections */}
      {lines.map(([start, end], index) => {
        const startPos = nodes[start]
        const endPos = nodes[end]
        const direction = new THREE.Vector3().subVectors(endPos, startPos)
        const length = direction.length()
        
        return (
          <mesh
            key={`line-${index}`}
            position={new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5)}
            rotation={new THREE.Euler().setFromQuaternion(
              new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                direction.normalize()
              )
            )}
          >
            <cylinderGeometry args={[0.008, 0.008, length, 3]} />
            <meshBasicMaterial 
              color={lineColor} 
              transparent 
              opacity={0.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function QuantumField() {
  const particlesRef = useRef<THREE.Points>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const { positions, sizes } = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Distribute particles in space around microtubules
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      sizes[i] = Math.random() * 0.5 + 0.1
    }
    
    return { positions, sizes }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating motion
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleColor = isDark ? '#444444' : '#cccccc'

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={particleColor}
        size={0.1}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

export function MicrotubuleAnimation() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas
        camera={{ 
          position: [8, 4, 8], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 0.5 : 0.3} />
        
        {/* Main microtubule structure */}
        <MicrotubuleStructure />
        
        {/* Quantum field particles */}
        <QuantumField />
        
        {/* Additional microtubules */}
        <group position={[6, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
          <MicrotubuleStructure />
        </group>
        
        <group position={[-6, 0, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <MicrotubuleStructure />
        </group>
      </Canvas>
    </div>
  )
} 