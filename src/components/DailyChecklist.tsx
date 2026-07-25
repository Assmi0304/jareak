import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChecklistItem } from '../types';
import { CheckSquare, Square, Plus, Trash2, CheckCircle2, ListChecks } from 'lucide-react';

interface DailyChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string) => void;
  onDeleteItem: (id: string) => void;
}

export const DailyChecklist: React.FC<DailyChecklistProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem
}) => {
  const [newText, setNewText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    onAddItem(newText.trim());
    setNewText('');
  };

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full p-4 rounded-2xl bg-[#fffdfa]/90 backdrop-blur-md border border-[#d2b48c]/40 shadow-lg text-[#3e2a1e] font-sans selection:bg-amber-200"
    >
      {/* Paper texture background */}
      <div className="absolute inset-0 bg-radial from-amber-50/30 to-transparent rounded-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-2 mb-3 border-b border-[#e9e1d6]">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-[#5d4037]/10 text-[#5d4037]">
            <ListChecks className="w-4 h-4 text-[#5d4037]" />
          </div>
          <span className="font-serif font-semibold text-sm tracking-wide text-[#3e2a1e]">
            Daily Focus Steps
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-serif italic text-[#8d6e63]">
            {completedCount}/{items.length} done
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-[#8d6e63] hover:text-[#3e2a1e] font-serif underline cursor-pointer"
          >
            {isExpanded ? 'Minimize' : 'Expand'}
          </button>
        </div>
      </div>

      {/* List Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 space-y-2"
          >
            {/* Checklist Items */}
            {items.length === 0 ? (
              <p className="text-xs font-serif italic text-[#8d6e63] py-2 text-center">
                No items yet. Add a small step for today.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f2ed]/80 transition-colors border border-transparent hover:border-[#e9e1d6]"
                  >
                    <button
                      onClick={() => onToggleItem(item.id)}
                      className="flex items-center gap-2.5 text-left flex-1 cursor-pointer select-none"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#8d6e63] shrink-0" />
                      )}
                      <span
                        className={`text-xs font-serif text-[#3e2a1e] transition-all ${
                          item.completed
                            ? 'line-through opacity-50 italic text-[#8d6e63]'
                            : 'font-medium'
                        }`}
                      >
                        {item.text}
                      </span>
                    </button>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-800/70 hover:text-red-800 transition-opacity cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick Add Form */}
            <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="e.g. Practice coding 30 mins..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#e9e1d6] text-xs font-serif text-[#3e2a1e] focus:outline-none focus:ring-1 focus:ring-[#8d6e63]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-[#5d4037] hover:bg-[#3e2a1e] text-[#f5f2ed] text-xs font-serif flex items-center gap-1 shadow-sm cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
