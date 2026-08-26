export default function TermsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 15px', animation: 'fadeIn 0.5s ease-out' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary)', textShadow: '3px 3px 0px rgba(0,0,0,0.1)', marginBottom: '15px' }}>
          Terms of Service 📜
        </h1>
        <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', fontWeight: '600', maxWidth: '600px', margin: '0 auto' }}>
          The simple rules for using BeeSpell to keep learning fun and safe!
        </p>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '50px', 
        borderRadius: '40px', 
        border: '6px solid #cbd5e1', 
        boxShadow: '0 15px 0 #cbd5e1',
        color: 'var(--text)',
        lineHeight: '1.8'
      }}>
        
        <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '15px', fontWeight: '900' }}>1. Welcome to BeeSpell! 🐝</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontWeight: '500' }}>
          By using BeeSpell, you agree to these friendly terms. We built this app to help kids master spelling and have fun. Our motto is <strong>"Education will be free"</strong>, and we intend to keep it that way.
        </p>

        <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '15px', fontWeight: '900' }}>2. 100% Free & No Ads 🚀</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontWeight: '500' }}>
          BeeSpell is entirely free to use. We do not place hidden fees, we do not show pesky advertisements, and we do not sell anything inside the app. If you enjoy the app, you can optionally support the developer via the "Support My Work" donation link.
        </p>

        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '15px', fontWeight: '900' }}>3. Privacy & Tracking 🕵️‍♂️</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontWeight: '500' }}>
          We respect your privacy! All of your progress (like unlocked levels and words mastered) is saved <strong>locally on your own device</strong>. We do not use databases to track your personal information, nor do we sell your data to third parties.
        </p>

        <h2 style={{ fontSize: '2rem', color: 'hsl(150, 80%, 40%)', marginBottom: '15px', fontWeight: '900' }}>4. Appropriate Use 🎓</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontWeight: '500' }}>
          This is an educational platform designed for children, students, and parents. We expect everyone to use the platform for its intended purpose—learning! Please do not attempt to misuse the contact forms or disrupt the website.
        </p>

        <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '15px', fontWeight: '900' }}>5. Updates to Rules 🔄</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontWeight: '500' }}>
          We might update these terms if we add new, exciting features. But our core promise remains the same: safe, free, and fun education.
        </p>

        <div style={{ background: 'var(--surface-hover)', padding: '20px', borderRadius: '20px', border: '3px dashed var(--surface-border)', textAlign: 'center', margin: '40px -10px 0 -10px' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-muted)', margin: 0 }}>
            If you have any questions, feel free to drop us a message on our <a href="/contact" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Contact Page</a>!
          </p>
        </div>

      </div>
    </div>
  );
}
