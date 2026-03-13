import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { vowels } from '@/data/vowels';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AudioPlayer } from '@/components/shared/AudioPlayer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/context/ProgressContext';

type LengthFilter = 'all' | 'short' | 'long';

export default function VowelsPage() {
  const { t, i18n } = useTranslation(['alphabet', 'common']);
  const { vowelsLearned, learnVowel, unlearnVowel } = useProgress();
  const [filter, setFilter] = useState<LengthFilter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return vowels;
    return vowels.filter((v) => v.length === filter);
  }, [filter]);

  const positionKey = (pos: string) => {
    const map: Record<string, string> = {
      before: 'vowels.position.before',
      after: 'vowels.position.after',
      above: 'vowels.position.above',
      below: 'vowels.position.below',
      around: 'vowels.position.around',
    };
    return map[pos] || pos;
  };

  const getTranslation = (v: typeof vowels[0]) => {
    return i18n.language.startsWith('fr') ? v.exampleTranslationFr : v.exampleTranslationEn;
  };

  return (
    <>
      <Helmet>
        <title>{t('vowels.title')} | {t('common:appName')}</title>
        <meta name="description" content={t('vowels.subtitle')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
            {t('vowels.title')}
          </h1>
          <p className="text-muted mb-4">{t('vowels.subtitle')}</p>
          <ProgressBar
            value={vowelsLearned.length}
            max={27}
            showPercentage
            label={t('vowels.progress', { learned: vowelsLearned.length, total: 27 })}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {([
            { key: 'all' as const, label: t('vowels.filter.all') },
            { key: 'short' as const, label: t('vowels.filter.short') },
            { key: 'long' as const, label: t('vowels.filter.long') },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
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

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((v) => {
              const isLearned = vowelsLearned.includes(v.id);
              return (
                <motion.div
                  key={v.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card
                    variant={isLearned ? 'gold' : 'default'}
                    onClick={() => isLearned ? unlearnVowel(v.id) : learnVowel(v.id)}
                    className="text-center"
                  >
                    <p className="font-thai text-4xl text-primary mb-2">{v.symbol}</p>
                    <p className="text-sm font-medium mb-1">{v.romanization}</p>
                    <p className="text-xs text-muted mb-2">{v.ipaSound}</p>

                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      <Badge variant={v.length === 'short' ? 'accent' : 'secondary'} size="sm">
                        {t(`vowels.length.${v.length}`)}
                      </Badge>
                      <Badge variant="muted" size="sm">
                        {t(positionKey(v.position))}
                      </Badge>
                    </div>

                    <AudioPlayer src={v.audioFile} thaiText={v.exampleWord || v.symbol} size="sm" />

                    <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
                      <p className="font-thai text-lg">{v.exampleWord}</p>
                      <p className="text-xs text-muted">{getTranslation(v)}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
