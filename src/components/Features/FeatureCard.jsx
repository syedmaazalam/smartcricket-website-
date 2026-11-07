import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Badge } from '../ui/badge';
import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, tag, title, description, badge, index }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!cardRef.current || !spotlightRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.12), transparent 75%)`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.06 }}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      className="relative rounded-3xl glass-card p-8 border border-white/80 transition-all duration-300 hover:border-secondary/60 hover:shadow-glass-hover overflow-hidden group flex flex-col justify-between"
    >
      {/* Desktop Cursor Following Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden sm:block rounded-3xl"
      />

      <div>
        {/* Top Header with Icon and Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-surface to-blue-200/50 text-accent flex items-center justify-center border border-white shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <Badge variant="glass" className="text-[11px] font-semibold text-accent border-blue-200/60">
              {badge}
            </Badge>
          )}
        </div>

        {/* Tag / Category in sentence-case */}
        <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
          {tag}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-tight mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-8 pt-5 border-t border-border/40 flex items-center justify-between text-xs sm:text-sm text-muted font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Offline-ready
        </span>
        <span className="text-accent font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          <span>Free APK</span>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </motion.div>
  );
}
