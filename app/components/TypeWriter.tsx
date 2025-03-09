'use client';

import { motion } from 'framer-motion';

export default function TypeWriter({ text }: { text: string }) {
  const characters = text.split('');
  
  return (
    <span className="inline-block">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.05,
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
} 