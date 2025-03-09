'use client';

import { motion } from 'framer-motion';

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating circles */}
        <motion.div
          className="absolute w-64 h-64 bg-primary-200/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-primary-400/20 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [20, 0, 20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-primary-600/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [-20, 0, -20],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Central mesh gradient sphere */}
        <div className="relative w-80 h-80">
          <motion.div
            className="absolute inset-0 rounded-full bg-mesh-gradient"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              filter: 'blur(40px)',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-white/30"
            style={{
              backdropFilter: 'blur(40px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
} 