"use client";

import React, { useState, useEffect } from "react";
import tongueTwistersData from "../../data/tongue_twisters.json";
import "../levels/levels.css";

const MAX_LEVEL = Math.max(...tongueTwistersData.map(t => t.level));

export default function TongueTwisterPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Practice Challenge States
  const [repeatCount, setRepeatCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("beeTongueTwisterUnlocked");
    if (stored) {
      try {
        setUnlockedLevels(JSON.parse(stored));
      } catch {}
    }
    setIsLoaded(true);
  }, []);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleRepeatClick = () => {
    if (!isTimerRunning && repeatCount === 0) {
      setIsTimerRunning(true);
    }
    
    if (repeatCount < 5) {
      const newCount = repeatCount + 1;
      setRepeatCount(newCount);
      if (newCount === 5) {
        setIsTimerRunning(false); // Stop timer when 5/5 is reached
      }
    }
  };

  const resetPractice = () => {
    setRepeatCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  const unlockLevel = (level: number) => {
    setUnlockedLevels((prev) => {
      if (prev.includes(level)) return prev;
      const next = [...prev, level];
      localStorage.setItem("beeTongueTwisterUnlocked", JSON.stringify(next));
      return next;
    });
  };

  const currentLevelTwisters = selectedLevel 
    ? tongueTwistersData.filter((t) => t.level === selectedLevel) 
    : [];

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      stopSpeech();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for better clarity
      utterance.pitch = 1.2; // higher kid-friendly tone
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  const handleLevelClick = (level: number) => {
    stopSpeech();
    setSelectedLevel(level);
    setCurrentIndex(0);
    resetPractice();
    setShowSuccessPopup(false);
  };

  const handleNext = () => {
    stopSpeech();
    resetPractice();
    if (currentIndex < currentLevelTwisters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSuccessPopup(true);
      if (selectedLevel !== null && selectedLevel < MAX_LEVEL) {
        unlockLevel(selectedLevel + 1);
      }
    }
  };

  const handlePrev = () => {
    stopSpeech();
    resetPractice();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 1. GRID VIEW
  if (selectedLevel === null) {
    if (!isLoaded) {
      return <div className="levels-wrapper" style={{ padding: "40px", textAlign: "center" }}>Loading your journey...</div>;
    }

    const levels = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);

    return (
      <div className="levels-wrapper" style={{ padding: "20px 0" }}>
        <style>{`
          .grid-title { font-size: 3rem; font-weight: 900; color: var(--primary); text-shadow: 3px 3px 0px rgba(0,0,0,0.1); margin-bottom: 1rem; }
          @media (max-width: 600px) { .grid-title { font-size: 2.2rem; } }
        `}</style>
        <div style={{ textAlign: "center", marginBottom: "40px", padding: "0 10px" }}>
          <h1 className="grid-title">🤪 Silly Twisters Journey</h1>
          <p className="text-muted" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Pick a fun level and stretch your tongue! 😛
          </p>
        </div>

        <div className="levels-grid">
          {levels.map((level) => {
            const isUnlocked = unlockedLevels.includes(level);
            return (
              <div 
                key={level} 
                className={`level-card glass-panel ${isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => {
                  if (isUnlocked) handleLevelClick(level);
                }}
                style={{ 
                  cursor: isUnlocked ? "pointer" : "not-allowed",
                  borderRadius: "25px",
                  border: isUnlocked ? "4px solid var(--primary)" : "4px solid #cbd5e1",
                  boxShadow: isUnlocked ? "0 8px 0 var(--primary-hover)" : "none"
                }}
              >
                <div className="level-number" style={{ borderRadius: "50%", background: isUnlocked ? "var(--primary)" : "#e2e8f0", color: isUnlocked ? "white" : "var(--text-muted)" }}>{level}</div>
                <div className="level-info">
                  <h2 style={{ marginBottom: "5px", fontSize: "1.5rem", fontWeight: "800" }}>Level {level}</h2>
                  {isUnlocked ? (
                    <span className="unlock-status text-success" style={{ fontWeight: 800 }}>⭐ 5 Twisters</span>
                  ) : (
                    <span className="lock-icon" style={{ fontWeight: 800, color: "var(--text-muted)" }}>🔒 Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. FLASHCARD VIEW
  if (currentLevelTwisters.length === 0) {
    return (
      <div className="container mt-4 text-center">
        No tongue twisters found for this level.
        <br /><br />
        <button className="btn btn-primary" onClick={() => { stopSpeech(); setSelectedLevel(null); }}>Back to Levels</button>
      </div>
    );
  }

  const currentTwister = currentLevelTwisters[currentIndex];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 15px", animation: "fadeIn 0.5s ease-out" }}>
      <style>{`
        .twister-title { font-size: 3rem; font-weight: 900; color: var(--secondary); text-shadow: 3px 3px 0px rgba(0,0,0,0.1); margin-bottom: 1rem; text-align: center; }
        .twister-subtitle { text-align: center; margin-bottom: 2rem; font-size: 1.3rem; font-weight: 600; color: var(--text-muted); }
        .flashcard-container { padding: 50px 30px; position: relative; width: 100%; text-align: center; min-height: 380px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #ffffff; border: 6px solid var(--primary); border-radius: 40px; box-shadow: 0 15px 0 var(--primary-hover); margin-bottom: 40px; }
        .twister-text { font-size: 2.4rem; line-height: 1.4; font-weight: 900; color: var(--text); text-shadow: 2px 2px 0px rgba(0,0,0,0.05); margin: 20px 0; }
        .practice-box { margin-top: 20px; background: #fff9e6; padding: 20px 25px; border-radius: 25px; display: flex; flex-direction: column; align-items: center; gap: 15px; width: 100%; max-width: 450px; border: 4px dashed var(--secondary); }
        .practice-stats { font-size: 1.8rem; font-weight: 900; }
        .success-box { padding: 50px 30px; text-align: center; max-width: 450px; width: 90%; border-radius: 40px; border: 8px solid var(--success); box-shadow: 0 15px 0 hsl(150, 80%, 30%); background: #ffffff; animation: fadeIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .success-title { font-size: 2.8rem; font-weight: 900; color: var(--success); margin-bottom: 15px; text-shadow: 2px 2px 0px rgba(0,0,0,0.1); }
        .success-text { font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 30px; line-height: 1.5; }
        .listen-btn { position: absolute; bottom: -40px; background: var(--accent); color: white; border: 6px solid white; border-radius: 50%; width: 80px; height: 80px; font-size: 2.5rem; cursor: pointer; box-shadow: 0 10px 0 hsl(270, 70%, 45%); display: flex; align-items: center; justify-content: center; transition: transform 0.1s; }
        .listen-btn:active { transform: translateY(5px); box-shadow: 0 5px 0 hsl(270, 70%, 45%); }
        .controls-container { display: flex; gap: 20px; margin-top: 10px; justify-content: center; }

        @media (max-width: 600px) {
          .twister-title { font-size: 2.2rem; }
          .twister-subtitle { font-size: 1.1rem; }
          .flashcard-container { padding: 40px 15px; min-height: 300px; border-width: 4px; border-radius: 25px; box-shadow: 0 10px 0 var(--primary-hover); margin-bottom: 30px; }
          .twister-text { font-size: 1.7rem; margin: 15px 0; }
          .practice-box { padding: 15px; gap: 10px; border-width: 3px; }
          .practice-stats { font-size: 1.4rem; }
          .success-box { padding: 30px 20px; border-width: 5px; box-shadow: 0 10px 0 hsl(150, 80%, 30%); border-radius: 25px; }
          .success-title { font-size: 2.2rem; }
          .success-text { font-size: 1.1rem; }
          .listen-btn { width: 65px; height: 65px; font-size: 2rem; bottom: -32px; border-width: 4px; box-shadow: 0 6px 0 hsl(270, 70%, 45%); }
          .listen-btn:active { box-shadow: 0 3px 0 hsl(270, 70%, 45%); transform: translateY(3px); }
          .controls-container { flex-direction: row; width: 100%; justify-content: space-between; gap: 10px; }
          .controls-container button { padding: 12px 15px !important; font-size: 1.1rem !important; flex: 1; }
        }
      `}</style>

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
          animation: "fadeIn 0.3s ease-out", padding: "10px"
        }}>
          <div className="success-box">
            <div style={{ fontSize: "5rem", marginBottom: "15px" }}>🏆</div>
            <h2 className="success-title">Super Duper!</h2>
            <p className="success-text">
              You are a tongue-twisting master! You beat Level {selectedLevel}! 🎉
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-glass" onClick={() => {
                setShowSuccessPopup(false);
                setSelectedLevel(null);
              }} style={{ borderRadius: "30px", fontWeight: "800", border: "4px solid var(--surface-border)" }}>
                🗺️ Levels Map
              </button>
              {selectedLevel && selectedLevel < MAX_LEVEL && (
                <button className="btn btn-primary" onClick={() => {
                  setShowSuccessPopup(false);
                  setSelectedLevel(selectedLevel + 1);
                  setCurrentIndex(0);
                  resetPractice();
                }} style={{ borderRadius: "30px", fontWeight: "800", fontSize: "1.2rem", padding: "12px 24px" }}>
                  Next Level 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button 
        className="btn btn-glass" 
        onClick={() => { stopSpeech(); setSelectedLevel(null); }}
        style={{ marginBottom: "20px", padding: "10px 24px", fontSize: "1.1rem", borderRadius: "30px", fontWeight: "800", border: "3px solid var(--surface-border)", boxShadow: "0 5px 0 var(--surface-border)" }}
      >
        🔙 Back to Levels
      </button>

      <h1 className="twister-title">
        🤪 Level {selectedLevel}
      </h1>
      <p className="twister-subtitle">
        Read out loud and try not to tie your tongue in a knot! 🪢
      </p>

      {/* Flashcard Area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="flashcard-container">
          <span 
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--secondary)",
              color: "white",
              padding: "8px 25px",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: "900",
              border: "4px solid white",
              boxShadow: "0 6px 0 hsl(35, 100%, 45%)",
              whiteSpace: "nowrap"
            }}
          >
            Twister {currentIndex + 1} of {currentLevelTwisters.length}
          </span>
          
          <p className="twister-text">
            "{currentTwister.text}"
          </p>

          {/* Practice Challenge Box */}
          <div className="practice-box">
            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--secondary)", margin: 0 }}>🎯 Repeat 5 Times Fast!</h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", padding: "0 10px" }}>
              <div className="practice-stats" style={{ color: "var(--text)" }}>
                🔄 {repeatCount} / 5
              </div>
              <div className="practice-stats" style={{ color: "var(--accent)" }}>
                ⏱️ {formatTime(timerSeconds)}
              </div>
            </div>

            {repeatCount < 5 ? (
              <button 
                className="btn btn-primary"
                onClick={handleRepeatClick}
                style={{ 
                  width: "100%", 
                  padding: "15px", 
                  fontSize: "1.4rem", 
                  fontWeight: "900",
                  borderRadius: "30px",
                  background: repeatCount === 0 ? "var(--success)" : "var(--primary)",
                  borderBottomColor: repeatCount === 0 ? "hsl(150, 80%, 30%)" : "var(--primary-hover)"
                }}
              >
                {repeatCount === 0 && !isTimerRunning ? "Start Practice 🚀" : "I Said It! 🎙️"}
              </button>
            ) : (
              <div style={{ color: "var(--success)", fontWeight: "900", fontSize: "1.3rem", marginTop: "5px", textAlign: "center", animation: "bounce 1s" }}>
                🎉 You did it in {formatTime(timerSeconds)}!
              </div>
            )}
          </div>

          {/* Listen Button */}
          <button 
            className="listen-btn"
            onClick={() => speakText(currentTwister.text)}
            title="Listen to Pronunciation"
          >
            🔊
          </button>
        </div>

        {/* Controls */}
        <div className="controls-container">
          <button 
            className="btn btn-glass" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            style={{ 
              opacity: currentIndex === 0 ? 0.5 : 1, 
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              borderRadius: "30px",
              fontWeight: "900",
              fontSize: "1.2rem",
              padding: "12px 25px",
              border: "4px solid var(--surface-border)",
              boxShadow: currentIndex === 0 ? "none" : "0 8px 0 var(--surface-border)"
            }}
          >
            ⬅️ Prev
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            style={{ 
              borderRadius: "30px",
              fontWeight: "900",
              fontSize: "1.3rem",
              padding: "12px 30px",
            }}
          >
            {currentIndex < currentLevelTwisters.length - 1 
              ? "Next ➡️" 
              : "Finish 🏆"}
          </button>
        </div>
      </div>
    </div>
  );
}
