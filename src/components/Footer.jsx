import React from 'react';
import { Link } from 'react-router-dom';
import { GAME } from '@/lib/gameData';
import { ScrollText, Youtube, Store, FolderOpen } from 'lucide-react';

export default function Footer({ onSecretClick }) {
  return (
    <footer className="relative mt-20 border-t border-[#C89116]/15">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <ScrollText className="w-5 h-5 text-[#C89116]" />
              <span className="font-heading text-lg font-700 text-[#F4EBD0]">
                Adventurer's Shop
              </span>
            </div>
            <p className="text-sm text-[#F4EBD0]/50 leading-relaxed">
              Forge your legacy as both merchant and hero. The official devlog and hub for
              Adventurer's Shop by {GAME.developer}.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm text-[#C89116] mb-3 tracking-wide uppercase">
              Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={GAME.steamUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F4EBD0]/60 hover:text-[#F4EBD0] transition-colors">
                  <Store className="w-4 h-4 text-[#3E7C85]" /> Steam Store
                </a>
              </li>
              <li>
                <a href={GAME.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F4EBD0]/60 hover:text-[#F4EBD0] transition-colors">
                  <Youtube className="w-4 h-4 text-[#3E7C85]" /> Trailer on YouTube
                </a>
              </li>
              <li>
                <a href={GAME.pressKitUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F4EBD0]/60 hover:text-[#F4EBD0] transition-colors">
                  <FolderOpen className="w-4 h-4 text-[#3E7C85]" /> Press Kit
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-[#F4EBD0]/60 hover:text-[#F4EBD0] transition-colors block">
                  Devlog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#C89116]/10">
          <p className="text-xs text-[#F4EBD0]/35">
            © {new Date().getFullYear()} {GAME.developer}. Published by {GAME.publisher}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#F4EBD0]/20 tracking-widest uppercase hidden sm:block">
              Artisan's Seal
            </span>
            <button
              onClick={onSecretClick}
              className="wax-seal"
              title=""
              aria-label="Artisan's seal"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}