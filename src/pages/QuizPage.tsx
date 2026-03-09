import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Headphones, PenTool, Languages, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { consonants } from '@/data/consonants';
import { vocabulary } from '@/data/vocabulary';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QuizOption } from '@/components/shared/QuizOption';
import { AudioPlayer } from '@/components/shared/AudioPlayer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/context/ProgressContext';
import type { QuizResult } from '@/types/lao';

type QuizType = 'recognition' | 'listening' | 'writing' | 'translation';
type QuizState = 'select' | 'playing' | 'result';

interface Question {
  id: string;
  prompt: string;
  promptAudio?: string;
  promptLaoText?: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

function generateRecognitionQuestions(count: number): Question[] {
  const shuffled = shuffleArray(consonants);
  return shuffled.slice(0, count).map((c) => {
    const wrongOptions = shuffleArray(
      consonants.filter((o) => o.id !== c.id).map((o) => o.romanization),
    ).slice(0, 3);
    return {
      id: c.id,
      prompt: c.character,
      correctAnswer: c.romanization,
      options: shuffleArray([c.romanization, ...wrongOptions]),
      explanation: `${c.character} = ${c.romanization} (${c.ipaSound})`,
    };
  });
}

function generateListeningQuestions(count: number): Question[] {
  const shuffled = shuffleArray(consonants);
  return shuffled.slice(0, count).map((c) => {
    const wrongOptions = shuffleArray(
      consonants.filter((o) => o.id !== c.id).map((o) => o.character),
    ).slice(0, 3);
    return {
      id: c.id,
      prompt: c.romanization,
      promptAudio: c.audioFile,
      promptLaoText: c.exampleWord || c.character,
      correctAnswer: c.character,
      options: shuffleArray([c.character, ...wrongOptions]),
      explanation: `${c.romanization} → ${c.character}`,
    };
  });
}

function generateTranslationQuestions(count: number, isFr: boolean): Question[] {
  const shuffled = shuffleArray(vocabulary);
  return shuffled.slice(0, count).map((w) => {
    const translation = isFr ? w.translationFr : w.translationEn;
    const wrongOptions = shuffleArray(
      vocabulary
        .filter((o) => o.id !== w.id)
        .map((o) => (isFr ? o.translationFr : o.translationEn)),
    ).slice(0, 3);
    return {
      id: w.id,
      prompt: w.lao,
      correctAnswer: translation,
      options: shuffleArray([translation, ...wrongOptions]),
      explanation: `${w.lao} (${w.romanization}) = ${translation}`,
    };
  });
}

export default function QuizPage() {
  const { t, i18n } = useTranslation(['quiz', 'common']);
  const { addQuizResult } = useProgress();
  const isFr = i18n.language.startsWith('fr');

  const [quizState, setQuizState] = useState<QuizState>('select');
  const [quizType, setQuizType] = useState<QuizType>('recognition');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<Array<{ questionId: string; userAnswer: string; correctAnswer: string }>>([]);
  const [startTime, setStartTime] = useState(0);

  const quizTypes = [
    { type: 'recognition' as const, icon: BookOpen, titleKey: 'types.recognition.title', descKey: 'types.recognition.desc' },
    { type: 'listening' as const, icon: Headphones, titleKey: 'types.listening.title', descKey: 'types.listening.desc' },
    { type: 'translation' as const, icon: Languages, titleKey: 'types.translation.title', descKey: 'types.translation.desc' },
    { type: 'writing' as const, icon: PenTool, titleKey: 'types.writing.title', descKey: 'types.writing.desc' },
  ];

  const startQuiz = useCallback((type: QuizType) => {
    setQuizType(type);
    const count = 10;
    let qs: Question[];
    switch (type) {
      case 'recognition':
        qs = generateRecognitionQuestions(count);
        break;
      case 'listening':
        qs = generateListeningQuestions(count);
        break;
      case 'translation':
        qs = generateTranslationQuestions(count, isFr);
        break;
      default:
        qs = generateRecognitionQuestions(count);
    }
    setQuestions(qs);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setScore(0);
    setMistakes([]);
    setStartTime(Date.now());
    setQuizState('playing');
  }, [isFr]);

  const handleAnswer = (answer: string) => {
    if (isRevealed) return;
    setSelectedAnswer(answer);
    setIsRevealed(true);
    const current = questions[currentIndex];
    if (current && answer === current.correctAnswer) {
      setScore((s) => s + 1);
    } else if (current) {
      setMistakes((m) => [...m, { questionId: current.id, userAnswer: answer, correctAnswer: current.correctAnswer }]);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      const duration = Math.round((Date.now() - startTime) / 1000);
      const percentage = Math.round((score / questions.length) * 100);
      const result: QuizResult = {
        id: `qr_${Date.now()}`,
        type: quizType,
        score,
        total: questions.length,
        percentage,
        date: new Date().toISOString(),
        duration,
        mistakes,
      };
      addQuizResult(result);
      setQuizState('result');
    }
  };

  const currentQuestion = questions[currentIndex];
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const duration = Math.round((Date.now() - startTime) / 1000);

  const getResultMessage = useMemo(() => {
    if (percentage === 100) return t('result.perfect');
    if (percentage >= 80) return t('result.great');
    if (percentage >= 60) return t('result.good');
    return t('result.needsPractice');
  }, [percentage, t]);

  return (
    <>
      <Helmet>
        <title>{t('title')} | {t('common:appName')}</title>
        <meta name="description" content={t('subtitle')} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Selection */}
        {quizState === 'select' && (
          <>
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h1>
              <p className="text-muted">{t('subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quizTypes.map((qt) => (
                <motion.div
                  key={qt.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    variant="glass"
                    onClick={() => startQuiz(qt.type)}
                    className="h-full"
                  >
                    <qt.icon size={32} className="text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t(qt.titleKey)}</h3>
                    <p className="text-sm text-muted">{t(qt.descKey)}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Playing */}
        {quizState === 'playing' && currentQuestion && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted">
                {t('question', { current: currentIndex + 1, total: questions.length })}
              </p>
              <Badge variant="primary">{t('score', { score })}</Badge>
            </div>

            <ProgressBar
              value={currentIndex + 1}
              max={questions.length}
              size="sm"
              className="mb-8"
            />

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="text-center mb-8">
                  {quizType === 'listening' && currentQuestion.promptAudio && (
                    <div className="mb-4">
                      <AudioPlayer src={currentQuestion.promptAudio} laoText={currentQuestion.promptLaoText} size="lg" />
                    </div>
                  )}
                  <p className="font-lao text-5xl text-primary mb-2">{currentQuestion.prompt}</p>
                  <p className="text-sm text-muted">
                    {t(`types.${quizType}.instruction`)}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {currentQuestion.options.map((option, i) => (
                    <QuizOption
                      key={option}
                      label={option}
                      isSelected={selectedAnswer === option}
                      isCorrect={
                        isRevealed
                          ? option === currentQuestion.correctAnswer
                            ? true
                            : selectedAnswer === option
                              ? false
                              : null
                          : null
                      }
                      isRevealed={isRevealed}
                      onClick={() => handleAnswer(option)}
                      index={i}
                    />
                  ))}
                </div>

                {/* Feedback */}
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-6"
                  >
                    <p className={`text-lg font-medium mb-2 ${
                      selectedAnswer === currentQuestion.correctAnswer ? 'text-success' : 'text-error'
                    }`}>
                      {selectedAnswer === currentQuestion.correctAnswer
                        ? t('feedback.correct')
                        : t('feedback.incorrect')}
                    </p>
                    {selectedAnswer !== currentQuestion.correctAnswer && (
                      <p className="text-sm text-muted mb-2">
                        {t('feedback.correctAnswer', { answer: currentQuestion.correctAnswer })}
                      </p>
                    )}
                    <p className="text-xs text-muted mb-4">{currentQuestion.explanation}</p>
                    <Button onClick={nextQuestion}>
                      {currentIndex < questions.length - 1
                        ? t('common:actions.next')
                        : t('result.title')}
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Results */}
        {quizState === 'result' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Trophy size={48} className="text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-semibold mb-2">{t('result.title')}</h2>
            <p className="text-2xl font-bold text-primary mb-2">
              {t('result.score', { correct: score, total: questions.length })}
            </p>
            <p className="text-4xl font-bold mb-2">{t('result.percentage', { percentage })}</p>
            <p className="text-muted mb-2">{t('result.time', { time: `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` })}</p>
            <p className="text-lg mb-8">{getResultMessage}</p>

            {/* Mistakes review */}
            {mistakes.length > 0 && (
              <div className="mb-8 max-w-md mx-auto">
                <h3 className="font-semibold mb-4">{t('result.review')}</h3>
                <div className="space-y-2">
                  {mistakes.map((m, i) => (
                    <div key={i} className="flex justify-between text-sm bg-black/5 dark:bg-white/5 rounded-lg p-3">
                      <span className="text-error line-through">{m.userAnswer}</span>
                      <span className="text-success">{m.correctAnswer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => startQuiz(quizType)}>
                <RotateCcw size={16} /> {t('result.retry')}
              </Button>
              <Button onClick={() => setQuizState('select')}>
                {t('result.backToQuiz')}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
