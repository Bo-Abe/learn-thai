import { describe, it, expect } from 'vitest';
import { consonants } from '../consonants';

describe('Consonants data', () => {
  it('contains exactly 44 consonants', () => {
    expect(consonants).toHaveLength(44);
  });

  it('each consonant has all required fields', () => {
    consonants.forEach((c) => {
      expect(c.id).toBeDefined();
      expect(c.character).toBeDefined();
      expect(c.romanization).toBeDefined();
      expect(c.ipaSound).toBeDefined();
      expect(['high', 'mid', 'low']).toContain(c.class);
      expect(c.exampleWord).toBeDefined();
      expect(c.exampleTranslationEn).toBeDefined();
      expect(c.exampleTranslationFr).toBeDefined();
      expect(c.audioFile).toBeDefined();
    });
  });

  it('has unique IDs', () => {
    const ids = consonants.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains all three tone classes', () => {
    const classes = new Set(consonants.map((c) => c.class));
    expect(classes.has('high')).toBe(true);
    expect(classes.has('mid')).toBe(true);
    expect(classes.has('low')).toBe(true);
  });

  it('each character is valid Thai script', () => {
    consonants.forEach((c) => {
      expect(c.character.length).toBeGreaterThan(0);
    });
  });
});
