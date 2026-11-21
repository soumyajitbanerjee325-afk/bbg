import { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Mail, ChevronRight } from 'lucide-react';

const letterLines = [
  "Hey Noor,",
  "",
  "I don't know exactly what's going through your mind right now, and I won't pretend that a few words can magically fix everything.",
  "",
  "But I want you to remember something.",
  "",
  "You deserve peaceful days, genuine happiness, countless reasons to smile, and people who appreciate the beautiful person you are.",
  "",
  "You don't always have to be happy. You don't always have to pretend everything is okay. It's completely fine to have difficult days.",
  "",
  "I hope you never forget how special you are.",
  "",
  "And whenever the world feels a little too overwhelming, I hope you remember that there is someone who genuinely wishes to see you happy.",
  "",
  "Take your time, my favourite person. ❤️",
  "",
  "With all my love,",
  "Your Ruh."
];

const LetterSection = forwardRef(function LetterSection({ onNext }, ref) {
  const [visibleCount, setVisibleCount] = useState(letterLines.length);

  // Smooth gentle line reveal
  useEffect(() => {
    setVisibleCount(1);
    let count = 1;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= letterLines.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-20 flex flex-col items-center"
      id="letter"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-md mb-4"
        >
          <Mail className="w-7 h-7 text-rose-500" />
        </motion.div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-gray-800 mb-2">
          A Letter For You <span className="text-rose-500">💌</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Written with all my heart, just for you. 💕
        </p>
      </div>

      {/* Romantic Letter Paper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full bg-[#fdfbf7] rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl border border-pink-200/80 relative overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(#fce7f3 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Decorative corner stamp */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-pink-200 rounded-full shadow-sm text-xs text-rose-600 font-medium">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>With All My Love</span>
        </div>

        {/* Letter Text */}
        <div className="font-handwritten text-xl sm:text-2xl md:text-3xl text-gray-800 leading-relaxed sm:leading-loose select-none space-y-2">
          {letterLines.slice(0, visibleCount).map((line, idx) => (
            <p key={idx} className={line === "" ? "h-3" : ""}>
              {line}
            </p>
          ))}
        </div>

        {/* Signature & Next Button */}
        <div className="mt-10 pt-6 border-t border-pink-200/60 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span className="font-handwritten text-xl sm:text-2xl">Forever yours, Ruh</span>
            <Heart className="w-4 h-4 fill-rose-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-medium text-base shadow-lg shadow-rose-300/40 cursor-pointer transition-all mt-3 mb-2"
          >
            <span>See Reasons Why I Love You</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Romantic Quote Footer */}
      <div className="mt-8 mb-4 text-center">
        <p className="font-handwritten text-xl sm:text-2xl text-rose-600">
          "Words may be small, but the love behind them is infinite." 💕
        </p>
      </div>
    </motion.section>
  );
});

export default LetterSection;
