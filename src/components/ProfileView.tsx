import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Chapter, RoomLighting, BadgeItem, CommunityGrowthItem } from '../types';
import {
  User,
  Settings,
  Award,
  Sprout,
  Trophy,
  Sun,
  Sunset,
  Moon,
  Bell,
  Volume2,
  Trash2,
  Shield,
  Sparkles,
  CheckCircle2,
  Lock,
  Heart
} from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  chapter: Chapter;
  totalMemoriesCount: number;
  totalDiaryCount: number;
  lighting: RoomLighting;
  onChangeLighting: (lighting: RoomLighting) => void;
  onResetData: () => void;
}

const PRESET_BADGES: BadgeItem[] = [
  {
    id: 'b-first-memory',
    title: 'First Memory Folded',
    description: 'Saved your first intention or memory slip inside the Glass Jar.',
    iconName: 'Sparkles',
    unlocked: true,
    unlockedDate: 'Day 1'
  },
  {
    id: 'b-reflection-habit',
    title: '7 Day Quiet Journal',
    description: 'Recorded 7 daily reflections in your personal diary.',
    iconName: 'BookOpen',
    unlocked: true,
    unlockedDate: 'Day 7'
  },
  {
    id: 'b-30-day-reflection',
    title: '30 Day Milestone',
    description: 'Maintained your focus room for a full 30 days.',
    iconName: 'Award',
    unlocked: false
  },
  {
    id: 'b-100-day-journey',
    title: '100 Day Chapter Completed',
    description: 'Completed a 100-day dedicated growth chapter.',
    iconName: 'Trophy',
    unlocked: false
  }
];

const SAMPLE_COMMUNITY_GARDEN: CommunityGrowthItem[] = [
  {
    id: 'cg-1',
    userName: 'Elena Vance',
    chapterTitle: '100 Days of Spanish',
    dayCount: 42,
    plantType: 'Golden Sunflower 🌻',
    message: 'Quiet practice every morning before the sun comes up.'
  },
  {
    id: 'cg-2',
    userName: 'Marcus Chen',
    chapterTitle: 'Algorithm Mastery',
    dayCount: 18,
    plantType: 'Oak Sapling 🌳',
    message: 'Consistency is peaceful when you stop comparing speed.'
  },
  {
    id: 'cg-3',
    userName: 'Sora Kim',
    chapterTitle: 'Poetry Writing',
    dayCount: 30,
    plantType: 'Lavender Bush 🪻',
    message: '30 poems written. Each one saved in paper slips.'
  }
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  chapter,
  totalMemoriesCount,
  totalDiaryCount,
  lighting,
  onChangeLighting,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'badges' | 'community' | 'leaderboard'>('settings');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editTitle, setEditTitle] = useState(userProfile.title);

  const handleSaveInfo = () => {
    onUpdateProfile({
      name: editName,
      title: editTitle,
      avatarInitials: editName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'JK'
    });
    setIsEditingName(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 font-sans">
      {/* Profile Main Header Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#fffdfa] border-4 border-[#5d4037] shadow-2xl mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            {/* Avatar Pill */}
            <div className="w-20 h-20 rounded-3xl bg-[#5d4037] text-amber-100 flex items-center justify-center font-serif font-bold text-3xl shadow-lg border-2 border-amber-300/40 shrink-0">
              {userProfile.avatarInitials || 'JK'}
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#3e2a1e]">
                  {userProfile.name}
                </h1>
                <button
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="text-xs font-serif text-[#8d6e63] hover:text-[#3e2a1e] underline cursor-pointer"
                >
                  {isEditingName ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <p className="text-sm font-serif italic text-[#8d6e63] mt-0.5">
                {userProfile.title} • Member since {userProfile.joinedDate}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-[#5d4037] text-xs font-serif font-semibold border border-amber-300">
                  Active: {chapter.title}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f5f2ed] text-[#8d6e63] text-xs font-serif border border-[#d2b48c]">
                  🫙 {totalMemoriesCount} Paper Slips
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f5f2ed] text-[#8d6e63] text-xs font-serif border border-[#d2b48c]">
                  📖 {totalDiaryCount} Diary Pages
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Edit Form */}
        <AnimatePresence>
          {isEditingName && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-4 border-t border-[#e9e1d6] flex flex-wrap items-center gap-3"
            >
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full Name"
                className="px-3 py-1.5 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-xs font-serif text-[#3e2a1e]"
              />
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title / Role"
                className="px-3 py-1.5 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-xs font-serif text-[#3e2a1e]"
              />
              <button
                onClick={handleSaveInfo}
                className="px-4 py-1.5 rounded-xl bg-[#5d4037] text-amber-100 text-xs font-serif font-semibold shadow cursor-pointer"
              >
                Save
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Section Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-[#fffdfa] rounded-2xl border-2 border-[#5d4037] shadow-md mb-8">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Room Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'badges'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e]'
          }`}
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Badges 🏆</span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'community'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e]'
          }`}
        >
          <Sprout className="w-4 h-4 text-emerald-300" />
          <span>Community Garden 🌱</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-[#5d4037] text-amber-100 shadow-sm'
              : 'text-[#8d6e63] hover:text-[#3e2a1e]'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Leaderboard 🏅</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#fffdfa] border-4 border-[#5d4037] shadow-2xl">
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#3e2a1e] border-b border-[#e9e1d6] pb-2">
              Sanctuary Preferences
            </h2>

            {/* Room Lighting Selection */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] font-semibold mb-3">
                Room Lighting Ambiance
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => onChangeLighting('morning')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 cursor-pointer ${
                    lighting === 'morning'
                      ? 'bg-amber-50 border-[#5d4037] shadow-md'
                      : 'bg-[#f5f2ed] border-transparent hover:border-[#d2b48c]'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-600" />
                  <div>
                    <span className="block font-serif font-semibold text-sm text-[#3e2a1e]">
                      Morning Sunlight
                    </span>
                    <span className="text-[11px] font-serif text-[#8d6e63]">
                      Bright & clear focus
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeLighting('dusk')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 cursor-pointer ${
                    lighting === 'dusk'
                      ? 'bg-orange-50 border-[#5d4037] shadow-md'
                      : 'bg-[#f5f2ed] border-transparent hover:border-[#d2b48c]'
                  }`}
                >
                  <Sunset className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="block font-serif font-semibold text-sm text-[#3e2a1e]">
                      Soft Dusk
                    </span>
                    <span className="text-[11px] font-serif text-[#8d6e63]">
                      Warm twilight tones
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeLighting('candlelight')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 cursor-pointer ${
                    lighting === 'candlelight'
                      ? 'bg-amber-100/70 border-[#5d4037] shadow-md'
                      : 'bg-[#f5f2ed] border-transparent hover:border-[#d2b48c]'
                  }`}
                >
                  <Moon className="w-5 h-5 text-amber-700" />
                  <div>
                    <span className="block font-serif font-semibold text-sm text-[#3e2a1e]">
                      Candlelight
                    </span>
                    <span className="text-[11px] font-serif text-[#8d6e63]">
                      Cozy evening study
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Notification & Sound Preferences */}
            <div className="space-y-3 pt-4 border-t border-[#e9e1d6]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f5f2ed]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#5d4037]" />
                  <span className="text-xs font-serif text-[#3e2a1e] font-medium">
                    Daily Reflection Reminders
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={userProfile.notificationsEnabled}
                  onChange={(e) => onUpdateProfile({ notificationsEnabled: e.target.checked })}
                  className="accent-[#5d4037] w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f5f2ed]">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#5d4037]" />
                  <span className="text-xs font-serif text-[#3e2a1e] font-medium">
                    Ambient Rain & Sound Effects
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={userProfile.soundEnabled}
                  onChange={(e) => onUpdateProfile({ soundEnabled: e.target.checked })}
                  className="accent-[#5d4037] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {/* Account Settings & Danger Zone */}
            <div className="pt-6 border-t border-red-200">
              <h3 className="font-serif font-semibold text-sm text-red-900 mb-2">
                Account & Reset
              </h3>
              <p className="text-xs font-serif text-[#8d6e63] mb-3">
                Clearing data will reset your local room back to a fresh starting state.
              </p>
              <button
                onClick={onResetData}
                className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-serif flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Local Sanctuary Data</span>
              </button>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif font-bold text-xl text-[#3e2a1e]">
                Meaningful Milestones 🏆
              </h2>
              <p className="text-xs font-serif italic text-[#8d6e63] mt-0.5">
                "Not points or scores—just gentle markers of quiet commitment."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRESET_BADGES.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    b.unlocked
                      ? 'bg-amber-50/80 border-[#5d4037] shadow-sm'
                      : 'bg-[#f5f2ed]/60 border-[#d2b48c]/50 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    b.unlocked ? 'bg-[#5d4037] text-amber-200' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {b.unlocked ? <Sparkles className="w-5 h-5 text-amber-300" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-semibold text-sm text-[#3e2a1e]">
                        {b.title}
                      </h3>
                      {b.unlocked && (
                        <span className="text-[10px] font-serif text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-serif text-[#8d6e63] mt-1">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Garden Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-800" />
                <h2 className="font-serif font-bold text-xl text-[#3e2a1e]">
                  Community Garden 🌱
                </h2>
              </div>
              <p className="text-xs font-serif italic text-[#8d6e63] mt-0.5">
                "Instead of competing, users grow quiet gardens together in future chapters."
              </p>
            </div>

            <div className="space-y-4">
              {SAMPLE_COMMUNITY_GARDEN.map((cg) => (
                <div
                  key={cg.id}
                  className="p-4 rounded-2xl bg-[#f5f2ed] border border-[#d2b48c] flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cg.plantType.split(' ')[1]}</span>
                    <div>
                      <h3 className="font-serif font-semibold text-sm text-[#3e2a1e]">
                        {cg.userName} • {cg.chapterTitle}
                      </h3>
                      <p className="text-xs font-serif text-[#8d6e63] italic">
                        "{cg.message}"
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-serif font-medium border border-emerald-300">
                    Day #{cg.dayCount} Planted
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-[#5d4037] flex items-center justify-center text-3xl border border-amber-300 shadow">
              🏅
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#3e2a1e]">
              Future Module: Quiet Leaderboard
            </h2>
            <p className="font-serif text-sm italic text-[#8d6e63] max-w-md mx-auto">
              "Your journey belongs to you. Competitions remain strictly optional to keep your room peaceful."
            </p>
            <div className="pt-2">
              <span className="px-3 py-1 rounded-full bg-[#f5f2ed] text-[#5d4037] text-xs font-serif border border-[#d2b48c]">
                Prepared for future version release
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
