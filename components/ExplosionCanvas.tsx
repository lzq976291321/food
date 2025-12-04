import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface BlobProps {
  isRolling: boolean;
  color: string;
}

const Blob: React.FC<BlobProps> = ({ isRolling, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation logic
      const rotationSpeed = isRolling ? 0.2 : 0.01;
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      
      // Scale pulsing
      const t = state.clock.getElapsedTime();
      const scale = isRolling 
        ? 1.5 + Math.sin(t * 20) * 0.3 
        : 1 + Math.sin(t * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (materialRef.current) {
       // Distort logic
       materialRef.current.distort = THREE.MathUtils.lerp(
         materialRef.current.distort,
         isRolling ? 1.0 : 0.4,
         0.1
       );
       
       materialRef.current.speed = isRolling ? 10 : 2;
       
       // Color interpolation
       materialRef.current.color.lerp(new THREE.Color(color), 0.1);
    }
  });

  return (
    <Trail
      width={1.2}
      length={isRolling ? 8 : 0} 
      color={new THREE.Color(color)} 
      attenuation={(t) => t * t}
    >
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1}>
        <MeshDistortMaterial
          ref={materialRef}
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.2}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Trail>
  );
};

interface ExplosionCanvasProps {
  isRolling: boolean;
  currentColor: string;
}

const ExplosionCanvas: React.FC<ExplosionCanvasProps> = ({ isRolling, currentColor }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4] }} gl={{ antialias: true, alpha: true }}>
        {/* @ts-ignore */}
        <ambientLight intensity={0.8} />
        {/* @ts-ignore */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        {/* @ts-ignore */}
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />
        {/* @ts-ignore */}
        <pointLight position={[0, 0, 0]} intensity={isRolling ? 5 : 1} color={currentColor} distance={5} />
        
        <Blob isRolling={isRolling} color={currentColor} />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={isRolling ? 5000 : 1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={isRolling ? 5 : 0.5} 
        />
      </Canvas>
    </div>
  );
};

export default ExplosionCanvas;