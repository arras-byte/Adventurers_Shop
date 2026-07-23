import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GAME } from '@/lib/gameData';
import { base44 } from '@/api/base44Client';
import HeroSection from '@/components/home/HeroSection';
import GameInfoSection from '@/components/home/GameInfoSection';
import CraftingSection from '@/components/home/CraftingSection';
import ScreenshotsSection from '@/components/home/ScreenshotsSection';
import PressKitSection from '@/components/home/PressKitSection';
import SteamWidget from '@/components/SteamWidget';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import BlogPostCard from '@/components/BlogPostCard';
import { Store, ArrowRight } from 'lucide-react';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await base44.entities.BlogPost.filter(
          { published: true },
          '-created_date',
          3
        );
        setRecentPosts(Array.isArray(posts) ? posts : []);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Trailer */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-8">
            <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-2 block">
              First Look
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-700 text-[#F4EBD0]">
              Watch the Trailer
            </h2>
          </div>
          <YouTubeEmbed />
        </div>
      </section>

      {/* Steam Widget Band */}
      <section className="relative py-12 border-y border-[#C89116]/15 bg-[#150E08]/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-center">
            <div>
              <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-2 block">
                Now on Steam
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-700 text-[#F4EBD0] mb-3">
                Wishlist today
              </h2>
              <p className="text-sm text-[#F4EBD0]/55 leading-relaxed">
                Adventurer's Shop arrives {GAME.release}. Add it to your Steam wishlist to get
                notified at launch and support development.
              </p>
              <a
                href={GAME.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#C89116] hover:text-[#E0A82E] font-heading text-sm transition-colors"
              >
                <Store className="w-4 h-4" /> View full store page
              </a>
            </div>
            <SteamWidget />
          </div>
        </div>
      </section>

      <GameInfoSection />
      <CraftingSection />
      <ScreenshotsSection />

      {/* Latest Blog Posts */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[#3E7C85] text-xs tracking-[0.3em] uppercase mb-2 block">
                Latest from the Ledger
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-700 text-[#F4EBD0]">
                Devlog entries
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-1.5 text-[#C89116] hover:text-[#E0A82E] font-heading text-sm transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingPosts ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-3 border-[#C89116]/20 border-t-[#C89116] rounded-full animate-spin" />
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="vellum vellum-edge rounded-lg p-12 text-center">
              <p className="text-[#5C4A3E] font-heading text-lg mb-2">The ledger is empty</p>
              <p className="text-sm text-[#5C4A3E]/60">
                Devlog entries will appear here once published.
              </p>
            </div>
          )}

          <Link
            to="/blog"
            className="sm:hidden flex items-center justify-center gap-1.5 mt-8 text-[#C89116] font-heading text-sm"
          >
            View all entries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <PressKitSection />
    </div>
  );
}