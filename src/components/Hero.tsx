import { data } from '../data'

export function Hero() {
  const { hero, about } = data
  return (
    <section id="hero" className="hero">
      <p className="hero__greeting">{hero.greeting}</p>
      <h1 className="hero__name">{about.name}</h1>
      <p className="hero__tagline">{hero.tagline}</p>
      <div className="hero__actions">
        <a href={hero.primaryCtaHref} className="hero__btn hero__btn--primary">
          {hero.primaryCta}
        </a>
        <a href={hero.secondaryCtaHref} className="hero__btn hero__btn--outline">
          {hero.secondaryCta}
        </a>
      </div>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 4rem;
        }
        .hero__greeting {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .hero__name {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .hero__tagline {
          color: var(--text-muted);
          font-size: 1.15rem;
          max-width: 28ch;
          margin-bottom: 2rem;
        }
        .hero__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero__btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .hero__btn:hover {
          transform: translateY(-2px);
        }
        .hero__btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .hero__btn--primary:hover {
          box-shadow: 0 8px 24px var(--accent-dim);
        }
        .hero__btn--outline {
          border: 2px solid var(--border);
          color: var(--text);
        }
        .hero__btn--outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </section>
  )
}
