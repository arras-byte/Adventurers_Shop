import React from 'react';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';
import { FolderOpen, Download, Image, Film, FileText, ExternalLink } from 'lucide-react';

const ASSETS = [
  { icon: Image, label: 'Screenshots', desc: 'High-res in-game captures' },
  { icon: FileText, label: 'Logos & Branding', desc: 'Vector logos and key art' },
  { icon: Film, label: 'Trailers', desc: 'Gameplay and cinematic trailers' },
  { icon: Download, label: 'Full Press Kit', desc: 'Everything in one folder' },
];

export default function PressKitSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center"
        >
          <div className="relative">
            <div className="vellum vellum-edge rounded-lg overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
              <img
                src={GAME.pressKitImage}
                alt="Press kit materials"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-3 block">
              For Media & Creators
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 text-[#F4EBD0] mb-4">
              The Treasury
            </h2>
            <p className="text-[#F4EBD0]/60 leading-relaxed mb-8">
              Everything you need to cover Adventurer's Shop — screenshots, logos, trailers,
              and fact sheets. All assets are free to use for editorial and promotional purposes.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {ASSETS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-lg border border-[#F4EBD0]/10 hover:border-[#C89116]/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#C89116] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-600 text-[#F4EBD0]">{label}</p>
                    <p className="text-xs text-[#F4EBD0]/40">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={GAME.pressKitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2D241E] hover:bg-[#3D342E] text-[#F4EBD0] font-heading text-sm px-6 py-3 rounded transition-colors"
            >
              <FolderOpen className="w-4 h-4" /> Open Press Kit
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}