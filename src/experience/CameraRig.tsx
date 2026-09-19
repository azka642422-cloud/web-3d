import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { getBeat } from '../content/storyboard';
import { useExperienceStore } from '../stores/useExperienceStore';

const defaults = {
  1: { pose: [0, 0, 8], target: [0, 0, 0] }, 2: { pose: [0, 1.2, 5], target: [0, .5, 0] },
  3: { pose: [0, 1.5, 4.5], target: [0, .6, 0] }, 4: { pose: [0, 1.8, 5.5], target: [0, .8, 0] },
  5: { pose: [0, 2, 4.2], target: [0, .7, 0] }, 6: { pose: [0, 1.6, 6], target: [0, .5, 0] },
  7: { pose: [0, 2.5, 7], target: [0, 1, 0] },
} as const;

export function CameraRig() {
  const scene = useExperienceStore(s => s.currentScene); const beatIndex = useExperienceStore(s => s.beat);
  const transitionId = useExperienceStore(s => s.transitionId); const reduced = useExperienceStore(s => s.reducedMotion);
  const mobile = useExperienceStore(s => s.mobile); const complete = useExperienceStore(s => s.completeTransition);
  const { camera } = useThree(); const target = useRef(new Vector3()); const breathing = useMemo(() => new Vector3(), []);
  useEffect(() => {
    const beat = getBeat(scene, beatIndex); const base = defaults[scene];
    const pose: [number, number, number] = beat.pose ? [...beat.pose] : [...base.pose];
    const look: [number, number, number] = beat.target ? [...beat.target] : [...base.target];
    if (mobile) pose[2] = Math.max(pose[2] - .7, 2.2);
    gsap.killTweensOf(camera.position); gsap.killTweensOf(target.current);
    if (reduced) { camera.position.set(...pose); target.current.set(...look); camera.lookAt(target.current); complete(transitionId); return; }
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { duration: 1.8, ease: 'power2.inOut' }, onComplete: () => complete(transitionId) })
        .to(camera.position, { x: pose[0], y: pose[1], z: pose[2] }, 0)
        .to(target.current, { x: look[0], y: look[1], z: look[2], onUpdate: () => camera.lookAt(target.current) }, 0);
    });
    return () => { context.revert(); gsap.killTweensOf(camera.position); gsap.killTweensOf(target.current); };
  }, [beatIndex, camera, complete, mobile, reduced, scene, transitionId]);
  useFrame((state, delta) => {
    if (reduced || scene !== 1 || beatIndex > 0) return;
    breathing.set(state.pointer.x * .12, state.pointer.y * .08, 0);
    camera.position.x += (breathing.x - camera.position.x) * Math.min(1, delta * 1.5);
    camera.position.y += (breathing.y - camera.position.y) * Math.min(1, delta * 1.5); camera.lookAt(target.current);
  });
  return null;
}
