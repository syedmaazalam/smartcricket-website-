import React from 'react';
import { motion } from 'motion/react';
import StepCard from './StepCard';
import ConnectorLine from './ConnectorLine';

const steps = [
  {
    number: '1',
    title: 'Tap "Download APK"',
    body: 'Your browser saves the official SmartCricket installation file directly to your phone storage.',
  },
  {
    number: '2',
    title: 'Allow installation',
    body: 'Open the downloaded file. If prompted, toggle "Install from unknown sources" in Android Settings.',
    warning: 'If Chrome or Google Play Protect warns about the file, choose "Download anyway" or "Install anyway".',
  },
  {
    number: '3',
    title: 'Open and score',
    body: 'Launch SmartCricket on your phone, tap "Create a Match", and begin scoring your first tournament game.',
  },
];

export default function InstallSection() {
  return (
    <section id="install" className="py-24 bg-surface/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4"
          >
            Install in 3 simple steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted text-base sm:text-lg leading-relaxed font-sans"
          >
            No app store accounts or registrations required. Download the APK directly and get started in under 60 seconds.
          </motion.p>
        </div>

        {/* Steps Grid with Connector Line */}
        <div className="relative">
          <ConnectorLine />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <StepCard
                key={step.number}
                index={idx}
                number={step.number}
                title={step.title}
                body={step.body}
                warning={step.warning}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
