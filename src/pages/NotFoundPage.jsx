import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-28 text-center">
      <div className="max-w-md mx-auto glass-card rounded-[36px] p-8 sm:p-12 border border-white/90 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-surface/80 text-accent flex items-center justify-center mx-auto shadow-xs border border-white">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div>
          <Badge variant="glass" className="text-xs font-mono font-bold text-accent mb-3">
            Error 404
          </Badge>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Page Not Found
          </h1>
        </div>

        <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
          The page or match code you are looking for does not exist or has been moved.
        </p>

        <div className="pt-2">
          <Button asChild variant="glow" size="lg" className="rounded-2xl">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
