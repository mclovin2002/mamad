'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  avatarUrl?: string;
  delay?: number;
}

export default function TeamMember({ name, role, avatarUrl, delay = 0 }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState(avatarUrl);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (avatarUrl?.toLowerCase().endsWith('.heic')) {
      const filename = avatarUrl.split('/').pop();
      setImageUrl(`/api/convert-image?filename=${filename}`);
    }
  }, [avatarUrl]);

  return (
    <motion.div
      className="text-center kawaii-decoration"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-pink-50 hover:shadow-xl transition-shadow duration-300 border-4 border-pink-100"
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 5 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-24 h-24 text-pink-300" />
          </div>
        )}
      </motion.div>
      <motion.h3 
        className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
        animate={{
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.h3>
      <p className="text-pink-600">{role}</p>
    </motion.div>
  );
} 