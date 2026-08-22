'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import './test.css';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const levelParam = parseInt(params.level as string, 10);
  
  const { completeLevel, isLoaded } = useProgress();
  const [words, setWords] = useState<any[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(`/api/words/${levelParam}`);
        if (!res.ok) {
          throw new Error('Failed to load words for this level.');
        }
        const data = await res.json();
        const sorted = data.sort((a: any, b: any) => a.order - b.order);
        setWords(sorted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoadingWords(false);
      }
    };

    fetchWords();
  }, [levelParam]);

  if (!isLoaded || isLoadingWords) {
    return <div className="main-content container loading">Loading Level Review...</div>;
  }

  if (error || words.length === 0) {
    return (
      <div className="main-content container test-wrapper">
        <div className="glass-panel" style={{padding: 40, textAlign: 'center'}}>
          <h2>Oops!</h2>
          <p className="text-muted">{error || "No words available to review yet."}</p>
          <button onClick={() => router.push('/levels')} className="btn btn-primary" style={{marginTop: 20}}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const speakWord = (wordText: string) => {
    const utterance = new SpeechSynthesisUtterance(wordText);
    window.speechSynthesis.speak(utterance);
  };

  const handleFinishLevel = () => {
    // Grant 100% score, 50 XP, and PASS the level
    completeLevel(levelParam, 100, 50, true);
    
    // Fun alert
    alert(`🎉 Congratulations! You have completed Level ${levelParam}! 50 XP Earned!`);
    
    // Go back to levels map
    router.push('/levels');
  };

  return (
    <div className="main-content container test-wrapper">
      <div className="test-header">
        <h1 className="test-title">Level {levelParam} Review</h1>
        <p className="test-subtitle">Practice all the words you just learned before unlocking the next level!</p>
      </div>

      <div className="words-grid">
        {words.map((w, idx) => (
          <div key={idx} className="word-review-card" onClick={() => speakWord(w.word)}>
            <div className="review-word-title">{w.word}</div>
            <div className="review-word-meaning">{w.banglaMeaning}</div>
            <button className="audio-icon-btn">🔊</button>
          </div>
        ))}
      </div>

      <div className="completion-box">
        <h3>Ready to move on?</h3>
        <p className="text-muted mb-4" style={{marginBottom: 30}}>
          Make sure you are confident with all the words above. Click the button below to claim your XP and unlock the next level!
        </p>
        <button onClick={handleFinishLevel} className="btn btn-primary finish-btn" style={{background: 'var(--success)'}}>
          🎉 Complete Level & Unlock Next ➡️
        </button>
      </div>
    </div>
  );
}
