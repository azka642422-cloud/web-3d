import { useEffect } from 'react';
import { getBeat } from '../content/storyboard';
import { MediaService } from '../services/StoryService';
import { useExperienceStore } from '../stores/useExperienceStore';

export function ExperienceRuntime() {
  const state = useExperienceStore();
  useEffect(() => { void MediaService.preloadNext(state.currentScene); }, [state.currentScene]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 700px)');
    const sync = () => {
      state.setReducedMotion(reduce.matches);
      state.setMobile(narrow.matches);
      state.setQualityLevel(narrow.matches ? 'low' : window.devicePixelRatio > 1.5 ? 'medium' : 'high');
    };
    const visibility = () => state.setPageHidden(document.hidden);
    sync(); visibility();
    reduce.addEventListener('change', sync); narrow.addEventListener('change', sync);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      reduce.removeEventListener('change', sync); narrow.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [state.setPageHidden, state.setMobile, state.setQualityLevel, state.setReducedMotion]);

  useEffect(() => {
    const blocked = !state.userHasStarted || state.isTransitioning || state.paused || state.pageHidden || !!state.selectedPhoto || state.galleryOpen;
    const current = getBeat(state.currentScene, state.beat);
    if (blocked || !current.duration || current.mode === 'waiting' || current.mode === 'interactive' || current.mode === 'freeExplore') return;
    const timer = window.setTimeout(state.advance, state.reducedMotion ? Math.min(1800, current.duration) : current.duration);
    return () => window.clearTimeout(timer);
  }, [state.advance, state.beat, state.galleryOpen, state.isTransitioning, state.pageHidden, state.paused, state.reducedMotion, state.runId, state.selectedPhoto, state.transitionId, state.userHasStarted, state.currentScene]);
  return null;
}
