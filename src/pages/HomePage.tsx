import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  BookOpen,
  Music,
  Mic2,
  Languages,
  HelpCircle,
  PenTool,
  Layers,
  Landmark,
  Plane,
  Sparkles,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/context/ProgressContext';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const { t } = useTranslation(['home', 'common']);
  const { overallPercentage, consonantsLearned, vowelsLearned, vocabularyLearned } = useProgress();
  const hasProgress = overallPercentage > 0;

  const modules = [
    { path: '/alphabet/consonants', icon: BookOpen, titleKey: 'modules.consonants.title', descKey: 'modules.consonants.desc', color: 'text-primary' },
    { path: '/alphabet/vowels', icon: Music, titleKey: 'modules.vowels.title', descKey: 'modules.vowels.desc', color: 'text-accent' },
    { path: '/alphabet/tones', icon: Mic2, titleKey: 'modules.tones.title', descKey: 'modules.tones.desc', color: 'text-secondary' },
    { path: '/vocabulary', icon: Languages, titleKey: 'modules.vocabulary.title', descKey: 'modules.vocabulary.desc', color: 'text-primary' },
    { path: '/quiz', icon: HelpCircle, titleKey: 'modules.quiz.title', descKey: 'modules.quiz.desc', color: 'text-accent' },
    { path: '/writing', icon: PenTool, titleKey: 'modules.writing.title', descKey: 'modules.writing.desc', color: 'text-secondary' },
    { path: '/flashcards', icon: Layers, titleKey: 'modules.flashcards.title', descKey: 'modules.flashcards.desc', color: 'text-primary' },
  ];

  const reasons = [
    { icon: Landmark, titleKey: 'why.reason1.title', descKey: 'why.reason1.desc' },
    { icon: Plane, titleKey: 'why.reason2.title', descKey: 'why.reason2.desc' },
    { icon: Sparkles, titleKey: 'why.reason3.title', descKey: 'why.reason3.desc' },
    { icon: Globe, titleKey: 'why.reason4.title', descKey: 'why.reason4.desc' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('common:appName')} — {t('common:appNameThai')}</title>
        <meta name="description" content={t('hero.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              className="font-thai text-5xl sm:text-7xl text-primary mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('hero.titleThai')}
            </motion.h1>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-6">
              {t('hero.title')}
            </h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/alphabet/consonants">
                <Button size="lg">
                  {hasProgress ? t('hero.ctaSecondary') : t('hero.cta')}
                </Button>
              </Link>
              {hasProgress && (
                <Link to="/progress">
                  <Button variant="outline" size="lg">
                    {t('common:nav.progress')}
                  </Button>
                </Link>
              )}
            </div>

            {hasProgress && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 max-w-md mx-auto"
              >
                <ProgressBar
                  value={overallPercentage}
                  showPercentage
                  label={t('common:nav.progress')}
                  color="primary"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: '33', label: t('stats.consonants'), learned: consonantsLearned.length },
              { value: '27', label: t('stats.vowels'), learned: vowelsLearned.length },
              { value: '6', label: t('stats.tones'), learned: 0 },
              { value: '200+', label: t('stats.words'), learned: vocabularyLearned.length },
            ].map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center">
                <p className="font-serif text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
                {stat.learned > 0 && (
                  <p className="text-xs text-success mt-1">{stat.learned} ✓</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-2xl sm:text-3xl font-semibold text-center mb-12"
        >
          {t('modules.title')}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {modules.map((mod) => (
            <motion.div key={mod.path} variants={item}>
              <Link to={mod.path}>
                <Card variant="glass" className="h-full">
                  <mod.icon size={32} className={`${mod.color} mb-4`} />
                  <h3 className="text-lg font-semibold mb-2">{t(mod.titleKey)}</h3>
                  <p className="text-sm text-muted">{t(mod.descKey)}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Learn Thai */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-2xl sm:text-3xl font-semibold text-center mb-12"
        >
          {t('why.title')}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {reasons.map((reason) => (
            <motion.div key={reason.titleKey} variants={item}>
              <Card variant="gold" hover={false} className="h-full">
                <reason.icon size={28} className="text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{t(reason.titleKey)}</h3>
                <p className="text-sm text-muted">{t(reason.descKey)}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
