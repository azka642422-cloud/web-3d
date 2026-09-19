import type { Chapter, MemoryPhoto, StoryContent } from '../types';

const memories = (chapter: Chapter, titles: string[]): MemoryPhoto[] => titles.map((title, index) => ({
  id: chapter + '-' + (index + 1), chapter, title,
  thumbnailUrl: '/images/memory-placeholder.svg', fullUrl: '/images/memory-placeholder.svg',
  alt: 'Tempat foto: ' + title, description: '[SHORT_MEMORY]', date: '[YEAR]',
  sortOrder: index + 1, placeholder: true, aspectRatio: 1.4,
}));
export const storyContent: StoryContent = {
  recipientName: '[FULL_NAME]', partnerName: '[PARTNER_NAME]', yourName: '[YOUR_NAME]',
  degree: '[DEGREE]', university: '[UNIVERSITY]', program: 'Pendidikan Agama Islam',
  graduationYear: '[YEAR]', finalProject: '[FINAL_PROJECT_DATA]',
  pondokName: 'P3HM — LIRBOYO', pondokYears: '[PONDOK_YEARS]', weddingDate: '[WEDDING_DATE]',
  personalMessage: '[PERSONAL_MESSAGE]', audio: { url: null, volume: 0.6 },
  photos: {
    pondok: memories('pondok', ['Kenangan P3HM', 'Belajar bersama', 'Di ruang belajar', 'Kelulusan pondok']),
    service: memories('service', ['Pengabdian', 'Amanah']),
    college: memories('college', ['Awal kuliah PAI', 'Dua perjalanan']),
    wedding: memories('wedding', ['Pernikahan', 'Perjalanan bersama', 'Kenangan pernikahan']),
    family: memories('family', ['Buah hati', 'Keluarga']),
    longNights: memories('longNights', ['Malam-malam panjang', 'Tugas akhir']),
    graduation: memories('graduation', ['Wisuda']),
  },
};

