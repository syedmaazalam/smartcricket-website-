import React from 'react';
import { motion } from 'motion/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 'faq-1',
    question: 'Is SmartCricket completely free?',
    answer: 'Yes. SmartCricket and all scoring, streaming, chart analytics, and summary poster export features are 100% free with no subscription or in-app purchases.',
  },
  {
    id: 'faq-2',
    question: 'Does the app work without an internet connection?',
    answer: 'Scoring works 100% offline. Every ball, wicket, extra, and undo is safely stored in local device storage. Once your device reconnects to Wi-Fi or mobile data, all events automatically sync to the cloud for spectators.',
  },
  {
    id: 'faq-3',
    question: 'Which Android versions are supported?',
    answer: 'SmartCricket supports Android 7.0 (Nougat) up to the latest Android 16. It is optimized to run smoothly even on entry-level budget phones with hardware GPU acceleration.',
  },
  {
    id: 'faq-4',
    question: 'Can I score or view matches on an iPhone or laptop?',
    answer: 'The downloadable APK is designed for Android. Spectators and iPhone users can view live matches, scorecards, and charts directly in any web browser at smartcricket-website.web.app without installing anything.',
  },
  {
    id: 'faq-5',
    question: 'How do the 6-character match codes work?',
    answer: 'Every match generates a clean, unique 6-character code (such as #ALPHA1). Spectators can simply enter this code into the search bar or open your shareable link to watch the ball-by-ball stream in real time.',
  },
  {
    id: 'faq-6',
    question: 'Is my match data private and safe?',
    answer: 'Your match data belongs to you. It is stored locally on your device first. Cloud synchronization only transmits match events for live viewing. No account registration is required to start scoring.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-surface/20 to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              <HelpCircle className="w-3.5 h-3.5 text-accent" />
              <span>Common Questions</span>
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight mb-4"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted text-base sm:text-lg leading-relaxed font-sans"
          >
            Everything you need to know about SmartCricket's offline scoring, spectator streams, and device compatibility.
          </motion.p>
        </div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion defaultValue="faq-1" className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger value={faq.id}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent value={faq.id}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
}
