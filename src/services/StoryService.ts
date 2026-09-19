import { storyContent } from '../content/storyData';
import { MemoryPhoto, StoryContent } from '../types';

export class StoryService {
  static async getStoryContent(): Promise<StoryContent> {
    // Simulated async fetch ready for future backend/API migration
    return Promise.resolve(storyContent);
  }

  static async updatePersonalMessage(message: string): Promise<void> {
    storyContent.personalMessage = message;
    return Promise.resolve();
  }
}

export class MemoryService {
  static async getAllPhotos(): Promise<MemoryPhoto[]> {
    const all = [
      ...storyContent.photos.pondok,
      ...storyContent.photos.service,
      ...storyContent.photos.college,
      ...storyContent.photos.wedding,
      ...storyContent.photos.family,
      ...storyContent.photos.graduation,
      ...storyContent.photos.epilogue,
    ];
    return Promise.resolve(all);
  }

  static async getPhotosByChapter(chapter: MemoryPhoto['chapter']): Promise<MemoryPhoto[]> {
    const all = await MemoryService.getAllPhotos();
    return all.filter(p => p.chapter === chapter);
  }
}

export class MediaService {
  static preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Graceful fallback
    });
  }

  static async preloadChapterAssets(chapter: string): Promise<void> {
    // Progressive asset loading simulation
    return Promise.resolve();
  }
}
