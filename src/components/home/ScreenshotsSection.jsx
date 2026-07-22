import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScreenshotsSection() {
  const [active, setActive] = useState(0);
  const shots = GAME.screenshots;

  const prev = () => setActive((a) => (a - 1 + shots.length) % shots.length);
  const next = () => setActive((a) => (a + 1) % shots.length);

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-3 block">
            A World in Motion
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-[#F4EBD0]">
            Inside Zoldar
          </h2>
        </motion.div>

        {/* Main viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-lg overflow-hidden vellum-edge mb-4"
        >
          <div className="relative" style={{ aspectRatio: '16 / 9' }}>
            <img
              src={shots[active].src}
              alt={shots[active].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <h3 className="font-heading text-xl sm:text-2xl font-600 text-[#F4EBD0] mb-1">
                {shots[active].title}
              </h3>
              <p className="text-sm text-[#F4EBD0]/60 max-w-lg">
                {shots[active].desc}
              </p>
            </div>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A120B]/70 hover:bg-[#C89116] text-[#F4EBD0] hover:text-[#1A120B] flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A120B]/70 hover:bg-[#C89116] text-[#F4EBD0] hover:text-[#1A120B] flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {shots.map((shot, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative rounded overflow-hidden transition-all duration-200 ${
                active === i
                  ? 'ring-2 ring-[#C89116] ring-offset-2 ring-offset-[#1A120B]'
                  : 'opacity-50 hover:opacity-90'
              }`}
              style={{ aspectRatio: '16 / 10' }}
            >
              <img
                src={shot.src}
                alt={shot.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}