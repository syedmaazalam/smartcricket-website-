import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, Smartphone, Check, Copy, ArrowDownToLine, Globe } from 'lucide-react';
import QRCode from 'qrcode';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function QrCodeModal({ apkUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrMode, setQrMode] = useState('download'); // 'download' | 'website'
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const websiteUrl = 'https://smartcricket-website.web.app';
  const downloadUrl = apkUrl || 'https://drive.usercontent.google.com/download?id=1ddi2Wws_dbTjswFrdqB2DK6FgzpB1341&export=download&confirm=t';
  const targetUrl = qrMode === 'download' ? downloadUrl : websiteUrl;

  useEffect(() => {
    let isCurrent = true;
    async function generateQR() {
      try {
        setLoading(true);
        const dataUrl = await QRCode.toDataURL(targetUrl, {
          width: 360,
          margin: 2,
          color: {
            dark: '#0B1F3B',
            light: '#FFFFFF',
          },
          errorCorrectionLevel: 'M',
        });
        if (isCurrent) {
          setQrCodeDataUrl(dataUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to generate QR Code:', err);
        if (isCurrent) setLoading(false);
      }
    }

    if (isOpen) {
      generateQR();
    }

    return () => {
      isCurrent = false;
    };
  }, [targetUrl, isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                Scan with Phone Camera
              </h3>
              <p className="text-xs text-muted mb-4 max-w-xs mx-auto">
                Works with any camera app, Google Lens, or QR scanner to open on Android.
              </p>

              {/* Toggle Switch between Direct APK & Website */}
              <div className="flex items-center p-1 bg-surface/60 rounded-xl mb-4 border border-border/50 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setQrMode('download')}
                  className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[36px] ${
                    qrMode === 'download'
                      ? 'bg-white text-ink shadow-xs'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <ArrowDownToLine className="w-3.5 h-3.5 text-accent" />
                  <span>Download APK</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQrMode('website')}
                  className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[36px] ${
                    qrMode === 'website'
                      ? 'bg-white text-ink shadow-xs'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-secondary" />
                  <span>Open Website</span>
                </button>
              </div>

              {/* High-Resolution Scannable QR Code */}
              <div className="bg-surface/30 p-3 rounded-2xl inline-block border border-border mb-4">
                {loading || !qrCodeDataUrl ? (
                  <div className="w-48 h-48 flex items-center justify-center bg-white rounded-xl">
                    <span className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <img
                    src={qrCodeDataUrl}
                    alt={`Scannable QR code to ${qrMode === 'download' ? 'download SmartCricket APK' : 'open SmartCricket website'}`}
                    className="w-48 h-48 mx-auto rounded-xl bg-white shadow-xs"
                  />
                )}
              </div>

              {/* Copy Target Link Action */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 min-h-[40px] rounded-xl bg-surface/50 hover:bg-surface text-ink text-xs font-semibold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy {qrMode === 'download' ? 'APK Download Link' : 'Website Link'}</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-muted flex items-center justify-center gap-2">
                  <span>Free download</span>
                  <span>•</span>
                  <span>4.4 MB</span>
                  <span>•</span>
                  <span>Android 8.0+</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
