import React from 'react';
const cells = [
  { icon: '📈', title: 'SEO Optimized', desc: 'Ready to be found on Google.' },
  { icon: '📊', title: 'Analytics Ready', desc: 'Track user statistics, marketing cookies and more.', big: '100', bigLabel: 'PageSpeed' },
  { icon: '📱', title: 'Fully Responsive', desc: 'Optimized for desktop, tablet, mobile and everything in between.' },
  { icon: '🎯', title: 'ROI-First', desc: 'So you get the most out of your ad budget.', span: true },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Because nobody likes waiting.' },
];
const tags = ['Web Design', 'Next.js', 'React', 'SEO', 'Tailwind', 'Performance', 'UI/UX', 'Responsive'];
export default function ResultsBento() {
  return (
    <section id="results"><div className="container"><div className="card-elevated reveal">
      <div className="section-header-row"><h2 className="section-title">Results.</h2><div className="divider"></div><p className="section-subtitle">Websites optimized for real results.</p></div>
      <div className="bento-grid">
        {cells.map((c, i) => <div key={i} className={`bento-cell ${c.span ? 'span-2' : ''}`}><div className="bento-icon">{c.icon}</div>{c.big && <div className="bento-big">{c.big}</div>}<h4>{c.title}</h4><p>{c.desc}</p></div>)}
        <div className="bento-cell"><div className="bento-icon">🏷️</div><h4>Our Stack</h4><div className="bento-tags">{tags.map(t => <span key={t} className="bento-tag">{t}</span>)}</div></div>
      </div>
    </div></div></section>
  );
}
