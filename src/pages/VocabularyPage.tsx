import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Check, X as XIcon } from 'lucide-react';
import { vocabulary } from '@/data/vocabulary';
import type { VocabCategory } from '@/types/thai';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AudioPlayer } from '@/components/shared/AudioPlayer';
import { useProgress } from '@/context/ProgressContext';

const categories: Array<{ key: VocabCategory | 'all'; labelKey: string }> = [
  { key: 'all', labelKey: 'categories.all' },
  { key: 'greetings', labelKey: 'categories.greetings' },
  { key: 'numbers', labelKey: 'categories.numbers' },
  { key: 'colors', labelKey: 'categories.colors' },
  { key: 'family', labelKey: 'categories.family' },
  { key: 'food', labelKey: 'categories.food' },
  { key: 'animals', labelKey: 'categories.animals' },
  { key: 'body', labelKey: 'categories.body' },
  { key: 'time', labelKey: 'categories.time' },
  { key: 'transport', labelKey: 'categories.transport' },
  { key: 'places', labelKey: 'categories.places' },
  { key: 'commonVerbs', labelKey: 'categories.commonVerbs' },
  { key: 'adjectives', labelKey: 'categories.adjectives' },
  { key: 'usefulPhrases', labelKey: 'categories.usefulPhrases' },
];

const difficultyVariant = {
  1: 'success' as const,
  2: 'primary' as const,
  3: 'accent' as const,
};

export default function VocabularyPage() {
  const { t, i18n } = useTranslation(['vocabulary', 'common']);
  const { vocabularyLearned, learnVocabulary } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const isFr = i18n.language.startsWith('fr');

  const filtered = useMemo(() => {
    let result = vocabulary;
    if (selectedCategory !== 'all') {
      result = result.filter((w) => w.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.thai.includes(q) ||
          w.romanization.toLowerCase().includes(q) ||
          w.translationEn.toLowerCase().includes(q) ||
          w.translationFr.toLowerCase().includes(q),
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const currentCard = filtered[flashcardIndex];

  const handleFlashcardNext = (known: boolean) => {
    if (known && currentCard) {
      learnVocabulary(currentCard.id);
    }
    setIsFlipped(false);
    if (flashcardIndex < filtered.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('title')} | {t('common:appName')}</title>
        <meta name="description" content={t('subtitle')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h1>
          <p className="text-muted">{t('subtitle')}</p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <Button
            variant={flashcardMode ? 'primary' : 'outline'}
            onClick={() => { setFlashcardMode(!flashcardMode); setFlashcardIndex(0); setIsFlipped(false); }}
          >
            {t('flashcard.title')}
          </Button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setSelectedCategory(cat.key); setFlashcardIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-primary text-bg-dark'
                  : 'bg-black/5 dark:bg-white/5 text-muted hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted mb-4">{t('wordsCount', { count: filtered.length })}</p>

        {/* Flashcard Mode */}
        {flashcardMode && currentCard ? (
          <div className="max-w-md mx-auto">
            <p className="text-sm text-muted text-center mb-4">
              {t('flashcard.remaining', { count: filtered.length - flashcardIndex })}
            </p>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={t('flashcard.flip')}
              onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
            >
              <Card variant="gold" hover={false} className="min-h-[200px] flex flex-col items-center justify-center text-center">
                {!isFlipped ? (
                  <motion.div key="front" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }}>
                    <p className="font-thai text-5xl text-primary mb-4">{currentCard.thai}</p>
                    <p className="text-muted text-sm">{t('flashcard.flip')}</p>
                  </motion.div>
                ) : (
                  <motion.div key="back" initial={{ rotateY: -90 }} animate={{ rotateY: 0 }}>
                    <p className="text-lg font-medium mb-1">{currentCard.romanization}</p>
                    <p className="text-xl mb-2">
                      {isFr ? currentCard.translationFr : currentCard.translationEn}
                    </p>
                    <AudioPlayer src={currentCard.audioFile} thaiText={currentCard.thai} size="sm" />
                    {currentCard.sentence && (
                      <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-sm">
                        <p className="font-thai">{currentCard.sentence.thai}</p>
                        <p className="text-muted">
                          {isFr ? currentCard.sentence.translationFr : currentCard.sentence.translationEn}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </Card>
            </div>

            <div className="flex gap-4 mt-6 justify-center">
              <Button variant="outline" onClick={() => handleFlashcardNext(false)}>
                <XIcon size={18} /> {t('flashcard.dontKnow')}
              </Button>
              <Button onClick={() => handleFlashcardNext(true)}>
                <Check size={18} /> {t('flashcard.know')}
              </Button>
            </div>

            {flashcardIndex >= filtered.length - 1 && (
              <div className="text-center mt-6">
                <p className="text-success mb-4">{t('flashcard.complete')}</p>
                <Button
                  variant="outline"
                  onClick={() => { setFlashcardIndex(0); setIsFlipped(false); }}
                >
                  <RotateCcw size={16} /> {t('flashcard.restart')}
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* List Mode */
          <>
            {filtered.length === 0 ? (
              <p className="text-center text-muted py-12">{t('noResults', { query: searchQuery })}</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map((word) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card
                        variant={vocabularyLearned.includes(word.id) ? 'gold' : 'default'}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-thai text-2xl text-primary">{word.thai}</span>
                            {vocabularyLearned.includes(word.id) && (
                              <Check size={16} className="text-success" />
                            )}
                          </div>
                          <p className="text-sm text-muted">{word.romanization}</p>
                          <p className="font-medium mt-1">
                            {isFr ? word.translationFr : word.translationEn}
                          </p>
                          <div className="flex gap-1 mt-2">
                            <Badge variant={difficultyVariant[word.difficulty]} size="sm">
                              {t(`difficulty${word.difficulty}`)}
                            </Badge>
                          </div>
                        </div>
                        <AudioPlayer src={word.audioFile} thaiText={word.thai} size="sm" />
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </>
  );
}
