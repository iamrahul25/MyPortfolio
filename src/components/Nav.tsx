import { useEffect, useState } from 'react'

declare global {
  interface Window {
    lucide?: {
      createIcons?: () => void
    }
  }
}

const LINKS = [
  { href: '#hero',     label: 'Home',     icon: 'home' },
  { href: '#about',    label: 'About',    icon: 'info' },
  { href: '#projects', label: 'Projects', icon: 'folder' },
  { href: '#resume',   label: 'Resume',   icon: 'file-text' },
  { href: '#skills',   label: 'Skills',   icon: 'code' },
  { href: '#contact',  label: 'Contact',  icon: 'mail' },
]

interface NavProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  isDark: boolean
  toggleTheme: () => void
}

export function Nav({ mobileMenuOpen, setMobileMenuOpen, isDark, toggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
  }, [mobileMenuOpen])

  useEffect(() => {
    // Convert all `[data-lucide]` placeholders into inline SVG icons.
    window.lucide?.createIcons?.()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      // Detect active section
      const sections = LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        {/* Brand */}
        <a href="#hero" className="nav__brand" onClick={closeMenu}>
          <div className="nav__brand-avatar">
            <img src="/static/profile-image.png" alt="Rahul Kumar" className="nav__brand-img" />
          </div>
          <span className="nav__brand-text">
            Rahul<span className="nav__brand-accent">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="nav__links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav__link ${activeSection === href.slice(1) ? 'nav__link--active' : ''}`}
                onClick={closeMenu}
              >
                {label}
                <span className="nav__link-underline" />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions: Theme Toggle + Hamburger */}
        <div className="nav__actions">
          {/* Theme Toggle */}
          <button
            type="button"
            className={`nav__theme-toggle ${isDark ? 'dark' : 'light'}`}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="nav__theme-track">
              <span className="nav__theme-thumb">
                {isDark ? (
                  /* Moon */
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  /* Sun */
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
              </span>
            </span>
          </button>

          <button
            type="button"
            className={`nav__toggle ${mobileMenuOpen ? 'open' : ''}`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i
              className="nav__toggle-icon nav__toggle-icon--menu"
              data-lucide="menu"
              aria-hidden="true"
            />
            <i
              className="nav__toggle-icon nav__toggle-icon--x"
              data-lucide="x"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div className="nav__backdrop" onClick={closeMenu} />
      )}

      {/* Mobile drawer */}
      <div className={`nav__drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="nav__drawer-profile">
          <img src="/static/profile-image.png" alt="Rahul Kumar" className="nav__drawer-img" />
          <div>
            <p className="nav__drawer-name">Rahul Kumar</p>
            <p className="nav__drawer-role">Full-Stack Developer</p>
          </div>
        </div>

        {/* Theme toggle inside drawer */}
        <div className="nav__drawer-theme">
          <span className="nav__drawer-theme-label">{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
          <button
            type="button"
            className={`nav__theme-toggle ${isDark ? 'dark' : 'light'}`}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="nav__theme-track">
              <span className="nav__theme-thumb">
                {isDark ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>
        <ul className="nav__drawer-links">
          {LINKS.map(({ href, label, icon }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav__drawer-link ${activeSection === href.slice(1) ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav__drawer-icon" aria-hidden="true">
                  <i data-lucide={icon} />
                </span>
                {label}
                <span className="nav__drawer-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        /* ── Nav container ─────────────────────────────── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.75rem;
          transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
        }

        .nav--scrolled {
          background: rgba(8, 11, 18, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(124, 58, 237, 0.15);
          box-shadow: 0 4px 32px rgba(0,0,0,0.4);
          padding: 0.65rem 1.75rem;
        }
        [data-theme="light"] .nav--scrolled {
          background: rgba(245, 246, 250, 0.88);
          border-bottom: 1px solid rgba(124, 58, 237, 0.12);
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
        }

        /* ── Brand ─────────────────────────────────────── */
        .nav__brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: var(--text);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav__brand:hover { opacity: 0.85; }

        .nav__brand-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          flex-shrink: 0;
          position: relative;
        }
        .nav__brand-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid var(--bg);
        }

        .nav__brand-text {
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .nav__brand-accent {
          color: var(--accent);
        }

        /* ── Desktop links ─────────────────────────────── */
        .nav__links {
          list-style: none;
          display: none;
          gap: 0.25rem;
        }
        @media (min-width: 768px) {
          .nav__links { display: flex; }
        }

        .nav__link {
          position: relative;
          display: inline-block;
          padding: 0.4rem 0.7rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .nav__link:hover {
          color: var(--text);
          background: rgba(255,255,255,0.05);
        }
        .nav__link--active {
          color: var(--accent2) !important;
          background: rgba(6,182,212,0.08);
        }
        .nav__link-underline {
          position: absolute;
          bottom: 2px; left: 50%; right: 50%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          border-radius: 2px;
          transition: left 0.25s ease, right 0.25s ease;
        }
        .nav__link:hover .nav__link-underline,
        .nav__link--active .nav__link-underline {
          left: 8px; right: 8px;
        }

        /* ── Hamburger container ───────────────────────── */
        .nav__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* ── Hamburger ─────────────────────────────────── */
        .nav__toggle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          color: var(--text);
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-sm);
          cursor: pointer;
          padding: 8px;
          transition: background 0.2s, border-color 0.2s;
        }
        @media (min-width: 768px) { .nav__toggle { display: none; } }
        .nav__toggle:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(124,58,237,0.3);
        }
        .nav__toggle span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        }
        .nav__toggle-icon {
          display: inline-flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          line-height: 0;
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 0.18s ease, transform 0.18s ease;
          position: absolute;
          inset: 0;
        }
        .nav__toggle-icon svg {
          width: 20px;
          height: 20px;
        }
        .nav__toggle {
          position: relative;
        }
        .nav__toggle-icon--menu { opacity: 1; transform: scale(1); }
        .nav__toggle.open .nav__toggle-icon--menu {
          opacity: 0;
          transform: scale(0.98);
        }
        .nav__toggle.open .nav__toggle-icon--x {
          opacity: 1;
          transform: scale(1);
        }
        .nav__toggle-icon--x {
          opacity: 0;
          transform: scale(0.98);
        }

        /* ── Backdrop ──────────────────────────────────── */
        .nav__backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 199;
        }

        /* ── Mobile drawer ─────────────────────────────── */
        .nav__drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(320px, 88vw);
          height: 100dvh;
          background: var(--bg-card);
          border-left: 1px solid rgba(124,58,237,0.15);
          z-index: 200;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.5);
        }
        .nav__drawer.open { transform: translateX(0); }

        .nav__drawer-profile {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-muted);
          margin-top: 1.5rem;
        }
        .nav__drawer-img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid transparent;
          background: linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
                      linear-gradient(135deg, var(--accent), var(--accent2)) border-box;
        }
        .nav__drawer-name {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text);
        }
        .nav__drawer-role {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .nav__drawer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .nav__drawer-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          position: relative;
        }
        .nav__drawer-link:hover,
        .nav__drawer-link.active {
          background: rgba(124,58,237,0.1);
          color: var(--text);
        }
        .nav__drawer-link.active { color: var(--accent2); }
        .nav__drawer-icon {
          width: 22px;
          flex-shrink: 0;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .nav__drawer-icon i {
          line-height: 0;
          display: inline-flex;
        }
        .nav__drawer-icon svg {
          width: 18px;
          height: 18px;
        }
        .nav__drawer-arrow {
          margin-left: auto;
          font-size: 0.85rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
          color: var(--accent2);
        }
        .nav__drawer-link:hover .nav__drawer-arrow,
        .nav__drawer-link.active .nav__drawer-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Drawer theme row ──────────────────────────── */
        .nav__drawer-theme {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-muted);
          background: rgba(124,58,237,0.04);
        }
        .nav__drawer-theme-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        /* ── Theme Toggle Pill ─────────────────────────── */
        .nav__theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
        }
        .nav__theme-track {
          display: flex;
          align-items: center;
          width: 52px;
          height: 28px;
          border-radius: 9999px;
          padding: 3px;
          position: relative;
          transition: background 0.35s ease, box-shadow 0.35s ease;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.25);
        }
        .nav__theme-toggle.dark .nav__theme-track {
          background: linear-gradient(135deg, #312e81, #1e3a55);
        }
        .nav__theme-toggle.light .nav__theme-track {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.10), 0 0 12px rgba(251,191,36,0.35);
        }
        .nav__theme-thumb {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,0.3);
          position: absolute;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease;
          color: #4a5568;
        }
        .nav__theme-toggle.dark .nav__theme-thumb {
          transform: translateX(0px);
          color: #7c3aed;
          background: #f0e6ff;
        }
        .nav__theme-toggle.light .nav__theme-thumb {
          transform: translateX(24px);
          color: #d97706;
          background: #fff;
        }
      `}</style>
    </>
  )
}
