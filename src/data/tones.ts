import type { ThaiTone } from '@/types/thai';

export const tones: ThaiTone[] = [
  {
    id: "t01",
    nameEn: "Mid Tone",
    nameFr: "Ton moyen",
    nameThai: "สามัญ",
    marker: "",
    descriptionEn: "Flat pitch at the speaker's mid level",
    descriptionFr: "Ton plat au niveau moyen du locuteur",
    contour: "flat mid level",
    audioExample: "t01.mp3",
    minimalPairs: [{ word1: "กา", meaning1En: "crow", meaning1Fr: "corbeau", word2: "ก่า", meaning2En: "stuck", meaning2Fr: "coincé" }],
  },
  {
    id: "t02",
    nameEn: "Low Tone",
    nameFr: "Ton bas",
    nameThai: "เอก",
    marker: "่",
    descriptionEn: "Low and slightly falling pitch",
    descriptionFr: "Ton bas légèrement descendant",
    contour: "low slightly falling",
    audioExample: "t02.mp3",
    minimalPairs: [{ word1: "ป่า", meaning1En: "forest", meaning1Fr: "forêt", word2: "ปา", meaning2En: "to throw", meaning2Fr: "lancer" }],
  },
  {
    id: "t03",
    nameEn: "Falling Tone",
    nameFr: "Ton descendant",
    nameThai: "โท",
    marker: "้",
    descriptionEn: "Starts high and falls to low",
    descriptionFr: "Commence haut et descend vers le bas",
    contour: "high to low",
    audioExample: "t03.mp3",
    minimalPairs: [{ word1: "ม้า", meaning1En: "horse", meaning1Fr: "cheval", word2: "มา", meaning2En: "to come", meaning2Fr: "venir" }],
  },
  {
    id: "t04",
    nameEn: "High Tone",
    nameFr: "Ton haut",
    nameThai: "ตรี",
    marker: "๊",
    descriptionEn: "High level pitch",
    descriptionFr: "Ton haut et plat",
    contour: "high level",
    audioExample: "t04.mp3",
    minimalPairs: [{ word1: "โต๊ะ", meaning1En: "table", meaning1Fr: "table", word2: "โต", meaning2En: "big", meaning2Fr: "grand" }],
  },
  {
    id: "t05",
    nameEn: "Rising Tone",
    nameFr: "Ton montant",
    nameThai: "จัตวา",
    marker: "๋",
    descriptionEn: "Starts low and rises to high",
    descriptionFr: "Commence bas et monte vers le haut",
    contour: "low to high",
    audioExample: "t05.mp3",
    minimalPairs: [{ word1: "สี่", meaning1En: "four", meaning1Fr: "quatre", word2: "สี", meaning2En: "color", meaning2Fr: "couleur" }],
  },
];

export const toneRules = {
  mid: {
    description: 'Rules for mid-class consonants',
    liveSyllable: {
      noMarker: 'mid',
      maiEk: 'low',
      maiTho: 'falling',
      maiTri: 'high',
      maiChattawa: 'rising',
    },
    deadSyllable: {
      shortVowel: 'low',
      longVowel: 'low',
    },
  },
  high: {
    description: 'Rules for high-class consonants',
    liveSyllable: {
      noMarker: 'rising',
      maiEk: 'low',
      maiTho: 'falling',
    },
    deadSyllable: {
      shortVowel: 'low',
      longVowel: 'low',
    },
  },
  low: {
    description: 'Rules for low-class consonants',
    liveSyllable: {
      noMarker: 'mid',
      maiEk: 'falling',
      maiTho: 'high',
    },
    deadSyllable: {
      shortVowel: 'high',
      longVowel: 'falling',
    },
  },
};
