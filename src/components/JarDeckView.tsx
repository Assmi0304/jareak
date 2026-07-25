import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompletedJar, MemoryItem, DiaryEntry } from '../types';
import { Sparkles, Archive, Search, Calendar, BookOpen, Heart, Award, ArrowLeft, Filter, Layers } from 'lucide-react';

interface JarDeckViewProps {
  currentMemories: MemoryItem[];
  currentDiaryEntries: DiaryEntry[];
  currentChapterTitle: string;
  onSelectMemory?: (memory: MemoryItem) => void;
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
      },
      {
        id: 'c-3',
        title: 'Day 1: Hello World Intention',
        content: 'Committing to 100 days of daily effort without distraction.',
        date: '2026-03-07',
        dayNumber: 1,
        color: 'peach',
        paperColor: '#ffedd5',
        reflection: 'The first step is always the most courageous.'
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

export const JarDeckView: React.FC<JarDeckViewProps> = ({
  currentMemories,
  currentDiaryEntries,
  currentChapterTitle
}) => {
  const [selectedJar, setSelectedJar] = useState<CompletedJar | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Combined Active Jar for current chapter
  const activeJarObj: CompletedJar = {
    id: 'active-jar-current',
    title: currentChapterTitle || 'Active Journey',
    category: 'custom',
    completedDate: 'In Progress',
    memoriesCount: currentMemories.length,
    durationDays: currentMemories.length,
    coverColor: '#fef08a',
    reflectionSummary: `Currently collecting paper memories for ${currentChapterTitle}.`,
    memories: currentMemories
  };

  const allJars = [activeJarObj, ...DEFAULT_COMPLETED_JARS];

  const filteredJars = allJars.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.reflectionSummary?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || j.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 font-sans">
      {/* Header Plaque */}
      <div className="mb-8 p-6 rounded-3xl bg-[#fffdfa] border-4 border-[#5d4037] shadow-xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#5d4037] text-amber-200 flex items-center justify-center text-3xl shadow-md border border-amber-300/30">
            📚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#3e2a1e]">
                Jar Deck Shelf
              </h1>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-[#5d4037] text-xs font-serif font-semibold border border-amber-300">
                Museum of Growth
              </span>
            </div>
            <p className="text-xs md:text-sm font-serif italic text-[#8d6e63] mt-1">
              "Every completed chapter is preserved here as a physical memory jar."
            </p>
          </div>
        </div>

        {/* Search & Filter controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#8d6e63] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories or jars..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-xs font-serif text-[#3e2a1e] focus:outline-none focus:ring-1 focus:ring-[#5d4037]"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-xs font-serif text-[#3e2a1e] focus:outline-none focus:ring-1 focus:ring-[#5d4037]"
          >
            <option value="all">All Categories</option>
            <option value="code">Coding</option>
            <option value="fitness">Fitness</option>
            <option value="creative">Creative</option>
            <option value="custom">Active Journey</option>
          </select>
        </div>
      </div>

      {/* Main Library Shelf Visual Layout */}
      <div className="space-y-10">
        {/* Active Journey Section */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50/90 via-[#fffdfa] to-amber-50/90 border-2 border-amber-300 shadow-md relative">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
              <h2 className="font-serif font-semibold text-lg text-[#3e2a1e]">
                Active Sanctuary Jar (In Progress)
              </h2>
            </div>
            <span className="text-xs font-serif text-[#8d6e63]">
              {currentMemories.length} paper slips collected
            </span>
          </div>

          <div
            onClick={() => setSelectedJar(activeJarObj)}
            className="p-5 rounded-2xl bg-[#fffdfa] border border-[#d2b48c] shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 rounded-2xl border-2 border-[#5d4037] bg-amber-100 flex items-center justify-center text-3xl shadow-md relative group-hover:scale-105 transition-transform">
                🫙
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#5d4037] text-white text-[10px] font-mono font-bold">
                  {currentMemories.length}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#3e2a1e]">
                  {currentChapterTitle}
                </h3>
                <p className="text-xs font-serif text-[#8d6e63] mt-0.5">
                  Accumulating daily milestones, intentions, and reflections
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-serif font-semibold border border-emerald-300">
                    Active Room Chapter
                  </span>
                  <span className="text-[11px] font-serif text-[#8d6e63]">
                    {currentDiaryEntries.length} diary journal reflections
                  </span>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 rounded-xl bg-[#5d4037] hover:bg-[#3e2a1e] text-amber-100 text-xs font-serif font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Explore Active Jar</span>
            </button>
          </div>
        </div>

        {/* Shelf of Completed Journeys */}
        <div className="relative p-6 md:p-8 bg-[#fffdfa] rounded-3xl border-4 border-[#5d4037] shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#e9e1d6]">
            <div className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-[#5d4037]" />
              <h2 className="font-serif font-bold text-xl text-[#3e2a1e]">
                Archived Museum Shelves
              </h2>
            </div>
            <span className="text-xs font-serif text-[#8d6e63]">
              {filteredJars.length} jars in shelf collection
            </span>
          </div>

          {/* Grid of Visual Glass Jars on Shelf */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJars.map((jar) => (
              <motion.div
                key={jar.id}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => setSelectedJar(jar)}
                className="p-5 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c] shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-16 rounded-2xl border-2 border-[#5d4037] bg-amber-50 flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform">
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
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Stored Memories</span>
                  </span>
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Physical Wooden Plank Shelf Base */}
          <div className="mt-8 h-5 w-full bg-gradient-to-r from-[#5d4037] via-[#8d6e63] to-[#5d4037] rounded-xl shadow-lg border-t-2 border-amber-300/40" />
        </div>
      </div>

      {/* Selected Jar Inspection Modal overlay */}
      <AnimatePresence>
        {selectedJar && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fffdfa] border-4 border-[#5d4037] rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#e9e1d6] pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🫙</span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#3e2a1e]">
                      {selectedJar.title}
                    </h3>
                    <p className="text-xs font-serif text-[#8d6e63]">
                      {selectedJar.memoriesCount} paper slips collected • {selectedJar.completedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJar(null)}
                  className="px-3 py-1 rounded-xl bg-[#5d4037] text-amber-100 text-xs font-serif hover:bg-[#3e2a1e] cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Outcome Box */}
              <div className="p-4 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c] mb-6">
                <span className="block text-[10px] font-serif uppercase tracking-widest text-[#8d6e63] font-bold mb-1">
                  Journey Outcome
                </span>
                <p className="font-serif text-sm text-[#3e2a1e] italic leading-relaxed">
                  "{selectedJar.reflectionSummary}"
                </p>
              </div>

              {/* Memory Slips List */}
              <div className="space-y-3">
                <h4 className="font-serif font-semibold text-sm text-[#3e2a1e] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#5d4037]" />
                  <span>Stored Paper Memories ({selectedJar.memories.length}):</span>
                </h4>

                {selectedJar.memories.length === 0 ? (
                  <div className="p-6 text-center font-serif italic text-xs text-[#8d6e63]">
                    No memories archived in this jar yet. Continue working in your Room!
                  </div>
                ) : (
                  selectedJar.memories.map((mem) => (
                    <div
                      key={mem.id}
                      onClick={() => setSelectedMemory(mem)}
                      className="p-4 rounded-xl border border-[#d2b48c] bg-[#fffdfa] hover:bg-[#f5f2ed] transition-colors cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-xs font-serif text-[#8d6e63] mb-1">
                        <span className="font-semibold text-[#5d4037]">Day #{mem.dayNumber}</span>
                        <span>{mem.date}</span>
                      </div>
                      <h5 className="font-serif font-semibold text-base text-[#3e2a1e]">
                        {mem.title}
                      </h5>
                      <p className="font-serif text-xs text-[#3e2a1e]/80 italic mt-1">
                        "{mem.content}"
                      </p>
                      {mem.reflection && (
                        <p className="text-[11px] font-serif text-amber-900/80 mt-2 pt-2 border-t border-amber-200/50">
                          <strong>Personal Note:</strong> {mem.reflection}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
