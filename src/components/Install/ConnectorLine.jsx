import React from 'react';
import { motion } from 'motion/react';

export default function ConnectorLine() {
  return (
    <div className="hidden lg:block absolute top-1/2 left-[18%] right-[18%] -translate-y-8 pointer-events-none z-0">
      <svg className="w-full h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 0 16 Q 250 -10 500 16 T 1000 16"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeDasharray="6 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
