import React from 'react';
import { motion } from 'motion/react';
import ScreenshotCarousel from './ScreenshotCarousel';
import { Badge } from '../ui/badge';
import { Eye } from 'lucide-react';

export default function SeeInActionSection() {
  return (
    <section id="showcase" className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-surface/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex mb-3"
          >
            <Badge variant="glass" className="py-1 px-3 text-xs">
              <Eye className="w-3.5 h-3.5 text-accent" />
              <span>Real Match Telemetry</span>
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight mb-4"
          >
            See it in action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted text-base sm:text-lg leading-relaxed font-sans"
          >
            Every screen is engineered for fast field scoring, effortless player navigation, and crisp match summaries.
          </motion.p>
        </div>

        {/* Carousel */}
        <ScreenshotCarousel />

      </div>
    </section>
  );
}
