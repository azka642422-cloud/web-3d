import { create } from 'zustand';
import { MemoryPhoto, QualityLevel, SceneMode } from '../types';

interface ExperienceState {
  currentScene: number; // 1 to 7
  previousScene: number;
  userHasStarted: boolean;
  isTransitioning: boolean;
  sceneMode: SceneMode;
  audioPlaying: boolean;
  audioMuted: boolean;
  audioVolume: number;
  selectedPhoto: MemoryPhoto | null;
  qualityLevel: QualityLevel;
  reducedMotion: boolean;
  debugMode: boolean;

  setScene: (scene: number) => void;
  startExperience: () => void;
  setSelectedPhoto: (photo: MemoryPhoto | null) => void;
  setAudioPlaying: (playing: boolean) => void;
  setAudioMuted: (muted: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setQualityLevel: (level: QualityLevel) => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleDebugMode: () => void;
}

const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useExperienceStore = create<ExperienceState>((set) => ({
  currentScene: 1,
  previousScene: 1,
  userHasStarted: false,
  isTransitioning: false,
  sceneMode: 'cinematic',
  audioPlaying: false,
  audioMuted: false,
  audioVolume: 0.6,
  selectedPhoto: null,
  qualityLevel: 'high',
  reducedMotion: prefersReduced,
  debugMode: typeof window !== 'undefined' && window.location.search.includes('debug=true'),

  setScene: (scene: number) =>
    set((state) => {
      if (scene === state.currentScene) return state;
      return {
        previousScene: state.currentScene,
        currentScene: scene,
        isTransitioning: true,
      };
    }),

  startExperience: () =>
    set({
      userHasStarted: true,
      audioPlaying: true,
      isTransitioning: false,
    }),

  setSelectedPhoto: (photo: MemoryPhoto | null) =>
    set({
      selectedPhoto: photo,
      sceneMode: photo ? 'interactive' : 'cinematic',
    }),

  setAudioPlaying: (playing: boolean) => set({ audioPlaying: playing }),
  setAudioMuted: (muted: boolean) => set({ audioMuted: muted }),
  setAudioVolume: (volume: number) => set({ audioVolume: volume }),
  setQualityLevel: (level: QualityLevel) => set({ qualityLevel: level }),
  setReducedMotion: (reduced: boolean) => set({ reducedMotion: reduced }),
  toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
}));
