import { data } from '../data'

export function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <div className="section-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Portfolio
        </div>
        <h2 className="section-title">Featured <span>Projects</span></h2>
      </div>

      <div className="projects__grid">
        {data.projects.map((project, index) => (
          <article key={project.title} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Image wrapper */}
            {project.image && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__img-wrap">
                <img src={project.image} alt={project.title} className="project-card__img" />
                <div className="project-card__img-overlay">
                  <span className="project-card__img-cta">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Open Live
                  </span>
                </div>
              </a>
            )}

            <div className="project-card__body">
              {/* Tags */}
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h3 className="project-card__title">{project.title}</h3>

              {/* Description */}
              <p className="project-card__desc">{project.description}</p>

              {/* Footer link */}
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
                <span>View project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="project-card__link-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .projects__grid {
          display: grid;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .projects__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .projects__grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Card ───────────────── */
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          position: relative;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .project-card:hover {
          border-color: rgba(124,58,237,0.35);
          box-shadow: 0 8px 40px rgba(124,58,237,0.15), 0 2px 12px rgba(0,0,0,0.4);
          transform: translateY(-4px);
        }
        .project-card:hover::before { opacity: 1; }

        /* ── Image ──────────────── */
        .project-card__img-wrap {
          display: block;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .project-card__img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          vertical-align: middle;
          transition: transform 0.45s ease;
          display: block;
        }
        .project-card:hover .project-card__img {
          transform: scale(1.06);
        }
        .project-card__img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-card:hover .project-card__img-overlay {
          opacity: 1;
        }
        .project-card__img-cta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          background: rgba(124,58,237,0.8);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.2);
        }

        /* ── Body ───────────────── */
        .project-card__body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          flex: 1;
        }

        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .project-card__tag {
          font-size: 0.68rem;
          font-weight: 600;
          font-family: var(--font-mono);
          color: var(--accent2);
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.2);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .project-card__title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          transition: color 0.2s;
        }
        .project-card:hover .project-card__title { color: #fff; }

        .project-card__desc {
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.65;
          flex-grow: 1;
        }

        .project-card__link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent2);
          margin-top: 0.25rem;
          transition: gap 0.2s, color 0.2s;
          text-decoration: none;
        }
        .project-card__link:hover {
          gap: 0.6rem;
          color: #38d9f5;
        }
        .project-card__link-arrow {
          transition: transform 0.2s;
        }
        .project-card__link:hover .project-card__link-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  )
}
