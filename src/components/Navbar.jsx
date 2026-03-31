import React, { useState, useEffect } from 'react';
const MenuIcon = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8h18M3 16h18" /></svg>;
const CloseIcon = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>;
const navItems = [{ id: 'services', label: 'Services' }, { id: 'portfolio', label: 'Portfolio' }, { id: 'pricing', label: 'Pricing' }, { id: 'faq', label: 'FAQ' }, { id: 'about', label: 'About' }];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);
  const scrollTo = (id) => { setMenuOpen(false); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>echosite</div>
        <div className="nav-links">
          {navItems.map(item => <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>{item.label}</button>)}
        </div>
        <a href="https://wa.me/917339690198?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="btn btn-dark nav-cta nav-cta-desktop">Book a Call</a>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <CloseIcon /> : <MenuIcon />}</button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => <button key={item.id} className="mobile-menu-link" onClick={() => scrollTo(item.id)}>{item.label}</button>)}
        <a href="https://wa.me/917339690198?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="btn btn-dark" style={{ marginTop: 16 }}>Book a Call</a>
      </div>
    </>
  );
}
