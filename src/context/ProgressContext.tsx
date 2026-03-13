import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { UserProgress, QuizResult } from '@/types/thai';

const STORAGE_KEY = 'thai_learning_progress';

const defaultProgress: UserProgress = {
  consonantsLearned: [],
  vowelsLearned: [],
  vocabularyLearned: [],
  quizResults: [],
  streak: {
    current: 0,
    best: 0,
    lastPracticeDate: '',
  },
  badges: [],
  totalPracticeTime: 0,
};

type ProgressAction =
  | { type: 'LEARN_CONSONANT'; payload: string }
  | { type: 'UNLEARN_CONSONANT'; payload: string }
  | { type: 'LEARN_VOWEL'; payload: string }
  | { type: 'UNLEARN_VOWEL'; payload: string }
  | { type: 'LEARN_VOCABULARY'; payload: string }
  | { type: 'ADD_QUIZ_RESULT'; payload: QuizResult }
  | { type: 'UPDATE_STREAK' }
  | { type: 'ADD_BADGE'; payload: string }
  | { type: 'ADD_PRACTICE_TIME'; payload: number }
  | { type: 'RESET' }
  | { type: 'LOAD'; payload: UserProgress };

interface ProgressContextType extends UserProgress {
  dispatch: React.Dispatch<ProgressAction>;
  learnConsonant: (id: string) => void;
  unlearnConsonant: (id: string) => void;
  learnVowel: (id: string) => void;
  unlearnVowel: (id: string) => void;
  learnVocabulary: (id: string) => void;
  addQuizResult: (result: QuizResult) => void;
  updateStreak: () => void;
  addBadge: (badge: string) => void;
  resetProgress: () => void;
  overallPercentage: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function progressReducer(state: UserProgress, action: ProgressAction): UserProgress {
  switch (action.type) {
    case 'LEARN_CONSONANT':
      if (state.consonantsLearned.includes(action.payload)) return state;
      return { ...state, consonantsLearned: [...state.consonantsLearned, action.payload] };
    case 'UNLEARN_CONSONANT':
      return {
        ...state,
        consonantsLearned: state.consonantsLearned.filter((id) => id !== action.payload),
      };
    case 'LEARN_VOWEL':
      if (state.vowelsLearned.includes(action.payload)) return state;
      return { ...state, vowelsLearned: [...state.vowelsLearned, action.payload] };
    case 'UNLEARN_VOWEL':
      return {
        ...state,
        vowelsLearned: state.vowelsLearned.filter((id) => id !== action.payload),
      };
    case 'LEARN_VOCABULARY':
      if (state.vocabularyLearned.includes(action.payload)) return state;
      return { ...state, vocabularyLearned: [...state.vocabularyLearned, action.payload] };
    case 'ADD_QUIZ_RESULT':
      return { ...state, quizResults: [...state.quizResults, action.payload] };
    case 'UPDATE_STREAK': {
      const today = new Date().toISOString().split('T')[0]!;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]!;
      const lastDate = state.streak.lastPracticeDate;

      if (lastDate === today) return state;

      const newCurrent = lastDate === yesterday ? state.streak.current + 1 : 1;
      const newBest = Math.max(state.streak.best, newCurrent);

      return {
        ...state,
        streak: { current: newCurrent, best: newBest, lastPracticeDate: today },
      };
    }
    case 'ADD_BADGE':
      if (state.badges.includes(action.payload)) return state;
      return { ...state, badges: [...state.badges, action.payload] };
    case 'ADD_PRACTICE_TIME':
      return { ...state, totalPracticeTime: state.totalPracticeTime + action.payload };
    case 'RESET':
      return { ...defaultProgress };
    case 'LOAD':
      return { ...action.payload };
    default:
      return state;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, defaultProgress);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        dispatch({ type: 'LOAD', payload: parsed });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const overallPercentage = Math.round(
    ((state.consonantsLearned.length / 44 +
      state.vowelsLearned.length / 30 +
      state.vocabularyLearned.length / 200) /
      3) *
      100,
  );

  const contextValue: ProgressContextType = {
    ...state,
    dispatch,
    overallPercentage,
    learnConsonant: (id) => dispatch({ type: 'LEARN_CONSONANT', payload: id }),
    unlearnConsonant: (id) => dispatch({ type: 'UNLEARN_CONSONANT', payload: id }),
    learnVowel: (id) => dispatch({ type: 'LEARN_VOWEL', payload: id }),
    unlearnVowel: (id) => dispatch({ type: 'UNLEARN_VOWEL', payload: id }),
    learnVocabulary: (id) => dispatch({ type: 'LEARN_VOCABULARY', payload: id }),
    addQuizResult: (result) => dispatch({ type: 'ADD_QUIZ_RESULT', payload: result }),
    updateStreak: () => dispatch({ type: 'UPDATE_STREAK' }),
    addBadge: (badge) => dispatch({ type: 'ADD_BADGE', payload: badge }),
    resetProgress: () => dispatch({ type: 'RESET' }),
  };

  return <ProgressContext.Provider value={contextValue}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
}
