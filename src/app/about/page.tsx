import Link from "next/link";
import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-wrapper">
      <section className="about-hero">
        <h1 className="about-title">
          About <span className="text-gradient-primary">BeeSpell</span>
        </h1>
        <p className="about-subtitle">
          BeeSpell Dictionary is a free, step-by-step Spelling Bee learning app for students who want to
          go from their very first letters to competition-level words — one level at a time.
        </p>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <div className="about-steps">
          <div className="glass-panel about-step">
            <div className="step-icon">📖</div>
            <h3>1. Learn a Word</h3>
            <p className="text-muted">
              See the word, hear its pronunciation, and read its meaning in English and Bangla.
            </p>
          </div>
          <div className="glass-panel about-step">
            <div className="step-icon">✍️</div>
            <h3>2. Spell It</h3>
            <p className="text-muted">
              Listen carefully and type the word from memory to lock it into your spelling memory.
            </p>
          </div>
          <div className="glass-panel about-step">
            <div className="step-icon">🧪</div>
            <h3>3. Pass the Level Test</h3>
            <p className="text-muted">
              Once you have learned every word in a level, take a short test to prove you have mastered it.
            </p>
          </div>
          <div className="glass-panel about-step">
            <div className="step-icon">🔓</div>
            <h3>4. Unlock the Next Level</h3>
            <p className="text-muted">
              Passing a level unlocks the next one on your journey — all the way from Foundation to Ultimate Legend.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="glass-panel about-note">
          <h2>50 Levels, No Login Needed</h2>
          <p className="text-muted">
            BeeSpell has 50 levels, starting at <strong>Level 0: Foundation</strong> and building all the way up
            to <strong>Level 49: Ultimate Legend</strong>. There is no account and no login — your progress,
            XP, and unlocked levels are saved right in your browser, so you can jump back in anytime.
          </p>
          <p className="text-muted">
            Since progress is stored locally, clearing your browser data will reset it — so avoid clearing
            cookies/site data for this site if you want to keep your streak.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to start spelling?</h2>
        <Link href="/levels" className="btn btn-primary about-cta-btn">
          Start Learning Now
        </Link>
      </section>
    </div>
  );
}
