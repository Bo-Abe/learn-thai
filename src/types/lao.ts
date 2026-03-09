export interface LaoConsonant {
  id: string;
  character: string;
  romanization: string;
  ipaSound: string;
  class: 'high' | 'mid' | 'low';
  exampleWord: string;
  exampleTranslationEn: string;
  exampleTranslationFr: string;
  audioFile: string;
  strokeOrder?: number[];
}

export interface LaoVowel {
  id: string;
  symbol: string;
  position: 'before' | 'after' | 'above' | 'below' | 'around';
  romanization: string;
  ipaSound: string;
  length: 'short' | 'long';
  exampleWord: string;
  exampleTranslationEn: string;
  exampleTranslationFr: string;
  audioFile: string;
}

export interface LaoTone {
  id: string;
  nameEn: string;
  nameFr: string;
  nameLao: string;
  marker: string;
  descriptionEn: string;
  descriptionFr: string;
  contour: string;
  audioExample: string;
  minimalPairs: Array<{
    word1: string;
    meaning1En: string;
    meaning1Fr: string;
    word2: string;
    meaning2En: string;
    meaning2Fr: string;
  }>;
}

export type VocabCategory =
  | 'greetings'
  | 'numbers'
  | 'colors'
  | 'family'
  | 'food'
  | 'animals'
  | 'body'
  | 'time'
  | 'transport'
  | 'places'
  | 'commonVerbs'
  | 'adjectives'
  | 'usefulPhrases';

export interface VocabularyWord {
  id: string;
  lao: string;
  romanization: string;
  translationFr: string;
  translationEn: string;
  category: VocabCategory;
  difficulty: 1 | 2 | 3;
  audioFile: string;
  sentence?: {
    lao: string;
    romanization: string;
    translationFr: string;
    translationEn: string;
  };
}

export interface LaoNumber {
  id: string;
  laoNumeral: string;
  arabicNumeral: number;
  romanization: string;
  audioFile: string;
}

export interface QuizQuestion {
  id: string;
  type: 'recognition' | 'listening' | 'writing' | 'translation';
  prompt: string;
  correctAnswer: string;
  options?: string[];
  explanation?: string;
  difficulty: 1 | 2 | 3;
  relatedCharacterId?: string;
}

export interface QuizResult {
  id: string;
  type: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  duration: number;
  mistakes: Array<{
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
  }>;
}

export interface UserProgress {
  consonantsLearned: string[];
  vowelsLearned: string[];
  vocabularyLearned: string[];
  quizResults: QuizResult[];
  streak: {
    current: number;
    best: number;
    lastPracticeDate: string;
  };
  badges: string[];
  totalPracticeTime: number;
}
