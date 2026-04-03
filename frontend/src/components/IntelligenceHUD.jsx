import React from 'react';
import { Target, TrendingUp, Zap, Server, Shield, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IntelligenceHUD() {
  const clusters = [
    { id: 1, name: 'Semiconductor Wars', sentiment: 'volatile', icon: <Zap size={16}/> },
    { id: 2, name: 'My Portfolio Impact', sentiment: 'positive', icon: <TrendingUp size={16}/> },
    { id: 3, name: 'AI Infrastructure', sentiment: 'positive', icon: <Server size={16}/> },
    { id: 4, name: 'Global Supply Chain', sentiment: 'negative', icon: <Shield size={16}/> },
  ];

  return (
    <div className="w-64 h-full glass-panel flex flex-col p-4 mr-4">
      <div className="flex items-center gap-2 mb-8">
        <BrainCircuit className="text-primary w-6 h-6" />
        <h2 className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">My ET</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold flex items-center gap-2">
          <Target size={14} /> Alpha Score
        </h3>
        <div className="bg-surface-highlight/50 rounded-lg p-4 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            <div className="text-3xl font-bold bg-gradient-to-br from-success to-emerald-300 bg-clip-text text-transparent">
              92.4
            </div>
            <div className="text-xs text-slate-400 mt-1">Outperforming market by +12%</div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
          Active Intelligence Clusters
        </h3>
        <div className="space-y-2">
          {clusters.map((cluster, i) => (
            <motion.div 
              key={cluster.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className={`p-1.5 rounded-md ${
                cluster.sentiment === 'positive' ? 'bg-success/20 text-success' : 
                cluster.sentiment === 'negative' ? 'bg-danger/20 text-danger' : 
                'bg-accent/20 text-accent'
              }`}>
                {cluster.icon}
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                {cluster.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto border-t border-white/10 pt-4">
        <button className="w-full glass-button py-2 px-4 text-sm font-medium flex justify-center items-center gap-2">
          <span>Sync Portfolio</span>
        </button>
      </div>
    </div>
  );
}
