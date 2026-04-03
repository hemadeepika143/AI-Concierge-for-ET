import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Maximize2, FileVideo, Captions } from 'lucide-react';

export default function VideoStudioPlayer() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-primary/50 shadow-lg hover:scale-110 transition-transform z-50 text-white"
      >
        <FileVideo size={24} />
      </motion.button>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-6 right-6 w-[280px] h-[498px] rounded-2xl overflow-hidden shadow-2xl z-50 group border border-white/20 bg-black flex flex-col justify-end"
    >
      {/* Mock 9:16 Video Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-950">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
        {/* Animated grid overlay to look like data parsing */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="bg-danger text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          AI Short Gen
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full bg-black/50 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Animated Captions Area */}
      <div className="relative z-20 p-6 pb-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
          className="text-2xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md text-center"
        >
          <span className="text-primary">Tata's $14B</span> Fab 
          <br/>Changes Everything
        </motion.div>
        <div className="mt-4 flex justify-center gap-2">
           <Captions size={14} className="text-slate-400" />
           <span className="text-xs text-slate-300 font-medium">Auto-Captions Synced</span>
        </div>
      </div>

      {/* Play Controls & Progress */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-primary/90 text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-md flex-shrink-0"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
          
          <div className="flex-1 h-1 tracking-wider bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={isPlaying ? { width: '100%' } : { width: '45%' }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            />
          </div>
          
          <button className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors flex-shrink-0">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
