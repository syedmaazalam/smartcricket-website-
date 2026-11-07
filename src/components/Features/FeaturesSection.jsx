import React from 'react';
import { motion } from 'motion/react';
import { WifiOff, Radio, Scale, Award, Share2, TrendingUp, Sparkles } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Badge } from '../ui/badge';

const features = [
  {
    icon: WifiOff,
    tag: 'Scoring Engine',
    title: 'Score Anywhere, Even Without Internet',
    description: 'Never lose a delivery to spotty mobile signal. SmartCricket saves every ball and undo locally to your phone and auto-syncs to the cloud the moment you reconnect.',
    badge: '100% Offline',
  },
  {
    icon: Radio,
    tag: 'Live Telemetry',
    title: 'Instant Live Match Links for Fans',
    description: 'Share an easy 6-character match code. Spectators follow ball-by-ball score updates, current run rate, and over breakdowns from any browser without signing in.',
    badge: 'Zero-Lag',
  },
  {
    icon: Scale,
    tag: 'Cricket Laws',
    title: 'Full MCC Law Compliance',
    description: 'Accurately scores all 10 dismissal types, wides, no-balls, leg-byes, overthrows, timed declarations, and penalty runs with international-standard precision.',
    badge: 'ICC & MCC',
  },
  {
    icon: Award,
    tag: 'Algorithmic Honors',
    title: 'Automatic Player of the Match',
    description: 'Algorithmic scoring rates player impact based on runs, strike rate, wickets, and economy to generate an automated podium ranking the top 3 stars of every match.',
    badge: 'Smart Rating',
  },
  {
    icon: Share2,
    tag: 'Social Graphics',
    title: 'Broadcast-Quality Match Posters',
    description: 'Create televised-style summary graphics with one tap. Export high-resolution 1080p and 1920p posters with balanced 2×2 player stats ready for WhatsApp.',
    badge: 'HD Export',
  },
  {
    icon: TrendingUp,
    tag: 'Match Intelligence',
    title: 'Interactive Worm & Manhattan Charts',
    description: 'Visualize match momentum with dynamic Worm cumulative score curves, Manhattan over-by-over comparisons, run-rate trajectories, and batter timelines.',
    badge: 'Pro Charts',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-r from-blue-200/20 via-surface/30 to-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex mb-3"
          >
            <Badge variant="glass" className="py-1 px-3 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Engineered For Reliability</span>
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight mb-4"
          >
            Built for scorers who demand precision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted text-base sm:text-lg leading-relaxed font-sans"
          >
            Every tool required to manage tournaments, maintain accurate cricket records, and keep your community engaged.
          </motion.p>
        </div>

        {/* 6 Features Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              index={idx}
              icon={feature.icon}
              tag={feature.tag}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
