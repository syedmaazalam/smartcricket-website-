import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, Smartphone, Check, Copy, ArrowDownToLine, Globe, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';
import { Button } from './button';
import { Badge } from './badge';
import { buttonHover, buttonTap } from '../../lib/motion';

export default function QrCodeModal({ apkUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrMode, setQrMode] = useState('download'); // 'download' | 'website'
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const websiteUrl = 'https://smartcricket-website.web.app';
  const downloadUrl = (apkUrl && !apkUrl.startsWith('#'))
    ? (apkUrl.startsWith('http') ? apkUrl : `https://smartcricket-website.web.app${apkUrl}`)
    : 'https://smartcricket-website.web.app/SmartCricket.apk';
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
      <Button
        type="button"
        variant="glass"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto font-semibold rounded-2xl gap-2"
        aria-label="Show QR code to scan with mobile"
      >
        <QrCode className="w-4 h-4 text-accent" />
        <span>Scan QR Code</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative w-full max-w-sm glass-card rounded-[32px] p-6 sm:p-7 shadow-2xl border border-white/90 z-10 text-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] rounded-full text-muted hover:text-ink hover:bg-surface/60 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Close QR code modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-surface/80 flex items-center justify-center mx-auto mb-3 text-accent border border-white shadow-xs">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mb-1">
                Scan with Phone Camera
              </h3>
              <p className="text-xs text-muted mb-4 max-w-xs mx-auto font-sans">
                Works with any camera app, Google Lens, or QR scanner to open directly on Android.
              </p>

              {/* Toggle Switch between Direct APK & Website */}
              <div className="flex items-center p-1 bg-surface/50 rounded-2xl mb-4 border border-border/50 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setQrMode('download')}
                  className={`flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all min-h-[38px] ${
                    qrMode === 'download'
                      ? 'bg-white text-ink shadow-xs font-bold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <ArrowDownToLine className="w-3.5 h-3.5 text-accent" />
                  <span>Download APK</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQrMode('website')}
                  className={`flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all min-h-[38px] ${
                    qrMode === 'website'
                      ? 'bg-white text-ink shadow-xs font-bold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-secondary" />
                  <span>Open Website</span>
                </button>
              </div>

              {/* High-Resolution Scannable QR Code */}
              <div className="bg-surface/30 p-3 rounded-2xl inline-block border border-white/80 mb-4 shadow-inner">
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
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleCopyLink}
                  className="w-full text-xs font-semibold rounded-xl"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy {qrMode === 'download' ? 'APK Download Link' : 'Website Link'}</span>
                    </>
                  )}
                </Button>

                <div className="text-[11px] text-muted flex items-center justify-center gap-2 font-medium">
                  <span>Free download</span>
                  <span>•</span>
                  <span>Direct install</span>
                  <span>•</span>
                  <span>Android 7.0+</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
