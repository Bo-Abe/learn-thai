import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// EN translations
import commonEn from '@/locales/en/common.json';
import homeEn from '@/locales/en/home.json';
import alphabetEn from '@/locales/en/alphabet.json';
import vocabularyEn from '@/locales/en/vocabulary.json';
import quizEn from '@/locales/en/quiz.json';
import writingEn from '@/locales/en/writing.json';
import progressEn from '@/locales/en/progress.json';
import settingsEn from '@/locales/en/settings.json';

// FR translations
import commonFr from '@/locales/fr/common.json';
import homeFr from '@/locales/fr/home.json';
import alphabetFr from '@/locales/fr/alphabet.json';
import vocabularyFr from '@/locales/fr/vocabulary.json';
import quizFr from '@/locales/fr/quiz.json';
import writingFr from '@/locales/fr/writing.json';
import progressFr from '@/locales/fr/progress.json';
import settingsFr from '@/locales/fr/settings.json';

const resources = {
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
  fr: {
    common: commonFr,
    home: homeFr,
    alphabet: alphabetFr,
    vocabulary: vocabularyFr,
    quiz: quizFr,
    writing: writingFr,
    progress: progressFr,
    settings: settingsFr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'alphabet', 'vocabulary', 'quiz', 'writing', 'progress', 'settings'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18n_lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
