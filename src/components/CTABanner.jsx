import React from 'react';
const Arrow = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
const Phone = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>;
export default function CTABanner() {
  return (
    <section><div className="container"><div className="cta-banner reveal">
      <h2>Ready for your project?</h2>
      <p>Let's create something extraordinary together. We look forward to hearing from you.</p>
      <div className="cta-buttons">
        <a href="https://wa.me/917339690198?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="btn btn-white" style={{ padding: '14px 28px' }}>Book a Call <Arrow /></a>
        <a href="tel:+917339690198" className="btn btn-icon" style={{ background: '#262626', color: 'white', border: '1px solid #404040' }}><Phone /></a>
      </div>
    </div></div></section>
  );
}
