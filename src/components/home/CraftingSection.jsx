import React from 'react';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';

export default function CraftingSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,145,22,0.04),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-3 block">
            Every Blade Has a Story
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-[#F4EBD0] mb-4">
            The Crafting Circle
          </h2>
          <p className="text-[#F4EBD0]/55 leading-relaxed max-w-lg mx-auto">
            From raw ore to legendary blade — watch your creations come to life at each
            crafting station across Zoldar.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GAME.craftingVideos.map((craft, i) => (
            <motion.div
              key={craft.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="vellum vellum-edge rounded-lg overflow-hidden group"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                <video
                  src={craft.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="font-heading text-base font-600 text-[#F4EBD0]">
                    {craft.title}
                  </h3>
                  <p className="text-xs text-[#F4EBD0]/60">{craft.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}