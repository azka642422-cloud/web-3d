/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExperienceCanvas } from './experience/ExperienceCanvas';
import { UIOverlay } from './components/UIOverlay';
import { AudioPlayer } from './components/AudioPlayer';
import { PhotoModal } from './components/PhotoModal';

export default function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#040814] select-none">
      <ExperienceCanvas />
      <UIOverlay />
      <AudioPlayer />
      <PhotoModal />
    </main>
  );
}

