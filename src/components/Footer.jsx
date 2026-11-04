import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-ink">
                Smart<span className="text-accent">Cricket</span>
              </span>
            </Link>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              Fast, offline-first cricket scoring and live match telemetry for club tournaments, street matches, and community leagues.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">
              Quick links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#features"
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex transition-all min-h-[36px] items-center"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#showcase"
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex transition-all min-h-[36px] items-center"
                >
                  See it in Action
                </a>
              </li>
              <li>
                <a
                  href="/#install"
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex transition-all min-h-[36px] items-center"
                >
                  Installation Guide
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex transition-all min-h-[36px] items-center"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">
              Legal & support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex items-center gap-1.5 transition-all min-h-[36px]"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex items-center gap-1.5 transition-all min-h-[36px]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="text-muted hover:text-accent hover:translate-x-1 inline-flex items-center gap-1.5 transition-all min-h-[36px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>{SITE_CONFIG.supportEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>© {currentYear} SmartCricket. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Developed by</span>
            <span className="font-semibold text-ink">{SITE_CONFIG.developerCredit}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
