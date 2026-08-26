import React from 'react';
import Link from 'next/link';

export default function ReadingUpcomingPage() {
  // Generate 100 levels
  const levels = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary)', textShadow: '3px 3px 0px rgba(0,0,0,0.1)', marginBottom: '15px' }}>
          Reading Journey 📚
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          color: 'var(--secondary)', 
          fontWeight: '900', 
          maxWidth: '600px', 
          margin: '0 auto', 
          background: 'var(--surface-hover)', 
          padding: '15px 30px', 
          borderRadius: '40px', 
          border: '4px dashed var(--secondary)' 
        }}>
          Practice makes Perfect! 🚀
        </p>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '600', maxWidth: '600px', margin: '20px auto 0' }}>
          Get ready for 100 levels of exciting reading comprehension and speed reading! Click an unlocked level to start.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
        gap: '25px',
        justifyItems: 'center',
        padding: '20px 0'
      }}>
        {levels.map((level) => {
          const isUnlocked = level <= 2; // Unlock Level 1 and 2 for now
          
          const boxStyle = {
            background: isUnlocked ? 'white' : '#f1f5f9',
            border: isUnlocked ? '4px solid var(--primary)' : '4px solid #cbd5e1',
            borderRadius: '24px',
            width: '100%',
            aspectRatio: '1/1',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isUnlocked ? 'pointer' : 'not-allowed',
            boxShadow: isUnlocked ? '0 8px 0 var(--primary-hover)' : '0 8px 0 #cbd5e1',
            position: 'relative' as const,
            overflow: 'hidden' as const,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s'
          };

          const cardContent = (
            <>
              {!isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(255, 255, 255, 0.4)',
                  zIndex: 1
                }}></div>
              )}

              <span style={{ fontSize: '2.5rem', fontWeight: '900', color: isUnlocked ? 'var(--text)' : '#94a3b8', zIndex: 2 }}>
                {level}
              </span>
              
              <div style={{ 
                marginTop: '10px', 
                background: isUnlocked ? 'var(--secondary)' : '#94a3b8', 
                color: 'white', 
                padding: '4px 10px', 
                borderRadius: '20px', 
                fontSize: '0.8rem', 
                fontWeight: '900',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {isUnlocked ? (
                  <><span>▶</span> Play</>
                ) : (
                  <><span>🔒</span> Upcoming</>
                )}
              </div>
            </>
          );

          if (isUnlocked) {
            return (
              <Link key={level} href={`/reading/play/${level}`} style={boxStyle} className="level-card-hover">
                {cardContent}
              </Link>
            );
          }

          return (
            <div key={level} style={boxStyle}>
              {cardContent}
            </div>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .level-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 0 var(--primary-hover) !important;
        }
        .level-card-hover:active {
          transform: translateY(4px);
          box-shadow: 0 4px 0 var(--primary-hover) !important;
        }
      `}} />
    </div>
  );
}
