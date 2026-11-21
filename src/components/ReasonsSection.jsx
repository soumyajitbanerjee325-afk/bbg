import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Smile, Flower2, Award, Crown, Infinity, Gem, Sun } from 'lucide-react';

const reasons = [
  {
    icon: Smile,
    front: "Your smile makes ordinary moments special.",
    back: "Every time you smile, the world becomes a little brighter. It's my favourite thing in the entire universe. ✨",
  },
  {
    icon: Heart,
    front: "Your presence makes life more beautiful.",
    back: "Just knowing you exist makes every day worth living. You're the magic in my mundane. 💕",
  },
  {
    icon: Star,
    front: "You deserve all the happiness in this world.",
    back: "Not just some happiness. All of it. Every single bit. You've earned it just by being you. 🌟",
  },
  {
    icon: Award,
    front: "You are appreciated more than you realise.",
    back: "For every little thing you do, for who you are, for how you care — thank you. You matter immensely. 🏆",
  },
  {
    icon: Crown,
    front: "You don't need to be perfect to be loved.",
    back: "Perfection is boring. Your authenticity, your quirks, your realness — that's what makes you perfectly you. 👑",
  },
  {
    icon: Gem,
    front: "Even your little imperfections make you uniquely you.",
    back: "Those 'flaws' you see? They're the brushstrokes that make you a masterpiece. I love every part of you. 💎",
  },
];

export default function ReasonsSection({ onNext, isActive }) {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const toggleCard = (index) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-20 px-6 relative"
      id="reasons"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`reason-bg-${i}`}
            className="absolute text-pastel-peach/20 float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 28 + 18}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            <Heart />
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-bg-${i}`}
            className="absolute text-pastel-lavender/30 twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 14 + 8}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-pastel-pink/50 shadow-lg mb-6"
          >
            <Gem className="w-8 h-8 text-pastel-pink" />
          </motion.div>
          <h2 className="font-elegant text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            Reasons Why You're Special
          </h2>
          <p className="text-pastel-pinkDark text-lg max-w-2xl mx-auto">
            Click each card to discover why you mean the world to me 💕
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="perspective-1000"
            >
              <div
                className={`flip-card ${flippedCards.has(index) ? 'flipped' : ''}`}
                onClick={() => toggleCard(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleCard(index)}
                aria-label={`Reason ${index + 1}: ${reason.front}. Click to reveal more.`}
                aria-pressed={flippedCards.has(index)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="relative mb-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pastel-pink/30 to-pastel-lavender/30 border border-pastel-pink/50"
                      >
                        <reason.icon className="w-7 h-7 text-pastel-pink" />
                      </motion.div>
                      {flippedCards.has(index) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-2 -right-2 bg-pastel-pink text-white text-xs px-2 py-1 rounded-full"
                        >
                          Tap to close
                        </motion.div>
                      )}
                    </div>
                    <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed px-4">
                      {reason.front}
                    </p>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      className="mt-6 text-pastel-pink/60"
                    >
                      <Sparkles className="w-5 h-5 mx-auto" />
                    </motion.div>
                  </div>
                  <div className="flip-card-back">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="font-handwritten text-gray-800 text-lg leading-relaxed"
                    >
                      {reason.back}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 flex items-center justify-center gap-2 text-pastel-pink/60"
                    >
                      <Heart className="w-5 h-5 heart-beat" />
                      <span className="font-handwritten text-sm">You're amazing</span>
                      <Heart className="w-5 h-5 heart-beat" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-handwritten text-2xl text-rose-600 mb-4">
            "And these are just a few... my heart has infinite reasons." 💕
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="mx-auto px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-medium text-lg shadow-lg shadow-rose-300/40 cursor-pointer transition-all"
          >
            Keep exploring →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}