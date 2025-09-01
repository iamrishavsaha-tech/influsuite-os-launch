import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedStars() {
  const ref = useRef<THREE.Points>(null);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const radius = Math.random() * 25 + 5;
      const phi = Math.acos(-1 + (2 * Math.random()));
      const theta = Math.random() * Math.PI * 2;
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -5]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#ff00ff"
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

function SecondFloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.25;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[-4, 1, -8]}>
      <octahedronGeometry args={[1.2]} />
      <meshStandardMaterial
        color="#00ff88"
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        <AnimatedStars />
        <FloatingGeometry />
        <SecondFloatingGeometry />
      </Canvas>
    </div>
  );
}