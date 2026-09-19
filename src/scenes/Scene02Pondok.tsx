import React from 'react';
import { Html } from '@react-three/drei';
import { RecurringTable } from '../experience/RecurringTable';
import { storyContent } from '../content/storyData';
import { useExperienceStore } from '../stores/useExperienceStore';

export const Scene02Pondok: React.FC = () => {
  const { setSelectedPhoto } = useExperienceStore();
  const photos = storyContent.photos.pondok;

  return (
    <group>
      <RecurringTable />

      {/* Floating Memory Photos in 3D Space */}
      {photos.map((photo, index) => {
        const angle = (index / photos.length) * Math.PI * 1.2 - Math.PI * 0.6;
        const x = Math.sin(angle) * 2.5;
        const z = Math.cos(angle) * 1.5 - 1.5;
        const y = 0.8 + (index % 2) * 0.4;

        return (
          <group key={photo.id} position={[x, y, z]} rotation={[0, -angle * 0.5, 0]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(photo);
              }}
              castShadow
            >
              <planeGeometry args={[1.1, 0.75]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
            <Html
              transform
              occlude
              position={[0, 0, 0.01]}
              scale={[0.15, 0.15, 0.15]}
              className="cursor-pointer group transition-transform hover:scale-105"
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="w-48 h-32 bg-[#0f172a] border border-amber-500/40 rounded-lg p-2 shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <img src={photo.thumbnailUrl} alt={photo.alt} className="w-full h-20 object-cover rounded" />
                <span className="text-[10px] text-amber-200 font-serif truncate mt-1">{photo.title}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
