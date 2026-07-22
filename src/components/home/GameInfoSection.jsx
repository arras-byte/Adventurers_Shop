import React from 'react';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';
import { Swords, Map, Hammer, Users } from 'lucide-react';

const ICONS = [Swords, Map, Hammer, Users];

export default function GameInfoSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-3 block">
            The World of Zoldar
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-[#F4EBD0] mb-4">
            Merchant by trade, hero by destiny
          </h2>
          <p className="text-[#F4EBD0]/60 leading-relaxed">
            {GAME.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {GAME.features.map((feature, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="vellum vellum-edge rounded-lg p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#C89116]/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#C89116]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-[#2D241E] mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#5C4A3E] leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-12">
          {GAME.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#F4EBD0]/50 border border-[#F4EBD0]/15 rounded-full px-3 py-1.5 hover:border-[#C89116]/40 hover:text-[#C89116] transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}