import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/alphabet/consonants', labelKey: 'nav.consonants' },
  { path: '/alphabet/vowels', labelKey: 'nav.vowels' },
  { path: '/alphabet/tones', labelKey: 'nav.tones' },
  { path: '/vocabulary', labelKey: 'nav.vocabulary' },
  { path: '/quiz', labelKey: 'nav.quiz' },
  { path: '/writing', labelKey: 'nav.writing' },
  { path: '/flashcards', labelKey: 'nav.flashcards' },
  { path: '/progress', labelKey: 'nav.progress' },
];

export function Header() {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface-light dark:bg-surface-dark border-b border-black/10 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="font-thai text-sm text-white font-bold">ລາວ</span>
            </div>
            <span className="font-sans text-base font-semibold hidden sm:block">{t('appName')}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label={t('accessibility.mainNavigation')}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted hover:text-primary hover:bg-primary/5'
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher compact className="hidden sm:flex" />

            <button
              onClick={toggleTheme}
              aria-label={t('theme.toggle')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
              className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-black/10 dark:border-white/10 bg-surface-light dark:bg-surface-dark overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="pt-3 border-t border-black/10 dark:border-white/10">
                <LanguageSwitcher className="sm:hidden" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
