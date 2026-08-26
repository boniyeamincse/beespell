"use client";

import React, { useState, useEffect } from "react";
import tongueTwistersData from "../../data/tongue_twisters.json";
import "../levels/levels.css";

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
      utterance.pitch = 1.1; // kid-friendly tone
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
      if (selectedLevel !== null) {
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

    const levels = Array.from({ length: 60 }, (_, i) => i + 1);

    return (
      <div className="levels-wrapper" style={{ padding: "20px 0" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 className="text-gradient-primary" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            👅 Tongue Twisters Journey
          </h1>
          <p className="text-muted" style={{ fontSize: "1.2rem" }}>
            Select a level to practice your pronunciation! (5 twisters per level)
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
                style={{ cursor: isUnlocked ? "pointer" : "not-allowed" }}
              >
                <div className="level-number">{level}</div>
                <div className="level-info">
                  <h2 style={{ marginBottom: "5px", fontSize: "1.4rem" }}>Level {level}</h2>
                  {isUnlocked ? (
                    <span className="unlock-status text-success" style={{ fontWeight: 600 }}>⭐ 5 Twisters</span>
                  ) : (
                    <span className="lock-icon" style={{ fontWeight: 600, color: "var(--text-muted)" }}>🔒 Locked</span>
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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 0", animation: "fadeIn 0.5s ease-out" }}>
      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
          animation: "fadeIn 0.3s ease-out"
        }}>
          <div className="glass-panel" style={{ padding: "40px", textAlign: "center", maxWidth: "450px", width: "90%" }}>
            <div style={{ fontSize: "4rem", marginBottom: "10px" }}>🌟</div>
            <h2 className="text-gradient-primary" style={{ fontSize: "2.2rem", marginBottom: "10px" }}>Awesome Job!</h2>
            <p className="text-muted" style={{ fontSize: "1.2rem", marginBottom: "30px", lineHeight: "1.5" }}>
              You successfully mastered <strong>Level {selectedLevel}</strong>! Your pronunciation is getting sharper.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-glass" onClick={() => {
                setShowSuccessPopup(false);
                setSelectedLevel(null);
              }}>
                🗺️ Levels Map
              </button>
              {selectedLevel && selectedLevel < 60 && (
                <button className="btn btn-primary" onClick={() => {
                  setShowSuccessPopup(false);
                  setSelectedLevel(selectedLevel + 1);
                  setCurrentIndex(0);
                  resetPractice();
                }}>
                  Next Level ➡️
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button 
        className="btn btn-glass" 
        onClick={() => { stopSpeech(); setSelectedLevel(null); }}
        style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "1rem" }}
      >
        🔙 Back to Levels
      </button>

      <h1 className="text-gradient-primary" style={{ textAlign: "center", marginBottom: "1rem" }}>
        👅 Level {selectedLevel}
      </h1>
      <p className="text-muted" style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.1rem" }}>
        Read out loud and practice your pronunciation!
      </p>

      {/* Flashcard Area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        <div className="glass-panel" style={{ padding: "40px", position: "relative", width: "100%", textAlign: "center", minHeight: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span 
            style={{
              position: "absolute",
              top: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--primary)",
              color: "white",
              padding: "6px 20px",
              borderRadius: "20px",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 150, 255, 0.3)"
            }}
          >
            Twister {currentIndex + 1} of {currentLevelTwisters.length}
          </span>
          <p style={{ fontSize: "1.8rem", lineHeight: "1.6", fontWeight: "600", color: "var(--text)" }}>
            "{currentTwister.text}"
          </p>

          {/* Practice Challenge Box */}
          <div style={{ marginTop: "30px", background: "var(--background)", padding: "15px 25px", borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%", maxWidth: "400px", border: "2px solid var(--surface-border)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--primary)", margin: 0 }}>🎯 Practice Challenge (5 Times)</h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", padding: "10px" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>
                🔄 {repeatCount} / 5
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent)" }}>
                ⏱️ {formatTime(timerSeconds)}
              </div>
            </div>

            {repeatCount < 5 ? (
              <button 
                className="btn btn-primary"
                onClick={handleRepeatClick}
                style={{ width: "100%", padding: "12px" }}
              >
                {repeatCount === 0 && !isTimerRunning ? "Start Practice 🚀" : "I Said It! 🎙️"}
              </button>
            ) : (
              <div style={{ color: "var(--success)", fontWeight: "bold", fontSize: "1.2rem", marginTop: "10px", textAlign: "center" }}>
                🎉 Challenge Complete in {formatTime(timerSeconds)}!
              </div>
            )}
          </div>

          {/* Listen Button */}
          <button 
            onClick={() => speakText(currentTwister.text)}
            style={{
              position: "absolute",
              bottom: "-25px",
              background: "var(--secondary)",
              color: "white",
              border: "4px solid white",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            title="Listen to Pronunciation"
          >
            🔊
          </button>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
          <button 
            className="btn btn-glass" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1, cursor: currentIndex === 0 ? "not-allowed" : "pointer" }}
          >
            ⬅️ Previous
          </button>
          
          <div style={{ display: "flex", alignItems: "center", fontWeight: "bold", color: "var(--text-muted)", fontSize: "1.2rem", padding: "0 10px" }}>
            {currentIndex + 1} / {currentLevelTwisters.length}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleNext}
          >
            {currentIndex < currentLevelTwisters.length - 1 
              ? "Next ➡️" 
              : "Finish Level 🎉"}
          </button>
        </div>
      </div>
    </div>
  );
}
