import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Sparkles, Smile, Sun, ChevronRight, Anchor } from 'lucide-react';

const promises = [
  {
    icon: ShieldCheck,
    title: 'To Always Be Your Safe Space',
    desc: 'You never have to put on a brave face with me. Come as you are, with all your feelings, thoughts, and worries.',
  },
  {
    icon: Heart,
    title: 'To Listen With An Open Heart',
    desc: 'Whether it is a tiny rambling story about your day or something heavy on your chest, I will always be here to listen.',
  },
  {
    icon: Sun,
    title: 'To Celebrate You Always',
    desc: 'Not just on big days, but in every little victory, every smile, and simply for being the wonderful person you are.',
  },
  {
    icon: Anchor,
    title: 'To Stand By You Through Storms',
    desc: 'When days get tough or shadows feel long, I will hold your hand firmly. You will never have to face the dark alone.',
  },
  {
    icon: Sparkles,
    title: 'To Love You More Each Day',
    desc: 'Through all seasons, in quiet moments and loud laughter, my love for you will only continue to grow deeper.',
  },
  {
    icon: Smile,
    title: 'To Bring A Smile To Your Face',
    desc: 'To remind you how gorgeous, capable, and cherished you are whenever you forget your own magic.',
  },
];

const PromiseSection = forwardRef(function PromiseSection({ onNext }, ref) {
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-20 flex flex-col items-center"
      id="promise"
    >
      <div className="text-center mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>From My Heart</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-gray-800 mb-3">
          My Promises To You <span className="text-rose-500">❤️</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Promises carved not in stone, but in every single beat of my heart.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full">
        {promises.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-pink-100 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-pink-50 flex items-center gap-1.5 text-xs text-rose-500 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Pinky promise</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-base rounded-full shadow-lg shadow-rose-300/40 cursor-pointer transition-all"
        >
          <span>One Final Surprise Awaits</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
});

export default PromiseSection;
