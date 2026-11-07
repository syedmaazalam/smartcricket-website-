import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowDownToLine, Layers, Eye, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
          ? 'py-2.5 sm:py-3 bg-white/85 backdrop-blur-xl border-b border-white/80 shadow-soft'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border border-emerald-500/30 group-hover:scale-105 group-hover:rotate-2 transition-transform bg-white">
              <img src="/logo.png" alt="SmartCricket Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-xl tracking-tight text-ink">
                Smart<span className="text-accent">Cricket</span>
              </span>
              <Badge variant="live" className="hidden lg:inline-flex py-0.5 px-2 text-[10px]">
                v{releaseData?.versionName || '1.3'}
              </Badge>
            </div>
          </Link>

          {/* Desktop Nav Links in pill container */}
          <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border border-white/90">
            {navLinks.map((link) => {
              const isActive = location.pathname === '/' && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-accent ${
                    isActive
                      ? 'text-accent font-semibold bg-white shadow-xs'
                      : 'text-muted hover:text-ink hover:bg-white/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Download Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="glow"
              size="default"
              className="hidden sm:inline-flex"
            >
              <a
                href={releaseData?.apkUrl || '#download'}
                onClick={handleDownloadClick}
              >
                <span>Download APK</span>
                <ArrowDownToLine className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-2xl glass-pill text-ink hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
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
              className="fixed inset-0 top-[65px] bg-ink/40 backdrop-blur-xs z-30 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-[65px] right-0 bottom-0 w-4/5 max-w-sm glass-card border-l border-white/80 p-6 shadow-2xl z-40 md:hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted px-2">
                  <span>Navigation</span>
                  <Badge variant="live" className="py-0.5 px-2 text-[10px]">
                    Offline Ready
                  </Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === '/' && activeSection === link.id;
                    return (
                      <motion.a
                        key={link.id}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center gap-3.5 px-4 py-3 min-h-[48px] rounded-2xl font-medium transition-all text-base ${
                          isActive
                            ? 'bg-accent text-white shadow-soft font-semibold'
                            : 'text-ink hover:bg-surface/60'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-accent'}`} />
                        <span>{link.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA in Drawer */}
              <div className="pt-6 border-t border-border/50 space-y-3">
                <Button
                  asChild
                  variant="glow"
                  size="lg"
                  className="w-full justify-center"
                >
                  <a
                    href={releaseData?.apkUrl || '#download'}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleDownloadClick(e);
                    }}
                  >
                    <ArrowDownToLine className="w-5 h-5" />
                    <span>Download Free APK</span>
                  </a>
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted font-medium">
                  <span>Android 7.0+</span>
                  <span>•</span>
                  <span>{releaseData?.fileSize || '5.6 MB'}</span>
                  <span>•</span>
                  <span>100% Free</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
