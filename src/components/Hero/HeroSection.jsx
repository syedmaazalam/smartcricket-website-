import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownToLine, Smartphone, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import BlobBackground from './BlobBackground';
import QrCodeModal from '../ui/QrCodeModal';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function HeroSection({ releaseData, loading, onDownload }) {
  const shouldReduceMotion = useReducedMotion();
  const [isDownloading, setIsDownloading] = useState(false);
  const version = releaseData?.versionName || '1.3';
  const fileSize = releaseData?.fileSize || '27.3 MB';
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
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden">
      <BlobBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Headline: Under 2 lines everywhere */}
            <motion.h1
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight leading-[1.05]"
            >
              Score offline. <br />
              <span className="text-accent">Broadcast live.</span>
            </motion.h1>

            {/* Subline: 16px body */}
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
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary Download Button */}
              <motion.a
                id="download"
                href={apkUrl || '#download'}
                onClick={handleDownloadClick}
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="relative overflow-hidden group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-accent text-white font-semibold text-base hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <ArrowDownToLine className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                )}
                <span>{isDownloading ? 'Starting Download...' : 'Download APK'}</span>
              </motion.a>

              {/* QR Code trigger on desktop */}
              <div className="hidden sm:block">
                <QrCodeModal apkUrl={apkUrl} />
              </div>
            </motion.div>

            {/* Release Info & Trust Signals */}
            <motion.div
              initial={initialAnim}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-sm text-muted"
            >
              {loading ? (
                <div className="flex items-center gap-1.5 font-medium text-ink">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                  <span>Checking release...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-medium text-ink">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>v{version} Release • {fileSize}</span>
                </div>
              )}
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-accent" />
                <span>Android 7.0+</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Free</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Phone Mockup */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
