import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DiaryEntry, Chapter, JournalMood } from '../types';
import { Book, X, Plus, ChevronLeft, ChevronRight, Feather, Calendar, Sparkles, Heart } from 'lucide-react';

interface DiaryProps {
  entries: DiaryEntry[];
  chapter: Chapter;
  onAddEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
}

const MOOD_OPTIONS: { key: JournalMood; label: string; icon: string; bg: string; text: string }[] = [
  { key: 'growing', label: 'Growing', icon: '🌱', bg: 'bg-emerald-100/80', text: 'text-emerald-900' },
  { key: 'difficult', label: 'Difficult', icon: '☁', bg: 'bg-slate-200/80', text: 'text-slate-800' },
  { key: 'proud', label: 'Proud', icon: '✨', bg: 'bg-amber-100/80', text: 'text-amber-900' },
  { key: 'slow_okay', label: 'Slow but okay', icon: '🌙', bg: 'bg-purple-100/80', text: 'text-purple-900' }
];

export const Diary: React.FC<DiaryProps> = ({ entries, chapter, onAddEntry }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Entry Structured Fields
  const [newTitle, setNewTitle] = useState('');
  const [newWhatWorkedOn, setNewWhatWorkedOn] = useState('');
  const [newWhatToRemember, setNewWhatToRemember] = useState('');
  const [newHowFelt, setNewHowFelt] = useState('');
  const [newMood, setNewMood] = useState<JournalMood>('growing');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhatWorkedOn.trim() && !newHowFelt.trim()) return;

    const moodObj = MOOD_OPTIONS.find((m) => m.key === newMood) || MOOD_OPTIONS[0];

    const fullReflection = [
      newWhatWorkedOn.trim() ? `• Work: ${newWhatWorkedOn.trim()}` : '',
      newWhatToRemember.trim() ? `• To Remember: ${newWhatToRemember.trim()}` : '',
      newHowFelt.trim() ? `• Reflection: ${newHowFelt.trim()}` : ''
    ].filter(Boolean).join('\n\n');

    const newEntry: Omit<DiaryEntry, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      dayNumber: entries.length + 1,
      title: newTitle.trim() || `Day ${entries.length + 1}: Memory Page`,
      reflectionText: fullReflection,
      whatWorkedOn: newWhatWorkedOn.trim(),
      whatToRemember: newWhatToRemember.trim(),
      howFelt: newHowFelt.trim(),
      mood: newMood
    };

    onAddEntry(newEntry);
    setNewTitle('');
    setNewWhatWorkedOn('');
    setNewWhatToRemember('');
    setNewHowFelt('');
    setIsAddingNew(false);
    setCurrentPageIndex(entries.length); // Jump to newly written page
  };

  const activeEntry = entries[currentPageIndex] || null;

  return (
    <>
      {/* Physical Closed Diary on Desk */}
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpenModal(true)}
        className="relative group cursor-pointer flex flex-col items-center select-none"
      >
        {/* Hover Badge */}
        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1 bg-[#5d4037] text-[#fffdfa] text-xs font-serif rounded-full shadow-lg border border-[#d2b48c]/40 flex items-center gap-1.5 z-30">
          <Feather className="w-3 h-3 text-amber-300" />
          <span>Open Memory Journal ({entries.length} Pages)</span>
        </div>

        {/* Closed Leather Book */}
        <div className="relative w-36 h-48 md:w-44 md:h-56 rounded-r-2xl rounded-l-md bg-gradient-to-r from-[#3e2a1e] via-[#5d4037] to-[#3e2a1e] border-2 border-[#2a1b12] shadow-[10px_15px_30px_rgba(0,0,0,0.35)] flex flex-col justify-between p-4 overflow-hidden">
          {/* Book Spine Bevel Left */}
          <div className="absolute top-0 bottom-0 left-0 w-3 bg-black/40 border-r border-amber-500/20" />

          {/* Golden Ribbon Bookmark */}
          <div className="absolute top-0 right-8 w-3 h-20 bg-amber-600 shadow-md transform rounded-b-sm" />

          {/* Gold Foil Embossed Cover Header */}
          <div className="relative z-10 pt-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full border border-amber-200/60 flex items-center justify-center text-amber-200 font-serif font-bold text-sm">
              J
            </div>
            <h3 className="font-serif text-sm md:text-base font-semibold tracking-wider text-amber-100 uppercase drop-shadow">
              JAREAK
            </h3>
            <p className="text-[9px] font-serif italic text-amber-300/80 mt-0.5">
              Memory Journal
            </p>
          </div>

          {/* Book Bottom Pages Ridge */}
          <div className="relative z-10 py-1.5 px-2 bg-[#fffdfa]/10 border border-amber-200/20 rounded text-center backdrop-blur-sm">
            <span className="text-[9px] font-serif text-amber-200/90">
              {entries.length} Memory Entries
            </span>
          </div>
        </div>

        {/* Desk Shadow */}
        <div className="w-36 h-3 mt-1 bg-black/25 rounded-full blur-sm" />
      </motion.div>

      {/* Interactive Journal Flip Modal */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-[#fffdfa] border-4 border-[#5d4037] rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden relative"
            >
              {/* Journal Modal Top Bar */}
              <div className="p-4 bg-[#5d4037] text-[#fffdfa] flex items-center justify-between border-b border-[#3e2a1e]">
                <div className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-amber-300" />
                  <span className="font-serif font-semibold text-lg">
                    {chapter.title} — Memory System
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="px-3.5 py-1.5 rounded-full bg-amber-100 text-[#3e2a1e] text-xs font-serif font-semibold flex items-center gap-1 hover:bg-amber-200 cursor-pointer shadow transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Write Today's Page</span>
                  </button>
                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-[#fffdfa] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Open Book Spread View */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#f5f2ed] relative">
                {/* Book Center Binding Line */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -ml-px w-0.5 bg-gradient-to-b from-black/20 via-black/10 to-transparent z-10" />

                {isAddingNew ? (
                  /* Write New Page Form with 3 Questions & Mood Selector */
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleCreateSubmit}
                    className="max-w-2xl mx-auto bg-[#fffdfa] p-6 md:p-8 rounded-2xl border border-[#d2b48c] shadow-md space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-[#e9e1d6] pb-3">
                      <h3 className="font-serif font-semibold text-xl text-[#3e2a1e] flex items-center gap-2">
                        <Feather className="w-5 h-5 text-[#5d4037]" />
                        <span>Today's Emotional Memory</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="text-xs text-[#8d6e63] hover:underline font-serif"
                      >
                        Cancel
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] mb-1 font-semibold">
                        Memory Title
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. A Quiet Step Forward"
                        className="w-full p-2.5 rounded-xl bg-[#f5f2ed] border border-[#e9e1d6] text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#5d4037]"
                      />
                    </div>

                    {/* Question 1 */}
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] mb-1 font-semibold">
                        1. What did you work on?
                      </label>
                      <textarea
                        value={newWhatWorkedOn}
                        onChange={(e) => setNewWhatWorkedOn(e.target.value)}
                        rows={2}
                        placeholder="e.g. Built state persistence and clean UI transitions..."
                        className="w-full p-3 rounded-xl bg-[#f5f2ed] border border-[#e9e1d6] text-sm font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5d4037] resize-none"
                      />
                    </div>

                    {/* Question 2 */}
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] mb-1 font-semibold">
                        2. What do you want to remember?
                      </label>
                      <textarea
                        value={newWhatToRemember}
                        onChange={(e) => setNewWhatToRemember(e.target.value)}
                        rows={2}
                        placeholder="e.g. Taking breaks helps solve complex bugs faster..."
                        className="w-full p-3 rounded-xl bg-[#f5f2ed] border border-[#e9e1d6] text-sm font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5d4037] resize-none"
                      />
                    </div>

                    {/* Question 3 */}
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] mb-1 font-semibold">
                        3. How did today feel?
                      </label>
                      <textarea
                        value={newHowFelt}
                        onChange={(e) => setNewHowFelt(e.target.value)}
                        rows={2}
                        placeholder="e.g. Calm, focused, and steady..."
                        className="w-full p-3 rounded-xl bg-[#f5f2ed] border border-[#e9e1d6] text-sm font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5d4037] resize-none"
                      />
                    </div>

                    {/* Mood Selector */}
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] mb-2 font-semibold">
                        Mood
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {MOOD_OPTIONS.map((m) => (
                          <button
                            type="button"
                            key={m.key}
                            onClick={() => setNewMood(m.key)}
                            className={`p-2.5 rounded-xl border text-xs font-serif flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                              newMood === m.key
                                ? `${m.bg} ${m.text} border-[#5d4037] shadow-sm font-semibold scale-102`
                                : 'bg-[#f5f2ed] text-[#8d6e63] border-[#e9e1d6] hover:bg-white'
                            }`}
                          >
                            <span>{m.icon}</span>
                            <span>{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-[#e9e1d6]">
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="px-4 py-2 rounded-xl border border-[#e9e1d6] text-xs font-serif text-[#5d4037] hover:bg-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#5d4037] text-[#fffdfa] text-xs font-serif font-medium shadow-md hover:bg-[#3e2a1e] cursor-pointer transition-colors"
                      >
                        Save Memory Page
                      </button>
                    </div>
                  </motion.form>
                ) : entries.length === 0 ? (
                  <div className="py-20 text-center text-[#8d6e63] font-serif">
                    <Book className="w-10 h-10 mx-auto mb-3 opacity-60 text-[#5d4037]" />
                    <p className="text-lg font-medium">Your journal is waiting for its first page.</p>
                    <button
                      onClick={() => setIsAddingNew(true)}
                      className="mt-4 px-6 py-2.5 rounded-full bg-[#5d4037] text-amber-100 text-xs font-serif shadow hover:bg-[#3e2a1e] cursor-pointer transition-colors"
                    >
                      Write First Memory Page
                    </button>
                  </div>
                ) : (
                  /* Open Book Two Pages Spread */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Page: Chapter Intention & Timeline Navigation */}
                    <div className="p-6 bg-[#fffdfa] rounded-2xl border border-[#d2b48c]/60 shadow-sm min-h-[420px] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-serif text-[#8d6e63] border-b border-[#e9e1d6] pb-2 mb-4">
                          <span>CHAPTER OVERVIEW</span>
                          <span>Day {activeEntry ? activeEntry.dayNumber : 1} of {chapter.durationDays}</span>
                        </div>

                        <h3 className="font-serif text-2xl font-semibold text-[#3e2a1e] mb-2">
                          {chapter.title}
                        </h3>

                        <div className="p-3.5 bg-[#f5f2ed] rounded-xl border border-[#e9e1d6] mb-4">
                          <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-1">
                            Chapter Intention
                          </span>
                          <p className="font-serif text-xs text-[#3e2a1e] italic">
                            "{chapter.intention}"
                          </p>
                        </div>

                        {/* Page Timeline list */}
                        <div className="mt-4">
                          <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-2">
                            Memory Timeline
                          </span>
                          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                            {entries.map((entry, idx) => {
                              const moodObj = MOOD_OPTIONS.find((m) => m.key === entry.mood);
                              return (
                                <button
                                  key={entry.id || idx}
                                  onClick={() => setCurrentPageIndex(idx)}
                                  className={`w-full p-2 rounded-lg text-left text-xs font-serif flex items-center justify-between transition-colors cursor-pointer ${
                                    idx === currentPageIndex
                                      ? 'bg-[#5d4037] text-white font-medium'
                                      : 'bg-[#f5f2ed] text-[#3e2a1e] hover:bg-[#e9e1d6]'
                                  }`}
                                >
                                  <span className="truncate pr-2">
                                    Day #{entry.dayNumber}: {entry.title}
                                  </span>
                                  <span className="text-[10px] shrink-0 font-mono opacity-80">
                                    {moodObj ? moodObj.icon : '✨'} {entry.date}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#e9e1d6] flex items-center justify-between text-xs font-serif text-[#8d6e63]">
                        <span>Page {currentPageIndex + 1} of {entries.length}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                            disabled={currentPageIndex === 0}
                            className="p-1.5 rounded border border-[#e9e1d6] hover:bg-[#f5f2ed] disabled:opacity-30 cursor-pointer"
                            title="Previous Page"
                          >
                            <ChevronLeft className="w-4 h-4 text-[#3e2a1e]" />
                          </button>
                          <button
                            onClick={() => setCurrentPageIndex((prev) => Math.min(entries.length - 1, prev + 1))}
                            disabled={currentPageIndex === entries.length - 1}
                            className="p-1.5 rounded border border-[#e9e1d6] hover:bg-[#f5f2ed] disabled:opacity-30 cursor-pointer"
                            title="Next Page"
                          >
                            <ChevronRight className="w-4 h-4 text-[#3e2a1e]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Page: Selected Journal Memory Entry */}
                    {activeEntry && (
                      <div className="p-6 bg-[#fffdfa] rounded-2xl border border-[#d2b48c]/60 shadow-sm min-h-[420px] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs font-serif text-[#8d6e63] border-b border-[#e9e1d6] pb-2 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#5d4037]" />
                              {activeEntry.date}
                            </span>
                            {(() => {
                              const moodObj = MOOD_OPTIONS.find((m) => m.key === activeEntry.mood);
                              return (
                                <span className={`font-serif text-[11px] px-2.5 py-0.5 rounded-full ${moodObj ? moodObj.bg + ' ' + moodObj.text : 'bg-amber-100 text-amber-900'}`}>
                                  {moodObj ? `${moodObj.icon} ${moodObj.label}` : '✨ Reflective'}
                                </span>
                              );
                            })()}
                          </div>

                          <h4 className="font-serif text-2xl font-semibold text-[#3e2a1e] mb-3">
                            {activeEntry.title}
                          </h4>

                          {/* Render structured questions if available */}
                          {activeEntry.whatWorkedOn && (
                            <div className="mb-3">
                              <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-0.5">
                                What I Worked On
                              </span>
                              <p className="font-serif text-sm text-[#3e2a1e] leading-relaxed">
                                {activeEntry.whatWorkedOn}
                              </p>
                            </div>
                          )}

                          {activeEntry.whatToRemember && (
                            <div className="mb-3">
                              <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-0.5">
                                What To Remember
                              </span>
                              <p className="font-serif text-sm text-[#3e2a1e] italic leading-relaxed bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">
                                "{activeEntry.whatToRemember}"
                              </p>
                            </div>
                          )}

                          {activeEntry.howFelt && (
                            <div className="mb-3">
                              <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-0.5">
                                How Today Felt
                              </span>
                              <p className="font-serif text-sm text-[#3e2a1e] leading-relaxed">
                                {activeEntry.howFelt}
                              </p>
                            </div>
                          )}

                          {!activeEntry.whatWorkedOn && !activeEntry.whatToRemember && !activeEntry.howFelt && (
                            <p className="font-serif text-sm text-[#3e2a1e] leading-relaxed whitespace-pre-wrap mb-4 italic">
                              "{activeEntry.reflectionText}"
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t border-[#e9e1d6] flex items-center justify-between text-xs font-serif text-[#8d6e63]">
                          <span className="italic">"Progress deserves to be remembered."</span>
                          <span className="text-[10px] font-mono">Page #{activeEntry.dayNumber}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

