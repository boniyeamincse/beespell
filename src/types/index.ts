export interface WordData {
  id: string;
  level: number;
  order: number;
  word: string;
  pronunciation: string;
  banglaPronunciation: string;
  meaning: string;
  banglaMeaning: string;
  syllables: string[];
  example: string;
  hint: string;
  image?: string;
  partOfSpeech?: string;
  origin?: string;
}

export interface LevelMeta {
  level: number;
  name: string;
  totalWords: number;
  passScore: number;
  xpReward: number;
  badge: string;
  reviewStreakRequired?: boolean;
}
