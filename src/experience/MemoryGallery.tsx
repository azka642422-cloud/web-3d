import type { Chapter, Vec3 } from '../types';
import { StoryService } from '../services/StoryService';
import { MemoryPhoto } from './MemoryPhoto';
export function MemoryGallery({ chapters, radius = 3.3, depth = -1.3 }: { chapters: Chapter[]; radius?: number; depth?: number }) {
  const photos = StoryService.getPhotos(chapters);
  return <group>{photos.map((photo, index) => { const angle = (index / Math.max(photos.length - 1, 1) - .5) * 1.45; const position: Vec3 = [Math.sin(angle) * radius, .75 + (index % 2) * .65, depth + Math.cos(angle) * 1.1]; return <MemoryPhoto key={photo.id} photo={photo} position={position} rotationY={-angle * .35} />; })}</group>;
}
