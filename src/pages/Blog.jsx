import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { GAME } from '@/lib/gameData';
import BlogPostCard from '@/components/BlogPostCard';
import { PenSquare, ScrollText } from 'lucide-react';

export default function Blog() {
  const { isUnlocked } = useAdminAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const filter = isUnlocked ? {} : { published: true };
        const data = await base44.entities.BlogPost.filter(filter, '-created_date', 50);
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isUnlocked]);

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden pt-16 pb-12">
        <div className="absolute inset-0">
          <img
            src={GAME.assets.libraryHeader}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/60 to-[#1A120B]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ScrollText className="w-10 h-10 text-[#C89116] mx-auto mb-4" />
            <h1 className="font-heading text-4xl sm:text-5xl font-700 text-[#F4EBD0] mb-3">
              The Scribe's Archive
            </h1>
            <p className="text-[#F4EBD0]/55 leading-relaxed max-w-lg mx-auto">
              A chronological record of development updates, patch notes, and behind-the-scenes
              looks at Adventurer's Shop.
            </p>
            {isUnlocked && (
              <Link
                to="/blog/new"
                className="inline-flex items-center gap-2 mt-6 bg-[#C89116] hover:bg-[#E0A82E] text-[#1A120B] font-heading text-sm px-5 py-2.5 rounded transition-colors"
              >
                <PenSquare className="w-4 h-4" /> New Entry
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-3 border-[#C89116]/20 border-t-[#C89116] rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="vellum vellum-edge rounded-lg p-16 text-center max-w-md mx-auto">
              <p className="text-[#2D241E] font-heading text-xl mb-2">No entries yet</p>
              <p className="text-sm text-[#5C4A3E]/70">
                {isUnlocked
                  ? 'Click "New Entry" above to write your first devlog post.'
                  : 'Check back soon for development updates.'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}