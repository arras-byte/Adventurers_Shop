import React from 'react';
import { GAME } from '@/lib/gameData';

export default function SteamWidget() {
  return (
    <div className="vellum vellum-edge rounded-lg overflow-hidden p-1">
      <iframe
        src={GAME.steamWidgetUrl}
        frameBorder="0"
        width="100%"
        height="190"
        title="Adventurer's Shop on Steam"
        className="rounded"
      />
    </div>
  );
}