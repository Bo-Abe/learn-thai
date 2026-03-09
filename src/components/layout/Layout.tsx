import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';

function LoadingFallback() {
  const { t } = useTranslation('common');
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="font-lao text-4xl text-primary animate-pulse mb-4">ລາວ</div>
        <p className="text-muted">{t('loading')}</p>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col lao-pattern">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
