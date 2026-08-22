export default function AboutPage() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className="text-gradient-primary" style={{ fontSize: '3.5rem', marginBottom: '40px', textAlign: 'center' }}>About BeeSpell</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'stretch' }}>
        
        {/* Left Column: Mission & Details */}
        <div className="glass-panel" style={{ flex: '1 1 450px', padding: '40px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '20px' }}>Welcome to BeeSpell Dictionary!</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text-muted)' }}>
            This platform is designed to make spelling bee preparation fun, progressive, and highly interactive for students of all ages. 
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text-muted)' }}>
            Our carefully structured curriculum features over <strong>2,500+ curated vocabulary words</strong> distributed across 50 progressive levels. From foundational basics to championship-level complexities, BeeSpell takes you on a complete learning journey.
          </p>
          
          <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>Why Choose BeeSpell?</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '2', color: 'var(--text-muted)', marginLeft: '25px', marginBottom: '20px' }}>
            <li>🎯 <strong>Structured Learning:</strong> 50 Levels from beginner to legend.</li>
            <li>🔊 <strong>Native Audio:</strong> Real-time pronunciation for every word.</li>
            <li>🧩 <strong>Smart Breakdown:</strong> Learn through syllables and exact meanings.</li>
            <li>📝 <strong>"Hide and Spell":</strong> Unique interactive engine to test memory.</li>
            <li>🚀 <strong>100% Free & Fast:</strong> No ads, no database, lightning fast.</li>
          </ul>
        </div>

        {/* Right Column: Developer Profile */}
        <div style={{ flex: '1 1 350px', background: 'var(--surface-hover)', border: '2px solid var(--surface-border)', borderRadius: '24px', padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '30px' }}>Developer Profile</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="https://github.com/boniyeamincse.png" 
              alt="Boni Yeamin" 
              style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '5px solid var(--primary)',
                marginBottom: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }} 
            />
          </div>

          <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '5px' }}>Boni Yeamin</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', fontWeight: 'bold' }}>
            Cybersecurity Engineer at AkijGroup
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="https://www.facebook.com/Boniyeaminlaju" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#1877F2', borderColor: '#1877F2', padding: '10px 20px', fontSize: '1rem' }}>
              Facebook
            </a>
            <a href="https://www.youtube.com/@boniyeaminbangla" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#FF0000', borderColor: '#FF0000', padding: '10px 20px', fontSize: '1rem' }}>
              YouTube
            </a>
            <a href="https://www.linkedin.com/in/boniyeamincse1" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#0A66C2', borderColor: '#0A66C2', padding: '10px 20px', fontSize: '1rem' }}>
              LinkedIn
            </a>
            <a href="https://github.com/boniyeamincse" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#333333', borderColor: '#333333', padding: '10px 20px', fontSize: '1rem' }}>
              GitHub
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
