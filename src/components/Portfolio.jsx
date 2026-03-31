import React from 'react';
const projects = [
  { id: 1, title: 'Law Firm Website', category: 'LEGAL', description: 'Professional online presence for a modern law firm, featuring practice areas, attorney profiles, and secure contact.', gradient: 'linear-gradient(135deg, #1a3a2a, #2d5a3d)' },
  { id: 2, title: 'SV Construction', category: 'CONSTRUCTION', description: 'Robust website for a construction company, showcasing completed projects and services with a professional edge.', gradient: 'linear-gradient(135deg, #3a2a1a, #5a4a2d)' },
];
export default function Portfolio() {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="card-elevated reveal">
          <div className="section-header-row">
            <h2 className="section-title">Portfolio.</h2>
            <div className="divider"></div>
            <p className="section-subtitle">Selected work. From local businesses to international platforms.</p>
          </div>
          <div className="project-grid">
            {projects.map(p => (
              <div key={p.id} className="project-card reveal">
                <div className="project-card-image" style={{ background: p.gradient }}>
                  <span className="tag">{p.category}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, position: 'absolute', bottom: 20, right: 20 }}>ECHO SITE</span>
                </div>
                <div className="project-card-body"><h3>{p.title}</h3><p>{p.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
