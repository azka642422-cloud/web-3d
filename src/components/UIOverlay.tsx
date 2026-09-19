import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, Grid3X3, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { getBeat, sceneTitles, storyboard } from '../content/storyboard';
import { StoryService } from '../services/StoryService';
import { useExperienceStore } from '../stores/useExperienceStore';

export function UIOverlay() {
  const state = useExperienceStore(); const content = StoryService.getContent();
  const beat = getBeat(state.currentScene, state.beat); const final = state.currentScene === 7 && beat.id === 'ending';
  const identity = useMemo(() => beat.id === 'name' ? [content.recipientName] : beat.id === 'degree' ? [content.degree, content.program, content.university, `CLASS OF ${content.graduationYear}`] : [], [beat.id, content]);
  useEffect(() => { const key=(event: KeyboardEvent)=>{ if(event.key==='Escape'){state.setSelectedPhoto(null);state.setGalleryOpen(false);} if((event.key===' '||event.key==='ArrowRight')&&!event.repeat){event.preventDefault();state.advance();}}; window.addEventListener('keydown',key); return()=>window.removeEventListener('keydown',key); },[state.advance,state.setGalleryOpen,state.setSelectedPhoto]);
  const start = () => state.startExperience(); const interactive = beat.mode === 'interactive'; const gate = beat.id === 'gate'; const wall = beat.id === 'wall';
  return <div className="pointer-events-none absolute inset-0 z-10 flex min-h-[100dvh] flex-col justify-between overflow-y-auto p-4 text-white sm:p-8">
    <header className="pointer-events-auto flex items-center justify-between gap-3"><div><p className="text-[10px] tracking-[.3em] text-amber-300">THE JOURNEY</p><p className="hidden text-xs text-white/50 sm:block">{sceneTitles[state.currentScene-1]}</p></div><div className="flex gap-2">
      {state.userHasStarted&&<button className="control" onClick={()=>state.setPaused(!state.paused)} aria-label={state.paused?'Lanjutkan':'Jeda'}>{state.paused?<Play/>:<Pause/>}</button>}
      {state.userHasStarted&&<button className="control" onClick={()=>state.setAudioMuted(!state.audioMuted)} aria-label={state.audioMuted?'Nyalakan audio':'Matikan audio'}>{state.audioMuted?<VolumeX/>:<Volume2/>}</button>}
      {state.userHasStarted&&<button className="control" onClick={()=>state.setGalleryOpen(true)} aria-label="Lihat semua foto"><Grid3X3/></button>}
    </div></header>
    <main className="mx-auto my-auto flex w-full max-w-3xl justify-center text-center">
      <AnimatePresence mode="wait"><motion.section key={`${state.runId}-${state.currentScene}-${state.beat}`} initial={{opacity:0,y:state.reducedMotion?0:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} className={`pointer-events-auto rounded-2xl border border-white/10 bg-[#050914]/70 p-5 shadow-2xl backdrop-blur-md sm:p-8 ${beat.id==='hero'?'mt-[36vh]':''}`}>
        {beat.title&&<p className="mb-4 text-xs font-semibold tracking-[.28em] text-amber-300">{beat.title}</p>}
        {state.currentScene===1&&state.beat===0&&<><p className="mb-5 font-serif text-xl italic text-amber-100">“{beat.lines[0]}”</p><h1 className="font-serif text-4xl font-bold tracking-[.12em] sm:text-6xl">THE JOURNEY</h1><p className="mt-3 text-xs tracking-[.32em] text-amber-200">A GRADUATION STORY</p><button className="primary mt-8" onClick={start}>Mulai Perjalanan <ChevronRight/></button></>}
        {!(state.currentScene===1&&state.beat===0)&&<>{beat.lines.map(line=><p key={line} className="mb-3 font-serif text-lg leading-relaxed italic sm:text-2xl">“{line}”</p>)}{identity.map(line=><p key={line} className={line===content.recipientName?'font-serif text-4xl text-amber-100':'mt-2 text-sm tracking-[.14em] text-white/80'}>{line}</p>)}
          {beat.id==='university'&&<p className="text-sm text-blue-200">{content.program}<br/>{content.university}</p>}{beat.id==='final-project'&&<p className="text-sm text-white/70">{content.program}<br/>{content.finalProject}</p>}
          {beat.id==='message'&&<><p className="max-w-xl whitespace-pre-line leading-relaxed text-white/80">{content.personalMessage}</p><p className="mt-5 text-amber-200">— {content.yourName}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button className="secondary" onClick={state.resetExperience}><RotateCcw/> Putar Lagi</button><button className="primary" onClick={state.advance}>Satu Kenangan Terakhir <ChevronRight/></button></div></>}
          {interactive&&<button className="secondary mt-5" onClick={state.advance}>Lanjutkan perjalanan <ChevronRight/></button>}
          {gate&&<div className="mt-4"><label className="mb-3 block text-xs tracking-[.18em] text-amber-200" htmlFor="gate">GESER UNTUK MEMBUKA</label><input id="gate" type="range" min="0" max="100" value={state.gateProgress} onChange={e=>state.openGate(Number(e.target.value))} className="w-full accent-amber-400"/><button className="secondary mt-4" onClick={()=>state.openGate(100)}>Buka dengan tombol</button></div>}
          {wall&&<><p className="mb-4 text-sm text-white/65">Jelajahi foto, lalu pilih frame kosong untuk perjalanan yang belum memiliki foto.</p><button className="secondary" onClick={state.enterHorizon}>Untuk perjalanan yang belum memiliki foto <ChevronRight/></button></>}
          {final&&<><p className="font-serif text-2xl text-amber-100">{content.recipientName}</p><p className="mt-5 text-xs text-white/50">Made with ❤️ by {content.yourName}</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button className="secondary" onClick={state.resetExperience}><RotateCcw/> Putar Lagi</button><button className="primary" onClick={()=>state.setGalleryOpen(true)}><Grid3X3/> Lihat Semua Foto</button></div></>}
        </>}</motion.section></AnimatePresence>
    </main>
    <footer className="pointer-events-auto mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2" aria-label="Kemajuan cerita">{storyboard[state.currentScene].map((_,index)=><span key={index} className={`h-1.5 rounded-full transition-all ${index===state.beat?'w-6 bg-amber-300':index<state.beat?'w-2 bg-amber-300/45':'w-2 bg-white/20'}`}/>)}</footer>
  </div>;
}
