import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../stores/useExperienceStore';

export const ParticleSystem: React.FC = () => {
  const { currentScene, qualityLevel, reducedMotion } = useExperienceStore();
  const pointsRef = useRef<THREE.Points>(null);

  const count = qualityLevel === 'low' || reducedMotion ? 250 : qualityLevel === 'medium' ? 600 : 1200;

  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color('#d4af37'); // Gold
    const c2 = new THREE.Color('#60a5fa'); // Deep blue / navy accent
    const c3 = new THREE.Color('#ffffff'); // White

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const chosenColor = currentScene === 6 ? (Math.random() > 0.3 ? c1 : c3) : Math.random() > 0.5 ? c2 : c3;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count, currentScene]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
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
        size={currentScene === 6 ? 0.06 : 0.035}
        vertexColors
        transparent
        opacity={currentScene === 6 ? 0.85 : 0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
