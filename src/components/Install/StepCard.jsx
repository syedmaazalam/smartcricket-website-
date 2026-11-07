import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function StepCard({ number, title, body, warning, icon: Icon, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.12 }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      className="glass-card rounded-3xl p-8 border border-white/80 transition-all duration-300 hover:border-secondary/60 hover:shadow-glass-hover flex flex-col justify-between relative group"
    >
      <div>
        {/* Step Badge & Big Number */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center font-display font-extrabold text-xl shadow-glow">
            {number}
          </div>
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-surface/60 text-accent flex items-center justify-center border border-white">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-tight mb-3">
          {title}
        </h3>

        {/* Body Text */}
        <p className="text-muted text-sm sm:text-base leading-relaxed font-sans mb-4">
          {body}
        </p>
      </div>

      {/* Warning Box for Step 2 */}
      {warning && (
        <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-300/40 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-snug font-medium">{warning}</p>
        </div>
      )}
    </motion.div>
  );
}
