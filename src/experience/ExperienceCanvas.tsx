import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { ParticleSystem } from './ParticleSystem';
import { useExperienceStore } from '../stores/useExperienceStore';

import { Scene01Opening } from '../scenes/Scene01Opening';
import { Scene02Pondok } from '../scenes/Scene02Pondok';
import { Scene03ServiceCollege } from '../scenes/Scene03ServiceCollege';
import { Scene04Family } from '../scenes/Scene04Family';
import { Scene05LongNights } from '../scenes/Scene05LongNights';
import { Scene06Graduation } from '../scenes/Scene06Graduation';
import { Scene07Epilogue } from '../scenes/Scene07Epilogue';

export const ExperienceCanvas: React.FC = () => {
  const { currentScene, qualityLevel } = useExperienceStore();

  const dpr = qualityLevel === 'low' ? 1 : qualityLevel === 'medium' ? 1.5 : 2;

  return (
    <div className="absolute inset-0 z-0 bg-[#040814]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={dpr}
        gl={{ antialias: qualityLevel !== 'low', alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#040814']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fef08a" />
        <pointLight position={[-5, -2, -3]} intensity={0.4} color="#3b82f6" />

        <CameraRig />
        <ParticleSystem />

        {currentScene === 1 && <Scene01Opening />}
        {currentScene === 2 && <Scene02Pondok />}
        {currentScene === 3 && <Scene03ServiceCollege />}
        {currentScene === 4 && <Scene04Family />}
        {currentScene === 5 && <Scene05LongNights />}
        {currentScene === 6 && <Scene06Graduation />}
        {currentScene === 7 && <Scene07Epilogue />}
      </Canvas>
    </div>
  );
};
