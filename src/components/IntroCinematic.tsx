import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroCinematicProps {
  onComplete: () => void;
}

export const IntroCinematic: React.FC<IntroCinematicProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0s: Room appears
    // 1s: Folder opens, cursor glides
    // 2s: Sticky notes rise
    // 3.5s: Notes fold & enter jar
    // 5s: Complete!
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2000);
    const timer3 = setTimeout(() => setStep(3), 3400);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#281D18] text-[#F5EFEB] flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      {/* Background Room Atmosphere with Soft Morning Light Rays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D2C23] via-[#2A1D17] to-[#1F1410] opacity-95" />

      {/* Sunlight Ray Beam effect from top left */}
      <div className="absolute top-0 left-10 w-[600px] h-[800px] bg-gradient-to-br from-[#FFF4E0]/20 via-[#FDE68A]/5 to-transparent blur-3xl transform -rotate-45 pointer-events-none" />

      {/* Wooden Desk Surface at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#180E0A] to-[#2E1E17] border-t border-[#4A3525]/40 shadow-2xl" />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 text-xs tracking-widest uppercase text-amber-200/80 transition-all hover:scale-105 backdrop-blur-md cursor-pointer"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Scene Container */}
      <div className="relative z-10 w-full max-w-4xl h-[500px] flex items-center justify-center">

        {/* Floating Folder on Left */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute left-12 bottom-16 w-36 h-28 bg-[#B8860B]/30 border border-[#DAA520]/40 rounded-lg p-3 shadow-2xl backdrop-blur-sm flex flex-col justify-end"
        >
          <div className="text-[10px] tracking-wider uppercase text-amber-200/70 font-mono mb-1">
            Personal Chapter
          </div>
          <div className="h-1.5 w-16 bg-amber-200/20 rounded" />
          <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#8B5A2B] text-[9px] text-amber-100 rounded-t">
            MEMORIES
          </div>
        </motion.div>

        {/* Natural Moving Cursor */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: 200 }}
          animate={
            step === 1
              ? { opacity: 1, x: -180, y: 80 }
              : step === 2
              ? { opacity: 1, x: -40, y: -40 }
              : step === 3
              ? { opacity: 1, x: 20, y: 60 }
              : { opacity: 0, x: 100, y: 100 }
          }
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute z-40 pointer-events-none"
        >
          {/* Custom Stylized Quill / Cursor Icon */}
          <div className="relative">
            <svg className="w-6 h-6 text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-300 rounded-full animate-ping" />
          </div>
        </motion.div>

        {/* Floating Sticky Notes from Folder */}
        <AnimatePresence>
          {step >= 2 && (
            <>
              {/* Note 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4, x: -180, y: 80, rotate: -12 }}
                animate={
                  step === 3
                    ? { opacity: [1, 1, 0], scale: [1, 0.4, 0.1], x: [ -180, -20, 0 ], y: [ 80, -80, 70 ], rotate: [-12, 180, 360] }
                    : { opacity: 1, scale: 1, x: -100, y: -60, rotate: -6 }
                }
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute z-30 w-28 h-28 bg-[#FEF08A] text-[#422006] p-2.5 rounded-sm shadow-xl border border-amber-200/50 flex flex-col justify-between"
              >
                <div className="w-2 h-2 bg-red-400/80 rounded-full mx-auto" />
                <p className="text-[10px] font-serif leading-tight opacity-90 italic">
                  "Day 1 effort..."
                </p>
                <span className="text-[8px] font-mono text-amber-800/60 text-right">07.25</span>
              </motion.div>

              {/* Note 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4, x: -180, y: 80, rotate: 10 }}
                animate={
                  step === 3
                    ? { opacity: [1, 1, 0], scale: [1, 0.3, 0.1], x: [ -180, 20, 0 ], y: [ 80, -100, 80 ], rotate: [10, -180, -360] }
                    : { opacity: 1, scale: 0.95, x: -40, y: -90, rotate: 8 }
                }
                transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                className="absolute z-30 w-24 h-24 bg-[#FFEDD5] text-[#431407] p-2.5 rounded-sm shadow-xl border border-orange-200/50 flex flex-col justify-between"
              >
                <div className="w-2 h-2 bg-amber-600/80 rounded-full mx-auto" />
                <p className="text-[9px] font-serif leading-tight opacity-90 italic">
                  "Small progress saved."
                </p>
                <span className="text-[8px] font-mono text-orange-900/60 text-right">07.26</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Center Glass Jar on Desk */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* Glass Jar Body */}
          <div className="relative w-44 h-60 rounded-3xl border-2 border-white/40 bg-gradient-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-end p-3 overflow-hidden">
            {/* Wooden Lid / Cork Stopper */}
            <div className="absolute -top-4 inset-x-6 h-7 bg-[#8C5A38] border-b-2 border-[#5C3A21] rounded-t-lg shadow-md flex items-center justify-center">
              <div className="w-12 h-1 bg-[#A06D4B] rounded-full" />
            </div>

            {/* Glass Highlights */}
            <div className="absolute top-4 left-3 w-3 h-48 bg-gradient-to-b from-white/50 to-transparent rounded-full blur-[1px]" />
            <div className="absolute top-4 right-3 w-1.5 h-48 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-[1px]" />

            {/* Glowing Paper Memories Inside Jar */}
            <div className="relative w-full h-32 flex flex-wrap items-end justify-center gap-1.5 p-2 border-t border-white/10">
              {/* Existing folded paper capsules inside */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-7 h-5 bg-amber-100/90 rounded-sm shadow-md border border-amber-300 transform -rotate-12 flex items-center justify-center text-[8px] font-mono text-amber-900"
              >
                #1
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-8 h-5 bg-orange-100/90 rounded-sm shadow-md border border-orange-300 transform rotate-6 flex items-center justify-center text-[8px] font-mono text-orange-900"
              >
                #2
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-6 h-5 bg-emerald-100/90 rounded-sm shadow-md border border-emerald-300 transform -rotate-4 flex items-center justify-center text-[8px] font-mono text-emerald-900"
              >
                #3
              </motion.div>

              {/* Newly falling folded paper capsule at step 3 */}
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -80, scale: 1.5, rotate: 180 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: -8 }}
                  transition={{ duration: 0.8, type: 'spring', damping: 12 }}
                  className="w-8 h-6 bg-amber-200/95 rounded-sm shadow-lg border border-amber-400 flex items-center justify-center text-[8px] font-mono font-bold text-amber-950"
                >
                  ✨
                </motion.div>
              )}

              {/* Gentle Warm Internal Fill Light */}
              <motion.div
                animate={step >= 3 ? { opacity: [0.2, 0.7, 0.5] } : { opacity: 0.2 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-400/30 via-orange-300/10 to-transparent blur-md pointer-events-none"
              />
            </div>

            {/* Jar Label */}
            <div className="absolute top-20 inset-x-6 py-1 bg-[#F5EFEB]/90 border border-[#D4C3B3] rounded shadow-sm text-center">
              <span className="text-[10px] font-serif tracking-widest uppercase text-[#5C4033] font-semibold">
                JAREAK
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Atmospheric Text Fade In */}
      <div className="relative z-20 text-center px-4 max-w-lg mt-6 h-12">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-amber-100/90 font-serif text-base tracking-wide flex items-center justify-center gap-2 italic"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            {step === 0 && "Entering your quiet workspace..."}
            {step === 1 && "Gathering your daily intentions..."}
            {step === 2 && "Turning small efforts into paper memories..."}
            {step >= 3 && "Progress deserves to be remembered."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Gentle 5-second progress bar */}
      <div className="absolute bottom-6 inset-x-12 max-w-md mx-auto h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
        />
      </div>
    </div>
  );
};
