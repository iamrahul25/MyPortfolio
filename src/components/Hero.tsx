import { data } from '../data'
import { StarField } from './StarField'

export function Hero() {
  const { hero, about } = data

  return (
    <section id="hero" className="hero">
      {/* Shooting star canvas background */}
      <StarField />
      {/* Radial vignette overlay to keep content readable */}
      <div className="hero__vignette" />

      <div className="hero__inner">
        {/* Profile image column */}
        <div className="hero__image-col">
          <div className="hero__avatar-wrap">
            <div className="hero__avatar-ripples" aria-hidden>
              <span className="hero__avatar-ripple" />
              <span className="hero__avatar-ripple hero__avatar-ripple--2" />
              <span className="hero__avatar-ripple hero__avatar-ripple--3" />
            </div>
            <div className="hero__avatar-ring" />
            <img
              src="/static/profile-image.png"
              alt="Rahul Kumar"
              className="hero__avatar"
            />
          </div>
        </div>

        {/* Text column */}
        <div className="hero__content">
          <div className="hero__greeting animate-in">
            <span className="hero__greeting-line" />
            {hero.greeting}
          </div>

          <h1 className="hero__name animate-in animate-in-delay-1">
            {about.name}
          </h1>

          <p className="hero__tagline animate-in animate-in-delay-2">
            {hero.tagline}
          </p>

          <div className="hero__tech-row animate-in animate-in-delay-3">
            {['React', 'Node.js', 'TypeScript', 'MongoDB'].map(t => (
              <span key={t} className="hero__tech-pill">{t}</span>
            ))}
          </div>

          <div className="hero__actions animate-in animate-in-delay-4">
            <a href={hero.primaryCtaHref} className="hero__btn hero__btn--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              {hero.primaryCta}
            </a>
            <a href={hero.secondaryCtaHref} className="hero__btn hero__btn--outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              {hero.secondaryCta}
            </a>
          </div>

          {/* Social links */}
          <div className="hero__socials animate-in animate-in-delay-5">
            <a href="https://github.com/iamrahul25" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/iamrahul25/" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-dot" />
        <span>Scroll down</span>
      </div>

      <style>{`
        .hero {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding-top: 5rem;
          overflow: hidden;
        }

        /* ── Vignette over canvas ── */
        .hero__vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(8,11,18,0.85) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(8,11,18,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 30% 50% at 0% 50%, rgba(8,11,18,0.6) 0%, transparent 60%),
            radial-gradient(ellipse 30% 50% at 100% 50%, rgba(8,11,18,0.6) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Layout ────────────── */
        .hero__inner {
          display: flex;
          flex-direction: column-reverse;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .hero__inner {
            flex-direction: row;
            justify-content: space-between;
            gap: 4rem;
          }
        }

        /* ── Avatar ────────────── */
        .hero__image-col {
          display: flex;
          justify-content: center;
          flex-shrink: 0;
        }
        .hero__avatar-wrap {
          position: relative;
          width: 160px;
          height: 160px;
        }
        @media (min-width: 768px) {
          .hero__avatar-wrap { width: 200px; height: 200px; }
        }

        .hero__avatar-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(var(--bg), var(--bg)) padding-box,
                      linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3)) border-box;
          animation: spin-slow 8s linear infinite;
        }

        /* Ripple effect (slow, matching star field pace) */
        .hero__avatar-ripples {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .hero__avatar-ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(124,58,237,0.4);
          animation: avatar-ripple 7.5s ease-out infinite;
          opacity: 0;
        }
        .hero__avatar-ripple--2 { animation-delay: 2.5s; }
        .hero__avatar-ripple--3 { animation-delay: 5s; }
        @keyframes avatar-ripple {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .hero__avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: top;
          position: relative;
          z-index: 1;
          border: 3px solid var(--bg);
          box-shadow: 0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(6,182,212,0.1);
        }

        /* ── Content ───────────── */
        .hero__content {
          flex: 1;
          max-width: 580px;
        }

        .hero__greeting {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent2);
          margin-bottom: 0.75rem;
          letter-spacing: 0.04em;
        }
        .hero__greeting-line {
          width: 28px; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          border-radius: 2px;
          display: inline-block;
        }

        .hero__name {
          font-size: clamp(2.8rem, 9vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 30%, rgba(124,58,237,0.8) 70%, var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__tagline {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 36ch;
          margin-bottom: 1.5rem;
          line-height: 1.7;
          font-weight: 400;
        }

        .hero__tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .hero__tech-pill {
          font-size: 0.75rem;
          font-weight: 600;
          font-family: var(--font-mono);
          padding: 0.3rem 0.7rem;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: var(--radius-full);
          color: #c4b5fd;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .hero__tech-pill:hover {
          background: rgba(124,58,237,0.2);
          border-color: rgba(124,58,237,0.5);
          transform: translateY(-1px);
        }

        .hero__actions {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .hero__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.95rem;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          text-decoration: none;
        }
        .hero__btn:hover { transform: translateY(-2px); }

        .hero__btn--primary {
          background: linear-gradient(135deg, var(--accent), #5b21b6);
          color: #fff;
          box-shadow: 0 4px 20px var(--accent-glow);
        }
        .hero__btn--primary:hover {
          box-shadow: 0 8px 32px var(--accent-glow);
          color: #fff;
          opacity: 0.9;
        }
        .hero__btn--outline {
          border: 1.5px solid var(--border);
          color: var(--text);
          background: rgba(255,255,255,0.03);
        }
        .hero__btn--outline:hover {
          border-color: var(--accent2);
          color: var(--accent2);
          background: rgba(6,182,212,0.06);
        }

        /* ── Socials ───────────── */
        .hero__socials {
          display: flex;
          gap: 0.75rem;
        }
        .hero__social {
          width: 40px; height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-muted);
          color: var(--text-muted);
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .hero__social:hover {
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.3);
          color: var(--text);
          transform: translateY(-2px);
        }

        /* ── Scroll indicator ──── */
        .hero__scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-dim);
          font-size: 0.72rem;
          font-family: var(--font-mono);
          letter-spacing: 0.08em;
          animation: fadeIn 1s 1.5s both;
          z-index: 2;
        }
        .hero__scroll-dot {
          width: 20px; height: 32px;
          border: 1.5px solid var(--border-muted);
          border-radius: var(--radius-full);
          position: relative;
        }
        .hero__scroll-dot::after {
          content: '';
          position: absolute;
          top: 4px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 8px;
          background: var(--accent2);
          border-radius: 2px;
          animation: float 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
