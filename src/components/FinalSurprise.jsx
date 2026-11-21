import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Star, ArrowRight, Infinity, Music } from 'lucide-react';

export default function FinalSurprise({ onNext, isActive }) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => {
      setShowMessage(true);
      setShowHearts(true);
    }, 600);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-20 px-6 relative flex flex-col justify-center"
      id="final"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`final-heart-${i}`}
            className="absolute text-pastel-pink/20 heart-beat"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
            }}
          >
            <Heart />
          </motion.div>
        ))}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`final-sparkle-${i}`}
            className="absolute text-pastel-lavender/30 twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 18 + 12}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles />
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`final-star-${i}`}
            className="absolute text-pastel-peach/30 float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 28 + 18}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            <Star />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showHearts && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`burst-heart-${i}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  opacity: [1, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400 - 200,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: Math.random() * 1.5 + 1, 
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl"
                style={{ color: `hsl(${330 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%)` }}
              >
                💖
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-3xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-pastel-pink/50 shadow-lg mb-6"
          >
            <Mail className="w-8 h-8 text-pastel-pink" />
          </motion.div>
          <h2 className="font-elegant text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            One Last Thing...
          </h2>
          <p className="text-pastel-pinkDark text-lg">
            A final surprise, wrapped with all my love 💕
          </p>
        </motion.div>

        {!envelopeOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
            onClick={handleOpenEnvelope}
            className="envelope cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenEnvelope()}
            aria-label="Open the envelope"
          >
            <motion.div
              className="envelope-flap"
              animate={{ rotateX: envelopeOpen ? -180 : 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl md:text-4xl"
                >
                  <Heart className="w-10 h-10 text-pastel-pink heart-beat" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-pastel-pink/60 font-medium"
                >
                  Tap to open ✨
                </motion.div>
              </div>
            </motion.div>
            <div className="envelope-body">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-handwritten text-xl text-gray-700"
              >
                "For my favourite person..."
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-pastel-pink/20 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-pastel-pink" />
                <span className="font-medium text-pastel-pinkDark text-sm">Open with love</span>
                <Sparkles className="w-4 h-4 text-pastel-pink" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
              className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl border border-pastel-pink/30 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 flex gap-2 pointer-events-none">
                <Sparkles className="w-5 h-5 text-pastel-pink/60 animate-pulse" />
                <Heart className="w-5 h-5 text-pastel-pink/60 animate-pulse" />
                <Infinity className="w-5 h-5 text-pastel-pink/60 animate-pulse" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pastel-pink/20 to-pastel-lavender/20 border border-pastel-pink/30 mb-6"
              >
                <Heart className="w-9 h-9 text-pastel-pink heart-beat" />
              </motion.div>

              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    key="letter-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="font-sans text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-wrap space-y-5"
                  >
                    <p className="font-medium">Out of all the people in this world, I'm really glad I found you.</p>
                    <p>You're my favourite notification, my favourite conversation, and one of my favourite parts of life.</p>
                    <p className="font-handwritten text-2xl md:text-3xl text-pastel-pink pt-4">I love you, Noor. ❤️</p>
                    <p className="font-handwritten text-xl text-gray-600 pt-2">Forever your Ruh.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="mt-10 pt-8 border-t border-pastel-pink/30 flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-3 text-pastel-pink/60">
                  <Heart className="w-5 h-5 heart-beat" />
                  <span className="font-handwritten text-lg">With infinite love</span>
                  <Heart className="w-5 h-5 heart-beat" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 text-pastel-pink/50"
                >
                  <Infinity className="w-6 h-6" />
                  <span className="font-handwritten text-sm">Forever & always</span>
                  <Infinity className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: envelopeOpen && showMessage ? 1 : 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-handwritten text-xl text-pastel-pinkDark mb-6">
            "And this isn't goodbye... it's just the beginning of forever." 💕
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEnvelopeOpen(false);
                setShowMessage(false);
                setShowHearts(false);
              }}
              className="mx-auto px-10 py-4 bg-gradient-to-r from-pastel-pink to-pastel-lavender text-white rounded-full font-medium text-lg shadow-xl glow-button"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                Relive this moment again
                <Heart className="w-5 h-5" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mx-auto px-8 py-3 bg-white/90 backdrop-blur-md border border-pastel-pink/50 rounded-full text-pastel-pinkDark font-medium shadow-lg hover:bg-pastel-pink/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to the beginning
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}