import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StickyNoteItem, NoteColor } from '../types';
import { Archive, Trash2, Edit3, Check, X, PenTool, Sparkles } from 'lucide-react';

interface StickyNoteProps {
  note: StickyNoteItem;
  onArchiveToJar: (note: StickyNoteItem) => void;
  onDelete: (id: string) => void;
  onUpdateContent: (id: string, content: string) => void;
}

const COLOR_STYLES: Record<NoteColor, { bg: string; border: string; text: string; pin: string }> = {
  yellow: {
    bg: 'bg-[#fff9c4]',
    border: 'border-amber-300/80',
    text: 'text-[#3e2a1e]',
    pin: 'bg-[#b71c1c]'
  },
  peach: {
    bg: 'bg-[#fce4ec]',
    border: 'border-pink-300/80',
    text: 'text-[#3e2a1e]',
    pin: 'bg-[#8d6e63]'
  },
  sage: {
    bg: 'bg-[#e8f5e9]',
    border: 'border-emerald-300/80',
    text: 'text-[#1b5e20]',
    pin: 'bg-[#2e7d32]'
  },
  lavender: {
    bg: 'bg-[#f3e5f5]',
    border: 'border-purple-300/80',
    text: 'text-[#4a148c]',
    pin: 'bg-[#6a1b9a]'
  },
  cream: {
    bg: 'bg-[#fffdfa]',
    border: 'border-[#d2b48c]',
    text: 'text-[#3e2a1e]',
    pin: 'bg-[#5d4037]'
  }
};

export const StickyNote: React.FC<StickyNoteProps> = ({
  note,
  onArchiveToJar,
  onDelete,
  onUpdateContent
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [isSavedFlash, setIsSavedFlash] = useState(false);
  const style = COLOR_STYLES[note.color] || COLOR_STYLES.yellow;

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdateContent(note.id, editContent.trim());
      setIsEditing(false);
      setIsSavedFlash(true);
      setTimeout(() => setIsSavedFlash(false), 1200);
    }
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotate: note.pinRotation }}
      exit={{ scale: 0.3, opacity: 0, y: 50 }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if (!isEditing) {
          setIsEditing(true);
        }
      }}
      className={`relative w-52 min-h-52 p-4 rounded-sm shadow-md ${style.bg} ${style.border} ${style.text} flex flex-col justify-between select-none group border cursor-pen transition-shadow hover:shadow-xl`}
      style={{
        boxShadow: '2px 6px 14px rgba(0,0,0,0.12), inset 0 0 10px rgba(0,0,0,0.03)'
      }}
    >
      {/* Physical Pin */}
      <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
        <div className={`w-3.5 h-3.5 rounded-full ${style.pin} shadow-md border border-white/80`} />
        <div className="w-0.5 h-1.5 bg-gray-500/60" />
      </div>

      {/* Writing Flash Feedback */}
      <AnimatePresence>
        {isSavedFlash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#5d4037] text-white text-[10px] font-serif flex items-center gap-1 z-20 shadow"
          >
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>Saved Intention</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Handwritten Content / Writing Mode */}
      <div className="mt-2 flex-1 flex flex-col justify-between">
        {isEditing ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col h-full gap-2 relative z-20"
          >
            <div className="flex items-center gap-1 text-[11px] font-serif italic text-[#8d6e63]">
              <PenTool className="w-3 h-3 text-[#5d4037]" />
              <span>Write your daily intention:</span>
            </div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="e.g. Today I will complete React hooks."
              className="w-full flex-1 p-2 bg-white/70 border border-[#d2b48c] rounded text-base font-handwriting leading-relaxed text-[#3e2a1e] resize-none focus:outline-none focus:ring-1 focus:ring-[#5d4037]"
              rows={4}
              autoFocus
            />
            <div className="flex items-center justify-end gap-1 pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                }}
                className="p-1 rounded bg-[#3e2a1e]/10 hover:bg-[#3e2a1e]/20 text-xs cursor-pointer"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="px-3 py-1 rounded bg-[#5d4037] text-[#fffdfa] hover:bg-[#3e2a1e] text-xs font-serif flex items-center gap-1 cursor-pointer shadow-sm"
                title="Save Intention"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-1">
            <p className="font-handwriting text-xl text-[#3e2a1e] leading-relaxed whitespace-pre-wrap break-words">
              "{note.content}"
            </p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {!isEditing && (
        <div className="mt-3 pt-2 border-t border-[#3e2a1e]/10 flex items-center justify-between text-[11px] font-serif opacity-80">
          <span className="text-[#8d6e63] italic">{note.date}</span>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1 rounded hover:bg-black/10 transition-colors cursor-pointer"
              title="Write/Edit Intention"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#5d4037]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="p-1 rounded hover:bg-red-500/20 text-red-800 transition-colors cursor-pointer"
              title="Remove note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArchiveToJar(note);
              }}
              className="px-2 py-0.5 rounded bg-[#5d4037] text-[#fffdfa] hover:bg-[#3e2a1e] transition-colors flex items-center gap-1 text-[10px] font-serif shadow-sm cursor-pointer"
              title="Save as paper slip in Jar"
            >
              <Archive className="w-2.5 h-2.5" />
              <span>To Jar</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

