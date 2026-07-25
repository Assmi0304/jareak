import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem, Chapter } from '../types';
import { Sparkles, X, Plus, Search, Calendar, Heart, Share2 } from 'lucide-react';

interface JarProps {
  memories: MemoryItem[];
  chapter: Chapter;
  onAddMemory: (memory: Omit<MemoryItem, 'id'>) => void;
  isCelebrating?: boolean;
}

export const Jar: React.FC<JarProps> = ({ memories, chapter, onAddMemory, isCelebrating = false }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingDirect, setIsAddingDirect] = useState(false);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newReflection, setNewReflection] = useState('');

  const fillPercentage = Math.min(100, Math.round((memories.length / Math.max(1, chapter.durationDays)) * 100));

  const filteredMemories = memories.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.reflection && m.reflection.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newMem: Omit<MemoryItem, 'id'> = {
      title: newTitle.trim() || `Day ${memories.length + 1} Memory`,
      content: newContent.trim(),
      date: new Date().toISOString().split('T')[0],
      dayNumber: memories.length + 1,
      color: 'yellow',
      reflection: newReflection.trim() || undefined,
      paperColor: '#FEF08A'
    };

    onAddMemory(newMem);
    setNewTitle('');
    setNewContent('');
    setNewReflection('');
    setIsAddingDirect(false);
  };

  return (
    <>
      {/* Physical Glass Jar Component on Desk */}
      <motion.div
        animate={
          isCelebrating
            ? {
                rotate: [0, -6, 6, -4, 4, 0],
                scale: [1, 1.08, 1],
                filter: [
                  'drop-shadow(0 0 0px rgba(251, 191, 36, 0))',
                  'drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))',
                  'drop-shadow(0 0 0px rgba(251, 191, 36, 0))'
                ]
              }
            : {}
        }
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpenModal(true)}
        className="relative group cursor-pointer flex flex-col items-center select-none"
      >
        {/* Celebration Banner when Airplane lands */}
        {isCelebrating && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-12 px-3 py-1 bg-[#5d4037] text-amber-100 text-xs font-serif rounded-full shadow-lg border border-amber-300/60 flex items-center gap-1.5 z-40 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span className="font-semibold">Another memory saved ✨</span>
          </motion.div>
        )}

        {/* Hover Sparkle Badge */}
        {!isCelebrating && (
          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1 bg-[#5d4037] text-amber-100 text-xs font-serif rounded-full shadow-lg border border-amber-300/30 flex items-center gap-1.5 z-30">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
            <span>Click to Unfold Jar ({memories.length})</span>
          </div>
        )}

        {/* 3D Glass Jar Body */}
        <div className="relative w-36 h-48 md:w-44 md:h-56 rounded-3xl border-2 border-white/80 bg-gradient-to-b from-white/30 via-white/10 to-white/5 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col justify-end p-2.5 overflow-hidden border-t-white/90">
          {/* Wooden Cork Stopper with Lid Open/Close Animation */}
          <motion.div
            animate={
              isCelebrating
                ? {
                    y: [-2, -22, -22, 0],
                    rotate: [0, -18, -15, 0],
                    scale: [1, 1.06, 1.06, 1]
                  }
                : { y: 0, rotate: 0, scale: 1 }
            }
            transition={{
              duration: 1.4,
              times: [0, 0.35, 0.7, 1],
              ease: 'easeInOut'
            }}
            className="absolute -top-3.5 inset-x-5 h-6 bg-[#7A5230] border-b-2 border-[#4D321A] rounded-t-lg shadow-md flex items-center justify-center z-20 origin-bottom-right"
          >
            <div className="w-10 h-1 bg-[#A06D4B] rounded-full" />
            {/* Wooden Grain Detail */}
            <div className="absolute top-1 left-2 w-2 h-0.5 bg-[#4D321A]/40 rounded" />
            <div className="absolute top-2 right-3 w-3 h-0.5 bg-[#4D321A]/40 rounded" />
          </motion.div>

          {/* Animated Falling Paper Slip into Jar when storing memory */}
          <AnimatePresence>
            {isCelebrating && (
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.5, rotate: -20 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [-30, -5, 25, 45],
                  rotate: [-20, 15, -10, 5],
                  scale: [0.6, 1, 0.9, 0.7]
                }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                className="absolute inset-x-0 top-6 mx-auto w-8 h-6 bg-amber-200 border border-amber-400 rounded-sm shadow-md z-10 flex items-center justify-center text-[8px] font-mono font-bold text-amber-950 pointer-events-none"
              >
                ✨
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glass Specular Highlights */}
          <div className="absolute top-4 left-3 w-2.5 h-40 bg-gradient-to-b from-white/60 via-white/20 to-transparent rounded-full blur-[0.5px]" />
          <div className="absolute top-4 right-3 w-1.5 h-40 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full blur-[0.5px]" />

          {/* Paper Slips Layer Inside Jar */}
          <div className="relative w-full h-36 flex flex-wrap items-end justify-center gap-1 p-1 border-t border-white/10 overflow-hidden">
            {memories.slice(0, 16).map((mem, idx) => (
              <motion.div
                key={mem.id || idx}
                initial={{ scale: 0.6, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-7 h-5 rounded-sm shadow-sm border border-black/10 flex items-center justify-center text-[7px] font-mono font-bold text-amber-950 transform"
                style={{
                  backgroundColor: mem.paperColor || '#FEF08A',
                  transform: `rotate(${((idx * 37) % 30) - 15}deg)`
                }}
              >
                #{mem.dayNumber}
              </motion.div>
            ))}

            {/* Warm Inner Glow */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-amber-400/20 via-orange-300/10 to-transparent blur-md pointer-events-none" />
          </div>

          {/* Jar Leather Tag */}
          <div className="absolute top-14 inset-x-4 py-1 bg-[#FAF6F0]/90 border border-[#D8C7B8] rounded shadow-sm text-center">
            <span className="text-[9px] font-serif tracking-widest uppercase text-[#5C4033] font-bold block">
              JAR OF EFFORT
            </span>
            <span className="text-[8px] font-mono text-[#8C6D53]">
              {memories.length} / {chapter.durationDays} Memories
            </span>
          </div>
        </div>

        {/* Shadow on Desk Surface */}
        <div className="w-32 h-3 mt-1 bg-black/20 rounded-full blur-sm" />
      </motion.div>

      {/* Unfold Memories Modal */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FAF6F0] border border-[#EFE6DD] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 bg-[#FAF6F0] border-b border-[#EFE6DD] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-semibold text-2xl text-[#2D1F17]">
                      Jar of Paper Memories
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-medium">
                      {memories.length} Saved
                    </span>
                  </div>
                  <p className="text-xs text-[#8C6D53] font-serif mt-0.5">
                    "{chapter.title}" • {fillPercentage}% filled
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddingDirect(true)}
                    className="px-3.5 py-1.5 rounded-full bg-[#674D3C] hover:bg-[#4A3525] text-white text-xs font-serif flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Memory</span>
                  </button>
                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="p-1.5 rounded-full hover:bg-black/10 text-[#674D3C] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Search Bar */}
                <div className="mb-6 relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#A8988B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search memories by keyword..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EFE6DD] text-sm font-serif text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#8C6D53]/30"
                  />
                </div>

                {/* Direct Memory Addition Form */}
                {isAddingDirect && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleCreateMemorySubmit}
                    className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-semibold text-amber-950">
                        Drop a New Paper Memory into Jar
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingDirect(false)}
                        className="text-xs text-amber-900 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>

                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title or Milestone (e.g. Completed Chapter 1)"
                      className="w-full p-2.5 rounded-lg bg-white border border-amber-200 text-xs font-serif focus:outline-none"
                    />

                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={3}
                      placeholder="What daily effort did you accomplish?"
                      className="w-full p-2.5 rounded-lg bg-white border border-amber-200 text-xs font-serif focus:outline-none resize-none"
                      required
                    />

                    <input
                      type="text"
                      value={newReflection}
                      onChange={(e) => setNewReflection(e.target.value)}
                      placeholder="Optional reflection or feeling..."
                      className="w-full p-2.5 rounded-lg bg-white border border-amber-200 text-xs font-serif italic focus:outline-none"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-[#674D3C] text-white text-xs font-serif font-medium cursor-pointer"
                      >
                        Drop into Jar
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Grid of Folded Paper Memories */}
                {filteredMemories.length === 0 ? (
                  <div className="py-12 text-center text-[#8C6D53] font-serif">
                    <p className="text-sm">No paper memories found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredMemories.map((mem) => (
                      <motion.div
                        key={mem.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedMemory(mem)}
                        className="p-4 rounded-xl border border-[#D8C7B8] bg-white shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                        style={{ backgroundColor: mem.paperColor || '#FEF08A' }}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#674D3C] mb-2 border-b border-black/10 pb-1">
                            <span>Day #{mem.dayNumber}</span>
                            <span>{mem.date}</span>
                          </div>
                          <h4 className="font-serif font-semibold text-sm text-[#2D1F17] mb-1 line-clamp-1">
                            {mem.title}
                          </h4>
                          <p className="font-serif text-xs text-[#3D2C23] line-clamp-3 italic opacity-90">
                            "{mem.content}"
                          </p>
                        </div>

                        <div className="mt-3 pt-2 flex items-center justify-between text-[10px] font-serif text-[#8C6D53]">
                          <span>Click to unfold →</span>
                          <Sparkles className="w-3 h-3 text-amber-700" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unfolded Paper Memory View Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.5, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.5, rotateX: 90 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="bg-[#FAF6F0] border-2 border-[#D8C7B8] rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            >
              {/* Paper Fold Lines Styling */}
              <div className="absolute inset-0 border border-dashed border-amber-800/10 rounded-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 border-b border-[#EFE6DD] pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#674D3C] text-amber-100 text-xs font-mono font-bold">
                    Day #{selectedMemory.dayNumber}
                  </span>
                  <span className="text-xs font-serif text-[#8C6D53]">
                    {selectedMemory.date}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="p-1 rounded hover:bg-black/10 text-[#674D3C] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#2D1F17] mb-3">
                {selectedMemory.title}
              </h3>

              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 mb-4">
                <p className="font-serif text-base text-[#3D2C23] leading-relaxed whitespace-pre-wrap">
                  "{selectedMemory.content}"
                </p>
              </div>

              {selectedMemory.reflection && (
                <div className="mb-6">
                  <h4 className="text-xs font-serif uppercase tracking-wider text-[#8C6D53] font-semibold mb-1">
                    Personal Reflection
                  </h4>
                  <p className="font-serif text-sm text-[#674D3C] italic">
                    {selectedMemory.reflection}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#EFE6DD]">
                <div className="flex items-center gap-1.5 text-xs text-[#8C6D53] font-serif">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>Saved in Jareak Jar</span>
                </div>

                <button
                  onClick={() => setSelectedMemory(null)}
                  className="px-4 py-2 rounded-xl bg-[#674D3C] text-white text-xs font-serif cursor-pointer"
                >
                  Close Memory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
