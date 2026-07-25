import React, { useState, useRef } from 'react';
import { RoomLighting, Chapter, MainTab, UserProfile } from '../types';
import { Sun, Sunset, Moon, Volume2, VolumeX, RotateCcw, Compass, Archive, User, Home, BookOpen, LogIn } from 'lucide-react';

interface HeaderBarProps {
  lighting: RoomLighting;
  onLightingChange: (lighting: RoomLighting) => void;
  chapter: Chapter;
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  onChangeChapter: () => void;
  onReplayIntro: () => void;
  onOpenAuth?: () => void;
  userProfile?: UserProfile | null;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  lighting,
  onLightingChange,
  chapter,
  activeTab,
  onSelectTab,
  onChangeChapter,
  onReplayIntro,
  onOpenAuth,
  userProfile
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio Synthesized Soft Rain Ambient Sound
  const toggleAmbientAudio = () => {
    if (isPlayingAudio) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlayingAudio(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create pink noise generator for rain sound
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.02; // Soft volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();
      } else {
        audioCtxRef.current.resume();
      }
      setIsPlayingAudio(true);
    }
  };

  return (
    <header className="relative z-30 max-w-7xl w-full mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 font-sans">
      {/* Brand & Active Chapter */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTab('room')}
          className="w-9 h-9 rounded-2xl bg-[#5d4037] text-[#fffdfa] flex items-center justify-center font-serif font-bold text-xl shadow-md cursor-pointer border border-amber-300/30"
        >
          J
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-wider text-[#3e2a1e]">
              Jareak
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-100 text-[#5d4037] text-[10px] font-serif font-semibold border border-amber-300">
              Personal Sanctuary
            </span>
          </div>
          <p className="text-xs font-serif italic text-[#8d6e63]">
            {chapter.title}
          </p>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR: Room | Jar Deck | Profile */}
      <nav className="p-1 rounded-2xl bg-[#fffdfa]/90 border-2 border-[#5d4037]/80 shadow-md flex items-center gap-1 backdrop-blur-md">
        <button
          onClick={() => onSelectTab('room')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'room'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e] hover:bg-black/5'
          }`}
          title="Main Work Space Room"
        >
          <span className="text-sm">🫙</span>
          <span>Room</span>
        </button>

        <button
          onClick={() => onSelectTab('deck')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'deck'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e] hover:bg-black/5'
          }`}
          title="Jar Deck Memory Archive"
        >
          <span className="text-sm">📚</span>
          <span>Jar Deck</span>
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e] hover:bg-black/5'
          }`}
          title="User Profile & Settings"
        >
          <span className="text-sm">👤</span>
          <span>Profile</span>
        </button>
      </nav>

      {/* Ambiance & Utility Controls */}
      <div className="flex items-center gap-2">
        {/* User Auth indicator or Login Trigger */}
        {userProfile ? (
          <button
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#d2b48c] bg-white/90 hover:bg-white text-xs font-serif text-[#5d4037] transition-all shadow-sm cursor-pointer"
            title="Logged in user profile"
          >
            <div className="w-5 h-5 rounded-full bg-[#5d4037] text-amber-100 flex items-center justify-center font-bold text-[10px]">
              {userProfile.avatarInitials || 'U'}
            </div>
            <span className="hidden md:inline font-medium">{userProfile.name}</span>
          </button>
        ) : (
          onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-full border border-[#5d4037] bg-[#5d4037] hover:bg-[#3e2a1e] text-xs font-serif text-amber-100 font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )
        )}

        {/* Room Lighting Mode Selector */}
        <div className="p-1 rounded-full bg-black/5 border border-black/10 flex items-center gap-1 backdrop-blur-sm">
          <button
            onClick={() => onLightingChange('morning')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              lighting === 'morning' ? 'bg-[#5d4037] text-amber-200 shadow-sm' : 'text-[#8d6e63] hover:text-[#3e2a1e]'
            }`}
            title="Morning Sunlight"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onLightingChange('dusk')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              lighting === 'dusk' ? 'bg-[#5d4037] text-orange-200 shadow-sm' : 'text-[#8d6e63] hover:text-[#3e2a1e]'
            }`}
            title="Soft Dusk"
          >
            <Sunset className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onLightingChange('candlelight')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              lighting === 'candlelight' ? 'bg-[#5d4037] text-amber-300 shadow-sm' : 'text-[#8d6e63] hover:text-[#3e2a1e]'
            }`}
            title="Candlelight Evening"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ambient Rain Sound Toggle */}
        <button
          onClick={toggleAmbientAudio}
          className={`px-3 py-1.5 rounded-full border border-black/10 text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer ${
            isPlayingAudio ? 'bg-[#5d4037] text-amber-100 shadow-sm' : 'bg-white/60 text-[#8d6e63] hover:bg-white'
          }`}
          title="Toggle soft rain ambient sound"
        >
          {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden lg:inline">{isPlayingAudio ? 'Rain On' : 'Rain Sound'}</span>
        </button>

        {/* Change Chapter */}
        <button
          onClick={onChangeChapter}
          className="p-2 rounded-full border border-[#8d6e63]/30 bg-white/80 hover:bg-white text-[#5d4037] transition-all shadow-sm cursor-pointer"
          title="Change active chapter"
        >
          <Compass className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
