import { lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig'; import { ParticleSystem } from './ParticleSystem'; import { useExperienceStore } from '../stores/useExperienceStore';
const scenes = {
  1: lazy(() => import('../scenes/Scene01Opening').then(m => ({ default: m.Scene01Opening }))),
  2: lazy(() => import('../scenes/Scene02Pondok').then(m => ({ default: m.Scene02Pondok }))),
  3: lazy(() => import('../scenes/Scene03ServiceCollege').then(m => ({ default: m.Scene03ServiceCollege }))),
  4: lazy(() => import('../scenes/Scene04Family').then(m => ({ default: m.Scene04Family }))),
  5: lazy(() => import('../scenes/Scene05LongNights').then(m => ({ default: m.Scene05LongNights }))),
  6: lazy(() => import('../scenes/Scene06Graduation').then(m => ({ default: m.Scene06Graduation }))),
  7: lazy(() => import('../scenes/Scene07Epilogue').then(m => ({ default: m.Scene07Epilogue }))),
};
export function ExperienceCanvas(){const scene=useExperienceStore(s=>s.currentScene);const quality=useExperienceStore(s=>s.qualityLevel);const fallback=useExperienceStore(s=>s.setFallback);const Active=scenes[scene];const dpr=quality==='low'?1:quality==='medium'?1.4:Math.min(1.75,window.devicePixelRatio);return <div className="absolute inset-0 bg-[#040814]"><Canvas camera={{position:[0,0,8],fov:55}} dpr={dpr} shadows={quality!=='low'} gl={{antialias:quality!=='low',alpha:false,powerPreference:'high-performance'}} fallback={<div className="grid h-full place-items-center p-8 text-center text-amber-100">Perangkat ini tidak dapat membuka tampilan 3D. Narasi tetap tersedia melalui panel cerita.</div>} onCreated={()=>fallback(false)}><color attach="background" args={['#040814']}/><ambientLight intensity={.55}/><directionalLight position={[5,8,5]} intensity={1.1} color="#fef0bf" castShadow={quality!=='low'}/><CameraRig/><ParticleSystem/><Suspense fallback={null}><Active/></Suspense></Canvas></div>}
