import { data } from '../data'

export function About() {
  const { about } = data
  return (
    <section id="about" className="about">
      <div className="about__grid">
        {/* Image side */}
        <div className="about__img-col">
          <div className="about__img-wrap">
            <img src="/static/profile-image.png" alt="Rahul Kumar" className="about__img" />
            <div className="about__img-overlay" />
            {/* Stats cards */}
            <div className="about__stat-card about__stat-card--1">
              <span className="about__stat-num">3+</span>
              <span className="about__stat-label">Years Coding</span>
            </div>
            <div className="about__stat-card about__stat-card--2">
              <span className="about__stat-num">6+</span>
              <span className="about__stat-label">Projects Shipped</span>
            </div>
          </div>
        </div>

        {/* Text side */}
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
          gap: 3rem;
          align-items: flex-start;
        }
        @media (min-width: 900px) {
          .about__grid {
            flex-direction: row;
            align-items: center;
            gap: 5rem;
          }
          .about__img-col { flex-shrink: 0; }
          .about__body { flex: 1; }
        }

        /* ── Image ──────────────── */
        .about__img-wrap {
          position: relative;
          width: 260px;
          height: 320px;
          margin: 0 auto;
        }
        @media (min-width: 900px) {
          .about__img-wrap { width: 300px; height: 370px; }
        }

        .about__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          border-radius: var(--radius-lg);
          position: relative;
          z-index: 1;
          border: 1.5px solid var(--border);
        }
        .about__img-overlay {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          background: linear-gradient(to bottom, transparent 50%, rgba(124,58,237,0.25));
          z-index: 2;
          pointer-events: none;
        }

        /* ── Floating stat cards ── */
        .about__stat-card {
          position: absolute;
          z-index: 3;
          background: rgba(14,17,23,0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: var(--radius-sm);
          padding: 0.6rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          box-shadow: var(--shadow-card);
          animation: float 6s ease-in-out infinite;
        }
        .about__stat-card--1 { bottom: 24px; left: -20px; animation-delay: -2s; }
        .about__stat-card--2 { top: 32px; right: -24px; animation-delay: -5s; }
        .about__stat-num {
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .about__stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          white-space: nowrap;
        }

        /* ── Paragraphs ─────────── */
        .about__paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          max-width: 48ch;
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
