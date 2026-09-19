import React from 'react';
import { Html } from '@react-three/drei';
import { RecurringTable } from '../experience/RecurringTable';
import { storyContent } from '../content/storyData';
import { useExperienceStore } from '../stores/useExperienceStore';

export const Scene03ServiceCollege: React.FC = () => {
  const { setSelectedPhoto } = useExperienceStore();
  const servicePhotos = [...storyContent.photos.service, ...storyContent.photos.college];

  return (
    <group>
      <RecurringTable />

      {/* Dual World Floating Planes */}
      {servicePhotos.map((photo, index) => {
        const x = index === 0 ? -2.2 : 2.2;
        const z = -1.0;
        const y = 1.0;

        return (
          <group key={photo.id} position={[x, y, z]}>
            <Html
              transform
              occlude
              scale={[0.15, 0.15, 0.15]}
              className="cursor-pointer group"
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="w-52 h-36 bg-[#0a1128] border border-blue-400/40 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between hover:scale-105 transition-transform"
              >
                <img src={photo.thumbnailUrl} alt={photo.alt} className="w-full h-22 object-cover rounded" />
                <span className="text-[11px] text-blue-200 font-serif truncate mt-1">{photo.title}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
