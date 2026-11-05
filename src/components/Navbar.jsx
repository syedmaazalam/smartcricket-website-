import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, ShieldCheck, Eye, Layers, HelpCircle, ArrowDownToLine } from 'lucide-react';
import { buttonHover, buttonTap } from '../lib/motion';

export default function Navbar({ releaseData, onDownload }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const handleDownloadClick = (e) => {
    if (onDownload) {
      onDownload(e);
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver20 = window.scrollY > 20;
          setScrolled((prev) => (prev !== isOver20 ? isOver20 : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (location.pathname !== '/') {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Zero-lag native IntersectionObserver for active section tracking
    const sectionIds = ['hero', 'features', 'showcase', 'install', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  const navLinks = [
    { label: 'Features', href: '/#features', id: 'features', icon: Layers },
    { label: 'See it in Action', href: '/#showcase', id: 'showcase', icon: Eye },
    { label: 'How to Install', href: '/#install', id: 'install', icon: ShieldCheck },
    { label: 'FAQ', href: '/#faq', id: 'faq', icon: HelpCircle },
  ];

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-soft'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg width="22" height="22" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
              </svg>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-ink">
              Smart<span className="text-accent">Cricket</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === '/' && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors relative py-1 focus:outline-none focus:ring-2 focus:ring-accent rounded ${
                    isActive ? 'text-accent font-semibold' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Download Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href={releaseData?.apkUrl || '#download'}
              onClick={handleDownloadClick}
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <span>Download APK</span>
              <ArrowDownToLine className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </motion.a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-xl text-muted hover:text-ink hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[73px] bg-ink/30 z-30 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-[73px] right-0 bottom-0 w-3/4 max-w-sm bg-card p-6 shadow-2xl z-40 md:hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="text-sm font-semibold text-ink px-2">
                  Navigation
                </div>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.id}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-xl text-ink hover:bg-surface font-medium transition-colors text-base"
                      >
                        <Icon className="w-5 h-5 text-accent" />
                        <span>{link.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA in Drawer */}
              <div className="pt-6">
                <motion.a
                  href={releaseData?.apkUrl || '#download'}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleDownloadClick(e);
                  }}
                  whileTap={buttonTap}
                  className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[44px] rounded-xl bg-accent text-white font-semibold text-center hover:bg-accent-hover transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Free APK</span>
                </motion.a>
                <p className="text-sm text-center text-muted mt-3">
                  Android 7.0+ • 100% Free
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
