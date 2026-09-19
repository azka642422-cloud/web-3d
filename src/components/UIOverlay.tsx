import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, ChevronRight, RotateCcw, Bug, LayoutGrid } from 'lucide-react';
import { useExperienceStore } from '../stores/useExperienceStore';
import { storyContent } from '../content/storyData';

export const UIOverlay: React.FC = () => {
  const {
    currentScene,
    setScene,
    userHasStarted,
    startExperience,
    resetExperience,
    audioMuted,
    setAudioMuted,
    qualityLevel,
    setQualityLevel,
    debugMode,
    toggleDebugMode,
    setGalleryOpen,
    graduationGateUnlocked,
    setGraduationGateUnlocked
  } = useExperienceStore();

  const [transitioningText, setTransitioningText] = useState(false);
  const [gateProgress, setGateProgress] = useState(0);

  const handleStart = () => {
    setTransitioningText(true);
    setTimeout(() => {
      startExperience();
      setTransitioningText(false);
      setScene(2);
    }, 2800);
  };

  const handleGateUnlock = () => {
    setGraduationGateUnlocked(true);
    setScene(6);
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Bar: Minimal controls & Audio & Debug & Gallery */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300/90 font-serif font-medium">
            THE JOURNEY
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs text-white/60 font-light hidden sm:inline">
            A Graduation Story
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Gallery Button */}
          <button
            onClick={() => setGalleryOpen(true)}
            className="p-2 px-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors backdrop-blur-sm flex items-center space-x-1.5 text-xs font-medium"
            title="Lihat Semua Foto"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Lihat Semua Foto</span>
          </button>

          {/* Debug Toggle */}
          <button
            onClick={toggleDebugMode}
            className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            title="Toggle Debug Menu"
            aria-label="Debug"
          >
            <Bug className="w-4 h-4" />
          </button>

          {/* Audio Toggle */}
          {userHasStarted && (
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center space-x-1.5 px-3"
            >
              {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
              <span className="text-xs font-medium">{audioMuted ? 'Muted' : 'Audio On'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Debug Panel */}
      {debugMode && (
        <div className="absolute top-16 left-6 z-30 pointer-events-auto bg-[#0a1128]/90 border border-amber-500/40 rounded-xl p-4 text-white text-xs backdrop-blur-md shadow-2xl space-y-3 max-w-xs">
          <div className="font-semibold text-amber-300 border-b border-white/10 pb-1.5 flex justify-between items-center">
            <span>Developer Debug Panel</span>
            <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-200">Scene {currentScene}/7</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <button
                key={s}
                onClick={() => setScene(s)}
                className={`py-1.5 rounded font-bold transition-colors ${
                  currentScene === s ? 'bg-amber-500 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-slate-300">
            <span>Quality: {qualityLevel}</span>
            <button
              onClick={() => setQualityLevel(qualityLevel === 'high' ? 'low' : 'high')}
              className="underline text-amber-300"
            >
              Toggle Quality
            </button>
          </div>
        </div>
      )}

      {/* Center / Bottom Narrative Content per Scene */}
      <div className="flex flex-col items-center justify-center my-auto text-center max-w-2xl mx-auto pointer-events-auto">
        <AnimatePresence mode="wait">
          {!userHasStarted && currentScene === 1 && !transitioningText ? (
            /* SCENE 01 OPENING */
            <motion.div
              key="opening"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <p className="text-amber-200/90 font-serif italic text-lg sm:text-xl tracking-wide">
                “Setiap pencapaian memiliki sebuah perjalanan.”
              </p>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-wider">
                THE JOURNEY
              </h1>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80 font-medium">
                a graduation story
              </p>
              <div className="pt-6">
                <button
                  onClick={handleStart}
                  className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#040814] font-semibold rounded-full shadow-2xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Mulai Perjalanan</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : transitioningText ? (
            /* EXACT OPENING TRANSITION NARRATION */
            <motion.div
              key="transitioning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <p className="text-2xl sm:text-3xl font-serif text-amber-100 italic tracking-wide">
                “Mari kembali ke tempat di mana cerita ini dilalui.”
              </p>
            </motion.div>
          ) : currentScene === 2 ? (
            /* SCENE 02 P3HM LIRBOYO */
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                P3HM — LIRBOYO
              </div>
              <p className="text-xl sm:text-2xl font-serif text-white italic">
                “Di sinilah salah satu perjalanan panjang itu dilalui.”
              </p>
              <div className="flex justify-center space-x-6 text-sm text-amber-200/90 font-medium pt-2">
                <span>Belajar.</span>
                <span>•</span>
                <span>Bertumbuh.</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">Mengabdi.</span>
              </div>
              <div className="pt-4 flex justify-center space-x-4">
                <button
                  onClick={() => setScene(3)}
                  className="px-6 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/50 rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center space-x-2"
                >
                  <span>Lanjut ke Pengabdian</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : currentScene === 3 ? (
            /* SCENE 03 PENGABDIAN & UNIVERSITY */
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
                PENGABDIAN & KULIAH PAI
              </div>
              <p className="text-xl sm:text-2xl font-serif text-white italic">
                “Perjalanan di tempat ini belum usai. Kini, bukan hanya tentang belajar. Ada amanah yang mulai dijalani.”
              </p>
              <p className="text-xs text-slate-300 font-light">
                {storyContent.university}
              </p>
              <div className="pt-4 flex justify-center space-x-4">
                <button
                  onClick={() => setScene(4)}
                  className="px-6 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/50 rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center space-x-2"
                >
                  <span>Menuju Babak Keluarga</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : currentScene === 4 ? (
            /* SCENE 04 FAMILY & MARRIAGE */
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                PERNIKAHAN & KELUARGA
              </div>
              <p className="text-xl sm:text-2xl font-serif text-white italic">
                “Sebuah bab baru dimulai. Namun perjalanan sebelumnya tetap diteruskan bersama.”
              </p>
              <div className="pt-4 flex justify-center space-x-4">
                <button
                  onClick={() => setScene(5)}
                  className="px-6 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/50 rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center space-x-2"
                >
                  <span>Masuk ke Malam-Malam Panjang</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : currentScene === 5 ? (
            /* SCENE 05 LONG NIGHTS & INTERACTIVE GRADUATION GATE */
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-5 bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl max-w-xl mx-auto"
            >
              <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                THE LONG NIGHTS & GERBANG WISUDA
              </div>
              <p className="text-lg sm:text-xl font-serif text-white italic">
                “Lihatlah seberapa jauh perjalanan ini telah dilalui.”
              </p>
              <p className="text-xs text-slate-300">
                Geser atau klik tombol di bawah untuk membuka gerbang menuju pencapaian akhir.
              </p>

              {/* Interactive Gateway Gesture */}
              <div className="space-y-3 pt-2">
                <div className="relative w-full h-12 bg-black/80 rounded-full border border-amber-500/40 overflow-hidden flex items-center px-2">
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500/30 to-amber-400/50 transition-all"
                    style={{ width: `${Math.max(15, gateProgress)}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gateProgress}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setGateProgress(val);
                      if (val >= 95) {
                        handleGateUnlock();
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    aria-label="Geser untuk membuka gerbang"
                  />
                  <span className="w-full text-center text-xs uppercase tracking-widest text-amber-200 font-semibold z-0">
                    {gateProgress >= 95 ? 'Gerbang Terbuka ✨' : '← Geser untuk Membuka →'}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                  <span>Tahan & Geser ke Kanan</span>
                  <button
                    onClick={handleGateUnlock}
                    className="text-amber-300 underline hover:text-amber-200"
                  >
                    Buka Langsung
                  </button>
                </div>
              </div>
            </motion.div>
          ) : currentScene === 6 ? (
            /* SCENE 06 GRADUATION */
            <motion.div
              key="scene-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 bg-black/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-amber-500/40 shadow-2xl max-w-xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold">CONGRATULATIONS</span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
                {storyContent.recipientName}
              </h2>
              <p className="text-sm font-light text-slate-300 leading-relaxed font-serif">
                {storyContent.personalMessage}
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setScene(7)}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-[#040814] font-semibold rounded-full text-xs tracking-wider transition-transform hover:scale-105 shadow-2xl flex items-center space-x-2"
                >
                  <span>Satu Kenangan Terakhir →</span>
                </button>
              </div>
            </motion.div>
          ) : currentScene === 7 ? (
            /* SCENE 07 EPILOGUE */
            <motion.div
              key="scene-7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 bg-black/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl max-w-xl mx-auto"
            >
              <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                THE JOURNEY CONTINUES
              </div>
              <p className="text-lg sm:text-xl font-serif text-white italic">
                “Wisuda bukanlah akhir dari perjalanan. Ia hanya menjadi salah satu tempat indah untuk melihat seberapa jauh langkah telah berjalan.”
              </p>
              <p className="text-sm text-amber-200 font-medium">
                Selamat wisuda, Kak.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    resetExperience();
                  }}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Putar Lagi</span>
                </button>
                <button
                  onClick={() => setGalleryOpen(true)}
                  className="px-6 py-2.5 bg-amber-500 text-[#040814] font-semibold rounded-full text-xs tracking-wider transition-colors flex items-center space-x-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Lihat Semua Foto</span>
                </button>
              </div>
              <div className="pt-2 text-[11px] text-slate-400 font-light">
                Made with ❤️ by {storyContent.yourName}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Bottom Footer: Journey Progression Dots */}
      <div className="flex items-center justify-center w-full pointer-events-auto pb-2">
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <button
              key={s}
              onClick={() => {
                if (s === 6 && !graduationGateUnlocked && !debugMode) return;
                setScene(s);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentScene === s ? 'w-6 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={`Scene ${s}`}
              aria-label={`Scene ${s}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


