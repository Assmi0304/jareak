export interface Chapter {
  id: string;
  title: string;
  durationDays: number;
  startDate: string;
  intention: string;
  category: 'code' | 'fitness' | 'learning' | 'academic' | 'creative' | 'custom';
}

export type NoteColor = 'yellow' | 'peach' | 'sage' | 'lavender' | 'cream';

export interface StickyNoteItem {
  id: string;
  content: string;
  color: NoteColor;
  date: string;
  pinRotation: number; // degrees for natural look (-6 to 6)
  posX?: number;
  posY?: number;
  tags?: string[];
  isRitualIntention?: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  content: string;
  date: string;
  dayNumber: number;
  color: NoteColor;
  reflection?: string;
  paperColor: string;
  mood?: string;
}

export type JournalMood = 'growing' | 'difficult' | 'proud' | 'slow_okay';

export interface DiaryEntry {
  id: string;
  date: string;
  dayNumber: number;
  title: string;
  reflectionText: string;
  whatWorkedOn?: string;
  whatToRemember?: string;
  howFelt?: string;
  mood?: JournalMood | string;
  gratitude?: string;
  drawingDataUrl?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

export interface DrawingStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
  isEraser?: boolean;
}

export type RoomLighting = 'morning' | 'dusk' | 'candlelight';

export interface CompletedJar {
  id: string;
  title: string;
  category: 'code' | 'fitness' | 'learning' | 'academic' | 'creative' | 'custom';
  completedDate: string;
  memoriesCount: number;
  durationDays: number;
  coverColor: string;
  memories: MemoryItem[];
  diaryEntries?: DiaryEntry[];
  reflectionSummary?: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  title: string;
  joinedDate: string;
  avatarInitials: string;
  soundEnabled: boolean;
  autoArchiveNotes: boolean;
  notificationsEnabled: boolean;
  themePreference: 'morning' | 'dusk' | 'candlelight';
}

export type MainTab = 'room' | 'deck' | 'profile';

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface CommunityGrowthItem {
  id: string;
  userName: string;
  chapterTitle: string;
  dayCount: number;
  plantType: string;
  message: string;
}

