import { data } from '../data'

export function About() {
  const { about } = data
  return (
    <section id="about" className="about">
      <div className="about__grid">
        <div className="about__body">
          <div className="section-header">
            <div className="section-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
              About Me
            </div>
            <h2 className="section-title">Crafting digital <span>experiences</span></h2>
          </div>

          <div className="about__paragraphs">
            {about.aboutMe.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="about__highlights">
            {[
              { icon: '🎯', text: 'Focus on clean, maintainable code' },
              { icon: '🚀', text: 'Ship fast, iterate faster' },
              { icon: '🤝', text: 'Open to collaboration & opportunities' },
            ].map(({ icon, text }) => (
              <div key={text} className="about__highlight">
                <span className="about__highlight-icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about__grid {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .about__body {
          width: 100%;
          max-width: 100%;
        }

        /* ── Paragraphs ─────────── */
        .about__paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          max-width: 72ch;
        }
        .about__paragraphs p {
          color: var(--text-muted);
          line-height: 1.75;
          font-size: 1rem;
        }

        /* ── Highlights ─────────── */
        .about__highlights {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        @media (min-width: 768px) {
          .about__highlights {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.85rem;
          }
        }
        .about__highlight {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-muted);
          background: rgba(255,255,255,0.02);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .about__highlight:hover {
          background: rgba(124,58,237,0.07);
          border-color: rgba(124,58,237,0.2);
          color: var(--text);
        }
        .about__highlight-icon {
          font-size: 1rem;
        }
      `}</style>
    </section>
  )
}
