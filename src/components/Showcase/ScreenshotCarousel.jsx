import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { buttonHover, buttonTap } from '../../lib/motion';

const screens = [
  {
    id: 'scoring',
    file: '/screenshots/scoring.png',
    title: 'Ball-by-Ball Live Scoring',
    tag: 'Live Pad',
    caption: 'Dedicated scoring pad with active batter strike rate, bowler figures, and delivery ribbon.',
  },
  {
    id: 'live',
    file: '/screenshots/live.png',
    title: 'Head-to-Head Comparison',
    tag: 'Comparison',
    caption: 'Side-by-side innings summary, boundaries breakdown, dot balls, and extras conceded.',
  },
  {
    id: 'scorecard',
    file: '/screenshots/scorecard.png',
    title: 'Over-by-Over Breakdown',
    tag: 'Overs Ledger',
    caption: 'Clear bar charts displaying runs per over, wicket deliveries, and current run rate (CRR).',
  },
  {
    id: 'poster',
    file: '/screenshots/poster.png',
    title: 'Interactive Match Analytics',
    tag: 'Worm & Momentum',
    caption: 'Dynamic Run Rate and Worm progression curves highlighting match momentum shifts.',
  },
  {
    id: 'home',
    file: '/screenshots/home.png',
    title: 'Team Squads & Player Status',
    tag: 'Roster & Lineups',
    caption: 'Real-time squad rosters, individual balls faced, batting order, and dismissal tracking.',
  },
];

export default function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* Desktop Navigation Arrows */}
      <div className="hidden md:flex justify-between items-center mb-8 px-2">
        <div className="flex items-center gap-2">
          <Badge variant="glass" className="py-1 px-3 text-xs">
            <Smartphone className="w-3.5 h-3.5 text-accent" />
            <span>Screen {activeIndex + 1} of {screens.length}</span>
          </Badge>
          <span className="text-sm font-semibold text-ink">
            {screens[activeIndex].title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="glass"
            size="icon"
            onClick={prevSlide}
            aria-label="Previous screenshot"
            className="rounded-2xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="glass"
            size="icon"
            onClick={nextSlide}
            aria-label="Next screenshot"
            className="rounded-2xl"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Swipeable Track on Mobile / Smooth Grid Showcase on Desktop */}
      <div className="overflow-x-auto pb-8 pt-2 hide-scrollbar flex gap-6 snap-x snap-mandatory focus:outline-none">
        {screens.map((item, idx) => {
          const isFeatured = idx === activeIndex;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.05 }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              onClick={() => setActiveIndex(idx)}
              className={`snap-center shrink-0 w-[260px] sm:w-[290px] flex flex-col justify-between rounded-3xl p-4 glass-card cursor-pointer transition-all duration-300 border ${
                isFeatured
                  ? 'border-accent ring-4 ring-accent/15 shadow-glass-hover bg-white'
                  : 'border-white/80 hover:border-secondary/60 opacity-90 hover:opacity-100'
              }`}
            >
              {/* Phone Frame wrapper with fixed aspect ratio to prevent CLS */}
              <div className="relative w-full aspect-[9/19] rounded-[28px] overflow-hidden bg-slate-900 border-[4px] border-slate-800 mb-4 flex items-center justify-center shadow-md">
                {/* Simulated Screen with Lazy Loading Image */}
                <img
                  src={item.file}
                  alt={item.title}
                  loading="lazy"
                  width="280"
                  height="590"
                  className="w-full h-full object-cover object-top select-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback Placeholder Frame */}
                <div className="hidden absolute inset-0 bg-surface/80 flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-xs text-ink">{item.title}</span>
                  <span className="text-xs text-muted mt-1 font-mono">public{item.file}</span>
                </div>
              </div>

              {/* Tag, Title & Caption */}
              <div className="space-y-1.5 text-center px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent block">
                  {item.tag}
                </span>
                <h3 className="font-display font-bold text-base text-ink line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed min-h-[40px] line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {screens.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all min-h-[24px] min-w-[24px] flex items-center justify-center cursor-pointer`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-8 bg-accent shadow-glow'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
