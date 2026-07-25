import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, RoomLighting, Chapter } from '../types';
import { User, Settings, Volume2, VolumeX, Moon, Sun, Sunset, Trash2, Award, CheckCircle2, X, Feather } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter;
  totalMemoriesCount: number;
  totalDiaryCount: number;
  lighting: RoomLighting;
  onChangeLighting: (lighting: RoomLighting) => void;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  chapter,
  totalMemoriesCount,
  totalDiaryCount,
  lighting,
  onChangeLighting,
  onResetData
}) => {
  const [userName, setUserName] = useState('Quiet Builder');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#fffdfa] border-4 border-[#5d4037] rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e9e1d6] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#5d4037] text-amber-100 flex items-center justify-center font-serif text-xl font-bold border-2 border-amber-200">
                  {userName.charAt(0)}
                </div>
                <div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="font-serif font-semibold text-xl text-[#3e2a1e] bg-transparent border-b border-transparent hover:border-[#d2b48c] focus:border-[#5d4037] focus:outline-none"
                  />
                  <p className="text-xs text-[#8d6e63] font-serif">
                    Crafting habits with quiet consistency
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/10 text-[#5d4037] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Journey Stats Overview */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c]/60 text-center">
                <span className="block text-2xl font-serif font-bold text-[#3e2a1e]">
                  {totalMemoriesCount}
                </span>
                <span className="text-[10px] font-serif text-[#8d6e63] uppercase tracking-wider">
                  Jar Memories
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c]/60 text-center">
                <span className="block text-2xl font-serif font-bold text-[#3e2a1e]">
                  {totalDiaryCount}
                </span>
                <span className="text-[10px] font-serif text-[#8d6e63] uppercase tracking-wider">
                  Journal Pages
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c]/60 text-center">
                <span className="block text-2xl font-serif font-bold text-[#3e2a1e]">
                  {chapter.durationDays}
                </span>
                <span className="text-[10px] font-serif text-[#8d6e63] uppercase tracking-wider">
                  Active Chapter
                </span>
              </div>
            </div>

            {/* Room Atmosphere & Preferences */}
            <div className="space-y-4 mb-6">
              <h4 className="font-serif font-semibold text-sm text-[#3e2a1e] flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#5d4037]" />
                <span>Room Environment & Preferences</span>
              </h4>

              {/* Lighting Preset Selector */}
              <div className="p-3.5 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c]/60 space-y-2">
                <span className="block text-xs font-serif text-[#8d6e63]">
                  Room Lighting Mood:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onChangeLighting('morning')}
                    className={`p-2 rounded-xl text-xs font-serif flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                      lighting === 'morning'
                        ? 'bg-[#5d4037] text-white border-[#5d4037] font-medium shadow-sm'
                        : 'bg-white text-[#3e2a1e] border-[#e9e1d6] hover:bg-amber-50'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Morning Light</span>
                  </button>

                  <button
                    onClick={() => onChangeLighting('dusk')}
                    className={`p-2 rounded-xl text-xs font-serif flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                      lighting === 'dusk'
                        ? 'bg-[#5d4037] text-white border-[#5d4037] font-medium shadow-sm'
                        : 'bg-white text-[#3e2a1e] border-[#e9e1d6] hover:bg-amber-50'
                    }`}
                  >
                    <Sunset className="w-3.5 h-3.5 text-orange-400" />
                    <span>Dusk Glow</span>
                  </button>

                  <button
                    onClick={() => onChangeLighting('candlelight')}
                    className={`p-2 rounded-xl text-xs font-serif flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                      lighting === 'candlelight'
                        ? 'bg-[#5d4037] text-white border-[#5d4037] font-medium shadow-sm'
                        : 'bg-white text-[#3e2a1e] border-[#e9e1d6] hover:bg-amber-50'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-amber-200" />
                    <span>Candlelight</span>
                  </button>
                </div>
              </div>

              {/* Sound Effect Toggle */}
              <div className="p-3.5 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#5d4037]" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-[#8d6e63]" />
                  )}
                  <span className="text-xs font-serif text-[#3e2a1e]">
                    Paper Folding Sound Feedback
                  </span>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-serif border cursor-pointer transition-colors ${
                    soundEnabled
                      ? 'bg-[#5d4037] text-white border-[#5d4037]'
                      : 'bg-white text-[#8d6e63] border-[#e9e1d6]'
                  }`}
                >
                  {soundEnabled ? 'Enabled' : 'Muted'}
                </button>
              </div>
            </div>

            {/* Danger Area / Reset */}
            <div className="pt-4 border-t border-[#e9e1d6] flex items-center justify-between">
              {isConfirmingReset ? (
                <div className="flex items-center gap-2 w-full justify-between">
                  <span className="text-xs font-serif text-red-700">
                    Reset local journey memory?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsConfirmingReset(false)}
                      className="px-3 py-1 rounded-lg text-xs font-serif border border-[#e9e1d6] text-[#3e2a1e]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onResetData();
                        setIsConfirmingReset(false);
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-serif bg-red-800 text-white font-medium hover:bg-red-900"
                    >
                      Confirm Reset
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsConfirmingReset(true)}
                  className="text-xs font-serif text-red-800/80 hover:text-red-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset App Data</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#5d4037] text-white text-xs font-serif cursor-pointer hover:bg-[#3e2a1e]"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
