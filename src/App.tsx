import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Feather } from 'lucide-react';
import {
  Chapter,
  StickyNoteItem,
  MemoryItem,
  DiaryEntry,
  DrawingStroke,
  RoomLighting,
  NoteColor,
  MainTab,
  UserProfile,
  ChecklistItem
} from './types';
import {
  getStoredChapter,
  saveStoredChapter,
  getStoredStickyNotes,
  saveStoredStickyNotes,
  getStoredMemories,
  saveStoredMemories,
  getStoredDiaryEntries,
  saveStoredDiaryEntries,
  getStoredChecklist,
  saveStoredChecklist,
  getStoredDrawings,
  saveStoredDrawings,
  getStoredLighting,
  saveStoredLighting,
  getStoredUserProfile,
  saveStoredUserProfile,
  defaultChapter
} from './utils/storage';

import { IntroCinematic } from './components/IntroCinematic';
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';
import { AuthScreen } from './components/AuthScreen';
import { HeaderBar } from './components/HeaderBar';
import { SoftBoard } from './components/SoftBoard';
import { Jar } from './components/Jar';
import { Diary } from './components/Diary';
import { JarDeckView } from './components/JarDeckView';
import { ProfileView } from './components/ProfileView';

import { PaperAirplaneAnimation } from './components/PaperAirplaneAnimation';

export default function App() {
  const [viewState, setViewState] = useState<'intro' | 'landing' | 'auth' | 'onboarding' | 'room'>('intro');
  const [activeTab, setActiveTab] = useState<MainTab>('room');

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => getStoredUserProfile());

  // Signature Completion Flight State
  const [isFlyingAirplane, setIsFlyingAirplane] = useState(false);
  const [airplaneMessage, setAirplaneMessage] = useState('Another memory saved.');
  const [isJarCelebrating, setIsJarCelebrating] = useState(false);

  // Room Persistence State
  const [chapter, setChapter] = useState<Chapter>(() => getStoredChapter() || defaultChapter);
  const [stickyNotes, setStickyNotes] = useState<StickyNoteItem[]>(() => getStoredStickyNotes());
  const [memories, setMemories] = useState<MemoryItem[]>(() => getStoredMemories());
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(() => getStoredDiaryEntries());
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => getStoredChecklist());
  const [drawings, setDrawings] = useState<DrawingStroke[]>(() => getStoredDrawings());
  const [lighting, setLighting] = useState<RoomLighting>(() => getStoredLighting());

  const hasCustomChapter = Boolean(getStoredChapter());

  // Trigger signature completion experience
  const triggerSignatureCompletion = (msg: string) => {
    setAirplaneMessage(msg);
    setIsFlyingAirplane(true);
  };

  const handleAirplaneAnimationComplete = () => {
    setIsFlyingAirplane(false);
    setIsJarCelebrating(true);
    setTimeout(() => {
      setIsJarCelebrating(false);
    }, 2800);
  };

  const handleResetAppData = () => {
    localStorage.clear();
    setChapter(defaultChapter);
    setStickyNotes([]);
    setMemories([]);
    setDiaryEntries([]);
    setChecklist([]);
    setDrawings([]);
    setLighting('morning');
    setUserProfile(null);
    setViewState('landing');
    setActiveTab('room');
  };

  // Save changes to localStorage
  useEffect(() => {
    saveStoredStickyNotes(stickyNotes);
  }, [stickyNotes]);

  useEffect(() => {
    saveStoredMemories(memories);
  }, [memories]);

  useEffect(() => {
    saveStoredDiaryEntries(diaryEntries);
  }, [diaryEntries]);

  useEffect(() => {
    saveStoredChecklist(checklist);
  }, [checklist]);

  useEffect(() => {
    saveStoredDrawings(drawings);
  }, [drawings]);

  useEffect(() => {
    saveStoredLighting(lighting);
  }, [lighting]);

  useEffect(() => {
    if (userProfile) {
      saveStoredUserProfile(userProfile);
    }
  }, [userProfile]);

  // Auth Callbacks
  const handleAuthenticate = (profile: UserProfile) => {
    setUserProfile(profile);
    saveStoredUserProfile(profile);
    setViewState('room');
    setActiveTab('room');
  };

  // Handlers
  const handleIntroComplete = () => {
    setViewState('landing');
  };

  const handleStartJourney = () => {
    if (!userProfile) {
      setViewState('auth');
    } else {
      setViewState('onboarding');
    }
  };

  const handleOnboardingComplete = (newChapter: Chapter) => {
    setChapter(newChapter);
    saveStoredChapter(newChapter);
    setViewState('room');
    setActiveTab('room');
  };

  const handleLightingChange = (newLighting: RoomLighting) => {
    setLighting(newLighting);
  };

  const handleUpdateProfile = (updatedProps: Partial<UserProfile>) => {
    if (userProfile) {
      const newProfile = { ...userProfile, ...updatedProps };
      setUserProfile(newProfile);
      saveStoredUserProfile(newProfile);
    }
  };

  // Softboard Actions
  const handleAddStickyNote = (content: string, color: NoteColor) => {
    const newNote: StickyNoteItem = {
      id: `note-${Date.now()}`,
      content,
      color,
      date: new Date().toISOString().split('T')[0],
      pinRotation: Math.floor(Math.random() * 12) - 6
    };
    setStickyNotes([newNote, ...stickyNotes]);
  };

  const handleDeleteStickyNote = (id: string) => {
    setStickyNotes(stickyNotes.filter((n) => n.id !== id));
  };

  const handleUpdateStickyNoteContent = (id: string, content: string) => {
    setStickyNotes(
      stickyNotes.map((n) => (n.id === id ? { ...n, content } : n))
    );
  };

  const handleArchiveNoteToJar = (note: StickyNoteItem) => {
    const newMemory: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: `Memory: ${note.content.slice(0, 24)}...`,
      content: note.content,
      date: note.date,
      dayNumber: memories.length + 1,
      color: note.color,
      reflection: 'Preserved from my daily effort softboard.',
      paperColor:
        note.color === 'yellow'
          ? '#FEF08A'
          : note.color === 'peach'
          ? '#FFEDD5'
          : note.color === 'sage'
          ? '#DCFCE7'
          : note.color === 'lavender'
          ? '#F3E8FF'
          : '#FAF6F0'
    };

    setMemories([newMemory, ...memories]);
    setStickyNotes(stickyNotes.filter((n) => n.id !== note.id));
    triggerSignatureCompletion('Intention saved as paper memory.');
  };

  // Jar Direct Add
  const handleAddDirectMemory = (mem: Omit<MemoryItem, 'id'>) => {
    const fullMem: MemoryItem = {
      ...mem,
      id: `mem-${Date.now()}`
    };
    setMemories([fullMem, ...memories]);
    triggerSignatureCompletion('Another memory saved inside Jar.');
  };

  // Diary Direct Add
  const handleAddDiaryEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    const fullEntry: DiaryEntry = {
      ...entry,
      id: `diary-${Date.now()}`
    };
    setDiaryEntries([...diaryEntries, fullEntry]);
    triggerSignatureCompletion('Journal reflection recorded.');
  };

  // Checklist Actions
  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));
      const allDone = updated.length > 0 && updated.every((i) => i.completed);
      if (allDone) {
        triggerSignatureCompletion('All daily focus steps completed!');
      }
      return updated;
    });
  };

  const handleAddChecklistItem = (text: string) => {
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      text,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    };
    setChecklist((prev) => [...prev, newItem]);
  };

  const handleDeleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  // Lighting theme background class mapping
  const bgLightingClass =
    lighting === 'morning'
      ? 'bg-[#f5f2ed] text-[#3e2a1e]'
      : lighting === 'dusk'
      ? 'bg-[#fce3ce] text-[#3d2513]'
      : 'bg-[#261b16] text-[#fffdfa]';

  return (
    <div className={`min-h-screen font-sans selection:bg-amber-200 selection:text-amber-950 transition-colors duration-700 ${bgLightingClass}`}>
      <AnimatePresence mode="wait">
        {/* Step 1: 5-Second Cinematic Intro */}
        {viewState === 'intro' && (
          <IntroCinematic key="intro" onComplete={handleIntroComplete} />
        )}

        {/* Step 2: Minimal Emotional Landing Page */}
        {viewState === 'landing' && (
          <LandingPage
            key="landing"
            onStartJourney={handleStartJourney}
            onContinueChapter={() => setViewState('room')}
            hasExistingChapter={hasCustomChapter}
            onOpenAuth={() => setViewState('auth')}
          />
        )}

        {/* Step 3: Soft Emotional Authentication Screen */}
        {viewState === 'auth' && (
          <AuthScreen
            key="auth"
            onAuthenticate={handleAuthenticate}
            onGuestContinue={() => {
              const guestProfile: UserProfile = {
                name: 'Quiet Guest',
                title: 'Mindful Builder',
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                avatarInitials: 'QG',
                soundEnabled: true,
                autoArchiveNotes: true,
                notificationsEnabled: false,
                themePreference: 'morning'
              };
              handleAuthenticate(guestProfile);
            }}
          />
        )}

        {/* Step 4: Onboarding Chapter Setup */}
        {viewState === 'onboarding' && (
          <Onboarding
            key="onboarding"
            onComplete={handleOnboardingComplete}
            onBack={() => setViewState('landing')}
          />
        )}

        {/* Step 5: Main Product Shell (Room / Jar Deck / Profile) */}
        {viewState === 'room' && (
          <motion.div
            key="room-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col justify-between relative overflow-hidden"
          >
            {/* Soft Ambient Room Lighting Effects */}
            {lighting === 'morning' && (
              <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 via-yellow-100/10 to-transparent blur-3xl pointer-events-none" />
            )}
            {lighting === 'dusk' && (
              <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-400/20 via-pink-300/10 to-transparent blur-3xl pointer-events-none" />
            )}
            {lighting === 'candlelight' && (
              <div className="absolute bottom-20 left-1/2 -ml-[300px] w-[600px] h-[400px] bg-gradient-to-t from-amber-600/20 via-yellow-500/10 to-transparent blur-3xl pointer-events-none" />
            )}

            {/* PRODUCT SHELL NAVIGATION HEADER BAR */}
            <HeaderBar
              lighting={lighting}
              onLightingChange={handleLightingChange}
              chapter={chapter}
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab)}
              onChangeChapter={() => setViewState('onboarding')}
              onReplayIntro={() => setViewState('intro')}
              onOpenAuth={() => setViewState('auth')}
              userProfile={userProfile}
            />

            {/* TAB 1: 🫙 ROOM (MAIN EXPERIENCE WORKSPACE) */}
            {activeTab === 'room' && (
              <main className="relative z-10 max-w-7xl w-full mx-auto px-4 py-4 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* LEFT SIDE: MAIN HERO SOFTBOARD */}
                  <section className="lg:col-span-8 w-full">
                    <SoftBoard
                      chapter={chapter}
                      notes={stickyNotes}
                      checklist={checklist}
                      onToggleChecklist={handleToggleChecklist}
                      onAddChecklistItem={handleAddChecklistItem}
                      onDeleteChecklistItem={handleDeleteChecklistItem}
                      onAddNote={handleAddStickyNote}
                      onArchiveNote={handleArchiveNoteToJar}
                      onDeleteNote={handleDeleteStickyNote}
                      onUpdateNoteContent={handleUpdateStickyNoteContent}
                      drawings={drawings}
                      onDrawingsChange={setDrawings}
                      memories={memories}
                    />
                  </section>

                  {/* RIGHT SIDE: MEMORY CORNER */}
                  <section className="lg:col-span-4 w-full flex flex-col items-center gap-8 py-2">
                    {/* Top: Reward Glass Jar */}
                    <div className="w-full flex flex-col items-center bg-white/20 backdrop-blur-sm p-5 rounded-3xl border border-white/30 shadow-xl">
                      <span className="text-xs font-serif uppercase tracking-widest text-[#5d4037] mb-3 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Memory Jar</span>
                      </span>
                      <Jar
                        memories={memories}
                        chapter={chapter}
                        onAddMemory={handleAddDirectMemory}
                        isCelebrating={isJarCelebrating}
                      />
                    </div>

                    {/* Below the Jar: Personal Diary */}
                    <div className="w-full flex flex-col items-center bg-white/20 backdrop-blur-sm p-5 rounded-3xl border border-white/30 shadow-xl">
                      <span className="text-xs font-serif uppercase tracking-widest text-[#5d4037] mb-3 font-semibold flex items-center gap-1.5">
                        <Feather className="w-3.5 h-3.5 text-[#5d4037]" />
                        <span>Personal Memory Journal</span>
                      </span>
                      <Diary
                        entries={diaryEntries}
                        chapter={chapter}
                        onAddEntry={handleAddDiaryEntry}
                      />
                    </div>
                  </section>
                </div>
              </main>
            )}

            {/* TAB 2: 📚 JAR DECK (MEMORY ARCHIVE SHELF) */}
            {activeTab === 'deck' && (
              <main className="relative z-10 max-w-7xl w-full mx-auto px-4 py-4 flex-1">
                <JarDeckView
                  currentMemories={memories}
                  currentDiaryEntries={diaryEntries}
                  currentChapterTitle={chapter.title}
                />
              </main>
            )}

            {/* TAB 3: 👤 PROFILE (PERSONAL SECTION & FUTURE EXPANSION) */}
            {activeTab === 'profile' && (
              <main className="relative z-10 max-w-7xl w-full mx-auto px-4 py-4 flex-1">
                <ProfileView
                  userProfile={userProfile || {
                    name: 'Quiet Guest',
                    title: 'Mindful Explorer',
                    joinedDate: 'Today',
                    avatarInitials: 'QG',
                    soundEnabled: true,
                    autoArchiveNotes: true,
                    notificationsEnabled: true,
                    themePreference: lighting
                  }}
                  onUpdateProfile={handleUpdateProfile}
                  chapter={chapter}
                  totalMemoriesCount={memories.length}
                  totalDiaryCount={diaryEntries.length}
                  lighting={lighting}
                  onChangeLighting={handleLightingChange}
                  onResetData={handleResetAppData}
                />
              </main>
            )}

            {/* Room Footer Quote */}
            <footer className="relative z-10 py-4 text-center text-xs font-serif italic opacity-75">
              <p>"Progress deserves to be remembered." • Jareak Sanctuary</p>
            </footer>

            {/* Paper Airplane Flying Animation */}
            <PaperAirplaneAnimation
              isFlying={isFlyingAirplane}
              onAnimationComplete={handleAirplaneAnimationComplete}
              message={airplaneMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
