import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({ compact = false, className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  const currentIsEn = i18n.language === 'en' || i18n.language.startsWith('en-');

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className={`px-2 py-1 rounded-full text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${className}`}
        aria-label={currentIsEn ? 'Switch to French' : 'Passer en anglais'}
      >
        {currentIsEn ? '🇬🇧 EN' : '🇫🇷 FR'}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/5 p-1 ${className}`}>
      <button
        onClick={() => {
          i18n.changeLanguage('en');
          document.documentElement.lang = 'en';
        }}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          currentIsEn
            ? 'bg-primary text-white shadow-blue'
            : 'text-muted hover:text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage('fr');
          document.documentElement.lang = 'fr';
        }}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          !currentIsEn
            ? 'bg-primary text-white shadow-blue'
            : 'text-muted hover:text-primary'
        }`}
      >
        FR
      </button>
    </div>
  );
}
