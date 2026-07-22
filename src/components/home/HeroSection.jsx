import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';
import { Store, BookOpen, ChevronDown } from 'lucide-react';
import YouTubeEmbed from '@/components/YouTubeEmbed';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={GAME.heroImage}
          alt="Adventurer's Shop counter"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/70 via-[#1A120B]/50 to-[#1A120B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B]/80 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-[1fr_1fr] gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <span className="inline-block text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-4 font-500">
            An open-world co-op adventure
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-700 text-[#F4EBD0] leading-[0.95] mb-6">
            Adventurer's
            <span className="block text-[#C89116]">Shop</span>
          </h1>
          <p className="text-lg text-[#F4EBD0]/75 leading-relaxed mb-8 max-w-md">
            {GAME.tagline} Explore Zoldar, battle monsters for rare materials, and craft epic
            gear — alone or with friends.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GAME.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#C89116] hover:bg-[#E0A82E] text-[#1A120B] font-heading text-sm px-6 py-3 rounded transition-colors duration-200"
            >
              <Store className="w-4 h-4" /> Wishlist on Steam
            </a>
            <Link
              to="/blog"
              className="flex items-center gap-2 border border-[#F4EBD0]/30 hover:border-[#C89116] hover:text-[#C89116] text-[#F4EBD0]/80 font-heading text-sm px-6 py-3 rounded transition-colors duration-200"
            >
              <BookOpen className="w-4 h-4" /> Read the Devlog
            </Link>
          </div>

          <div className="flex gap-6 mt-10 text-sm">
            <div>
              <span className="block text-[#F4EBD0]/40 text-xs uppercase tracking-wide mb-1">Release</span>
              <span className="text-[#F4EBD0] font-500">{GAME.release}</span>
            </div>
            <div className="border-l border-[#F4EBD0]/15 pl-6">
              <span className="block text-[#F4EBD0]/40 text-xs uppercase tracking-wide mb-1">Developer</span>
              <span className="text-[#F4EBD0] font-500">{GAME.developer}</span>
            </div>
            <div className="border-l border-[#F4EBD0]/15 pl-6">
              <span className="block text-[#F4EBD0]/40 text-xs uppercase tracking-wide mb-1">Publisher</span>
              <span className="text-[#F4EBD0] font-500">{GAME.publisher}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <YouTubeEmbed />
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#F4EBD0]/30 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}