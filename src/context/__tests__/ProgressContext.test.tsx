import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProgressProvider, useProgress } from '../ProgressContext';
import type { ReactNode } from 'react';

function wrapper({ children }: { children: ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}

describe('ProgressContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty progress', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.consonantsLearned).toEqual([]);
    expect(result.current.vowelsLearned).toEqual([]);
    expect(result.current.vocabularyLearned).toEqual([]);
    expect(result.current.quizResults).toEqual([]);
  });

  it('can learn a consonant', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnConsonant('c01'));
    expect(result.current.consonantsLearned).toContain('c01');
  });

  it('can unlearn a consonant', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnConsonant('c01'));
    act(() => result.current.unlearnConsonant('c01'));
    expect(result.current.consonantsLearned).not.toContain('c01');
  });

  it('does not add duplicate consonants', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnConsonant('c01'));
    act(() => result.current.learnConsonant('c01'));
    expect(result.current.consonantsLearned.filter((id) => id === 'c01')).toHaveLength(1);
  });

  it('can learn a vowel', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnVowel('v01'));
    expect(result.current.vowelsLearned).toContain('v01');
  });

  it('can learn vocabulary', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnVocabulary('w001'));
    expect(result.current.vocabularyLearned).toContain('w001');
  });

  it('calculates overall percentage', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.overallPercentage).toBe(0);
    act(() => result.current.learnConsonant('c01'));
    expect(result.current.overallPercentage).toBeGreaterThan(0);
  });

  it('can add a quiz result', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    const quizResult = {
      id: 'qr_1',
      type: 'recognition',
      score: 8,
      total: 10,
      percentage: 80,
      date: new Date().toISOString(),
      duration: 60,
      mistakes: [],
    };
    act(() => result.current.addQuizResult(quizResult));
    expect(result.current.quizResults).toHaveLength(1);
    expect(result.current.quizResults[0]?.score).toBe(8);
  });

  it('can reset progress', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnConsonant('c01'));
    act(() => result.current.learnVowel('v01'));
    act(() => result.current.resetProgress());
    expect(result.current.consonantsLearned).toEqual([]);
    expect(result.current.vowelsLearned).toEqual([]);
  });

  it('saves progress to localStorage', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.learnConsonant('c01'));
    const stored = localStorage.getItem('lao_learning_progress');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.consonantsLearned).toContain('c01');
  });
});
