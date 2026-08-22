'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import Stage1Learn from '@/components/learn/Stage1Learn';
import type { WordData } from '@/types';
import './learn.css';

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const levelParam = parseInt(params.level as string, 10);

  const { markWordLearned, addWrongWords, isLoaded } = useProgress();
  const [words, setWords] = useState<WordData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingWords, setIsLoadingWords] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(`/api/words/${levelParam}`);
        if (!res.ok) {
          throw new Error('Failed to load words for this level.');
        }
        const data: WordData[] = await res.json();
        const sorted = data.sort((a, b) => a.order - b.order);
        setWords(sorted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setIsLoadingWords(false);
      }
    };

    fetchWords();
  }, [levelParam]);

  if (!isLoaded || isLoadingWords) {
    return <div className="loading">Loading your lesson...</div>;
  }

  if (error || words.length === 0) {
    return (
      <div className="learn-wrapper">
        <div className="glass-panel flashcard">
          <h2>Oops!</h2>
          <p className="text-muted">{error || "No words available for this level yet."}</p>
          <button onClick={() => router.push('/levels')} className="btn btn-primary" style={{marginTop: 20}}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  const handleNextWord = () => {
    // Mark word as learned in localStorage
    markWordLearned(currentWord.id);

    if (isLastWord) {
      // Go to the Exercise/Test Page
      router.push(`/test/${levelParam}`);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePreviousWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="learn-wrapper">
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        ></div>
      </div>
      <div className="progress-text">
        Learning Word {currentIndex + 1} of {words.length}
      </div>

      <div className="flashcard glass-panel">
        <Stage1Learn
          key={currentWord.id}
          currentWord={currentWord}
          isLastWord={isLastWord}
          hasPrevious={currentIndex > 0}
          onPrevious={handlePreviousWord}
          onComplete={handleNextWord}
          onMarkDifficult={(wordId) => addWrongWords([wordId])}
        />
      </div>
    </div>
  );
}
