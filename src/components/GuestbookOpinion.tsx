import React, { useState, useEffect } from 'react';
import { GuestbookEntry } from '../types';
import { FloralCorner, FloralDivider } from './FloralCorner';
import { MessageSquareHeart, Heart, Send, Sparkles, HelpCircle, MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'abrar_payelia_wedding_guestbook';

const INITIAL_ENTRIES: GuestbookEntry[] = [];

export const GuestbookOpinion: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(INITIAL_ENTRIES);
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'Blessing' | 'Question' | 'Opinion'>('Blessing');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Blessing' | 'Question' | 'Opinion'>('All');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch {
      // Use defaults
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `entry-${Date.now()}`,
      name: authorName.trim() || 'Well-wishing Guest',
      text: text.trim(),
      category,
      timestamp: 'Just now',
      likes: 1,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setText('');
    setAuthorName('');
  };

  const handleLike = (id: string) => {
    const isLiked = likedIds[id];
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          likes: isLiked ? entry.likes - 1 : entry.likes + 1,
        };
      }
      return entry;
    });

    setEntries(updated);
    setLikedIds((prev) => ({ ...prev, [id]: !isLiked }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const filteredEntries = entries.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 flex justify-center">
      <div
        className="relative w-full max-w-2xl text-[#382027] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#c48a86]"
        style={{
          background: 'linear-gradient(145deg, #fffaf3ee, #f8eddfef)',
          outline: '1px solid rgba(224, 189, 131, 0.45)',
          outlineOffset: '-9px',
          boxShadow: '0 18px 55px rgba(84, 16, 32, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.6)',
        }}
      >
        <FloralCorner position="top-left" size={60} className="top-2 left-2" />
        <FloralCorner position="top-right" size={60} className="top-2 right-2" />
        <FloralCorner position="bottom-left" size={60} className="bottom-2 left-2" />
        <FloralCorner position="bottom-right" size={60} className="bottom-2 right-2" />

        <div className="absolute inset-3 sm:inset-4 border border-[#e0bd83]/30 rounded-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#84243b] font-semibold uppercase">
              Warm Wishes & Inquiries
            </span>
            <h2 className="font-script text-4xl sm:text-5xl text-[#541020] my-1">
              Thoughts & Opinions
            </h2>
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#84243b]/85">
              Share your prayers, questions, or heartfelt sentiments with Abrar and Payelia
            </p>
            <FloralDivider className="my-4" />
          </div>

          {/* Comment submission form */}
          <div className="bg-white/85 rounded-2xl p-5 sm:p-6 border border-[#c48a86]/50 shadow-xs mb-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="opinion-name" className="block font-cinzel text-xs font-bold text-[#541020] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    id="opinion-name"
                    type="text"
                    placeholder="e.g. Ayesha Siddiqua"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#c48a86]/60 bg-[#fffaf2] text-xs sm:text-sm text-[#382027] focus:outline-none focus:ring-1 focus:ring-[#84243b]"
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-xs font-bold text-[#541020] uppercase tracking-wider mb-1">
                    Type of Entry
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f7efe5] rounded-xl border border-[#c48a86]/40">
                    <button
                      type="button"
                      onClick={() => setCategory('Blessing')}
                      className={`text-[11px] font-medium py-1.5 rounded-lg transition-colors cursor-pointer ${
                        category === 'Blessing'
                          ? 'bg-[#84243b] text-white shadow-xs font-semibold'
                          : 'text-[#541020] hover:text-[#84243b]'
                      }`}
                    >
                      Blessing
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategory('Question')}
                      className={`text-[11px] font-medium py-1.5 rounded-lg transition-colors cursor-pointer ${
                        category === 'Question'
                          ? 'bg-[#84243b] text-white shadow-xs font-semibold'
                          : 'text-[#541020] hover:text-[#84243b]'
                      }`}
                    >
                      Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategory('Opinion')}
                      className={`text-[11px] font-medium py-1.5 rounded-lg transition-colors cursor-pointer ${
                        category === 'Opinion'
                          ? 'bg-[#84243b] text-white shadow-xs font-semibold'
                          : 'text-[#541020] hover:text-[#84243b]'
                      }`}
                    >
                      Opinion
                    </button>
                  </div>
                </div>
              </div>

              {/* Text box with required placeholder: "drop your thoughts, question or opinion down below" */}
              <div>
                <label htmlFor="opinion-text" className="block font-cinzel text-xs font-bold text-[#541020] uppercase tracking-wider mb-1">
                  Message <span className="text-[#84243b]">*</span>
                </label>
                <textarea
                  id="opinion-text"
                  required
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="drop your thoughts, question or opinion down below"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c48a86]/60 bg-[#fffaf2] text-xs sm:text-sm text-[#382027] placeholder:text-[#382027]/50 focus:outline-none focus:ring-2 focus:ring-[#84243b]"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#e0bd83] text-[#fff0d4] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #84243b, #451020)',
                  }}
                >
                  <Send className="w-3.5 h-3.5 text-[#ffd9a0]" />
                  <span>Send to Couple</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section displaying the saved comments */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquareHeart className="w-4 h-4 text-[#84243b]" />
                <h3 className="font-cinzel text-sm font-bold tracking-wider text-[#541020] uppercase">
                  Guest Responses ({entries.length})
                </h3>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1 text-[11px] font-sans-clean">
                {(['All', 'Blessing', 'Question', 'Opinion'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                      activeFilter === tab
                        ? 'bg-[#84243b] text-[#fffaf2] font-semibold shadow-xs'
                        : 'text-[#541020] hover:bg-[#84243b]/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* List of comments */}
            <div className="space-y-3.5">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-[#84243b]/70 font-serif-luxury italic text-sm">
                  No {activeFilter.toLowerCase()} entries yet. Be the first to share one!
                </div>
              ) : (
                filteredEntries.map((entry) => {
                  const isLiked = likedIds[entry.id];
                  const CategoryIcon =
                    entry.category === 'Blessing'
                      ? Sparkles
                      : entry.category === 'Question'
                      ? HelpCircle
                      : MessageCircle;

                  return (
                    <div
                      key={entry.id}
                      className="bg-white/90 rounded-xl p-4 border border-[#c48a86]/40 shadow-xs hover:border-[#84243b] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#541020]">
                            {entry.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#84243b]/80 font-sans-clean">
                            <span className="inline-flex items-center gap-1 font-medium text-[#84243b]">
                              <CategoryIcon className="w-3 h-3" />
                              {entry.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{entry.timestamp}</span>
                          </div>
                        </div>

                        {/* Heart reaction button */}
                        <button
                          type="button"
                          onClick={() => handleLike(entry.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans-clean transition-colors cursor-pointer ${
                            isLiked
                              ? 'bg-[#84243b] text-white shadow-xs'
                              : 'bg-[#f7efe5] text-[#84243b] hover:bg-[#84243b]/15'
                          }`}
                          aria-label="Like comment"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                          <span className="text-[11px] font-semibold">{entry.likes}</span>
                        </button>
                      </div>

                      <p className="font-serif-luxury text-sm sm:text-base text-[#382027] leading-relaxed italic">
                        “{entry.text}”
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
