import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownToLine, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import BlobBackground from './BlobBackground';
import QrCodeModal from '../ui/QrCodeModal';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function HeroSection({ releaseData, onDownload }) {
  const version = releaseData?.versionName || '1.0';
  const fileSize = releaseData?.fileSize || '4.4 MB';
  const apkUrl = releaseData?.apkUrl;

  const handleDownloadClick = (e) => {
    if (onDownload) {
      onDownload(e);
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
      <BlobBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Version Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-secondary/30 text-ink text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>v{version} Release • Android 7.0+</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.08]"
            >
              Score matches anywhere. <br />
              <span className="text-accent">Broadcast live in real time.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              The international-standard cricket law engine built for local clubs and community games. Score every ball 100% offline and stream real-time match telemetry to fans anywhere.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary Download Button with Shine Sweep */}
              <motion.a
                id="download"
                href={apkUrl || '#download'}
                onClick={handleDownloadClick}
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="relative overflow-hidden group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-accent text-white font-semibold text-base shadow-lift hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                {/* Shine Sweep Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                
                <span>Download APK ({fileSize})</span>
                <ArrowDownToLine className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </motion.a>

              {/* QR Code trigger on desktop */}
              <div className="hidden sm:block">
                <QrCodeModal apkUrl={apkUrl} />
              </div>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-1 text-xs text-muted"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Free & Open</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Offline First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-accent" />
                <span>No Login to View</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
