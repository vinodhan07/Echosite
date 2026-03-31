import React from 'react';
const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
const Arrow = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

export default function Footer() {
  return (
    <>
      <section className="footer-cta-section"><div className="container"><div className="cta-banner reveal">
        <h2>Get in touch</h2>
        <p>Let's get started together. Send us a message and receive a response within 12 hours.</p>
        <div className="cta-buttons">
          <a href="https://wa.me/917339690198?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="btn btn-emerald" style={{ padding: '16px 32px', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em' }}>START PROJECT <Arrow /></a>
        </div>
      </div></div></section>
      <footer><div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">echosite</div>
            <div className="footer-brand-sub">Web Design & Development</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Our Location<br /><span style={{ color: 'rgba(255,255,255,0.7)' }}>Salem, Tamil Nadu, India</span></p>
            <div className="footer-social"><a href="#">LN</a><a href="#">IG</a><a href="#">TW</a></div>
          </div>
          <div className="footer-col"><h4>Navigate</h4><ul><li><button onClick={() => scrollTo('hero')}>Home</button></li><li><button onClick={() => scrollTo('portfolio')}>Portfolio</button></li><li><button onClick={() => scrollTo('pricing')}>Pricing</button></li><li><button onClick={() => scrollTo('faq')}>FAQ</button></li></ul></div>
          <div className="footer-col"><h4>Services</h4><ul><li><button onClick={() => scrollTo('services')}>Web Design</button></li><li><button onClick={() => scrollTo('services')}>Development</button></li><li><button onClick={() => scrollTo('services')}>SEO</button></li><li><button onClick={() => scrollTo('about')}>About</button></li></ul></div>
          <div className="footer-col"><h4>Contact</h4><ul><li><a href="mailto:sujanrofficial@gmail.com">sujanrofficial@gmail.com</a></li><li><a href="tel:+917339690198">+91 73396 90198</a></li><li><a href="https://wa.me/917339690198" target="_blank" rel="noreferrer">WhatsApp</a></li></ul></div>
        </div>
        <div className="footer-bottom">© 2025 Echo Site. All rights reserved. Crafted with precision in Salem, Tamil Nadu.</div>
      </div></footer>
    </>
  );
}
