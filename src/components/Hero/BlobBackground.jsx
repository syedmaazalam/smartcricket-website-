import React from 'react';
import { motion } from 'motion/react';

export default function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top Left Soft Tint */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/60 to-surface/40 blur-3xl opacity-70"
      />

      {/* Center Right Soft Tint */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[20%] -right-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-surface/50 to-blue-200/40 blur-3xl opacity-60"
      />
    </div>
  );
}
