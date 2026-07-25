import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Chapter } from '../types';
import { Sparkles, Code, Activity, GraduationCap, Compass, Check, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (chapter: Chapter) => void;
  onBack?: () => void;
}

const PRESETS = [
  {
    title: '100 Days of Coding',
    category: 'code' as const,
    icon: Code,
    duration: 100,
    intention: 'To write clean, thoughtful code every day with patience and curiosity.',
    bg: 'from-amber-100/80 to-amber-50/50'
  },
  {
    title: 'My Fitness Chapter',
    category: 'fitness' as const,
    icon: Activity,
    duration: 30,
    intention: 'To honor my body daily through movement, breath, and rest.',
    bg: 'from-emerald-100/80 to-emerald-50/50'
  },
  {
    title: 'Semester Comeback',
    category: 'academic' as const,
    icon: GraduationCap,
    duration: 30,
    intention: 'To learn deeply each morning, building focus without panic.',
    bg: 'from-sky-100/80 to-sky-50/50'
  },
  {
    title: 'Learning Journey',
    category: 'learning' as const,
    icon: Compass,
    duration: 30,
    intention: 'To explore new ideas without fear of mistakes.',
    bg: 'from-purple-100/80 to-purple-50/50'
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onBack }) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);
  const [title, setTitle] = useState(PRESETS[0].title);
  const [durationDays, setDurationDays] = useState<number>(100);
  const [customDays, setCustomDays] = useState<string>('45');
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [intention, setIntention] = useState(PRESETS[0].intention);

  const handleSelectPreset = (index: number) => {
    setSelectedPreset(index);
    setTitle(PRESETS[index].title);
    setDurationDays(PRESETS[index].duration);
    setIsCustomDuration(false);
    setIntention(PRESETS[index].intention);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalDuration = isCustomDuration ? parseInt(customDays, 10) || 30 : durationDays;

    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: title.trim(),
      durationDays: finalDuration,
      startDate: new Date().toISOString().split('T')[0],
      intention: intention.trim() || 'To move forward with calm consistency.',
      category: selectedPreset !== null ? PRESETS[selectedPreset].category : 'custom'
    };

    onComplete(newChapter);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#4A3525] font-sans flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-[#FAF6F0] border border-[#EFE6DD] rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden"
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#8C6D53] via-[#B8860B] to-[#674D3C]" />

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE6DD] text-xs font-serif text-[#674D3C] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Creating Your Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2D1F17] font-semibold mb-2">
            What chapter are you starting?
          </h2>
          <p className="text-sm text-[#8C6D53]">
            Every long path is walked one calm day at a time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preset Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {PRESETS.map((preset, idx) => {
              const IconComp = preset.icon;
              const isSelected = selectedPreset === idx;
              return (
                <button
                  type="button"
                  key={preset.title}
                  onClick={() => handleSelectPreset(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#8C6D53] bg-white shadow-md ring-2 ring-[#8C6D53]/20'
                      : 'border-[#EFE6DD] bg-white/50 hover:bg-white hover:border-[#D8C7B8]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${preset.bg} text-[#4A3525]`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#674D3C] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm text-[#2D1F17]">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-[#8C6D53]">
                      {preset.duration} Days • Preset
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Journey Title Input */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#674D3C] mb-1.5 font-semibold">
              Journey Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSelectedPreset(null);
              }}
              placeholder="e.g. My Creative Writing Season"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#EFE6DD] text-[#2D1F17] font-serif placeholder-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C6D53]/30 text-base shadow-sm"
              required
            />
          </div>

          {/* Duration Choice */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#674D3C] mb-1.5 font-semibold">
              Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 30, 100].map((days) => (
                <button
                  type="button"
                  key={days}
                  onClick={() => {
                    setDurationDays(days);
                    setIsCustomDuration(false);
                  }}
                  className={`py-2.5 rounded-xl border text-xs font-serif transition-all cursor-pointer ${
                    !isCustomDuration && durationDays === days
                      ? 'bg-[#674D3C] text-white border-[#674D3C] shadow-sm'
                      : 'bg-white border-[#EFE6DD] text-[#674D3C] hover:bg-[#EFE6DD]/40'
                  }`}
                >
                  {days} Days
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustomDuration(true)}
                className={`py-2.5 rounded-xl border text-xs font-serif transition-all cursor-pointer ${
                  isCustomDuration
                    ? 'bg-[#674D3C] text-white border-[#674D3C] shadow-sm'
                    : 'bg-white border-[#EFE6DD] text-[#674D3C] hover:bg-[#EFE6DD]/40'
                }`}
              >
                Custom
              </button>
            </div>

            {isCustomDuration && (
              <div className="mt-2.5 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                  className="w-24 px-3 py-2 rounded-lg bg-white border border-[#EFE6DD] text-sm text-[#2D1F17] focus:outline-none focus:ring-1 focus:ring-[#8C6D53]"
                />
                <span className="text-xs text-[#8C6D53] font-serif">Days total</span>
              </div>
            )}
          </div>

          {/* Personal Intention Input */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#674D3C] mb-1.5 font-semibold">
              Personal Intention
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              rows={2}
              placeholder="What promise are you making to yourself during this chapter?"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#EFE6DD] text-[#2D1F17] text-sm font-serif italic placeholder-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C6D53]/30 shadow-sm resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-between">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="text-xs text-[#8C6D53] hover:text-[#4A3525] font-serif underline cursor-pointer"
              >
                ← Back
              </button>
            ) : <div />}

            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#674D3C] hover:bg-[#4A3525] text-[#FAF6F0] font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Create My Space</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
