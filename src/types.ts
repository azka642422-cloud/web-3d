export type QualityLevel = 'high' | 'medium' | 'low';

export type SceneMode = 'cinematic' | 'interactive' | 'waiting' | 'freeExplore';

export interface MemoryPhoto {
  id: string;
  chapter: 'pondok' | 'serviceCollege' | 'family' | 'longNights' | 'graduation' | 'epilogue';
  thumbnailUrl: string;
  fullUrl: string;
  alt: string;
  title: string;
  description: string;
  date: string;
  sortOrder: number;
  aspectRatio?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export interface StoryContent {
  recipientName: string;
  partnerName: string;
  yourName: string;
  degree: string;
  university: string;
  pondokName: string;
  pondokYears: string;
  weddingDate: string;
  personalMessage: string;
  photos: {
    pondok: MemoryPhoto[];
    service: MemoryPhoto[];
    college: MemoryPhoto[];
    wedding: MemoryPhoto[];
    family: MemoryPhoto[];
    graduation: MemoryPhoto[];
    epilogue: MemoryPhoto[];
  };
}
