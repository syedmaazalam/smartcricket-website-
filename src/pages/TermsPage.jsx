import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function TermsPage() {
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
          <FileText className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider">Terms of Service</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-muted font-mono">
          Draft, last updated November 5, 2026
        </p>

        <hr className="border-border" />

        <div className="space-y-6 text-sm text-ink leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">1. Acceptance of Terms</h2>
            <p className="text-muted">
              By downloading, installing, or using the SmartCricket application and website, you agree to these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">2. License & Cost</h2>
            <p className="text-muted">
              SmartCricket is completely free to use for personal, club, and non-commercial community cricket scoring. You may not decompile, reverse engineer, or redistribute modified copies of the APK without prior permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">3. Disclaimer of Warranties ("As-Is")</h2>
            <p className="text-muted">
              SmartCricket is provided on an "as-is" and "as-available" basis without warranties of any kind. While every effort is made to ensure accurate cricket scoring, offline data safety, and server uptime, the developer is not liable for data loss or match interruptions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">4. User Responsibilities</h2>
            <p className="text-muted">
              Match scorers and managers are responsible for maintaining the accuracy of scored matches and safeguarding their manager account login credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-ink">5. Inquiries</h2>
            <p className="text-muted">
              If you have any feedback, questions, or issues, reach out to Syed Maaz Alam at{' '}
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
