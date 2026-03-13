import { createContext, useContext, useReducer, useCallback, useEffect, useRef, type ReactNode } from 'react';

type AudioSpeed = 0.75 | 1 | 1.25;

interface AudioState {
  isPlaying: boolean;
  currentFile: string | null;
  speed: AudioSpeed;
  autoplay: boolean;
  speechSupported: boolean;
  thaiVoiceAvailable: boolean;
}

type AudioAction =
  | { type: 'PLAY'; payload: string }
  | { type: 'STOP' }
  | { type: 'SET_SPEED'; payload: AudioSpeed }
  | { type: 'TOGGLE_AUTOPLAY' }
  | { type: 'SET_SPEECH_SUPPORT'; payload: { speechSupported: boolean; thaiVoiceAvailable: boolean } };

interface AudioContextType extends AudioState {
  play: (file: string) => void;
  speak: (text: string) => void;
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
    case 'SET_SPEECH_SUPPORT':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function findThaiVoice(): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices();
  const thaiVoice = voices.find((v) => v.lang.startsWith('th'));
  if (thaiVoice) return thaiVoice;
  // Lao is closely related and may pronounce Thai text acceptably
  const laoVoice = voices.find((v) => v.lang.startsWith('lo'));
  return laoVoice || null;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    currentFile: null,
    speed: 1,
    autoplay: false,
    speechSupported: false,
    thaiVoiceAvailable: false,
  });

  const speedRef = useRef(state.speed);
  speedRef.current = state.speed;

  // Detect speech synthesis support and available voices
  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      dispatch({ type: 'SET_SPEECH_SUPPORT', payload: { speechSupported: false, thaiVoiceAvailable: false } });
      return;
    }

    const checkVoices = () => {
      const voice = findThaiVoice();
      dispatch({
        type: 'SET_SPEECH_SUPPORT',
        payload: { speechSupported: true, thaiVoiceAvailable: !!voice },
      });
    };

    checkVoices();
    speechSynthesis.addEventListener('voiceschanged', checkVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', checkVoices);
  }, []);

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
    dispatch({ type: 'STOP' });
  }, []);

  const speak = useCallback(
    (text: string) => {
      stop();

      if (typeof speechSynthesis === 'undefined') {
        dispatch({ type: 'STOP' });
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = findThaiVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'th-TH';
      }
      utterance.rate = speedRef.current;

      utterance.onend = () => dispatch({ type: 'STOP' });
      utterance.onerror = () => dispatch({ type: 'STOP' });

      dispatch({ type: 'PLAY', payload: text });
      speechSynthesis.speak(utterance);
    },
    [stop],
  );

  const play = useCallback(
    (file: string) => {
      stop();

      try {
        const audio = new Audio(file);
        audio.playbackRate = speedRef.current;
        audio.addEventListener('ended', () => dispatch({ type: 'STOP' }));
        audio.addEventListener('error', () => {
          dispatch({ type: 'STOP' });
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
    [stop],
  );

  const setSpeed = useCallback((speed: AudioSpeed) => {
    dispatch({ type: 'SET_SPEED', payload: speed });
    localStorage.setItem('audio_speed', String(speed));
  }, []);

  const toggleAutoplay = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTOPLAY' });
  }, []);

  return (
    <AudioCtx.Provider value={{ ...state, play, speak, stop, setSpeed, toggleAutoplay }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioCtx);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}
