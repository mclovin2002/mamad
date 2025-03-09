'use client';

import { useState, useEffect } from 'react';

export default function HeartTrail() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newHeart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="heart-trail">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: heart.x,
            top: heart.y
          }}
        >
          {['🌸', '💖', '✨'][Math.floor(Math.random() * 3)]}
        </div>
      ))}
    </div>
  );
} 