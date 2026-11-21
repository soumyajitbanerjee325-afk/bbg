import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function WelcomeScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 25%, #fffbeb 50%, #fff7ed 75%, #fdf2f8 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-pastel-pink/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star />
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-pastel-pink/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 12}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Heart />
          </motion.div>
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-pastel-lavender/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 14 + 10}px`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-xl mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-rose-500 text-4xl"
          >
            <Heart className="w-12 h-12 fill-rose-500 text-rose-500 drop-shadow-sm" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-elegant text-4xl md:text-6xl lg:text-7xl font-normal text-gray-900 mb-6 leading-tight"
        >
          Hey, my favourite human. <span className="text-rose-500">❤️</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-sans text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Maybe today isn&apos;t your best day, but I hope this little corner of the internet makes you smile, even if just a little.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 35px -5px rgba(244, 63, 94, 0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={onComplete}
            className="px-10 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-lg rounded-full shadow-xl shadow-rose-300/40 cursor-pointer flex items-center gap-3 transition-all duration-300"
          >
            <span>Open your little surprise</span>
            <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-4 text-pastel-pink/60"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl"
          >
            <Heart />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="text-2xl"
          >
            <Sparkles />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="text-2xl"
          >
            <Star />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}