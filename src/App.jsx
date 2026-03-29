import React, { useState, useEffect, useRef } from 'react';

const globalStyles = `
  :root {
    --bg: #FFFFFF;
    --bg-alt: #F8FAFC;
    --text: #0F172A;
    --text-muted: #64748B;
    --gold: #BF953F;
    --gold-light: #D4AF37;
    --gold-dark: #8A6D3B;
    --gold-gradient: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728);
    --border: rgba(15, 23, 42, 0.08);
    --border-gold: rgba(191, 149, 63, 0.2);
    --font-head: 'Cormorant Garamond', serif;
    --font-body: 'Satoshi', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-head);
    font-weight: 500;
    line-height: 1.1;
    color: var(--text);
  }

  a { color: inherit; text-decoration: none; cursor: pointer; transition: 0.3s; }
  
  ul { list-style: none; }

  /* Gilded Text Utility */
  .text-gold {
    background: var(--gold-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Buttons - Imperial Style */
  button, .btn {
    font-family: var(--font-body);
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .btn-primary {
    background: var(--text);
    color: var(--bg);
    padding: 14px 28px;
  }
  .btn-primary:hover {
    background: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px rgba(191, 149, 63, 0.4);
  }

  .btn-gold {
    background: var(--gold-gradient);
    color: #000;
    padding: 14px 28px;
    font-weight: 600;
  }
  .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px rgba(191, 149, 63, 0.6);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--text);
    padding: 13px 27px;
  }
  .btn-outline:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* Navigation - Ultra Minimal */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6%;
    z-index: 1000;
    background: transparent;
    transition: all 0.5s ease;
  }
  nav.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    height: 70px;
    border-bottom: 0.5px solid var(--border);
  }

  .nav-logo {
    font-family: var(--font-head);
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-text { color: var(--gold); }

  .nav-links {
    display: flex;
    gap: 40px;
  }
  .nav-links button {
    background: none; border: none; padding: 0; font-size: 0.85rem;
    color: var(--text); cursor: pointer; transition: 0.3s;
    letter-spacing: 0.15em; font-weight: 500;
  }
  .nav-links button:hover, .nav-links button.active {
    color: var(--gold);
  }
  
  .hamburger { display: none; background: none; border: none; color: var(--text); cursor: pointer; }

  @media (max-width: 850px) {
    .nav-links {
      position: fixed; top: 0; right: -100%; width: 100%; height: 100vh;
      background: var(--bg);
      flex-direction: column;
      justify-content: center;
      padding: 40px;
      transition: 0.5s ease;
      z-index: 999;
    }
    .nav-links.open { right: 0; }
    .nav-cta { display: none; }
    .hamburger { display: block; position: relative; z-index: 1001; }
  }

  /* Paper Noise */
  .paper-noise {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.008;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* Containers */
  .container { max-width: 1300px; margin: 0 auto; padding: 0 5%; }
  section { padding: 140px 0; border-bottom: 0.5px solid var(--border); }
  
  .section-header { margin-bottom: 80px; max-width: 800px; }
  .section-header .tag { 
    color: var(--gold); font-size: 0.85rem; font-weight: 600; 
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px; display: block;
  }
  .section-header h2 { font-size: 3.5rem; margin-bottom: 24px; font-style: italic; }
  .section-header p { color: var(--text-muted); font-size: 1.25rem; }

  /* Grid Systems */
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
  
  @media (max-width: 950px) { .grid-3 { grid-template-columns: 1fr 1fr; } .section-header h2 { font-size: 2.8rem; } }
  @media (max-width: 650px) { .grid-3, .grid-2 { grid-template-columns: 1fr; } }

  /* Cards - Ultra Minimal */
  .card {
    padding: 40px;
    border: 0.5px solid var(--border);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex; flex-direction: column;
    background: var(--bg);
  }
  .card:hover {
    border-color: var(--gold);
    box-shadow: 0 20px 60px -15px rgba(0,0,0,0.06);
  }

  /* Reveal Animations */
  .reveal {
    opacity: 0;
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
  }

  /* WhatsApp Floating Button - Gilded Style */
  .wa-float {
    position: fixed; bottom: 40px; right: 40px;
    width: 65px; height: 65px;
    background: var(--text);
    color: #FFF; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.4);
    z-index: 999;
    transition: 0.4s;
    cursor: pointer;
    border: 1px solid var(--gold);
  }
  .wa-float:hover {
    background: var(--gold);
    transform: scale(1.1);
  }
  .wa-float svg { color: var(--bg); }

  /* Footer */
  footer {
    padding: 100px 6% 40px;
    background: var(--bg-alt);
    border-top: 1px solid var(--border);
  }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 60px; margin-bottom: 80px;
  }
  .footer-col h4 { font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 32px; color: var(--gold); }
  .footer-col ul li { margin-bottom: 16px; }
  .footer-col a, .footer-col button { 
    color: var(--text-muted); background: none; border: none; font-size: 0.95rem; font-family: var(--font-body); cursor: pointer;
  }
  .footer-col a:hover, .footer-col button:hover { color: var(--gold); }
  .footer-bottom {
    padding-top: 40px; border-top: 0.5px solid var(--border); text-align: center;
    font-size: 0.8rem; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;
  }

  @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 600px) { .footer-top { grid-template-columns: 1fr; } }

  /* Specific Layouts */
  .hero-section {
    min-height: 100vh;
    display: flex; align-items: center;
    padding-top: 100px; padding-bottom: 100px;
    border-bottom: 1px solid var(--border);
  }
  .hero-content {
    max-width: 1000px;
  }

  .marquee { overflow: hidden; white-space: nowrap; padding: 24px 0; border-bottom: 0.5px solid var(--border); }
  .marquee-content { display: inline-block; animation: scroll-left 40s linear infinite; }
  .marquee-item { display: inline-flex; align-items: center; gap: 15px; font-size: 0.85rem; font-weight: 500; font-family: var(--font-body); letter-spacing: 0.25em; text-transform: uppercase; margin: 0 40px; color: var(--text-muted); }
  .marquee-item::after { content: '•'; color: var(--gold); margin-left: 40px; }
  @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Input fields - Luxury Style */
  input, textarea, select {
    width: 100%; padding: 18px 0;
    background: transparent; border: none; border-bottom: 1px solid var(--border);
    color: var(--text); font-family: var(--font-body); font-size: 1.1rem;
    transition: 0.3s;
  }
  input:focus, textarea:focus, select:focus {
    outline: none; border-bottom-color: var(--gold);
  }
  label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 8px; font-weight: 600; }
  .form-group { margin-bottom: 40px; }

  /* Project Image Placeholders */
  .proj-img {
    height: 450px; background: var(--bg-alt); width: 100%; border: 0.5px solid var(--border); overflow: hidden; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .proj-img::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.05), transparent); }

  /* Divider */
  .line-divider { height: 1px; width: 60px; background: var(--gold); margin: 32px 0; }
`;

// ========================
// REVEAL HOOK
// ========================
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ========================
// ICONS
// ========================
const SvgWa = () => <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const SvgArrow = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const SvgHam = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8h18M3 16h18"/></svg>;
const SvgX = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>;

// ========================
// SHARED COMPONENTS
// ========================
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hS = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', hS);
    return () => window.removeEventListener('scroll', hS);
  }, []);

  const navTo = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => navTo('home')}>
        E C H O <span className="logo-text">S I T E</span>
      </div>
      
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['home', 'services', 'portfolio', 'contact'].map(p => (
          <button key={p} className={page === p ? 'active' : ''} onClick={() => navTo(p)}>
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      <button className="btn btn-primary nav-cta" onClick={() => navTo('contact')}>Get a Quote</button>
      
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <SvgX /> : <SvgHam />}
      </button>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-col">
          <div className="nav-logo mb-1" style={{fontSize: '1rem', letterSpacing: '0.3em'}}>E C H O <span className="logo-text">S I T E</span></div>
          <p className="mb-4" style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Building the Web · Salem, Tamil Nadu, India</p>
          <div style={{display: 'flex', gap: '24px'}}>
            {['LN', 'IG', 'TW'].map(s => <a key={s} href="#" style={{fontSize: '0.8rem', letterSpacing: '0.2em', fontWeight: 600}}>{s}</a>)}
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><button onClick={() => setPage('home')}>Home</button></li>
            <li><button onClick={() => setPage('services')}>Services</button></li>
            <li><button onClick={() => setPage('portfolio')}>Portfolio</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Expertise</h4>
          <ul>
            <li><button onClick={() => setPage('services')}>Basic</button></li>
            <li><button onClick={() => setPage('services')}>Business</button></li>
            <li><button onClick={() => setPage('services')}>Advanced</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px'}}>sujanrofficial@gmail.com</p>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px'}}>+91 73396 90198</p>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Salem, TN, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 ECHO SITE. ALL RIGHTS RESERVED. DESIGNED WITH ROYAL PRECISION IN SALEM, TAMIL NADU.
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a href="https://wa.me/917339690198?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="wa-float">
      <SvgWa />
    </a>
  );
}

// ========================
// PAGES
// ========================

function Home({ setPage }) {
  useScrollReveal();
  return (
    <div className="page-home">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content reveal">
            <span style={{letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '32px'}}>Established in Salem, Tamil Nadu</span>
            <h1 style={{fontSize: 'clamp(3rem, 7vw, 6rem)', marginBottom: '40px', fontStyle: 'italic'}}>
              We Build Websites<br/>
              <span className="text-gold">That High-End Brands</span><br/>
              Deserve
            </h1>
            <div className="line-divider"></div>
            <p className="mb-4" style={{fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '700px', lineHeight: 1.4}}>
              Elite digital solutions for growing businesses. We transform your online presence into a professional powerhouse.
            </p>
            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '60px'}}>
              <button className="btn btn-gold" onClick={() => setPage('contact')}>Start Your Project</button>
              <button className="btn btn-outline" onClick={() => setPage('portfolio')}>The Portfolio <SvgArrow/></button>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-content">
          {[...Array(2)].map((_, j) => (
            <React.Fragment key={j}>
              {["Custom Design", "Imperial Speed", "Mobile First", "SEO Dominance", "Elite Analytics", "VIP Support"].map((item, i) => (
                <div className="marquee-item" key={i}>
                   {item}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <section className="container">
        <div className="section-header reveal">
          <span className="tag">Our Signature</span>
          <h2>Luxury Packages for <span className="text-gold">Every Vision</span></h2>
        </div>
        
        <div className="grid-3">
          {[
            {h: '⚡', t: 'Basic Presence', d: 'A single-page, high-performance web asset for elite specialists and freelancers.'},
            {h: '🚀', t: 'Business Core', d: 'Comprehensive multi-page architecture designed for established local enterprises.', f: true},
            {h: '🌐', t: 'Advanced Authority', d: 'Full-scale growth platform with SEO dominance and advanced digital integration.'}
          ].map((pkg, i) => (
            <div className={`card reveal ${pkg.f ? 'featured' : ''}`} key={i} style={{borderColor: pkg.f ? 'var(--gold)' : 'var(--border)'}}>
              <div style={{fontSize: '2rem', marginBottom: '24px'}}>{pkg.h}</div>
              <h3 className="mb-3" style={{fontSize: '1.8rem', fontStyle: 'italic'}}>{pkg.t}</h3>
              <p className="mb-4" style={{color: 'var(--text-muted)', flexGrow: 1}}>{pkg.d}</p>
              <button className="btn" style={{padding: '0', fontSize: '0.8rem', letterSpacing: '0.2em'}} onClick={() => setPage('services')}>VIEW DETAILS &rarr;</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{background: 'var(--bg-alt)'}}>
        <div className="container grid-2">
          <div className="reveal">
            <span className="tag">Legacy & Trust</span>
            <h2 style={{fontSize: '3rem', fontStyle: 'italic'}}>Your Business Deserves an <span className="text-gold">Elite Partner</span></h2>
            <div className="line-divider"></div>
            <p className="mb-4" style={{fontSize: '1.1rem', color: 'var(--text-muted)'}}>
              We are a collective of 5 master developers from Salem, TN. We don't just build sites; we architect digital legacies that convert curious visitors into loyal patrons.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '40px'}}>
              {[['50+', 'Projects Built'], ['3 Days', 'Average Launch'], ['100%', 'Mobile Perfect'], ['5', 'Elite Team']].map(s => (
                <div key={s[0]}>
                  <div style={{fontFamily: 'var(--font-head)', fontSize: '1.8rem', color: 'var(--gold)'}}>{s[0]}</div>
                  <div style={{fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase'}}>{s[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            {[
              ['01', 'Bespoke Craftsmanship', 'Every line of code is handwritten for your specific brand identity.'],
              ['02', 'Performance First', 'We prioritize speed above all, ensuring your customers never wait.'],
              ['03', 'Strategic Conversion', 'Our designs aren\'t just pretty - they are built to drive revenue.'],
              ['04', 'Native Support', 'Based in Salem, we speak your language and understand your market.']
            ].map(r => (
              <div key={r[0]} style={{padding: '30px 0', borderBottom: '0.5px solid var(--border)'}}>
                <div style={{display: 'flex', gap: '24px'}}>
                  <span style={{color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem'}}>{r[0]}</span>
                  <div>
                    <h4 style={{fontSize: '1.3rem', marginBottom: '8px', fontStyle: 'italic'}}>{r[1]}</h4>
                    <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{r[2]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-header reveal">
          <span className="tag">Mastery</span>
          <h2>The Minds Behind the <span className="text-gold">Craft</span></h2>
        </div>
        <div className="grid-3 reveal">
          {[
            {n: 'Sujan R', r: 'LEAD ARCHITECT', i: 'SR', p: '+91 73396 90198'},
            {n: 'Gowthamapriyan', r: 'CREATIVE DIRECTOR', i: 'GA', p: '+91 93456 47223'},
            {n: 'Vinodhan', r: 'FRONTEND MASTER', i: 'V', p: '+91 95666 97301'}
          ].map(m => (
            <div key={m.n} style={{textAlign: 'center', padding: '40px'}} className="card">
              <div style={{width: '90px', height: '90px', border: '1px solid var(--gold)', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: '1.5rem', color: 'var(--gold)'}}>{m.i}</div>
              <h4 style={{fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '8px'}}>{m.n}</h4>
              <p style={{fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '16px'}}>{m.r}</p>
              <p style={{fontSize: '0.85rem', color: 'var(--text)'}}>{m.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{background: 'var(--text)', color: 'white'}}>
        <div className="container reveal" style={{textAlign: 'center', padding: '100px 0'}}>
           <span className="tag" style={{color: 'var(--gold)'}}>Investment</span>
           <h2 style={{color: 'white', fontSize: '3rem', marginBottom: '24px', fontStyle: 'italic'}}>Ready to Command Your <span className="text-gold">Industry?</span></h2>
           <p className="mb-4" style={{color: 'rgba(255,255,255,0.6)', maxWidth: '600px', marginInline: 'auto'}}>Join 50+ visionary businesses that trust Echo Site for their digital dominance.</p>
           <button className="btn btn-gold" onClick={() => setPage('contact')}>Enquire Now</button>
        </div>
      </section>
    </div>
  );
}

function Services({ setPage }) {
  useScrollReveal();
  return (
    <div style={{paddingTop: '140px'}}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Portfolio of Services</span>
          <h1 style={{fontSize: '4rem', fontStyle: 'italic'}}>Elite Tiers of <span className="text-gold">Excellence</span></h1>
        </div>
        
        <div className="grid-3 mb-4">
          {[
            {t: 'Basic', p: 'Single Page', d: 'A high-impact landing asset for solo specialists.', l: ['1-Page Architecture', 'Bespoke Hero Unit', 'Contact Integration', 'Mobile Optimization']},
            {t: 'Professional', p: 'Business Tier', d: 'The industry standard for established local firms.', l: ['5-Page Framework', 'Lead Capture Engine', 'WhatsApp VIP Link', 'Location Integration', 'Basic SEO Mastery'], f: true},
            {t: 'Imperial', p: 'Market Leader', d: 'A dominant digital solution for scaling brands.', l: ['Unlimited Scope', 'Premium SEO Strategy', 'Google Analytics Pro', 'E-commerce Capable', 'Lead Automation']}
          ].map(s => (
            <div className="card reveal" style={{borderColor: s.f ? 'var(--gold)' : 'var(--border)'}} key={s.t}>
               <h3 style={{fontSize: '2rem', fontStyle: 'italic', marginBottom: '8px'}}>{s.t}</h3>
               <p style={{color: 'var(--gold)', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 600, marginBottom: '20px', textTransform: 'uppercase'}}>{s.p}</p>
               <p className="mb-4" style={{fontSize: '0.95rem', color: 'var(--text-muted)'}}>{s.d}</p>
               <ul style={{marginBottom: '40px', flexGrow: 1}}>
                 {s.l.map(item => <li key={item} style={{marginBottom: '14px', fontSize: '0.9rem', display: 'flex', gap: '12px'}}><span style={{color: 'var(--gold)'}}>⋄</span> {item}</li>)}
               </ul>
               <button className={s.f ? 'btn btn-gold' : 'btn btn-outline'} onClick={() => setPage('contact')}>Secure Quote</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Portfolio({ setPage }) {
  useScrollReveal();
  const projs = [
    {id: 1, t: 'IronPeak Fitness', c: 'FITNESS', d: 'Luxury gym digital architecture with lead reservation systems.'},
    {id: 2, t: 'Spice Route Bistro', c: 'HOSPITALITY', d: 'Fine-dining experience with interactive menu and reservation logic.'},
    {id: 3, t: 'NovaTech Elite', c: 'TECH', d: 'High-conversion SaaS landing page for venture-backed enterprise.'}
  ];
  return (
    <div style={{paddingTop: '140px'}}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Gallery</span>
          <h1 style={{fontSize: '4rem', fontStyle: 'italic'}}>Works of <span className="text-gold">Authority</span></h1>
        </div>
        <div className="grid-2 reveal">
          {projs.map(p => (
            <div key={p.id} className="reveal">
              <div className="proj-img">
                <span style={{letterSpacing: '0.3em', fontWeight: 600, color: 'var(--gold)', fontSize: '0.7rem'}}>{p.c}</span>
              </div>
              <div style={{padding: '32px 0'}}>
                <h3 style={{fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '12px'}}>{p.t}</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '1rem'}}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact({ setPage }) {
  useScrollReveal();
  return (
    <div style={{paddingTop: '140px', paddingBottom: '100px'}}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Enquiries</span>
          <h1 style={{fontSize: '4rem', fontStyle: 'italic'}}>Begin Your <span className="text-gold">Ascent</span></h1>
        </div>
        <div className="grid-2 reveal">
          <form style={{padding: '40px', border: '0.5px solid var(--border)'}}>
             <div className="form-group">
               <label>NAME</label>
               <input type="text" placeholder="Your Full Name" />
             </div>
             <div className="form-group">
               <label>EMAIL ADDRESS</label>
               <input type="email" placeholder="professional@email.com" />
             </div>
             <div className="form-group">
               <label>PROJECT BRIEF</label>
               <textarea rows="4" placeholder="Describe your digital vision..."></textarea>
             </div>
             <button className="btn btn-gold" style={{width: '100%', marginTop: '20px'}}>Transmit Enquiry</button>
          </form>
          <div style={{padding: '40px'}}>
            <h3 style={{fontSize: '2rem', fontStyle: 'italic', marginBottom: '32px'}}>Direct Access</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
              <div>
                <label>WHATSAPP / VOICE</label>
                <a href="tel:+917339690198" style={{fontSize: '1.5rem', fontWeight: 500}}>+91 73396 90198</a>
              </div>
              <div>
                <label>ELECTRONIC MAIL</label>
                <a href="mailto:sujanrofficial@gmail.com" style={{fontSize: '1.5rem', fontWeight: 500}}>sujanrofficial@gmail.com</a>
              </div>
              <div>
                <label>LOCATION</label>
                <p style={{fontSize: '1.5rem', fontWeight: 500}}>Salem, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================
// APP ROOT
// ========================
export default function App() {
  const [page, setPageState] = useState('home');

  const setPage = (p) => {
    setPageState(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-trigger reveal after render
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.remove('active'));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="paper-noise" />
      <Nav page={page} setPage={setPage} />
      <main className="page-wrapper">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'services' && <Services setPage={setPage} />}
        {page === 'portfolio' && <Portfolio setPage={setPage} />}
        {page === 'contact' && <Contact setPage={setPage} />}
      </main>
      <Footer setPage={setPage} />
      <WhatsAppButton />
    </>
  );
}
