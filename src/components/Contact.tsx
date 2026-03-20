import { data } from '../data'

export function Contact() {
  const { contact, socialMedia } = data

  const contactItems = [
    {
      label: 'Email',
      value: socialMedia.email || 'iamrahulkumar25@gmail.com',
      href: `mailto:${socialMedia.email || 'iamrahulkumar25@gmail.com'}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      color: 'violet',
    },
    {
      label: 'GitHub',
      value: 'iamrahul25',
      href: socialMedia.github,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      color: 'slate',
    },
    {
      label: 'LinkedIn',
      value: 'iamrahul25',
      href: socialMedia.linkedin,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'blue',
    },
  ]

  return (
    <section id="contact" className="contact">
      <div className="section-header">
        <div className="section-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact
        </div>
        <h2 className="section-title">Let's <span>Connect</span></h2>
      </div>

      <div className="contact__layout">
        {/* Left: CTA */}
        <div className="contact__cta">
          <p className="contact__text">{contact.message}</p>
          <a href={`mailto:${socialMedia.email || 'iamrahulkumar25@gmail.com'}`} className="contact__cta-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Send a message
          </a>
        </div>

        {/* Right: Link cards */}
        <div className="contact__cards">
          {contactItems.map(({ label, value, href, icon, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className={`contact__card contact__card--${color}`}
            >
              <span className="contact__card-icon">{icon}</span>
              <span className="contact__card-info">
                <span className="contact__card-label">{label}</span>
                <span className="contact__card-value">@{value}</span>
              </span>
              <svg className="contact__card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <p>Built with React · TypeScript · Vite · 💜</p>
        <p>© 2026 Rahul Kumar</p>
      </div>

      <style>{`
        .contact__layout {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          max-width: 700px;
        }
        @media (min-width: 768px) {
          .contact__layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 4rem;
          }
          .contact__cta { max-width: 260px; }
        }

        /* ── CTA left ───────────── */
        .contact__text {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          max-width: 36ch;
          line-height: 1.75;
          font-size: 0.95rem;
        }
        .contact__cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.3rem;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, var(--accent), #5b21b6);
          color: #fff;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px var(--accent-glow);
        }
        .contact__cta-btn:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px var(--accent-glow);
          color: #fff;
        }

        /* ── Cards right ────────── */
        .contact__cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }
        .contact__card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-muted);
          background: var(--bg-card);
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .contact__card:hover {
          transform: translateX(4px);
        }

        .contact__card--violet:hover {
          border-color: rgba(124,58,237,0.4);
          background: rgba(124,58,237,0.07);
          box-shadow: 0 4px 20px rgba(124,58,237,0.1);
        }
        .contact__card--slate:hover {
          border-color: rgba(148,163,184,0.3);
          background: rgba(148,163,184,0.05);
        }
        .contact__card--blue:hover {
          border-color: rgba(59,130,246,0.35);
          background: rgba(59,130,246,0.07);
          box-shadow: 0 4px 20px rgba(59,130,246,0.1);
        }

        .contact__card-icon {
          width: 40px; height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact__card--violet .contact__card-icon { color: #c4b5fd; background: rgba(124,58,237,0.12); }
        .contact__card--slate  .contact__card-icon { color: #cbd5e1; background: rgba(148,163,184,0.08); }
        .contact__card--blue   .contact__card-icon { color: #93c5fd; background: rgba(59,130,246,0.1); }

        /* Light mode: make icon glyphs dark enough for contrast */
        :root[data-theme="light"] .contact__card--violet .contact__card-icon {
          color: var(--accent);
          background: rgba(112,42,225,0.12);
        }
        :root[data-theme="light"] .contact__card--slate .contact__card-icon {
          color: var(--text-muted);
          background: rgba(89,92,94,0.10);
        }
        :root[data-theme="light"] .contact__card--blue .contact__card-icon {
          color: var(--accent2);
          background: rgba(0,98,140,0.12);
        }

        .contact__card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .contact__card-label {
          font-size: 0.7rem;
          font-family: var(--font-mono);
          letter-spacing: 0.06em;
          color: var(--text-dim);
          text-transform: uppercase;
        }
        .contact__card-value {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text);
        }
        .contact__card-arrow {
          color: var(--text-dim);
          flex-shrink: 0;
          transition: transform 0.2s, color 0.2s;
        }
        .contact__card:hover .contact__card-arrow {
          transform: translateX(3px);
          color: var(--text-muted);
        }

        /* ── Footer ─────────────── */
        .contact__footer {
          margin-top: 5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-muted);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          color: var(--text-dim);
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }
        @media (min-width: 640px) {
          .contact__footer {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  )
}
