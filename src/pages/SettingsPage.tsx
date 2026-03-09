import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/context/AudioContext';
import { useProgress } from '@/context/ProgressContext';

export default function SettingsPage() {
  const { t } = useTranslation(['settings', 'common']);
  const { theme, setTheme } = useTheme();
  const { speed, setSpeed } = useAudio();
  const progress = useProgress();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleExport = () => {
    const data = JSON.stringify(progress, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lao-learning-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>{t('title')} | {t('common:appName')}</title>
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-3xl font-semibold mb-2">{t('title')}</h1>
        <p className="text-muted mb-8">{t('subtitle')}</p>

        {/* Language */}
        <Card variant="glass" hover={false} className="mb-4">
          <h2 className="font-semibold mb-1">{t('language.title')}</h2>
          <p className="text-sm text-muted mb-3">{t('language.desc')}</p>
          <LanguageSwitcher />
        </Card>

        {/* Theme */}
        <Card variant="glass" hover={false} className="mb-4">
          <h2 className="font-semibold mb-1">{t('theme.title')}</h2>
          <p className="text-sm text-muted mb-3">{t('theme.desc')}</p>
          <div className="flex gap-2">
            {(['light', 'dark'] as const).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  theme === th
                    ? 'bg-primary text-bg-dark shadow-gold'
                    : 'bg-white/5 text-muted hover:text-white'
                }`}
              >
                {t(`theme.${th}`)}
              </button>
            ))}
          </div>
        </Card>

        {/* Audio */}
        <Card variant="glass" hover={false} className="mb-4">
          <h2 className="font-semibold mb-1">{t('audio.title')}</h2>
          <p className="text-sm text-muted mb-3">{t('audio.speed')}</p>
          <div className="flex gap-2">
            {([0.75, 1, 1.25] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  speed === s
                    ? 'bg-primary text-bg-dark shadow-gold'
                    : 'bg-white/5 text-muted hover:text-white'
                }`}
              >
                {s === 0.75 ? t('audio.speedSlow') : s === 1 ? t('audio.speedNormal') : t('audio.speedFast')}
              </button>
            ))}
          </div>
        </Card>

        {/* Progress Data */}
        <Card variant="glass" hover={false} className="mb-4">
          <h2 className="font-semibold mb-1">{t('progress.title')}</h2>
          <div className="space-y-3 mt-3">
            <div>
              <p className="text-sm text-muted mb-2">{t('progress.exportDesc')}</p>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download size={16} /> {t('progress.export')}
              </Button>
            </div>
            <div className="pt-3 border-t border-white/10">
              <p className="text-sm text-muted mb-2">{t('progress.resetDesc')}</p>
              <Button variant="accent" size="sm" onClick={() => setShowResetModal(true)}>
                {t('progress.reset')}
              </Button>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card variant="glass" hover={false}>
          <h2 className="font-semibold mb-1">{t('about.title')}</h2>
          <p className="text-sm text-muted mb-2">{t('about.description')}</p>
          <p className="text-xs text-muted">{t('about.version')}: 1.0.0</p>
        </Card>

        {/* Reset Confirmation Modal */}
        <Modal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          title={t('progress.reset')}
        >
          <div className="flex items-center gap-3 mb-4 p-3 bg-error/10 rounded-xl">
            <AlertTriangle size={24} className="text-error flex-shrink-0" />
            <p className="text-sm">{t('progress.resetConfirm')}</p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowResetModal(false)}>
              {t('common:actions.cancel')}
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                progress.resetProgress();
                setShowResetModal(false);
              }}
            >
              {t('progress.reset')}
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}
