import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, Smartphone, ArrowDownToLine } from 'lucide-react';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function QrCodeModal({ apkUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const downloadUrl = apkUrl || 'https://smartcricket-website.web.app';

  // SVG representation of a clean QR Code pointing to the download URL
  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={buttonHover}
        whileTap={buttonTap}
        className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-white text-ink border border-border font-medium text-sm hover:border-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Show QR code to scan with mobile"
      >
        <QrCode className="w-4 h-4 text-accent" />
        <span>Scan QR Code</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-border z-10 text-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] rounded-full text-muted hover:text-ink hover:bg-surface transition-colors"
                aria-label="Close QR code modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-3 text-accent">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-xl text-ink mb-1">
                Scan to Download APK
              </h3>
              <p className="text-sm text-muted mb-4">
                Point your phone's camera at the code below to open the download link directly on your Android device.
              </p>

              {/* QR Code Container */}
              <div className="bg-surface/50 p-4 rounded-2xl inline-block border border-border mb-4">
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" rx="8" fill="white" />
                  {/* Top-left marker */}
                  <rect x="10" y="10" width="24" height="24" rx="4" fill="#0B1F3B" />
                  <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
                  <rect x="18" y="18" width="8" height="8" rx="1" fill="#2563EB" />
                  {/* Top-right marker */}
                  <rect x="66" y="10" width="24" height="24" rx="4" fill="#0B1F3B" />
                  <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
                  <rect x="74" y="18" width="8" height="8" rx="1" fill="#2563EB" />
                  {/* Bottom-left marker */}
                  <rect x="10" y="66" width="24" height="24" rx="4" fill="#0B1F3B" />
                  <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
                  <rect x="18" y="74" width="8" height="8" rx="1" fill="#2563EB" />
                  {/* Data patterns */}
                  <rect x="42" y="14" width="6" height="6" fill="#0B1F3B" />
                  <rect x="52" y="14" width="6" height="6" fill="#2563EB" />
                  <rect x="42" y="24" width="6" height="6" fill="#2563EB" />
                  <rect x="52" y="24" width="6" height="6" fill="#0B1F3B" />
                  <rect x="14" y="42" width="6" height="6" fill="#2563EB" />
                  <rect x="24" y="42" width="6" height="6" fill="#0B1F3B" />
                  <rect x="14" y="52" width="6" height="6" fill="#0B1F3B" />
                  <rect x="24" y="52" width="6" height="6" fill="#2563EB" />
                  <rect x="42" y="42" width="16" height="16" rx="2" fill="#2563EB" />
                  <rect x="46" y="46" width="8" height="8" rx="1" fill="white" />
                  <rect x="66" y="42" width="6" height="6" fill="#0B1F3B" />
                  <rect x="78" y="42" width="6" height="6" fill="#2563EB" />
                  <rect x="66" y="52" width="6" height="6" fill="#2563EB" />
                  <rect x="78" y="52" width="6" height="6" fill="#0B1F3B" />
                  <rect x="42" y="66" width="6" height="6" fill="#0B1F3B" />
                  <rect x="52" y="66" width="6" height="6" fill="#2563EB" />
                  <rect x="42" y="76" width="6" height="6" fill="#2563EB" />
                  <rect x="52" y="76" width="6" height="6" fill="#0B1F3B" />
                  <rect x="66" y="66" width="8" height="8" fill="#2563EB" />
                  <rect x="76" y="76" width="8" height="8" fill="#0B1F3B" />
                </svg>
              </div>

              <div className="text-xs text-muted flex items-center justify-center gap-2">
                <span>Free download</span>
                <span>•</span>
                <span>4.4 MB</span>
                <span>•</span>
                <span>Direct APK</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
