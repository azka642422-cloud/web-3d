import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useExperienceStore } from '../stores/useExperienceStore';

export const CameraRig: React.FC = () => {
  const { currentScene, reducedMotion } = useExperienceStore();
  const { camera } = useThree();

  useEffect(() => {
    if (reducedMotion) return;

    // Define target camera positions and lookAt targets for each scene
    const positions: Record<number, [number, number, number]> = {
      1: [0, 0, 8],
      2: [0, 1.2, 5],
      3: [0, 1.5, 4.5],
      4: [0, 1.8, 5.5],
      5: [0, 2.0, 4.2],
      6: [0, 1.6, 6],
      7: [0, 2.5, 7],
    };

    const targets: Record<number, [number, number, number]> = {
      1: [0, 0, 0],
      2: [0, 0.5, 0],
      3: [0, 0.6, 0],
      4: [0, 0.8, 0],
      5: [0, 0.7, 0],
      6: [0, 0.5, 0],
      7: [0, 1.0, 0],
    };

    const pos = positions[currentScene] || [0, 0, 8];
    const tgt = targets[currentScene] || [0, 0, 0];

    gsap.to(camera.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(new Vector3(...tgt));
      },
    });
  }, [currentScene, camera, reducedMotion]);

  useFrame((state) => {
    if (reducedMotion) return;
    // Subtle breathing / parallax on camera based on mouse
    const { x, y } = state.pointer;
    if (currentScene === 1) {
      camera.position.x = gsap.utils.interpolate(camera.position.x, x * 0.3, 0.05);
      camera.position.y = gsap.utils.interpolate(camera.position.y, y * 0.3, 0.05);
    }
  });

  return null;
};
