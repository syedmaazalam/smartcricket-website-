import React from 'react';
import { Download, ArrowDownToLine, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { buttonHover, buttonTap } from '../lib/motion';

export default function Home() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero section anchor placeholder */}
      <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto py-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Offline-First Cricket Scoring for Android
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6">
          Score matches anywhere. <br />
          <span className="text-accent">Broadcast live in real time.</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          The international-standard cricket scoring engine built for local clubs, street matches, and community tournaments. 100% offline-ready with instant spectator streaming.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a
            id="download"
            href="#install"
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-accent text-white font-semibold text-base shadow-lift hover:bg-accent-hover transition-all"
          >
            <span>Download APK (Free)</span>
            <ArrowDownToLine className="w-5 h-5" />
          </motion.a>
          <span className="text-xs text-muted flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-secondary" />
            Android 7.0+ • Version 1.0 (Nov 2026)
          </span>
        </div>
      </section>

      {/* Placeholders for upcoming sections */}
      <div id="features" className="py-12" />
      <div id="showcase" className="py-12" />
      <div id="install" className="py-12" />
      <div id="faq" className="py-12" />
    </div>
  );
}
