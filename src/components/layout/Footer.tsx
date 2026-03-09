import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="hidden lg:block border-t border-black/10 dark:border-white/10 py-5 mt-auto bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-sm text-muted">
          <p className="flex items-center gap-1">
            {t('footer.madeWith')} <Heart size={14} className="text-primary fill-primary" />
          </p>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
