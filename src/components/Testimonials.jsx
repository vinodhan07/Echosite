import React from 'react';
const Star = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
export default function Testimonials() {
  return (
    <section id="testimonials"><div className="container">
      <h2 className="reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.03em' }}>What Clients Say</h2>
      <div className="testimonial-card reveal">
        <div className="stars">{[...Array(5)].map((_, i) => <span key={i} className="star"><Star /></span>)}</div>
        <p className="testimonial-quote">"They built a fantastic website for our construction company. It looks highly professional, works perfectly on mobile, and the entire process was smooth. Highly recommend their services for anyone needing a robust online presence!"</p>
        <div className="testimonial-author">
          <div className="testimonial-avatar">S</div>
          <div style={{ textAlign: 'left' }}><div className="testimonial-name">Suresh Kumar</div><div className="testimonial-role">Construction Company Owner</div></div>
        </div>
      </div>
    </div></section>
  );
}
