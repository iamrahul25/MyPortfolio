import { useEffect } from 'react'

const LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#resume', label: 'Resume' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

interface NavProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Nav({ mobileMenuOpen, setMobileMenuOpen }: NavProps) {
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
  }, [mobileMenuOpen])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="nav">
      <a href="#hero" className="nav__brand" onClick={closeMenu}>
        Portfolio
      </a>
      <button
        type="button"
        className="nav__toggle"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className={mobileMenuOpen ? 'nav__toggle-icon open' : 'nav__toggle-icon'} />
        <span className={mobileMenuOpen ? 'nav__toggle-icon open' : 'nav__toggle-icon'} />
        <span className={mobileMenuOpen ? 'nav__toggle-icon open' : 'nav__toggle-icon'} />
      </button>
      <ul className={`nav__links ${mobileMenuOpen ? 'open' : ''}`}>
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href} onClick={closeMenu}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: rgba(13, 13, 15, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav__brand {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text);
        }
        .nav__brand:hover { color: var(--accent); }
        .nav__toggle {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        @media (min-width: 768px) { .nav__toggle { display: none; } }
        .nav__toggle-icon {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text);
          transition: transform 0.2s;
        }
        .nav__toggle-icon.open:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav__toggle-icon.open:nth-child(2) { opacity: 0; }
        .nav__toggle-icon.open:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .nav__links {
          list-style: none;
          display: flex;
          gap: 2rem;
          position: fixed;
          top: 57px;
          left: 0;
          right: 0;
          flex-direction: column;
          padding: 2rem;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.2s, opacity 0.2s;
        }
        .nav__links.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        @media (min-width: 768px) {
          .nav__links {
            position: static;
            flex-direction: row;
            padding: 0;
            background: none;
            border: none;
            transform: none;
            opacity: 1;
            pointer-events: auto;
          }
        }
        .nav__links a {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .nav__links a:hover { color: var(--accent); }
      `}</style>
    </nav>
  )
}
