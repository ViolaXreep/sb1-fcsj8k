import React, { useState } from 'react';
import { Flame, Clock3, Music2 } from 'lucide-react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BeatCard from './components/BeatCard';
import AboutSection from './components/AboutSection';

const SAMPLE_BEATS = [
  {
    id: '1',
    title: 'Cold Metal',
    bpm: 140,
    price: { basic: 30, withStems: 40 },
    audioUrl: '/beats/cold-metal-preview.wav',
    waveform: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&h=100&fit=crop',
    tags: ['Dark Trap', 'Heavy', 'Night']
  },
  {
    id: '2',
    title: 'Empty Streets',
    bpm: 128,
    price: { basic: 30, withStems: 40 },
    audioUrl: '/beats/empty-streets-preview.wav',
    waveform: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&h=100&fit=crop',
    tags: ['Ambient', 'Dark', '90s']
  },
  {
    id: '3',
    title: '4AM Shift',
    bpm: 145,
    price: { basic: 30, withStems: 40 },
    audioUrl: '/beats/4am-shift-preview.wav',
    waveform: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&h=100&fit=crop',
    tags: ['Trap', 'Heavy', 'Dark']
  },
  {
    id: '4',
    title: 'Broken Glass',
    bpm: 132,
    price: { basic: 30, withStems: 40 },
    audioUrl: '/beats/broken-glass-preview.wav',
    waveform: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&h=100&fit=crop',
    tags: ['Dark', '90s', 'Lo-fi']
  }
];

const paypalInitialOptions = {
  clientId: "sb",
  currency: "USD",
  intent: "capture",
};

function App() {
  const [playingBeatId, setPlayingBeatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlay = (beatId: string) => {
    if (playingBeatId && playingBeatId !== beatId) {
      const audioElement = document.getElementById(`audio-${playingBeatId}`) as HTMLAudioElement;
      audioElement?.pause();
      audioElement.currentTime = 0;
    }
    setPlayingBeatId(beatId);
  };

  const handlePause = (beatId: string) => {
    setPlayingBeatId(null);
  };

  return (
    <PayPalScriptProvider options={paypalInitialOptions}>
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 transition-colors">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Header />

            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Fresh Beats, Direct Download
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Premium beats with instant delivery. Stems available.
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center gap-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <Flame className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">200+</p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm">Beats Ready</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <Clock3 className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">24/7</p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm">Instant Download</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <Music2 className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">100%</p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm">Clean Files</p>
                </div>
              </div>
            </div>

            <div id="beats" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
              {SAMPLE_BEATS.map((beat) => (
                <BeatCard
                  key={beat.id}
                  beat={beat}
                  isPlaying={playingBeatId === beat.id}
                  onPlay={() => handlePlay(beat.id)}
                  onPause={() => handlePause(beat.id)}
                />
              ))}
            </div>

            <AboutSection />
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;