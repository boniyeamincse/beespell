import { useState, useEffect } from 'react';

export interface UserProgress {
  unlockedLevels: number[];
  completedLevels: number[];
  xp: number;
  learnedWords: string[];
  wrongWords: string[];
  bestScores: Record<number, number>;
}

const defaultProgress: UserProgress = {
  unlockedLevels: [0], // Only Level 0 unlocked initially
  completedLevels: [],
  xp: 0,
  learnedWords: [],
  wrongWords: [],
  bestScores: {},
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // localStorage is only available client-side, so this can't be a lazy
    // useState initializer — it would throw during server-side rendering.
    const stored = localStorage.getItem('beeProgress');
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress({ ...defaultProgress, ...JSON.parse(stored) });
      } catch {
        console.error("Failed to parse progress");
      }
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('beeProgress', JSON.stringify(newProgress));
  };

  const markWordLearned = (wordId: string) => {
    if (!progress.learnedWords.includes(wordId)) {
      saveProgress({
        ...progress,
        learnedWords: [...progress.learnedWords, wordId]
      });
    }
  };

  const unlockLevel = (level: number) => {
    if (!progress.unlockedLevels.includes(level)) {
      saveProgress({
        ...progress,
        unlockedLevels: [...progress.unlockedLevels, level]
      });
    }
  };

  const addXP = (amount: number) => {
    saveProgress({
      ...progress,
      xp: progress.xp + amount
    });
  };

  const addWrongWords = (wordIds: string[]) => {
    const merged = Array.from(new Set([...progress.wrongWords, ...wordIds]));
    saveProgress({ ...progress, wrongWords: merged });
  };

  const clearWrongWords = (wordIds: string[]) => {
    const remaining = progress.wrongWords.filter((id) => !wordIds.includes(id));
    saveProgress({ ...progress, wrongWords: remaining });
  };

  /** Records a test attempt, unlocks the next level and awards XP on a pass. */
  const completeLevel = (level: number, scorePercent: number, xpReward: number, passed: boolean) => {
    const prevBest = progress.bestScores[level] ?? 0;
    const next: UserProgress = {
      ...progress,
      bestScores: { ...progress.bestScores, [level]: Math.max(prevBest, scorePercent) },
    };
    if (passed) {
      if (!next.completedLevels.includes(level)) {
        next.completedLevels = [...next.completedLevels, level];
      }
      if (!next.unlockedLevels.includes(level + 1)) {
        next.unlockedLevels = [...next.unlockedLevels, level + 1];
      }
      next.xp = next.xp + xpReward;
    }
    saveProgress(next);
  };

  return {
    progress,
    isLoaded,
    markWordLearned,
    unlockLevel,
    addXP,
    addWrongWords,
    clearWrongWords,
    completeLevel,
  };
}
