import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Chapter, StickyNoteItem, MemoryItem } from '../types';
import { Sparkles, RefreshCw, Feather, Quote } from 'lucide-react';

interface AIThoughtCardProps {
  chapter: Chapter;
  notes: StickyNoteItem[];
  memories: MemoryItem[];
}

export const AIThoughtCard: React.FC<AIThoughtCardProps> = ({ chapter, notes, memories }) => {
  const [thought, setThought] = useState<string>(
    "Even on quiet days, the gentle rhythm of your effort leaves an unmistakable glow inside the jar."
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchThought = async () => {
    setIsLoading(true);
    try {
      const recentNotes = notes.slice(-3).map((n) => n.content);
      const res = await fetch('/api/gemini/thought', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterTitle: chapter.title,
          intention: chapter.intention,
          totalMemories: memories.length,
          recentNotes
        })
      });

      const data = await res.json();
      if (data && data.thought) {
        setThought(data.thought);
      }
    } catch (err) {
      setThought("Even on quiet days, the gentle rhythm of your effort leaves an unmistakable glow inside the jar.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThought();
  }, [chapter.id, memories.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-xl mx-auto p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#EFE6DD] shadow-lg text-[#4A3525] font-sans selection:bg-amber-200"
    >
      {/* Small Desk Card Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-100 text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <span className="text-xs font-serif uppercase tracking-widest text-[#674D3C] font-semibold">
            Companion Thought
          </span>
        </div>

        <button
          onClick={fetchThought}
          disabled={isLoading}
          className="p-1.5 rounded-full hover:bg-[#EFE6DD]/60 text-[#8C6D53] transition-colors cursor-pointer disabled:opacity-50"
          title="Refresh reflection"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Thought Content */}
      <div className="relative pl-3 border-l-2 border-[#8C6D53]">
        <p className="font-serif text-sm md:text-base text-[#2D1F17] italic leading-relaxed">
          "{thought}"
        </p>
      </div>

      {/* Footer Tag */}
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#8C6D53] border-t border-[#EFE6DD]/80 pt-1.5">
        <span>Chapter: {chapter.title}</span>
        <span>Jareak Reflection</span>
      </div>
    </motion.div>
  );
};
