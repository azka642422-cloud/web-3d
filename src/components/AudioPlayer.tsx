import React, { useEffect, useRef } from 'react';
import { useExperienceStore } from '../stores/useExperienceStore';

export const AudioPlayer: React.FC = () => {
  const { audioPlaying, audioMuted, audioVolume, userHasStarted } = useExperienceStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.3);
        } catch (e) {
          // ignore
        }
      } else if (!document.hidden && audioPlaying && !audioMuted && gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.setTargetAtTime(audioVolume * 0.25, audioCtxRef.current.currentTime, 0.5);
        } catch (e) {
          // ignore
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [audioPlaying, audioMuted, audioVolume]);

  useEffect(() => {
    if (!userHasStarted || !audioPlaying || audioMuted) {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        } catch (e) {
          // ignore
        }
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!gainNodeRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // F major / D minor chord frequencies (F3, A3, C4, D4, A4) with gentle warmth
        const freqs = [174.61, 220.0, 261.63, 293.66, 349.23];
        oscillatorsRef.current = freqs.map((f, i) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(500 + i * 120, ctx.currentTime);

          osc.connect(filter);
          if (pan) {
            pan.pan.setValueAtTime((i - 2) * 0.3, ctx.currentTime);
            filter.connect(pan);
            pan.connect(masterGain);
          } else {
            filter.connect(masterGain);
          }

          osc.start();
          return osc;
        });
      }

      if (gainNodeRef.current) {
        const targetVol = audioMuted ? 0 : audioVolume * 0.25;
        gainNodeRef.current.gain.setTargetAtTime(targetVol, ctx.currentTime, 1.5);
      }
    } catch (e) {
      console.warn('Web Audio API initialization note:', e);
    }
  }, [userHasStarted, audioPlaying, audioMuted, audioVolume]);

  return null;
};

