import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin } from 'lucide-react';
import { useExperienceStore } from '../stores/useExperienceStore';

export const PhotoModal: React.FC = () => {
  const { selectedPhoto, setSelectedPhoto } = useExperienceStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, setSelectedPhoto]);

  return (
    <AnimatePresence>
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full bg-[#0a1128] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors border border-white/10"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Preview Container */}
            <div className="w-full md:w-3/5 bg-black/60 flex items-center justify-center p-4 min-h-[300px] md:min-h-[450px]">
              <img
                src={selectedPhoto.fullUrl}
                alt={selectedPhoto.alt}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Content & Metadata */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0a1128] to-[#040814] text-white">
              <div>
                <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-amber-400 font-medium mb-3">
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {selectedPhoto.date}</span>
                  <span>•</span>
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {selectedPhoto.chapter}</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-amber-100 mb-3 leading-snug">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>The Journey — A Graduation Story</span>
                <span className="text-amber-400/80">Koleksi Kenangan</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
