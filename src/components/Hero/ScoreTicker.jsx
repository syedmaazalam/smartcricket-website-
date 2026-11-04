import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ScoreTicker() {
  const [runs, setRuns] = useState(6);
  const [wickets, setWickets] = useState(1);

  // Gentle periodic update to simulate live cricket scoring
  useEffect(() => {
    const interval = setInterval(() => {
      setRuns((prev) => (prev >= 18 ? 6 : prev + 4));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-baseline gap-1 font-display font-extrabold text-ink select-none">
      <motion.span
        key={runs}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="text-4xl text-ink"
      >
        {runs}
      </motion.span>
      <span className="text-2xl text-muted font-normal">/</span>
      <span className="text-3xl text-accent">{wickets}</span>
    </div>
  );
}
