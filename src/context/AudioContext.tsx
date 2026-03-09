import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';

type AudioSpeed = 0.75 | 1 | 1.25;

interface AudioState {
  isPlaying: boolean;
  currentFile: string | null;
  speed: AudioSpeed;
  autoplay: boolean;
}

type AudioAction =
  | { type: 'PLAY'; payload: string }
  | { type: 'STOP' }
  | { type: 'SET_SPEED'; payload: AudioSpeed }
  | { type: 'TOGGLE_AUTOPLAY' };

interface AudioContextType extends AudioState {
  play: (file: string) => void;
  stop: () => void;
  setSpeed: (speed: AudioSpeed) => void;
  toggleAutoplay: () => void;
}

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

let currentAudio: HTMLAudioElement | null = null;

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true, currentFile: action.payload };
    case 'STOP':
      return { ...state, isPlaying: false, currentFile: null };
    case 'SET_SPEED':
      return { ...state, speed: action.payload };
    case 'TOGGLE_AUTOPLAY':
      return { ...state, autoplay: !state.autoplay };
    default:
      return state;
  }
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    currentFile: null,
    speed: 1,
    autoplay: false,
  });

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    dispatch({ type: 'STOP' });
  }, []);

  const play = useCallback(
    (file: string) => {
      stop();

      // Audio files are placeholders — use Web Audio API with a generated tone
      // In production, replace with actual .mp3 files from Google TTS or Forvo
      try {
        const audio = new Audio(file);
        audio.playbackRate = state.speed;
        audio.addEventListener('ended', () => dispatch({ type: 'STOP' }));
        audio.addEventListener('error', () => {
          // Fallback: generate a short beep to indicate audio would play here
          const ctx = new AudioContext();
          const oscillator = ctx.createOscillator();
          const gain = ctx.createGain();
          oscillator.connect(gain);
          gain.connect(ctx.destination);
          oscillator.frequency.value = 440;
          gain.gain.value = 0.1;
          oscillator.start();
          setTimeout(() => {
            oscillator.stop();
            ctx.close();
            dispatch({ type: 'STOP' });
          }, 200);
        });
        audio.play().catch(() => {
          dispatch({ type: 'STOP' });
        });
        currentAudio = audio;
        dispatch({ type: 'PLAY', payload: file });
      } catch {
        dispatch({ type: 'STOP' });
      }
    },
    [state.speed, stop],
  );

  const setSpeed = useCallback((speed: AudioSpeed) => {
    dispatch({ type: 'SET_SPEED', payload: speed });
    localStorage.setItem('audio_speed', String(speed));
  }, []);

  const toggleAutoplay = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTOPLAY' });
  }, []);

  return (
    <AudioCtx.Provider value={{ ...state, play, stop, setSpeed, toggleAutoplay }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioCtx);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}
