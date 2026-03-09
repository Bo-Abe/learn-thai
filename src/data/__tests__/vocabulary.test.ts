import { describe, it, expect } from 'vitest';
import { vocabulary } from '../vocabulary';

describe('Vocabulary data', () => {
  it('contains at least 200 words', () => {
    expect(vocabulary.length).toBeGreaterThanOrEqual(200);
  });

  it('each word has all required fields', () => {
    vocabulary.forEach((w) => {
      expect(w.id).toBeDefined();
      expect(w.lao).toBeDefined();
      expect(w.romanization).toBeDefined();
      expect(w.translationFr).toBeDefined();
      expect(w.translationEn).toBeDefined();
      expect(w.category).toBeDefined();
      expect([1, 2, 3]).toContain(w.difficulty);
      expect(w.audioFile).toBeDefined();
    });
  });

  it('has unique IDs', () => {
    const ids = vocabulary.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('covers all vocabulary categories', () => {
    const categories = new Set(vocabulary.map((w) => w.category));
    const expectedCategories = [
      'greetings', 'numbers', 'colors', 'family', 'food',
      'animals', 'body', 'time', 'transport', 'places',
      'commonVerbs', 'adjectives', 'usefulPhrases',
    ];
    expectedCategories.forEach((cat) => {
      expect(categories.has(cat as typeof vocabulary[0]['category'])).toBe(true);
    });
  });

  it('has all difficulty levels', () => {
    const difficulties = new Set(vocabulary.map((w) => w.difficulty));
    expect(difficulties.has(1)).toBe(true);
    expect(difficulties.has(2)).toBe(true);
    expect(difficulties.has(3)).toBe(true);
  });
});
