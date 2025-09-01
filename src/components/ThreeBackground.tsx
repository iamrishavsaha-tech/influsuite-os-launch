import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  variant?: 'hero' | 'section' | 'footer';
}

function MinimalParticles({ variant = 'hero' }: { variant?: 'hero' | 'section' | 'footer' }) {
  const ref = useRef<THREE.Points>(null);
  
  const config = {
    hero: { opacity: 0.3, size: 1.5 },
    section: { opacity: 0.6, size: 2.2 },
    footer: { opacity: 0.4, size: 1.8 }
  }[variant];
  
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
        color="#1a1a2e"
        size={config.size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={config.opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function GlowingOrbs({ variant = 'hero' }: { variant?: 'hero' | 'section' | 'footer' }) {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);
  
  const config = {
    hero: { opacity: [0.2, 0.15, 0.25], emissive: [0.1, 0.08, 0.12] },
    section: { opacity: [0.35, 0.25, 0.4], emissive: [0.2, 0.15, 0.25] },
    footer: { opacity: [0.25, 0.18, 0.3], emissive: [0.15, 0.12, 0.18] }
  }[variant];
  
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
      {/* Dark navy orb */}
      <mesh ref={orb1} position={[6, 2, -8]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#16213e"
          transparent
          opacity={config.opacity[0]}
          emissive="#0f3460"
          emissiveIntensity={config.emissive[0]}
        />
      </mesh>
      
      {/* Dark purple orb */}
      <mesh ref={orb2} position={[-4, -1, -6]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={config.opacity[1]}
          emissive="#16213e"
          emissiveIntensity={config.emissive[1]}
        />
      </mesh>
      
      {/* Dark teal orb */}
      <mesh ref={orb3} position={[2, -3, -10]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#0e4b99"
          transparent
          opacity={config.opacity[2]}
          emissive="#16213e"
          emissiveIntensity={config.emissive[2]}
        />
      </mesh>
    </group>
  );
}

export default function ThreeBackground({ variant = 'hero' }: ThreeBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.15} color="#16213e" />
        <pointLight position={[-5, -5, 5]} intensity={0.1} color="#1a1a2e" />
        
        <MinimalParticles variant={variant} />
        <GlowingOrbs variant={variant} />
      </Canvas>
    </div>
  );
}