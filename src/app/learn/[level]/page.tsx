'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import wordsData from '@/data/words.json';
import './learn.css';

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const levelParam = parseInt(params.level as string, 10);
  
  const [words, setWords] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Filter words for this level
    const levelWords = wordsData.filter(w => w.level === levelParam).sort((a, b) => a.order - b.order);
    setWords(levelWords);
  }, [levelParam]);

  if (words.length === 0) {
    return <div className="loading">Loading words...</div>;
  }

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  const handleNext = () => {
    if (isLastWord) {
      // For now, go back to levels. Later, this will go to Test Stage.
      router.push('/levels');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    window.speechSynthesis.speak(utterance);
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
        Word {currentIndex + 1} of {words.length}
      </div>

      <div className="flashcard glass-panel">
        <h1 className="main-word text-gradient-primary">{currentWord.word}</h1>
        <div className="pronunciation">
          <span>{currentWord.pronunciation}</span> • <span>{currentWord.banglaPronunciation}</span>
        </div>
        
        <button onClick={speakWord} className="btn btn-glass audio-btn">
          🔊 Listen
        </button>

        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Meaning:</span>
            <p>{currentWord.meaning}</p>
          </div>
          <div className="detail-item">
            <span className="label">Bangla:</span>
            <p>{currentWord.banglaMeaning}</p>
          </div>
          <div className="detail-item">
            <span className="label">Example:</span>
            <p>{currentWord.example}</p>
          </div>
        </div>

        <div className="card-actions">
          <button onClick={handleNext} className="btn btn-primary next-btn">
            {isLastWord ? "Finish Learning" : "Next Word ➡️"}
          </button>
        </div>
      </div>
    </div>
  );
}
