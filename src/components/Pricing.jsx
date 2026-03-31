import React from 'react';
const Check = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const tiers = [
  { name: 'landing page', desc: 'A professional page with contact form and automatic emails. Quickly online.', price: '₹2,999', accent: 'emerald', features: ['1 page (landing page)', 'Contact form', 'Automatic emails', 'Mobile optimized'] },
  { name: 'standard', desc: 'The perfect start for professional demands. Ideal for established websites.', price: '₹5,999', accent: 'blue', features: ['3 pages', 'Contact form', 'Automatic emails', 'Mobile optimized'] },
];
export default function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="section-header-row reveal"><h2 className="section-title">Pricing.</h2><div className="divider"></div><p className="section-subtitle">Transparent costs. High quality approach.</p></div>
        <div className="pricing-grid reveal">
          {tiers.map(t => (
            <div key={t.name} className={`pricing-card ${t.accent}`}>
              <h3>{t.name}</h3>
              <p className="desc">{t.desc}</p>
              <div className="price-label">SINGLE PAYMENT</div>
              <div className="price">{t.price}</div>
              <div className="pricing-features">{t.features.map(f => <div key={f} className="pricing-feature"><Check /><span>{f}</span></div>)}</div>
              <a href={`https://wa.me/917339690198?text=${encodeURIComponent('Hi, I\'m interested in the ' + t.name + ' package!')}`} target="_blank" rel="noreferrer" className={`btn ${t.accent === 'emerald' ? 'btn-emerald' : 'btn-dark'}`} style={{ justifyContent: 'center' }}>Get Started →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
