'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  avatarUrl?: string;
  delay?: number;
}

export default function TeamMember({ name, role, avatarUrl, delay = 0 }: TeamMemberProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-primary-100 hover:shadow-xl transition-shadow duration-300">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-24 h-24 text-primary-300" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </motion.div>
  );
} 