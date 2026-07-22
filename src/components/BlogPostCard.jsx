import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { GAME } from '@/lib/gameData';
import { PenLine } from 'lucide-react';

export default function BlogPostCard({ post }) {
  const cover = post.cover_image || GAME.blogHeaderImage;
  const date = post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : '';

  return (
    <Link
      to={`/blog/${post.id}`}
      className="group block vellum vellum-edge rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
        <img
          src={cover}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/60 to-transparent" />
        {date && (
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C89116] to-[#8B6510] flex flex-col items-center justify-center shadow-lg">
              <span className="text-[9px] font-700 text-[#1A120B] leading-none uppercase">
                {format(new Date(post.created_date), 'MMM').slice(0, 3)}
              </span>
              <span className="text-sm font-700 text-[#1A120B] leading-none mt-0.5">
                {format(new Date(post.created_date), 'd')}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-600 text-[#2D241E] mb-2 group-hover:text-[#5C3A1E] transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-[#5C4A3E] leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-[#8B7355]">
          <PenLine className="w-3.5 h-3.5" />
          <span>{post.author || GAME.developer}</span>
        </div>
      </div>
    </Link>
  );
}