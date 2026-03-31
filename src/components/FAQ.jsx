import React, { useState } from 'react';
const Chevron = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>;
const questions = [
  { q: 'Why Echo Site?', a: 'We combine modern design with high-performance development. Every website is hand-coded for speed, SEO, and conversion — no page builders, no templates.' },
  { q: 'How long does it take?', a: 'A landing page is typically delivered within 3-5 business days. Multi-page websites take 7-14 days depending on complexity.' },
  { q: 'How much does a website cost?', a: 'Our landing page package starts at ₹2,999 and our standard 3-page package at ₹5,999. Custom projects are quoted individually.' },
  { q: 'What technologies does Echo Site use?', a: 'We build with React, Next.js, Vite, and Tailwind CSS. Our sites are deployed on Vercel for maximum performance.' },
  { q: 'Are Echo Site websites SEO-optimized?', a: 'Absolutely. Every website includes on-page SEO, semantic HTML, meta tags, structured data, and fast loading times.' },
  { q: 'Do you offer in-person consultations?', a: 'Yes! We are based in Salem, Tamil Nadu and are happy to meet in person. We also work remotely across India.' },
  { q: 'Why not use a page builder like Wix or Squarespace?', a: 'Page builders are limited in performance, customization, and SEO. Our hand-coded websites load faster and rank higher.' },
];
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="faq"><div className="container"><div className="card-elevated reveal">
      <div className="section-header-row"><h2 className="section-title">FAQ.</h2><div className="divider"></div><p className="section-subtitle">Straight answers to your questions.</p></div>
      <h3 className="faq-subtitle">Good to know</h3>
      {questions.map((item, i) => (
        <div key={i} className="faq-item">
          <button className={`faq-question ${openIndex === i ? 'open' : ''}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>{item.q}<Chevron /></button>
          <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}><p>{item.a}</p></div>
        </div>
      ))}
      <div className="faq-info-grid">
        <div className="faq-info-card"><h4><span style={{ color: 'var(--emerald)' }}>◉</span> Global Reach</h4><p>Personal contact is irreplaceable. No anonymous call center — a direct contact person for your project.</p></div>
        <div className="faq-info-card dark"><h4><span>🔧</span> Custom project?</h4><p>For shops or complex software, we're happy to create a custom quote.</p><a href="https://wa.me/917339690198?text=Hi%2C%20I%20need%20a%20custom%20quote!" target="_blank" rel="noreferrer" className="link" style={{ color: 'white' }}>REQUEST QUOTE →</a></div>
      </div>
    </div></div></section>
  );
}
