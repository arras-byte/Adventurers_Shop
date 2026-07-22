import React, { useState } from 'react';
import { GAME } from '@/lib/gameData';
import { Play } from 'lucide-react';

export default function YouTubeEmbed({ className = '' }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative w-full overflow-hidden rounded-lg vellum-edge ${className}`}
        style={{ aspectRatio: '16 / 9' }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${GAME.youtubeVideoId}?autoplay=1&rel=0`}
          title="Adventurer's Shop Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`relative w-full overflow-hidden rounded-lg vellum-edge group block ${className}`}
      style={{ aspectRatio: '16 / 9' }}
    >
      <img
        src={GAME.heroImage}
        alt="Adventurer's Shop trailer thumbnail"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/80 via-transparent to-[#1A120B]/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#C89116]/90 flex items-center justify-center shadow-lg group-hover:bg-[#E0A82E] group-hover:scale-110 transition-all duration-300">
          <Play className="w-7 h-7 text-[#1A120B] ml-1" fill="currentColor" />
        </div>
      </div>
      <p className="absolute bottom-4 left-5 text-[#F4EBD0] font-heading text-sm tracking-wide">
        ▸ Watch the First Trailer
      </p>
    </button>
  );
}