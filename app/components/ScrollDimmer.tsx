'use client';

import { useEffect, useState } from 'react';

export default function ScrollDimmer() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (position / height) * 100;
      setScrollPosition(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top dimmer */}
      <div
        className="fixed top-0 left-0 right-0 h-48 pointer-events-none z-40"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.1) 20%,
              rgba(255,255,255,0.05) 40%,
              transparent 100%
            ),
            linear-gradient(to bottom,
              rgba(0,0,0,0.2) 0%,
              rgba(0,0,0,0.1) 40%,
              rgba(0,0,0,0.05) 60%,
              transparent 100%
            )
          `,
          opacity: Math.min(scrollPosition / 30, 1),
          transition: 'opacity 0.2s ease-out'
        }}
      />
      {/* Bottom dimmer */}
      <div
        className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none z-40"
        style={{
          background: `
            linear-gradient(to top,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.1) 20%,
              rgba(255,255,255,0.05) 40%,
              transparent 100%
            ),
            linear-gradient(to top,
              rgba(0,0,0,0.2) 0%,
              rgba(0,0,0,0.1) 40%,
              rgba(0,0,0,0.05) 60%,
              transparent 100%
            )
          `,
          opacity: Math.min(scrollPosition / 30, 1),
          transition: 'opacity 0.2s ease-out'
        }}
      />
    </>
  );
} 