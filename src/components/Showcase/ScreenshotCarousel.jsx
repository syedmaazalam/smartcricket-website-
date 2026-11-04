import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { buttonHover, buttonTap } from '../../lib/motion';

const screens = [
  {
    id: 'scoring',
    file: '/screenshots/scoring.png',
    title: 'Ball-by-Ball Scoring',
    caption: 'Dedicated run keypad with one-tap extras, dismissal wizard, and live over ribbon.',
  },
  {
    id: 'live',
    file: '/screenshots/live.png',
    title: 'Instant Spectator Streaming',
    caption: 'Fans view real-time scores, CRR, and over commentary on any browser without login.',
  },
  {
    id: 'scorecard',
    file: '/screenshots/scorecard.png',
    title: 'In-Depth Scorecards & Charts',
    caption: 'Full batting/bowling ledgers, Worm score progression curves, and Run Rate charts.',
  },
  {
    id: 'poster',
    file: '/screenshots/poster.png',
    title: 'Broadcast-Quality Posters',
    caption: 'One-tap 1080p and 1920p summary graphic with team crests and balanced 2×2 stats.',
  },
  {
    id: 'home',
    file: '/screenshots/home.png',
    title: 'Fast Match Setup',
    caption: 'Configure overs, custom squads, toss decisions, and unique 6-character match codes.',
  },
];

export default function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* Desktop Navigation Arrows */}
      <div className="hidden md:flex justify-end items-center gap-3 mb-6">
        <motion.button
          type="button"
          onClick={prevSlide}
          whileHover={buttonHover}
          whileTap={buttonTap}
          className="p-3 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-border text-ink hover:border-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          type="button"
          onClick={nextSlide}
          whileHover={buttonHover}
          whileTap={buttonTap}
          className="p-3 min-h-[44px] min-w-[44px] rounded-xl bg-white border border-border text-ink hover:border-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Next screenshot"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Swipeable Track on Mobile / Smooth Grid Showcase on Desktop */}
      <div className="overflow-x-auto pb-6 pt-2 hide-scrollbar flex gap-6 snap-x snap-mandatory focus:outline-none">
        {screens.map((item, idx) => {
          const isFeatured = idx === activeIndex;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`snap-center shrink-0 w-[260px] sm:w-[290px] flex flex-col justify-between rounded-3xl p-4 bg-white border transition-all duration-300 ${
                isFeatured
                  ? 'border-accent shadow-lift ring-2 ring-accent/10'
                  : 'border-border hover:border-secondary'
              }`}
            >
              {/* Phone Frame wrapper with fixed aspect ratio to prevent CLS */}
              <div className="relative w-full aspect-[9/19] rounded-[28px] overflow-hidden bg-slate-900 border-[4px] border-slate-800 mb-4 flex items-center justify-center">
                {/* Simulated Screen with Lazy Loading Image */}
                <img
                  src={item.file}
                  alt={item.title}
                  loading="lazy"
                  width="280"
                  height="590"
                  className="w-full h-full object-cover object-top select-none"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
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
                  <span className="text-[10px] text-muted mt-1 font-mono">public{item.file}</span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="space-y-1.5 text-center px-1">
                <h3 className="font-display font-bold text-base text-ink">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed min-h-[36px]">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dots on Mobile */}
      <div className="flex md:hidden justify-center items-center gap-2 mt-4">
        {screens.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all min-h-[20px] min-w-[20px] flex items-center justify-center ${
              idx === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-slate-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span className="sr-only">Slide {idx + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
