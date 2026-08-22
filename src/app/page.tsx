import Link from "next/link";
import "./page.css"; // We'll create this to keep page-specific styles organized

export default function Home() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Master Spelling from <br />
          <span className="text-gradient-primary">Zero to Legend</span>
        </h1>
        <p className="hero-subtitle">
          An interactive, step-by-step Spelling Bee learning platform designed to take you from foundational words to Scripps National level mastery.
        </p>
        
        <div className="hero-actions">
          <Link href="/levels" className="btn btn-primary hero-btn">
            Start Learning Now
          </Link>
          <Link href="/progress" className="btn btn-glass hero-btn">
            View My Progress
          </Link>
        </div>
      </section>

      {/* Feature Cards / How it works */}
      <section className="features-section">
        <div className="glass-panel feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Linear Journey</h3>
          <p className="text-muted">Start from the ABCs and progress step-by-step to complex words.</p>
        </div>
        <div className="glass-panel feature-card">
          <div className="feature-icon">🏆</div>
          <h3>16 Difficulty Levels</h3>
          <p className="text-muted">Progress from Foundation (Level 0) to Ultimate Legend (Level 15).</p>
        </div>
        <div className="glass-panel feature-card">
          <div className="feature-icon">🎧</div>
          <h3>Audio & Practice</h3>
          <p className="text-muted">Listen, unscramble, fill blanks, and type to master each word.</p>
        </div>
      </section>
    </div>
  );
}
