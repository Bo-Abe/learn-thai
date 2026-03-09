import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { AdBanner } from '@/components/shared/AdBanner';
import { adsConfig } from '@/config/ads';

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

const showAds = adsConfig.enabled && adsConfig.clientId && adsConfig.slotId;
const isSidebar = showAds && adsConfig.placement === 'sidebar';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col lao-pattern">
      <Header />

      {/* Top ad banner (always shown in 'top' mode, or mobile fallback in 'sidebar' mode) */}
      {showAds && (
        <AdBanner className={isSidebar ? 'lg:hidden' : ''} />
      )}

      {isSidebar ? (
        /* Sidebar layout: content + right ad column on desktop */
        <div className="flex-1 pb-20 lg:pb-0 flex">
          <main className="flex-1 min-w-0">
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </main>
          <aside className="hidden lg:block w-[300px] flex-shrink-0 p-4">
            <div className="sticky top-[72px]">
              <AdBanner className="rounded-xl overflow-hidden border border-black/5 dark:border-white/5" />
            </div>
          </aside>
        </div>
      ) : (
        /* Standard layout: full-width content */
        <main className="flex-1 pb-20 lg:pb-0">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      )}

      <Footer />
      <MobileNav />
    </div>
  );
}
