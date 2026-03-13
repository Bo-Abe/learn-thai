import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Volume2 } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

interface FlashcardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  audioFile?: string;
  thaiText?: string;
  onFlip?: (isFlipped: boolean) => void;
  className?: string;
}

export function Flashcard({ front, back, audioFile, thaiText, onFlip, className = '' }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { play: playAudio, speak } = useAudio();

  const handleFlip = useCallback(() => {
    const next = !isFlipped;
    setIsFlipped(next);
    onFlip?.(next);
  }, [isFlipped, onFlip]);

  const handleAudio = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (thaiText) {
        speak(thaiText);
      } else if (audioFile) {
        playAudio(audioFile);
      }
    },
    [thaiText, audioFile, speak, playAudio],
  );

  const hasAudio = !!(thaiText || audioFile);

  return (
    <div className={`perspective-[1000px] ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={handleFlip}
      >
        {/* Front */}
        <div
          className="w-full rounded-xl shadow-blue"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-black/5 dark:border-white/10 p-8 min-h-[280px] flex flex-col items-center justify-center">
            {front}
            <div className="flex items-center gap-3 mt-6">
              {hasAudio && (
                <button
                  onClick={handleAudio}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label="Play audio"
                >
                  <Volume2 size={20} className="text-primary" />
                </button>
              )}
              <button
                onClick={handleFlip}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                aria-label="Flip card"
              >
                <RotateCcw size={20} className="text-muted" />
              </button>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full rounded-xl shadow-blue"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-primary/20 p-8 min-h-[280px] flex flex-col items-center justify-center">
            {back}
            <div className="flex items-center gap-3 mt-6">
              {hasAudio && (
                <button
                  onClick={handleAudio}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label="Play audio"
                >
                  <Volume2 size={20} className="text-primary" />
                </button>
              )}
              <button
                onClick={handleFlip}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                aria-label="Flip card"
              >
                <RotateCcw size={20} className="text-muted" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
