import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StickyNoteItem, NoteColor, DrawingStroke, Chapter, ChecklistItem, MemoryItem } from '../types';
import { StickyNote } from './StickyNote';
import { DrawingCanvas } from './DrawingCanvas';
import {
  Plus,
  Edit2,
  Eraser,
  Trash2,
  Sparkles,
  Check,
  X,
  Square,
  CheckCircle2,
  PenTool,
  RefreshCw,
  Pin,
  ListChecks
} from 'lucide-react';

interface SoftBoardProps {
  chapter: Chapter;
  notes: StickyNoteItem[];
  checklist: ChecklistItem[];
  onToggleChecklist: (id: string) => void;
  onAddChecklistItem: (text: string) => void;
  onDeleteChecklistItem: (id: string) => void;
  onAddNote: (content: string, color: NoteColor) => void;
  onArchiveNote: (note: StickyNoteItem) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNoteContent: (id: string, content: string) => void;
  drawings: DrawingStroke[];
  onDrawingsChange: (strokes: DrawingStroke[]) => void;
  memories: MemoryItem[];
}

const COLOR_OPTIONS: { key: NoteColor; label: string; bg: string }[] = [
  { key: 'yellow', label: 'Honey Yellow', bg: 'bg-[#FEF08A]' },
  { key: 'peach', label: 'Warm Peach', bg: 'bg-[#FFEDD5]' },
  { key: 'sage', label: 'Sage Green', bg: 'bg-[#DCFCE7]' },
  { key: 'lavender', label: 'Soft Lavender', bg: 'bg-[#F3E8FF]' },
  { key: 'cream', label: 'Cream Paper', bg: 'bg-[#FAF6F0]' }
];

const MARKER_COLORS = [
  { color: '#3D2C23', name: 'Charcoal' },
  { color: '#9A3412', name: 'Warm Crimson' },
  { color: '#047857', name: 'Forest Green' },
  { color: '#1E3A8A', name: 'Deep Indigo' },
  { color: '#B45309', name: 'Amber Gold' }
];

export const SoftBoard: React.FC<SoftBoardProps> = ({
  chapter,
  notes,
  checklist,
  onToggleChecklist,
  onAddChecklistItem,
  onDeleteChecklistItem,
  onAddNote,
  onArchiveNote,
  onDeleteNote,
  onUpdateNoteContent,
  drawings,
  onDrawingsChange,
  memories
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedColor, setSelectedColor] = useState<NoteColor>('yellow');

  // Inline Checklist Task Adding on Mission Sticky Note
  const [newChecklistText, setNewChecklistText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Drawing Tools State
  const [activeTool, setActiveTool] = useState<'none' | 'marker' | 'duster'>('none');
  const [markerColor, setMarkerColor] = useState(MARKER_COLORS[0].color);
  const [markerWidth, setMarkerWidth] = useState(4);

  // AI Thought State
  const [aiThought, setAiThought] = useState<string>(
    "Small progress repeated daily creates big changes."
  );
  const [isLoadingThought, setIsLoadingThought] = useState<boolean>(false);

  const fetchAiThought = async () => {
    setIsLoadingThought(true);
    try {
      const recentNotes = notes.slice(-3).map((n) => n.content);
      const res = await fetch('/api/gemini/thought', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterTitle: chapter.title,
          intention: chapter.intention,
          totalMemories: memories.length,
          recentNotes
        })
      });

      const data = await res.json();
      if (data && data.thought) {
        setAiThought(data.thought);
      }
    } catch (err) {
      setAiThought("Small progress repeated daily creates big changes.");
    } finally {
      setIsLoadingThought(false);
    }
  };

  useEffect(() => {
    fetchAiThought();
  }, [chapter.id, memories.length]);

  const handleCreateNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    onAddNote(newNoteContent.trim(), selectedColor);
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const handleAddChecklistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    onAddChecklistItem(newChecklistText.trim());
    setNewChecklistText('');
    setIsAddingTask(false);
  };

  const completedChecklistCount = checklist.filter((item) => item.completed).length;

  return (
    <div className="relative w-full rounded-3xl p-4 md:p-6 shadow-2xl border-8 border-[#5C3A21] bg-[#C29B72] overflow-hidden selection:bg-amber-200">
      {/* Physical Cork Texture Overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#4A3018 1px, transparent 0)`,
          backgroundSize: '12px 12px'
        }}
      />

      {/* Outer Wooden Board Frame Bevel */}
      <div className="absolute inset-0 border-4 border-[#3D2513]/60 rounded-2xl pointer-events-none shadow-inner" />

      {/* Board Header: Journey Plaque & Pin Actions */}
      <div className="relative z-30 flex flex-wrap items-center justify-between mb-6 px-2 gap-3">
        {/* Journey Wooden Plaque Pinned at Top */}
        <div className="flex items-center gap-3 bg-[#4A3222] text-[#F5EFEB] px-4 py-2 rounded-2xl shadow-lg border-2 border-[#7A5638] relative">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-inner absolute -top-1.5 left-4 border border-[#3D2513]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-inner absolute -top-1.5 right-4 border border-[#3D2513]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm md:text-base tracking-wide text-amber-100">
                "{chapter.title}"
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-200/20 text-amber-200 text-[10px] font-serif font-semibold border border-amber-300/30">
                Day {memories.length + 1}
              </span>
            </div>
            <p className="text-[11px] font-serif italic text-amber-200/70">
              {chapter.intention ? `"${chapter.intention}"` : "Daily Mission & Effort Board"}
            </p>
          </div>
        </div>

        {/* Action Button: Pin Sticky Note */}
        <button
          onClick={() => setIsAddingNote(true)}
          className="px-4 py-2 rounded-full bg-[#4A3222] hover:bg-[#2F1F15] text-[#FAF6F0] text-xs font-serif font-medium shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 border border-[#7A5638]"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Pin Sticky Note</span>
        </button>
      </div>

      {/* Sticky Notes & Daily Checklist Area */}
      <div className="relative z-10 min-h-[380px] md:min-h-[440px] p-2 md:p-4 flex flex-wrap items-start justify-center gap-6">
        
        {/* HERO STICKY NOTE: "Today's Mission" Daily Checklist */}
        <motion.div
          layout
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: -1.5 }}
          whileHover={{ scale: 1.02, rotate: 0, zIndex: 30 }}
          className="relative w-72 md:w-80 p-5 rounded-sm bg-[#fff9c4] border border-amber-300/80 text-[#3e2a1e] shadow-xl flex flex-col justify-between select-none group transition-shadow"
          style={{
            boxShadow: '3px 8px 20px rgba(0,0,0,0.18), inset 0 0 12px rgba(0,0,0,0.03)'
          }}
        >
          {/* Physical Red Pin */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-[#b71c1c] shadow-md border border-white/90" />
            <div className="w-0.5 h-2 bg-gray-600/60" />
          </div>

          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3e2a1e]/15">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-[#8d6e63]" />
                <h3 className="font-serif font-bold text-base text-[#3e2a1e] tracking-wide">
                  Today's Mission
                </h3>
              </div>
              <span className="text-[11px] font-serif italic text-[#8d6e63]">
                {completedChecklistCount}/{checklist.length} completed
              </span>
            </div>

            {/* Handwritten Checklist Items */}
            <div className="space-y-2 py-1 min-h-[140px]">
              {checklist.length === 0 ? (
                <div className="py-6 text-center font-serif italic text-xs text-[#8d6e63]">
                  No mission tasks pinned yet. Add your first step below.
                </div>
              ) : (
                checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-2 p-1.5 rounded hover:bg-black/5 transition-colors group/item"
                  >
                    <button
                      onClick={() => onToggleChecklist(item.id)}
                      className="flex items-start gap-2 text-left flex-1 cursor-pointer select-none"
                      title={item.completed ? "Mark incomplete" : "Check off item (flies to Jar!)"}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-[#8d6e63] shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm font-serif leading-snug text-[#3e2a1e] transition-all ${
                          item.completed
                            ? 'line-through opacity-60 italic text-[#8d6e63]'
                            : 'font-medium'
                        }`}
                      >
                        {item.text}
                      </span>
                    </button>

                    <button
                      onClick={() => onDeleteChecklistItem(item.id)}
                      className="opacity-0 group-hover/item:opacity-100 p-0.5 text-red-800/60 hover:text-red-800 cursor-pointer transition-opacity"
                      title="Remove task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Add Task Form */}
          <div className="mt-3 pt-2 border-t border-[#3e2a1e]/15">
            {isAddingTask ? (
              <form onSubmit={handleAddChecklistSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  placeholder="e.g. Solve 5 DSA Problems..."
                  className="flex-1 px-2.5 py-1 bg-white/80 border border-[#d2b48c] rounded text-xs font-serif text-[#3e2a1e] focus:outline-none focus:ring-1 focus:ring-[#5d4037]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-[#5d4037] text-white text-xs font-serif shadow cursor-pointer"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="p-1 rounded text-[#8d6e63] hover:text-[#3e2a1e] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingTask(true)}
                className="w-full py-1 text-xs font-serif italic text-[#8d6e63] hover:text-[#3e2a1e] flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add new task line...</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* ADDITIONAL PINNED USER STICKY NOTES */}
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onArchiveToJar={onArchiveNote}
            onDelete={onDeleteNote}
            onUpdateContent={onUpdateNoteContent}
          />
        ))}
      </div>

      {/* AI THOUGHT NOTE (Pinned Paper Note at Bottom of Board) */}
      <div className="relative z-20 mt-4 mb-2 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-4 rounded-lg bg-[#FAF6F0] border border-[#d2b48c] shadow-lg text-[#3e2a1e] font-serif"
          style={{
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
          }}
        >
          {/* Physical Brass Pin */}
          <div className="absolute -top-2.5 left-6 w-3 h-3 rounded-full bg-amber-600 shadow border border-amber-200" />

          <div className="flex items-center justify-between mb-1.5 border-b border-[#e9e1d6] pb-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5d4037]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Companion Thought</span>
            </div>

            <button
              onClick={fetchAiThought}
              disabled={isLoadingThought}
              className="p-1 rounded hover:bg-black/5 text-[#8d6e63] transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh reflection"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingThought ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <p className="text-xs md:text-sm italic leading-relaxed text-[#2D1F17]">
            "{aiThought}"
          </p>
        </motion.div>
      </div>

      {/* Freehand Canvas Drawing Overlay for Marker / Duster */}
      <DrawingCanvas
        tool={activeTool}
        markerColor={markerColor}
        markerWidth={markerWidth}
        strokes={drawings}
        onStrokesChange={onDrawingsChange}
      />

      {/* Physical Bottom Wood Shelf for Marker & Duster */}
      <div className="relative z-30 mt-4 inset-x-0 h-16 bg-[#5C3A21] rounded-b-2xl border-t-4 border-[#3D2513] shadow-lg flex items-center justify-between px-4 sm:px-8">
        {/* Left: Tool Selection */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTool('none')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'none'
                ? 'bg-[#FAF6F0] text-[#3D2C23] shadow-md font-semibold'
                : 'text-[#EFE6DD] hover:bg-white/10'
            }`}
          >
            <span>Arrange Notes</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'marker' ? 'none' : 'marker')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'marker'
                ? 'bg-amber-100 text-amber-950 shadow-md font-semibold ring-2 ring-amber-400'
                : 'text-[#EFE6DD] hover:bg-white/10'
            }`}
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Marker</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'duster' ? 'none' : 'duster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'duster'
                ? 'bg-orange-100 text-orange-950 shadow-md font-semibold ring-2 ring-orange-400'
                : 'text-[#EFE6DD] hover:bg-white/10'
            }`}
          >
            <Eraser className="w-3.5 h-3.5 text-orange-600" />
            <span>Felt Duster</span>
          </button>
        </div>

        {/* Center: Marker Color Palette */}
        {activeTool === 'marker' && (
          <div className="hidden sm:flex items-center gap-1.5 bg-black/20 p-1 rounded-xl">
            {MARKER_COLORS.map((mc) => (
              <button
                key={mc.color}
                onClick={() => setMarkerColor(mc.color)}
                style={{ backgroundColor: mc.color }}
                className={`w-5 h-5 rounded-full border border-white/40 transition-transform cursor-pointer ${
                  markerColor === mc.color ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                }`}
                title={mc.name}
              />
            ))}
            <div className="w-px h-4 bg-white/20 mx-1" />
            <button
              onClick={() => setMarkerWidth(markerWidth === 3 ? 6 : 3)}
              className="text-[10px] text-amber-100 px-1 font-mono hover:underline cursor-pointer"
            >
              {markerWidth === 3 ? 'Fine Tip' : 'Thick Tip'}
            </button>
          </div>
        )}

        {/* Right: Clear Drawings Button */}
        {drawings.length > 0 && (
          <button
            onClick={() => onDrawingsChange([])}
            className="px-2.5 py-1 rounded bg-black/30 hover:bg-black/50 text-red-200 text-[11px] font-serif transition-colors flex items-center gap-1 cursor-pointer"
            title="Clear all marker sketches"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Clean Sketches</span>
          </button>
        )}
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAddingNote && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FAF6F0] border border-[#EFE6DD] rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-lg text-[#2D1F17]">
                  Pin New Sticky Note
                </h3>
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="p-1 rounded hover:bg-black/10 text-[#674D3C] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateNoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#674D3C] mb-1 font-semibold">
                    Sticky Note Content
                  </label>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    rows={4}
                    placeholder="Write your daily effort, milestone, or reflection..."
                    className="w-full p-3 rounded-xl bg-white border border-[#EFE6DD] text-sm font-serif text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#8C6D53]/40 shadow-inner resize-none"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#674D3C] mb-2 font-semibold">
                    Paper Color
                  </label>
                  <div className="flex items-center gap-2">
                    {COLOR_OPTIONS.map((co) => (
                      <button
                        type="button"
                        key={co.key}
                        onClick={() => setSelectedColor(co.key)}
                        className={`w-8 h-8 rounded-lg ${co.bg} border border-black/10 transition-transform flex items-center justify-center cursor-pointer ${
                          selectedColor === co.key ? 'scale-110 ring-2 ring-[#674D3C]' : 'hover:scale-105'
                        }`}
                        title={co.label}
                      >
                        {selectedColor === co.key && <Check className="w-4 h-4 text-black/70" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-4 py-2 rounded-xl border border-[#EFE6DD] text-xs font-serif text-[#674D3C] hover:bg-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#674D3C] hover:bg-[#4A3525] text-[#FAF6F0] text-xs font-serif font-medium shadow-md cursor-pointer"
                  >
                    Pin Note
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
