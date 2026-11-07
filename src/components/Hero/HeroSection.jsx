import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownToLine, Smartphone, ShieldCheck, Sparkles, Loader2, Zap } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import BlobBackground from './BlobBackground';
import QrCodeModal from '../ui/QrCodeModal';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function HeroSection({ releaseData, loading, onDownload }) {
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

  const initialAnim = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 pb-16 sm:pb-24 overflow-hidden">
      <BlobBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Trust Pill & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill / Badge */}
            <motion.div
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2"
            >
              <div className="glass-pill px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 border border-white/90 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-ink">
                  Cricket Law Engine • 100% Offline Scoring
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.05 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight leading-[1.05]"
            >
              Score offline. <br />
              <span className="text-accent underline decoration-sky-300/60 decoration-wavy decoration-from-font">
                Broadcast live.
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              The international-standard cricket law engine for club managers, local tournaments, and community leagues. Record every ball without internet, and stream real-time match telemetry to fans worldwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary Download Button */}
              <Button
                asChild
                id="download"
                variant="glow"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 font-bold text-base rounded-2xl group shadow-glow"
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
                  <span>{isDownloading ? 'Starting Download...' : 'Download Free APK'}</span>
                </a>
              </Button>

              {/* QR Code trigger on desktop */}
              <div className="w-full sm:w-auto">
                <QrCodeModal apkUrl={apkUrl} />
              </div>
            </motion.div>

            {/* Release Info & Trust Badges */}
            <motion.div
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 text-xs sm:text-sm text-muted font-medium"
            >
              {loading ? (
                <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                  <span>Checking latest build...</span>
                </div>
              ) : (
                <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-ink font-semibold">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>v{version} • {fileSize}</span>
                </div>
              )}
              <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-accent" />
                <span>Android 7.0+</span>
              </div>
              <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">100% Free</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Phone Mockup with ambient glow */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Ambient Radial Aura behind Phone */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-sky-300/30 rounded-full blur-2xl -z-10 pointer-events-none" />
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
