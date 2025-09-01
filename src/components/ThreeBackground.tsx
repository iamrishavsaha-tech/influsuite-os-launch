import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    
    for (let i = 0; i < positions.length; i += 3) {
      // Create a more spread out particle field
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
      
      // Create color variation between cyan and purple
      const t = Math.random();
      colors[i] = t; // R
      colors[i + 1] = 0.5 + t * 0.5; // G
      colors[i + 2] = 1; // B
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      
      // Animate particles individually
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={1.5}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function WaveGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positionAttribute = geometry.attributes.position;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = Math.sin(x * 0.1 + state.clock.elapsedTime) * 
                 Math.cos(y * 0.1 + state.clock.elapsedTime) * 0.5;
        positionAttribute.setZ(i, z);
      }
      positionAttribute.needsUpdate = true;
      
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshStandardMaterial
        color="#00ffff"
        transparent
        opacity={0.1}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * 0.1;
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group ref={group}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 3]} rotation={[0, 0, i * Math.PI / 3]}>
          <torusGeometry args={[3 + i, 0.1, 8, 32]} />
          <meshStandardMaterial
            color={i === 0 ? "#ff00ff" : i === 1 ? "#00ffff" : "#00ff88"}
            transparent
            opacity={0.6}
            emissive={i === 0 ? "#ff00ff" : i === 1 ? "#00ffff" : "#00ff88"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff00ff" />
        <pointLight position={[0, 10, -10]} intensity={0.6} color="#00ff88" />
        
        <AnimatedParticles />
        <WaveGeometry />
        <FloatingRings />
        
        {/* Add some fog for depth */}
        <fog attach="fog" args={['#0a0a0f', 10, 50]} />
      </Canvas>
    </div>
  );
}