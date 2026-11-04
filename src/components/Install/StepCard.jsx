import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export default function StepCard({ number, title, body, warning, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border hover:border-secondary transition-all duration-300 shadow-soft"
    >
      {/* Large Fraunces Step Numeral */}
      <div className="w-16 h-16 rounded-2xl bg-surface text-accent font-display font-extrabold text-2xl flex items-center justify-center mb-6 shadow-xs">
        {number}
      </div>

      {/* Step Title */}
      <h3 className="font-display font-bold text-xl text-ink mb-3">
        {title}
      </h3>

      {/* Step Body */}
      <p className="text-muted text-sm leading-relaxed max-w-xs mb-3">
        {body}
      </p>

      {/* Optional Warning Notice for Step 2 */}
      {warning && (
        <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-left flex items-start gap-2.5 text-xs text-amber-900 leading-normal">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{warning}</span>
        </div>
      )}
    </motion.div>
  );
}
