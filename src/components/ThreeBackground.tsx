import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MinimalParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      // Gentle floating animation
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i] * 0.1) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function GlowingOrbs() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orb1.current) {
      orb1.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 8;
      orb1.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 3;
    }
    
    if (orb2.current) {
      orb2.current.position.x = Math.cos(state.clock.elapsedTime * 0.25) * -6;
      orb2.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 4;
    }
    
    if (orb3.current) {
      orb3.current.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 4;
      orb3.current.position.y = Math.cos(state.clock.elapsedTime * 0.35) * -2;
    }
  });

  return (
    <group>
      {/* Cyan orb */}
      <mesh ref={orb1} position={[6, 2, -8]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
          emissive="#00ffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Purple orb */}
      <mesh ref={orb2} position={[-4, -1, -6]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color="#ff00ff"
          transparent
          opacity={0.25}
          emissive="#ff00ff"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Green orb */}
      <mesh ref={orb3} position={[2, -3, -10]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#00ff88"
          transparent
          opacity={0.4}
          emissive="#00ff88"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#00ffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.2} color="#ff00ff" />
        
        <MinimalParticles />
        <GlowingOrbs />
      </Canvas>
    </div>
  );
}