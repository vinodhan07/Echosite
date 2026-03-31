import React from 'react';
const logos = ['React', 'Next.js', 'Vite', 'Tailwind', 'Vercel', 'Node.js', 'Figma', 'GitHub'];
export default function TechLogos() {
  return <div className="tech-logos reveal">{logos.map(l => <span key={l} className="tech-logo">{l}</span>)}</div>;
}
