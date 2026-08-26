"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success');

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '900px', margin: '100px auto', padding: '40px 15px', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--success)', marginBottom: '15px' }}>
          Message Sent!
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '40px' }}>
          Thank you for reaching out. We will get back to you soon!
        </p>
        <a href="/" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem' }}>
          Back to Home 🏠
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 15px', animation: 'fadeIn 0.5s ease-out' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary)', textShadow: '3px 3px 0px rgba(0,0,0,0.1)', marginBottom: '25px' }}>
          Get in Touch! 📬
        </h1>
        
        <p style={{ 
          fontSize: '1.6rem', 
          color: 'var(--secondary)', 
          fontWeight: '900', 
          maxWidth: '600px', 
          margin: '0 auto', 
          background: 'var(--surface-hover)', 
          padding: '20px 30px', 
          borderRadius: '40px', 
          border: '4px dashed var(--secondary)' 
        }}>
          "Education will be free" 🌍
        </p>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '600', maxWidth: '600px', margin: '25px auto 0' }}>
          Have an idea for a new feature? Want to report a bug? Or just want to say hi? Send us a message directly!
        </p>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '50px', 
        borderRadius: '40px', 
        border: '6px solid #cbd5e1', 
        boxShadow: '0 15px 0 #cbd5e1',
      }}>
        {/* Using FormSubmit for direct email sending without an email client */}
        <form 
          action="https://formsubmit.co/boniyeamin.cse@gmail.com" 
          method="POST"
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        >
          {/* Honeypot to prevent spam */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          
          {/* Optional: Disable Captcha */}
          <input type="hidden" name="_captcha" value="false" />
          
          {/* Optional: Redirect back to this page with a success message (you will need to update the domain when hosted) */}
          <input type="hidden" name="_next" value="https://beespell.vercel.app/contact?success=true" />
          
          <div>
            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text)' }}>Your Name 🦸‍♂️</label>
            <input 
              type="text" 
              name="name"
              required 
              placeholder="e.g. Captain Spelling"
              style={{ width: '100%', padding: '15px 20px', fontSize: '1.1rem', borderRadius: '20px', border: '3px solid var(--surface-border)', outline: 'none', transition: 'all 0.2s', fontWeight: '600' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text)' }}>Your Email 📧</label>
            <input 
              type="email" 
              name="email"
              required 
              placeholder="Where can we reply?"
              style={{ width: '100%', padding: '15px 20px', fontSize: '1.1rem', borderRadius: '20px', border: '3px solid var(--surface-border)', outline: 'none', transition: 'all 0.2s', fontWeight: '600' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text)' }}>Topic 📌</label>
            <select 
              name="_subject"
              required
              style={{ width: '100%', padding: '15px 20px', fontSize: '1.1rem', borderRadius: '20px', border: '3px solid var(--surface-border)', outline: 'none', fontWeight: '600', backgroundColor: 'white', cursor: 'pointer' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
            >
              <option value="💡 Feature Suggestion (BeeSpell)">💡 Feature Suggestion (Add a feature)</option>
              <option value="🔧 Improvement / Fix (BeeSpell)">🔧 Improvement / Fix</option>
              <option value="💌 General Feedback (BeeSpell)">💌 General Feedback</option>
              <option value="❓ Other (BeeSpell)">❓ Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text)' }}>Your Message ✍️</label>
            <textarea 
              name="message"
              required
              placeholder="Tell us your awesome ideas..."
              rows={5}
              style={{ width: '100%', padding: '20px', fontSize: '1.1rem', borderRadius: '20px', border: '3px solid var(--surface-border)', outline: 'none', transition: 'all 0.2s', fontWeight: '600', resize: 'vertical' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              marginTop: '10px',
              padding: '20px',
              fontSize: '1.4rem',
              borderRadius: '40px',
              border: '4px solid var(--primary)',
              boxShadow: '0 10px 0 var(--primary-hover)',
              width: '100%'
            }}
          >
            Send Message 🚀
          </button>
          
        </form>
      </div>

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
