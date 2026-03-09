import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { AudioProvider } from '@/context/AudioContext';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ConsonantsPage = lazy(() => import('@/pages/ConsonantsPage'));
const VowelsPage = lazy(() => import('@/pages/VowelsPage'));
const TonesPage = lazy(() => import('@/pages/TonesPage'));
const VocabularyPage = lazy(() => import('@/pages/VocabularyPage'));
const QuizPage = lazy(() => import('@/pages/QuizPage'));
const WritingPage = lazy(() => import('@/pages/WritingPage'));
const ProgressPage = lazy(() => import('@/pages/ProgressPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ProgressProvider>
          <AudioProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/alphabet/consonants" element={<ConsonantsPage />} />
                  <Route path="/alphabet/vowels" element={<VowelsPage />} />
                  <Route path="/alphabet/tones" element={<TonesPage />} />
                  <Route path="/vocabulary" element={<VocabularyPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/writing" element={<WritingPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AudioProvider>
        </ProgressProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
