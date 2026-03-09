import { describe, it, expect } from 'vitest';
import { vowels } from '../vowels';

describe('Vowels data', () => {
  it('contains 27 vowels', () => {
    expect(vowels).toHaveLength(27);
  });

  it('each vowel has all required fields', () => {
    vowels.forEach((v) => {
      expect(v.id).toBeDefined();
      expect(v.symbol).toBeDefined();
      expect(['before', 'after', 'above', 'below', 'around']).toContain(v.position);
      expect(v.romanization).toBeDefined();
      expect(v.ipaSound).toBeDefined();
      expect(['short', 'long']).toContain(v.length);
      expect(v.exampleWord).toBeDefined();
      expect(v.audioFile).toBeDefined();
    });
  });

  it('has unique IDs', () => {
    const ids = vowels.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has both short and long vowels', () => {
    const lengths = new Set(vowels.map((v) => v.length));
    expect(lengths.has('short')).toBe(true);
    expect(lengths.has('long')).toBe(true);
  });
});
