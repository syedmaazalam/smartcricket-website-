import React, { useRef } from 'react';
import { motion } from 'motion/react';

export default function FeatureCard({ icon: Icon, tag, title, description, index }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.07), transparent 80%)`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl bg-white border border-border p-8 transition-all duration-300 hover:border-accent overflow-hidden group flex flex-col justify-between"
    >
      {/* Desktop Cursor Following Spotlight — Direct DOM gradient, 0 React re-renders */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden sm:block"
      />

      <div>
        {/* Icon Chip */}
        <div className="w-12 h-12 rounded-xl bg-surface text-accent flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="w-6 h-6" />
        </div>

        {/* Tag / Category in sentence-case readable size */}
        <span className="text-sm font-semibold text-accent mb-2 block">
          {tag}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-ink tracking-tight mb-3">
          {title}
        </h3>

        {/* Description in full body scale */}
        <p className="text-muted text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-sm text-muted font-medium">
        <span>Offline-ready</span>
        <span className="text-accent group-hover:translate-x-1 transition-transform">Free APK</span>
      </div>
    </motion.div>
  );
}
