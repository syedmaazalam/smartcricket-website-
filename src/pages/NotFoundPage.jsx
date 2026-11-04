import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { buttonHover, buttonTap } from '../lib/motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-28 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface text-accent flex items-center justify-center mx-auto shadow-xs">
          <HelpCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          Error 404
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight">
          Page Not Found
        </h1>

        <p className="text-muted text-base leading-relaxed">
          The page or match code you are looking for does not exist or has been moved.
        </p>

        <div className="pt-2">
          <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:bg-accent-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
