import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Activity,
  Smartphone,
  ArrowDownToLine,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronDown,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { buttonHover, buttonTap } from '../lib/motion';

export default function MatchLandingPage({ releaseData, onDownload }) {
  const { matchId } = useParams();
  const cleanMatchId = matchId ? matchId.toUpperCase() : 'LIVE-MATCH';

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpeningApp, setIsOpeningApp] = useState(false);

  const handleDownloadClick = async (e) => {
    setIsDownloading(true);
    try {
      if (onDownload) {
        await onDownload(e);
      }
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const handleOpenAppClick = () => {
    setIsOpeningApp(true);
    setTimeout(() => setIsOpeningApp(false), 2500);
  };

  const fallbackWebUrl = encodeURIComponent(`https://smartcricket-website.web.app/match/${cleanMatchId}`);
  const chromeIntentUri = `intent://match/${cleanMatchId}#Intent;scheme=smartcricket;package=com.smartcricket.app;S.browser_fallback_url=${fallbackWebUrl};end;`;

  // 1. Attempt deep link on mobile phone
  useEffect(() => {
    const isAndroid = /android/i.test(navigator.userAgent);
    const hasAttempted = sessionStorage.getItem(`attempted_deeplink_${cleanMatchId}`);
    if (isAndroid && !hasAttempted) {
      sessionStorage.setItem(`attempted_deeplink_${cleanMatchId}`, 'true');
      // Direct navigation to Android Chrome Intent triggers app if installed, or stays on fallback URL
      window.location.href = chromeIntentUri;
    }
  }, [cleanMatchId, chromeIntentUri]);

  // 2. Track scroll to enforce "scroll complete page to download"
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight <= 0) {
        setHasScrolledToBottom(true);
        setScrollPercent(100);
        return;
      }
      const scrolled = window.scrollY;
      const percentage = Math.min(100, Math.round((scrolled / documentHeight) * 100));
      setScrollPercent(percentage);

      if (percentage >= 75) {
        setHasScrolledToBottom(true);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    const bottomSection = document.getElementById('match-download-section');
    if (bottomSection) {
      bottomSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Back to Home Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 duration-200" />
          <span>SmartCricket Home</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Match Broadcast Stream</span>
        </div>
      </div>

      {/* Top Section: Match Teaser (Notice: NO DOWNLOAD BUTTON AT TOP) */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Match Code: {cleanMatchId}
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-ink tracking-tight mt-1">
              Live Match Broadcast
            </h1>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-surface/50 border border-border text-center">
            <span className="text-xs text-muted block">Status</span>
            <span className="font-semibold text-sm text-ink flex items-center gap-1.5 justify-center">
              <Activity className="w-3.5 h-3.5 text-accent animate-spin" />
              Live In Progress
            </span>
          </div>
        </div>

        {/* Live Scorecard Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-surface/30 border border-border/70 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-semibold text-ink">Team Alpha (Batting)</span>
              <span>1st Innings</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-ink">51/2</span>
              <span className="text-sm font-mono text-muted">2.5 ov</span>
            </div>
            <div className="text-xs text-muted flex gap-4 pt-1">
              <span>CRR: <strong className="text-ink">18.0</strong></span>
              <span>Proj: <strong className="text-ink">360</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface/30 border border-border/70 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-semibold text-ink">Team Bravo (Bowling)</span>
              <span>Target: TBD</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-ink text-muted/60">0/0</span>
              <span className="text-sm font-mono text-muted">0.0 ov</span>
            </div>
            <div className="text-xs text-muted flex gap-4 pt-1">
              <span>Required: <strong className="text-ink">N/A</strong></span>
              <span>Wickets left: <strong className="text-ink">10</strong></span>
            </div>
          </div>
        </div>

        {/* App Exclusivity Notice — directs user to scroll down */}
        <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              Full ball-by-ball commentary, live wagon wheels, and instant telemetry stream exclusively inside the <strong>SmartCricket Android App</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <a
              href={chromeIntentUri}
              onClick={handleOpenAppClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-sm hover:bg-accent-hover transition-colors"
            >
              {isOpeningApp ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Smartphone className="w-4 h-4" />
              )}
              <span>{isOpeningApp ? 'Opening App...' : 'Open in App'}</span>
            </a>
            <button
              type="button"
              onClick={scrollToBottom}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface border border-border text-ink font-semibold text-xs shadow-sm hover:border-accent transition-colors"
            >
              <span>Scroll to Download</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-accent" />
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section 1: Detailed Match Telemetry & In-App Features */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 space-y-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Why Watch in SmartCricket App?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-surface/20 border border-border/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-ink">0.1s Zero-Latency</h3>
            <p className="text-xs text-muted leading-relaxed">
              Firebase sync pushes every delivery in real-time. No delayed video buffers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface/20 border border-border/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-ink">Detailed Scorecard</h3>
            <p className="text-xs text-muted leading-relaxed">
              Batter strike rates, bowler economy, boundaries, dot ball counts, and worms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface/20 border border-border/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-ink">100% Free & No Ads</h3>
            <p className="text-xs text-muted leading-relaxed">
              Lightweight 6.16 MB app. No subscription fees, no popups, no account required to watch.
            </p>
          </div>
        </div>

        {/* Recent Deliveries Ribbon Preview */}
        <div className="p-4 rounded-2xl bg-surface/40 border border-border/60 space-y-2">
          <span className="text-xs font-semibold text-ink block">Recent Deliveries</span>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {['3wd', '2', '3wd', '2', '2', '0', '6', '1w'].map((ball, i) => (
              <span
                key={i}
                className={`w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  ball.includes('w') && !ball.includes('wd')
                    ? 'bg-rose-500 text-white'
                    : ball.includes('wd')
                    ? 'bg-amber-400 text-ink'
                    : ball === '6'
                    ? 'bg-accent text-white'
                    : 'bg-white text-ink border border-border'
                }`}
              >
                {ball}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section 2: Installation Instructions */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 space-y-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Quick 3-Step Setup
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/20">
            <span className="w-6 h-6 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
            <p className="text-xs text-muted">
              Download the APK using the button below at the end of this page.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/20">
            <span className="w-6 h-6 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
            <p className="text-xs text-muted">
              Tap the downloaded file. If Chrome or Google Play Protect shows a prompt, select <strong>"Install anyway"</strong> or allow installation from this source.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/20">
            <span className="w-6 h-6 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
            <p className="text-xs text-muted">
              Open SmartCricket and your match code <strong>{cleanMatchId}</strong> will load automatically!
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: SCROLL-GATED DOWNLOAD BUTTON */}
      <div
        id="match-download-section"
        className="bg-white rounded-3xl border-2 border-accent/40 p-8 sm:p-12 text-center shadow-lg space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-surface">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto shadow-md">
          {hasScrolledToBottom ? (
            <Unlock className="w-8 h-8 text-white" />
          ) : (
            <Lock className="w-8 h-8 text-white" />
          )}
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
            {hasScrolledToBottom ? 'Download Unlocked' : `Scroll Complete Page (${scrollPercent}%)`}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            {hasScrolledToBottom
              ? 'Ready to Watch! Download SmartCricket APK'
              : 'Scroll to bottom to activate APK download'}
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Version {releaseData?.versionName || '1.3'} • {releaseData?.fileSize || '6.16 MB'} • Direct download
          </p>
        </div>

        <div className="pt-2">
          {hasScrolledToBottom ? (
            <motion.button
              type="button"
              onClick={handleDownloadClick}
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] rounded-2xl bg-accent text-white font-bold text-base shadow-xl shadow-accent/30 hover:bg-accent-hover transition-all animate-pulse"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <ArrowDownToLine className="w-5 h-5" />
              )}
              <span>{isDownloading ? 'Starting Download...' : 'Download SmartCricket APK'}</span>
            </motion.button>
          ) : (
            <button
              type="button"
              onClick={scrollToBottom}
              className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] rounded-2xl bg-surface text-muted font-semibold text-sm cursor-pointer hover:bg-surface/80 transition-colors"
            >
              <Lock className="w-4 h-4 text-muted" />
              <span>Scroll to Bottom to Unlock</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-muted pt-2">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Direct Download
          </span>
          <span>•</span>
          <span>No Ads</span>
          <span>•</span>
          <span>MCC Law Compliant</span>
        </div>
      </div>
    </div>
  );
}
