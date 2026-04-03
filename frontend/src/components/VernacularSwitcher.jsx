import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, RefreshCw, Languages } from 'lucide-react';

export default function VernacularSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('Global Macro');

  const modes = [
    { id: 'global', name: 'Global Macro', description: 'Wall Street & Global Markets' },
    { id: 'india-t1', name: 'India Tier-1', description: 'BSE/NSE & Metros' },
    { id: 'india-t2', name: 'India Tier-2 (Hindi)', description: 'SME, Regional & Agri' },
  ];

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass-button px-4 py-2 flex items-center gap-3 hover:bg-white/10"
      >
        <Globe size={16} className="text-primary" />
        <div className="flex flex-col items-start pr-4">
          <span className="text-xs text-slate-400 leading-none mb-1">Context Mode</span>
          <span className="text-sm font-semibold leading-none">{activeMode}</span>
        </div>
        <RefreshCw size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180': ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-64 glass-panel border border-white/10 overflow-hidden"
          >
            <div className="p-3 bg-surface-highlight/50 border-b border-white/5 flex items-center gap-2">
              <Languages size={14} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-300">Select Intelligence Layer</span>
            </div>
            <div className="p-1">
              {modes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveMode(mode.name);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-md transition-colors ${
                    activeMode === mode.name ? 'bg-primary/20 bg-opacity-20' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`text-sm font-medium ${activeMode === mode.name ? 'text-primary' : 'text-slate-200'}`}>
                    {mode.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{mode.description}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
