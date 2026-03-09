import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface QuizOptionProps {
  label: string;
  sublabel?: string;
  isSelected: boolean;
  isCorrect?: boolean | null;
  isRevealed: boolean;
  onClick: () => void;
  disabled?: boolean;
  index: number;
}

export function QuizOption({
  label,
  sublabel,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled = false,
  index,
}: QuizOptionProps) {
  const getClasses = () => {
    if (isRevealed && isCorrect === true) {
      return 'border-success bg-success/20 text-success';
    }
    if (isRevealed && isSelected && isCorrect === false) {
      return 'border-error bg-error/20 text-error';
    }
    if (isSelected) {
      return 'border-primary bg-primary/20 text-primary';
    }
    return 'border-white/10 hover:border-primary/50 hover:bg-white/5';
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      disabled={disabled || isRevealed}
      className={`
        w-full p-4 rounded-xl border-2 text-left
        transition-all duration-200
        flex items-center justify-between gap-3
        disabled:cursor-not-allowed
        ${getClasses()}
      `}
    >
      <div>
        <span className="font-lao text-lg">{label}</span>
        {sublabel && <span className="block text-sm text-muted mt-0.5">{sublabel}</span>}
      </div>
      {isRevealed && isCorrect === true && <Check size={20} className="text-success flex-shrink-0" />}
      {isRevealed && isSelected && isCorrect === false && <X size={20} className="text-error flex-shrink-0" />}
    </motion.button>
  );
}
