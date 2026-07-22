import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';
import { Store, BookOpen, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={GAME.assets.storeBackground}
          alt="Adventurer's Shop world"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/60 via-[#1A120B]/35 to-[#1A120B]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-[#1A120B]/40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center py-20">
        {/* Glow behind logo */}
        <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[120%] h-64 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(62,124,133,0.18),transparent_65%)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <img
            src={GAME.assets.logo}
            alt="Adventurer's Shop"
            className="mix-blend-screen mx-auto w-full max-w-lg mb-6"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-[#F4EBD0]/80 leading-relaxed mb-8 max-w-xl mx-auto"
        >
          {GAME.tagline} Explore Zoldar, battle monsters for rare materials, and craft epic
          gear — alone or with friends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href={GAME.steamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#C89116] hover:bg-[#E0A82E] text-[#1A120B] font-heading text-sm px-6 py-3 rounded transition-colors duration-200 shadow-lg"
          >
            <Store className="w-4 h-4" /> Wishlist on Steam
          </a>
          <Link
            to="/blog"
            className="flex items-center gap-2 border border-[#F4EBD0]/30 hover:border-[#C89116] hover:text-[#C89116] text-[#F4EBD0]/80 font-heading text-sm px-6 py-3 rounded transition-colors duration-200"
          >
            <BookOpen className="w-4 h-4" /> Read the Devlog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex gap-6 justify-center mt-10 text-sm"
        >
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
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#F4EBD0]/30 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}