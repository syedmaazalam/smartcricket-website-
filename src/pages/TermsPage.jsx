import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Badge } from '../components/ui/badge';

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span>Terms of Service</span>
          </Badge>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-muted font-mono">
          Draft, last updated November 5, 2026
        </p>

        <hr className="border-border/60" />

        <div className="space-y-6 text-sm sm:text-base text-ink leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">1. Acceptance of Terms</h2>
            <p className="text-muted leading-relaxed">
              By downloading, installing, or using the SmartCricket application and website, you agree to these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">2. License &amp; Cost</h2>
            <p className="text-muted leading-relaxed">
              SmartCricket is completely free to use for personal, club, and non-commercial community cricket scoring. You may not decompile, reverse engineer, or redistribute modified copies of the APK without prior permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">3. Disclaimer of Warranties (&quot;As-Is&quot;)</h2>
            <p className="text-muted leading-relaxed">
              SmartCricket is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranties of any kind. While every effort is made to ensure accurate cricket scoring, offline data safety, and server uptime, the developer is not liable for data loss or match interruptions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">4. User Responsibilities</h2>
            <p className="text-muted leading-relaxed">
              Match scorers and managers are responsible for maintaining the accuracy of scored matches and safeguarding their manager account login credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-ink">5. Inquiries</h2>
            <p className="text-muted leading-relaxed">
              If you have any feedback, questions, or issues, reach out to Syed Maaz Alam at{' '}
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
