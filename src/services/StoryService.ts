import { storyContent } from '../content/storyData';
import type { Chapter, MemoryPhoto, StoryContent } from '../types';

export const StoryService = {
  getContent: (): Readonly<StoryContent> => storyContent,
  getPhotos: (chapters?: Chapter[]): MemoryPhoto[] => {
    const keys = chapters ?? (Object.keys(storyContent.photos) as Chapter[]);
    return keys.flatMap(chapter => storyContent.photos[chapter]).sort((a, b) => a.sortOrder - b.sortOrder);
  },
};

type LoadState = 'idle' | 'loading' | 'ready' | 'error';
const cache = new Map<string, Promise<boolean>>();
const chapterState = new Map<Chapter, LoadState>();

export const MediaService = {
  state(chapter: Chapter): LoadState { return chapterState.get(chapter) ?? 'idle'; },
  preloadImage(url: string): Promise<boolean> {
    if (cache.has(url)) return cache.get(url)!;
    const task = new Promise<boolean>(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = url;
    });
    cache.set(url, task);
    return task;
  },
  async preloadChapter(chapter: Chapter): Promise<void> {
    if (chapterState.get(chapter) === 'ready' || chapterState.get(chapter) === 'loading') return;
    chapterState.set(chapter, 'loading');
    const result = await Promise.all(StoryService.getPhotos([chapter]).map(photo => this.preloadImage(photo.thumbnailUrl)));
    chapterState.set(chapter, result.every(Boolean) ? 'ready' : 'error');
  },
  async preloadNext(scene: number): Promise<void> {
    const chapters: Partial<Record<number, Chapter[]>> = {
      1: ['pondok'], 2: ['service', 'college'], 3: ['wedding', 'family'],
      4: ['longNights'], 5: ['graduation'], 6: ['graduation'],
    };
    await Promise.all((chapters[scene] ?? []).map(chapter => this.preloadChapter(chapter)));
  },
};
