import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompletedJar, MemoryItem } from '../types';
import { Sparkles, X, BookOpen, Calendar, Archive, Search, Heart, Award } from 'lucide-react';

interface JarDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMemoriesCount: number;
}

const DEFAULT_COMPLETED_JARS: CompletedJar[] = [
  {
    id: 'jar-100-days-code',
    title: '100 Days of Coding',
    category: 'code',
    completedDate: '2026-06-15',
    memoriesCount: 100,
    durationDays: 100,
    coverColor: '#fff9c4',
    reflectionSummary: 'Built 12 clean projects, mastered React hooks & state design with calm focus.',
    memories: [
      {
        id: 'c-1',
        title: 'Day 100: Final Milestone',
        content: 'Deployed my full-stack app with zero errors and deep personal gratitude.',
        date: '2026-06-15',
        dayNumber: 100,
        color: 'yellow',
        paperColor: '#fff9c4',
        reflection: 'Consistency beat motivation every single day.'
      },
      {
        id: 'c-2',
        title: 'Day 50: Halfway Reflection',
        content: 'Understood complex async workflows and custom hooks.',
        date: '2026-04-26',
        dayNumber: 50,
        color: 'sage',
        paperColor: '#e8f5e9',
        reflection: 'Break big problems into small, readable functions.'
      }
    ]
  },
  {
    id: 'jar-fitness-mindfulness',
    title: 'Fitness & Daily Movement',
    category: 'fitness',
    completedDate: '2026-05-01',
    memoriesCount: 30,
    durationDays: 30,
    coverColor: '#e8f5e9',
    reflectionSummary: 'Daily 30-minute walks and stretching. Mind felt noticeably clearer.',
    memories: [
      {
        id: 'f-1',
        title: 'Day 30: 100km Total Distance',
        content: 'Finished 30 days of continuous morning movement.',
        date: '2026-05-01',
        dayNumber: 30,
        color: 'sage',
        paperColor: '#e8f5e9',
        reflection: 'Walking in nature restored my creative energy.'
      }
    ]
  },
  {
    id: 'jar-creative-writing',
    title: 'Morning Pages & Creative Notes',
    category: 'creative',
    completedDate: '2026-03-20',
    memoriesCount: 21,
    durationDays: 21,
    coverColor: '#fce4ec',
    reflectionSummary: '21 days of unedited morning thoughts before opening email or news.',
    memories: [
      {
        id: 'cw-1',
        title: 'Day 21: Habit Formed',
        content: 'Writing freely unlocked ideas I never knew I had.',
        date: '2026-03-20',
        dayNumber: 21,
        color: 'peach',
        paperColor: '#fce4ec',
        reflection: 'Words flow best when you stop judging them.'
      }
    ]
  }
];

export const JarDeckModal: React.FC<JarDeckModalProps> = ({
  isOpen,
  onClose,
  currentMemoriesCount
}) => {
  const [selectedJar, setSelectedJar] = useState<CompletedJar | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#fffdfa] border-4 border-[#5d4037] rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-[#5d4037] text-[#fffdfa] flex items-center justify-between border-b border-[#3e2a1e]">
              <div className="flex items-center gap-2.5">
                <Archive className="w-5 h-5 text-amber-300" />
                <div>
                  <h2 className="font-serif font-semibold text-xl">
                    Jar Deck & Memory Shelf
                  </h2>
                  <p className="text-xs text-amber-200/80 font-serif">
                    A shelf containing your completed journeys and archived efforts
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-amber-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shelf Content Area */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#f5f2ed] space-y-8">
              {/* Wooden Shelf Display */}
              <div className="relative p-6 bg-gradient-to-b from-[#fffdfa] to-[#f5f2ed] rounded-2xl border border-[#d2b48c] shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-[#e9e1d6] pb-2">
                  <span className="font-serif font-semibold text-sm text-[#3e2a1e] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#5d4037]" />
                    <span>Completed Journeys ({DEFAULT_COMPLETED_JARS.length})</span>
                  </span>
                  <span className="text-xs font-serif text-[#8d6e63]">
                    Active Jar: {currentMemoriesCount} memories inside
                  </span>
                </div>

                {/* Grid of Shelf Jars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DEFAULT_COMPLETED_JARS.map((jar) => (
                    <motion.div
                      key={jar.id}
                      whileHover={{ scale: 1.03, y: -4 }}
                      onClick={() => setSelectedJar(jar)}
                      className="p-5 rounded-2xl bg-[#fffdfa] border border-[#d2b48c] shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      {/* Jar Icon Representation */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-16 rounded-2xl border-2 border-[#5d4037] bg-amber-50/80 flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-2xl">🫙</span>
                          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#5d4037] text-white text-[9px] font-mono font-bold">
                            {jar.memoriesCount}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif font-semibold text-base text-[#3e2a1e]">
                            {jar.title}
                          </h3>
                          <span className="text-[11px] font-serif text-[#8d6e63]">
                            Completed {jar.completedDate}
                          </span>
                        </div>
                      </div>

                      <p className="font-serif text-xs text-[#3e2a1e]/80 italic line-clamp-2 mb-4">
                        "{jar.reflectionSummary}"
                      </p>

                      <div className="pt-2 border-t border-[#e9e1d6] flex items-center justify-between text-xs font-serif text-[#5d4037]">
                        <span className="flex items-center gap-1 font-medium">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Inspect Jar Memories</span>
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Wooden Plank Base */}
                <div className="mt-6 h-4 w-full bg-gradient-to-r from-[#5d4037] via-[#8d6e63] to-[#5d4037] rounded-lg shadow-md border-t border-amber-300/30" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Selected Shelf Jar Inspection Modal */}
      <AnimatePresence>
        {selectedJar && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fffdfa] border-2 border-[#5d4037] rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#e9e1d6] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🫙</span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#3e2a1e]">
                      {selectedJar.title}
                    </h3>
                    <p className="text-xs font-serif text-[#8d6e63]">
                      {selectedJar.memoriesCount} memories collected • Completed {selectedJar.completedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJar(null)}
                  className="p-1 rounded hover:bg-black/10 text-[#5d4037] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reflection Summary Box */}
              <div className="p-4 rounded-xl bg-[#f5f2ed] border border-[#d2b48c] mb-5">
                <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-1">
                  Journey Outcome
                </span>
                <p className="font-serif text-sm text-[#3e2a1e] italic leading-relaxed">
                  "{selectedJar.reflectionSummary}"
                </p>
              </div>

              {/* List of Archived Memory Slips */}
              <div className="space-y-3">
                <h4 className="font-serif font-semibold text-sm text-[#3e2a1e]">
                  Archived Memories & Reflections:
                </h4>
                {selectedJar.memories.map((mem) => (
                  <div
                    key={mem.id}
                    onClick={() => setSelectedMemory(mem)}
                    className="p-4 rounded-xl border border-[#d2b48c] bg-[#fffdfa] hover:bg-[#f5f2ed] transition-colors cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs font-serif text-[#8d6e63] mb-1">
                      <span>Day #{mem.dayNumber}</span>
                      <span>{mem.date}</span>
                    </div>
                    <h5 className="font-serif font-semibold text-base text-[#3e2a1e]">
                      {mem.title}
                    </h5>
                    <p className="font-serif text-xs text-[#3e2a1e]/80 italic mt-1">
                      "{mem.content}"
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#e9e1d6] flex justify-end">
                <button
                  onClick={() => setSelectedJar(null)}
                  className="px-5 py-2 rounded-xl bg-[#5d4037] text-white text-xs font-serif cursor-pointer hover:bg-[#3e2a1e]"
                >
                  Close Shelf Jar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
