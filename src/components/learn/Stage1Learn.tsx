'use client';

import { useState, useRef } from 'react';
import type { WordData } from '@/types';

interface Stage1Props {
  currentWord: WordData;
  isLastWord: boolean;
  onComplete: () => void;
  onPrevious?: () => void;
  hasPrevious: boolean;
  onMarkDifficult: (wordId: string) => void;
}

export default function Stage1Learn({ currentWord, isLastWord, onComplete, onPrevious, hasPrevious, onMarkDifficult }: Stage1Props) {
  const [showHint, setShowHint] = useState(false);
  const [isSpellingPhase, setIsSpellingPhase] = useState(false);
  const [spellInput, setSpellInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [difficultMsg, setDifficultMsg] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    window.speechSynthesis.speak(utterance);
  };

  const startSpellingPhase = () => {
    setIsSpellingPhase(true);
    speakWord();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const checkSpelling = () => {
    if (spellInput.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      setIsCorrect(true);
      setErrorMsg('');
      speakWord(); // Happy feedback
    } else {
      setErrorMsg('Incorrect, try again! Listen carefully.');
      speakWord();
    }
  };

  const markDifficult = () => {
    onMarkDifficult(currentWord.id);
    setDifficultMsg('Marked as difficult — added to your review list.');
    setTimeout(() => setDifficultMsg(''), 2000);
  };

  return (
    <div className="stage-container fade-in">
      {!isSpellingPhase ? (
        <>
          <div className="word-header">
            <h1 className="main-word text-gradient-primary">{currentWord.word}</h1>
            <button onClick={speakWord} className="btn-icon bounce-hover" title="Listen">
              🔊
            </button>
          </div>
          
          <div className="tags-row">
            {currentWord.partOfSpeech && (
              <span className="badge tag-type">{currentWord.partOfSpeech}</span>
            )}
            {currentWord.origin && (
              <span className="badge tag-origin">🌍 {currentWord.origin}</span>
            )}
          </div>

          <div className="pronunciation">
            <span className="ipa-text">{currentWord.pronunciation}</span>
            <span className="dot-divider">•</span>
            <span className="bn-pronunciation">{currentWord.banglaPronunciation}</span>
          </div>

          {currentWord.syllables && currentWord.syllables.length > 0 && (
            <div className="syllables-box">
              <span className="syllables-text">
                {currentWord.syllables.join(' • ')}
              </span>
            </div>
          )}

          <div className="spelling-breakdown mb-3">
            {currentWord.word.toUpperCase().split('').map((letter, idx) => (
              <span key={idx} className="letter-tile">{letter}</span>
            ))}
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="label">📖 Meaning</span>
              <p>{currentWord.meaning}</p>
            </div>
            <div className="detail-item">
              <span className="label">🇧🇩 Bangla</span>
              <p>{currentWord.banglaMeaning}</p>
            </div>
            <div className="detail-item full-width">
              <span className="label">✍️ Example</span>
              <p className="example-text">"{currentWord.example}"</p>
            </div>
            {showHint && currentWord.hint && (
              <div className="detail-item full-width fade-in hint-box">
                <span className="label text-warning">💡 Hint</span>
                <p>{currentWord.hint}</p>
              </div>
            )}
          </div>

          <div className="action-buttons-grid">
            {hasPrevious && (
              <button onClick={onPrevious} className="btn btn-glass small-btn">
                ⬅️ Previous
              </button>
            )}
            <button onClick={() => setShowHint(true)} className="btn btn-glass small-btn">
              💡 Hint
            </button>
            <button onClick={markDifficult} className="btn btn-glass small-btn warning-border">
              ⚠️ Hard
            </button>
          </div>

          {difficultMsg && <p className="text-muted mt-2 fade-in">{difficultMsg}</p>}

          <div className="card-actions mt-4">
            <button onClick={startSpellingPhase} className="btn btn-primary next-btn glow-effect">
              I Learned This ➡️
            </button>
          </div>
        </>
      ) : (
        <div className="spelling-phase fade-in">
          <div className="spelling-header">
            <h2 className="stage-title">Hide and Spell!</h2>
            <button onClick={speakWord} className="btn-icon pulse-soft" title="Listen">
              🔊
            </button>
          </div>
          <p className="text-muted mb-4 subtitle-text">Type the word you just learned.</p>
          
          <div className="input-group">
            <input 
              ref={inputRef}
              type="text" 
              className={`spell-input ${isCorrect ? 'correct-input' : errorMsg ? 'error-input' : ''}`}
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              disabled={isCorrect}
              placeholder="Type here..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') checkSpelling();
              }}
            />
          </div>
          
          {errorMsg && <p className="error-text mt-3 slide-up">❌ {errorMsg}</p>}
          {isCorrect && <p className="success-text mt-3 slide-up">✅ Brilliant!</p>}

          <div className="card-actions mt-5">
            {!isCorrect ? (
              <button onClick={checkSpelling} className="btn btn-primary submit-btn">
                Check Spelling
              </button>
            ) : (
              <button onClick={onComplete} className="btn btn-success pulse-anim next-btn">
                {isLastWord ? "Take Level Exercise 🏆" : "Next Word ➡️"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
