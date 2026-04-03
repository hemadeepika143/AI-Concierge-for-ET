import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Network, FileText, Database, Share2, AlignLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10:00', value: 4000 },
  { name: '11:00', value: 3000 },
  { name: '12:00', value: 5000 },
  { name: '13:00', value: 2780 },
  { name: '14:00', value: 5890 },
  { name: '15:00', value: 7200 },
  { name: '16:00', value: 8900 },
];

export default function DeepDiveModal({ brief, onClose }) {
  if (!brief) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface w-full max-w-4xl h-[85vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-start bg-surface-highlight/30">
            <div>
              <div className="flex gap-2 items-center mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  brief.impact === 'Very High' ? 'bg-primary/20 text-primary border border-primary/30' : 
                  brief.impact === 'High' ? 'bg-accent/20 text-accent border border-accent/30' : 
                  'bg-success/20 text-success border border-success/30'
                }`}>
                  {brief.impact} IMPACT
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Network size={12}/> Synthesized from 14 sources</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{brief.title}</h2>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                <Share2 size={18} />
              </button>
              <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                 <X size={18} />
              </button>
            </div>
          </div>

          {/* Content Body Grid */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-3 gap-6">
            
            {/* Left Col - Core Intel */}
            <div className="col-span-2 space-y-6">
              <section className="bg-surface-highlight/40 rounded-xl p-5 border border-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                  <AlignLeft size={16} /> RAG Summary
                </h3>
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                  <p>
                    Analyzed real-time 10-K filings, sub-reddit sentiment, and 5 concurrent news streams. 
                    The move signifies a systemic shift in the operational architecture of the entity, driving expectations of a massive CapEx cycle.
                  </p>
                  <ul className="space-y-2">
                    {brief.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 items-start p-3 bg-black/20 rounded-lg">
                        <span className="text-primary mt-1 text-xs">■</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="bg-surface-highlight/40 rounded-xl p-5 border border-white/5 h-64">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-success mb-4 flex items-center gap-2">
                  <Database size={16} /> Intraday Predictive Model
                </h3>
                <div className="w-full h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F1218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>

            {/* Right Col - Metadata */}
            <div className="col-span-1 space-y-4">
              <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                <h4 className="text-xs uppercase text-slate-500 font-semibold mb-3">Sourced Documents</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <a key={i} href="#" className="flex gap-3 items-center p-2 rounded hover:bg-white/5 transition-colors group">
                      <FileText size={14} className="text-slate-500 group-hover:text-primary transition-colors" />
                      <span className="text-xs text-slate-300 group-hover:text-white truncate">Internal Doc {i} - Ticker Analysis</span>
                      <ExternalLink size={12} className="text-slate-600 ml-auto opacity-0 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <h4 className="text-xs uppercase text-primary font-semibold mb-2">Next Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-xs bg-primary/10 hover:bg-primary/20 text-slate-200 p-2 rounded transition-colors truncate">
                    Draft portfolio rebalance memo
                  </button>
                  <button className="w-full text-left text-xs bg-primary/10 hover:bg-primary/20 text-slate-200 p-2 rounded transition-colors truncate">
                    Set alert for +5% deviation
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
