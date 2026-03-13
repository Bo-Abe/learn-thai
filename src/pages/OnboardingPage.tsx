import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Languages, Music, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const steps = [
  {
    icon: BookOpen,
    titleEn: 'Learn the Thai Alphabet',
    titleFr: "Apprenez l'alphabet thaï",
    descEn: 'Master 33 consonants and 28 vowels with interactive cards, audio pronunciation, and tone class indicators.',
    descFr: 'Maîtrisez 33 consonnes et 28 voyelles avec des cartes interactives, la prononciation audio et les indicateurs de classe tonale.',
    thaiChar: 'ກ ຂ ຄ',
    color: 'text-primary',
  },
  {
    icon: Languages,
    titleEn: 'Build Your Vocabulary',
    titleFr: 'Enrichissez votre vocabulaire',
    descEn: 'Explore 200+ words across 13 categories — from greetings and numbers to food and transport.',
    descFr: 'Explorez plus de 200 mots dans 13 catégories — des salutations aux nombres, en passant par la nourriture et les transports.',
    thaiChar: 'ສະບາຍດີ',
    color: 'text-secondary',
  },
  {
    icon: Music,
    titleEn: 'Master the Tones',
    titleFr: 'Maîtrisez les tons',
    descEn: 'Thai is a tonal language with 5 tones. Learn to distinguish and produce each one through practice.',
    descFr: 'Le thaï est une langue tonale avec 5 tons. Apprenez à distinguer et produire chacun par la pratique.',
    thaiChar: '˦ ˧ ˨',
    color: 'text-accent',
  },
  {
    icon: Trophy,
    titleEn: 'Track Your Progress',
    titleFr: 'Suivez votre progression',
    descEn: 'Earn badges, maintain your learning streak, and take quizzes to test your knowledge.',
    descFr: 'Gagnez des badges, maintenez votre série d\'apprentissage et passez des quiz pour tester vos connaissances.',
    thaiChar: '🏆',
    color: 'text-primary',
  },
];

export default function OnboardingPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const [step, setStep] = useState(0);
  const current = steps[step]!;
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('onboarding_completed', 'true');
      navigate('/');
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Welcome | Learn Thai</title>
      </Helmet>

      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 max-w-lg mx-auto">
        {/* Step indicator */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-primary' : 'w-2 bg-black/10 dark:bg-white/20'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className={`inline-flex p-4 rounded-2xl bg-black/5 dark:bg-white/5 mb-6 ${current.color}`}>
              <current.icon size={48} />
            </div>

            <p className="font-thai text-4xl mb-4 text-primary">{current.thaiChar}</p>

            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
              {lang === 'fr' ? current.titleFr : current.titleEn}
            </h2>

            <p className="text-muted leading-relaxed mb-8">
              {lang === 'fr' ? current.descFr : current.descEn}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 w-full max-w-xs">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">
              <ArrowLeft size={16} className="mr-1" />
              {lang === 'fr' ? 'Retour' : 'Back'}
            </Button>
          )}
          <Button variant="primary" onClick={handleNext} className="flex-1">
            {isLast
              ? (lang === 'fr' ? 'Commencer' : 'Get Started')
              : (lang === 'fr' ? 'Suivant' : 'Next')}
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        {!isLast && (
          <button
            onClick={handleSkip}
            className="mt-4 text-sm text-muted hover:text-primary transition-colors"
          >
            {lang === 'fr' ? 'Passer le tutoriel' : 'Skip tutorial'}
          </button>
        )}
      </div>
    </>
  );
}
