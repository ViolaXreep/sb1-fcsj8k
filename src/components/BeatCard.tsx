import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, ShoppingCart } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface Beat {
  id: string;
  title: string;
  bpm: number;
  price: {
    basic: number;
    withStems: number;
  };
  audioUrl: string;
  waveform: string;
  tags: string[];
}

export default function BeatCard({ beat, isPlaying, onPlay, onPause }: { 
  beat: Beat;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  return (
    <>
      <div className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
        <audio 
          ref={audioRef}
          id={`audio-${beat.id}`}
          src={beat.audioUrl}
          onEnded={() => onPause()}
        />
        
        <div className="flex items-center gap-4">
          <button 
            onClick={isPlaying ? onPause : onPlay}
            className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-zinc-100" />
            ) : (
              <Play className="w-5 h-5 text-zinc-100" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className="text-zinc-100 font-medium">{beat.title}</h3>
            <p className="text-zinc-400 text-sm">{beat.bpm} BPM</p>
          </div>

          <button 
            onClick={() => setShowPaymentModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-md text-sm transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            From ${beat.price.basic}
          </button>
        </div>

        <div className="mt-4 h-12 bg-zinc-800/50 rounded overflow-hidden">
          <img src={beat.waveform} alt="Waveform" className="w-full h-full object-cover opacity-50" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {beat.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        beat={beat}
      />
    </>
  );
}