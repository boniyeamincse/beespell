export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  totalWords: number;
}

export interface WordData {
  id: string;
  category: string;
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
}
