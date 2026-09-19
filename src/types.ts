export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type QualityLevel = 'high' | 'medium' | 'low';
export type SceneMode = 'cinematic' | 'interactive' | 'waiting' | 'freeExplore';
export type Chapter = 'pondok' | 'service' | 'college' | 'wedding' | 'family' | 'longNights' | 'graduation';
export type Vec3 = [number, number, number];
export interface MemoryPhoto {
  id: string; chapter: Chapter; thumbnailUrl: string; fullUrl: string;
  alt: string; title: string; description: string; date: string; sortOrder: number;
  placeholder?: boolean; aspectRatio?: number;
}
export interface StoryContent {
  recipientName: string; partnerName: string; yourName: string; degree: string;
  university: string; program: string; graduationYear: string; finalProject: string;
  pondokName: string; pondokYears: string; weddingDate: string; personalMessage: string;
  audio: { url: string | null; volume: number };
  photos: Record<Chapter, MemoryPhoto[]>;
}
export interface StoryBeat {
  id: string; title?: string; lines: string[]; duration?: number;
  mode?: SceneMode; gallery?: Chapter[]; pose?: Vec3; target?: Vec3;
}

