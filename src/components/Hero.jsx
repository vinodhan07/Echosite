import React from 'react';
export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner reveal">
        <h1>We build websites that{' '}<span className="hero-underline">grow your business<svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M2 8.5C52 2.5 102 2 152 6.5C202 11 252 5 298 3.5" stroke="#10b981" strokeWidth="4" strokeLinecap="round" /></svg></span></h1>
        <p>Premium web design, development, and SEO optimization. We deliver stunning, high-performing websites tailored to scale your brand.</p>
        <a href="https://wa.me/917339690198?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="btn btn-dark" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" /></svg>
          Book a Call
        </a>
      </div>
    </section>
  );
}
