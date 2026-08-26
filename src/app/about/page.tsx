import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 15px', animation: 'fadeIn 0.5s ease-out' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary)', textShadow: '3px 3px 0px rgba(0,0,0,0.1)', marginBottom: '15px' }}>
          About BeeSpell 🐝
        </h1>
        <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', fontWeight: '600', maxWidth: '600px', margin: '0 auto' }}>
          The most fun, interactive, and colorful way to master your spelling vocabulary!
        </p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'stretch' }}>
        
        {/* Left Column: Mission & Details */}
        <div style={{ 
          flex: '1 1 500px', 
          background: 'white', 
          padding: '40px', 
          borderRadius: '30px', 
          border: '5px solid var(--primary)', 
          boxShadow: '0 12px 0 var(--primary-hover)',
          textAlign: 'left' 
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text)', marginBottom: '20px' }}>Our Mission 🚀</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text)', fontWeight: '500' }}>
            BeeSpell was designed to make spelling bee preparation fun, progressive, and highly interactive for students of all ages. 
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', color: 'var(--text)', fontWeight: '500' }}>
            Our carefully structured curriculum features over <strong>2,500+ curated vocabulary words</strong> and <strong>500+ Tongue Twisters</strong>. From foundational basics to championship-level complexities, BeeSpell takes you on a complete learning journey!
          </p>
          
          <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '20px' }}>Why Choose BeeSpell?</h3>
          <ul style={{ fontSize: '1.15rem', lineHeight: '2', color: 'var(--text)', marginLeft: '10px', listStyle: 'none', padding: 0, fontWeight: '600' }}>
            <li style={{ marginBottom: '10px' }}>🏆 <span style={{ color: 'var(--primary)' }}>Structured Learning:</span> Dozens of levels from beginner to legend.</li>
            <li style={{ marginBottom: '10px' }}>🔊 <span style={{ color: 'var(--primary)' }}>Native Audio:</span> Real-time pronunciation for every word & twister.</li>
            <li style={{ marginBottom: '10px' }}>🧩 <span style={{ color: 'var(--primary)' }}>Smart Breakdown:</span> Learn through syllables and exact meanings.</li>
            <li style={{ marginBottom: '10px' }}>👅 <span style={{ color: 'var(--primary)' }}>Tongue Twisters:</span> Playful practice to train your speaking speed!</li>
            <li style={{ marginBottom: '10px' }}>🚀 <span style={{ color: 'var(--primary)' }}>100% Free:</span> No ads, no tracking, just pure learning!</li>
          </ul>
        </div>

        {/* Right Column: Developer Profile */}
        <div style={{ 
          flex: '1 1 350px', 
          background: 'var(--surface-hover)', 
          border: '5px solid var(--accent)', 
          borderRadius: '30px', 
          padding: '40px', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          boxShadow: '0 12px 0 hsl(270, 70%, 45%)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent)', marginBottom: '25px' }}>Meet the Dev! 👨‍💻</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="https://github.com/boniyeamincse.png" 
              alt="Boni Yeamin" 
              style={{ 
                width: '160px', 
                height: '160px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '6px solid white',
                marginBottom: '20px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }} 
            />
          </div>

          <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text)', marginBottom: '5px' }}>Boni Yeamin</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', fontWeight: '700' }}>
            Cybersecurity Engineer at AkijGroup
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
            <a href="https://www.facebook.com/Boniyeaminlaju" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#1877F2', color: 'white', padding: '10px 20px', fontSize: '1.1rem', borderRadius: '30px', borderBottom: '4px solid #1059b5' }}>
              Facebook
            </a>
            <a href="https://www.youtube.com/@boniyeaminbangla" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#FF0000', color: 'white', padding: '10px 20px', fontSize: '1.1rem', borderRadius: '30px', borderBottom: '4px solid #cc0000' }}>
              YouTube
            </a>
            <a href="https://www.linkedin.com/in/boniyeamincse1" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#0A66C2', color: 'white', padding: '10px 20px', fontSize: '1.1rem', borderRadius: '30px', borderBottom: '4px solid #084c91' }}>
              LinkedIn
            </a>
            <a href="https://github.com/boniyeamincse" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#333333', color: 'white', padding: '10px 20px', fontSize: '1.1rem', borderRadius: '30px', borderBottom: '4px solid #1a1a1a' }}>
              GitHub
            </a>
          </div>
          
          <div style={{ borderTop: '3px dashed var(--surface-border)', paddingTop: '20px' }}>
             <a href="https://buymeacoffee.com/boniyeamin" target="_blank" rel="noopener noreferrer" className="donation-btn" style={{ fontSize: '1.2rem', width: '100%', justifyContent: 'center' }}>
               🍯 Support My Work
             </a>
          </div>
        </div>

      </div>
    </div>
  );
}
