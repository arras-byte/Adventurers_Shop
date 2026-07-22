import React, { useState, useEffect } from 'react';
import { adminAuth, blogAdminCall } from '@/lib/adminAuth';
import { X } from 'lucide-react';

export default function LoginModal({ open, onClose }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setPassphrase('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await blogAdminCall('verify', { passphrase });
      adminAuth.unlock(passphrase);
      onClose();
    } catch (err) {
      setError(
        err?.status === 403
          ? 'Wrong passphrase.'
          : 'Something went wrong. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative vellum vellum-edge rounded-lg p-8 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeUp 0.4s ease-out' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2D241E]/40 hover:text-[#2D241E] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="magic-circle mb-4" />
          <h2 className="font-heading text-2xl text-[#2D241E]">Artisan's Seal</h2>
          <p className="text-sm text-[#5C4A3E] mt-1">Enter the inner sanctum</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Passphrase"
            required
            autoFocus
            className="w-full bg-transparent border-b border-[#C89116]/30 px-0 py-2 text-[#2D241E] placeholder-[#5C4A3E]/40 focus:border-[#3E7C85] focus:outline-none transition-colors text-sm"
          />
          {error && (
            <p className="text-sm text-red-700 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#2D241E] text-[#F4EBD0] font-heading tracking-wide text-sm rounded hover:bg-[#1A120B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Channeling…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}