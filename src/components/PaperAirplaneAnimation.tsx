import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface PaperAirplaneAnimationProps {
  isFlying: boolean;
  onAnimationComplete: () => void;
  message?: string;
}

export const PaperAirplaneAnimation: React.FC<PaperAirplaneAnimationProps> = ({
  isFlying,
  onAnimationComplete,
  message = 'Another memory saved.'
}) => {
  return (
    <AnimatePresence>
      {isFlying && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {/* Flying Paper Airplane Motion Path */}
          <motion.div
            initial={{
              x: '-25vw',
              y: '10vh',
              scale: 1,
              rotate: -20,
              opacity: 1
            }}
            animate={{
              x: ['-20vw', '0vw', '25vw', '30vw'],
              y: ['5vh', '-15vh', '15vh', '20vh'],
              scale: [1, 1.2, 0.8, 0.3],
              rotate: [-15, -45, 15, 60],
              opacity: [1, 1, 0.9, 0]
            }}
            transition={{
              duration: 2.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onAnimationComplete={onAnimationComplete}
            className="relative flex items-center justify-center"
          >
            {/* Paper Airplane Visual */}
            <div className="p-3 bg-[#fffdfa] border-2 border-[#5d4037] rounded-full shadow-2xl flex items-center justify-center transform -rotate-45">
              <Send className="w-8 h-8 text-[#5d4037] fill-[#f5f2ed]" />
            </div>

            {/* Trailing Sparkle Dust */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 flex items-center gap-1 text-amber-500"
            >
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            </motion.div>
          </motion.div>

          {/* Serene Completion Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="fixed top-20 px-6 py-3 rounded-full bg-[#3e2a1e] text-[#fffdfa] border border-amber-300/40 shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold text-amber-100">
                {message}
              </span>
              <span className="text-[10px] font-serif text-amber-200/80 italic">
                Pride • Reflection • Growth
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
