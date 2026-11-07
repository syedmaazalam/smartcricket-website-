import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, FileText, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Badge } from './ui/badge';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="mt-20 border-t border-white/80 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-4">
            <Link to="/" onClick={handleNavToTop} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border border-emerald-500/30 transition-transform group-hover:scale-105 bg-white">
                <img src="/logo.png" alt="SmartCricket Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-ink">
                Smart<span className="text-accent">Cricket</span>
              </span>
            </Link>
            <p className="text-muted text-sm sm:text-base max-w-sm leading-relaxed font-sans">
              Fast, offline-first cricket scoring and live match telemetry for club tournaments, street matches, and community leagues.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="live" className="text-xs py-0.5">
                Community Edition
              </Badge>
              <Badge variant="glass" className="text-xs py-0.5">
                Android &amp; Web
              </Badge>
            </div>
          </div>

          {/* Quick Links with Frosted Hover */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Quick links</span>
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/#features"
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">Features</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </a>
              </li>
              <li>
                <a
                  href="/#showcase"
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">See it in Action</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </a>
              </li>
              <li>
                <a
                  href="/#install"
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">Installation Guide</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">Frequently Asked Questions</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Legal &amp; support</span>
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  to="/privacy"
                  onClick={handleNavToTop}
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <Shield className="w-4 h-4 text-muted group-hover:text-accent group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={handleNavToTop}
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <FileText className="w-4 h-4 text-muted group-hover:text-accent group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-surface/50 transition-all duration-200 min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-muted group-hover:text-accent group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium break-all group-hover:translate-x-1 transition-transform duration-200">{SITE_CONFIG.supportEmail}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all duration-200" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted border-t border-border/40">
          <p>© {currentYear} SmartCricket. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Developed with pride by</span>
            <span className="font-bold text-ink">{SITE_CONFIG.developerCredit}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
