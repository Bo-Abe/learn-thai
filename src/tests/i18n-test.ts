import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '@/locales/en/common.json';
import homeEn from '@/locales/en/home.json';
import alphabetEn from '@/locales/en/alphabet.json';
import vocabularyEn from '@/locales/en/vocabulary.json';
import quizEn from '@/locales/en/quiz.json';
import writingEn from '@/locales/en/writing.json';
import progressEn from '@/locales/en/progress.json';
import settingsEn from '@/locales/en/settings.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'home', 'alphabet', 'vocabulary', 'quiz', 'writing', 'progress', 'settings'],
  resources: {
    en: {
      common: commonEn,
      home: homeEn,
      alphabet: alphabetEn,
      vocabulary: vocabularyEn,
      quiz: quizEn,
      writing: writingEn,
      progress: progressEn,
      settings: settingsEn,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
