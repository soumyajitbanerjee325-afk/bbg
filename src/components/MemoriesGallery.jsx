import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, X, ZoomIn } from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;

const memories = [
  {
    id: 1,
    image: `${baseUrl}photos/photo1.jpg`,
    title: 'That Radiant Glow ✨',
    tag: 'Prettiest Eyes',
    caption: 'That captivating glance that makes my heart skip a beat every time.',
  },
  {
    id: 2,
    image: `${baseUrl}photos/photo2.jpg`,
    title: 'My Gorgeous Doll 💖',
    tag: 'Sweetest Smile',
    caption: 'With that lovely ruby sparkle and soft curls, pure magic in a frame.',
  },
  {
    id: 3,
    image: `${baseUrl}photos/photo3.jpg`,
    title: 'You & Me, Always 👩‍❤️‍👨',
    tag: 'Us Together',
    caption: 'Right here wrapped in your warmth is my favorite place in the universe.',
  },
  {
    id: 4,
    image: `${baseUrl}photos/photo4.jpg`,
    title: 'That Shy Little Tilt 🌸',
    tag: 'Sunshine',
    caption: 'That gentle head tilt and sweet smile that turns any day into pure joy.',
  },
  {
    id: 5,
    image: `${baseUrl}photos/photo5.jpg`,
    tag: 'Effortlessly Cute',
    title: 'Natural & Pure 💫',
    caption: 'Effortlessly adorable, sweet, and genuine. My favourite view forever.',
  },
];

const MemoriesGallery = forwardRef(function MemoriesGallery({ onNext }, ref) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedPhotos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20 flex flex-col items-center"
      id="memories"
    >
      {/* Section Header */}
      <div className="text-center mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Our Memories</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-gray-800 tracking-tight mb-3">
          Moments With You <span className="text-rose-500">❤️</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Every photo carries a piece of my heart. Tap any photo to zoom in.
        </p>
      </div>

      {/* Symmetrical Polaroid Gallery */}
      <div className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-7 mb-12">
        {memories.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setSelectedPhoto(item)}
            className="w-[270px] sm:w-[280px] bg-white p-3.5 pb-4 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-pink-100/80 cursor-pointer flex flex-col group relative"
          >
            {/* Tag Badge */}
            <span className="absolute top-5 right-5 z-10 px-2.5 py-0.5 text-[11px] font-semibold bg-white/90 backdrop-blur-md text-rose-600 rounded-full shadow-sm border border-pink-100">
              {item.tag}
            </span>

            {/* Photo Box */}
            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg bg-pink-50 relative mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 p-2 rounded-full text-rose-500 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Polaroid Label */}
            <div className="text-center px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-gray-800 mb-1 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans min-h-[38px] flex items-center justify-center">
                  {item.caption}
                </p>
              </div>

              {/* Heart like button */}
              <div className="flex items-center justify-end mt-2 pt-1.5 border-t border-pink-50">
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                  aria-label="Like this photo"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      likedPhotos[item.id] ? 'fill-rose-500 text-rose-500 scale-125' : 'hover:scale-110'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-pink-100"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[65vh]"
                />
              </div>

              <div className="p-5 text-center bg-gradient-to-b from-white to-pink-50/40">
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full mb-2">
                  {selectedPhoto.tag}
                </span>
                <h3 className="font-serif text-xl font-medium text-gray-800 mb-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {selectedPhoto.caption}
                </p>
                <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Cherished forever</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Section Button */}
      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="inline-flex items-center gap-2.5 px-9 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-base rounded-full shadow-lg shadow-rose-300/40 cursor-pointer transition-all duration-300"
        >
          <span>Read My Letter To You</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
});

export default MemoriesGallery;
