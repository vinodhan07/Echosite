import React, { useEffect, useRef } from 'react';
const teamMembers = [
  { name: 'Sujan R', role: 'Lead Architect', phone: '+91 73396 90198', photo: '/member-sujan.png', badge: 'Founder & Lead Dev' },
  { name: 'Gowthamapriyan', role: 'Creative Director', phone: '+91 93456 47223', photo: '/member-gowtham.png', badge: 'Design & Strategy' },
  { name: 'Vinodhan', role: 'Frontend Master', phone: '+91 95666 97301', photo: '/member-vinodhan.png', badge: 'Frontend Engineer' },
];

export default function About() {
  const teamRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    teamRef.current?.querySelectorAll('.team-card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about"><div className="container"><div className="card-elevated reveal">
      <div className="section-header-row"><h2 className="section-title">About.</h2><div className="divider"></div><p className="section-subtitle">The team behind Echo Site.</p></div>
      <div className="about-intro">
        <div className="about-photo-card">
          <img src="/member-sujan.png" alt="Sujan R" />
          <div className="about-photo-overlay">
            <div className="badge"><span className="dot"></span>Founder & Lead Developer</div>
            <h3>Sujan R</h3>
            <div className="subtitle">20 years old · Salem, India</div>
          </div>
        </div>
        <div className="about-content-right">
          <h3>Three minds, clear vision.</h3>
          <p>We're the team behind Echo Site — no big agency, no unnecessary meetings, no wasted hours. As young developers with innovative thinking, we work efficiently, with quality, and fast.</p>
          <p>We manage and execute everything ourselves to deliver the best result. No 500 hours of work for things that simply need to work. We're the best partners you'll find when it comes to excellence.</p>
          <div className="about-stats">
            <div className="about-stat"><strong>100%</strong><span>Satisfied Clients</span></div>
            <div className="about-stat"><strong>2025</strong><span>Agency Founded</span></div>
          </div>
          <div className="about-tags">
            <span className="about-tag">Web Development</span>
            <span className="about-tag">UI/UX Design</span>
            <span className="about-tag">SEO</span>
            <span className="about-tag">Automation</span>
          </div>
        </div>
      </div>
      <div className="team-section" ref={teamRef}>
        <h3>Meet the Team</h3>
        <div className="team-grid">
          {teamMembers.map(m => (
            <div key={m.name} className="team-card">
              <div className="team-card-inner">
                <div className="team-photo">
                  <img src={m.photo} alt={m.name} />
                  <div className="team-photo-overlay"><div className="badge"><span className="dot"></span>{m.badge}</div></div>
                </div>
                <div className="team-info">
                  <h4>{m.name}</h4>
                  <div className="role">{m.role}</div>
                  <div className="phone">{m.phone}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></div></section>
  );
}
