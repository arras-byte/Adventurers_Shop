import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { blogAdminCall } from '@/lib/adminAuth';
import { GAME } from '@/lib/gameData';
import RichTextEditor from '@/components/RichTextEditor';
import { ArrowLeft, Save, Trash2, Loader2, Eye, ImagePlus } from 'lucide-react';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isUnlocked } = useAdminAuth();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState(GAME.developer);
  const [published, setPublished] = useState(true);
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const post = await base44.entities.BlogPost.get(id);
        setTitle(post.title || '');
        setContent(post.content || '');
        setExcerpt(post.excerpt || '');
        setCoverImage(post.cover_image || '');
        setAuthor(post.author || GAME.developer);
        setPublished(post.published !== false);
        setTags((post.tags || []).join(', '));
      } catch (err) {
        console.error('Failed to load post:', err);
        setError('Could not load this post for editing.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setCoverImage(file_url);
    } catch (err) {
      console.error('Cover upload failed:', err);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('A title is required.');
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      content,
      excerpt: excerpt.trim(),
      cover_image: coverImage,
      author: author.trim() || GAME.developer,
      published,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await blogAdminCall('update', { id, data: payload });
      } else {
        const result = await blogAdminCall('create', { data: payload });
        navigate(`/blog/${result.post.id}`);
        return;
      }
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Save failed:', err);
      setError(err?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (!window.confirm('Delete this entry permanently?')) return;
    try {
      await blogAdminCall('delete', { id });
      navigate('/blog');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto px-5 py-32 text-center">
        <h1 className="font-heading text-2xl text-[#F4EBD0] mb-3">Artisan's eyes only</h1>
        <p className="text-[#F4EBD0]/50 text-sm mb-6">
          You need to be signed in to create or edit entries. Tap the wax seal in the footer
          to enter.
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

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-3 border-[#C89116]/20 border-t-[#C89116] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link
          to={isEdit ? `/blog/${id}` : '/blog'}
          className="inline-flex items-center gap-1.5 text-xs text-[#F4EBD0]/50 hover:text-[#F4EBD0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Cancel
        </Link>
        <h1 className="font-heading text-xl text-[#F4EBD0]">
          {isEdit ? 'Edit Entry' : 'New Entry'}
        </h1>
        <div className="w-16" />
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Cover image */}
        <div className="vellum vellum-edge rounded-lg p-5">
          <label className="block text-xs font-600 text-[#2D241E] uppercase tracking-wide mb-3">
            Cover Image
          </label>
          {coverImage ? (
            <div className="relative rounded overflow-hidden mb-3" style={{ aspectRatio: '16 / 9' }}>
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setCoverImage('')}
                className="absolute top-2 right-2 bg-[#1A120B]/80 text-[#F4EBD0] p-1.5 rounded hover:bg-[#1A120B] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-[#5C4A3E]/50 mb-3">
              Leave empty to use a default header image.
            </p>
          )}
          <label className="inline-flex items-center gap-2 text-xs text-[#2D241E] bg-[#C89116]/15 hover:bg-[#C89116]/25 px-3 py-1.5 rounded cursor-pointer transition-colors">
            {uploadingCover ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</>
            ) : (
              <><ImagePlus className="w-3.5 h-3.5" /> Upload Cover</>
            )}
            <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
          </label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="…or paste an image URL"
            className="w-full mt-3 bg-transparent border-b border-[#C89116]/20 px-0 py-1.5 text-sm text-[#2D241E] placeholder-[#5C4A3E]/30 focus:border-[#3E7C85] focus:outline-none transition-colors"
          />
        </div>

        {/* Title */}
        <div className="vellum vellum-edge rounded-lg p-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title…"
            className="w-full bg-transparent font-heading text-2xl font-700 text-[#2D241E] placeholder-[#5C4A3E]/25 focus:outline-none border-b border-[#C89116]/15 focus:border-[#3E7C85] pb-2 transition-colors"
          />
        </div>

        {/* Rich text editor */}
        <div className="vellum vellum-edge rounded-lg overflow-hidden">
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Meta */}
        <div className="vellum vellum-edge rounded-lg p-5 space-y-4">
          <div>
            <label className="block text-xs font-600 text-[#2D241E] uppercase tracking-wide mb-1.5">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary shown on the blog list card…"
              rows={2}
              className="w-full bg-transparent border border-[#C89116]/15 rounded px-3 py-2 text-sm text-[#2D241E] placeholder-[#5C4A3E]/30 focus:border-[#3E7C85] focus:outline-none transition-colors"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-600 text-[#2D241E] uppercase tracking-wide mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-transparent border border-[#C89116]/15 rounded px-3 py-2 text-sm text-[#2D241E] focus:border-[#3E7C85] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-600 text-[#2D241E] uppercase tracking-wide mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Update, Patch, Devlog…"
                className="w-full bg-transparent border border-[#C89116]/15 rounded px-3 py-2 text-sm text-[#2D241E] placeholder-[#5C4A3E]/30 focus:border-[#3E7C85] focus:outline-none transition-colors"
              />
            </div>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${
                published ? 'bg-[#3E7C85]' : 'bg-[#2D241E]/20'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-[#F4EBD0] rounded-full transition-transform ${
                  published ? 'translate-x-4.5' : ''
                }`}
              />
            </button>
            <span className="text-sm text-[#2D241E]">
              {published ? 'Published — visible to all visitors' : 'Draft — only visible to you'}
            </span>
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {isEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm text-red-400/70 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-3">
            {isEdit && (
              <Link
                to={`/blog/${id}`}
                className="flex items-center gap-1.5 text-sm text-[#F4EBD0]/50 hover:text-[#F4EBD0] transition-colors"
              >
                <Eye className="w-4 h-4" /> Preview
              </Link>
            )}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#C89116] hover:bg-[#E0A82E] text-[#1A120B] font-heading text-sm px-6 py-2.5 rounded transition-colors disabled:opacity-50"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              ) : (
                <><Save className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Publish'}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}