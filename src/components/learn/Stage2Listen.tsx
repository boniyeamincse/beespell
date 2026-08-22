'use client';

import { useState, useEffect } from 'react';

interface Stage2Props {
  currentWord: any;
  allWords: any[];
  onComplete: () => void;
}

export default function Stage2Listen({ currentWord, allWords, onComplete }: Stage2Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Generate 3 random options (1 correct, 2 wrong)
    const wrongOptions = allWords
      .filter((w) => w.word !== currentWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((w) => w.word);

    const allOpts = [...wrongOptions, currentWord.word].sort(() => 0.5 - Math.random());
    setOptions(allOpts);

    // Auto play sound when stage loads
    speakWord();
  }, [currentWord]);

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (opt: string) => {
    if (isCorrect) return; // Prevent clicking after correct
    
    setSelected(opt);
    if (opt === currentWord.word) {
      setIsCorrect(true);
      // Play a little success sound if we want, or just wait for user to click next
    } else {
      setIsCorrect(false);
      // Shake animation class can be added
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
      }, 800);
    }
  };

  return (
    <div className="stage-container fade-in">
      <h2 className="stage-title">Listen & Choose</h2>
      
      <button onClick={speakWord} className="btn btn-primary audio-btn massive-btn">
        🔊 Play Audio
      </button>

      <div className="options-grid">
        {options.map((opt, idx) => {
          let btnClass = "btn btn-glass option-btn";
          if (selected === opt) {
            btnClass += isCorrect ? " correct" : " wrong";
          }
          
          return (
            <button 
              key={idx} 
              className={btnClass}
              onClick={() => handleSelect(opt)}
              disabled={isCorrect === true}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {isCorrect && (
        <div className="card-actions mt-4">
          <button onClick={onComplete} className="btn btn-primary next-btn pulse-anim">
            Awesome! Next ➡️
          </button>
        </div>
      )}
    </div>
  );
}
