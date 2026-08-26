import Link from "next/link";
import Image from "next/image";
import "./page.css"; // We'll create this to keep page-specific styles organized

export default function Home() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Become a <br />
            <span className="text-gradient-primary">Spelling Legend!</span>
          </h1>
          <p className="hero-subtitle">
            Join thousands of kids mastering their vocabulary with fun games, silly tongue twisters, and 100 levels of spelling adventures!
          </p>
          
          <div className="hero-actions">
            <Link href="/levels" className="btn btn-primary hero-btn">
              Play Now 🚀
            </Link>
            <Link href="/tongue-twister" className="btn btn-glass hero-btn">
              Tongue Twisters 👅
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <Image 
            src="/images/landing/hero_bee.png" 
            alt="Cute Bee Mascot" 
            width={450} 
            height={450} 
            className="hero-image"
            priority
          />
        </div>
      </section>

      {/* Trust Banner */}
      <div className="trust-banner">
        <div className="trust-item">
          <div className="trust-number">100</div>
          <div className="trust-label">Fun Levels</div>
        </div>
        <div className="trust-item">
          <div className="trust-number">500</div>
          <div className="trust-label">Twisters</div>
        </div>
        <div className="trust-item">
          <div className="trust-number">100%</div>
          <div className="trust-label">Kid Approved</div>
        </div>
      </div>

      {/* Feature Cards / How it works */}
      <div style={{ width: "100%", marginTop: "20px" }}>
        <h2 className="features-title">Exciting Features! ✨</h2>
        <section className="features-section">
          <Link href="/levels" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="feature-card primary">
              <Image src="/images/landing/trophy.png" alt="Trophy Levels" width={150} height={150} className="feature-img" />
              <h3>100 Fun Levels</h3>
              <p>Climb the ranks from Beginner to Ultimate Legend! Unlock trophies and prove your spelling skills.</p>
            </div>
          </Link>
          
          <Link href="/tongue-twister" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="feature-card secondary">
              <Image src="/images/landing/tongue_twister.png" alt="Tongue Twisters" width={150} height={150} className="feature-img" />
              <h3>Silly Twisters</h3>
              <p>Train your pronunciation with crazy, funny tongue twisters and race against the ticking timer!</p>
            </div>
          </Link>

          <Link href="/progress" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="feature-card accent">
              <div className="feature-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontSize: '5rem', border: '6px solid var(--accent)' }}>
                📈
              </div>
              <h3>Track Progress</h3>
              <p>Parents and kids can see exactly how many words they've mastered and where they need more practice.</p>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
