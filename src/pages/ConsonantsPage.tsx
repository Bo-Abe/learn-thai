import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { consonants } from '@/data/consonants';
import { consonantIllustrations } from '@/data/consonantIllustrations';
import { CharacterCard } from '@/components/shared/CharacterCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/context/ProgressContext';

type FilterClass = 'all' | 'high' | 'mid' | 'low';
type ViewMode = 'grid' | 'flashcard';

export default function ConsonantsPage() {
  const { t, i18n } = useTranslation(['alphabet', 'common']);
  const { consonantsLearned, learnConsonant, unlearnConsonant } = useProgress();
  const [filter, setFilter] = useState<FilterClass>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  const filtered = useMemo(() => {
    if (filter === 'all') return consonants;
    return consonants.filter((c) => c.class === filter);
  }, [filter]);

  const filters: { key: FilterClass; label: string }[] = [
    { key: 'all', label: t('consonants.filter.all') },
    { key: 'high', label: t('consonants.filter.high') },
    { key: 'mid', label: t('consonants.filter.mid') },
    { key: 'low', label: t('consonants.filter.low') },
  ];

  const currentFlashcard = filtered[flashcardIndex];

  const getTranslation = (c: typeof consonants[0]) => {
    return i18n.language.startsWith('fr') ? c.exampleTranslationFr : c.exampleTranslationEn;
  };

  return (
    <>
      <Helmet>
        <title>{t('consonants.title')} | {t('common:appName')}</title>
        <meta name="description" content={t('consonants.subtitle')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
            {t('consonants.title')}
          </h1>
          <p className="text-muted mb-4">{t('consonants.subtitle')}</p>
          <ProgressBar
            value={consonantsLearned.length}
            max={44}
            showPercentage
            label={t('consonants.progress', { learned: consonantsLearned.length, total: 44 })}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setFlashcardIndex(0); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-primary text-bg-dark shadow-gold'
                    : 'bg-black/5 dark:bg-white/5 text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              aria-label={t('consonants.gridMode')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              aria-label={t('consonants.flashcardMode')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'flashcard' ? 'bg-primary/20 text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              <Layers size={20} />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((c) => (
                <CharacterCard
                  key={c.id}
                  character={c.character}
                  romanization={c.romanization}
                  ipaSound={c.ipaSound}
                  toneClass={c.class}
                  exampleWord={c.exampleWord}
                  exampleTranslation={getTranslation(c)}
                  audioFile={c.audioFile}
                  illustration={consonantIllustrations[c.id]}
                  isLearned={consonantsLearned.includes(c.id)}
                  onClick={() => {
                    if (consonantsLearned.includes(c.id)) {
                      unlearnConsonant(c.id);
                    } else {
                      learnConsonant(c.id);
                    }
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Flashcard View */}
        {viewMode === 'flashcard' && currentFlashcard && (
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFlashcard.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <CharacterCard
                  character={currentFlashcard.character}
                  romanization={currentFlashcard.romanization}
                  ipaSound={currentFlashcard.ipaSound}
                  toneClass={currentFlashcard.class}
                  exampleWord={currentFlashcard.exampleWord}
                  exampleTranslation={getTranslation(currentFlashcard)}
                  audioFile={currentFlashcard.audioFile}
                  illustration={consonantIllustrations[currentFlashcard.id]}
                  isLearned={consonantsLearned.includes(currentFlashcard.id)}
                  onClick={() => {
                    if (consonantsLearned.includes(currentFlashcard.id)) {
                      unlearnConsonant(currentFlashcard.id);
                    } else {
                      learnConsonant(currentFlashcard.id);
                    }
                  }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="ghost"
                onClick={() => setFlashcardIndex(Math.max(0, flashcardIndex - 1))}
                disabled={flashcardIndex === 0}
              >
                <ChevronLeft size={20} />
                {t('common:actions.previous')}
              </Button>

              <Badge variant="muted">
                {flashcardIndex + 1} / {filtered.length}
              </Badge>

              <Button
                variant="ghost"
                onClick={() => setFlashcardIndex(Math.min(filtered.length - 1, flashcardIndex + 1))}
                disabled={flashcardIndex === filtered.length - 1}
              >
                {t('common:actions.next')}
                <ChevronRight size={20} />
              </Button>
            </div>

            <div className="flex gap-2 mt-6 justify-center">
              <Button
                variant={consonantsLearned.includes(currentFlashcard.id) ? 'outline' : 'primary'}
                size="sm"
                onClick={() => {
                  if (consonantsLearned.includes(currentFlashcard.id)) {
                    unlearnConsonant(currentFlashcard.id);
                  } else {
                    learnConsonant(currentFlashcard.id);
                  }
                }}
              >
                {consonantsLearned.includes(currentFlashcard.id)
                  ? t('consonants.markUnlearned')
                  : t('consonants.markLearned')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
