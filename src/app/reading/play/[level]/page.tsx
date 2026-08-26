"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import readingData from '@/data/reading_stories.json';

export default function ReadingPlayPage({ params }: { params: Promise<{ level: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const levelNum = parseInt(unwrappedParams.level);
  
  const [storyData, setStoryData] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const data = readingData.find((s) => s.level === levelNum);
    if (data) setStoryData(data);
  }, [levelNum]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && !showQuiz) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, showQuiz]);

  if (!storyData) {
    return <div className="loading">Loading Story...</div>;
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleFinish = () => {
    setShowQuiz(true);
  };

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Render Story with clickable words
  const renderStory = () => {
    const words = storyData.story.split(/(\s+)/);
    return words.map((word: string, i: number) => {
      // Remove punctuation for speech
      const cleanWord = word.replace(/[.,!?]/g, '');
      if (!word.trim()) return <span key={i}>{word}</span>;
      
      return (
        <span 
          key={i} 
          onClick={() => speakWord(cleanWord)}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          className="story-word"
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'white', padding: '15px 30px', borderRadius: '30px', border: '4px solid #cbd5e1' }}>
        <button onClick={() => router.push('/reading')} className="btn" style={{ background: '#f1f5f9', color: 'var(--text)', border: '2px solid #cbd5e1' }}>
          ⬅️ Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: 0, fontWeight: '900' }}>
            Level {levelNum}: {storyData.title}
          </h2>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)' }}>
          ⏱️ {formatTime(timeElapsed)}
        </div>
      </div>

      {!isPlaying ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--text)', marginBottom: '20px' }}>Ready to Read? 📖</h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
            Read the story out loud. Click on any word if you don't know how to pronounce it!
          </p>
          <button onClick={handleStart} className="btn btn-primary" style={{ fontSize: '2rem', padding: '20px 60px', borderRadius: '50px' }}>
            Start Reading ▶
          </button>
        </div>
      ) : !showQuiz ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Main Story Board */}
          <div style={{ 
            background: 'white', 
            padding: '40px', 
            borderRadius: '40px', 
            border: '6px solid var(--primary)', 
            boxShadow: '0 12px 0 var(--primary-hover)',
            fontSize: '2.5rem',
            lineHeight: '1.8',
            fontWeight: '700',
            color: 'var(--text)',
            whiteSpace: 'pre-wrap'
          }}>
            {renderStory()}
          </div>
          
          {/* New Words Section */}
          <div style={{ 
            background: 'var(--surface-hover)', 
            padding: '30px', 
            borderRadius: '30px', 
            border: '4px dashed var(--accent)',
          }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '20px', fontWeight: '900' }}>📚 New Words</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {storyData.new_words?.map((item: any, i: number) => (
                <div key={i} style={{ background: 'white', padding: '10px 20px', borderRadius: '20px', border: '3px solid #cbd5e1', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span style={{ color: 'var(--primary)' }}>{item.word}</span> = <span style={{ color: 'var(--text-muted)' }}>{item.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={handleFinish} className="btn" style={{ background: 'var(--success)', color: 'white', fontSize: '1.8rem', padding: '20px 60px', borderRadius: '50px', borderBottom: '5px solid #0f766e' }}>
              I'm Done Reading! ✅
            </button>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .story-word:hover {
              color: var(--secondary);
              text-decoration: underline;
              text-decoration-thickness: 4px;
            }
          `}} />
        </div>
      ) : (
        <div style={{ textAlign: 'center', background: 'white', padding: '50px', borderRadius: '40px', border: '6px solid var(--secondary)', boxShadow: '0 12px 0 #b45309' }}>
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '10px', fontWeight: '900' }}>Great Job!</h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '40px', fontWeight: '700' }}>
            You read {storyData.wordCount} words in {formatTime(timeElapsed)}!
          </p>
          
          <div style={{ background: '#f1f5f9', padding: '30px', borderRadius: '30px', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '20px', fontWeight: '900' }}>Time for a quick Quiz! ❓</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {storyData.questions[0]}
            </p>
            {/* We will build the full quiz logic in the next iteration */}
            <p style={{ color: 'var(--text-muted)', marginTop: '20px' }}>(Quiz interactive mode coming next!)</p>
          </div>
          
          <button onClick={() => router.push('/reading')} className="btn btn-primary" style={{ fontSize: '1.5rem', padding: '15px 40px', borderRadius: '40px' }}>
            Back to Levels 🗺️
          </button>
        </div>
      )}
    </div>
  );
}
