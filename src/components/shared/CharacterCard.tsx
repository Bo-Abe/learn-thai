import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AudioPlayer } from '@/components/shared/AudioPlayer';

interface CharacterCardProps {
  character: string;
  romanization: string;
  ipaSound: string;
  toneClass?: 'high' | 'mid' | 'low';
  exampleWord?: string;
  exampleTranslation?: string;
  audioFile: string;
  illustration?: string;
  isLearned?: boolean;
  onClick?: () => void;
}

const classColors = {
  high: 'accent' as const,
  mid: 'primary' as const,
  low: 'secondary' as const,
};

export function CharacterCard({
  character,
  romanization,
  ipaSound,
  toneClass,
  exampleWord,
  exampleTranslation,
  audioFile,
  illustration,
  isLearned = false,
  onClick,
}: CharacterCardProps) {
  const { t } = useTranslation('alphabet');

  return (
    <Card
      variant={isLearned ? 'gold' : 'default'}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      {isLearned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 bg-success rounded-full p-1"
        >
          <Check size={14} className="text-white" />
        </motion.div>
      )}

      <div className="text-center">
        <p className="font-thai text-5xl mb-3 text-primary">{character}</p>
        {illustration && (          <div            className="w-12 h-12 mx-auto mb-2 opacity-70"            dangerouslySetInnerHTML={{ __html: illustration }}          />        )}

        <p className="text-lg font-medium mb-1">{romanization}</p>
        <p className="text-sm text-muted mb-3">{ipaSound}</p>

        {toneClass && (
          <Badge variant={classColors[toneClass]} size="sm" className="mb-3">
            {t(`consonants.card.${toneClass}Class`)}
          </Badge>
        )}

        <div className="flex items-center justify-center gap-2 mb-2">
          <AudioPlayer src={audioFile} thaiText={exampleWord || character} size="sm" />
        </div>

        {exampleWord && (
          <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
            <p className="font-thai text-lg">{exampleWord}</p>
            <p className="text-xs text-muted">{exampleTranslation}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
