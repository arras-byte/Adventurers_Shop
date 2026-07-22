import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { GAME } from '@/lib/gameData';
import { ArrowLeft, PenSquare, Calendar, User } from 'lucide-react';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.BlogPost.get(id);
        setPost(data);
      } catch (err) {
        console.error('Failed to load post:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-3 border-[#C89116]/20 border-t-[#C89116] rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="max-w-md mx-auto px-5 py-32 text-center">
        <h1 className="font-heading text-2xl text-[#F4EBD0] mb-3">Entry not found</h1>
        <p className="text-[#F4EBD0]/50 text-sm mb-6">
          This scroll seems to have been misplaced in the archives.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#C89116] hover:text-[#E0A82E] font-heading text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to the Ledger
        </Link>
      </div>
    );
  }

  const cover = post.cover_image || GAME.blogHeaderImage;
  const date = post.created_date ? format(new Date(post.created_date), 'MMMM d, yyyy') : '';

  return (
    <article>
      {/* Cover */}
      <div className="relative h-[42vh] min-h-[300px] overflow-hidden">
        <img
          src={cover}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/50 via-[#1A120B]/30 to-[#1A120B]" />
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 -mt-20 relative">
        {/* Title card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="vellum vellum-edge rounded-lg p-8 sm:p-10 mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-[#5C4A3E] hover:text-[#2D241E] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to the Ledger
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-700 text-[#2D241E] mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C4A3E]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {post.author || GAME.developer}
            </span>
            {post.published === false && (
              <span className="bg-red-900/10 text-red-700 px-2 py-0.5 rounded text-xs font-600">
                Draft
              </span>
            )}
            {isAuthenticated && (
              <button
                onClick={() => navigate(`/blog/${post.id}/edit`)}
                className="ml-auto flex items-center gap-1.5 text-[#C89116] hover:text-[#8B6510] font-600 transition-colors"
              >
                <PenSquare className="w-3.5 h-3.5" /> Edit
              </button>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="vellum vellum-edge rounded-lg p-8 sm:p-10 mb-12"
        >
          {post.content ? (
            <div
              className="prose-vellum"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-[#5C4A3E]/50 italic">This entry has no content yet.</p>
          )}
        </motion.div>

        <div className="text-center pb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border border-[#F4EBD0]/20 hover:border-[#C89116] text-[#F4EBD0]/70 hover:text-[#C89116] font-heading text-sm px-5 py-2.5 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Entries
          </Link>
        </div>
      </div>
    </article>
  );
}