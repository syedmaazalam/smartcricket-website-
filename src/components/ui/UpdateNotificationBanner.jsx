import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ArrowDownToLine, X, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react';

export default function UpdateNotificationBanner({ releaseData, onDownload }) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const versionName = releaseData?.versionName || '1.3';
  const notes = releaseData?.notes || 'New performance enhancements and live streaming optimizations.';
  const alertMessage = releaseData?.alertMessage || `SmartCricket v${versionName} is here! Update now for the latest match scoring features.`;
  const isForce = !!releaseData?.force;

  useEffect(() => {
    // Check if user already dismissed this specific version update
    const storageKey = `dismissed_update_v${versionName}`;
    const wasDismissed = localStorage.getItem(storageKey);

    if (!wasDismissed || isForce) {
      // Small delay for smooth entrance after page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [versionName, isForce]);

  const handleDismiss = () => {
    if (!isForce) {
      localStorage.setItem(`dismissed_update_v${versionName}`, 'true');
      setDismissed(true);
      setIsVisible(false);
    }
  };

  if (dismissed && !isForce) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="fixed top-18 sm:top-20 inset-x-0 z-40 px-4 max-w-3xl mx-auto pointer-events-none"
        >
          <div className="pointer-events-auto bg-ink text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 mt-0.5">
                {isForce ? (
                  <AlertTriangle className="w-5 h-5 text-amber-300 animate-pulse" />
                ) : (
                  <Bell className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-accent/30 text-secondary text-[11px] font-bold uppercase tracking-wider">
                    {isForce ? 'Mandatory Update' : `Version ${versionName} Available`}
                  </span>
                  <span className="text-white/40 text-xs">•</span>
                  <span className="text-white/60 text-xs">SmartCricket App</span>
                </div>
                <p className="text-sm font-medium text-white/95 leading-snug line-clamp-2">
                  {alertMessage}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={onDownload}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold shadow-md transition-colors"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Update Now</span>
              </button>

              {!isForce && (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Dismiss update notification"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
