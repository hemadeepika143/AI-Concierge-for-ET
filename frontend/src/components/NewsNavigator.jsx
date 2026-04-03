import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, ChevronRight, PieChart, Activity } from 'lucide-react';

export default function NewsNavigator({ onDeepDive }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const briefs = [
    {
      id: 1,
      title: 'Reliance Retail Acquisition Splurge',
      category: 'M&A',
      impact: 'High',
      bullets: [
        'Acquiring 3 supply chain startups to fortify quick-commerce.',
        'Projected to cut delivery costs by 18% in Q3.',
        'Competitor margin compression expected within 6 months.'
      ],
      colSpan: 'col-span-2',
      rowSpan: 'row-span-2',
    },
    {
      id: 2,
      title: 'RBI Pauses Rate Hike Cycle',
      category: 'Macro',
      impact: 'Medium',
      bullets: [
        'Repo rate held steady at 6.5%.',
        'Inflation forecast revised downward to 4.8%.',
        'Auto and Realty sectors show immediate intraday spikes.'
      ],
      colSpan: 'col-span-1',
      rowSpan: 'row-span-1',
    },
    {
      id: 3,
      title: 'Tata Dips Into Semiconductor Fab',
      category: 'Tech/CapEx',
      impact: 'Very High',
      bullets: [
        '$14B foundry announced in Gujarat.',
        'Partnership locked with Taiwanese major.',
        'Strategic pivot to cut China reliance by 2028.'
      ],
      colSpan: 'col-span-1',
      rowSpan: 'row-span-2',
    },
    {
      id: 4,
      title: 'EV Subsidy Phase-Out',
      category: 'Policy',
      impact: 'Medium',
      bullets: [
        'FAME III allocations significantly reduced.',
        'Two-wheeler EV makers brace for 10-15% price hikes.'
      ],
      colSpan: 'col-span-2',
      rowSpan: 'row-span-1',
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto pr-2 pb-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Synthesized Briefs
          </h2>
          <p className="text-sm text-slate-500 mt-1">Real-time Alpha Generation Engine</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 glass-panel px-3 py-1">
          <Activity size={14} className="text-success animate-pulse" />
          <span>Live Feed Active</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        {briefs.map((brief, idx) => (
          <motion.div
            key={brief.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => setHoveredCard(brief.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onDeepDive(brief)}
            className={`glass-panel p-5 cursor-pointer relative overflow-hidden group flex flex-col justify-between ${brief.colSpan} ${brief.rowSpan}`}
          >
            {/* Background Glow */}
            <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none 
              ${brief.impact === 'Very High' ? 'bg-primary' : brief.impact === 'High' ? 'bg-accent' : 'bg-success'}`} 
            />

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                  {brief.category}
                </span>
                <PieChart size={16} className="text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold leading-tight mb-4 group-hover:text-primary transition-colors">
                {brief.title}
              </h3>
              
              <ul className="space-y-2 mb-4 relative z-10">
                {brief.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-primary mt-1 text-[10px]">■</span>
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`mt-auto transition-all duration-300 ${hoveredCard === brief.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                <Sparkles size={16} className="text-accent" />
                <input 
                  type="text" 
                  placeholder="Ask AI about this..." 
                  className="bg-transparent border-none text-sm outline-none w-full text-slate-200 placeholder:text-slate-600 focus:ring-0"
                />
                <button className="p-1 hover:bg-white/10 rounded">
                  <MessageSquare size={16} className="text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className={`absolute bottom-4 right-4 transition-all duration-300 ${hoveredCard === brief.id ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
               <ChevronRight size={20} className="text-slate-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
