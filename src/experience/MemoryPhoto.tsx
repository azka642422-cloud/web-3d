import { Html } from '@react-three/drei';
import type { MemoryPhoto as Photo, Vec3 } from '../types';
import { useExperienceStore } from '../stores/useExperienceStore';
export function MemoryPhoto({ photo, position, rotationY = 0, hero = false }: { photo: Photo; position: Vec3; rotationY?: number; hero?: boolean }) {
  const select = useExperienceStore(s => s.setSelectedPhoto); const disabled = useExperienceStore(s => s.isTransitioning);
  return <group position={position} rotation={[0, rotationY, 0]}><mesh position={[0, 0, -.025]}><planeGeometry args={hero ? [3.6, 2.55] : [1.35, .96]} /><meshStandardMaterial color={hero ? '#c7a34e' : '#263044'} roughness={.7} /></mesh>
    <Html transform distanceFactor={hero ? 5 : 6} position={[0, 0, .02]}><button type="button" disabled={disabled} onClick={() => select(photo)} className={`${hero ? 'w-[520px] h-[368px]' : 'w-48 h-32'} block overflow-hidden rounded-sm border border-amber-300/40 bg-slate-950 shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300/60 disabled:pointer-events-none`}><img src={photo.thumbnailUrl} alt={photo.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" /><span className="sr-only">Buka {photo.title}</span></button></Html></group>;
}
