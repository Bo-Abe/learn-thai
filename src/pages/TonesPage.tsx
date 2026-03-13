import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { tones } from '@/data/tones';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AudioPlayer } from '@/components/shared/AudioPlayer';

function ToneContour({ contour }: { contour: string }) {
  const paths: Record<string, string> = {
    'mid-level': 'M 10 30 L 90 30',
    'low': 'M 10 25 L 90 40',
    'falling': 'M 10 15 L 90 45',
    'high-rising': 'M 10 35 L 50 25 L 90 10',
    'low-rising': 'M 10 45 L 50 35 L 90 20',
    'high-level': 'M 10 15 L 90 15',
  };

  return (
    <svg viewBox="0 0 100 55" className="w-24 h-12">
      <motion.path
        d={paths[contour] || paths['mid-level']}
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        className="text-primary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function TonesPage() {
  const { t, i18n } = useTranslation(['alphabet', 'common']);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const isFr = i18n.language.startsWith('fr');

  return (
    <>
      <Helmet>
        <title>{t('tones.title')} | {t('common:appName')}</title>
        <meta name="description" content={t('tones.subtitle')} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
            {t('tones.title')}
          </h1>
          <p className="text-muted mb-4 max-w-2xl mx-auto">{t('tones.subtitle')}</p>
          <p className="text-sm text-muted max-w-2xl mx-auto">{t('tones.description')}</p>
        </div>

        {/* Tones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tones.map((tone) => (
            <motion.div
              key={tone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                variant={selectedTone === tone.id ? 'gold' : 'glass'}
                onClick={() => setSelectedTone(selectedTone === tone.id ? null : tone.id)}
                className="h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isFr ? tone.nameFr : tone.nameEn}
                    </h3>
                    <p className="font-thai text-sm text-muted">{tone.nameThai}</p>
                  </div>
                  <AudioPlayer src={tone.audioExample} thaiText={tone.nameThai} size="sm" />
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <ToneContour contour={tone.contour} />
                  <div>
                    <Badge variant="primary" size="sm">{tone.contour}</Badge>
                    <p className="text-xs text-muted mt-1">
                      {t('tones.marker')}: {tone.marker}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted">
                  {isFr ? tone.descriptionFr : tone.descriptionEn}
                </p>

                {/* Minimal Pairs */}
                {selectedTone === tone.id && tone.minimalPairs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-black/10 dark:border-white/10"
                  >
                    <h4 className="text-sm font-medium mb-2">{t('tones.minimalPairs')}</h4>
                    {tone.minimalPairs.map((pair, i) => (
                      <div key={i} className="flex gap-4 text-sm">
                        <div>
                          <span className="font-thai text-primary">{pair.word1}</span>
                          <span className="text-muted ml-2">
                            {isFr ? pair.meaning1Fr : pair.meaning1En}
                          </span>
                        </div>
                        <span className="text-muted">vs</span>
                        <div>
                          <span className="font-thai text-accent">{pair.word2}</span>
                          <span className="text-muted ml-2">
                            {isFr ? pair.meaning2Fr : pair.meaning2En}
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tone Rules Table */}
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">{t('tones.rules.title')}</h2>
          <p className="text-muted mb-6">{t('tones.rules.description')}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5">
                  <th className="text-left px-4 py-3 font-medium">{t('tones.rules.consonantClass')}</th>
                  <th className="text-left px-4 py-3 font-medium">{t('tones.rules.noMark')}</th>
                  <th className="text-left px-4 py-3 font-medium">{t('tones.rules.maiEk')}</th>
                  <th className="text-left px-4 py-3 font-medium">{t('tones.rules.maiTho')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-black/10 dark:border-white/10">
                  <td className="px-4 py-3 font-medium">{t('consonants.filter.high')}</td>
                  <td className="px-4 py-3">Rising</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Falling</td>
                </tr>
                <tr className="border-t border-black/10 dark:border-white/10 bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium">{t('consonants.filter.mid')}</td>
                  <td className="px-4 py-3">Mid</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Falling</td>
                </tr>
                <tr className="border-t border-black/10 dark:border-white/10">
                  <td className="px-4 py-3 font-medium">{t('consonants.filter.low')}</td>
                  <td className="px-4 py-3">Rising</td>
                  <td className="px-4 py-3">Mid</td>
                  <td className="px-4 py-3">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
