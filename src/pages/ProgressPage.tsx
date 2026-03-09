import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Flame, BookOpen, Music, Languages, HelpCircle, Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { useProgress } from '@/context/ProgressContext';

const badgeDefinitions = [
  { id: 'firstLesson', icon: BookOpen, check: (p: ReturnType<typeof useProgress>) => p.consonantsLearned.length > 0 || p.vowelsLearned.length > 0 },
  { id: 'consonantMaster', icon: BookOpen, check: (p: ReturnType<typeof useProgress>) => p.consonantsLearned.length >= 33 },
  { id: 'vowelMaster', icon: Music, check: (p: ReturnType<typeof useProgress>) => p.vowelsLearned.length >= 27 },
  { id: 'quizWhiz', icon: HelpCircle, check: (p: ReturnType<typeof useProgress>) => p.quizResults.some((r) => r.percentage === 100) },
  { id: 'weekStreak', icon: Flame, check: (p: ReturnType<typeof useProgress>) => p.streak.best >= 7 },
  { id: 'vocab100', icon: Languages, check: (p: ReturnType<typeof useProgress>) => p.vocabularyLearned.length >= 100 },
];

export default function ProgressPage() {
  const { t } = useTranslation(['progress', 'common']);
  const progress = useProgress();

  const recentQuizzes = useMemo(
    () => [...progress.quizResults].reverse().slice(0, 10),
    [progress.quizResults],
  );

  const difficultCharacters = useMemo(() => {
    const mistakeCount: Record<string, number> = {};
    progress.quizResults.forEach((r) => {
      r.mistakes.forEach((m) => {
        mistakeCount[m.correctAnswer] = (mistakeCount[m.correctAnswer] || 0) + 1;
      });
    });
    return Object.entries(mistakeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);
  }, [progress.quizResults]);

  return (
    <>
      <Helmet>
        <title>{t('title')} | {t('common:appName')}</title>
        <meta name="description" content={t('subtitle')} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h1>
          <p className="text-muted">{t('subtitle')}</p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold mb-4">{t('overview.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="glass" hover={false}>
              <p className="text-sm text-muted mb-2">{t('overview.consonantsMastered')}</p>
              <p className="text-2xl font-bold text-primary">{progress.consonantsLearned.length}/33</p>
              <ProgressBar value={progress.consonantsLearned.length} max={33} size="sm" className="mt-2" />
            </Card>
            <Card variant="glass" hover={false}>
              <p className="text-sm text-muted mb-2">{t('overview.vowelsMastered')}</p>
              <p className="text-2xl font-bold text-primary">{progress.vowelsLearned.length}/27</p>
              <ProgressBar value={progress.vowelsLearned.length} max={27} size="sm" className="mt-2" color="accent" />
            </Card>
            <Card variant="glass" hover={false}>
              <p className="text-sm text-muted mb-2">{t('overview.vocabularyLearned')}</p>
              <p className="text-2xl font-bold text-primary">{progress.vocabularyLearned.length}/200+</p>
              <ProgressBar value={progress.vocabularyLearned.length} max={200} size="sm" className="mt-2" color="secondary" />
            </Card>
            <Card variant="glass" hover={false}>
              <p className="text-sm text-muted mb-2">{t('overview.quizzesTaken')}</p>
              <p className="text-2xl font-bold text-primary">{progress.quizResults.length}</p>
            </Card>
          </div>

          <div className="mt-6">
            <ProgressBar
              value={progress.overallPercentage}
              showPercentage
              label={t('overview.overallProgress')}
              size="lg"
              color="primary"
            />
          </div>
        </section>

        {/* Streak */}
        <section className="mb-12">
          <Card variant="gold" hover={false}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <Flame size={28} className="text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{t('streak.title')}</h2>
                <p className="text-2xl font-bold text-primary">
                  {t('streak.days', { count: progress.streak.current })}
                </p>
                <p className="text-sm text-muted">
                  {t('streak.record', { count: progress.streak.best })}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted mt-3">{t('streak.keepGoing')}</p>
          </Card>
        </section>

        {/* Difficult Characters */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold mb-4">{t('difficult.title')}</h2>
          <p className="text-sm text-muted mb-4">{t('difficult.desc')}</p>
          {difficultCharacters.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {difficultCharacters.map(([char, count]) => (
                <motion.div
                  key={char}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 bg-error/10 border border-error/20 rounded-xl px-4 py-2"
                >
                  <span className="font-lao text-2xl">{char}</span>
                  <Badge variant="error" size="sm">{count}x</Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">{t('difficult.noData')}</p>
          )}
        </section>

        {/* Badges */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold mb-4">{t('badges.title')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badgeDefinitions.map((badge) => {
              const unlocked = badge.check(progress);
              return (
                <Card
                  key={badge.id}
                  variant={unlocked ? 'gold' : 'default'}
                  hover={false}
                  className={!unlocked ? 'opacity-50' : ''}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${unlocked ? 'bg-primary/20' : 'bg-white/5'}`}>
                      {unlocked ? (
                        <badge.icon size={20} className="text-primary" />
                      ) : (
                        <Lock size={20} className="text-muted" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {t(`badges.${badge.id}` as `badges.${string}`)}
                      </p>
                      <p className="text-xs text-muted">
                        {unlocked
                          ? t(`badges.${badge.id}Desc` as `badges.${string}`)
                          : t('badges.locked')}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quiz History */}
        {recentQuizzes.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold mb-4">{t('common:nav.quiz')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left pb-2 font-medium text-muted">{t('common:nav.quiz')}</th>
                    <th className="text-left pb-2 font-medium text-muted">{t('overview.quizzesTaken')}</th>
                    <th className="text-right pb-2 font-medium text-muted">%</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuizzes.map((r) => (
                    <tr key={r.id} className="border-b border-white/5">
                      <td className="py-2 capitalize">{r.type}</td>
                      <td className="py-2">{r.score}/{r.total}</td>
                      <td className="py-2 text-right">
                        <Badge variant={r.percentage >= 80 ? 'success' : r.percentage >= 60 ? 'primary' : 'error'}>
                          {r.percentage}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
