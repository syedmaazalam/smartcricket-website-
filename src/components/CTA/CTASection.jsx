import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownToLine, Smartphone, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import QrCodeModal from '../ui/QrCodeModal';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function CTASection({ releaseData, loading, onDownload }) {
  const shouldReduceMotion = useReducedMotion();
  const [isDownloading, setIsDownloading] = useState(false);
  const version = releaseData?.versionName || '1.3';
  const fileSize = releaseData?.fileSize || '5.6 MB';
  const apkUrl = releaseData?.apkUrl;

  const handleDownloadClick = async (e) => {
    setIsDownloading(true);
    try {
      if (onDownload) {
        await onDownload(e);
      }
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-accent/20 via-sky-300/30 to-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card rounded-[36px] p-8 sm:p-16 border border-white/90 shadow-2xl relative overflow-hidden space-y-6"
        >
          {/* Subtle Ambient Radial Highlight inside card */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo Badge */}
          <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto shadow-lift border-2 border-white/90 bg-white p-1">
            <img src="/logo.png" alt="SmartCricket Logo" className="w-full h-full object-cover rounded-2xl" />
          </div>

          <div className="inline-flex">
            <Badge variant="live" className="py-1 px-3 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Release v{version}</span>
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight max-w-3xl mx-auto leading-tight">
            Upgrade your scoring today.
          </h2>

          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans">
            Download the free APK now. Score games completely offline, stream live to spectators, and export broadcast-quality scorecards in seconds.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="relative w-full sm:w-auto">
              {!shouldReduceMotion && (
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1.45],
                    opacity: [0.45, 0.2, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 rounded-2xl bg-accent -z-10 pointer-events-none"
                />
              )}

              <Button
                asChild
                variant="glow"
                size="lg"
                className="w-full sm:w-auto px-9 py-4 font-bold text-base rounded-2xl group shadow-glow"
              >
                <a
                  href={apkUrl || '#download'}
                  onClick={handleDownloadClick}
                >
                  {isDownloading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  ) : (
                    <ArrowDownToLine className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                  )}
                  <span>{isDownloading ? 'Starting Download...' : 'Download SmartCricket APK'}</span>
                </a>
              </Button>
            </div>

            <div className="w-full sm:w-auto">
              <QrCodeModal apkUrl={apkUrl} />
            </div>
          </div>

          {/* Details & Specs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted font-medium">
            <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-accent" />
              <span>Android 7.0 (Nougat) or newer</span>
            </div>
            <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {loading ? (
                <span className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
              ) : (
                <span className="text-emerald-700 font-semibold">{fileSize} • 100% Free</span>
              )}
            </div>
            <div className="glass-pill px-3 py-1 rounded-full">
              <span>No account required to score</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
