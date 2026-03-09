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
  { path: '/progress', labelKey: 'nav.progress' },
];

export function Header() {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-lao text-2xl text-primary">ລາວ</span>
            <span className="font-serif text-lg hidden sm:block">{t('appName')}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label={t('accessibility.mainNavigation')}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact className="hidden sm:flex" />

            <button
              onClick={toggleTheme}
              aria-label={t('theme.toggle')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
            className="lg:hidden border-t border-white/10 glass-dark overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10">
                <LanguageSwitcher className="sm:hidden" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
