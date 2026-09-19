import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Scene06Graduation: React.FC = () => {
  const capRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!capRef.current) return;
    const t = state.clock.getElapsedTime();
    capRef.current.rotation.y = t * 0.3;
    capRef.current.position.y = 1.8 + Math.sin(t * 1.5) * 0.1;
  });

  return (
    <group>
      {/* 3D Graduation Cap Floating Symbol */}
      <group ref={capRef} position={[0, 1.8, -1.0]}>
        <mesh position={[0, 0.05, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.7, 0.04, 0.7]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.16, 24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
      </group>

      <pointLight position={[0, 2.5, 0]} color="#fef08a" intensity={4} distance={8} />
    </group>
  );
};
