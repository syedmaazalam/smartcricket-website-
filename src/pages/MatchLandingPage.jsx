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
  ArrowLeft,
  Sparkles,
  Loader2,
  Zap,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
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
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Back to Home Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 duration-200" />
          <span>SmartCricket Home</span>
        </Link>
        <Badge variant="live" className="py-1 px-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Match Broadcast Stream</span>
        </Badge>
      </div>

      {/* Top Section: Match Teaser */}
      <div className="glass-card rounded-[32px] border border-white/90 p-6 sm:p-10 shadow-glass space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono bg-accent/10 px-2.5 py-1 rounded-md">
              Match Code: {cleanMatchId}
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-ink tracking-tight mt-2">
              Live Match Broadcast
            </h1>
          </div>
          <div className="px-4 py-2 rounded-2xl glass-pill text-center border border-white/80">
            <span className="text-xs text-muted block font-medium">Status</span>
            <span className="font-semibold text-sm text-ink flex items-center gap-1.5 justify-center">
              <Activity className="w-3.5 h-3.5 text-accent animate-spin" />
              Live In Progress
            </span>
          </div>
        </div>

        {/* Live Scorecard Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-blue-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-semibold text-ink">Team Alpha (Batting)</span>
              <span className="font-medium text-accent">1st Innings</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-ink">51/2</span>
              <span className="text-sm font-mono text-muted">2.5 ov</span>
            </div>
            <div className="text-xs text-muted flex gap-4 pt-1 font-medium">
              <span>CRR: <strong className="text-ink font-mono">18.0</strong></span>
              <span>Proj: <strong className="text-ink font-mono">360</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-blue-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-semibold text-ink">Team Bravo (Bowling)</span>
              <span>Target: TBD</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-ink text-muted/60">0/0</span>
              <span className="text-sm font-mono text-muted">0.0 ov</span>
            </div>
            <div className="text-xs text-muted flex gap-4 pt-1 font-medium">
              <span>Required: <strong className="text-ink">N/A</strong></span>
              <span>Wickets left: <strong className="text-ink">10</strong></span>
            </div>
          </div>
        </div>

        {/* App Exclusivity Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-glow">
              <Smartphone className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans">
              Full ball-by-ball commentary, live wagon wheels, and instant telemetry stream exclusively inside the <strong>SmartCricket Android App</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Button
              asChild
              variant="glow"
              size="sm"
              className="flex-1 sm:flex-initial text-xs"
            >
              <a
                href={chromeIntentUri}
                onClick={handleOpenAppClick}
              >
                {isOpeningApp ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Smartphone className="w-4 h-4" />
                )}
                <span>{isOpeningApp ? 'Opening App...' : 'Open in App'}</span>
              </a>
            </Button>
            <Button
              type="button"
              variant="glass"
              size="sm"
              onClick={scrollToBottom}
              className="flex-1 sm:flex-initial text-xs"
            >
              <span>Scroll to Download</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-accent" />
            </Button>
          </div>
        </div>
      </div>

      {/* Middle Section 1: Detailed Match Telemetry & In-App Features */}
      <div className="glass-card rounded-[32px] border border-white/90 p-6 sm:p-10 shadow-glass space-y-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Why Watch in SmartCricket App?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/70 border border-blue-100 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-ink">0.1s Zero-Latency</h3>
            <p className="text-xs text-muted leading-relaxed">
              Firebase sync pushes every delivery in real-time. No delayed video buffers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 border border-blue-100 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-ink">Detailed Scorecard</h3>
            <p className="text-xs text-muted leading-relaxed">
              Batter strike rates, bowler economy, boundaries, dot ball counts, and worms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 border border-blue-100 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-ink">100% Free &amp; No Ads</h3>
            <p className="text-xs text-muted leading-relaxed">
              Lightweight fast app. No subscription fees, no popups, no account required to watch.
            </p>
          </div>
        </div>

        {/* Recent Deliveries Ribbon Preview */}
        <div className="p-4 rounded-2xl bg-white/80 border border-blue-100 space-y-2">
          <span className="text-xs font-semibold text-ink block">Recent Deliveries</span>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {['3wd', '2', '3wd', '2', '2', '0', '6', '1w'].map((ball, i) => (
              <span
                key={i}
                className={`w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  ball.includes('w') && !ball.includes('wd')
                    ? 'bg-rose-500 text-white shadow-xs'
                    : ball.includes('wd')
                    ? 'bg-amber-400 text-ink shadow-xs'
                    : ball === '6'
                    ? 'bg-accent text-white shadow-glow'
                    : 'bg-surface text-ink border border-blue-200'
                }`}
              >
                {ball}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section 2: Installation Instructions */}
      <div className="glass-card rounded-[32px] border border-white/90 p-6 sm:p-10 shadow-glass space-y-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Quick 3-Step Setup
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-blue-100">
            <span className="w-7 h-7 rounded-xl bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">1</span>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Download the APK using the button below at the end of this page.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-blue-100">
            <span className="w-7 h-7 rounded-xl bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">2</span>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Tap the downloaded file. If Chrome or Google Play Protect shows a prompt, select <strong>"Install anyway"</strong> or allow installation from this source.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-blue-100">
            <span className="w-7 h-7 rounded-xl bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">3</span>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Open SmartCricket and your match code <strong>{cleanMatchId}</strong> will load automatically!
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: SCROLL-GATED DOWNLOAD BUTTON */}
      <div
        id="match-download-section"
        className="glass-card rounded-[36px] border-2 border-accent/40 p-8 sm:p-12 text-center shadow-2xl space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-surface/60">
          <div
            className="h-full bg-accent transition-all duration-300 shadow-glow"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        <div className="w-16 h-16 rounded-3xl bg-accent text-white flex items-center justify-center mx-auto shadow-glow">
          {hasScrolledToBottom ? (
            <Unlock className="w-8 h-8 text-white" />
          ) : (
            <Lock className="w-8 h-8 text-white" />
          )}
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono bg-accent/10 px-3 py-1 rounded-full">
            {hasScrolledToBottom ? 'Download Unlocked' : `Scroll Complete Page (${scrollPercent}%)`}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink pt-1">
            {hasScrolledToBottom
              ? 'Ready to Watch! Download SmartCricket APK'
              : 'Scroll to bottom to activate APK download'}
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Version {releaseData?.versionName || '1.3'} • {releaseData?.fileSize || '5.6 MB'} • Direct download
          </p>
        </div>

        <div className="pt-2">
          {hasScrolledToBottom ? (
            <Button
              type="button"
              variant="glow"
              size="lg"
              onClick={handleDownloadClick}
              className="px-8 py-4 font-bold text-base rounded-2xl animate-pulse"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <ArrowDownToLine className="w-5 h-5" />
              )}
              <span>{isDownloading ? 'Starting Download...' : 'Download SmartCricket APK'}</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="default"
              onClick={scrollToBottom}
              className="text-xs font-semibold cursor-pointer"
            >
              <Lock className="w-4 h-4 text-muted" />
              <span>Scroll to Bottom to Unlock</span>
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-muted pt-2 font-medium">
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
