import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Battery, Zap, FileText, LayoutGrid, Users, Settings, User } from 'lucide-react';
import ScoreTicker from './ScoreTicker';
import OverRibbon from './OverRibbon';

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto flex justify-center items-center py-4">
      {/* Gentle Floating Wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-[300px] sm:w-[330px] rounded-[44px] p-3 bg-white border-[6px] border-slate-800 shadow-2xl select-none"
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full z-20 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 border border-slate-700/50" />
        </div>

        {/* Screen Bezel */}
        <div className="w-full bg-[#F1F6FF] rounded-[36px] overflow-hidden p-3.5 pt-7 text-ink flex flex-col justify-between font-sans shadow-inner min-h-[580px]">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted px-2 mb-2">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-ink" />
              <Battery className="w-3.5 h-3.5 text-ink" />
            </div>
          </div>

          {/* Live Indicator Pill */}
          <div className="flex items-center justify-between px-1 mb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE SCORING</span>
            </div>
            <span className="text-[11px] font-mono text-muted">#ALPHA1</span>
          </div>

          {/* Main Scorecard Card */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-border/80 mb-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-1">
              <span>TEAM ALPHA • INNINGS 1</span>
              <span className="text-accent font-bold">VS TEAM BRAVO</span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <ScoreTicker />
              <div className="text-right">
                <span className="font-mono text-xl font-bold text-amber-500">0.2</span>
                <span className="font-mono text-xs text-muted"> / 20 ov</span>
              </div>
            </div>
            <div className="w-full bg-surface/60 rounded-full h-1.5 overflow-hidden mb-2">
              <div className="bg-emerald-500 h-full w-[25%]" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted font-medium pt-1 border-t border-border/50">
              <span>CRR: <strong className="text-ink font-mono">18.0</strong></span>
              <span>Projected: <strong className="text-ink font-mono">360</strong></span>
            </div>
          </div>

          {/* Batters Card */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-border/80 mb-2.5 space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-muted border-b border-border/50 pb-1">
              <span>Batter</span>
              <div className="flex gap-2.5 text-right font-mono">
                <span className="w-4">R</span>
                <span className="w-4">B</span>
                <span className="w-4">4s</span>
                <span className="w-4">6s</span>
                <span className="w-8">SR</span>
              </div>
            </div>
            {/* Striker */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-ink">
                <User className="w-3.5 h-3.5 text-accent" />
                <span>Maaz</span>
                <span className="text-accent font-bold">*</span>
              </div>
              <div className="flex gap-2.5 text-right font-mono text-xs">
                <span className="w-4 font-bold text-ink">6</span>
                <span className="w-4 text-muted">1</span>
                <span className="w-4 text-muted">0</span>
                <span className="w-4 text-accent font-bold">1</span>
                <span className="w-8 text-ink">600</span>
              </div>
            </div>
            {/* Non-Striker */}
            <div className="flex items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Hassan</span>
              </div>
              <div className="flex gap-2.5 text-right font-mono text-xs">
                <span className="w-4">0</span>
                <span className="w-4">0</span>
                <span className="w-4">0</span>
                <span className="w-4">0</span>
                <span className="w-8">0</span>
              </div>
            </div>
          </div>

          {/* Current Bowler Card */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-border/80 mb-2.5">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-muted border-b border-border/50 pb-1 mb-1.5">
              <span>Bowler</span>
              <div className="flex gap-2.5 text-right font-mono">
                <span className="w-5">O</span>
                <span className="w-5">M</span>
                <span className="w-5">R</span>
                <span className="w-5">W</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-accent">Abdullah</span>
              <div className="flex gap-2.5 text-right font-mono text-xs">
                <span className="w-5">0.2</span>
                <span className="w-5">0</span>
                <span className="w-5">6</span>
                <span className="w-5 font-bold text-red-500">1</span>
              </div>
            </div>
          </div>

          {/* Recent Deliveries */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-border/80 mb-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-1">
              <span>Recent Deliveries</span>
              <span className="text-[10px] text-muted font-mono">2 balls</span>
            </div>
            <OverRibbon />
          </div>

          {/* Bottom App Nav Bar */}
          <div className="pt-2 px-1 border-t border-border/60 flex items-center justify-around text-muted">
            <div className="flex flex-col items-center gap-0.5 text-accent font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-[9px]">Score</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[9px]">Scorecard</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[9px]">More</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[9px]">Teams</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Settings className="w-3.5 h-3.5" />
              <span className="text-[9px]">Settings</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
