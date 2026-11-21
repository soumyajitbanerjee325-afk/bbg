import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Flower2, Feather } from 'lucide-react';

const floatingElements = [
  { Component: Heart, color: 'pastel-pink', count: 12, sizeRange: [16, 32], speedRange: [6, 12] },
  { Component: Sparkles, color: 'pastel-lavender', count: 10, sizeRange: [10, 20], speedRange: [3, 6] },
  { Component: Star, color: 'pastel-peach', count: 8, sizeRange: [14, 28], speedRange: [8, 15] },
  { Component: Flower2, color: 'pastel-peach', count: 6, sizeRange: [20, 36], speedRange: [10, 20] },
  { Component: Feather, color: 'pastel-pink', count: 5, sizeRange: [18, 30], speedRange: [12, 25] },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {floatingElements.map(({ Component, color, count, sizeRange, speedRange }) => (
        <div key={Component.displayName || Component.name} className="absolute inset-0">
          {Array.from({ length: count }).map((_, i) => {
            const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
            const speed = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
            const delay = Math.random() * 5;
            const left = Math.random() * 100;
            const drift = (Math.random() - 0.5) * 100;
            const rotate = (Math.random() - 0.5) * 40;
            
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: '100%',
                  fontSize: `${size}px`,
                  color: `hsl(${color === 'pastel-pink' ? 330 : color === 'pastel-lavender' ? 270 : 25}, 80%, ${60 + Math.random() * 20}%)`,
                  opacity: 0.15 + Math.random() * 0.2,
                }}
                animate={{
                  y: ['0%', '-120%'],
                  x: [0, drift * 0.3, drift * 0.6, drift],
                  rotate: [0, rotate * 0.5, rotate, 0],
                  opacity: [0, 0.3, 0.6, 0.3, 0],
                }}
                transition={{
                  duration: speed,
                  delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Component />
              </motion.div>
            );
          })}
        </div>
      ))}
      
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 2 + Math.random() * 4;
          const left = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 2 + Math.random() * 4;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: '100%',
                width: `${size}px`,
                height: `${size}px`,
                background: `hsl(${330 + Math.random() * 40}, 80%, ${70 + Math.random() * 20}%)`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                y: ['0%', '-110%'],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0, 0.5, 1, 0.5, 0],
                scale: [0.5, 1, 1.5, 1, 0.5],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}