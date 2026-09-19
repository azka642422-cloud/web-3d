import type { SceneId, StoryBeat } from '../types';
export const sceneTitles = ['Opening', 'P3HM Lirboyo', 'Pengabdian & Kuliah', 'Pernikahan & Keluarga', 'The Long Nights', 'The Moment', 'Epilogue'];
// Approved narrative. Personal details are resolved from StoryService, never invented here.
export const storyboard: Record<SceneId, StoryBeat[]> = {
  1: [
    { id: 'opening', lines: ['Setiap pencapaian memiliki sebuah perjalanan.'], mode: 'waiting' },
    { id: 'enter', lines: ['Mari kembali ke tempat di mana cerita ini dilalui.'], duration: 4500, pose: [0, 0.8, 2.8], target: [0, 0.8, -4] },
  ],
  2: [
    { id: 'pondok', title: 'P3HM — LIRBOYO', lines: ['Di sinilah salah satu perjalanan panjang itu dilalui.'], duration: 6500 },
    { id: 'kitab', title: 'Belajar. Bertumbuh.', lines: ['Mengabdi.'], duration: 5500, pose: [-1.8, 2.3, 3.8], target: [-0.5, 0, 0] },
    { id: 'pondok-memories', title: 'Kenangan P3HM', lines: [], gallery: ['pondok'], mode: 'interactive' },
    { id: 'pondok-graduation', lines: ['Satu masa belajar telah diselesaikan.'], gallery: ['pondok'], duration: 6000 },
    { id: 'service-call', title: 'Mengabdi.', lines: ['Namun perjalanannya di sini belum selesai.'], duration: 6000 },
  ],
  3: [
    { id: 'service', title: 'PENGABDIAN', lines: ['Perjalanan di tempat ini belum usai.', 'Kini, bukan hanya tentang belajar. Ada amanah yang mulai dijalani.'], duration: 9500 },
    { id: 'service-memories', title: 'A new responsibility begins.', lines: [], gallery: ['service'], mode: 'interactive' },
    { id: 'university', title: 'PAI', lines: ['Di tengah masa pengabdian, perjalanan pendidikan yang lain dimulai.'], duration: 7500, pose: [1.8, 1.9, 4], target: [0.3, 0.3, 0] },
    { id: 'dual', title: 'PENGABDIAN · KULIAH', lines: [], gallery: ['service', 'college'], mode: 'interactive' },
    { id: 'together', lines: ['Dan di tengah perjalanan itu...', 'Hadir sebuah perjalanan yang akan dilalui bersama.'], duration: 7500 },
  ],
  4: [
    { id: 'wedding', title: 'PERNIKAHAN', lines: [], gallery: ['wedding'], duration: 6000 },
    { id: 'wedding-memories', lines: [], gallery: ['wedding'], mode: 'interactive' },
    { id: 'table-wedding', lines: ['Sebuah bab baru dimulai.', 'Namun perjalanan yang sebelumnya dimulai, tetap diteruskan.'], duration: 8000 },
    { id: 'baby', lines: ['Lalu perjalanan itu bertumbuh...'], gallery: ['family'], duration: 6500 },
    { id: 'family', title: 'PENGABDIAN · KULIAH · KELUARGA', lines: [], gallery: ['family'], mode: 'interactive' },
    { id: 'signature', lines: ['Dan semuanya terus berjalan, bersamaan.'], duration: 6500 },
    { id: 'nightfall', lines: [], duration: 5000 },
  ],
  5: [
    { id: 'long-nights', title: 'THE LONG NIGHTS', lines: ['Tidak semua perjalanan dilalui dengan mudah.'], duration: 7000 },
    { id: 'assignments', title: 'ASSIGNMENT → SEMESTER → FINAL PROJECT', lines: [], duration: 5500 },
    { id: 'family-callback', lines: [], gallery: ['family'], duration: 5500 },
    { id: 'responsibilities', title: 'PENGABDIAN · KULIAH · KELUARGA', lines: ['Banyak hal berjalan dalam waktu yang sama.', 'Namun langkah itu tidak berhenti.'], duration: 8000 },
    { id: 'final-project', title: 'TUGAS AKHIR', lines: [], duration: 6500, pose: [1.3, 1.4, 3], target: [0.4, 0.3, 0] },
    { id: 'last-page', lines: ['Satu halaman terakhir...', '...sebelum perjalanan ini mencapai salah satu tujuannya.'], duration: 8000 },
    { id: 'lights-out', lines: [], duration: 4500 },
    { id: 'tunnel', lines: [], duration: 8000, pose: [0, 1, -6], target: [0, 1, -12] },
    { id: 'look-back', lines: ['Lihatlah seberapa jauh perjalanan ini telah dilalui.'], duration: 7000, pose: [0, 1, -6], target: [0, 1, 3] },
    { id: 'gate', lines: [], mode: 'waiting', pose: [0, 1, -7], target: [0, 1, -12] },
    { id: 'gate-opening', lines: [], duration: 2500, pose: [0, 1, -10], target: [0, 1, -15] },
  ],
  6: [
    { id: 'moment', title: 'THE MOMENT', lines: ['Satu perjalanan telah sampai pada sebuah pencapaian.'], duration: 7500 },
    { id: 'hero', title: 'CONGRATULATIONS', lines: [], duration: 5000 },
    { id: 'name', lines: [], duration: 5000 },
    { id: 'degree', lines: [], duration: 6500 },
    { id: 'celebration', lines: [], duration: 6000 },
    { id: 'journey-behind', lines: ['Hari ini bukan hanya tentang sebuah gelar.', 'Ada perjalanan panjang yang ikut berdiri di belakangnya.'], duration: 8500, pose: [3.2, 2, 6], target: [0, 1, -2] },
    { id: 'final-table', lines: [], duration: 6000, pose: [0, 2, 4.6], target: [0, 0, 0] },
    { id: 'sunrise', lines: ['Satu bab telah diselesaikan.', 'Dan perjalanan berikutnya telah menunggu.'], duration: 7500 },
    { id: 'message', title: 'Untuk Kakakku,', lines: [], mode: 'waiting' },
  ],
  7: [
    { id: 'before', lines: ['Sebelum perjalanan ini berlanjut...'], duration: 5000 },
    { id: 'remember', lines: ['Mari melihat kembali beberapa cerita yang membawanya sampai ke sini.'], duration: 6500 },
    { id: 'wall', title: 'Memory Wall', lines: [], mode: 'freeExplore' },
    { id: 'horizon', lines: [], duration: 6500, pose: [0, 1.4, -3], target: [0, 1, -18] },
    { id: 'continues', title: 'THE JOURNEY CONTINUES', lines: ['Karena wisuda bukanlah akhir dari perjalanan.'], duration: 6500 },
    { id: 'distance', lines: ['Ia hanya menjadi salah satu tempat indah untuk melihat seberapa jauh langkah telah berjalan.'], duration: 8500 },
    { id: 'congratulations', lines: ['Selamat wisuda, Kak.'], duration: 6500 },
    { id: 'ending', lines: [], mode: 'waiting' },
  ],
};
export const getBeat = (scene: SceneId, beat: number) => storyboard[scene][beat] ?? storyboard[scene][0];

