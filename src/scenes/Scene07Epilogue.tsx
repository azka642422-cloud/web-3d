import React from 'react';
import { Html } from '@react-three/drei';
import { storyContent } from '../content/storyData';
import { useExperienceStore } from '../stores/useExperienceStore';

export const Scene07Epilogue: React.FC = () => {
  const { setSelectedPhoto } = useExperienceStore();
  const allPhotos = [
    ...storyContent.photos.pondok,
    ...storyContent.photos.service,
    ...storyContent.photos.wedding,
    ...storyContent.photos.family,
    ...storyContent.photos.graduation
  ];

  return (
    <group>
      {/* Immersive Memory Wall in 3D Space */}
      {allPhotos.map((photo, index) => {
        const angle = (index / allPhotos.length) * Math.PI * 1.8 - Math.PI * 0.9;
        const radius = 4.5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - 2;
        const y = ((index % 3) - 1) * 1.2 + 0.8;

        return (
          <group key={photo.id} position={[x, y, z]} rotation={[0, -angle, 0]}>
            <Html
              transform
              occlude
              scale={[0.15, 0.15, 0.15]}
              className="cursor-pointer"
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="w-48 h-32 bg-[#090d16] border border-amber-400/30 rounded-xl p-2 shadow-xl flex flex-col justify-between hover:scale-105 transition-transform"
              >
                <img src={photo.thumbnailUrl} alt={photo.alt} className="w-full h-20 object-cover rounded" />
                <span className="text-[10px] text-amber-200 font-serif truncate mt-1">{photo.title}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Empty Future Horizon Frame */}
      <group position={[0, 1.2, -6]}>
        <mesh>
          <boxGeometry args={[1.6, 2.2, 0.08]} />
          <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
        </mesh>
        <Html
          transform
          occlude
          position={[0, 0, 0.06]}
          scale={[0.18, 0.18, 0.18]}
        >
          <div className="w-56 h-72 bg-gradient-to-b from-amber-100/15 to-amber-200/5 backdrop-blur-md border border-amber-300/40 rounded-xl p-6 flex flex-col items-center justify-center text-center text-white shadow-2xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-medium mb-3">Horizon Masa Depan</span>
            <p className="text-sm font-serif italic text-amber-100/90 leading-relaxed">
              “Untuk perjalanan yang belum memiliki foto.”
            </p>
          </div>
        </Html>
      </group>
    </group>
  );
};
