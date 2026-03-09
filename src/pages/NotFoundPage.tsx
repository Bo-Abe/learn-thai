import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('error.notFound')} | {t('appName')}</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="font-lao text-8xl text-primary mb-4">404</p>
        <h1 className="font-serif text-2xl font-semibold mb-2">{t('error.notFound')}</h1>
        <p className="text-muted mb-6">{t('error.notFoundDesc')}</p>
        <Link to="/">
          <Button>{t('error.goHome')}</Button>
        </Link>
      </div>
    </>
  );
}
