import { useEffect, useRef } from 'react';
import { adsConfig } from '@/config/ads';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  className?: string;
}

/**
 * Renders a Google AdSense (or compatible) ad unit.
 * Hidden entirely when ads are not configured.
 */
export function AdBanner({ className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const isActive = adsConfig.enabled && adsConfig.clientId && adsConfig.slotId;

  useEffect(() => {
    if (!isActive || pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ad blocker or script not loaded – fail silently
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className={`w-full flex justify-center bg-surface-light dark:bg-surface-dark border-b border-black/5 dark:border-white/5 ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={adsConfig.clientId}
        data-ad-slot={adsConfig.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
