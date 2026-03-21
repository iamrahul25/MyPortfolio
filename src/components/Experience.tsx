import { data } from '../data'

export function Experience() {
  const { experience } = data

  return (
    <section id="experience" className="experience">
      <div className="section-header">
        <div className="section-label">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Career
        </div>
        <h2 className="section-title">
          Work <span>Experience</span>
        </h2>
        <p className="experience__intro">
          My professional journey and hands-on experience in software development and DevOps.
        </p>
      </div>

      <div className="experience__list">
        {experience.map((job, index) => (
          <article
            key={`${job.company}-${job.dateRange}`}
            className="experience__card"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="experience__card-accent" aria-hidden />
            <div className="experience__card-top">
              <div className="experience__title-row">
                <h3 className="experience__role">{job.title}</h3>
                {job.current ? (
                  <span className="experience__badge">Current</span>
                ) : null}
              </div>
              <p className="experience__company">{job.company}</p>
              <div className="experience__meta">
                <span className="experience__dates">{job.dateRange}</span>
                <span className="experience__dot" aria-hidden>
                  ·
                </span>
                <span className="experience__location">{job.location}</span>
              </div>
            </div>

            <p className="experience__summary">{job.summary}</p>

            <ul className="experience__bullets">
              {job.bullets.map((item, bi) => (
                <li key={bi}>{item}</li>
              ))}
            </ul>

            <div className="experience__skills" role="list" aria-label="Technologies">
              {job.skills.map((skill) => (
                <span key={skill} className="experience__skill" role="listitem">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <style>{`
        /* Breathing room under the section heading (before intro + cards) */
        .experience .section-title {
          margin-bottom: 1rem;
        }

        .experience__intro {
          max-width: 52ch;
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.65;
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .experience__list {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          max-width: 52rem;
        }

        .experience__card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-lg);
          padding: 1.5rem 1.5rem 1.35rem 1.65rem;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
          animation: experience-fade-in 0.55s ease both;
        }
        @keyframes experience-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .experience__card:hover {
          border-color: rgba(124, 58, 237, 0.32);
          box-shadow: 0 10px 44px rgba(124, 58, 237, 0.12), 0 2px 14px rgba(0, 0, 0, 0.35);
          transform: translateY(-2px);
        }

        .experience__card-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, var(--accent) 0%, var(--accent2) 55%, rgba(244, 114, 182, 0.65) 100%);
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          opacity: 0.95;
        }

        .experience__card-top {
          padding-left: 0.35rem;
          margin-bottom: 0.85rem;
        }

        .experience__title-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.6rem 0.75rem;
          margin-bottom: 0.35rem;
        }

        .experience__role {
          font-size: clamp(1.15rem, 2.8vw, 1.35rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          line-height: 1.2;
        }

        .experience__badge {
          font-size: 0.68rem;
          font-weight: 700;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0.22rem 0.55rem;
          border-radius: var(--radius-full);
          color: var(--accent2);
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.35);
        }
        [data-theme="light"] .experience__badge {
          background: rgba(8, 145, 178, 0.1);
          border-color: rgba(8, 145, 178, 0.28);
          color: var(--accent2);
        }

        .experience__company {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }

        .experience__meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-dim);
        }
        .experience__dot {
          opacity: 0.55;
          user-select: none;
        }

        .experience__summary {
          padding-left: 0.35rem;
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .experience__bullets {
          padding-left: 1.35rem;
          margin: 0 0 1.1rem 0.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.65;
        }
        .experience__bullets li::marker {
          color: var(--accent);
        }

        .experience__skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          padding-left: 0.35rem;
        }

        .experience__skill {
          font-size: 0.72rem;
          font-weight: 600;
          font-family: var(--font-mono);
          padding: 0.32rem 0.65rem;
          border-radius: var(--radius-full);
          color: #c4b5fd;
          background: rgba(124, 58, 237, 0.12);
          border: 1px solid rgba(124, 58, 237, 0.22);
          transition: border-color 0.2s, background 0.2s;
        }
        .experience__skill:hover {
          border-color: rgba(124, 58, 237, 0.45);
          background: rgba(124, 58, 237, 0.18);
        }
        [data-theme="light"] .experience__skill {
          color: var(--accent);
          background: rgba(112, 42, 225, 0.08);
          border-color: rgba(112, 42, 225, 0.18);
        }
        [data-theme="light"] .experience__skill:hover {
          background: rgba(112, 42, 225, 0.12);
          border-color: rgba(112, 42, 225, 0.28);
        }
      `}</style>
    </section>
  )
}
