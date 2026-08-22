export default function AboutPage() {
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div className="glass-panel" style={{ padding: '50px 40px', textAlign: 'center' }}>
        <h1 className="text-gradient-primary" style={{ fontSize: '3rem', marginBottom: '20px' }}>About Us</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}>
          Welcome to <strong>BeeSpell Dictionary</strong>! This platform is designed to make spelling bee preparation fun, progressive, and highly interactive for students of all ages.
        </p>

        <div style={{ background: 'var(--surface-hover)', border: '2px solid var(--surface-border)', borderRadius: '24px', padding: '40px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '20px' }}>Developer Profile</h2>
          
          <img 
            src="https://github.com/boniyeamincse.png" 
            alt="Boni Yeamin" 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '4px solid var(--primary)',
              marginBottom: '20px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }} 
          />

          <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '5px' }}>Boni Yeamin</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '20px', fontWeight: 'bold' }}>
            Cybersecurity Engineer at AkijGroup
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
            <a href="https://www.facebook.com/Boniyeaminlaju" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#1877F2', borderColor: '#1877F2', boxShadow: '0 4px 15px rgba(24, 119, 242, 0.3)' }}>
              Facebook
            </a>
            <a href="https://www.youtube.com/@boniyeaminbangla" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#FF0000', borderColor: '#FF0000', boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)' }}>
              YouTube
            </a>
            <a href="https://www.linkedin.com/in/boniyeamincse1" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#0A66C2', borderColor: '#0A66C2', boxShadow: '0 4px 15px rgba(10, 102, 194, 0.3)' }}>
              LinkedIn
            </a>
            <a href="https://github.com/boniyeamincse" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#333333', borderColor: '#333333', boxShadow: '0 4px 15px rgba(51, 51, 51, 0.3)' }}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
