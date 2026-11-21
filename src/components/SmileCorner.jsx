import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flower2, Smile, Gift, ArrowRight } from 'lucide-react';

const compliments = [
  "Your laugh is the best sound in the world 🌸",
  "You have the kindest heart I've ever known 💕",
  "The way you care for others is beautiful ✨",
  "You make everyone around you feel special 🌟",
  "Your eyes light up when you talk about things you love 💫",
  "You're stronger than you know, braver than you believe 🦋",
  "The world is lucky to have you in it 🌍",
  "Your existence is a gift to everyone who knows you 🎁",
  "You have a magic touch that makes things better ✨",
  "Just being you is more than enough 💖",
  "Your kindness ripples further than you can see 🌊",
  "You're a masterpiece in progress, and it's beautiful 🎨",
];

const flowers = [
  { emoji: '🌸', name: 'Cherry Blossom' },
  { emoji: '🌹', name: 'Rose' },
  { emoji: '🌺', name: 'Hibiscus' },
  { emoji: '🌻', name: 'Sunflower' },
  { emoji: '🌷', name: 'Tulip' },
  { emoji: '🌼', name: 'Daisy' },
  { emoji: '🪻', name: 'Hyacinth' },
  { emoji: '💐', name: 'Bouquet' },
];

export default function SmileCorner({ onNext, isActive }) {
  const [showCompliment, setShowCompliment] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState('');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [showBouquet, setShowBouquet] = useState(false);
  const [showHugs, setShowHugs] = useState(false);
  const [floatingFlowers, setFloatingFlowers] = useState([]);
  const complimentHistory = useState([])[0];

  const getRandomCompliment = () => {
    const available = compliments.filter((_, i) => !complimentHistory.includes(i));
    if (available.length === 0) {
      return compliments[Math.floor(Math.random() * compliments.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleSmileButton = () => {
    const newCompliment = getRandomCompliment();
    const newIndex = compliments.indexOf(newCompliment);
    setComplimentIndex(newIndex);
    setCurrentCompliment(newCompliment);
    setShowCompliment(true);
    setShowBouquet(false);
    setShowHugs(false);
    
    setFloatingFlowers(prev => [
      ...prev,
      ...Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        flower: flowers[Math.floor(Math.random() * flowers.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }))
    ]);
  };

  const handleBouquet = () => {
    setShowBouquet(true);
    setShowHugs(false);
    setFloatingFlowers(prev => [
      ...prev,
      ...Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        flower: flowers[Math.floor(Math.random() * flowers.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
      }))
    ]);
  };

  const handleHugs = () => {
    setShowHugs(true);
    setFloatingFlowers(prev => [
      ...prev,
      ...Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        flower: { emoji: '💖', name: 'Heart' },
        left: Math.random() * 100,
        delay: Math.random() * 1,
      }))
    ]);
  };

  const removeFlower = (id) => {
    setFloatingFlowers(prev => prev.filter(f => f.id !== id));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-20 px-6 relative overflow-hidden"
      id="smile"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`butterfly-${i}`}
            className="absolute text-pastel-peach/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, -80, -120],
              rotate: [-10, 10, -5, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'easeInOut',
            }}
          >
            <span className="text-2xl md:text-3xl">🦋</span>
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`flower-bg-${i}`}
            className="absolute text-pastel-pink/20 flower-sway"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            <Flower2 />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {floatingFlowers.map((flower) => (
          <motion.div
            key={flower.id}
            initial={{ y: 100, opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ y: -120, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5], rotate: [0, 180, 360] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, delay: flower.delay, ease: 'easeOut' }}
            onAnimationComplete={() => removeFlower(flower.id)}
            className="fixed pointer-events-none z-40 text-3xl md:text-4xl"
            style={{ left: `${flower.left}%`, top: '80%' }}
          >
            {flower.flower.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-pastel-pink/50 shadow-lg mb-6"
          >
            <Smile className="w-8 h-8 text-pastel-pink" />
          </motion.div>
          <h2 className="font-elegant text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            The Smile Corner
          </h2>
          <p className="text-pastel-pinkDark text-lg max-w-2xl mx-auto">
            A little place dedicated to making you smile. You deserve all the happiness! 💕
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative"
        >
          <div className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl border border-pastel-pink/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <Sparkles className="w-5 h-5 text-pastel-pink/60 animate-pulse" />
              <Heart className="w-5 h-5 text-pastel-pink/60 animate-pulse" />
            </div>

            <AnimatePresence mode="wait">
              {!showCompliment && !showBouquet && !showHugs ? (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-lavender shadow-xl mb-8"
                  >
                    <Heart className="w-10 h-10 text-white heart-beat" />
                  </motion.div>
                  <p className="font-handwritten text-2xl md:text-3xl text-gray-700 mb-8">
                    Need a little smile?
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 12px 40px -4px rgba(251, 207, 232, 0.6)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSmileButton}
                    className="px-10 py-4 bg-white/90 backdrop-blur-md border border-pastel-pink/50 rounded-full text-pastel-pinkDark font-medium text-lg shadow-xl glow-button"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-pastel-pink" />
                      Yes, please! ✨
                      <Sparkles className="w-5 h-5 text-pastel-pink" />
                    </span>
                  </motion.button>
                </motion.div>
              ) : showCompliment && !showBouquet && !showHugs ? (
                <motion.div
                  key="compliment"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pastel-pink/20 to-pastel-lavender/20 border border-pastel-pink/30 mb-6"
                  >
                    <Sparkles className="w-9 h-9 text-pastel-pink" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-handwritten text-2xl md:text-3xl text-gray-800 mb-8 px-4 leading-relaxed"
                  >
                    {currentCompliment}
                  </motion.p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSmileButton}
                      className="px-8 py-3 bg-gradient-to-r from-pastel-pink to-pastel-lavender text-white rounded-full font-medium shadow-lg glow-button"
                    >
                      Another one! ✨
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBouquet}
                      className="px-8 py-3 bg-white/90 backdrop-blur-md border border-pastel-pink/50 rounded-full text-pastel-pinkDark font-medium shadow-lg hover:bg-pastel-pink/10 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Flower2 className="w-5 h-5" />
                        Virtual bouquet 🌸
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : showBouquet && !showHugs ? (
                <motion.div
                  key="bouquet"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-pastel-pink/20 to-pastel-lavender/20 border border-pastel-pink/30 mb-6"
                  >
                    <span className="text-5xl md:text-6xl">💐</span>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-elegant text-3xl text-gray-800 mb-4"
                  >
                    A Virtual Bouquet For You
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-handwritten text-xl text-gray-600 mb-8 px-4"
                  >
                    Each flower represents a reason you're wonderful. 
                    <br />You deserve a garden of happiness! 🌸
                  </motion.p>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {flowers.map((flower, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 + i * 0.1 }}
                        className="text-3xl md:text-4xl flower-sway inline-block"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      >
                        {flower.emoji}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleHugs}
                    className="px-10 py-4 bg-gradient-to-r from-pastel-pink to-pastel-lavender text-white rounded-full font-medium text-lg shadow-xl glow-button"
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="w-5 h-5" />
                      Sending you unlimited hugs and happiness
                      <Heart className="w-5 h-5" />
                    </span>
                  </motion.button>
                </motion.div>
              ) : showHugs ? (
                <motion.div
                  key="hugs"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-pastel-pink/20 to-pastel-lavender/20 border border-pastel-pink/30 mb-6"
                  >
                    <span className="text-5xl md:text-6xl animate-pulse">🤗</span>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-elegant text-3xl text-gray-800 mb-4"
                  >
                    Unlimited Hugs Sent! 🤗💕
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-handwritten text-xl text-gray-600 mb-8 px-4"
                  >
                    Wrapping you in the warmest, coziest hug right now. 
                    <br />Feel the love traveling through the screen to you! ✨
                  </motion.p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 + i * 0.05 }}
                        className="text-2xl md:text-3xl heart-beat inline-block"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        💖
                      </motion.span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowCompliment(false);
                      setShowBouquet(false);
                      setShowHugs(false);
                    }}
                    className="px-8 py-3 bg-white/90 backdrop-blur-md border border-pastel-pink/50 rounded-full text-pastel-pinkDark font-medium shadow-lg hover:bg-pastel-pink/10 transition-colors"
                  >
                    Back to the Smile Corner
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-handwritten text-xl text-pastel-pinkDark mb-4">
            "Your smile is my favourite curve in the entire universe." 💕
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="mx-auto px-10 py-4 bg-gradient-to-r from-pastel-pink to-pastel-lavender text-white rounded-full font-medium text-lg shadow-xl glow-button"
          >
            Continue with love →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}