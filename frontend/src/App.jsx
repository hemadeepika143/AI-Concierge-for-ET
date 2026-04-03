import React, { useState } from 'react';
import IntelligenceHUD from './components/IntelligenceHUD';
import VernacularSwitcher from './components/VernacularSwitcher';
import NewsNavigator from './components/NewsNavigator';
import StoryArcVisualizer from './components/StoryArcVisualizer';
import DeepDiveModal from './components/DeepDiveModal';
import VideoStudioPlayer from './components/VideoStudioPlayer';
import { Search, Bell, Menu } from 'lucide-react';

export default function App() {
  const [selectedBrief, setSelectedBrief] = useState(null);

  const handleDeepDive = (brief) => {
    setSelectedBrief(brief);
  };

  const closeDeepDive = () => {
    setSelectedBrief(null);
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 flex overflow-hidden font-sans">
      {/* Background ambient gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-radial from-slate-900 via-background to-background pointer-events-none"></div>

      <div className="flex w-full h-screen p-4 max-w-[1600px] mx-auto z-10">
        
        {/* Left Sidebar: Intelligence HUD */}
        <IntelligenceHUD />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden ml-2">
          
          {/* Top Navigation / Command Bar */}
          <header className="glass-panel px-6 py-3 mb-4 flex justify-between items-center rounded-2xl">
            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="font-bold text-white tracking-widest text-xs">ET</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">ET-Quantum <span className="text-slate-500 font-mono text-xs ml-1 bg-white/5 px-2 py-0.5 rounded">2026</span></h1>
            </div>
            
            <div className="flex-1 max-w-xl mx-8 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
               <input 
                 type="text" 
                 placeholder="Search entities, sectors, or ask AI..." 
                 className="w-full bg-black/40 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-sm rounded-xl py-2 pl-10 pr-4 outline-none transition-all placeholder:text-slate-600 shadow-inner"
               />
               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 border border-white/10 px-1 rounded flex gap-1">
                 <kbd>⌘</kbd> <kbd>K</kbd>
               </span>
            </div>

            <div className="flex items-center gap-6">
              <VernacularSwitcher />
              
              <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-surface animate-pulse"></span>
                </button>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-accent to-purple-600 p-[2px] cursor-pointer">
                  <div className="w-full h-full rounded-full bg-surface border-[2px] border-surface flex items-center justify-center text-xs font-bold">
                    ME
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Workspace Layout */}
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
             <StoryArcVisualizer />
             
             <div className="mt-4 flex-1 overflow-hidden relative">
               <NewsNavigator onDeepDive={handleDeepDive} />
             </div>
          </main>
        </div>
      </div>

      {/* Floating Elements */}
      <VideoStudioPlayer />
      
      {/* Overlays */}
      {selectedBrief && (
        <DeepDiveModal brief={selectedBrief} onClose={closeDeepDive} />
      )}

    </div>
  );
}
