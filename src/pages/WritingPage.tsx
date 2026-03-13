import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Eraser, Undo2, Eye, EyeOff } from 'lucide-react';
import { consonants } from '@/data/consonants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function WritingPage() {
  const { t } = useTranslation(['writing', 'common']);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedChar, setSelectedChar] = useState(consonants[0]!);
  const [showGuide, setShowGuide] = useState(true);
  const [paths, setPaths] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [currentPath, setCurrentPath] = useState<Array<{ x: number; y: number }>>([]);

  const getCoords = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0]!;
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Guide character
    if (showGuide) {
      ctx.font = '200px "Noto Sans Thai"';
      ctx.fillStyle = 'rgba(201, 168, 76, 0.1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedChar.character, canvas.width / 2, canvas.height / 2);
    }

    // Draw paths
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    [...paths, currentPath].forEach((path) => {
      if (path.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(path[0]!.x, path[0]!.y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i]!.x, path[i]!.y);
      }
      ctx.stroke();
    });
  }, [showGuide, selectedChar, paths, currentPath]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    redraw();
  }, [redraw]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoords(e);
    setIsDrawing(true);
    setCurrentPath([coords]);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCoords(e);
    setCurrentPath((prev) => [...prev, coords]);
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPath.length > 1) {
      setPaths((prev) => [...prev, currentPath]);
    }
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const undo = () => {
    setPaths((prev) => prev.slice(0, -1));
  };

  return (
    <>
      <Helmet>
        <title>{t('title')} | {t('common:appName')}</title>
        <meta name="description" content={t('subtitle')} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h1>
          <p className="text-muted">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character selector */}
          <div className="lg:col-span-1 overflow-y-auto max-h-[600px]">
            <h2 className="font-semibold mb-3">{t('selectCharacter')}</h2>
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 gap-2">
              {consonants.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedChar(c); clearCanvas(); }}
                  className={`p-2 rounded-lg font-thai text-2xl transition-all ${
                    selectedChar.id === c.id
                      ? 'bg-primary text-bg-dark shadow-gold'
                      : 'bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  {c.character}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas area */}
          <div className="lg:col-span-2">
            <Card variant="gold" hover={false}>
              {/* Target character display */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-thai text-4xl text-primary">{selectedChar.character}</span>
                  <div>
                    <p className="font-medium">{selectedChar.romanization}</p>
                    <p className="text-xs text-muted">{selectedChar.ipaSound}</p>
                  </div>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative bg-black/20 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                <canvas
                  ref={canvasRef}
                  className="w-full touch-none cursor-crosshair"
                  style={{ height: '400px' }}
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                  aria-label={t('canvas.draw')}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="ghost" size="sm" onClick={clearCanvas}>
                  <Eraser size={16} /> {t('canvas.clear')}
                </Button>
                <Button variant="ghost" size="sm" onClick={undo} disabled={paths.length === 0}>
                  <Undo2 size={16} /> {t('canvas.undo')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowGuide(!showGuide)}
                >
                  {showGuide ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showGuide ? t('canvas.hideGuide') : t('canvas.showGuide')}
                </Button>
              </div>

              {/* Side by side comparison */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 pt-6 border-t border-black/10 dark:border-white/10"
              >
                <h3 className="font-semibold mb-3">{t('compare.title')}</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted mb-2">{t('compare.target')}</p>
                    <p className="font-thai text-6xl text-primary">{selectedChar.character}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-2">{t('compare.yours')}</p>
                    <p className="text-6xl text-muted">
                      {paths.length > 0 ? '✓' : '—'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
