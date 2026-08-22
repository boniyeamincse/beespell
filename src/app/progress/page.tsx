'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import levelsData from '@/data/levels.json';
import type { LevelMeta } from '@/types';
import './progress.css';

const levels = levelsData as LevelMeta[];
const TOTAL_LEVELS = levels.length;

function getLevelMeta(level: number): LevelMeta | undefined {
  return levels.find((l) => l.level === level);
}

export default function ProgressPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) {
    return <div className="loading">Loading your progress...</div>;
  }

  const hasStarted = progress.xp > 0 || progress.completedLevels.length > 0;

  if (!hasStarted) {
    return (
      <div className="progress-wrapper">
        <div className="glass-panel empty-state">
          <div className="empty-icon">🐝</div>
          <h1 className="page-title">
            Your <span className="text-gradient-primary">Progress</span>
          </h1>
          <p className="text-muted">
            You haven&apos;t completed any levels yet. Start with Foundation and work your way to Ultimate Legend!
          </p>
          <Link href="/levels" className="btn btn-primary mt-4">
            Start Learning 🚀
          </Link>
        </div>
      </div>
    );
  }

  const highestCompleted = progress.completedLevels.length > 0
    ? Math.max(...progress.completedLevels)
    : undefined;
  const currentRank = highestCompleted !== undefined ? getLevelMeta(highestCompleted) : undefined;

  const nextLevel = progress.unlockedLevels
    .filter((l) => !progress.completedLevels.includes(l))
    .sort((a, b) => a - b)[0]
    ?? Math.max(...progress.unlockedLevels, 0);

  const completedCount = progress.completedLevels.length;
  const completionPercent = Math.round((completedCount / TOTAL_LEVELS) * 100);

  const sortedCompleted = [...progress.completedLevels].sort((a, b) => a - b);

  return (
    <div className="progress-wrapper">
      <div className="page-header">
        <h1 className="page-title">
          Your <span className="text-gradient-primary">Progress</span>
        </h1>
        <p className="page-subtitle">Keep going — every level makes you a stronger speller!</p>
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">{progress.xp}</div>
          <div className="stat-label">Total XP</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon">{currentRank?.badge ?? '🥚'}</div>
          <div className="stat-value">{currentRank?.name ?? 'Foundation'}</div>
          <div className="stat-label">Current Rank</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon">🏁</div>
          <div className="stat-value">{completedCount}/{TOTAL_LEVELS}</div>
          <div className="stat-label">Levels Completed</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-value">{progress.wrongWords.length}</div>
          <div className="stat-label">Words to Review</div>
        </div>
      </div>

      <div className="glass-panel journey-progress-card">
        <div className="journey-progress-header">
          <h3>Journey Progress</h3>
          <span className="text-muted">{completionPercent}%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${completionPercent}%` }}></div>
        </div>
      </div>

      {progress.wrongWords.length > 0 && (
        <div className="glass-panel review-note-card">
          <span className="review-note-icon">💡</span>
          <p>
            You have <strong>{progress.wrongWords.length}</strong> word{progress.wrongWords.length === 1 ? '' : 's'} marked
            difficult. Revisit them next time you practice a level to turn them into strengths!
          </p>
        </div>
      )}

      {sortedCompleted.length > 0 && (
        <>
          <h2 className="section-title">Completed Levels</h2>
          <div className="completed-grid">
            {sortedCompleted.map((level) => {
              const meta = getLevelMeta(level);
              if (!meta) return null;
              const bestScore = progress.bestScores[level];
              return (
                <div className="glass-panel completed-card" key={level}>
                  <div className="completed-badge">{meta.badge}</div>
                  <div className="completed-info">
                    <h4>{meta.name}</h4>
                    <span className="text-muted">Level {level}</span>
                  </div>
                  {bestScore !== undefined && (
                    <div className="completed-score text-success">{bestScore}%</div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="continue-actions">
        <Link href={`/learn/${nextLevel}`} className="btn btn-primary next-btn">
          Continue Learning ➡️
        </Link>
        <Link href="/levels" className="btn btn-glass next-btn">
          View Journey Map
        </Link>
      </div>
    </div>
  );
}
