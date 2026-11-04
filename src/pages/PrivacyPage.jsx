import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to SmartCricket</span>
      </Link>

      <div className="bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-soft space-y-6">
        <div className="flex items-center gap-3 text-accent mb-2">
          <Shield className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider">Privacy Policy</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted font-mono">
          Draft, last updated November 5, 2026
        </p>

        <hr className="border-border" />

        <div className="space-y-6 text-sm text-ink leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">1. Overview</h2>
            <p className="text-muted">
              SmartCricket is designed with privacy and local ownership in mind. We respect your data and do not sell personal information or show advertisements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">2. Match Data Storage</h2>
            <p className="text-muted">
              Matches created and scored in SmartCricket are stored first on your local device (via IndexedDB and local storage). When connected to the internet, match event data and live score telemetry are synchronized with Google Firebase (Firestore) so spectators can view the match in real time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">3. Manager Accounts & Authentication</h2>
            <p className="text-muted">
              Managers who register or sign in do so securely via Firebase Authentication using an email address and password. Passwords are never stored in plaintext. Spectators do not need an account or login to view matches.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">4. Website Analytics & Download Tracking</h2>
            <p className="text-muted">
              This website does not use tracking cookies or third-party ad networks. When you click the Download APK button, an anonymous counter entry is recorded with the version code, timestamp, and device operating system type (Android, iOS, or Desktop) to measure app distribution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">5. Advertising</h2>
            <p className="text-muted">
              SmartCricket contains no third-party advertisements or commercial tracking SDKs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">6. Contact</h2>
            <p className="text-muted">
              For any questions regarding privacy or your data, please contact Syed Maaz Alam at{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-accent font-medium hover:underline">
                {SITE_CONFIG.supportEmail}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
