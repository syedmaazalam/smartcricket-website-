import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownToLine, Smartphone, ShieldCheck } from 'lucide-react';
import QrCodeModal from '../ui/QrCodeModal';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function CTASection({ releaseData, loading, onDownload }) {
  const version = releaseData?.versionName || '1.0';
  const fileSize = releaseData?.fileSize || '4.4 MB';
  const apkUrl = releaseData?.apkUrl;

  const handleDownloadClick = (e) => {
    if (onDownload) {
      onDownload(e);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-surface/20 to-surface/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 sm:p-14 border border-border shadow-lift space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto shadow-md">
            <svg width="32" height="32" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
            </svg>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to upgrade your cricket scoring?
          </h2>

          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Download SmartCricket today. Score complete games offline, stream live to fans, and export broadcast-quality scorecards in seconds.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Attention Pulse Ring on Download Button */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.4, 1.6],
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-xl bg-accent -z-10 pointer-events-none"
              />

              <motion.a
                href={apkUrl || '#download'}
                onClick={handleDownloadClick}
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[52px] rounded-xl bg-accent text-white font-semibold text-base shadow-lift hover:bg-accent-hover transition-colors group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <span>Download SmartCricket APK</span>
                <ArrowDownToLine className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </motion.a>
            </div>

            <QrCodeModal apkUrl={apkUrl} />
          </div>

          {/* Details & Specs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted font-medium">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-accent" />
              Android 7.0 (Nougat) or newer
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {loading ? (
                <span className="w-20 h-3 bg-slate-200 rounded animate-pulse" />
              ) : (
                <span>Version {version} ({fileSize})</span>
              )}
            </span>
            <span>•</span>
            <span>No account required to score</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
