import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { LogOut, ShieldCheck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { GAME } from '@/lib/gameData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isUnlocked, lock } = useAdminAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = (to, label) => {
    const active = location.pathname === to || (to === '/blog' && location.pathname.startsWith('/blog'));
    return (
      <Link
        to={to}
        className={`font-heading text-sm tracking-wide transition-colors duration-200 ${
          active ? 'text-[#C89116]' : 'text-[#F4EBD0]/80 hover:text-[#F4EBD0]'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A120B]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Image
            src={GAME.assets.logo}
            alt="Adventurer's Shop"
            className="h-9 w-auto group-hover:scale-105 transition-transform"
            fittingType="fit"
          />
          <span className="text-[10px] text-[#3E7C85] tracking-[0.2em] uppercase mt-0.5 hidden sm:block">
            The Living Tome
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {navLink('/', 'Home')}
          {navLink('/blog', 'Ledger')}
          {isUnlocked && (
            <div className="flex items-center gap-4">
              <Link
                to="/blog/new"
                className="flex items-center gap-1.5 font-heading text-sm text-[#C89116] hover:text-[#E0A82E] transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                New Post
              </Link>
              <button
                onClick={() => lock()}
                title="Sign out"
                className="text-[#F4EBD0]/50 hover:text-[#F4EBD0] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}