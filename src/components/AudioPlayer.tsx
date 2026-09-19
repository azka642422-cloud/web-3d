import { useEffect, useRef } from 'react';
import { StoryService } from '../services/StoryService';
import { useExperienceStore } from '../stores/useExperienceStore';
export function AudioPlayer() {
  const ref=useRef<HTMLAudioElement|null>(null); const playing=useExperienceStore(s=>s.audioPlaying); const muted=useExperienceStore(s=>s.audioMuted); const volume=useExperienceStore(s=>s.audioVolume); const paused=useExperienceStore(s=>s.paused); const hidden=useExperienceStore(s=>s.pageHidden); const run=useExperienceStore(s=>s.runId); const error=useExperienceStore(s=>s.setAudioError); const source=StoryService.getContent().audio.url;
  useEffect(()=>{ if(!source)return; const audio=new Audio(source); audio.loop=true; audio.preload='metadata'; audio.volume=0; ref.current=audio; return()=>{audio.pause();audio.removeAttribute('src');audio.load();ref.current=null;}; },[source]);
  useEffect(()=>{ const audio=ref.current; if(!audio)return; const shouldPlay=playing&&!muted&&!paused&&!hidden; const target=shouldPlay?Math.min(1,volume):0; let frame=0; const fade=()=>{audio.volume+=(target-audio.volume)*.08;if(Math.abs(target-audio.volume)>.01)frame=requestAnimationFrame(fade);else{audio.volume=target;if(!shouldPlay)audio.pause();}}; if(shouldPlay)void audio.play().then(()=>error(null)).catch(()=>error('Audio belum dapat diputar. Gunakan tombol audio setelah berinteraksi.')); fade(); return()=>cancelAnimationFrame(frame); },[error,hidden,muted,paused,playing,volume]);
  useEffect(()=>{if(ref.current){ref.current.currentTime=0;ref.current.pause();}},[run]); return null;
}
