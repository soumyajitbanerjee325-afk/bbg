import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

export default function MusicPlayer({ isPlaying, onToggle }) {
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const audio = new Audio(`${baseUrl}music/background.mp3`);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    const handleError = () => {
      // Fallback to /audio/song.mp3
      if (audio.src.includes('background.mp3')) {
        audio.src = `${baseUrl}audio/song.mp3`;
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay prevented by browser:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleClick = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      onToggle(false);
    } else {
      audioRef.current.play().then(() => {
        onToggle(true);
      }).catch(console.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-4 left-4 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        className="flex items-center gap-2.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-md hover:shadow-lg border border-pink-200 transition-all cursor-pointer"
        aria-label={isPlaying ? 'Pause song' : 'Play song'}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            isPlaying 
              ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-300' 
              : 'bg-rose-50 text-rose-500'
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </div>
        
        <div className="flex flex-col text-left pr-1">
          <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
            <span>Mere Paas Tum Raho</span>
            <span className="text-[10px] text-rose-500">❤️</span>
          </span>
          <span className="text-[10px] text-gray-500">
            {isPlaying ? 'Playing softly' : 'Tap to play music'}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
}