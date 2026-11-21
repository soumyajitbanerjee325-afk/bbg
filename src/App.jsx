import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Sparkles, Flower2, Music, Mail, Star, Smile, Image, Upload, X, ChevronRight } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import MemoriesGallery from './components/MemoriesGallery';
import LetterSection from './components/LetterSection';
import ReasonsSection from './components/ReasonsSection';
import SmileCorner from './components/SmileCorner';
import PromiseSection from './components/PromiseSection';
import FinalSurprise from './components/FinalSurprise';
import FloatingElements from './components/FloatingElements';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

const sections = [
  { id: 'memories', name: 'Photos', icon: '📸', component: MemoriesGallery },
  { id: 'letter', name: 'Letter', icon: '💌', component: LetterSection },
  { id: 'reasons', name: 'Reasons', icon: '💖', component: ReasonsSection },
  { id: 'smile', name: 'Smiles', icon: '🌸', component: SmileCorner },
  { id: 'promise', name: 'Promises', icon: '🤝', component: PromiseSection },
  { id: 'final', name: 'Surprise', icon: '🎁', component: FinalSurprise },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentSection, setCurrentSection] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const sectionRefs = useRef(sections.map(() => null));

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeComplete = () => {
    setCurrentScreen('main');
    setCurrentSection(0);
    setIsMusicPlaying(true);
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setTimeout(() => {
        sectionRefs.current[currentSection + 1]?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setTimeout(() => {
        sectionRefs.current[currentSection - 1]?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingElements />
      
      <MusicPlayer isPlaying={isMusicPlaying} onToggle={setIsMusicPlaying} />
      
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      {currentScreen === 'main' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <nav className="fixed top-4 right-4 z-50 flex items-center gap-2 sm:gap-3 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-pink-200">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSection}
              disabled={currentSection === 0}
              className="p-1.5 text-rose-500 hover:text-rose-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous section"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </motion.button>
            
            <div className="flex items-center gap-1 sm:gap-1.5 px-1">
              <span className="text-xs font-medium text-gray-700 mr-1 hidden sm:inline-block">
                {sections[currentSection].icon} {sections[currentSection].name}
              </span>
              {sections.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentSection(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSection
                      ? 'bg-rose-500 w-5'
                      : 'bg-rose-200 hover:bg-rose-300 w-2'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextSection}
              disabled={currentSection === sections.length - 1}
              className="p-1.5 text-rose-500 hover:text-rose-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              aria-label="Next section"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </nav>

          <main className="min-h-screen pb-20">
            <AnimatePresence mode="wait">
              <CurrentSectionComponent
                key={currentSection}
                ref={sectionRefs.current[currentSection]}
                onNext={handleNextSection}
                isActive={true}
              />
            </AnimatePresence>
          </main>

          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none"
            >
              <div className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-pastel-pink/50">
                <p className="text-xs text-pastel-pinkDark font-medium">Scroll or use arrows to explore ✨</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-pastel-pink"
                >
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;