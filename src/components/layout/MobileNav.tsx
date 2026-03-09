import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Languages, HelpCircle, User } from 'lucide-react';

const tabs = [
  { path: '/', labelKey: 'nav.home', Icon: Home },
  { path: '/alphabet/consonants', labelKey: 'nav.alphabet', Icon: BookOpen },
  { path: '/vocabulary', labelKey: 'nav.vocabulary', Icon: Languages },
  { path: '/quiz', labelKey: 'nav.quiz', Icon: HelpCircle },
  { path: '/progress', labelKey: 'nav.progress', Icon: User },
];

export function MobileNav() {
  const { t } = useTranslation('common');
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 glass-dark safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ path, labelKey, Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors ${
              isActive(path) ? 'text-primary' : 'text-muted hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{t(labelKey)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
