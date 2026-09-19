import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../stores/useExperienceStore';

export const RecurringTable: React.FC = () => {
  const { currentScene } = useExperienceStore();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Wooden Desk Top */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.12, 1.8]} />
        <meshStandardMaterial color="#2d1810" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-1.4, -0.5, -0.7]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.5} />
      </mesh>
      <mesh position={[1.4, -0.5, -0.7]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.5} />
      </mesh>
      <mesh position={[-1.4, -0.5, 0.7]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.5} />
      </mesh>
      <mesh position={[1.4, -0.5, 0.7]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.5} />
      </mesh>

      {/* --- OBJECT EVOLUTION BASED ON SCENE --- */}

      {/* Kitab / Book (Scenes 2 to 7) */}
      {currentScene >= 2 && (
        <group position={[-0.8, 0.1, -0.2]} rotation={[0, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.08, 0.6]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.76, 0.005, 0.56]} />
            <meshStandardMaterial color="#fef08a" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* Pen and Notes (Scenes 2 to 7) */}
      {currentScene >= 2 && (
        <group position={[-0.2, 0.08, 0.3]}>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.4]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* Pengabdian Agenda / Documents (Scenes 3 to 7) */}
      {currentScene >= 3 && (
        <group position={[-0.8, 0.1, 0.4]} rotation={[0, -0.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.03, 0.5]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* Laptop (Appears in Scene 3, closed in 7, open in 5/6) */}
      {currentScene >= 3 && (
        <group position={[0.6, 0.1, 0.0]}>
          {/* Base */}
          <mesh castShadow position={[0, 0.02, 0]}>
            <boxGeometry args={[0.9, 0.03, 0.65]} />
            <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Screen */}
          <mesh
            castShadow
            position={[0, 0.32, -0.3]}
            rotation={[currentScene === 5 || currentScene === 6 ? -0.3 : currentScene === 7 ? -1.5 : -0.3, 0, 0]}
          >
            <boxGeometry args={[0.9, 0.6, 0.02]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={currentScene >= 3 && currentScene !== 7 ? '#3b82f6' : '#000000'}
              emissiveIntensity={currentScene >= 3 && currentScene !== 7 ? 0.4 : 0}
            />
          </mesh>
        </group>
      )}

      {/* Wedding / Family Photograph Frame (Scenes 4 to 7) */}
      {currentScene >= 4 && (
        <group position={[0.0, 0.3, -0.6]} rotation={[0, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.45, 0.55, 0.04]} />
            <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.38, 0.48]} />
            <meshBasicMaterial color="#fef3c7" />
          </mesh>
        </group>
      )}

      {/* Graduation Cap (Appears in Scene 6 & 7) */}
      {currentScene >= 6 && (
        <group position={[-0.1, 0.16, -0.2]}>
          <mesh castShadow position={[0, 0.02, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.35, 0.02, 0.35]} />
            <meshStandardMaterial color="#0a0f1d" roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.08, 16]} />
            <meshStandardMaterial color="#0a0f1d" roughness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
};
