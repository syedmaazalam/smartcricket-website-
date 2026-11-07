import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function BlobBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Subtle Grid Pattern for Technical Precision */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(rgba(37, 99, 235, 0.12) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-200/40 via-surface/20 to-transparent blur-3xl" />

      {/* Primary Floating Blue Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 30, -20, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 -left-20 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full bg-gradient-to-tr from-blue-300/30 to-sky-200/40 blur-3xl opacity-70 will-change-transform"
      />

      {/* Secondary Accent Orb on Right (behind phone mockup) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -25, 25, 0],
                y: [0, 25, -25, 0],
                scale: [1, 0.95, 1.08, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-32 -right-24 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-bl from-accent/15 via-secondary/25 to-transparent blur-3xl opacity-60 will-change-transform"
      />

      {/* Center Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-100/40 rounded-full blur-3xl opacity-50" />
    </div>
  );
}
