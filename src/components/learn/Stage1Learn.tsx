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
          <h1 className="main-word text-gradient-primary">{currentWord.word}</h1>
          
          {currentWord.syllables && currentWord.syllables.length > 0 && (
            <div className="syllables-box">
              <span className="syllables-text">
                {currentWord.syllables.length === 1 
                  ? currentWord.word.toUpperCase().split('').join(' - ') 
                  : currentWord.syllables.join(' • ')}
              </span>
            </div>
          )}

          <div className="pronunciation">
            <span>{currentWord.pronunciation}</span> • <span>{currentWord.banglaPronunciation}</span>
          </div>

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
            {showHint && currentWord.hint && (
              <div className="detail-item fade-in">
                <span className="label text-warning" style={{color: 'orange'}}>Hint:</span>
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
            <button onClick={speakWord} className="btn btn-glass small-btn">
              🔊 Listen Again
            </button>
            <button onClick={() => setShowHint(true)} className="btn btn-glass small-btn">
              💡 Show Hint
            </button>
            <button onClick={markDifficult} className="btn btn-glass small-btn">
              ⚠️ Mark Difficult
            </button>
          </div>

          {difficultMsg && <p className="text-muted mt-2" style={{ marginTop: 10 }}>{difficultMsg}</p>}

          <div className="card-actions mt-4">
            <button onClick={startSpellingPhase} className="btn btn-primary next-btn">
              I Learned This ➡️
            </button>
          </div>
        </>
      ) : (
        <div className="spelling-phase fade-in">
          <h2 className="stage-title">Hide and Spell!</h2>
          <p className="text-muted mb-4" style={{marginBottom: 20}}>Type the word you just learned.</p>
          
          <button onClick={speakWord} className="btn btn-glass mb-4" style={{marginBottom: 30}}>
            🔊 Listen Again
          </button>

          <div className="input-group">
            <input 
              ref={inputRef}
              type="text" 
              className={`spell-input ${isCorrect ? 'correct-input' : ''}`}
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              disabled={isCorrect}
              placeholder="Type here..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') checkSpelling();
              }}
            />
          </div>
          
          {errorMsg && <p className="error-text mt-2" style={{color: 'red', marginTop: 10}}>{errorMsg}</p>}

          <div className="card-actions" style={{marginTop: 40}}>
            {!isCorrect ? (
              <button onClick={checkSpelling} className="btn btn-primary">
                Check Spelling
              </button>
            ) : (
              <button onClick={onComplete} className="btn btn-primary pulse-anim" style={{background: 'var(--success)'}}>
                {isLastWord ? "Take Level Exercise ➡️" : "Next Word ➡️"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
