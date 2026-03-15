import { data } from '../data'

// Map skill names to a color category for visual variety
const CATEGORY_MAP: Record<string, string> = {
  React: 'violet',
  JavaScript: 'yellow',
  TypeScript: 'blue',
  'Node.js': 'green',
  Express: 'green',
  MongoDB: 'green',
  SQL: 'cyan',
  Python: 'yellow',
  'C/C++': 'slate',
  Firebase: 'amber',
  'Socket.io': 'violet',
  WebRTC: 'pink',
  Git: 'orange',
  'REST APIs': 'cyan',
}

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <div className="section-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Tech Stack
        </div>
        <h2 className="section-title">Tools &amp; <span>Technologies</span></h2>
      </div>

      <ul className="skills__list">
        {data.skills.map((skill) => {
          const cat = CATEGORY_MAP[skill] || 'slate'
          return (
            <li key={skill} className={`skills__item skills__item--${cat}`}>
              <span className="skills__dot" />
              {skill}
            </li>
          )
        })}
      </ul>

      <style>{`
        .skills__list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skills__item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .skills__item::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .skills__item:hover {
          transform: translateY(-3px);
        }
        .skills__item:hover::before { opacity: 1; }

        .skills__dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Color variants */
        .skills__item--violet {
          color: #c4b5fd;
          background: rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.25);
        }
        .skills__item--violet .skills__dot { background: #7c3aed; }
        .skills__item--violet:hover {
          background: rgba(124,58,237,0.2);
          box-shadow: 0 4px 16px rgba(124,58,237,0.2);
        }

        .skills__item--yellow {
          color: #fde68a;
          background: rgba(234,179,8,0.08);
          border-color: rgba(234,179,8,0.2);
        }
        .skills__item--yellow .skills__dot { background: #eab308; }
        .skills__item--yellow:hover {
          background: rgba(234,179,8,0.16);
          box-shadow: 0 4px 16px rgba(234,179,8,0.15);
        }

        .skills__item--blue {
          color: #93c5fd;
          background: rgba(59,130,246,0.1);
          border-color: rgba(59,130,246,0.22);
        }
        .skills__item--blue .skills__dot { background: #3b82f6; }
        .skills__item--blue:hover {
          background: rgba(59,130,246,0.18);
          box-shadow: 0 4px 16px rgba(59,130,246,0.15);
        }

        .skills__item--green {
          color: #86efac;
          background: rgba(34,197,94,0.08);
          border-color: rgba(34,197,94,0.2);
        }
        .skills__item--green .skills__dot { background: #22c55e; }
        .skills__item--green:hover {
          background: rgba(34,197,94,0.16);
          box-shadow: 0 4px 16px rgba(34,197,94,0.12);
        }

        .skills__item--cyan {
          color: #67e8f9;
          background: rgba(6,182,212,0.08);
          border-color: rgba(6,182,212,0.2);
        }
        .skills__item--cyan .skills__dot { background: #06b6d4; }
        .skills__item--cyan:hover {
          background: rgba(6,182,212,0.16);
          box-shadow: 0 4px 16px rgba(6,182,212,0.12);
        }

        .skills__item--slate {
          color: #cbd5e1;
          background: rgba(148,163,184,0.08);
          border-color: rgba(148,163,184,0.18);
        }
        .skills__item--slate .skills__dot { background: #94a3b8; }
        .skills__item--slate:hover {
          background: rgba(148,163,184,0.14);
          box-shadow: 0 4px 16px rgba(148,163,184,0.1);
        }

        .skills__item--amber {
          color: #fcd34d;
          background: rgba(251,191,36,0.08);
          border-color: rgba(251,191,36,0.2);
        }
        .skills__item--amber .skills__dot { background: #f59e0b; }
        .skills__item--amber:hover {
          background: rgba(251,191,36,0.15);
          box-shadow: 0 4px 16px rgba(251,191,36,0.12);
        }

        .skills__item--pink {
          color: #f9a8d4;
          background: rgba(244,114,182,0.08);
          border-color: rgba(244,114,182,0.2);
        }
        .skills__item--pink .skills__dot { background: #f472b6; }
        .skills__item--pink:hover {
          background: rgba(244,114,182,0.16);
          box-shadow: 0 4px 16px rgba(244,114,182,0.12);
        }

        .skills__item--orange {
          color: #fdba74;
          background: rgba(249,115,22,0.08);
          border-color: rgba(249,115,22,0.2);
        }
        .skills__item--orange .skills__dot { background: #f97316; }
        .skills__item--orange:hover {
          background: rgba(249,115,22,0.16);
          box-shadow: 0 4px 16px rgba(249,115,22,0.12);
        }
      `}</style>
    </section>
  )
}
