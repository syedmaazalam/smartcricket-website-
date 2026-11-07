import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Badge } from '../components/ui/badge';

export default function PrivacyPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      <Link
        to="/"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover mb-8 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 duration-200" />
        <span>Back to SmartCricket</span>
      </Link>

      <div className="glass-card rounded-[32px] border border-white/90 p-8 sm:p-14 shadow-glass space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="glass" className="py-1 px-3">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span>Privacy Policy</span>
          </Badge>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-muted font-mono">
          Draft, last updated November 5, 2026
        </p>

        <hr className="border-border/60" />

        <div className="space-y-6 text-sm sm:text-base text-ink leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">1. Overview</h2>
            <p className="text-muted leading-relaxed">
              SmartCricket is designed with privacy and local ownership in mind. We respect your data and do not sell personal information or show advertisements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">2. Match Data Storage</h2>
            <p className="text-muted leading-relaxed">
              Matches created and scored in SmartCricket are stored first on your local device (via IndexedDB and local storage). When connected to the internet, match event data and live score telemetry are synchronized with Google Firebase (Firestore) so spectators can view the match in real time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">3. Manager Accounts &amp; Authentication</h2>
            <p className="text-muted leading-relaxed">
              Managers who register or sign in do so securely via Firebase Authentication using an email address and password. Passwords are never stored in plaintext. Spectators do not need an account or login to view matches.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">4. Website Analytics &amp; Download Tracking</h2>
            <p className="text-muted leading-relaxed">
              This website does not use tracking cookies or third-party ad networks. When you click the Download APK button, an anonymous counter entry is recorded with the version code, timestamp, and device operating system type (Android, iOS, or Desktop) to measure app distribution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">5. Advertising</h2>
            <p className="text-muted leading-relaxed">
              SmartCricket contains no third-party advertisements or commercial tracking SDKs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">6. Contact</h2>
            <p className="text-muted leading-relaxed">
              For any questions regarding privacy or your data, please contact Syed Maaz Alam at{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-accent font-semibold hover:underline">
                {SITE_CONFIG.supportEmail}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
