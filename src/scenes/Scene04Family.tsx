import React from 'react';
import { Html } from '@react-three/drei';
import { RecurringTable } from '../experience/RecurringTable';
import { storyContent } from '../content/storyData';
import { useExperienceStore } from '../stores/useExperienceStore';

export const Scene04Family: React.FC = () => {
  const { setSelectedPhoto } = useExperienceStore();
  const familyPhotos = [...storyContent.photos.wedding, ...storyContent.photos.family];

  return (
    <group>
      <RecurringTable />

      {/* Curved 3D Memory Constellation */}
      {familyPhotos.map((photo, index) => {
        const angle = (index / familyPhotos.length) * Math.PI - Math.PI / 2;
        const x = Math.sin(angle) * 2.8;
        const z = Math.cos(angle) * 1.8 - 1.2;
        const y = 1.2 + (index % 2) * 0.3;

        return (
          <group key={photo.id} position={[x, y, z]} rotation={[0, -angle * 0.4, 0]}>
            <Html
              transform
              occlude
              scale={[0.15, 0.15, 0.15]}
              className="cursor-pointer"
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="w-52 h-36 bg-[#1a150b] border border-amber-300/40 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between hover:scale-105 transition-transform"
              >
                <img src={photo.thumbnailUrl} alt={photo.alt} className="w-full h-22 object-cover rounded" />
                <span className="text-[11px] text-amber-100 font-serif truncate mt-1">{photo.title}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
