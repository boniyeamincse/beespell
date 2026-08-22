import Link from 'next/link';
import './levels.css';

export default function LevelsPage() {
  // Generate 50 levels for the map
  const levels = Array.from({ length: 50 }, (_, i) => ({
    level: i,
    title: i === 0 ? "Foundation" : `Level ${i}`,
    locked: i !== 0 // Initially only 0 is unlocked
  }));

  return (
    <div className="levels-wrapper">
      <div className="page-header">
        <h1 className="page-title">The <span className="text-gradient-primary">Journey Map</span></h1>
        <p className="page-subtitle">Start from Level 0 and unlock your way to Ultimate Legend!</p>
      </div>

      <div className="levels-grid">
        {levels.map((lvl) => (
          <Link 
            href={lvl.locked ? "#" : `/learn/${lvl.level}`} 
            key={lvl.level} 
            className={`level-card glass-panel ${lvl.locked ? 'locked' : 'unlocked'}`}
          >
            <div className="level-number">{lvl.level}</div>
            <div className="level-info">
              <h2>{lvl.title}</h2>
              {lvl.locked ? (
                <span className="lock-icon">🔒 Locked</span>
              ) : (
                <span className="unlock-status text-success">⭐ Unlocked</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
