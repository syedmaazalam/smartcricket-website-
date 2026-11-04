import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const deliveries = [
  { id: 1, val: 'M', bg: 'bg-surface text-muted border border-border' },
  { id: 2, val: '6', bg: 'bg-accent text-white font-bold' },
  { id: 3, val: '1', bg: 'bg-surface text-ink border border-border' },
  { id: 4, val: '4', bg: 'bg-accent text-white font-bold' },
  { id: 5, val: '0', bg: 'bg-surface text-muted border border-border' },
  { id: 6, val: 'W', bg: 'bg-red-500 text-white font-bold' },
];

export default function OverRibbon() {
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => (prev >= deliveries.length ? 2 : prev + 1));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 py-1">
      {deliveries.map((ball, idx) => {
        const isVisible = idx < visibleCount;
        return (
          <motion.div
            key={ball.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isVisible
                ? { scale: 1, opacity: 1 }
                : { scale: 0.6, opacity: 0.2 }
            }
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs tabular-nums select-none ${ball.bg}`}
          >
            {ball.val}
          </motion.div>
        );
      })}
    </div>
  );
}
