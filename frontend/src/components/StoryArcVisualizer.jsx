import React from 'react';
import { GitCommit, GitPullRequest, GitMerge, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StoryArcVisualizer() {
  const arcNodes = [
    { type: 'Pivot', date: 'T-2 Days', title: 'Nvidia CapEx Shift', icon: <GitCommit size={14}/>, color: 'text-primary' },
    { type: 'Sentiment', date: 'Yesterday', title: 'Asian Markets React', icon: <GitPullRequest size={14}/>, color: 'text-danger' },
    { type: 'Current', date: 'Live', title: 'Tata Fab Announcement', icon: <GitMerge size={14}/>, color: 'text-success' },
    { type: 'Prediction', date: 'Q3 \'26', title: 'Local Margin Compression', icon: <BrainCircuit size={14}/>, color: 'text-accent' },
  ];

  return (
    <div className="glass-panel p-5 mt-4 group hover:ring-1 hover:ring-white/10 transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Story Arc Visualizer</h3>
        <span className="text-xs font-mono text-slate-500 bg-black/50 px-2 py-1 rounded">Semiconductor Supercycle</span>
      </div>

      <div className="relative flex items-center justify-between mx-4 pt-2">
        {/* Horizontal Line Connecting Nodes */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-[calc(50%+14px)] h-0.5 bg-gradient-to-r from-primary/50 via-success/50 to-accent/50 rounded-full z-0 opacity-50"></div>
        
        {arcNodes.map((node, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center relative z-10 w-24 text-center group/node cursor-pointer"
          >
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 transition-colors ${i === 2 ? 'text-white' : 'text-slate-500 group-hover/node:text-slate-300'}`}>
              {node.type}
            </div>
            
            <div className={`w-8 h-8 rounded-full bg-surface border-2 border-surface-highlight flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform group-hover/node:scale-110 
              ${i === 2 ? 'ring-2 ring-success ring-offset-2 ring-offset-surface' : ''} ${node.color}`}>
              {node.icon}
            </div>
            
            <div className={`text-xs font-medium leading-tight line-clamp-2 ${i === 2 ? 'text-white' : 'text-slate-400 group-hover/node:text-slate-200'} transition-colors`}>
              {node.title}
            </div>
            <div className="text-[10px] text-primary/70 mt-1 font-mono">{node.date}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
