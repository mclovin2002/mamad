import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FloatingAnimal {
  id: number;
  x: number;
  y: number;
  baseY: number;
  phase: number;
  image: string;
}

export default function FloatingAnimals() {
  const [animals, setAnimals] = useState<FloatingAnimal[]>([]);

  useEffect(() => {
    const numAnimals = 20;
    const newAnimals: FloatingAnimal[] = [];
    const animalImages = Array.from({ length: 20 }, (_, i) => `/animal${i + 1}.png`);

    // Divide screen into sections for better distribution
    const sectionsX = 4;
    const sectionsY = 5;
    const sectionWidth = 100 / sectionsX;
    const sectionHeight = 100 / sectionsY;

    for (let i = 0; i < numAnimals; i++) {
      // Calculate section indices
      const sectionX = i % sectionsX;
      const sectionY = Math.floor(i / sectionsX);

      // Calculate base position within section (add some randomness within the section)
      const baseX = (sectionX * sectionWidth) + (Math.random() * (sectionWidth * 0.6) + sectionWidth * 0.2);
      const baseY = (sectionY * sectionHeight) + (Math.random() * (sectionHeight * 0.6) + sectionHeight * 0.2);

      newAnimals.push({
        id: i,
        x: baseX,
        y: baseY,
        baseY: baseY,
        phase: Math.random() * Math.PI * 2,
        image: animalImages[i]
      });
    }

    setAnimals(newAnimals);

    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      setAnimals(prev => prev.map(animal => {
        // Gentle vertical float like emojis
        const verticalOffset = Math.sin(elapsed * 0.8 + animal.phase) * 60;
        const newY = animal.baseY + verticalOffset;

        return {
          ...animal,
          y: newY
        };
      }));

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {animals.map(animal => (
        <div
          key={animal.id}
          className="absolute transition-all duration-[1500ms] ease-sine"
          style={{
            left: `${animal.x}%`,
            top: `${animal.y}%`,
            transform: 'translate(-50%, -50%) scale(0.5)',
            opacity: 0.4
          }}
        >
          <Image
            src={animal.image}
            alt="Kawaii animal"
            width={150}
            height={150}
            className="select-none"
          />
        </div>
      ))}
    </div>
  );
}