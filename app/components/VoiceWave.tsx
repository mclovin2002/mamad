'use client';

import { motion } from 'framer-motion';

export default function VoiceWave() {
  const bars = Array.from({ length: 5 });
  
  return (
    <div className="flex items-center justify-center gap-1">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary-500 to-primary-300"
          animate={{
            height: ['15px', '45px', '15px'],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
} 