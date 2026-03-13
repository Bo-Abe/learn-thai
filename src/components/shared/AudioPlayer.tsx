import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAudio } from '@/context/AudioContext';

interface AudioPlayerProps {
  src: string;
  thaiText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

const buttonSizeMap = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

export function AudioPlayer({ src, thaiText, size = 'md', className = '' }: AudioPlayerProps) {
  const { t } = useTranslation('common');
  const { play, speak, stop, isPlaying, currentFile } = useAudio();
  const identifier = thaiText || src;
  const isCurrentlyPlaying = isPlaying && currentFile === identifier;

  const handleClick = () => {
    if (isCurrentlyPlaying) {
      stop();
    } else if (thaiText) {
      speak(thaiText);
    } else {
      play(src);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isCurrentlyPlaying ? t('audio.stop') : t('audio.play')}
      className={`
        rounded-full transition-all duration-200
        ${isCurrentlyPlaying
          ? 'bg-primary text-white shadow-blue'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
        }
        ${buttonSizeMap[size]}
        ${className}
      `}
    >
      {isCurrentlyPlaying ? <VolumeX size={sizeMap[size]} /> : <Volume2 size={sizeMap[size]} />}
    </button>
  );
}
