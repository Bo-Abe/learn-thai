import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shuffle, Check, BookOpen, Languages } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Flashcard } from '@/components/shared/Flashcard';
import { consonants } from '@/data/consonants';
import { vocabulary } from '@/data/vocabulary';
import { useProgress } from '@/context/ProgressContext';
import type { VocabCategory } from '@/types/thai';

type FlashcardMode = 'consonants' | 'vocabulary';

const categoryIcons: Record<string, string> = {
  greetings: '👋', numbers: '🔢', colors: '🎨', family: '👨‍👩‍👧‍👦',
  food: '🍜', animals: '🐘', body: '🫀', time: '⏰',
  transport: '🚗', places: '🏛️', commonVerbs: '🏃', adjectives: '📏',
  usefulPhrases: '💬',
};

export default function FlashcardsPage() {
  const { t, i18n } = useTranslation(['common']);
  const progress = useProgress();
  const lang = i18n.language;

  const [mode, setMode] = useState<FlashcardMode>('consonants');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [vocabCategory, setVocabCategory] = useState<VocabCategory | 'all'>('all');

  const filteredVocab = useMemo(() => {
    if (vocabCategory === 'all') return vocabulary;
    return vocabulary.filter((w) => w.category === vocabCategory);
  }, [vocabCategory]);

  const items = useMemo(() => {
    const source = mode === 'consonants' ? consonants : filteredVocab;
    if (!isShuffled) return source;
    return [...source].sort(() => Math.random() - 0.5);
  }, [mode, filteredVocab, isShuffled]);

  const currentItem = items[currentIndex];
  const total = items.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const handleShuffle = useCallback(() => {
    setIsShuffled((s) => !s);
    setCurrentIndex(0);
  }, []);

  const markLearned = useCallback(() => {
    if (!currentItem) return;
    if (mode === 'consonants') {
      progress.learnConsonant(currentItem.id);
    } else {
      progress.learnVocabulary(currentItem.id);
    }
    progress.updateStreak();
    goNext();
  }, [currentItem, mode, progress, goNext]);

  const isLearned = currentItem
    ? mode === 'consonants'
      ? progress.consonantsLearned.includes(currentItem.id)
      : progress.vocabularyLearned.includes(currentItem.id)
    : false;

  const categories = useMemo(() => {
    const cats = [...new Set(vocabulary.map((w) => w.category))];
    return cats;
  }, []);

  if (!currentItem) return null;

  const renderConsonantFront = () => {
    const c = currentItem as typeof consonants[0];
    return (
      <div className="text-center">
        <p className="font-thai text-7xl mb-4 text-primary">{c.character}</p>
        <p className="text-muted text-sm">Tap to reveal</p>
      </div>
    );
  };

  const renderConsonantBack = () => {
    const c = currentItem as typeof consonants[0];
    return (
      <div className="text-center">
        <p className="font-thai text-5xl mb-3 text-primary">{c.character}</p>
        <p className="text-xl font-semibold mb-1">{c.romanization}</p>
        <p className="text-sm text-muted mb-2">{c.ipaSound}</p>
        <Badge variant={c.class === 'high' ? 'accent' : c.class === 'mid' ? 'primary' : 'secondary'} size="sm">
          {c.class} class
        </Badge>
        {c.exampleWord && (
          <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
            <p className="font-thai text-lg">{c.exampleWord}</p>
            <p className="text-xs text-muted">
              {lang === 'fr' ? c.exampleTranslationFr : c.exampleTranslationEn}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderVocabFront = () => {
    const w = currentItem as typeof vocabulary[0];
    return (
      <div className="text-center">
        <p className="font-thai text-5xl mb-4 text-primary">{w.thai}</p>
        <p className="text-muted text-sm">Tap to reveal</p>
      </div>
    );
  };

  const renderVocabBack = () => {
    const w = currentItem as typeof vocabulary[0];
    return (
      <div className="text-center">
        <p className="font-thai text-4xl mb-2 text-primary">{w.thai}</p>
        <p className="text-lg font-semibold mb-1">{w.romanization}</p>
        <p className="text-base mb-2">
          {lang === 'fr' ? w.translationFr : w.translationEn}
        </p>
        <Badge variant="primary" size="sm">
          {categoryIcons[w.category] || ''} {w.category}
        </Badge>
        {w.sentence && (
          <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-sm">
            <p className="font-thai">{w.sentence.thai}</p>
            <p className="text-muted">
              {lang === 'fr' ? w.sentence.translationFr : w.sentence.translationEn}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Flashcards | {t('appName')}</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">Flashcards</h1>
          <p className="text-muted">
            {mode === 'consonants'
              ? lang === 'fr' ? 'Révisez les consonnes thaïes' : 'Review Thai consonants'
              : lang === 'fr' ? 'Révisez le vocabulaire thaï' : 'Review Thai vocabulary'}
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant={mode === 'consonants' ? 'primary' : 'outline'}
            onClick={() => { setMode('consonants'); setCurrentIndex(0); }}
          >
            <BookOpen size={16} className="mr-2" />
            {t('nav.consonants')}
          </Button>
          <Button
            variant={mode === 'vocabulary' ? 'primary' : 'outline'}
            onClick={() => { setMode('vocabulary'); setCurrentIndex(0); }}
          >
            <Languages size={16} className="mr-2" />
            {t('nav.vocabulary')}
          </Button>
        </div>

        {/* Category filter for vocabulary */}
        {mode === 'vocabulary' && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => { setVocabCategory('all'); setCurrentIndex(0); }}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                vocabCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-black/5 dark:bg-white/10 text-muted hover:bg-black/10 dark:hover:bg-white/20'
              }`}
            >
              {lang === 'fr' ? 'Tout' : 'All'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setVocabCategory(cat); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  vocabCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-black/5 dark:bg-white/10 text-muted hover:bg-black/10 dark:hover:bg-white/20'
                }`}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>
        )}

        {/* Card counter */}
        <div className="text-center mb-4">
          <span className="text-muted text-sm">
            {currentIndex + 1} / {total}
          </span>
          {isLearned && (
            <Badge variant="success" size="sm" className="ml-2">
              {lang === 'fr' ? 'Appris' : 'Learned'}
            </Badge>
          )}
        </div>

        {/* Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            <Flashcard
              front={mode === 'consonants' ? renderConsonantFront() : renderVocabFront()}
              back={mode === 'consonants' ? renderConsonantBack() : renderVocabBack()}
              audioFile={'audioFile' in currentItem ? currentItem.audioFile : undefined}
              thaiText={mode === 'consonants'
                ? (currentItem as typeof consonants[0]).exampleWord || (currentItem as typeof consonants[0]).character
                : (currentItem as typeof vocabulary[0]).thai}
              className="mb-6"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Button variant="outline" onClick={goPrev} aria-label="Previous">
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" onClick={handleShuffle} aria-label="Shuffle">
            <Shuffle size={18} className={isShuffled ? 'text-primary' : ''} />
          </Button>
          <Button
            variant={isLearned ? 'outline' : 'primary'}
            onClick={markLearned}
            disabled={isLearned}
          >
            <Check size={18} className="mr-1" />
            {isLearned
              ? (lang === 'fr' ? 'Déjà appris' : 'Already learned')
              : (lang === 'fr' ? 'Marquer appris' : 'Mark learned')}
          </Button>
          <Button variant="outline" onClick={goNext} aria-label="Next">
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Progress summary */}
        <Card variant="glass" hover={false} className="text-center">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-primary">{progress.consonantsLearned.length}/33</p>
              <p className="text-xs text-muted">{t('nav.consonants')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{progress.vocabularyLearned.length}</p>
              <p className="text-xs text-muted">{t('nav.vocabulary')}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
