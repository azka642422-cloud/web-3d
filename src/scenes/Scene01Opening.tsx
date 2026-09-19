import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Scene01Opening: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.getElapsedTime();
    lightRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
  });

  return (
    <group>
      {/* Distant Gold Light Anchor */}
      <mesh position={[0, 0, -4]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0, -3.8]} color="#d4af37" distance={10} decay={2} />
    </group>
  );
};
