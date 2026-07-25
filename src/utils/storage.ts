import { Chapter, StickyNoteItem, MemoryItem, DiaryEntry, DrawingStroke, RoomLighting, ChecklistItem, UserProfile } from '../types';

const STORAGE_KEYS = {
  CHAPTER: 'jareak_current_chapter',
  STICKY_NOTES: 'jareak_sticky_notes',
  MEMORIES: 'jareak_jar_memories',
  DIARY: 'jareak_diary_entries',
  CHECKLIST: 'jareak_daily_checklist',
  DRAWINGS: 'jareak_drawing_strokes',
  LIGHTING: 'jareak_room_lighting',
  INTRO_SEEN: 'jareak_intro_seen',
  USER_PROFILE: 'jareak_user_profile'
};

export function getStoredUserProfile(): UserProfile | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : null;
}

export function saveStoredUserProfile(profile: UserProfile) {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export const defaultChapter: Chapter = {
  id: 'default-chapter-1',
  title: '100 Days of Coding',
  durationDays: 100,
  startDate: new Date().toISOString().split('T')[0],
  intention: 'To write code every single day with calm curiosity and joy.',
  category: 'code'
};

export const defaultStickyNotes: StickyNoteItem[] = [
  {
    id: 'note-1',
    content: 'Built my first quiet feature today. Clean code, calm mind.',
    color: 'yellow',
    date: new Date().toISOString().split('T')[0],
    pinRotation: -3
  },
  {
    id: 'note-2',
    content: 'Understood recursion without rushing. Progress takes time.',
    color: 'peach',
    date: new Date().toISOString().split('T')[0],
    pinRotation: 2
  },
  {
    id: 'note-3',
    content: 'Took a 20 min walk when stuck. Came back with clarity.',
    color: 'sage',
    date: new Date().toISOString().split('T')[0],
    pinRotation: -1
  }
];

export const defaultMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Day 1: The Beginning',
    content: 'Setup my local workspace and committed line #1 of my dream app.',
    date: '2026-07-20',
    dayNumber: 1,
    color: 'cream',
    reflection: 'Felt nervous at first, but taking the first step cleared the fog.',
    paperColor: '#FAF6F0'
  },
  {
    id: 'mem-2',
    title: 'Day 2: Small Victories',
    content: 'Fixed a tricky state bug that bothered me all morning.',
    date: '2026-07-21',
    dayNumber: 2,
    color: 'yellow',
    reflection: 'Patience is a superpower. Solved it after a tea break.',
    paperColor: '#FEF9C3'
  },
  {
    id: 'mem-3',
    title: 'Day 3: Quiet Consistency',
    content: 'Read 30 pages of documentation and refactored the clean layout.',
    date: '2026-07-22',
    dayNumber: 3,
    color: 'peach',
    reflection: 'Felt the gentle satisfaction of doing good work without pressure.',
    paperColor: '#FFEDD5'
  }
];

export const defaultDiaryEntries: DiaryEntry[] = [
  {
    id: 'diary-1',
    date: '2026-07-20',
    dayNumber: 1,
    title: 'Opening a New Page',
    reflectionText: 'Today I promised myself not to chase speed, but depth. Every line written is a brick in the sanctuary I am building.',
    gratitude: 'Grateful for a quiet morning with hot tea and clear intentions.',
    mood: 'calm'
  }
];

export function getStoredChapter(): Chapter | null {
  const data = localStorage.getItem(STORAGE_KEYS.CHAPTER);
  return data ? JSON.parse(data) : null;
}

export function saveStoredChapter(chapter: Chapter) {
  localStorage.setItem(STORAGE_KEYS.CHAPTER, JSON.stringify(chapter));
}

export function getStoredStickyNotes(): StickyNoteItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.STICKY_NOTES);
  return data ? JSON.parse(data) : defaultStickyNotes;
}

export function saveStoredStickyNotes(notes: StickyNoteItem[]) {
  localStorage.setItem(STORAGE_KEYS.STICKY_NOTES, JSON.stringify(notes));
}

export function getStoredMemories(): MemoryItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.MEMORIES);
  return data ? JSON.parse(data) : defaultMemories;
}

export function saveStoredMemories(memories: MemoryItem[]) {
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
}

export function getStoredDiaryEntries(): DiaryEntry[] {
  const data = localStorage.getItem(STORAGE_KEYS.DIARY);
  return data ? JSON.parse(data) : defaultDiaryEntries;
}

export function saveStoredDiaryEntries(entries: DiaryEntry[]) {
  localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(entries));
}

export function getStoredDrawings(): DrawingStroke[] {
  const data = localStorage.getItem(STORAGE_KEYS.DRAWINGS);
  return data ? JSON.parse(data) : [];
}

export function saveStoredDrawings(strokes: DrawingStroke[]) {
  localStorage.setItem(STORAGE_KEYS.DRAWINGS, JSON.stringify(strokes));
}

export const defaultChecklist: ChecklistItem[] = [
  { id: 'chk-1', text: 'Study React hooks & state flow', completed: true, date: new Date().toISOString().split('T')[0] },
  { id: 'chk-2', text: 'Practice coding algorithms', completed: false, date: new Date().toISOString().split('T')[0] },
  { id: 'chk-3', text: 'Read documentation with tea', completed: false, date: new Date().toISOString().split('T')[0] }
];

export function getStoredChecklist(): ChecklistItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
  return data ? JSON.parse(data) : defaultChecklist;
}

export function saveStoredChecklist(items: ChecklistItem[]) {
  localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(items));
}

export function getStoredLighting(): RoomLighting {
  const data = localStorage.getItem(STORAGE_KEYS.LIGHTING);
  return (data as RoomLighting) || 'morning';
}

export function saveStoredLighting(lighting: RoomLighting) {
  localStorage.setItem(STORAGE_KEYS.LIGHTING, lighting);
}
