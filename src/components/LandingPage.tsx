import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onStartJourney: () => void;
  onContinueChapter?: () => void;
  hasExistingChapter?: boolean;
  onOpenAuth?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartJourney,
  onContinueChapter,
  hasExistingChapter = false,
  onOpenAuth
}) => {
  return (
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#4A3525] font-sans flex flex-col justify-between overflow-hidden selection:bg-amber-200 selection:text-amber-950">
      {/* Background Soft Sunlight & Warm Vignette */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FDE68A]/30 via-[#F5EFEB]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#EFE6DD]/60 via-[#F5EFEB]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#674D3C] text-[#FAF6F0] flex items-center justify-center font-serif font-bold text-lg shadow-sm">
            J
          </div>
          <span className="font-serif text-xl tracking-wider text-[#4A3525] font-semibold">
            Jareak
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-full border border-[#8C6D53]/30 bg-white/60 hover:bg-white text-xs font-serif font-semibold text-[#674D3C] transition-all shadow-sm hover:shadow cursor-pointer"
            >
              Create Space / Sign In
            </button>
          )}

          {hasExistingChapter && onContinueChapter && (
            <button
              onClick={onContinueChapter}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#8C6D53]/30 bg-white/60 hover:bg-white text-xs font-medium tracking-wide text-[#674D3C] transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Enter My Room</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Hero Visual Area */}
      <main className="relative z-10 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Subtle Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE6DD] border border-[#D8C7B8] text-xs font-serif italic text-[#674D3C] mb-8 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>A visual consistency journal</span>
        </motion.div>

        {/* Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-6xl md:text-8xl tracking-tight text-[#2D1F17] font-normal mb-6"
        >
          Jareak
        </motion.h1>

        {/* Prompt Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-2xl md:text-3xl text-[#674D3C] italic max-w-2xl leading-relaxed mb-4"
        >
          "Progress deserves to be remembered."
        </motion.p>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-[#8C6D53] max-w-xl leading-normal mb-10"
        >
          Turn your daily efforts into memories.
        </motion.p>

        {/* Glass Jar Visual Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative mb-12"
        >
          <div className="relative w-28 h-36 mx-auto rounded-2xl border-2 border-white/80 bg-white/40 backdrop-blur-md shadow-xl flex flex-col justify-end p-2 overflow-hidden group hover:scale-105 transition-transform duration-500">
            <div className="absolute top-2 left-2 w-2 h-28 bg-white/60 rounded-full blur-[0.5px]" />
            <div className="flex flex-wrap justify-center gap-1">
              <span className="w-6 h-4 bg-amber-200 rounded border border-amber-300 shadow-sm transform -rotate-6" />
              <span className="w-7 h-4 bg-orange-200 rounded border border-orange-300 shadow-sm transform rotate-12" />
              <span className="w-6 h-4 bg-emerald-200 rounded border border-emerald-300 shadow-sm transform -rotate-3" />
            </div>
            <div className="mt-2 py-0.5 bg-[#FAF6F0]/90 border border-[#EFE6DD] rounded text-[8px] font-serif uppercase tracking-widest text-[#674D3C]">
              Jar of Effort
            </div>
          </div>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onStartJourney}
            className="group relative px-8 py-4 rounded-full bg-[#674D3C] hover:bg-[#4A3525] text-[#FAF6F0] font-medium text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">Begin Your Journey</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </main>

      {/* Footer Minimal Message */}
      <footer className="relative z-10 max-w-4xl w-full mx-auto px-6 py-8 border-t border-[#EFE6DD] text-center text-xs text-[#8C6D53]/80 font-serif">
        <p>No hustle pressure • No checklists • A quiet space for self-becoming</p>
      </footer>
    </div>
  );
};
