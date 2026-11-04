import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function BlobBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top Left Soft Tint */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-surface/40 blur-3xl"
      />

      {/* Center Right Soft Tint */}
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[20%] -right-[15%] w-[550px] h-[550px] rounded-full bg-surface/30 blur-3xl"
      />
    </div>
  );
}
