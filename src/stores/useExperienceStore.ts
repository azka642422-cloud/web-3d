import { create } from 'zustand';
import type { MemoryPhoto, QualityLevel, SceneId } from '../types';
import { getBeat, storyboard } from '../content/storyboard';

interface ExperienceState {
  currentScene: SceneId; previousScene: SceneId; beat: number; highestScene: number;
  userHasStarted: boolean; isTransitioning: boolean; transitionId: number; runId: number;
  paused: boolean; pageHidden: boolean; selectedPhoto: MemoryPhoto | null; galleryOpen: boolean;
  graduationGateUnlocked: boolean; gateProgress: number; reducedMotion: boolean;
  qualityLevel: QualityLevel; mobile: boolean; fallback: boolean;
  audioPlaying: boolean; audioMuted: boolean; audioVolume: number; audioError: string | null;
  startExperience: () => void; resetExperience: () => void; advance: () => void;
  setScene: (scene: number) => void; completeTransition: (id: number) => void;
  openGate: (progress: number) => void; enterHorizon: () => void;
  setSelectedPhoto: (photo: MemoryPhoto | null) => void; setGalleryOpen: (open: boolean) => void;
  setPaused: (paused: boolean) => void; setPageHidden: (hidden: boolean) => void;
  setReducedMotion: (value: boolean) => void; setQualityLevel: (value: QualityLevel) => void;
  setMobile: (value: boolean) => void; setFallback: (value: boolean) => void;
  setAudioMuted: (value: boolean) => void; setAudioError: (value: string | null) => void;
}
const initialRun = {
  currentScene: 1 as SceneId, previousScene: 1 as SceneId, beat: 0, highestScene: 1,
  userHasStarted: false, isTransitioning: false, paused: false,
  selectedPhoto: null, galleryOpen: false, graduationGateUnlocked: false, gateProgress: 0,
  audioPlaying: false, audioError: null,
};
const canMove = (s: ExperienceState) => s.userHasStarted && !s.isTransitioning && !s.paused && !s.pageHidden && !s.selectedPhoto && !s.galleryOpen;
const move = (s: ExperienceState, scene: SceneId, beat: number) => ({
  previousScene: s.currentScene, currentScene: scene, beat,
  highestScene: Math.max(s.highestScene, scene), isTransitioning: true,
  transitionId: s.transitionId + 1, selectedPhoto: null,
});
export const useExperienceStore = create<ExperienceState>((set) => ({
  ...initialRun, runId: 0, transitionId: 0, pageHidden: false,
  reducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  mobile: typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches,
  qualityLevel: typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches ? 'low' : 'medium',
  fallback: false, audioMuted: false, audioVolume: 0.6,
  startExperience: () => set(s => s.userHasStarted ? s : { ...move(s, 1, 1), userHasStarted: true, audioPlaying: true }),
  resetExperience: () => set(s => ({ ...initialRun, transitionId: s.transitionId + 1, runId: s.runId + 1 })),
  completeTransition: id => set(s => id === s.transitionId ? { isTransitioning: false } : s),
  advance: () => set(s => {
    if (!canMove(s)) return s;
    const beat = getBeat(s.currentScene, s.beat);
    if (beat.id === 'gate' || beat.id === 'wall' || beat.id === 'ending') return s;
    if (s.beat < storyboard[s.currentScene].length - 1) return move(s, s.currentScene, s.beat + 1);
    if (s.currentScene === 5 && !s.graduationGateUnlocked) return s;
    return s.currentScene < 7 ? move(s, (s.currentScene + 1) as SceneId, 0) : s;
  }),
  setScene: scene => set(s => {
    if (!canMove(s) || !Number.isInteger(scene) || scene < 1 || scene > 7 || scene > s.highestScene || scene === 1) return s;
    if (scene >= 6 && !s.graduationGateUnlocked) return s;
    return move(s, scene as SceneId, 0);
  }),
  openGate: progress => set(s => {
    if (!canMove(s) || getBeat(s.currentScene, s.beat).id !== 'gate') return s;
    const value = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));
    return value >= 95
      ? { ...move(s, 5, s.beat + 1), graduationGateUnlocked: true, gateProgress: 100 }
      : { gateProgress: value };
  }),
  enterHorizon: () => set(s => canMove(s) && getBeat(s.currentScene, s.beat).id === 'wall' ? move(s, 7, s.beat + 1) : s),
  setSelectedPhoto: photo => set(s => photo && (s.isTransitioning || !s.userHasStarted) ? s : { selectedPhoto: photo, galleryOpen: photo ? false : s.galleryOpen }),
  setGalleryOpen: galleryOpen => set(s => galleryOpen && (s.isTransitioning || !s.userHasStarted) ? s : { galleryOpen }),
  setPaused: paused => set({ paused }), setPageHidden: pageHidden => set({ pageHidden }),
  setReducedMotion: reducedMotion => set({ reducedMotion }),
  setQualityLevel: qualityLevel => set({ qualityLevel }),
  setMobile: mobile => set({ mobile }), setFallback: fallback => set({ fallback }),
  setAudioMuted: audioMuted => set({ audioMuted }), setAudioError: audioError => set({ audioError }),
}));

