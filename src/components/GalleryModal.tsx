import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../stores/useExperienceStore';
import { storyContent } from '../content/storyData';
import { MemoryPhoto } from '../types';

export const GalleryModal: React.FC = () => {
  const { galleryOpen, setGalleryOpen, setSelectedPhoto } = useExperienceStore();
  const [activeChapter, setActiveChapter] = useState<string>('all');

  if (!galleryOpen) return null;

  const allPhotos: MemoryPhoto[] = [
    ...storyContent.photos.pondok,
    ...storyContent.photos.service,
    ...storyContent.photos.college,
    ...storyContent.photos.wedding,
    ...storyContent.photos.family,
    ...storyContent.photos.graduation,
    ...storyContent.photos.epilogue,
  ];

  const filteredPhotos = activeChapter === 'all' 
    ? allPhotos 
    : allPhotos.filter(p => p.chapter === activeChapter);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#040814]/95 backdrop-blur-xl p-4 sm:p-10 flex flex-col overflow-y-auto select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 max-w-7xl mx-auto w-full">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs uppercase tracking-[0.25em] mb-1 font-serif">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Arsip Kenangan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Galeri Perjalanan {storyContent.recipientName}
            </h2>
          </div>
          <button
            onClick={() => setGalleryOpen(false)}
            className="p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors border border-white/10"
            aria-label="Tutup Galeri"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chapter Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-6 max-w-7xl mx-auto w-full">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'pondok', label: 'P3HM Lirboyo' },
            { id: 'serviceCollege', label: 'Pengabdian & Kuliah' },
            { id: 'family', label: 'Pernikahan & Keluarga' },
            { id: 'graduation', label: 'Wisuda' },
            { id: 'epilogue', label: 'Epilog' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChapter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all ${
                activeChapter === tab.id
                  ? 'bg-amber-500 text-[#040814] font-semibold shadow-lg'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full pb-12">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer bg-[#0a1128] border border-amber-500/20 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-black/40">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-amber-300 font-medium border border-white/10 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 mr-1" /> {photo.date}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm mb-1 group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light">
                    {photo.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-400/80">
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {photo.chapter}</span>
                  <span className="underline group-hover:text-amber-300">Perbesar →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
